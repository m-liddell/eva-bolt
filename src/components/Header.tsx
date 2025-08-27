'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Bell, Search, Users, Brain, BookOpen, CheckCircle2 } from 'lucide-react';

const getUserInitials = (): string => {
  try {
    // Check if we're on the client side
    if (typeof window === 'undefined') {
      return 'T'; // Default for server-side rendering
    }
    
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    if (currentUserEmail) {
      const accountKey = `account_${currentUserEmail}`;
      const userAccount = localStorage.getItem(accountKey);
      if (userAccount) {
        const accountData = JSON.parse(userAccount);
        const firstName = accountData.user_metadata?.first_name || '';
        const lastName = accountData.user_metadata?.last_name || '';
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
      }
    }
    return 'T';
  } catch (error) {
    console.error('Error getting user initials:', error);
    return 'T';
  }
};

interface HeaderProps {
  onMenuClick: () => void;
  onAIClick?: () => void;
  lessonInfo?: {
    yearGroup?: string;
    classGroup?: string;
    phase?: 'Starter' | 'Main' | 'Plenary';
    subject?: string;
    theme?: string;
  };
}

export function Header({ onMenuClick, onAIClick, lessonInfo }: HeaderProps) {
  const pathname = usePathname();
  const [userInitials, setUserInitials] = useState('T');
  const isLessonPage = pathname.includes('/lesson/');

  // Update user initials on client side only
  useEffect(() => {
    setUserInitials(getUserInitials());
  }, []);

  const getPhaseIcon = () => {
    if (!lessonInfo?.phase) return null;
    
    switch (lessonInfo.phase) {
      case 'Starter':
        return <Brain className="w-4 h-4 text-blue-600" />;
      case 'Main':
        return <BookOpen className="w-4 h-4 text-[#FFC83D]" />;
      case 'Plenary':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      default:
        return <BookOpen className="w-4 h-4 text-[#FFC83D]" />;
    }
  };

  const getPhaseColor = () => {
    if (!lessonInfo?.phase) return '';
    
    switch (lessonInfo.phase) {
      case 'Starter':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Main':
        return 'bg-[#FFF9E7] text-[#FFC83D] border-[#FFC83D]/20';
      case 'Plenary':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4 h-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Menu 
            className="w-5 h-5 text-gray-600 cursor-pointer" 
            onClick={onMenuClick}
          />
          <Link 
            href="/" 
            className="text-lg font-bold text-[#FFC83D]"
          >
            EVA
          </Link>
          
          {isLessonPage && lessonInfo && (
            <div className="flex items-center gap-4 ml-4">
              {lessonInfo.yearGroup && lessonInfo.classGroup && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-medium text-gray-700">
                    {lessonInfo.yearGroup} Class {lessonInfo.classGroup}
                  </span>
                </div>
              )}
              
              {lessonInfo.subject && (
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-medium text-gray-700">
                    {lessonInfo.subject}
                  </span>
                </div>
              )}
              
              {lessonInfo.theme && (
                <div className="px-2 py-1 bg-[#FFF9E7] text-[#B17F17] rounded text-xs">
                  {lessonInfo.theme}
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={onAIClick}
            className="w-7 h-7 bg-[#FFCFCF] rounded-full flex items-center justify-center"
            aria-label="Open AI Assistant"
          >
            <span className="text-[#828F9E] font-['Sofia'] text-base leading-none">A</span>
          </button>
          <Search className="w-4 h-4 text-gray-600" />
          <Bell className="w-4 h-4 text-gray-600" />
          <div className="w-7 h-7 rounded-full overflow-hidden bg-[#FFC83D] flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {userInitials}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}