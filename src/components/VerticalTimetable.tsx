import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Users, CheckSquare, Square, Clock, Pencil, Trash2, AlertCircle, Info, X, BookOpen, Brain, CheckCircle2, Play, Target } from 'lucide-react';
import { useTimetableStore } from '../store/timetableStore';
import type { Lesson } from '../store/timetableStore';
import type { Term } from '../store/termStore';

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  lessonDetails: {
    count: number;
    subject?: string;
    yearGroup?: string;
    class?: string;
  };
}

function DeleteConfirmation({ isOpen, onClose, onConfirm, lessonDetails }: DeleteConfirmationProps) {
  if (!isOpen) return null;

  // Render the modal using a portal to the document body to ensure it appears above everything
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center" style={{ zIndex: 999999 }}>
      <div className="relative bg-white rounded-lg w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex items-start gap-3 mb-6">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Delete {lessonDetails.count > 1 ? 'Lessons' : 'Lesson'}</h3>
              <p className="text-sm text-gray-600">
                Are you sure you want to delete {lessonDetails.count > 1 ? 'these lessons' : 'this lesson'}?
                {lessonDetails.subject && (
                  <>
                    <br />
                    <span className="font-medium">{lessonDetails.subject}</span> • {lessonDetails.yearGroup} {lessonDetails.class}
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

interface VerticalTimetableProps {
  term: Term;
  termId: string;
  onEditLesson: (lesson: Lesson) => void;
  currentWeek?: number;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00'
];

export function VerticalTimetable({ term, termId, onEditLesson, currentWeek = 1 }: VerticalTimetableProps) {
  const navigate = useNavigate();
  const { 
    getLessonsByTerm, 
    toggleLessonSelection, 
    selectedLessons,
    getSelectedLessons,
    deleteLesson,
    clearLessonSelection
  } = useTimetableStore();
  
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSelectionInfo, setShowSelectionInfo] = useState(false);
  
  const lessons = getLessonsByTerm(termId);
  const selectedLessonsList = getSelectedLessons();
  const firstSelectedLesson = selectedLessonsList[0];

  const canSelectLesson = (lesson: Lesson) => {
    if (selectedLessons.length === 0) return true;
    if (selectedLessons.includes(lesson.id)) return true;
    return lesson.week === firstSelectedLesson?.week && lesson.termId === firstSelectedLesson?.termId;
  };

  const handleLessonClick = (lesson: Lesson) => {
    if (!canSelectLesson(lesson)) {
      setShowSelectionInfo(true);
      return;
    }
    toggleLessonSelection(lesson.id);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedLessons.length > 0) {
      selectedLessons.forEach(lessonId => {
        deleteLesson(lessonId);
      });
    }
    setShowDeleteConfirm(false);
    clearLessonSelection();
  };

  const getLessonDuration = (duration: string | undefined): number => {
    if (!duration || typeof duration !== 'string') {
      return 60;
    }
    const match = duration.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 60;
  };

  const calculateRowSpan = (duration: string | undefined): number => {
    const minutes = getLessonDuration(duration);
    return Math.ceil(minutes / 30);
  };

  const getLessonForTimeSlot = (day: string, timeSlot: string) => {
    return lessons.find(lesson => 
      lesson.day === day && 
      lesson.startTime === timeSlot &&
      lesson.week === currentWeek
    );
  };

  const isSlotOccupied = (day: string, timeSlot: string): boolean => {
    const currentIndex = TIME_SLOTS.indexOf(timeSlot);
    if (currentIndex === -1) return false;

    const previousSlots = TIME_SLOTS.slice(0, currentIndex);
    return previousSlots.some(prevSlot => {
      const prevLesson = getLessonForTimeSlot(day, prevSlot);
      if (!prevLesson) return false;

      const duration = getLessonDuration(prevLesson.duration);
      const slotsNeeded = Math.ceil(duration / 30);
      const endIndex = TIME_SLOTS.indexOf(prevSlot) + slotsNeeded;

      return currentIndex < endIndex;
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const period = Number(hours) >= 12 ? 'PM' : 'AM';
    const displayHours = Number(hours) > 12 ? Number(hours) - 12 : Number(hours);
    return `${displayHours}:${minutes} ${period}`;
  };

  // Check if a lesson has all three activity types
  const isLessonFullyPlanned = (lesson: Lesson) => {
    return lesson.activities?.starter && 
           lesson.activities?.main && 
           lesson.activities?.plenary;
  };

  const renderLesson = (lesson: Lesson | undefined, day: string, timeSlot: string) => {
    if (!lesson) {
      return (
        <td 
          key={`${day}-${timeSlot}`}
          className="border border-gray-100 p-1 h-12"
        >
          <div className="h-full flex items-center justify-center text-gray-300 text-xs">
            —
          </div>
        </td>
      );
    }

    if (isSlotOccupied(day, timeSlot)) {
      return null; // Don't render anything for occupied slots
    }

    const isSelected = selectedLessons.includes(lesson.id);
    const isSelectable = canSelectLesson(lesson);
    const rowSpan = calculateRowSpan(lesson.duration);
    const isFullyPlanned = isLessonFullyPlanned(lesson);

    const isDifferentWeek = firstSelectedLesson && (
      lesson.week !== firstSelectedLesson.week ||
      lesson.termId !== firstSelectedLesson.termId
    );

    return (
      <td 
        key={`${day}-${timeSlot}`}
        rowSpan={rowSpan}
        className="border border-gray-100 relative"
      >
        <div 
          onClick={() => handleLessonClick(lesson)}
          className={`h-full p-3 rounded-lg cursor-pointer transition-all ${
            isSelected 
              ? 'bg-[#FFC83D]/10 border-2 border-[#FFC83D]'
              : isFullyPlanned
                ? 'bg-green-50 border-2 border-green-500'
                : `bg-white border-2 ${
                    isSelectable 
                      ? 'hover:border-[#FFC83D] hover:border-2' 
                      : isDifferentWeek
                        ? 'border-gray-300 bg-gray-50'
                        : 'border-gray-300'
                  }`
          }`}
        >
          <div className="flex items-start gap-1">
            <div>
              {isSelected ? (
                <CheckSquare className="w-3 h-3 text-[#FFC83D]" />
              ) : (
                <Square className="w-3 h-3 text-gray-400" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-1">
                <div className="font-medium text-gray-900 truncate text-sm">{lesson.subject}</div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditLesson(lesson);
                    }}
                    className="p-0.5 hover:bg-gray-100 rounded transition-colors"
                    title="Edit lesson details"
                  >
                    <Pencil className="w-3 h-3 text-gray-500" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate('/curriculum-objectives', { state: { preselectedLesson: lesson } });
                    }}
                    className="p-0.5 hover:bg-gray-100 rounded transition-colors"
                    title="Change theme"
                  >
                    <Target className="w-3 h-3 text-[#FFC83D]" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Select this lesson and show delete confirmation
                      if (!selectedLessons.includes(lesson.id)) {
                        toggleLessonSelection(lesson.id);
                      }
                      setShowDeleteConfirm(true);
                    }}
                    className="p-0.5 hover:bg-red-50 rounded transition-colors"
                    title="Delete lesson"
                  >
                    <Trash2 className="w-3 h-3 text-red-500 hover:text-red-600" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-1 mt-0.5">
                <Users className="w-2.5 h-2.5 text-gray-500 flex-shrink-0" />
                <span className="text-xs text-gray-600 truncate">{lesson.yearGroup} {lesson.class}</span>
              </div>

              <div className="flex items-center gap-1 mt-0.5">
                <Clock className="w-2.5 h-2.5 text-gray-500 flex-shrink-0" />
                <span className="text-xs text-gray-600">{lesson.duration || '60 mins'}</span>
              </div>

              {lesson.theme && (
                <div className="flex items-center gap-1 mt-1 bg-[#FFF9E7] px-1.5 py-0.5 rounded">
                  <BookOpen className="w-2.5 h-2.5 text-[#FFC83D] flex-shrink-0" />
                  <span className="text-xs text-[#B17F17] truncate">{lesson.theme}</span>
                </div>
              )}

              {/* Display activity summaries if lesson is fully planned */}
              {isFullyPlanned && (
                <div className="mt-1 space-y-0.5 bg-green-50 p-1 rounded">
                  {lesson.activities?.starter && (
                    <div className="flex items-center gap-1">
                      <Brain className="w-2 h-2 text-blue-500 flex-shrink-0" />
                      <span className="text-xs text-gray-700 truncate">
                        S: {lesson.activities.starter.title}
                      </span>
                    </div>
                  )}
                  {lesson.activities?.main && (
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-2 h-2 text-[#FFC83D] flex-shrink-0" />
                      <span className="text-xs text-gray-700 truncate">
                        M: {lesson.activities.main.title}
                      </span>
                    </div>
                  )}
                  {lesson.activities?.plenary && (
                    <div className="flex items-center gap-1">
                      <CheckCircle2 className="w-2 h-2 text-green-500 flex-shrink-0" />
                      <span className="text-xs text-gray-700 truncate">
                        P: {lesson.activities.plenary.title}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </td>
    );
  };

  return (
    <div className="relative">
      <div className="overflow-x-auto max-h-[calc(100vh-300px)]">
        <div className="min-w-[900px]">
          {showSelectionInfo && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-30 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-96">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                  <Info className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900 mb-1">Lesson Selection Rules</h3>
                  <p className="text-sm text-gray-600">
                    You can only select lessons from the same week
                  </p>
                </div>
                <button 
                  onClick={() => setShowSelectionInfo(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          )}

          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="w-12 p-1 border-b border-gray-200 bg-gray-50 text-xs"></th>
                {DAYS.map(day => (
                  <th 
                    key={day}
                    className="min-w-[160px] w-1/5 p-1 text-center border-b border-gray-200 bg-gray-50 font-medium text-gray-700 text-xs"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TIME_SLOTS.map((timeSlot) => (
                <tr key={timeSlot}>
                  <td className="p-1 border-r border-gray-200 text-xs text-gray-600 text-center whitespace-nowrap">
                    {formatTime(timeSlot)}
                  </td>
                  {DAYS.map(day => renderLesson(getLessonForTimeSlot(day, timeSlot), day, timeSlot))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteConfirmation
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDeleteConfirm}
        lessonDetails={{
          count: selectedLessons.length,
          subject: firstSelectedLesson?.subject,
          yearGroup: firstSelectedLesson?.yearGroup,
          class: firstSelectedLesson?.class
        }}
      />
    </div>
  );
}