import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown, ChevronRight, ChevronLeft, BookOpen, AlertCircle, Target, FileText, Info, Edit2, Save, Plus, Upload, Check, Clock, Users, Brain, CheckCircle2, Eye, MessageCircle, Settings } from 'lucide-react';
import { Calendar as CalendarComponent } from '../components/Calendar';
import { useTimetableStore } from '../store/timetableStore';
import { OnboardingTour } from '../components/OnboardingTour';
import { useOnboarding } from '../hooks/useOnboarding';

// Mock lessons for demonstration
const MOCK_LESSONS = [
  {
    id: '1',
    subject: 'English',
    yearGroup: 'Year 10',
    class: 'A',
    objectives: [{
      id: '1',
      code: 'EN1',
      description: 'To analyze how writers use language and structure to create tension in dystopian narratives.'
    }],
    theme: 'Dystopian Writing',
    activities: {
      starter: {
        title: 'Dystopian Story Opening',
        description: 'Analyze and create engaging dystopian story openings',
        duration: '10 mins',
        type: 'discussion'
      },
      main: {
        title: 'Character Development',
        description: 'Develop complex characters in dystopian settings',
        duration: '30 mins',
        type: 'individual'
      },
      plenary: {
        title: 'Peer Review',
        description: 'Share and analyze story openings',
        duration: '10 mins',
        type: 'group'
      }
    }
  },
  {
    id: '2',
    subject: 'Science',
    yearGroup: 'Year 9',
    class: 'B',
    objectives: [{
      id: '2',
      code: 'SC1',
      description: 'To investigate how energy is conserved and transferred in a stacked ball drop experiment.'
    }],
    theme: 'Energy Conservation',
    activities: {
      starter: {
        title: 'Energy Transfer Discussion',
        description: 'Explore real-world energy transfers',
        duration: '10 mins',
        type: 'discussion'
      },
      main: {
        title: 'Ball Drop Investigation',
        description: 'Practical investigation of energy transfer',
        duration: '35 mins',
        type: 'group'
      },
      plenary: {
        title: 'Results Analysis',
        description: 'Analyze and explain findings',
        duration: '15 mins',
        type: 'individual'
      }
    }
  },
  {
    id: '3',
    subject: 'History',
    yearGroup: 'Year 9',
    class: 'C',
    objectives: [{
      id: '3',
      code: 'HI1',
      description: 'To analyze different perspectives on the Industrial Revolution and evaluate its social impact.'
    }],
    theme: 'Industrial Revolution',
    activities: {
      starter: {
        title: 'Historical Perspectives',
        description: 'Explore different viewpoints on industrialization',
        duration: '10 mins',
        type: 'discussion'
      },
      main: {
        title: 'Source Analysis',
        description: 'Analyze primary sources from different social groups',
        duration: '35 mins',
        type: 'individual'
      },
      plenary: {
        title: 'Impact Evaluation',
        description: 'Evaluate the social changes of industrialization',
        duration: '15 mins',
        type: 'group'
      }
    }
  }
];

// Generate 30 mock students
const MOCK_STUDENTS = Array.from({ length: 30 }, (_, i) => {
  const levels = ['Emerging', 'Emerging+', 'Developing', 'Developing+', 'Secure', 'Secure+'];
  const names = [
    'Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack',
    'Kate', 'Liam', 'Mia', 'Noah', 'Olivia', 'Peter', 'Quinn', 'Rachel', 'Sam', 'Tara',
    'Uma', 'Victor', 'Wendy', 'Xavier', 'Yara', 'Zack', 'Adam', 'Beth', 'Carl', 'Diana'
  ];
  const surnames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
    'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
    'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson'
  ];
  
  // Distribute students across levels roughly evenly
  const levelIndex = Math.floor(i / 5) % levels.length;
  
  return {
    id: i + 1,
    name: `${names[i]} ${surnames[i]}`,
    currentWork: {
      level: levels[levelIndex]
    }
  };
});

