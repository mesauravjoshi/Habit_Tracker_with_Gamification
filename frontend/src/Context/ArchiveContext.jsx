import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "@/api/axiosInstance";

export const ArchiveContext = createContext();

export const ArchiveProvider = ({ children }) => {
  const [archiveHabits, setArchiveHabits] = useState([]);

  const fetchArchivePData = async () => {
    const token = localStorage.getItem("habit token");
    try {
      const res = await axiosInstance.get("/archive/archive");

      if (res.data) {
        // console.log(res.data);
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