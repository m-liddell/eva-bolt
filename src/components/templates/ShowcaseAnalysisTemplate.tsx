'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Share2, Target, Brain, Clock, X, BookOpen, CheckCircle2 } from 'lucide-react';
import { LessonLayout } from '../LessonLayout';
import { NavigationArrow } from '../NavigationArrow';
import { MidAssistant } from '../MidAssistant';
import { MiniAssistant } from '../MiniAssistant';

// ENHANCED THEME COLOR SYSTEM WITH CONTRAST RULES
const getThemeColors = (theme?: string) => {
  switch (theme) {
    case 'dystopian':
    case 'Dystopian Fiction':
    case 'dark':
      return {
        // Dark theme with high contrast
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
        
        // Input fields with proper contrast
        inputBg: 'bg-white',
        inputText: 'text-gray-900',
        inputBorder: 'border-green-300',
        inputPlaceholder: 'placeholder-gray-500',
        
        // Cards and content areas
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
        
        // Input fields with proper contrast
        inputBg: 'bg-white',
        inputText: 'text-gray-900',
        inputBorder: 'border-blue-300',
        inputPlaceholder: 'placeholder-gray-500',
        
        // Cards and content areas
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
        
        // Input fields with proper contrast
        inputBg: 'bg-white',
        inputText: 'text-gray-900',
        inputBorder: 'border-amber-300',
        inputPlaceholder: 'placeholder-gray-500',
        
        // Cards and content areas
        cardBg: 'bg-white/95',
        cardText: 'text-gray-900',
        categoryBg: 'bg-white/90',
        categoryText: 'text-gray-800'
      };
    case 'light':
      return {
        primary: 'bg-white',
        secondary: 'bg-gray-50',
        text: 'text-gray-900',
        accent: 'text-blue-600',
        border: 'border-gray-300',
        hover: 'hover:bg-gray-100',
        backgroundGradient: 'rgba(255, 255, 255, 0.95)',
        
        // Input fields with proper contrast
        inputBg: 'bg-white',
        inputText: 'text-gray-900',
        inputBorder: 'border-gray-300',
        inputPlaceholder: 'placeholder-gray-500',
        
        // Cards and content areas
        cardBg: 'bg-white',
        cardText: 'text-gray-900',
        categoryBg: 'bg-gray-50',
        categoryText: 'text-gray-800'
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
        
        // Input fields with proper contrast
        inputBg: 'bg-white',
        inputText: 'text-gray-900',
        inputBorder: 'border-green-300',
        inputPlaceholder: 'placeholder-gray-500',
        
        // Cards and content areas
        cardBg: 'bg-white/95',
        cardText: 'text-gray-900',
        categoryBg: 'bg-white/90',
        categoryText: 'text-gray-800'
      };
  }
};

interface ShowcaseAnalysisProps {
  lessonData: {
    title: string;
    learning_objective: string;
    activity_type: string;
    showcase_focus: string;
    analysis_questions: string[];
    student_examples: string[];
    evaluation_criteria: string[];
    theme?: string;
  };
  navigationData: {
    previousRoute: string;
    nextRoute: string;
  };
}

// Enhanced MiniAssistant with close button and proper contrast
interface EnhancedMiniAssistantProps {
  answer: string;
}

