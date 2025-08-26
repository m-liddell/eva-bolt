import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Users, MessageCircle, RotateCcw, Clock, BookOpen, Brain, CheckCircle2, Play, Pause, ArrowRight, X } from 'lucide-react';
import { NavigationArrow } from '../../components/NavigationArrow';
import { MidAssistant } from '../../components/MidAssistant';
import { MiniAssistant } from '../../components/MiniAssistant';
import { StudentActivityModal } from '../../components/StudentActivityModal';

export default function SocraticCircleReflectionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showStudentActivity, setShowStudentActivity] = useState(false);
  const [currentRole, setCurrentRole] = useState<'inner' | 'outer'>('inner');
  const [timer, setTimer] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [discussionNotes, setDiscussionNotes] = useState('');
  const [observationNotes, setObservationNotes] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [hasRotated, setHasRotated] = useState(false);
  const [showAssistHelp, setShowAssistHelp] = useState(false);

  // Extract lesson data from location state if available
  const lessonData = location.state?.lesson || {
    yearGroup: 'Year 10',
    class: 'A',
    subject: 'English',
    theme: 'General Discussion'
  };

  // Get the actual theme from the lesson data
  const currentTheme = lessonData.theme === 'General Discussion' ? 'General Discussion' : lessonData.theme;

  // Get theme-adaptable discussion content
  const getDiscussionContent = () => {
    const theme = currentTheme;
    
    if (theme === 'Dystopian Fiction') {
      return {
        discussion_focus: "Reflect on how dystopian elements create atmosphere and convey social commentary",
        reflection_questions: [
          "What dystopian features did we identify today and why are they effective?",
          "How do these dystopian elements reflect real-world concerns?",
          "What techniques will you use in your own dystopian writing?",
          "How has your understanding of dystopian fiction deepened today?"
        ],
        observation_prompts: [
          "Notice how students connect dystopian features to real-world examples",
          "Observe which dystopian elements students find most compelling",
          "Listen for evidence of deeper understanding in student responses",
          "Watch how students build on each other's insights about atmosphere"
        ]
      };
    } else if (theme === 'Creative Writing') {
      return {
        discussion_focus: "Reflect on creative writing techniques and personal expression through storytelling",
        reflection_questions: [
          "What creative writing techniques did we explore today?",
          "How do personal experiences influence our storytelling?",
          "What makes a story engaging and memorable?",
          "How has your confidence as a writer developed?"
        ],
        observation_prompts: [
          "Notice how students describe their creative process",
          "Observe connections between personal experience and writing",
          "Listen for evidence of growing writing confidence",
          "Watch how students support each other's creative development"
        ]
      };
    } else if (theme === 'War Poetry') {
      return {
        discussion_focus: "Reflect on how poetry captures human experiences and conveys powerful emotions",
        reflection_questions: [
          "How does war poetry help us understand experiences we haven't lived?",
          "What techniques make war poetry particularly powerful?",
          "How do different perspectives on conflict shape poetry?",
          "What responsibility do poets have when writing about war?"
        ],
        observation_prompts: [
          "Notice how students connect poetry to human experience",
          "Observe emotional responses to powerful poetic techniques",
          "Listen for understanding of poetry's social impact",
          "Watch how students grapple with complex moral questions"
        ]
      };
    } else if (theme === 'Shakespeare') {
      return {
        discussion_focus: "Reflect on Shakespeare's enduring relevance and the power of classical literature",
        reflection_questions: [
          "What makes Shakespeare's work relevant across centuries?",
          "How do we balance historical context with modern interpretation?",
          "What themes in Shakespeare connect to our lives today?",
          "How has studying Shakespeare changed your perspective?"
        ],
        observation_prompts: [
          "Notice how students connect Shakespeare to contemporary life",
          "Observe understanding of historical and modern perspectives",
          "Listen for personal connections to Shakespearean themes",
          "Watch how students navigate complex language and ideas"
        ]
      };
    } else if (theme === 'Energy Transfer' || theme === 'Forces and Motion') {
      return {
        discussion_focus: "Reflect on energy principles and their applications in the real world",
        reflection_questions: [
          "How do we see energy transfer principles in everyday life?",
          "What surprised you most about energy conservation?",
          "How can understanding energy help us make better decisions?",
          "What questions do you still have about energy systems?"
        ],
        observation_prompts: [
          "Notice how students connect scientific principles to daily life",
          "Observe understanding of energy conservation concepts",
          "Listen for evidence of scientific thinking development",
          "Watch how students apply theoretical knowledge practically"
        ]
      };
    } else if (theme === 'Industrial Revolution' || theme === 'World War I' || theme === 'World War II') {
      return {
        discussion_focus: "Reflect on historical change and its impact on different groups of people",
        reflection_questions: [
          "How do different groups experience historical change differently?",
          "What factors shape how we remember and interpret history?",
          "How do historical events connect to issues we face today?",
          "What have you learned about analyzing multiple perspectives?"
        ],
        observation_prompts: [
          "Notice how students consider multiple historical perspectives",
          "Observe connections between past and present issues",
          "Listen for evidence of historical thinking skills",
          "Watch how students handle complex or controversial topics"
        ]
      };
    } else if (theme === 'Science') {
      return {
        discussion_focus: "Reflect on scientific thinking and the role of evidence in understanding",
        reflection_questions: [
          "How has your scientific thinking developed today?",
          "What role does evidence play in forming conclusions?",
          "How do scientists handle uncertainty and conflicting data?",
          "What connections do you see between science and other subjects?"
        ],
        observation_prompts: [
          "Notice how students use evidence to support their ideas",
          "Observe development of scientific reasoning skills",
          "Listen for understanding of scientific methodology",
          "Watch how students handle uncertainty and questions"
        ]
      };
    } else if (theme === 'History') {
      return {
        discussion_focus: "Reflect on historical thinking and the complexity of interpreting the past",
        reflection_questions: [
          "How do historians piece together stories from evidence?",
          "What challenges do we face when interpreting historical sources?",
          "How do contemporary events influence our view of history?",
          "What have you learned about thinking like a historian?"
        ],
        observation_prompts: [
          "Notice how students approach historical evidence",
          "Observe understanding of historical interpretation challenges",
          "Listen for development of historical thinking skills",
          "Watch how students consider bias and perspective in sources"
        ]
      };
    } else if (theme === 'Mathematics') {
      return {
        discussion_focus: "Reflect on mathematical thinking and problem-solving approaches",
        reflection_questions: [
          "How do mathematical patterns help us understand the world?",
          "What problem-solving strategies worked best for you today?",
          "How does mathematical thinking connect to other subjects?",
          "What mathematical concepts would you like to explore further?"
        ],
        observation_prompts: [
          "Notice how students describe their problem-solving process",
          "Observe connections between mathematical and everyday thinking",
          "Listen for understanding of mathematical patterns and relationships",
          "Watch how students support each other's mathematical reasoning"
        ]
      };
    } else {
      return {
        discussion_focus: "Reflect on today's learning and how it connects to broader understanding",
        reflection_questions: [
          "What were the most important insights from today's lesson?",
          "How does today's learning connect to what we've studied before?",
          "What questions do you still have about this topic?",
          "How will you apply what you've learned?"
        ],
        observation_prompts: [
          "Notice how students synthesize their learning",
          "Observe connections students make between concepts",
          "Listen for evidence of deeper understanding",
          "Watch how students support each other's reflection process"
        ]
      };
    }
  };

  const discussionContent = getDiscussionContent();

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

  const switchRoles = () => {
    setCurrentRole(currentRole === 'inner' ? 'outer' : 'inner');
    setHasRotated(true);
    setTimer(null);
    setIsTimerRunning(false);
  };

  const nextQuestion = () => {
    if (currentQuestion < discussionContent.reflection_questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(34, 197, 94, 0.95) 0%,
            rgba(34, 197, 94, 0.85) 15%,
            rgba(34, 197, 94, 0.85) 85%,
            rgba(34, 197, 94, 0.95) 100%
          ),
          url('https://images.unsplash.com/photo-1516414447565-b14be0adf13e?auto=format&fit=crop&q=80')
        `,
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Lesson Navigation */}
        <div className="mb-8 p-6 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Socratic Circle Reflection</h3>
                <p className="text-sm text-gray-600">Collaborative reflection through structured dialogue</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Plenary</span>
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6">
          <div className="space-y-6">
            {/* Learning Objective */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[#FFB800] font-medium mr-2">Learning Objective:</span>
                <span className="font-bold text-gray-800">Engage in structured dialogue to deepen understanding through questioning, active listening, and collaborative reflection</span>
              </div>
              <MidAssistant context={{ topic: 'socratic dialogue' }} />
            </div>

            {/* Introduction */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-2xl">🎭</span>
                <h2 className="text-xl font-bold text-green-900">Socratic Circle Reflection</h2>
              </div>
              <p className="text-base text-green-800">
                In a Socratic Circle, we explore ideas through thoughtful questioning and deep listening. 
                The inner circle discusses while the outer circle observes, then we switch roles to ensure 
                everyone participates in both speaking and active listening.
              </p>
            </div>

            {/* Success Criteria */}
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="text-sm font-medium text-amber-800 mb-2">Success Criteria:</h3>
              <ul className="space-y-2 text-sm text-amber-800">
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Engage thoughtfully in Socratic dialogue when in inner circle</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Observe actively and take meaningful notes when in outer circle</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Build respectfully on others' ideas and insights</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Demonstrate understanding through questioning and reflection</span>
                </li>
              </ul>
            </div>

            {/* 10-Minute Structure Indicator */}
            <div className="mb-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 shadow-inner">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Clock className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-900">10-Minute Socratic Circle</h3>
                </div>
                <div className="flex space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-green-800">4 mins</div>
                    <div className="text-green-600">Round 1</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-800">1 min</div>
                    <div className="text-green-600">Switch</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-800">4 mins</div>
                    <div className="text-green-600">Round 2</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-800">1 min</div>
                    <div className="text-green-600">Synthesis</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-6">
              {/* Circle Management - Left Side */}
              <div className="col-span-8 space-y-4">
                <div className="p-6 bg-green-900 rounded-lg shadow-lg text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Users className="w-6 h-6 text-[#FFB800]" />
                      <h3 className="text-xl font-bold text-white">Circle Configuration</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      {timer !== null && (
                        <div className={`px-4 py-2 rounded-lg font-bold text-lg ${
                          timer > 180 ? 'bg-green-100 text-green-700' :
                          timer > 60 ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {formatTime(timer)}
                        </div>
                      )}
                      <button
                        onClick={() => isTimerRunning ? setIsTimerRunning(false) : startTimer(4)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          isTimerRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-[#FFB800] hover:bg-[#E6B434]'
                        } text-white flex items-center gap-2`}
                      >
                        {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        {isTimerRunning ? 'Stop Timer' : 'Start 4-Min Round'}
                      </button>
                      <button
                        onClick={switchRoles}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Switch Roles</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-green-800/50 p-6 rounded-lg space-y-4">
                    {/* Current Role Display */}
                    <div className="flex items-center justify-center mb-6">
                      <div className={`px-6 py-3 rounded-full text-lg font-bold ${
                        currentRole === 'inner' 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-purple-500 text-white'
                      }`}>
                        You are in the {currentRole.toUpperCase()} CIRCLE
                      </div>
                    </div>

                    {/* Visual Circle Representation */}
                    <div className="flex items-center justify-center mb-6">
                      <div className="relative">
                        {/* Outer Circle */}
                        <div className={`w-48 h-48 rounded-full border-4 flex items-center justify-center ${
                          currentRole === 'outer' ? 'border-purple-500 bg-purple-100' : 'border-gray-300 bg-gray-100'
                        }`}>
                          <span className={`text-sm font-medium ${
                            currentRole === 'outer' ? 'text-purple-800' : 'text-gray-600'
                          }`}>
                            OUTER CIRCLE<br />
                            <span className="text-xs">(Observers)</span>
                          </span>
                          
                          {/* Inner Circle */}
                          <div className={`absolute w-24 h-24 rounded-full border-4 flex items-center justify-center ${
                            currentRole === 'inner' ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-100'
                          }`}>
                            <span className={`text-xs font-medium text-center ${
                              currentRole === 'inner' ? 'text-blue-800' : 'text-gray-600'
                            }`}>
                              INNER<br />CIRCLE<br />
                              <span className="text-xs">(Discussers)</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Role-Specific Content */}
                    {currentRole === 'inner' ? (
                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-semibold text-blue-800 mb-3">Inner Circle: Discussion Focus</h4>
                          <p className="text-sm text-blue-700 mb-3">{discussionContent.discussion_focus}</p>
                          
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h5 className="font-medium text-blue-800">
                                Question {currentQuestion + 1} of {discussionContent.reflection_questions.length}
                              </h5>
                              <div className="flex gap-2">
                                <button
                                  onClick={previousQuestion}
                                  disabled={currentQuestion === 0}
                                  className="px-2 py-1 bg-blue-200 text-blue-800 rounded text-xs disabled:opacity-50"
                                >
                                  Previous
                                </button>
                                <button
                                  onClick={nextQuestion}
                                  disabled={currentQuestion === discussionContent.reflection_questions.length - 1}
                                  className="px-2 py-1 bg-blue-200 text-blue-800 rounded text-xs disabled:opacity-50"
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                            
                            <div className="p-3 bg-white rounded-lg border border-blue-200">
                              <div className="flex items-start justify-between">
                                <p className="text-sm text-blue-800 flex-1">
                                  {discussionContent.reflection_questions[currentQuestion]}
                                </p>
                                <MiniAssistant answer="Use this question to guide your discussion. Share your thoughts, listen to others, and build on each other's ideas." />
                              </div>
                            </div>
                          </div>
                          
                          <textarea
                            value={discussionNotes}
                            onChange={(e) => setDiscussionNotes(e.target.value)}
                            placeholder="Record key points from your discussion..."
                            className="w-full h-24 p-3 bg-white border border-blue-300 rounded-lg text-gray-900 placeholder-gray-500 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                          <h4 className="font-semibold text-purple-800 mb-3">Outer Circle: Observation Focus</h4>
                          
                          <div className="space-y-3">
                            <h5 className="font-medium text-purple-800">Observation Prompts:</h5>
                            {discussionContent.observation_prompts.map((prompt, index) => (
                              <div key={index} className="flex items-start justify-between p-3 bg-white rounded-lg border border-purple-200">
                                <div className="flex items-start gap-2 flex-1">
                                  <span className="text-purple-600 mt-1">•</span>
                                  <span className="text-sm text-purple-800">{prompt}</span>
                                </div>
                                <MiniAssistant answer="Focus on how students engage with ideas, build on each other's thoughts, and develop understanding through dialogue." />
                              </div>
                            ))}
                          </div>
                          
                          <textarea
                            value={observationNotes}
                            onChange={(e) => setObservationNotes(e.target.value)}
                            placeholder="Record your observations of the discussion..."
                            className="w-full h-24 p-3 bg-white border border-purple-300 rounded-lg text-gray-900 placeholder-gray-500 resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Guidelines and Support - Right Side */}
              <div className="col-span-4 space-y-4">
                {/* Role Guidelines */}
                <div className="p-4 bg-white/90 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">
                    {currentRole === 'inner' ? 'Discussion Guidelines' : 'Observation Guidelines'}
                  </h3>
                  {currentRole === 'inner' ? (
                    <ul className="space-y-2 text-sm text-gray-800">
                      <li>• Share your genuine thoughts and insights</li>
                      <li>• Build on others' ideas respectfully</li>
                      <li>• Ask questions to deepen understanding</li>
                      <li>• Listen actively before responding</li>
                      <li>• Use evidence to support your points</li>
                    </ul>
                  ) : (
                    <ul className="space-y-2 text-sm text-gray-800">
                      <li>• Listen carefully to all contributions</li>
                      <li>• Note interesting ideas and connections</li>
                      <li>• Observe how ideas develop and change</li>
                      <li>• Identify effective discussion techniques</li>
                      <li>• Prepare insights for when you switch roles</li>
                    </ul>
                  )}
                </div>

                {/* Progress Tracker */}
                <div className="p-4 bg-white/90 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Progress Tracker</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-800">Current Question:</span>
                      <span className="text-sm font-medium text-gray-800">
                        {currentQuestion + 1} of {discussionContent.reflection_questions.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-800">Role Rotation:</span>
                      <span className={`text-sm font-medium ${hasRotated ? 'text-green-600' : 'text-amber-600'}`}>
                        {hasRotated ? 'Completed' : 'Pending'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${hasRotated ? 100 : 50}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Socratic Method Info */}
                <div className="p-4 bg-white/90 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Why Socratic Circles?</h3>
                  <ul className="space-y-2 text-sm text-gray-800">
                    <li>• Develops critical thinking through questioning</li>
                    <li>• Builds active listening skills</li>
                    <li>• Encourages collaborative knowledge building</li>
                    <li>• Creates respectful dialogue opportunities</li>
                    <li>• Deepens understanding through reflection</li>
                  </ul>
                </div>

                {/* Student Activity Button */}
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h3 className="text-sm font-medium text-indigo-800 mb-2">Student Resources:</h3>
                  <button
                    onClick={() => setShowStudentActivity(true)}
                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    <span>View Student Activity</span>
                  </button>
                </div>

                {/* Timer Display */}
                {timer !== null && (
                  <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <div className="text-center">
                      <div className={`inline-block px-6 py-3 rounded-lg text-2xl font-bold ${
                        timer > 180 ? 'bg-green-100 text-green-700' :
                        timer > 90 ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {formatTime(timer)}
                      </div>
                      <p className="text-sm text-indigo-700 mt-2">
                        {timer > 180 ? 'Plenty of time for deep discussion' :
                         timer > 90 ? 'Keep discussion focused' :
                         'Prepare to switch or conclude'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Text */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-base text-gray-800">
                💬 Through Socratic dialogue, we've deepened our understanding by questioning, listening, and building knowledge together. 
                This collaborative reflection strengthens our insights and prepares us for continued learning.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <NavigationArrow direction="left" onClick={() => navigate('/')} />
              <NavigationArrow direction="right" onClick={() => navigate('/admin/lesson-library')} />
            </div>
          </div>
        </div>

        {/* Student Activity Modal */}
        {showStudentActivity && (
          <StudentActivityModal
            activity={{
              id: 'socratic-circle-reflection-student',
              lessonNumber: 1,
              title: 'Socratic Circle Reflection',
              description: 'Engage in structured dialogue with role rotation',
              phase: 'plenary',
              duration: '10 mins',
              type: 'discussion',
              subject: lessonData.subject,
              year_group: lessonData.yearGroup,
              learning_objective: 'Students engage in structured dialogue to deepen understanding through questioning, active listening, and collaborative reflection',
              instructions: [
                'Sit in assigned circle (inner for discussion, outer for observation)',
                'Inner circle: Engage in thoughtful dialogue about lesson insights',
                'Outer circle: Observe discussion and take detailed notes',
                'Switch roles when instructed',
                'Participate in final synthesis discussion'
              ],
              tasks: [
                {
                  id: 'inner-circle-discussion',
                  title: 'Inner Circle Discussion Notes',
                  description: 'Record key points from your discussion when in the inner circle',
                  type: 'text_input',
                  guidance: 'Focus on insights, questions raised, and ideas developed'
                },
                {
                  id: 'outer-circle-observations',
                  title: 'Outer Circle Observations',
                  description: 'Record observations about the discussion when in the outer circle',
                  type: 'text_input',
                  guidance: 'Note effective techniques, interesting ideas, and discussion patterns'
                },
                {
                  id: 'synthesis-reflection',
                  title: 'Synthesis Reflection',
                  description: 'What did you learn from both discussing and observing?',
                  type: 'reflection',
                  guidance: 'Consider how both roles contributed to your understanding'
                }
              ],
              success_criteria: [
                'Engage thoughtfully in Socratic dialogue when in inner circle',
                'Observe actively and take meaningful notes when in outer circle',
                'Build respectfully on others\' ideas and insights',
                'Demonstrate understanding through questioning and reflection'
              ],
              differentiation: {
                support: [
                  'Provide question prompts for less confident discussers',
                  'Offer observation frameworks for students who struggle with note-taking',
                  'Allow students to pass if they need thinking time'
                ],
                extension: [
                  'Ask students to identify underlying assumptions in discussions',
                  'Encourage meta-cognitive reflection on discussion processes',
                  'Challenge students to synthesize multiple perspectives'
                ]
              },
              assessment_rubric: [
                {
                  level: 'Secure',
                  descriptors: [
                    'Thoughtful engagement in dialogue with clear reasoning',
                    'Active observation with detailed, insightful notes',
                    'Respectful building on others\' contributions'
                  ]
                },
                {
                  level: 'Developing',
                  descriptors: [
                    'Some engagement in dialogue with basic reasoning',
                    'Basic observation with simple notes',
                    'Attempts to build on others\' ideas'
                  ]
                }
              ],
              pdf_content: {
                header: 'Socratic Circle Reflection',
                instructions: [
                  'Sit in assigned circle (inner for discussion, outer for observation)',
                  'Inner circle: Engage in thoughtful dialogue about lesson insights',
                  'Outer circle: Observe discussion and take detailed notes',
                  'Switch roles when instructed',
                  'Participate in final synthesis discussion'
                ],
                worksheet_sections: [
                  {
                    title: 'Inner Circle Discussion Notes',
                    content: 'Record key points from your discussion when in the inner circle. Focus on insights, questions raised, and ideas developed.',
                    space_for_answers: true
                  },
                  {
                    title: 'Outer Circle Observations',
                    content: 'Record observations about the discussion when in the outer circle. Note effective techniques, interesting ideas, and discussion patterns.',
                    space_for_answers: true
                  },
                  {
                    title: 'Synthesis Reflection',
                    content: 'What did you learn from both discussing and observing? Consider how both roles contributed to your understanding.',
                    space_for_answers: true
                  }
                ],
                footer: 'Deep learning happens through dialogue and reflection!'
              }
            }}
            onClose={() => setShowStudentActivity(false)}
          />
        )}
      </div>
    </div>
  );
}