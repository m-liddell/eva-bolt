import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Brain, BookOpen, CheckCircle2 } from 'lucide-react';
import CollaborativeInvestigationTemplate from '../../components/templates/CollaborativeInvestigationTemplate';
import { StudentActivityModal } from '../../components/StudentActivityModal';
import { getStudentActivityByLessonAndPhase } from '../../data/studentActivities';

const DystopianLesson2Main: React.FC = () => {
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
    title: "Dystopian Sentence Construction Workshop",
    learning_objective: "I can master complete sentence components using dystopian examples and practice atmospheric writing",
    investigation_type: 'text_analysis_workshop' as const,
    investigation_focus: "Collaborative analysis of complete sentence construction in dystopian contexts with atmospheric writing practice",
    materials: {
      texts: [
        "The surveillance cameras watched every movement with mechanical precision.",
        "Citizens hurried through sterile corridors, their footsteps echoing in haunting unison.",
        "Propaganda speakers broadcast approved messages while screens displayed sanitized news.",
        "The identification scanners beeped constantly as people passed through security checkpoints.",
        "Environmental decay poisoned the air while government buildings gleamed with false prosperity.",
        "Technology controlled communication, transportation, and even thoughts in this oppressive world."
      ]
    },
    collaboration_structure: {
      group_size: 6,
      roles: [
        "Sentence Structure Analyst",
        "Atmospheric Language Expert", 
        "Grammar Accuracy Checker",
        "Dystopian Context Specialist",
        "Vocabulary Development Expert",
        "Peer Support Coordinator"
      ],
      rotation_time: 8
    },
    theme: "Dystopian Fiction"
  };

  const navigationData = {
    previousRoute: '/lesson/dystopian-lesson-2/starter',
    nextRoute: '/lesson/dystopian-lesson-2/plenary'
  };

  const studentActivity = getStudentActivityByLessonAndPhase('dystopian-lesson-2', 'main');

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
        <CollaborativeInvestigationTemplate 
          lessonData={templateLessonData}
          navigationData={navigationData}
        />

        {showStudentActivity && studentActivity && (
          <StudentActivityModal
            activity={studentActivity}
            onClose={() => setShowStudentActivity(false)}
          />
        )}
      </div>
    </div>
  );
};

export default DystopianLesson2Main;