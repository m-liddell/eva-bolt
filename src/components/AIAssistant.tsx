'use client';

import React from 'react';
import { X, Send, Sparkles, Mail, FileText, Users, Calendar, MessageSquare, BookOpen, Target, Clock, Phone, AlertCircle } from 'lucide-react';

interface AIAssistantProps {
  onClose: () => void;
}

export function AIAssistant({ onClose }: AIAssistantProps) {
  const [showPrompts, setShowPrompts] = React.useState(true);
  const [inputValue, setInputValue] = React.useState('');
  const [messages, setMessages] = React.useState([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your Educational Virtual Assistant. How can I help you today?"
    }
  ]);

  const teacherPrompts = [
    {
      category: 'Parent Communication',
      icon: Mail,
      color: 'bg-blue-100 text-blue-700',
      prompts: [
        {
          title: 'Email to Parents - Progress Update',
          prompt: 'Write a professional email to parents about their child\'s progress in Year 10 English, highlighting strengths and areas for improvement.'
        },
        {
          title: 'Email to Parents - Behaviour Concern',
          prompt: 'Draft a sensitive email to parents regarding a minor classroom behaviour issue, focusing on collaboration and support.'
        }
      ]
    },
    {
      category: 'Lesson Planning',
      icon: BookOpen,
      color: 'bg-amber-100 text-amber-700',
      prompts: [
        {
          title: 'Homework Tasks',
          prompt: 'Design meaningful homework tasks for Year 11 History students studying the Industrial Revolution, with options for different learning styles.'
        },
        {
          title: 'Behaviour Intervention Plans',
          prompt: 'Create a structured behaviour intervention plan for a Year 9 student showing persistent low-level disruption, including positive reinforcement strategies and clear expectations.'
        },
        {
          title: 'Seating Arrangements',
          prompt: 'Design an optimal seating plan for a Year 10 English class of 28 students, considering learning needs, behaviour management, and collaborative learning opportunities.'
        }
      ]
    },
    {
      category: 'Reports & Feedback',
      icon: FileText,
      color: 'bg-green-100 text-green-700',
      prompts: [
        {
          title: 'School Report Comments',
          prompt: 'Help me write constructive report comments for Year 11 students, balancing encouragement with specific areas for improvement.'
        }
      ]
    },
    {
      category: 'Presentations',
      icon: Users,
      color: 'bg-purple-100 text-purple-700',
      prompts: [
        {
          title: 'Assembly Speech',
          prompt: 'Write an engaging assembly speech for secondary school students on the topic of resilience and overcoming challenges, suitable for 5-7 minutes.'
        }
      ]
    }
  ];

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt);
    setShowPrompts(false);
    // Add user message
    const newUserMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: prompt
    };
    setMessages(prev => [...prev, newUserMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I'll help you with that request. Let me create a professional response for: "${prompt.split('.')[0]}..."`
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const newUserMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue
    };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I understand your request. Let me help you with that..."
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25">
      <div className="bg-white w-full max-w-4xl rounded-lg shadow-lg max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FFC83D]" />
            <h2 className="text-lg font-bold">Educational Virtual Assistant</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPrompts(!showPrompts)}
              className="px-3 py-1 text-sm bg-[#FFF9E7] text-[#FFC83D] rounded-lg hover:bg-[#FFC83D]/10 transition-colors"
            >
              {showPrompts ? 'Hide Prompts' : 'Show Prompts'}
            </button>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex h-[600px]">
          {/* Prompts Panel */}
          {showPrompts && (
            <div className="w-1/2 border-r border-gray-200 p-4 overflow-y-auto">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Start Prompts</h3>
              <div className="space-y-4">
                {teacherPrompts.map((category) => (
                  <div key={category.category} className="space-y-2">
                    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${category.color}`}>
                      <category.icon className="w-4 h-4" />
                      <h4 className="font-medium">{category.category}</h4>
                    </div>
                    <div className="space-y-1 ml-2">
                      {category.prompts.map((prompt, index) => (
                        <button
                          key={index}
                          onClick={() => handlePromptClick(prompt.prompt)}
                          className="w-full text-left p-3 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                        >
                          <div className="font-medium text-gray-800 mb-1">{prompt.title}</div>
                          <div className="text-xs text-gray-600 line-clamp-2">{prompt.prompt}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chat Area */}
          <div className={`${showPrompts ? 'w-1/2' : 'w-full'} flex flex-col`}>
            {/* AI Disclaimer */}
            <div className="p-3 bg-amber-50 border-b border-amber-200 text-center">
              <div className="flex items-center justify-center gap-2 text-amber-700">
                <AlertCircle className="w-4 h-4" />
                <span className="text-xs font-medium">
                  AI can make mistakes. Please verify all suggestions and adapt to your specific context and school policies.
                </span>
              </div>
            </div>

            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="flex items-start gap-2">
                    {message.type === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-[#FFC83D]/10 flex items-center justify-center flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-[#FFC83D]" />
                      </div>
                    )}
                    <div className={`rounded-lg p-3 max-w-[80%] ${
                      message.type === 'assistant' 
                        ? 'bg-gray-100' 
                        : 'bg-[#FFC83D] text-white ml-auto'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message or select a prompt..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC83D]"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="p-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B434] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}