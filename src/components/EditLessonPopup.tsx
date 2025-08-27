'use client';

import React, { useState } from 'react';
import { X, Edit2, Trash2, Sparkles, Save, Clock, Users, Target, Brain, BookOpen, CheckCircle2, Plus } from 'lucide-react';

interface EditLessonPopupProps {
  lesson: any;
  onClose: () => void;
}

interface AIPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  panelType: string;
  currentContent: string;
  onSave: (newContent: string) => void;
}

function AIPromptModal({ isOpen, onClose, panelType, currentContent, onSave }: AIPromptModalProps) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation (in real app, this would call an AI service)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate mock content based on panel type and prompt
    let mockContent = '';
    if (panelType === 'Learning Objective') {
      mockContent = `I can ${prompt.toLowerCase()} through structured analysis and creative application of dystopian writing techniques`;
    } else if (panelType === 'Starter Activity') {
      mockContent = `Enhanced starter activity: ${prompt}. Students will engage in rapid-fire discussion and analysis to activate prior knowledge and build excitement for the lesson.`;
    } else if (panelType === 'Main Activity') {
      mockContent = `Comprehensive main activity: ${prompt}. Students will work collaboratively to develop skills through hands-on practice and guided discovery.`;
    } else if (panelType === 'Plenary Activity') {
      mockContent = `Reflective plenary activity: ${prompt}. Students will consolidate learning and demonstrate understanding through peer sharing and self-assessment.`;
    } else {
      mockContent = `Updated content based on your request: ${prompt}`;
    }
    
    setGeneratedContent(mockContent);
    setIsGenerating(false);
  };

  const handleSave = () => {
    onSave(generatedContent);
    onClose();
    setPrompt('');
    setGeneratedContent('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">AI Content Editor</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Editing: {panelType}
            </label>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">Current content:</p>
              <p className="text-sm text-gray-800 mt-1">{currentContent}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What would you like to change?
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={4}
              placeholder="Describe how you'd like to modify this content. For example: 'Make it more engaging for Year 10 students' or 'Add more interactive elements' or 'Focus on creative writing techniques'"
            />
          </div>

          {generatedContent && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Generated Content:
              </label>
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-gray-800">{generatedContent}</p>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            {!generatedContent ? (
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Apply Changes</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function EditLessonPopup({ lesson, onClose }: EditLessonPopupProps) {
  const [editedLesson, setEditedLesson] = useState(lesson);
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiModalConfig, setAIModalConfig] = useState({ panelType: '', currentContent: '', field: '' });
  const [hasChanges, setHasChanges] = useState(false);

  const handleEdit = (panelType: string, currentContent: string, field: string) => {
    setAIModalConfig({ panelType, currentContent, field });
    setShowAIModal(true);
  };

  const handleDelete = (field: string) => {
    if (confirm(`Are you sure you want to delete this ${field.toLowerCase()}?`)) {
      const updatedLesson = { ...editedLesson };
      
      if (field === 'Learning Objective') {
        updatedLesson.objectives = [];
      } else if (field === 'Theme') {
        updatedLesson.theme = '';
      } else if (field.includes('Activity')) {
        const activityType = field.split(' ')[0].toLowerCase();
        if (updatedLesson.activities) {
          delete updatedLesson.activities[activityType];
        }
      }
      
      setEditedLesson(updatedLesson);
      setHasChanges(true);
    }
  };

  const handleAISave = (newContent: string) => {
    const updatedLesson = { ...editedLesson };
    const { field } = aiModalConfig;
    
    if (field === 'Learning Objective') {
      updatedLesson.objectives = [{
        id: '1',
        code: 'AUTO',
        description: newContent
      }];
    } else if (field === 'Theme') {
      updatedLesson.theme = newContent;
    } else if (field.includes('Activity')) {
      const activityType = field.split(' ')[0].toLowerCase();
      if (!updatedLesson.activities) {
        updatedLesson.activities = {};
      }
      
      updatedLesson.activities[activityType] = {
        id: `${activityType}-${Date.now()}`,
        title: `Enhanced ${activityType.charAt(0).toUpperCase() + activityType.slice(1)} Activity`,
        description: newContent,
        duration: activityType === 'starter' ? '10 mins' : activityType === 'main' ? '40 mins' : '10 mins',
        type: 'discussion'
      };
    }
    
    setEditedLesson(updatedLesson);
    setHasChanges(true);
  };

  const handleSave = () => {
    // In a real app, this would save to the database
    console.log('Saving lesson changes:', editedLesson);
    alert('Lesson changes saved successfully!');
    onClose();
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'starter': return <Brain className="w-5 h-5 text-blue-600" />;
      case 'main': return <BookOpen className="w-5 h-5 text-amber-600" />;
      case 'plenary': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      default: return <BookOpen className="w-5 h-5 text-gray-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'starter': return 'border-blue-200 bg-blue-50';
      case 'main': return 'border-amber-200 bg-amber-50';
      case 'plenary': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Edit Lesson</h2>
            <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
              <span>{editedLesson.subject}</span>
              <span>•</span>
              <span>{editedLesson.yearGroup} Class {editedLesson.class}</span>
              <span>•</span>
              <span>{editedLesson.day} {editedLesson.startTime}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {hasChanges && (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Lesson Info Panel */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-gray-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Lesson Information</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit('Lesson Information', `${editedLesson.subject} - ${editedLesson.yearGroup} ${editedLesson.class}`, 'Basic Info')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Edit with AI"
                >
                  <Sparkles className="w-4 h-4 text-purple-600" />
                </button>
                <button
                  onClick={() => handleEdit('Lesson Information', `${editedLesson.subject} - ${editedLesson.yearGroup} ${editedLesson.class}`, 'Basic Info')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Edit lesson info"
                >
                  <Edit2 className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-700">Subject:</span>
                <span className="ml-2 text-sm text-gray-600">{editedLesson.subject}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Class:</span>
                <span className="ml-2 text-sm text-gray-600">{editedLesson.yearGroup} {editedLesson.class}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Time:</span>
                <span className="ml-2 text-sm text-gray-600">{editedLesson.day} {editedLesson.startTime}</span>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Duration:</span>
                <span className="ml-2 text-sm text-gray-600">{editedLesson.duration || '60 mins'}</span>
              </div>
            </div>
          </div>

          {/* Theme Panel */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-cyan-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Theme</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit('Theme', editedLesson.theme || 'No theme set', 'Theme')}
                  className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                  title="Edit theme with AI"
                >
                  <Sparkles className="w-4 h-4 text-purple-600" />
                </button>
                <button
                  onClick={() => handleEdit('Theme', editedLesson.theme || 'No theme set', 'Theme')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Edit theme"
                >
                  <Edit2 className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => handleDelete('Theme')}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  title="Delete theme"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
            <div className="p-3 bg-cyan-50 rounded-lg">
              <p className="text-sm text-cyan-800">
                {editedLesson.theme || 'No theme assigned to this lesson'}
              </p>
            </div>
          </div>

          {/* Learning Objectives Panel */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800">Learning Objectives</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit('Learning Objective', editedLesson.objectives?.[0]?.description || 'No learning objective set', 'Learning Objective')}
                  className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                  title="Edit with AI"
                >
                  <Sparkles className="w-4 h-4 text-purple-600" />
                </button>
                <button
                  onClick={() => handleEdit('Learning Objective', editedLesson.objectives?.[0]?.description || 'No learning objective set', 'Learning Objective')}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Edit objective"
                >
                  <Edit2 className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => handleDelete('Learning Objective')}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                  title="Delete objective"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
            {editedLesson.objectives && editedLesson.objectives.length > 0 ? (
              <div className="space-y-2">
                {editedLesson.objectives.map((objective, index) => (
                  <div key={index} className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <span className="text-sm font-medium text-green-800">{objective.code}:</span>
                      <span className="text-sm text-green-700">{objective.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">No learning objectives assigned</p>
              </div>
            )}
          </div>

          {/* Activities Panels */}
          {['starter', 'main', 'plenary'].map((activityType) => {
            const activity = editedLesson.activities?.[activityType];
            const activityName = activityType.charAt(0).toUpperCase() + activityType.slice(1);
            
            return (
              <div key={activityType} className={`bg-white rounded-lg border p-4 ${getActivityColor(activityType)}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      activityType === 'starter' ? 'bg-blue-100' : 
                      activityType === 'main' ? 'bg-amber-100' : 
                      'bg-green-100'
                    }`}>
                      {getActivityIcon(activityType)}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{activityName} Activity</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(`${activityName} Activity`, activity?.description || 'No activity planned', `${activityName} Activity`)}
                      className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                      title="Edit with AI"
                    >
                      <Sparkles className="w-4 h-4 text-purple-600" />
                    </button>
                    <button
                      onClick={() => handleEdit(`${activityName} Activity`, activity?.description || 'No activity planned', `${activityName} Activity`)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit activity"
                    >
                      <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(`${activityName} Activity`)}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      title="Delete activity"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                  </div>
                </div>
                
                {activity ? (
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Title</h4>
                      <p className="text-sm text-gray-600">{activity.title}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <span className="text-sm font-medium text-gray-700">Duration:</span>
                        <span className="ml-2 text-sm text-gray-600">{activity.duration}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Type:</span>
                        <span className="ml-2 text-sm text-gray-600">{activity.type}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">No {activityType} activity planned</p>
                    <button
                      onClick={() => handleEdit(`${activityName} Activity`, '', `${activityName} Activity`)}
                      className="mt-2 px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Activity</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* AI Prompt Modal */}
        <AIPromptModal
          isOpen={showAIModal}
          onClose={() => setShowAIModal(false)}
          panelType={aiModalConfig.panelType}
          currentContent={aiModalConfig.currentContent}
          onSave={handleAISave}
        />
      </div>
    </div>
  );
}