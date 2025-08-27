import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, Heart, Target, Clock } from 'lucide-react';
import { LessonLayout } from '../../components/LessonLayout';
import { NavigationArrow } from '../../components/NavigationArrow';
import { MidAssistant } from '../../components/MidAssistant';
import { MiniAssistant } from '../../components/MiniAssistant';

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
        itemText: 'text-gray-900', // Changed from gray-800 to gray-900
        categoryBg: 'bg-white/90',
        headerText: 'text-gray-900' // Added for header text
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
        itemText: 'text-gray-900', // Changed from gray-800 to gray-900
        categoryBg: 'bg-white/90',
        headerText: 'text-gray-900' // Added for header text
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
        itemText: 'text-gray-900', // Changed from gray-800 to gray-900
        categoryBg: 'bg-white/90',
        headerText: 'text-gray-900' // Added for header text
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
        itemText: 'text-gray-900', // Changed from gray-800 to gray-900
        categoryBg: 'bg-white/90',
        headerText: 'text-gray-900' // Added for header text
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
        itemText: 'text-gray-900', // Changed from gray-800 to gray-900
        categoryBg: 'bg-white/90',
        headerText: 'text-gray-900' // Added for header text
      };
  }
};

interface EvaluationReflectionProps {
  lessonData: {
    title: string;
    learning_objective: string;
    activity_type: string;
    theme?: string;
  };
  successCriteria: string[];
  reflectionPrompts: string[];
  peerAppreciationFocus: string;
  goalSettingAreas: string[];
  navigationData: {
    previousRoute: string;
    nextRoute: string;
  };
}

