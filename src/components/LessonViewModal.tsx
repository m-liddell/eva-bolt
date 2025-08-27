'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Clock, Users, Target, Brain, BookOpen, CheckCircle2, ChevronRight, ChevronLeft, Eye, ExternalLink } from 'lucide-react';
import { Lesson } from '../store/timetableStore';
import { ActivityDetailsModal } from './ActivityDetailsModal';
import { FullLessonView } from './FullLessonView';

interface LessonViewModalProps {
  lesson: Lesson;
  onClose: () => void;
}

export function LessonViewModal({ lesson, onClose }: LessonViewModalProps) {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<'starter' | 'main' | 'plenary'>('starter');
  const [viewingActivity, setViewingActivity] = useState<any>(null);
  const [showFullLesson, setShowFullLesson] = useState(false);
  
  const isFullyPlanned = lesson.activities?.starter && 
                         lesson.activities?.main && 
                         lesson.activities?.plenary;

  const handleViewChange = (view: 'starter' | 'main' | 'plenary') => {
    setCurrentView(view);
  };

  const handleViewActivity = () => {
    if (currentView === 'starter' && lesson.activities?.starter) {
      setViewingActivity({
        ...lesson.activities.starter,
        activity_type: 'starter'
      });
    } else if (currentView === 'main' && lesson.activities?.main) {
      setViewingActivity({
        ...lesson.activities.main,
        activity_type: 'main'
      });
    } else if (currentView === 'plenary' && lesson.activities?.plenary) {
      setViewingActivity({
        ...lesson.activities.plenary,
        activity_type: 'plenary'
      });
    }
  };

  const handleViewInFullPage = () => {
    // Navigate to teaching interface with the specific phase
    router.push('/teach/lesson');
  };

  const getActivityContent = () => {
    if (currentView === 'starter' && lesson.activities?.starter) {
      return lesson.activities.starter;
    } else if (currentView === 'main' && lesson.activities?.main) {
      return lesson.activities.main;
    } else if (currentView === 'plenary' && lesson.activities?.plenary) {
      return lesson.activities.plenary;
    }
    return null;
  };

  const activityContent = getActivityContent();

  if (showFullLesson && activityContent) {
    return (
      <FullLessonView 
        activity={activityContent} 
        activityType={currentView}
        onClose={() => setShowFullLesson(false)}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{lesson.subject} Lesson</h2>
            <div className="flex items-center gap-4 mt-1">
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{lesson.yearGroup} {lesson.class}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{lesson.duration || '60 mins'}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {!isFullyPlanned ? (
          <div className="p-6">
            <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">This lesson hasn't been fully planned yet. Add starter, main, and plenary activities to view lesson details.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="p-6 border-b border-gray-200">
              {lesson.theme && (
                <div className="mb-4 p-3 bg-[#FFF9E7] rounded-lg">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#FFC83D]" />
                    <h3 className="font-medium text-[#B17F17]">Theme: {lesson.theme}</h3>
                  </div>
                </div>
              )}
              
              {lesson.objectives && lesson.objectives.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Learning Objectives</h3>
                  <div className="space-y-2">
                    {lesson.objectives.map((objective) => (
                      <div key={objective.id} className="flex items-start gap-2 p-3 bg-[#F0FFF7] rounded-lg">
                        <Target className="w-4 h-4 text-[#00875A] mt-1" />
                        <div>
                          <div className="font-medium text-[#00875A] text-sm mb-1">{objective.code}</div>
                          <p className="text-sm text-[#00875A]">{objective.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex border-b border-gray-200">
                <button
                  className={`px-4 py-2 font-medium text-sm ${
                    currentView === 'starter'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => handleViewChange('starter')}
                >
                  Starter
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm ${
                    currentView === 'main'
                      ? 'text-[#FFC83D] border-b-2 border-[#FFC83D]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => handleViewChange('main')}
                >
                  Main
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm ${
                    currentView === 'plenary'
                      ? 'text-green-600 border-b-2 border-green-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => handleViewChange('plenary')}
                >
                  Plenary
                </button>
              </div>
            </div>

            <div className="p-6">
              {activityContent ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        currentView === 'starter' ? 'bg-blue-100' : 
                        currentView === 'main' ? 'bg-[#FFF9E7]' : 
                        'bg-green-100'
                      }`}>
                        {currentView === 'starter' ? (
                          <Brain className={`w-5 h-5 text-blue-600`} />
                        ) : currentView === 'main' ? (
                          <BookOpen className={`w-5 h-5 text-[#FFC83D]`} />
                        ) : (
                          <CheckCircle2 className={`w-5 h-5 text-green-600`} />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{activityContent.title}</h3>
                        <p className="text-sm text-gray-600">{activityContent.duration}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleViewActivity}
                        className={`px-4 py-2 rounded-lg text-white flex items-center gap-2 ${
                          currentView === 'starter' ? 'bg-blue-600 hover:bg-blue-700' : 
                          currentView === 'main' ? 'bg-[#FFC83D] hover:bg-[#E6B434]' : 
                          'bg-green-600 hover:bg-green-700'
                        } transition-colors`}
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                      <button
                        onClick={handleViewInFullPage}
                        className={`px-4 py-2 rounded-lg text-white flex items-center gap-2 ${
                          currentView === 'starter' ? 'bg-blue-600 hover:bg-blue-700' : 
                          currentView === 'main' ? 'bg-[#FFC83D] hover:bg-[#E6B434]' : 
                          'bg-green-600 hover:bg-green-700'
                        } transition-colors`}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Open Full Page</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">Description</h4>
                    <p className="text-gray-700">{activityContent.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Activity Type</h4>
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        activityContent.type === 'discussion' ? 'bg-blue-100 text-blue-700' :
                        activityContent.type === 'individual' ? 'bg-purple-100 text-purple-700' :
                        activityContent.type === 'group' ? 'bg-green-100 text-green-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {activityContent.type}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">Dialogic Structure</h4>
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        activityContent.dialogic_structure === 'Discussion' ? 'bg-blue-100 text-blue-700' :
                        activityContent.dialogic_structure === 'Think-Pair-Share' ? 'bg-cyan-100 text-cyan-700' :
                        activityContent.dialogic_structure === 'Collaborative Problem Solving' ? 'bg-indigo-100 text-indigo-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {activityContent.dialogic_structure || 'Discussion'}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No {currentView} activity found for this lesson.</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between p-4 border-t border-gray-200">
              <button
                onClick={() => handleViewChange(currentView === 'starter' ? 'plenary' : currentView === 'main' ? 'starter' : 'main')}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                disabled={currentView === 'starter'}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{currentView === 'main' ? 'Starter' : currentView === 'plenary' ? 'Main' : ''}</span>
              </button>
              <button
                onClick={() => handleViewChange(currentView === 'starter' ? 'main' : currentView === 'main' ? 'plenary' : 'starter')}
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
                disabled={currentView === 'plenary'}
              >
                <span>{currentView === 'starter' ? 'Main' : currentView === 'main' ? 'Plenary' : ''}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

        {/* Activity Details Modal */}
        {viewingActivity && (
          <ActivityDetailsModal
            activity={viewingActivity}
            onClose={() => setViewingActivity(null)}
            readOnly={true}
          />
        )}
      </div>
    </div>
  );
}