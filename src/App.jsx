import { useState } from 'react'
import './App.css'
import Nav from './Components/Nav/Nav'
import Hero from './Components/Hero/Hero'
import Slider from './Components/Slider/Slider'

function App() {

  return (
    <>
    <div className="track-app">
      <Slider/>
      <Nav/>
      <Hero/>
      {/* <div style={{border: '1px solid white'}} className="one">One</div>
      <div style={{border: '1px solid white'}} className="two">two</div>
      <div style={{border: '1px solid white'}} className="three">three</div> */}
    </div>
    </>
  )
}

export default App
