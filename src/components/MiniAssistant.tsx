'use client';

import React, { useState } from 'react';

interface MiniAssistantProps {
  answer: string;
}

export function MiniAssistant({ answer }: MiniAssistantProps) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="relative inline-block ml-auto">
      <button
        onClick={() => setShowAnswer(!showAnswer)}
        className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
        aria-label="Show example answer"
      >
        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
          <span className="text-[#FFC83D] font-['Sofia'] text-base leading-none">A</span>
        </div>
      </button>
      
      {showAnswer && (
        <div className="absolute right-0 mt-2 w-72 p-3 bg-white border border-gray-200 rounded-lg shadow-lg z-10 animate-fadeIn">
          <p className="text-sm text-gray-600 whitespace-pre-wrap">{answer}</p>
        </div>
      )}
    </div>
  );
}