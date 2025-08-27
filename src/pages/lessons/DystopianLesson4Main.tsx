import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Brain, BookOpen, CheckCircle2, Users, Search, MessageSquare, Clock, Target } from 'lucide-react';
import { NavigationArrow } from '../../components/NavigationArrow';
import { MidAssistant } from '../../components/MidAssistant';
import { MiniAssistant } from '../../components/MiniAssistant';
import { StudentActivityModal } from '../../components/StudentActivityModal';
import { getStudentActivityByLessonAndPhase } from '../../data/studentActivities';

export default function DystopianLesson4Main() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showStudentActivity, setShowStudentActivity] = useState(false);
  const [investigationNotes, setInvestigationNotes] = useState<Record<string, string>>({});
  const [selectedRole, setSelectedRole] = useState('Complex Sentence Analyst');

  // Extract lesson data from location state if available
  const lessonData = {
    yearGroup: 'Year 10',
    class: 'A',
    subject: 'English',
    theme: 'Dystopian Fiction'
  };

  const handleNotesChange = (key: string, value: string) => {
    setInvestigationNotes(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const studentActivity = getStudentActivityByLessonAndPhase('dystopian-lesson-4', 'main');

  const complexSentenceExamples = [
    "Although the surveillance system promised safety, it actually created a prison where privacy became extinct.",
    "While the government's propaganda broadcasts filled the airwaves with messages of prosperity, the reality beneath revealed environmental decay and social inequality.",
    "Because the technological control mechanisms had infiltrated every aspect of human interaction, genuine relationships became nearly impossible.",
    "When citizens discovered the truth about their manipulated history, they faced the choice between comfortable lies and dangerous knowledge.",
    "Since the environmental destruction had accelerated beyond repair, hope for the future diminished with each passing day.",
    "After the surveillance network achieved total coverage, even thoughts seemed monitored and controlled."
  ];

  const roles = [
    "Complex Sentence Analyst - Identify subordinate clauses and main clauses",
    "Sophistication Expert - Analyze how complexity enhances meaning", 
    "Effect Evaluator - Compare simple vs complex sentence impacts",
    "Technique Teacher - Explain complex sentence construction to other groups"
  ];

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(30, 41, 59, 0.95) 0%,
            rgba(30, 41, 59, 0.85) 15%,
            rgba(30, 41, 59, 0.85) 85%,
            rgba(30, 41, 59, 0.95) 100%
          ),
          url('https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&q=80')
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
                <h3 className="text-lg font-bold text-gray-800">Complex Sentence Mastery Workshop</h3>
                <p className="text-sm text-gray-600">Create sophisticated dystopian descriptions using complex sentences</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/lesson/dystopian-lesson-4/starter')}
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
                onClick={() => navigate('/lesson/dystopian-lesson-4/plenary')}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Plenary</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6">
          <div className="space-y-6">
            {/* Learning Objective */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[#FFB800] font-medium mr-2">Learning Objective:</span>
                <span className="font-bold text-gray-900">I can create sophisticated dystopian descriptions using complex sentences with multiple subordinate clauses</span>
              </div>
              <MidAssistant context={{ topic: 'collaborative learning' }} />
            </div>

            {/* Introduction */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-base text-gray-800">
                💬 Work together to analyze complex sentences and discover how sophisticated sentence structures enhance dystopian descriptions. 
                Through collaborative investigation, you'll master the art of creating layered, nuanced writing.
              </p>
            </div>

            {/* Success Criteria and Lesson Instructions */}
            <div className="grid grid-cols-2 gap-6">
              {/* Success Criteria */}
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h3 className="text-lg font-semibold text-amber-800 mb-3">Success Criteria</h3>
                <ul className="space-y-2 text-sm text-amber-800">
                  <li className="flex items-start space-x-2">
                    <span className="text-[#FFB800] mt-1">•</span>
                    <span>Create sophisticated dystopian descriptions using complex sentences</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#FFB800] mt-1">•</span>
                    <span>Understand how multiple subordinate clauses add depth and sophistication</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#FFB800] mt-1">•</span>
                    <span>Collaborate effectively to analyze complex sentence construction</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#FFB800] mt-1">•</span>
                    <span>Demonstrate mastery of advanced sentence techniques</span>
                  </li>
                </ul>
              </div>

              {/* Lesson Instructions */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Lesson Instructions</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">1</div>
                    <div>
                      <h4 className="font-medium text-sm text-blue-800">Form Investigation Teams</h4>
                      <p className="text-xs text-blue-700">
                        Get into groups of 4 and assign specialist roles for complex sentence analysis
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs">2</div>
                    <div>
                      <h4 className="font-medium text-sm text-blue-800">Collaborative Analysis</h4>
                      <p className="text-xs text-blue-700">
                        Work together to analyze complex sentence examples and discover sophistication techniques
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">3</div>
                    <div>
                      <h4 className="font-medium text-sm text-blue-800">Share Discoveries</h4>
                      <p className="text-xs text-blue-700">
                        Present your findings to other teams and learn from their insights
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 40-Minute Structure */}
            <div className="mb-6 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl p-4 shadow-inner">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-900">40-Minute Investigation</h3>
                </div>
                <div className="flex space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-blue-800">10 mins</div>
                    <div className="text-blue-600">Setup & Organize</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-blue-800">25 mins</div>
                    <div className="text-blue-600">Collaborative Work</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-blue-800">5 mins</div>
                    <div className="text-blue-600">Share & Synthesize</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-6">
              {/* Investigation Area */}
              <div className="col-span-8 space-y-4">
                <div className="p-6 bg-blue-900 rounded-lg shadow-lg text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Search className="w-6 h-6 text-[#FFB800]" />
                      <h3 className="text-xl font-bold text-white">Complex Sentence Analysis Workshop</h3>
                    </div>
                    <div className="text-sm text-white">
                      Role: {selectedRole}
                    </div>
                  </div>

                  <div className="bg-blue-800/50 p-6 rounded-lg space-y-4">
                    <h4 className="font-semibold mb-3 text-white">Analyze These Complex Sentence Examples:</h4>
                    <div className="space-y-3">
                      {complexSentenceExamples.map((text, index) => (
                        <div key={index} className="p-4 bg-blue-800/30 rounded-lg">
                          <h5 className="font-medium mb-2 text-white">Example {index + 1}:</h5>
                          <p className="text-sm italic mb-3 text-white">"{text}"</p>
                          <div className="flex items-start justify-between">
                            <textarea
                              placeholder="Your analysis notes..."
                              value={investigationNotes[`text_${index}`] || ''}
                              onChange={(e) => handleNotesChange(`text_${index}`, e.target.value)}
                              className="flex-1 h-20 p-3 bg-blue-700/30 border border-blue-600 rounded text-white placeholder-blue-200 resize-none mr-3"
                            />
                            <MiniAssistant answer={
                              index === 0 
                                ? "This complex sentence uses 'Although' to create contrast between appearance (safety) and reality (prison). The subordinate clause sets up expectation, while the main clause delivers the harsh truth."
                                : index === 1
                                ? "This sentence uses 'While' to contrast propaganda messages with hidden reality. The complex structure mirrors the layered deception in dystopian societies."
                                : index === 2
                                ? "The 'Because' clause explains causation - how technology infiltration led to relationship breakdown. Complex sentences show cause-and-effect relationships effectively."
                                : index === 3
                                ? "The 'When' clause creates a turning point moment. Complex sentences are perfect for showing pivotal moments and their consequences in dystopian narratives."
                                : index === 4
                                ? "The 'Since' clause establishes the premise, while the main clause shows the emotional consequence. Complex sentences excel at showing logical progression."
                                : "The 'After' clause shows sequence and completion. Complex sentences help readers understand how events build upon each other in dystopian worlds."
                            } />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Materials */}
              <div className="col-span-4 space-y-4">
                {/* Team Roles */}
                <div className="p-4 bg-white/90 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Team Roles</h3>
                  <div className="space-y-2">
                    {roles.map((role, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedRole(role.split(' - ')[0])}
                        className={`w-full p-3 rounded text-left transition-colors text-sm ${
                          selectedRole === role.split(' - ')[0]
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                        }`}
                      >
                        <div className="font-medium">{role.split(' - ')[0]}</div>
                        <div className="text-xs opacity-80">{role.split(' - ')[1]}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Investigation Tips */}
                <div className="p-4 bg-white/90 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Investigation Tips</h3>
                  <ul className="space-y-2 text-sm text-gray-900">
                    <li>• Identify subordinate clauses (start with although, while, because, etc.)</li>
                    <li>• Find the main clause (the independent thought)</li>
                    <li>• Analyze how clauses work together</li>
                    <li>• Compare complexity with simple sentences</li>
                    <li>• Document sophistication techniques</li>
                  </ul>
                </div>

                {/* Complex Sentence Guide */}
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h3 className="text-lg font-semibold mb-3 text-purple-900">Complex Sentence Guide</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-white rounded-lg border border-purple-200">
                      <h4 className="font-medium text-purple-800 text-sm">Structure:</h4>
                      <p className="text-xs text-purple-700">Subordinate Clause + Main Clause</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-purple-200">
                      <h4 className="font-medium text-purple-800 text-sm">Common Starters:</h4>
                      <p className="text-xs text-purple-700">Although, While, Because, When, Since, After, Before, If</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-purple-200">
                      <h4 className="font-medium text-purple-800 text-sm">Effect:</h4>
                      <p className="text-xs text-purple-700">Shows relationships, adds sophistication, creates depth</p>
                    </div>
                  </div>
                </div>

                {/* Assessment Focus */}
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="text-lg font-semibold mb-3 text-green-900">Assessment Focus</h3>
                  <p className="text-sm text-green-800">
                    Understanding of complex sentence construction and collaborative analysis skills
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Text */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-base text-gray-800">
                💬 Through collaborative investigation of complex sentences, we discover how sophisticated structures enhance dystopian writing and create deeper meaning.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <NavigationArrow direction="left" onClick={() => navigate('/lesson/dystopian-lesson-4/starter')} />
              <NavigationArrow direction="right" onClick={() => navigate('/lesson/dystopian-lesson-4/plenary')} />
            </div>
          </div>
        </div>

        {/* Student Activity Modal */}
        {showStudentActivity && studentActivity && (
          <StudentActivityModal
            activity={studentActivity}
            onClose={() => setShowStudentActivity(false)}
          />
        )}
      </div>
    </div>
  );
}