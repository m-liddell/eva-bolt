import React, { useState, useEffect, useCallback } from 'react';
import { X, Clock, Users, Target, Plus, Check, ChevronRight, BookOpen, Calendar, AlertCircle } from 'lucide-react';
import { useTimetableStore } from '../store/timetableStore';

// Types and Interfaces
interface AddLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (lessonData: LessonData[]) => void;
  initialData?: LessonData;
  isEditing?: boolean;
  currentTerm?: string;
  currentWeek?: number;
}

interface LessonData {
  id?: string;
  subject: string;
  yearGroup: string;
  class: string;
  day: string;
  startTime: string;
  duration: string;
  comment?: string;
  week: number;
}

interface SelectedTime {
  day: string;
  startTime: string;
  duration: string;
}

interface FormData {
  subject: string;
  yearGroup: string;
  class: string;
  comment: string;
}

interface ValidationErrors {
  [key: string]: string;
}

// Constants
const SUBJECTS = [
  'English'
] as const;

const YEAR_GROUPS = ['Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11'] as const;
const CLASS_GROUPS = ['A', 'B', 'C', 'D'] as const;
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;
const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00'
] as const;
const DURATIONS = ['30 mins', '45 mins', '60 mins', '90 mins', '120 mins'] as const;

const INITIAL_FORM_STATE: FormData = {
  subject: '',
  yearGroup: '',
  class: '',
  comment: '',
};

const STEPS = {
  LESSON_DETAILS: 1,
  SCHEDULE: 2
} as const;

