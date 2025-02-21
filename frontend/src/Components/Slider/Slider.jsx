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
            TRACKER
          </center>
        </h3>
      </div>
      <div className="Slider-list">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#f19c20"><path d="M166.99-105q-26.14 0-44.18-18.19t-18.04-44.17v-81.72L271.54-397v292H166.99Zm144.47 0v-166.77h337.08V-105H311.46Zm377 0v-341.86L508.69-606.69l126.08-111.85 199.56 177.43q10.28 9.57 15.59 21.58 5.31 12 5.31 25.58v326.77q0 26.1-18.24 44.14T792.69-105H688.46ZM104.77-303.23v-191.12q0-12.34 5.31-25.07t15.54-21.73l312.69-277.62q9-7.61 19.72-11.42 10.73-3.81 21.96-3.81 11.24 0 21.97 3.81 10.73 3.81 19.73 11.42l83.39 74.16-500.31 441.38Z" /></svg>
          <li>Home</li>
        </NavLink>
        <NavLink to="/habit" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#dc8a18"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q32 0 62-6t58-17l60 61q-41 20-86 31t-94 11Zm280-80v-120H640v-80h120v-120h80v120h120v80H840v120h-80ZM424-296 254-466l56-56 114 114 400-401 56 56-456 457Z" /></svg>
          <li>My Habit</li>
        </NavLink>
        <NavLink to="/track-streak" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#dc8a18"><path d="M124-124v-71.92l58.38-58.39V-124H124Zm163.85 0v-231.92l58.38-58.39V-124h-58.38Zm163.46 0v-290.31l58.38 59.39V-124h-58.38Zm163.84 0v-230.92l58.39-58.39V-124h-58.39Zm163.47 0v-391.92L837-574.31V-124h-58.38ZM124-357.54v-81.84l276-274.77 160 160 277-277.62v82.23L560-471.92l-160-160-276 274.38Z" /></svg>
          <li>Track Streak</li>
        </NavLink>
        <NavLink to="/completed" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#dc8a18"><path d="M480.07-78.67q-83.63 0-157.17-31.23-73.55-31.24-127.64-85.31-54.1-54.07-85.34-127.58-31.25-73.51-31.25-157.14 0-84.15 31.3-157.58t85.48-127.69q54.18-54.27 127.6-85.2 73.42-30.93 156.95-30.93 70.7 0 132.68 21.56 61.98 21.56 112.86 60.77l-48.28 48.8q-41.49-29.88-91.29-46.71-49.8-16.83-105.97-16.83-140.36 0-237.05 96.69T146.26-480q0 140.36 96.69 237.05T480-146.26q140.36 0 237.05-96.69T813.74-480q0-25.57-3.55-49.14t-11.06-46.6l53.79-54.18q13.6 35.11 21.01 72.5 7.4 37.39 7.4 77.6 0 83.82-30.92 157.01-30.92 73.18-85.16 127.36-54.24 54.18-127.64 85.48-73.4 31.3-157.54 31.3Zm-58.33-218.92L254.82-464.92l48.62-48.87 118.3 118.3 410.72-410.59 49.28 48.62-460 459.87Z" /></svg>
          <li>Completed</li>
        </NavLink>
        <NavLink to="/badges" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <svg xmlns="http://www.w3.org/2000/svg" height="28px" viewBox="0 -960 960 960" width="28px" fill="#dc8a18"><path d="M480-76.54 117-277.77v-404.46l363-201.23 363 201.23v404.46L480-76.54ZM363.92-593.69q22.85-23.77 52.96-36.54Q447-643 480-643t63.12 12.77q30.11 12.77 52.96 36.54L709.39-657 480-784.54 250.61-657l113.31 63.31ZM437-199.08v-123.61q-52.85-14.7-86.42-58.27Q317-424.54 317-480q0-9.15 1.08-19.31 1.07-10.15 3.84-19.31L203-584.92v255.69l234 130.15ZM480-403q32.62 0 54.81-22.19Q557-447.38 557-480q0-32.62-22.19-54.81Q512.62-557 480-557q-32.62 0-54.81 22.19Q403-512.62 403-480q0 32.62 22.19 54.81Q447.38-403 480-403Zm43 203.92 234-130.15v-255.69l-118.92 66.3q2.77 9.16 3.84 19.31Q643-489.15 643-480q0 55.46-33.58 99.04-33.57 43.57-86.42 58.27v123.61Z" /></svg>
          <li>Badges</li>
        </NavLink>
      </div>
    </div>
  )
}

export default Slider