import React, { useEffect, useState, useContext } from 'react';
import { url } from '../../../URL/Url';
import './Archive.css'
import { AuthContext } from '../../Context/AuthContext';

function Archive() {
  const { user, token } = useContext(AuthContext); // Access user from context

  useEffect(() => {
    const fethcArchivedHabit = async () => {
      if (!token || user === null) {
        console.log("No token found, user is not logged in");
        return;
      }
      try {
        const response = await fetch(`${url}/archive/archive`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Include JWT token
          }
        });
        const data = await response.json();
        // setAllBadges(data.filter(item => (item.BadgeRecord.Badge != '')));
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    }
    fethcArchivedHabit();
  }, [user])

  return (
    <>
      <div className='Badge'>
        <center>
          <h2>Badge</h2>
        </center>
        {
          user ?
            <div className='Badge-container'>
              <h1>Archibved habit</h1>
            </div> :
            <p>Please login first </p>
        }
      </div>
    </>
  )
}

export default Archive