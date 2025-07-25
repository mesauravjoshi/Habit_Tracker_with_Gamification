import React, { createContext, useState, useEffect } from "react";
import { url } from '../../URL/Url'
import axios from "axios";
export const ArchiveContext = createContext();

export const ArchiveProvider = ({ children }) => {
  const [archiveHabits, setArchiveHabits] = useState([]);

  const fetchArchivePData = async () => {
    const token = localStorage.getItem("habit token");
    try {
      // const response = await fetch(`${url}/archive/archive`, {
      //   method: 'GET',
      //   headers: {
      //     "Content-Type": "application/json",
      //     "Authorization": `Bearer ${token}`
      //   }
      // });
      // const data = await response.json();
      const res = await axios.get(`${url}/archive/archive`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.data) {
        setArchiveHabits(res.data.map(habit => habit.habitId));
      }
      // console.log(res);
    } catch (error) {
      console.error('Error Fetching Archive habits:', error.message);
    }
  };

  useEffect(() => {
    fetchArchivePData();
  }, []);

  // ✅ Force a full reload when HMR updates this file
  if (import.meta.hot) {
    import.meta.hot.accept(() => {
      window.location.reload();
    });
  }

  return (
    <ArchiveContext.Provider value={{ archiveHabits, fetchArchivePData }}>
      {children}
    </ArchiveContext.Provider>
  );
};