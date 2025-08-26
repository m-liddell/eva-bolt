import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, ArrowRight, Clock, CheckCircle, BookOpen, Target, Users, MessageSquare, Star, Zap, Brain, CheckCircle2 } from 'lucide-react';
import { LessonLayout } from '../LessonLayout';
import { NavigationArrow } from '../NavigationArrow';
import { MidAssistant } from '../MidAssistant';
import { MiniAssistant } from '../MiniAssistant';

// THEME COLOR SYSTEM - matching other templates
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
        
        // Input fields with proper contrast
        inputBg: 'bg-white',
        inputText: 'text-gray-900',
        inputBorder: 'border-gray-300',
        inputPlaceholder: 'placeholder-gray-500',
        
        // Cards and content areas
        cardBg: 'bg-white/95',
        cardText: 'text-gray-900',
        categoryBg: 'bg-white/90',
        categoryText: 'text-gray-800'
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
        
        inputBg: 'bg-white',
        inputText: 'text-gray-900',
        inputBorder: 'border-green-300',
        inputPlaceholder: 'placeholder-gray-500',
        
        cardBg: 'bg-white/95',
        cardText: 'text-gray-900',
        categoryBg: 'bg-white/90',
        categoryText: 'text-gray-800'
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
        
        inputBg: 'bg-white',
        inputText: 'text-gray-900',
        inputBorder: 'border-blue-300',
        inputPlaceholder: 'placeholder-gray-500',
        
        cardBg: 'bg-white/95',
        cardText: 'text-gray-900',
        categoryBg: 'bg-white/90',
        categoryText: 'text-gray-800'
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
        
        inputBg: 'bg-white',
        inputText: 'text-gray-900',
        inputBorder: 'border-amber-300',
        inputPlaceholder: 'placeholder-gray-500',
        
        cardBg: 'bg-white/95',
        cardText: 'text-gray-900',
        categoryBg: 'bg-white/90',
        categoryText: 'text-gray-800'
      };
    default:
      return {
        primary: 'bg-green-900',
        secondary: 'bg-green-800/50',
        text: 'text-white', 
        accent: 'text-green-300',
        border: 'border-green-600',
        hover: 'hover:bg-green-700',
        backgroundGradient: 'rgba(34, 197, 94, 0.95)',
        
        inputBg: 'bg-white',
        inputText: 'text-gray-900',
        inputBorder: 'border-green-300',
        inputPlaceholder: 'placeholder-gray-500',
        
        cardBg: 'bg-white/95',
        cardText: 'text-gray-900',
        categoryBg: 'bg-white/90',
        categoryText: 'text-gray-800'
      };
  }
};

interface ConsolidationConnectionProps {
  lessonData: {
    title: string;
    learning_objective: string;
    success_criteria: string[];
    key_insights: string[];
    unit_connections: string[];
    next_lesson_preview: string;
    theme?: string;
  };
  navigationData: {
    previousRoute: string;
    nextRoute: string;
  };
}

