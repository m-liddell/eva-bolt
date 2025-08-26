import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  ChevronLeft, 
  ChevronRight,
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  Edit2, 
  Clock, 
  Users, 
  Target, 
  BookOpen, 
  Brain, 
  X, 
  Check, 
  AlertCircle, 
  FileText, 
  ChevronDown,
  Sparkles,
  Calendar,
  Plus,
  Play
} from 'lucide-react';
import { useTimetableStore } from '../store/timetableStore';
import { TERMS } from '../store/termStore';
import { ActivityDetailsModal } from '../components/ActivityDetailsModal';

// Import the utility function to map URL params to term keys
const getTermFromParam = (param: string): string => {
  const termMap: Record<string, string> = {
    'autumn': 'Autumn 1',
    'spring': 'Spring 1', 
    'summer': 'Summer 1'
  };
  return termMap[param.toLowerCase()] || 'Autumn 1';
};

// Types
interface ApprovalIssue {
  type: 'content' | 'objective' | 'activity' | 'timing';
  severity: 'warning' | 'error';
  message: string;
  suggestion?: string;
}

interface LessonApproval {
  lessonId: string;
  approved: boolean;
  issues: ApprovalIssue[];
  teacherNotes: string;
  lastReviewed: Date;
}

type ApprovalStatus = 'approved' | 'needs-review' | 'blocked' | 'ready';
type ActivityType = 'starter' | 'main' | 'plenary';

// Constants
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;
const LESSON_DURATION_LIMIT = 70;

const STATUS_STYLES = {
  approved: 'bg-green-50 border-green-500 text-green-700',
  'needs-review': 'bg-amber-50 border-amber-500 text-amber-700',
  blocked: 'bg-red-50 border-red-500 text-red-700',
  ready: 'bg-blue-50 border-blue-500 text-blue-700',
  default: 'bg-gray-50 border-gray-300 text-gray-600'
} as const;

const STATUS_ICONS = {
  approved: <CheckCircle2 className="w-5 h-5 text-green-600" />,
  'needs-review': <AlertTriangle className="w-5 h-5 text-amber-600" />,
  blocked: <X className="w-5 h-5 text-red-600" />,
  ready: <Check className="w-5 h-5 text-blue-600" />,
  default: <AlertCircle className="w-5 h-5 text-gray-400" />
} as const;

const ACTIVITY_ICONS = {
  starter: <Brain className="w-3 h-3 text-blue-600" />,
  main: <BookOpen className="w-3 h-3 text-amber-600" />,
  plenary: <CheckCircle2 className="w-3 h-3 text-green-600" />
} as const;

// Utility Functions
const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const period = Number(hours) >= 12 ? 'PM' : 'AM';
  const displayHours = Number(hours) > 12 ? Number(hours) - 12 : Number(hours);
  return `${displayHours}:${minutes} ${period}`;
};

const getStatusColor = (status: ApprovalStatus): string => 
  STATUS_STYLES[status] || STATUS_STYLES.default;

const getStatusIcon = (status: ApprovalStatus) => 
  STATUS_ICONS[status] || STATUS_ICONS.default;

const getStepStatus = (step: number): 'completed' | 'active' | 'pending' => {
  if (step === 4) return 'active';
  if (step < 4) return 'completed';
  return 'pending';
};

// Default Activities Data
const getDystopianActivities = (weekNumber: number) => {
  const dystopianLessons = [
    {
      starter: {
        id: 'dystopian-lesson-1-starter',
        title: 'Dystopian World Discovery',
        description: 'Understand and identify features of dystopian settings and recognize how they reflect social commentary',
        duration: '10 mins',
        type: 'discussion'
      },
      main: {
        id: 'dystopian-lesson-1-main',
        title: 'Dystopian Features Exploration Workshop',
        description: 'Analyze dystopian setting characteristics through multimedia and create identification guides',
        duration: '40 mins',
        type: 'group'
      },
      plenary: {
        id: 'dystopian-lesson-1-plenary',
        title: 'Dystopian Feature Gallery',
        description: 'Consolidate understanding of dystopian features and evaluate their psychological impact',
        duration: '10 mins',
        type: 'discussion'
      }
    },
    {
      starter: {
        id: 'dystopian-lesson-2-starter',
        title: 'Complete Sentence Foundation',
        description: 'Identify complete sentences and understand their importance for clear dystopian descriptions',
        duration: '10 mins',
        type: 'discussion'
      },
      main: {
        id: 'dystopian-lesson-2-main',
        title: 'Dystopian Sentence Construction Workshop',
        description: 'Master complete sentence components using dystopian examples and practice atmospheric writing',
        duration: '40 mins',
        type: 'individual'
      },
      plenary: {
        id: 'dystopian-lesson-2-plenary',
        title: 'Sentence Showcase',
        description: 'Evaluate and share the most atmospheric complete sentences created during the lesson',
        duration: '10 mins',
        type: 'discussion'
      }
    }
    // Add remaining weeks...
  ];
  
  const lessonIndex = Math.max(0, Math.min(weekNumber - 1, dystopianLessons.length - 1));
  return dystopianLessons[lessonIndex];
};

