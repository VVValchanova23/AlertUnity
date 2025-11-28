import { auth } from "../../data/firebase-config.js";
import { 
    RecaptchaVerifier,
    PhoneAuthProvider,
    signInWithCredential,
    signOut
} from "https://www.gstatic.com/firebasejs/11.8.0/firebase-auth.js";

let recaptchaVerifier;
let verificationId;

export function initializeRecaptcha() {
    if (!recaptchaVerifier) {
        recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                console.log("reCAPTCHA verified");
            },
            'expired-callback': () => {
                alert("reCAPTCHA expired. Please try again.");
            }
        });
    }
}

export async function sendVerificationCode(phoneNumber) {
    try {
        if (!phoneNumber.startsWith('+')) {
            throw new Error("Phone number must include country code (e.g., +1234567890)");
        }

        const phoneProvider = new PhoneAuthProvider(auth);
        verificationId = await phoneProvider.verifyPhoneNumber(
            phoneNumber,
            recaptchaVerifier
        );
        
        return verificationId;
        
    } catch (error) {
        console.error("Error sending verification code:", error);
        
        if (recaptchaVerifier) {
            recaptchaVerifier.clear();
            recaptchaVerifier = null;
            initializeRecaptcha();
        }
        
        throw error;
    }
}

export async function verifyCode(code) {
    if (!verificationId) {
        throw new Error("No verification ID found. Please request a code first.");
    }
    
    if (!code || code.length !== 6) {
        throw new Error("Please enter a valid 6-digit code");
    }
    
    try {
        const credential = PhoneAuthProvider.credential(verificationId, code);
        
        const result = await signInWithCredential(auth, credential);
        
        await signOut(auth);
        
        return credential;
    } catch (error) {
        console.error("Code verification failed:", error);
        throw error;
    }
}

export function resetVerification() {
    verificationId = null;
    if (recaptchaVerifier) {
        recaptchaVerifier.clear();
        recaptchaVerifier = null;
    }
}

export function createVerificationModal(onVerify, onCancel) {
    const modalHTML = `
        <div id="verification-modal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            backdrop-filter: blur(5px);
        ">
            <div style="
                background: var(--bg-primary);
                backdrop-filter: blur(20px);
                border: 1px solid var(--border-secondary);
                border-radius: 20px;
                padding: 40px;
                width: 400px;
                max-width: 90vw;
                box-shadow: 0 8px 32px var(--overlay-heavy), 0 0 40px var(--glow-primary);
                text-align: center;
            ">
                <div style="
                    width: 48px;
                    height: 48px;
                    background: var(--gradient-accent);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    font-size: 24px;
                    box-shadow: 0 4px 15px var(--glow-primary);
                ">📱</div>
                
                <h2 style="color: var(--text-primary); margin-bottom: 10px; font-size: 24px;">
                    Verify Phone Number
                </h2>
                
                <p style="color: var(--text-secondary); margin-bottom: 30px; font-size: 14px;">
                    Enter the 6-digit code sent to your phone
                </p>
                
                <div style="margin-bottom: 20px;">
                    <input 
                        type="text" 
                        id="verification-code" 
                        maxlength="6"
                        placeholder="000000"
                        style="
                            width: 100%;
                            padding: 16px 20px;
                            background: var(--overlay-light);
                            border: 1px solid var(--border-secondary);
                            border-radius: 12px;
                            color: var(--text-primary);
                            font-size: 24px;
                            text-align: center;
                            letter-spacing: 8px;
                            font-weight: 600;
                        "
                    />
                </div>
                
                <div id="verification-error" style="
                    color: var(--accent-crimson);
                    margin-bottom: 20px;
                    font-size: 14px;
                    display: none;
                "></div>
                
                <button id="verify-btn" style="
                    width: 100%;
                    padding: 16px;
                    background: var(--gradient-accent);
                    border: none;
                    border-radius: 12px;
                    color: var(--text-primary);
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    margin-bottom: 12px;
                    box-shadow: 0 4px 15px var(--glow-primary);
                ">
                    Verify Code
                </button>
                
                <button id="cancel-verification-btn" style="
                    width: 100%;
                    padding: 16px;
                    background: transparent;
                    border: 1px solid var(--border-secondary);
                    border-radius: 12px;
                    color: var(--text-secondary);
                    font-size: 16px;
                    font-weight: 500;
                    cursor: pointer;
                ">
                    Cancel
                </button>
                
                <div style="margin-top: 20px;">
                    <button id="resend-code-btn" style="
                        background: none;
                        border: none;
                        color: var(--accent-tomato);
                        font-size: 14px;
                        cursor: pointer;
                        text-decoration: underline;
                    ">
                        Resend Code
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('verification-modal');
    const codeInput = document.getElementById('verification-code');
    const verifyBtn = document.getElementById('verify-btn');
    const cancelBtn = document.getElementById('cancel-verification-btn');
    const resendBtn = document.getElementById('resend-code-btn');
    const errorDiv = document.getElementById('verification-error');
    
    codeInput.focus();
    
    codeInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        errorDiv.style.display = 'none';
    });
    
    verifyBtn.addEventListener('click', () => {
        const code = codeInput.value.trim();
        if (code.length === 6) {
            verifyBtn.disabled = true;
            verifyBtn.textContent = 'Verifying...';
            onVerify(code);
        } else {
            showError('Please enter a 6-digit code');
        }
    });
    
    codeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            verifyBtn.click();
        }
    });
    
    cancelBtn.addEventListener('click', () => {
        removeModal();
        if (onCancel) onCancel();
    });
    
    resendBtn.addEventListener('click', () => {
        resendBtn.disabled = true;
        resendBtn.textContent = 'Sending...';
        if (onCancel) onCancel(true);
    });
    
    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        codeInput.style.borderColor = 'var(--accent-crimson)';
    }
    
    function removeModal() {
        if (modal && modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }
    
    return {
        showError,
        removeModal,
        resetButton: () => {
            verifyBtn.disabled = false;
            verifyBtn.textContent = 'Verify Code';
        }
    };
}