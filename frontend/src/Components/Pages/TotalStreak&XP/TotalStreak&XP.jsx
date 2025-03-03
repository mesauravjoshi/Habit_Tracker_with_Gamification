import React,{useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { StreaXPContext } from '../../Context/Strea&XPContext'
import './TotalStreak&XP.css'

function TotalStreakAndXP() {
    const { totalStreaXP } = useContext(StreaXPContext);
    const { user } = useContext(AuthContext); // Access user from context
    if (totalStreaXP) {
        console.log(totalStreaXP.totalStreak);
    } else{
        console.log('no');
        
    }
    totalStreaXP ? totalStreaXP.totalStreak : 0
    return (
        <>
            {
                user &&
                <div className='display-streak-XPPoints'>
                    <h3 >🔥Total Streak: {totalStreaXP ? totalStreaXP.totalStreak : 0} </h3>
                    <h3 >🎯 XP Points: {totalStreaXP ? totalStreaXP.totalxPPoints : 0}  </h3>
                </div>
            }
        </>
    )
}

export default TotalStreakAndXP

