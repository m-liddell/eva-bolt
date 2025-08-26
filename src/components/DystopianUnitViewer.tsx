import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, BookOpen, Brain, CheckCircle2, Clock, Users, Target, ChevronDown, ChevronUp, Play, Eye, Download, FileText, GraduationCap } from 'lucide-react';
import InteractiveExplorationTemplate from './templates/InteractiveExplorationTemplate';
import QuickFireDiscussionTemplate from './templates/QuickFireDiscussionTemplate';
import CollaborativeInvestigationTemplate from './templates/CollaborativeInvestigationTemplate';
import ShowcaseAnalysisTemplate from './templates/ShowcaseAnalysisTemplate';
import CreativeApplicationTemplate from './templates/CreativeApplicationTemplate';
import KnowledgeRetrievalGameTemplate from './templates/KnowledgeRetrievalGameTemplate';
import ConsolidationConnectionTemplate from './templates/ConsolidationConnectionTemplate';
import { allDystopianActivities, dystopianUnitInfo } from '../data/dystopianUnit';
import { ActivityDetailsModal } from './ActivityDetailsModal';
import { StudentActivityModal } from './StudentActivityModal';
import { getStudentActivityByLessonAndPhase } from '../data/studentActivities';

interface DystopianUnitViewerProps {
  onClose: () => void;
  showInPopup?: boolean;
}

