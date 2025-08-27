'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Globe, Rocket, Trophy, Clock } from 'lucide-react';
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
        itemText: 'text-gray-800',
        categoryBg: 'bg-white/90'
      };
  }
};

interface ApplicationExtensionProps {
  lessonData: {
    title: string;
    learning_objective: string;
    real_world_connections: string[];
    challenge_preview: string;
    showcase_examples: string[];
    extension_opportunities: string[];
    theme?: string;
  };
  navigationData: {
    previousRoute: string;
    nextRoute: string;
  };
}

export default function ApplicationExtensionTemplate({ lessonData, navigationData }: ApplicationExtensionProps) {
  const router = useRouter();
  
  // Get theme colors
  const themeColors = getThemeColors(lessonData.theme);
  
  const [selectedConnection, setSelectedConnection] = useState<number>(0);
  const [showcaseChoice, setShowcaseChoice] = useState<string>('');
  const [extensionInterest, setExtensionInterest] = useState<string[]>([]);

  const toggleExtensionInterest = (opportunity: string) => {
    setExtensionInterest(prev => 
      prev.includes(opportunity) 
        ? prev.filter(item => item !== opportunity)
        : [...prev, opportunity]
    );
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
                <span className="ml-2 font-bold">{lessonData.learning_objective}</span>
              </div>
              <MidAssistant context={{ topic: 'literature' }} />
            </div>

            {/* Plenary Overview */}
            <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-2xl">🚀</span>
                <h2 className="text-xl font-bold text-purple-900">Application & Extension</h2>
              </div>
              <p className="text-base text-purple-800">
                Let's connect today's learning to the real world and explore exciting opportunities for further growth.
              </p>
            </div>

            {/* 10-Minute Structure Indicator */}
            <div className="mb-6 bg-gradient-to-r from-purple-100 to-violet-100 rounded-xl p-4 shadow-inner">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Clock className="w-6 h-6 text-purple-600" />
                  <h3 className="text-lg font-semibold text-purple-900">10-Minute Extension</h3>
                </div>
                <div className="flex space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-purple-800">5 mins</div>
                    <div className="text-purple-600">Real-World Links</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-purple-800">3 mins</div>
                    <div className="text-purple-600">Challenge Preview</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-purple-800">2 mins</div>
                    <div className="text-purple-600">Choice Sharing</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
              {/* Real-World Connections - Left Side */}
              <div className="col-span-6 space-y-4">
                <div className="p-6 bg-purple-900 rounded-lg shadow-lg text-white">
                  <div className="flex items-center space-x-2 mb-4">
                    <Globe className="w-6 h-6 text-[#FFB800]" />
                    <h3 className="text-xl font-bold">Real-World Connections (5 mins)</h3>
                  </div>

                  <div className="bg-purple-800/50 p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold mb-3">How Today's Learning Applies:</h4>
                    {lessonData.real_world_connections.map((connection, index) => (
                      <div 
                        key={index}
                        className={`p-3 rounded cursor-pointer transition-colors ${
                          selectedConnection === index 
                            ? 'bg-purple-600' 
                            : 'bg-purple-800/30 hover:bg-purple-700/50'
                        }`}
                        onClick={() => setSelectedConnection(index)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-2 flex-1">
                            <span className="text-[#FFB800] mt-1">•</span>
                            <span className="text-sm">{connection}</span>
                          </div>
                          <MiniAssistant answer={`This connection shows how your learning applies to real situations and future opportunities.`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-violet-900 rounded-lg shadow-lg text-white">
                  <div className="flex items-center space-x-2 mb-4">
                    <Trophy className="w-6 h-6 text-[#FFB800]" />
                    <h3 className="text-xl font-bold">Choice Sharing (2 mins)</h3>
                  </div>

                  <div className="bg-violet-800/50 p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold mb-3">Best Examples from Today:</h4>
                    <div className="space-y-2">
                      {lessonData.showcase_examples.map((example, index) => (
                        <button
                          key={index}
                          onClick={() => setShowcaseChoice(example)}
                          className={`w-full p-3 rounded text-left transition-colors ${
                            showcaseChoice === example 
                              ? 'bg-violet-600' 
                              : 'bg-violet-800/30 hover:bg-violet-700/50'
                          }`}
                        >
                          {example.replace(/_/g, ' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Challenge Preview & Extensions - Right Side */}
              <div className="col-span-6 space-y-4">
                <div className="p-6 bg-indigo-900 rounded-lg shadow-lg text-white">
                  <div className="flex items-center space-x-2 mb-4">
                    <Rocket className="w-6 h-6 text-[#FFB800]" />
                    <h3 className="text-xl font-bold">Challenge Preview (3 mins)</h3>
                  </div>

                  <div className="bg-indigo-800/50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">Next Challenge:</h4>
                    <p className="text-base mb-4">{lessonData.challenge_preview}</p>
                    <div className="p-3 bg-indigo-800/30 rounded-lg">
                      <h5 className="font-medium mb-2">Get Ready To:</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Build on today's insights</li>
                        <li>• Apply new techniques</li>
                        <li>• Explore deeper connections</li>
                        <li>• Challenge your thinking</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 shadow-md">
                  <h3 className="text-lg font-semibold mb-3">Extension Opportunities</h3>
                  <div className="space-y-2">
                    {lessonData.extension_opportunities.map((opportunity, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={extensionInterest.includes(opportunity)}
                          onChange={() => toggleExtensionInterest(opportunity)}
                          className="rounded"
                        />
                        <span className="text-sm flex-1">{opportunity.replace(/_/g, ' ')}</span>
                        <MiniAssistant answer={`This extension opportunity allows you to explore your interests and deepen your learning beyond the classroom.`} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h3 className="text-lg font-semibold mb-3">Why Application Matters</h3>
                  <ul className="space-y-2 text-sm text-purple-900">
                    <li>• Shows learning relevance</li>
                    <li>• Builds real-world connections</li>
                    <li>• Creates future opportunities</li>
                    <li>• Develops lifelong skills</li>
                  </ul>
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