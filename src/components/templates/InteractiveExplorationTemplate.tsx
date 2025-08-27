import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Target, Clock, Edit2, Save, X } from 'lucide-react';
import { LessonLayout } from '../LessonLayout';
import { NavigationArrow } from '../NavigationArrow';
import { MidAssistant } from '../MidAssistant';
import { MiniAssistant } from '../MiniAssistant';
import { Brain, BookOpen, CheckCircle2 } from 'lucide-react';

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
        headerText: 'text-gray-900'
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
        headerText: 'text-gray-900'
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
        headerText: 'text-gray-900'
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
        headerText: 'text-gray-900'
      };
    default:
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
        headerText: 'text-gray-900'
      };
  }
};

interface InteractiveExplorationProps {
  lessonData: {
    title: string;
    learning_objective: string;
    activity_type: string;
    exploration_focus: string;
    interactive_elements: Array<{
      element_type: 'hands_on_activity' | 'scenario_analysis' | 'collaborative_investigation';
      title: string;
      description: string;
      materials: string[];
    }>;
    discovery_questions: string[];
    collaboration_structure: string[];
    theme?: string;
  };
  navigationData: {
    previousRoute: string;
    nextRoute: string;
  };
  showEditButtons?: boolean;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  onSave: (newContent: string) => void;
}

