import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Target, BookOpen, ChevronDown, CheckCircle2, Plus, 
  Info, ArrowRight, Users, Clock, Calendar, Lightbulb, Edit2, ChevronRight,
  Sparkles, Play, Eye, ChevronLeft, ExternalLink, GraduationCap, Brain, X, Save
} from 'lucide-react';
import { useTimetableStore, Lesson } from '../store/timetableStore';
import { TERMS } from '../store/termStore';
import { AddLessonModal } from '../components/AddLessonModal';
import { ActivityDetailsModal } from '../components/ActivityDetailsModal';
import { StudentActivityModal } from '../components/StudentActivityModal';
import { LessonEditPopup } from '../components/LessonEditPopup';
import { getStudentActivityByLessonAndPhase } from '../data/studentActivities';
import { allEnhancedActivities } from '../data/enhancedLessonActivities';
import InteractiveExplorationTemplate from '../components/templates/InteractiveExplorationTemplate';

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

interface Activity {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: string;
  dialogic_structure?: string;
}

interface ActivityWithMeta extends Activity {
  activity_type: string;
  subject: string;
  year_group: string;
}

// Constants
const PLANNING_STEPS = {
  ADD_LESSONS: 1,
  ADD_THEMES: 2,
  EDIT_LESSONS: 3,
  APPROVE_WEEK: 4
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
  const router = useRouter();

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push('/my-timetable')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Edit Lessons</h1>
            <p className="text-gray-600">Add activities and content to your lessons</p>
          </div>
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

const SimplifiedPlanningSteps = ({
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
  navigate
}: {
  currentStep: number;
  lessons: Lesson[];
  selectedLessons: Lesson[];
  currentTerm: string;
  currentWeek: number;
  weekApprovalStatus: string;
  onStep1AddLessons: () => void;
  onStep2AddThemes: () => void;
  onStep3EditLessons: () => void;
  onStep4ApproveWeek: () => void;
  navigate: (path: string) => void;
}) => {

  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set([1, 2])); // Steps 1 & 2 completed by this point

  const handleManualComplete = (step: number) => {
    setCompletedSteps(prev => new Set([...prev, step]));
    if (step === 3) {
      // Navigate to step 4 when step 3 is completed
      setTimeout(() => {
        navigate(`/approve-week?term=${currentTerm.toLowerCase().split(' ')[0]}&week=${currentWeek}`);
      }, 1000);
    }
  };
  return (
    <div className="bg-white rounded-lg border border-[#A4AAB2] p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Planning Steps</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>{completedSteps.size}/4</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {/* Step 1: Add Lessons */}
        <div className="border rounded-lg p-4 relative cursor-pointer hover:shadow-md transition-all">
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center mb-3 font-bold">
              <CheckCircle2 className="w-5 h-5" />
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
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg cursor-default flex items-center justify-center gap-2"
              disabled
            >
              <CheckCircle2 className="w-4 h-4" />
              Completed
            </button>
          </div>
        </div>

        {/* Step 2: Add Themed Units */}
        <div className="border rounded-lg p-4 relative cursor-pointer hover:shadow-md transition-all">
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center mb-3 font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="font-medium text-gray-800 mb-1">Add Themed Units</h3>
            <p className="text-sm text-gray-600 mb-4">Group lessons into themes</p>
            <button
              className="w-full px-4 py-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B535] transition-colors flex items-center justify-center gap-2 mb-2"
            >
              <Target className="w-4 h-4" />
              Add Themes
            </button>
            <button
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg cursor-default flex items-center justify-center gap-2"
              disabled
            >
              <CheckCircle2 className="w-4 h-4" />
              Completed
            </button>
          </div>
        </div>

        {/* Step 3: Edit Individual Lessons */}
        <div className="border rounded-lg p-4 relative cursor-pointer hover:shadow-md transition-all">
          <div className="flex flex-col items-center text-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 font-bold ${
              completedSteps.has(3) 
                ? 'bg-green-500 text-white' 
                : 'bg-[#FFC83D] text-white'
            }`}>
              {completedSteps.has(3) ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                '3'
              )}
            </div>
            <h3 className="font-medium text-gray-800 mb-1">Edit Individual Lessons</h3>
            <p className="text-sm text-gray-600 mb-4">Add activities and content</p>
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
                completedSteps.has(3)
                  ? 'bg-green-500 text-white cursor-default'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
              disabled={completedSteps.has(3)}
            >
              <CheckCircle2 className="w-4 h-4" />
              {completedSteps.has(3) ? 'Completed' : 'Mark Complete'}
            </button>
          </div>
        </div>

        {/* Step 4: Approve for Teaching */}
        <div className="border rounded-lg p-4 relative cursor-pointer hover:shadow-md transition-all">
          <div className="flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-full bg-[#FFC83D] text-white flex items-center justify-center mb-3 font-bold">
              4
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

const GuidancePanel = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
  if (!isVisible) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Lesson Planning Tips</h3>
            <ul className="space-y-2 text-sm text-blue-700">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Start with clear learning objectives for each lesson</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Plan engaging starter activities to capture attention</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Design main activities that match your learning objectives</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Include plenary activities to assess understanding</span>
              </li>
            </ul>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-blue-400 hover:text-blue-600 transition-colors"
        >
          <CheckCircle2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// Simple Edit Lesson Popup Component
const EditLessonPopup = ({ lesson, onClose }: { lesson: Lesson; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Edit Lesson: {lesson.subject}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ×
          </button>
        </div>
        <div className="space-y-4">
          <p className="text-gray-600">
            Lesson editing interface would be rendered here with AI capabilities.
          </p>
          <p className="text-gray-600">
            This would contain the full EditLessonPopup component with edit, delete, and AI buttons for each panel.
          </p>
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
const LessonEditPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // URL params
  const termParam = searchParams.get('term');
  const weekParam = searchParams.get('week');
  
  // State
  const [currentTerm, setCurrentTerm] = useState(() => getTermFromParam(termParam));
  const [currentWeek, setCurrentWeek] = useState(() => weekParam ? parseInt(weekParam, 10) : 1);
  const [showGuidance, setShowGuidance] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewingActivity, setViewingActivity] = useState<ActivityWithMeta | null>(null);
  const [showStudentActivity, setShowStudentActivity] = useState<any>(null);
  const [showEditLessonPopup, setShowEditLessonPopup] = useState<Lesson | null>(null);
  const [showInteractiveLessonEdit, setShowInteractiveLessonEdit] = useState<Lesson | null>(null);
  
  // Store hooks
  const { 
    getLessonsByTerm,
    getSelectedLessons,
    getWeekApprovalStatus,
    clearLessonSelection,
    updateLessonActivities
  } = useTimetableStore();

  // Computed values
  const lessons = useMemo(() => 
    getLessonsByTerm(currentTerm),
    [getLessonsByTerm, currentTerm, currentWeek]
  );
  
  const weekLessons = useMemo(() => 
    lessons.filter(lesson => lesson.week === currentWeek),
    [lessons, currentWeek]
  );
  
  const selectedLessons = useMemo(() => getSelectedLessons(), [getSelectedLessons]);
  
  const weekApprovalStatus = useMemo(() => 
    getWeekApprovalStatus ? getWeekApprovalStatus(currentTerm, currentWeek) : 'pending',
    [getWeekApprovalStatus, currentTerm, currentWeek]
  );
  
  const currentStep = PLANNING_STEPS.EDIT_LESSONS;

  // Handlers
  const handleTermChange = useCallback((term: string) => {
    setCurrentTerm(term);
    // Update URL without navigation
    const newSearchParams = new URLSearchParams();
    searchParams.forEach((value, key) => newSearchParams.set(key, value));
    newSearchParams.set('term', term.toLowerCase().replace(' ', ''));
    router.replace(`/resources?${newSearchParams.toString()}`);
  }, [searchParams, router]);

  const handleToggleGuidance = useCallback((show: boolean) => {
    setShowGuidance(show);
  }, []);

  // Step navigation handlers
  const onStep1AddLessons = useCallback(() => {
    router.push('/my-timetable');
  }, [router]);

  const onStep2AddThemes = useCallback(() => {
    router.push('/curriculum-objectives');
  }, [router]);

  const onStep3EditLessons = useCallback(() => {
    // Already on this page
  }, []);

  const onStep4ApproveWeek = useCallback(() => {
    router.push(`/approve-week?term=${currentTerm}&week=${currentWeek}`);
  }, [router, currentTerm, currentWeek]);

  // Effects
  useEffect(() => {
    // Clear any selected lessons when component mounts
    clearLessonSelection();
  }, [clearLessonSelection]);

  // Helper function to get activity route
  const getActivityRoute = (lesson: Lesson, activityType: string) => {
    if (lesson.theme === 'Dystopian Fiction') {
      const lessonNumber = lesson.week;
      if (lessonNumber >= 1 && lessonNumber <= 6) {
        return `/lesson/dystopian-lesson-${lessonNumber}/${activityType}`;
      }
    }
    return null;
  };

  // Handle viewing interactive lesson
  const handleViewInteractiveLesson = (lesson: Lesson, activityType: string) => {
    const route = getActivityRoute(lesson, activityType);
    if (route) {
      navigate(route, { 
        state: { 
          lesson: {
            yearGroup: lesson.yearGroup,
            class: lesson.class,
            subject: lesson.subject,
            theme: lesson.theme,
            title: lesson.activities?.[activityType as keyof typeof lesson.activities]?.title,
            learningObjective: lesson.activities?.[activityType as keyof typeof lesson.activities]?.description
          }
        }
      });
    } else {
      // Fallback to activity details modal
      const activity = lesson.activities?.[activityType as keyof typeof lesson.activities];
      if (activity) {
        setViewingActivity({
          ...activity,
          activity_type: activityType,
          subject: lesson.subject,
          year_group: lesson.yearGroup
        });
      }
    }
  };

  // Handle viewing student activity
  const handleViewStudentActivity = (lesson: Lesson, activityType: string) => {
    const lessonNumber = lesson.week;
    const studentActivity = getStudentActivityByLessonAndPhase(`dystopian-lesson-${lessonNumber}`, activityType);
    
    if (studentActivity) {
      setShowStudentActivity(studentActivity);
    } else {
      // Create a generic student activity based on the lesson
      const genericActivity = {
        id: `${lesson.id}-${activityType}-student`,
        lessonNumber: lessonNumber,
        title: lesson.activities?.[activityType as keyof typeof lesson.activities]?.title || `${activityType} Activity`,
        description: lesson.activities?.[activityType as keyof typeof lesson.activities]?.description || 'Student activity worksheet',
        phase: activityType,
        duration: lesson.activities?.[activityType as keyof typeof lesson.activities]?.duration || '10 mins',
        type: 'worksheet',
        subject: lesson.subject,
        year_group: lesson.yearGroup,
        learning_objective: lesson.activities?.[activityType as keyof typeof lesson.activities]?.description || 'Complete the activity tasks',
        instructions: [
          'Read the instructions carefully',
          'Complete all sections of the worksheet',
          'Ask for help if you need clarification',
          'Submit your completed work'
        ],
        tasks: [
          {
            id: 'main-task',
            title: 'Main Activity Task',
            description: lesson.activities?.[activityType as keyof typeof lesson.activities]?.description || 'Complete the main activity',
            type: 'text_input',
            guidance: 'Follow the instructions and provide detailed responses'
          }
        ],
        success_criteria: [
          'Complete all required tasks',
          'Demonstrate understanding of key concepts',
          'Provide clear and detailed responses'
        ],
        differentiation: {
          support: [
            'Provide additional guidance for struggling students',
            'Use visual aids and examples',
            'Offer sentence starters and prompts'
          ],
          extension: [
            'Provide additional challenges for advanced students',
            'Encourage deeper analysis and reflection',
            'Offer opportunities for creative expression'
          ]
        },
        assessment_rubric: [
          {
            level: 'Secure',
            descriptors: [
              'Demonstrates clear understanding',
              'Completes all tasks thoroughly',
              'Shows evidence of deeper thinking'
            ]
          },
          {
            level: 'Developing',
            descriptors: [
              'Shows basic understanding',
              'Completes most tasks',
              'Demonstrates some engagement'
            ]
          }
        ],
        pdf_content: {
          header: lesson.activities?.[activityType as keyof typeof lesson.activities]?.title || `${activityType} Activity`,
          instructions: [
            'Read the instructions carefully',
            'Complete all sections of the worksheet',
            'Ask for help if you need clarification',
            'Submit your completed work'
          ],
          worksheet_sections: [
            {
              title: 'Main Activity',
              content: lesson.activities?.[activityType as keyof typeof lesson.activities]?.description || 'Complete the main activity task.',
              space_for_answers: true
            }
          ],
          footer: 'Good luck with your learning!'
        }
      };
      setShowStudentActivity(genericActivity);
    }
  };

  // Check if lesson has activities
  const isLessonFullyPlanned = (lesson: Lesson) => {
    return lesson.activities?.starter && 
           lesson.activities?.main && 
           lesson.activities?.plenary;
  };


  const handleEditLesson = (lesson: Lesson) => {
    // Open interactive lesson editing popup
    setShowInteractiveLessonEdit(lesson);
  };

  const handleSaveLessonChanges = (updatedLesson: Lesson) => {
    // Save changes to user's personal lesson data, not the main library
    updateLessonActivities(updatedLesson.id, updatedLesson.activities, updatedLesson.theme);
    setShowEditLessonPopup(null);
  };

  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#F8F9FA]">
      <div className="max-w-[1400px] mx-auto px-4 py-2 w-full">
        <HeaderSection
          currentTerm={currentTerm}
          currentStep={currentStep}
          currentWeek={currentWeek}
          onTermChange={handleTermChange}
          showGuidance={showGuidance}
          onToggleGuidance={handleToggleGuidance}
        />

        <SimplifiedPlanningSteps
          currentStep={currentStep}
          lessons={lessons}
          selectedLessons={selectedLessons}
          currentTerm={currentTerm}
          currentWeek={currentWeek}
          weekApprovalStatus={weekApprovalStatus}
          onStep1AddLessons={onStep1AddLessons}
          onStep2AddThemes={onStep2AddThemes}
          onStep3EditLessons={onStep3EditLessons}
          onStep4ApproveWeek={onStep4ApproveWeek}
          navigate={navigate}
        />

        <GuidancePanel 
          isVisible={showGuidance} 
          onClose={() => setShowGuidance(false)} 
        />

        {/* Main Content Area */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Edit Lessons - All Weeks
              </h2>
              <p className="text-gray-600">
                {lessons.length} lesson{lessons.length !== 1 ? 's' : ''} for {TERMS[currentTerm]?.name}
              </p>
            </div>
            <div className="flex items-center gap-3">
            </div>
          </div>

          {/* Lessons Grid/List */}
          {lessons.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-600 mb-2">No lessons found</h3>
              <p className="text-gray-500 mb-4">
                Start by adding some lessons to your timetable
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B434] transition-colors"
              >
                Add Your First Lesson
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Group lessons by week */}
              {Array.from({ length: TERMS[currentTerm].weeks }, (_, i) => i + 1).map(week => {
                const weekLessons = lessons.filter(lesson => lesson.week === week);
                if (weekLessons.length === 0) return null;
                
                return (
                  <div key={week} className="space-y-3">
                    <div className="flex items-center gap-3 py-2 border-b border-gray-200">
                      <div className="w-8 h-8 bg-[#FFC83D] text-white rounded-lg flex items-center justify-center font-bold">
                        {week}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">Week {week}</h3>
                      <span className="text-sm text-gray-600">
                        {weekLessons.length} lesson{weekLessons.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    {weekLessons.map((lesson) => (
                      <div key={lesson.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center font-bold text-lg">
                              {lesson.week}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 text-lg mb-1">
                                {lesson.subject} - {lesson.yearGroup} {lesson.class}
                              </h4>
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                  <Clock className="w-3 h-3" />
                                  <span>{lesson.day} {lesson.startTime}</span>
                                </div>
                                {lesson.theme && (
                                  <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium">
                                    {lesson.theme}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            {/* View & Edit Lesson Button */}
                            <button
                              onClick={() => handleEditLesson(lesson)}
                              className="px-4 py-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B434] transition-colors flex items-center gap-2"
                            >
                              <Edit2 className="w-4 h-4" />
                              <span>View & Edit Lesson</span>
                            </button>
                            
                            {isLessonFullyPlanned(lesson) && (
                              <button
                                onClick={() => handleViewStudentActivity(lesson, 'starter')}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                                title="View student activity with PDF"
                              >
                                <GraduationCap className="w-4 h-4" />
                                <span>View Student Activity</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Add Lesson Modal */}
        {showAddModal && (
          <AddLessonModal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            onSave={(lessonsData: LessonData[]) => {
              // Handle saving lessons
              console.log('Saving lessons:', lessonsData);
              setShowAddModal(false);
            }}
            initialData={null}
            isEditing={false}
            currentTerm={currentTerm}
            currentWeek={currentWeek}
          />
        )}

        {/* Activity Details Modal */}
        {viewingActivity && (
          <ActivityDetailsModal
            activity={viewingActivity}
            onClose={() => setViewingActivity(null)}
            readOnly={true}
          />
        )}

        {/* Student Activity Modal */}
        {showStudentActivity && (
          <StudentActivityModal
            activity={showStudentActivity}
            onClose={() => setShowStudentActivity(null)}
          />
        )}

        {/* Interactive Lesson Edit Popup */}
        {showInteractiveLessonEdit && (
          <InteractiveLessonEditPopup
            lesson={showInteractiveLessonEdit}
            onClose={() => setShowInteractiveLessonEdit(null)}
            onSave={handleSaveLessonChanges}
          />
        )}
      </div>
    </div>
  );
};

// Interactive Lesson Edit Popup Component
const InteractiveLessonEditPopup = ({ lesson, onClose, onSave }: { 
  lesson: Lesson; 
  onClose: () => void; 
  onSave: (lesson: Lesson) => void; 
}) => {
  // Check if this is a dystopian lesson that should use the interactive template
  const isDystopianLesson = lesson.theme === 'Dystopian Fiction' && lesson.week >= 1 && lesson.week <= 6;
  
  if (isDystopianLesson) {
    // For dystopian lessons, show the interactive template with edit capabilities
    const templateLessonData = {
      title: lesson.activities?.starter?.title || "Dystopian World Discovery",
      learning_objective: lesson.activities?.starter?.description || "I can understand and identify features of dystopian settings and recognize how they reflect social commentary",
      activity_type: "Interactive Exploration",
      exploration_focus: "Hands-on exploration of dystopian world characteristics",
      interactive_elements: [
        {
          element_type: 'hands_on_activity' as const,
          title: 'Dystopian Image Analysis Sprint',
          description: 'Rapidly analyze dystopian images to identify key visual features and atmospheric elements',
          materials: ['Dystopian image collection', 'Feature identification sheets', 'Timer for rapid analysis']
        },
        {
          element_type: 'scenario_analysis' as const,
          title: 'World-Building Speed Challenge',
          description: 'Quick-fire creation of dystopian world elements using prompts and constraints',
          materials: ['World-building prompt cards', 'Constraint challenge sheets', 'Collaborative planning tools']
        }
      ],
      discovery_questions: [
        "What visual elements immediately signal a dystopian world?",
        "How do dystopian societies control their citizens?",
        "What role does technology play in dystopian control?",
        "How do dystopian worlds reflect real-world concerns?"
      ],
      collaboration_structure: [
        "Work in small teams to analyze different dystopian examples",
        "Share findings through rapid-fire presentations",
        "Build collective understanding of genre conventions"
      ],
      theme: "Dystopian Fiction"
    };

    const navigationData = {
      previousRoute: '/resources',
      nextRoute: '/resources'
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-7xl max-h-[95vh] overflow-y-auto m-4">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-gray-800">Edit Lesson: {lesson.subject}</h2>
              <div className="flex items-center gap-2">
                <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  Personal Copy
                </div>
                <span className="text-sm text-gray-600">Changes saved to your account</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="h-full">
            <InteractiveExplorationTemplate
              lessonData={templateLessonData}
              navigationData={navigationData}
              showEditButtons={true}
            />
          </div>
        </div>
      </div>
    );
  }
  
  // For non-dystopian lessons, show the standard lesson edit popup
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-7xl max-h-[95vh] overflow-y-auto m-4">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-800">Edit Lesson: {lesson.subject}</h2>
            <div className="flex items-center gap-2">
              <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                Personal Copy
              </div>
              <span className="text-sm text-gray-600">Changes saved to your account</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6">
          <LessonEditPopup
            lesson={lesson}
            onClose={onClose}
            onSave={onSave}
          />
        </div>
      </div>
    </div>
  );
};
export default LessonEditPage;