import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Brain, BookOpen, CheckCircle2, Users, Search, MessageSquare, Clock } from 'lucide-react';
import { NavigationArrow } from '../../components/NavigationArrow';
import { MidAssistant } from '../../components/MidAssistant';
import { MiniAssistant } from '../../components/MiniAssistant';
import { StudentActivityModal } from '../../components/StudentActivityModal';
import { getStudentActivityByLessonAndPhase } from '../../data/studentActivities';

export default function DystopianLesson3Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showStudentActivity, setShowStudentActivity] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(1);
  const [investigationNotes, setInvestigationNotes] = useState<Record<string, string>>({});
  const [selectedRole, setSelectedRole] = useState('Sentence Analyst');

  // Extract lesson data from location state if available
  const lessonData = location.state?.lesson || {
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

  const studentActivity = getStudentActivityByLessonAndPhase('dystopian-lesson-3', 'main');

  const textExamples = [
    "The surveillance cameras watched. Citizens hurried past. No one made eye contact.",
    "The surveillance cameras watched, and citizens hurried past without making eye contact.",
    "Propaganda echoed through empty streets. The message was always the same. Obedience meant safety.",
    "Propaganda echoed through empty streets, but the citizens had learned to ignore the lies.",
    "Technology controlled every aspect of life. Privacy no longer existed. Freedom was forgotten.",
    "Technology controlled every aspect of life, yet some citizens still dreamed of freedom."
  ];

  const roles = [
    "Sentence Analyst - Identify sentence types and structures",
    "Atmosphere Expert - Analyze mood and emotional impact", 
    "Effect Evaluator - Compare different sentence impacts",
    "Technique Teacher - Explain findings to other groups"
  ];

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(75, 85, 99, 0.95) 0%,
            rgba(75, 85, 99, 0.85) 15%,
            rgba(75, 85, 99, 0.85) 85%,
            rgba(75, 85, 99, 0.95) 100%
          ),
          url('https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&q=80')
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
                <h3 className="text-lg font-bold text-gray-800">Simple and Compound Sentence Mastery Workshop</h3>
                <p className="text-sm text-gray-600">Practice creating both sentence types strategically for different effects</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/lesson/dystopian-lesson-3/starter')}
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
                onClick={() => navigate('/lesson/dystopian-lesson-3/plenary')}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-2"
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
                <span className="font-bold text-gray-900">I can practice creating both sentence types strategically for different dystopian atmospheric effects</span>
              </div>
              <MidAssistant context={{ topic: 'collaborative learning' }} />
            </div>

            {/* Introduction */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-base text-gray-800">
                💬 Work together to analyze how simple and compound sentences create different effects in dystopian writing. 
                Through collaborative investigation, you'll discover the strategic power of sentence variety.
              </p>
            </div>

            {/* Success Criteria */}
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="text-sm font-medium text-amber-800 mb-2">Success Criteria:</h3>
              <ul className="space-y-2 text-sm text-amber-800">
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Practice creating both sentence types strategically for different dystopian atmospheric effects</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Understand how simple and compound sentences create different atmospheric effects</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Collaborate effectively to analyze sentence variety techniques</span>
                </li>
              </ul>
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
                      <h3 className="text-xl font-bold text-white">Text Analysis Workshop</h3>
                    </div>
                    <div className="text-sm text-white">
                      Group {currentGroup} | Role: {selectedRole}
                    </div>
                  </div>

                  <div className="bg-blue-800/50 p-6 rounded-lg space-y-4">
                    <h4 className="font-semibold mb-3 text-white">Analyze These Sentence Examples:</h4>
                    <div className="space-y-3">
                      {textExamples.map((text, index) => (
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
                              index % 2 === 0 
                                ? "This uses simple sentences for direct impact and urgency. Notice how each sentence creates a separate, clear thought that builds tension through repetition."
                                : "This uses compound sentences to show relationships between ideas. The conjunction creates flow and shows how different elements connect in the dystopian world."
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
                {/* Lesson Instructions */}
                <div className="p-4 bg-white/90 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Lesson Instructions</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs">1</div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-900">Form Groups</h4>
                        <p className="text-xs text-gray-800 opacity-80">
                          Get into groups of 4 and assign roles
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs">2</div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-900">Investigate</h4>
                        <p className="text-xs text-gray-800 opacity-80">
                          Work collaboratively to analyze materials and gather insights
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs">3</div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-900">Share Findings</h4>
                        <p className="text-xs text-gray-800 opacity-80">
                          Present discoveries to other groups and synthesize learning
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

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
                    <li>• Compare simple vs compound examples</li>
                    <li>• Notice how conjunctions change meaning</li>
                    <li>• Analyze atmospheric differences</li>
                    <li>• Document key insights for sharing</li>
                    <li>• Prepare to teach other groups</li>
                  </ul>
                </div>

                {/* Success Criteria */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold mb-3 text-blue-900">Success Criteria</h3>
                  <ul className="space-y-2 text-sm text-blue-900">
                    <li>• Deep analytical thinking shown</li>
                    <li>• Effective teamwork demonstrated</li>
                    <li>• Clear evidence gathered</li>
                    <li>• Understanding deepened through explanation</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Text */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-base text-gray-800">
                💬 Through collaborative investigation, we discover how sentence variety creates different effects and learn from each other's analytical insights.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <NavigationArrow direction="left" onClick={() => navigate('/lesson/dystopian-lesson-3/starter')} />
              <NavigationArrow direction="right" onClick={() => navigate('/lesson/dystopian-lesson-3/plenary')} />
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