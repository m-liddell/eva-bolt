'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Save, Download, Users, MessageSquare, Eye, EyeOff, X } from 'lucide-react';

interface InteractiveWritingPanelProps {
  prompt: string;
  duration: number; // in minutes
  placeholder?: string;
  onSave?: (text: string) => void;
  showTimer?: boolean;
  allowPeerReview?: boolean;
  showTeacherSupport?: boolean;
}

interface PeerReview {
  id: string;
  reviewer: string;
  comment: string;
  timestamp: Date;
}

export function InteractiveWritingPanel({ 
  prompt, 
  duration, 
  placeholder = "Start writing here...",
  onSave,
  showTimer = true,
  allowPeerReview = false,
  showTeacherSupport = true
}: InteractiveWritingPanelProps) {
  const [text, setText] = useState('');
  const [timer, setTimer] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [peerReviews, setPeerReviews] = useState<PeerReview[]>([]);
  const [showPeerReview, setShowPeerReview] = useState(false);
  const [reviewComment, setReviewComment] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [showSentenceStarters, setShowSentenceStarters] = useState(false);
  const [showSupportPrompts, setShowSupportPrompts] = useState(false);
  const [assistUsesLeft, setAssistUsesLeft] = useState(3);
  const [showAssistHelp, setShowAssistHelp] = useState(false);

  // Update word count when text changes
  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [text]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timer !== null && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev !== null ? prev - 1 : null);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
      // Auto-save when timer ends
      if (onSave && text.trim()) {
        onSave(text);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer, text, onSave]);

  const startTimer = () => {
    setTimer(duration * 60);
    setIsTimerRunning(true);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    setTimer(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSave = () => {
    if (onSave && text.trim()) {
      onSave(text);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `writing-response-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const addPeerReview = () => {
    if (reviewComment.trim()) {
      const newReview: PeerReview = {
        id: Date.now().toString(),
        reviewer: isAnonymous ? 'Anonymous' : `Student ${Math.floor(Math.random() * 30) + 1}`,
        comment: reviewComment.trim(),
        timestamp: new Date()
      };
      setPeerReviews(prev => [...prev, newReview]);
      setReviewComment('');
    }
  };

  const getSentenceStarters = () => {
    // Generate sentence starters based on the prompt content
    if (prompt.toLowerCase().includes('dystopian') || prompt.toLowerCase().includes('oppressive')) {
      return [
        "The dystopian world feels threatening because...",
        "In this oppressive society, citizens...",
        "The atmosphere creates a sense of...",
        "What disturbs me most about this world is...",
        "The control mechanisms include...",
        "This dystopian setting reminds me of...",
        "The environmental details suggest...",
        "Characters in this world might feel..."
      ];
    } else if (prompt.toLowerCase().includes('image') || prompt.toLowerCase().includes('visual')) {
      return [
        "When I look at these images, I feel...",
        "The most striking difference between them is...",
        "These images make me think about...",
        "The emotions these images evoke are...",
        "What stands out to me is...",
        "The contrast between these futures shows...",
        "These visual elements suggest...",
        "My immediate reaction is..."
      ];
    } else if (prompt.toLowerCase().includes('character') || prompt.toLowerCase().includes('dialogue')) {
      return [
        "The character's motivation appears to be...",
        "Through their dialogue, we can see...",
        "This character's perspective is...",
        "The relationship between these characters...",
        "What this reveals about human nature is...",
        "The conflict arises because...",
        "This character's values include...",
        "The dialogue shows us that..."
      ];
    } else if (prompt.toLowerCase().includes('sentence') || prompt.toLowerCase().includes('writing technique')) {
      return [
        "The most effective technique I used was...",
        "This sentence structure creates...",
        "The impact on the reader would be...",
        "I chose this approach because...",
        "The atmospheric effect is...",
        "This technique enhances the writing by...",
        "Compared to other approaches, this...",
        "The strategic choice here was..."
      ];
    } else {
      return [
        "I believe that...",
        "This shows me that...",
        "An important point is...",
        "I can see that...",
        "This suggests...",
        "My understanding is...",
        "This connects to...",
        "What I've learned is..."
      ];
    }
  };

  const getSupportPrompts = () => {
    if (prompt.toLowerCase().includes('dystopian')) {
      return [
        "Think about what makes you feel uncomfortable or unsafe",
        "Consider how technology might be used to control people",
        "Imagine a world where your freedoms are restricted",
        "Focus on environmental details that create unease",
        "Think about surveillance and monitoring systems"
      ];
    } else if (prompt.toLowerCase().includes('image') || prompt.toLowerCase().includes('visual')) {
      return [
        "Look at colors, lighting, and mood",
        "Notice the people and their expressions",
        "Consider the environment and setting",
        "Think about what story each image tells",
        "Focus on your emotional response to each image"
      ];
    } else if (prompt.toLowerCase().includes('character')) {
      return [
        "Think about what drives this character",
        "Consider their background and experiences",
        "Focus on their relationships with others",
        "Think about their fears and hopes",
        "Consider how they've changed or grown"
      ];
    } else {
      return [
        "Break your response into clear points",
        "Use specific examples to support your ideas",
        "Consider different perspectives",
        "Think about cause and effect relationships",
        "Connect to your own experiences or knowledge"
      ];
    }
  };

  const getAssistHelp = () => {
    if (prompt.toLowerCase().includes('dystopian')) {
      return "Focus on elements that create fear or unease: surveillance, environmental damage, loss of freedom, social control, or technology used against people. Describe how these elements make you feel and why they might be concerning.";
    } else if (prompt.toLowerCase().includes('image')) {
      return "Compare the visual elements systematically: colors (bright vs dark), environments (natural vs artificial), people (happy vs controlled), technology (helpful vs threatening), and overall atmosphere (hopeful vs fearful).";
    } else if (prompt.toLowerCase().includes('character')) {
      return "Think about the character's goals, fears, relationships, and how they change throughout the story. Consider what their actions and words reveal about their personality and values.";
    } else {
      return "Structure your response with clear points, use specific examples, explain your reasoning, and consider how your ideas connect to broader themes or real-world situations.";
    }
  };

  const handleAssistClick = () => {
    if (assistUsesLeft > 0) {
      setShowAssistHelp(true);
      setAssistUsesLeft(prev => prev - 1);
    }
  };

  const addSentenceStarter = (starter: string) => {
    const newText = text ? `${text} ${starter}` : starter;
    setText(newText);
  };

  return (
    <div className="space-y-4">
      {/* Prompt */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Writing Prompt</h3>
        <p className="text-blue-700">{prompt}</p>
      </div>

      {/* Timer and Controls */}
      {showTimer && (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-center gap-4">
            {timer !== null && (
              <div className={`px-4 py-2 rounded-lg text-lg font-bold ${
                timer > 120 ? 'bg-green-100 text-green-700' :
                timer > 60 ? 'bg-amber-100 text-amber-700' :
                'bg-red-100 text-red-700'
              }`}>
                {formatTime(timer)}
              </div>
            )}
            <button
              onClick={() => isTimerRunning ? stopTimer() : startTimer()}
              className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${
                isTimerRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isTimerRunning ? 'Stop Timer' : `Start ${duration}-Min Timer`}
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Words: <span className="font-medium">{wordCount}</span>
            </div>
            {showTeacherSupport && (
              <div className="text-sm text-gray-600">
                Help uses: <span className="font-medium">{assistUsesLeft}/3</span>
              </div>
            )}
            {allowPeerReview && (
              <button
                onClick={() => setShowPeerReview(!showPeerReview)}
                className="flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
              >
                <Users className="w-4 h-4" />
                <span>Peer Review</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Writing Area */}
      <div className="space-y-4">
        {/* Teacher Support Tools */}
        {showTeacherSupport && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSentenceStarters(!showSentenceStarters)}
                className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
              >
                {showSentenceStarters ? 'Hide' : 'Show'} Sentence Starters
              </button>
              <button
                onClick={() => setShowSupportPrompts(!showSupportPrompts)}
                className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
              >
                {showSupportPrompts ? 'Hide' : 'Show'} Support Prompts
              </button>
              <button
                onClick={handleAssistClick}
                disabled={assistUsesLeft === 0}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  assistUsesLeft > 0 
                    ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-xs flex items-center justify-center font-bold">
                  A
                </span>
                <span>Get Help ({assistUsesLeft} left)</span>
              </button>
            </div>

            {/* Sentence Starters Panel */}
            {showSentenceStarters && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-800 mb-3">Sentence Starters:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {getSentenceStarters().map((starter, index) => (
                    <button
                      key={index}
                      onClick={() => addSentenceStarter(starter)}
                      className="text-left p-3 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-sm text-blue-700 hover:border-blue-300"
                    >
                      {starter}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Support Prompts Panel */}
            {showSupportPrompts && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-800 mb-3">Support Prompts:</h4>
                <ul className="space-y-2">
                  {getSupportPrompts().map((prompt, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-green-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <span>{prompt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Assist Help Panel */}
            {showAssistHelp && (
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 relative">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm">
                    A
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-amber-800 mb-2">Writing Help:</h4>
                    <p className="text-sm text-amber-700">{getAssistHelp()}</p>
                  </div>
                  <button
                    onClick={() => setShowAssistHelp(false)}
                    className="p-1 hover:bg-amber-200 rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-amber-600" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Writing
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder={placeholder}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              disabled={!text.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button
              onClick={handleDownload}
              disabled={!text.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
          
          <div className="text-sm text-gray-500">
            {timer === 0 && 'Time\'s up!'}
            {isTimerRunning && timer && timer <= 30 && 'Almost done!'}
          </div>
        </div>
      </div>

      {/* Peer Review Section */}
      {allowPeerReview && showPeerReview && (
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <h4 className="text-lg font-semibold text-purple-800 mb-4">Peer Review</h4>
          
          {/* Add Review */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded border-purple-300 text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="anonymous" className="text-sm text-purple-700">
                Submit anonymously
              </label>
            </div>
            <div className="flex gap-2">
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="flex-1 p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                rows={3}
                placeholder="Provide constructive feedback..."
              />
              <button
                onClick={addPeerReview}
                disabled={!reviewComment.trim()}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add Review
              </button>
            </div>
          </div>

          {/* Reviews List */}
          {peerReviews.length > 0 && (
            <div className="space-y-3">
              <h5 className="font-medium text-purple-800">Reviews ({peerReviews.length})</h5>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {peerReviews.map((review) => (
                  <div key={review.id} className="p-3 bg-white rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-purple-800">{review.reviewer}</span>
                      <span className="text-xs text-purple-600">
                        {review.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm text-purple-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}