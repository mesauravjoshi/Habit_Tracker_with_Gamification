import { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import Slider from "../Components/Slider/Slider";
import Nav from "../Components/Nav/Nav";
import "../App.css";

export default function MainLayout() {
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const toggleSlider = () => {
    setIsSliderOpen(!isSliderOpen);
  };
  return (
    <div className="track-app">
      <Slider isOpen={isSliderOpen} closeSlider={toggleSlider} />
      <Nav toggleSlider={toggleSlider} />
      <Outlet /> {/* Renders child routes here */}
    </div>
  );
}