// Main Component
export function AddLessonModal({ 
  isOpen, 
  onClose, 
  onSave, 
  initialData, 
  isEditing = false,
  currentTerm = 'Autumn 1',
  currentWeek = 1
}: AddLessonModalProps) {
  // State
  const [currentStep, setCurrentStep] = useState(STEPS.LESSON_DETAILS);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
  const [selectedTimes, setSelectedTimes] = useState<SelectedTime[]>([]);
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Store
  const { checkTimeSlotAvailable } = useTimetableStore();

  // Effects
  useEffect(() => {
    if (isOpen) {
      initializeModal();
    }
  }, [isOpen, initialData]);

  // Handlers
  const initializeModal = useCallback(() => {
    if (initialData) {
      setFormData({
        subject: initialData.subject || '',
        yearGroup: initialData.yearGroup || '',
        class: initialData.class || '',
        comment: initialData.comment || '',
      });
      setSelectedTimes([{
        day: initialData.day,
        startTime: initialData.startTime,
        duration: initialData.duration || '60 mins'
      }]);
      setCurrentStep(STEPS.SCHEDULE);
    } else {
      resetModal();
    }
    setErrors({});
  }, [initialData]);

  const resetModal = () => {
    setFormData(INITIAL_FORM_STATE);
    setSelectedTimes([]);
    setCurrentStep(STEPS.LESSON_DETAILS);
    setErrors({});
  };

  const validateStep = (step: number): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (step === STEPS.LESSON_DETAILS) {
      if (!formData.subject) newErrors.subject = 'Please select a subject';
      if (!formData.yearGroup) newErrors.yearGroup = 'Please select a year group';
      if (!formData.class) newErrors.class = 'Please select a class';
    }
    
    if (step === STEPS.SCHEDULE) {
      if (selectedTimes.length === 0) newErrors.timeSlots = 'Please select at least one time slot';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(STEPS.SCHEDULE, prev + 1));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(STEPS.LESSON_DETAILS, prev - 1));
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(STEPS.LESSON_DETAILS) || !validateStep(STEPS.SCHEDULE)) {
      return;
    }
    
    const lessons: LessonData[] = selectedTimes.map(time => ({
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      day: time.day,
      startTime: time.startTime,
      duration: time.duration,
      week: currentWeek,
      termId: currentTerm,
      status: 'planned'
    }));
    
    console.log('Submitting lessons:', lessons);
    onSave(lessons);
    resetModal();
    onClose();
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const updateFormField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleTimeSelection = (day: string, startTime: string) => {
    const existingTimeIndex = selectedTimes.findIndex(
      t => t.day === day && t.startTime === startTime
    );

    if (existingTimeIndex >= 0) {
      setSelectedTimes(prev => prev.filter((_, index) => index !== existingTimeIndex));
    } else {
      setSelectedTimes(prev => [...prev, { day, startTime, duration: '60 mins' }]);
    }
    
    if (errors.timeSlots) {
      setErrors(prev => ({ ...prev, timeSlots: '' }));
    }
  };

  const updateDuration = (day: string, startTime: string, duration: string) => {
    setSelectedTimes(prev => prev.map(time => {
      if (time.day === day && time.startTime === startTime) {
        return { ...time, duration };
      }
      return time;
    }));
  };

  // Helper functions
  const isTimeSelected = (day: string, startTime: string): boolean => {
    return selectedTimes.some(t => t.day === day && t.startTime === startTime);
  };

  const getSelectedDuration = (day: string, startTime: string): string => {
    const time = selectedTimes.find(t => t.day === day && t.startTime === startTime);
    return time?.duration || '60 mins';
  };

  const isTimeSlotAvailable = (day: string, timeSlot: string): boolean => {
    if (isTimeSelected(day, timeSlot)) return true;
    const lessonId = isEditing ? initialData?.id : undefined;
    return checkTimeSlotAvailable(
      day,
      timeSlot,
      getSelectedDuration(day, timeSlot),
      1,
      'Autumn 1',
      lessonId
    );
  };

  const getStepIcon = (step: number) => {
    if (step < currentStep) return <Check className="w-4 h-4 text-white" />;
    return <span className="text-sm font-bold">{step}</span>;
  };

  const getStepStyle = (step: number): string => {
    if (step < currentStep) return 'bg-green-500 text-white';
    if (step === currentStep) return 'bg-[#FFC83D] text-white';
    return 'bg-gray-200 text-gray-500';
  };

  const getStepLabel = (step: number): string => {
    switch (step) {
      case STEPS.LESSON_DETAILS: return 'Lesson Details';
      case STEPS.SCHEDULE: return 'Schedule';
      default: return '';
    }
  };

  const isFormComplete = (): boolean => {
    return !!(formData.subject && formData.yearGroup && formData.class);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[75vh] overflow-hidden flex flex-col">
        
        {/* Header with Progress */}
        <div className="flex-shrink-0">
          <ModalHeader 
            isEditing={isEditing}
            currentStep={currentStep}
            getStepIcon={getStepIcon}
            getStepStyle={getStepStyle}
            getStepLabel={getStepLabel}
            onClose={handleClose}
          />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto px-6 py-4">
          
            {/* Step 1: Lesson Details */}
            {currentStep === STEPS.LESSON_DETAILS && (
              <LessonDetailsStep
                formData={formData}
                errors={errors}
                onUpdateField={updateFormField}
                isFormComplete={isFormComplete()}
              />
            )}

            {/* Step 2: Schedule Selection */}
            {currentStep === STEPS.SCHEDULE && (
              <ScheduleStep
                formData={formData}
                selectedTimes={selectedTimes}
                errors={errors}
                onTimeSelection={handleTimeSelection}
                onUpdateDuration={updateDuration}
                isTimeSelected={isTimeSelected}
                isTimeSlotAvailable={isTimeSlotAvailable}
                getSelectedDuration={getSelectedDuration}
              />
            )}

          </div>

          {/* Navigation */}
          <div className="flex-shrink-0 border-t border-gray-200">
            <NavigationButtons
              currentStep={currentStep}
              isEditing={isEditing}
              onBack={handleBack}
              onNext={handleNext}
              onClose={handleClose}
              onSubmit={handleSubmit}
            />
          </div>
          
        </form>
      </div>
    </div>
  );
}

// Sub-components
interface ModalHeaderProps {
  isEditing: boolean;
  currentStep: number;
  getStepIcon: (step: number) => React.ReactNode;
  getStepStyle: (step: number) => string;
  getStepLabel: (step: number) => string;
  onClose: () => void;
}

