import React, { createContext, useState, useEffect } from "react";
import { url } from '@/URL/Url'

export const StreaXPContext = createContext();

export const StreaXPProvider = ({ children }) => {
  const [totalStreaXP, setTotalStreaXP] = useState([]);

  const fetchStreaXPData = async () => {
    const token = localStorage.getItem("habit token");
    try {
      const response = await fetch(`${url}/habit/totalStreaXP`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await response.json();
      // console.log(data.totalStreaAndXP);
      setTotalStreaXP(data.totalStreaAndXP);
    } catch (error) {
      console.error('Error deleting habits:', error);
    }
  };
  useEffect(() => {
    fetchStreaXPData();
  }, []);

  // ✅ Force a full reload when HMR updates this file
  if (import.meta.hot) {
    import.meta.hot.accept(() => {
      window.location.reload();
    });
  }

  return (
    <StreaXPContext.Provider value={{totalStreaXP, fetchStreaXPData}}>
      {children}
    </StreaXPContext.Provider>
  );
};