// Mock rubrics for demonstration
const MOCK_RUBRICS = [
  {
    id: '1',
    name: 'Dystopian Writing Rubric',
    lastUsed: '2024-03-28',
    levels: {
      Emerging: {
        criteria: [
          'Basic vocabulary and simple sentences',
          'Limited use of descriptive techniques',
          'Basic story structure'
        ],
        generalComment: 'Basic understanding shown with simple vocabulary and straightforward sentences.',
        nextSteps: 'Focus on expanding vocabulary and using more descriptive language. Practice using sensory details to create atmosphere.'
      },
      Developing: {
        criteria: [
          'Growing vocabulary range',
          'Some effective descriptive techniques',
          'Clear narrative structure'
        ],
        generalComment: 'Growing confidence with descriptive techniques and some effective vocabulary choices.',
        nextSteps: 'Work on varying sentence structures and incorporating more sophisticated literary devices. Build tension through careful word choice.'
      },
      Secure: {
        criteria: [
          'Sophisticated vocabulary',
          'Effective literary devices',
          'Strong narrative control'
        ],
        generalComment: 'Strong command of language with effective use of literary devices and varied sentence structures.',
        nextSteps: 'Experiment with more complex narrative techniques and subtle methods of building atmosphere. Layer multiple themes throughout writing.'
      }
    }
  },
  {
    id: '2',
    name: 'Creative Writing Assessment',
    lastUsed: '2024-03-25',
    levels: {
      Emerging: {
        criteria: [
          'Simple vocabulary choices',
          'Basic narrative structure',
          'Limited character development'
        ],
        generalComment: 'Shows basic storytelling ability with simple language choices.',
        nextSteps: 'Work on expanding vocabulary and developing more detailed characters.'
      },
      Developing: {
        criteria: [
          'Varied vocabulary',
          'Clear plot structure',
          'Some character depth'
        ],
        generalComment: 'Demonstrates growing control of narrative techniques.',
        nextSteps: 'Focus on incorporating more sophisticated literary devices and deeper character development.'
      },
      Secure: {
        criteria: [
          'Rich vocabulary',
          'Complex plot structure',
          'Well-developed characters'
        ],
        generalComment: 'Shows strong narrative control and effective characterization.',
        nextSteps: 'Experiment with more innovative narrative structures and subtle theme development.'
      }
    }
  }
];

interface QuickAssessViewProps {
  lesson: {
    id: string;
    subject: string;
    yearGroup: string;
    class: string;
    objectives?: Array<{
      id: string;
      code: string;
      description: string;
    }>;
  };
  onBack: () => void;
}

