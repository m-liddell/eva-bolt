import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Clock, Users, Target, Brain, BookOpen, CheckCircle2, Eye, ExternalLink, ChevronLeft, ChevronRight, Edit2, Calendar } from 'lucide-react';
import { MiniAssistant } from './MiniAssistant';

interface LessonDetailViewProps {
  lessons: any[];
  onClose: () => void;
  subjectWeek: {
    subject: string;
    yearGroup: string;
    class: string;
  };
  currentWeek: number;
}

export function LessonDetailView({ lessons, onClose, subjectWeek, currentWeek }: LessonDetailViewProps) {
  const navigate = useNavigate();
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentActivity, setCurrentActivity] = useState<'starter' | 'main' | 'plenary'>('starter');

  const currentLesson = lessons[currentLessonIndex] || lessons[0];

  const getActivityIcon = (type: 'starter' | 'main' | 'plenary') => {
    switch (type) {
      case 'starter': return <Brain className="w-5 h-5 text-blue-600" />;
      case 'main': return <BookOpen className="w-5 h-5 text-amber-600" />;
      case 'plenary': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    }
  };

  const getActivityColor = (type: 'starter' | 'main' | 'plenary') => {
    switch (type) {
      case 'starter': return 'border-l-blue-500 bg-blue-50';
      case 'main': return 'border-l-amber-500 bg-amber-50';
      case 'plenary': return 'border-l-green-500 bg-green-50';
    }
  };

  const getDialogicColor = (structure: string) => {
    switch (structure) {
      case 'Discussion': return 'bg-blue-100 text-blue-700';
      case 'Think-Pair-Share': return 'bg-cyan-100 text-cyan-700';
      case 'Collaborative Problem Solving': return 'bg-indigo-100 text-indigo-700';
      case 'Role Play': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const period = Number(hours) >= 12 ? 'PM' : 'AM';
    const displayHours = Number(hours) > 12 ? Number(hours) - 12 : Number(hours);
    return `${displayHours}:${minutes} ${period}`;
  };

  const getActivityDetails = (activityType: 'starter' | 'main' | 'plenary') => {
    if (currentLesson?.theme === 'Dystopian Fiction') {
      if (activityType === 'starter') {
        return {
          preparation: [
            'You have studied dystopian literature like 1984 and The Hunger Games.',
            'You have explored narrative techniques in GCSE English Language Paper 1.'
          ],
          steps: [
            'Imagine you wake up and the world has changed. There are no more conversations—only silence. Every street light has a built-in scanner, tracking your every move. Books, films, and news reports have been rewritten to match the government\'s version of reality. You don\'t remember when it started, but you know one thing for sure: no one questions the rules. No one speaks out. Because words are dangerous.',
            'Think-Pair-Share:',
            'Would you accept the rules or resist them?',
            'What would be the first sign that something was wrong?',
            'Find an example in real life where people accept restrictions for "safety"?',
            'Is the protagonist aware of the control, or have they normalised it?'
          ],
          tips: [
            'Guide students to consider real-world parallels',
            'Encourage critical thinking about control mechanisms',
            'Support development of descriptive language',
            'Facilitate discussion of narrative perspective'
          ],
          differentiation: [
            'Provide vocabulary banks for atmosphere and control',
            'Offer sentence starters for less confident writers',
            'Use visual prompts for inspiration',
            'Support EAL students with key vocabulary pre-teaching'
          ],
          assessment: [
            'Monitor engagement in discussion',
            'Assess understanding of dystopian conventions',
            'Evaluate quality of analytical responses',
            'Track development of creative writing skills'
          ]
        };
      } else if (activityType === 'main') {
        return {
          preparation: [
            'Students have analyzed example dystopian openings',
            'Understanding of descriptive techniques demonstrated',
            'Knowledge of narrative devices applied'
          ],
          steps: [
            'As a class we are going to co-construct a new dystopian opening using the model structure. Let\'s start by setting the scene. What does this world look like? Describe the environment. What ideas could we start with?',
            'Modelled Example',
            'Click the assistant to reveal the example and analysis.',
            'Sentence Starters',
            'Click the assistant to reveal sentence starters and tips.'
          ],
          tips: [
            'Guide students to use specific descriptive techniques',
            'Encourage varied sentence structures',
            'Support development of atmospheric writing',
            'Facilitate collaborative story development'
          ],
          differentiation: [
            'Provide vocabulary banks for description',
            'Use scaffolded writing frames',
            'Offer sentence starters for support',
            'Challenge advanced students with complex techniques'
          ],
          assessment: [
            'Monitor use of descriptive devices',
            'Assess effectiveness of tension building',
            'Evaluate atmosphere creation',
            'Track development of writing skills'
          ]
        };
      } else {
        return {
          preparation: [
            'Students have analyzed a dystopian story opening',
            'Understanding of descriptive techniques demonstrated',
            'Knowledge of narrative devices applied'
          ],
          steps: [
            'Now, let\'s review a dystopian opening and identify evidence that meets our success criteria.',
            'The city stretched endlessly beneath a sky of perpetual twilight. Towering screens flickered with approved messages, their harsh light reflecting off the polished surfaces of identical buildings. Sarah\'s fingers traced the edge of her mandatory identification band, its cold metal a constant reminder of her captivity. The air carried the artificial scent of sanitization, masking the underlying decay. In the streets below, people moved in perfect synchronization, their footsteps echoing in haunting unison.',
            'Click each category to highlight examples:'
          ],
          tips: [
            'Guide students to use specific textual evidence',
            'Encourage analysis of language choices',
            'Support identification of literary devices',
            'Promote discussion of writer\'s craft'
          ],
          differentiation: [
            'Provide terminology banks for literary analysis',
            'Use scaffolded response frameworks',
            'Offer sentence starters for analysis',
            'Challenge advanced students to compare techniques'
          ],
          assessment: [
            'Monitor use of literary terminology',
            'Assess depth of textual analysis',
            'Evaluate understanding of writer\'s techniques',
            'Track development of analytical skills'
          ]
        };
      }
    } else if (currentLesson?.subject === 'Science') {
      if (activityType === 'starter') {
        return {
          preparation: [
            'You have studied potential and kinetic energy.',
            'You understand the principle of energy conservation.',
            'You can perform basic calculations with equations.'
          ],
          steps: [
            'Imagine a spacecraft re-entering Earth\'s atmosphere. If it comes in at the wrong angle, it could bounce off the atmosphere like a skipping stone on water. But if the angle and energy transfer are controlled, it can land safely. Could we do the same thing with a ball? Can we predict and control how high it will bounce using science?',
            'Think-Pair-Share:',
            '• How is bouncing a ball similar to how spacecraft move in space?',
            '• What happens if energy isn\'t transferred correctly?',
            '• How could engineers use energy transfer to make space travel more efficient?',
            '• How can we use physics to predict and control energy transfer between objects?'
          ],
          tips: [
            'Guide students to connect everyday experiences with scientific principles',
            'Encourage use of scientific terminology in discussions',
            'Support development of prediction and reasoning skills',
            'Facilitate connections between theory and real-world applications'
          ],
          differentiation: [
            'Provide visual diagrams for energy transfer concepts',
            'Offer scaffolded equations for calculations',
            'Use physical demonstrations for kinetic concepts',
            'Support EAL students with key physics vocabulary'
          ],
          assessment: [
            'Monitor understanding of energy conservation principles',
            'Assess ability to apply concepts to real situations',
            'Evaluate use of scientific terminology',
            'Track development of analytical thinking skills'
          ]
        };
      } else if (activityType === 'main') {
        return {
          preparation: [
            'You have studied potential and kinetic energy.',
            'You understand the principle of energy conservation.',
            'You can perform basic calculations with equations.'
          ],
          steps: [
            'Energy is one of the most fundamental concepts in science—it powers everything around us, from the movement of objects to the technology we use every day.',
            'Practical Investigation:',
            '• Set up the stacked ball drop experiment',
            '• Measure and record initial heights and masses',
            '• Drop balls individually and together',
            '• Calculate energy transfer efficiency',
            '• Compare theoretical predictions with actual results'
          ],
          tips: [
            'Guide students through systematic investigation',
            'Encourage precise measurements and calculations',
            'Promote discussion of real-world applications',
            'Support development of mathematical modeling skills'
          ],
          differentiation: [
            'Provide scaffolded calculation worksheets',
            'Offer visual aids for complex concepts',
            'Use step-by-step guides for practical work',
            'Include extension tasks for advanced students'
          ],
          assessment: [
            'Monitor accuracy of measurements and calculations',
            'Assess understanding of energy conservation principles',
            'Evaluate ability to link theory to practical applications',
            'Track development of investigative skills'
          ]
        };
      } else {
        return {
          preparation: [
            'Students have completed the stacked ball drop experiment',
            'Data has been collected and calculations performed',
            'Understanding of energy transfer principles demonstrated'
          ],
          steps: [
            'Let\'s evaluate our findings and understand what we\'ve learned about energy transfer.',
            'Small Group Discussion:',
            '• Compare your experimental results to the theoretical height predicted by the equation',
            '• What factors caused energy loss?',
            '• How could we make the experiment more accurate?',
            '• Did your ping pong ball reach the height you expected? Why or why not?',
            '• What role did the mass ratio (M/m) play in your results?'
          ],
          tips: [
            'Encourage students to use scientific terminology',
            'Guide discussion towards energy conservation principles',
            'Promote comparison between theoretical and practical results',
            'Support development of analytical thinking skills'
          ],
          differentiation: [
            'Provide writing frames for less confident students',
            'Use visual aids to support explanations',
            'Offer sentence starters for key concepts',
            'Challenge advanced students to consider real-world applications'
          ],
          assessment: [
            'Monitor use of scientific vocabulary',
            'Assess understanding of energy transfer principles',
            'Evaluate ability to explain discrepancies',
            'Track development of analytical skills'
          ]
        };
      }
    } else if (currentLesson?.subject === 'History') {
      if (activityType === 'starter') {
        return {
          preparation: [
            'Knowledge of key events and changes during the Industrial Revolution',
            'Understanding of Victorian society and class structure',
            'Familiarity with working conditions in factories',
            'Basic knowledge of technological advancements of the period'
          ],
          steps: [
            'Step back in time to 1840. The air is thick with coal smoke, and the rhythmic pounding of steam engines echoes through the streets. Factory chimneys dominate the skyline, while workers stream into the mills at dawn.',
            'Think-Pair-Share:',
            '• How did the Industrial Revolution affect different social classes differently?',
            '• Why might factory owners and workers have such opposing views?',
            '• Which perspective do you think is most commonly represented in historical accounts?',
            '• How can we ensure we consider all viewpoints when studying historical changes?'
          ],
          tips: [
            'Guide students to recognise bias in historical accounts',
            'Encourage empathy with different historical perspectives',
            'Support analysis of social and economic factors',
            'Facilitate discussion of contemporary parallels'
          ],
          differentiation: [
            'Provide role cards with additional character details',
            'Offer writing frames for structured responses',
            'Use visual aids to illustrate working conditions',
            'Support EAL students with key vocabulary pre-teaching'
          ],
          assessment: [
            'Monitor understanding of multiple perspectives',
            'Assess ability to empathise with historical figures',
            'Evaluate quality of analytical responses',
            'Track development of historical thinking skills'
          ]
        };
      } else if (activityType === 'main') {
        return {
          preparation: [
            'Understanding of Industrial Revolution timeline.',
            'Knowledge of key technological innovations.',
            'Familiarity with Victorian social structure.',
            'Basic research and analysis skills.'
          ],
          steps: [
            'The Industrial Revolution transformed Britain\'s landscape, society, and economy. Through examining primary sources and different perspectives, we\'ll understand how these changes affected people\'s lives.',
            'Group Investigation Tasks:',
            '• Analyze factory inspection reports and worker testimonies',
            '• Compare living conditions before and after industrialization',
            '• Examine technological innovations and their impacts',
            '• Evaluate arguments for and against mechanization'
          ],
          tips: [
            'Guide source analysis with structured questions',
            'Encourage comparison of different perspectives',
            'Support evidence-based arguments',
            'Facilitate connections to modern issues'
          ],
          differentiation: [
            'Provide simplified versions of primary sources',
            'Use visual aids and diagrams',
            'Offer writing frames for analysis',
            'Include extension tasks for advanced students'
          ],
          assessment: [
            'Monitor source analysis skills',
            'Assess understanding of multiple perspectives',
            'Evaluate use of historical evidence',
            'Track development of analytical thinking'
          ]
        };
      } else {
        return {
          preparation: [
            'Students have analyzed primary sources',
            'Understanding of multiple perspectives demonstrated',
            'Knowledge of social and economic impacts applied'
          ],
          steps: [
            'Let\'s evaluate the long-term impacts of the Industrial Revolution on British society.',
            'Discussion Questions:',
            '• Which changes had the most lasting impact on society?',
            '• How do the perspectives we studied help us understand this period?',
            '• What lessons can we learn for understanding modern technological change?',
            '• How do these historical changes connect to issues we face today?'
          ],
          tips: [
            'Encourage synthesis of different perspectives',
            'Guide students to make historical connections',
            'Support development of evaluative thinking',
            'Facilitate discussion of contemporary relevance'
          ],
          differentiation: [
            'Provide structured evaluation frameworks',
            'Use visual timelines for complex concepts',
            'Offer sentence starters for conclusions',
            'Challenge advanced students with comparative analysis'
          ],
          assessment: [
            'Monitor quality of evaluative responses',
            'Assess ability to synthesize multiple perspectives',
            'Evaluate understanding of historical significance',
            'Track development of critical thinking skills'
          ]
        };
      }
    }

    // Default fallback for other subjects
    return {
      preparation: [
        'Students have prior knowledge of the topic',
        'Understanding of key concepts demonstrated',
        'Familiarity with discussion protocols'
      ],
      steps: [
        'Introduce the activity with engaging context',
        'Guide students through the main task',
        'Facilitate discussion and reflection',
        'Connect learning to real-world applications'
      ],
      tips: [
        'Encourage active participation',
        'Use questioning to deepen understanding',
        'Monitor student engagement',
        'Provide clear instructions and expectations'
      ],
      differentiation: [
        'Provide support for less confident students',
        'Offer extension activities for advanced learners',
        'Use varied teaching approaches',
        'Include visual and kinesthetic elements'
      ],
      assessment: [
        'Monitor student responses',
        'Assess understanding through discussion',
        'Track progress against learning objectives',
        'Use formative assessment strategies'
      ]
    };
  };

  const getStudentActivity = (activityType: 'starter' | 'main' | 'plenary') => {
    if (currentLesson?.theme === 'Dystopian Fiction') {
      if (activityType === 'starter') {
        return 'Students engage in Think-Pair-Share discussion about dystopian scenarios, exploring themes of control and resistance. They consider real-world parallels and develop vocabulary for describing oppressive societies.';
      } else if (activityType === 'main') {
        return 'Students collaborate to co-construct a dystopian story opening, contributing ideas for world-building and practicing descriptive writing techniques. They work together to develop atmospheric writing and narrative structure.';
      } else {
        return 'Students analyze a model dystopian text, identifying evidence of effective techniques. They evaluate how descriptive devices create atmosphere and reflect on their own learning progress.';
      }
    } else if (currentLesson?.subject === 'Science') {
      if (activityType === 'starter') {
        return 'Students engage in discussion about energy transfer in real-world contexts, making connections between everyday experiences and scientific principles. They explore applications in space exploration and engineering.';
      } else if (activityType === 'main') {
        return 'Students conduct practical investigation of energy transfer using the stacked ball drop experiment. They measure, calculate, and analyze data to understand energy conservation principles.';
      } else {
        return 'Students evaluate their experimental findings, compare results with theoretical predictions, and discuss factors affecting energy transfer efficiency in real-world applications.';
      }
    } else if (currentLesson?.subject === 'History') {
      if (activityType === 'starter') {
        return 'Students explore different historical perspectives on the Industrial Revolution, considering how social class affected people\'s experiences and viewpoints during this period of change.';
      } else if (activityType === 'main') {
        return 'Students work in groups to analyze primary sources, examining factory reports, worker testimonies, and technological innovations to understand the varied impacts of industrialization.';
      } else {
        return 'Students evaluate the long-term impacts of the Industrial Revolution, synthesizing different perspectives and making connections to modern technological and social changes.';
      }
    }

    // Default student activities
    switch (activityType) {
      case 'starter':
        return 'Engage in opening discussion, share prior knowledge, and prepare for main learning through collaborative exploration of key concepts.';
      case 'main':
        return 'Complete core learning tasks, work individually or in groups to develop new skills, and apply knowledge through structured activities.';
      case 'plenary':
        return 'Reflect on learning, consolidate understanding, demonstrate knowledge gained, and connect to future learning goals.';
    }
  };

  const currentActivityDetails = getActivityDetails(currentActivity);
  const currentActivityData = currentLesson?.activities?.[currentActivity];

  const handleViewClassroomLesson = () => {
    // Navigate to the classroom-ready lesson based on activity type and current lesson data
    if (currentActivity === 'starter') {
      if (currentActivityData?.title === "Kick-Off") {
        navigate('/lesson/kick-off');
      } else if (currentActivityData?.title === "Dystopian Story Opening" || currentActivityData?.title === "Dystopian World Think-Pair-Share") {
        navigate('/lesson/dystopian/starter');
      } else if (currentLesson?.subject === 'History') {
        // Could add specific history lesson routes here
        alert('Classroom-ready lesson view coming soon for History lessons.');
      } else {
        alert('Classroom-ready lesson view coming soon for this activity type.');
      }
    } else if (currentActivity === 'main') {
      if (currentActivityData?.title === "Dystopian World Building") {
        navigate('/lesson/dystopian-writing');
      } else {
        alert('Classroom-ready lesson view coming soon for this activity type.');
      }
    } else if (currentActivity === 'plenary') {
      if (currentActivityData?.title === "Reflection of My Dystopian World") {
        navigate('/lesson/dystopian/plenary');
      } else {
        alert('Classroom-ready lesson view coming soon for this activity type.');
      }
    }
  };

  const handleEditActivity = () => {
    // Handle editing the current activity
    alert(`Edit functionality for "${currentActivityData?.title || currentActivity + ' activity'}" coming soon.`);
  };

  const handleStartLesson = () => {
    // Get the lesson from the lessons array (use first lesson as representative)
    const lessonToTeach = lessons[0];
    if (lessonToTeach) {
      navigate('/teach/lesson', { 
        state: { 
          lesson: {
            ...lessonToTeach,
            startingPhase: currentActivity
          }
        } 
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {subjectWeek.subject} - Week {currentWeek} Lesson Details
            </h2>
            <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{subjectWeek.yearGroup} Class {subjectWeek.class}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>Lesson {currentLessonIndex + 1} of {lessons.length}</span>
              </div>
              {currentLesson?.theme && (
                <div className="px-2 py-1 bg-[#FFF9E7] text-[#B17F17] rounded text-xs">
                  {currentLesson.theme}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Learning Objectives */}
          {currentLesson?.objectives && currentLesson.objectives.length > 0 && (
            <div className="mb-6 p-4 bg-[#F0FFF7] border border-[#00875A] rounded-lg">
              <h3 className="font-medium text-[#00875A] mb-3 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Learning Objectives
              </h3>
              <div className="space-y-2">
                {currentLesson.objectives.map((objective: any) => (
                  <div key={objective.id} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00875A] mt-2" />
                    <div>
                      <span className="font-medium text-[#00875A] text-sm">{objective.code}: </span>
                      <span className="text-sm text-[#00875A]">{objective.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity Type Selector */}
          <div className="flex border-b border-gray-200 mb-6">
            {(['starter', 'main', 'plenary'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setCurrentActivity(type)}
                className={`px-6 py-3 font-medium text-sm capitalize ${
                  currentActivity === type
                    ? type === 'starter' ? 'text-blue-600 border-b-2 border-blue-600'
                      : type === 'main' ? 'text-amber-600 border-b-2 border-amber-600'
                      : 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {type} Activity
              </button>
            ))}
          </div>

          {/* Activity Content */}
          {currentActivityData ? (
            <div className="space-y-6">
              {/* Activity Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    currentActivity === 'starter' ? 'bg-blue-100' : 
                    currentActivity === 'main' ? 'bg-amber-100' : 
                    'bg-green-100'
                  }`}>
                    {getActivityIcon(currentActivity)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{currentActivityData.title}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{currentActivityData.duration}</span>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDialogicColor('Think-Pair-Share')}`}>
                        Think-Pair-Share
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleStartLesson}
                    className={`px-4 py-2 rounded-lg text-white flex items-center gap-2 ${
                      currentActivity === 'starter' ? 'bg-blue-600 hover:bg-blue-700' : 
                      currentActivity === 'main' ? 'bg-amber-600 hover:bg-amber-700' : 
                      'bg-green-600 hover:bg-green-700'
                    } transition-colors`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Start Activity</span>
                  </button>
                  <button
                    onClick={handleViewClassroomLesson}
                    className={`px-4 py-2 rounded-lg border-2 flex items-center gap-2 ${
                      currentActivity === 'starter' ? 'border-blue-600 text-blue-600 hover:bg-blue-50' : 
                      currentActivity === 'main' ? 'border-amber-600 text-amber-600 hover:bg-amber-50' : 
                      'border-green-600 text-green-600 hover:bg-green-50'
                    } transition-colors`}
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Classroom Lesson</span>
                  </button>
                  <button
                    onClick={handleEditActivity}
                    className="px-4 py-2 rounded-lg border-2 border-[#FFC83D] text-[#FFC83D] hover:bg-[#FFF9E7] flex items-center gap-2 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Edit Lesson</span>
                  </button>
                </div>
              </div>

              {/* Learning Objective for Activity */}
              <div className="p-4 bg-[#F0FFF7] border border-[#00875A] rounded-lg">
                <h4 className="font-medium text-[#00875A] mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Activity Objective
                </h4>
                <p className="text-sm text-[#00875A]">{currentActivityData.description}</p>
              </div>

              {/* Lesson Context */}
              {currentLesson && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Lesson Context
                  </h4>
                  <div className="space-y-2 text-sm text-blue-700">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Day:</span>
                      <span>{currentLesson.day}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Time:</span>
                      <span>{currentLesson.startTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Week:</span>
                      <span>Week {currentLesson.week}</span>
                    </div>
                    {currentLesson.theme && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Theme:</span>
                        <span>{currentLesson.theme}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Prior Knowledge */}
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Prior Knowledge
                </h4>
                <ul className="space-y-2">
                  {currentActivityDetails.preparation.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-2 gap-6">
                {/* Teacher Activity */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-600" />
                    <h4 className="text-lg font-medium text-gray-700">Teacher Activity</h4>
                  </div>
                  
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <h5 className="font-medium text-gray-800 mb-3">Activity Steps</h5>
                    <div className="space-y-3">
                      {currentActivityDetails.steps.map((step, index) => {
                        const isHeader = step.startsWith('**') || step.includes('Think-Pair-Share:');
                        const isBullet = step.startsWith('•') || step.startsWith('-') || step.startsWith('Would you') || step.startsWith('What would') || step.startsWith('Find an') || step.startsWith('Is the');
                        
                        return (
                          <div key={index} className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              {isHeader ? (
                                <h6 className="font-medium text-gray-800 my-2">{step.replace(/\*\*/g, '')}</h6>
                              ) : isBullet ? (
                                <div className="flex items-start">
                                  <span className="text-[#FFC83D] mr-2">•</span>
                                  <p className="text-sm text-gray-700">{step.replace(/^[•-]\s*/, '')}</p>
                                </div>
                              ) : (
                                <p className="text-sm text-gray-700 whitespace-pre-wrap">{step}</p>
                              )}
                            </div>
                            {(step.includes('Modelled Example') || step.includes('Sentence Starters')) && (
                              <MiniAssistant 
                                answer={step.includes('Modelled Example') 
                                  ? "The city stretched endlessly beneath a sky of perpetual twilight. Towering screens flickered with approved messages, their harsh light reflecting off the polished surfaces of identical buildings. Sarah's fingers traced the edge of her mandatory identification band, its cold metal a constant reminder of her captivity.\n\nAnalysis:\n- Creates atmosphere through sensory details\n- Builds tension through contrasts\n- Establishes control through technology"
                                  : "- Above the city, the sky...\n- Through the streets, the people...\n- In every window, screens displayed...\n- The air tasted of...\n- Beneath the surface, the truth...\n\nTips:\n- Start with environment to establish atmosphere\n- Use sensory details to make scenes vivid\n- Show control through subtle details"
                                }
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Teaching Tips */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h5 className="font-medium text-blue-800 mb-3">Teaching Tips</h5>
                    <ul className="space-y-2">
                      {currentActivityDetails.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-blue-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Student Activity */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-gray-600" />
                    <h4 className="text-lg font-medium text-gray-700">Student Activity</h4>
                  </div>
                  
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <h5 className="font-medium text-gray-800 mb-3">What Students Do</h5>
                    <p className="text-sm text-gray-700 mb-4">
                      {getStudentActivity(currentActivity)}
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <h6 className="font-medium text-gray-700 mb-2">Key Actions</h6>
                        <ul className="space-y-1">
                          {currentActivity === 'starter' && (
                            <>
                              <li className="flex items-start gap-2 text-sm text-gray-600">
                                <span className="text-[#FFC83D] mr-1">•</span>
                                <span>Think individually about key questions (2 mins)</span>
                              </li>
                              <li className="flex items-start gap-2 text-sm text-gray-600">
                                <span className="text-[#FFC83D] mr-1">•</span>
                                <span>Share and develop ideas with a partner (3 mins)</span>
                              </li>
                              <li className="flex items-start gap-2 text-sm text-gray-600">
                                <span className="text-[#FFC83D] mr-1">•</span>
                                <span>Contribute to whole-class discussion (5 mins)</span>
                              </li>
                            </>
                          )}
                          {currentActivity === 'main' && (
                            <>
                              <li className="flex items-start gap-2 text-sm text-gray-600">
                                <span className="text-[#FFC83D] mr-1">•</span>
                                <span>Participate in collaborative learning activities</span>
                              </li>
                              <li className="flex items-start gap-2 text-sm text-gray-600">
                                <span className="text-[#FFC83D] mr-1">•</span>
                                <span>Apply new skills and knowledge</span>
                              </li>
                              <li className="flex items-start gap-2 text-sm text-gray-600">
                                <span className="text-[#FFC83D] mr-1">•</span>
                                <span>Work individually or in groups on core tasks</span>
                              </li>
                            </>
                          )}
                          {currentActivity === 'plenary' && (
                            <>
                              <li className="flex items-start gap-2 text-sm text-gray-600">
                                <span className="text-[#FFC83D] mr-1">•</span>
                                <span>Reflect on learning and consolidate understanding</span>
                              </li>
                              <li className="flex items-start gap-2 text-sm text-gray-600">
                                <span className="text-[#FFC83D] mr-1">•</span>
                                <span>Demonstrate knowledge gained during the lesson</span>
                              </li>
                              <li className="flex items-start gap-2 text-sm text-gray-600">
                                <span className="text-[#FFC83D] mr-1">•</span>
                                <span>Make connections to future learning goals</span>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Differentiation */}
                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h5 className="font-medium text-purple-800 mb-3">Differentiation</h5>
                    <ul className="space-y-2">
                      {currentActivityDetails.differentiation.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-purple-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Assessment */}
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h5 className="font-medium text-green-800 mb-3">Assessment Opportunities</h5>
                    <ul className="space-y-2">
                      {currentActivityDetails.assessment.map((item, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-green-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No {currentActivity} activity found for this lesson.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}