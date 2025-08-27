import React from 'react';
import { ChevronLeft, Download, Users, Target, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AssessmentDetails() {
  const router = useRouter();
  
  // Get assessment data from sessionStorage
  const [assessment] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('generatedAssessment');
      return stored ? JSON.parse(stored) : null;
    }
    return null;
  });

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

  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#F8F9FA]">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button 
             onClick={() => router.push('/generated-assessment')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#768396]">Assessment Details</h1>
              <p className="text-sm text-gray-600">{assessment.title || 'Assessment Overview'}</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B434] transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span>Download Assessment</span>
          </button>
        </div>

        <div className="space-y-6">
          {/* Learning Objective */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#FFF9E7] rounded-lg flex items-center justify-center">
                <Target className="w-4 h-4 text-[#FFC83D]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Learning Objective</h3>
            </div>
            <p className="text-gray-700">{assessment.description}</p>
          </div>

          {/* Assessment Details */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-[#FFF9E7] rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-[#FFC83D]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Assessment Details</h3>
            </div>
            
            <div className="space-y-6">
              {/* Duration */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Duration</h4>
                <p className="text-sm text-gray-600">{assessment.duration || '60 minutes'}</p>
              </div>

              {/* Assessment Sections */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Assessment Sections</h4>
                <div className="space-y-4">
                  {assessment.sections?.map((section: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <h5 className="font-medium text-gray-800 mb-2">Section {index + 1}: {section.title}</h5>
                      <div className="space-y-4">
                        {section.questions?.map((question: any, qIndex: number) => (
                          <div key={qIndex} className="space-y-2">
                            <p className="text-sm text-gray-700">{question.text}</p>
                            {question.markScheme && (
                              <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-xs font-medium text-gray-600 mb-1">Mark Scheme</p>
                                <p className="text-sm text-gray-700">{question.markScheme}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mark Scheme */}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}