// 1. for days 
export const settingColorForCalendar = (CalendarData, StartedDate, today) => {
  // console.log((today + 1));

  // Convert StartedDate to a Date object
  const startDate = new Date(StartedDate);

  // Loop through each date starting from StartedDate to today
  let currentDate = new Date(startDate);
  while (currentDate <= today) {
    const dateString = currentDate.toString();

    // Check if the date is already present in CalendarData
    if (!CalendarData[dateString]) {
      // If no color is set, set it to "red"
      CalendarData[dateString] = "red";
    }

    // Move to the next day
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return CalendarData;
};

// 2. for weeks 
// A.   IF DID'T MISS WEEK 




// B.   IF MISS WEEK 
// if missed moer then one week then set all weeks 'red' 
export const settingColorForPendingWeek = (CalendarData, startDate, endDate) => {

  // Parse the startDate and endDate to Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);
  end.setDate(end.getDate() - 7);

  // Helper function to get the start of the week (Wednesday to Tuesday week format)
  const getWeekStart = (date) => {
    const dayOfWeek = date.getDay();
    const diff = (dayOfWeek <= 3 ? 3 - dayOfWeek : 10 - dayOfWeek); // Adjust so that week starts from Wednesday
    date.setDate(date.getDate() + diff);
    return new Date(date);
  };

  // Helper function to get the end of the week (Tuesday to Wednesday week format)
  const getWeekEnd = (date) => {
    const startOfWeek = getWeekStart(new Date(date));
    startOfWeek.setDate(startOfWeek.getDate() + 6); // Add 6 days to get Tuesday of that week
    return startOfWeek;
  };

  // Create a function to check if the week is already in the CalendarData
  const isWeekInCalendar = (weekStart, weekEnd) => {
    return CalendarData.some(
      entry =>
        new Date(entry.start).getTime() === weekStart.getTime() &&
        new Date(entry.end).getTime() === weekEnd.getTime()
    );
  };

  // Iterate over the weeks from startDate to endDate
  let currentDate = new Date(start);
  while (currentDate <= end) {
    const weekStart = getWeekStart(new Date(currentDate));
    const weekEnd = getWeekEnd(new Date(currentDate));

    // If the week is not already in the CalendarData, add it with a status of "red"
    if (!isWeekInCalendar(weekStart, weekEnd)) {
      CalendarData.push({
        start: weekStart.toString(),
        end: weekEnd.toString(),
        status: "red"
      });
    }

    // Move to the next week (7 days later)
    currentDate.setDate(currentDate.getDate() + 7);
  }

  // Return the updated CalendarData
  return CalendarData;
};

//  and then set current/ active weeek to 'green'
export const settingColorForCal_week = (CalendarData, previousDay) => {
  const date = new Date(previousDay);
  date.setDate(date.getDate() - 6);

  const copy_CalendarData = Array.isArray(CalendarData) ? CalendarData : [];
  return [...copy_CalendarData, {
    "start": String(date),
    "end": String(previousDay),
    "status": "green"
  }]
}