import React, { useState } from 'react';
import { ChevronLeft, BarChart2, ArrowUpRight, ArrowDownRight, Minus, Users, BookOpen, Target, Brain, Info, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Mock data for teaching patterns
const TEACHING_DATA = {
  dialogicStrategies: {
    average: 95,
    breakdown: {
      'Dialogic Interaction and Co-Construction of Knowledge': {
        score: 98,
        skills: [
          'Values, Teamwork & Inquiry',
          'Knowledge building through interactions',
          'Collaboration response building',
          'Collaborative Problem solving',
          'Knowledge building'
        ]
      },
      'Respect for Diverse Voices and Multiple Perspectives': {
        score: 92,
        skills: [
          'Critical thinking interdisciplinary collaboration',
          'Legitimacy of diverse viewpoints experimental perspectives',
          'Perspective-taking experiential learning',
          'Co-construct understanding and criticality'
        ]
      },
      'Encouragement of Reflective and Critical Thinking': {
        score: 95,
        skills: [
          'Reflective and critical thinking',
          'Collaboration critical thinking'
        ]
      },
      'Metacognition and Self-Regulation': {
        score: 90,
        skills: [
          'Metacognition, self-regulation and language use'
        ]
      },
      'Commitment to Ethical and Democratic Engagement': {
        score: 94,
        skills: [
          'All voices, ethical care and mutual respect',
          'Reflect values question societal norms',
          'Democratic skills, perspective taking, consensus building',
          'Open mindedness collaboration and critical literacy'
        ]
      },
      'Encouraging Growth Through Dialogic Tensions and Disagreements': {
        score: 88,
        skills: [
          'Productive dialogue',
          'Reflection critical thinking',
          'Resolving tensions and building consensus'
        ]
      },
      'Promoting Social and Emotional Engagement': {
        score: 96,
        skills: [
          'Resolving tensions and building consensus'
        ]
      }
    }
  },
  studentProgress: {
    overall: {
      onTrack: 85,
      needsSupport: 15
    },
    byClass: {
      'Year 10A': {
        onTrack: 90,
        needsSupport: 10
      },
      'Year 9B': {
        onTrack: 82,
        needsSupport: 18
      },
      'Year 11C': {
        onTrack: 88,
        needsSupport: 12
      }
    }
  },
  lessonBreakdown: {
    'Starter Activities': {
      discussion: 45,
      individual: 30,
      group: 25
    },
    'Main Activities': {
      discussion: 35,
      individual: 40,
      group: 25
    },
    'Plenary Activities': {
      discussion: 50,
      individual: 30,
      group: 20
    }
  },
  teacherAssessment: {
    strengths: [
      'Excellent implementation of dialogic teaching strategies',
      'Strong focus on student engagement and participation',
      'Effective use of differentiated learning approaches'
    ],
    improvements: [
      'Consider increasing group work activities in main lessons',
      'Develop more opportunities for student-led discussions',
      'Enhance metacognitive reflection opportunities'
    ]
  }
};

function MyStatistics() {
  const navigate = useNavigate();
  const [selectedTimeframe, setSelectedTimeframe] = useState('This Term');
  const [selectedStrategy, setSelectedStrategy] = useState<string | null>(null);

  const renderProgressIndicator = (value: number, threshold: number = 90) => {
    if (value >= threshold) {
      return <ArrowUpRight className="w-4 h-4 text-green-500" />;
    } else if (value <= threshold - 10) {
      return <ArrowDownRight className="w-4 h-4 text-red-500" />;
    }
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#F8F9FA]">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-[#768396]">My Statistics</h1>
              <p className="text-sm text-gray-600">Analysis of your teaching strategies and student progress</p>
            </div>
          </div>
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC83D]"
          >
            <option>This Week</option>
            <option>This Month</option>
            <option>This Term</option>
            <option>This Year</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Dialogic Strategies */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#FFF9E7] rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-[#FFC83D]" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Dialogic Strategies</h2>
            </div>
            <div className="space-y-4">
              {Object.entries(TEACHING_DATA.dialogicStrategies.breakdown).map(([strategy, data]) => (
                <div key={strategy} className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-1">
                      <span className="text-sm text-gray-600 flex-1">{strategy}</span>
                      <button
                        onClick={() => setSelectedStrategy(selectedStrategy === strategy ? null : strategy)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <Info className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <span className="text-sm font-medium">{data.score}%</span>
                      {renderProgressIndicator(data.score)}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-[#FFC83D] h-2 rounded-full"
                      style={{ width: `${data.score}%` }}
                    />
                  </div>
                  {selectedStrategy === strategy && (
                    <div className="absolute left-0 right-0 mt-2 p-3 bg-white rounded-lg border border-gray-200 shadow-lg z-10">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-700">Student Skills</h4>
                        <button
                          onClick={() => setSelectedStrategy(null)}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <X className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                      <div className="space-y-1">
                        {data.skills.map((skill, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs text-gray-600">
                            <div className="w-1 h-1 rounded-full bg-[#FFC83D]" />
                            {skill}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Student Progress */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#FFF9E7] rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-[#FFC83D]" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Student Progress</h2>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">Overall Progress</p>
                  <p className="text-2xl font-semibold text-gray-800 mt-1">{TEACHING_DATA.studentProgress.overall.onTrack}%</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Needs Support</p>
                  <p className="text-2xl font-semibold text-gray-800 mt-1">{TEACHING_DATA.studentProgress.overall.needsSupport}%</p>
                </div>
              </div>
              <div className="space-y-4">
                {Object.entries(TEACHING_DATA.studentProgress.byClass).map(([className, progress]) => (
                  <div key={className} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{className}</span>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-green-600">{progress.onTrack}% on track</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-amber-600">{progress.needsSupport}% needs support</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Activity Type Analysis */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#FFF9E7] rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#FFC83D]" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Activity Type Analysis</h2>
            </div>
            <div className="space-y-6">
              {Object.entries(TEACHING_DATA.lessonBreakdown).map(([phase, types]) => (
                <div key={phase}>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">{phase}</h3>
                  <div className="flex gap-2">
                    {Object.entries(types).map(([type, percentage]) => (
                      <div 
                        key={type}
                        className="flex-1 p-3 bg-gray-50 rounded-lg"
                      >
                        <p className="text-xs text-gray-600 capitalize">{type}</p>
                        <p className="text-lg font-medium text-gray-800 mt-1">{percentage}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Assessment */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#FFF9E7] rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-[#FFC83D]" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Teaching Assessment</h2>
            </div>
            <div className="space-y-6">
              {/* Strengths */}
              <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                <h3 className="text-sm font-medium text-green-800 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Areas of Strength
                </h3>
                <div className="space-y-2">
                  {TEACHING_DATA.teacherAssessment.strengths.map((strength, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                      <p className="text-sm text-green-700">{strength}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Areas for Improvement */}
              <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
                <h3 className="text-sm font-medium text-amber-800 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Areas for Development
                </h3>
                <div className="space-y-2">
                  {TEACHING_DATA.teacherAssessment.improvements.map((improvement, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                      <p className="text-sm text-amber-700">{improvement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyStatistics;