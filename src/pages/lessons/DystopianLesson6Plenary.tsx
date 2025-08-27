import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Brain, BookOpen, CheckCircle2 } from 'lucide-react';
import { default as ShowcaseAnalysisTemplate } from '../../components/templates/ShowcaseAnalysisTemplate';
import { StudentActivityModal } from '../../components/StudentActivityModal';
import { getStudentActivityByLessonAndPhase } from '../../data/studentActivities';

export default function DystopianLesson6Plenary() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showStudentActivity, setShowStudentActivity] = useState(false);

  const templateLessonData = {
    title: "Simile Power Showcase",
    learning_objective: "I can present most powerful dystopian simile created and evaluate simile effectiveness for conveying themes",
    activity_type: "Simile Power Showcase", 
    showcase_focus: "simile effectiveness and thematic impact analysis",
    analysis_questions: [
      "What makes your simile particularly powerful for dystopian atmosphere?",
      "How does your simile convey themes effectively?",
      "What emotions does your simile evoke in readers?",
      "How does your simile compare to professional examples we studied?"
    ],
    student_examples: [
      "The city's surveillance network spread like a spider's web, trapping citizens in invisible threads of constant observation.",
      "Freedom withered like flowers in toxic soil, slowly dying under the government's oppressive control.",
      "The propaganda flowed through the streets like poisoned honey, sweet on the surface but deadly beneath."
    ],
    evaluation_criteria: [
      "Present most powerful dystopian simile created",
      "Evaluate simile effectiveness for conveying themes",
      "Understand quality of similes and thematic impact",
      "Demonstrate mastery of comparative writing techniques"
    ],
    theme: "Dystopian Fiction"
  };

  const navigationData = {
    previousRoute: '/lesson/dystopian-lesson-6/starter',
    nextRoute: '/admin/lesson-library'
  };

  const studentActivity = getStudentActivityByLessonAndPhase('dystopian-lesson-6', 'plenary');

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(30, 41, 59, 0.95) 0%,
            rgba(30, 41, 59, 0.85) 15%,
            rgba(30, 41, 59, 0.85) 85%,
            rgba(30, 41, 59, 0.95) 100%
          ),
          url('https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&q=80')
        `,
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <ShowcaseAnalysisTemplate
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