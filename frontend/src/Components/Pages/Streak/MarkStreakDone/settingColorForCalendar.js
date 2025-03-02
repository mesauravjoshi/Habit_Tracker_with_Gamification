export const settingColorForCalendar  = (CalendarData, StartedDate, today) => {
    console.log((today + 1));
    
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