import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Eye, Users, Clock, Play, Pause, ArrowRight, CheckCircle, BookOpen } from 'lucide-react';
import { LessonLayout } from '../LessonLayout';
import { NavigationArrow } from '../NavigationArrow';
import { MidAssistant } from '../MidAssistant';
import { MiniAssistant } from '../MiniAssistant';

// THEME COLOR SYSTEM
const getThemeColors = (theme?: string) => {
  switch (theme) {
    case 'dystopian':
    case 'Dystopian Fiction':
    case 'dark':
      return {
        primary: 'bg-gray-900',
        secondary: 'bg-gray-800/50', 
        text: 'text-white',
        accent: 'text-yellow-400',
        border: 'border-gray-600',
        hover: 'hover:bg-gray-700',
        backgroundGradient: 'rgba(75, 85, 99, 0.95)',
        itemBg: 'bg-white',
        itemText: 'text-gray-800',
        categoryBg: 'bg-white/90'
      };
    case 'nature':
    case 'science':
    case 'Creative Writing':
    case 'Energy Transfer':
      return {
        primary: 'bg-green-900',
        secondary: 'bg-green-800/50',
        text: 'text-white', 
        accent: 'text-green-300',
        border: 'border-green-600',
        hover: 'hover:bg-green-700',
        backgroundGradient: 'rgba(34, 197, 94, 0.95)',
        itemBg: 'bg-white',
        itemText: 'text-gray-800',
        categoryBg: 'bg-white/90'
      };
    case 'technology':
    case 'Shakespeare':
      return {
        primary: 'bg-blue-900',
        secondary: 'bg-blue-800/50',
        text: 'text-white',
        accent: 'text-blue-300', 
        border: 'border-blue-600',
        hover: 'hover:bg-blue-700',
        backgroundGradient: 'rgba(30, 64, 175, 0.95)',
        itemBg: 'bg-white',
        itemText: 'text-gray-800',
        categoryBg: 'bg-white/90'
      };
    case 'history':
    case 'Industrial Revolution':
    case 'War Poetry':
      return {
        primary: 'bg-amber-900',
        secondary: 'bg-amber-800/50',
        text: 'text-white',
        accent: 'text-amber-300',
        border: 'border-amber-600', 
        hover: 'hover:bg-amber-700',
        backgroundGradient: 'rgba(180, 83, 9, 0.95)',
        itemBg: 'bg-white',
        itemText: 'text-gray-800',
        categoryBg: 'bg-white/90'
      };
    default:
      // Default to green theme
      return {
        primary: 'bg-green-900',
        secondary: 'bg-green-800/50',
        text: 'text-white', 
        accent: 'text-green-300',
        border: 'border-green-600',
        hover: 'hover:bg-green-700',
        backgroundGradient: 'rgba(34, 197, 94, 0.95)',
        itemBg: 'bg-white',
        itemText: 'text-gray-800',
        categoryBg: 'bg-white/90'
      };
  }
};

interface QuickFireDiscussionProps {
  lessonData: {
    title: string;
    learning_objective: string;
    activity_type: string;
    visual_stimulus: string;
    discussion_questions: string[];
    think_pair_share_prompts: string[];
    theme?: string;
  };
  navigationData: {
    previousRoute: string;
    nextRoute: string;
  };
}

