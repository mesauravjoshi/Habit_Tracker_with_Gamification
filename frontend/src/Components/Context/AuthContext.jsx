import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const getToken = localStorage.getItem("habit token");
      const userData = JSON.parse(atob(getToken.split('.')[1]));
      console.log(userData);
      setUser(userData);

      if (!getToken) {
        setLoading(false);
        return;
      }
      setToken(getToken);
    };

    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, token }}>
      {children}
    </AuthContext.Provider>
  );
};