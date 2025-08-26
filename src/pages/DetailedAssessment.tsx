import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Target, FileText, Edit2, Save, Download, Users, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

// Mock student data
const MOCK_STUDENTS = [
  {
    id: '1',
    name: 'Alice Smith',
    class: 'Year 10A',
    subject: 'English',
    progress: {
      autumn: { level: 'Developing', score: 65 },
      spring: { level: 'Developing+', score: 72 },
      summer: { level: 'Secure', score: 85 }
    },
    report: {
      strengths: 'Alice has shown excellent progress in analytical writing and critical thinking. Her contributions to class discussions are thoughtful and well-reasoned.',
      improvements: 'To progress further, Alice should focus on incorporating more sophisticated vocabulary and developing more complex sentence structures.',
      nextSteps: 'Continue developing analytical skills through independent reading and practice with comparative analysis.'
    }
  },
  {
    id: '2',
    name: 'Bob Johnson',
    class: 'Year 10A',
    subject: 'English',
    progress: {
      autumn: { level: 'Emerging+', score: 45 },
      spring: { level: 'Developing', score: 58 },
      summer: { level: 'Developing+', score: 68 }
    },
    report: {
      strengths: 'Bob has made steady progress throughout the year, particularly in comprehension and basic analysis. His engagement in group work has improved significantly.',
      improvements: 'Focus needed on developing written expression and supporting arguments with relevant evidence from texts.',
      nextSteps: 'Work on structuring essays more effectively and building confidence in independent analysis.'
    }
  }
];

const LEARNING_OBJECTIVE = 'To analyze how writers use language and structure to create tension in dystopian narratives.';

export default function DetailedAssessment() {
  const navigate = useNavigate();
  const [editingFeedback, setEditingFeedback] = useState<string | null>(null);
  const [editedFeedback, setEditedFeedback] = useState<Record<string, string>>({});

  const handleEditFeedback = (studentId: string, feedback: string) => {
    setEditingFeedback(studentId);
    setEditedFeedback(prev => ({
      ...prev,
      [studentId]: feedback
    }));
  };

  const handleSaveFeedback = (studentId: string) => {
    setEditingFeedback(null);
  };

  const renderProgressIndicator = (currentScore: number, previousScore: number) => {
    if (currentScore > previousScore) {
      return <ArrowUpRight className="w-4 h-4 text-green-500" />;
    } else if (currentScore < previousScore) {
      return <ArrowDownRight className="w-4 h-4 text-red-500" />;
    }
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#F8F9FA]">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/assess')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#768396]">Detailed Assessment</h1>
              <p className="text-sm text-gray-600">View and manage student progress reports</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B434] transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>Export Reports</span>
          </button>
        </div>

        {/* Learning Objective */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-[#FFF9E7] rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-[#FFC83D]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Learning Objective</h3>
          </div>
          <p className="text-gray-700">{LEARNING_OBJECTIVE}</p>
        </div>

        {/* Student Reports */}
        <div className="space-y-6">
          {MOCK_STUDENTS.map(student => (
            <div key={student.id} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FFF9E7] rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#FFC83D]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{student.name}</h2>
                    <p className="text-sm text-gray-600">{student.class} • {student.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Download className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Autumn Term</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{student.progress.autumn.level}</span>
                    <span className="text-sm font-medium">{student.progress.autumn.score}%</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Spring Term</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{student.progress.spring.level}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{student.progress.spring.score}%</span>
                      {renderProgressIndicator(student.progress.spring.score, student.progress.autumn.score)}
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Summer Term</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{student.progress.summer.level}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{student.progress.summer.score}%</span>
                      {renderProgressIndicator(student.progress.summer.score, student.progress.spring.score)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Report Content */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-700">Areas of Strength</h3>
                    <button
                      onClick={() => handleEditFeedback(student.id, student.report.strengths)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  {editingFeedback === student.id ? (
                    <div className="flex gap-2">
                      <textarea
                        value={editedFeedback[student.id] || student.report.strengths}
                        onChange={(e) => setEditedFeedback(prev => ({
                          ...prev,
                          [student.id]: e.target.value
                        }))}
                        className="flex-1 p-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:ring-2 focus:ring-[#FFC83D] focus:border-transparent"
                        rows={3}
                      />
                      <button
                        onClick={() => handleSaveFeedback(student.id)}
                        className="p-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B434] transition-colors"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">{student.report.strengths}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-700">Areas for Improvement</h3>
                    <button
                      onClick={() => handleEditFeedback(student.id, student.report.improvements)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  {editingFeedback === student.id ? (
                    <div className="flex gap-2">
                      <textarea
                        value={editedFeedback[student.id] || student.report.improvements}
                        onChange={(e) => setEditedFeedback(prev => ({
                          ...prev,
                          [student.id]: e.target.value
                        }))}
                        className="flex-1 p-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:ring-2 focus:ring-[#FFC83D] focus:border-transparent"
                        rows={3}
                      />
                      <button
                        onClick={() => handleSaveFeedback(student.id)}
                        className="p-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B434] transition-colors"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">{student.report.improvements}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium text-gray-700">Next Steps</h3>
                    <button
                      onClick={() => handleEditFeedback(student.id, student.report.nextSteps)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  {editingFeedback === student.id ? (
                    <div className="flex gap-2">
                      <textarea
                        value={editedFeedback[student.id] || student.report.nextSteps}
                        onChange={(e) => setEditedFeedback(prev => ({
                          ...prev,
                          [student.id]: e.target.value
                        }))}
                        className="flex-1 p-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:ring-2 focus:ring-[#FFC83D] focus:border-transparent"
                        rows={3}
                      />
                      <button
                        onClick={() => handleSaveFeedback(student.id)}
                        className="p-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B434] transition-colors"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">{student.report.nextSteps}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}