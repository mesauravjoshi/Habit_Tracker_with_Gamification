import { NavLink } from "react-router-dom";
import './Slider.css'
import { Home, AddHabit, TrackHabit, Archive, Completed, Badges } from "./SliderIcon";
function Slider({ isOpen, closeSlider }) {

  return (
    <div className={`Slider show-slider ${isOpen ? "show" : ""}`}>

      {/* <div className={`Slider ${isOpen ? "show-slider" : ""}`}> */}
      <div className="close-container">
        <div className="close-icon" onClick={closeSlider}>
          ✖ {/* Close button */}
        </div>
      </div>
      <div className='logo'>
        <h3>
          <center>
            TRACKER
          </center>
        </h3>
      </div>
      <div className="Slider-list">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <Home />
          <li>Home</li>
        </NavLink>
        <NavLink to="/habit" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <AddHabit />
          <li>My Habit</li>
        </NavLink>
        <NavLink to="/track-streak" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <TrackHabit />
          <li>Track Streak</li>
        </NavLink>
        <NavLink to="/archive" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <Archive />
          <li>Archive</li>
        </NavLink>
        <NavLink to="/completed" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <Completed />
          <li>Completed</li>
        </NavLink>
        <NavLink to="/badges" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <Badges />
          <li>Badges</li>
        </NavLink>
      </div>
    </div>
  )
}

export default Slider