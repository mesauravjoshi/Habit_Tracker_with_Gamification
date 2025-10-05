import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from '@/Context/AuthContext';
import MainLayout from '@/Layouts/MainLayout';
import PlainLayout from '@/Layouts/PlainLayout';
import Home from '@/Pages/Home/Home';
import Auth from '@/Pages/Auth/Auth';
import Setting from '@/Pages/Setting/Seting';
import { useContext } from "react";

import Habit from "@/Pages/AddHabit/Habit";
import Streak from "@/Components/Streak/Streak";
import Archive from "@/Pages/Archive/Archive";
import Completed from "@/Pages/Completed/Completed";
import Badges from "@/Pages/Badges/Badges";
import { Outlet } from "react-router-dom";

function App() {
  const { token } = useContext(AuthContext);

  const PrivateRoutes = () => {
    return token ? <Outlet /> : <Navigate to="/home" />;
  };

  return (
    <Routes>
      {/* Public Routes (MainLayout) */}
      <Route path="/auth" element={<Auth />} />
      <Route element={<MainLayout />}>
        {/* <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} /> */}

        {/* Protected Routes (MainLayout) */}
        <Route element={<PrivateRoutes />}>
          <Route path="/habit" element={<Habit />} />
          <Route path="/track-streak" element={<Streak />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/badges" element={<Badges />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
      </Route>

      {/* Routes with PlainLayout (No Slider/Nav) */}
      <Route element={<PlainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default App;