const getDefaultActivities = () => ({
  starter: {
    id: 'generic-starter',
    title: 'Quick Discussion',
    description: 'Start with a thought-provoking question to engage students',
    duration: '10 mins',
    type: 'discussion'
  },
  main: {
    id: 'generic-main',
    title: 'Interactive Learning',
    description: 'Main teaching activity with student participation',
    duration: '40 mins',
    type: 'interactive'
  },
  plenary: {
    id: 'generic-plenary',
    title: 'Reflection & Summary',
    description: 'Consolidate learning and check understanding',
    duration: '10 mins',
    type: 'reflection'
  }
});

// Custom Hooks
const useUrlParams = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const termParam = getTermFromParam(searchParams.get('term') || 'autumn');
  const weekParam = parseInt(searchParams.get('week') || '1');
  
  return { termParam, weekParam };
};

const useLessonAnalysis = () => {
  const isLessonFullyPlanned = (lesson: any): boolean => {
    return lesson.activities?.starter && 
           lesson.activities?.main && 
           lesson.activities?.plenary;
  };

  const analyzeLessonIssues = (lesson: any): ApprovalIssue[] => {
    const issues: ApprovalIssue[] = [];

    // Check for missing activities (only for non-themed lessons)
    if (!lesson.theme && !isLessonFullyPlanned(lesson)) {
      issues.push({
        type: 'activity',
        severity: 'warning',
        message: 'Lesson is missing required activities (starter, main, or plenary)',
        suggestion: 'Add missing activities before approval'
      });
    }

    // Check for learning objectives
    if (!lesson.objectives || lesson.objectives.length === 0) {
      issues.push({
        type: 'objective',
        severity: 'warning',
        message: 'No learning objectives assigned',
        suggestion: 'Add curriculum-aligned learning objectives'
      });
    }

    // Check for theme
    if (!lesson.theme) {
      issues.push({
        type: 'content',
        severity: 'warning',
        message: 'No theme assigned to lesson',
        suggestion: 'Add a theme to provide coherent learning experience'
      });
    }

    // Check timing
    const totalDuration = [
      lesson.activities?.starter?.duration,
      lesson.activities?.main?.duration,
      lesson.activities?.plenary?.duration
    ].filter(Boolean).reduce((total, duration) => {
      const minutes = parseInt(duration?.match(/\d+/)?.[0] || '0');
      return total + minutes;
    }, 0);

    if (totalDuration > LESSON_DURATION_LIMIT) {
      issues.push({
        type: 'timing',
        severity: 'warning',
        message: `Total lesson time (${totalDuration} mins) exceeds typical 60-minute period`,
        suggestion: 'Consider reducing activity durations or splitting content'
      });
    }

    return issues;
  };

  return { isLessonFullyPlanned, analyzeLessonIssues };
};

// Components
const WeekSelector: React.FC<{
  currentTerm: string;
  currentWeek: number;
  onTermWeekChange: (term: string, week: number) => void;
}> = ({ currentTerm, currentWeek, onTermWeekChange }) => (
  <div className="relative inline-block">
    <button className="flex items-center gap-1 px-2 py-1 bg-white border border-[#FFC83D] text-[#FFC83D] rounded-lg font-medium text-xs">
      <span>{TERMS[currentTerm].name} - Week {currentWeek}</span>
      <ChevronDown className="w-3 h-3" />
    </button>
    <select
      value={`${currentTerm}-${currentWeek}`}
      onChange={(e) => {
        const [term, week] = e.target.value.split('-');
        onTermWeekChange(term, parseInt(week));
      }}
      className="absolute inset-0 w-full opacity-0 cursor-pointer"
    >
      {Object.entries(TERMS).map(([termKey, term]) => 
        Array.from({ length: term.weeks }, (_, i) => i + 1).map(week => (
          <option key={`${termKey}-${week}`} value={`${termKey}-${week}`}>
            {term.name} - Week {week}
          </option>
        ))
      )}
    </select>
  </div>
);

