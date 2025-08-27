import React, { useState } from 'react';
import { ChevronLeft, Download, Users, Target, FileText, Edit2, Save, CheckCircle2, AlertCircle, Eye, Settings, Calendar, BookOpen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCalendarStore } from '../store/calendarStore';

// Mock student data
const MOCK_STUDENTS = [
  {
    id: '1',
    name: 'Alice Smith',
    class: 'Year 10A',
    responses: [
      {
        question: 'Analyze how the writer uses language to create atmosphere in the given extract.',
        answer: 'The writer effectively creates a tense atmosphere through carefully chosen language. The metaphor "sky of perpetual twilight" suggests a world trapped in darkness, while "flickering screens" creates an unsettling sense of surveillance. Sensory details like "cold metal" and "artificial scent" reinforce the clinical, controlled environment.',
        marks: 8,
        maxMarks: 10,
        feedback: 'Good analysis of language techniques. Consider exploring the cumulative effect of these techniques on the reader.'
      },
      {
        question: 'Explain how the writer builds tension through structural choices.',
        answer: 'The writer builds tension by starting with a broad view of the city before zooming in to personal details. The contrast between the grand scale of "identical buildings" and intimate details like Sarah\'s "mandatory identification band" creates a sense of being trapped in an overwhelming system.',
        marks: 7,
        maxMarks: 10,
        feedback: 'Strong understanding of structural techniques. Could analyze paragraph structure more explicitly.'
      }
    ],
    level: 'Secure',
    overallFeedback: 'Alice demonstrates strong analytical skills and good understanding of language techniques. To reach higher marks, focus on exploring the cumulative impact of techniques and developing more sophisticated analysis.'
  },
  {
    id: '2',
    name: 'Bob Johnson',
    class: 'Year 10A',
    responses: [
      {
        question: 'Analyze how the writer uses language to create atmosphere in the given extract.',
        answer: 'The writer uses words like "twilight" and "flickering" to make it feel dark and scary. The buildings are all the same and there are screens everywhere watching people. It feels like a bad place to live.',
        marks: 5,
        maxMarks: 10,
        feedback: 'Basic identification of techniques. Try to analyze the effect of these techniques on the reader.'
      },
      {
        question: 'Explain how the writer builds tension through structural choices.',
        answer: 'The writer describes the city first and then talks about Sarah. We learn about the identification band she has to wear and how she feels trapped. The writer shows how the city controls everyone.',
        marks: 4,
        maxMarks: 10,
        feedback: 'Some understanding of structure. Consider how the sequence of ideas builds tension.'
      }
    ],
    level: 'Developing',
    overallFeedback: 'Bob shows basic understanding of the text but needs to develop his analytical skills. Focus on explaining how techniques create specific effects and use more sophisticated vocabulary in analysis.'
  }
];

