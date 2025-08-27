'use client';

import React, { useState } from 'react';
import { X, Clock, Users, Target, Brain, BookOpen, CheckCircle2, Lightbulb, Users2, MessageSquare, Globe, Award, Play, Maximize2, ExternalLink, ChevronRight, ChevronDown, Eye, Sparkles, Edit2, Trash2, Save } from 'lucide-react';
import { MiniAssistant } from './MiniAssistant';

interface LessonEditPopupProps {
  lesson: any;
  onClose: () => void;
  onSave?: (updatedLesson: any) => void;
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
    
    // Simulate AI generation
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

export function LessonEditPopup({ lesson, onClose, onSave }: LessonEditPopupProps) {
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
    if (onSave) {
      onSave(editedLesson);
    }
    setHasChanges(false);
    alert('Lesson changes saved to your personal lessons!');
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'starter': return <Brain className="w-5 h-5 text-blue-600" />;
      case 'main': return <BookOpen className="w-5 h-5 text-amber-600" />;
      case 'plenary': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      default: return <BookOpen className="w-5 h-5 text-gray-600" />;
    }
  };

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case 'starter': return 'bg-blue-100 text-blue-700';
      case 'main': return 'bg-[#FFF9E7] text-[#FFC83D]';
      case 'plenary': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDialogicStructureStyle = (structure: string = 'Discussion') => {
    switch (structure) {
      case 'Discussion':
        return 'bg-blue-100 text-blue-700';
      case 'Simulation':
        return 'bg-purple-100 text-purple-700';
      case 'Debate':
        return 'bg-orange-100 text-orange-700';
      case 'Role Play':
        return 'bg-green-100 text-green-700';
      case 'Think-Pair-Share':
        return 'bg-cyan-100 text-cyan-700';
      case 'Collaborative Problem Solving':
        return 'bg-indigo-100 text-indigo-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-8">
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFF9E7] rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#FFC83D]" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Edit Lesson: {editedLesson.subject}</h2>
                <div className="flex items-center gap-4 mt-1">
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{editedLesson.duration || '60 mins'}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{editedLesson.yearGroup} Class {editedLesson.class}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <BookOpen className="w-4 h-4" />
                    <span>{editedLesson.subject}</span>
                  </div>
                  {editedLesson.theme && (
                    <div className="px-2 py-1 bg-[#FFF9E7] text-[#B17F17] rounded text-xs">
                      {editedLesson.theme}
                    </div>
                  )}
                </div>
              </div>
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
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Learning Objectives */}
        {editedLesson.objectives && editedLesson.objectives.length > 0 && (
          <div className="border border-indigo-200 rounded-lg p-6 bg-gradient-to-br from-indigo-50 to-purple-50 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-indigo-800">Learning Objectives</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit('Learning Objective', editedLesson.objectives[0]?.description || '', 'Learning Objective')}
                  className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                  title="Edit with AI"
                >
                  <Sparkles className="w-4 h-4 text-purple-600" />
                </button>
                <button
                  onClick={() => handleEdit('Learning Objective', editedLesson.objectives[0]?.description || '', 'Learning Objective')}
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
            <div className="space-y-3">
              {editedLesson.objectives.map((objective: any) => (
                <div key={objective.id} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2" />
                  <div>
                    <span className="font-medium text-indigo-800 text-sm">{objective.code}: </span>
                    <span className="text-sm text-indigo-700">{objective.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Theme Section */}
        {editedLesson.theme && (
          <div className="border border-cyan-200 rounded-lg p-6 bg-gradient-to-br from-cyan-50 to-blue-50 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-cyan-600" />
                </div>
                <h3 className="text-lg font-semibold text-cyan-800">Theme</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit('Theme', editedLesson.theme, 'Theme')}
                  className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                  title="Edit with AI"
                >
                  <Sparkles className="w-4 h-4 text-purple-600" />
                </button>
                <button
                  onClick={() => handleEdit('Theme', editedLesson.theme, 'Theme')}
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
            <p className="text-cyan-700">{editedLesson.theme}</p>
          </div>
        )}

        {/* Activities */}
        {editedLesson.activities && (
          <div className="space-y-6">
            {(['starter', 'main', 'plenary'] as const).map((activityType) => {
              const activity = editedLesson.activities[activityType];
              if (!activity) return null;

              return (
                <div key={activityType} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        activityType === 'starter' ? 'bg-blue-100' : 
                        activityType === 'main' ? 'bg-[#FFF9E7]' : 
                        'bg-green-100'
                      }`}>
                        {getActivityIcon(activityType)}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{activity.title}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>{activity.duration}</span>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            activity.type === 'discussion' ? 'bg-blue-100 text-blue-700' :
                            activity.type === 'individual' ? 'bg-purple-100 text-purple-700' :
                            activity.type === 'group' ? 'bg-green-100 text-green-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {activity.type}
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityTypeColor(activityType)}`}>
                            {activityType.charAt(0).toUpperCase() + activityType.slice(1)}
                          </div>
                          {activity.dialogic_structure && (
                            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDialogicStructureStyle(activity.dialogic_structure)}`}>
                              {activity.dialogic_structure}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(`${activityType.charAt(0).toUpperCase() + activityType.slice(1)} Activity`, activity.description, `${activityType.charAt(0).toUpperCase() + activityType.slice(1)} Activity`)}
                        className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                        title="Edit with AI"
                      >
                        <Sparkles className="w-4 h-4 text-purple-600" />
                      </button>
                      <button
                        onClick={() => handleEdit(`${activityType.charAt(0).toUpperCase() + activityType.slice(1)} Activity`, activity.description, `${activityType.charAt(0).toUpperCase() + activityType.slice(1)} Activity`)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit activity"
                      >
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(`${activityType.charAt(0).toUpperCase() + activityType.slice(1)} Activity`)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete activity"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="w-6 h-6 text-[#FFC83D]" />
                      <h3 className="text-lg font-semibold text-gray-800">Activity Description</h3>
                    </div>
                    <p className="text-gray-700">{activity.description}</p>
                  </div>

                  {activity.details?.preparation && activity.details.preparation.length > 0 && (
                    <div className="border border-gray-200 rounded-lg p-6 mt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-6 h-6 text-[#FFC83D]" />
                          <h3 className="text-lg font-semibold text-gray-800">Prior Knowledge</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit('Prior Knowledge', activity.details?.preparation?.join('\n') || '', 'Prior Knowledge')}
                            className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                            title="Edit with AI"
                          >
                            <Sparkles className="w-4 h-4 text-purple-600" />
                          </button>
                          <button
                            onClick={() => handleEdit('Prior Knowledge', activity.details?.preparation?.join('\n') || '', 'Prior Knowledge')}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit preparation"
                          >
                            <Edit2 className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleDelete('Prior Knowledge')}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                            title="Delete preparation"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {activity.details.preparation.map((item: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="text-[#FFC83D] mr-2">•</span>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activity.details?.steps && activity.details.steps.length > 0 && (
                    <div className="border border-gray-200 rounded-lg p-6 mt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <MessageSquare className="w-6 h-6 text-[#FFC83D]" />
                          <h3 className="text-lg font-semibold text-gray-800">Activity Steps</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit('Activity Steps', activity.details?.steps?.join('\n') || '', 'Activity Steps')}
                            className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                            title="Edit with AI"
                          >
                            <Sparkles className="w-4 h-4 text-purple-600" />
                          </button>
                          <button
                            onClick={() => handleEdit('Activity Steps', activity.details?.steps?.join('\n') || '', 'Activity Steps')}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit steps"
                          >
                            <Edit2 className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleDelete('Activity Steps')}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                            title="Delete steps"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {activity.details.steps.map((step: string, index: number) => {
                          const answer = activity.details?.answers?.[step];
                          const isHeader = step.startsWith('**') || step.startsWith('#');
                          const isBullet = step.startsWith('•') || step.startsWith('-');
                          
                          return (
                            <div key={index} className={`flex items-start justify-between gap-4 ${isHeader ? 'mt-4' : ''}`}>
                              <div className="flex-1">
                                {isHeader ? (
                                  <h4 className="font-medium text-gray-800 my-2">{step.replace(/\*\*/g, '')}</h4>
                                ) : isBullet ? (
                                  <div className="flex items-start">
                                    <span className="text-[#FFC83D] mr-2">•</span>
                                    <p className="text-gray-700">{step.replace(/^[•-]\s*/, '')}</p>
                                  </div>
                                ) : (
                                  <p className="text-gray-700 whitespace-pre-wrap">{step}</p>
                                )}
                              </div>
                              {answer && <MiniAssistant answer={answer} />}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-6 mt-6">
                    {activity.details?.tips && activity.details.tips.length > 0 && (
                      <div className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Lightbulb className="w-5 h-5 text-[#FFC83D]" />
                            <h3 className="text-lg font-semibold text-gray-800">Teaching Tips</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit('Teaching Tips', activity.details?.tips?.join('\n') || '', 'Teaching Tips')}
                              className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                              title="Edit with AI"
                            >
                              <Sparkles className="w-4 h-4 text-purple-600" />
                            </button>
                            <button
                              onClick={() => handleEdit('Teaching Tips', activity.details?.tips?.join('\n') || '', 'Teaching Tips')}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Edit tips"
                            >
                              <Edit2 className="w-4 h-4 text-gray-600" />
                            </button>
                            <button
                              onClick={() => handleDelete('Teaching Tips')}
                              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                              title="Delete tips"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                        <ul className="space-y-2">
                          {activity.details.tips.map((tip: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <span className="text-[#FFC83D] mr-2">•</span>
                              <span className="text-gray-700">{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {activity.details?.differentiation && activity.details.differentiation.length > 0 && (
                      <div className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Users2 className="w-5 h-5 text-[#FFC83D]" />
                            <h3 className="text-lg font-semibold text-gray-800">Differentiation</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit('Differentiation', activity.details?.differentiation?.join('\n') || '', 'Differentiation')}
                              className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                              title="Edit with AI"
                            >
                              <Sparkles className="w-4 h-4 text-purple-600" />
                            </button>
                            <button
                              onClick={() => handleEdit('Differentiation', activity.details?.differentiation?.join('\n') || '', 'Differentiation')}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Edit differentiation"
                            >
                              <Edit2 className="w-4 h-4 text-gray-600" />
                            </button>
                            <button
                              onClick={() => handleDelete('Differentiation')}
                              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                              title="Delete differentiation"
                            >
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                        <ul className="space-y-2">
                          {activity.details.differentiation.map((item: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <span className="text-[#FFC83D] mr-2">•</span>
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {activity.details?.assessment && activity.details.assessment.length > 0 && (
                    <div className="border border-gray-200 rounded-lg p-6 mt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Target className="w-5 h-5 text-[#FFC83D]" />
                          <h3 className="text-lg font-semibold text-gray-800">Assessment Opportunities</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit('Assessment Opportunities', activity.details?.assessment?.join('\n') || '', 'Assessment Opportunities')}
                            className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                            title="Edit with AI"
                          >
                            <Sparkles className="w-4 h-4 text-purple-600" />
                          </button>
                          <button
                            onClick={() => handleEdit('Assessment Opportunities', activity.details?.assessment?.join('\n') || '', 'Assessment Opportunities')}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit assessment"
                          >
                            <Edit2 className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleDelete('Assessment Opportunities')}
                            className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                            title="Delete assessment"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {activity.details.assessment.map((item: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="text-[#FFC83D] mr-2">•</span>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

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