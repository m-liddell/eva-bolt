import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';

// Components
import { Header } from './components/Header';
import { SlidingMenu } from './components/SlidingMenu';
import { AIAssistant } from './components/AIAssistant';

// Pages - Auth (unprotected)
import Login from './pages/Login';

// Pages - Core (protected)
import Home from './pages/Home';
import TermSchedule from './pages/TermSchedule';

// Pages - Planning & Scheduling (protected)
import WeeklyTimetable from './pages/WeeklyTimetable';
import CurriculumObjectives from './pages/CurriculumObjectives';
import Resources from './pages/Resources';
import QuickStart from './pages/QuickStart';
import ApproveWeek from './pages/ApproveWeek';

// Pages - Assessment (protected)
import Assess from './pages/Assess';
import DetailedAssessment from './pages/DetailedAssessment';
import AssessmentDesign from './pages/AssessmentDesign';
import GeneratedAssessment from './pages/GeneratedAssessment';
import AssessmentDetails from './pages/AssessmentDetails';
import StudentQuestionSheet from './pages/StudentQuestionSheet';
import StudentSelfAssessment from './pages/StudentSelfAssessment';

// Pages - Teaching & Lessons (protected)
import TeachLesson from './pages/TeachLesson';

// Pages - Training & Reports (protected)
import Training from './pages/Training';
import Certificates from './pages/Certificates';
import TeachingPatterns from './pages/TeachingPatterns';
import EndOfYear from './pages/EndOfYear';

// Pages - Settings (protected)
import Settings from './pages/Settings';
import TermDates from './pages/TermDates';
import ClassInformation from './pages/ClassInformation';
import SubjectSpecialisms from './pages/SubjectSpecialisms';

// Pages - Admin (protected)
import LessonLibrary from './pages/admin/LessonLibrary';

// Lesson Pages - General (protected)
import StarterLesson1 from './pages/lessons/StarterLesson1';
import KickOffPage from './pages/lessons/KickOffPage';
import LessonPage from './pages/lessons/LessonPage';
import AlternativeEndingsPage from './pages/lessons/AlternativeEndingsPage';
import CharacterConversationsPage from './pages/lessons/CharacterConversationsPage';
import CompareContrastPage from './pages/lessons/CompareContrastPage';
import ThinkPairShareTwistPage from './pages/lessons/ThinkPairShareTwistPage';
import QuickDiscussionCarouselPage from './pages/lessons/QuickDiscussionCarouselPage';
import WordAssociationSpeedGamePage from './pages/lessons/WordAssociationSpeedGamePage';
import TwoMinutePerspectiveChallengePage from './pages/lessons/TwoMinutePerspectiveChallengePage';
import PressConferenceSimulationPage from './pages/lessons/PressConferenceSimulationPage';
import SocraticCircleReflectionPage from './pages/lessons/SocraticCircleReflectionPage';

// Lesson Pages - Dystopian Series (protected)
import DystopianPlenaryPage from './pages/lessons/DystopianPlenaryPage';
import DystopianWritingPage from './pages/lessons/DystopianWritingPage';

// Dystopian Lesson Components (protected)
import DystopianLesson1Starter from './pages/lessons/DystopianLesson1Starter';
import DystopianLesson1Plenary from './pages/lessons/DystopianLesson1Plenary';
import DystopianLesson1Main from './pages/lessons/DystopianLesson1Main';
import DystopianLesson2Starter from './pages/lessons/DystopianLesson2Starter';
import DystopianLesson2Main from './pages/lessons/DystopianLesson2Main';
import DystopianLesson2Plenary from './pages/lessons/DystopianLesson2Plenary';
import DystopianLesson3Starter from './pages/lessons/DystopianLesson3Starter';
import DystopianLesson3Plenary from './pages/lessons/DystopianLesson3Plenary';
import DystopianLesson4Starter from './pages/lessons/DystopianLesson4Starter';
import DystopianLesson4Plenary from './pages/lessons/DystopianLesson4Plenary';
import DystopianLesson5Starter from './pages/lessons/DystopianLesson5Starter';
import DystopianLesson5Plenary from './pages/lessons/DystopianLesson5Plenary';
import DystopianLesson6Starter from './pages/lessons/DystopianLesson6Starter';
import DystopianLesson6Plenary from './pages/lessons/DystopianLesson6Plenary';

// Types
interface LessonInfo {
  yearGroup?: string;
  classGroup?: string;
  phase?: 'Starter' | 'Main' | 'Plenary';
  subject?: string;
  theme?: string;
}

// Utility Functions
const getLessonPhaseFromPath = (pathname: string): 'Starter' | 'Plenary' | undefined => {
  if (pathname.includes('/starter')) return 'Starter';
  if (pathname.includes('/plenary')) return 'Plenary';
  return undefined;
};

const isLessonPath = (pathname: string): boolean => {
  return pathname.includes('/lesson/');
};

const extractLessonInfo = (location: any): LessonInfo | undefined => {
  if (!isLessonPath(location.pathname)) return undefined;
  
  const lessonInfo = location.state?.lesson || {};
  const lessonPhase = getLessonPhaseFromPath(location.pathname);
  
  return {
    yearGroup: lessonInfo.yearGroup,
    classGroup: lessonInfo.class,
    phase: lessonPhase || lessonInfo.phase,
    subject: lessonInfo.subject,
    theme: lessonInfo.theme
  };
};

