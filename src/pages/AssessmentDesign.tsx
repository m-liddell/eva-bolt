import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Target, AlertCircle, ChevronRight, FileText, Info, Edit2, Check, Upload, ChevronDown, Plus, Wand2 } from 'lucide-react';

// Assessment types with their specific requirements
const ASSESSMENT_TYPES = {
  'Written Test': {
    questions: [
      'What is the primary learning objective being assessed?',
      'What specific skills or knowledge should students demonstrate?',
      'What types of questions will best assess these skills? (e.g., multiple choice, short answer, essay)',
      'How many questions are needed to adequately assess understanding?',
      'What is the appropriate time allocation for this assessment?',
      'What accommodations might be needed for different learning needs?'
    ],
    examples: {
      'English': 'Analysis of unseen text, creative writing task, comparative essay',
      'Mathematics': 'Problem-solving questions, mathematical proofs, real-world applications',
      'Science': 'Experimental design, data analysis, scientific explanations'
    },
    exampleAnswers: {
      'What is the primary learning objective being assessed?': 'To analyze how writers use language and structure to create tension in dystopian narratives.',
      'What specific skills or knowledge should students demonstrate?': 'Students should demonstrate their ability to identify and analyze descriptive techniques, evaluate their effectiveness in creating atmosphere, and explain how structural choices contribute to building tension.',
      'What types of questions will best assess these skills? (e.g., multiple choice, short answer, essay)': 'A combination of question types: 1) Short answer questions to analyze specific techniques (15 marks), 2) Extended response comparing two extracts (15 marks), 3) Creative writing task applying techniques studied (20 marks).',
      'How many questions are needed to adequately assess understanding?': 'Three main sections with multiple parts: 1) 4-5 short analysis questions, 2) One comparative analysis, 3) One creative writing task. Total marks: 50.',
      'What is the appropriate time allocation for this assessment?': '1 hour total: 20 minutes for short answer section, 20 minutes for comparative analysis, 20 minutes for creative writing.',
      'What accommodations might be needed for different learning needs?': 'Extra time allocation (25%), word processor access for students with writing difficulties, enlarged font versions for visual impairments, writing frames for EAL students.'
    }
  },
  'Practical Assessment': {
    questions: [
      'What practical skills are being assessed?',
      'What equipment or materials are needed?',
      'How will safety considerations be addressed?',
      'What is the step-by-step procedure students should follow?',
      'How will accuracy and technique be evaluated?',
      'What data or observations should students record?',
      'How will students document their practical work?'
    ],
    examples: {
      'Science': 'Laboratory experiment, field investigation, technical procedure',
      'Art': 'Portfolio creation, technique demonstration, material manipulation',
      'Computing': 'Programming task, system configuration, debugging exercise'
    },
    exampleAnswers: {
      'What practical skills are being assessed?': 'Students will demonstrate their ability to set up and conduct a controlled investigation of energy transfer using a stacked ball drop experiment, including accurate measurements, data collection, and analysis.',
      'What equipment or materials are needed?': '30cm ruler, golf ball, ping pong ball, bench/table to bounce off, sticky tape, A4 sheet of clear plastic (e.g., document wallet), mass balance (capable of measuring to nearest gram).',
      'How will safety considerations be addressed?': 'Clear workspace required, safety goggles worn, defined drop zones marked, procedure for safe ball retrieval, immediate reporting of any breakages, adult supervision throughout.',
      'What is the step-by-step procedure students should follow?': '1) Roll plastic sheet into 30cm tube, secure with tape. 2) Stand tube upright on bench. 3) Drop ping pong ball, measure bounce height. 4) Repeat with golf ball. 5) Measure mass of both balls. 6) Stack balls and drop together. 7) Measure final bounce height.',
      'How will accuracy and technique be evaluated?': 'Assessment criteria: 1) Accurate measurement and recording of heights (±0.5cm), 2) Consistent drop technique, 3) Proper control of variables, 4) Reliable repetition of measurements, 5) Appropriate handling of equipment.',
      'What data or observations should students record?': 'Initial and final heights of both balls, mass of each ball, bounce heights for individual and stacked drops, qualitative observations of ball behavior, any anomalous results and possible explanations.',
      'How will students document their practical work?': 'Results table provided in lab book, diagram of setup, calculations showing energy transfer, graph of height vs mass ratio, written evaluation of accuracy and reliability.'
    }
  }
};

