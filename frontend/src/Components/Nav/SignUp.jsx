import { useState, useEffect, useRef } from "react";
import { ShowPassword, HidePassword } from "../../assets/Icons/Icons";
import axios from 'axios';
import { url } from '../../URL/Url';
import "./LoginModal.css";

const LoginModal = ({ setIsFlipBox }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [shakeUsername, setShakeUsername] = useState(false);
  const [shakePassword, setShakePassword] = useState(false);

  const inputRef = useRef(null);
  const inputRef2 = useRef(null);
  const inputRef3 = useRef(null);

  useEffect(() => {

    inputRef.current.focus();
  }, [])


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

  const handleSignUp = () => {
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
      name: name,
      username: username,
      password: password
    }
    const handleLogin = async () => {
      try {
        const response = await axios.post(`${url}/auth/signup`, formData);
        console.log('Success:', response.data);
      } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
      }
    };
    handleLogin();
    setName('');
    setUsername('');
    setPassword('');
  };

  return (
    <>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>SIGN UP</h2>

        {/* Name Input */}
        <input ref={inputRef}
          //   style={{ border: usernameError ? '1px solid #ff4538' : '' }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // Prevents form submission if inside a <form>
              inputRef2.current.focus(); // Move focus to next input
            }
          }}
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            // setUsernameError('');
          }}
        />

        {/* Username Input */}
        <input ref={inputRef2}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault(); // Prevents form submission if inside a <form>
              inputRef3.current.focus(); // Move focus to next input
            }
          }}
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
          <input ref={inputRef3}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault(); // Prevents form submission if inside a <form>
                handleSignUp()
              }
            }}
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
              <HidePassword />) : (
              <ShowPassword />)}
          </div>
        </div>
        {passwordError && <p className={`error-message ${shakePassword ? "shake" : ""}`}>{passwordError}</p>}

        <button onClick={handleSignUp} className="login-btn">Sign up</button>
        {/* <button className="close-btn" onClick={onClose}>Close</button> */}
      </div>
      <div className="sign-up-p">
        <p onClick={(e) => {
          e.stopPropagation()
          setIsFlipBox(false)
        }} >LOGIN</p>
      </div>
    </>

  );
};

export default LoginModal;
