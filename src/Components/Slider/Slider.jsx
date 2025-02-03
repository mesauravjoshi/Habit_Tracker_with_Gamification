import { useState } from 'react'
import { Link } from "react-router-dom";
import './Slider.css'
function Slider() {

  return (
    <div className='Slider'>
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
         <Link to="/" className="nav-link">
          <li>Completed</li>
        </Link>
      </div>
    </div>
  )
}

export default Slider