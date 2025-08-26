import React, { useState } from 'react';
import { X, Clock, Users, Target, Brain, BookOpen, CheckCircle2, Lightbulb, Users2, MessageSquare, Globe, Award, Play, Maximize2, ExternalLink, ChevronRight, ChevronDown, Eye, Sparkles } from 'lucide-react';
import { MiniAssistant } from './MiniAssistant';
import { InteractiveImageViewer } from './InteractiveImageViewer';
import { InteractiveWritingPanel } from './InteractiveWritingPanel';
import { InteractiveDiscussionPanel } from './InteractiveDiscussionPanel';

interface ActivityDetailsModalProps {
  activity: {
    id: string;
    title: string;
    description: string;
    duration: string;
    type: string;
    activity_type?: 'starter' | 'main' | 'plenary';
    dialogic_structure?: string;
    subject?: string;
    year_group?: string;
    keywords?: string[];
    homework?: string;
    phase?: string;
    unit_context?: {
      title: string;
      overview: string;
      themes: string[];
    };
    details?: {
      preparation?: string[];
      steps?: string[];
      tips?: string[];
      differentiation?: string[];
      assessment?: string[];
      answers?: Record<string, string>;
      experiment?: any;
      success_criteria?: string[];
      real_world_connections?: string[];
    };
  };
  onClose: () => void;
  readOnly?: boolean;
}