function ModalHeader({ 
  isEditing, 
  currentStep, 
  getStepIcon, 
  getStepStyle, 
  getStepLabel, 
  onClose 
}: ModalHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">
          {isEditing ? 'Edit Lesson' : 'Add New Lesson'}
        </h2>
        <div className="flex items-center gap-3 mt-2">
          {[STEPS.LESSON_DETAILS, STEPS.SCHEDULE].map((step) => (
            <div key={step} className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${getStepStyle(step)}`}>
                {getStepIcon(step)}
              </div>
              <span className={`text-xs font-medium ${
                step <= currentStep ? 'text-gray-800' : 'text-gray-400'
              }`}>
                {getStepLabel(step)}
              </span>
              {step < STEPS.SCHEDULE && (
                <ChevronRight className={`w-4 h-4 ml-2 ${
                  step < currentStep ? 'text-green-500' : 'text-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
      >
        <X className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );
}

interface LessonDetailsStepProps {
  formData: FormData;
  errors: ValidationErrors;
  onUpdateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  isFormComplete: boolean;
}

function LessonDetailsStep({ 
  formData, 
  errors, 
  onUpdateField, 
  isFormComplete 
}: LessonDetailsStepProps) {
  return (
    <div className="space-y-3">
      <StepHeader
        icon={<BookOpen className="w-8 h-8 text-[#FFC83D]" />}
        title="What lesson would you like to add?"
        subtitle="Start by selecting the basic lesson information"
      />

      <div className="grid grid-cols-3 gap-3">
        
        {/* Subject Selection */}
        <SelectionGroup
          label="Subject"
          required
          error={errors.subject}
          gridCols="grid-cols-2 gap-1"
        >
          {SUBJECTS.map((subject) => (
            <SelectionButton
              key={subject}
              isSelected={formData.subject === subject}
              onClick={() => onUpdateField('subject', subject)}
              className="text-left p-1.5"
            >
              <div className="text-xs font-medium truncate">{subject}</div>
            </SelectionButton>
          ))}
        </SelectionGroup>

        {/* Year Group Selection */}
        <SelectionGroup
          label="Year Group"
          required
          error={errors.yearGroup}
          gridCols="space-y-1"
        >
          {YEAR_GROUPS.map((year) => (
            <SelectionButton
              key={year}
              isSelected={formData.yearGroup === year}
              onClick={() => onUpdateField('yearGroup', year)}
              className="w-full text-left p-1.5"
            >
              <div className="text-xs font-medium">{year}</div>
            </SelectionButton>
          ))}
        </SelectionGroup>

        {/* Class Selection */}
        <SelectionGroup
          label="Class"
          required
          error={errors.class}
          gridCols="grid-cols-2 gap-1"
        >
          {CLASS_GROUPS.map((cls) => (
            <SelectionButton
              key={cls}
              isSelected={formData.class === cls}
              onClick={() => onUpdateField('class', cls)}
              className="text-center p-1.5"
            >
              <div className="text-xs font-medium">Class {cls}</div>
            </SelectionButton>
          ))}
        </SelectionGroup>
        
      </div>

      {/* Summary Card */}
      {isFormComplete && (
        <div className="mt-3 p-2 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <Check className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Lesson Details</span>
          </div>
          <p className="text-xs text-green-700">
            {formData.subject} • {formData.yearGroup} Class {formData.class}
          </p>
        </div>
      )}
    </div>
  );
}

interface ScheduleStepProps {
  formData: FormData;
  selectedTimes: SelectedTime[];
  errors: ValidationErrors;
  onTimeSelection: (day: string, startTime: string) => void;
  onUpdateDuration: (day: string, startTime: string, duration: string) => void;
  isTimeSelected: (day: string, startTime: string) => boolean;
  isTimeSlotAvailable: (day: string, timeSlot: string) => boolean;
  getSelectedDuration: (day: string, startTime: string) => string;
}

function ScheduleStep({
  formData,
  selectedTimes,
  errors,
  onTimeSelection,
  onUpdateDuration,
  isTimeSelected,
  isTimeSlotAvailable,
  getSelectedDuration
}: ScheduleStepProps) {
  return (
    <div className="space-y-3">
      <StepHeader
        icon={<Calendar className="w-8 h-8 text-[#FFC83D]" />}
        title="When does this lesson happen?"
        subtitle={`Select one or more time slots for your ${formData.subject} lesson`}
      />

      {/* Detailed Timetable Grid */}
      <TimetableGrid
        selectedTimes={selectedTimes}
        onTimeSelection={onTimeSelection}
        onUpdateDuration={onUpdateDuration}
        isTimeSelected={isTimeSelected}
        isTimeSlotAvailable={isTimeSlotAvailable}
        getSelectedDuration={getSelectedDuration}
        error={errors.timeSlots}
      />
    </div>
  );
}

// Utility Components
interface StepHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

function StepHeader({ icon, title, subtitle }: StepHeaderProps) {
  return (
    <div className="text-center mb-3">
      <div className="w-10 h-10 bg-[#FFF9E7] rounded-full flex items-center justify-center mx-auto mb-2">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      <p className="text-xs text-gray-600 mt-1">{subtitle}</p>
    </div>
  );
}

interface SelectionGroupProps {
  label: string;
  required?: boolean;
  error?: string;
  gridCols: string;
  children: React.ReactNode;
}

function SelectionGroup({ label, required, error, gridCols, children }: SelectionGroupProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className={gridCols + " gap-2"}>
        {children}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
}

interface SelectionButtonProps {
  isSelected: boolean;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}

function SelectionButton({ isSelected, onClick, className = "", children }: SelectionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-1.5 rounded border-2 transition-colors ${className} ${
        isSelected
          ? 'border-[#FFC83D] bg-[#FFF9E7] text-[#FFC83D]'
          : 'border-gray-200 hover:border-[#FFC83D] text-gray-700'
      }`}
    >
      {children}
    </button>
  );
}

interface TimetableGridProps {
  selectedTimes: SelectedTime[];
  onTimeSelection: (day: string, startTime: string) => void;
  onUpdateDuration: (day: string, startTime: string, duration: string) => void;
  isTimeSelected: (day: string, startTime: string) => boolean;
  isTimeSlotAvailable: (day: string, timeSlot: string) => boolean;
  getSelectedDuration: (day: string, startTime: string) => string;
  error?: string;
}

function TimetableGrid({
  selectedTimes,
  onTimeSelection,
  onUpdateDuration,
  isTimeSelected,
  isTimeSlotAvailable,
  getSelectedDuration,
  error
}: TimetableGridProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium text-gray-700">Select time slots</h4>
        {selectedTimes.length > 0 && (
          <div className="text-sm text-green-600 flex items-center gap-1">
            <Check className="w-4 h-4" />
            {selectedTimes.length} time slot{selectedTimes.length !== 1 ? 's' : ''} selected
          </div>
        )}
      </div>
      
      <div className="border rounded-lg overflow-hidden max-h-40 overflow-y-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-white">
            <tr>
              <th className="p-1 border-b border-r border-gray-200 bg-gray-50 text-xs font-medium text-gray-600 w-16">
                Time
              </th>
              {DAYS.map(day => (
                <th 
                  key={day}
                  className="p-1 text-xs font-medium text-gray-700 border-b border-gray-200 bg-gray-50"
                >
                  {day.slice(0, 3)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TIME_SLOTS.map((timeSlot) => (
              <tr key={timeSlot}>
                <td className="p-1 border-r border-b border-gray-200 text-xs font-medium text-gray-600 bg-gray-50">
                  {timeSlot}
                </td>
                {DAYS.map(day => {
                  const selected = isTimeSelected(day, timeSlot);
                  const available = isTimeSlotAvailable(day, timeSlot);
                  
                  return (
                    <td 
                      key={`${day}-${timeSlot}`} 
                      className="p-1 border border-gray-200"
                    >
                      {available || selected ? (
                        <div className="space-y-0.5">
                          <button
                            type="button"
                            onClick={() => onTimeSelection(day, timeSlot)}
                            className={`w-full h-5 rounded transition-colors text-xs font-medium ${
                              selected
                                ? 'bg-[#FFC83D] text-white hover:bg-[#E6B434]'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                            }`}
                          >
                            {selected ? 'Selected' : 'Select'}
                          </button>
                          {selected && (
                            <select
                              value={getSelectedDuration(day, timeSlot)}
                              onChange={(e) => onUpdateDuration(day, timeSlot, e.target.value)}
                              className="w-full text-xs border border-gray-200 rounded px-1 py-0.5"
                            >
                              {DURATIONS.map(duration => (
                                <option key={duration} value={duration}>
                                  {duration}
                                </option>
                              ))}
                            </select>
                          )}
                        </div>
                      ) : (
                        <div className="w-full h-5 bg-gray-300 rounded opacity-50 cursor-not-allowed flex items-center justify-center">
                          <span className="text-xs text-gray-500">Taken</span>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {error && (
        <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
}

interface NavigationButtonsProps {
  currentStep: number;
  isEditing: boolean;
  onBack: () => void;
  onNext: () => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

function NavigationButtons({ 
  currentStep, 
  isEditing, 
  onBack, 
  onNext, 
  onClose,
  onSubmit
}: NavigationButtonsProps) {
  return (
    <div className="flex justify-between items-center p-3 bg-gray-50">
      <div className="flex items-center gap-2">
        {currentStep > STEPS.LESSON_DETAILS && (
          <button
            type="button"
            onClick={onBack}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm"
          >
            Back
          </button>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm"
        >
          Cancel
        </button>
        
        {currentStep < STEPS.SCHEDULE ? (
          <button
            type="button"
            onClick={onNext}
            className="px-4 py-1.5 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B434] transition-colors flex items-center gap-2 text-sm"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            className="px-4 py-1.5 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B434] transition-colors flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>{isEditing ? 'Save Changes' : 'Add Lesson'}</span>
          </button>
        )}
      </div>
    </div>
  );
}