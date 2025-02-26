import { useState, useContext } from "react";
import LoginModal from "./LoginModal";
import "./Nav.css";
import { AuthContext } from "../Context/AuthContext";

function Nav({ toggleSlider }) {
  const { user} = useContext(AuthContext); // Access user from context

  const [isLoginOpen, setLoginOpen] = useState(false);

  return (
    <div className="nav">
      <div className="menu-icon" onClick={toggleSlider}>
        ☰
      </div>
      <div className="nav-list">
        <input type="text" placeholder="Search..." />
        { user && user.username}
      </div>
      <div>
        <button onClick={() => setLoginOpen(true)} className="login-btn">
          Login
        </button>
      </div>

      {/* Login Modal */}
      {isLoginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </div>
  );
}

export default Nav;
