import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { default as ShowcaseAnalysisTemplate } from '../../components/templates/ShowcaseAnalysisTemplate';
import { StudentActivityModal } from '../../components/StudentActivityModal';
import { getStudentActivityByLessonAndPhase } from '../../data/studentActivities';
import { NavigationArrow } from '../../components/NavigationArrow';
import { MidAssistant } from '../../components/MidAssistant';
import { MiniAssistant } from '../../components/MiniAssistant';
import { Share2, BookOpen, Brain, CheckCircle2 } from 'lucide-react';

export default function DystopianLesson5Plenary() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showStudentActivity, setShowStudentActivity] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Extract lesson data from location state if available
  const lessonData = {
    yearGroup: 'Year 7',
    class: 'A',
    subject: 'English',
    theme: 'Dystopian Fiction'
  };

  const templateLessonData = {
    title: "Unsettling Effects Showcase",
    learning_objective: "I can share most unsettling personification example and discuss how personification makes dystopian worlds threatening",
    activity_type: "Unsettling Effects Showcase",
    showcase_focus: "personification techniques and threatening atmosphere creation",
    analysis_questions: [
      "What makes your personification example particularly unsettling?",
      "How does personification make dystopian worlds feel threatening?",
      "What psychological effects does personification create on readers?",
      "Why is personification particularly effective in dystopian fiction?"
    ],
    student_examples: [
      "The surveillance cameras blinked hungrily as they devoured every private moment with their mechanical appetite.",
      "The government buildings loomed over the streets like jealous giants, their windows glaring down with suspicious eyes that never closed.",
      "The propaganda speakers whispered seductively into citizens' ears, their voices dripping with false promises and hidden threats."
    ],
    evaluation_criteria: [
      "Share most unsettling personification examples",
      "Explain how personification creates threatening effects",
      "Understand personification's role in creating threatening atmosphere",
      "Demonstrate mastery of atmospheric writing techniques"
    ],
    theme: "Dystopian Fiction"
  };

  const navigationData = {
    previousRoute: '/lesson/dystopian-lesson-5/starter',
    nextRoute: '/lesson/dystopian-lesson-6/starter'
  };

  const studentActivity = getStudentActivityByLessonAndPhase('dystopian-lesson-5', 'plenary');

  const startTimer = (minutes: number) => {
    setTimer(minutes * 60);
    setIsTimerRunning(true);
    
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev === null || prev <= 1) {
          setIsTimerRunning(false);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6">
          <div className="space-y-6">
            {/* Learning Objective */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[#FFB800] font-medium mr-2">Learning Objective:</span>
                <span className="font-bold text-slate-700">I can share most unsettling personification example and discuss how personification makes dystopian worlds threatening</span>
              </div>
              <MidAssistant context={{ topic: 'literary analysis' }} />
            </div>

            {/* Introduction */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-base text-gray-800">
                💬 Let's share the most unsettling personification examples we've created and discuss how personification makes dystopian worlds feel threatening. 
                We'll explore the psychological impact of bringing inanimate objects to life in sinister ways.
              </p>
            </div>

            {/* Building on Prior Knowledge */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-base font-bold mb-2">🧠 Building on Prior Knowledge:</h3>
              <ul className="text-sm space-y-2">
                <li>Completed personification workshop with dystopian elements</li>
                <li>Created threatening atmospheres using personification</li>
                <li>Understanding of unsettling effect creation</li>
                <li>Experience with atmospheric writing techniques</li>
              </ul>
            </div>

            {/* Success Criteria */}
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="text-sm font-medium text-amber-800 mb-2">Success Criteria:</h3>
              <ul className="space-y-2 text-sm text-amber-800">
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Share most unsettling personification examples</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Explain how personification creates threatening effects</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Understand personification's role in creating threatening atmosphere</span>
                </li>
              </ul>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-6">
              {/* Interactive Content Column */}
              <div className="col-span-7">
                <div className="space-y-6">
                  {/* Phase 1: Share Unsettling Examples */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-gray-800 flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 font-bold">1</span>
                        </div>
                        Share Most Unsettling Personification Example
                      </h4>
                      <button
                        onClick={() => startTimer(6)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                      >
                        Start 6-Min Timer
                      </button>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h5 className="font-medium text-blue-800 mb-3">Share Your Most Unsettling Example:</h5>
                      <textarea
                        className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        rows={4}
                        placeholder="Share your most unsettling personification example that creates a threatening dystopian atmosphere..."
                      />
                    </div>
                  </div>

                  {/* Phase 2: Discuss Threatening Effects */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-gray-800 flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <span className="text-purple-600 font-bold">2</span>
                        </div>
                        Discuss How Personification Makes Worlds Threatening
                      </h4>
                      <button
                        onClick={() => startTimer(4)}
                        className="px-3 py-1 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600 transition-colors"
                      >
                        Start 4-Min Timer
                      </button>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <h5 className="font-medium text-purple-800 mb-3">Discussion Questions:</h5>
                      <ul className="space-y-2 text-sm text-purple-700">
                        <li>• How does personification make dystopian worlds feel threatening?</li>
                        <li>• What psychological effects does personification create on readers?</li>
                        <li>• How does giving human qualities to objects enhance atmosphere?</li>
                        <li>• Why is personification particularly effective in dystopian fiction?</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reflection Questions Column */}
              <div className="col-span-5 space-y-4">
                <div className="p-4 bg-slate-900 rounded-lg shadow-lg text-white">
                  <div className="flex items-center space-x-2 mb-4">
                    <Share2 className="w-5 h-5 text-[#FFB800]" />
                    <h2 className="text-lg font-bold text-white">🎯 Threat Analysis:</h2>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start justify-between">
                      <div className="flex items-start">
                        <span className="text-[#FFB800] mt-1 mr-2">•</span>
                        <span>What makes your personification example particularly unsettling?</span>
                      </div>
                      <MiniAssistant answer="Effective unsettling personification combines unexpected human qualities with threatening implications, making familiar objects feel alien and dangerous." />
                    </li>
                    <li className="flex items-start justify-between">
                      <div className="flex items-start">
                        <span className="text-[#FFB800] mt-1 mr-2">•</span>
                        <span>How do you think personification enhances threatening atmosphere?</span>
                      </div>
                      <MiniAssistant answer="Personification creates the sense that the environment itself is hostile and conscious, making characters (and readers) feel surrounded by potential threats." />
                    </li>
                    <li className="flex items-start justify-between">
                      <div className="flex items-start">
                        <span className="text-[#FFB800] mt-1 mr-2">•</span>
                        <span>What role do you think personification plays in creating threatening atmosphere?</span>
                      </div>
                      <MiniAssistant answer="Personification transforms passive environments into active threats, making readers feel that danger could come from anywhere, even seemingly harmless objects." />
                    </li>
                  </ul>
                </div>

                {/* Keywords */}
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h3 className="text-sm font-medium text-indigo-800 mb-2">Key Vocabulary:</h3>
                  <div className="flex flex-wrap gap-2">
                    {['unsettling effects', 'threatening atmosphere', 'psychological impact', 'atmospheric enhancement'].map((keyword, index) => (
                      <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Assessment Focus */}
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="text-sm font-medium text-green-800 mb-2">Assessment Focus:</h3>
                  <p className="text-sm text-green-700">
                    Understanding of personification's role in creating threatening atmosphere
                  </p>
                </div>

                {/* Timer Display */}
                {timer !== null && (
                  <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <div className="text-center">
                      <div className={`inline-block px-6 py-3 rounded-lg text-2xl font-bold ${
                        timer > 300 ? 'bg-green-100 text-green-700' :
                        timer > 120 ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {formatTime(timer)}
                      </div>
                      <p className="text-sm text-indigo-700 mt-2">
                        {timer > 300 ? 'Plenty of time for sharing' :
                         timer > 120 ? 'Keep sharing focused' :
                         'Wrap up current thoughts'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Text */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-base text-gray-800">
                💬 Through sharing and analyzing our personification techniques, we've learned how to make dystopian environments feel alive and threatening, a powerful tool for atmospheric writing.
              </p>
            </div>

            {/* Homework Extension */}
            <div className="p-4 bg-violet-50 rounded-lg border border-violet-200">
              <h3 className="text-sm font-medium text-violet-800 mb-2">📝 Homework Extension:</h3>
              <p className="text-sm text-violet-700">
                Analyze similes in dystopian literature and media
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <NavigationArrow direction="left" onClick={() => router.push('/lesson/dystopian-lesson-5/starter')} />
              <NavigationArrow direction="right" onClick={() => router.push('/admin/lesson-library')} />
            </div>
          </div>
        </div>

        {/* Student Activity Modal */}
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