import { NavLink } from "react-router-dom";
import './Slider.css'
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
            Tracker
          </center>
        </h3>
      </div>
      <div className="Slider-list">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <li>Home</li>
        </NavLink>
        <NavLink to="/habit" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <li>My Habit</li>
        </NavLink>
        <NavLink to="/track-streak" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <li>Track Streak</li>
        </NavLink>
        <NavLink to="/completed" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <li>Completed</li>
        </NavLink>
        <NavLink to="/badges" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <li>Badges</li>
        </NavLink>
      </div>
    </div>
  )
}

export default Slider