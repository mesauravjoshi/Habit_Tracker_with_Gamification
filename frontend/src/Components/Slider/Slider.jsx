// import { useEffect, useRef } from "react";
// import { NavLink } from "react-router-dom";
// import './Slider.css'
// import { Home, AddHabit, TrackHabit, Archive, Completed, Badges } from "./SliderIcon";

// const navigation = [
//   {
//     name: "Home",
//     to: "/",
//     icon: Home,
//   },
//   {
//     name: "Add Habit",
//     to: "/habit",
//     icon: AddHabit,
//   },
//   {
//     name: "Track Streak",
//     to: "/track-streak",
//     icon: TrackHabit,
//   },
//   {
//     name: "Archive",
//     to: "/archive",
//     icon: Archive,
//   },
//   {
//     name: "Completed",
//     to: "/completed",
//     icon: Completed,
//   },
//   {
//     name: "Badges",
//     to: "/badges",
//     icon: Badges,
//   },
// ];

// function Slider({ isOpen, closeSlider }) {

//   const sliderRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (sliderRef.current && !sliderRef.current.contains(event.target)) {
//         closeSlider();
//       }
//     };

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isOpen, closeSlider]);

//   return (
//     <div ref={sliderRef} className={`Slider show-slider ${isOpen ? "show" : ""}`}>

//       <div className="slider-header">
//         <h3>TRACKER</h3>
//         <div className="close-icon" onClick={closeSlider}>
//           ✖
//         </div>
//       </div>

//       <div className="">
//         {navigation.map((item) => (
//           <NavLink
//             key={item.to}
//             to={item.to}
//             className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
//           >
//             <item.icon />
//             <li>{item.name}</li>
//           </NavLink>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default Slider