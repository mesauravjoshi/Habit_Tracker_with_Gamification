import { useState } from "react";
import LoginModal from "./LoginModal";
import "./Nav.css";

function Nav({ toggleSlider }) {
  const [isLoginOpen, setLoginOpen] = useState(false);

  return (
    <div className="nav">
      <div className="menu-icon" onClick={toggleSlider}>
        ☰
      </div>
      <div className="nav-list">
        <input type="text" placeholder="Search..." />
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
