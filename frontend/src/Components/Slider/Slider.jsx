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