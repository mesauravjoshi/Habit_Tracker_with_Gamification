import './StreakUpdate.css'

function StreakUpdate({ setStreakData, LastUpdate, LastDayForWeek, TargetDuration, StartedDate, index, streakData, Frequency }) {

  const IsConmpleted = (StartedDate,TargetDuration,Frequency) => {
    const startDate = new Date(StartedDate);
    console.log(startDate);
    const targetDate = new Date(TargetDuration);
    targetDate.setHours(0, 0, 0, 0);
    console.log(targetDate);
    const timeDiff = targetDate - startDate ;
    const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;

    // console.log(Math.floor(daysLeft / 7) + 1);
    // console.log(daysLeft);
    if (Frequency === "Weekly") {
      if (daysLeft > 0) return (Math.floor(daysLeft / 7) + 1);
    } else if(Frequency === "Daily"){
      if (daysLeft > 0) return daysLeft;
    }
  }

  const calculateWeekCompleted = (StartedDate) => {
    // Convert the StartedDate string to a Date object
    const startDate = new Date(StartedDate);

    // Get today's date
    const today = new Date();
    const diffInMillis = today - startDate;

    // Convert milliseconds to weeks (1 week = 7 days = 7 * 24 * 60 * 60 * 1000 milliseconds)
    const weeksCompleted = (diffInMillis / (7 * 24 * 60 * 60 * 1000));
    return Math.ceil(weeksCompleted);
  };

  const calculateUpcommingDay = (StartedDate) => {
    const startDate = new Date(StartedDate);
    const today = new Date();

    // Get the day index (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const startDayIndex = startDate.getDay();

    // Calculate the previous day index
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

    if (today >= dayFrom && today <= endDate) {
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

        const totalDays = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24));
        // const update_TotalDaysCompleteds = 
        habit.TotalDaysCompleted = (totalDays + 1)
        // console.log(IsConmpleted(StartedDate,Frequency))
        if (IsConmpleted(StartedDate,TargetDuration,Frequency) === habit.TotalDaysCompleted ) {
          habit.IsConmpleted = true
        }
        setStreakData(updatedStreakData);
        localStorage.setItem('Habit Track', JSON.stringify(streakData));
      }
      else if (Frequency === "Weekly") {

        // Create a copy of streakData
        const updatedStreakData = [...streakData];
        // Get the current habit
        const habit = updatedStreakData[index];
        // const today = new Date();
        const dayFrom = new Date(LastDayForWeek);
        dayFrom.setHours(0, 0, 0, 0);
        dayFrom.setDate(dayFrom.getDate() - 6);
        const endDate = new Date(LastDayForWeek);
        // endDate.setHours(0, 0, 0, 0);

        // return
        if (today >= dayFrom && today <= endDate || LastUpdate == '') {
          // console.log('between Start - end date', LastUpdate);
          habit.StreakRecord.TotalStreak += 1;
          habit.StreakRecord.LastUpdate = String(today);
          setStreakData(updatedStreakData);
        }
        else if (today > endDate) {
          // console.log('2nd condition');
          habit.StreakRecord.TotalStreak = 1;
          habit.StreakRecord.LastUpdate = String(today);
        }
        else {
          // console.log('user added streak before');
          return false
        }
        const upcommingDay = calculateUpcommingDay(StartedDate);
        // console.log('upcoming: ', upcommingDay);
        habit.StreakRecord.LastDayForWeek = String(upcommingDay);

        habit.TotalWeeksCompleted = calculateWeekCompleted(StartedDate);
        // habit.TotalWeeksCompleted += 1;
        if (IsConmpleted(StartedDate,TargetDuration,Frequency) === habit.TotalWeeksCompleted ) {
          habit.IsConmpleted = true
        }
        setStreakData(updatedStreakData);
        // console.log(streakData);
        localStorage.setItem('Habit Track', JSON.stringify(streakData));
      }
      else {
        console.log('Frequency is neither daily nor weekly ')
      }
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
        const lastUpdateDate = new Date(lastUpdate);
        const today = new Date();

        const target_day = new Date(TargetDuration);
        const after_day_completed = today - target_day;
        const daysPassed = Math.floor(after_day_completed / (1000 * 60 * 60 * 24));
        // Check if days Passed from TargetDuration to today then return false & make button disable
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
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dayFrom = new Date(LastDayForWeek);
        dayFrom.setDate(dayFrom.getDate() - 6);
        const endDate = new Date(LastDayForWeek);
        if (lastUpdate == '') {
          return false
        }

        if (today >= dayFrom && today <= endDate) {
          // console.log('between Start - end date',lastUpdate);
          const compare_LastUpdate = new Date(lastUpdate)
          // console.log(compare_LastUpdate);
          if (compare_LastUpdate >= dayFrom && compare_LastUpdate <= endDate) {
            // console.log('user added streak before');
            return true
          }
          else {
            // console.log('not clicked yet');
            return false
          }
        } else if (today > endDate) {
          return false
        } else {
          // console.log('else condition');
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