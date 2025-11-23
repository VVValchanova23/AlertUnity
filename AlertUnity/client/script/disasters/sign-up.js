import { auth, db } from "../../data/firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/11.8.0/firebase-firestore.js";
import { validateForm, initUIEffects } from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
    initUIEffects();

    const roleSelect = document.getElementById("role");
    const regionGroup = document.getElementById("regionGroup");

    // 🔥🌊🌪🌎 Determine disaster from theme
    const theme = document.documentElement.getAttribute("data-theme");
    const disaster = theme.replace("-light", "").replace("-dark", "");

    // 🔥🌊🌪🌎 Role map based on disaster
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

    // ✔ Load roles dynamically
    roleSelect.innerHTML = `<option value="">Select Your Role</option>`;
    DISASTER_ROLE_MAP[disaster].forEach(role => {
        const opt = document.createElement("option");
        opt.value = role.value;
        opt.textContent = role.label;
        roleSelect.appendChild(opt);
    });

    // ✔ Only fire has regions
    roleSelect.addEventListener("change", () => {
        if (roleSelect.value === "firefighter") {
            regionGroup.style.display = "block";
            regionGroup.querySelector("select").required = true;
        } else {
            regionGroup.style.display = "none";
            regionGroup.querySelector("select").required = false;
        }
    });

    // ==========================
    // SAVE USER ON SIGN UP
    // ==========================
    const signUpForm = document.getElementById("signUpForm");
    if (signUpForm) {
        signUpForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            if (!validateForm("signup")) return;

            const firstName = document.getElementById("firstName").value.trim();
            const lastName = document.getElementById("lastName").value.trim();
            const email = document.getElementById("signupEmail").value.trim();
            const phone = document.getElementById("phone").value.trim();
            const role = roleSelect.value;
            const password = document.getElementById("password").value;

            // region only for firefighters
            let region = null;
            if (role === "firefighter") {
                region = document.getElementById("region").value;
            }

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                await setDoc(doc(db, "users", user.uid), {
                    firstName,
                    lastName,
                    email: user.email,
                    phone,
                    role,              // <-- dynamic role from disaster
                    region,
                    disaster,          // <-- save page disaster (optional)
                    createdAt: new Date().toISOString(),
                });

                alert("Registration successful!");
                window.location.href = "/pages/disasters/sign-in.html";

            } catch (error) {
                console.error("Firebase error:", error);
                alert("Error: " + error.message);
            }
        });
    }
});
