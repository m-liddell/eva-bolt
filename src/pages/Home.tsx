import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  Calendar, 
  BookOpen, 
  GraduationCap, 
  ClipboardList, 
  Brain, 
  FileText, 
  Settings, 
  Library, 
  Users, 
  Target, 
  BarChart2, 
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { useTimetableStore } from '../store/timetableStore';
import { TERMS } from '../store/termStore';
import { OnboardingTour } from '../components/OnboardingTour';
import { useOnboarding } from '../hooks/useOnboarding';

// Types
interface Lesson {
  id: string;
  subject: string;
  yearGroup: string;
  class: string;
  day: string;
  startTime: string;
  theme?: string;
  activities?: {
    starter?: any;
    main?: any;
    plenary?: any;
  };
  week: number;
}

interface TermStyles {
  termBox: string;
  button: string;
}

interface ActionCard {
  id: string;
  title: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
}

interface SectionConfig {
  title: string;
  icon: React.ReactNode;
  iconBg: string;
  actions: ActionCard[];
}

// Constants
const TERMS_LIST = ['Autumn', 'Spring', 'Summer'] as const;
const CURRENT_TERM = 'Autumn';
const CURRENT_TERM_ID = 'Autumn 1';
const CURRENT_WEEK = 1;

const DAY_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

// Utility Functions
const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const period = Number(hours) >= 12 ? 'PM' : 'AM';
  const displayHours = Number(hours) > 12 ? Number(hours) - 12 : Number(hours);
  return `${displayHours}:${minutes} ${period}`;
};

