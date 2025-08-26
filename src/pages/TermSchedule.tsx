import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Target, BookOpen, ChevronDown, CheckCircle2, Plus, 
  Info, ArrowRight, Users, Clock, Calendar, Lightbulb, Edit2, ChevronLeft, ChevronRight,
  Sparkles, Play, Eye, ExternalLink, Check
} from 'lucide-react';
import { useTimetableStore, Lesson } from '../store/timetableStore';
import { TERMS } from '../store/termStore';
import { VerticalTimetable } from '../components/VerticalTimetable';
import { AddLessonModal } from '../components/AddLessonModal';
import { OnboardingTour } from '../components/OnboardingTour';
import { useOnboarding } from '../hooks/useOnboarding';

// Types and Interfaces
interface LessonData {
  id?: string;
  subject: string;
  yearGroup: string;
  class: string;
  day: string;
  startTime: string;
  duration: string;
  comment?: string;
  week: number;
  termId: string;
  status: string;
}

// Constants
const PLANNING_STEPS = {
  ADD_LESSONS: 1,
  ADD_THEMES: 2,
  EDIT_LESSONS: 3,
  APPROVE_WEEK: 4
} as const;

const STEP_LABELS = {
  [PLANNING_STEPS.ADD_LESSONS]: 'Add Lessons',
  [PLANNING_STEPS.ADD_THEMES]: 'Add Themed Units',
  [PLANNING_STEPS.EDIT_LESSONS]: 'Edit Individual Lessons',
  [PLANNING_STEPS.APPROVE_WEEK]: 'Approve for Teaching'
} as const;

const TERM_MAPPING = {
  spring: 'Spring 1',
  summer: 'Summer 1',
  default: 'Autumn 1'
} as const;

// Helper Functions
const getTermFromParam = (termParam: string | null): string => {
  switch (termParam) {
    case 'spring': return TERM_MAPPING.spring;
    case 'summer': return TERM_MAPPING.summer;
    default: return TERM_MAPPING.default;
  }
};

const generateLessonId = (): string => Math.random().toString(36).substr(2, 9);

// Step Completion Tracking Hook
const useStepCompletion = (currentTerm: string) => {
  const [completedSteps, setCompletedSteps] = useState<Record<string, Set<number>>>({});
  const [showSuccessMessage, setShowSuccessMessage] = useState<string | null>(null);

  const getCompletedStepsForTerm = useCallback((term: string): Set<number> => {
    return completedSteps[term] || new Set();
  }, [completedSteps]);

  const markStepComplete = useCallback((term: string, step: number, message?: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [term]: new Set([...(prev[term] || new Set()), step])
    }));
    
    if (message) {
      setShowSuccessMessage(message);
      // Auto-hide after 3 seconds
      setTimeout(() => setShowSuccessMessage(null), 3000);
    }
  }, []);

  const isStepCompleted = useCallback((term: string, step: number): boolean => {
    return completedSteps[term]?.has(step) || false;
  }, [completedSteps]);

  return {
    getCompletedStepsForTerm,
    markStepComplete,
    isStepCompleted,
    showSuccessMessage,
    setShowSuccessMessage
  };
};

