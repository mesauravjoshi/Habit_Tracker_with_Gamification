import './App.css'
import Habit from './Components/Pages/Habit/Habit';
import Home from './Components/Pages/Home/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Streak from './Components/Pages/Streak/Streak';

function App() {

  return (
    <>
      <div className="track-app">
        <Router>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/habit" element={<Habit/>} />
            <Route path="/track-streak" element={<Streak/>} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
