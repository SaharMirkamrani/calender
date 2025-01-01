import axios from 'axios';

const API_URL = 'https://persian-calendar-api.sajjadth.workers.dev';

export const fetchDaysInMonth = async (year: number, month: number) => {
  try {
    const response = await axios.get(`${API_URL}/${year}/${month}`);
    const data = response.data;
    
    const monthData = data[month - 1];

    if (monthData && monthData.days) {
      return { days: monthData.days, startIndex: monthData.startIndex || 0 };
    } else {
      throw new Error('Month data or days not found');
    }
  } catch (error) {
    console.error("Error fetching Persian days:", error);
    throw error;
  }
};
