import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CalendarAssessment {
  id: string;
  title: string;
  description: string;
  type: 'assessment';
  date: string;
  content: any;
}

interface CalendarState {
  assessments: CalendarAssessment[];
  addAssessment: (assessment: CalendarAssessment) => void;
  removeAssessment: (id: string) => void;
  getAssessments: () => CalendarAssessment[];
}

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set, get) => ({
      assessments: [],
      addAssessment: (assessment) => {
        set((state) => ({
          assessments: [...state.assessments, assessment]
        }));
      },
      removeAssessment: (id) => {
        set((state) => ({
          assessments: state.assessments.filter(a => a.id !== id)
        }));
      },
      getAssessments: () => get().assessments
    }),
    {
      name: 'calendar-storage'
    }
  )
);