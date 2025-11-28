import { auth, db } from "../../data/firebase-config.js";
import { 
    createUserWithEmailAndPassword,
    updatePhoneNumber,
    fetchSignInMethodsForEmail
} from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";
import { doc, setDoc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js";
import { validateForm, initUIEffects } from "./auth.js";
import { 
    initializeRecaptcha, 
    sendVerificationCode, 
    verifyCode, 
    createVerificationModal,
    resetVerification
} from "./sms-verification.js";

let pendingUserData = null;
let verificationModal = null;
let verifiedPhoneCredential = null;

document.addEventListener("DOMContentLoaded", () => {
    initUIEffects();
    initializeRecaptcha();
    
    const roleSelect = document.getElementById("role");
    const regionGroup = document.getElementById("regionGroup");
    const theme = document.documentElement.getAttribute("data-theme");
    const disaster = theme.replace("-light", "").replace("-dark", "");
    
    const DISASTER_ROLE_MAP = {
        fire: [
            { value: "citizen", label: "Citizen Reporter" },
            { value: "firefighter", label: "Firefighter" }
        ],
        flood: [
            { value: "citizen", label: "Citizen Reporter" },
            { value: "flood-rescuer", label: "Flood Rescuer" }
        ],
        hurricane: [
            { value: "citizen", label: "Citizen Reporter" },
            { value: "hurricane-rescuer", label: "Hurricane Rescuer" }
        ],
        earthquake: [
            { value: "citizen", label: "Citizen Reporter" },
            { value: "earthquake-rescuer", label: "Earthquake Rescuer" }
        ]
    };
    
    roleSelect.innerHTML = `<option value="" data-i18n="auth.selectRole">Select Your Role</option>`;
    DISASTER_ROLE_MAP[disaster].forEach(role => {
        const opt = document.createElement("option");
        opt.value = role.value;
        opt.textContent = role.label;
        roleSelect.appendChild(opt);
    });
    
    roleSelect.addEventListener("change", () => {
        if (roleSelect.value === "firefighter") {
            regionGroup.style.display = "block";
            regionGroup.querySelector("select").required = true;
        } else {
            regionGroup.style.display = "none";
            regionGroup.querySelector("select").required = false;
        }
    });
    
    const signUpForm = document.getElementById("signUpForm");
    if (signUpForm) {
        signUpForm.addEventListener("submit", handleSignUpSubmit);
    }
});

async function handleSignUpSubmit(e) {
    e.preventDefault();
    if (!validateForm("signup")) return;
    
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    let phone = document.getElementById("phone").value.trim();
    const role = document.getElementById("role").value;
    const password = document.getElementById("password").value;
    
    let region = null;
    if (role === "firefighter") {
        region = document.getElementById("region").value;
    }
    
    if (!phone.startsWith('+')) {
        alert("Please enter phone number with country code (e.g., +1234567890)");
        return;
    }
    
    const theme = document.documentElement.getAttribute("data-theme");
    const disaster = theme.replace("-light", "").replace("-dark", "");
    
    const submitButton = document.querySelector('.primary-btn');
    submitButton.disabled = true;
    submitButton.textContent = "Checking...";
    
    try {
        const usersRef = collection(db, "users");
        const emailQuery = query(usersRef, where("email", "==", email));
        const emailSnapshot = await getDocs(emailQuery);
        
        if (!emailSnapshot.empty) {
            alert("An account with this email already exists. Please sign in or use a different email.");
            submitButton.disabled = false;
            submitButton.textContent = "Create Account";
            return;
        }
        
        const phoneQuery = query(usersRef, where("phone", "==", phone));
        const phoneSnapshot = await getDocs(phoneQuery);
        
        if (!phoneSnapshot.empty) {
            alert("An account with this phone number already exists. Please use a different phone number.");
            submitButton.disabled = false;
            submitButton.textContent = "Create Account";
            return;
        }
        
        pendingUserData = {
            firstName,
            lastName,
            email,
            phone,
            role,
            region,
            disaster,
            password
        };
        
        submitButton.textContent = "Create Account";
        
        await initiatePhoneVerification(phone);
        
    } catch (error) {
        console.error("Error checking account:", error);
        alert("Error checking account: " + error.message);
        submitButton.disabled = false;
        submitButton.textContent = "Create Account";
    }
}

async function initiatePhoneVerification(phoneNumber) {
    try {
        const submitButton = document.querySelector('.primary-btn');
        submitButton.disabled = true;
        submitButton.textContent = "Sending code...";
        
        await sendVerificationCode(phoneNumber);
        
        verificationModal = createVerificationModal(
            handleCodeVerification,
            handleVerificationCancel
        );
        
        submitButton.disabled = false;
        submitButton.textContent = "Create Account";
        
    } catch (error) {
        console.error("Error sending verification code:", error);
        alert("Error sending verification code: " + error.message);
        
        const submitButton = document.querySelector('.primary-btn');
        submitButton.disabled = false;
        submitButton.textContent = "Create Account";
    }
}

async function handleCodeVerification(code) {
    try {
        verifiedPhoneCredential = await verifyCode(code);
        
        const userCredential = await createUserWithEmailAndPassword(
            auth, 
            pendingUserData.email, 
            pendingUserData.password
        );
        
        const user = userCredential.user;
        
        try {
            await updatePhoneNumber(user, verifiedPhoneCredential);
        } catch (linkError) {
            console.warn("Could not link phone number:", linkError);
        }
        
        await setDoc(doc(db, "users", user.uid), {
            firstName: pendingUserData.firstName,
            lastName: pendingUserData.lastName,
            email: user.email,
            phone: pendingUserData.phone,
            phoneVerified: true,
            role: pendingUserData.role,
            region: pendingUserData.region,
            disaster: pendingUserData.disaster,
            createdAt: new Date().toISOString(),
        });
        
        if (verificationModal) {
            verificationModal.removeModal();
        }
        
        alert("Registration successful! Your phone number has been verified.");
        window.location.href = "/pages/disasters/sign-in.html";
        
    } catch (error) {
        let errorMessage = "Invalid verification code. Please try again.";
        
        if (error.code === 'auth/invalid-verification-code') {
            errorMessage = "Invalid code. Please check and try again.";
        } else if (error.code === 'auth/code-expired') {
            errorMessage = "Code expired. Please request a new one.";
        } else if (error.code === 'auth/email-already-in-use') {
            errorMessage = "This email is already registered. Please use a different email.";
            
            if (verificationModal) {
                verificationModal.removeModal();
            }
            alert(errorMessage);
            return;
        } else if (error.code === 'auth/invalid-phone-number') {
            errorMessage = "Invalid phone number format.";
        } else if (error.code === 'auth/missing-phone-number') {
            errorMessage = "Phone number is required.";
        } else {
            errorMessage = error.message || errorMessage;
        }
        
        if (verificationModal) {
            verificationModal.showError(errorMessage);
            verificationModal.resetButton();
        }
    }
}

function handleVerificationCancel(resend = false) {
    if (resend) {
        if (verificationModal) {
            verificationModal.removeModal();
        }
        initiatePhoneVerification(pendingUserData.phone);
    } else {
        resetVerification();
        pendingUserData = null;
        verifiedPhoneCredential = null;
        
        const submitButton = document.querySelector('.primary-btn');
        submitButton.disabled = false;
        submitButton.textContent = "Create Account";
    }
}