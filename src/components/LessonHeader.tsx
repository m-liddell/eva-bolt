'use client';

import React from 'react';
import { Clock, Users, BookOpen, Brain, CheckCircle2 } from 'lucide-react';

interface LessonHeaderProps {
  yearGroup: string;
  classGroup: string;
  phase: 'Starter' | 'Main' | 'Plenary';
  subject?: string;
  theme?: string;
}

export function LessonHeader({ yearGroup, classGroup, phase, subject, theme }: LessonHeaderProps) {
  const getPhaseIcon = () => {
    switch (phase) {
      case 'Starter':
        return <Brain className="w-5 h-5 text-blue-600" />;
      case 'Main':
        return <BookOpen className="w-5 h-5 text-[#FFC83D]" />;
      case 'Plenary':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      default:
        return <BookOpen className="w-5 h-5 text-[#FFC83D]" />;
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
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
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-gray-500" />
            <div className="text-sm font-medium text-gray-700">
              {yearGroup} Class {classGroup}
            </div>
          </div>
          
          <div className={`px-4 py-2 rounded-lg border ${getPhaseColor()} flex items-center gap-2`}>
            {getPhaseIcon()}
            <span className="font-medium">{phase}</span>
          </div>
          
          {subject && (
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gray-500" />
              <div className="text-sm font-medium text-gray-700">
                {subject}
              </div>
            </div>
          )}
        </div>
        
        {theme && (
          <div className="px-3 py-1.5 bg-[#FFF9E7] text-[#B17F17] rounded-lg text-sm">
            {theme}
          </div>
        )}
      </div>
    </div>
  );
}