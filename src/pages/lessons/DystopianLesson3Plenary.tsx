import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Brain, BookOpen, CheckCircle2 } from 'lucide-react';
import ConsolidationConnectionTemplate from '../../components/templates/ConsolidationConnectionTemplate';
import { StudentActivityModal } from '../../components/StudentActivityModal';
import { getStudentActivityByLessonAndPhase } from '../../data/studentActivities';

export default function DystopianLesson3Plenary() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showStudentActivity, setShowStudentActivity] = useState(false);

  // Extract lesson data from location state if available
  const lessonData = location.state?.lesson || {
    yearGroup: 'Year 7',
    class: 'A',
    subject: 'English',
    theme: 'Dystopian Fiction'
  };

  const templateLessonData = {
    title: "Sentence Variety Mastery Consolidation",
    learning_objective: "I can consolidate understanding of sentence variety techniques and connect them to future dystopian writing development",
    success_criteria: [
      "Reflect on sentence variety progress and set goals for continued writing development",
      "Understand how simple and compound sentences create different atmospheric effects",
      "Connect sentence variety mastery to future sophisticated writing techniques",
      "Demonstrate understanding of strategic sentence choice in dystopian writing"
    ],
    key_insights: [
      "Simple sentences create direct impact and urgency, making them perfect for dramatic dystopian moments and building tension quickly",
      "Compound sentences show relationships between ideas and create more complex rhythms that enhance sophisticated dystopian descriptions",
      "Strategic sentence variety keeps readers engaged and allows writers to control pacing and emphasis throughout dystopian narratives",
      "Different sentence types create different atmospheric effects - simple for impact, compound for complexity and connection"
    ],
    unit_connections: [
      "Today's sentence variety mastery provides the technical foundation for all future dystopian writing workshops and creative tasks",
      "Understanding of simple vs compound sentence effects connects directly to our upcoming complex sentence sophistication lessons",
      "Strategic sentence choice skills developed today will enhance every piece of atmospheric writing throughout the unit",
      "Sentence variety techniques learned today prepare you for advanced punctuation and literary device lessons ahead"
    ],
    next_lesson_preview: "Tomorrow we'll elevate your writing sophistication by mastering complex sentences with multiple clauses. You'll learn how to create layered, nuanced descriptions that add depth and elegance to your dystopian worlds while maintaining clarity and impact.",
    theme: "Dystopian Fiction"
  };

  const navigationData = {
    previousRoute: '/lesson/dystopian-lesson-3/starter',
    nextRoute: '/lesson/dystopian-lesson-4/starter'
  };

  const studentActivity = getStudentActivityByLessonAndPhase('dystopian-lesson-3', 'plenary');

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
                <h3 className="text-lg font-bold text-gray-800">Sentence Variety Mastery Reflection</h3>
                <p className="text-sm text-gray-600">Reflect on sentence variety progress and set goals</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/lesson/dystopian-lesson-3/starter')}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2"
              >
                <Brain className="w-4 h-4" />
                <span>Starter</span>
              </button>
              <button
                onClick={() => navigate('/lesson/dystopian-lesson-3/main')}
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

        <ConsolidationConnectionTemplate
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