function QuickAssessView({ lesson, onBack }: QuickAssessViewProps) {
  const [editingLevel, setEditingLevel] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<'comment' | 'nextSteps' | null>(null);
  const [selectedRubric, setSelectedRubric] = useState(MOCK_RUBRICS[0]);
  const [showRubricSelect, setShowRubricSelect] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [levelFeedback, setLevelFeedback] = useState(selectedRubric.levels);

  // Group students by their current level
  const studentsByLevel = MOCK_STUDENTS.reduce((acc, student) => {
    const level = student.currentWork.level.replace('+', '');
    if (!acc[level]) {
      acc[level] = [];
    }
    acc[level].push(student);
    return acc;
  }, {} as Record<string, typeof MOCK_STUDENTS>);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Here you would typically make an API call to save the assessment
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      alert('Assessment submitted successfully!');
      onBack();
    } catch (error) {
      alert('Failed to submit assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRubricSelect = (rubric: typeof MOCK_RUBRICS[0]) => {
    setSelectedRubric(rubric);
    setLevelFeedback(rubric.levels);
    setShowRubricSelect(false);
  };

  const getLevelColor = (level: string) => {
    switch (level.replace('+', '')) {
      case 'Secure':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'Developing':
        return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'Emerging':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleEditSave = (level: string, field: 'comment' | 'nextSteps', value: string) => {
    setLevelFeedback(prev => ({
      ...prev,
      [level]: {
        ...prev[level],
        [field === 'comment' ? 'generalComment' : 'nextSteps']: value
      }
    }));
    setEditingLevel(null);
    setEditingField(null);
  };

  // Order levels from highest to lowest
  const orderedLevels = ['Secure', 'Developing', 'Emerging'];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h2 className="text-lg font-bold text-gray-800">Quick Assessment</h2>
            <p className="text-sm text-gray-600">
              {lesson.subject} • {lesson.yearGroup}{lesson.class}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowRubricSelect(!showRubricSelect)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[#FFF9E7] text-[#FFC83D] rounded-lg hover:bg-[#FFC83D]/10 transition-colors"
          >
            <span>Selected Rubric: {selectedRubric.name}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showRubricSelect && (
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Select Rubric</h3>
          <div className="space-y-2">
            {MOCK_RUBRICS.map(rubric => (
              <button
                key={rubric.id}
                onClick={() => handleRubricSelect(rubric)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors ${
                  selectedRubric.id === rubric.id
                    ? 'border-[#FFC83D] bg-[#FFF9E7]'
                    : 'border-gray-200 hover:border-[#FFC83D]'
                }`}
              >
                <div>
                  <div className="font-medium text-sm text-gray-800">{rubric.name}</div>
                  <div className="text-xs text-gray-500">Last used: {rubric.lastUsed}</div>
                </div>
                {selectedRubric.id === rubric.id && (
                  <Check className="w-4 h-4 text-[#FFC83D]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {lesson.objectives && lesson.objectives.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-[#FFF9E7] rounded-lg flex items-center justify-center">
              <Target className="w-4 h-4 text-[#FFC83D]" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Learning Objective</h3>
          </div>
          <p className="text-gray-700">{lesson.objectives[0].description}</p>
        </div>
      )}

      <div className="space-y-4">
        {orderedLevels.map(level => {
          const students = studentsByLevel[level] || [];
          if (students.length === 0) return null;

          return (
            <div key={level} className="bg-white rounded-lg border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`px-3 py-1.5 text-sm font-medium rounded-full border ${getLevelColor(level)}`}>
                      {level} ({students.length} students)
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Students</h4>
                  <div className="flex flex-wrap gap-2">
                    {students.map(student => (
                      <div key={student.id} className="px-3 py-1.5 bg-gray-50 rounded-full">
                        <span className="text-sm text-gray-600">{student.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Assessment Criteria</h4>
                  <ul className="space-y-2">
                    {levelFeedback[level].criteria.map((criterion, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400 mt-1.5" />
                        <span className="text-sm text-gray-600">{criterion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-700">General Comment</h4>
                    <button
                      onClick={() => {
                        setEditingLevel(level);
                        setEditingField('comment');
                      }}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  {editingLevel === level && editingField === 'comment' ? (
                    <div className="flex gap-2">
                      <textarea
                        className="flex-1 p-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:ring-2 focus:ring-[#FFC83D] focus:border-transparent"
                        defaultValue={levelFeedback[level].generalComment}
                        rows={3}
                        onKeyDown={e => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleEditSave(level, 'comment', e.currentTarget.value);
                          }
                        }}
                      />
                      <button
                        onClick={(e) => handleEditSave(level, 'comment', (e.currentTarget.previousSibling as HTMLTextAreaElement).value)}
                        className="p-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B434] transition-colors"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">{levelFeedback[level].generalComment}</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-700">Next Steps</h4>
                    <button
                      onClick={() => {
                        setEditingLevel(level);
                        setEditingField('nextSteps');
                      }}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  {editingLevel === level && editingField === 'nextSteps' ? (
                    <div className="flex gap-2">
                      <textarea
                        className="flex-1 p-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:ring-2 focus:ring-[#FFC83D] focus:border-transparent"
                        defaultValue={levelFeedback[level].nextSteps}
                        rows={3}
                        onKeyDown={e => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleEditSave(level, 'nextSteps', e.currentTarget.value);
                          }
                        }}
                      />
                      <button
                        onClick={(e) => handleEditSave(level, 'nextSteps', (e.currentTarget.previousSibling as HTMLTextAreaElement).value)}
                        className="p-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B434] transition-colors"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">{levelFeedback[level].nextSteps}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit button moved to bottom */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 mt-8">
        <div className="max-w-[1400px] mx-auto flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-6 py-2 bg-[#FFC83D] text-white rounded-lg transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#E6B434]'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Assess() {
  const router = useRouter();
  const { showOnboarding, setShowOnboarding, completeOnboarding } = useOnboarding();
  const [showGuidance, setShowGuidance] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedLesson, setSelectedLesson] = useState('');
  const [showQuickAssess, setShowQuickAssess] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  // Use mock lessons instead of store
  const lessons = MOCK_LESSONS;
  const nextLesson = MOCK_LESSONS[0];

  const upcomingLessons = [
    nextLesson,
    ...lessons.filter(l => l !== nextLesson).slice(0, 5)
  ].filter(Boolean);

  const highlightedDates = [
    new Date(2024, 2, 15),
    new Date(2024, 2, 20),
    new Date(2024, 2, 25)
  ];

  // Update active step based on selections
  React.useEffect(() => {
    if (!selectedDate) {
      setActiveStep(1);
    } else if (!selectedLesson) {
      setActiveStep(2);
    } else {
      setActiveStep(3);
    }
  }, [selectedDate, selectedLesson]);

  if (showQuickAssess) {
    return (
      <QuickAssessView 
        lesson={nextLesson}
        onBack={() => setShowQuickAssess(false)}
      />
    );
  }

  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#F8F9FA]">
      <div className="max-w-[1400px] mx-auto px-4 py-2 w-full">
        {/* Header Section */}
        <div className="bg-white rounded-lg border border-[#A4AAB2] p-3 sticky top-4 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FFF9E7] flex items-center justify-center">
                <FileText className="w-4 h-4 text-[#FFC83D]" />
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-[#768396]">Marking</h1>
                <button 
                  onClick={() => setShowGuidance(!showGuidance)}
                  className="p-1 hover:bg-[#FFF9E7] rounded-full transition-colors"
                >
                  <Info className="w-4 h-4 text-[#FFC83D]" />
                </button>
              </div>
            </div>
          </div>

          {showGuidance && (
            <div className="mt-3 p-3 bg-[#FFF9E7] rounded-lg border border-[#FFC83D]/20">
              <div className="flex items-start gap-3">
                <div>
                  <h2 className="text-sm font-medium text-[#B17F17] mb-1">How to Mark Student Work</h2>
                  <p className="text-sm text-[#B17F17]">
                    Follow these steps to assess student work efficiently:
                  </p>
                  <ul className="mt-2 text-sm text-[#B17F17] list-disc list-inside">
                    <li>Step 1: Select a date - orange highlights show unmarked work</li>
                    <li>Step 2: Choose a lesson from that day to mark</li>
                    <li>Step 3: Select your preferred marking method</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Steps Grid */}
        <div className="mt-6">
          <div className="grid grid-cols-3 gap-4">
            {/* Step 1: Date Selection */}
            <div className={`bg-white rounded-lg border ${
              activeStep === 1 ? 'border-[#FFC83D]' : 'border-[#A4AAB2]'
            } p-4`}>
              <div className="mb-4">
                <span className={`text-xs font-medium mb-0.5 block ${
                  activeStep === 1 ? 'text-[#FFC83D]' : 'text-gray-400'
                }`}>Step 1</span>
                <h3 className={`text-sm font-bold ${
                  activeStep === 1 ? 'text-[#768396]' : 'text-gray-400'
                }`}>Select Date</h3>
              </div>

              <CalendarComponent
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                highlightedDates={highlightedDates}
              />

              <div className="mt-3 p-3 bg-[#FFF9E7] rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full ring-2 ring-[#FFC83D]" />
                  <p className="text-sm text-[#B17F17]">
                    Dates with unmarked work
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: Lesson Selection */}
            <div className={`bg-white rounded-lg border ${
              activeStep === 2 ? 'border-[#FFC83D]' : 'border-[#A4AAB2]'
            } p-4 ${activeStep < 2 ? 'opacity-50' : ''}`}>
              <div className="mb-4">
                <span className={`text-xs font-medium mb-0.5 block ${
                  activeStep === 2 ? 'text-[#FFC83D]' : 'text-gray-400'
                }`}>Step 2</span>
                <h3 className={`text-sm font-bold ${
                  activeStep === 2 ? 'text-[#768396]' : 'text-gray-400'
                }`}>Select Lesson</h3>
              </div>

              <div className="space-y-2">
                {upcomingLessons.slice(0, 3).map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => activeStep >= 2 && setSelectedLesson(lesson.id)}
                    disabled={activeStep < 2}
                    className={`w-full p-3 border rounded-lg text-left transition-colors ${
                      selectedLesson === lesson.id
                        ? 'border-[#FFC83D] bg-[#FFF9E7]'
                        : activeStep >= 2
                          ? 'border-gray-200 bg-gray-50 hover:border-[#FFC83D]'
                          : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{lesson.subject}</div>
                        <div className="text-xs text-gray-600">
                          {lesson.yearGroup}{lesson.class} • {lesson.startTime}
                        </div>
                      </div>
                      {lesson.objectives?.length && (
                        <div className="px-2 py-1 bg-[#FFF9E7] rounded text-xs text-[#B17F17]">
                          Unmarked
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Assessment Type */}
            <div className={`bg-white rounded-lg border ${
              activeStep === 3 ? 'border-[#FFC83D]' : 'border-[#A4AAB2]'
            } p-4 ${activeStep < 3 ? 'opacity-50' : ''}`}>
              <div className="mb-4">
                <span className={`text-xs font-medium mb-0.5 block ${
                  activeStep === 3 ? 'text-[#FFC83D]' : 'text-gray-400'
                }`}>Step 3</span>
                <h3 className={`text-sm font-bold ${
                  activeStep === 3 ? 'text-[#768396]' : 'text-gray-400'
                }`}>Select Assessment Type</h3>
              </div>

              <div className="space-y-3">
                {/* Quick Assess */}
                <button 
                  disabled={activeStep < 3}
                  onClick={() => setShowQuickAssess(true)}
                  className={`w-full p-3 bg-gray-50 border border-gray-200 rounded-lg ${
                    activeStep >= 3 ? 'hover:border-[#FFC83D]' : 'cursor-not-allowed'
                  } transition-colors text-left`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 bg-[#FFF9E7] rounded-lg flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-[#FFC83D]" />
                    </div>
                    <h4 className="font-medium text-gray-900">Quick Assess</h4>
                  </div>
                  <p className="text-sm text-gray-600 pl-10">
                    Rapid assessment of student understanding
                  </p>
                </button>

                {/* Student Self-Assess */}
                <button 
                  disabled={activeStep < 3}
                  onClick={() => router.push('/student-self-assessment')}
                  className={`w-full p-3 bg-gray-50 border border-gray-200 rounded-lg ${
                    activeStep >= 3 ? 'hover:border-[#FFC83D]' : 'cursor-not-allowed'
                  } transition-colors text-left`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 bg-[#FFF9E7] rounded-lg flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-[#FFC83D]" />
                    </div>
                    <h4 className="font-medium text-gray-900">Student Self-Assess</h4>
                  </div>
                  <p className="text-sm text-gray-600 pl-10">
                    View student self-evaluations
                  </p>
                </button>

                {/* Detailed Assessment */}
                <button 
                  disabled={activeStep < 3}
                  onClick={() => router.push('/detailed-assessment')}
                  className={`w-full p-3 bg-gray-50 border border-gray-200 rounded-lg ${
                    activeStep >= 3 ? 'hover:border-[#FFC83D]' : 'cursor-not-allowed'
                  } transition-colors text-left`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-8 h-8 bg-[#FFF9E7] rounded-lg flex items-center justify-center">
                      <Settings className="w-4 h-4 text-[#FFC83D]" />
                    </div>
                    <h4 className="font-medium text-gray-900">Detailed Assessment</h4>
                  </div>
                  <p className="text-sm text-gray-600 pl-10">
                    Provide comprehensive feedback and grades
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contextual Onboarding */}
      <OnboardingTour
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={completeOnboarding}
        currentContext="assessment"
      />
    </div>
  );
}

export default Assess;