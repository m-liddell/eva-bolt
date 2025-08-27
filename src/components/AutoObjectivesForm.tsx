'use client';

import React, { useState } from 'react';
import { Target, AlertCircle, Check, ChevronLeft, Undo2 } from 'lucide-react';
import { useTimetableStore } from '../store/timetableStore';
import { curriculumObjectives } from '../data/curriculumObjectives';

const SUBJECTS = [
  'English', 'Mathematics', 'Science', 'History', 'Geography',
  'Modern Languages', 'Art', 'Music', 'Physical Education', 'Computing'
];

const YEAR_GROUPS = ['Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11'];
const CLASS_GROUPS = ['A', 'B', 'C', 'D'];

interface AutoObjectivesFormProps {
  onClose: () => void;
  onBack?: () => void;
}

export function AutoObjectivesForm({ onClose, onBack }: AutoObjectivesFormProps) {
  const { getLessonsByTerm, updateLessonObjectives, undoAutoObjectives } = useTimetableStore();
  const [formData, setFormData] = useState(() => {
    // Get the first lesson with a theme to pre-populate the form
    const lessons = getLessonsByTerm('Autumn 1');
    const lessonWithTheme = lessons.find(lesson => lesson.theme);
    
    return {
      subject: lessonWithTheme?.subject || '',
      yearGroup: lessonWithTheme?.yearGroup || '',
      class: lessonWithTheme?.class || '',
      theme: lessonWithTheme?.theme || ''
    };
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showUndoButton, setShowUndoButton] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Validate form data
      if (!formData.subject || !formData.yearGroup || !formData.class || !formData.theme) {
        throw new Error('Please fill in all fields');
      }

      // Get all lessons for the term that match the criteria
      const lessons = getLessonsByTerm('Autumn 1').filter(lesson => 
        lesson.subject === formData.subject &&
        lesson.yearGroup === formData.yearGroup &&
        lesson.class === formData.class
      );

      if (lessons.length === 0) {
        throw new Error('No lessons found matching these criteria');
      }

      // Get objectives for the subject
      const subjectObjectives = curriculumObjectives[formData.subject];
      if (!subjectObjectives) {
        throw new Error('No objectives found for this subject');
      }

      // Group lessons by week
      const lessonsByWeek: Record<number, typeof lessons> = {};
      lessons.forEach(lesson => {
        if (!lessonsByWeek[lesson.week]) {
          lessonsByWeek[lesson.week] = [];
        }
        lessonsByWeek[lesson.week].push(lesson);
      });

      // Categorize objectives by type
      const readingObjectives = subjectObjectives['Reading'] || [];
      const writingObjectives = subjectObjectives['Writing'] || [];
      const speakingObjectives = subjectObjectives['Speaking & Listening'] || [];
      
      // For non-English subjects, flatten all objectives
      const allObjectives = Object.values(subjectObjectives).flat();

      // Apply objectives based on week number and progression rules
      Object.entries(lessonsByWeek).forEach(([weekStr, weekLessons]) => {
        const week = parseInt(weekStr);
        
        // Apply different objectives based on the week number
        weekLessons.forEach((lesson, lessonIndex) => {
          let selectedObjectives = [];
          
          if (formData.subject === 'English') {
            // English subject follows specific progression
            switch (week) {
              case 1:
                // Week 1: Introduction to theme, key concepts, short writing
                selectedObjectives = [
                  readingObjectives[lessonIndex % readingObjectives.length],
                  speakingObjectives[lessonIndex % speakingObjectives.length]
                ];
                break;
              case 2:
              case 3:
                // Weeks 2-3: Modelled writing, practicing key concepts
                selectedObjectives = [
                  readingObjectives[(lessonIndex + week) % readingObjectives.length],
                  writingObjectives[lessonIndex % writingObjectives.length]
                ];
                break;
              case 4:
              case 5:
                // Weeks 4-5: Longer and more independent writing
                selectedObjectives = [
                  writingObjectives[(lessonIndex + 1) % writingObjectives.length],
                  writingObjectives[(lessonIndex + 2) % writingObjectives.length]
                ];
                break;
              case 6:
                // Week 6: Written assessment
                selectedObjectives = [
                  writingObjectives[0], // Primary writing objective
                  writingObjectives[writingObjectives.length - 1] // Advanced writing objective
                ];
                break;
              case 7:
                // Week 7: Presentations
                selectedObjectives = [
                  speakingObjectives[0],
                  speakingObjectives[speakingObjectives.length - 1]
                ];
                break;
              default:
                // Default fallback
                selectedObjectives = [
                  allObjectives[lessonIndex % allObjectives.length]
                ];
            }
          } else {
            // For other subjects, distribute objectives evenly but with progression
            const startIndex = ((week - 1) * weekLessons.length + lessonIndex) % allObjectives.length;
            selectedObjectives = [
              allObjectives[startIndex],
              allObjectives[(startIndex + Math.floor(allObjectives.length / 2)) % allObjectives.length]
            ];
          }
          
          // Filter out undefined objectives and ensure we have at least one
          selectedObjectives = selectedObjectives.filter(Boolean);
          if (selectedObjectives.length === 0) {
            selectedObjectives = [allObjectives[0]];
          }
          
          // Update the lesson with these objectives
          updateLessonObjectives(lesson.id, selectedObjectives.map(obj => ({
            id: obj.id,
            code: obj.code,
            description: obj.description
          })));
        });
      });

      setSuccess(true);
      setShowUndoButton(true);
      setTimeout(() => {
        onClose();
      }, 2000);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to apply objectives');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUndo = () => {
    undoAutoObjectives();
    setShowUndoButton(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        {onBack ? (
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
        ) : null}
        <h2 className="text-lg font-semibold text-gray-900">Automatically Apply Objectives</h2>
      </div>
      
      {error && (
        <div className="mb-6 flex items-start gap-2 p-4 bg-red-50 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 flex items-start gap-2 p-4 bg-green-50 rounded-lg">
          <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="text-sm text-green-600">
            Objectives successfully applied to all matching lessons across the term!
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.subject}
            onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC83D]"
            required
          >
            <option value="">Select Subject</option>
            {SUBJECTS.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Year Group <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.yearGroup}
            onChange={(e) => setFormData(prev => ({ ...prev, yearGroup: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC83D]"
            required
          >
            <option value="">Select Year Group</option>
            {YEAR_GROUPS.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Class <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.class}
            onChange={(e) => setFormData(prev => ({ ...prev, class: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC83D]"
            required
          >
            <option value="">Select Class</option>
            {CLASS_GROUPS.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Theme <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.theme}
            onChange={(e) => setFormData(prev => ({ ...prev, theme: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC83D]"
            placeholder="e.g., Victorian Literature"
            required
          />
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800 mb-2">How objectives will be applied:</h3>
          <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
            <li>Week 1: Introduction to theme, key concepts, short writing tasks</li>
            <li>Weeks 2-3: Modelled writing or shared writing, practicing key concepts</li>
            <li>Weeks 4-5: Longer and more independent writing tasks</li>
            <li>Week 6: Written assessment with focused objectives</li>
            <li>Week 7: Presentation skills and speaking objectives</li>
          </ul>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          {showUndoButton && (
            <button
              type="button"
              onClick={handleUndo}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
            >
              <Undo2 className="w-4 h-4" />
              <span>Undo</span>
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B434] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Target className="w-4 h-4" />
            <span>{isSubmitting ? 'Applying...' : 'Apply Objectives'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}