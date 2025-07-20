// Components/Layout/MainLayout.jsx
import { useState } from 'react';
import Slider from './Components//Slider/Slider';
import Nav from './Components/Nav/Nav';
import { BrowserRouter as Outlet } from "react-router-dom";

export default function MainLayout() {
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  const toggleSlider = () => {
    setIsSliderOpen(!isSliderOpen);
  };

  return (
    <>
      <Slider isOpen={isSliderOpen} closeSlider={toggleSlider} />
      <Nav toggleSlider={toggleSlider} />
      <div className="main-content">
        <Outlet />
      </div>
    </>
  );
}
