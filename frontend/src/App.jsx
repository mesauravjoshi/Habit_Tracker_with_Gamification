import { useState } from "react";
import "./App.css";
import Habit from "./Components/Pages/Habit/Habit";
import Home from "./Components/Pages/Home/Home";
import Streak from "./Components/Pages/Streak/Streak";
import Slider from "./Components/Slider/Slider";
import Nav from "./Components/Nav/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Completed from "./Components/Pages/Completed/Completed";
import Badges from "./Components/Pages/Badges/Badges";
import { AuthProvider } from "./Components/Context/AuthContext";

function App() {
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  const toggleSlider = () => {
    setIsSliderOpen(!isSliderOpen);
  };

  return (
    <>
      <div className="track-app">
      <Router>
  <AuthProvider>
    <Slider isOpen={isSliderOpen} closeSlider={toggleSlider} />
    <Nav toggleSlider={toggleSlider} />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/habit" element={<Habit />} />
      <Route path="/track-streak" element={<Streak />} />
      <Route path="/completed" element={<Completed />} />
      <Route path="/badges" element={<Badges />} />
    </Routes>
  </AuthProvider>
</Router>

      </div>
    </>
  );
}

export default App;
