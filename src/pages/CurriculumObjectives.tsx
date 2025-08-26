import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, ChevronDown, BookOpen, AlertCircle, Target, FileText, Plus, X, Clock, Users, Brain, CheckCircle2, Eye, MessageCircle, Package, ChevronRight, Calendar, ChevronLeft, Edit2, ExternalLink, Play, Sparkles, ArrowRight, GraduationCap, ArrowLeft, Info } from 'lucide-react';
import { useTimetableStore } from '../store/timetableStore';
import { TERMS } from '../store/termStore';
import { THEME_ASSIGNMENTS } from '../config/themeAssignments';
import { OnboardingTour } from '../components/OnboardingTour';
import { useOnboarding } from '../hooks/useOnboarding';

const SUBJECTS = [
  'English', 'Mathematics', 'Science', 'History', 'Geography',
  'Modern Languages', 'Art', 'Music', 'Physical Education', 'Computing'
];

const YEAR_GROUPS = ['Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11'];

const THEMES = [
  'Dystopian Fiction', 'Creative Writing', 'War Poetry', 'Shakespeare',
  'Modern Literature', 'Travel Writing', 'Myths and Legends', 'Victorian Literature',
  'Energy Transfer', 'Forces and Motion', 'Chemical Reactions',
  'Industrial Revolution', 'World War I', 'World War II'
];

// Simplified Planning Steps Component
function SimplifiedPlanningSteps({
  currentStep,
  lessons,
  selectedLessons,
  currentTerm,
  currentWeek,
  weekApprovalStatus,
  onStep1AddLessons,
  onStep2AddThemes,
  onStep3EditLessons,
  onStep4ApproveWeek,
  navigate,
  themesGenerated,
  completedSteps
}: {
  currentStep: number;
  lessons: any[];
  selectedLessons: any[];
  currentTerm: string;
  currentWeek: number;
  weekApprovalStatus: string;
  onStep1AddLessons: () => void;
  onStep2AddThemes: () => void;
  onStep3EditLessons: () => void;
  onStep4ApproveWeek: () => void;
  navigate: (path: string) => void;
  themesGenerated: boolean;
  completedSteps: Set<number>;
}) {
  const isWeekApproved = weekApprovalStatus === 'approved';

  const getStepStatus = (step: number) => {
    if (completedSteps.has(step)) return 'completed';
    if (step === 2 && !completedSteps.has(2)) return 'active';
    if (step === 3 && completedSteps.has(2)) return 'active';
    if (step === 4 && completedSteps.has(3)) return 'active';
    if (step < currentStep) return 'completed';
    if (step === currentStep) return 'active';
    return 'pending';
  };

  const getStepIcon = (step: number) => {
    const status = getStepStatus(step);
    if (status === 'completed') return <CheckCircle2 className="w-4 h-4 text-white" />;
    return <span className="text-sm font-bold">{step}</span>;
  };

  const getStepStyle = (step: number) => {
    const status = getStepStatus(step);
    if (status === 'completed') return 'bg-green-500 text-white';
    if (status === 'active') return 'bg-[#FFC83D] text-white';
    return 'bg-gray-200 text-gray-500';
  };

  const handleStepClick = (step: number) => {
    switch (step) {
      case 1:
        router.push('/my-timetable');
        break;
      case 2:
        onStep2AddThemes();
        break;
      case 3:
        router.push('/resources');
        break;
      case 4:
        router.push(`/approve-week?term=${currentTerm.toLowerCase().split(' ')[0]}&week=${currentWeek}`);
        break;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-[#A4AAB2] p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Planning Steps</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#FFC83D] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
          <span>{currentStep}/4</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Step 1: Add Lessons */}
        <div 
          className="flex flex-col items-center text-center cursor-pointer"
          onClick={() => handleStepClick(1)}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${getStepStyle(1)}`}>
            {getStepIcon(1)}
          </div>
          <h3 className="font-medium text-gray-800 mb-2">Add Lessons</h3>
          <p className="text-sm text-gray-600 mb-3">Create your lesson schedule</p>
        </div>

        {/* Step 2: Add Themed Units */}
        <div 
          className="flex flex-col items-center text-center cursor-pointer"
          onClick={() => handleStepClick(2)}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${getStepStyle(2)}`}>
            {getStepIcon(2)}
          </div>
          <h3 className="font-medium text-gray-800 mb-2">Add Themed Units</h3>
          <p className="text-sm text-gray-600 mb-3">Group lessons into themes</p>
        </div>

        {/* Step 3: Edit Individual Lessons */}
        <div 
          className="flex flex-col items-center text-center cursor-pointer"
          onClick={() => handleStepClick(3)}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${getStepStyle(3)}`}>
            {getStepIcon(3)}
          </div>
          <h3 className="font-medium text-gray-800 mb-2">Edit Individual Lessons</h3>
          <p className="text-sm text-gray-600 mb-3">Add activities to lessons</p>
        </div>

        {/* Step 4: Approve for Teaching */}
        <div 
          className="flex flex-col items-center text-center cursor-pointer"
          onClick={() => handleStepClick(4)}
        >
          <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 ${getStepStyle(4)}`}>
            {getStepIcon(4)}
          </div>
          <h3 className="font-medium text-gray-800 mb-2">Approve for Teaching</h3>
          <p className="text-sm text-gray-600 mb-3">Launch into teach module</p>
        </div>
      </div>
    </div>
  );
}

