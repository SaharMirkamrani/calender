import React, { useState } from "react";

type CalendarProps = {
  year: number;
  month: number;
};

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

const Calendar = ({ year, month }: CalendarProps) => {
  const [selectedRange, setSelectedRange] = useState<{
    start: number | null;
    end: number | null;
  }>({
    start: null,
    end: null,
  });

  const handleDayClick = (day: number) => {
    if (selectedRange.start === null) {
      setSelectedRange({ start: day, end: null });
    } else if (selectedRange.end === null && day > selectedRange.start) {
      setSelectedRange({ ...selectedRange, end: day });
    } else {
      setSelectedRange({ start: day, end: null });
    }
  };

  const isDayInRange = (day: number) => {
    if (selectedRange.start && selectedRange.end) {
      return day >= selectedRange.start && day <= selectedRange.end;
    }
    return false;
  };

  return (
    <div className="w-[400px] mx-auto bg-white border border-gray-900 rounded-3xl p-6">
      <header className="text-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">
          {`سال ${year} - ماه ${month}`}
        </h2>
      </header>

      <div className="grid grid-cols-7 gap-1 text-center font-medium mb-2">
        {weekDays.map((day) => (
          <div key={day} className="p-2 text-gray-800">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center relative">
        {daysInMonth.map((day) => {
          let dayClasses = "p-2 rounded-full border border-transparent hover:border-gray-700 transition";

          if (isDayInRange(day)) {
            dayClasses = "p-2 rounded-full bg-purple-400 text-white border border-transparent";
          }

          if (day === selectedRange.start || day === selectedRange.end) {
            dayClasses = "p-2 rounded-full bg-black text-white border border-transparent";
          }

          return (
            <div
              key={day}
              className={dayClasses}
              onClick={() => handleDayClick(day)}
            >
              {day}
            </div>
          );
        })}

        {selectedRange.start && selectedRange.end && (
          <div
            className="absolute top-0 left-0 right-0 bottom-0 bg-purple-500 opacity-50 rounded-lg"
            style={{
              gridColumn: `${selectedRange.start} / span ${selectedRange.end - selectedRange.start + 1}`,
              zIndex: -1,
            }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
