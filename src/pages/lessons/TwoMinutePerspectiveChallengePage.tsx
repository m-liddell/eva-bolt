import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Clock, Users, Target, Play, Pause, RotateCcw, CheckCircle2, AlertCircle, Timer } from 'lucide-react';
import { NavigationArrow } from '../../components/NavigationArrow';
import { MidAssistant } from '../../components/MidAssistant';
import { MiniAssistant } from '../../components/MiniAssistant';

export default function TwoMinutePerspectiveChallengePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStudent, setCurrentStudent] = useState(0);
  const [timer, setTimer] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'preparation' | 'presentation' | 'evaluation'>('preparation');
  const [assignedPositions, setAssignedPositions] = useState<Record<number, 'for' | 'against'>>({});
  const [completedPresentations, setCompletedPresentations] = useState<number[]>([]);
  const [evaluationNotes, setEvaluationNotes] = useState('');

  // Extract lesson data from location state if available
  const lessonData = location.state?.lesson || {
    yearGroup: 'Year 10',
    class: 'A',
    subject: 'English',
    theme: 'General Discussion'
  };

  const currentTheme = lessonData.theme === 'General Discussion' ? 'General Discussion' : lessonData.theme;

  // Get theme-specific statement
  const getDebateStatement = () => {
    const theme = currentTheme;
    
    if (theme === 'Dystopian Fiction') {
      return "Surveillance systems make society safer, even if they reduce privacy";
    } else if (theme === 'Creative Writing') {
      return "Creative writing should prioritize originality over technical skill";
    } else if (theme === 'War Poetry') {
      return "War poetry should focus on heroism rather than horror";
    } else if (theme === 'Shakespeare') {
      return "Shakespeare should only be taught in original Elizabethan English";
    } else if (theme === 'Energy Transfer' || theme === 'Forces and Motion') {
      return "Renewable energy should be prioritized even if it costs more initially";
    } else if (theme === 'Industrial Revolution' || theme === 'World War I' || theme === 'World War II') {
      return "Historical progress justifies temporary human suffering";
    } else if (theme === 'Science' || lessonData.subject === 'Science') {
      return "Scientific research should have no ethical limitations";
    } else if (theme === 'History' || lessonData.subject === 'History') {
      return "History is written by the winners and therefore cannot be objective";
    } else if (theme === 'Mathematics' || lessonData.subject === 'Mathematics') {
      return "Mathematics is discovered, not invented";
    } else {
      return "Collaboration is more effective than individual work for learning";
    }
  };

  const debateStatement = getDebateStatement();

  // Mock student list (in real app, this would come from class data)
  const students = Array.from({ length: 8 }, (_, i) => `Student ${i + 1}`);

  // Randomly assign positions when component loads
  useEffect(() => {
    const positions: Record<number, 'for' | 'against'> = {};
    students.forEach((_, index) => {
      positions[index] = Math.random() > 0.5 ? 'for' : 'against';
    });
    setAssignedPositions(positions);
  }, []);

  const startTimer = (seconds: number) => {
    setTimer(seconds);
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

  const nextStudent = () => {
    if (currentStudent < students.length - 1) {
      setCurrentStudent(prev => prev + 1);
      setTimer(null);
      setIsTimerRunning(false);
    }
  };

  const previousStudent = () => {
    if (currentStudent > 0) {
      setCurrentStudent(prev => prev - 1);
      setTimer(null);
      setIsTimerRunning(false);
    }
  };

  const markPresentationComplete = () => {
    if (!completedPresentations.includes(currentStudent)) {
      setCompletedPresentations(prev => [...prev, currentStudent]);
    }
  };

  const startPreparationPhase = () => {
    setCurrentPhase('preparation');
    startTimer(120); // 2 minutes preparation
  };

  const startPresentationPhase = () => {
    setCurrentPhase('presentation');
    startTimer(120); // 2 minutes presentation
  };

  const startEvaluationPhase = () => {
    setCurrentPhase('evaluation');
    setTimer(null);
    setIsTimerRunning(false);
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(239, 68, 68, 0.95) 0%,
            rgba(239, 68, 68, 0.85) 15%,
            rgba(239, 68, 68, 0.85) 85%,
            rgba(239, 68, 68, 0.95) 100%
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
                <span className="font-bold text-gray-800">Defend assigned perspectives for exactly two minutes, developing rapid argumentation and critical thinking skills</span>
              </div>
              <MidAssistant context={{ topic: 'debate' }} />
            </div>

            {/* Introduction */}
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-2xl">⏱️</span>
                <h2 className="text-xl font-bold text-red-900">Two Minute Perspective Challenge</h2>
              </div>
              <p className="text-base text-red-800">
                You will be assigned a position to defend for exactly two minutes - you may personally disagree with it! 
                This develops your ability to understand different viewpoints and argue effectively using evidence and reasoning.
              </p>
            </div>

            {/* Success Criteria */}
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="text-sm font-medium text-amber-800 mb-2">Success Criteria:</h3>
              <ul className="space-y-2 text-sm text-amber-800">
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Present clear, well-structured arguments within the time limit</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Use relevant evidence and examples to support assigned position</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Demonstrate respectful listening during others' presentations</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-[#FFB800] mt-1">•</span>
                  <span>Evaluate arguments based on quality rather than personal agreement</span>
                </li>
              </ul>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-6">
              {/* Challenge Area */}
              <div className="col-span-8">
                <div className="bg-red-900 rounded-lg shadow-lg text-white p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Timer className="w-6 h-6 text-[#FFB800]" />
                      <h3 className="text-xl font-bold text-white">Challenge Statement</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      {timer !== null && (
                        <div className={`px-4 py-2 rounded-lg font-bold text-lg ${
                          timer > 60 ? 'bg-green-100 text-green-700' :
                          timer > 30 ? 'bg-amber-100 text-amber-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {formatTime(timer)}
                        </div>
                      )}
                      <div className="flex gap-2">
                        <button
                          onClick={startPreparationPhase}
                          className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                        >
                          Prep (2m)
                        </button>
                        <button
                          onClick={startPresentationPhase}
                          className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
                        >
                          Present (2m)
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

                  {/* Statement Display */}
                  <div className="bg-red-800/50 p-6 rounded-lg mb-6">
                    <h4 className="font-semibold mb-3 text-white text-lg">Statement to Debate:</h4>
                    <div className="p-4 bg-red-700/50 rounded-lg border border-red-600">
                      <p className="text-white font-medium text-center text-lg">
                        "{debateStatement}"
                      </p>
                    </div>
                  </div>

                  {/* Current Student Display */}
                  <div className="bg-red-800/50 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-white">Current Presenter:</h4>
                      <div className="flex gap-2">
                        <button
                          onClick={previousStudent}
                          disabled={currentStudent === 0}
                          className="px-3 py-1 bg-red-700 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50"
                        >
                          Previous
                        </button>
                        <button
                          onClick={nextStudent}
                          disabled={currentStudent === students.length - 1}
                          className="px-3 py-1 bg-red-700 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-red-700/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">{currentStudent + 1}</span>
                        </div>
                        <div>
                          <h5 className="font-bold text-white text-lg">{students[currentStudent]}</h5>
                          <p className="text-red-200 text-sm">
                            Assigned Position: <span className={`font-bold ${
                              assignedPositions[currentStudent] === 'for' ? 'text-green-300' : 'text-red-300'
                            }`}>
                              {assignedPositions[currentStudent] === 'for' ? 'FOR' : 'AGAINST'}
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={markPresentationComplete}
                          disabled={completedPresentations.includes(currentStudent)}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            completedPresentations.includes(currentStudent)
                              ? 'bg-green-500 text-white cursor-default'
                              : 'bg-white text-red-900 hover:bg-gray-100'
                          }`}
                        >
                          {completedPresentations.includes(currentStudent) ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 inline mr-2" />
                              Complete
                            </>
                          ) : (
                            'Mark Complete'
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Phase Instructions */}
                    <div className="mt-4 p-4 bg-red-600/50 rounded-lg">
                      {currentPhase === 'preparation' && (
                        <div>
                          <h6 className="font-medium text-white mb-2">Preparation Phase (2 minutes):</h6>
                          <ul className="text-sm text-red-100 space-y-1">
                            <li>• Gather arguments for your assigned position</li>
                            <li>• Think of specific evidence and examples</li>
                            <li>• Structure: opening statement → key points → conclusion</li>
                            <li>• Remember: you may disagree personally, but argue the position</li>
                          </ul>
                        </div>
                      )}
                      {currentPhase === 'presentation' && (
                        <div>
                          <h6 className="font-medium text-white mb-2">Presentation Phase (exactly 2 minutes):</h6>
                          <ul className="text-sm text-red-100 space-y-1">
                            <li>• Present your argument clearly and confidently</li>
                            <li>• Use evidence and examples to support your points</li>
                            <li>• Stay within the 2-minute time limit</li>
                            <li>• No interruptions during presentations</li>
                          </ul>
                        </div>
                      )}
                      {currentPhase === 'evaluation' && (
                        <div>
                          <h6 className="font-medium text-white mb-2">Evaluation Phase:</h6>
                          <ul className="text-sm text-red-100 space-y-1">
                            <li>• Evaluate arguments based on quality, not personal agreement</li>
                            <li>• Consider use of evidence and logical reasoning</li>
                            <li>• Note effective presentation techniques</li>
                            <li>• Reflect on what made arguments convincing</li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Panel */}
              <div className="col-span-4 space-y-4">
                {/* Student List */}
                <div className="p-4 bg-white/90 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Presentation Order</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {students.map((student, index) => (
                      <div 
                        key={index}
                        className={`p-3 rounded-lg border transition-colors cursor-pointer ${
                          index === currentStudent
                            ? 'border-red-500 bg-red-50'
                            : completedPresentations.includes(index)
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 bg-white hover:bg-gray-50'
                        }`}
                        onClick={() => setCurrentStudent(index)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                              index === currentStudent ? 'bg-red-500' :
                              completedPresentations.includes(index) ? 'bg-green-500' :
                              'bg-gray-400'
                            }`}>
                              {index + 1}
                            </div>
                            <span className="font-medium text-gray-800">{student}</span>
                          </div>
                          <div className="text-right">
                            <div className={`text-xs font-bold ${
                              assignedPositions[index] === 'for' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {assignedPositions[index] === 'for' ? 'FOR' : 'AGAINST'}
                            </div>
                            {completedPresentations.includes(index) && (
                              <CheckCircle2 className="w-4 h-4 text-green-500 mt-1" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Phase Controls */}
                <div className="p-4 bg-white/90 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Phase Controls</h3>
                  <div className="space-y-3">
                    <button
                      onClick={startPreparationPhase}
                      className={`w-full px-4 py-2 rounded-lg transition-colors ${
                        currentPhase === 'preparation' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                      }`}
                    >
                      Preparation (2 min)
                    </button>
                    <button
                      onClick={startPresentationPhase}
                      className={`w-full px-4 py-2 rounded-lg transition-colors ${
                        currentPhase === 'presentation' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      Presentation (2 min)
                    </button>
                    <button
                      onClick={startEvaluationPhase}
                      className={`w-full px-4 py-2 rounded-lg transition-colors ${
                        currentPhase === 'evaluation' ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                      }`}
                    >
                      Evaluation
                    </button>
                  </div>
                </div>

                {/* Progress Tracker */}
                <div className="p-4 bg-white/90 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Progress</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Completed:</span>
                      <span className="text-sm font-medium text-gray-800">
                        {completedPresentations.length} / {students.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(completedPresentations.length / students.length) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Evaluation Notes */}
                <div className="p-4 bg-white/90 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Evaluation Notes</h3>
                  <textarea
                    value={evaluationNotes}
                    onChange={(e) => setEvaluationNotes(e.target.value)}
                    placeholder="Note the strongest arguments and effective techniques..."
                    className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Guidelines */}
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h3 className="text-sm font-medium text-red-800 mb-2">Challenge Guidelines:</h3>
                  <ul className="space-y-1 text-xs text-red-700">
                    <li>• Exactly 2 minutes - no more, no less</li>
                    <li>• Defend assigned position regardless of personal beliefs</li>
                    <li>• Use evidence and examples, not just opinions</li>
                    <li>• Listen respectfully to all arguments</li>
                    <li>• Evaluate quality of reasoning, not agreement</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Text */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-base text-gray-800">
                💬 Through defending assigned perspectives under time pressure, we develop critical thinking, argumentation skills, and the ability to understand viewpoints different from our own.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <NavigationArrow direction="left" onClick={() => navigate('/')} />
              <NavigationArrow direction="right" onClick={() => navigate('/admin/lesson-library')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}