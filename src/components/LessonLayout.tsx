'use client';

import React from 'react';

interface LessonLayoutProps {
  children: React.ReactNode;
  exampleText?: string;
  lessonPhase: 'Starter' | 'Main' | 'Plenary';
  theme?: string;
  context?: {
    type?: string;
    focus?: string;
  };
  yearGroup?: string;
  classGroup?: string;
  subject?: string;
}

export function LessonLayout({ 
  children, 
  exampleText, 
  lessonPhase, 
  theme, 
  context,
  yearGroup = 'Year 10',
  classGroup = 'A',
  subject = 'English'
}: LessonLayoutProps) {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-[1400px] mx-auto px-4">
        {children}
      </div>
    </div>
  );
}