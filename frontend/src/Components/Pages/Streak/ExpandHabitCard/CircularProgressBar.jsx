import { useState, useEffect } from "react";
import "./CircularProgressBar.css";

function CircularProgressBar({ progress }) {
  const [offset, setOffset] = useState(251); // 251 is the full circumference

  useEffect(() => {
    const progressOffset = 251 - (251 * progress) / 100; // Calculate progress offset
    setOffset(progressOffset);
  }, [progress]);

  return (
    <div className="progress-circle-container">
      <svg className="progress-svg" width="100" height="100" viewBox="0 0 100 100">
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff416c" />
            <stop offset="100%" stopColor="#ff4b2b" />
          </linearGradient>
        </defs>

        {/* Background Circle */}
        <circle className="progress-bg" cx="50" cy="50" r="40" />

        {/* Progress Circle */}
        <circle
          className="progress-bar"
          cx="50"
          cy="50"
          r="40"
          style={{ strokeDashoffset: offset }}
        />
      </svg>

      {/* Progress Percentage */}
      <div className="progress-text">{progress}%</div>
    </div>
  );
}

export default CircularProgressBar;
