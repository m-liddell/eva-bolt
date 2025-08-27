import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Search, MessageSquare, Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { LessonLayout } from '../LessonLayout';
import { NavigationArrow } from '../NavigationArrow';
import { MidAssistant } from '../MidAssistant';
import { MiniAssistant } from '../MiniAssistant';
import { Brain, BookOpen, CheckCircle2 } from 'lucide-react';

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
      // Default to blue theme
      return {
        primary: 'bg-blue-900',
        secondary: 'bg-blue-800/50',
        text: 'text-white',
        accent: 'text-blue-300',
        border: 'border-blue-600',
        hover: 'hover:bg-blue-700',
        backgroundGradient: 'rgba(59, 130, 246, 0.95)',
        itemBg: 'bg-white',
        itemText: 'text-gray-900',
        categoryBg: 'bg-white/90',
        headerText: 'text-gray-900'
      };
  }
};

interface CollaborativeInvestigationProps {
  lessonData: {
    title: string;
    learning_objective: string;
    investigation_type: 'text_analysis_workshop' | 'group_problem_solving' | 'peer_teaching_cycles';
    investigation_focus: string;
    materials: {
      texts?: string[];
      problems?: string[];
      teaching_topics?: string[];
    };
    collaboration_structure: {
      group_size: number;
      roles: string[];
      rotation_time?: number;
    };
    theme?: string;
  };
  navigationData: {
    previousRoute: string;
    nextRoute: string;
  };
}

// Progressive text sets with increasing complexity
const getProgressiveTexts = (completedCount: number) => {
  const textSets = [
    // Level 1: Basic complete sentences
    [
      "The surveillance cameras watched every movement with mechanical precision.",
      "Citizens hurried through sterile corridors in complete silence.",
      "Propaganda speakers broadcast approved messages throughout the day."
    ],
    // Level 2: More complex sentences with multiple elements
    [
      "The omnipresent surveillance cameras, symbols of governmental overreach, watched citizens with the relentless hunger of predators stalking their prey.",
      "Frightened citizens hurried through the sterile, windowless corridors while their footsteps echoed ominously in the oppressive silence that had replaced natural conversation.",
      "The harsh propaganda speakers, instruments of psychological manipulation, broadcast their approved messages with mechanical persistence while screens displayed sanitized news that bore no resemblance to reality."
    ],
    // Level 3: Highly sophisticated sentences with multiple clauses
    [
      "Although the surveillance cameras promised safety and security for all citizens, they actually created an inescapable prison where privacy became extinct, trust eroded completely, and fear dominated every aspect of daily life in ways that previous generations could never have imagined.",
      "While the government's propaganda broadcasts filled the airwaves with carefully crafted messages of prosperity and technological progress, the harsh reality beneath the polished surface revealed environmental decay, social inequality, and systematic oppression that threatened the very foundation of human dignity and freedom.",
      "Because the sophisticated technological control mechanisms had infiltrated every aspect of human interaction, from communication to transportation to even private thoughts, genuine relationships became nearly impossible as citizens learned to mistrust their own emotions and question their deepest beliefs."
    ]
  ];
  
  const level = Math.min(Math.floor(completedCount / 3), textSets.length - 1);
  return textSets[level];
};

