import { toJalaali } from "jalaali-js";
import { observer } from "mobx-react";
import React, { useEffect, useRef, useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import useMonthYear from '../../hooks/useMonthYear.ts';
import calendarStore from "../../store.ts";
import { fetchDaysInMonth } from '../../utils/calendarApi.ts';
import { isDayInRange, persianMonthNames, weekDays } from '../../utils/calendarUtils.ts';
import { convertToPersianNumber } from '../../utils/dateUtils.ts';
import { renderEmptyCells } from '../../utils/renderEmptyCells.tsx';

type CalendarProps = {
  year: number;
  month: number;
  minRangeDays: number;
};

const Calendar = ({ year, month, minRangeDays }: CalendarProps) => {
  const [daysInMonth, setDaysInMonth] = useState<any[]>([]);
  const [firstDayOfWeek, setFirstDayOfWeek] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const { currentYear, currentMonth, handleNextMonth, handlePrevMonth } = useMonthYear(year, month);

  const monthName = persianMonthNames[currentMonth - 1];

  const calendarRef = useRef<HTMLDivElement>(null);

  const getFirstDayOfMonth = (year: number, month: number) => {
    const gregorianDate = toJalaali(year, month, 1);
    const date = new Date(gregorianDate.gy, gregorianDate.gm - 1, gregorianDate.gd);
    return date.getDay();
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const startIndex = getFirstDayOfMonth(currentYear, currentMonth);

        const { days } = await fetchDaysInMonth(currentYear, currentMonth);

        setDaysInMonth(days);
        setFirstDayOfWeek(startIndex);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentYear, currentMonth]);

  if (loading) {
    return (
      <div className="w-[400px] mx-auto flex justify-center items-center h-96">
        <div className="loader border-4 border-gray-300 border-t-gray-900 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  const convertToEnglishNumber = (persianNumber: string): string => {
    const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
    const englishDigits = "0123456789";
    
    return persianNumber.split('').map(char => {
      const index = persianDigits.indexOf(char);
      return index === -1 ? char : englishDigits[index];
    }).join('');
  };
  

  const handleDayClick = (jalaliDay: string) => {
    const selectedDay = convertToEnglishNumber(jalaliDay);
    var { start, end } = calendarStore.selectedRange;
    
    if (start && end) {
      calendarStore.setSelectedRange(null, null);
      start = null;
      end = null;
    }

    if (!start) {
      calendarStore.setSelectedRange(selectedDay, null);
      return;
    }

    const selectedRangeDays = Number(selectedDay) - Number(start);

    if (selectedRangeDays < 0) {
      alert("The end date cannot be earlier than the start date. Please select a valid range.");
      calendarStore.setSelectedRange(null, null);
      return;
    }

    if (selectedRangeDays > minRangeDays) {
      alert(`You can only select a range of up to ${minRangeDays} days.`);
      calendarStore.setSelectedRange(null, null);
      return;
    }

    calendarStore.setSelectedRange(start, selectedDay);
  };
  
  return (
    <div
      ref={calendarRef}
      className="w-[400px] mx-auto bg-white border border-gray-900 rounded-3xl p-6"
      dir="rtl"
    >
      <header className="text-center mb-4 relative flex justify-between items-center">
        <button
          className="text-xl text-gray-800"
          onClick={handlePrevMonth}
        >
          <MdArrowForwardIos />
        </button>
        <button
          className="text-xl text-gray-800"
          onClick={handleNextMonth}
        >
          <MdArrowBackIosNew />
        </button>
        <h2 className="text-lg font-bold text-gray-800">
          {`${monthName} ${convertToPersianNumber(currentYear)} `}
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
        {renderEmptyCells(firstDayOfWeek)}
        {daysInMonth.map((dayObj, index) => {
          const { day, disabled } = dayObj;
          const jalaliDay = day.jalali;

          let dayClasses = "p-2 rounded-full border border-transparent hover:border-gray-700 transition";

          if (disabled) {
            dayClasses += " text-gray-300 cursor-not-allowed";
          } else {
            const isInRange = isDayInRange(
              // @ts-ignore
              convertToEnglishNumber(jalaliDay),
              calendarStore.selectedRange
            );

            const { start, end } = calendarStore.selectedRange;
            const isStartOrEnd =
              convertToEnglishNumber(jalaliDay) === start ||
              convertToEnglishNumber(jalaliDay) === end;

            if (isStartOrEnd) {
              dayClasses = "p-2 rounded-full bg-black text-white border border-transparent";
            } else if (isInRange) {
              dayClasses = "p-2 rounded-full bg-purple-400 text-white border border-transparent";
            }
          }

          return (
            <div
              key={index}
              className={dayClasses}
              onClick={() => !disabled && handleDayClick(jalaliDay)}
            >
              {jalaliDay}
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default observer(Calendar);
