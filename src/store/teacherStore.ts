import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface TeacherProfile {
  mainSubject: string;
  additionalSubjects: string[];
  yearGroups: string[];
}

interface TeacherState {
  profile: TeacherProfile;
  updateProfile: (updates: Partial<TeacherProfile>) => void;
  canTeachSubject: (subject: string) => boolean;
}

export const useTeacherStore = create<TeacherState>()(
  persist(
    (set, get) => ({
      profile: {
        mainSubject: '',
        additionalSubjects: [],
        yearGroups: []
      },
      updateProfile: (updates) => {
        set((state) => ({
          profile: {
            ...state.profile,
            ...updates
          }
        }));
      },
      canTeachSubject: (subject) => {
        const { mainSubject, additionalSubjects } = get().profile;
        return mainSubject === subject || additionalSubjects.includes(subject);
      }
    }),
    {
      name: 'teacher-storage'
    }
  )
);