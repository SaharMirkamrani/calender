export const convertToPersianNumber = (number: number): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return number
    .toString()
    .split('')
    .map((digit) => persianDigits[parseInt(digit)])
    .join('');
};
