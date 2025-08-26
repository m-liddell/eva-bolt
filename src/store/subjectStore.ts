import { create } from 'zustand';

interface SubjectState {
  selectedSubject: string;
  setSelectedSubject: (subject: string) => void;
}

export const useSubjectStore = create<SubjectState>((set) => ({
  selectedSubject: 'English',
  setSelectedSubject: (subject) => set({ selectedSubject: subject }),
}));