function AssessmentDesign() {
  const router = useRouter();
  const [showGuidance, setShowGuidance] = useState(false);
  const [selectedType, setSelectedType] = useState<keyof typeof ASSESSMENT_TYPES | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswerChange = (question: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [question]: value
    }));
  };

  const getExampleAnswer = (question: string) => {
    if (!selectedType) return '';
    return ASSESSMENT_TYPES[selectedType].exampleAnswers[question] || '';
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/assess');
    } catch (error) {
      alert('Failed to save assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerate = async () => {
    setIsSubmitting(true);
    try {
      const assessment = {
        title: 'Generated Assessment',
        description: 'To analyze how writers use language and structure to create tension in dystopian narratives.',
        duration: '60 minutes',
        sections: [
          {
            title: 'Short Answer Analysis',
            questions: [
              {
                text: 'Analyze how the writer uses language to create atmosphere in the given extract.',
                markScheme: 'Award marks for: identification of language techniques, analysis of effect, use of evidence'
              },
              {
                text: 'Explain how the writer builds tension through structural choices.',
                markScheme: 'Consider: paragraph structure, sentence variety, narrative perspective'
              }
            ]
          },
          {
            title: 'Extended Response',
            questions: [
              {
                text: 'Compare how tension is created in both extracts, focusing on the writers\' use of language and structure.',
                markScheme: 'Evaluate: comparative analysis, technical vocabulary, evidence selection'
              }
            ]
          }
        ],
        markScheme: [
          {
            level: 'Level 5 (17-20 marks)',
            descriptors: [
              'Sophisticated analysis of language and structure',
              'Perceptive understanding of effects',
              'Well-selected evidence integrated throughout'
            ]
          },
          {
            level: 'Level 4 (13-16 marks)',
            descriptors: [
              'Detailed analysis of techniques',
              'Clear understanding of effects',
              'Relevant evidence used effectively'
            ]
          },
          {
            level: 'Level 3 (9-12 marks)',
            descriptors: [
              'Some analysis of techniques',
              'General understanding of effects',
              'Some relevant evidence used'
            ]
          }
        ]
      };

      router.push('/generated-assessment');
      // Store assessment data in sessionStorage for the next page
      sessionStorage.setItem('generatedAssessment', JSON.stringify(assessment));
    } catch (error) {
      alert('Failed to generate assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#F8F9FA]">
      <div className="max-w-[1400px] mx-auto px-4 py-2 w-full">
        <div className="bg-white rounded-lg border border-[#A4AAB2] p-3 sticky top-4 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FFF9E7] flex items-center justify-center">
                <FileText className="w-4 h-4 text-[#FFC83D]" />
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-[#768396]">Design Assessment</h1>
                <button 
                  onClick={() => setShowGuidance(!showGuidance)}
                  className="p-1 hover:bg-[#FFF9E7] rounded-full transition-colors"
                >
                  <Info className="w-4 h-4 text-[#FFC83D]" />
                </button>
              </div>
            </div>
            <button
              onClick={() => navigate('/assess')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {showGuidance && (
            <div className="mt-3 p-3 bg-[#FFF9E7] rounded-lg border border-[#FFC83D]/20">
              <div className="flex items-start gap-3">
                <div>
                  <h2 className="text-sm font-medium text-[#B17F17] mb-1">Assessment Design Guide</h2>
                  <p className="text-sm text-[#B17F17]">
                    Follow these steps to create an effective assessment:
                  </p>
                  <ul className="mt-2 text-sm text-[#B17F17] list-disc list-inside">
                    <li>Choose an assessment type that best matches your learning objectives</li>
                    <li>Consider the specific skills and knowledge you want to assess</li>
                    <li>Plan appropriate time allocations and resources</li>
                    <li>Include accommodations for different learning needs</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-[#FFC83D] mb-4">Step 1: Select Assessment Type</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(ASSESSMENT_TYPES).map(([type, details]) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type as keyof typeof ASSESSMENT_TYPES)}
                  className={`p-4 rounded-lg border-2 transition-colors text-left ${
                    selectedType === type
                      ? 'border-[#FFC83D] bg-[#FFF9E7]'
                      : 'border-gray-200 hover:border-[#FFC83D]'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-[#FFF9E7] rounded-lg flex items-center justify-center">
                      {type === 'Written Test' && <FileText className="w-4 h-4 text-[#FFC83D]" />}
                      {type === 'Practical Assessment' && <Target className="w-4 h-4 text-[#FFC83D]" />}
                      {type === 'Project-Based' && <Edit2 className="w-4 h-4 text-[#FFC83D]" />}
                      {type === 'Performance-Based' && <ChevronRight className="w-4 h-4 text-[#FFC83D]" />}
                    </div>
                    <h3 className="font-medium">{type}</h3>
                  </div>
                  <div className="space-y-2">
                    {Object.entries(details.examples).map(([subject, example]) => (
                      <div key={subject} className="text-sm">
                        <span className="font-medium text-gray-700">{subject}:</span>
                        <span className="text-gray-600 ml-1">{example}</span>
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedType && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-[#FFC83D] mb-4">Step 2: Design Your Assessment</h2>
              <div className="space-y-6">
                {ASSESSMENT_TYPES[selectedType].questions.map((question, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {question}
                    </label>
                    <textarea
                      value={answers[question] || ''}
                      onChange={(e) => handleAnswerChange(question, e.target.value)}
                      placeholder={getExampleAnswer(question)}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#FFC83D] focus:border-transparent"
                      rows={4}
                    />
                  </div>
                ))}

                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => router.push('/assess')}
                    className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Back to Assessments
                  </button>
                  <button
                    onClick={handleGenerate}
                    className="px-4 py-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B434] transition-colors flex items-center gap-2"
                  >
                    <Wand2 className="w-4 h-4" />
                    <span>Generate Assessment</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AssessmentDesign;