export default function CurriculumObjectives() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showOnboarding, setShowOnboarding, completeOnboarding, setOnboardingStep } = useOnboarding();
  const { 
    getLessonsByTerm, 
    getSelectedLessons, 
    toggleLessonSelection, 
    clearLessonSelection,
    updateLessonActivities 
  } = useTimetableStore();
  
  const termParam = searchParams.get('term');
  
  const [currentTerm, setCurrentTerm] = useState(() => {
    switch (termParam) {
      case 'spring': return 'Spring 1';
      case 'summer': return 'Summer 1';
      default: return 'Autumn 1';
    }
  });
  const [showGuidance, setShowGuidance] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [availableThemes, setAvailableThemes] = useState<string[]>([]);
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [isAutoGenerating, setIsAutoGenerating] = useState(false);
  const [showCompletionNotification, setShowCompletionNotification] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set([1])); // Step 1 starts completed
  const [hasCompletedThemes, setHasCompletedThemes] = useState(false);
  const [selectedWeeks, setSelectedWeeks] = useState<Set<number>>(new Set());
  
  // Get lessons from store
  const lessons = getLessonsByTerm(currentTerm);
  const selectedLessons = getSelectedLessons();
  
  // Get unique subject/year/class combinations for the timetable
  const uniqueClasses = React.useMemo(() => {
    const classMap = new Map<string, any>();
    
    lessons.forEach(lesson => {
      const key = `${lesson.subject}-${lesson.yearGroup}-${lesson.class}`;
      if (!classMap.has(key)) {
        classMap.set(key, lesson);
      }
    });
    
    return Array.from(classMap.values()).sort((a, b) => {
      if (a.subject !== b.subject) return a.subject.localeCompare(b.subject);
      if (a.yearGroup !== b.yearGroup) return a.yearGroup.localeCompare(b.yearGroup);
      return a.class.localeCompare(b.class);
    });
  }, [lessons]);

  const handleCompleteThemes = () => {
    setHasCompletedThemes(true);
    setCompletedSteps(prev => new Set([...prev, 2]));
  };

  const handleAutoGenerateThemes = async () => {
    setIsAutoGenerating(true);
    try {
      // Auto-generate themes for lessons that don't already have themes
      const lessonsWithoutThemes = lessons.filter(lesson => !lesson.theme);
      
      if (lessonsWithoutThemes.length === 0) {
        // All lessons already have themes
        setHasCompletedThemes(true);
        setCompletedSteps(prev => new Set([...prev, 2]));
        setIsAutoGenerating(false);
        return;
      }
      
      lessonsWithoutThemes.forEach(lesson => {
        const subjectThemes = THEME_ASSIGNMENTS[lesson.subject as keyof typeof THEME_ASSIGNMENTS];
        if (subjectThemes) {
          const yearThemes = subjectThemes[lesson.yearGroup as keyof typeof subjectThemes];
          if (yearThemes && yearThemes.length > 0) {
            // Assign theme based on week number, but cycle through themes properly
            // Use a different approach to avoid duplicating the same theme
            const themeIndex = Math.floor((lesson.week - 1) / 2) % yearThemes.length;
            const theme = yearThemes[themeIndex];
            
            // Only update theme, don't add activities yet (that's for step 3)
            updateLessonActivities(lesson.id, lesson.activities, theme);
          }
        }
      });
      
      setHasCompletedThemes(true);
      setCompletedSteps(prev => new Set([...prev, 2]));
      setShowCompletionNotification(true);
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setShowCompletionNotification(false);
      }, 3000);
      
    } catch (err) {
      console.error('Failed to generate themes');
    } finally {
      setIsAutoGenerating(false);
    }
  };

  const handleLessonClick = (lesson: any) => {
    const weekNumber = lesson.week;
    
    // Toggle week selection
    setSelectedWeeks(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(weekNumber)) {
        newSelection.delete(weekNumber);
      } else {
        newSelection.add(weekNumber);
      }
      return newSelection;
    });
    
    // Set the lesson for theme selection (use first lesson of the week)
    if (!selectedLesson || selectedLesson.subject !== lesson.subject || selectedLesson.yearGroup !== lesson.yearGroup) {
      setSelectedLesson(lesson);
      
      // Get available themes for this subject and year group
      const subjectThemes = THEME_ASSIGNMENTS[lesson.subject as keyof typeof THEME_ASSIGNMENTS];
      if (subjectThemes) {
        const yearThemes = subjectThemes[lesson.yearGroup as keyof typeof subjectThemes];
        setAvailableThemes(yearThemes || []);
      } else {
        setAvailableThemes(THEMES);
      }
    }
    
    setSelectedTheme('');
  };

  const handleApplyTheme = () => {
    if (selectedLesson && selectedTheme && selectedWeeks.size > 0) {
      // Apply theme to all lessons in selected weeks for the same subject/year/class
      const lessonsToUpdate = lessons.filter(lesson => 
        selectedWeeks.has(lesson.week) &&
        lesson.subject === selectedLesson.subject &&
        lesson.yearGroup === selectedLesson.yearGroup &&
        lesson.class === selectedLesson.class
      );
      
      lessonsToUpdate.forEach(lesson => {
        const activities = {
          starter: {
            id: `${lesson.id}-starter`,
            title: `${selectedTheme} Introduction`,
            description: `Explore key concepts and themes related to ${selectedTheme}`,
            duration: '10 mins',
            type: 'discussion'
          },
          main: {
            id: `${lesson.id}-main`,
            title: `${selectedTheme} Workshop`,
            description: `Develop skills and understanding through ${selectedTheme} activities`,
            duration: '40 mins',
            type: 'group'
          },
          plenary: {
            id: `${lesson.id}-plenary`,
            title: `${selectedTheme} Reflection`,
            description: `Consolidate learning and reflect on ${selectedTheme} concepts`,
            duration: '10 mins',
            type: 'discussion'
          }
        };
        
        updateLessonActivities(lesson.id, activities, selectedTheme);
      });
      
      // Clear selections
      setSelectedWeeks(new Set());
      setSelectedLesson(null);
      setSelectedTheme('');
      setAvailableThemes([]);
      
      // Mark as having completed themes
      setHasCompletedThemes(true);
    }
  };

  const handleMarkComplete = () => {
    setHasCompletedThemes(true);
    setCompletedSteps(prev => new Set([...prev, 2]));
    // Navigate to step 3
    router.push('/resources');
  };

  const getLessonsForClassAndWeek = (classLesson: any, week: number) => {
    return lessons.filter(lesson => 
      lesson.subject === classLesson.subject &&
      lesson.yearGroup === classLesson.yearGroup &&
      lesson.class === classLesson.class &&
      lesson.week === week
    );
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const period = Number(hours) >= 12 ? 'PM' : 'AM';
    const displayHours = Number(hours) > 12 ? Number(hours) - 12 : Number(hours);
    return `${displayHours}:${minutes} ${period}`;
  };

  return (
    <>
      <div className="min-h-[calc(100vh-48px)] bg-[#F8F9FA]">
        <div className="max-w-[1400px] mx-auto px-4 py-2 w-full">
          
          {/* Success Notification */}
          {showCompletionNotification && (
            <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-medium">Themes successfully added to all lessons!</span>
              <button
                onClick={() => setShowCompletionNotification(false)}
                className="ml-2 hover:bg-green-600 rounded p-1 transition-colors"
              >
                ×
              </button>
            </div>
          )}
          
          {/* Header Section */}
          <div className="bg-white rounded-lg border border-[#A4AAB2] p-3 sticky top-4 z-20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#FFF9E7] flex items-center justify-center">
                  <Target className="w-4 h-4 text-[#FFC83D]" />
                </div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-bold text-[#768396]">Add Themed Units</h1>
                  <button 
                    onClick={() => setShowGuidance(!showGuidance)}
                    className="p-1 hover:bg-[#FFF9E7] rounded-full transition-colors"
                  >
                    <Info className="w-4 h-4 text-[#FFC83D]" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <select
                  value={currentTerm}
                  onChange={(e) => setCurrentTerm(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC83D] focus:border-transparent"
                >
                  {Object.entries(TERMS).map(([key, term]) => (
                    <option key={key} value={key}>{term.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {showGuidance && (
              <div className="mt-3 p-3 bg-[#FFF9E7] rounded-lg border border-[#FFC83D]/20">
                <div className="flex items-start gap-3">
                  <div>
                    <h2 className="text-sm font-medium text-[#B17F17] mb-1">How to Add Themes</h2>
                    <p className="text-sm text-[#B17F17]">
                      Follow these steps to add themes to your lessons:
                    </p>
                    <ul className="mt-2 text-sm text-[#B17F17] list-disc list-inside">
                      <li>Click on a lesson in the weekly timetable below</li>
                      <li>Choose an appropriate theme from the dropdown that appears</li>
                      <li>Click "Apply Theme" to assign it to the lesson</li>
                      <li>Repeat for other lessons or use "Auto-Generate All Themes"</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Planning Steps */}
          <div className="mt-6">
            <SimplifiedPlanningSteps
              currentStep={2}
              lessons={lessons}
              selectedLessons={selectedLessons}
              currentTerm={currentTerm}
              currentWeek={1}
              weekApprovalStatus="pending"
              onStep1AddLessons={() => navigate('/my-timetable')}
              onStep2AddThemes={() => {}}
              onStep3EditLessons={() => navigate('/resources')}
              onStep4ApproveWeek={() => navigate(`/approve-week?term=${currentTerm.toLowerCase().split(' ')[0]}&week=1`)}
              navigate={navigate}
              themesGenerated={false}
              completedSteps={completedSteps}
            />
          </div>

          {/* Main Content */}
          {lessons.length === 0 ? (
            <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[#FFF9E7] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-[#FFC83D]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No lessons found</h3>
                <p className="text-gray-600 mb-6">
                  You need to create lessons first before adding themes.
                </p>
                <button
                  onClick={() => navigate('/my-timetable')}
                  onClick={() => router.push('/my-timetable')}
                  className="px-6 py-3 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B535] transition-colors flex items-center gap-2 mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  Create Lessons First
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              {/* Weekly Timetable */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Weekly Timetable - {TERMS[currentTerm]?.name}
                    </h2>
                    <p className="text-gray-600">
                     Click on a specific week/s to add a theme
                    </p>
                  </div>
                </div>

                {/* Horizontal Timetable */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse min-w-[800px]">
                    <thead>
                      <tr>
                        <th className="w-48 p-3 border-b border-gray-200 bg-gray-50 sticky left-0 z-10 text-left">
                          <div className="font-medium text-gray-700">Subject • Year • Class</div>
                        </th>
                        {Array.from({ length: TERMS[currentTerm].weeks }, (_, i) => i + 1).map((week) => (
                          <th 
                            key={week}
                            className="min-w-[120px] p-3 text-center border-b border-gray-200 bg-gray-50 font-medium text-gray-700"
                          >
                            <div className="flex flex-col items-center">
                              <div className="text-sm">Week {week}</div>
                              <div className="text-xs text-gray-500">
                                {getLessonsForClassAndWeek({ subject: 'English', yearGroup: 'Year 10', class: 'A' }, week).length > 0 ? 'Has lessons' : 'No lessons'}
                              </div>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {uniqueClasses.map((classLesson) => (
                        <tr key={`${classLesson.subject}-${classLesson.yearGroup}-${classLesson.class}`}>
                          <td className="p-3 border-r border-gray-200 bg-gray-50 sticky left-0 z-10">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-[#FFF9E7] rounded-lg flex items-center justify-center">
                                <BookOpen className="w-4 h-4 text-[#FFC83D]" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{classLesson.subject}</div>
                                <div className="text-sm text-gray-600">{classLesson.yearGroup} {classLesson.class}</div>
                              </div>
                            </div>
                          </td>
                          {Array.from({ length: TERMS[currentTerm].weeks }, (_, i) => i + 1).map((week) => {
                            const weekLessons = getLessonsForClassAndWeek(classLesson, week);
                            const representativeLesson = weekLessons[0];
                            
                            if (!representativeLesson) {
                              return (
                                <td key={week} className="border border-gray-100 p-3">
                                  <div className="h-16 flex items-center justify-center text-gray-300 text-xs">
                                    <span>—</span>
                                  </div>
                                </td>
                              );
                            }

                            const hasTheme = representativeLesson.theme;
                            const isWeekSelected = selectedWeeks.has(week);
                            const isClassSelected = selectedLesson?.subject === representativeLesson.subject && 
                                                  selectedLesson?.yearGroup === representativeLesson.yearGroup &&
                                                  selectedLesson?.class === representativeLesson.class;

                            return (
                              <td key={week} className="border border-gray-100 p-3">
                                <div 
                                  onClick={() => handleLessonClick(representativeLesson)}
                                  className={`h-16 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                    isWeekSelected && isClassSelected
                                      ? 'bg-[#FFF9E7] border-2 border-[#FFC83D] shadow-md'
                                      : hasTheme
                                        ? 'bg-green-50 border-2 border-green-300 hover:border-green-400 hover:shadow-md'
                                        : 'bg-white border-2 border-gray-200 hover:border-[#FFC83D] hover:bg-[#FFF9E7]'
                                  }`}
                                >
                                  <div className="flex flex-col h-full justify-center">
                                    <div className="text-xs font-medium text-gray-700 mb-1">
                                      Week {week}
                                    </div>
                                    {hasTheme ? (
                                      <div className="text-xs text-green-700 font-medium truncate">
                                        {representativeLesson.theme}
                                      </div>
                                    ) : (
                                      <div className="text-xs text-gray-400">
                                        No theme
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Theme Selection Panel */}
                {selectedWeeks.size > 0 && selectedLesson && (
                  <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-blue-800">
                          Add Theme to: {selectedLesson.subject} - {selectedLesson.yearGroup} {selectedLesson.class}
                        </h3>
                        <p className="text-sm text-blue-600">
                          {selectedWeeks.size === 1 
                            ? `Week ${Array.from(selectedWeeks)[0]}`
                            : `Weeks ${Array.from(selectedWeeks).sort().join(', ')}`
                          }
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedWeeks(new Set());
                          setSelectedLesson(null);
                          setSelectedTheme('');
                          setAvailableThemes([]);
                        }}
                        className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4 text-blue-600" />
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-blue-800 mb-2">
                          Select Theme:
                        </label>
                        <select
                          value={selectedTheme}
                          onChange={(e) => setSelectedTheme(e.target.value)}
                          className="w-full px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Choose a theme...</option>
                          {availableThemes.map(theme => (
                            <option key={theme} value={theme}>{theme}</option>
                          ))}
                        </select>
                      </div>
                      
                      {selectedTheme && (
                        <button
                          onClick={handleApplyTheme}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                          <Target className="w-4 h-4" />
                          Apply Theme to Lesson
                        </button>
                      )}
                     
                     {/* Auto-Generate Button moved here */}
                     <div className="pt-4 border-t border-blue-200">
                       <div className="flex items-center justify-between">
                         <div>
                           <h4 className="text-sm font-medium text-blue-800 mb-1">Quick Option</h4>
                           <p className="text-xs text-blue-600">Apply themes to all lessons automatically</p>
                         </div>
                         <button
                           onClick={handleAutoGenerateThemes}
                           disabled={isAutoGenerating}
                           className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                         >
                           {isAutoGenerating ? (
                             <>
                               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                               Generating...
                             </>
                           ) : (
                             <>
                               <Sparkles className="w-4 h-4" />
                               Auto-Generate All Themes
                             </>
                           )}
                         </button>
                       </div>
                     </div>
                    </div>
                  </div>
                )}

                {/* Instructions */}
                {selectedWeeks.size === 0 && (
                  <div className="mt-6 text-center py-8">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Target className="w-6 h-6 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-600 mb-2">Select Weeks First</h3>
                    <p className="text-gray-500">
                     Choose one or more weeks from the grid above to add themes.
                    </p>
                  </div>
                )}
                
                {/* Selection Summary */}
                {selectedWeeks.size > 0 && selectedLesson && (
                  <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <h4 className="font-medium text-amber-800 mb-2">Selection Summary</h4>
                    <div className="text-sm text-amber-700">
                      <p><strong>Subject/Class:</strong> {selectedLesson.subject} - {selectedLesson.yearGroup} {selectedLesson.class}</p>
                      <p><strong>Selected Weeks:</strong> {Array.from(selectedWeeks).sort().join(', ')}</p>
                      <p><strong>Lessons to Update:</strong> {selectedWeeks.size} week{selectedWeeks.size !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                )}
               {/* Mark Complete Button */}
               <div className="mt-6 bg-white rounded-lg border border-gray-200 p-6">
                 <div className="text-center">
                   <h3 className="text-xl font-semibold text-gray-800 mb-2">Complete This Step</h3>
                   <p className="text-gray-600 mb-6">
                     When you've finished adding themes to your lessons, mark this step as complete.
                   </p>
                   <button
                     onClick={handleMarkComplete}
                     disabled={!hasCompletedThemes}
                     className={`px-6 py-3 rounded-lg transition-colors flex items-center gap-2 mx-auto ${
                       hasCompletedThemes 
                         ? 'bg-green-600 text-white hover:bg-green-700' 
                         : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                     }`}
                   >
                     <CheckCircle2 className="w-5 h-5" />
                     Mark Complete
                   </button>
                 </div>
               </div>
              </div>
            </div>
          )}

          {/* Return to Steps Button */}
        </div>
      </div>
      
      {/* Contextual Onboarding */}
      <OnboardingTour
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={completeOnboarding}
        currentContext="planning"
      />
    </>
  );
}