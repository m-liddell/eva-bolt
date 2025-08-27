import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BookOpen, Brain, CheckCircle2 } from 'lucide-react';
import InteractiveExplorationTemplate from '../../components/templates/InteractiveExplorationTemplate';
import { StudentActivityModal } from '../../components/StudentActivityModal';
import { getStudentActivityByLessonAndPhase } from '../../data/studentActivities';

export default function DystopianLesson5Starter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showStudentActivity, setShowStudentActivity] = useState(false);

  const lessonData = {
    title: "Personification Power Discovery",
    learning_objective: "I can understand how personification brings dystopian settings to life and creates unsettling effects",
    activity_type: "Personification Exploration",
    exploration_focus: "Hands-on exploration of how to give human qualities to dystopian objects and environments",
    interactive_elements: [
      {
        element_type: 'hands_on_activity' as const,
        title: 'Object Personality Assignment',
        description: 'Give threatening human personalities to surveillance cameras, buildings, and technology',
        materials: ['Dystopian object cards', 'Personality trait lists', 'Threatening quality worksheets']
      },
      {
        element_type: 'scenario_analysis' as const,
        title: 'Atmosphere Impact Testing',
        description: 'Test how different human qualities create varying levels of threat and unease',
        materials: ['Atmosphere assessment scales', 'Effect comparison charts', 'Reader response guides']
      },
      {
        element_type: 'collaborative_investigation' as const,
        title: 'Unsettling Effect Creation',
        description: 'Collaborate to create the most unsettling personification examples possible',
        materials: ['Creative brainstorming frameworks', 'Peer feedback forms', 'Effectiveness rubrics']
      }
    ],
    discovery_questions: [
      "What human qualities make surveillance cameras feel most threatening?",
      "How might government buildings 'behave' if they were alive and hostile?",
      "What emotions could sterile environments 'feel' toward humans?",
      "How do human qualities make inanimate objects feel dangerous?"
    ],
    collaboration_structure: [
      "Work in pairs to brainstorm threatening human qualities for objects",
      "Test different personality combinations for maximum unsettling effect",
      "Share most effective personification examples with other pairs",
      "Collaborate to refine and improve each other's threatening descriptions"
    ],
    theme: "dystopian"
  };

  const navigationData = {
    previousRoute: '/lesson/dystopian-lesson-4/plenary',
    nextRoute: '/lesson/dystopian-lesson-5/plenary'
  };

  const studentActivity = getStudentActivityByLessonAndPhase('dystopian-lesson-5', 'starter');

  return (
    <>
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Lesson Navigation */}
        <div className="mb-8 p-6 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Personification for Atmosphere</h3>
                <p className="text-sm text-gray-600">Give human qualities to dystopian objects to create threatening atmospheres</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg flex items-center gap-2"
              >
                <Brain className="w-4 h-4" />
                <span>Starter</span>
              </button>
              <button
                onClick={() => router.push('/lesson/dystopian-lesson-5/main')}
                className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Main</span>
              </button>
              <button
                onClick={() => router.push('/lesson/dystopian-lesson-5/plenary')}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Plenary</span>
              </button>
            </div>
          </div>
        </div>

      <InteractiveExplorationTemplate
        lessonData={lessonData}
        navigationData={navigationData}
        showEditButtons={true}
      />
      </div>
      {showStudentActivity && studentActivity && (
        <StudentActivityModal
          activity={studentActivity}
          onClose={() => setShowStudentActivity(false)}
        />
      )}
    </>
  );
}