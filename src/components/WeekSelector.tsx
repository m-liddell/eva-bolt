'use client';

import React from 'react';
import { Term } from '../store/termStore';

interface WeekSelectorProps {
  term: Term;
  currentWeek: number;
  onWeekChange: (week: number) => void;
}

export function WeekSelector({ term, currentWeek, onWeekChange }: WeekSelectorProps) {
  const weekCommencingDates = React.useMemo(() => {
    const dates: string[] = [];
    const start = new Date(term.startDate);
    
    // Adjust start date to Monday if it's not already
    const dayOfWeek = start.getDay();
    if (dayOfWeek !== 1) { // 1 is Monday
      start.setDate(start.getDate() + ((1 + 7 - dayOfWeek) % 7));
    }
    
    for (let i = 0; i < term.weeks; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + (i * 7));
      dates.push(date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }));
    }
    
    return dates;
  }, [term.startDate, term.weeks]);

  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: term.weeks }, (_, i) => i + 1).map((week, index) => (
        <button
          key={week}
          onClick={() => onWeekChange(week)}
          className={`px-3 py-1.5 rounded-lg font-medium text-sm transition-colors ${
            currentWeek === week
              ? 'bg-[#FFC83D]/10 text-[#FFC83D]'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <div className="flex flex-col items-center">
            <span>Week {week}</span>
            <span className="text-xs text-gray-500">w/c {weekCommencingDates[index]}</span>
          </div>
        </button>
      ))}
    </div>
  );
}