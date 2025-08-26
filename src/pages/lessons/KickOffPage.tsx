import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Brain, Clock, Users, Target, BookOpen, CheckCircle2, Play, Maximize2, ExternalLink } from 'lucide-react';
import { NavigationArrow } from '../../components/NavigationArrow';
import { MidAssistant } from '../../components/MidAssistant';
import { MiniAssistant } from '../../components/MiniAssistant';

export default function KickOffPage() {
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
        {/* Lesson Navigation */}
        <div className="mb-8 p-6 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Kick-Off</h3>
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
                <span className="font-bold text-slate-700">Explore the themes of Dystopian fiction</span>
              </div>
              <MidAssistant context={{ topic: 'literature' }} />
            </div>

            {/* Introduction */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-base text-gray-800">
                💬 This term we will be exploring Dystopian Fiction, a genre that holds a mirror to our own society by imagining 
                dark possible futures. From classics like "1984" to modern works like "The Hunger Games," dystopian stories 
                serve as powerful warnings about where current trends might lead us.
              </p>
            </div>

            {/* Building on Prior Knowledge */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-base font-bold mb-2">🧠 Building on Prior Knowledge:</h3>
              <ul className="text-sm space-y-2">
                <li>Understanding of narrative structure and pacing</li>
                <li>Experience with descriptive writing techniques</li>
                <li>Knowledge of how to create atmosphere</li>
                <li>Familiarity with character development</li>
              </ul>
            </div>

            {/* Success Criteria */}
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="text-sm font-medium text-amber-800 mb-2">Success Criteria:</h3>
              <ul className="space-y-2 text-sm text-amber-800">
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>To identify how power and control are used in society</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>To analyze the relationship between individuals and collective groups</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>To evaluate technology's influence on social structures</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>To assess the cost of maintaining social order</span>
                </li>
              </ul>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-6">
              {/* Video Column */}
              <div className="col-span-7">
                <div className="relative">
                  <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
                    <iframe
                      className="w-full h-full"
                      src="https://www.youtube-nocookie.com/embed/mfmrPu43DF8"
                      title="The Hunger Games Official Trailer"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    <button className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-colors">
                      <Maximize2 className="w-5 h-5" />
                    </button>
                    <a 
                      href="https://www.youtube.com/watch?v=mfmrPu43DF8" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-black/50 hover:bg-black/70 text-white rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Think-Pair-Share Questions Column */}
              <div className="col-span-5 space-y-4">
                <div className="p-4 bg-slate-900 rounded-lg shadow-lg text-white">
                  <div className="flex items-center space-x-2 mb-4">
                    <Play className="w-5 h-5 text-[#FFB800]" />
                    <h2 className="text-lg font-bold text-white">👥 Think-Pair-Share:</h2>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start justify-between">
                      <div className="flex items-start">
                        <span className="text-[#FFB800] mt-1 mr-2">•</span>
                        <span>How does society control citizens?</span>
                      </div>
                      <MiniAssistant answer="Through surveillance, limited resources, and social divisions." />
                    </li>
                    <li className="flex items-start justify-between">
                      <div className="flex items-start">
                        <span className="text-[#FFB800] mt-1 mr-2">•</span>
                        <span>What creates unfairness?</span>
                      </div>
                      <MiniAssistant answer="Unequal distribution of resources and power." />
                    </li>
                    <li className="flex items-start justify-between">
                      <div className="flex items-start">
                        <span className="text-[#FFB800] mt-1 mr-2">•</span>
                        <span>How do people resist?</span>
                      </div>
                      <MiniAssistant answer="Through small acts of defiance and rebellion." />
                    </li>
                  </ul>
                </div>

                {/* Keywords */}
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h3 className="text-sm font-medium text-indigo-800 mb-2">Key Vocabulary:</h3>
                  <div className="flex flex-wrap gap-2">
                    {['dystopian', 'society', 'control', 'resistance', 'power'].map((keyword, index) => (
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
                    Understanding of dystopian themes and engagement with multimedia content
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
                        {timer > 300 ? 'Plenty of time for discussion' :
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
                💬 Through studying classic and contemporary dystopian works, we'll examine how authors use world-building, 
                character, and conflict to critique social issues. Then, you'll create your own dystopian stories, 
                exploring themes that matter to you.
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