import React, { useContext } from "react";
import { AuthContext } from "@/Context/AuthContext";

function LogOutModal({ setIsLogOutPopUpOpen }) {
  const { user, setUser, fetchUserData } = useContext(AuthContext);

  return (

    <div className="overlay">
      <div className="DeleteConfirmUI">
        <h2>Are you sure you want to log out?</h2>
        <br />
        <h3> Log out of TRACKER as {user && user.username}?</h3>
        <div className="deleteConfrim-footer">
          <button onClick={() => setIsLogOutPopUpOpen(false)}  >Cancel</button>
          <button onClick={() => {
            setIsLogOutPopUpOpen(false);
            localStorage.removeItem('habit token');
            setUser(null);
            fetchUserData();
          }}  >Log Out</button>
        </div>
      </div>
    </div>
  );
}

export default LogOutModal;