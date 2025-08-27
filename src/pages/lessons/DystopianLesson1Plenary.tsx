import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Brain, BookOpen, CheckCircle2 } from 'lucide-react';
import { LessonLayout } from '../../components/LessonLayout';
import { NavigationArrow } from '../../components/NavigationArrow';
import { EvaluationReflectionTemplate } from '../../components/templates/EvaluationReflectionTemplate';

const DystopianLesson1Plenary: React.FC = () => {
  const router = useRouter();

  const lessonData = {
    title: "Dystopian Fiction: Lesson 1 - Plenary",
    phase: "Plenary" as const,
    duration: "15 minutes",
    yearGroup: "Year 10",
    subject: "English",
    theme: "Dystopian Fiction",
    previousRoute: "/lesson/dystopian-lesson-1/main",
    nextRoute: "/lesson/dystopian-lesson-2/starter"
  };

  const evaluationData = {
    title: "Sentence Construction Mastery Check",
    duration: "15 minutes",
    theme: "Dystopian Fiction",
    
    reflectionPrompts: [
      "What makes a sentence 'complete' and effective?",
      "How did adding descriptive details change the impact of your sentences?",
      "Which sentence structures felt most natural to you today?",
      "What dystopian atmosphere did you create through your word choices?"
    ],
    
    evaluationCriteria: [
      {
        skill: "Sentence Completeness",
        levels: [
          "Can identify complete sentences",
          "Can write simple complete sentences",
          "Can write complex complete sentences with confidence"
        ]
      },
      {
        skill: "Descriptive Language",
        levels: [
          "Uses basic adjectives",
          "Uses varied descriptive language",
          "Creates vivid atmospheric descriptions"
        ]
      },
      {
        skill: "Sentence Variety",
        levels: [
          "Uses simple sentences",
          "Combines simple and compound sentences",
          "Uses complex sentence structures effectively"
        ]
      }
    ],
    
    exitTicketQuestions: [
      "Write one complete sentence about a dystopian world",
      "What is the most important thing you learned about sentence construction today?",
      "Rate your confidence in writing complete sentences (1-5)"
    ],
    
    successCriteria: [
      "I can identify what makes a sentence complete",
      "I can write descriptive sentences about dystopian settings",
      "I can explain my sentence construction choices",
      "I can assess my own writing progress"
    ],
    
    peerAppreciationFocus: "Effective use of descriptive language in dystopian writing",
    
    goalSettingAreas: [
      "Complex sentence construction",
      "Varied vocabulary for atmosphere",
      "Editing and proofreading skills",
      "Creative writing confidence"
    ]
  };

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
        {/* Lesson Navigation */}
        <div className="mb-8 p-6 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Dystopian Feature Gallery</h3>
                <p className="text-sm text-gray-600">Consolidate understanding of dystopian features</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/lesson/dystopian-lesson-1/starter')}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2"
              >
                <Brain className="w-4 h-4" />
                <span>Starter</span>
              </button>
              <button
                onClick={() => navigate('/lesson/dystopian-lesson-1/main')}
                className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Main</span>
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Plenary</span>
              </button>
            </div>
          </div>
        </div>

        <LessonLayout
          title={lessonData.title}
          phase={lessonData.phase}
          duration={lessonData.duration}
          yearGroup={lessonData.yearGroup}
          subject={lessonData.subject}
          theme={lessonData.theme}
        >
          <div className="space-y-6">
            <EvaluationReflectionTemplate 
              lessonData={{
                title: lessonData.title,
                phase: lessonData.phase,
                duration: lessonData.duration,
                yearGroup: lessonData.yearGroup,
                subject: lessonData.subject,
                theme: lessonData.theme
              }}
              navigationData={{
                previousRoute: lessonData.previousRoute,
                nextRoute: lessonData.nextRoute
              }}
              {...evaluationData}
            />
            
            <div className="flex justify-between items-center pt-6 border-t border-gray-200">
              <NavigationArrow
                direction="left"
                onClick={() => navigate(lessonData.previousRoute)}
                label="Back to Main"
              />
              <NavigationArrow
                direction="right"
                onClick={() => navigate(lessonData.nextRoute)}
                label="Next Lesson"
              />
            </div>
          </div>
        </LessonLayout>
      </div>
    </div>
  );
};

export default DystopianLesson1Plenary;