const LessonActivity: React.FC<{
  activity: any;
  type: ActivityType;
  isWeekApproved: boolean;
  onViewActivity: () => void;
}> = ({ activity, type, isWeekApproved, onViewActivity }) => (
  <div className={`p-3 rounded-lg border transition-colors ${
    isWeekApproved 
      ? 'bg-green-50 border-green-300 hover:border-green-400' 
      : 'bg-white border-gray-200 hover:border-[#FFC83D]'
  }`}>
    <div className={`mb-2 p-2 rounded border ${
      isWeekApproved 
        ? 'bg-green-100 border-green-300' 
        : 'bg-blue-50 border-blue-200'
    }`}>
      <div className="flex items-center gap-2 mb-1">
        <Target className={`w-3 h-3 ${isWeekApproved ? 'text-green-700' : 'text-blue-600'}`} />
        <span className={`text-xs font-medium ${isWeekApproved ? 'text-green-800' : 'text-blue-800'}`}>
          Learning Objective:
        </span>
      </div>
      <div className={`text-xs ml-5 ${isWeekApproved ? 'text-green-700' : 'text-blue-700'}`}>
        {activity.description}
      </div>
    </div>
    
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-3 flex-1">
        {ACTIVITY_ICONS[type]}
        <div>
          <div className="text-xs font-medium capitalize text-gray-700">{type} Activity</div>
          <div className="text-sm font-medium text-gray-900">{activity.title}</div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{activity.duration}</span>
            </div>
            <div className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
              {activity.type}
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={onViewActivity}
        className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        title={`View ${type} activity details`}
      >
        <Eye className="w-4 h-4" />
      </button>
    </div>
  </div>
);