export default function GeneratedAssessment() {
  const router = useRouter();
  
  // Get assessment data from sessionStorage
  const [assessment, setAssessment] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('generatedAssessment');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });
  
  const [editingFeedback, setEditingFeedback] = useState<string | null>(null);
  const [editedFeedback, setEditedFeedback] = useState<Record<string, string>>({});
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);
  const [editedQuestions, setEditedQuestions] = useState<Record<string, string>>({});
  const { addAssessment } = useCalendarStore();

  if (!assessment) {
    return (
      <div className="min-h-[calc(100vh-48px)] bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No assessment data available</p>
          <button
            onClick={() => router.push('/assessment-design')}
            className="mt-4 px-4 py-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B434] transition-colors"
          >
            Return to Assessment Design
          </button>
        </div>
      </div>
    );
  }

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

  const handleEditQuestion = (questionId: string, text: string) => {
    setEditingQuestion(questionId);
    setEditedQuestions(prev => ({
      ...prev,
      [questionId]: text
    }));
  };

  const handleSaveQuestion = (questionId: string) => {
    setEditingQuestion(null);
  };

  const handleDownload = () => {
    try {
      const doc = {
        title: assessment.title,
        description: assessment.description,
        duration: assessment.duration,
        sections: assessment.sections,
        markScheme: assessment.markScheme,
        studentResponses: MOCK_STUDENTS,
        createdAt: new Date().toISOString(),
      };

      const jsonString = JSON.stringify(doc, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${assessment.title || 'assessment'}_${new Date().toISOString().split('T')[0]}.json`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading assessment:', error);
      alert('Failed to download assessment. Please try again.');
    }
  };

  const handleAddToCalendar = () => {
    try {
      const calendarAssessment = {
        id: Date.now().toString(),
        title: assessment.title || 'Untitled Assessment',
        description: assessment.description,
        type: 'assessment' as const,
        date: new Date().toISOString().split('T')[0],
        content: {
          ...assessment,
          studentResponses: MOCK_STUDENTS
        }
      };

      addAssessment(calendarAssessment);
      alert('Assessment added to calendar successfully!');
    } catch (error) {
      console.error('Error adding to calendar:', error);
      alert('Failed to add assessment to calendar. Please try again.');
    }
  };

  const handleAddToLibrary = () => {
    try {
      alert('Assessment added to lesson library successfully!');
    } catch (error) {
      console.error('Error adding to library:', error);
      alert('Failed to add assessment to lesson library. Please try again.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#F8F9FA]">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button 
             onClick={() => router.push('/assessment-design')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#768396]">Generated Assessment</h1>
              <p className="text-sm text-gray-600">{assessment.title || 'Student Assessment'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleAddToCalendar}
              className="px-4 py-2 bg-[#FFF9E7] text-[#FFC83D] rounded-lg hover:bg-[#FFC83D]/10 transition-colors flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Add to Calendar</span>
            </button>
            <button 
              onClick={handleAddToLibrary}
              className="px-4 py-2 bg-[#FFF9E7] text-[#FFC83D] rounded-lg hover:bg-[#FFC83D]/10 transition-colors flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Add to Lesson Library</span>
            </button>
            <button 
              onClick={handleDownload}
              className="px-4 py-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B434] transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Assessment</span>
            </button>
          </div>
        </div>

        <div className="flex flex-row gap-6">
          <div className="flex-1 bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#FFF9E7] rounded-lg flex items-center justify-center">
                  <FileText className="w-4 h-4 text-[#FFC83D]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Question Sheet</h3>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-gray-400" />
                <p className="text-sm text-gray-600">{assessment.description}</p>
              </div>

              <div className="space-y-8">
                {assessment.sections?.map((section: any, sectionIndex: number) => (
                  <div key={sectionIndex} className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Section {sectionIndex + 1}: {section.title}
                    </h3>

                    <div className="space-y-8">
                      {section.questions?.map((question: any, questionIndex: number) => {
                        const questionId = `${sectionIndex}-${questionIndex}`;
                        return (
                          <div key={questionIndex} className="space-y-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3 flex-1">
                                <div className="w-8 h-8 bg-[#FFF9E7] rounded-lg flex items-center justify-center flex-shrink-0">
                                  <span className="text-sm font-medium text-[#FFC83D]">{questionIndex + 1}</span>
                                </div>
                                <div className="space-y-2 flex-1">
                                  {editingQuestion === questionId ? (
                                    <div className="flex gap-2">
                                      <textarea
                                        value={editedQuestions[questionId] || question.text}
                                        onChange={(e) => setEditedQuestions(prev => ({
                                          ...prev,
                                          [questionId]: e.target.value
                                        }))}
                                        className="flex-1 p-2 border border-gray-200 rounded-lg text-sm text-gray-800 focus:ring-2 focus:ring-[#FFC83D] focus:border-transparent"
                                        rows={3}
                                      />
                                      <button
                                        onClick={() => handleSaveQuestion(questionId)}
                                        className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                      >
                                        <Save className="w-4 h-4" />
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="flex items-start justify-between gap-2">
                                      <p className="text-gray-800 flex-1">{question.text}</p>
                                      <button
                                        onClick={() => handleEditQuestion(questionId, question.text)}
                                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                                      >
                                        <Edit2 className="w-4 h-4 text-gray-400" />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="ml-11">
                              <div className="min-h-[100px] border border-gray-200 rounded-lg p-4 bg-gray-50">
                                <p className="text-gray-400 text-sm">Answer space...</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#FFF9E7] rounded-lg flex items-center justify-center">
                  <Settings className="w-4 h-4 text-[#FFC83D]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Assessment Details</h3>
              </div>
            </div>

            <div className="space-y-6">
              {assessment.markScheme && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Mark Scheme</h4>
                  <div className="space-y-4">
                    {assessment.markScheme.map((level: any, index: number) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <h5 className="font-medium text-gray-800 mb-2">{level.level}</h5>
                        <ul className="space-y-1">
                          {level.descriptors.map((descriptor: string, dIndex: number) => (
                            <li key={dIndex} className="flex items-start gap-2 text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5" />
                              {descriptor}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Question Mark Schemes</h4>
                <div className="space-y-4">
                  {assessment.sections?.map((section: any, sectionIndex: number) => (
                    <div key={sectionIndex}>
                      {section.questions?.map((question: any, questionIndex: number) => (
                        <div key={questionIndex} className="border border-gray-200 rounded-lg p-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">
                            Question {questionIndex + 1}
                          </p>
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <p className="text-sm text-gray-600">{question.markScheme}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-[#FFF9E7] rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-[#FFC83D]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Student Responses</h3>
            </div>

            <div className="space-y-6">
              {MOCK_STUDENTS.map(student => (
                <div key={student.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-gray-800">{student.name}</h4>
                      <p className="text-sm text-gray-600">{student.class}</p>
                    </div>
                    <div className={`px-2 py-1 rounded text-sm font-medium ${
                      student.level === 'Secure' ? 'bg-green-50 text-green-600' :
                      student.level === 'Developing' ? 'bg-amber-50 text-amber-600' :
                      'bg-red-50 text-red-600'
                    }`}>
                      {student.level}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {student.responses.map((response, index) => (
                      <div key={index} className="space-y-2">
                        <p className="text-sm font-medium text-gray-700">{response.question}</p>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-600">{response.answer}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              (response.marks / response.maxMarks) >= 0.7 ? 'bg-green-500' :
                              (response.marks / response.maxMarks) >= 0.4 ? 'bg-amber-500' :
                              'bg-red-500'
                            }`} />
                            <span className="text-sm text-gray-600">{response.marks}/{response.maxMarks} marks</span>
                          </div>
                          <div className="text-sm text-gray-600">{response.feedback}</div>
                        </div>
                      </div>
                    ))}

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-sm font-medium text-gray-700">Overall Feedback</h5>
                        {editingFeedback === student.id ? (
                          <button
                            onClick={() => handleSaveFeedback(student.id)}
                            className="p-1 hover:bg-green-100 rounded transition-colors"
                          >
                            <Save className="w-4 h-4 text-green-600" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEditFeedback(student.id, student.overallFeedback)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                          >
                            <Edit2 className="w-4 h-4 text-gray-400" />
                          </button>
                        )}
                      </div>
                      {editingFeedback === student.id ? (
                        <textarea
                          value={editedFeedback[student.id] || student.overallFeedback}
                          onChange={(e) => setEditedFeedback(prev => ({
                            ...prev,
                            [student.id]: e.target.value
                          }))}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC83D]"
                          rows={3}
                        />
                      ) : (
                        <p className="text-sm text-gray-600">{student.overallFeedback}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}