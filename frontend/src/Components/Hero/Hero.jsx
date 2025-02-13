import { useState } from 'react';
import './Hero.css';

function Hero() {
  const ram = 'ram';  // this is the data you want to send to the backend
  
  const handleRam = async (e) => {
    try {
      const response = await fetch('http://localhost:3000/ram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Make sure the server understands the data format
        },
        body: JSON.stringify({ ram: ram }),  // Send data as JSON
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        const errorResponse = await response.json();
        console.error('Error:', errorResponse.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className="hero-title">
        <button onClick={handleRam}>Ram</button>
        <h1>
          Build Better Habits,<br />
          Build a Better Life :)
        </h1>
      </div>
    </>
  );
}

export default Hero;