const ApprovalSummary: React.FC<{
  weekLessons: any[];
  isWeekApproved: boolean;
  currentWeek: number;
  onApproveWeek: () => void;
  getLessonApprovalStatus: (lesson: any) => any;
}> = ({ weekLessons, isWeekApproved, currentWeek, onApproveWeek, getLessonApprovalStatus }) => {
  const lessonsWithIssues = weekLessons.filter(lesson => {
    if (isWeekApproved) return false;
    const status = getLessonApprovalStatus(lesson);
    return status.issues.length > 0 && !status.approved;
  }).length;

  const blockingIssues = weekLessons.filter(lesson => {
    if (isWeekApproved) return false;
    const status = getLessonApprovalStatus(lesson);
    return status.status === 'blocked' && !status.approved;
  }).length;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Week Approval Summary</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="text-2xl font-bold text-blue-600">{weekLessons.length}</div>
          <div className="text-sm text-blue-700">Total Lessons</div>
        </div>
        <div className="text-center p-4 bg-amber-50 rounded-lg">
          <div className="text-2xl font-bold text-amber-600">{lessonsWithIssues}</div>
          <div className="text-sm text-amber-700">With Issues</div>
        </div>
        <div className="text-center p-4 bg-red-50 rounded-lg">
          <div className="text-2xl font-bold text-red-600">{blockingIssues}</div>
          <div className="text-sm text-red-700">Blocking Issues</div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-3 mb-3">
          <CheckCircle2 className="w-5 h-5 text-blue-600" />
          <h4 className="font-medium text-blue-800">Week Approval</h4>
        </div>
        {isWeekApproved ? (
          <p className="text-sm text-green-700 mb-4">
            ✅ This week has been approved and is ready for teaching. All lessons have been reviewed and meet the required standards.
          </p>
        ) : (
          <p className="text-sm text-blue-700 mb-4">
            Review all lessons above for content appropriateness, learning objectives, and teaching readiness. 
            Once satisfied, approve the entire week for teaching.
          </p>
        )}
        <div className="flex items-center justify-between">
          {isWeekApproved ? (
            <div className="text-sm text-green-600">
              ✓ Week approved and ready for teaching
            </div>
          ) : (
            <div className="text-sm text-blue-600">
              {blockingIssues === 0 
                ? '✓ No blocking issues found' 
                : '⚠ Resolve blocking issues before approval'}
            </div>
          )}
          <button
            onClick={onApproveWeek}
            disabled={blockingIssues > 0 || isWeekApproved}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isWeekApproved 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-green-600 text-white hover:bg-green-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isWeekApproved ? 'Week Already Approved' : `Approve Week ${currentWeek}`}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function ApproveWeek() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLessonFullyPlanned, analyzeLessonIssues } = useLessonAnalysis();
  
  const termParam = getTermFromParam(searchParams.get('term') || 'autumn');
  const weekParam = parseInt(searchParams.get('week') || '1');
  
  const [currentTerm, setCurrentTerm] = useState(termParam);
  const [currentWeek, setCurrentWeek] = useState(weekParam);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [viewingActivity, setViewingActivity] = useState<any>(null);
  const [lessonApprovals, setLessonApprovals] = useState<Record<string, LessonApproval>>({});
  const [weekApproved, setWeekApproved] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(4);

  const { getLessonsByTerm, approveWeek, getWeekApprovalStatus, updateLessonActivities } = useTimetableStore();
  const allLessons = getLessonsByTerm(currentTerm);
  const weekLessons = allLessons.filter(lesson => lesson.week === currentWeek);
  
  const currentWeekApprovalStatus = getWeekApprovalStatus(currentTerm, currentWeek);
  const isWeekApproved = currentWeekApprovalStatus === 'approved';

  const getLessonApprovalStatus = (lesson: any) => {
    const approval = lessonApprovals[lesson.id];
    if (!approval) {
      const issues = analyzeLessonIssues(lesson);
      return {
        status: issues.some(i => i.severity === 'warning') ? 'needs-review' : 'ready' as ApprovalStatus,
        issues,
        approved: false
      };
    }
    return {
      status: approval.approved ? 'approved' : 'needs-review' as ApprovalStatus,
      issues: approval.issues,
      approved: approval.approved
    };
  };

  const handleLessonApproval = (lesson: any, approved: boolean, notes: string = '') => {
    const issues = analyzeLessonIssues(lesson);
    setLessonApprovals(prev => ({
      ...prev,
      [lesson.id]: {
        lessonId: lesson.id,
        approved,
        issues,
        teacherNotes: notes,
        lastReviewed: new Date()
      }
    }));
  };

  const handleWeekApproval = () => {
    // Auto-add activities for lessons with themes but missing activities
    weekLessons.forEach(lesson => {
      if (lesson.theme && !isLessonFullyPlanned(lesson)) {
        const defaultActivities = lesson.theme === 'Dystopian Fiction' 
          ? getDystopianActivities(lesson.week)
          : getDefaultActivities();
        
        updateLessonActivities(lesson.id, defaultActivities, lesson.theme);
      }
    });

    approveWeek(currentTerm, currentWeek, 'Ms. Thompson');
    setWeekApproved(true);
    setShowApprovalModal(true);
  };

  const handleViewActivity = (lesson: any, activityType: ActivityType) => {
    const activity = lesson.activities?.[activityType];
    if (activity) {
      setViewingActivity({
        ...activity,
        activity_type: activityType,
        subject: lesson.subject,
        year_group: lesson.yearGroup
      });
    }
  };

  const handleTermWeekChange = (term: string, week: number) => {
    setCurrentTerm(term);
    setCurrentWeek(week);
  };

  // Group lessons by day
  const lessonsByDay = weekLessons.reduce((acc, lesson) => {
    if (!acc[lesson.day]) {
      acc[lesson.day] = [];
    }
    acc[lesson.day].push(lesson);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#F8F9FA]">
      <div className="max-w-[1400px] mx-auto px-4 py-2 w-full">
        {/* Header Section */}
        <div className="bg-white rounded-lg border border-[#A4AAB2] p-3 sticky top-4 z-20">
          {/* Planning Steps */}
          <div className="mb-4">
            <div className="grid grid-cols-4 gap-4">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center mb-3 font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-medium text-gray-800 mb-1">Add Lessons</h3>
                <p className="text-sm text-gray-600 mb-4">Create your lesson schedule</p>
                <button
                  onClick={() => router.push('/my-timetable')}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-lg cursor-default flex items-center justify-center gap-2 mb-2"
                  disabled
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Completed
                </button>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center mb-3 font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-medium text-gray-800 mb-1">Add Themed Units</h3>
                <p className="text-sm text-gray-600 mb-4">Group lessons into themes</p>
                <button
                  onClick={() => router.push('/curriculum-objectives')}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-lg cursor-default flex items-center justify-center gap-2 mb-2"
                  disabled
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Completed
                </button>
              </div>
              
              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center mb-3 font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-medium text-gray-800 mb-1">Edit Individual Lessons</h3>
                <p className="text-sm text-gray-600 mb-4">Add activities to lessons</p>
                <button
                  onClick={() => router.push('/resources')}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-lg cursor-default flex items-center justify-center gap-2 mb-2"
                  disabled
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Completed
                </button>
              </div>
              
              {/* Step 4 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-[#FFC83D] text-white flex items-center justify-center mb-3 font-bold">
                  4
                </div>
                <h3 className="font-medium text-gray-800 mb-1">Approve for Teaching</h3>
                <p className="text-sm text-gray-600 mb-4">Launch into teach module</p>
                <button
                  className="w-full px-4 py-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B535] transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Approve Week
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FFF9E7] flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-[#FFC83D]" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#768396]">Approve Week for Teaching</h1>
                <div className="flex items-center gap-3 mt-1">
                  <WeekSelector
                    currentTerm={currentTerm}
                    currentWeek={currentWeek}
                    onTermWeekChange={handleTermWeekChange}
                  />
                  <div className="text-sm text-gray-600">
                    Filter lessons by week to review and approve
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {weekApproved && (
                <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Week Approved</span>
                </div>
              )}
              <button
                onClick={handleWeekApproval}
                disabled={isWeekApproved}
                className="flex items-center gap-1.5 px-3 py-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B434] transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isWeekApproved ? 'Week Already Approved' : 'Approve Week'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="mt-6 space-y-6">
          {/* Week Filter */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Week Filter</h3>
                <p className="text-sm text-gray-600">Select which week's lessons to review and approve</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentWeek(prev => Math.max(1, prev - 1))}
                  disabled={currentWeek === 1}
                  className="p-1 hover:bg-gray-100 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
                <div className="px-3 py-1.5 bg-[#FFC83D]/10 text-[#FFC83D] rounded-lg font-medium">
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
            </div>
          </div>

          {/* Week Overview */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Week {currentWeek} Lesson Review</h2>
                <p className="text-sm text-gray-600">{TERMS[currentTerm].name} • {weekLessons.length} lessons planned</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  Approved: {Object.values(lessonApprovals).filter(a => a.approved).length} / {weekLessons.length}
                </div>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${weekLessons.length > 0 ? (Object.values(lessonApprovals).filter(a => a.approved).length / weekLessons.length) * 100 : 0}%` 
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Lessons by Day */}
            <div className="space-y-6">
              {DAYS.map(day => {
                const dayLessons = lessonsByDay[day] || [];
                if (dayLessons.length === 0) return null;

                return (
                  <div key={day} className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                      {day}
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {dayLessons
                        .sort((a, b) => a.startTime.localeCompare(b.startTime))
                        .map(lesson => {
                          const approvalStatus = getLessonApprovalStatus(lesson);
                          const approval = lessonApprovals[lesson.id];
                          
                          return (
                            <div
                              key={lesson.id}
                              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                                isWeekApproved 
                                  ? 'bg-green-50 border-green-500' 
                                  : getStatusColor(approvalStatus.status)
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                    {isWeekApproved ? (
                                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                                    ) : (
                                      getStatusIcon(approvalStatus.status)
                                    )}
                                    <div>
                                      <h4 className="font-semibold text-gray-900">
                                        {lesson.subject} - {lesson.yearGroup} {lesson.class}
                                      </h4>
                                      <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                          <Clock className="w-4 h-4" />
                                          <span>{formatTime(lesson.startTime)}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                          <Users className="w-4 h-4" />
                                          <span>{lesson.yearGroup} {lesson.class}</span>
                                        </div>
                                        <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                          Lesson {lesson.week}
                                        </div>
                                        {isWeekApproved && (
                                          <div className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                                            Approved
                                          </div>
                                        )}
                                        {lesson.theme && (
                                          <div className="px-2 py-1 bg-[#FFF9E7] text-[#B17F17] rounded text-xs">
                                            {lesson.theme}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Learning Objectives */}
                                  {lesson.objectives && lesson.objectives.length > 0 && (
                                    <div className={`mb-3 p-3 rounded-lg ${
                                      isWeekApproved ? 'bg-green-100 border border-green-200' : 'bg-gray-50'
                                    }`}>
                                      <div className="flex items-center gap-2 mb-2">
                                        <Target className={`w-4 h-4 ${isWeekApproved ? 'text-green-600' : 'text-gray-500'}`} />
                                        <span className={`text-sm font-medium ${isWeekApproved ? 'text-green-800' : 'text-gray-700'}`}>Learning Objectives</span>
                                      </div>
                                      <div className="space-y-1">
                                        {lesson.objectives.map((objective: any) => (
                                          <div key={objective.id} className={`text-sm ml-6 ${isWeekApproved ? 'text-green-700' : 'text-gray-600'}`}>
                                            <span className="font-medium">{objective.code}:</span> {objective.description}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Activities */}
                                  {isLessonFullyPlanned(lesson) && (
                                    <div className={`mb-3 p-3 rounded-lg ${
                                      isWeekApproved ? 'bg-green-100 border border-green-200' : 'bg-gray-50'
                                    }`}>
                                      <div className="flex items-center gap-2 mb-2">
                                        <BookOpen className={`w-4 h-4 ${isWeekApproved ? 'text-green-600' : 'text-gray-500'}`} />
                                        <span className={`text-sm font-medium ${isWeekApproved ? 'text-green-800' : 'text-gray-700'}`}>Lesson Activities</span>
                                      </div>
                                      <div className="space-y-3 ml-6">
                                        {(['starter', 'main', 'plenary'] as ActivityType[]).map(type => {
                                          const activity = lesson.activities?.[type];
                                          if (!activity) return null;
                                          
                                          return (
                                            <LessonActivity
                                              key={type}
                                              activity={activity}
                                              type={type}
                                              isWeekApproved={isWeekApproved}
                                              onViewActivity={() => handleViewActivity(lesson, type)}
                                            />
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}

                                  {/* Issues */}
                                  {approvalStatus.issues.length > 0 && !isWeekApproved && (
                                    <div className="mb-3">
                                      <div className="flex items-center gap-2 mb-2">
                                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                                        <span className="text-sm font-medium text-gray-700">Review Items</span>
                                      </div>
                                      <div className="space-y-1 ml-6">
                                        {approvalStatus.issues.map((issue, index) => (
                                          <div key={index} className={`text-xs p-2 rounded ${
                                            issue.severity === 'error' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-700'
                                          }`}>
                                            <div className="font-medium">{issue.message}</div>
                                            {issue.suggestion && (
                                              <div className="mt-1 opacity-80">{issue.suggestion}</div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                  {/* Teacher Notes */}
                                  {approval?.teacherNotes && (
                                    <div className="mb-3">
                                      <div className="flex items-center gap-2 mb-2">
                                        <FileText className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm font-medium text-gray-700">Teacher Notes</span>
                                      </div>
                                      <div className="text-sm text-gray-600 ml-6 bg-gray-50 p-2 rounded">
                                        {approval.teacherNotes}
                                      </div>
                                    </div>
                                  )}
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => setSelectedLesson(lesson)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="View lesson details"
                                  >
                                    <Eye className="w-4 h-4 text-gray-600" />
                                  </button>
                                  <button
                                    onClick={() => router.push('/resources', { state: { lesson } })}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                    title="Edit lesson"
                                  >
                                    <Edit2 className="w-4 h-4 text-gray-600" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Navigation Back to Previous Steps */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Need to Make Changes?</h3>
            <p className="text-sm text-gray-600 mb-4">
              If you need to make last-minute adjustments before approving this week, you can quickly navigate back to previous planning steps.
            </p>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => router.push('/my-timetable')}
                className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">Step 1: Timetable</span>
                <span className="text-xs text-gray-600">Add or remove lessons</span>
              </button>
              <button
                onClick={() => router.push('/curriculum-objectives')}
                className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                  <Target className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">Step 2: Themes</span>
                <span className="text-xs text-gray-600">Add curriculum themes</span>
              </button>
              <button
                onClick={() => router.push('/resources')}
                className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mb-2">
                  <Edit2 className="w-4 h-4 text-amber-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">Step 3: Activities</span>
                <span className="text-xs text-gray-600">Edit lesson content</span>
              </button>
            </div>
          </div>
        </div>

        {/* Activity Details Modal */}
        {viewingActivity && (
          <ActivityDetailsModal
            activity={viewingActivity}
            onClose={() => setViewingActivity(null)}
          />
        )}

        {/* Week Approval Success Modal */}
        {showApprovalModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Week Approved!</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Week {currentWeek} has been approved and is ready for teaching. All lessons have been reviewed and meet the required standards.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowApprovalModal(false);
                     router.push('/');
                    }}
                    className="px-4 py-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B434] transition-colors"
                  >
                   Back to Dashboard
                  </button>
                  <button
                    onClick={() => setShowApprovalModal(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}