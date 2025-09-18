import React, { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { StreaXPContext } from '../../Context/Strea&XPContext'
import './TotalStreak&XP.css'

function TotalStreakAndXP({heading}) {
    const { totalStreaXP } = useContext(StreaXPContext);
    const { user } = useContext(AuthContext); // Access user from context

    totalStreaXP ? totalStreaXP.totalStreak : 0
    return (
        <>
            <div className="TotalStreakAndXP md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl/7 font-bold sm:truncate sm:text-3xl sm:tracking-tight">
                        {heading}
                    </h2>
                </div>
                {
                    user &&
                    <div className="flex flex-col gap-y-2 md:mt-0 md:ml-4">
                        <h3 >🔥Total Streak: {totalStreaXP ? totalStreaXP.totalStreak : 0} </h3>
                        <h3 >🎯 XP Points: {totalStreaXP ? totalStreaXP.totalxPPoints : 0}  </h3>
                    </div>
                }
            </div>

            {
                // user &&
                // <div className='display-streak-XPPoints'>
                //     <h3 >🔥Total Streak: {totalStreaXP ? totalStreaXP.totalStreak : 0} </h3>
                //     <h3 >🎯 XP Points: {totalStreaXP ? totalStreaXP.totalxPPoints : 0}  </h3>
                // </div>
            }
        </>
    )
}

export default TotalStreakAndXP

