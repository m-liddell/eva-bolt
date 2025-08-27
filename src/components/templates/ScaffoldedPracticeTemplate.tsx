import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Target, TrendingUp, Users, Clock, X } from 'lucide-react';
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
        itemText: 'text-gray-900',
        categoryBg: 'bg-white/90',
        headerText: 'text-gray-900',
        inputBg: 'bg-white',
        inputBorder: 'border-gray-300',
        inputText: 'text-gray-900',
        inputPlaceholder: 'placeholder-gray-500',
        categoryText: 'text-gray-900'
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
        itemText: 'text-gray-900',
        categoryBg: 'bg-white/90',
        headerText: 'text-gray-900',
        inputBg: 'bg-white',
        inputBorder: 'border-gray-300',
        inputText: 'text-gray-900',
        inputPlaceholder: 'placeholder-gray-500',
        categoryText: 'text-gray-900'
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
        itemText: 'text-gray-900',
        categoryBg: 'bg-white/90',
        headerText: 'text-gray-900',
        inputBg: 'bg-white',
        inputBorder: 'border-gray-300',
        inputText: 'text-gray-900',
        inputPlaceholder: 'placeholder-gray-500',
        categoryText: 'text-gray-900'
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
        itemText: 'text-gray-900',
        categoryBg: 'bg-white/90',
        headerText: 'text-gray-900',
        inputBg: 'bg-white',
        inputBorder: 'border-gray-300',
        inputText: 'text-gray-900',
        inputPlaceholder: 'placeholder-gray-500',
        categoryText: 'text-gray-900'
      };
    default:
      // Default to purple theme
      return {
        primary: 'bg-purple-900',
        secondary: 'bg-purple-800/50',
        text: 'text-white',
        accent: 'text-purple-300',
        border: 'border-purple-600',
        hover: 'hover:bg-purple-700',
        backgroundGradient: 'rgba(168, 85, 247, 0.95)',
        itemBg: 'bg-white',
        itemText: 'text-gray-900',
        categoryBg: 'bg-white/90',
        headerText: 'text-gray-900',
        inputBg: 'bg-white',
        inputBorder: 'border-gray-300',
        inputText: 'text-gray-900',
        inputPlaceholder: 'placeholder-gray-500',
        categoryText: 'text-gray-900'
      };
  }
};

interface ScaffoldedPracticeProps {
  lessonData: {
    title: string;
    learning_objective: string;
    practice_type: 'guided_skill_development' | 'progressive_difficulty' | 'peer_feedback_sessions';
    skill_focus: string;
    practice_stages: Array<{
      stage_name: string;
      description: string;
      duration_minutes: number;
      difficulty_level: 'foundation' | 'developing' | 'secure';
    }>;
    feedback_structure: {
      self_assessment: boolean;
      peer_feedback: boolean;
      teacher_guidance: boolean;
    };
    theme?: string;
  };
  navigationData: {
    previousRoute: string;
    nextRoute: string;
  };
}

