import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Play, Pause, SkipForward, Clock, Users, Target, Brain, BookOpen, CheckCircle2, ArrowLeft, ArrowRight, Eye, Settings, Timer, Volume2, VolumeX, Maximize2, Minimize2, ExternalLink } from 'lucide-react';
import { useTimetableStore } from '../store/timetableStore';
import { allEnhancedActivities } from '../data/enhancedLessonActivities';
import { MiniAssistant } from './MiniAssistant';
import { MidAssistant } from './MidAssistant';
import { LessonHeader } from './LessonHeader';

// Import interactive lesson components
import DystopianLesson1Starter from '../pages/lessons/DystopianLesson1Starter';
import DystopianLesson2Starter from '../pages/lessons/DystopianLesson2Starter';
import DystopianLesson3Starter from '../pages/lessons/DystopianLesson3Starter';
import DystopianLesson4Starter from '../pages/lessons/DystopianLesson4Starter';
import DystopianLesson5Starter from '../pages/lessons/DystopianLesson5Starter';
import DystopianLesson6Starter from '../pages/lessons/DystopianLesson6Starter';
import DystopianLesson1Main from '../pages/lessons/DystopianLesson1Main';
import DystopianLesson2Main from '../pages/lessons/DystopianLesson2Main';
import DystopianLesson3Main from '../pages/lessons/DystopianLesson3Main';
import DystopianLesson4Main from '../pages/lessons/DystopianLesson4Main';
import DystopianLesson1Plenary from '../pages/lessons/DystopianLesson1Plenary';
import DystopianLesson2Plenary from '../pages/lessons/DystopianLesson2Plenary';
import DystopianLesson3Plenary from '../pages/lessons/DystopianLesson3Plenary';
import DystopianLesson4Plenary from '../pages/lessons/DystopianLesson4Plenary';
import DystopianLesson5Plenary from '../pages/lessons/DystopianLesson5Plenary';
import DystopianLesson6Plenary from '../pages/lessons/DystopianLesson6Plenary';
import ThinkPairShareTwistPage from '../pages/lessons/ThinkPairShareTwistPage';
import WordAssociationSpeedGamePage from '../pages/lessons/WordAssociationSpeedGamePage';
import TwoMinutePerspectiveChallengePage from '../pages/lessons/TwoMinutePerspectiveChallengePage';
import PressConferenceSimulationPage from '../pages/lessons/PressConferenceSimulationPage';
import SocraticCircleReflectionPage from '../pages/lessons/SocraticCircleReflectionPage';
import CharacterConversationsPage from '../pages/lessons/CharacterConversationsPage';
import AlternativeEndingsPage from '../pages/lessons/AlternativeEndingsPage';
import CompareContrastPage from '../pages/lessons/CompareContrastPage';

interface LessonTeachingInterfaceProps {
  lesson: any;
  onClose: () => void;
}

