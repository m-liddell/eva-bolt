import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Brain, BookOpen, CheckCircle2 } from 'lucide-react';
import { default as KnowledgeRetrievalGameTemplate } from '../../components/templates/KnowledgeRetrievalGameTemplate';
import { StudentActivityModal } from '../../components/StudentActivityModal';
import { getStudentActivityByLessonAndPhase } from '../../data/studentActivities';

export default function DystopianLesson4Starter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showStudentActivity, setShowStudentActivity] = useState(false);

  const lessonData = {
    title: "Complex Sentence Power Challenge",
    learning_objective: "I can analyze how complex sentences add depth and sophistication to dystopian descriptions",
    activity_type: "Complex Sentence Analysis Game",
    game_type: 'challenge_matching' as const,
    game_content: {
      matches: [
        {
          item: "Although the city appeared peaceful...",
          match: "...surveillance cameras monitored every citizen's movement."
        },
        {
          item: "While propaganda promised safety...",
          match: "...freedom slowly disappeared from daily life."
        },
        {
          item: "Because technology controlled everything...",
          match: "...human connection became nearly impossible."
        },
        {
          item: "When the government restricted information...",
          match: "...truth became a dangerous commodity."
        },
        {
          item: "Since environmental decay accelerated...",
          match: "...hope for the future diminished rapidly."
        },
        {
          item: "After the surveillance system activated...",
          match: "...privacy became a forgotten concept."
        }
      ]
    },
    timer_duration: 480, // 8 minutes
    theme: "Dystopian Fiction"
  };

  const navigationData = {
    previousRoute: '/lesson/dystopian-lesson-3/plenary',
    nextRoute: '/lesson/dystopian-lesson-4/main'
  };

  const studentActivity = getStudentActivityByLessonAndPhase('dystopian-lesson-4', 'starter');

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
        <KnowledgeRetrievalGameTemplate
          lessonData={lessonData}
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