export function ActivityDetailsModal({ activity, onClose, readOnly = false }: ActivityDetailsModalProps) {
  const [viewMode, setViewMode] = useState<'overview' | 'interactive'>(() => {
    // Auto-detect if this should start in interactive mode
    if (!activity.details?.steps) return 'overview';
    
    const isEnhanced = (activity.keywords && activity.keywords.length > 0) ||
                      (activity.details?.success_criteria && activity.details.success_criteria.length > 0) ||
                      (activity.details?.real_world_connections && activity.details.real_world_connections.length > 0) ||
                      activity.details.steps.some(step => 
                        step.toLowerCase().includes('view contrasting images') ||
                        step.toLowerCase().includes('think-pair-share') ||
                        step.toLowerCase().includes('quick-write') ||
                        step.toLowerCase().includes('discussion')
                      );
    
    return isEnhanced ? 'interactive' : 'overview';
  });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [studentResponse, setStudentResponse] = useState('');
  const [discussionResponses, setDiscussionResponses] = useState<string[]>([]);
  const [currentPhase, setCurrentPhase] = useState<'think' | 'pair' | 'share'>('think');
  const [timer, setTimer] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const getActivityTypeIcon = () => {
    if (activity.activity_type === 'starter') {
      return <Brain className="w-6 h-6 text-blue-600" />;
    } else if (activity.activity_type === 'main') {
      return <BookOpen className="w-6 h-6 text-[#FFC83D]" />;
    } else {
      return <CheckCircle2 className="w-6 h-6 text-green-600" />;
    }
  };

  const getActivityTypeColor = () => {
    if (activity.activity_type === 'starter') {
      return 'bg-blue-100 text-blue-700';
    } else if (activity.activity_type === 'main') {
      return 'bg-[#FFF9E7] text-[#FFC83D]';
    } else {
      return 'bg-green-100 text-green-700';
    }
  };

  const getDialogicStructureStyle = (structure: string = 'Discussion') => {
    switch (structure) {
      case 'Discussion':
        return 'bg-blue-100 text-blue-700';
      case 'Simulation':
        return 'bg-purple-100 text-purple-700';
      case 'Debate':
        return 'bg-orange-100 text-orange-700';
      case 'Role Play':
        return 'bg-green-100 text-green-700';
      case 'Think-Pair-Share':
        return 'bg-cyan-100 text-cyan-700';
      case 'Collaborative Problem Solving':
        return 'bg-indigo-100 text-indigo-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const hasInteractiveContent = () => {
    if (!activity.details?.steps) return false;
    
    // Check if this is a dystopian activity or has enhanced content
    return activity.title.toLowerCase().includes('dystopian') ||
           activity.description.toLowerCase().includes('dystopian') ||
           (activity.keywords && activity.keywords.length > 0) ||
           (activity.details?.success_criteria && activity.details.success_criteria.length > 0) ||
           (activity.details?.real_world_connections && activity.details.real_world_connections.length > 0) ||
           activity.details.steps.some(step => 
             step.toLowerCase().includes('view contrasting images') ||
             step.toLowerCase().includes('think-pair-share') ||
             step.toLowerCase().includes('quick-write') ||
             step.toLowerCase().includes('discussion')
           );
  };

  const dystopianImages = [
    {
      url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=600',
      title: 'Green Utopia',
      description: 'Sustainable cities with nature integration',
      category: 'utopian' as const
    },
    {
      url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1f?auto=format&fit=crop&q=80&w=600',
      title: 'Peaceful Harmony',
      description: 'Communities living in balance',
      category: 'utopian' as const
    },
    {
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=600',
      title: 'Bright Innovation',
      description: 'Technology serving humanity',
      category: 'utopian' as const
    },
    {
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=600',
      title: 'Surveillance State',
      description: 'Constant monitoring and control',
      category: 'dystopian' as const
    },
    {
      url: 'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&q=80&w=600',
      title: 'Urban Decay',
      description: 'Environmental destruction',
      category: 'dystopian' as const
    },
    {
      url: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?auto=format&fit=crop&q=80&w=600',
      title: 'Oppressive Control',
      description: 'Authoritarian architecture',
      category: 'dystopian' as const
    }
  ];

  const startTimer = (minutes: number) => {
    setTimer(minutes * 60);
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const addResponse = () => {
    if (studentResponse.trim()) {
      setDiscussionResponses(prev => [...prev, studentResponse.trim()]);
      setStudentResponse('');
    }
  };

  const renderInteractiveContent = () => {
    // Check if this is a dystopian activity that should show enhanced content
    if (activity.title.toLowerCase().includes('dystopian') || 
        activity.description.toLowerCase().includes('dystopian') ||
        (activity.details?.steps && activity.details.steps.some(step => 
          step.toLowerCase().includes('dystopian') || 
          step.toLowerCase().includes('think-pair-share')
        ))) {
      return (
        <div className="space-y-6">
          {/* Enhanced Dystopian Content */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-indigo-900">Dystopian World Discovery</h3>
            </div>
            <p className="text-indigo-800 mb-4">
              Welcome to the world of tomorrow—but which tomorrow will it be? Dystopian fiction shows us possible futures where things have gone wrong, helping us understand our present world better.
            </p>
            
            {/* Think-Pair-Share Questions */}
            <div className="bg-slate-800 rounded-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="w-6 h-6 text-amber-400" />
                <h4 className="text-lg font-bold">Think-Pair-Share Questions:</h4>
              </div>
              <div className="space-y-3">
                {[
                  { question: 'What makes a future world feel frightening or unsettling?', answer: 'Elements like constant surveillance, environmental destruction, loss of freedom, technology controlling people, and extreme inequality create fear because they represent our worst concerns about where society might be heading.' },
                  { question: 'How do dystopian stories help us think about real-world problems?', answer: 'By exaggerating current issues and showing their extreme consequences, dystopian fiction helps us recognize problems in our own world and consider how to prevent negative outcomes.' },
                  { question: 'What dystopian elements have you seen in films or books?', answer: 'Common elements include surveillance cameras everywhere, environmental disasters, strict government control, technology addiction, social divisions, and loss of individual freedom.' },
                  { question: 'Why might writers create dark future worlds?', answer: 'Writers use dystopian settings as warnings about current trends, to explore important social issues, and to encourage readers to think critically about the direction society is taking.' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start justify-between p-3 bg-slate-700 rounded-lg">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <span className="text-white">{item.question}</span>
                    </div>
                    <MiniAssistant answer={item.answer} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Success Criteria */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-amber-600" />
              <h3 className="text-lg font-semibold text-amber-800">Success Criteria</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {(activity.details?.success_criteria || [
                'Identify key features of dystopian settings accurately',
                'Understand how dystopian elements create unsettling atmosphere',
                'Recognize dystopian settings as social commentary',
                'Connect fictional elements to real-world concerns'
              ]).map((criteria, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-amber-200">
                  <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">{index + 1}</span>
                  </div>
                  <span className="text-amber-800 font-medium">{criteria}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Add the standard overview content */}
          {renderOverviewContent()}
        </div>
      );
    }

    // For other activities, show a rich interactive view
    return (
      <div className="space-y-8">
        {/* Interactive Image Viewer for visual activities */}
        {activity.details?.steps?.some(step => step.toLowerCase().includes('image')) && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Visual Analysis</h3>
            <InteractiveImageViewer 
              images={dystopianImages}
              showAnalysisTools={true}
            />
          </div>
        )}

        {/* Interactive Discussion Panel */}
        {activity.details?.steps?.some(step => step.toLowerCase().includes('think-pair-share')) && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Discussion Activity</h3>
            <InteractiveDiscussionPanel
              questions={[
                'What makes a future world feel frightening or unsettling?',
                'How do dystopian stories help us think about real-world problems?',
                'What dystopian elements have you seen in films or books?',
                'Why might writers create dark future worlds?'
              ]}
              duration={10}
              structure="think-pair-share"
            />
          </div>
        )}

        {/* Interactive Writing Panel */}
        {activity.details?.steps?.some(step => step.toLowerCase().includes('quick-write') || step.toLowerCase().includes('writing')) && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Writing Activity</h3>
            <InteractiveWritingPanel
              prompt="Write your immediate emotional responses to the images you've seen. What feelings do they evoke? What key differences do you notice between utopian and dystopian futures?"
              duration={6}
              placeholder="Write your thoughts about the images you've seen. Focus on emotions and key differences..."
              showTimer={true}
              allowPeerReview={false}
            />
          </div>
        )}

        {/* Enhanced content sections */}
        {renderOverviewContent()}
      </div>
    );
  };

  const renderOverviewContent = () => {
    return (
      <div className="space-y-8">
        {/* Unit Context */}
        {activity.unit_context && (
          <div className="border border-indigo-200 rounded-lg p-6 bg-gradient-to-br from-indigo-50 to-purple-50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-indigo-800">Unit Context</h3>
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-indigo-800 mb-1">{activity.unit_context.title}</h4>
                <p className="text-sm text-indigo-700">{activity.unit_context.overview}</p>
              </div>
              {activity.phase && (
                <div>
                  <h5 className="text-sm font-medium text-indigo-800 mb-1">Lesson Phase:</h5>
                  <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">
                    {activity.phase}
                  </span>
                </div>
              )}
              <div>
                <h5 className="text-sm font-medium text-indigo-800 mb-2">Unit Themes:</h5>
                <div className="flex flex-wrap gap-2">
                  {activity.unit_context.themes.map((theme, index) => (
                    <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-[#FFC83D]" />
            <h3 className="text-lg font-semibold text-gray-800">Learning Objective</h3>
          </div>
          <p className="text-gray-700">{activity.description}</p>
          
          {activity.keywords && activity.keywords.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Key Vocabulary:</h4>
              <div className="flex flex-wrap gap-2">
                {activity.keywords.map((keyword, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {activity.details?.preparation && activity.details.preparation.length > 0 && (
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-[#FFC83D]" />
              <h3 className="text-lg font-semibold text-gray-800">Prior Knowledge</h3>
            </div>
            <ul className="space-y-2">
              {activity.details.preparation.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-[#FFC83D] mr-2">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activity.details?.steps && activity.details.steps.length > 0 && (
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="w-6 h-6 text-[#FFC83D]" />
              <h3 className="text-lg font-semibold text-gray-800">Activity Steps</h3>
            </div>
            <div className="space-y-4">
              {activity.details.steps.map((step, index) => {
                const answer = activity.details?.answers?.[step];
                const isHeader = step.startsWith('**') || step.startsWith('#');
                const isBullet = step.startsWith('•') || step.startsWith('-');
                
                return (
                  <div key={index} className={`flex items-start justify-between gap-4 ${isHeader ? 'mt-4' : ''}`}>
                    <div className="flex-1">
                      {isHeader ? (
                        <h4 className="font-medium text-gray-800 my-2">{step.replace(/\*\*/g, '')}</h4>
                      ) : isBullet ? (
                        <div className="flex items-start">
                          <span className="text-[#FFC83D] mr-2">•</span>
                          <p className="text-gray-700">{step.replace(/^[•-]\s*/, '')}</p>
                        </div>
                      ) : (
                        <p className="text-gray-700 whitespace-pre-wrap">{step}</p>
                      )}
                    </div>
                    {answer && <MiniAssistant answer={answer} />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          {activity.details?.tips && activity.details.tips.length > 0 && (
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-5 h-5 text-[#FFC83D]" />
                <h3 className="text-lg font-semibold text-gray-800">Teaching Tips</h3>
              </div>
              <ul className="space-y-2">
                {activity.details.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#FFC83D] mr-2">•</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activity.details?.differentiation && activity.details.differentiation.length > 0 && (
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users2 className="w-5 h-5 text-[#FFC83D]" />
                <h3 className="text-lg font-semibold text-gray-800">Differentiation</h3>
              </div>
              <ul className="space-y-2">
                {activity.details.differentiation.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#FFC83D] mr-2">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {activity.details?.assessment && activity.details.assessment.length > 0 && (
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-[#FFC83D]" />
              <h3 className="text-lg font-semibold text-gray-800">Assessment Opportunities</h3>
            </div>
            <ul className="space-y-2">
              {activity.details.assessment.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-[#FFC83D] mr-2">•</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Real-world connections */}
        {activity.details?.real_world_connections && activity.details.real_world_connections.length > 0 && (
          <div className="border border-green-200 rounded-lg p-6 bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-green-800">Real-World Connections</h3>
            </div>
            <ul className="space-y-2">
              {activity.details.real_world_connections.map((connection, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span className="text-green-700">{connection}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-7xl max-h-[95vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                activity.activity_type === 'starter' ? 'bg-blue-100' : 
                activity.activity_type === 'main' ? 'bg-[#FFF9E7]' : 
                'bg-green-100'
              }`}>
                {getActivityTypeIcon()}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{activity.title}</h2>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{activity.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{activity.year_group}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <BookOpen className="w-4 h-4" />
                    <span>{activity.subject}</span>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    activity.type === 'discussion' ? 'bg-blue-100 text-blue-700' :
                    activity.type === 'individual' ? 'bg-purple-100 text-purple-700' :
                    activity.type === 'group' ? 'bg-green-100 text-green-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {activity.type}
                  </div>
                  {activity.activity_type && (
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityTypeColor()}`}>
                      {activity.activity_type.charAt(0).toUpperCase() + activity.activity_type.slice(1)}
                    </div>
                  )}
                  {activity.dialogic_structure && (
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDialogicStructureStyle(activity.dialogic_structure)}`}>
                      {activity.dialogic_structure}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {hasInteractiveContent() ? renderInteractiveContent() : renderOverviewContent()}
        </div>
      </div>
    </div>
  );
}