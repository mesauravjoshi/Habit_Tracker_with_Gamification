import { Link } from "react-router-dom";
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
        <Link to='/' className="nav-link">
          <li>Home</li>
        </Link>
        <Link to="/habit" className="nav-link">
          <li>My Habit</li>
        </Link>
        <Link to="/track-streak" className="nav-link">
          <li>Track Streak</li>
        </Link>
        <Link to="/completed" className="nav-link">
          <li>Completed</li>
        </Link>
      </div>
    </div>
  )
}

export default Slider