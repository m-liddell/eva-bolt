import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LessonActivity {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: string;
}

export interface Lesson {
  id: string;
  subject: string;
  yearGroup: string;
  class: string;
  day: string;
  startTime: string;
  duration?: string;
  week: number;
  theme?: string;
  comment?: string;
  notes?: string;
  termId: string;
  objectives?: Array<{ id: string; code: string; description: string }>;
  activities?: {
    starter?: LessonActivity;
    main?: LessonActivity;
    plenary?: LessonActivity;
  };
}

interface TimetableState {
  lessons: Lesson[];
  selectedLessons: string[];
  objectivesHistory: Array<{
    lessonId: string;
    objectives: Array<{ id: string; code: string; description: string }> | undefined;
  }>;
  themeHistory: Array<{
    lessonId: string;
    theme: string | undefined;
  }>;
  filters: {
    yearGroup: string | null;
    class: string | null;
    subject: string | null;
  };
  getLessonsByTerm: (term: string) => Lesson[];
  getLessonsBySubjectAndWeek: (subject: string, week: number, termId: string) => Lesson[];
  setFilters: (filters: Partial<TimetableState['filters']>) => void;
  toggleLessonSelection: (lessonId: string) => void;
  clearLessonSelection: () => void;
  addLesson: (lesson: Lesson) => boolean;
  updateLesson: (lesson: Lesson) => boolean;
  deleteLesson: (lessonId: string) => void;
  deleteSelectedLessons: () => void;
  getSelectedLessons: () => Lesson[];
  addObjectiveToLessons: (objective: { id: string; code: string; description: string }) => void;
  removeObjectiveFromLessons: (objectiveId: string) => void;
  updateLessonActivities: (lessonId: string, activities: Lesson['activities'], theme?: string) => void;
  updateLessonObjectives: (lessonId: string, objectives: Array<{ id: string; code: string; description: string }>) => void;
  duplicateLessonsAcrossWeeks: (termId: string, weeks: number) => void;
  checkTimeSlotAvailable: (day: string, timeSlot: string, duration: string, week: number, termId: string, excludeLessonId?: string) => boolean;
  getNextLesson: () => Lesson | null;
  getRemainingLessonsForToday: () => number;
  undoAutoObjectives: () => void;
  undoThemeChanges: () => void;
  resetAllObjectives: (criteria?: { subject?: string; yearGroup?: string; class?: string; termId?: string }) => void;
  weekApprovals: Record<string, { approved: boolean; approvedAt: Date; approvedBy: string }>;
  approveWeek: (termId: string, week: number, approvedBy: string) => void;
  getWeekApprovalStatus: (termId: string, week: number) => 'pending' | 'approved' | 'needs-review';
  getActivitiesForThemeAndWeek: (theme: string, week: number, subject: string, yearGroup: string) => any;
}