export function EvaluationReflectionTemplate({ 
  lessonData, 
  navigationData, 
  successCriteria, 
  reflectionPrompts, 
  peerAppreciationFocus, 
  goalSettingAreas 
}: EvaluationReflectionProps) {
  const router = useRouter();
  
  // Get theme colors
  const themeColors = getThemeColors(lessonData.theme);
  
  const [selfAssessment, setSelfAssessment] = useState<Record<string, boolean>>({});
  const [reflectionText, setReflectionText] = useState('');
  const [appreciationText, setAppreciationText] = useState('');
  const [goals, setGoals] = useState<Record<string, string>>({});

  const handleSelfAssessment = (criteria: string, checked: boolean) => {
    setSelfAssessment(prev => ({
      ...prev,
      [criteria]: checked
    }));
  };

  const handleGoalChange = (area: string, goal: string) => {
    setGoals(prev => ({
      ...prev,
      [area]: goal
    }));
  };

  // Get activity-specific content
  const getActivityContent = () => {
    const activityType = lessonData.activity_type || lessonData.title;
    
    if (activityType.includes('Dystopian Reflection')) {
      return {
        icon: '🔮',
        hookText: "In dystopian fiction, the darkest futures often reveal the brightest insights about our present. Now it's time to analyze how effectively we've crafted these warnings through our writing. What methods of control did we establish? How convincing is our world-building?",
        reflectionFocus: "dystopian writing effectiveness and social commentary"
      };
    } else {
      return {
        icon: '🎯',
        hookText: "Time to evaluate your progress, reflect on your learning journey, and celebrate achievements. How far have you come? What goals will drive you forward?",
        reflectionFocus: "learning progress and achievement"
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

            {/* Plenary Overview */}
            <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-2xl">{activityContent.icon}</span>
                <h2 className="text-xl font-bold text-green-900">Evaluation & Reflection</h2>
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
                  <h3 className="text-lg font-semibold text-green-900">10-Minute Reflection</h3>
                </div>
                <div className="flex space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-green-800">4 mins</div>
                    <div className="text-green-600">Self-Assessment</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-800">4 mins</div>
                    <div className="text-green-600">Peer Appreciation</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-800">2 mins</div>
                    <div className="text-green-600">Goal Setting</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
              {/* Self-Assessment - Left Side */}
              <div className="col-span-6 space-y-4">
                <div className="p-6 bg-green-900 rounded-lg shadow-lg text-white">
                  <div className="flex items-center space-x-2 mb-4">
                    <CheckCircle className="w-6 h-6 text-[#FFB800]" />
                    <h3 className="text-xl font-bold text-white">Self-Assessment (4 mins)</h3>
                  </div>

                  <div className="bg-green-800/50 p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold mb-3 text-white">How well did you achieve today's objectives?</h4>
                    {successCriteria.map((criteria, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={selfAssessment[criteria] || false}
                          onChange={(e) => handleSelfAssessment(criteria, e.target.checked)}
                          className="rounded"
                        />
                        <span className="text-sm flex-1 text-white">{criteria.replace(/_/g, ' ')}</span>
                        <MiniAssistant answer={`This criteria measures your understanding and application of key learning objectives.`} />
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 bg-green-800/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 text-white">Reflection Questions:</h4>
                    <div className="space-y-3">
                      {reflectionPrompts.map((prompt, index) => (
                        <div key={index} className="flex items-start justify-between">
                          <div className="flex items-start space-x-2 flex-1">
                            <span className="text-[#FFB800] mt-1">•</span>
                            <span className="text-sm text-white">{prompt}</span>
                          </div>
                          <MiniAssistant answer={`This reflection prompt helps you think deeply about your learning process and progress.`} />
                        </div>
                      ))}
                    </div>
                    <textarea
                      value={reflectionText}
                      onChange={(e) => setReflectionText(e.target.value)}
                      placeholder="Your reflection on today's learning..."
                      className="w-full h-24 mt-3 p-3 bg-green-700/30 border border-green-600 rounded text-white placeholder-green-200 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Peer Appreciation & Goals - Right Side */}
              <div className="col-span-6 space-y-4">
                <div className="p-6 bg-emerald-900 rounded-lg shadow-lg text-white">
                  <div className="flex items-center space-x-2 mb-4">
                    <Heart className="w-6 h-6 text-[#FFB800]" />
                    <h3 className="text-xl font-bold text-white">Peer Appreciation (4 mins)</h3>
                  </div>

                  <div className="bg-emerald-800/50 p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold mb-3 text-white">Celebrate Achievements:</h4>
                    <p className="text-sm mb-3 text-white">Focus: {peerAppreciationFocus}</p>
                    <textarea
                      value={appreciationText}
                      onChange={(e) => setAppreciationText(e.target.value)}
                      placeholder="Appreciate a classmate's contribution today..."
                      className="w-full h-20 p-3 bg-emerald-700/30 border border-emerald-600 rounded text-white placeholder-emerald-200 resize-none"
                    />
                  </div>
                </div>

                <div className="p-6 bg-teal-900 rounded-lg shadow-lg text-white">
                  <div className="flex items-center space-x-2 mb-4">
                    <Target className="w-6 h-6 text-[#FFB800]" />
                    <h3 className="text-xl font-bold text-white">Goal Setting (2 mins)</h3>
                  </div>

                  <div className="bg-teal-800/50 p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold mb-3 text-white">Future Learning Goals:</h4>
                    {goalSettingAreas.map((area, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-white">{area.replace(/_/g, ' ')}:</span>
                          <MiniAssistant answer={`Setting goals in this area will help you continue growing and improving your skills.`} />
                        </div>
                        <input
                          type="text"
                          value={goals[area] || ''}
                          onChange={(e) => handleGoalChange(area, e.target.value)}
                          placeholder="Your goal..."
                          className="w-full p-2 bg-teal-700/30 border border-teal-600 rounded text-white placeholder-teal-200"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Success Summary */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-900 mb-3">Today's Success Summary</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="font-bold text-green-800">Self-Assessment</div>
                  <div className="text-sm text-green-600">
                    {Object.values(selfAssessment).filter(Boolean).length} / {successCriteria.length} achieved
                  </div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="font-bold text-green-800">Peer Appreciation</div>
                  <div className="text-sm text-green-600">Community building</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="font-bold text-green-800">Future Goals</div>
                  <div className="text-sm text-green-600">Growth planning</div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <NavigationArrow direction="left" onClick={() => router.push(navigationData.previousRoute)} />
              <NavigationArrow direction="right" onClick={() => router.push(navigationData.nextRoute)} />
            </div>
          </div>
      </div>
    </div>
  );
}

// Also export as default for backwards compatibility
export default EvaluationReflectionTemplate;