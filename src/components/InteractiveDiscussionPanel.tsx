import React, { useState, useEffect } from 'react';
import { Users, MessageSquare, Clock, ThumbsUp, ThumbsDown, Star, Send } from 'lucide-react';

interface DiscussionQuestion {
  id: string;
  question: string;
  responses: DiscussionResponse[];
}

interface DiscussionResponse {
  id: string;
  student: string;
  text: string;
  timestamp: Date;
  likes: number;
  starred: boolean;
}

interface InteractiveDiscussionPanelProps {
  questions: string[];
  duration?: number; // in minutes
  structure: 'think-pair-share' | 'whole-class' | 'small-group';
  onResponseSave?: (questionId: string, response: string) => void;
}

export function InteractiveDiscussionPanel({ 
  questions, 
  duration = 10, 
  structure,
  onResponseSave 
}: InteractiveDiscussionPanelProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [timer, setTimer] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'think' | 'pair' | 'share'>('think');
  const [discussionResponses, setDiscussionResponses] = useState<DiscussionQuestion[]>([]);
  const [currentResponse, setCurrentResponse] = useState('');

  // Initialize discussion questions
  useEffect(() => {
    const initialQuestions: DiscussionQuestion[] = questions.map((q, index) => ({
      id: index.toString(),
      question: q,
      responses: []
    }));
    setDiscussionResponses(initialQuestions);
  }, [questions]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timer !== null && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev !== null ? prev - 1 : null);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
      // Auto-advance phase for think-pair-share
      if (structure === 'think-pair-share') {
        if (currentPhase === 'think') {
          setCurrentPhase('pair');
        } else if (currentPhase === 'pair') {
          setCurrentPhase('share');
        }
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer, currentPhase, structure]);

  const startPhaseTimer = (minutes: number) => {
    setTimer(minutes * 60);
    setIsTimerRunning(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const addResponse = (questionId: string, responseText: string) => {
    if (!responseText.trim()) return;

    const newResponse: DiscussionResponse = {
      id: Date.now().toString(),
      student: `Student ${Math.floor(Math.random() * 30) + 1}`,
      text: responseText.trim(),
      timestamp: new Date(),
      likes: 0,
      starred: false
    };

    setDiscussionResponses(prev => 
      prev.map(q => 
        q.id === questionId 
          ? { ...q, responses: [...q.responses, newResponse] }
          : q
      )
    );

    if (onResponseSave) {
      onResponseSave(questionId, responseText);
    }
  };

  const likeResponse = (questionId: string, responseId: string) => {
    setDiscussionResponses(prev =>
      prev.map(q =>
        q.id === questionId
          ? {
              ...q,
              responses: q.responses.map(r =>
                r.id === responseId ? { ...r, likes: r.likes + 1 } : r
              )
            }
          : q
      )
    );
  };

  const starResponse = (questionId: string, responseId: string) => {
    setDiscussionResponses(prev =>
      prev.map(q =>
        q.id === questionId
          ? {
              ...q,
              responses: q.responses.map(r =>
                r.id === responseId ? { ...r, starred: !r.starred } : r
              )
            }
          : q
      )
    );
  };

  const renderThinkPairShare = () => {
    const phaseTimers = {
      think: 2,
      pair: 3,
      share: 5
    };

    return (
      <div className="space-y-6">
        {/* Phase Navigation */}
        <div className="flex items-center justify-center gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
          {(['think', 'pair', 'share'] as const).map((phase) => (
            <button
              key={phase}
              onClick={() => setCurrentPhase(phase)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPhase === phase
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-purple-600 hover:bg-purple-100'
              }`}
            >
              {phase.charAt(0).toUpperCase() + phase.slice(1)} ({phaseTimers[phase]} min)
            </button>
          ))}
        </div>

        {/* Timer */}
        <div className="text-center">
          {timer !== null && (
            <div className={`inline-block px-6 py-3 rounded-lg text-2xl font-bold ${
              timer > 120 ? 'bg-green-100 text-green-700' :
              timer > 60 ? 'bg-amber-100 text-amber-700' :
              'bg-red-100 text-red-700'
            }`}>
              {formatTime(timer)}
            </div>
          )}
          <div className="mt-2">
            <button
              onClick={() => isTimerRunning ? setIsTimerRunning(false) : startPhaseTimer(phaseTimers[currentPhase])}
              className={`px-6 py-2 rounded-lg text-white font-medium transition-colors ${
                isTimerRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-500 hover:bg-purple-600'
              }`}
            >
              {isTimerRunning ? 'Stop Timer' : `Start ${currentPhase.charAt(0).toUpperCase() + currentPhase.slice(1)} Phase`}
            </button>
          </div>
        </div>

        {/* Phase Content */}
        <div className="space-y-4">
          {currentPhase === 'think' && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Think Phase (Individual Reflection)</h3>
              <p className="text-blue-700 mb-4">Take time to think about the question individually before discussing with others.</p>
              <div className="p-3 bg-white rounded-lg border border-blue-200">
                <p className="font-medium text-blue-800 mb-2">Current Question:</p>
                <p className="text-blue-700">{questions[currentQuestion]}</p>
              </div>
            </div>
          )}

          {currentPhase === 'pair' && (
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Pair Phase (Partner Discussion)</h3>
              <p className="text-green-700 mb-4">Share your thoughts with a partner and build on each other's ideas.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">Partner A Response</h4>
                  <textarea
                    value={responses[`${currentQuestion}-a`] || ''}
                    onChange={(e) => setResponses(prev => ({ ...prev, [`${currentQuestion}-a`]: e.target.value }))}
                    className="w-full p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    rows={3}
                    placeholder="Share your thoughts..."
                  />
                </div>
                <div className="p-3 bg-white rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2">Partner B Response</h4>
                  <textarea
                    value={responses[`${currentQuestion}-b`] || ''}
                    onChange={(e) => setResponses(prev => ({ ...prev, [`${currentQuestion}-b`]: e.target.value }))}
                    className="w-full p-2 border border-green-300 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                    rows={3}
                    placeholder="Build on your partner's ideas..."
                  />
                </div>
              </div>
            </div>
          )}

          {currentPhase === 'share' && (
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="text-lg font-semibold text-amber-800 mb-3">Share Phase (Whole Class Discussion)</h3>
              <p className="text-amber-700 mb-4">Share your best ideas with the whole class and listen to others' perspectives.</p>
              
              <div className="space-y-4">
                <div className="p-3 bg-white rounded-lg border border-amber-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-amber-800">Add to Class Discussion</h4>
                    <span className="text-xs text-amber-600">
                      {discussionResponses[currentQuestion]?.responses.length || 0} responses
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <textarea
                      value={currentResponse}
                      onChange={(e) => setCurrentResponse(e.target.value)}
                      className="flex-1 p-2 border border-amber-300 rounded focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                      rows={2}
                      placeholder="Share your insight with the class..."
                    />
                    <button
                      onClick={() => {
                        addResponse(currentQuestion.toString(), currentResponse);
                        setCurrentResponse('');
                      }}
                      disabled={!currentResponse.trim()}
                      className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Class Responses */}
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {discussionResponses[currentQuestion]?.responses.map((response) => (
                    <div key={response.id} className="p-3 bg-white rounded-lg border border-amber-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-amber-800">{response.student}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => likeResponse(currentQuestion.toString(), response.id)}
                            className="flex items-center gap-1 text-xs text-amber-600 hover:text-amber-800 transition-colors"
                          >
                            <ThumbsUp className="w-3 h-3" />
                            <span>{response.likes}</span>
                          </button>
                          <button
                            onClick={() => starResponse(currentQuestion.toString(), response.id)}
                            className={`p-1 rounded transition-colors ${
                              response.starred ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                            }`}
                          >
                            <Star className={`w-3 h-3 ${response.starred ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-amber-700">{response.text}</p>
                      <div className="text-xs text-amber-600 mt-1">
                        {response.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Question Navigation */}
        {questions.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous Question
            </button>
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <button
              onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
              disabled={currentQuestion === questions.length - 1}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Question
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderWholeClassDiscussion = () => {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-blue-800">Whole Class Discussion</h3>
            <div className="flex items-center gap-2">
              {timer !== null && (
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  timer > 300 ? 'bg-green-100 text-green-700' :
                  timer > 120 ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {formatTime(timer)}
                </div>
              )}
              <button
                onClick={() => isTimerRunning ? setIsTimerRunning(false) : startPhaseTimer(duration)}
                className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${
                  isTimerRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {isTimerRunning ? 'Stop' : `Start ${duration}-Min Discussion`}
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-3 bg-white rounded-lg border border-blue-200">
              <p className="font-medium text-blue-800 mb-2">Current Question:</p>
              <p className="text-blue-700">{questions[currentQuestion]}</p>
            </div>

            {/* Response Input */}
            <div className="flex gap-2">
              <textarea
                value={currentResponse}
                onChange={(e) => setCurrentResponse(e.target.value)}
                className="flex-1 p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
                placeholder="Share your thoughts with the class..."
              />
              <button
                onClick={() => {
                  addResponse(currentQuestion.toString(), currentResponse);
                  setCurrentResponse('');
                }}
                disabled={!currentResponse.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Responses Display */}
        {discussionResponses[currentQuestion]?.responses.length > 0 && (
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-3">
              Class Responses ({discussionResponses[currentQuestion].responses.length})
            </h4>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {discussionResponses[currentQuestion].responses
                .sort((a, b) => (b.starred ? 1 : 0) - (a.starred ? 1 : 0) || b.likes - a.likes)
                .map((response) => (
                  <div key={response.id} className={`p-3 rounded-lg border ${
                    response.starred ? 'bg-yellow-50 border-yellow-300' : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-800">{response.student}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => likeResponse(currentQuestion.toString(), response.id)}
                          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <ThumbsUp className="w-3 h-3" />
                          <span>{response.likes}</span>
                        </button>
                        <button
                          onClick={() => starResponse(currentQuestion.toString(), response.id)}
                          className={`p-1 rounded transition-colors ${
                            response.starred ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                          }`}
                        >
                          <Star className={`w-3 h-3 ${response.starred ? 'fill-current' : ''}`} />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{response.text}</p>
                    <div className="text-xs text-gray-500 mt-1">
                      {response.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {structure === 'think-pair-share' ? renderThinkPairShare() : renderWholeClassDiscussion()}
    </div>
  );
}