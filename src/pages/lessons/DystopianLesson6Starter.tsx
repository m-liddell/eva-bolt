import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Brain, Clock, Users, Target, BookOpen, CheckCircle2 } from 'lucide-react';
import { NavigationArrow } from '../../components/NavigationArrow';
import { MidAssistant } from '../../components/MidAssistant';
import { MiniAssistant } from '../../components/MiniAssistant';
import { InteractiveImageViewer } from '../../components/InteractiveImageViewer';
import { InteractiveWritingPanel } from '../../components/InteractiveWritingPanel';

export default function DystopianLesson6Starter() {
  const navigate = useNavigate();
  const location = useLocation();
  const [timer, setTimer] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Extract lesson data from location state if available
  const lessonData = location.state?.lesson || {
    yearGroup: 'Year 10',
    class: 'A',
    subject: 'English',
    theme: 'Dystopian Fiction'
  };

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
                <span className="font-bold text-slate-700">I can analyze how similes enhance dystopian atmosphere and convey themes of oppression and decay</span>
              </div>
              <MidAssistant context={{ topic: 'literary devices' }} />
            </div>

            {/* Introduction */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-base text-gray-800">
                💬 Analyze how professional authors use similes in dystopian descriptions. We'll create original similes that convey oppression and decay, then test our similes for atmospheric effectiveness.
              </p>
            </div>

            {/* Building on Prior Knowledge */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-base font-bold mb-2">🧠 Building on Prior Knowledge:</h3>
              <ul className="text-sm space-y-2">
                <li>Understanding of personification for unsettling effects</li>
                <li>Knowledge of basic literary devices</li>
                <li>Experience with dystopian atmosphere creation</li>
                <li>Familiarity with comparative writing techniques</li>
              </ul>
            </div>

            {/* Success Criteria */}
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="text-sm font-medium text-amber-800 mb-2">Success Criteria:</h3>
              <ul className="space-y-2 text-sm text-amber-800">
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Analyze how professional authors use similes in dystopian descriptions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Create original similes that convey oppression and decay</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Test similes for atmospheric effectiveness</span>
                </li>
              </ul>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-6">
              {/* Interactive Content Column */}
              <div className="col-span-7">
                <div className="space-y-6">
                  {/* Phase 1: Analyze Professional Similes */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-gray-800 flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 font-bold">1</span>
                        </div>
                        Analyze Professional Similes
                      </h4>
                      <button
                        onClick={() => startTimer(4)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                      >
                        Start 4-Min Timer
                      </button>
                    </div>
                    
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-4">
                      <h5 className="font-medium text-blue-800 mb-3">Professional Dystopian Simile Examples</h5>
                      <div className="space-y-3">
                        <div className="p-3 bg-white rounded-lg border border-blue-200">
                          <p className="text-sm text-gray-800 italic mb-2">
                            <strong>From 1984:</strong> "The telescreen received and transmitted simultaneously... You had to live—did live, from habit that became instinct—in the assumption that every sound you made was overheard, and, except in darkness, every movement scrutinized."
                          </p>
                          <p className="text-xs text-blue-700">
                            Orwell uses extended metaphor and implied similes to create paranoia and constant fear.
                          </p>
                        </div>
                        <div className="p-3 bg-white rounded-lg border border-blue-200">
                          <p className="text-sm text-gray-800 italic mb-2">
                            <strong>From The Hunger Games:</strong> "The woods became our savior, and each day I went a bit farther into its arms."
                          </p>
                          <p className="text-xs text-blue-700">
                            Collins personifies nature as protective, contrasting with the oppressive Capitol.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Phase 2: Quick Discussion */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-gray-800 flex items-center gap-3">
                        <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                          <span className="text-amber-600 font-bold">2</span>
                        </div>
                        Quick Discussion
                      </h4>
                      <button
                        onClick={() => startTimer(6)}
                        className="px-3 py-1 bg-amber-500 text-white rounded-lg text-sm hover:bg-amber-600 transition-colors"
                      >
                        Start 6-Min Timer
                      </button>
                    </div>
                    
                    <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                      <h5 className="font-medium text-amber-800 mb-3">Discussion Questions:</h5>
                      <ul className="space-y-2 text-sm text-amber-700">
                        <li>• How do professional authors use similes in dystopian descriptions?</li>
                        <li>• What makes a simile particularly effective for conveying oppression?</li>
                        <li>• How do similes enhance atmospheric writing compared to direct description?</li>
                        <li>• Which simile examples create the strongest dystopian imagery?</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Think-Pair-Share Questions Column */}
              <div className="col-span-5 space-y-4">
                <div className="p-4 bg-slate-900 rounded-lg shadow-lg text-white">
                  <div className="flex items-center space-x-2 mb-4">
                    <Brain className="w-5 h-5 text-[#FFB800]" />
                    <h2 className="text-lg font-bold text-white">👥 Think-Pair-Share:</h2>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start justify-between">
                      <div className="flex items-start">
                        <span className="text-[#FFB800] mt-1 mr-2">•</span>
                        <span>How do professional authors use similes in dystopian descriptions?</span>
                      </div>
                      <MiniAssistant answer="Professional authors use similes to make abstract concepts concrete, comparing dystopian elements to familiar but unsettling experiences that readers can viscerally understand." />
                    </li>
                    <li className="flex items-start justify-between">
                      <div className="flex items-start">
                        <span className="text-[#FFB800] mt-1 mr-2">•</span>
                        <span>What makes a simile particularly effective for conveying oppression?</span>
                      </div>
                      <MiniAssistant answer="Effective oppression similes often compare freedom-restricting elements to cages, chains, or predatory animals, making the abstract concept of oppression feel physically threatening." />
                    </li>
                    <li className="flex items-start justify-between">
                      <div className="flex items-start">
                        <span className="text-[#FFB800] mt-1 mr-2">•</span>
                        <span>How do similes enhance atmospheric writing compared to direct description?</span>
                      </div>
                      <MiniAssistant answer="Similes engage readers' imagination by connecting new concepts to familiar experiences, creating deeper emotional responses and more vivid mental imagery than direct description alone." />
                    </li>
                  </ul>
                </div>

                {/* Keywords */}
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h3 className="text-sm font-medium text-indigo-800 mb-2">Key Vocabulary:</h3>
                  <div className="flex flex-wrap gap-2">
                    {['similes', 'comparison', 'atmospheric creation', 'oppression', 'effectiveness'].map((keyword, index) => (
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
                    Understanding of simile analysis and discussion engagement
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
                        {timer > 300 ? 'Plenty of time for analysis' :
                         timer > 120 ? 'Keep discussions focused' :
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
                💬 Through analyzing professional techniques and discussing simile effectiveness, we're building the foundation for creating our own powerful dystopian similes.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <NavigationArrow direction="left" onClick={() => navigate('/lesson/dystopian-lesson-5/plenary')} />
              <NavigationArrow direction="right" onClick={() => navigate('/lesson/dystopian-lesson-6/plenary')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}