export function LessonTeachingInterface({ lesson, onClose }: LessonTeachingInterfaceProps) {
  const navigate = useNavigate();
  
  // Function to get the appropriate interactive lesson component
  const getInteractiveLessonComponent = (lesson: any, phase: 'starter' | 'main' | 'plenary') => {
    // Check for dystopian lessons first
    if (lesson.theme === 'Dystopian Fiction' && lesson.activities?.[phase]) {
      const activityTitle = lesson.activities[phase].title.toLowerCase();
      
      // Dystopian Lesson 1
      if (activityTitle.includes('dystopian world discovery') || activityTitle.includes('future vision')) {
        if (phase === 'starter') return DystopianLesson1Starter;
        if (phase === 'main') return DystopianLesson1Main;
        if (phase === 'plenary') return DystopianLesson1Plenary;
      }
      
      // Dystopian Lesson 2
      if (activityTitle.includes('complete sentence') || activityTitle.includes('sentence foundation')) {
        if (phase === 'starter') return DystopianLesson2Starter;
        if (phase === 'main') return DystopianLesson2Main;
        if (phase === 'plenary') return DystopianLesson2Plenary;
      }
      
      // Dystopian Lesson 3
      if (activityTitle.includes('simple vs compound') || activityTitle.includes('sentence power')) {
        if (phase === 'starter') return DystopianLesson3Starter;
        if (phase === 'main') return DystopianLesson3Main;
        if (phase === 'plenary') return DystopianLesson3Plenary;
      }
      
      // Dystopian Lesson 4
      if (activityTitle.includes('complex sentence') || activityTitle.includes('sophistication')) {
        if (phase === 'starter') return DystopianLesson4Starter;
        if (phase === 'main') return DystopianLesson4Main;
        if (phase === 'plenary') return DystopianLesson4Plenary;
      }
      
      // Dystopian Lesson 5
      if (activityTitle.includes('personification') || activityTitle.includes('atmosphere')) {
        if (phase === 'starter') return DystopianLesson5Starter;
        if (phase === 'plenary') return DystopianLesson5Plenary;
      }
      
      // Dystopian Lesson 6
      if (activityTitle.includes('simile') || activityTitle.includes('impact analysis')) {
        if (phase === 'starter') return DystopianLesson6Starter;
        if (phase === 'plenary') return DystopianLesson6Plenary;
      }
    }
    
    // Check for general interactive activities
    if (lesson.activities?.[phase]) {
      const activityTitle = lesson.activities[phase].title.toLowerCase();
      
      if (activityTitle.includes('think-pair-share with a twist') || activityTitle.includes('think-pair-share')) {
        return ThinkPairShareTwistPage;
      }
      
      if (activityTitle.includes('word association')) {
        return WordAssociationSpeedGamePage;
      }
      
      if (activityTitle.includes('two minute perspective') || activityTitle.includes('perspective challenge')) {
        return TwoMinutePerspectiveChallengePage;
      }
      
      if (activityTitle.includes('press conference')) {
        return PressConferenceSimulationPage;
      }
      
      if (activityTitle.includes('socratic circle')) {
        return SocraticCircleReflectionPage;
      }
      
      if (activityTitle.includes('character conversations')) {
        return CharacterConversationsPage;
      }
      
      if (activityTitle.includes('alternative endings')) {
        return AlternativeEndingsPage;
      }
      
      if (activityTitle.includes('compare contrast') || activityTitle.includes('compare and contrast')) {
        return CompareContrastPage;
      }
    }
    
    return null;
  };

  // Check if this is a dystopian lesson that should use interactive pages
  useEffect(() => {
    if (lesson.theme === 'Dystopian Fiction') {
      const startingPhase = lesson.startingPhase || 'starter';
      
      // First try to route by activity title
      if (lesson.activities?.[startingPhase]) {
        const activityTitle = lesson.activities[startingPhase].title;
        
        if (activityTitle.includes('Dystopian World Discovery') || activityTitle.includes('Future Vision')) {
          navigate(`/lesson/dystopian-lesson-1/${startingPhase}`, { 
            state: { lesson },
            replace: true 
          });
          return;
        } else if (activityTitle.includes('Complete Sentence') || activityTitle.includes('Sentence Foundation')) {
          navigate(`/lesson/dystopian-lesson-2/${startingPhase}`, { 
            state: { lesson },
            replace: true 
          });
          return;
        } else if (activityTitle.includes('Simple vs Compound') || activityTitle.includes('Sentence Power')) {
          navigate(`/lesson/dystopian-lesson-3/${startingPhase}`, { 
            state: { lesson },
            replace: true 
          });
          return;
        } else if (activityTitle.includes('Complex Sentence') || activityTitle.includes('Sophistication')) {
          navigate(`/lesson/dystopian-lesson-4/${startingPhase}`, { 
            state: { lesson },
            replace: true 
          });
          return;
        } else if (activityTitle.includes('Personification') || activityTitle.includes('Atmosphere')) {
          navigate(`/lesson/dystopian-lesson-5/${startingPhase}`, { 
            state: { lesson },
            replace: true 
          });
          return;
        } else if (activityTitle.includes('Simile') || activityTitle.includes('Impact Analysis')) {
          navigate(`/lesson/dystopian-lesson-6/${startingPhase}`, { 
            state: { lesson },
            replace: true 
          });
          return;
        }
      }
      
      // If no activity title match, use week number
      if (lesson.week >= 1 && lesson.week <= 6) {
        navigate(`/lesson/dystopian-lesson-${lesson.week}/${startingPhase}`, { 
          state: { lesson },
          replace: true 
        });
        return;
      }
    }
  }, [lesson, navigate]);
  
  const [currentPhase, setCurrentPhase] = useState<'starter' | 'main' | 'plenary'>('starter');
  const [timer, setTimer] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [teacherNotes, setTeacherNotes] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [showInteractiveLesson, setShowInteractiveLesson] = useState(false);

  const phases = ['starter', 'main', 'plenary'] as const;
  const currentPhaseIndex = phases.indexOf(currentPhase);

  // Get current activity
  const getCurrentActivity = () => {
    const lessonActivity = lesson.activities?.[currentPhase];
    
    // If we have a basic lesson activity, try to enhance it with library content
    if (lessonActivity && lesson.theme === 'Dystopian Fiction') {
      // Find matching enhanced activity from the library
      const enhancedActivity = allEnhancedActivities.find(activity => 
        activity.activity_type === currentPhase &&
        activity.subject === lesson.subject &&
        activity.year_group === lesson.yearGroup &&
        (activity.title === lessonActivity.title || 
         activity.description.includes(lessonActivity.title) ||
         lessonActivity.title.includes(activity.title))
      );
      
      if (enhancedActivity) {
        return {
          ...lessonActivity,
          ...enhancedActivity,
          // Preserve original lesson activity properties
          id: lessonActivity.id || enhancedActivity.id
        };
      }
    }
    
    return lessonActivity;
  };

  const currentActivity = getCurrentActivity();

  // Timer functions
  const startTimer = (minutes: number) => {
    setTimer(minutes * 60);
    setIsTimerRunning(true);
    
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev === null || prev <= 1) {
          setIsTimerRunning(false);
          clearInterval(interval);
          if (soundEnabled) {
            // Play notification sound
            try {
              const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
              audio.play().catch(() => {}); // Ignore errors if audio fails
            } catch (e) {
              // Ignore audio errors
            }
          }
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

  // Function to launch interactive lesson
  const launchInteractiveLesson = () => {
    const InteractiveComponent = getInteractiveLessonComponent(lesson, currentPhase);
    if (InteractiveComponent) {
      setShowInteractiveLesson(true);
    } else {
      // Fallback to navigation if no interactive component
      const route = getInteractiveLessonRoute(lesson, currentPhase);
      if (route) navigate(route, { state: { lesson } });
    }
  };

  // Navigation functions
  const goToNextPhase = () => {
    if (currentPhaseIndex < phases.length - 1) {
      setCurrentPhase(phases[currentPhaseIndex + 1]);
      setTimer(null);
      setIsTimerRunning(false);
      setCurrentStep(0);
    }
  };

  const goToPreviousPhase = () => {
    if (currentPhaseIndex > 0) {
      setCurrentPhase(phases[currentPhaseIndex - 1]);
      setTimer(null);
      setIsTimerRunning(false);
      setCurrentStep(0);
    }
  };

  // Get phase-specific content
  const getPhaseContent = () => {
    if (!currentActivity) {
      return {
        title: 'No Activity Planned',
        description: 'This phase has not been planned yet.',
        duration: '0 mins',
        steps: [],
        tips: [],
        materials: [],
        assessment: []
      };
    }

    // Use enhanced activity details if available
    if (currentActivity.details) {
      return {
        title: currentActivity.title,
        description: currentActivity.description,
        duration: currentActivity.duration,
        steps: currentActivity.details.steps || [],
        tips: currentActivity.details.tips || [],
        materials: ['Activity resources', 'Visual aids', 'Discussion prompts'],
        assessment: currentActivity.details.assessment || [],
        answers: currentActivity.details.answers || {},
        preparation: currentActivity.details.preparation || []
      };
    }

    // Fallback to theme-based content for basic activities
    if (lesson.theme === 'Dystopian Fiction') {
      if (currentPhase === 'starter') {
        return {
          title: currentActivity.title,
          description: currentActivity.description,
          duration: currentActivity.duration,
          steps: [
            'Introduce the dystopian scenario: "Imagine you wake up and the world has changed..."',
            'Present the Think-Pair-Share questions about control and resistance',
            'Guide students through 2-minute individual thinking time',
            'Facilitate 3-minute pair discussions',
            'Lead 5-minute whole-class sharing and synthesis'
          ],
          tips: [
            'Use dramatic tone when presenting the scenario',
            'Give students time to process the dystopian concepts',
            'Encourage connections to real-world examples',
            'Build on student responses to deepen understanding'
          ],
          materials: ['Dystopian scenario text', 'Think-Pair-Share questions', 'Timer for phases'],
          assessment: ['Monitor engagement in discussion', 'Assess understanding of dystopian concepts'],
          answers: {
            'Would you accept the rules or resist them?': 'This explores personal values and moral courage. Consider factors like fear, family safety, hope for change, or moral conviction.',
            'What would be the first sign that something was wrong?': 'Early signs might include communication restrictions, media changes, increased surveillance, or disappearance of people/ideas.',
            'Find an example in real life where people accept restrictions for "safety"?': 'Examples include airport security, pandemic measures, internet censorship, or surveillance systems.',
            'Is the protagonist aware of the control, or have they normalised it?': 'This explores whether characters recognize oppression or have become so accustomed that it seems normal.'
          }
        };
      } else if (currentPhase === 'main') {
        return {
          title: currentActivity.title,
          description: currentActivity.description,
          duration: currentActivity.duration,
          steps: [
            'Introduce the world-building framework and control mechanisms',
            'Guide students through control mechanism selection (surveillance, propaganda, etc.)',
            'Support character development process with templates',
            'Facilitate narrative tension creation through conflict scenarios',
            'Provide ongoing feedback and guidance throughout writing process'
          ],
          tips: [
            'Encourage creative but logical world-building',
            'Help students balance description with action',
            'Support struggling writers with sentence starters',
            'Challenge advanced students with complex scenarios'
          ],
          materials: ['World-building templates', 'Character development guides', 'Control mechanism cards', 'Writing prompts'],
          assessment: ['Monitor creative writing progress', 'Assess use of dystopian conventions', 'Evaluate character development'],
          answers: {
            'Modelled Example': 'The city stretched endlessly beneath a sky of perpetual twilight. Towering screens flickered with approved messages...',
            'Sentence Starters': 'Above the city, the sky... Through the streets, the people... In every window, screens displayed...'
          }
        };
      } else {
        return {
          title: currentActivity.title,
          description: currentActivity.description,
          duration: currentActivity.duration,
          steps: [
            'Present the model dystopian text for analysis',
            'Guide analysis of descriptive techniques (atmosphere, control, tension)',
            'Facilitate identification of success criteria evidence in the text',
            'Lead reflection on learning progress and technique mastery',
            'Connect to future learning goals and next lesson preview'
          ],
          tips: [
            'Use the text to reinforce key techniques learned',
            'Encourage specific textual evidence in responses',
            'Help students articulate their learning journey',
            'Build excitement for future lessons and applications'
          ],
          materials: ['Model dystopian text', 'Success criteria checklist', 'Analysis framework', 'Reflection prompts'],
          assessment: ['Assess understanding of descriptive techniques', 'Evaluate quality of textual analysis', 'Monitor reflection depth'],
          answers: {
            'Atmosphere': 'Perpetual twilight, artificial scent, cold metal create unsettling mood',
            'Control': 'Mandatory identification band, synchronized movement show oppression',
            'Tension': 'Contrast between polished surfaces and underlying decay builds unease'
          }
        };
      }
    }

    // Default content for other themes
    return {
      title: currentActivity.title,
      description: currentActivity.description,
      duration: currentActivity.duration,
      steps: [
        'Introduce the activity objectives clearly',
        'Guide students through the main tasks step by step',
        'Facilitate discussion and collaboration opportunities',
        'Provide differentiated support and feedback',
        'Consolidate learning outcomes and key takeaways'
      ],
      tips: [
        'Maintain clear focus on learning objectives',
        'Encourage active participation from all students',
        'Provide differentiated support based on needs',
        'Monitor progress and adjust pace as needed'
      ],
      materials: ['Activity resources', 'Support materials', 'Assessment tools'],
      assessment: ['Monitor student engagement', 'Assess progress toward learning objectives'],
      answers: {}
    };
  };

  // Function to get interactive lesson route (fallback)
  const getInteractiveLessonRoute = (lesson: any, phase: 'starter' | 'main' | 'plenary') => {
    if (lesson.theme === 'Dystopian Fiction' && lesson.week >= 1 && lesson.week <= 6) {
      return `/lesson/dystopian-lesson-${lesson.week}/${phase}`;
    }
    return null;
  };

  // Check if interactive lesson is available
  const hasInteractiveLesson = () => {
    return getInteractiveLessonComponent(lesson, currentPhase) !== null;
  };

  const phaseContent = getPhaseContent();

  const getPhaseIcon = (phase: 'starter' | 'main' | 'plenary') => {
    switch (phase) {
      case 'starter': return <Brain className="w-5 h-5" />;
      case 'main': return <BookOpen className="w-5 h-5" />;
      case 'plenary': return <CheckCircle2 className="w-5 h-5" />;
    }
  };

  const getPhaseColor = (phase: 'starter' | 'main' | 'plenary') => {
    switch (phase) {
      case 'starter': return 'from-blue-500 to-blue-600';
      case 'main': return 'from-amber-500 to-amber-600';
      case 'plenary': return 'from-green-500 to-green-600';
    }
  };

  const getPhaseTextColor = (phase: 'starter' | 'main' | 'plenary') => {
    switch (phase) {
      case 'starter': return 'text-blue-600';
      case 'main': return 'text-amber-600';
      case 'plenary': return 'text-green-600';
    }
  };

  // Render interactive lesson if requested
  if (showInteractiveLesson) {
    const InteractiveComponent = getInteractiveLessonComponent(lesson, currentPhase);
    if (InteractiveComponent) {
      return <InteractiveComponent />;
    }
    setShowInteractiveLesson(false); // Reset if component not found
  }

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50' : ''} bg-white flex flex-col`}>
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Teaching: {lesson.subject}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>{lesson.yearGroup} Class {lesson.class}</span>
                {lesson.theme && <span>• {lesson.theme}</span>}
                <span>• {lesson.day} {lesson.startTime}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Timer Controls */}
            <div className="flex items-center gap-2">
              {timer !== null && (
                <div className={`px-4 py-2 rounded-lg font-bold text-lg ${
                  timer > 300 ? 'bg-green-100 text-green-700' :
                  timer > 120 ? 'bg-amber-100 text-amber-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {formatTime(timer)}
                </div>
              )}
              <button
                onClick={() => isTimerRunning ? stopTimer() : startTimer(parseInt(currentActivity?.duration) || 10)}
                className={`p-2 rounded-lg transition-colors ${
                  isTimerRunning ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                }`}
              >
                {isTimerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg transition-colors ${
                soundEnabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setShowNotes(!showNotes)}
              className={`p-2 rounded-lg transition-colors ${
                showNotes ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              <span>{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
            </button>
            {hasInteractiveLesson() && (
              <button
                onClick={launchInteractiveLesson}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Interactive Lesson</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <div className={`${showNotes ? 'flex-1' : 'w-full'} p-6 overflow-y-auto`}>
          {/* Learning Objectives */}
          {lesson.objectives && lesson.objectives.length > 0 && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-blue-800">Learning Objectives</h2>
              </div>
              <div className="space-y-2">
                {lesson.objectives.map((objective: any) => (
                  <div key={objective.id} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                    <div>
                      <span className="font-medium text-blue-800">{objective.code}: </span>
                      <span className="text-blue-700">{objective.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Phase Navigation */}
          <div className="mb-6 flex justify-center">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {phases.map((phase) => (
                <button
                  key={phase}
                  onClick={() => setCurrentPhase(phase)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                    currentPhase === phase
                      ? `bg-gradient-to-r ${getPhaseColor(phase)} text-white shadow-lg transform scale-105`
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  disabled={!lesson.activities?.[phase]}
                  title={!lesson.activities?.[phase] ? `No ${phase} activity planned` : `Switch to ${phase} phase`}
                >
                  {getPhaseIcon(phase)}
                  <span className="capitalize">{phase}</span>
                  <span className="text-sm">({lesson.activities?.[phase]?.duration || 'Not planned'})</span>
                  {hasInteractiveLesson() && lesson.activities?.[phase] && (
                    <ExternalLink className="w-3 h-3 ml-1" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Current Activity Content */}
          {currentActivity ? (
            <div className="space-y-6">
              {/* Interactive Lesson Banner */}
              {hasInteractiveLesson() && (
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <ExternalLink className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-blue-800 font-medium">Interactive lesson available for this activity</span>
                  </div>
                  <button
                    onClick={launchInteractiveLesson}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <span>Launch Interactive Lesson</span>
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Activity Header */}
              <div className={`p-6 bg-gradient-to-r ${getPhaseColor(currentPhase)} text-white rounded-lg shadow-lg`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getPhaseIcon(currentPhase)}
                    <div>
                      <h2 className="text-2xl font-bold">{phaseContent.title}</h2>
                      <p className="text-white/90">{phaseContent.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{phaseContent.duration}</div>
                    <div className="text-sm text-white/80">Duration</div>
                    {hasInteractiveLesson() && (
                      <div className="text-xs text-white/60 mt-1">Interactive version available</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Teaching Steps */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="font-bold text-gray-600">{currentStep + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Teaching Steps</h3>
                </div>
                <div className="space-y-4">
                  {phaseContent.steps.map((step, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentStep(index)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                        currentStep === index
                          ? `border-${currentPhase === 'starter' ? 'blue' : currentPhase === 'main' ? 'amber' : 'green'}-500 bg-${currentPhase === 'starter' ? 'blue' : currentPhase === 'main' ? 'amber' : 'green'}-50`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                            currentStep === index
                              ? `bg-${currentPhase === 'starter' ? 'blue' : currentPhase === 'main' ? 'amber' : 'green'}-500`
                              : 'bg-gray-400'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="text-gray-800">{step}</span>
                        </div>
                        {phaseContent.answers && Object.keys(phaseContent.answers).some(key => step.includes(key.split(' ')[0])) && (
                          <MiniAssistant 
                            answer={Object.entries(phaseContent.answers).find(([key]) => 
                              step.toLowerCase().includes(key.toLowerCase().split(' ')[0])
                            )?.[1] || 'Teaching guidance available for this step.'}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prior Knowledge Section */}
              {phaseContent.preparation && phaseContent.preparation.length > 0 && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Brain className="w-4 h-4 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Prior Knowledge</h3>
                  </div>
                  <ul className="space-y-2">
                    {phaseContent.preparation.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Teaching Tips */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Eye className="w-4 h-4 text-amber-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Teaching Tips</h3>
                  </div>
                  <ul className="space-y-2">
                    {phaseContent.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full mt-2" />
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Target className="w-4 h-4 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Assessment Focus</h3>
                  </div>
                  <ul className="space-y-2">
                    {phaseContent.assessment.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Materials Needed */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">Materials Needed</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {phaseContent.materials.map((material, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {material}
                    </span>
                  ))}
                </div>
              </div>

              {/* Enhanced Content Display */}
              {currentActivity.unit_context && (
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Unit Context</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-indigo-800 mb-1">{currentActivity.unit_context.title}</h4>
                      <p className="text-sm text-indigo-700">{currentActivity.unit_context.overview}</p>
                    </div>
                    {currentActivity.phase && (
                      <div>
                        <h5 className="text-sm font-medium text-indigo-800 mb-1">Lesson Phase:</h5>
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">
                          {currentActivity.phase}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Keywords and Success Criteria */}
              {(currentActivity.keywords || currentActivity.details?.success_criteria) && (
                <div className="grid grid-cols-2 gap-6">
                  {currentActivity.keywords && (
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-cyan-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Key Vocabulary</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {currentActivity.keywords.map((keyword, index) => (
                          <span key={index} className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-sm">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {currentActivity.details?.success_criteria && (
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <Target className="w-4 h-4 text-green-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">Success Criteria</h3>
                      </div>
                      <ul className="space-y-2">
                        {currentActivity.details.success_criteria.map((criteria, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                            <span className="text-gray-700">{criteria}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No {currentPhase} activity planned</h3>
                <p className="text-gray-500">This lesson phase needs to be planned before teaching.</p>
                <button
                  onClick={() => navigate('/resources')}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Plan This Lesson
                </button>
              </div>
            </div>
          )}

          {/* Phase Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={goToPreviousPhase}
              disabled={currentPhaseIndex === 0}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Phase</span>
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                Phase {currentPhaseIndex + 1} of {phases.length}
              </span>
            </div>

            <button
              onClick={goToNextPhase}
              disabled={currentPhaseIndex === phases.length - 1}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Next Phase</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Teacher Notes Panel */}
        {showNotes && (
          <div className="w-80 bg-gray-50 border-l border-gray-200 p-4 overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Teacher Notes</h3>
            <textarea
              value={teacherNotes}
              onChange={(e) => setTeacherNotes(e.target.value)}
              className="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Add your teaching notes, observations, and reflections here..."
            />
            
            {/* Quick Actions */}
            <div className="mt-4 space-y-2">
              <button
                onClick={() => navigate('/assess')}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Quick Assessment
              </button>
              <button
                onClick={() => navigate('/resources')}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Lesson
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}