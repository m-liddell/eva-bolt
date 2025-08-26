import React from 'react';
import { ChevronLeft, Clock, Target, FileText, AlertCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function StudentQuestionSheet() {
  const navigate = useNavigate();
  const location = useLocation();
  const assessment = location.state?.assessment;

  if (!assessment) {
    return (
      <div className="min-h-[calc(100vh-48px)] bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No assessment data available</p>
          <button
            onClick={() => navigate('/assessment-design')}
            className="mt-4 px-4 py-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B434] transition-colors"
          >
            Return to Assessment Design
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#F8F9FA]">
      <div className="max-w-[800px] mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/generated-assessment')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#768396]">Student Question Sheet</h1>
              <p className="text-sm text-gray-600">{assessment.title || 'Assessment Paper'}</p>
            </div>
          </div>
        </div>

        {/* Question Paper */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          {/* Assessment Information */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">{assessment.title}</h2>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#FFF9E7] rounded-lg">
                <Clock className="w-4 h-4 text-[#FFC83D]" />
                <span className="text-sm font-medium text-[#FFC83D]">{assessment.duration}</span>
              </div>
            </div>

            <div className="space-y-3">
              {/* Learning Objective */}
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-gray-400" />
                <p className="text-sm text-gray-600">{assessment.description}</p>
              </div>

              {/* Instructions */}
              <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-600">
                  <p className="font-medium mb-1">Instructions:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Read each question carefully before answering</li>
                    <li>Pay attention to the marks allocated for each question</li>
                    <li>Write your answers clearly and legibly</li>
                    <li>Support your answers with relevant evidence from the text</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-8">
            {assessment.sections?.map((section: any, sectionIndex: number) => (
              <div key={sectionIndex} className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  Section {sectionIndex + 1}: {section.title}
                </h3>

                <div className="space-y-8">
                  {section.questions?.map((question: any, questionIndex: number) => (
                    <div key={questionIndex} className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-[#FFF9E7] rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium text-[#FFC83D]">{questionIndex + 1}</span>
                        </div>
                        <div className="space-y-2">
                          <p className="text-gray-800">{question.text}</p>
                          {question.guidance && (
                            <p className="text-sm text-gray-600 italic">{question.guidance}</p>
                          )}
                        </div>
                      </div>

                      {/* Answer Space */}
                      <div className="ml-11">
                        <div className="min-h-[200px] border border-gray-200 rounded-lg p-4">
                          <p className="text-gray-400 text-sm">Write your answer here...</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* End of Paper */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-gray-500">
              <FileText className="w-4 h-4" />
              <span className="text-sm">End of Question Paper</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}