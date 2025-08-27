'use client';

import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavigationArrowProps {
  direction: 'left' | 'right';
  onClick: () => void;
  label?: string;
}

export function NavigationArrow({ direction, onClick, label }: NavigationArrowProps) {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors ${
        direction === 'left' ? 'rotate-0' : 'rotate-0'
      }`}
      title={label}
    >
      {direction === 'left' ? (
        <ArrowLeft className="w-6 h-6 text-white" />
      ) : (
        <ArrowRight className="w-6 h-6 text-white" />
      )}
    </button>
  );
}