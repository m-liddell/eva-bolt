import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Brain, Clock, Users, Target, BookOpen, CheckCircle2 } from 'lucide-react';
import InteractiveExplorationTemplate from '../../components/templates/InteractiveExplorationTemplate';
import { StudentActivityModal } from '../../components/StudentActivityModal';
import { getStudentActivityByLessonAndPhase } from '../../data/studentActivities';

export default function DystopianLesson1Starter() {
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
    title: "Dystopian World Quick-Fire Exploration",
    learning_objective: "I can quickly identify and explore key features of dystopian worlds through rapid-fire activities",
    activity_type: "Quick-Fire Exploration",
    exploration_focus: "Rapid identification and analysis of dystopian world characteristics",
    interactive_elements: [
      {
        element_type: 'hands_on_activity' as const,
        title: 'Dystopian Image Analysis Sprint',
        description: 'Rapidly analyze dystopian images to identify key visual features and atmospheric elements',
        materials: ['Dystopian image collection', 'Feature identification sheets', 'Timer for rapid analysis']
      },
      {
        element_type: 'scenario_analysis' as const,
        title: 'World-Building Speed Challenge',
        description: 'Quick-fire creation of dystopian world elements using prompts and constraints',
        materials: ['World-building prompt cards', 'Constraint challenge sheets', 'Collaborative planning tools']
      },
      {
        element_type: 'collaborative_investigation' as const,
        title: 'Genre Convention Hunt',
        description: 'Team-based hunt for dystopian conventions across different media examples',
        materials: ['Convention checklist', 'Media example library', 'Team recording sheets']
      }
    ],
    discovery_questions: [
      "What visual elements immediately signal a dystopian world?",
      "How do dystopian societies control their citizens?",
      "What role does technology play in dystopian control?",
      "How do dystopian worlds reflect real-world concerns?"
    ],
    collaboration_structure: [
      "Work in small teams to analyze different dystopian examples",
      "Share findings through rapid-fire presentations",
      "Build collective understanding of genre conventions",
      "Challenge each other's interpretations and discoveries"
    ],
    theme: "dystopian"
  };

  const navigationData = {
    previousRoute: '/admin/lesson-library',
    nextRoute: '/lesson/dystopian-lesson-1/main'
  };

  const studentActivity = getStudentActivityByLessonAndPhase('dystopian-lesson-1', 'starter');

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
        )`,
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <InteractiveExplorationTemplate
          lessonData={templateLessonData}
          navigationData={navigationData}
          showEditButtons={true}
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
}