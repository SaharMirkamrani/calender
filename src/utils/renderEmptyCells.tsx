
import React, {JSX} from 'react';

export const renderEmptyCells = (firstDayOfWeek: number): JSX.Element[] => {
  let emptyCells: JSX.Element[] = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    emptyCells.push(<div key={`empty-${i}`} className="p-2"></div>);
  }
  return emptyCells;
};