const getActivitiesForThemeAndWeek = (theme, week, subject, yearGroup) => {
  // For Dystopian Fiction, use the structured lesson progression
  if (theme === 'Dystopian Fiction' && subject === 'English') {
    const dystopianLessons = [
      {
        starter: {
          id: 'dystopian-lesson-1-starter',
          title: 'Dystopian World Discovery',
          description: 'Analyze dystopian images and discuss what makes future worlds threatening through Think-Pair-Share',
          duration: '10 mins',
          type: 'discussion',
          dialogic_structure: 'Think-Pair-Share'
        },
        main: {
          id: 'dystopian-lesson-1-main',
          title: 'Dystopian Features Exploration Workshop',
          description: 'Watch dystopian film clips and analyze text extracts to create visual guides identifying genre features',
          duration: '40 mins',
          type: 'group',
          dialogic_structure: 'Collaborative Problem Solving'
        },
        plenary: {
          id: 'dystopian-lesson-1-plenary',
          title: 'Dystopian Feature Gallery',
          description: 'Share most disturbing dystopian features identified and discuss their psychological impact',
          duration: '10 mins',
          type: 'discussion',
          dialogic_structure: 'Discussion'
        }
      },
      {
        starter: {
          id: 'dystopian-lesson-2-starter',
          title: 'Complete Sentence Foundation',
          description: 'Practice identifying complete vs incomplete sentences using dystopian examples',
          duration: '10 mins',
          type: 'discussion',
          dialogic_structure: 'Think-Pair-Share'
        },
        main: {
          id: 'dystopian-lesson-2-main',
          title: 'Dystopian Sentence Construction Workshop',
          description: 'Practice writing complete sentences about dystopian themes with guided support and feedback',
          duration: '40 mins',
          type: 'individual',
          dialogic_structure: 'Guided Discovery'
        },
        plenary: {
          id: 'dystopian-lesson-2-plenary',
          title: 'Sentence Showcase',
          description: 'Share most atmospheric complete sentences and analyze what makes them effective',
          duration: '10 mins',
          type: 'discussion',
          dialogic_structure: 'Discussion'
        }
      },
      {
        starter: {
          id: 'dystopian-lesson-3-starter',
          title: 'Simple vs Compound Sentence Power',
          description: 'Compare simple and compound sentences to see how each creates different effects',
          duration: '10 mins',
          type: 'discussion',
          dialogic_structure: 'Discussion'
        },
        main: {
          id: 'dystopian-lesson-3-main',
          title: 'Simple and Compound Sentence Mastery Workshop',
          description: 'Practice creating both sentence types strategically for different dystopian atmospheric effects',
          duration: '40 mins',
          type: 'individual',
          dialogic_structure: 'Guided Discovery'
        },
        plenary: {
          id: 'dystopian-lesson-3-plenary',
          title: 'Sentence Variety Mastery Reflection',
          description: 'Reflect on sentence variety progress and set goals for continued writing development',
          duration: '10 mins',
          type: 'discussion',
          dialogic_structure: 'Discussion'
        }
      },
      {
        starter: {
          id: 'dystopian-lesson-4-starter',
          title: 'Complex Sentence Sophistication',
          description: 'Analyze how complex sentences add sophistication to dystopian writing',
          duration: '10 mins',
          type: 'discussion',
          dialogic_structure: 'Think-Pair-Share'
        },
        main: {
          id: 'dystopian-lesson-4-main',
          title: 'Complex Sentence Mastery Workshop',
          description: 'Create sophisticated dystopian descriptions using complex sentences with multiple subordinate clauses',
          duration: '40 mins',
          type: 'individual',
          dialogic_structure: 'Guided Discovery'
        },
        plenary: {
          id: 'dystopian-lesson-4-plenary',
          title: 'Sophistication Showcase',
          description: 'Present most sophisticated complex sentences and analyze how complexity enhances description',
          duration: '10 mins',
          type: 'discussion',
          dialogic_structure: 'Discussion'
        }
      },
      {
        starter: {
          id: 'dystopian-lesson-5-starter',
          title: 'Personification for Atmosphere',
          description: 'Give human qualities to dystopian objects to create threatening atmospheres',
          duration: '10 mins',
          type: 'discussion',
          dialogic_structure: 'Discussion'
        },
        main: {
          id: 'dystopian-lesson-5-main',
          title: 'Personification Mastery Workshop',
          description: 'Practice personifying surveillance, buildings, and oppressive elements for unsettling effects',
          duration: '40 mins',
          type: 'individual',
          dialogic_structure: 'Guided Discovery'
        },
        plenary: {
          id: 'dystopian-lesson-5-plenary',
          title: 'Unsettling Effects Showcase',
          description: 'Share most unsettling personification examples and discuss their threatening impact',
          duration: '10 mins',
          type: 'discussion',
          dialogic_structure: 'Discussion'
        }
      },
      {
        starter: {
          id: 'dystopian-lesson-6-starter',
          title: 'Simile Impact Analysis',
          description: 'Analyze how similes enhance dystopian atmosphere and convey themes of oppression',
          duration: '10 mins',
          type: 'discussion',
          dialogic_structure: 'Think-Pair-Share'
        },
        main: {
          id: 'dystopian-lesson-6-main',
          title: 'Simile Mastery Workshop',
          description: 'Create and test original similes that convey oppression and decay for maximum atmospheric impact',
          duration: '40 mins',
          type: 'individual',
          dialogic_structure: 'Guided Discovery'
        },
        plenary: {
          id: 'dystopian-lesson-6-plenary',
          title: 'Simile Power Showcase',
          description: 'Present most powerful dystopian similes and evaluate their effectiveness for conveying themes',
          duration: '10 mins',
          type: 'discussion',
          dialogic_structure: 'Discussion'
        }
      }
      // Add remaining weeks...
    ];
    
    const lessonIndex = Math.max(0, Math.min(week - 1, dystopianLessons.length - 1));
    return dystopianLessons[lessonIndex];
  }
  
  // Default activities for other themes
  return {
    starter: {
      id: `${theme.toLowerCase().replace(/\s+/g, '-')}-${week}-starter`,
      title: `${theme} Introduction`,
      description: `Discuss and explore key concepts related to ${theme} through collaborative activities`,
      duration: '10 mins',
      type: 'discussion',
      dialogic_structure: 'Discussion'
    },
    main: {
      id: `${theme.toLowerCase().replace(/\s+/g, '-')}-${week}-main`,
      title: `${theme} Workshop`,
      description: `Practice and develop skills through hands-on activities related to ${theme}`,
      duration: '40 mins',
      type: 'group',
      dialogic_structure: 'Collaborative Problem Solving'
    },
    plenary: {
      id: `${theme.toLowerCase().replace(/\s+/g, '-')}-${week}-plenary`,
      title: `${theme} Reflection`,
      description: `Share insights and reflect on learning progress with ${theme} concepts`,
      duration: '10 mins',
      type: 'discussion',
      dialogic_structure: 'Discussion'
    }
  };
};

