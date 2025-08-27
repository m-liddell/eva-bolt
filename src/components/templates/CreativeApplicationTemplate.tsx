import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Palette, Target, Clock, Save, Download, Share2, Brain, BookOpen, CheckCircle2 } from 'lucide-react';
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
        headerText: 'text-gray-900'
      };
  }
};

interface CreativeApplicationProps {
  lessonData: {
    title: string;
    learning_objective: string;
    creation_type: 'design_challenge' | 'creative_challenge' | 'innovation_project';
    creation_brief: string;
    support_materials: string[];
    success_criteria: string[];
    theme?: string;
  };
  navigationData: {
    previousRoute: string;
    nextRoute: string;
  };
}

export default function CreativeApplicationTemplate({ lessonData, navigationData }: CreativeApplicationProps) {
  const router = useRouter();
  const themeColors = getThemeColors(lessonData.theme);
  
  const [creativeWork, setCreativeWork] = useState('');
  const [reflectionNotes, setReflectionNotes] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const toggleMaterial = (material: string) => {
    setSelectedMaterials(prev => 
      prev.includes(material) 
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };

  const getCreationIcon = () => {
    switch (lessonData.creation_type) {
      case 'design_challenge': return <Target className="w-6 h-6" />;
      case 'creative_challenge': return <Palette className="w-6 h-6" />;
      case 'innovation_project': return <Share2 className="w-6 h-6" />;
      default: return <Palette className="w-6 h-6" />;
    }
  };

  const getCreationTitle = () => {
    switch (lessonData.creation_type) {
      case 'design_challenge': return 'Design Challenge';
      case 'creative_challenge': return 'Creative Challenge';
      case 'innovation_project': return 'Innovation Project';
      default: return 'Creative Application';
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
        {/* Lesson Navigation Bar */}
        <div className="mb-8 p-6 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">{lessonData.title}</h3>
                <p className="text-sm text-gray-600">Creative application and skill development</p>
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
                className="px-4 py-2 bg-amber-500 text-white rounded-lg shadow-lg flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Main</span>
              </button>
              <button
                onClick={() => router.push(navigationData.nextRoute)}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Plenary</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <span className="text-[#FFB800] font-medium">Learning Objective:</span>
              <span className={`ml-2 font-bold ${themeColors.headerText}`}>{lessonData.learning_objective}</span>
            </div>
            <MidAssistant context={{ topic: 'creative application' }} />
          </div>

          {/* Creative Challenge Overview */}
          <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-2xl">🎨</span>
              <h2 className="text-xl font-bold text-purple-900">{getCreationTitle()}</h2>
            </div>
            <p className="text-base text-purple-800">
              {lessonData.creation_brief}
            </p>
          </div>

          {/* Success Criteria, Instructions, and Materials - Horizontal Layout */}
          <div className="mb-6 grid grid-cols-3 gap-6">
            {/* Success Criteria */}
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="text-lg font-semibold text-amber-800 mb-3">Success Criteria</h3>
              <ul className="space-y-2 text-sm text-amber-800">
                {lessonData.success_criteria.map((criteria, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-[#FFB800] mt-1">•</span>
                    <span>{criteria.replace(/_/g, ' ')}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">How This Works</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">1</div>
                  <div>
                    <h4 className="font-medium text-blue-800 text-sm">Explore Brief</h4>
                    <p className="text-xs text-blue-700">Understand the creative challenge</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs">2</div>
                  <div>
                    <h4 className="font-medium text-blue-800 text-sm">Create & Apply</h4>
                    <p className="text-xs text-blue-700">Use materials to develop your work</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">3</div>
                  <div>
                    <h4 className="font-medium text-blue-800 text-sm">Reflect & Share</h4>
                    <p className="text-xs text-blue-700">Evaluate and present your creation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Materials */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Support Materials</h3>
              <div className="space-y-2">
                {lessonData.support_materials.map((material, index) => (
                  <label key={index} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedMaterials.includes(material)}
                      onChange={() => toggleMaterial(material)}
                      className="rounded border-green-300 text-green-600"
                    />
                    <span className="text-sm text-green-700">{material.replace(/_/g, ' ')}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* 40-Minute Structure Indicator */}
          <div className="mb-6 bg-gradient-to-r from-purple-100 to-violet-100 rounded-xl p-4 shadow-inner">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Clock className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-purple-900">40-Minute Creative Workshop</h3>
              </div>
              <div className="flex space-x-6 text-sm">
                <div className="text-center">
                  <div className="font-bold text-purple-800">10 mins</div>
                  <div className="text-purple-600">Planning & Setup</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-purple-800">25 mins</div>
                  <div className="text-purple-600">Creative Work</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-purple-800">5 mins</div>
                  <div className="text-purple-600">Review & Refine</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Creative Workspace - Left Side */}
            <div className="col-span-8 space-y-4">
              <div className={`p-6 ${themeColors.primary} rounded-lg shadow-lg ${themeColors.text}`}>
                <div className="flex items-center space-x-2 mb-4">
                  {getCreationIcon()}
                  <h3 className={`text-xl font-bold ${themeColors.text}`}>Creative Workspace</h3>
                </div>

                <div className={`${themeColors.secondary} p-6 rounded-lg space-y-4`}>
                  <h4 className={`font-semibold mb-3 ${themeColors.text}`}>Your Creative Work:</h4>
                  <textarea
                    value={creativeWork}
                    onChange={(e) => setCreativeWork(e.target.value)}
                    placeholder="Begin your creative work here..."
                    className="w-full h-64 p-4 bg-white border border-gray-300 rounded text-gray-900 placeholder-gray-500 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-300">
                      Words: {creativeWork.split(/\s+/).filter(word => word.length > 0).length}
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        <span>Save Draft</span>
                      </button>
                      <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        <span>Export</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className={`${themeColors.secondary} p-4 rounded-lg mt-4`}>
                  <h4 className={`font-semibold mb-3 ${themeColors.text}`}>Reflection on Your Creative Process:</h4>
                  <textarea
                    value={reflectionNotes}
                    onChange={(e) => setReflectionNotes(e.target.value)}
                    placeholder="Reflect on your creative choices and techniques..."
                    className="w-full h-20 p-3 bg-white border border-gray-300 rounded text-gray-900 placeholder-gray-500 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Support and Guidance - Right Side */}
            <div className="col-span-4 space-y-4">
              <div className={`p-4 ${themeColors.categoryBg} rounded-lg border ${themeColors.border}`}>
                <h3 className={`text-lg font-semibold mb-3 ${themeColors.itemText}`}>Creative Brief</h3>
                <p className={`text-sm ${themeColors.itemText}`}>
                  {lessonData.creation_brief}
                </p>
              </div>

              <div className={`p-4 ${themeColors.categoryBg} rounded-lg border ${themeColors.border}`}>
                <h3 className={`text-lg font-semibold mb-3 ${themeColors.itemText}`}>Selected Materials</h3>
                <div className="space-y-2">
                  {selectedMaterials.length > 0 ? (
                    selectedMaterials.map((material, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-green-100 rounded">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-green-800">{material.replace(/_/g, ' ')}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-600 italic">Select materials from the list above to support your creative work</p>
                  )}
                </div>
              </div>

              <div className={`p-4 ${themeColors.categoryBg} rounded-lg border ${themeColors.border}`}>
                <h3 className={`text-lg font-semibold mb-3 ${themeColors.itemText}`}>Creative Tips</h3>
                <ul className={`space-y-2 text-sm ${themeColors.itemText}`}>
                  <li>• Start with your strongest idea</li>
                  <li>• Use specific, vivid details</li>
                  <li>• Build atmosphere gradually</li>
                  <li>• Show, don't just tell</li>
                  <li>• Revise and refine as you go</li>
                </ul>
              </div>

              <div className={`p-4 ${themeColors.categoryBg} rounded-lg border ${themeColors.border}`}>
                <h3 className={`text-lg font-semibold mb-3 ${themeColors.itemText}`}>Assessment Focus</h3>
                <p className={`text-sm ${themeColors.itemText}`}>
                  Quality of creative application and understanding of techniques
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Text */}
          <div className={`p-4 ${themeColors.categoryBg} rounded-lg mt-6`}>
            <p className={`text-base ${themeColors.itemText}`}>
              💬 Through creative application and hands-on practice, we transform learning into personal expression and develop mastery through making.
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