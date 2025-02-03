import Nav from '../../Nav/Nav';
import Slider from '../../Slider/Slider';
import Habit from './Components/Pages/Habit/Habit';
import Home from './Components/Pages/Home/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function MarkHabit() {

  return (
    <>
      <Slider/>
      <Nav/>
      <div className="MarkHabit">
        <h1>My habits</h1>
      </div>
    </>
  )
}

export default MarkHabit