// Protected App Component (requires authentication)
const ProtectedApp: React.FC<{
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  showAIAssistant: boolean;
  setShowAIAssistant: (show: boolean) => void;
  lessonInfo?: LessonInfo;
}> = ({ isMenuOpen, setIsMenuOpen, showAIAssistant, setShowAIAssistant, lessonInfo }) => (
  <>
    <Header 
      onMenuClick={() => setIsMenuOpen(true)} 
      onAIClick={() => setShowAIAssistant(true)}
      lessonInfo={lessonInfo}
    />
    <main className="flex-1">
      <Routes>
        {/* Core Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/my-timetable" element={<TermSchedule />} />
        <Route path="/weekly-timetable" element={<WeeklyTimetable />} />
        <Route path="/curriculum-objectives" element={<CurriculumObjectives />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/quick-start" element={<QuickStart />} />
        <Route path="/approve-week" element={<ApproveWeek />} />

        {/* Assessment Routes */}
        <Route path="/assess" element={<Assess />} />
        <Route path="/student-self-assessment" element={<StudentSelfAssessment />} />
        <Route path="/detailed-assessment" element={<DetailedAssessment />} />
        <Route path="/assessment-design" element={<AssessmentDesign />} />
        <Route path="/generated-assessment" element={<GeneratedAssessment />} />
        <Route path="/assessment-details" element={<AssessmentDetails />} />
        <Route path="/student-question-sheet" element={<StudentQuestionSheet />} />

        {/* Teaching Routes */}
        <Route path="/teach/lesson" element={<TeachLesson />} />

        {/* Training & Reports */}
        <Route path="/training" element={<Training />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/teaching-patterns" element={<TeachingPatterns />} />
        <Route path="/end-of-year" element={<EndOfYear />} />

        {/* Settings */}
        <Route path="/settings" element={<Settings />} />
        <Route path="/settings/term-dates" element={<TermDates />} />
        <Route path="/settings/class-information" element={<ClassInformation />} />
        <Route path="/settings/subject-specialisms" element={<SubjectSpecialisms />} />

        {/* Admin */}
        <Route path="/admin/lesson-library" element={<LessonLibrary />} />

        {/* General Lesson Routes */}
        <Route path="/lesson/dystopian/starter" element={<StarterLesson1 />} />
        <Route path="/lesson/dystopian/plenary" element={<DystopianPlenaryPage />} />
        <Route path="/lesson/dystopian-writing" element={<DystopianWritingPage />} />
        <Route path="/lesson/kick-off" element={<KickOffPage />} />
        <Route path="/lesson/sea-stories" element={<LessonPage />} />
        <Route path="/lesson/alternative-endings" element={<AlternativeEndingsPage />} />
        <Route path="/lesson/character-conversations" element={<CharacterConversationsPage />} />
        <Route path="/lesson/compare-contrast" element={<CompareContrastPage />} />
        <Route path="/lesson/think-pair-share-twist" element={<ThinkPairShareTwistPage />} />
        <Route path="/lesson/quick-discussion-carousel" element={<QuickDiscussionCarouselPage />} />
        <Route path="/lesson/word-association-speed-game" element={<WordAssociationSpeedGamePage />} />
        <Route path="/lesson/two-minute-perspective-challenge" element={<TwoMinutePerspectiveChallengePage />} />
        <Route path="/lesson/press-conference-simulation" element={<PressConferenceSimulationPage />} />
        <Route path="/lesson/socratic-circle-reflection" element={<SocraticCircleReflectionPage />} />

        {/* Dystopian Lesson Series */}
        <Route path="/lesson/dystopian-lesson-1/starter" element={<DystopianLesson1Starter />} />
        <Route path="/lesson/dystopian-lesson-1/plenary" element={<DystopianLesson1Plenary />} />
        <Route path="/lesson/dystopian-lesson-1/main" element={<DystopianLesson1Main />} />
        <Route path="/lesson/dystopian-lesson-2/starter" element={<DystopianLesson2Starter />} />
        <Route path="/lesson/dystopian-lesson-2/main" element={<DystopianLesson2Main />} />
        <Route path="/lesson/dystopian-lesson-2/plenary" element={<DystopianLesson2Plenary />} />
        <Route path="/lesson/dystopian-lesson-3/starter" element={<DystopianLesson3Starter />} />
        <Route path="/lesson/dystopian-lesson-3/plenary" element={<DystopianLesson3Plenary />} />
        <Route path="/lesson/dystopian-lesson-4/starter" element={<DystopianLesson4Starter />} />
        <Route path="/lesson/dystopian-lesson-4/plenary" element={<DystopianLesson4Plenary />} />
        <Route path="/lesson/dystopian-lesson-5/starter" element={<DystopianLesson5Starter />} />
        <Route path="/lesson/dystopian-lesson-5/plenary" element={<DystopianLesson5Plenary />} />
        <Route path="/lesson/dystopian-lesson-6/starter" element={<DystopianLesson6Starter />} />
        <Route path="/lesson/dystopian-lesson-6/plenary" element={<DystopianLesson6Plenary />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
    <SlidingMenu 
      isOpen={isMenuOpen} 
      onClose={() => setIsMenuOpen(false)} 
    />
    {showAIAssistant && (
      <AIAssistant 
        onClose={() => setShowAIAssistant(false)} 
      />
    )}
  </>
);

// Main App Component
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const location = useLocation();
  
  const lessonInfo = extractLessonInfo(location);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <Routes>
        {/* Public Authentication Routes */}
        <Route path="/login" element={<Login />} />
        
        {/* All other routes are protected */}
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <ProtectedApp
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                showAIAssistant={showAIAssistant}
                setShowAIAssistant={setShowAIAssistant}
                lessonInfo={lessonInfo}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;