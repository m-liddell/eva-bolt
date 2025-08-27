import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mic, Users, Target, Play, Pause, Clock, CheckCircle2, AlertCircle, MessageSquare, User } from 'lucide-react';
import { NavigationArrow } from '../../components/NavigationArrow';
import { MidAssistant } from '../../components/MidAssistant';
import { MiniAssistant } from '../../components/MiniAssistant';

export default function PressConferenceSimulationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [timer, setTimer] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'setup' | 'conference' | 'debrief'>('setup');
  const [expertRoles, setExpertRoles] = useState<string[]>([]);
  const [journalistQuestions, setJournalistQuestions] = useState<string[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [conferenceNotes, setConferenceNotes] = useState('');

  // Extract lesson data from location state if available
  const lessonData = {
    yearGroup: 'Year 10',
    class: 'A',
    subject: 'English',
    theme: 'General Discussion'
  };

  const currentTheme = lessonData.theme === 'General Discussion' ? 'General Discussion' : lessonData.theme;

  // Get theme-specific expert roles and questions
  const getThemeContent = () => {
    const theme = currentTheme;
    
    if (theme === 'Dystopian Fiction') {
      return {
        expertRoles: [
          'Surveillance Technology Specialist',
          'Social Control Researcher',
          'Privacy Rights Advocate'
        ],
        sampleQuestions: [
          'How do surveillance systems impact citizen behavior?',
          'What are the psychological effects of constant monitoring?',
          'How can society balance security with privacy rights?',
          'What historical examples show the dangers of excessive surveillance?'
        ]
      };
    } else if (theme === 'Creative Writing') {
      return {
        expertRoles: [
          'Published Author',
          'Literary Editor',
          'Creative Writing Teacher'
        ],
        sampleQuestions: [
          'What makes a story engaging for readers?',
          'How important is technical skill versus creativity?',
          'What advice would you give to new writers?',
          'How has the publishing industry changed recently?'
        ]
      };
    } else if (theme === 'War Poetry') {
      return {
        expertRoles: [
          'War Veteran',
          'Peace Activist',
          'Literature Scholar'
        ],
        sampleQuestions: [
          'How accurately does war poetry represent combat experience?',
          'What role should poetry play in peace movements?',
          'How do we honor veterans while promoting peace?',
          'What makes war poetry powerful and lasting?'
        ]
      };
    } else if (theme === 'Shakespeare') {
      return {
        expertRoles: [
          'Shakespearean Scholar',
          'Theatre Director',
          'Education Specialist'
        ],
        sampleQuestions: [
          'Why is Shakespeare still relevant today?',
          'How should Shakespeare be taught to modern students?',
          'What makes Shakespeare\'s language so powerful?',
          'How do modern adaptations change Shakespeare\'s meaning?'
        ]
      };
    } else if (theme === 'Energy Transfer' || theme === 'Forces and Motion') {
      return {
        expertRoles: [
          'Renewable Energy Engineer',
          'Environmental Scientist',
          'Energy Policy Expert'
        ],
        sampleQuestions: [
          'What are the most promising renewable energy technologies?',
          'How do energy choices impact the environment?',
          'What policies best promote clean energy adoption?',
          'How can individuals reduce their energy consumption?'
        ]
      };
    } else if (theme === 'Industrial Revolution') {
      return {
        expertRoles: [
          'Economic Historian',
          'Labor Rights Advocate',
          'Technology Innovation Expert'
        ],
        sampleQuestions: [
          'How did industrialization change society?',
          'What were the working conditions like for factory workers?',
          'How did technological innovation drive economic change?',
          'What lessons from the Industrial Revolution apply today?'
        ]
      };
    } else if (theme === 'Science' || lessonData.subject === 'Science') {
      return {
        expertRoles: [
          'Research Scientist',
          'Science Ethics Committee Member',
          'Science Communicator'
        ],
        sampleQuestions: [
          'What are the current priorities in scientific research?',
          'How do ethical considerations guide research decisions?',
          'How can scientists better communicate with the public?',
          'What role should science play in policy decisions?'
        ]
      };
    } else if (theme === 'History' || lessonData.subject === 'History') {
      return {
        expertRoles: [
          'Professional Historian',
          'Museum Curator',
          'History Teacher'
        ],
        sampleQuestions: [
          'How do historians determine what really happened?',
          'What challenges do you face in preserving history?',
          'How can we make history engaging for students?',
          'Why is studying history important today?'
        ]
      };
    } else if (theme === 'Mathematics' || lessonData.subject === 'Mathematics') {
      return {
        expertRoles: [
          'Mathematics Researcher',
          'Applied Mathematics Engineer',
          'Mathematics Educator'
        ],
        sampleQuestions: [
          'How do mathematical discoveries happen?',
          'Where do we see mathematics in everyday life?',
          'What makes mathematics beautiful or elegant?',
          'How can we help students see the value of mathematics?'
        ]
      };
    } else {
      return {
        expertRoles: [
          'Subject Expert',
          'Education Researcher',
          'Student Advocate'
        ],
        sampleQuestions: [
          'What are the key concepts students should understand?',
          'How can we make learning more effective?',
          'What do students need most to succeed?',
          'How has this field changed in recent years?'
        ]
      };
    }
  };

  const themeContent = getThemeContent();

  // Initialize roles and questions
  useEffect(() => {
    setExpertRoles(themeContent.expertRoles);
    setJournalistQuestions(themeContent.sampleQuestions);
  }, [currentTheme]);

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

  const stopTimer = () => {
    setIsTimerRunning(false);
    setTimer(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const nextQuestion = () => {
    if (currentQuestion < journalistQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const startSetupPhase = () => {
    setCurrentPhase('setup');
    startTimer(2); // 2 minutes setup
  };

  const startConferencePhase = () => {
    setCurrentPhase('conference');
    startTimer(6); // 6 minutes conference
  };

  const startDebriefPhase = () => {
    setCurrentPhase('debrief');
    startTimer(2); // 2 minutes debrief
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(59, 130, 246, 0.95) 0%,
            rgba(59, 130, 246, 0.85) 15%,
            rgba(59, 130, 246, 0.85) 85%,
            rgba(59, 130, 246, 0.95) 100%
          ),
          url('https://images.unsplash.com/photo-1516414447565-b14be0adf13e?auto=format&fit=crop&q=80')
        `,
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6">
          <div className="space-y-6">
            {/* Learning Objective */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[#FFB800] font-medium mr-2">Learning Objective:</span>
                <span className="font-bold text-gray-800">Role-play as journalists and experts in a press conference format, developing questioning and response skills</span>
              </div>
              <MidAssistant context={{ topic: 'role play' }} />
            </div>

            {/* Introduction */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-2xl">🎤</span>
                <h2 className="text-xl font-bold text-blue-900">Press Conference Simulation</h2>
              </div>
              <p className="text-base text-blue-800">
                Experience a professional press conference! Some students will be experts, others will be journalists. 
                Practice asking thoughtful questions and providing informed responses in a formal setting.
              </p>
            </div>

            {/* Success Criteria */}
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="text-sm font-medium text-amber-800 mb-2">Success Criteria:</h3>
              <ul className="space-y-2 text-sm text-amber-800">
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Ask relevant, well-structured questions as journalists</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Provide thoughtful, role-appropriate responses as experts</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Demonstrate active listening and build on others' contributions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Engage respectfully with different perspectives and viewpoints</span>
                </li>
              </ul>
            </div>

            {/* 10-Minute Structure */}
            <div className="mb-6 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-4 shadow-inner">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-900">10-Minute Press Conference</h3>
                </div>
                <div className="flex space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-blue-800">2 mins</div>
                    <div className="text-blue-600">Setup & Roles</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-blue-800">6 mins</div>
                    <div className="text-blue-600">Press Conference</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-blue-800">2 mins</div>
                    <div className="text-blue-600">Debrief</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-6">
              {/* Press Conference Area */}
              <div className="col-span-8">
                <div className="bg-blue-900 rounded-lg shadow-lg text-white p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Mic className="w-6 h-6 text-[#FFB800]" />
                      <h3 className="text-xl font-bold text-white">Live Press Conference</h3>
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
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setCurrentPhase('setup');
                            startTimer(2);
                          }}
                          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                        >
                          Setup (2m)
                        </button>
                        <button
                          onClick={() => {
                            setCurrentPhase('conference');
                            startTimer(6);
                          }}
                          className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
                        >
                          Conference (6m)
                        </button>
                        <button
                          onClick={() => {
                            setCurrentPhase('debrief');
                            startTimer(2);
                          }}
                          className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition-colors"
                        >
                          Debrief (2m)
                        </button>
                        <button
                          onClick={() => isTimerRunning ? stopTimer() : startTimer(120)}
                          className={`px-3 py-1 rounded text-sm transition-colors ${
                            isTimerRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-[#FFB800] hover:bg-[#E6B434]'
                          } text-white`}
                        >
                          {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Phase Content */}
                  <div className="bg-blue-800/50 p-6 rounded-lg">
                    {currentPhase === 'setup' && (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-white text-lg">Setup Phase (2 minutes)</h4>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="p-4 bg-blue-700/50 rounded-lg">
                            <h5 className="font-medium text-white mb-3">Expert Panel (2-3 students):</h5>
                            <div className="space-y-2">
                              {expertRoles.map((role, index) => (
                                <div key={index} className="flex items-center gap-2 p-2 bg-blue-600/50 rounded">
                                  <User className="w-4 h-4 text-white" />
                                  <span className="text-sm text-white">{role}</span>
                                </div>
                              ))}
                            </div>
                            <p className="text-xs text-blue-200 mt-3">
                              Experts sit at the front and prepare to answer questions from their perspective
                            </p>
                          </div>
                          <div className="p-4 bg-blue-700/50 rounded-lg">
                            <h5 className="font-medium text-white mb-3">Journalists (remaining students):</h5>
                            <div className="space-y-2">
                              <div className="p-2 bg-blue-600/50 rounded">
                                <span className="text-sm text-white">Prepare questions about {currentTheme}</span>
                              </div>
                              <div className="p-2 bg-blue-600/50 rounded">
                                <span className="text-sm text-white">Focus on your assigned beat/topic</span>
                              </div>
                            </div>
                            <p className="text-xs text-blue-200 mt-3">
                              Journalists ask questions and follow up for more details
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {currentPhase === 'conference' && (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-white text-lg">Press Conference (6 minutes)</h4>
                        <div className="p-4 bg-blue-700/50 rounded-lg">
                          <h5 className="font-medium text-white mb-3">Current Question:</h5>
                          <div className="p-3 bg-blue-600/50 rounded-lg mb-4">
                            <p className="text-white font-medium">
                              {journalistQuestions[currentQuestion]}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                              <button
                                onClick={previousQuestion}
                                disabled={currentQuestion === 0}
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors disabled:opacity-50"
                              >
                                Previous
                              </button>
                              <button
                                onClick={nextQuestion}
                                disabled={currentQuestion === journalistQuestions.length - 1}
                                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors disabled:opacity-50"
                              >
                                Next
                              </button>
                            </div>
                            <span className="text-sm text-blue-200">
                              Question {currentQuestion + 1} of {journalistQuestions.length}
                            </span>
                          </div>
                        </div>
                        <div className="p-4 bg-blue-700/50 rounded-lg">
                          <h5 className="font-medium text-white mb-2">Conference Notes:</h5>
                          <textarea
                            value={conferenceNotes}
                            onChange={(e) => setConferenceNotes(e.target.value)}
                            placeholder="Record key responses and insights from the press conference..."
                            className="w-full h-20 p-3 bg-blue-600/30 border border-blue-500 rounded text-white placeholder-blue-200 resize-none"
                          />
                        </div>
                      </div>
                    )}

                    {currentPhase === 'debrief' && (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-white text-lg">Debrief (2 minutes)</h4>
                        <div className="p-4 bg-blue-700/50 rounded-lg">
                          <h5 className="font-medium text-white mb-3">Reflection Questions:</h5>
                          <ul className="space-y-2 text-sm text-blue-100">
                            <li>• What did you learn about {currentTheme} from different expert perspectives?</li>
                            <li>• Which questions led to the most interesting responses?</li>
                            <li>• How did the role-play format help you understand the topic?</li>
                            <li>• What would you ask if you had more time?</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Support Panel */}
              <div className="col-span-4 space-y-4">
                {/* Phase Tracker */}
                <div className="p-4 bg-white/90 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Current Phase</h3>
                  <div className="space-y-2">
                    <div className={`p-3 rounded-lg ${
                      currentPhase === 'setup' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <div className="font-medium">Setup & Role Assignment</div>
                      <div className="text-xs opacity-80">Assign experts and journalists</div>
                    </div>
                    <div className={`p-3 rounded-lg ${
                      currentPhase === 'conference' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <div className="font-medium">Press Conference</div>
                      <div className="text-xs opacity-80">Questions and expert responses</div>
                    </div>
                    <div className={`p-3 rounded-lg ${
                      currentPhase === 'debrief' ? 'bg-purple-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}>
                      <div className="font-medium">Debrief & Reflection</div>
                      <div className="text-xs opacity-80">Discuss insights gained</div>
                    </div>
                  </div>
                </div>

                {/* Expert Roles */}
                <div className="p-4 bg-white/90 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Expert Panel</h3>
                  <div className="space-y-2">
                    {expertRoles.map((role, index) => (
                      <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">
                            {index + 1}
                          </div>
                          <span className="font-medium text-blue-800 text-sm">{role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Questions */}
                <div className="p-4 bg-white/90 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Sample Questions</h3>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {journalistQuestions.map((question, index) => (
                      <div 
                        key={index} 
                        className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                          index === currentQuestion 
                            ? 'border-green-500 bg-green-50' 
                            : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                        }`}
                        onClick={() => setCurrentQuestion(index)}
                      >
                        <div className="flex items-start justify-between">
                          <span className="text-sm text-gray-800 flex-1">{question}</span>
                          <MiniAssistant answer="This question helps explore different perspectives and encourages detailed, thoughtful responses from the expert panel." />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Guidelines */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-sm font-medium text-blue-800 mb-2">Press Conference Guidelines:</h3>
                  <ul className="space-y-1 text-xs text-blue-700">
                    <li>• Maintain professional demeanor throughout</li>
                    <li>• Journalists: ask follow-up questions</li>
                    <li>• Experts: stay in character and role</li>
                    <li>• Listen actively to all contributions</li>
                    <li>• Build on others' questions and responses</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Text */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-base text-gray-800">
                💬 Through role-playing as journalists and experts, we develop professional communication skills and explore topics from multiple informed perspectives.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <NavigationArrow direction="left" onClick={() => router.push('/')} />
              <NavigationArrow direction="right" onClick={() => router.push('/admin/lesson-library')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}