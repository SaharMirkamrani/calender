import React from "react";
import { observer } from "mobx-react";
import calendarStore from "../src//store.ts";
import CalendarContainer from './components/calendar/CalendarContainer.tsx';

function App() {
  const { selectedRange } = calendarStore;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <CalendarContainer />
      <div className="mt-4 text-center">
        {selectedRange.start && selectedRange.end ? (
          <div>
            بازه انتخاب شده:  {selectedRange.start} - {selectedRange.end}
          </div>
        ) : (
          <div>بازه ای انتخاب نشده است</div>
        )}
      </div>
    </div>
  );
}

export default observer(App);
