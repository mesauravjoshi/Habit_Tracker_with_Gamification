import './StreakUpdate.css'

function StreakUpdate({ setStreakData, LastUpdate, LastDayForWeek, TargetDuration, StartedDate, index, streakData, Frequency }) {

  const handleMarkAsDone = (index) => {
    const today = new Date();
    const dayFrom = new Date(StartedDate);
    const endDate = new Date(TargetDuration);
    // console.log(today);
    // console.log(dayFrom);
    // console.log(endDate);
    if (today >= dayFrom && today <= endDate) {
      // console.log('work');
    }
    if (Frequency === "Daily") {
      // Create a copy of streakData
      const updatedStreakData = [...streakData];
      // Get the current habit
      const habit = updatedStreakData[index];

      const today = new Date();

      const last_date = new Date(habit.StreakRecord.LastUpdate);

      // Calculate difference in time (in milliseconds)
      const timeDiff = today - last_date;
      const timeDiff_inDays = (Math.floor(timeDiff / (1000 * 60 * 60 * 24)));

      if (timeDiff_inDays > 1) {
        // reset streak to 1 and update the LastUpdate date
        habit.StreakRecord.TotalStreak = 1;
        habit.StreakRecord.LastUpdate = new Date().toString(); // Update to today's date
        // console.log(updatedStreakData);
        setStreakData(updatedStreakData);

      } else {
        // Increase the streak count and update the LastUpdate date
        habit.StreakRecord.TotalStreak += 1;
        habit.StreakRecord.LastUpdate = new Date().toString(); // Update to today's date

        // Set the updated streak data back to state
        setStreakData(updatedStreakData);
      }

      const start_date = new Date(habit.StartedDate);
      const totalMilliseconds = today - start_date;

      // Convert milliseconds to days (1000ms * 60s * 60m * 24h)
      const totalDays = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24));
      // const update_TotalDaysCompleteds = 
      habit.TotalDaysCompleted = (totalDays + 1)
      setStreakData(updatedStreakData);

      localStorage.setItem('Habit Track', JSON.stringify(streakData));
    }
    else if (Frequency === "Weekly") {
      console.log('You click on weekly');

      // Create a copy of streakData
      const updatedStreakData = [...streakData];
      // Get the current habit
      const habit = updatedStreakData[index];

      const today = new Date();

      const dayFrom = new Date(LastDayForWeek);
      dayFrom.setDate(dayFrom.getDate() - 7);
      const endDate = new Date(LastDayForWeek);
      console.log(today);
      console.log(dayFrom);
      console.log(endDate);

      if (today >= dayFrom && today <= endDate || LastUpdate == '') {
        console.log('between Start - end date', LastUpdate);
        // Increase the streak count and update the LastUpdate date
        const change_dayFrom = new Date(habit.StreakRecord.LastDayForWeek);
        change_dayFrom.setDate(change_dayFrom.getDate() + 7);

        habit.StreakRecord.LastDayForWeek = String(change_dayFrom)
        habit.StreakRecord.TotalStreak += 1;
        habit.StreakRecord.LastUpdate = today
        setStreakData(updatedStreakData);
        localStorage.setItem('Habit Track', JSON.stringify(streakData));
        console.log(streakData);
        return
      } else {
        console.log('user added streak before');
        return false
      }
    }
    else {
      alert('Frequency is neither daily nor weekly ')
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

    if (today >= dayFrom && today <= endDate) {
      if (Frequency === "Daily") {
        // console.log('daily');
        const lastUpdateDate = new Date(lastUpdate);
        const today = new Date();
        // console.log(lastUpdateDate.getDate() === today.getDate());

        const target_day = new Date(TargetDuration);
        const after_day_completed = today - target_day;
        const daysPassed = Math.floor(after_day_completed / (1000 * 60 * 60 * 24));
        // Check if days Passed from TargetDuration to today then return false & make button disable
        if (daysPassed >= 1) {
          console.log(daysPassed);
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
        const today = new Date();
        const dayFrom = new Date(LastDayForWeek);
        dayFrom.setDate(dayFrom.getDate() - 7);
        const endDate = new Date(LastDayForWeek);
        // console.log(today);
        // console.log(dayFrom);
        // console.log(endDate);
        if (lastUpdate == '') {
          // console.log('Empty last update');
          return false
        }
        // console.log(lastUpdate);

        if (today >= dayFrom && today <= endDate) {
          // console.log('between Start - end date');
          if (lastUpdate >= dayFrom && lastUpdate <= endDate) {
            console.log('not clicked yet');
            return true
          }
          else {
            // console.log('user added streak before');
            return false
          }
        } else {
          // console.log('not');
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
      // disabled={true}
      >
        ✅ Mark as Done</button>
    </div>
  );
}

export default StreakUpdate;