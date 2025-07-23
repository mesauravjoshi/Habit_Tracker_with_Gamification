import React, { useState, useContext, useEffect, useRef } from "react";
import { ProfileIcon, SettingIcon, SignoutIcon, SigninIcon } from "../../assets/Icons/Icons";
import LoginModal from "./LoginModal";
import LogOutPopUp from "./LogOutPopUp";
import "./Nav.css";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from 'react-router-dom';
import TestModalJoshi from "../Pages/Hero/TestModalJoshi";
import { Link } from "react-router-dom";

function Nav({ toggleSlider }) {
  const { user } = useContext(AuthContext); // Access user from context
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [profileDropDown, setProfileDropDown] = useState(false);
  const [isLogOutPopUpOpen, setIsLogOutPopUpOpen] = useState(false);
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
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
        {/* <input type="text" placeholder="Search......." /> */}
      </div>
      <div className="profile-popup">
        {
          user ?
            <div onClick={() => setProfileDropDown(prev => !prev)} className="profile-logo">
              <p>{user.username.toUpperCase().slice(0, 1)}</p>
            </div> :
            <button onClick={() => {
              // navigate('/login');
              setLoginOpen(true)
              // setOpen(true)
            }} className="login-btn">
              Login
            </button>
        }
        {/* <TestModalJoshi
          open={open} setOpen={setOpen}
        /> */}

        {profileDropDown && (
          <div
            ref={dropdownRef}
            className={`absolute right-4 top-12 z-10 bg-[rgba(40,40,50,0.9)] backdrop-blur-md p-1 rounded-xl w-[170px] shadow-[0_8px_24px_rgba(0,0,0,0.2)] transform transition-all duration-300 ${profileDropDown ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-90 opacity-0 pointer-events-none'
              } before:content-[''] before:absolute before:-top-2 before:right-3 before:w-3 before:h-3 before:bg-[rgba(40,40,50,0.9)] before:rotate-45`}
          >
            <p className="flex items-center gap-3 text-sm p-2 rounded-md text-white hover:bg-white/10 cursor-pointer">
              <ProfileIcon />
              View Profile
            </p>
            <Link to="/setting">
              <p className="flex items-center gap-3 text-sm p-2 rounded-md text-white hover:bg-white/10 cursor-pointer">
                <SettingIcon />
                Settings
              </p>
            </Link>
            <p
              onClick={() => {
                setProfileDropDown(prev => !prev);
                setIsLogOutPopUpOpen(true);
              }}
              className="flex items-center gap-3 text-sm p-2 rounded-md text-white hover:bg-white/10 cursor-pointer"
            >
              <SignoutIcon />
              Log out
            </p>
            <p
              onClick={() => setLoginOpen(true)}
              className="flex items-center gap-3 text-sm p-2 rounded-md text-white hover:bg-white/10 cursor-pointer"
            >
              <SigninIcon />
              Sign In
            </p>
          </div>

        )}
        {
          isLogOutPopUpOpen &&
          <LogOutPopUp setIsLogOutPopUpOpen={setIsLogOutPopUpOpen} />
        }
      </div>

      {/* Login Modal */}
      {isLoginOpen && <LoginModal setLoginOpen={setLoginOpen} onClose={() => setLoginOpen(false)} />}
    </div>
  );
}

export default Nav;
