import { useEffect, useState,useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url } from '../../URL/Url';
import SignUp from './SignUp'
import "./LoginModal.css";
import { AuthContext } from '../Context/AuthContext';
import { StreaXPContext } from "../Context/Strea&XPContext";

const LoginModal = ({ setLoginOpen,onClose }) => {
  const {fetchUserData} = useContext(AuthContext); // Access user from context
  const { fetchStreaXPData } = useContext(StreaXPContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [shakeUsername, setShakeUsername] = useState(false);
  const [shakePassword, setShakePassword] = useState(false);

  const [isFlipBox, setIsFlipBox] = useState(false);
  const navigate = useNavigate();

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

    const formData = {
      username: username,
      password: password
    }

    const handleLogin = async () => {
      try {
        const response = await axios.post(`${url}/auth/login`, formData);
        // console.log('Success:', response.data.token);
        localStorage.setItem('habit token',response.data.token);
        fetchUserData();
        fetchStreaXPData();
        setLoginOpen(false);
        navigate('/track-streak');
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
      }
    };
    handleLogin();
    setUsername('');
    setPassword('');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      {
        isFlipBox ?
          <SignUp setIsFlipBox={setIsFlipBox} /> :
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
      }
      {
        !isFlipBox &&
        <div className="sign-up-p">
          <p onClick={(e) => {
            e.stopPropagation()
            setIsFlipBox(true)
          }} >SIGN UP</p>
        </div>
      }
    </div>
  );
};

export default LoginModal;