export default function QuickFireDiscussionTemplate({ lessonData, navigationData }: QuickFireDiscussionProps) {
  const navigate = useNavigate();
  
  // Get theme colors
  const themeColors = getThemeColors(lessonData.theme);
  
  const [currentPhase, setCurrentPhase] = useState<'think' | 'pair' | 'share'>('think');
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [classInsights, setClassInsights] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(180);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showAnswers, setShowAnswers] = useState<Record<string, boolean>>({});

  // Check if lessonData exists
  if (!lessonData?.title || !lessonData?.learning_objective) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading lesson data...</h2>
          <p className="text-gray-600">Please wait while we load the lesson content.</p>
        </div>
      </div>
    );
  }

  const currentTheme = lessonData.theme || 'General Discussion';

  // Get theme-specific content
  const getThemeContent = () => {
    const theme = currentTheme;
    
    if (theme === 'Creative Writing') {
      return {
        primaryImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80',
        primaryImageAlt: 'Creative writing workspace',
        textExtractA: 'Creative writing should follow established literary traditions and proven techniques.',
        textExtractB: 'True creativity breaks boundaries and challenges conventional writing rules.',
        sourceA: 'Traditional Approach',
        sourceB: 'Innovative Approach'
      };
    } else if (theme === 'Science' || theme === 'Energy Transfer') {
      return {
        primaryImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80',
        primaryImageAlt: 'Renewable energy systems',
        textExtractA: 'Renewable energy represents our best hope for sustainable development.',
        textExtractB: 'Traditional energy sources remain more cost-effective and reliable.',
        sourceA: 'Environmental Perspective',
        sourceB: 'Economic Perspective'
      };
    } else if (theme === 'History' || theme === 'Industrial Revolution') {
      return {
        primaryImage: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80',
        primaryImageAlt: 'Industrial revolution factory',
        textExtractA: 'The Industrial Revolution brought unprecedented prosperity and progress.',
        textExtractB: 'Industrialization came at a terrible human cost for workers.',
        sourceA: 'Progress Perspective',
        sourceB: 'Social Cost Perspective'
      };
    } else {
      // Default/Dystopian content
      return {
        primaryImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80',
        primaryImageAlt: 'Surveillance cameras in urban setting',
        textExtractA: 'The city gleamed with promise, technology and nature in perfect harmony.',
        textExtractB: 'Surveillance cameras tracked movement like predators stalking prey.',
        sourceA: 'Utopian Vision',
        sourceB: 'Dystopian Reality'
      };
    }
  };

  const themeContent = getThemeContent();

  // Timer management
  const startTimer = () => {
    setIsTimerActive(true);
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    setIsTimerActive(false);
  };

  const nextPhase = () => {
    if (currentPhase === 'think') {
      setCurrentPhase('pair');
      setTimeRemaining(180);
    } else if (currentPhase === 'pair') {
      setCurrentPhase('share');
      setTimeRemaining(120);
    }
    setIsTimerActive(false);
  };

  const addClassInsight = () => {
    if (responses.share_insight?.trim()) {
      setClassInsights(prev => [...prev, responses.share_insight]);
      setResponses(prev => ({ ...prev, share_insight: '' }));
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseTitle = () => {
    switch (currentPhase) {
      case 'think': return 'Think - Individual Reflection';
      case 'pair': return 'Pair - Partner Discussion';
      case 'share': return 'Share - Class Discussion';
    }
  };

  const getPhaseInstructions = () => {
    switch (currentPhase) {
      case 'think': return 'Look at the resources below and write your individual thoughts.';
      case 'pair': return 'Share your ideas with a partner and discuss the different perspectives.';
      case 'share': return 'Share your best insights with the whole class.';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Lesson Navigation Bar */}
        <div className="mb-8 p-6 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">{lessonData.title}</h3>
                <p className="text-sm text-gray-600">Quick-fire discussion and analysis</p>
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
                onClick={() => navigate(navigationData.nextRoute)}
                className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Main</span>
              </button>
              <button
                onClick={() => navigate(navigationData.nextRoute.replace('/main', '/plenary'))}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Plenary</span>
              </button>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{lessonData.title}</h1>
                <p className="text-gray-600">{lessonData.learning_objective}</p>
              </div>
            </div>
            <MidAssistant context={{ topic: 'discussion' }} />
          </div>

          {/* Phase Progress */}
          <div className="flex items-center gap-4">
            <div className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              currentPhase === 'think' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">1</div>
              <span>Think</span>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <div className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              currentPhase === 'pair' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">2</div>
              <span>Pair</span>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
            <div className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              currentPhase === 'share' ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">3</div>
              <span>Share</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          
          {/* Main Content Area */}
          <div className="col-span-8">
            
            {/* Timer and Controls */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{getPhaseTitle()}</h2>
                  <p className="text-gray-600">{getPhaseInstructions()}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{formatTime(timeRemaining)}</div>
                    <div className="text-sm text-gray-500">remaining</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={isTimerActive ? pauseTimer : startTimer}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                    >
                      {isTimerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      {isTimerActive ? 'Pause' : 'Start'}
                    </button>
                    {currentPhase !== 'share' && (
                      <button
                        onClick={nextPhase}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Next Phase
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Resources to Analyze */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Resources to Analyze</h3>
              
              {/* Main Image */}
              <div className="mb-6">
                <img 
                  src={themeContent.primaryImage}
                  alt={themeContent.primaryImageAlt}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-600 mt-2">Main visual: {themeContent.primaryImageAlt}</p>
              </div>

              {/* Text Extracts */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-900 mb-2">{themeContent.sourceA}</h4>
                  <p className="text-sm text-blue-800 italic">"{themeContent.textExtractA}"</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <h4 className="font-semibold text-red-900 mb-2">{themeContent.sourceB}</h4>
                  <p className="text-sm text-red-800 italic">"{themeContent.textExtractB}"</p>
                </div>
              </div>
            </div>

            {/* Activity Area */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Response</h3>
              
              {currentPhase === 'think' && (
                <div className="space-y-4">
                  <p className="text-gray-600 mb-4">Analyze the image and text extracts above. What do you notice?</p>
                  {lessonData.discussion_questions.map((question, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-start justify-between">
                        <label className="font-medium text-gray-700 flex-1">{question}</label>
                        <MiniAssistant answer="Consider different perspectives, look for patterns, and think about the deeper meaning behind what you see and read." />
                      </div>
                      <textarea
                        value={responses[`question_${index}`] || ''}
                        onChange={(e) => setResponses(prev => ({ ...prev, [`question_${index}`]: e.target.value }))}
                        placeholder="Write your thoughts here..."
                        className="w-full h-20 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    </div>
                  ))}
                </div>
              )}

              {currentPhase === 'pair' && (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Discussion Guidelines</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Share your individual thoughts with your partner</li>
                      <li>• Listen carefully to their perspective</li>
                      <li>• Find similarities and differences in your ideas</li>
                      <li>• Prepare a joint insight to share with the class</li>
                    </ul>
                  </div>
                  <div>
                    <label className="font-medium text-gray-700 block mb-2">Discussion Notes</label>
                    <textarea
                      value={responses.pair_notes || ''}
                      onChange={(e) => setResponses(prev => ({ ...prev, pair_notes: e.target.value }))}
                      placeholder="Record key points from your discussion..."
                      className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    />
                  </div>
                </div>
              )}

              {currentPhase === 'share' && (
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">Sharing Guidelines</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Share your most interesting discovery</li>
                      <li>• Explain your reasoning clearly</li>
                      <li>• Listen to and build on others' ideas</li>
                      <li>• Ask questions to deepen understanding</li>
                    </ul>
                  </div>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={responses.share_insight || ''}
                      onChange={(e) => setResponses(prev => ({ ...prev, share_insight: e.target.value }))}
                      placeholder="Share your key insight with the class..."
                      className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button
                      onClick={addClassInsight}
                      className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      Share
                    </button>
                  </div>
                  
                  {classInsights.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-medium text-gray-700 mb-2">Class Insights:</h4>
                      <div className="space-y-2">
                        {classInsights.map((insight, index) => (
                          <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{insight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-4 space-y-6">
            
            {/* Success Criteria */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" />
                Success Criteria
              </h3>
              <div className="space-y-3">
                {[
                  "Observe and describe visual details",
                  "Compare different perspectives", 
                  "Make connections to your knowledge",
                  "Analyze how viewpoints shape understanding",
                  "Evaluate which perspectives are most convincing"
                ].map((criteria, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                      index < 2 ? 'bg-green-500' : index < 4 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}>
                      {index + 1}
                    </div>
                    <span className="text-sm text-gray-700">{criteria}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-green-600" />
                Phase Tips
              </h3>
              
              {currentPhase === 'think' && (
                <div className="space-y-2">
                  <h4 className="font-medium text-blue-800">Individual Thinking</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Look carefully at all details</li>
                    <li>• Consider multiple interpretations</li>
                    <li>• Write down your first impressions</li>
                    <li>• Think about the bigger picture</li>
                  </ul>
                </div>
              )}
              
              {currentPhase === 'pair' && (
                <div className="space-y-2">
                  <h4 className="font-medium text-green-800">Partner Discussion</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Share your ideas openly</li>
                    <li>• Listen actively to your partner</li>
                    <li>• Ask clarifying questions</li>
                    <li>• Find common ground and differences</li>
                  </ul>
                </div>
              )}
              
              {currentPhase === 'share' && (
                <div className="space-y-2">
                  <h4 className="font-medium text-purple-800">Class Sharing</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Present your best insight</li>
                    <li>• Use specific examples</li>
                    <li>• Build on others' ideas</li>
                    <li>• Ask thoughtful questions</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Key Vocabulary */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Key Vocabulary</h3>
              <div className="space-y-2">
                {['perspective', 'analysis', 'interpretation', 'comparison', 'evidence'].map((term, index) => (
                  <div key={index} className="px-3 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700">
                    {term}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <NavigationArrow direction="left" onClick={() => navigate(navigationData.previousRoute)} />
          <NavigationArrow direction="right" onClick={() => navigate(navigationData.nextRoute)} />
        </div>
      </div>
    </div>
  );
}