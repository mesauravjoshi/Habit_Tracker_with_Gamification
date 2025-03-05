import React from "react";
import "./Calendar.css";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, getDay, parseISO } from "date-fns";

const Calendar = ({ startDate, endDate }) => {
  const start =   (new Date(startDate));
  const end = parseISO(endDate);
  
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
              {daysInMonth.map((day) => (
                <div key={day} className="day">{format(day, "d")}</div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;
