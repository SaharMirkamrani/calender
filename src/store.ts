import { makeAutoObservable } from "mobx";

class CalendarStore {
  selectedRange: { start: string | null; end: string | null } = { start: null, end: null };

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedRange(start: string | null, end: string | null) {
    this.selectedRange = { start, end };
  }
}

const calendarStore = new CalendarStore();
export default calendarStore;
