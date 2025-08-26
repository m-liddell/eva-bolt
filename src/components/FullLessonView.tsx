import React, { useState } from 'react';
import { X, Clock, Users, Target, Brain, BookOpen, CheckCircle2, ArrowLeft, Lightbulb, Users2, MessageSquare } from 'lucide-react';
import { MiniAssistant } from './MiniAssistant';
import { LessonHeader } from './LessonHeader';

interface FullLessonViewProps {
  activity: {
    id: string;
    title: string;
    description: string;
    duration: string;
    type: string;
    activity_type?: 'starter' | 'main' | 'plenary';
    dialogic_structure?: string;
    subject?: string;
    year_group?: string;
    details?: {
      preparation?: string[];
      steps?: string[];
      tips?: string[];
      differentiation?: string[];
      assessment?: string[];
      answers?: Record<string, string>;
      experiment?: any;
    };
  };
  activityType: 'starter' | 'main' | 'plenary';
  onClose: () => void;
  yearGroup?: string;
  classGroup?: string;
}

export function FullLessonView({ activity, activityType, onClose, yearGroup = 'Year 10', classGroup = 'A' }: FullLessonViewProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const getActivityTypeIcon = () => {
    if (activityType === 'starter') {
      return <Brain className="w-6 h-6 text-blue-600" />;
    } else if (activityType === 'main') {
      return <BookOpen className="w-6 h-6 text-[#FFC83D]" />;
    } else {
      return <CheckCircle2 className="w-6 h-6 text-green-600" />;
    }
  };

  const getActivityTypeColor = () => {
    if (activityType === 'starter') {
      return 'bg-blue-100 text-blue-700';
    } else if (activityType === 'main') {
      return 'bg-[#FFF9E7] text-[#FFC83D]';
    } else {
      return 'bg-green-100 text-green-700';
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

  const renderSteps = () => {
    if (!activity.details?.steps || activity.details.steps.length === 0) {
      return <p className="text-gray-500 italic">No steps available</p>;
    }

    return (
      <div className="space-y-4">
        {activity.details.steps.map((step, index) => {
          // Check if this step has an associated answer
          const answer = activity.details?.answers?.[step];
          
          // Check if the step is a header (starts with ** or #)
          const isHeader = step.startsWith('**') || step.startsWith('#');
          
          // Check if the step is a bullet point (starts with • or -)
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
    );
  };

  const renderExperiment = () => {
    if (!activity.details?.experiment) return null;
    
    const experiment = activity.details.experiment;
    
    return (
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-lg font-medium text-blue-800">{experiment.title || 'Experiment'}</h3>
        </div>
        
        {experiment.equipment && (
          <div className="mb-4">
            <h4 className="font-medium text-blue-700 mb-2">Equipment</h4>
            <ul className="space-y-1">
              {experiment.equipment.map((item: string, index: number) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-blue-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {experiment.procedure && (
          <div>
            <h4 className="font-medium text-blue-700 mb-2">Procedure</h4>
            <ol className="space-y-1 list-decimal list-inside">
              {experiment.procedure.map((step: string, index: number) => (
                <li key={index} className="text-blue-700">{step}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-8">
      <div className="max-w-[1400px] mx-auto px-4">
        <LessonHeader 
          yearGroup={yearGroup}
          classGroup={classGroup}
          phase={activityType.charAt(0).toUpperCase() + activityType.slice(1) as 'Starter' | 'Main' | 'Plenary'}
          subject={activity.subject || 'English'}
          theme={activity.title}
        />

        <div className="bg-white rounded-lg shadow-lg p-6 space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                activityType === 'starter' ? 'bg-blue-100' : 
                activityType === 'main' ? 'bg-[#FFF9E7]' : 
                'bg-green-100'
              }`}>
                {getActivityTypeIcon()}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{activity.title}</h2>
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
                  {activity.activity_type && (
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityTypeColor()}`}>
                      {activity.activity_type.charAt(0).toUpperCase() + activity.activity_type.slice(1)}
                    </div>
                  )}
                  {activity.dialogic_structure && (
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDialogicStructureStyle(activity.dialogic_structure)}`}>
                      {activity.dialogic_structure}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-[#FFC83D]" />
              <h3 className="text-lg font-semibold text-gray-800">Learning Objective</h3>
            </div>
            <p className="text-gray-700">{activity.description}</p>
          </div>

          {activity.details?.preparation && activity.details.preparation.length > 0 && (
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-[#FFC83D]" />
                <h3 className="text-lg font-semibold text-gray-800">Prior Knowledge</h3>
              </div>
              <ul className="space-y-2">
                {activity.details.preparation.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#FFC83D] mr-2">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activity.details?.steps && activity.details.steps.length > 0 && (
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="w-6 h-6 text-[#FFC83D]" />
                <h3 className="text-lg font-semibold text-gray-800">Activity Content</h3>
              </div>
              {renderSteps()}
              {renderExperiment()}
            </div>
          )}

          <div className="grid grid-cols-2 gap-6">
            {activity.details?.tips && activity.details.tips.length > 0 && (
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-5 h-5 text-[#FFC83D]" />
                  <h3 className="text-lg font-semibold text-gray-800">Teaching Tips</h3>
                </div>
                <ul className="space-y-2">
                  {activity.details.tips.map((tip, index) => (
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
                <div className="flex items-center gap-3 mb-4">
                  <Users2 className="w-5 h-5 text-[#FFC83D]" />
                  <h3 className="text-lg font-semibold text-gray-800">Differentiation</h3>
                </div>
                <ul className="space-y-2">
                  {activity.details.differentiation.map((item, index) => (
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
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-5 h-5 text-[#FFC83D]" />
                <h3 className="text-lg font-semibold text-gray-800">Assessment Opportunities</h3>
              </div>
              <ul className="space-y-2">
                {activity.details.assessment.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#FFC83D] mr-2">•</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}