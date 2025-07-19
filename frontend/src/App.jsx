import { useState, useContext } from "react";
import "./App.css";
import Habit from "./Components/Pages/AddHabit/Habit";
import Home from "./Components/Pages/Home/Home";
import Streak from "./Components/Pages/Streak/Streak";
import Archive from "./Components/Pages/Archive/Archive";
import Slider from "./Components/Slider/Slider";
import Nav from "./Components/Nav/Nav";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Completed from "./Components/Pages/Completed/Completed";
import Badges from "./Components/Pages/Badges/Badges";
import { AuthContext } from './Components/Context/AuthContext';
import LoginModal from "./Components/Nav/LoginModal";

function App() {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const { token } = useContext(AuthContext);

  const toggleSlider = () => {
    setIsSliderOpen(!isSliderOpen);
  };

  const PrivateRoutes = () => {
    // Authenticate token first 
    if (token) {
      console.log('outlet');
      return <Outlet />
    } else {
      console.log('nav /home');
      return <Navigate to="/home" />
    }
    // return token ? <Outlet /> : <Navigate to="/home" />;
  }

  return (
    <>
      <div className="track-app">
        <Router>
          <Slider isOpen={isSliderOpen} closeSlider={toggleSlider} />
          <Nav toggleSlider={toggleSlider} />

          <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginModal />} />

            {/* 🔁 Catch-all route to handle undefined paths */}
            <Route path="*" element={<Navigate to="/home" />} />

            <Route element={<PrivateRoutes />} >
              <Route path="/habit" element={<Habit />} />
              <Route path="/track-streak" element={<Streak />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/completed" element={<Completed />} />
              <Route path="/badges" element={<Badges />} />
            </Route>
          </Routes>
        </Router>

      </div>
    </>
  );
}

export default App;
