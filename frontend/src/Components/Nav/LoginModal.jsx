import { useEffect, useState } from "react";
import "./LoginModal.css";

const LoginModal = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [shakeUsername, setShakeUsername] = useState(false);
  const [shakePassword, setShakePassword] = useState(false);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const isValidLength = password.length >= 6;

    if (!isValidLength) return "Password must be at least 6 characters.";
    if (!hasUpperCase) return "Password must contain an uppercase letter.";
    if (!hasLowerCase) return "Password must contain a lowercase letter.";
    if (!hasNumber) return "Password must contain a number.";
    if (!hasSymbol) return "Password must contain a special character.";

    return "";
  };

  const handleLogin = () => {
    let isValid = true;

    if (username.trim() === '') {
      setUsernameError("Username cannot be empty.");
      setShakeUsername(true);
      setTimeout(() => setShakeUsername(false), 500);
      isValid = false;
    } else {
      setUsernameError("");
    }

    const passwordValidationMessage = validatePassword(password);
    if (passwordValidationMessage) {
      setPasswordError(passwordValidationMessage);
      setShakePassword(true);
      setTimeout(() => setShakePassword(false), 500);
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!isValid) return;

    console.log("Form is valid, sending data...");
    // Add API call here
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Login</h2>
        
        {/* Username Input */}
        <input
          style={{ border: usernameError ? '1px solid #ff4538' : '' }}
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setUsernameError('');
          }}
        />
        {usernameError && <p className={`error-message ${shakeUsername ? "shake" : ""}`}>{usernameError}</p>}

        {/* Password Input */}
        <div className="password-container">
          <input
            style={{ border: passwordError ? '1px solid #ff4538' : '' }}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError('');
            }}
          />
          <div className="eye-open" onClick={() => setShowPassword(prev => !prev)}>
            {showPassword ? (
              <span className="material-symbols-outlined">visibility_off</span>
            ) : (
              <span className="material-symbols-outlined">visibility</span>
            )}
          </div>
        </div>
        {passwordError && <p className={`error-message ${shakePassword ? "shake" : ""}`}>{passwordError}</p>}

        <button onClick={handleLogin} className="login-btn">Login</button>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LoginModal;
