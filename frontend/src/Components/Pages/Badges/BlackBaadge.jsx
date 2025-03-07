import React from 'react';
import './BlankBaadge.css';

function BlankBadge() {
  return (
    <div className="loading-Badge">
      <div className="loading-Badge-card">
        <div className="loading-badge-header">
          <h3></h3>
        </div>
        <span className="loading-badge-Frequency"></span>
        <div className="loading-badge-details">
          <p></p>
          <p></p>
          <p></p>
        </div>
        <div className="loading-badge-footer">
          <span className="loading-plus-text"></span>
          <span className="loading-XP-text"><br /></span>
        </div>
      </div>
    </div>
  );
}

export default BlankBadge;
