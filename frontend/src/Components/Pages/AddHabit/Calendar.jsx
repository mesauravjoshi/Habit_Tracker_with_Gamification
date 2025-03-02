import React from "react";
import "./Calendar.css";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  getDay,
  parseISO,
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
                const formattedDate = format(day, "EEE MMM dd yyyy 00:00:00 'GMT+0530 (India Standard Time)'"); // Matching CalendarData format
                
                // Default color for all dates in range
                let dayStyle = { backgroundColor: "#86612b7d", color: "white" };

                // Override if date exists in CalendarData
                if (CalendarData && CalendarData[formattedDate]) {
                  dayStyle.backgroundColor = CalendarData[formattedDate]; // Apply green or red
                }

                // Only apply default color if within startDate and endDate
                if (!isWithinInterval(day, { start, end })) {
                  dayStyle = {}; // No special color for out-of-range dates
                }

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