function EditModal({ isOpen, onClose, title, content, onSave }: EditModalProps) {
  const [editedContent, setEditedContent] = useState(content);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(editedContent);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800">Edit {title}</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {title}
            </label>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={6}
              placeholder={`Edit ${title.toLowerCase()}...`}
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function InteractiveExplorationTemplate({ lessonData, navigationData, showEditButtons = true }: InteractiveExplorationProps) {
  const router = useRouter();
  const themeColors = getThemeColors(lessonData.theme);
  
  const [editingPanel, setEditingPanel] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<Record<string, string>>(() => {
    // Check for existing personal customizations
    const personalLessons = JSON.parse(localStorage.getItem('personalLessons') || '[]');
    const personalLesson = personalLessons.find((lesson: any) => 
      lesson.originalId === lessonData.title.toLowerCase().replace(/\s+/g, '-')
    );
    
    if (personalLesson?.customizations) {
      return personalLesson.customizations;
    }
    
    // Default content if no customizations exist
    return {
      learningObjective: lessonData.learning_objective,
      hookText: "Step into the role of a creative architect of fear! Feel the power of imagination as you bring inanimate objects to life with threatening personalities. You're not just looking at buildings and cameras; you're discovering how to make them breathe, watch, and lurk with sinister intent. Your creativity today will unlock the secrets of making readers feel that the very environment is alive and hostile. Ready to give life to the lifeless?",
      successCriteria: "• Understand the concept of personification in dystopian contexts\n• Generate creative ideas for giving human qualities to elements\n• Collaborate effectively to explore threatening atmosphere creation\n• Apply personification techniques to enhance dystopian world-building",
      instructions: "1. Examine each dystopian setting image carefully\n2. Use the analysis prompts to guide your thinking\n3. Work collaboratively to identify threatening elements\n4. Record your discoveries for sharing with the class\n5. Prepare to explain how personification creates atmosphere"
    };
  });

  const handleEdit = (panelType: string) => {
    setEditingPanel(panelType);
  };

  const handleSave = (panelType: string, newContent: string) => {
    setEditedContent(prev => ({
      ...prev,
      [panelType]: newContent
    }));
    setEditingPanel(null);
    
    // Save changes to user's personal lesson data
    const personalLessonData = {
      id: `personal-${Date.now()}`,
      originalId: lessonData.title.toLowerCase().replace(/\s+/g, '-'),
      title: lessonData.title,
      customizations: {
        ...editedContent,
        [panelType]: newContent
      },
      modifiedAt: new Date().toISOString(),
      userId: 'current-user' // In real app, get from auth
    };
    
    // Store in localStorage (in real app, save to database)
    const existingPersonalLessons = JSON.parse(localStorage.getItem('personalLessons') || '[]');
    const updatedPersonalLessons = existingPersonalLessons.filter((lesson: any) => 
      lesson.originalId !== personalLessonData.originalId
    );
    updatedPersonalLessons.push(personalLessonData);
    localStorage.setItem('personalLessons', JSON.stringify(updatedPersonalLessons));
    
    console.log('Saved personal lesson customization:', personalLessonData);
  };

  const getActivityContent = () => {
    const activityType = lessonData.activity_type || lessonData.title;
    
    if (activityType.includes('Personification')) {
      return {
        icon: '🎭',
        hookText: editedContent.hookText,
        explorationDescription: "Hands-on exploration of how to give human qualities to dystopian objects and environments"
      };
    } else if (activityType.includes('Dystopian World')) {
      return {
        icon: '🏗️',
        hookText: editedContent.hookText,
        explorationDescription: "Interactive exploration and discovery of dystopian world characteristics"
      };
    } else {
      return {
        icon: '🔍',
        hookText: editedContent.hookText,
        explorationDescription: "Interactive exploration and hands-on discovery activities"
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
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-8">
          {/* Lesson Navigation Bar */}
          <div className="mb-8 p-6 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{lessonData.title}</h3>
                  <p className="text-sm text-gray-600">Interactive exploration and discovery</p>
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
                  onClick={() => router.push(navigationData.nextRoute)}
                  className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Main</span>
                </button>
                <button
                  onClick={() => router.push(navigationData.nextRoute.replace('/main', '/plenary'))}
                  className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Plenary</span>
                </button>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[#FFB800] font-medium">Learning Objective:</span>
              </div>
              <span className={`ml-2 font-bold ${themeColors.headerText}`}>{editedContent.learningObjective}</span>
            </div>
            <MidAssistant context={{ topic: 'literature' }} />
          </div>

          {/* Hook Section with Edit Button */}
          <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200 relative">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-2xl">{activityContent.icon}</span>
              <h2 className="text-xl font-bold text-purple-900">{lessonData.title}</h2>
            </div>
            <p className="text-base text-purple-800">
              {activityContent.hookText}
            </p>
          </div>

          {/* Success Criteria with Edit Button */}
          <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200 relative">
            <h3 className="text-lg font-semibold text-amber-800 mb-3">Success Criteria</h3>
            <div>
              {editedContent.successCriteria.split('\n').map((criteria, index) => (
                <div key={index} className="flex items-start space-x-2 mb-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span className="text-amber-800">{criteria.replace('• ', '')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Task Instructions with Edit Button */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200 relative">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Task Instructions</h3>
            <div>
              {editedContent.instructions.split('\n').map((instruction, index) => (
                <div key={index} className="flex items-start space-x-2 mb-2">
                  <span className="text-blue-600 font-medium">{index + 1}.</span>
                  <span className="text-blue-700">{instruction.replace(/^\d+\.\s*/, '')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 10-Minute Structure Indicator */}
          <div className="mb-6 bg-gradient-to-r from-purple-100 to-violet-100 rounded-xl p-4 shadow-inner">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Clock className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-purple-900">10-Minute Interactive Exploration</h3>
              </div>
              <div className="flex space-x-6 text-sm">
                <div className="text-center">
                  <div className="font-bold text-purple-800">3 mins</div>
                  <div className="text-purple-600">Setup & Organize</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-purple-800">5 mins</div>
                  <div className="text-purple-600">Hands-On Exploration</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-purple-800">2 mins</div>
                  <div className="text-purple-600">Quick Share</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Exploration Area - Left Side */}
            <div className="col-span-8 space-y-4">
              <div className={`p-6 ${themeColors.primary} rounded-lg shadow-lg ${themeColors.text}`}>
                <div className="flex items-center space-x-2 mb-4">
                  <Zap className="w-6 h-6 text-[#FFB800]" />
                  <h3 className={`text-xl font-bold ${themeColors.text}`}>Interactive Exploration</h3>
                </div>

                <div className={`${themeColors.secondary} p-6 rounded-lg space-y-4`}>
                  <h4 className={`font-semibold mb-3 ${themeColors.text}`}>Exploration Focus:</h4>
                  <p className={`text-sm mb-4 ${themeColors.text}`}>{lessonData.exploration_focus}</p>
                  
                  <div className="space-y-4">
                    {lessonData.interactive_elements.map((element, index) => (
                      <div key={index} className={`p-4 ${themeColors.itemBg} rounded-lg border ${themeColors.border} hover:shadow-md transition-all cursor-pointer`}>
                        <h5 className={`font-medium mb-2 ${themeColors.itemText}`}>{element.title}</h5>
                        <p className={`text-sm mb-3 ${themeColors.itemText}`}>{element.description}</p>
                        
                        {/* Interactive Activity Content */}
                        {element.element_type === 'hands_on_activity' && (
                          <div className="mt-4 space-y-3">
                            <div className="grid grid-cols-3 gap-3">
                              {['Surveillance State', 'Urban Decay', 'Oppressive Control'].map((imageType, imgIndex) => (
                                <div key={imgIndex} className="relative group">
                                  <img 
                                    src={`https://images.unsplash.com/photo-${imgIndex === 0 ? '1518709268805-4e9042af9f23' : imgIndex === 1 ? '1470115636492-6d2b56f9146d' : '1581833971358-2c8b550f87b3'}?auto=format&fit=crop&q=80&w=300`}
                                    alt={imageType}
                                    className="w-full h-24 object-cover rounded-lg"
                                  />
                                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                    <span className="text-white text-xs font-medium">{imageType}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <textarea
                              placeholder="Analyze the dystopian features you see..."
                              className="w-full h-20 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                            />
                          </div>
                        )}
                        
                        {element.element_type === 'scenario_analysis' && (
                          <div className="mt-4 space-y-3">
                            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                              <h6 className="font-medium text-blue-800 mb-2">Scenario Prompt:</h6>
                              <p className="text-sm text-blue-700">
                                "Design a dystopian society where technology controls daily life. What systems would be in place? How would citizens respond?"
                              </p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Control System:</label>
                                <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                  <option>Surveillance Network</option>
                                  <option>Resource Control</option>
                                  <option>Information Manipulation</option>
                                  <option>Social Division</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Citizen Response:</label>
                                <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                                  <option>Passive Acceptance</option>
                                  <option>Underground Resistance</option>
                                  <option>Open Rebellion</option>
                                  <option>Escape Attempts</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {element.element_type === 'collaborative_investigation' && (
                          <div className="mt-4 space-y-3">
                            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                              <h6 className="font-medium text-purple-800 mb-2">Investigation Checklist:</h6>
                              <div className="space-y-2">
                                {['Environmental Control', 'Social Surveillance', 'Information Restriction', 'Individual Suppression'].map((convention, convIndex) => (
                                  <label key={convIndex} className="flex items-center gap-2">
                                    <input type="checkbox" className="rounded border-purple-300 text-purple-600" />
                                    <span className="text-sm text-purple-700">{convention}</span>
                                  </label>
                                ))}
                              </div>
                            </div>
                            <textarea
                              placeholder="Record your team's findings about dystopian conventions..."
                              className="w-full h-16 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 resize-none"
                            />
                          </div>
                        )}
                        
                        <div className="space-y-1">
                          <h6 className={`text-xs font-medium ${themeColors.itemText} opacity-75`}>Materials:</h6>
                          <div className="flex flex-wrap gap-2">
                            {element.materials.map((material, materialIndex) => (
                              <span key={materialIndex} className={`px-2 py-1 bg-gray-100 ${themeColors.itemText} rounded text-xs`}>
                                {material}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Discovery Questions - Right Side */}
            <div className="col-span-4 space-y-4">
              <div className={`p-4 ${themeColors.primary} rounded-lg shadow-lg ${themeColors.text}`}>
                <div className="flex items-center space-x-2 mb-4">
                  <Target className="w-5 h-5 text-[#FFB800]" />
                  <h2 className={`text-lg font-bold ${themeColors.text}`}>🔍 Discovery Questions:</h2>
                </div>
                <ul className="space-y-2 text-sm">
                  {lessonData.discovery_questions.map((question, index) => (
                    <li key={index} className="flex items-start justify-between mb-4">
                      <div className="flex items-start">
                        <span className="text-[#FFB800] mt-1 mr-2">•</span>
                        <span className={themeColors.text}>{question}</span>
                      </div>
                      <MiniAssistant answer="Use this question to guide your exploration and deepen your understanding of the topic." />
                      <div className="mt-2 w-full">
                        <textarea
                          placeholder="Your thoughts on this question..."
                          className="w-full h-16 p-2 bg-white border border-gray-300 rounded text-gray-900 placeholder-gray-500 resize-none text-xs"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Timer and Controls */}
              <div className={`p-4 ${themeColors.categoryBg} rounded-lg border ${themeColors.border}`}>
                <h3 className={`text-lg font-semibold mb-3 ${themeColors.itemText}`}>Activity Timer</h3>
                <div className="text-center space-y-3">
                  <div className="text-3xl font-bold text-blue-600">10:00</div>
                  <div className="flex gap-2 justify-center">
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      <span>Start Exploration</span>
                    </button>
                  </div>
                  <p className="text-xs text-gray-600">10-minute interactive exploration</p>
                </div>
              </div>
              
              <div className={`p-4 ${themeColors.categoryBg} rounded-lg border ${themeColors.border}`}>
                <h3 className={`text-lg font-semibold mb-3 ${themeColors.itemText}`}>Collaboration Structure</h3>
                <ul className={`space-y-2 text-sm ${themeColors.itemText}`}>
                  {lessonData.collaboration_structure.map((structure, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#FFB800] mr-2">•</span>
                      <span>{structure}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Success Criteria */}
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h3 className="text-sm font-medium text-amber-800 mb-2">Success Criteria:</h3>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-amber-300 text-amber-600" />
                    <span>Understand dystopian genre conventions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-amber-300 text-amber-600" />
                    <span>Identify visual and textual dystopian features</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-amber-300 text-amber-600" />
                    <span>Collaborate effectively in exploration activities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-amber-300 text-amber-600" />
                    <span>Connect dystopian elements to real-world concerns</span>
                  </li>
                </ul>
              </div>

              <div className={`p-4 ${themeColors.categoryBg} rounded-lg border ${themeColors.border}`}>
                <h3 className={`text-lg font-semibold mb-3 ${themeColors.itemText}`}>Assessment Focus</h3>
                <p className={`text-sm ${themeColors.itemText}`}>
                  Engagement in exploration activities and quality of discoveries made
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className={`p-4 ${themeColors.categoryBg} rounded-lg mt-6`}>
            <p className={`text-base ${themeColors.itemText}`}>
              💬 Through interactive exploration and hands-on discovery, we unlock new understanding and build excitement for deeper learning.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <NavigationArrow direction="left" onClick={() => router.push(navigationData.previousRoute)} />
            <NavigationArrow direction="right" onClick={() => router.push(navigationData.nextRoute)} />
          </div>
        </div>

        {/* Edit Modals */}
        <EditModal
          isOpen={editingPanel === 'learningObjective'}
          onClose={() => setEditingPanel(null)}
          title="Learning Objective"
          content={editedContent.learningObjective}
          onSave={(newContent) => handleSave('learningObjective', newContent)}
        />

        <EditModal
          isOpen={editingPanel === 'hookText'}
          onClose={() => setEditingPanel(null)}
          title="Hook Text"
          content={editedContent.hookText}
          onSave={(newContent) => handleSave('hookText', newContent)}
        />

        <EditModal
          isOpen={editingPanel === 'successCriteria'}
          onClose={() => setEditingPanel(null)}
          title="Success Criteria"
          content={editedContent.successCriteria}
          onSave={(newContent) => handleSave('successCriteria', newContent)}
        />

        <EditModal
          isOpen={editingPanel === 'instructions'}
          onClose={() => setEditingPanel(null)}
          title="Task Instructions"
          content={editedContent.instructions}
          onSave={(newContent) => handleSave('instructions', newContent)}
        />
      </div>
    </div>
  );
}

export default InteractiveExplorationTemplate;