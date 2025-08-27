import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, MessageCircle, Eye, RotateCcw, Clock, BookOpen, Brain, CheckCircle2 } from 'lucide-react';
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
        
        inputBg: 'bg-white',
        inputText: 'text-gray-900',
        inputBorder: 'border-gray-300',
        inputPlaceholder: 'placeholder-gray-500',
        
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

interface SocraticCircleProps {
  lessonData: {
    title: string;
    learning_objective: string;
    activity_type: string;
    discussion_focus: string;
    reflection_questions: string[];
    observation_prompts: string[];
    success_criteria: string[];
    theme?: string;
  };
  navigationData: {
    previousRoute: string;
    nextRoute: string;
  };
}

export default function SocraticCircleTemplate({ lessonData, navigationData }: SocraticCircleProps) {
  const router = useRouter();
  const themeColors = getThemeColors(lessonData.theme);
  
  const [currentRole, setCurrentRole] = useState<'inner' | 'outer'>('inner');
  const [timer, setTimer] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [discussionNotes, setDiscussionNotes] = useState('');
  const [observationNotes, setObservationNotes] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hasRotated, setHasRotated] = useState(false);

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

  const switchRoles = () => {
    setCurrentRole(currentRole === 'inner' ? 'outer' : 'inner');
    setHasRotated(true);
    setTimer(null);
    setIsTimerRunning(false);
  };

  const nextQuestion = () => {
    if (currentQuestion < lessonData.reflection_questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
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
        {/* Lesson Navigation */}
        <div className="mb-8 p-6 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">{lessonData.title}</h3>
                <p className="text-sm text-gray-600">Collaborative reflection and deep discussion</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(navigationData.previousRoute)}
                className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center gap-2"
              >
                <Brain className="w-4 h-4" />
                <span>Starter</span>
              </button>
              <button
                onClick={() => router.push(navigationData.previousRoute.replace('/starter', '/main'))}
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

        <div className={`${themeColors.cardBg} backdrop-blur-sm rounded-lg shadow-lg p-6`}>
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <span className="text-[#FFB800] font-medium">Learning Objective:</span>
              <span className={`ml-2 font-bold ${themeColors.cardText}`}>{lessonData.learning_objective}</span>
            </div>
            <MidAssistant context={{ topic: 'socratic dialogue' }} />
          </div>

          {/* Introduction */}
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-2xl">🎭</span>
              <h2 className="text-xl font-bold text-green-900">Socratic Circle Reflection</h2>
            </div>
            <p className="text-base text-green-800">
              In a Socratic Circle, we explore ideas through thoughtful questioning and deep listening. 
              The inner circle discusses while the outer circle observes, then we switch roles to ensure 
              everyone participates in both speaking and active listening.
            </p>
          </div>

          {/* Success Criteria */}
          <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
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

          {/* 10-Minute Structure Indicator */}
          <div className="mb-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 shadow-inner">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Clock className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-green-900">10-Minute Socratic Circle</h3>
              </div>
              <div className="flex space-x-6 text-sm">
                <div className="text-center">
                  <div className="font-bold text-green-800">4 mins</div>
                  <div className="text-green-600">Round 1</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-green-800">1 min</div>
                  <div className="text-green-600">Switch</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-green-800">4 mins</div>
                  <div className="text-green-600">Round 2</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-green-800">1 min</div>
                  <div className="text-green-600">Synthesis</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Circle Management - Left Side */}
            <div className="col-span-8 space-y-4">
              <div className={`p-6 ${themeColors.primary} rounded-lg shadow-lg ${themeColors.text}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-6 h-6 text-[#FFB800]" />
                    <h3 className={`text-xl font-bold ${themeColors.text}`}>Circle Configuration</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    {timer !== null && (
                      <div className={`px-4 py-2 rounded-lg font-bold text-lg ${
                        timer > 180 ? 'bg-green-100 text-green-700' :
                        timer > 60 ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {formatTime(timer)}
                      </div>
                    )}
                    <button
                      onClick={() => isTimerRunning ? setIsTimerRunning(false) : startTimer(4)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        isTimerRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-[#FFB800] hover:bg-[#E6B434]'
                      } text-white`}
                    >
                      {isTimerRunning ? 'Stop Timer' : 'Start 4-Min Round'}
                    </button>
                    <button
                      onClick={switchRoles}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Switch Roles</span>
                    </button>
                  </div>
                </div>

                <div className={`${themeColors.secondary} p-6 rounded-lg space-y-4`}>
                  {/* Current Role Display */}
                  <div className="flex items-center justify-center mb-6">
                    <div className={`px-6 py-3 rounded-full text-lg font-bold ${
                      currentRole === 'inner' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-purple-500 text-white'
                    }`}>
                      You are in the {currentRole.toUpperCase()} CIRCLE
                    </div>
                  </div>

                  {/* Visual Circle Representation */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative">
                      {/* Outer Circle */}
                      <div className={`w-48 h-48 rounded-full border-4 flex items-center justify-center ${
                        currentRole === 'outer' ? 'border-purple-500 bg-purple-100' : 'border-gray-300 bg-gray-100'
                      }`}>
                        <span className={`text-sm font-medium ${
                          currentRole === 'outer' ? 'text-purple-800' : 'text-gray-600'
                        }`}>
                          OUTER CIRCLE<br />
                          <span className="text-xs">(Observers)</span>
                        </span>
                        
                        {/* Inner Circle */}
                        <div className={`absolute w-24 h-24 rounded-full border-4 flex items-center justify-center ${
                          currentRole === 'inner' ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-100'
                        }`}>
                          <span className={`text-xs font-medium text-center ${
                            currentRole === 'inner' ? 'text-blue-800' : 'text-gray-600'
                          }`}>
                            INNER<br />CIRCLE<br />
                            <span className="text-xs">(Discussers)</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Role-Specific Content */}
                  {currentRole === 'inner' ? (
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h4 className="font-semibold text-blue-800 mb-3">Inner Circle: Discussion Focus</h4>
                        <p className="text-sm text-blue-700 mb-3">{lessonData.discussion_focus}</p>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h5 className="font-medium text-blue-800">
                              Question {currentQuestion + 1} of {lessonData.reflection_questions.length}
                            </h5>
                            <div className="flex gap-2">
                              <button
                                onClick={previousQuestion}
                                disabled={currentQuestion === 0}
                                className="px-2 py-1 bg-blue-200 text-blue-800 rounded text-xs disabled:opacity-50"
                              >
                                Previous
                              </button>
                              <button
                                onClick={nextQuestion}
                                disabled={currentQuestion === lessonData.reflection_questions.length - 1}
                                className="px-2 py-1 bg-blue-200 text-blue-800 rounded text-xs disabled:opacity-50"
                              >
                                Next
                              </button>
                            </div>
                          </div>
                          
                          <div className="p-3 bg-white rounded-lg border border-blue-200">
                            <div className="flex items-start justify-between">
                              <p className="text-sm text-blue-800 flex-1">
                                {lessonData.reflection_questions[currentQuestion]}
                              </p>
                              <MiniAssistant answer="Use this question to guide your discussion. Share your thoughts, listen to others, and build on each other's ideas." />
                            </div>
                          </div>
                        </div>
                        
                        <textarea
                          value={discussionNotes}
                          onChange={(e) => setDiscussionNotes(e.target.value)}
                          placeholder="Record key points from your discussion..."
                          className={`w-full h-24 p-3 ${themeColors.inputBg} border ${themeColors.inputBorder} rounded-lg ${themeColors.inputText} ${themeColors.inputPlaceholder} resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <h4 className="font-semibold text-purple-800 mb-3">Outer Circle: Observation Focus</h4>
                        
                        <div className="space-y-3">
                          <h5 className="font-medium text-purple-800">Observation Prompts:</h5>
                          {lessonData.observation_prompts.map((prompt, index) => (
                            <div key={index} className="flex items-start justify-between p-3 bg-white rounded-lg border border-purple-200">
                              <div className="flex items-start gap-2 flex-1">
                                <span className="text-purple-600 mt-1">•</span>
                                <span className="text-sm text-purple-800">{prompt}</span>
                              </div>
                              <MiniAssistant answer="Focus on how students engage with ideas, build on each other's thoughts, and develop understanding through dialogue." />
                            </div>
                          ))}
                        </div>
                        
                        <textarea
                          value={observationNotes}
                          onChange={(e) => setObservationNotes(e.target.value)}
                          placeholder="Record your observations of the discussion..."
                          className={`w-full h-24 p-3 ${themeColors.inputBg} border ${themeColors.inputBorder} rounded-lg ${themeColors.inputText} ${themeColors.inputPlaceholder} resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Guidelines and Support - Right Side */}
            <div className="col-span-4 space-y-4">
              {/* Role Guidelines */}
              <div className={`p-4 ${themeColors.categoryBg} rounded-lg border ${themeColors.border}`}>
                <h3 className={`text-lg font-semibold mb-3 ${themeColors.categoryText}`}>
                  {currentRole === 'inner' ? 'Discussion Guidelines' : 'Observation Guidelines'}
                </h3>
                {currentRole === 'inner' ? (
                  <ul className={`space-y-2 text-sm ${themeColors.categoryText}`}>
                    <li>• Share your genuine thoughts and insights</li>
                    <li>• Build on others' ideas respectfully</li>
                    <li>• Ask questions to deepen understanding</li>
                    <li>• Listen actively before responding</li>
                    <li>• Use evidence to support your points</li>
                  </ul>
                ) : (
                  <ul className={`space-y-2 text-sm ${themeColors.categoryText}`}>
                    <li>• Listen carefully to all contributions</li>
                    <li>• Note interesting ideas and connections</li>
                    <li>• Observe how ideas develop and change</li>
                    <li>• Identify effective discussion techniques</li>
                    <li>• Prepare insights for when you switch roles</li>
                  </ul>
                )}
              </div>

              {/* Progress Tracker */}
              <div className={`p-4 ${themeColors.categoryBg} rounded-lg border ${themeColors.border}`}>
                <h3 className={`text-lg font-semibold mb-3 ${themeColors.categoryText}`}>Progress Tracker</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${themeColors.categoryText}`}>Current Question:</span>
                    <span className={`text-sm font-medium ${themeColors.categoryText}`}>
                      {currentQuestion + 1} of {lessonData.reflection_questions.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${themeColors.categoryText}`}>Role Rotation:</span>
                    <span className={`text-sm font-medium ${hasRotated ? 'text-green-600' : 'text-amber-600'}`}>
                      {hasRotated ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${hasRotated ? 100 : 50}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Socratic Method Info */}
              <div className={`p-4 ${themeColors.categoryBg} rounded-lg border ${themeColors.border}`}>
                <h3 className={`text-lg font-semibold mb-3 ${themeColors.categoryText}`}>Why Socratic Circles?</h3>
                <ul className={`space-y-2 text-sm ${themeColors.categoryText}`}>
                  <li>• Develops critical thinking through questioning</li>
                  <li>• Builds active listening skills</li>
                  <li>• Encourages collaborative knowledge building</li>
                  <li>• Creates respectful dialogue opportunities</li>
                  <li>• Deepens understanding through reflection</li>
                </ul>
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
                      {timer > 180 ? 'Plenty of time for deep discussion' :
                       timer > 90 ? 'Keep discussion focused' :
                       'Prepare to switch or conclude'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Text */}
          <div className={`p-4 ${themeColors.categoryBg} rounded-lg mt-6`}>
            <p className={`text-base ${themeColors.categoryText}`}>
              💬 Through Socratic dialogue, we've deepened our understanding by questioning, listening, and building knowledge together. 
              This collaborative reflection strengthens our insights and prepares us for continued learning.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <NavigationArrow direction="left" onClick={() => router.push(navigationData.previousRoute)} />
            <NavigationArrow direction="right" onClick={() => router.push(navigationData.nextRoute)} />
          </div>
        </div>
      </div>
    </div>
  );
}