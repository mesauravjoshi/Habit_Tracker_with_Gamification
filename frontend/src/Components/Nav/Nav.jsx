import { useState, useContext, useEffect, useRef } from "react";
import LoginModal from "./LoginModal";
import "./Nav.css";
import { AuthContext } from "../Context/AuthContext";

function Nav({ toggleSlider }) {
  const { user, setUser, fetchUserData } = useContext(AuthContext); // Access user from context
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [profileDropDown, setProfileDropDown] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropDown(false); // Close dropdown when clicking outside
      }
    }

    if (profileDropDown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileDropDown]);

  return (
    <div className="nav">
      <div className="menu-icon" onClick={toggleSlider}>
        ☰
      </div>
      <div className="nav-search">
        <input type="text" placeholder="Search......." />
      </div>
      <div className="profile-popup">
        {
          user ?
            <div onClick={() => setProfileDropDown(prev => !prev)} className="profile-logo">
              <p>{user.username.toUpperCase().slice(0, 1)}</p>
            </div> :
            <button onClick={() => setLoginOpen(true)} className="login-btn">
              Login
            </button>
        }

        {profileDropDown && (
          <div ref={dropdownRef} className="User-Profile-Dropdown show">
            <p>View Profile</p>
            <p>Settings</p>
            <p onClick={(e) => {
              localStorage.removeItem('habit token');
              // console.log('removed');
              setUser(null);
              fetchUserData();
              setProfileDropDown(prev => !prev)
            }}  >Log out</p>
          </div>
        )}


        {/* {
          user &&
          <div className="profile-logo">
            <p>{user.username.toUpperCase().slice(0, 1)}</p>
          </div>
        } */}
        {
          // !user ?
          //   <button onClick={() => setLoginOpen(true)} className="login-btn">
          //     Login
          //   </button> :
          //   <button onClick={(e) => {
          //     localStorage.removeItem('habit token');
          //     // console.log('removed');
          //     setUser(null);
          //     fetchUserData();
          //   }} className="login-btn">
          //     Log out
          //   </button>
        }
      </div>

      {/* Login Modal */}
      {isLoginOpen && <LoginModal setLoginOpen={setLoginOpen} onClose={() => setLoginOpen(false)} />}
    </div>
  );
}

export default Nav;
