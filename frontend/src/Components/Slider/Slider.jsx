import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import './Slider.css'
import { Home, AddHabit, TrackHabit, Archive, Completed, Badges } from "./SliderIcon";
function Slider({ isOpen, closeSlider }) {

  const sliderRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sliderRef.current && !sliderRef.current.contains(event.target)) {
        closeSlider();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeSlider]);

  return (
    <div ref={sliderRef} className={`Slider show-slider ${isOpen ? "show" : ""}`}>

      <div className="slider-header">
        <h3>TRACKER</h3>
        <div className="close-icon" onClick={closeSlider}>
          ✖
        </div>
      </div>

      <div className="Slider-list">
        {/* 1. Home  */}
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <Home />
          <li>Home</li>
        </NavLink>

        {/* 2. Add Habits  */}
        <NavLink to="/habit" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <AddHabit />
          <li>Add Habit</li>
        </NavLink>

        {/* 3. Track Streak  */}
        <NavLink to="/track-streak" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <TrackHabit />
          <li>Track Streak</li>
        </NavLink>

        {/* 4. Archive  */}
        <NavLink to="/archive" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <Archive />
          <li>Archive</li>
        </NavLink>

        {/* 5. Completed  */}
        <NavLink to="/completed" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <Completed />
          <li>Completed</li>
        </NavLink>

        {/* 6. Badges  */}
        <NavLink to="/badges" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <Badges />
          <li>Badges</li>
        </NavLink>
      </div>
    </div>
  )
}

export default Slider