import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Brain, Clock, Users, Target, BookOpen, CheckCircle2 } from 'lucide-react';
import { NavigationArrow } from '../../components/NavigationArrow';
import { MidAssistant } from '../../components/MidAssistant';
import { MiniAssistant } from '../../components/MiniAssistant';
import { InteractiveImageViewer } from '../../components/InteractiveImageViewer';
import { InteractiveWritingPanel } from '../../components/InteractiveWritingPanel';

export default function StarterLesson1() {
  const navigate = useNavigate();
  const location = useLocation();
  const [timer, setTimer] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [imageAnalysis, setImageAnalysis] = useState<Record<string, string>>({});
  const [writingResponse, setWritingResponse] = useState('');

  // Extract lesson data from location state if available
  const lessonData = location.state?.lesson || {
    yearGroup: 'Year 10',
    class: 'A',
    subject: 'English',
    theme: 'Dystopian Fiction'
  };

  const dystopianImages = [
    {
      url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=600',
      title: 'Green Utopia',
      description: 'Sustainable cities with nature integration and renewable energy',
      category: 'utopian' as const
    },
    {
      url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?auto=format&fit=crop&q=80&w=600',
      title: 'Peaceful Harmony',
      description: 'Communities living in balance with diverse, happy people',
      category: 'utopian' as const
    },
    {
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=600',
      title: 'Bright Innovation',
      description: 'Advanced technology serving humanity in bright, hopeful spaces',
      category: 'utopian' as const
    },
    {
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
      title: 'Surveillance State',
      description: 'Constant monitoring and control through omnipresent technology',
      category: 'dystopian' as const
    },
    {
      url: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&q=80&w=600',
      title: 'Urban Decay',
      description: 'Environmental destruction and crumbling infrastructure',
      category: 'dystopian' as const
    },
    {
      url: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?auto=format&fit=crop&q=80&w=600',
      title: 'Oppressive Control',
      description: 'Dark, imposing architecture representing authoritarian power',
      category: 'dystopian' as const
    }
  ];

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

  const handleImageAnalysis = (imageId: string, analysis: string) => {
    setImageAnalysis(prev => ({
      ...prev,
      [imageId]: analysis
    }));
  };

  const handleWritingSave = (text: string) => {
    setWritingResponse(text);
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
                <h3 className="text-lg font-bold text-gray-800">Dystopian Story Opening</h3>
                <p className="text-sm text-gray-600">Explore the themes of Dystopian fiction</p>
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
                onClick={() => navigate('/lesson/dystopian-writing')}
                className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Main</span>
              </button>
              <button
                onClick={() => navigate('/lesson/dystopian/plenary')}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Plenary</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6">
          <div className="space-y-6">
            {/* Learning Objective */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[#FFB800] font-medium mr-2">Learning Objective:</span>
                <span className="font-bold text-slate-700">Write an engaging dystopian story opening that builds tension through atmosphere and control</span>
              </div>
              <MidAssistant context={{ topic: 'literature' }} />
            </div>

            {/* Introduction */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-base text-gray-800">
                💬 Imagine you wake up and the world has changed. There are no more conversations—only silence. 
                Every street light has a built-in scanner, tracking your every move. Books, films, and news reports 
                have been rewritten to match the government's version of reality. You don't remember when it started, 
                but you know one thing for sure: no one questions the rules. No one speaks out. Because words are dangerous.
              </p>
            </div>

            {/* Building on Prior Knowledge */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-base font-bold mb-2">🧠 Building on Prior Knowledge:</h3>
              <ul className="text-sm space-y-2">
                <li>You have studied dystopian literature like 1984 and The Hunger Games.</li>
                <li>You have explored narrative techniques in GCSE English Language Paper 1.</li>
              </ul>
            </div>

            {/* Success Criteria */}
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="text-sm font-medium text-amber-800 mb-2">Success Criteria:</h3>
              <ul className="space-y-2 text-sm text-amber-800">
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Write an engaging story opening that builds tension</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Use atmosphere and control to create dystopian setting</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Apply narrative techniques effectively</span>
                </li>
              </ul>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-6">
              {/* Interactive Content Column */}
              <div className="col-span-7">
                <div className="space-y-6">
                  {/* Phase 1: View Contrasting Images */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-gray-800 flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 font-bold">1</span>
                        </div>
                        View Contrasting Images
                      </h4>
                      <button
                        onClick={() => startTimer(4)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                      >
                        Start 4-Min Timer
                      </button>
                    </div>
                    <InteractiveImageViewer 
                      images={dystopianImages}
                      onImageAnalysis={handleImageAnalysis}
                      showAnalysisTools={true}
                    />
                  </div>

                  {/* Phase 2: Quick-Write Activity */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <span className="text-purple-600 font-bold">2</span>
                      </div>
                      <h4 className="text-lg font-bold text-gray-800">Quick-Write Emotional Responses</h4>
                    </div>
                    <InteractiveWritingPanel
                      prompt="Write your immediate emotional responses to the images you've seen. What feelings do they evoke? What key differences do you notice between utopian and dystopian futures?"
                      duration={6}
                      placeholder="Write your thoughts about the images you've seen. Focus on emotions and key differences..."
                      onSave={handleWritingSave}
                      showTimer={true}
                    />
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
                        <span>Would you accept the rules or resist them?</span>
                      </div>
                      <MiniAssistant answer="This question explores personal values and moral courage. Consider what factors might influence someone's decision to comply or resist - fear, family safety, hope for change, or moral conviction." />
                    </li>
                    <li className="flex items-start justify-between">
                      <div className="flex items-start">
                        <span className="text-[#FFB800] mt-1 mr-2">•</span>
                        <span>What would be the first sign that something was wrong?</span>
                      </div>
                      <MiniAssistant answer="Early warning signs might include restrictions on communication, changes in media content, increased surveillance, or the disappearance of certain people or ideas from public discourse." />
                    </li>
                    <li className="flex items-start justify-between">
                      <div className="flex items-start">
                        <span className="text-[#FFB800] mt-1 mr-2">•</span>
                        <span>Can you find an example in real life where people accept restrictions for 'safety'?</span>
                      </div>
                      <MiniAssistant answer="Examples include airport security measures, pandemic lockdowns, internet censorship for child protection, or surveillance systems in public spaces - all justified by safety concerns." />
                    </li>
                    <li className="flex items-start justify-between">
                      <div className="flex items-start">
                        <span className="text-[#FFB800] mt-1 mr-2">•</span>
                        <span>Is the protagonist aware of the control, or have they normalized it?</span>
                      </div>
                      <MiniAssistant answer="This explores whether characters recognize oppression or have become so accustomed to it that it seems normal - a key theme in dystopian fiction about how gradually people can lose freedoms." />
                    </li>
                  </ul>
                </div>

                {/* Keywords */}
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h3 className="text-sm font-medium text-indigo-800 mb-2">Key Vocabulary:</h3>
                  <div className="flex flex-wrap gap-2">
                    {['dystopian', 'control', 'resistance', 'surveillance', 'oppression'].map((keyword, index) => (
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
                    Engagement in discussion and understanding of dystopian conventions
                  </p>
                </div>

                {/* Timer Display */}
                {timer !== null && (
                  <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <div className="text-center">
                      <div className={`inline-block px-6 py-3 rounded-lg text-2xl font-bold ${
                        timer > 180 ? 'bg-green-100 text-green-700' :
                        timer > 90 ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {formatTime(timer)}
                      </div>
                      <p className="text-sm text-indigo-700 mt-2">
                        {timer > 180 ? 'Plenty of time for exploration' :
                         timer > 90 ? 'Keep discussions focused' :
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
                💬 Through exploring dystopian themes and scenarios, we're building the foundation for understanding how writers create compelling narratives that comment on society and human nature.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <NavigationArrow direction="left" onClick={() => navigate('/')} />
              <NavigationArrow direction="right" onClick={() => navigate('/lesson/dystopian-writing')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}