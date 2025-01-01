import React, { useState, useEffect } from "react";
import Calendar from "./Calendar.tsx";

const CalendarContainer = () => {
  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);

  useEffect(() => {
    const convertPersianToEnglishDigits = (persianStr: string) => {
      const persianDigits = "۰۱۲۳۴۵۶۷۸۹";
      const englishDigits = "0123456789";
      return persianStr
        .split("")
        .map((char) =>
          persianDigits.includes(char)
            ? englishDigits[persianDigits.indexOf(char)]
            : char
        )
        .join("");
    };

    const getCurrentJalaliDate = () => {
      try {
        const jalaliFormatter = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
          year: "numeric",
          month: "numeric",
        });

        const formattedDate = jalaliFormatter.format(new Date());

        const normalizedDate = convertPersianToEnglishDigits(formattedDate);

        const [jalaliYear, jalaliMonth] = normalizedDate
          .split("/")
          .map((value) => parseInt(value, 10));

        setYear(jalaliYear);
        setMonth(jalaliMonth);
      } catch (error) {
        console.error("Error fetching Jalali date:", error);
      }
    };

    getCurrentJalaliDate();
  }, []);

  if (year === null || month === null) {
    return (
      <div className="w-[400px] mx-auto flex justify-center items-center h-96">
        <div className="loader border-4 border-gray-300 border-t-gray-900 rounded-full w-12 h-12 animate-spin"></div>
      </div>
    );
  }

  return <Calendar year={year} month={month} />;
};

export default CalendarContainer;