// Component Definitions
const HeaderSection = ({ 
  currentTerm, 
  currentStep, 
  currentWeek, 
  onTermChange, 
  showGuidance, 
  onToggleGuidance 
}: {
  currentTerm: string;
  currentStep: number;
  currentWeek: number;
  onTermChange: (term: string) => void;
  showGuidance: boolean;
  onToggleGuidance: (show: boolean) => void;
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">My Timetable</h1>
          <p className="text-gray-600">Plan your lessons for {currentTerm}</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={currentTerm}
            onChange={(e) => onTermChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC83D] focus:border-transparent"
          >
            {Object.entries(TERMS).map(([key, term]) => (
              <option key={key} value={key}>{term.name}</option>
            ))}
          </select>
          <button
            onClick={() => onToggleGuidance(!showGuidance)}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Success Notification Component
const SuccessNotification = ({ message, onClose }: { message: string; onClose: () => void }) => {
  return (
    <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in">
      <CheckCircle2 className="w-5 h-5" />
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 hover:bg-green-600 rounded p-1 transition-colors"
      >
        ×
      </button>
    </div>
  );
};

const SmartPlanningSteps = ({
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
  stepCompletion,
  navigate
}: {
  currentStep: number;
  lessons: Lesson[];
  selectedLessons: Lesson[];
  currentTerm: string;
  currentWeek: number;
  weekApprovalStatus: boolean;
  onStep1AddLessons: () => void;
  onStep2AddThemes: () => void;
  onStep3EditLessons: () => void;
  onStep4ApproveWeek: () => void;
  stepCompletion: {
    getCompletedStepsForTerm: (term: string) => Set<number>;
    markStepComplete: (term: string, step: number, message?: string) => void;
    isStepCompleted: (term: string, step: number) => boolean;
  };
  navigate: (path: string) => void;
}) => {
  const isWeekApproved = weekApprovalStatus;
  const handleManualComplete = (step: number) => {
    const messages = {
      1: "Step 1 completed! Your lesson schedule is ready.",
      2: "Step 2 completed! Themes have been added to your lessons.",
      3: "Step 3 completed! Activities have been added to your lessons.",
      4: "Step 4 completed! Week approved for teaching."
    };
    stepCompletion.markStepComplete(currentTerm, step, messages[step as keyof typeof messages]);
  };
  const completedSteps = stepCompletion.getCompletedStepsForTerm(currentTerm);

  // Manual completion handler for step 1
  const handleCompleteStep1 = () => {
    stepCompletion.markStepComplete(currentTerm, 1, "Step 1 completed! Your lesson schedule is ready.");
  };

  return (
    <div className="bg-white rounded-lg border border-[#A4AAB2] p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Planning Steps</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>{stepCompletion.getCompletedStepsForTerm(currentTerm).size}/4</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {/* Step 1: Add Lessons */}
        <div className="border rounded-lg p-4 relative cursor-pointer hover:shadow-md transition-all">
          <div className="flex flex-col items-center text-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 font-bold ${
              stepCompletion.isStepCompleted(currentTerm, 1) 
                ? 'bg-green-500 text-white' 
                : 'bg-[#FFC83D] text-white'
            }`}>
              {stepCompletion.isStepCompleted(currentTerm, 1) ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                '1'
              )}
            </div>
            <h3 className="font-medium text-gray-800 mb-1">Add Lessons</h3>
            <p className="text-sm text-gray-600 mb-4">Create your lesson schedule</p>
            <button
              onClick={onStep1AddLessons}
              className="w-full px-4 py-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B535] transition-colors flex items-center justify-center gap-2 mb-2"
            >
              <Plus className="w-4 h-4" />
              Add Lessons
            </button>
            <button
              onClick={() => handleManualComplete(1)}
              className={`w-full px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                stepCompletion.isStepCompleted(currentTerm, 1)
                  ? 'bg-green-500 text-white cursor-default'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
              disabled={stepCompletion.isStepCompleted(currentTerm, 1)}
            >
              <CheckCircle2 className="w-4 h-4" />
              {stepCompletion.isStepCompleted(currentTerm, 1) ? 'Completed' : 'Mark Complete'}
            </button>
          </div>
        </div>

        {/* Step 2: Add Themed Units */}
        <div className="border rounded-lg p-4 relative cursor-pointer hover:shadow-md transition-all">
          <div className="flex flex-col items-center text-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 font-bold ${
              stepCompletion.isStepCompleted(currentTerm, 2) 
                ? 'bg-green-500 text-white' 
                : 'bg-[#FFC83D] text-white'
            }`}>
              {stepCompletion.isStepCompleted(currentTerm, 2) ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                '2'
              )}
            </div>
            <h3 className="font-medium text-gray-800 mb-1">Add Themed Units</h3>
            <p className="text-sm text-gray-600 mb-4">Group lessons into themes</p>
            <button
              onClick={onStep2AddThemes}
              className="w-full px-4 py-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B535] transition-colors flex items-center justify-center gap-2 mb-2"
            >
              <Target className="w-4 h-4" />
              Add Themes
            </button>
            <button
              onClick={() => handleManualComplete(2)}
              className={`w-full px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                stepCompletion.isStepCompleted(currentTerm, 2)
                  ? 'bg-green-500 text-white cursor-default'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
              disabled={stepCompletion.isStepCompleted(currentTerm, 2)}
            >
              <CheckCircle2 className="w-4 h-4" />
              {stepCompletion.isStepCompleted(currentTerm, 2) ? 'Completed' : 'Mark Complete'}
            </button>
          </div>
        </div>

        {/* Step 3: Edit Individual Lessons */}
        <div className="border rounded-lg p-4 relative cursor-pointer hover:shadow-md transition-all">
          <div className="flex flex-col items-center text-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 font-bold ${
              stepCompletion.isStepCompleted(currentTerm, 3) 
                ? 'bg-green-500 text-white' 
                : 'bg-[#FFC83D] text-white'
            }`}>
              {stepCompletion.isStepCompleted(currentTerm, 3) ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                '3'
              )}
            </div>
            <h3 className="font-medium text-gray-800 mb-1">Edit Individual Lessons</h3>
            <p className="text-sm text-gray-600 mb-4">Add activities to lessons</p>
            <button
              onClick={onStep3EditLessons}
              className="w-full px-4 py-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B535] transition-colors flex items-center justify-center gap-2 mb-2"
            >
              <Edit2 className="w-4 h-4" />
              Edit Lessons
            </button>
            <button
              onClick={() => handleManualComplete(3)}
              className={`w-full px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                stepCompletion.isStepCompleted(currentTerm, 3)
                  ? 'bg-green-500 text-white cursor-default'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
              disabled={stepCompletion.isStepCompleted(currentTerm, 3)}
            >
              <CheckCircle2 className="w-4 h-4" />
              {stepCompletion.isStepCompleted(currentTerm, 3) ? 'Completed' : 'Mark Complete'}
            </button>
          </div>
        </div>

        {/* Step 4: Approve for Teaching */}
        <div className="border rounded-lg p-4 relative cursor-pointer hover:shadow-md transition-all">
          <div className="flex flex-col items-center text-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 font-bold ${
              stepCompletion.isStepCompleted(currentTerm, 4) 
                ? 'bg-green-500 text-white' 
                : 'bg-[#FFC83D] text-white'
            }`}>
              {stepCompletion.isStepCompleted(currentTerm, 4) ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                '4'
              )}
            </div>
            <h3 className="font-medium text-gray-800 mb-1">Approve for Teaching</h3>
            <p className="text-sm text-gray-600 mb-4">Launch into teach module</p>
            <button
              onClick={onStep4ApproveWeek}
              className="w-full px-4 py-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B535] transition-colors flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              Approve Week
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

const EmptyState = ({ onAddLesson }: { onAddLesson: () => void }) => {
  return (
    <div className="bg-white rounded-lg border border-[#A4AAB2] p-12 text-center">
      <div className="w-16 h-16 bg-[#FFF9E7] rounded-full flex items-center justify-center mx-auto mb-4">
        <Calendar className="w-8 h-8 text-[#FFC83D]" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">No lessons yet</h3>
      <p className="text-gray-600 mb-6">Start by adding your first lesson to begin planning</p>
      <button
        onClick={onAddLesson}
        className="relative px-6 py-3 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B535] transition-colors flex items-center gap-2 mx-auto"
      >
        <div className="absolute -top-1 -right-1 w-4 h-4">
          <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
          <div className="absolute inset-0 bg-yellow-500 rounded-full animate-pulse"></div>
          <Sparkles className="w-4 h-4 text-yellow-300 relative z-10" />
        </div>
        <Plus className="w-5 h-5" />
        Add Your First Lesson
      </button>
    </div>
  );
};

// Main Component
function TermSchedule() {
  const navigate = useNavigate();
  const location = useLocation();
  const { showOnboarding, setShowOnboarding, completeOnboarding, setOnboardingStep } = useOnboarding();
  
  // URL Parameters
  const searchParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const termParam = searchParams.get('term');
  const weekParam = searchParams.get('week');
  const returnStepParam = searchParams.get('returnStep');

  // State
  const [currentTerm, setCurrentTerm] = useState(() => getTermFromParam(termParam));
  const [currentWeek, setCurrentWeek] = useState(() => weekParam ? parseInt(weekParam) : 1);
  const [isAddingLesson, setIsAddingLesson] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showGuidance, setShowGuidance] = useState(false);

  // Step completion tracking
  const stepCompletion = useStepCompletion(currentTerm);

  // Store
  const { 
    addLesson, 
    updateLesson, 
    getLessonsByTerm, 
    duplicateLessonsAcrossWeeks,
    getWeekApprovalStatus,
    selectedLessons,
    getSelectedLessons,
    clearLessonSelection
  } = useTimetableStore();

  // Computed Values
  const lessons = useMemo(() => getLessonsByTerm(currentTerm), [currentTerm, getLessonsByTerm]);
  const weekLessons = useMemo(() => lessons.filter(lesson => lesson.week === currentWeek), [lessons, currentWeek]);
  
  // Force re-render when lessons change
  const [, forceUpdate] = useState({});
  useEffect(() => {
    forceUpdate({});
  }, [lessons.length]);
  
  const weekApprovalStatus = useMemo(() => 
    getWeekApprovalStatus ? getWeekApprovalStatus(currentTerm, currentWeek) : false, 
    [currentTerm, currentWeek, getWeekApprovalStatus]
  );
  const selectedLessonsList = getSelectedLessons();

  const progressMetrics = useMemo(() => {
    const hasLessons = lessons.length > 0;
    const hasThemes = lessons.length > 0 && lessons.every(lesson => lesson.theme);
    const hasActivities = lessons.some(lesson => 
      lesson.activities?.starter && lesson.activities?.main && lesson.activities?.plenary
    );

    return { hasLessons, hasThemes, hasActivities };
  }, [lessons]);

  const currentStep = useMemo(() => {
    // Always start at step 1 to ensure consistent planning workflow
    return PLANNING_STEPS.ADD_LESSONS;
  }, []);

  // Helper function for step completion status - moved to main component scope
  const getStepStatus = useCallback((step: number): 'completed' | 'active' | 'pending' | 'available' => {
    const completedSteps = stepCompletion.getCompletedStepsForTerm(currentTerm);
    if (completedSteps.has(step)) return 'completed';
    
    // Determine if step is available based on prerequisites
    switch (step) {
      case 1:
        return 'active'; // Always available
      case 2:
        return completedSteps.has(1) ? 'available' : 'pending';
      case 3:
        return completedSteps.has(2) ? 'available' : 'pending';
      case 4:
        return completedSteps.has(3) ? 'available' : 'pending';
      default:
        return 'pending';
    }
  }, [stepCompletion, currentTerm]);

  useEffect(() => {
    // Only duplicate if we have lessons in week 1
    const weekOneLessons = lessons.filter(lesson => lesson.week === 1);
    if (weekOneLessons.length > 0) {
      duplicateLessonsAcrossWeeks(currentTerm, TERMS[currentTerm].weeks);
    }
  }, [currentTerm, duplicateLessonsAcrossWeeks, lessons.length]);

  // Handle return from other pages with success messages
  useEffect(() => {
    if (returnStepParam) {
      // Clean up the URL
      const term = currentTerm.toLowerCase().split(' ')[0];
      navigate(`/my-timetable?term=${term}`, { replace: true });
      
      // Check which step was completed based on current lesson state
      const hasThemes = lessons.length > 0 && lessons.every(lesson => lesson.theme);
      const hasActivities = lessons.some(lesson => 
        lesson.activities?.starter && lesson.activities?.main && lesson.activities?.plenary
      );
      
      // Ensure step 1 remains completed if lessons exist
      if (lessons.length > 0 && !stepCompletion.isStepCompleted(currentTerm, 1)) {
        stepCompletion.markStepComplete(currentTerm, 1);
      }
      
      if (hasThemes && !stepCompletion.isStepCompleted(currentTerm, 2)) {
        stepCompletion.markStepComplete(currentTerm, 2, "Step 2 completed! Themes have been added to your lessons.");
      }
      
      // Only mark step 3 complete if step 2 is also complete and activities exist
      if (hasActivities && stepCompletion.isStepCompleted(currentTerm, 2) && !stepCompletion.isStepCompleted(currentTerm, 3)) {
        stepCompletion.markStepComplete(currentTerm, 3, "Step 3 completed! Activities have been added to your lessons.");
      }
    }
  }, [returnStepParam, navigate, currentTerm, lessons, stepCompletion]);

  // Event Handlers
  const handleAddLesson = useCallback((lessonsData: LessonData[]) => {
    console.log('Adding lessons:', lessonsData);
    lessonsData.forEach(lessonData => {
      const newLessonData: Lesson = {
        ...lessonData,
        id: generateLessonId(),
        termId: currentTerm,
        status: 'planned',
        week: currentWeek
      };
      console.log('Adding lesson to store:', newLessonData);
      addLesson(newLessonData);
    });
    
    // Trigger duplication after adding lessons
    setTimeout(() => {
      duplicateLessonsAcrossWeeks(currentTerm, TERMS[currentTerm].weeks);
    }, 100);
    
    setIsAddingLesson(false);
    
    // Update onboarding step after first lesson is added
    setOnboardingStep('themes');
  }, [addLesson, currentTerm, currentWeek, setOnboardingStep]);

  const handleEditLesson = useCallback((lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsEditing(true);
    setIsAddingLesson(true);
  }, []);

  const handleSaveEdit = useCallback((lessonData: LessonData[]) => {
    if (!selectedLesson?.id) return;

    const updatedLesson: Lesson = {
      ...lessonData[0],
      id: selectedLesson.id,
      termId: currentTerm,
      status: 'planned',
      week: selectedLesson.week
    };

    const success = updateLesson(updatedLesson);
    if (success) {
      setIsEditing(false);
      setIsAddingLesson(false);
      setSelectedLesson(null);
    }
  }, [selectedLesson, currentTerm, updateLesson]);

  const handleCloseModal = useCallback(() => {
    setIsAddingLesson(false);
    setIsEditing(false);
    setSelectedLesson(null);
  }, []);

  const handleTermChange = useCallback((term: string) => {
    setCurrentTerm(term);
  }, []);

  // Step handlers with proper return path setup
  const handleStep1AddLessons = () => {
    setIsAddingLesson(true);
  };

  const handleStep2AddThemes = () => {
    // Store return path in sessionStorage for the floating button
    const returnPath = `/my-timetable?term=${currentTerm.toLowerCase().split(' ')[0]}&returnStep=true`;
    sessionStorage.setItem('returnPath', returnPath);
    navigate('/curriculum-objectives');
  };

  const handleStep3EditLessons = () => {
    // Store return path in sessionStorage for the floating button
    const returnPath = `/my-timetable?term=${currentTerm.toLowerCase().split(' ')[0]}&returnStep=true`;
    sessionStorage.setItem('returnPath', returnPath);
    navigate('/resources');
  };

  const handleStep4ApproveWeek = () => {
    navigate(`/approve-week?term=${currentTerm.toLowerCase().split(' ')[0]}&week=${currentWeek}`);
  };

  // Manual completion handler for step 1
  const handleCompleteStep1 = () => {
    stepCompletion.markStepComplete(currentTerm, 1, "Step 1 completed! Your lesson schedule is ready.");
  };

  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#F8F9FA]">
      <div className="max-w-[1400px] mx-auto px-4 py-2 w-full">
        
        {/* Success Notification */}
        {stepCompletion.showSuccessMessage && (
          <SuccessNotification 
            message={stepCompletion.showSuccessMessage}
            onClose={() => stepCompletion.setShowSuccessMessage(null)}
          />
        )}
        
        {/* Header Section */}
        <HeaderSection
          currentTerm={currentTerm}
          currentStep={currentStep}
          currentWeek={currentWeek}
          onTermChange={handleTermChange}
          showGuidance={showGuidance}
          onToggleGuidance={setShowGuidance}
        />

        {/* Smart Planning Steps */}
        <SmartPlanningSteps
          currentStep={PLANNING_STEPS.ADD_LESSONS}
          lessons={lessons}
          selectedLessons={selectedLessonsList}
          currentTerm={currentTerm}
          currentWeek={currentWeek}
          weekApprovalStatus={weekApprovalStatus}
          onStep1AddLessons={handleStep1AddLessons}
          onStep2AddThemes={handleStep2AddThemes}
          onStep3EditLessons={handleStep3EditLessons}
          onStep4ApproveWeek={handleStep4ApproveWeek}
          stepCompletion={stepCompletion}
          navigate={navigate}
        />

        {/* Main Content */}
        {weekLessons.length === 0 && currentStep === PLANNING_STEPS.ADD_LESSONS ? (
          <div className="bg-white rounded-lg border border-[#A4AAB2] p-12 text-center">
            <div className="w-16 h-16 bg-[#FFF9E7] rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-[#FFC83D]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No lessons yet</h3>
            <p className="text-gray-600 mb-6">
              {lessons.length === 0 
                ? 'Use the "Add Lessons" button above to begin planning'
                : `No lessons for Week ${currentWeek}. Lessons exist for other weeks.`
              }
            </p>
            <button
              onClick={() => setIsAddingLesson(true)}
              className="px-6 py-3 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B535] transition-colors flex items-center gap-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              Add Lessons
            </button>
          </div>
        ) : weekLessons.length > 0 ? (
          <div className="bg-white rounded-lg border border-[#A4AAB2] overflow-hidden">
            {/* Timetable Header */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#FFF9E7] rounded-lg flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-[#FFC83D]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{TERMS[currentTerm].name}</h2>
                    <p className="text-sm text-gray-600">
                      Week {currentWeek} of {TERMS[currentTerm].weeks} • {weekLessons.length} lesson{weekLessons.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {/* Add Lessons Button - Only show on step 1 */}
                  {!stepCompletion.isStepCompleted(currentTerm, 1) && (
                    <button
                      onClick={() => setIsAddingLesson(true)}
                      className="px-4 py-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B535] transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Lessons
                    </button>
                  )}
                  
                  {/* Week Navigation */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentWeek(prev => Math.max(1, prev - 1))}
                      disabled={currentWeek === 1}
                      className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4 text-gray-600" />
                    </button>
                    <div className="px-3 py-1 bg-[#FFC83D]/10 text-[#FFC83D] rounded-lg font-medium text-sm">
                      Week {currentWeek}
                    </div>
                    <button
                      onClick={() => setCurrentWeek(prev => Math.min(TERMS[currentTerm].weeks, prev + 1))}
                      disabled={currentWeek === TERMS[currentTerm].weeks}
                      className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  {selectedLessonsList.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{selectedLessonsList.length} selected</span>
                      <button
                        onClick={clearLessonSelection}
                        className="text-xs text-gray-500 hover:text-gray-700 underline"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {getStepStatus(1) !== 'completed' && weekLessons.length > 0 && (
                <div className="mt-4">
                  <button
                    onClick={handleCompleteStep1}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Mark Step 1 Complete
                  </button>
                </div>
              )}
            </div>
            
            <VerticalTimetable 
              term={TERMS[currentTerm]}
              termId={currentTerm}
              onEditLesson={handleEditLesson}
              currentWeek={currentWeek}
            />
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-[#A4AAB2] p-12 text-center">
            <div className="w-16 h-16 bg-[#FFF9E7] rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-[#FFC83D]" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No lessons for Week {currentWeek}</h3>
            <p className="text-gray-600 mb-6">
              Lessons exist for other weeks. Use week navigation or add lessons to this week.
            </p>
            <button
              onClick={() => setIsAddingLesson(true)}
              className="px-6 py-3 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B535] transition-colors flex items-center gap-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              Add Lessons
            </button>
          </div>
        )}

      </div>

      {/* Modals */}
      <AddLessonModal
        isOpen={isAddingLesson}
        onClose={handleCloseModal}
        onSave={isEditing ? handleSaveEdit : handleAddLesson}
        initialData={selectedLesson}
        isEditing={isEditing}
        currentTerm={currentTerm}
        currentWeek={currentWeek}
      />

      {/* Contextual Onboarding */}
      <OnboardingTour
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={completeOnboarding}
        currentContext="planning"
      />
    </div>
  );
}

export default TermSchedule;