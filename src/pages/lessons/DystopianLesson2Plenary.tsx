import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LessonLayout } from '../../components/LessonLayout';
import { EvaluationReflectionTemplate } from '../../components/templates/EvaluationReflectionTemplate';

const DystopianLesson2Plenary: React.FC = () => {
  const lessonData = {
    id: 'dystopian-lesson-2-plenary',
    title: 'Dystopian Fiction - Lesson 2 Plenary',
    subject: 'English',
    yearGroup: 'Year 10',
    duration: '15 minutes',
    learningObjective: 'Evaluate understanding of sentence construction and reflect on dystopian writing techniques',
    phase: 'Plenary' as const,
    lessonNumber: 2,
    totalLessons: 6,
    theme: 'Dystopian Fiction'
  };

  const navigationData = {
    previousRoute: '/lesson/dystopian-lesson-2/main',
    nextRoute: '/lesson/dystopian-lesson-3/starter',
    lessonPhases: {
      starter: '/lesson/dystopian-lesson-2/starter',
      main: '/lesson/dystopian-lesson-2/main',
      plenary: '/lesson/dystopian-lesson-2/plenary'
    }
  };

  const templateConfig = {
    evaluationType: 'reflection' as const,
    learningObjective: 'Evaluate understanding of sentence construction and reflect on dystopian writing techniques',
    evaluationPrompts: [
      'What makes a sentence effective in creating a dystopian atmosphere?',
      'How did varying your sentence structure improve your writing?',
      'Which sentence types were most challenging to construct?',
      'What dystopian writing techniques will you use in future work?'
    ],
    reflectionQuestions: [
      'Rate your confidence in writing complete sentences (1-10)',
      'What was your biggest learning from today\'s lesson?',
      'Which sentence construction technique will you practice more?',
      'How will you apply these skills in your next piece of writing?'
    ],
    successCriteria: [
      'Can identify effective sentence construction techniques',
      'Can reflect on own writing development',
      'Can evaluate the impact of sentence variety',
      'Can plan next steps for improvement'
    ],
    theme: 'Dystopian Fiction'
  };

  return (
    <LessonLayout 
      lessonData={lessonData}
      navigationData={navigationData}
    >
      <EvaluationReflectionTemplate {...templateConfig} />
    </LessonLayout>
  );
};

export default DystopianLesson2Plenary;