export const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

export const persianMonthNames = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
];

export const isDayInRange = (
  day: number,
  selectedRange: { start: number | null; end: number | null }
): boolean => {
  if (selectedRange.start && selectedRange.end) {
    return day > selectedRange.start && day < selectedRange.end;
  }
  return false;
};
