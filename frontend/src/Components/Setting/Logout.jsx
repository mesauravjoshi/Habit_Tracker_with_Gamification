import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

export default function Logout() {
  const { setUser, fetchUserData } = useContext(AuthContext);

  return (
    <div className="flex flex-col items-end p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-lg font-semibold text-yellow-600">
        Log out of this session?
      </h2>
      <p className="text-sm">
        Clicking “Logout” will end your current session and you’ll need to sign in again to continue.
      </p>
      <button
        className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition"
        onClick={() => {
          console.log("outing now......");
          localStorage.removeItem("habit token");
          setUser(null);
          fetchUserData();
          window.location.reload(); // Or: navigate("/")
        }}
      >
        Logout
      </button>
    </div>
  );
}