export default function ConsolidationConnectionTemplate({ lessonData, navigationData }: ConsolidationConnectionProps) {
  const navigate = useNavigate();
  const themeColors = getThemeColors(lessonData.theme);
  
  const [timer, setTimer] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

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
            ${themeColors.backgroundGradient} 0%,
            ${themeColors.backgroundGradient.replace('0.95', '0.85')} 15%,
            ${themeColors.backgroundGradient.replace('0.95', '0.85')} 85%,
            ${themeColors.backgroundGradient} 100%
          ),
          url('https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&q=80')
        `,
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className={`${themeColors.cardBg} backdrop-blur-sm rounded-lg shadow-lg p-6`}>
          <div className="space-y-6">
            {/* Learning Objective */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[#FFB800] font-medium mr-2">Learning Objective:</span>
                <span className={`font-bold ${themeColors.cardText}`}>{lessonData.learning_objective}</span>
              </div>
              <MidAssistant context={{ topic: 'consolidation' }} />
            </div>

            {/* Introduction */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-base text-gray-800">
                💬 Let's consolidate what we've learned today and see how it connects to our bigger learning journey. 
                Understanding these connections helps strengthen your knowledge and prepares you for future challenges.
              </p>
            </div>

            {/* Success Criteria */}
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="text-sm font-medium text-amber-800 mb-2">Success Criteria:</h3>
              <ul className="space-y-2 text-sm text-amber-800">
                {lessonData.success_criteria.map((criteria, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-[#FFB800] mt-1">•</span>
                    <span>{criteria}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-6">
              {/* Key Insights Column */}
              <div className="col-span-7">
                <div className="space-y-6">
                  {/* Key Insights Section */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-gray-800 flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Lightbulb className="w-4 h-4 text-blue-600" />
                        </div>
                        Key Learning Insights
                      </h4>
                      <button
                        onClick={() => startTimer(5)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                      >
                        Start 5-Min Timer
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {lessonData.key_insights.map((insight, index) => (
                        <div key={index} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {index + 1}
                              </div>
                              <p className="text-sm text-blue-800">{insight}</p>
                            </div>
                            <MiniAssistant answer="This insight represents a key understanding from today's lesson that will support your future learning." />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Unit Connections Section */}
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-bold text-gray-800 flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <ArrowRight className="w-4 h-4 text-green-600" />
                        </div>
                        How This Connects to Your Learning Journey
                      </h4>
                      <button
                        onClick={() => startTimer(3)}
                        className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
                      >
                        Start 3-Min Timer
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {lessonData.unit_connections.map((connection, index) => (
                        <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                {index + 1}
                              </div>
                              <p className="text-sm text-green-800">{connection}</p>
                            </div>
                            <MiniAssistant answer="This connection shows how today's learning builds systematically toward unit mastery and future skills." />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Support and Preview */}
              <div className="col-span-5 space-y-4">
                <div className={`p-4 ${themeColors.primary} rounded-lg shadow-lg`}>
                  <div className="flex items-center space-x-2 mb-4">
                    <CheckCircle className="w-5 h-5 text-[#FFB800]" />
                    <h2 className="text-lg font-bold text-white">🎯 Consolidation Focus:</h2>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start justify-between">
                      <div className="flex items-start">
                        <span className="text-[#FFB800] mt-1 mr-2">•</span>
                        <span className="text-white">What were your key learning moments today?</span>
                      </div>
                      <MiniAssistant answer="Think about moments when concepts became clear, when you made connections, or when you felt confident applying new skills." />
                    </li>
                    <li className="flex items-start justify-between">
                      <div className="flex items-start">
                        <span className="text-[#FFB800] mt-1 mr-2">•</span>
                        <span className="text-white">How does today's learning build on previous lessons?</span>
                      </div>
                      <MiniAssistant answer="Consider how today's skills connect to what you learned before and how they prepare you for future challenges." />
                    </li>
                    <li className="flex items-start justify-between">
                      <div className="flex items-start">
                        <span className="text-[#FFB800] mt-1 mr-2">•</span>
                        <span className="text-white">What are you most excited to learn next?</span>
                      </div>
                      <MiniAssistant answer="Think about which upcoming skills or topics interest you most and how they might help you achieve your learning goals." />
                    </li>
                  </ul>
                </div>

                {/* Next Lesson Preview */}
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h3 className="text-sm font-medium text-purple-800 mb-2">🚀 Tomorrow's Preview:</h3>
                  <p className="text-sm text-purple-700">{lessonData.next_lesson_preview}</p>
                </div>

                {/* Assessment Focus */}
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="text-sm font-medium text-green-800 mb-2">Assessment Focus:</h3>
                  <p className="text-sm text-green-700">
                    Understanding of lesson connections and learning progression
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
                        {timer > 180 ? 'Plenty of time for reflection' :
                         timer > 90 ? 'Keep consolidation focused' :
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
                💬 Through consolidating our learning and making connections, we strengthen our understanding and prepare for continued growth in our learning journey.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <NavigationArrow direction="left" onClick={() => navigate(navigationData.previousRoute)} />
              <NavigationArrow direction="right" onClick={() => navigate(navigationData.nextRoute)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}