import React, { useState } from 'react';
import { ChevronLeft, FileText, Search, Edit2, Save, Download, Users, ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

export default function EndOfYear() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingStudent, setEditingStudent] = useState<string | null>(null);
  const [editedReports, setEditedReports] = useState<Record<string, typeof MOCK_STUDENTS[0]['report']>>({});

  const handleEdit = (studentId: string) => {
    setEditingStudent(studentId);
    // Initialize edited report with current values if not already present
    if (!editedReports[studentId]) {
      const student = MOCK_STUDENTS.find(s => s.id === studentId);
      if (student) {
        setEditedReports(prev => ({
          ...prev,
          [studentId]: { ...student.report }
        }));
      }
    }
  };

  const handleSave = (studentId: string) => {
    setEditingStudent(null);
  };

  const handleReportChange = (
    studentId: string,
    field: keyof typeof MOCK_STUDENTS[0]['report'],
    value: string
  ) => {
    setEditedReports(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value
      }
    }));
  };

  const renderProgressIndicator = (currentScore: number, previousScore: number) => {
    if (currentScore > previousScore) {
      return <ArrowUpRight className="w-4 h-4 text-green-500" />;
    } else if (currentScore < previousScore) {
      return <ArrowDownRight className="w-4 h-4 text-red-500" />;
    }
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const filteredStudents = MOCK_STUDENTS.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#F8F9FA]">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#768396]">End of Year Reports</h1>
              <p className="text-sm text-gray-600">Generate and manage student progress reports</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC83D] w-64"
              />
            </div>
            <button className="px-4 py-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B434] transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              <span>Export All</span>
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {filteredStudents.map(student => (
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
                  {editingStudent === student.id ? (
                    <button
                      onClick={() => handleSave(student.id)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(student.id)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                  )}
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
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Areas of Strength</h3>
                  {editingStudent === student.id ? (
                    <textarea
                      value={editedReports[student.id]?.strengths || student.report.strengths}
                      onChange={(e) => handleReportChange(student.id, 'strengths', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC83D]"
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{student.report.strengths}</p>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Areas for Improvement</h3>
                  {editingStudent === student.id ? (
                    <textarea
                      value={editedReports[student.id]?.improvements || student.report.improvements}
                      onChange={(e) => handleReportChange(student.id, 'improvements', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC83D]"
                      rows={3}
                    />
                  ) : (
                    <p className="text-sm text-gray-600">{student.report.improvements}</p>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Next Steps</h3>
                  {editingStudent === student.id ? (
                    <textarea
                      value={editedReports[student.id]?.nextSteps || student.report.nextSteps}
                      onChange={(e) => handleReportChange(student.id, 'nextSteps', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC83D]"
                      rows={3}
                    />
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