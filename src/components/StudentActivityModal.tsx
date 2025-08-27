'use client';

import React, { useState } from 'react';
import { X, Clock, Users, Target, Download, Save, CheckCircle2, Brain, BookOpen, FileText, Play, Pause, RotateCcw } from 'lucide-react';
import { PDFGenerator } from './PDFGenerator';
import { InteractiveImageViewer } from './InteractiveImageViewer';

interface StudentActivity {
  id: string;
  lessonNumber: number;
  title: string;
  description: string;
  phase: 'starter' | 'main' | 'plenary';
  duration: string;
  type: 'worksheet' | 'interactive' | 'discussion' | 'creative';
  subject: string;
  year_group: string;
  learning_objective: string;
  instructions: string[];
  tasks: {
    id: string;
    title: string;
    description: string;
    type: 'text_input' | 'multiple_choice' | 'drawing' | 'discussion' | 'reflection';
    points?: number;
    options?: string[];
    guidance?: string;
  }[];
  success_criteria: string[];
  differentiation: {
    support: string[];
    extension: string[];
  };
  assessment_rubric: {
    level: string;
    descriptors: string[];
  }[];
  pdf_content: {
    header: string;
    instructions: string[];
    worksheet_sections: {
      title: string;
      content: string;
      space_for_answers: boolean;
    }[];
    footer: string;
  };
}

interface StudentActivityModalProps {
  activity: StudentActivity;
  onClose: () => void;
}

