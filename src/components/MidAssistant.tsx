import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface MidAssistantProps {
  context: {
    topic: 'literature' | 'society' | 'ethics' | 'character' | 'theme' | 'style' | 'power' | 'identity' | 'freedom' | 'technology' | 'environment' | 'education' | null;
    currentDiscussion?: string;
  };
}

export function MidAssistant({ context }: MidAssistantProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { theme } = useTheme();

  const getSuggestions = () => {
    if (!context.topic) return [];

    // Adapt suggestions based on current theme
    const themeSpecificSuggestions: { [key: string]: { [key: string]: string[] } } = {
      'Sea of Stories': {
        literature: [
          "How do maritime narratives shape our understanding of the world?",
          "What role does the sea play in different cultural stories?",
          "How do different cultures interpret ocean voyages?",
          "What makes a sea journey transformative?"
        ]
      },
      'Travel Writing': {
        literature: [
          "How do travel narratives shape our understanding of the world?",
          "What role does perspective play in travel writing?",
          "How do different cultures interpret the same journey?",
          "What makes a journey transformative?"
        ]
      },
      'War Poetry': {
        literature: [
          "How does war poetry capture human experience?",
          "What role does imagery play in war poetry?",
          "How do different perspectives shape war narratives?",
          "What makes war poetry powerful?"
        ]
      },
      'The Tempest': {
        literature: [
          "How does magic represent power in The Tempest?",
          "What role does nature play in the story?",
          "How do different characters view their isolation?",
          "What makes Prospero's journey meaningful?"
        ]
      }
    };

    // Return theme-specific suggestions if available, otherwise use defaults
    return theme && themeSpecificSuggestions[theme]?.[context.topic] || [
      "How does this narrative shape our understanding?",
      "What perspectives are presented?",
      "How do different interpretations emerge?",
      "What makes this transformative?"
    ];
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowSuggestions(!showSuggestions)}
        className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#FFB800] to-[#FFD700] text-white hover:from-[#FFA500] hover:to-[#FFB800] transition-all shadow-md"
      >
        <MessageSquare className="w-4 h-4" />
        <span className="text-sm font-medium">
          {theme ? `Explore Dystopian Fiction` : 'Explore Perspectives'}
        </span>
      </button>
      
      {showSuggestions && (
        <div className="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800">
                {theme ? `Explore ${theme}` : 'Explore Perspectives'}
              </h3>
              <button 
                onClick={() => setShowSuggestions(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-3">
              {getSuggestions().map((suggestion, index) => (
                <div 
                  key={index}
                  className="p-2 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <p className="text-sm text-gray-700">{suggestion}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 italic">
                {theme 
                  ? `Explore different perspectives on ${theme.toLowerCase()}`
                  : 'Explore different perspectives on this topic'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}