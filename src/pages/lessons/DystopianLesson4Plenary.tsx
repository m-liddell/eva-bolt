import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Brain, BookOpen, CheckCircle2 } from 'lucide-react';
import { default as ShowcaseAnalysisTemplate } from '../../components/templates/ShowcaseAnalysisTemplate';
import { StudentActivityModal } from '../../components/StudentActivityModal';
import { getStudentActivityByLessonAndPhase } from '../../data/studentActivities';

export default function DystopianLesson4Plenary() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showStudentActivity, setShowStudentActivity] = useState(false);

  const templateLessonData = {
    title: "Sophistication Showcase",
    learning_objective: "I can present most sophisticated complex sentence created and analyze how complexity enhances dystopian description",
    activity_type: "Sophistication Showcase",
    showcase_focus: "sophisticated writing techniques and complexity analysis",
    analysis_questions: [
      "What makes your complex sentence particularly sophisticated?",
      "How does complexity enhance your dystopian description?",
      "What relationships between ideas does your complex sentence show?",
      "What impact does this complexity have on the reader?"
    ],
    student_examples: [
      "Although the surveillance system promised safety and security for all citizens, it actually created a prison where privacy became extinct and fear dominated every aspect of daily life.",
      "While the government's propaganda broadcasts filled the airwaves with messages of prosperity and progress, the reality beneath the surface revealed environmental decay and social inequality that threatened the very foundation of society.",
      "Because the technological control mechanisms had infiltrated every aspect of human interaction, genuine relationships became nearly impossible as trust eroded under constant monitoring and manipulation."
    ],
    evaluation_criteria: [
      "Present sophisticated complex sentences with confidence",
      "Analyze how complexity enhances descriptive impact", 
      "Understand sophisticated punctuation's role in professional writing",
      "Demonstrate mastery of advanced sentence construction"
    ],
    theme: "Dystopian Fiction"
  };

  const navigationData = {
    previousRoute: '/lesson/dystopian-lesson-4/starter',
    nextRoute: '/lesson/dystopian-lesson-5/starter'
  };

  const studentActivity = getStudentActivityByLessonAndPhase('dystopian-lesson-4', 'plenary');

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
                <h3 className="text-lg font-bold text-gray-800">Sophistication Showcase</h3>
                <p className="text-sm text-gray-600">Present most sophisticated complex sentence created</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/lesson/dystopian-lesson-4/starter')}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2"
              >
                <Brain className="w-4 h-4" />
                <span>Starter</span>
              </button>
              <button
                onClick={() => navigate('/lesson/dystopian-lesson-4/main')}
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