import { create } from 'zustand';

export interface Term {
  name: string;
  startDate: string;
  endDate: string;
  weeks: number;
}

interface TermState {
  terms: Record<string, Term>;
  getWeekCommencingDates: (termId: string) => string[];
  calculateWeeks: (startDate: string, endDate: string) => number;
  updateTerm: (termId: string, term: Term) => void;
}

const calculateWeeksBetweenDates = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  // Adjust start date to Monday if it's not already
  const dayOfWeek = start.getDay();
  if (dayOfWeek !== 1) { // 1 is Monday
    start.setDate(start.getDate() + ((1 + 7 - dayOfWeek) % 7));
  }
  
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.ceil(diffDays / 7);
};

const getWeekCommencingDatesForTerm = (startDate: string, weeks: number): string[] => {
  const dates: string[] = [];
  const start = new Date(startDate);
  
  // Adjust start date to Monday if it's not already
  const dayOfWeek = start.getDay();
  if (dayOfWeek !== 1) { // 1 is Monday
    start.setDate(start.getDate() + ((1 + 7 - dayOfWeek) % 7));
  }
  
  for (let i = 0; i < weeks; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() + (i * 7));
    dates.push(date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    }));
  }
  
  return dates;
};

export const TERMS: Record<string, Term> = {
  'Autumn 1': {
    name: 'Autumn Term 1',
    startDate: '2024-09-02',
    endDate: '2024-10-18',
    weeks: 7
  },
  'Autumn 2': {
    name: 'Autumn Term 2',
    startDate: '2024-10-28',
    endDate: '2024-12-20',
    weeks: 8
  },
  'Spring 1': {
    name: 'Spring Term 1',
    startDate: '2025-01-06',
    endDate: '2025-02-14',
    weeks: 6
  },
  'Spring 2': {
    name: 'Spring Term 2',
    startDate: '2025-02-24',
    endDate: '2025-04-04',
    weeks: 6
  },
  'Summer 1': {
    name: 'Summer Term 1',
    startDate: '2025-04-21',
    endDate: '2025-05-23',
    weeks: 5
  },
  'Summer 2': {
    name: 'Summer Term 2',
    startDate: '2025-06-02',
    endDate: '2025-07-18',
    weeks: 7
  }
};

export const useTermStore = create<TermState>()((set, get) => ({
  terms: TERMS,
  getWeekCommencingDates: (termId: string) => {
    const term = get().terms[termId];
    if (!term) return [];
    return getWeekCommencingDatesForTerm(term.startDate, term.weeks);
  },
  calculateWeeks: calculateWeeksBetweenDates,
  updateTerm: (termId, term) => {
    set((state) => ({
      terms: {
        ...state.terms,
        [termId]: {
          ...term,
          weeks: calculateWeeksBetweenDates(term.startDate, term.endDate)
        }
      }
    }));
  }
}));