function EnhancedMiniAssistant({ answer }: EnhancedMiniAssistantProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="relative inline-block ml-auto">
      <button
        onClick={() => setShowAnswer(!showAnswer)}
        className="w-8 h-8 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
        aria-label="Show example answer"
      >
        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
          <span className="text-[#FFC83D] font-['Sofia'] text-base leading-none">A</span>
        </div>
      </button>
      
      {showAnswer && (
        <div className="absolute right-0 mt-2 w-72 p-3 bg-white border border-gray-200 rounded-lg shadow-lg z-10 animate-fadeIn">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm text-gray-700 whitespace-pre-wrap flex-1">{answer}</p>
            <button
              onClick={() => setShowAnswer(false)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            >
              <X className="w-3 h-3 text-gray-500" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShowcaseAnalysisTemplate({ lessonData, navigationData }: ShowcaseAnalysisProps) {
  const router = useRouter();
  
  // Get theme colors with contrast rules
  const themeColors = getThemeColors(lessonData.theme);
  
  const [sharedWork, setSharedWork] = useState('');
  const [analysisNotes, setAnalysisNotes] = useState<Record<string, string>>({});
  const [selectedExample, setSelectedExample] = useState<number>(0);

  const handleAnalysisChange = (question: string, value: string) => {
    setAnalysisNotes(prev => ({
      ...prev,
      [question]: value
    }));
  };

  // Get activity-specific content
  const getActivityContent = () => {
    const activityType = lessonData.activity_type || lessonData.title;
    
    if (activityType.includes('Sentence Showcase')) {
      return {
        icon: '🎯',
        hookText: "Time to celebrate the powerful complete sentences you've created and learn from each other's techniques! Share your most atmospheric sentences and discover what makes them effective for creating dystopian mood.",
        showcaseFocus: "atmospheric sentence effectiveness and peer learning"
      };
    } else if (activityType.includes('Sophistication Showcase')) {
      return {
        icon: '💎',
        hookText: "Let's showcase the most sophisticated complex sentences you've created and analyze how complexity enhances dystopian description. Celebrate your progress in developing advanced writing techniques.",
        showcaseFocus: "sophisticated writing techniques and complexity analysis"
      };
    } else {
      return {
        icon: '⭐',
        hookText: "Time to showcase your best work and learn from each other's achievements! Share your creations and analyze what makes them effective.",
        showcaseFocus: "peer learning and work analysis"
      };
    }
  };

  const activityContent = getActivityContent();

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
        {/* Lesson Navigation Bar */}
        <div className="mb-8 p-6 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">{lessonData.title}</h3>
                <p className="text-sm text-gray-600">Showcase and analyze your best work</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push(navigationData.previousRoute)}
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

        {/* Lesson Navigation */}
        <div className="mb-8 p-6 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">{lessonData.title}</h3>
                <p className="text-sm text-gray-600">Share and analyze your best work</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push(navigationData.previousRoute)}
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

        <LessonLayout 
          lessonPhase="Plenary"
          theme={lessonData.theme}
          context={{
            type: 'discussion',
            focus: 'showcase and analysis'
          }}
        >
          <div className={`${themeColors.cardBg} backdrop-blur-sm rounded-lg shadow-lg p-6`}>
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div>
                <span className="text-[#FFB800] font-medium">Learning Objective:</span>
                <span className={`ml-2 font-bold ${themeColors.cardText}`}>{lessonData.learning_objective}</span>
              </div>
              <MidAssistant context={{ topic: 'peer evaluation' }} />
            </div>

            {/* Plenary Overview */}
            <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-2xl">{activityContent.icon}</span>
                <h2 className="text-xl font-bold text-green-900">Showcase & Analysis</h2>
              </div>
              <p className="text-base text-green-800">
                {activityContent.hookText}
              </p>
            </div>

            {/* 10-Minute Structure Indicator */}
            <div className="mb-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 shadow-inner">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Clock className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-900">10-Minute Showcase</h3>
                </div>
                <div className="flex space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-green-800">6 mins</div>
                    <div className="text-green-600">Sharing</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-800">4 mins</div>
                    <div className="text-green-600">Analysis</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
              {/* Showcase Area - Left Side */}
              <div className="col-span-8 space-y-4">
                <div className={`p-6 ${themeColors.primary} rounded-lg shadow-lg ${themeColors.text}`}>
                  <div className="flex items-center space-x-2 mb-4">
                    <Share2 className="w-6 h-6 text-[#FFB800]" />
                    <h3 className={`text-xl font-bold ${themeColors.text}`}>Student Showcase (6 mins)</h3>
                  </div>

                  <div className={`${themeColors.secondary} p-6 rounded-lg space-y-4`}>
                    <h4 className={`font-semibold mb-3 ${themeColors.text}`}>Share Your Best Work:</h4>
                    
                    {/* FIXED: High contrast input field */}
                    <textarea
                      value={sharedWork}
                      onChange={(e) => setSharedWork(e.target.value)}
                      placeholder="Share your most effective work from today's lesson..."
                      className={`w-full h-32 p-4 ${themeColors.inputBg} border ${themeColors.inputBorder} rounded ${themeColors.inputText} ${themeColors.inputPlaceholder} resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                    
                    <div className="space-y-3">
                      <h5 className={`font-medium ${themeColors.text}`}>Why This Work is Effective:</h5>
                      
                      {/* FIXED: High contrast input field */}
                      <textarea
                        value={analysisNotes.effectiveness || ''}
                        onChange={(e) => handleAnalysisChange('effectiveness', e.target.value)}
                        placeholder="Explain what makes your work particularly effective..."
                        className={`w-full h-20 p-3 ${themeColors.inputBg} border ${themeColors.inputBorder} rounded ${themeColors.inputText} ${themeColors.inputPlaceholder} resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                      />
                    </div>
                  </div>
                </div>

                <div className={`p-6 ${themeColors.primary} rounded-lg shadow-lg ${themeColors.text}`}>
                  <div className="flex items-center space-x-2 mb-4">
                    <Brain className="w-6 h-6 text-[#FFB800]" />
                    <h3 className={`text-xl font-bold ${themeColors.text}`}>Analysis & Evaluation (4 mins)</h3>
                  </div>

                  <div className={`${themeColors.secondary} p-4 rounded-lg space-y-3`}>
                    <h4 className={`font-semibold mb-3 ${themeColors.text}`}>Analysis Questions:</h4>
                    
                    {/* Example for students */}
                    <div className={`mb-4 p-3 ${themeColors.categoryBg} rounded-lg border ${themeColors.border}`}>
                      <h5 className="font-medium text-green-800 mb-2">Example Analysis:</h5>
                      <div className="text-sm text-gray-700 space-y-2">
                        <p><strong>Question:</strong> "Which sentences create the strongest atmospheric impact and why?"</p>
                        <p><strong>Example Answer:</strong> "The sentence 'Surveillance cameras watched with unblinking electronic eyes' creates strong atmospheric impact because it uses personification to make the cameras feel alive and threatening. The word 'unblinking' suggests they never stop watching, which creates a sense of constant fear."</p>
                      </div>
                    </div>
                    
                    {lessonData.analysis_questions.map((question, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-2 flex-1">
                            <span className="text-[#FFB800] mt-1">•</span>
                            <span className={`text-sm ${themeColors.text}`}>{question}</span>
                          </div>
                          <EnhancedMiniAssistant answer="Focus on specific techniques, word choices, and how they create the intended effect on readers." />
                        </div>
                        
                        {/* FIXED: High contrast input field */}
                        <textarea
                          value={analysisNotes[`question_${index}`] || ''}
                          onChange={(e) => handleAnalysisChange(`question_${index}`, e.target.value)}
                          placeholder="Your analysis..."
                          className={`w-full h-16 p-2 ${themeColors.inputBg} border ${themeColors.inputBorder} rounded ${themeColors.inputText} ${themeColors.inputPlaceholder} resize-none text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Support Materials - Right Side */}
              <div className="col-span-4 space-y-4">
                {/* Success Criteria */}
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="text-lg font-semibold mb-3 text-green-900">Success Criteria</h3>
                  <ul className="space-y-2 text-sm text-green-800">
                    {lessonData.evaluation_criteria.map((criteria, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-[#FFB800] mt-1">•</span>
                        <span>{criteria}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Student Guidelines */}
                <div className={`p-4 ${themeColors.primary} rounded-lg shadow-lg ${themeColors.text}`}>
                  <div className="flex items-center space-x-2 mb-4">
                    <Share2 className="w-5 h-5 text-[#FFB800]" />
                    <h2 className={`text-lg font-bold ${themeColors.text}`}>🎯 Student Guidelines:</h2>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start justify-between">
                      <div className="flex items-start">
                        <span className="text-[#FFB800] mt-1 mr-2">•</span>
                        <span className={themeColors.text}>Read your work with expression to enhance the atmospheric impact</span>
                      </div>
                      <EnhancedMiniAssistant answer="Use your voice to bring the atmosphere to life - vary your tone, pace, and volume to match the mood of your writing." />
                    </li>
                    <li className="flex items-start justify-between">
                      <div className="flex items-start">
                        <span className="text-[#FFB800] mt-1 mr-2">•</span>
                        <span className={themeColors.text}>Focus on specific techniques that make sentences effective</span>
                      </div>
                      <EnhancedMiniAssistant answer="Look for word choices, sentence length, literary devices, and how the sentence contributes to overall atmosphere." />
                    </li>
                    <li className="flex items-start justify-between">
                      <div className="flex items-start">
                        <span className="text-[#FFB800] mt-1 mr-2">•</span>
                        <span className={themeColors.text}>Listen actively and identify what makes each example powerful</span>
                      </div>
                      <EnhancedMiniAssistant answer="Pay attention to how different techniques create different effects - some create tension, others build atmosphere or reveal character." />
                    </li>
                  </ul>
                </div>

                {/* Keywords */}
                <div className={`p-4 ${themeColors.categoryBg} rounded-lg border ${themeColors.border}`}>
                  <h3 className={`text-sm font-medium ${themeColors.categoryText} mb-2`}>Key Vocabulary:</h3>
                  <div className="flex flex-wrap gap-2">
                    {['sentence showcase', 'atmospheric impact', 'peer evaluation', 'technical accuracy'].map((keyword, index) => (
                      <span key={index} className={`px-2 py-1 bg-white border border-gray-300 ${themeColors.categoryText} rounded text-xs`}>
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Assessment Focus */}
                <div className={`p-4 ${themeColors.categoryBg} rounded-lg border ${themeColors.border}`}>
                  <h3 className={`text-sm font-medium ${themeColors.categoryText} mb-2`}>Assessment Focus:</h3>
                  <p className={`text-sm ${themeColors.categoryText}`}>
                    Quality of complete sentences shared and understanding of atmospheric impact
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Text */}
            <div className={`p-4 ${themeColors.categoryBg} rounded-lg mt-6`}>
              <p className={`text-base ${themeColors.categoryText}`}>
                💬 Through sharing and evaluating our complete sentences, we've learned from each other's techniques and strengthened our understanding of how sentence construction impacts atmospheric writing.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <NavigationArrow direction="left" onClick={() => router.push(navigationData.previousRoute)} />
              <NavigationArrow direction="right" onClick={() => router.push(navigationData.nextRoute)} />
            </div>
          </div>
        </LessonLayout>
      </div>
    </div>
  );
}