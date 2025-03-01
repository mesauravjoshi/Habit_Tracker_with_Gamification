import { useState, useContext } from "react";
import LoginModal from "./LoginModal";
import "./Nav.css";
import { AuthContext } from "../Context/AuthContext";

function Nav({ toggleSlider }) {
  const { user, setUser, fetchUserData } = useContext(AuthContext); // Access user from context
  const [isLoginOpen, setLoginOpen] = useState(false);

  return (
    <div className="nav">
      <div className="menu-icon" onClick={toggleSlider}>
        ☰
      </div>
      <div className="nav-list">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="profile-popup">
        <div className="profile-logo">
          <p>R</p>
        </div>
        {/* {
          user &&
          <div className="profile-logo">
            <p>{user.username.toUpperCase().slice(0, 1)}</p>
          </div>
        } */}
        {
          !user ?
            <button onClick={() => setLoginOpen(true)} className="login-btn">
              Login
            </button> :
            <button onClick={(e) => {
              localStorage.removeItem('habit token');
              console.log('removed');
              setUser(null);
              fetchUserData();
            }} className="login-btn">
              Log out
            </button>
        }
      </div>

      {/* Login Modal */}
      {isLoginOpen && <LoginModal setLoginOpen={setLoginOpen} onClose={() => setLoginOpen(false)} />}
    </div>
  );
}

export default Nav;
