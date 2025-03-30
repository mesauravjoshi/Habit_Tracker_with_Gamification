import { useEffect, useRef, useReducer } from "react";
import { ShowPassword, HidePassword } from "../../assets/Icons/Icons";
import axios from 'axios';
import { url } from '../../URL/Url';
import "./LoginModal.css";

// ✅ Initial State
const initialState = {
  formData: {
    name: '',
    username: '',
    password: ''
  },
  showPassword: false,
  errors: {
    username: '',
    password: ''
  },
  shake: {
    username: false,
    password: false
  }
};

// ✅ Reducer Function
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FORM_DATA":
      return { 
        ...state, 
        formData: { ...state.formData, [action.field]: action.value } 
      };
      
    case "SET_SHOW_PASSWORD":
      return { ...state, showPassword: !state.showPassword };

    case "SET_ERROR":
      return { 
        ...state, 
        errors: { ...state.errors, [action.field]: action.message } 
      };

    case "SET_SHAKE":
      return { 
        ...state, 
        shake: { ...state.shake, [action.field]: true } 
      };

    case "RESET_SHAKE":
      return { 
        ...state, 
        shake: { ...state.shake, [action.field]: false } 
      };

    case "RESET_FORM":
      return initialState;

    default:
      return state;
  }
};

const SignUpModal = ({ setIsFlipBox }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // ✅ Input Refs
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // ✅ Password Validation
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

  // ✅ Handle Input Change
  const handleInputChange = (e) => {
    dispatch({ type: "SET_FORM_DATA", field: e.target.name, value: e.target.value });

    // Clear errors when user starts typing
    dispatch({ type: "SET_ERROR", field: e.target.name, message: '' });
  };

  // ✅ Handle Sign Up
  const handleSignUp = async () => {
    let isValid = true;

    // Validate Username
    if (state.formData.username.trim() === '') {
      dispatch({ type: "SET_ERROR", field: "username", message: "Username cannot be empty." });
      dispatch({ type: "SET_SHAKE", field: "username" });
      setTimeout(() => dispatch({ type: "RESET_SHAKE", field: "username" }), 500);
      isValid = false;
    }

    // Validate Password
    const passwordError = validatePassword(state.formData.password);
    if (passwordError) {
      dispatch({ type: "SET_ERROR", field: "password", message: passwordError });
      dispatch({ type: "SET_SHAKE", field: "password" });
      setTimeout(() => dispatch({ type: "RESET_SHAKE", field: "password" }), 500);
      isValid = false;
    }

    if (!isValid) return;

    // API Request
    try {
      const response = await axios.post(`${url}/auth/signup`, state.formData);
      console.log('Success:', response.data);

      // Reset form on successful signup
      dispatch({ type: "RESET_FORM" });
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>SIGN UP</h2>

        {/* Name Input */}
        <input 
          ref={inputRef}
          name="name"
          type="text"
          placeholder="Name"
          value={state.formData.name}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Enter' && inputRef2.current.focus()}
        />

        {/* Username Input */}
        <input 
          ref={inputRef2}
          name="username"
          type="text"
          placeholder="Email"
          value={state.formData.username}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === 'Enter' && inputRef3.current.focus()}
          style={{ border: state.errors.username ? '1px solid #ff4538' : '' }}
        />
        {state.errors.username && (
          <p className={`error-message ${state.shake.username ? "shake" : ""}`}>
            {state.errors.username}
          </p>
        )}

        {/* Password Input */}
        <div className="password-container">
          <input 
            ref={inputRef3}
            name="password"
            type={state.showPassword ? "text" : "password"}
            placeholder="Password"
            value={state.formData.password}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSignUp()}
            style={{ border: state.errors.password ? '1px solid #ff4538' : '' }}
          />
          <div className="eye-open" onClick={() => dispatch({ type: "SET_SHOW_PASSWORD" })}>
            {state.showPassword ? <HidePassword /> : <ShowPassword />}
          </div>
        </div>
        {state.errors.password && (
          <p className={`error-message ${state.shake.password ? "shake" : ""}`}>
            {state.errors.password}
          </p>
        )}

        {/* Sign Up Button */}
        <button onClick={handleSignUp} className="login-btn">Sign up</button>
      </div>

      <div className="sign-up-p">
        <p onClick={(e) => { e.stopPropagation(); setIsFlipBox(false); }}>LOGIN</p>
      </div>
    </>
  );
};

export default SignUpModal;
