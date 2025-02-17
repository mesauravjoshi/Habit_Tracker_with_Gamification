import './StreakUpdate.css'

function StreakUpdate({ setStreakData, LastUpdate, LastDayForWeek, TargetDuration, StartedDate, index, streakData, Frequency }) {

  const markAsDone = async (habit) => {
    // console.log('inside fetch function', habit);
    const updatedData = {
      "IsCompleted": habit.IsCompleted,
      "StreakRecord": {
        "LastUpdate": habit.StreakRecord.LastUpdate,
        "TotalStreak": habit.StreakRecord.TotalStreak,
        "XPPoints": habit.StreakRecord.XPPoints,
      },
    }
    if (habit.Frequency === "Daily") {
      updatedData.TotalDaysCompleted = habit.TotalDaysCompleted;
    } else if (habit.Frequency === "Weekly") {
      updatedData.StreakRecord.LastDayForWeek = habit.StreakRecord.LastDayForWeek;
      updatedData.TotalWeeksCompleted = habit.TotalWeeksCompleted;
    }

    try {
      const response = await fetch(`http://localhost:3000/markAsDoneS/${habit._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',  // Make sure the server understands the data format
        },
        body: JSON.stringify(updatedData),  // Send data as JSON
      });

      if (response.ok) {
        const result = await response.json();
        // console.log("Habit updated successfully:", result);
      } else {
        const errorResponse = await response.json(); 
        console.error('Error:', errorResponse.messge);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const IsCompleted = (StartedDate, TargetDuration, Frequency) => {
    const startDate = new Date(StartedDate);
    const targetDate = new Date(TargetDuration);
    targetDate.setHours(0, 0, 0, 0);
    const timeDiff = targetDate - startDate;
    const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
  
    if (Frequency === "Weekly") {
      if (daysLeft > 0) return (Math.floor(daysLeft / 7) + 1);
    } else if (Frequency === "Daily") {
      if (daysLeft > 0) return daysLeft;
    }
  }

  const calculateWeekCompleted = (today,dayFrom) => {
    const diffInMillis = today - dayFrom;
    const weeksCompleted = (diffInMillis / (7 * 24 * 60 * 60 * 1000));
    // console.log('calculte week completed: ', Math.ceil(weeksCompleted));
    return Math.ceil(weeksCompleted);
  };

  const calculateUpcommingDay = (today,dayFrom) => {
    const startDayIndex = dayFrom.getDay();

    const previousDayIndex = (startDayIndex - 1 + 7) % 7;
    // Find upcoming day from today
    let upcomingDay = new Date(today);
    upcomingDay.setDate(today.getDate() + ((previousDayIndex - today.getDay() + 7) % 7 || 7));
    upcomingDay.setDate(upcomingDay.getDate() + 7);
    upcomingDay.setHours(0, 0, 0, 0);
    return upcomingDay;
  }

  const handleMarkAsDone = (index) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    today.toString();
    const dayFrom = new Date(StartedDate);
    const endDate = new Date(TargetDuration);
    endDate.setHours(0, 0, 0, 0);

    // Create a copy of streakData
    const updatedStreakData = [...streakData];
    // Get the current habit
    const habit = updatedStreakData[index];
    
    if (today >= dayFrom && today <= endDate) {
      if (Frequency === "Daily") {
        const last_date = new Date(habit.StreakRecord.LastUpdate);
        const timeDiff = today - last_date;
        const timeDiff_inDays = (Math.floor(timeDiff / (1000 * 60 * 60 * 24)));

        if (timeDiff_inDays > 1) {
          // reset streak to 1 and update the LastUpdate date
          habit.StreakRecord.TotalStreak = 1;
          habit.StreakRecord.XPPoints = 0;
        } else {
          // Increase the streak count and update the LastUpdate date
          habit.StreakRecord.TotalStreak += 1;
          habit.StreakRecord.XPPoints += 10;
        }
        habit.StreakRecord.LastUpdate = new Date().toString(); 

        const totalMilliseconds = today - dayFrom;
        const totalDays = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24));
        habit.TotalDaysCompleted = (totalDays + 1)
        if (IsCompleted(StartedDate, TargetDuration, Frequency) === habit.TotalDaysCompleted) {
          habit.IsCompleted = true;
        }
      }
      else if (Frequency === "Weekly") {

        const dayFrom = new Date(LastDayForWeek);
        dayFrom.setHours(0, 0, 0, 0);
        dayFrom.setDate(dayFrom.getDate() - 6);
        const endDate = new Date(LastDayForWeek);

        if (today >= dayFrom && today <= endDate || LastUpdate == '') {
          // console.log('between Start - end date', LastUpdate);
          habit.StreakRecord.TotalStreak += 1;
          habit.StreakRecord.XPPoints += 10;
          habit.StreakRecord.LastUpdate = String(today);
        }
        else if (today > endDate) {
          // console.log('2nd condition');
          habit.StreakRecord.TotalStreak = 1;
          habit.StreakRecord.XPPoints = 0;
          habit.StreakRecord.LastUpdate = String(today);
        }
        else {
          // console.log('user added streak before');
          return false
        }
        const upcommingDay = calculateUpcommingDay(today,dayFrom);
        // console.log('upcoming: ', upcommingDay);
        habit.StreakRecord.LastDayForWeek = String(upcommingDay);
        habit.TotalWeeksCompleted = calculateWeekCompleted(today,dayFrom);

        if (IsCompleted(StartedDate, TargetDuration, Frequency) === habit.TotalWeeksCompleted) {
          habit.IsCompleted = true
        }
      }
      else {
        console.log('Frequency is neither daily nor weekly ')
      }
      setStreakData(updatedStreakData);
      markAsDone(habit);
    }
  };

  // Function to check if the habit has been marked today
  const isMarkedToday = (lastUpdate, LastDayForWeek, TargetDuration, StartedDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dayFrom = new Date(StartedDate);
    dayFrom.setHours(0, 0, 0, 0);
    const endDate = new Date(TargetDuration);
    endDate.setHours(0, 0, 0, 0);
    const lastUpdateDate = new Date(lastUpdate);

    if (today >= dayFrom && today <= endDate) {
      if (Frequency === "Daily") {
        // const lastUpdateDate = new Date(lastUpdate);
        // const target_day = new Date(TargetDuration);
        const after_day_completed = today - endDate;
        const daysPassed = Math.floor(after_day_completed / (1000 * 60 * 60 * 24));

        if (daysPassed >= 1) {
          // console.log(daysPassed);
          return true
        }
        // Check if the date matches today's date
        return (
          // isDayLeft &&
          lastUpdateDate.getDate() === today.getDate() &&
          lastUpdateDate.getMonth() === today.getMonth() &&
          lastUpdateDate.getFullYear() === today.getFullYear()
        );
      }
      else if (Frequency === "Weekly") {
        // console.log('inside weekly');

        const dayFrom = new Date(LastDayForWeek);
        dayFrom.setDate(dayFrom.getDate() - 6);
        const endDate = new Date(LastDayForWeek);
        if (lastUpdate == '') {
          return false
        }

        if (today >= dayFrom && today <= endDate) {
          // console.log('between Start - end date',lastUpdate);
          if (lastUpdateDate >= dayFrom && lastUpdateDate <= endDate) {
            // console.log('user added streak before');
            return true
          }
          else {
            // console.log('not clicked yet');
            return false
          }
        } else if (today > endDate) {
          return false
        } else {  // console.log('else condition');
          return true
        }
      }
    } else {
      return true
    }
  };

  return (
    <div style={{ display: 'flex', gap: '13px' }}>
      <button
        className="StreakUpdate-button"
        onClick={() => handleMarkAsDone(index)} // Handle the "Mark as Done" button click
        disabled={isMarkedToday(LastUpdate, LastDayForWeek, TargetDuration, StartedDate)} // Disable button if marked today
      >
        ✅ Mark as Done</button>
    </div>
  );
}

export default StreakUpdate;