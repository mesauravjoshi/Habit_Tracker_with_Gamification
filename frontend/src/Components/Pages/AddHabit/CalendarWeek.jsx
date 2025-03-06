import React from "react";
import "./Calendar.css";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, getDay, parseISO, isWithinInterval } from "date-fns";

const CalendarWeek  = ({ startDate, endDate, CalendarData }) => {
  const start = new Date(startDate);
  const end = parseISO(endDate);
  
  const months = [];
  let currentMonth = startOfMonth(start);
  while (currentMonth <= endOfMonth(end)) {
    months.push(currentMonth);
    currentMonth = addMonths(currentMonth, 1);
  }

  // Function to get color for a specific day
  const getColorForDate = (day) => {
    for (let week of CalendarData) {
      const start = new Date(week.start);
      const end = new Date(week.end);
      
      if (isWithinInterval(day, { start, end })) {
        return week.status; // "green" or "red"
      }
    }
    return "transparent"; // Default color for other dates
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
              {daysInMonth.map((day) => (
                <div key={day} className="day" style={{ backgroundColor: getColorForDate(day) }}>
                  {format(day, "d")}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarWeek ;
