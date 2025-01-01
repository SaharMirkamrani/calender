import React, { useState, useEffect, useRef } from "react";

type CalendarProps = {
  year: number;
  month: number;
};

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

const persianMonthNames = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
];

const convertToPersianNumber = (number: number): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return number
    .toString()
    .split('')
    .map((digit) => persianDigits[parseInt(digit)])
    .join('');
};

const Calendar = ({ year, month }: CalendarProps) => {
  const [daysInMonth, setDaysInMonth] = useState<any[]>([]);
  const [selectedRange, setSelectedRange] = useState<{ start: number | null; end: number | null }>({
    start: null,
    end: null,
  });
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const monthName = persianMonthNames[month - 1];

  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchDaysInMonth = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://persian-calendar-api.sajjadth.workers.dev/${year}/${month}`
        );
        const data = await response.json();

        console.log("Fetched Data:", data);

        const monthData = data[month - 1]; // Month is 1-based, while array index is 0-based

        if (monthData && monthData.days) {
          setDaysInMonth(monthData.days);
          setFirstDayOfWeek(monthData.startIndex || 0);
        } else {
          console.error("Month data or days not found:", monthData);
        }
      } catch (error) {
        console.error("Error fetching Persian days:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDaysInMonth();
  }, [year, month]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setSelectedRange({ start: null, end: null });
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleDayClick = (day: number) => {
    if (selectedRange.start === null) {
      setSelectedRange({ start: day, end: null });
    } else if (selectedRange.end === null) {
      if (day >= selectedRange.start) {
        setSelectedRange({ ...selectedRange, end: day });
      } else {
        setSelectedRange({ start: day, end: null });
      }
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

  const renderEmptyCells = () => {
    let emptyCells: JSX.Element[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      emptyCells.push(<div key={`empty-${i}`} className="p-2"></div>);
    }
    return emptyCells;
  };

  if (loading) {
    return (
      <div className="w-[400px] mx-auto flex justify-center items-center h-96">
        <div className="loader border-4 border-gray-300 border-t-gray-900 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  return (
    <div
      ref={calendarRef}
      className="w-[400px] mx-auto bg-white border border-gray-900 rounded-3xl p-6"
    >
      <header className="text-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">
        {`${monthName} ${convertToPersianNumber(year)} `}
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
        {renderEmptyCells()}
        {daysInMonth.map((dayObj, index) => {
          const { day, disabled } = dayObj;
          const jalaliDay = day.jalali;

          let dayClasses =
            "p-2 rounded-full border border-transparent hover:border-gray-700 transition";

          if (disabled) {
            dayClasses += " text-gray-300 cursor-not-allowed"; // Disabled days shouldn't be selected
          } else {
            if (isDayInRange(jalaliDay)) {
              dayClasses =
                "p-2 rounded-full bg-purple-400 text-white border border-transparent";
            }

            if (jalaliDay === selectedRange.start || jalaliDay === selectedRange.end) {
              dayClasses =
                "p-2 rounded-full bg-black text-white border border-transparent";
            }
          }

          return (
            <div
              key={index}
              className={dayClasses}
              onClick={() => !disabled && handleDayClick(jalaliDay)} // Prevent selection on disabled days
            >
              {jalaliDay}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