export function StudentActivityModal({ activity, onClose }: StudentActivityModalProps) {
  const [currentTask, setCurrentTask] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [timer, setTimer] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [imageAnalysis, setImageAnalysis] = useState<Record<string, string>>({});
  const [assistUsesLeft, setAssistUsesLeft] = useState(3);
  const [showAssistHelp, setShowAssistHelp] = useState<string | null>(null);
  const [showSentenceStarters, setShowSentenceStarters] = useState<Record<string, boolean>>({});

  // Dystopian images for Lesson 1
  const dystopianImages = [
    {
      url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=600',
      title: 'Green Utopia',
      description: 'Sustainable cities with nature integration and renewable energy',
      category: 'utopian' as const
    },
    {
      url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?auto=format&fit=crop&q=80&w=600',
      title: 'Peaceful Harmony',
      description: 'Communities living in balance with diverse, happy people',
      category: 'utopian' as const
    },
    {
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=600',
      title: 'Bright Innovation',
      description: 'Advanced technology serving humanity in bright, hopeful spaces',
      category: 'utopian' as const
    },
    {
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
      title: 'Surveillance State',
      description: 'Constant monitoring and control through omnipresent technology',
      category: 'dystopian' as const
    },
    {
      url: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&q=80&w=600',
      title: 'Urban Decay',
      description: 'Environmental destruction and crumbling infrastructure',
      category: 'dystopian' as const
    },
    {
      url: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?auto=format&fit=crop&q=80&w=600',
      title: 'Oppressive Control',
      description: 'Dark, imposing architecture representing authoritarian power',
      category: 'dystopian' as const
    }
  ];

  // Handle case where activity might be null
  if (!activity) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Activity Not Available</h3>
          <p className="text-gray-600 mb-4">This student activity is not yet available.</p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const getPhaseIcon = () => {
    switch (activity.phase) {
      case 'starter': return <Brain className="w-6 h-6 text-blue-600" />;
      case 'main': return <BookOpen className="w-6 h-6 text-amber-600" />;
      case 'plenary': return <CheckCircle2 className="w-6 h-6 text-green-600" />;
    }
  };

  const getPhaseColor = () => {
    switch (activity.phase) {
      case 'starter': return 'from-blue-500 to-blue-600';
      case 'main': return 'from-amber-500 to-amber-600';
      case 'plenary': return 'from-green-500 to-green-600';
    }
  };

  const startTimer = () => {
    const durationMinutes = parseInt(activity.duration.split(' ')[0]);
    setTimer(durationMinutes * 60);
    setIsTimerRunning(true);
    
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev === null || prev <= 1) {
          setIsTimerRunning(false);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
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

  const handleResponseChange = (taskId: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [taskId]: value
    }));
  };

  const generatePDF = () => {
    const pdfContent = `
${activity.pdf_content.header}

Learning Objective: ${activity.learning_objective}
Duration: ${activity.duration}
Year Group: ${activity.year_group}

Success Criteria:
${activity.success_criteria.map(criteria => `• ${criteria}`).join('\n')}

Instructions:
${activity.pdf_content.instructions.map(instruction => `• ${instruction}`).join('\n')}

${activity.pdf_content.worksheet_sections.map(section => `
${section.title}
${section.content}
${section.space_for_answers ? '\n\n_________________________________________________\n_________________________________________________\n_________________________________________________\n' : ''}
`).join('\n')}

${activity.pdf_content.footer}
    `;

    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activity.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const saveResponses = () => {
    const responseData = {
      activityId: activity.id,
      studentResponses: responses,
      completedAt: new Date().toISOString(),
      score: calculateScore()
    };
    
    // In a real implementation, this would save to a database
    console.log('Saving student responses:', responseData);
    localStorage.setItem(`student-activity-${activity.id}`, JSON.stringify(responseData));
    alert('Your responses have been saved!');
  };

  const handleImageAnalysis = (imageId: string, analysis: string) => {
    setImageAnalysis(prev => ({
      ...prev,
      [imageId]: analysis
    }));
    // Also save to responses for the current task
    const currentTaskId = activity.tasks[currentTask]?.id;
    if (currentTaskId && activity.tasks[currentTask]?.title.toLowerCase().includes('image')) {
      handleResponseChange(currentTaskId, analysis);
    }
  };

  const getSentenceStarters = (taskTitle: string, taskDescription: string) => {
    // Generate sentence starters based on task content
    if (taskTitle.toLowerCase().includes('utopian') || taskDescription.toLowerCase().includes('utopian')) {
      return [
        "The utopian images make me feel...",
        "These futures appear hopeful because...",
        "I notice that the utopian worlds show...",
        "The most striking feature is...",
        "These images suggest that..."
      ];
    } else if (taskTitle.toLowerCase().includes('dystopian') || taskDescription.toLowerCase().includes('dystopian')) {
      return [
        "The dystopian images create a sense of...",
        "These futures feel threatening because...",
        "I can see elements of control such as...",
        "The atmosphere appears...",
        "What disturbs me most is..."
      ];
    } else if (taskTitle.toLowerCase().includes('difference') || taskDescription.toLowerCase().includes('difference')) {
      return [
        "The key differences I notice are...",
        "While utopian images show..., dystopian images show...",
        "The contrast between these futures is...",
        "One major difference is...",
        "These images differ in..."
      ];
    } else if (taskTitle.toLowerCase().includes('discussion') || taskDescription.toLowerCase().includes('think-pair-share')) {
      return [
        "I think that...",
        "In my opinion...",
        "This connects to real life because...",
        "An example of this would be...",
        "This makes me consider..."
      ];
    } else {
      return [
        "I believe that...",
        "This shows me that...",
        "An important point is...",
        "I can see that...",
        "This suggests..."
      ];
    }
  };

  const getAssistHelp = (taskTitle: string, taskDescription: string) => {
    if (taskTitle.toLowerCase().includes('utopian')) {
      return "Think about what makes these images feel positive and hopeful. Look for bright colors, natural elements, happy people, clean environments, and advanced technology that helps rather than controls people.";
    } else if (taskTitle.toLowerCase().includes('dystopian')) {
      return "Focus on elements that create unease or fear. Look for surveillance, environmental damage, uniformity, control mechanisms, dark colors, and anything that suggests people have lost freedom or individuality.";
    } else if (taskTitle.toLowerCase().includes('difference')) {
      return "Compare specific visual elements: colors (bright vs dark), environments (natural vs artificial), people (diverse vs uniform), technology (helpful vs controlling), and overall mood (hopeful vs threatening).";
    } else if (taskTitle.toLowerCase().includes('discussion')) {
      return "Use specific examples from the images or your own knowledge. Explain your reasoning clearly and consider different perspectives. Think about how these ideas connect to real-world situations.";
    } else {
      return "Break down your response into clear points. Use specific examples to support your ideas. Consider different perspectives and explain your reasoning step by step.";
    }
  };

  const handleAssistClick = (taskId: string) => {
    if (assistUsesLeft > 0) {
      const task = activity.tasks.find(t => t.id === taskId);
      if (task) {
        setShowAssistHelp(getAssistHelp(task.title, task.description));
        setAssistUsesLeft(prev => prev - 1);
      }
    }
  };

  const toggleSentenceStarters = (taskId: string) => {
    setShowSentenceStarters(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };
  
  const calculateScore = () => {
    const completedTasks = Object.keys(responses).length;
    const totalTasks = activity.tasks.length;
    return Math.round((completedTasks / totalTasks) * 100);
  };

  if (showPDF) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Printable Worksheet</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={generatePDF}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button
                onClick={() => setShowPDF(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="p-8 bg-white">
            <div className="max-w-none prose prose-sm">
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{activity.pdf_content.header}</h1>
                <div className="text-gray-600">
                  <p><strong>Learning Objective:</strong> {activity.learning_objective}</p>
                  <p><strong>Duration:</strong> {activity.duration} | <strong>Year Group:</strong> {activity.year_group}</p>
                </div>
              </div>

              <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">Success Criteria:</h3>
                <ul className="list-disc list-inside space-y-1 text-green-700">
                  {activity.success_criteria.map((criteria, index) => (
                    <li key={index}>{criteria}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">Instructions:</h3>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  {activity.pdf_content.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ul>
              </div>

              {activity.pdf_content.worksheet_sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">{section.title}</h3>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-700 whitespace-pre-line">{section.content}</p>
                    {section.space_for_answers && (
                      <div className="mt-4 space-y-3">
                        <div className="border-b border-gray-300 pb-2"></div>
                        <div className="border-b border-gray-300 pb-2"></div>
                        <div className="border-b border-gray-300 pb-2"></div>
                        <div className="border-b border-gray-300 pb-2"></div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <div className="mt-6 text-center text-gray-600 text-sm">
                <p>{activity.pdf_content.footer}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className={`bg-gradient-to-r ${getPhaseColor()} text-white p-6`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                {getPhaseIcon()}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{activity.title}</h1>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{activity.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{activity.year_group}</span>
                  </div>
                  <div className="px-2 py-1 bg-white/20 rounded text-xs font-medium">
                    {activity.phase.charAt(0).toUpperCase() + activity.phase.slice(1)} Activity
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Timer Controls */}
              <div className="flex items-center gap-2">
                {timer !== null && (
                  <div className="px-4 py-2 bg-white/20 rounded-lg font-bold text-lg">
                    {formatTime(timer)}
                  </div>
                )}
                <button
                  onClick={() => isTimerRunning ? stopTimer() : startTimer()}
                  className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  {isTimerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                {timer !== null && (
                  <button
                    onClick={stopTimer}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                )}
              </div>
              <button
                onClick={() => setShowPDF(true)}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>View PDF</span>
              </button>
              <PDFGenerator activity={activity} className="hidden" />
              <button
                onClick={onClose}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Learning Objective */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <Target className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-800">Learning Objective</h2>
          </div>
          <p className="text-gray-700">{activity.learning_objective}</p>
        </div>

        {/* Instructions */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Instructions</h3>
          <ul className="space-y-2">
            {activity.instructions.map((instruction, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm mt-0.5">
                  {index + 1}
                </div>
                <span className="text-gray-700">{instruction}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tasks */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Activity Tasks ({currentTask + 1} of {activity.tasks.length})
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentTask(prev => Math.max(0, prev - 1))}
                disabled={currentTask === 0}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentTask(prev => Math.min(activity.tasks.length - 1, prev + 1))}
                disabled={currentTask === activity.tasks.length - 1}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>

          {/* Current Task */}
          {activity.tasks[currentTask] && (
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-semibold text-gray-800">
                    {activity.tasks[currentTask].title}
                  </h4>
                  {activity.tasks[currentTask].points && (
                    <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {activity.tasks[currentTask].points} points
                    </div>
                  )}
                </div>
                <p className="text-gray-700 mb-4">{activity.tasks[currentTask].description}</p>
                
                {activity.tasks[currentTask].guidance && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 mb-4">
                    <p className="text-sm text-blue-700">
                      <strong>Guidance:</strong> {activity.tasks[currentTask].guidance}
                    </p>
                  </div>
                )}

                {/* Task Input */}
                {activity.tasks[currentTask].type === 'text_input' && (
                  <>
                    {/* Show images for image analysis tasks */}
                    {(activity.tasks[currentTask].title.toLowerCase().includes('image') || 
                      activity.tasks[currentTask].description.toLowerCase().includes('image')) && 
                     activity.lessonNumber === 1 && (
                      <div className="mb-6">
                        <h5 className="font-medium text-gray-800 mb-3">Images to Analyze:</h5>
                        <InteractiveImageViewer 
                          images={dystopianImages}
                          onImageAnalysis={handleImageAnalysis}
                          showAnalysisTools={true}
                        />
                      </div>
                    )}
                    
                    {/* Writing Support Tools */}
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleSentenceStarters(activity.tasks[currentTask].id)}
                          className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                        >
                          {showSentenceStarters[activity.tasks[currentTask].id] ? 'Hide' : 'Show'} Sentence Starters
                        </button>
                        <button
                          onClick={() => handleAssistClick(activity.tasks[currentTask].id)}
                          disabled={assistUsesLeft === 0}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
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
                    </div>

                    {/* Sentence Starters */}
                    {showSentenceStarters[activity.tasks[currentTask].id] && (
                      <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h6 className="font-medium text-blue-800 mb-3">Sentence Starters:</h6>
                        <div className="grid grid-cols-1 gap-2">
                          {getSentenceStarters(activity.tasks[currentTask].title, activity.tasks[currentTask].description).map((starter, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                const currentResponse = responses[activity.tasks[currentTask].id] || '';
                                const newResponse = currentResponse ? `${currentResponse} ${starter}` : starter;
                                handleResponseChange(activity.tasks[currentTask].id, newResponse);
                              }}
                              className="text-left p-2 bg-white border border-blue-200 rounded hover:bg-blue-50 transition-colors text-sm text-blue-700"
                            >
                              {starter}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Assist Help */}
                    {showAssistHelp && (
                      <div className="mb-4 p-4 bg-amber-50 rounded-lg border border-amber-200 relative">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm">
                            A
                          </div>
                          <div className="flex-1">
                            <h6 className="font-medium text-amber-800 mb-2">Writing Help:</h6>
                            <p className="text-sm text-amber-700">{showAssistHelp}</p>
                          </div>
                          <button
                            onClick={() => setShowAssistHelp(null)}
                            className="p-1 hover:bg-amber-200 rounded transition-colors"
                          >
                            <X className="w-4 h-4 text-amber-600" />
                          </button>
                        </div>
                      </div>
                    )}

                  <textarea
                    value={responses[activity.tasks[currentTask].id] || ''}
                    onChange={(e) => handleResponseChange(activity.tasks[currentTask].id, e.target.value)}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={6}
                    placeholder="Type your response here..."
                  />
                  </>
                )}

                {activity.tasks[currentTask].type === 'multiple_choice' && (
                  <div className="space-y-3">
                    {activity.tasks[currentTask].options?.map((option, index) => (
                      <label key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name={activity.tasks[currentTask].id}
                          value={option}
                          checked={responses[activity.tasks[currentTask].id] === option}
                          onChange={(e) => handleResponseChange(activity.tasks[currentTask].id, e.target.value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {activity.tasks[currentTask].type === 'discussion' && (
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-yellow-800 mb-3">
                      <strong>Discussion Activity:</strong> Participate in the class discussion and then record your key insights below.
                    </p>
                    <textarea
                      value={responses[activity.tasks[currentTask].id] || ''}
                      onChange={(e) => handleResponseChange(activity.tasks[currentTask].id, e.target.value)}
                      className="w-full p-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
                      rows={4}
                      placeholder="Record your discussion insights and key points here..."
                    />
                  </div>
                )}

                {activity.tasks[currentTask].type === 'reflection' && (
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-purple-800 mb-3">
                      <strong>Reflection Task:</strong> Think carefully about your learning and provide a thoughtful response.
                    </p>
                    <textarea
                      value={responses[activity.tasks[currentTask].id] || ''}
                      onChange={(e) => handleResponseChange(activity.tasks[currentTask].id, e.target.value)}
                      className="w-full p-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      rows={4}
                      placeholder="Share your reflections and thoughts here..."
                    />
                  </div>
                )}
              </div>

              {/* Task Progress */}
              <div className="flex justify-center">
                <div className="flex items-center gap-2">
                  {activity.tasks.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTask(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentTask ? 'bg-blue-500' :
                        responses[activity.tasks[index].id] ? 'bg-green-500' :
                        'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Progress: {Object.keys(responses).length} of {activity.tasks.length} tasks completed
              </div>
              <div className="text-sm text-gray-600">
                Help uses remaining: {assistUsesLeft}/3
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(Object.keys(responses).length / activity.tasks.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={saveResponses}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Progress</span>
              </button>
              <PDFGenerator activity={activity} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}