// Enhanced explanations for grammar terms
const getGrammarExplanations = () => ({
  subject: "The subject is who or what the sentence is about - the person, place, thing, or idea performing the action. Example: In 'The cameras watched,' 'cameras' is the subject.",
  verb: "The verb shows the action or state of being. It tells us what the subject is doing. Example: In 'The cameras watched,' 'watched' is the action verb.",
  object: "The object receives the action of the verb. It answers 'what?' or 'whom?' after the verb. Example: In 'cameras watched movement,' 'movement' is the direct object.",
  modifier: "A modifier adds description or detail to other words. It can be an adjective (describing nouns) or adverb (describing verbs). Example: 'mechanical precision' - 'mechanical' modifies 'precision'.",
  clause: "A clause is a group of words with a subject and verb. Main clauses can stand alone; subordinate clauses depend on the main clause. Example: 'Although cameras watched' is a subordinate clause.",
  conjunction: "A conjunction connects words, phrases, or clauses. Coordinating conjunctions (and, but, or) join equal elements. Subordinating conjunctions (although, because, while) create dependent clauses.",
  atmosphere: "Atmosphere is the mood or feeling created by the writing. It's the emotional environment the reader experiences. Example: 'mechanical precision' creates a cold, threatening atmosphere.",
  dystopian_theme: "Dystopian themes explore societal control, loss of freedom, environmental destruction, or technological oppression. They reflect real-world concerns about where society might be heading."
});
export default function CollaborativeInvestigationTemplate({ lessonData, navigationData }: CollaborativeInvestigationProps) {
  const router = useRouter();
  
  // Get theme colors
  const themeColors = getThemeColors(lessonData.theme);
  
  const [currentGroup, setCurrentGroup] = useState<number>(1);
  const [investigationNotes, setInvestigationNotes] = useState<Record<string, string>>({});
  const [selectedRole, setSelectedRole] = useState<string>(lessonData.collaboration_structure.roles[0]);
  const [showSentenceStarters, setShowSentenceStarters] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'setup' | 'collaborative' | 'share'>('setup');
  const [completedTexts, setCompletedTexts] = useState<number>(0);
  const [currentTexts, setCurrentTexts] = useState<string[]>([]);
  const [showGrammarHelp, setShowGrammarHelp] = useState<string | null>(null);

  const grammarExplanations = getGrammarExplanations();

  // Initialize texts based on completion level
  React.useEffect(() => {
    const texts = getProgressiveTexts(completedTexts);
    setCurrentTexts(texts);
  }, [completedTexts]);

  // Function to advance to next text level
  const advanceTextLevel = () => {
    setCompletedTexts(prev => prev + 3);
  };

  const phaseTimings = {
    setup: 5,
    collaborative: 20,
    share: 15
  };

  const startTimer = (phase: 'setup' | 'collaborative' | 'share') => {
    setCurrentPhase(phase);
    setTimer(phaseTimings[phase] * 60);
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

  const handleNotesChange = (key: string, value: string) => {
    setInvestigationNotes(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getInvestigationIcon = () => {
    switch (lessonData.investigation_type) {
      case 'text_analysis_workshop': return <Search className="w-6 h-6" />;
      case 'group_problem_solving': return <Users className="w-6 h-6" />;
      case 'peer_teaching_cycles': return <MessageSquare className="w-6 h-6" />;
      default: return <Users className="w-6 h-6" />;
    }
  };

  const getInvestigationTitle = () => {
    switch (lessonData.investigation_type) {
      case 'text_analysis_workshop': return 'Text Analysis Workshop';
      case 'group_problem_solving': return 'Group Problem Solving';
      case 'peer_teaching_cycles': return 'Peer Teaching Cycles';
      default: return 'Collaborative Investigation';
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
                <p className="text-sm text-gray-600">Collaborative investigation and analysis</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push(navigationData.previousRoute)}
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
            <MidAssistant context={{ topic: 'literature' }} />
          </div>

          {/* Main Activity Overview */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-2xl">👥</span>
              <h2 className="text-xl font-bold text-blue-900">{getInvestigationTitle()}</h2>
            </div>
            <p className="text-base text-blue-800">
              Focus: {lessonData.investigation_focus}
            </p>
          </div>

          {/* Success Criteria, Instructions, and Reason - Horizontal Layout */}
          <div className="mb-6 grid grid-cols-3 gap-6">
            {/* Success Criteria */}
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="text-lg font-semibold text-amber-800 mb-3">Success Criteria</h3>
              <ul className="space-y-2 text-sm text-amber-800">
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Master complete sentence components through collaborative analysis</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Practice atmospheric writing using dystopian examples and vocabulary</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Demonstrate understanding of sentence structure and grammar accuracy</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Apply sentence construction skills to create effective dystopian descriptions</span>
                </li>
              </ul>
            </div>

            {/* Jigsaw Instructions */}
            <div className="col-span-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Jigsaw Instructions</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div>
                    <h4 className="font-medium text-blue-800 text-sm">Form Specialist Teams (5 mins)</h4>
                    <p className="text-xs text-blue-700 mb-2">Get into groups of {lessonData.collaboration_structure.group_size} students. Each group becomes specialists in one analysis area:</p>
                    <ul className="text-xs text-blue-700 space-y-1 ml-2">
                      {lessonData.collaboration_structure.roles.map((role, index) => (
                        <li key={index}>• {role}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div>
                    <h4 className="font-medium text-blue-800 text-sm">Become Experts (20 mins)</h4>
                    <p className="text-xs text-blue-700">Work collaboratively to analyze all texts from your specialist perspective. Gather evidence, take detailed notes, and prepare to teach others what you've discovered. Your group will become the class experts on your assigned focus area.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div>
                    <h4 className="font-medium text-blue-800 text-sm">Teach Other Groups (15 mins)</h4>
                    <p className="text-xs text-blue-700">Each specialist group teaches their findings to other groups. You'll learn from all four specialist perspectives, gaining insights you couldn't develop alone. This creates complete understanding through collaborative expertise.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* 40-Minute Structure Indicator */}
          <div className="mb-6 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-4 shadow-inner">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <span className="text-blue-600 text-sm font-medium">Timers Available</span>
                </div>
                <h3 className="text-lg font-semibold text-blue-900">40-Minute Investigation</h3>
              </div>
              <div className="flex items-center gap-6">
                {/* Timer Controls */}
                <div className="flex items-center gap-3">
                  {timer !== null && (
                    <div className={`px-4 py-2 rounded-lg font-bold text-lg ${
                      timer > 300 ? 'bg-green-100 text-green-700' :
                      timer > 120 ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {formatTime(timer)}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button
                      onClick={() => startTimer('setup')}
                      className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
                    >
                      Setup (5m)
                    </button>
                    <button
                      onClick={() => startTimer('collaborative')}
                      className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors"
                    >
                      Work (20m)
                    </button>
                    <button
                      onClick={() => startTimer('share')}
                      className="px-3 py-1 bg-purple-500 text-white rounded text-xs hover:bg-purple-600 transition-colors"
                    >
                      Share (15m)
                    </button>
                    {isTimerRunning && (
                      <button
                        onClick={stopTimer}
                        className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600 transition-colors"
                      >
                        Stop
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Investigation Area - Left Side */}
            <div className="col-span-8 space-y-4">
              <div className="p-6 bg-blue-900 rounded-lg shadow-lg text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {getInvestigationIcon()}
                    <h3 className="text-xl font-bold text-white">Investigation Workspace</h3>
                  </div>
                  <div className="text-sm text-white">
                    Group {currentGroup} | Role: {selectedRole}
                  </div>
                </div>

                {/* Investigation Content */}
                <div className="bg-blue-800/50 p-6 rounded-lg space-y-4">
                  {lessonData.investigation_type === 'text_analysis_workshop' && (
                    <div className="space-y-4">
                      <h4 className="font-semibold mb-3 text-white">Text Analysis Focus:</h4>
                      
                      {/* Role-Specific Examples */}
                      <div className="mb-4 p-4 bg-blue-700/50 rounded-lg">
                        <h5 className="font-medium mb-3 text-white">Example Analysis for Your Role:</h5>
                        <div className="p-3 bg-blue-600/50 rounded-lg">
                          <p className="text-sm italic mb-2 text-white">"The surveillance cameras watched every movement with mechanical precision."</p>
                          <div className="text-xs text-blue-200 space-y-2">
                            {selectedRole === 'Sentence Structure Analyst' && (
                              <div>
                                <p><strong>Structure Analysis:</strong> Subject: "The surveillance cameras" | Verb: "watched" | Object: "every movement" | Modifier: "with mechanical precision" - Complete sentence with clear subject-verb-object structure.</p>
                                <div className="flex items-start justify-between mt-2">
                                  <div className="flex-1">
                                    <p className="text-blue-100">Click the assistant to learn about grammar terms →</p>
                                  </div>
                                  <div className="ml-2">
                                    <button
                                      onClick={() => setShowGrammarHelp(showGrammarHelp === 'structure' ? null : 'structure')}
                                      className="w-6 h-6 rounded-full border border-blue-300 flex items-center justify-center hover:bg-blue-500/20 transition-colors"
                                    >
                                      <span className="text-[#FFB800] font-['Sofia'] text-sm leading-none">A</span>
                                    </button>
                                  </div>
                                </div>
                                {showGrammarHelp === 'structure' && (
                                  <div className="mt-2 p-3 bg-blue-500/30 rounded-lg border border-blue-400">
                                    <div className="space-y-2 text-xs text-blue-100">
                                      <p><strong>Subject:</strong> {grammarExplanations.subject}</p>
                                      <p><strong>Verb:</strong> {grammarExplanations.verb}</p>
                                      <p><strong>Object:</strong> {grammarExplanations.object}</p>
                                      <p><strong>Modifier:</strong> {grammarExplanations.modifier}</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                            {selectedRole === 'Atmospheric Language Expert' && (
                              <div>
                                <p><strong>Atmosphere Analysis:</strong> "mechanical precision" creates cold, inhuman feeling | "watched" suggests constant observation | Creates atmosphere of being monitored by emotionless technology.</p>
                                <div className="flex items-start justify-between mt-2">
                                  <div className="flex-1">
                                    <p className="text-blue-100">Click the assistant to learn about atmospheric techniques →</p>
                                  </div>
                                  <div className="ml-2">
                                    <button
                                      onClick={() => setShowGrammarHelp(showGrammarHelp === 'atmosphere' ? null : 'atmosphere')}
                                      className="w-6 h-6 rounded-full border border-blue-300 flex items-center justify-center hover:bg-blue-500/20 transition-colors"
                                    >
                                      <span className="text-[#FFB800] font-['Sofia'] text-sm leading-none">A</span>
                                    </button>
                                  </div>
                                </div>
                                {showGrammarHelp === 'atmosphere' && (
                                  <div className="mt-2 p-3 bg-blue-500/30 rounded-lg border border-blue-400">
                                    <div className="space-y-2 text-xs text-blue-100">
                                      <p><strong>Atmosphere:</strong> {grammarExplanations.atmosphere}</p>
                                      <p><strong>Modifier:</strong> {grammarExplanations.modifier}</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                            {selectedRole === 'Grammar Accuracy Checker' && (
                              <div>
                                <p><strong>Grammar Check:</strong> Proper capitalization ✓ | Subject-verb agreement ✓ | Correct punctuation ✓ | Clear sentence boundary ✓ | Technically accurate and complete.</p>
                                <div className="flex items-start justify-between mt-2">
                                  <div className="flex-1">
                                    <p className="text-blue-100">Click the assistant to learn about grammar rules →</p>
                                  </div>
                                  <div className="ml-2">
                                    <button
                                      onClick={() => setShowGrammarHelp(showGrammarHelp === 'grammar' ? null : 'grammar')}
                                      className="w-6 h-6 rounded-full border border-blue-300 flex items-center justify-center hover:bg-blue-500/20 transition-colors"
                                    >
                                      <span className="text-[#FFB800] font-['Sofia'] text-sm leading-none">A</span>
                                    </button>
                                  </div>
                                </div>
                                {showGrammarHelp === 'grammar' && (
                                  <div className="mt-2 p-3 bg-blue-500/30 rounded-lg border border-blue-400">
                                    <div className="space-y-2 text-xs text-blue-100">
                                      <p><strong>Subject-Verb Agreement:</strong> The subject and verb must match in number (singular/plural)</p>
                                      <p><strong>Sentence Boundary:</strong> Each sentence must start with a capital and end with proper punctuation</p>
                                      <p><strong>Complete Thought:</strong> The sentence must express a full idea that makes sense on its own</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                            {selectedRole === 'Dystopian Context Specialist' && (
                              <div>
                                <p><strong>Dystopian Analysis:</strong> Shows surveillance theme | "mechanical" suggests dehumanization | Reflects real-world concerns about privacy and monitoring | Classic dystopian control mechanism.</p>
                                <div className="flex items-start justify-between mt-2">
                                  <div className="flex-1">
                                    <p className="text-blue-100">Click the assistant to learn about dystopian themes →</p>
                                  </div>
                                  <div className="ml-2">
                                    <button
                                      onClick={() => setShowGrammarHelp(showGrammarHelp === 'dystopian' ? null : 'dystopian')}
                                      className="w-6 h-6 rounded-full border border-blue-300 flex items-center justify-center hover:bg-blue-500/20 transition-colors"
                                    >
                                      <span className="text-[#FFB800] font-['Sofia'] text-sm leading-none">A</span>
                                    </button>
                                  </div>
                                </div>
                                {showGrammarHelp === 'dystopian' && (
                                  <div className="mt-2 p-3 bg-blue-500/30 rounded-lg border border-blue-400">
                                    <div className="space-y-2 text-xs text-blue-100">
                                      <p><strong>Dystopian Theme:</strong> {grammarExplanations.dystopian_theme}</p>
                                      <p><strong>Surveillance:</strong> Constant monitoring and observation as a form of social control</p>
                                      <p><strong>Dehumanization:</strong> Treating people like objects or machines rather than individuals</p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {currentTexts.map((text, index) => (
                          <div key={index} className="p-4 bg-blue-800/30 rounded-lg">
                            <h5 className="font-medium mb-2 text-white">Text {index + 1}:</h5>
                            <p className="text-sm italic mb-3 text-white">"{text}"</p>
                            <div className="space-y-2">
                              <textarea
                                placeholder="Your analysis notes..."
                                value={investigationNotes[`text_${index}`] || ''}
                                onChange={(e) => handleNotesChange(`text_${index}`, e.target.value)}
                                className="w-full h-20 p-3 bg-blue-700/30 border border-blue-600 rounded text-white placeholder-blue-200 resize-none"
                              />
                              {investigationNotes[`text_${index}`] && investigationNotes[`text_${index}`].length > 50 && (
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-green-300">✓ Analysis complete</span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                        
                        {/* Progress and Level Advancement */}
                        <div className="mt-4 p-4 bg-blue-700/50 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h5 className="font-medium text-white">Analysis Progress</h5>
                            <span className="text-xs text-blue-200">
                              Level {Math.floor(completedTexts / 3) + 1} of 3
                            </span>
                          </div>
                          
                          {/* Progress Instructions */}
                          <div className="mb-3 p-3 bg-blue-600/50 rounded-lg border border-blue-500">
                            <h6 className="font-medium text-blue-100 mb-2">📝 How to Progress:</h6>
                            <ul className="text-xs text-blue-200 space-y-1">
                              <li>• Write detailed analysis notes (50+ characters) for each text</li>
                              <li>• Complete all {currentTexts.length} texts in this level</li>
                              <li>• Click "Unlock Next Level" when it appears</li>
                              <li>• Progress through 3 levels of increasing sophistication</li>
                            </ul>
                          </div>
                          
                          <div className="w-full bg-blue-600 rounded-full h-2 mb-3">
                            <div 
                              className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(Object.keys(investigationNotes).filter(key => key.startsWith('text_') && investigationNotes[key].length > 50).length / currentTexts.length) * 100}%` }}
                            />
                          </div>
                          
                          {/* Progress Status */}
                          <div className="mb-3 text-center">
                            <span className="text-xs text-blue-200">
                              {Object.keys(investigationNotes).filter(key => key.startsWith('text_') && investigationNotes[key].length > 50).length} of {currentTexts.length} texts completed
                            </span>
                          </div>
                          
                          {Object.keys(investigationNotes).filter(key => key.startsWith('text_') && investigationNotes[key].length > 50).length === currentTexts.length && completedTexts < 6 && (
                            <button
                              onClick={advanceTextLevel}
                              className="w-full px-4 py-2 bg-yellow-500 text-gray-900 rounded-lg hover:bg-yellow-400 transition-colors font-medium"
                            >
                              🎉 Unlock Next Level - More Sophisticated Texts!
                            </button>
                          )}
                          {completedTexts >= 6 && (
                            <div className="text-center">
                              <div className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium">
                                🏆 All Levels Complete! You've mastered sentence analysis!
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {lessonData.investigation_type === 'group_problem_solving' && (
                    <div className="space-y-4">
                      <h4 className="font-semibold mb-3 text-white">Problem Solving Challenge:</h4>
                      <div className="space-y-3">
                        {lessonData.materials.problems?.map((problem, index) => (
                          <div key={index} className="p-4 bg-blue-800/30 rounded-lg">
                            <h5 className="font-medium mb-2 text-white">Challenge {index + 1}:</h5>
                            <p className="text-sm mb-3 text-white">{problem}</p>
                            <textarea
                              placeholder="Your team's solution..."
                              value={investigationNotes[`problem_${index}`] || ''}
                              onChange={(e) => handleNotesChange(`problem_${index}`, e.target.value)}
                              className="w-full h-20 p-3 bg-blue-700/30 border border-blue-600 rounded text-white placeholder-blue-200 resize-none"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {lessonData.investigation_type === 'peer_teaching_cycles' && (
                    <div className="space-y-4">
                      <h4 className="font-semibold mb-3 text-white">Peer Teaching Topics:</h4>
                      <div className="space-y-3">
                        {lessonData.materials.teaching_topics?.map((topic, index) => (
                          <div key={index} className="p-4 bg-blue-800/30 rounded-lg">
                            <h5 className="font-medium mb-2 text-white">Topic {index + 1}: {topic}</h5>
                            <textarea
                              placeholder="Teaching notes and key points..."
                              value={investigationNotes[`teaching_${index}`] || ''}
                              onChange={(e) => handleNotesChange(`teaching_${index}`, e.target.value)}
                              className="w-full h-20 p-3 bg-blue-700/30 border border-blue-600 rounded text-white placeholder-blue-200 resize-none"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Collaboration Support - Right Side */}
            <div className="col-span-4 space-y-4">
              <div className="p-4 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 shadow-md">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Team Roles</h3>
                <div className="space-y-2">
                  {lessonData.collaboration_structure.roles.map((role, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedRole(role)}
                      className={`w-full p-3 rounded text-left transition-colors ${
                        selectedRole === role 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                      }`}
                    >
                      <div className="font-medium">{role.replace(/_/g, ' ')}</div>
                      <div className="text-xs opacity-80 mt-1">
                        {role === 'Sentence Structure Analyst' && 'Look for: subjects, verbs, objects, sentence completeness, grammar accuracy'}
                        {role === 'Atmospheric Language Expert' && 'Look for: mood words, sensory details, emotional impact, descriptive techniques'}
                        {role === 'Grammar Accuracy Checker' && 'Look for: punctuation, spelling, sentence boundaries, technical correctness'}
                        {role === 'Dystopian Context Specialist' && 'Look for: control themes, oppression elements, social commentary, genre conventions'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Role Details */}
              <div className={`p-4 ${themeColors.categoryBg} rounded-lg border ${themeColors.border}`}>
                <h3 className={`text-lg font-semibold mb-3 ${themeColors.categoryText}`}>Your Role: {selectedRole}</h3>
                <div className="space-y-3">
                  {selectedRole === 'Sentence Structure Analyst' && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-blue-800 text-sm">What to Look For:</h4>
                      <ul className="text-xs text-gray-700 space-y-1">
                        <li>• Subject: Who or what is doing the action?</li>
                        <li>• Verb: What action is happening?</li>
                        <li>• Object: What is receiving the action?</li>
                        <li>• Completeness: Does it express a complete thought?</li>
                        <li>• Grammar: Are all parts working correctly together?</li>
                      </ul>
                    </div>
                  )}
                  {selectedRole === 'Atmospheric Language Expert' && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-blue-800 text-sm">What to Look For:</h4>
                      <ul className="text-xs text-gray-700 space-y-1">
                        <li>• Mood words: What feeling does the language create?</li>
                        <li>• Sensory details: What can you see, hear, feel, smell?</li>
                        <li>• Emotional impact: How does it make readers feel?</li>
                        <li>• Descriptive techniques: What literary devices are used?</li>
                        <li>• Atmosphere: What overall mood is created?</li>
                      </ul>
                    </div>
                  )}
                  {selectedRole === 'Grammar Accuracy Checker' && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-blue-800 text-sm">What to Look For:</h4>
                      <ul className="text-xs text-gray-700 space-y-1">
                        <li>• Punctuation: Are periods, commas, capitals correct?</li>
                        <li>• Spelling: Are all words spelled correctly?</li>
                        <li>• Sentence boundaries: Where does each sentence start/end?</li>
                        <li>• Technical accuracy: Is the grammar formally correct?</li>
                        <li>• Clarity: Is the meaning clear and unambiguous?</li>
                      </ul>
                    </div>
                  )}
                  {selectedRole === 'Dystopian Context Specialist' && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-blue-800 text-sm">What to Look For:</h4>
                      <ul className="text-xs text-gray-700 space-y-1">
                        <li>• Control themes: How is power and control shown?</li>
                        <li>• Oppression elements: What restricts freedom?</li>
                        <li>• Social commentary: What real-world issues are reflected?</li>
                        <li>• Genre conventions: What makes this dystopian?</li>
                        <li>• Thematic depth: What deeper meanings are present?</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Sentence Starters Support */}
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-green-800">Writing Support</h3>
                  <MiniAssistant answer="Use these sentence starters to help structure your analysis and make your observations more precise and academic." />
                </div>
                <button
                  onClick={() => setShowSentenceStarters(!showSentenceStarters)}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mb-3"
                >
                  {showSentenceStarters ? 'Hide' : 'Show'} Sentence Starters
                </button>
                
                {showSentenceStarters && (
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-800 text-sm mb-2">Analysis Starters:</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          "This sentence demonstrates...",
                          "The atmospheric effect is created by...",
                          "The grammatical structure shows...",
                          "In terms of dystopian themes, this reveals...",
                          "The most significant feature is...",
                          "This technique enhances the writing by..."
                        ].map((starter, index) => (
                          <div key={index} className="text-xs text-green-700 p-2 bg-green-50 rounded border border-green-200">
                            {starter}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
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