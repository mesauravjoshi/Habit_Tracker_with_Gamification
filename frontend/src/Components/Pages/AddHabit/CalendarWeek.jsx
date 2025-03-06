import React from "react";
import "./CalendarWeek.css";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  getDay,
  isWithinInterval,
} from "date-fns";

const Calendar = ({ startDate, endDate, CalendarData }) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const months = [];
  let currentMonth = startOfMonth(start);
  while (currentMonth <= endOfMonth(end)) {
    months.push(currentMonth);
    currentMonth = addMonths(currentMonth, 1);
  }

  // Function to get color for a specific day
  const getColorForDate = (day) => {
    const formattedDate = format(day, "EEE MMM dd yyyy 00:00:00 'GMT+0530 (India Standard Time)'"); 

    if (!isWithinInterval(day, { start, end })) {
      return { backgroundColor: "transparent", color: "#5c2d3d" }; // Hide out-of-range days
    }

    let dayStyle = { backgroundColor: "#86612b7d", color: "white" }; // Default color

    if (CalendarData) {
      const entry = CalendarData.find(
        (entry) => isWithinInterval(day, { start: new Date(entry.start), end: new Date(entry.end) })
      );

      if (entry) {
        dayStyle.backgroundColor = entry.status; // Override with CalendarData color
      }
    }

    return dayStyle;
  };

  return (
    <div className="calendar-container">
      {months.map((month, index) => {
        const daysInMonth = eachDayOfInterval({
          start: startOfMonth(month),
          end: endOfMonth(month),
        });

        return (
          <div key={index} className="month">
            <h2 className="month-title">{format(month, "MMMM yyyy")}</h2>
            <div className="weekdays">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                <div key={index} className="weekday">{day}</div>
              ))}
            </div>
            <div className="days">
              {Array(getDay(daysInMonth[0])).fill(null).map((_, i) => (
                <div key={`empty-${i}`} className="empty-day"></div>
              ))}

              {daysInMonth.map((day) => {
                const dayStyle = getColorForDate(day);

                return (
                  <div key={day} className="day" style={dayStyle}>
                    {format(day, "d")}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;
