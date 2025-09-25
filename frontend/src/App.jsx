import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from './Components/Context/AuthContext';
import MainLayout from './Layouts/MainLayout';
import PlainLayout from './Layouts/PlainLayout';
import Home from './Components/Pages/Home/Home';
import Login from './Components/Nav/Login';
import Setting from './Components/Setting/Seting';
import { useContext } from "react";

import Habit from "./Components/Pages/AddHabit/Habit";
import Streak from "./Components/Pages/Streak/Streak";
import Archive from "./Components/Pages/Archive/Archive";
import Completed from "./Components/Pages/Completed/Completed";
import Badges from "./Components/Pages/Badges/Badges";
import { Outlet } from "react-router-dom";

function App() {
  const { token } = useContext(AuthContext);

  const PrivateRoutes = () => {
    return token ? <Outlet /> : <Navigate to="/home" />;
  };

  return (
    <Routes>
      {/* Public Routes (MainLayout) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/home" element={<Home />} />

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
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default App;