export default function ScaffoldedPracticeTemplate({ lessonData, navigationData }: ScaffoldedPracticeProps) {
  const router = useRouter();
  
  // Get theme colors
  const themeColors = getThemeColors(lessonData.theme);
  
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [practiceWork, setPracticeWork] = useState<Record<string, string>>({});
  const [feedbackNotes, setFeedbackNotes] = useState<Record<string, string>>({});
  const [showSentenceStarters, setShowSentenceStarters] = useState<Record<string, boolean>>({});
  const [showHelp, setShowHelp] = useState<string | null>(null);
  const [helpUsesLeft, setHelpUsesLeft] = useState(3);

  const handlePracticeChange = (stage: string, value: string) => {
    setPracticeWork(prev => ({
      ...prev,
      [stage]: value
    }));
  };

  const handleFeedbackChange = (stage: string, value: string) => {
    setFeedbackNotes(prev => ({
      ...prev,
      [stage]: value
    }));
  };

  const getSentenceStarters = (stageIndex: number) => {
    switch (stageIndex) {
      case 0: // Foundation
        return [
          "The surveillance cameras...",
          "Citizens in the city...",
          "The government building...",
          "Propaganda speakers...",
          "The dystopian world...",
          "Technology controls..."
        ];
      case 1: // Developing
        return [
          "The cold, mechanical surveillance cameras...",
          "Frightened citizens in the sterile city...",
          "The imposing government building with its...",
          "Harsh propaganda speakers that constantly...",
          "The oppressive dystopian world where...",
          "Advanced technology that ruthlessly controls..."
        ];
      case 2: // Secure
        return [
          "The omnipresent surveillance cameras, symbols of governmental overreach...",
          "Terrified citizens, trapped in their sterile urban prison...",
          "The monolithic government building, a testament to authoritarian power...",
          "Relentless propaganda speakers, instruments of psychological manipulation...",
          "The carefully constructed dystopian world, designed to crush individual spirit...",
          "Sophisticated technology, weaponized against human freedom and dignity..."
        ];
      default:
        return [];
    }
  };

  const getHelpText = (stageIndex: number) => {
    switch (stageIndex) {
      case 0: // Foundation
        return "Focus on creating complete sentences with a clear subject and predicate. Use dystopian vocabulary like 'surveillance,' 'control,' 'citizens,' or 'technology.' Make sure each sentence expresses one complete thought.";
      case 1: // Developing
        return "Add descriptive adjectives and sensory details to create atmosphere. Use words that appeal to the senses (cold, harsh, mechanical) and create mood (frightening, oppressive, sterile). Build on your foundation sentences.";
      case 2: // Secure
        return "Combine atmospheric writing with social commentary. Use sophisticated vocabulary and complex ideas. Show how your dystopian elements represent real-world concerns about power, technology, or social control.";
      default:
        return "Work through each stage systematically, building your skills step by step.";
    }
  };

  const handleHelpClick = (stageId: string) => {
    if (helpUsesLeft > 0) {
      setShowHelp(stageId);
      setHelpUsesLeft(prev => prev - 1);
    }
  };

  const addSentenceStarter = (stageId: string, starter: string) => {
    const currentText = practiceWork[stageId] || '';
    const newText = currentText ? `${currentText} ${starter}` : starter;
    handlePracticeChange(stageId, newText);
  };

  const getPracticeIcon = () => {
    switch (lessonData.practice_type) {
      case 'guided_skill_development': return <Target className="w-6 h-6" />;
      case 'progressive_difficulty': return <TrendingUp className="w-6 h-6" />;
      case 'peer_feedback_sessions': return <Users className="w-6 h-6" />;
      default: return <Target className="w-6 h-6" />;
    }
  };

  const getPracticeTitle = () => {
    switch (lessonData.practice_type) {
      case 'guided_skill_development': return 'Guided Skill Development';
      case 'progressive_difficulty': return 'Progressive Difficulty Tasks';
      case 'peer_feedback_sessions': return 'Peer Feedback Sessions';
      default: return 'Scaffolded Practice';
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'foundation': return 'bg-green-500';
      case 'developing': return 'bg-amber-500';
      case 'secure': return 'bg-red-500';
      default: return 'bg-gray-500';
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
          url('https://images.unsplash.com/photo-1516414447565-b14be0adf13e?auto=format&fit=crop&q=80')
        `,
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <span className="text-[#FFB800] font-medium">Learning Objective:</span>
              <span className={`ml-2 font-bold ${themeColors.headerText}`}>{lessonData.learning_objective}</span>
            </div>
            <MidAssistant context={{ topic: 'literature' }} />
          </div>

          {/* Hook Section */}
          <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-2xl">🎯</span>
              <h2 className="text-xl font-bold text-purple-900">{getPracticeTitle()}</h2>
            </div>
            <p className="text-base text-purple-800">
              Skill Focus: {lessonData.skill_focus}
            </p>
          </div>

          {/* Success Criteria, Instructions, and Reason - Horizontal Layout */}
          <div className="mb-6 grid grid-cols-3 gap-6">
            {/* Success Criteria */}
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="text-lg font-semibold text-amber-800 mb-3">Success Criteria</h3>
              <ul className="space-y-2 text-sm text-amber-800">
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Complete each practice stage with increasing confidence</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Apply feedback to improve your work at each level</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Demonstrate skill progression from foundation to advanced</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Reflect meaningfully on your learning process</span>
                </li>
              </ul>
            </div>

            {/* Instructions */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">How This Works</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs">1</div>
                  <div>
                    <h4 className="font-medium text-blue-800 text-sm">Foundation</h4>
                    <p className="text-xs text-blue-700">Start with basic skills</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xs">2</div>
                  <div>
                    <h4 className="font-medium text-blue-800 text-sm">Developing</h4>
                    <p className="text-xs text-blue-700">Apply with complexity</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xs">3</div>
                  <div>
                    <h4 className="font-medium text-blue-800 text-sm">Secure</h4>
                    <p className="text-xs text-blue-700">Demonstrate mastery</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 p-2 bg-white rounded border border-blue-200">
                <p className="text-xs text-blue-800">
                  Work through each stage at your own pace. Use feedback tools and ask for help when needed.
                </p>
              </div>
            </div>

            {/* Reason for Learning */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Why This Matters</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-green-800 text-sm">Builds Confidence</h4>
                    <p className="text-xs text-green-700">Step-by-step practice prevents overwhelm</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <TrendingUp className="w-4 h-4 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-green-800 text-sm">Ensures Mastery</h4>
                    <p className="text-xs text-green-700">Each stage builds on the previous one</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-medium text-green-800 text-sm">Provides Support</h4>
                    <p className="text-xs text-green-700">Multiple feedback opportunities</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 40-Minute Structure Indicator */}
          <div className="mb-6 bg-gradient-to-r from-purple-100 to-violet-100 rounded-xl p-4 shadow-inner">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Clock className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-purple-900">40-Minute Practice Laboratory</h3>
              </div>
              <div className="flex space-x-4 text-sm">
                {lessonData.practice_stages.map((stage, index) => (
                  <div key={index} className="text-center">
                    <div className="font-bold text-purple-800">{stage.duration_minutes} mins</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stage Navigation */}
          <div className="mb-6 flex justify-center space-x-4">
            {lessonData.practice_stages.map((stage, index) => (
              <button
                key={index}
                onClick={() => setCurrentStage(index)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 ${
                  currentStage === index
                    ? 'bg-[#FFB800] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <span className={`w-3 h-3 rounded-full ${getDifficultyColor(stage.difficulty_level)}`}></span>
                <span>{stage.stage_name}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Practice Area - Left Side */}
            <div className="col-span-8 space-y-4">
              <div className={`p-6 ${themeColors.primary} rounded-lg shadow-lg ${themeColors.text}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {getPracticeIcon()}
                    <h3 className={`text-xl font-bold ${themeColors.text}`}>
                      Stage {currentStage + 1}: {lessonData.practice_stages[currentStage].stage_name}
                    </h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(lessonData.practice_stages[currentStage].difficulty_level)} text-white`}>
                    {lessonData.practice_stages[currentStage].difficulty_level}
                  </span>
                </div>

                <div className={`${themeColors.secondary} p-6 rounded-lg space-y-4`}>
                  <div className="mb-4">
                    <h4 className={`font-semibold mb-3 ${themeColors.text}`}>
                      {lessonData.practice_stages[currentStage].description}
                    </h4>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4" />
                      <span className={themeColors.text}>
                        {lessonData.practice_stages[currentStage].duration_minutes} minutes
                      </span>
                    </div>
                  </div>

                  {/* Practice Workspace */}
                  <div className="space-y-4">
                    {/* Stage Example */}
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h6 className="font-medium text-blue-800 mb-2">Example for {lessonData.practice_stages[currentStage].stage_name}:</h6>
                      <div className="text-sm text-blue-700 italic">
                        {currentStage === 0 && (
                          <p>"The surveillance cameras watched." (Simple complete sentence with dystopian subject and action)</p>
                        )}
                        {currentStage === 1 && (
                          <p>"The cold, unblinking surveillance cameras watched every movement with mechanical precision." (Complete sentence with atmospheric adjectives and sensory details)</p>
                        )}
                        {currentStage === 2 && (
                          <p>"The omnipresent surveillance cameras, symbols of governmental overreach, watched citizens with the relentless hunger of predators stalking their prey." (Sophisticated sentence combining atmosphere with social commentary)</p>
                        )}
                      </div>
                    </div>

                    {/* Support Tools */}
                    <div className="flex items-center gap-3 mb-3">
                      <button
                        onClick={() => setShowSentenceStarters(prev => ({ ...prev, [`stage_${currentStage}`]: !prev[`stage_${currentStage}`] }))}
                        className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
                      >
                        {showSentenceStarters[`stage_${currentStage}`] ? 'Hide' : 'Show'} Sentence Starters
                      </button>
                      <button
                        onClick={() => handleHelpClick(`stage_${currentStage}`)}
                        disabled={helpUsesLeft === 0}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                          helpUsesLeft > 0 
                            ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' 
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-bold">
                          A
                        </span>
                        <span>Get Help ({helpUsesLeft} left)</span>
                      </button>
                    </div>

                    {/* Sentence Starters */}
                    {showSentenceStarters[`stage_${currentStage}`] && (
                      <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
                        <h6 className="font-medium text-green-800 mb-3">Sentence Starters for {lessonData.practice_stages[currentStage].stage_name}:</h6>
                        <div className="grid grid-cols-2 gap-2">
                          {getSentenceStarters(currentStage).map((starter, index) => (
                            <button
                              key={index}
                              onClick={() => addSentenceStarter(`stage_${currentStage}`, starter)}
                              className="text-left p-2 bg-white border border-green-200 rounded hover:bg-green-50 transition-colors text-sm text-green-700"
                            >
                              {starter}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Help Panel */}
                    {showHelp === `stage_${currentStage}` && (
                      <div className="mb-4 p-4 bg-amber-50 rounded-lg border border-amber-200 relative">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm">
                            A
                          </div>
                          <div className="flex-1">
                            <h6 className="font-medium text-amber-800 mb-2">Help for {lessonData.practice_stages[currentStage].stage_name}:</h6>
                            <p className="text-sm text-amber-700">{getHelpText(currentStage)}</p>
                          </div>
                          <button
                            onClick={() => setShowHelp(null)}
                            className="p-1 hover:bg-amber-200 rounded transition-colors"
                          >
                            <X className="w-4 h-4 text-amber-600" />
                          </button>
                        </div>
                      </div>
                    )}

                    <h5 className={`font-medium ${themeColors.text}`}>Practice Workspace:</h5>
                    <textarea
                      value={practiceWork[`stage_${currentStage}`] || ''}
                      onChange={(e) => handlePracticeChange(`stage_${currentStage}`, e.target.value)}
                      placeholder={`Complete your ${lessonData.practice_stages[currentStage].stage_name.toLowerCase()} practice here...`}
                      className={`w-full h-32 p-4 ${themeColors.inputBg} border ${themeColors.inputBorder} rounded-lg ${themeColors.inputText} ${themeColors.inputPlaceholder} resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                  </div>

                  {/* Feedback Section */}
                  {lessonData.feedback_structure.self_assessment && (
                    <div className="space-y-3">
                      <h5 className={`font-medium ${themeColors.text}`}>Self-Assessment:</h5>
                      <div className="grid grid-cols-3 gap-3">
                        <button className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm">
                          Confident ✓
                        </button>
                        <button className="px-3 py-2 bg-amber-500 text-white rounded-lg text-sm">
                          Getting There
                        </button>
                        <button className="px-3 py-2 bg-red-500 text-white rounded-lg text-sm">
                          Need Help
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Text */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-base text-green-800">
                    💬 Through scaffolded practice, we build skills systematically and confidently, ensuring everyone can progress at their own pace while receiving the support they need.
                  </p>
                </div>
              </div>
            </div>

            {/* Support Materials - Right Side */}
            <div className="col-span-4 space-y-4">
              <div className={`p-4 ${themeColors.categoryBg} rounded-lg border ${themeColors.border}`}>
                <h3 className={`text-lg font-semibold mb-3 ${themeColors.categoryText}`}>Stage Guidelines</h3>
                <div className="space-y-3">
                  {lessonData.practice_stages.map((stage, index) => (
                    <div 
                      key={index}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        currentStage === index 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`w-4 h-4 rounded-full ${getDifficultyColor(stage.difficulty_level)}`}></span>
                        <h4 className={`font-medium text-sm ${themeColors.categoryText}`}>{stage.stage_name}</h4>
                      </div>
                      <p className={`text-xs ${themeColors.categoryText} opacity-80`}>
                        {stage.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`p-4 ${themeColors.categoryBg} rounded-lg border ${themeColors.border}`}>
                <h3 className={`text-lg font-semibold mb-3 ${themeColors.categoryText}`}>Practice Tips</h3>
                <ul className={`space-y-2 text-sm ${themeColors.categoryText}`}>
                  <li>• Work at your own pace</li>
                  <li>• Use feedback to improve</li>
                  <li>• Ask questions when stuck</li>
                  <li>• Celebrate small wins</li>
                  <li>• Build on previous stages</li>
                </ul>
              </div>

              <div className={`p-4 ${themeColors.categoryBg} rounded-lg border ${themeColors.border}`}>
                <h3 className={`text-lg font-semibold mb-3 ${themeColors.categoryText}`}>Assessment Focus</h3>
                <p className={`text-sm ${themeColors.categoryText}`}>
                  Progress through scaffolded practice stages and quality of skill development
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <NavigationArrow direction="left" onClick={() => router.push(navigationData.previousRoute)} />
          <NavigationArrow direction="right" onClick={() => router.push(navigationData.nextRoute)} />
        </div>
      </div>
    </div>
  );
}