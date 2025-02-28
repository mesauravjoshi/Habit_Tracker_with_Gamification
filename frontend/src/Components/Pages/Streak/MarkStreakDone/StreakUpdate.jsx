import { url } from '../../../../URL/Url';
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
      "BadgeRecord": {
        "AchievedOn": habit.BadgeRecord.AchievedOn,
        "Badge": habit.BadgeRecord.Badge,
        "StreakDuration": habit.BadgeRecord.StreakDuration
      },
    }
    if (habit.Frequency === "Daily") {
      updatedData.TotalDaysCompleted = habit.TotalDaysCompleted;
    } else if (habit.Frequency === "Weekly") {
      updatedData.StreakRecord.LastDayForWeek = habit.StreakRecord.LastDayForWeek;
      updatedData.TotalWeeksCompleted = habit.TotalWeeksCompleted;
    }
    try {
      const token = localStorage.getItem('habit token');
      const response = await fetch(`${url}/habit/markAsDone/${habit._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}` // Include JWT token
        },
        body: JSON.stringify(updatedData),
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
    // console.log('ISCOMPLETED', targetDate);
    // console.log(daysLeft);

    if (Frequency === "Weekly") {
      // console.log('ISCOMPLETED', (Math.ceil(daysLeft / 7)));
      if (daysLeft > 0) return (Math.ceil(daysLeft / 7));
    } else if (Frequency === "Daily") {
      if (daysLeft > 0) return daysLeft;
    }
  }

  const calculateWeekCompleted = (today, StartedDate) => {
    const startDate = new Date(StartedDate);
    // console.log(startDate);
    // console.log(today);

    const diffInMillis = today - startDate;
    const daysCompleted = Math.floor(diffInMillis / (1000 * 60 * 60 * 24)) + 1;
    const weeksCompleted = (daysCompleted / 7);
    // console.log('calculte week completed: ', Math.ceil(weeksCompleted));
    if (Math.ceil(weeksCompleted) > 0) {
      // console.log(Math.ceil(weeksCompleted));
      return Math.ceil(weeksCompleted);
    } else {
      return 1;
    }
  };

  const calculateUpcommingDay = (today, dayFrom) => {
    const startDayIndex = dayFrom.getDay();

    const previousDayIndex = (startDayIndex - 1 + 7) % 7;
    // Find upcoming day from today
    let upcomingDay = new Date(today);
    upcomingDay.setDate(today.getDate() + ((previousDayIndex - today.getDay() + 7) % 7 || 7));
    upcomingDay.setDate(upcomingDay.getDate() + 7);
    upcomingDay.setHours(0, 0, 0, 0);
    return upcomingDay;
  }

  const handleMarkAsDone = (event,index) => {
    event.stopPropagation(); // Prevents event from bubbling up

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
        last_date.setHours(0, 0, 0, 0);
        const timeDiff = today - last_date;
        const timeDiff_inDays = (Math.floor(timeDiff / (1000 * 60 * 60 * 24)));
        // console.log(today);
        // console.log(last_date);

        // console.log(timeDiff_inDays);
        if (timeDiff_inDays > 1) {
          // reset streak to 1 and update the LastUpdate date
          habit.StreakRecord.TotalStreak = 1;
        } else {
          // Increase the streak count and update the LastUpdate date
          habit.StreakRecord.TotalStreak += 1;
          if (habit.StreakRecord.TotalStreak === 7) {
            // console.log('🥈 Silver Badge');
            habit.StreakRecord.XPPoints += 40;
            habit.BadgeRecord.Badge = "🥈 Silver Badge";
            habit.BadgeRecord.AchievedOn = String(today);
            habit.BadgeRecord.StreakDuration = 7
          } else if (habit.StreakRecord.TotalStreak === 30) {
            // console.log('🏆 Gold Badge');
            habit.StreakRecord.XPPoints += 190;
            habit.BadgeRecord.Badge = "🏆 Gold Badge";
            habit.BadgeRecord.AchievedOn = String(today);
            habit.BadgeRecord.StreakDuration = 30
          } else if (habit.StreakRecord.TotalStreak === 100) {
            habit.StreakRecord.XPPoints += 490;
            habit.BadgeRecord.Badge = "⚜️ Elite Badge";
            habit.BadgeRecord.AchievedOn = String(today);
            habit.BadgeRecord.StreakDuration = 100
          }
        }
        habit.StreakRecord.XPPoints += 10;
        habit.StreakRecord.LastUpdate = String(today);

        const totalDays = Math.floor((today - dayFrom) / (1000 * 60 * 60 * 24));
        habit.TotalDaysCompleted = (totalDays + 1);
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
          if (habit.StreakRecord.TotalStreak === 4) {
            habit.StreakRecord.XPPoints += 40;
            habit.BadgeRecord.Badge = "🥈 Silver Badge";
            habit.BadgeRecord.AchievedOn = String(today);
            habit.BadgeRecord.StreakDuration = 4
          } else if (habit.StreakRecord.TotalStreak === 12) {
            habit.StreakRecord.XPPoints += 190;
            habit.BadgeRecord.Badge = "🏆 Gold Badge";
            habit.BadgeRecord.AchievedOn = String(today);
            habit.BadgeRecord.StreakDuration = 12
          } else if (habit.StreakRecord.TotalStreak === 40) {
            habit.StreakRecord.XPPoints += 490;
            habit.BadgeRecord.Badge = "⚜️ Elite Badge";
            habit.BadgeRecord.AchievedOn = String(today);
            habit.BadgeRecord.StreakDuration = 40
          }
        }
        else if (today > endDate) {
          // console.log('2nd condition');
          habit.StreakRecord.TotalStreak = 1;
        }
        else {
          // console.log('user added streak before');
          return false
        }
        habit.StreakRecord.LastUpdate = String(today);
        habit.StreakRecord.XPPoints += 10;

        const upcommingDay_ForWeek = calculateUpcommingDay(today, dayFrom);
        // console.log('upcoming: ', upcommingDay_ForWeek);
        habit.StreakRecord.LastDayForWeek = String(upcommingDay_ForWeek);
        habit.TotalWeeksCompleted = calculateWeekCompleted(today, StartedDate);

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
    lastUpdateDate.setHours(0, 0, 0, 0);

    if (today >= dayFrom && today <= endDate) {

      if (Frequency === "Daily") {
        const after_day_completed = today - lastUpdateDate;
        const daysPassed = Math.floor(after_day_completed / (1000 * 60 * 60 * 24));
        if (daysPassed >= 1) {
          // console.log('not update yet');
          return false
        } else if (String(today) == String(lastUpdateDate)) {
          // console.log('today');
          return true
        } else if (daysPassed < 1) {
          // console.log('already updated/ day passed');
          return true
        }
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
        onClick={(event) => handleMarkAsDone(event,index)} // Handle the "Mark as Done" button click
        disabled={isMarkedToday(LastUpdate, LastDayForWeek, TargetDuration, StartedDate)} // Disable button if marked today
      >
        ✅ Mark as Done</button>
    </div>
  );
}

export default StreakUpdate;