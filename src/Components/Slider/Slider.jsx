import { useState } from 'react'
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
      <li>Home</li>
      <li>My Habit</li>
      <li>Track Streak</li>
      <li>Completed</li>
    </div>   
    </div>
  )
}

export default Slider