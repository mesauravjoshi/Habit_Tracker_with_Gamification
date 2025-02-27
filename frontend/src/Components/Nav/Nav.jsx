import { useState, useContext } from "react";
import LoginModal from "./LoginModal";
import "./Nav.css";
import { AuthContext } from "../Context/AuthContext";

function Nav({ toggleSlider }) {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null; // Or return a loading state
  }

  const { user } = authContext;

  // const { user } = useContext(AuthContext); // Access user from context

  const [isLoginOpen, setLoginOpen] = useState(false);

  return (
    <div className="nav">
      <div className="menu-icon" onClick={toggleSlider}>
        ☰
      </div>
      <div className="nav-list">
        <input type="text" placeholder="Search..." />
        {user && user.username}
      </div>
      <div>
        <button onClick={() => setLoginOpen(true)} className="login-btn">
          Login
        </button>
        <button onClick={(e) => {
          localStorage.removeItem('habit token')
        }} className="">
          Log out
        </button>
      </div>

      {/* Login Modal */}
      {isLoginOpen && <LoginModal setLoginOpen={setLoginOpen} onClose={() => setLoginOpen(false)} />}
    </div>
  );
}

export default Nav;
