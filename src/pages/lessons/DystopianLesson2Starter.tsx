import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Brain, Clock, Users, Target, BookOpen, CheckCircle2 } from 'lucide-react';
import { default as QuickFireDiscussionTemplate } from '../../components/templates/QuickFireDiscussionTemplate';
import { StudentActivityModal } from '../../components/StudentActivityModal';
import { getStudentActivityByLessonAndPhase } from '../../data/studentActivities';

export default function DystopianLesson2Starter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showStudentActivity, setShowStudentActivity] = useState(false);

  // Extract lesson data from location state if available
  const lessonData = {
    yearGroup: 'Year 10',
    class: 'A',
    subject: 'English',
    theme: 'Dystopian Fiction'
  };

  const templateLessonData = {
    title: "Sentence Construction Speed Challenge",
    learning_objective: "I can construct complete sentences quickly and accurately using dystopian vocabulary",
    activity_type: "Quick-Fire Discussion",
    discussion_type: 'speed_challenge' as const,
    discussion_prompt: "Build complete sentences using dystopian vocabulary and themes. Focus on accuracy, variety, and atmospheric language that creates tension and unease.",
    discussion_questions: [
      "Create a simple sentence describing a dystopian setting",
      "Build a compound sentence about government control",
      "Construct a complex sentence showing character rebellion",
      "Form a sentence using dystopian vocabulary (surveillance, oppression, conformity)",
      "Write a sentence that creates an atmosphere of fear or unease"
    ],
    success_criteria: [
      "Construct grammatically correct complete sentences",
      "Use appropriate dystopian vocabulary and themes",
      "Demonstrate understanding of sentence variety",
      "Create atmospheric language that builds tension",
      "Show accuracy in grammar and punctuation"
    ],
    theme: "Dystopian Fiction"
  };

  const navigationData = {
    previousRoute: '/lesson/dystopian-lesson-1/plenary',
    nextRoute: '/lesson/dystopian-lesson-2/main'
  };

  const studentActivity = getStudentActivityByLessonAndPhase('dystopian-lesson-2', 'starter');

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(75, 85, 99, 0.95) 0%,
            rgba(75, 85, 99, 0.85) 15%,
            rgba(75, 85, 99, 0.85) 85%,
            rgba(75, 85, 99, 0.95) 100%
          ),
          url('https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&q=80')
        `,
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <QuickFireDiscussionTemplate
          lessonData={templateLessonData}
          navigationData={navigationData}
        />
      </div>

      {showStudentActivity && studentActivity && (
        <StudentActivityModal
          activity={studentActivity}
          onClose={() => setShowStudentActivity(false)}
        />
      )}
    </div>
  );
}