import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  const fetchUserData = async () => {
    const getToken = localStorage.getItem("habit token");
    if (!getToken) {
      setLoading(false);
      return;
    }
    const userData = JSON.parse(atob(getToken.split(".")[1]));
    setUser(userData);
    setToken(getToken);
    setLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // ✅ Force a full reload when HMR updates this file
  if (import.meta.hot) {
    import.meta.hot.accept(() => {
      window.location.reload();
    });
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, token, fetchUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