export const useTimetableStore = create<TimetableState>()(
  persist(
    (set, get) => ({
      lessons: [],
      selectedLessons: [],
      objectivesHistory: [],
      themeHistory: [],
      weekApprovals: {},
      filters: {
        yearGroup: null,
        class: null,
        subject: null
      },
      getLessonsByTerm: (term) => {
        return get().lessons.filter(lesson => lesson.termId === term);
      },
      getLessonsBySubjectAndWeek: (subject, week, termId) => {
        return get().lessons.filter(lesson => 
          lesson.subject === subject && 
          lesson.week === week && 
          lesson.termId === termId
        );
      },
      setFilters: (newFilters) => {
        set((state) => ({
          filters: { ...state.filters, ...newFilters }
        }));
      },
      toggleLessonSelection: (lessonId) => {
        set((state) => {
          if (state.selectedLessons.includes(lessonId)) {
            return {
              ...state,
              selectedLessons: state.selectedLessons.filter(id => id !== lessonId)
            };
          }
          return {
            ...state,
            selectedLessons: [...state.selectedLessons, lessonId]
          };
        });
      },
      clearLessonSelection: () => {
        set({ 
          selectedLessons: [],
          // Reset any step completion tracking when clearing selections
          objectivesHistory: [],
          themeHistory: []
        });
      },
      addLesson: (lesson) => {
        console.log('Adding lesson:', lesson);
        set((state) => ({
          lessons: [...state.lessons, lesson]
        }));
        return true;
      },
      updateLesson: (lesson) => {
        set((state) => ({
          lessons: state.lessons.map(l => l.id === lesson.id ? lesson : l)
        }));
        return true;
      },
      deleteLesson: (lessonId) => {
        set((state) => ({
          lessons: state.lessons.filter(lesson => lesson.id !== lessonId),
          selectedLessons: state.selectedLessons.filter(id => id !== lessonId),
          // Clear all history when lessons are deleted
          objectivesHistory: state.lessons.filter(lesson => lesson.id !== lessonId).length === 0 ? [] : state.objectivesHistory,
          themeHistory: state.lessons.filter(lesson => lesson.id !== lessonId).length === 0 ? [] : state.themeHistory,
          weekApprovals: state.lessons.filter(lesson => lesson.id !== lessonId).length === 0 ? {} : state.weekApprovals
        }));
      },
      deleteSelectedLessons: () => {
        set((state) => ({
          lessons: state.lessons.filter(lesson => !state.selectedLessons.includes(lesson.id)),
          selectedLessons: [],
          // Clear all history when all lessons are deleted
          objectivesHistory: state.lessons.filter(lesson => !state.selectedLessons.includes(lesson.id)).length === 0 ? [] : state.objectivesHistory,
          themeHistory: state.lessons.filter(lesson => !state.selectedLessons.includes(lesson.id)).length === 0 ? [] : state.themeHistory,
          weekApprovals: state.lessons.filter(lesson => !state.selectedLessons.includes(lesson.id)).length === 0 ? {} : state.weekApprovals
        }));
      },
      getSelectedLessons: () => {
        const state = get();
        return state.lessons.filter(lesson => state.selectedLessons.includes(lesson.id));
      },
      addObjectiveToLessons: (objective) => {
        set((state) => {
          // Save current objectives state for undo
          const history = state.selectedLessons.map(lessonId => ({
            lessonId,
            objectives: state.lessons.find(l => l.id === lessonId)?.objectives
          }));

          return {
            ...state,
            objectivesHistory: [...state.objectivesHistory, ...history],
            lessons: state.lessons.map(lesson => {
              if (state.selectedLessons.includes(lesson.id)) {
                const objectives = lesson.objectives || [];
                if (!objectives.some(obj => obj.id === objective.id)) {
                  return {
                    ...lesson,
                    objectives: [...objectives, objective]
                  };
                }
              }
              return lesson;
            })
          };
        });
      },
      removeObjectiveFromLessons: (objectiveId) => {
        set((state) => ({
          lessons: state.lessons.map(lesson => {
            if (state.selectedLessons.includes(lesson.id)) {
              return {
                ...lesson,
                objectives: (lesson.objectives || []).filter(obj => obj.id !== objectiveId)
              };
            }
            return lesson;
          })
        }));
      },
      updateLessonActivities: (lessonId, activities, theme) => {
        set((state) => {
          // Save current theme state for undo if theme is being changed
          const currentLesson = state.lessons.find(l => l.id === lessonId);
          if (currentLesson && theme !== undefined && theme !== currentLesson.theme) {
            const themeHistory = [{
              lessonId,
              theme: currentLesson.theme
            }];
            
            // Reset week approval if lesson is modified
            const weekKey = `${currentLesson.termId}-${currentLesson.week}`;
            const newWeekApprovals = { ...state.weekApprovals };
            if (newWeekApprovals[weekKey]?.approved) {
              delete newWeekApprovals[weekKey];
            }
            
            return {
              ...state,
              themeHistory: [...state.themeHistory, ...themeHistory],
              weekApprovals: newWeekApprovals,
              lessons: state.lessons.map(lesson => {
                if (lesson.id === lessonId) {
                  return {
                    ...lesson,
                    activities,
                    theme: theme || lesson.theme
                  };
                }
                return lesson;
              })
            };
          }
          
          // Reset week approval if lesson activities are modified
          if (currentLesson) {
            const weekKey = `${currentLesson.termId}-${currentLesson.week}`;
            const newWeekApprovals = { ...state.weekApprovals };
            if (newWeekApprovals[weekKey]?.approved) {
              delete newWeekApprovals[weekKey];
            }
            
            return {
              ...state,
              weekApprovals: newWeekApprovals,
              lessons: state.lessons.map(lesson => {
                if (lesson.id === lessonId) {
                  return {
                    ...lesson,
                    activities,
                    theme: theme || lesson.theme
                  };
                }
                return lesson;
              })
            };
          }
          
          return {
            ...state,
            lessons: state.lessons.map(lesson => {
              if (lesson.id === lessonId) {
                return {
                  ...lesson,
                  activities,
                  theme: theme || lesson.theme
                };
              }
              return lesson;
            })
          };
        });
      },
      updateLessonObjectives: (lessonId, objectives) => {
        set((state) => {
          // Save current objectives state for undo
          const history = [{
            lessonId,
            objectives: state.lessons.find(l => l.id === lessonId)?.objectives
          }];

          return {
            ...state,
            objectivesHistory: [...state.objectivesHistory, ...history],
            lessons: state.lessons.map(lesson => {
              if (lesson.id === lessonId) {
                return {
                  ...lesson,
                  objectives
                };
              }
              return lesson;
            })
          };
        });
      },
      duplicateLessonsAcrossWeeks: (termId: string, weeks: number) => {
        set((state) => {
          const weekOneLessons = state.lessons.filter(
            lesson => lesson.termId === termId && lesson.week === 1
          );
          
          if (weekOneLessons.length === 0) {
            return state; // No lessons to duplicate
          }
          
          // Remove all lessons for this term except week 1
          const lessonsToKeep = state.lessons.filter(
            lesson => lesson.termId !== termId || lesson.week === 1
          );
          
          // Create new lessons for weeks 2 through the specified number of weeks
          const newLessons = [];
          for (let week = 2; week <= weeks; week++) {
            weekOneLessons.forEach(lesson => {
              newLessons.push({
                ...lesson,
                id: Math.random().toString(36).substr(2, 9),
                week
              });
            });
          }
          
          console.log(`Duplicating ${weekOneLessons.length} lessons across ${weeks - 1} additional weeks`);
          console.log(`Created ${newLessons.length} new lessons`);
          
          return {
            ...state,
            lessons: [...lessonsToKeep, ...newLessons]
          };
        });
      },
      checkTimeSlotAvailable: (day, timeSlot, duration = '60 mins', week, termId, excludeLessonId) => {
        const lessons = get().lessons;
        
        const [slotHours = '0', slotMinutes = '0'] = (timeSlot || '').split(':');
        const slotStartMinutes = (parseInt(slotHours) * 60) + parseInt(slotMinutes);
        
        const durationMatch = (duration || '60 mins').match(/(\d+)/);
        const durationMinutes = durationMatch ? parseInt(durationMatch[1]) : 60;
        
        const slotEndMinutes = slotStartMinutes + durationMinutes;

        return !lessons.some(lesson => {
          if (excludeLessonId && lesson.id === excludeLessonId) return false;
          if (lesson.day !== day || lesson.week !== week || lesson.termId !== termId) return false;

          const [lessonHours = '0', lessonMinutes = '0'] = (lesson.startTime || '').split(':');
          const lessonStartMinutes = (parseInt(lessonHours) * 60) + parseInt(lessonMinutes);
          
          const lessonDurationMatch = (lesson.duration || '60 mins').match(/(\d+)/);
          const lessonDurationMinutes = lessonDurationMatch ? parseInt(lessonDurationMatch[1]) : 60;
          
          const lessonEndMinutes = lessonStartMinutes + lessonDurationMinutes;

          return !(slotEndMinutes <= lessonStartMinutes || slotStartMinutes >= lessonEndMinutes);
        });
      },
      getNextLesson: () => {
        const lessons = get().lessons;
        const now = new Date();
        const currentDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'][now.getDay() - 1];
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        
        const plannedLessons = lessons.filter(lesson => 
          lesson.activities?.starter && 
          lesson.activities?.main && 
          lesson.activities?.plenary
        );

        if (plannedLessons.length === 0) return null;

        const todaysLessons = plannedLessons.filter(lesson => 
          lesson.day === currentDay &&
          lesson.startTime > currentTime
        );

        if (todaysLessons.length > 0) {
          return todaysLessons.sort((a, b) => 
            a.startTime.localeCompare(b.startTime)
          )[0];
        }

        const currentDayIndex = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].indexOf(currentDay);
        const futureLessons = plannedLessons.filter(lesson => 
          ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].indexOf(lesson.day) > currentDayIndex
        );

        if (futureLessons.length > 0) {
          return futureLessons.sort((a, b) => {
            const dayCompare = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].indexOf(a.day) - 
                             ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].indexOf(b.day);
            return dayCompare === 0 ? a.startTime.localeCompare(b.startTime) : dayCompare;
          })[0];
        }

        return plannedLessons.sort((a, b) => {
          const dayCompare = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].indexOf(a.day) - 
                           ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].indexOf(b.day);
          return dayCompare === 0 ? a.startTime.localeCompare(b.startTime) : dayCompare;
        })[0];
      },
      getRemainingLessonsForToday: () => {
        const lessons = get().lessons;
        const now = new Date();
        const currentDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'][now.getDay() - 1];
        const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        if (now.getHours() >= 15) {
          return 0;
        }

        const remainingLessons = lessons.filter(lesson => 
          lesson.day === currentDay &&
          lesson.startTime > currentTime
        );

        return Math.min(remainingLessons.length, 6);
      },
      undoAutoObjectives: () => {
        set((state) => {
          const history = [...state.objectivesHistory];
          if (history.length === 0) return state;

          // Get the last batch of changes
          const lastChanges = history.splice(-state.selectedLessons.length);

          return {
            ...state,
            objectivesHistory: history,
            lessons: state.lessons.map(lesson => {
              const historyEntry = lastChanges.find(h => h.lessonId === lesson.id);
              if (historyEntry) {
                return {
                  ...lesson,
                  objectives: historyEntry.objectives
                };
              }
              return lesson;
            })
          };
        });
      },
      undoThemeChanges: () => {
        set((state) => {
          const history = [...state.themeHistory];
          if (history.length === 0) return state;

          // Get all theme changes to undo
          const lastThemeChanges = history.splice(0); // Undo all theme changes

          return {
            ...state,
            themeHistory: [],
            lessons: state.lessons.map(lesson => {
              const historyEntry = lastThemeChanges.find(h => h.lessonId === lesson.id);
              if (historyEntry) {
                return {
                  ...lesson,
                  theme: historyEntry.theme
                };
              }
              return lesson;
            })
          };
        });
      },
      resetAllObjectives: (criteria = {}) => {
        set((state) => {
          // Save current state for potential undo
          const affectedLessons = state.lessons.filter(lesson => {
            if (criteria.subject && lesson.subject !== criteria.subject) return false;
            if (criteria.yearGroup && lesson.yearGroup !== criteria.yearGroup) return false;
            if (criteria.class && lesson.class !== criteria.class) return false;
            if (criteria.termId && lesson.termId !== criteria.termId) return false;
            return lesson.objectives && lesson.objectives.length > 0;
          });
          
          const history = affectedLessons.map(lesson => ({
            lessonId: lesson.id,
            objectives: lesson.objectives
          }));

          return {
            ...state,
            objectivesHistory: [...state.objectivesHistory, ...history],
            lessons: state.lessons.map(lesson => {
              if (
                (!criteria.subject || lesson.subject === criteria.subject) &&
                (!criteria.yearGroup || lesson.yearGroup === criteria.yearGroup) &&
                (!criteria.class || lesson.class === criteria.class) &&
                (!criteria.termId || lesson.termId === criteria.termId)
              ) {
                return {
                  ...lesson,
                  objectives: []
                };
              }
              return lesson;
            })
          };
        });
      },
      approveWeek: (termId, week, approvedBy) => {
        set((state) => ({
          weekApprovals: {
            ...state.weekApprovals,
            [`${termId}-${week}`]: {
              approved: true,
              approvedAt: new Date(),
              approvedBy
            }
          }
        }));
      },
      getWeekApprovalStatus: (termId, week) => {
        const state = get();
        const approval = state.weekApprovals[`${termId}-${week}`];
        
        if (approval?.approved) {
          return 'approved';
        }
        
        // Check if all lessons for this week are fully planned
        const weekLessons = state.lessons.filter(lesson => 
          lesson.termId === termId && lesson.week === week
        );
        
        const allFullyPlanned = weekLessons.every(lesson => 
          lesson.activities?.starter && 
          lesson.activities?.main && 
          lesson.activities?.plenary &&
          lesson.objectives &&
          lesson.objectives.length > 0
        );
        
        return allFullyPlanned ? 'pending' : 'needs-review';
      },
      getActivitiesForThemeAndWeek: getActivitiesForThemeAndWeek
    }),
    {
      name: 'timetable-storage',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return {
            lessons: [],
            selectedLessons: [],
            objectivesHistory: [],
            themeHistory: [],
            weekApprovals: {},
            filters: {
              yearGroup: null,
              class: null,
              subject: null
            }
          };
        }
        return persistedState as TimetableState;
      }
    }
  )
);