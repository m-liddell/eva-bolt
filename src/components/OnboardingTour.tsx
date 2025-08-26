import React, { useState, useEffect } from 'react';
import { X, ArrowRight, ArrowLeft, BookOpen, GraduationCap, ClipboardList, CheckCircle2, Play, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TourStep {
  id: string;
  title: string;
  description: string;
  target: string;
  icon: React.ReactNode;
  action?: {
    text: string;
    onClick: () => void;
  };
}

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  currentContext?: 'home' | 'planning' | 'teaching' | 'assessment';
}

export function OnboardingTour({ isOpen, onClose, onComplete, currentContext = 'home' }: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();


  const tourSteps: TourStep[] = [
    {
      id: 'welcome',
      title: 'Welcome to EVA!',
      description: 'Your Educational Virtual Assistant is here to help you plan, teach, and assess with confidence. Let\'s walk through the complete workflow step by step.',
      target: 'welcome',
      icon: <CheckCircle2 className="w-8 h-8 text-[#FFC83D]" />
    },
    {
      id: 'planning',
      title: 'Step 1: Plan Your Lessons',
      description: 'Start by creating your weekly timetable. You\'ll add lessons, group them into themes, edit individual activities, and approve weeks for teaching. This is where your teaching journey begins.',
      target: 'plan-section',
      icon: <BookOpen className="w-8 h-8 text-[#FFC83D]" />
    },
    {
      id: 'teaching',
      title: 'Step 2: Teach Your Lessons',
      description: 'Once your lessons are planned and approved, you can start teaching! Access your weekly schedule, view lesson details, and run interactive classroom activities.',
      target: 'teach-section',
      icon: <GraduationCap className="w-8 h-8 text-green-600" />
    },
    {
      id: 'assessment',
      title: 'Step 3: Assess Student Progress',
      description: 'After teaching, assess your students\' understanding with quick assessments, detailed feedback, or design custom assessments that match your learning objectives.',
      target: 'assess-section',
      icon: <ClipboardList className="w-8 h-8 text-blue-600" />
    },
    {
      id: 'complete',
      title: 'You\'re Ready to Start!',
      description: 'That\'s the core workflow: Plan → Teach → Assess. You can also access training, reports, settings, and the lesson library from the main menu (click the menu icon in the top left). Ready to begin your teaching journey?',
      target: 'complete',
      icon: <Play className="w-8 h-8 text-[#FFC83D]" />
    }
  ];

  const setContextualStep = (step: number) => {
    setCurrentStep(step);
  };

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      
      // Set appropriate step based on current context
      if (currentContext === 'planning') {
        setContextualStep(1); // Planning step
      } else if (currentContext === 'teaching') {
        setContextualStep(2); // Teaching step
      } else if (currentContext === 'assessment') {
        setContextualStep(3); // Assessment step
      } else {
        setContextualStep(0); // Welcome step
      }
    }
  }, [isOpen, currentContext]);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    onComplete();
  };

  const handleSkip = () => {
    setIsVisible(false);
    onComplete(); // Mark as completed when skipped
  };

  if (!isOpen || !isVisible) return null;

  const currentTourStep = tourSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            {currentTourStep.icon}
            <div>
              <h2 className="text-xl font-bold text-gray-800">{currentTourStep.title}</h2>
              <p className="text-sm text-gray-600">Step {currentStep + 1} of {tourSteps.length}</p>
            </div>
          </div>
          <button
            onClick={handleSkip}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              {currentTourStep.description}
            </p>
          </div>

          {/* Visual Indicators for Each Step */}
          {currentStep === 1 && (
            <div className="mb-6 p-4 bg-[#FFF9E7] rounded-lg border border-[#FFC83D]/20">
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-6 h-6 text-[#FFC83D]" />
                <h3 className="font-semibold text-[#B17F17]">Planning Features</h3>
              </div>
              <ul className="space-y-2 text-sm text-[#B17F17]">
                <li>• Create weekly lesson timetables</li>
                <li>• Add themed units to group lessons</li>
                <li>• Build complete lessons with starter, main, and plenary activities</li>
                <li>• Approve weeks for teaching when ready</li>
              </ul>
              <div className="mt-4 p-3 bg-white rounded-lg border border-[#FFC83D]/30">
                <div className="flex items-center gap-2 text-sm text-[#B17F17]">
                  <div className="w-6 h-6 bg-[#FFC83D] text-white rounded-full flex items-center justify-center font-bold text-xs">1</div>
                  <span className="font-medium">Start here: Create your first lesson timetable</span>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3 mb-3">
                <GraduationCap className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold text-green-800">Teaching Features</h3>
              </div>
              <ul className="space-y-2 text-sm text-green-700">
                <li>• View your weekly teaching schedule</li>
                <li>• Access interactive lesson activities</li>
                <li>• Run classroom-ready lessons with timers and guidance</li>
                <li>• Quick-start lessons when you need them</li>
              </ul>
              <div className="mt-4 p-3 bg-white rounded-lg border border-green-300">
                <div className="flex items-center gap-2 text-sm text-green-700">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xs">2</div>
                  <span className="font-medium">After planning: Start teaching your lessons</span>
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3 mb-3">
                <ClipboardList className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-blue-800">Assessment Features</h3>
              </div>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• Quick assessments for rapid feedback</li>
                <li>• Detailed assessment with individual student reports</li>
                <li>• Design custom assessments for your objectives</li>
                <li>• View student self-assessments</li>
              </ul>
              <div className="mt-4 p-3 bg-white rounded-lg border border-blue-300">
                <div className="flex items-center gap-2 text-sm text-blue-700">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">3</div>
                  <span className="font-medium">After teaching: Assess student understanding</span>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="mb-6 p-4 bg-gradient-to-r from-[#FFF9E7] to-green-50 rounded-lg border border-[#FFC83D]/20">
              <div className="flex items-center gap-3 mb-3">
                <Play className="w-6 h-6 text-[#FFC83D]" />
                <h3 className="font-semibold text-gray-800">Ready to Begin!</h3>
              </div>
              <p className="text-sm text-gray-700 mb-4">
                You now understand the core workflow. Remember, you can always access additional features like training, reports, and settings from the main menu.
              </p>
              <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 text-sm text-blue-800">
                  <HelpCircle className="w-4 h-4" />
                  <span>Tip: Click the help button (?) in the bottom-right corner anytime to see this tour again</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-white rounded-lg border border-[#FFC83D]/20">
                  <BookOpen className="w-6 h-6 text-[#FFC83D] mx-auto mb-1" />
                  <div className="text-xs font-medium text-gray-800">Plan</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border border-green-200">
                  <GraduationCap className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <div className="text-xs font-medium text-gray-800">Teach</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border border-blue-200">
                  <ClipboardList className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <div className="text-xs font-medium text-gray-800">Assess</div>
                </div>
              </div>
            </div>
          )}

          {/* Progress Indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm text-gray-600">{currentStep + 1} / {tourSteps.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-[#FFC83D] h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
              />
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button
            onClick={handleSkip}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Skip Tour
          </button>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B434] transition-colors font-medium"
            >
              <span>{currentStep === tourSteps.length - 1 ? 'Get Started' : 'Next'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}