const getCurrentDate = (): string => {
  return new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const getUserDisplayName = (): string => {
  try {
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    if (currentUserEmail) {
      const accountKey = `account_${currentUserEmail}`;
      const userAccount = localStorage.getItem(accountKey);
      if (userAccount) {
        const accountData = JSON.parse(userAccount);
        return accountData.user_metadata?.full_name || accountData.user_metadata?.first_name || 'Teacher';
      }
    }
    return 'Teacher';
  } catch (error) {
    console.error('Error getting user display name:', error);
    return 'Teacher';
  }
};

const isLessonFullyPlanned = (lesson: Lesson): boolean => {
  return !!(lesson?.activities?.starter && 
            lesson?.activities?.main && 
            lesson?.activities?.plenary);
};

const getTermStyles = (term: string): TermStyles => {
  const isCurrentTerm = term === CURRENT_TERM;
  
  if (term === 'Autumn') {
    return {
      termBox: isCurrentTerm 
        ? 'border-[#FFC83D] bg-[#FFC83D]/5' 
        : 'border-gray-200',
      button: 'bg-[#FFC83D]/10 text-[#FFC83D] hover:bg-[#FFC83D]/20 border-[#FFC83D]/20',
    };
  }
  
  return {
    termBox: isCurrentTerm 
      ? 'border-gray-400 bg-gray-50' 
      : 'border-gray-200',
    button: 'bg-gray-100 text-gray-600 hover:bg-gray-200 border-gray-200',
  };
};

const sortLessons = (lessons: Lesson[]): Lesson[] => {
  return lessons.sort((a, b) => {
    const dayCompare = DAY_ORDER.indexOf(a.day as any) - DAY_ORDER.indexOf(b.day as any);
    if (dayCompare !== 0) return dayCompare;
    return a.startTime.localeCompare(b.startTime);
  });
};

// Lesson Navigation Logic
const getDystopianLessonRoute = (lesson: Lesson): string => {
  const starterTitle = lesson.activities?.starter?.title || '';
  
  const lessonRoutes: Record<string, string> = {
    'Dystopian World Discovery': '/lesson/dystopian-lesson-1/starter',
    'Future Vision': '/lesson/dystopian-lesson-1/starter',
    'Complete Sentence': '/lesson/dystopian-lesson-2/starter',
    'Sentence Foundation': '/lesson/dystopian-lesson-2/starter',
    'Simple vs Compound': '/lesson/dystopian-lesson-3/starter',
    'Sentence Power': '/lesson/dystopian-lesson-3/starter',
    'Complex Sentence': '/lesson/dystopian-lesson-4/starter',
    'Sophistication': '/lesson/dystopian-lesson-4/starter',
    'Personification': '/lesson/dystopian-lesson-5/starter',
    'Atmosphere': '/lesson/dystopian-lesson-5/starter',
    'Simile': '/lesson/dystopian-lesson-6/starter',
    'Impact Analysis': '/lesson/dystopian-lesson-6/starter'
  };

  for (const [keyword, route] of Object.entries(lessonRoutes)) {
    if (starterTitle.includes(keyword)) {
      return route;
    }
  }
  
  return '/teach/lesson';
};

// Custom Hooks
const useLessonsData = () => {
  const { getLessonsByTerm, getWeekApprovalStatus } = useTimetableStore();
  
  const allLessons = getLessonsByTerm(CURRENT_TERM_ID);
  const thisWeeksLessons = allLessons.filter(lesson => lesson.week === CURRENT_WEEK);
  const sortedLessons = sortLessons(thisWeeksLessons);
  const currentWeekApproval = getWeekApprovalStatus(CURRENT_TERM_ID, CURRENT_WEEK);
  
  return {
    allLessons,
    thisWeeksLessons,
    sortedLessons,
    currentWeekApproval,
    hasLessons: thisWeeksLessons.length > 0,
    hasNextLesson: sortedLessons.length > 0
  };
};

// Components
const WelcomeHeader: React.FC = () => (
  <div className="flex items-center justify-between mb-6">
    <div>
      <h1 className="text-2xl font-bold text-[#768396] mb-1">Welcome back, {getUserDisplayName()}</h1>
      <p className="text-sm text-gray-600">{getCurrentDate()}</p>
    </div>
    <div className="flex items-center gap-3">
      <div className="px-3 py-1.5 bg-[#FFC83D]/10 rounded-lg flex items-center gap-2">
        <Calendar className="w-4 h-4 text-[#FFC83D]" />
        <span className="font-medium text-[#FFC83D] text-sm">{CURRENT_TERM} Term</span>
      </div>
    </div>
  </div>
);

const TermCard: React.FC<{
  term: string;
  onTermClick: (term: string) => void;
}> = ({ term, onTermClick }) => {
  const styles = getTermStyles(term);
  const isCurrentTerm = term === CURRENT_TERM;
  
  return (
    <div 
      onClick={() => onTermClick(term)}
      className={`p-3 h-[88px] rounded-lg border ${styles.termBox} cursor-pointer transition-colors hover:border-[#FFC83D]`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-sm">{term} Term</span>
        <span className="text-xs text-gray-500">Progress</span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${isCurrentTerm ? 'bg-[#FFC83D]' : 'bg-gray-400'}`}
          style={{ width: isCurrentTerm ? '60%' : '0%' }}
        />
      </div>
    </div>
  );
};

const NextLessonCard: React.FC<{
  lesson: Lesson;
  onLessonClick: (lesson: Lesson) => void;
}> = ({ lesson, onLessonClick }) => (
  <div 
    onClick={() => onLessonClick(lesson)}
    className="p-3 h-[88px] rounded-lg border cursor-pointer hover:border-[#FFC83D] transition-colors text-left bg-[#FFF9E7] border-[#FFC83D]"
  >
    <h3 className="font-medium mb-1 text-sm">Next Lesson</h3>
    <p className="text-xs text-gray-600">{lesson.subject} - {lesson.yearGroup}{lesson.class}</p>
    <p className="text-xs text-gray-500">{lesson.day}, {formatTime(lesson.startTime)}</p>
    {lesson.theme && (
      <div className="mt-1 inline-block">
        <p className="text-xs text-gray-600 bg-[#FFF9E7] px-1.5 py-0.5 rounded">{lesson.theme}</p>
      </div>
    )}
    {!isLessonFullyPlanned(lesson) && (
      <div className="mt-1 text-xs text-amber-600">
        Needs planning
      </div>
    )}
  </div>
);

const EmptyLessonCard: React.FC<{
  onClick: () => void;
}> = ({ onClick }) => (
  <div 
    onClick={onClick}
    className="p-3 h-[88px] rounded-lg border cursor-pointer hover:border-[#FFC83D] transition-colors text-left bg-gray-50 border-gray-200"
  >
    <h3 className="font-medium mb-1 text-sm">Create Timetable</h3>
    <p className="text-xs text-gray-600">No lessons planned yet</p>
    <p className="text-xs text-gray-500">Click to start planning</p>
  </div>
);

const ActionButton: React.FC<{
  title: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'default' | 'primary';
}> = ({ title, description, onClick, disabled = false, variant = 'default' }) => {
  const baseClasses = "p-3 h-[88px] rounded-lg border transition-colors text-left";
  const variantClasses = variant === 'primary' 
    ? "bg-[#FFF9E7] border-[#FFC83D]"
    : "bg-gray-50 border-gray-200 hover:border-[#FFC83D]";
  const disabledClasses = disabled 
    ? "opacity-50 cursor-not-allowed bg-gray-100 border-gray-300" 
    : "cursor-pointer";

  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${disabled ? disabledClasses : variantClasses}`}
      disabled={disabled}
    >
      <h3 className="font-medium mb-1 text-sm">{title}</h3>
      <p className="text-xs text-gray-600">{description}</p>
    </button>
  );
};

const SectionCard: React.FC<{
  id?: string;
  title: string;
  icon: React.ReactNode;
  iconBg: string;
  children: React.ReactNode;
}> = ({ id, title, icon, iconBg, children }) => (
  <div id={id} className="bg-white rounded-lg shadow-sm border border-[#A4AAB2] p-4">
    <div className="flex items-center gap-3 mb-4">
      <div className={`w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center`}>
        {icon}
      </div>
      <h2 className="text-lg font-bold">{title}</h2>
    </div>
    {children}
  </div>
);

const GridSection: React.FC<{
  actions: ActionCard[];
}> = ({ actions }) => (
  <div className="grid grid-cols-2 gap-2">
    {actions.map((action) => (
      <button 
        key={action.id}
        onClick={action.onClick}
        disabled={action.disabled}
        className="p-2 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#FFC83D] transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <h3 className="text-sm font-medium">{action.title}</h3>
        <p className="text-xs text-gray-600">{action.description}</p>
      </button>
    ))}
  </div>
);

// Main Component
function Home() {
  const router = useRouter();
  const { sortedLessons, hasLessons, hasNextLesson } = useLessonsData();
  const { showOnboarding, setShowOnboarding, isLoading, completeOnboarding, resetOnboarding } = useOnboarding();

  // Show loading state while checking onboarding status
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#FFC83D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleTermClick = (term: string) => {
    if (term === 'Autumn') {
      router.push('/my-timetable');
    }
  };

  const getInteractiveLessonRoute = (lesson: Lesson): string => {
    // Check for dystopian lessons first
    if (lesson.theme === 'Dystopian Fiction' && lesson.activities?.starter) {
      const starterTitle = lesson.activities.starter.title || '';
      
      const lessonRoutes: Record<string, string> = {
        'Dystopian World Discovery': '/lesson/dystopian-lesson-1/starter',
        'Future Vision': '/lesson/dystopian-lesson-1/starter',
        'Complete Sentence': '/lesson/dystopian-lesson-2/starter',
        'Sentence Foundation': '/lesson/dystopian-lesson-2/starter',
        'Simple vs Compound': '/lesson/dystopian-lesson-3/starter',
        'Sentence Power': '/lesson/dystopian-lesson-3/starter',
        'Complex Sentence': '/lesson/dystopian-lesson-4/starter',
        'Sophistication': '/lesson/dystopian-lesson-4/starter',
        'Personification': '/lesson/dystopian-lesson-5/starter',
        'Atmosphere': '/lesson/dystopian-lesson-5/starter',
        'Simile': '/lesson/dystopian-lesson-6/starter',
        'Impact Analysis': '/lesson/dystopian-lesson-6/starter'
      };

      for (const [keyword, route] of Object.entries(lessonRoutes)) {
        if (starterTitle.includes(keyword)) {
          return route;
        }
      }
    }
    
    // Check for general interactive activities
    if (lesson.activities?.starter) {
      const starterTitle = lesson.activities.starter.title.toLowerCase();
      
      if (starterTitle.includes('think-pair-share with a twist') || starterTitle.includes('think-pair-share')) {
        return '/lesson/think-pair-share-twist';
      }
      
      if (starterTitle.includes('word association')) {
        return '/lesson/word-association-speed-game';
      }
      
      if (starterTitle.includes('two minute perspective') || starterTitle.includes('perspective challenge')) {
        return '/lesson/two-minute-perspective-challenge';
      }
      
      if (starterTitle.includes('press conference')) {
        return '/lesson/press-conference-simulation';
      }
      
      if (starterTitle.includes('socratic circle')) {
        return '/lesson/socratic-circle-reflection';
      }
      
      if (starterTitle.includes('character conversations')) {
        return '/lesson/character-conversations';
      }
      
      if (starterTitle.includes('alternative endings')) {
        return '/lesson/alternative-endings';
      }
      
      if (starterTitle.includes('compare contrast') || starterTitle.includes('compare and contrast')) {
        return '/lesson/compare-contrast';
      }
    }
    
    return '/teach/lesson';
  };

  // Legacy function for backward compatibility
  const getDystopianLessonRoute = (lesson: Lesson): string => {
    console.log("Starting lesson:", lesson);
    
    // Always try to get interactive route first
    const route = getInteractiveLessonRoute(lesson);
    if (route !== '/teach/lesson') {
      navigate(route, { state: { lesson } });
    } else {
      navigate('/teach/lesson', { state: { lesson } });
    }
  };

  const handleLessonClick = (lesson: Lesson) => {
    if (isLessonFullyPlanned(lesson)) {
      // For dystopian lessons, always try to route to interactive version first
      if (lesson.theme === 'Dystopian Fiction' && lesson.week >= 1 && lesson.week <= 6) {
        router.push(`/lesson/dystopian-lesson-${lesson.week}/starter`);
        return;
      }
      
      // For other lessons, check for interactive routes
      const route = getInteractiveLessonRoute(lesson);
      router.push(route);
        navigate(route, { state: { lesson } });
      } else {
        navigate('/teach/lesson', { state: { lesson } });
      }
    } else {
      router.push('/resources');
    }
  };

  // Section configurations
  const assessActions: ActionCard[] = [
    {
      id: 'mark',
      title: 'Mark',
      description: 'Grade student work',
      onClick: () => router.push('/assess')
    },
    {
      id: 'design',
      title: 'Design',
      description: 'Create assessment',
      onClick: () => router.push('/assessment-design')
    }
  ];

  const trainActions: ActionCard[] = [
    {
      id: 'training',
      title: 'Training',
      description: 'View courses',
      onClick: () => router.push('/training')
    },
    {
      id: 'certificates',
      title: 'Certificates',
      description: 'My achievements',
      onClick: () => router.push('/certificates')
    }
  ];

  const reportActions: ActionCard[] = [
    {
      id: 'statistics',
      title: 'My Statistics',
      description: 'View analytics',
      onClick: () => router.push('/teaching-patterns')
    },
    {
      id: 'student-reports',
      title: 'Student Reports',
      description: 'Generate reports',
      onClick: () => router.push('/end-of-year')
    }
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      <WelcomeHeader />
      
      {/* Help Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={resetOnboarding}
          className="w-12 h-12 bg-[#FFC83D] text-white rounded-full shadow-lg hover:bg-[#E6B434] transition-colors flex items-center justify-center"
          title="Show tour again"
        >
          <HelpCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Plan Section */}
      <div id="plan-section" className="bg-white rounded-lg shadow-sm border border-[#A4AAB2] p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#FFC83D]/10 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#FFC83D]" />
            </div>
            <h2 className="text-xl font-bold">Plan</h2>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {TERMS_LIST.map((term) => (
            <TermCard 
              key={term} 
              term={term} 
              onTermClick={handleTermClick} 
            />
          ))}
        </div>
      </div>

      {/* Teach Section */}
      <div id="teach-section" className="bg-white rounded-lg shadow-sm border border-[#A4AAB2] p-4 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-xl font-bold">Teach</h2>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {hasNextLesson ? (
            <NextLessonCard 
              lesson={sortedLessons[0]} 
              onLessonClick={handleLessonClick}
            />
          ) : (
            <EmptyLessonCard onClick={() => navigate('/my-timetable')} />
          )}
          
          <ActionButton
            title="This Week's Lessons"
            description={hasLessons ? 'View teaching schedule' : 'Create lessons first'}
            onClick={() => navigate('/weekly-timetable')}
            disabled={!hasLessons}
          />
          
          <ActionButton
            title="Quick-start"
            description="Begin a new lesson"
            onClick={() => navigate('/quick-start')}
          />
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-3 gap-4">
        <SectionCard
          id="assess-section"
          title="Assess"
          icon={<ClipboardList className="w-5 h-5 text-blue-600" />}
          iconBg="bg-blue-100"
        >
          <GridSection actions={assessActions} />
        </SectionCard>

        <SectionCard
          title="Train"
          icon={<Brain className="w-5 h-5 text-purple-600" />}
          iconBg="bg-purple-100"
        >
          <GridSection actions={trainActions} />
        </SectionCard>

        <SectionCard
          title="Report"
          icon={<FileText className="w-5 h-5 text-orange-600" />}
          iconBg="bg-orange-100"
        >
          <GridSection actions={reportActions} />
        </SectionCard>
      </div>
      
      {/* Onboarding Tour */}
      <OnboardingTour
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={completeOnboarding}
      />
    </div>
  );
}

export default Home;