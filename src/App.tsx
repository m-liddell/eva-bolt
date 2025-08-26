'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ProtectedRoute } from './components/ProtectedRoute';

// Components
import { Header } from './components/Header';
import { SlidingMenu } from './components/SlidingMenu';
import { AIAssistant } from './components/AIAssistant';

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

const extractLessonInfo = (pathname: string): LessonInfo | undefined => {
  if (!isLessonPath(pathname)) return undefined;
  
  // In Next.js, we'll need to get lesson info from route params or state
  const lessonPhase = getLessonPhaseFromPath(pathname);
  
  return {
    yearGroup: 'Year 10', // Default values - in real app get from route/state
    classGroup: 'A',
    phase: lessonPhase,
    subject: 'English',
    theme: 'Dystopian Fiction'
  };
};

// Protected App Component (requires authentication)
const ProtectedApp: React.FC<{
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  showAIAssistant: boolean;
  setShowAIAssistant: (show: boolean) => void;
  lessonInfo?: LessonInfo;
  children: React.ReactNode;
}> = ({ isMenuOpen, setIsMenuOpen, showAIAssistant, setShowAIAssistant, lessonInfo, children }) => (
  <>
    <Header 
      onMenuClick={() => setIsMenuOpen(true)} 
      onAIClick={() => setShowAIAssistant(true)}
      lessonInfo={lessonInfo}
    />
    <main className="flex-1">
      {children}
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
function App({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const pathname = usePathname();
  
  const lessonInfo = extractLessonInfo(pathname);

  // Check if this is the login page
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      <ProtectedRoute>
        <ProtectedApp
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          showAIAssistant={showAIAssistant}
          setShowAIAssistant={setShowAIAssistant}
          lessonInfo={lessonInfo}
        >
          {children}
        </ProtectedApp>
      </ProtectedRoute>
    </div>
  );
}

export default App;