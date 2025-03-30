import { useEffect, useState, useContext, useRef, useReducer, act } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ShowPassword, HidePassword } from "../../assets/Icons/Icons";
import { url } from '../../URL/Url';
import SignUp from './SignUp'
import "./LoginModal.css";
import { AuthContext } from '../Context/AuthContext';
import { StreaXPContext } from "../Context/Strea&XPContext";

const LoginModal = ({ setLoginOpen, onClose }) => {
  const { fetchUserData } = useContext(AuthContext); // Access user from context
  const { fetchStreaXPData } = useContext(StreaXPContext);

  const initialState = {
    showPassword: false,
    usernameError: '',
    passwordError: '',
    shakeUsername: false,
    shakePassword: false
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SHOW_PASSWORD":
        return { ...state, showPassword: action.payload }
      case "USERNAME_ERROR":
        return { ...state, usernameError: action.payload }
      case "PASSWORD_ERROR":
        return { ...state, passwordError: action.payload }
      case "SHAKE_USERNAME":
        return { ...state, shakeUsername: action.payload }
      case "SHAKE_PASSWORD":
        return { ...state, shakePassword: action.payload }
    }
  }

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  // console.log(state.usernameError);

  const [state, dispatch] = useReducer(reducer, initialState);
  // const { showPassword, usernameError } = state;  // Destructure from state

  const [isFlipBox, setIsFlipBox] = useState(false);
  const navigate = useNavigate();

  const inputRef = useRef(null);
  const inputRef2 = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
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

  const handleLogin = async () => {
    let isValid = true;

    if (formData.username.trim() === '') {
      dispatch({ type: "USERNAME_ERROR", payload: "Username cannot be empty." });
      // dispatch({ type: "SHAKE_USERNAME", payload: true });
      setShakeUsername(dispatch({ type: "SHAKE_USERNAME", payload: true }));
      setTimeout(() => dispatch({ type: "SHAKE_USERNAME", payload: false }), 500);
      isValid = false;
    } else {
      dispatch({ type: "USERNAME_ERROR", payload: "" });
    }

    const passwordValidationMessage = validatePassword(formData.password);
    if (passwordValidationMessage) {
      dispatch({ type: "PASSWORD_ERROR", payload: passwordValidationMessage });
      // setPasswordError(passwordValidationMessage);
      dispatch({ type: "SHAKE_PASSWORD", payload: true });
      // setShakePassword(true);
      setTimeout(() => dispatch({ type: "SHAKE_PASSWORD", payload: false }), 500);
      isValid = false;
    } else {
      dispatch({ type: "PASSWORD_ERROR", payload: "" });
    }

    if (!isValid) return;

    try {
      const response = await axios.post(`${url}/auth/login`, formData);
      // console.log('Success:', response.data.token);
      localStorage.setItem('habit token', response.data.token);
      fetchUserData();
      fetchStreaXPData();
      setLoginOpen(false);
      navigate('/track-streak');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev => {
      return { ...prev, [name]: value }
    }))
    dispatch({ type: "USERNAME_ERROR", payload: "" });
    dispatch({ type: "PASSWORD_ERROR", payload: "" });
    // setPasswordError('');
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      {
        isFlipBox ?
          <SignUp setIsFlipBox={setIsFlipBox} /> :
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Login</h2>

            {/* Username Input */}
            <input ref={inputRef}
              style={{ border: state.usernameError ? '1px solid #ff4538' : '' }}
              type="text" name="username"
              placeholder="Email"
              value={formData.username}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  // console.log(username);
                  if (formData.username.trim() === '') {
                    dispatch({ type: "USERNAME_ERROR", payload: "Username cannot be empty." });
                    dispatch({ type: "SHAKE_USERNAME", payload: true });
                    setTimeout(() => dispatch({ type: "SHAKE_USERNAME", payload: false }), 500);
                    isValid = false;
                  }
                  inputRef2.current.focus(); // Move focus to next input
                }
              }}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            {state.usernameError && <p className={`error-message ${state.shakeUsername ? "shake" : ""}`}>{state.usernameError}</p>}

            {/* Password Input */}
            <div className="password-container">
              <input ref={inputRef2}
                style={{ border: state.passwordError ? '1px solid #ff4538' : '' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault(); // Prevents form submission if inside a <form>
                    handleLogin()
                  }
                }}
                type={state.showPassword ? "text" : "password"} name="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <div className="eye-open" onClick={() => dispatch({ type: 'SHOW_PASSWORD', payload: !state.showPassword })}>
                {state.showPassword ? (
                  <HidePassword />) : (
                  <ShowPassword />)}
              </div>
            </div>
            {state.passwordError && <p className={`error-message ${state.shakePassword ? "shake" : ""}`}>{state.passwordError}</p>}

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
