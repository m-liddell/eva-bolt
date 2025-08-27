'use client';

import React, { useState } from 'react';
import { X, Upload, AlertCircle, Clock, Users, Target, Plus } from 'lucide-react';

interface LessonUploadModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

interface LessonFormData {
  title: string;
  description: string;
  duration: string;
  type: string;
  activity_type: 'starter' | 'main' | 'plenary';
  subject: string;
  year_group: string;
  dialogic_structure: string;
  details: {
    preparation?: string[];
    steps?: string[];
    tips?: string[];
    differentiation?: string[];
    assessment?: string[];
  };
}

const INITIAL_FORM_DATA: LessonFormData = {
  title: '',
  description: '',
  duration: '10 mins',
  type: 'discussion',
  activity_type: 'starter',
  subject: 'English',
  year_group: 'Year 10',
  dialogic_structure: 'Discussion',
  details: {
    preparation: [''],
    steps: [''],
    tips: [''],
    differentiation: [''],
    assessment: ['']
  }
};

const SUBJECTS = [
  'English', 'Mathematics', 'Science', 'History', 'Geography',
  'Modern Languages', 'Art', 'Music', 'Physical Education', 'Computing'
];

const YEAR_GROUPS = ['Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11'];

const DIALOGIC_STRUCTURES = [
  'Discussion', 'Simulation', 'Debate', 'Role Play', 'Inquiry',
  'Collaborative Problem Solving', 'Peer Teaching', 'Guided Discovery',
  'Think-Pair-Share', 'Socratic Dialogue'
];

export function LessonUploadModal({ onClose, onSuccess }: LessonUploadModalProps) {
  const [formData, setFormData] = useState<LessonFormData>(INITIAL_FORM_DATA);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInputChange = (section: keyof LessonFormData['details'], index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        [section]: prev.details[section]?.map((item, i) => i === index ? value : item) || []
      }
    }));
  };

  const addArrayItem = (section: keyof LessonFormData['details']) => {
    setFormData(prev => ({
      ...prev,
      details: {
        ...prev.details,
        [section]: [...(prev.details[section] || []), '']
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Store lesson in localStorage (in real app, this would save to a database)
      const newActivity = {
        id: Date.now().toString(),
        title: formData.title,
        description: formData.description,
        duration: formData.duration,
        type: formData.type,
        activity_type: formData.activity_type,
        subject: formData.subject,
        year_group: formData.year_group,
        dialogic_structure: formData.dialogic_structure,
        created_at: new Date().toISOString(),
        details: {
          preparation: formData.details.preparation?.filter(Boolean),
          steps: formData.details.steps?.filter(Boolean),
          tips: formData.details.tips?.filter(Boolean),
          differentiation: formData.details.differentiation?.filter(Boolean),
          assessment: formData.details.assessment?.filter(Boolean)
        }
      };
      
      // Save to localStorage
      const existingActivities = JSON.parse(localStorage.getItem('customActivities') || '[]');
      existingActivities.push(newActivity);
      localStorage.setItem('customActivities', JSON.stringify(existingActivities));

      onSuccess();
      onClose();
    } catch (err) {
      console.error('Error uploading lesson:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload lesson');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Upload New Lesson</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border-b border-red-100">
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC83D] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC83D] focus:border-transparent"
                required
              >
                <option value="10 mins">10 minutes</option>
                <option value="15 mins">15 minutes</option>
                <option value="20 mins">20 minutes</option>
                <option value="30 mins">30 minutes</option>
                <option value="40 mins">40 minutes</option>
                <option value="45 mins">45 minutes</option>
                <option value="60 mins">60 minutes</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC83D] focus:border-transparent"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC83D] focus:border-transparent"
                required
              >
                {SUBJECTS.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year Group
              </label>
              <select
                name="year_group"
                value={formData.year_group}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC83D] focus:border-transparent"
                required
              >
                {YEAR_GROUPS.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activity Type
              </label>
              <select
                name="activity_type"
                value={formData.activity_type}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC83D] focus:border-transparent"
                required
              >
                <option value="starter">Starter</option>
                <option value="main">Main</option>
                <option value="plenary">Plenary</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lesson Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC83D] focus:border-transparent"
                required
              >
                <option value="discussion">Discussion</option>
                <option value="individual">Individual</option>
                <option value="group">Group</option>
                <option value="whole-class">Whole Class</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dialogic Structure
              </label>
              <select
                name="dialogic_structure"
                value={formData.dialogic_structure}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC83D] focus:border-transparent"
                required
              >
                {DIALOGIC_STRUCTURES.map(structure => (
                  <option key={structure} value={structure}>{structure}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Activity Details */}
          {['preparation', 'steps', 'tips', 'differentiation', 'assessment'].map((section) => (
            <div key={section} className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {section}
              </label>
              {formData.details[section as keyof LessonFormData['details']]?.map((item, index) => (
                <input
                  key={index}
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayInputChange(section as keyof LessonFormData['details'], index, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC83D] focus:border-transparent"
                  placeholder={`Add ${section} item...`}
                />
              ))}
              <button
                type="button"
                onClick={() => addArrayItem(section as keyof LessonFormData['details'])}
                className="flex items-center gap-2 text-sm text-[#FFC83D] hover:text-[#E6B434] transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add {section}</span>
              </button>
            </div>
          ))}

          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B434] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Upload className="w-4 h-4 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Upload Lesson</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}