export function DystopianUnitViewer({ onClose, showInPopup = false }: DystopianUnitViewerProps) {
  const navigate = useNavigate();
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [viewingActivity, setViewingActivity] = useState<any>(null);
  const [showInteractiveActivity, setShowInteractiveActivity] = useState<any>(null);
  const [showStudentActivity, setShowStudentActivity] = useState<any>(null);
  const [showInteractiveLesson, setShowInteractiveLesson] = useState<any>(null);

  // Group activities by lesson (every 3 activities = 1 lesson)
  const lessons = [];
  
  // Create lessons from the dystopianLessons data which has the complete 16-lesson structure
  const dystopianLessons = [
    {
      lessonNumber: 1,
      title: "Dystopian World Discovery",
      phase: "Dystopian Foundation Knowledge",
      learningObjective: "I can understand and identify features of dystopian settings and recognize how they reflect social commentary"
    },
    {
      lessonNumber: 2,
      title: "Complete Sentences for Dystopian Description",
      phase: "Technical Writing Foundation",
      learningObjective: "I can use complete sentences to write compelling and technically accurate dystopian descriptions"
    },
    {
      lessonNumber: 3,
      title: "Simple and Compound Sentences for Dystopian Impact",
      phase: "Sentence Variety Development",
      learningObjective: "I can use simple and compound sentences strategically to create varied and engaging dystopian descriptions"
    },
    {
      lessonNumber: 4,
      title: "Complex Sentences for Dystopian Sophistication",
      phase: "Advanced Sentence Mastery",
      learningObjective: "I can use sophisticated complex sentences to create layered and compelling dystopian descriptions"
    },
    {
      lessonNumber: 5,
      title: "Personification for Unsettling Dystopian Atmosphere",
      phase: "Literary Device Mastery",
      learningObjective: "I can use personification strategically to create unsettling and oppressive atmospheres in dystopian settings"
    },
    {
      lessonNumber: 6,
      title: "Similes for Dystopian Atmospheric Creation",
      phase: "Literary Device Mastery",
      learningObjective: "I can identify and create powerful similes that enhance dystopian atmosphere and convey themes of oppression"
    },
    {
      lessonNumber: 7,
      title: "Sentence Types for Dystopian Drama",
      phase: "Advanced Sentence Effects",
      learningObjective: "I can use declarative, interrogative, and exclamatory sentences strategically to create dramatic effects in dystopian descriptions"
    },
    {
      lessonNumber: 8,
      title: "Basic Punctuation for Dystopian Atmosphere",
      phase: "Punctuation for Effect",
      learningObjective: "I can use a range of basic punctuation effectively to enhance atmosphere and clarity in dystopian descriptions"
    },
    {
      lessonNumber: 9,
      title: "Sophisticated Punctuation for Deliberate Effects",
      phase: "Advanced Punctuation Mastery",
      learningObjective: "I can use sophisticated punctuation strategically to create deliberate and powerful effects in dystopian writing"
    },
    {
      lessonNumber: 10,
      title: "Dystopian Themes in Setting Descriptions",
      phase: "Thematic Writing Development",
      learningObjective: "I can create compelling setting descriptions that effectively reflect different dystopian themes such as surveillance, environmental destruction, and social inequality"
    },
    {
      lessonNumber: 11,
      title: "Model Analysis for Clear Tone",
      phase: "Professional Writing Analysis",
      learningObjective: "I can analyze model dystopian descriptions to understand how professional writers create clear tone and apply these techniques to my own writing"
    },
    {
      lessonNumber: 12,
      title: "Strategic Planning for Dystopian Excellence",
      phase: "Strategic Writing Planning",
      learningObjective: "I can create detailed and strategic plans for effective dystopian setting descriptions that integrate all learned techniques"
    },
    {
      lessonNumber: 13,
      title: "Dystopian Setting Draft Creation",
      phase: "Independent Writing Application",
      learningObjective: "I can create compelling first drafts of dystopian settings using all techniques learned throughout the unit"
    },
    {
      lessonNumber: 14,
      title: "Peer Review and Collaborative Improvement",
      phase: "Collaborative Writing Development",
      learningObjective: "I can provide constructive feedback on dystopian writing and use peer suggestions to improve my own work"
    },
    {
      lessonNumber: 15,
      title: "Final Draft Refinement",
      phase: "Writing Mastery Demonstration",
      learningObjective: "I can refine and perfect my dystopian setting description to demonstrate mastery of all unit techniques"
    },
    {
      lessonNumber: 16,
      title: "Dystopian Writing Showcase and Reflection",
      phase: "Unit Culmination and Reflection",
      learningObjective: "I can present my dystopian writing confidently and reflect on my development as a descriptive writer throughout the unit"
    }
  ];
  
  // Map lessons to include activities from allDystopianActivities where available
  for (let i = 0; i < dystopianLessons.length; i++) {
    const lessonData = dystopianLessons[i];
    const lessonNumber = Math.floor(i / 3) + 1;
    
    // Try to find matching activities from allDystopianActivities
    const starter = allDystopianActivities.find(a => 
      a.activity_type === 'starter' && 
      a.phase === lessonData.phase
    );
    const main = allDystopianActivities.find(a => 
      a.activity_type === 'main' && 
      a.phase === lessonData.phase
    );
    const plenary = allDystopianActivities.find(a => 
      a.activity_type === 'plenary' && 
      a.phase === lessonData.phase
    );
    
    lessons.push({
      lessonNumber: lessonData.lessonNumber,
      title: lessonData.title,
      phase: lessonData.phase,
      learningObjective: lessonData.learningObjective,
      activities: { starter, main, plenary }
    });
  }

  const handleActivityView = (activity: any) => {
    setViewingActivity(activity);
  };

  const handleActivityStart = (activity: any) => {
    setShowInteractiveActivity(activity);
  };

  const getActivityIcon = (type: 'starter' | 'main' | 'plenary') => {
    switch (type) {
      case 'starter': return <Brain className="w-5 h-5 text-blue-600" />;
      case 'main': return <BookOpen className="w-5 h-5 text-amber-600" />;
      case 'plenary': return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    }
  };

  const getActivityColor = (type: 'starter' | 'main' | 'plenary') => {
    switch (type) {
      case 'starter': return 'border-blue-200 bg-blue-50';
      case 'main': return 'border-amber-200 bg-amber-50';
      case 'plenary': return 'border-green-200 bg-green-50';
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-7xl max-h-[95vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">{dystopianUnitInfo.title}</h1>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{dystopianUnitInfo.yearGroup}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{dystopianUnitInfo.duration}</span>
                    </div>
                    <div className="px-2 py-1 bg-white/20 rounded text-xs font-medium">
                      {allDystopianActivities.length} Activities
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Unit Overview */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 mb-6 border border-indigo-200">
              <h2 className="text-xl font-bold text-indigo-900 mb-3">Unit Overview</h2>
              <p className="text-indigo-800 mb-4">{dystopianUnitInfo.overview}</p>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-indigo-800 mb-2">Key Themes</h3>
                  <div className="space-y-1">
                    {dystopianUnitInfo.themes.map((theme, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                        <span className="text-sm text-indigo-700">{theme}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-indigo-800 mb-2">Core Texts</h3>
                  <div className="space-y-1">
                    {dystopianUnitInfo.coreTexts.map((text, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full" />
                        <span className="text-sm text-indigo-700">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Lessons Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Lesson Breakdown</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>{lessons.length} lessons</span>
                  <span>•</span>
                  <span>{allDystopianActivities.length} activities</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {lessons.map((lesson) => (
                  <div key={lesson.lessonNumber} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-900 text-white rounded-lg flex items-center justify-center font-bold">
                          {lesson.lessonNumber}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg mb-1">{lesson.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{lesson.learningObjective}</p>
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                              {lesson.phase}
                            </span>
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>60 mins</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            if (lesson.lessonNumber >= 1 && lesson.lessonNumber <= 6) {
                              setShowInteractiveLesson({
                                component: `DystopianLesson${lesson.lessonNumber}Starter`,
                                route: `/lesson/dystopian-lesson-${lesson.lessonNumber}/starter`,
                                lesson: {
                                  yearGroup: 'Year 10',
                                  class: 'A',
                                  subject: 'English',
                                  theme: 'Dystopian Fiction',
                                  title: lesson.title,
                                  learningObjective: lesson.learningObjective,
                                  phase: lesson.phase,
                                  lessonNumber: lesson.lessonNumber
                                }
                              });
                            } else {
                              alert('This lesson is not yet available as an interactive lesson.');
                            }
                          }}
                          className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                            lesson.lessonNumber <= 6 
                              ? 'bg-[#FFC83D] text-white hover:bg-[#E6B434]' 
                              : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          }`}
                          disabled={lesson.lessonNumber > 6}
                        >
                          {lesson.lessonNumber <= 6 ? 'View Lesson' : 'View Lesson Plan'}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (lesson.lessonNumber <= 6) {
                              const studentActivity = getStudentActivityByLessonAndPhase(lesson.lessonNumber, 'starter');
                              if (studentActivity) {
                                setShowStudentActivity(studentActivity);
                              } else {
                                setShowStudentActivity({
                                  phase: lesson.phase,
                                  lessonNumber: lesson.lessonNumber
                                });
                              }
                            }
                          }}
                          className={`px-4 py-2 rounded-lg transition-colors font-medium flex items-center gap-2 ${
                            lesson.lessonNumber <= 6 
                              ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                              : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          }`}
                          disabled={lesson.lessonNumber > 6}
                        >
                          <GraduationCap className="w-4 h-4" />
                          <span>View Student Activity</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Details Modal */}
      {viewingActivity && (
        <ActivityDetailsModal
          activity={viewingActivity}
          onClose={() => setViewingActivity(null)}
          readOnly={true}
        />
      )}

      {/* Student Activity Modal */}
      {showStudentActivity && (
        <StudentActivityModal
          activity={showStudentActivity}
          onClose={() => setShowStudentActivity(null)}
        />
      )}

      {/* Interactive Lesson Popup */}
      {showInteractiveLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-7xl max-h-[95vh] overflow-hidden m-4">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-xl font-semibold text-gray-800">Interactive Lesson - {showInteractiveLesson.lesson?.title}</h2>
              <button
                onClick={() => setShowInteractiveLesson(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="h-[calc(95vh-80px)] overflow-y-auto">
              {showInteractiveLesson.lesson?.lessonNumber >= 1 && showInteractiveLesson.lesson?.lessonNumber <= 6 && (
                <>
                  {/* Lesson 1 - Interactive Exploration Template */}
                  {showInteractiveLesson.lesson.lessonNumber === 1 && (
                    <InteractiveExplorationTemplate
                      lessonData={{
                        title: "Dystopian World Quick-Fire Exploration",
                        learning_objective: "I can quickly identify and explore key features of dystopian worlds through rapid-fire activities",
                        activity_type: "Quick-Fire Exploration",
                        exploration_focus: "Rapid identification and analysis of dystopian world characteristics",
                        interactive_elements: [
                          {
                            element_type: 'hands_on_activity' as const,
                            title: 'Dystopian Image Analysis Sprint',
                            description: 'Rapidly analyze dystopian images to identify key visual features and atmospheric elements',
                            materials: ['Dystopian image collection', 'Feature identification sheets', 'Timer for rapid analysis']
                          },
                          {
                            element_type: 'scenario_analysis' as const,
                            title: 'World-Building Speed Challenge',
                            description: 'Quick-fire creation of dystopian world elements using prompts and constraints',
                            materials: ['World-building prompt cards', 'Constraint challenge sheets', 'Collaborative planning tools']
                          },
                          {
                            element_type: 'collaborative_investigation' as const,
                            title: 'Genre Convention Hunt',
                            description: 'Team-based hunt for dystopian conventions across different media examples',
                            materials: ['Convention checklist', 'Media example library', 'Team recording sheets']
                          }
                        ],
                        discovery_questions: [
                          "What visual elements immediately signal a dystopian world?",
                          "How do dystopian societies control their citizens?",
                          "What role does technology play in dystopian control?",
                          "How do dystopian worlds reflect real-world concerns?"
                        ],
                        collaboration_structure: [
                          "Work in small teams to analyze different dystopian examples",
                          "Share findings through rapid-fire presentations",
                          "Build collective understanding of genre conventions",
                          "Challenge each other's interpretations and discoveries"
                        ],
                        theme: "Dystopian Fiction"
                      }}
                      navigationData={{
                        previousRoute: '/admin/lesson-library',
                        nextRoute: '/lesson/dystopian-lesson-1/main'
                      }}
                      showEditButtons={false}
                    />
                  )}

                  {/* Lesson 2 - Quick Fire Discussion Template */}
                  {showInteractiveLesson.lesson.lessonNumber === 2 && (
                    <QuickFireDiscussionTemplate
                      lessonData={{
                        title: "Sentence Construction Speed Challenge",
                        learning_objective: "I can construct complete sentences quickly and accurately using dystopian vocabulary",
                        activity_type: "Quick-Fire Discussion",
                        visual_stimulus: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80",
                        discussion_questions: [
                          "Create a simple sentence describing a dystopian setting",
                          "Build a compound sentence about government control",
                          "Construct a complex sentence showing character rebellion",
                          "Form a sentence using dystopian vocabulary (surveillance, oppression, conformity)",
                          "Write a sentence that creates an atmosphere of fear or unease"
                        ],
                        think_pair_share_prompts: [
                          "Practice creating complete sentences with dystopian vocabulary",
                          "Share your most atmospheric sentence with a partner",
                          "Discuss what makes sentences effective for creating mood",
                          "Build on each other's sentence construction techniques"
                        ],
                        theme: "Dystopian Fiction"
                      }}
                      navigationData={{
                        previousRoute: '/lesson/dystopian-lesson-2/starter',
                        nextRoute: '/lesson/dystopian-lesson-2/main'
                      }}
                    />
                  )}

                  {/* Lesson 3 - Knowledge Retrieval Game Template */}
                  {showInteractiveLesson.lesson.lessonNumber === 3 && (
                    <KnowledgeRetrievalGameTemplate
                      lessonData={{
                        title: "Simple vs Compound Sentence Power",
                        learning_objective: "I can compare simple and compound sentences to understand their different impacts in dystopian writing",
                        activity_type: "Sentence Variety Analysis Game",
                        game_type: 'speed_sorting' as const,
                        game_content: {
                          items: [
                            "The alarm screamed.",
                            "Guards appeared, and order was restored.",
                            "Citizens ran.",
                            "Cameras watched, but citizens ignored them.",
                            "Freedom died.",
                            "Propaganda echoed, and people hurried past.",
                            "Hope vanished.",
                            "Screens glowed, and shadows danced."
                          ],
                          categories: ["Simple Sentences", "Compound Sentences"]
                        },
                        timer_duration: 480,
                        theme: "Dystopian Fiction"
                      }}
                      navigationData={{
                        previousRoute: '/lesson/dystopian-lesson-3/starter',
                        nextRoute: '/lesson/dystopian-lesson-3/main'
                      }}
                    />
                  )}

                  {/* Lesson 4 - Collaborative Investigation Template */}
                  {showInteractiveLesson.lesson.lessonNumber === 4 && (
                    <CollaborativeInvestigationTemplate
                      lessonData={{
                        title: "Complex Sentence Mastery Workshop",
                        learning_objective: "I can create sophisticated dystopian descriptions using complex sentences with multiple subordinate clauses",
                        investigation_type: 'text_analysis_workshop' as const,
                        investigation_focus: "Analysis of complex sentence construction and sophistication techniques",
                        materials: {
                          texts: [
                            "Although the surveillance system promised safety, it actually created a prison where privacy became extinct.",
                            "While the government's propaganda broadcasts filled the airwaves with messages of prosperity, the reality beneath revealed environmental decay and social inequality.",
                            "Because the technological control mechanisms had infiltrated every aspect of human interaction, genuine relationships became nearly impossible."
                          ]
                        },
                        collaboration_structure: {
                          group_size: 4,
                          roles: [
                            "Complex Sentence Analyst",
                            "Sophistication Expert", 
                            "Effect Evaluator",
                            "Technique Teacher"
                          ]
                        },
                        theme: "Dystopian Fiction"
                      }}
                      navigationData={{
                        previousRoute: '/lesson/dystopian-lesson-4/starter',
                        nextRoute: '/lesson/dystopian-lesson-4/main'
                      }}
                    />
                  )}

                  {/* Lesson 5 - Interactive Exploration Template (Personification) */}
                  {showInteractiveLesson.lesson.lessonNumber === 5 && (
                    <InteractiveExplorationTemplate
                      lessonData={{
                        title: "Personification Power Discovery",
                        learning_objective: "I can understand how personification brings dystopian settings to life and creates unsettling effects",
                        activity_type: "Personification Exploration",
                        exploration_focus: "Hands-on exploration of how to give human qualities to dystopian objects and environments",
                        interactive_elements: [
                          {
                            element_type: 'hands_on_activity' as const,
                            title: 'Object Personality Assignment',
                            description: 'Give threatening human personalities to surveillance cameras, buildings, and technology',
                            materials: ['Dystopian object cards', 'Personality trait lists', 'Threatening quality worksheets']
                          },
                          {
                            element_type: 'scenario_analysis' as const,
                            title: 'Atmosphere Impact Testing',
                            description: 'Test how different human qualities create varying levels of threat and unease',
                            materials: ['Atmosphere assessment scales', 'Effect comparison charts', 'Reader response guides']
                          },
                          {
                            element_type: 'collaborative_investigation' as const,
                            title: 'Unsettling Effect Creation',
                            description: 'Collaborate to create the most unsettling personification examples possible',
                            materials: ['Creative brainstorming frameworks', 'Peer feedback forms', 'Effectiveness rubrics']
                          }
                        ],
                        discovery_questions: [
                          "What human qualities make surveillance cameras feel most threatening?",
                          "How might government buildings 'behave' if they were alive and hostile?",
                          "What emotions could sterile environments 'feel' toward humans?",
                          "How do human qualities make inanimate objects feel dangerous?"
                        ],
                        collaboration_structure: [
                          "Work in pairs to brainstorm threatening human qualities for objects",
                          "Test different personality combinations for maximum unsettling effect",
                          "Share most effective personification examples with other pairs",
                          "Collaborate to refine and improve each other's threatening descriptions"
                        ],
                        theme: "Dystopian Fiction"
                      }}
                      navigationData={{
                        previousRoute: '/lesson/dystopian-lesson-5/starter',
                        nextRoute: '/lesson/dystopian-lesson-5/main'
                      }}
                      showEditButtons={false}
                    />
                  )}

                  {/* Lesson 6 - Creative Application Template */}
                  {showInteractiveLesson.lesson.lessonNumber === 6 && (
                    <CreativeApplicationTemplate
                      lessonData={{
                        title: "Simile Mastery Workshop",
                        learning_objective: "I can create and test original similes that convey oppression and decay for maximum atmospheric impact",
                        creation_type: 'creative_challenge' as const,
                        creation_brief: "Create and test original similes that convey oppression and decay for maximum atmospheric impact",
                        support_materials: [
                          "Professional simile examples from dystopian literature",
                          "Simile construction frameworks and templates",
                          "Atmospheric effect testing guides and peer feedback forms",
                          "Oppression and decay vocabulary banks",
                          "Creative writing prompts and scenario cards"
                        ],
                        success_criteria: [
                          "Create original similes that effectively convey oppression themes",
                          "Test similes for maximum atmospheric impact and reader engagement",
                          "Understand how similes enhance dystopian writing compared to direct description",
                          "Apply simile techniques to create compelling and memorable descriptions",
                          "Demonstrate mastery of comparative writing techniques for thematic effect"
                        ],
                        theme: "Dystopian Fiction"
                      }}
                      navigationData={{
                        previousRoute: '/lesson/dystopian-lesson-6/starter',
                        nextRoute: '/lesson/dystopian-lesson-6/main'
                      }}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}