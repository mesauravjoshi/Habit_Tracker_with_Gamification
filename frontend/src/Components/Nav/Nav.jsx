import { useState } from 'react'
import './Nav.css'
function Nav({ toggleSlider }) {

  return (
    <div className='nav'>
      <div className="menu-icon" onClick={toggleSlider}>
        ☰  {/* Three-line menu icon */}
      </div>
      <div className="nav-list">
      <input type="text" />
      </div>
      <div>
          <button> Login </button>    
      </div>      
      
    </div>
  )
}

export default Nav
