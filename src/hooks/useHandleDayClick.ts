import { useState } from 'react';

export const useHandleDayClick = () => {
  const [selectedRange, setSelectedRange] = useState<{ start: number | null; end: number | null }>({
    start: null,
    end: null,
  });

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

  return {
    selectedRange,
    handleDayClick,
  };
};
