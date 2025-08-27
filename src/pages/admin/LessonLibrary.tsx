import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown, BookOpen, AlertCircle, Target, FileText, Plus, X, Clock, Users, Brain, CheckCircle2, Eye, MessageCircle, Settings, Upload, Trash2, RefreshCw, Heart, GraduationCap } from 'lucide-react';
import { LessonUploadModal } from '../../components/LessonUploadModal';
import { ActivityDetailsModal } from '../../components/ActivityDetailsModal';
import { DystopianUnitViewer } from '../../components/DystopianUnitViewer';
import { StudentActivityModal } from '../../components/StudentActivityModal';
import { getStudentActivityByLessonAndPhase } from '../../data/studentActivities';
import { allEnhancedActivities } from '../../data/enhancedLessonActivities';
import InteractiveExplorationTemplate from '../../components/templates/InteractiveExplorationTemplate';
import QuickFireDiscussionTemplate from '../../components/templates/QuickFireDiscussionTemplate';
import CollaborativeInvestigationTemplate from '../../components/templates/CollaborativeInvestigationTemplate';
import ShowcaseAnalysisTemplate from '../../components/templates/ShowcaseAnalysisTemplate';

interface LessonActivity {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: string;
  activity_type: 'starter' | 'main' | 'plenary';
  subject: string;
  year_group: string;
  dialogic_structure: string;
  created_at: string;
  created_by?: string;
  keywords?: string[];
  homework?: string;
  phase?: string;
  unit_context?: {
    title: string;
    overview: string;
    themes: string[];
  };
  details?: {
    preparation?: string[];
    steps?: string[];
    tips?: string[];
    differentiation?: string[];
    assessment?: string[];
    answers?: Record<string, string>;
    experiment?: any;
    success_criteria?: string[];
    real_world_connections?: string[];
  };
}

const SUBJECTS = [
  'English', 'Mathematics', 'Science', 'History', 'Geography',
  'Modern Languages', 'Art', 'Music', 'Physical Education', 'Computing'
];

const YEAR_GROUPS = ['Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11'];

const THEMES = [
  'Dystopian Fiction', 'Creative Writing', 'War Poetry', 'Shakespeare',
  'Modern Literature', 'Travel Writing', 'Myths and Legends', 'Victorian Literature',
  'Energy Transfer', 'Forces and Motion', 'Chemical Reactions',
  'Industrial Revolution', 'World War I', 'World War II', 'Creative Writing'
];

const InteractiveLessonModal = ({ lesson, onClose }) => {
  if (lesson.type === 'template') {
    if (lesson.template === 'InteractiveExplorationTemplate') {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-xl font-semibold text-gray-800">{lesson.data.title}</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="h-full">
              <InteractiveExplorationTemplate
                lessonData={lesson.data}
                navigationData={lesson.navigationData}
                showEditButtons={false}
              />
            </div>
          </div>
        </div>
      );
    } else if (lesson.template === 'QuickFireDiscussionTemplate') {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-7xl w-full max-h-[95vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-xl font-semibold text-gray-800">{lesson.data.title}</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="h-full">
              <QuickFireDiscussionTemplate
                lessonData={lesson.data}
                navigationData={lesson.navigationData}
              />
            </div>
          </div>
        </div>
      );
    }
  }
  return null;
};

export default function LessonLibrary() {
  const router = useRouter();
  const [activities, setActivities] = useState<LessonActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedYearGroup, setSelectedYearGroup] = useState<string>('');
  const [selectedActivityType, setSelectedActivityType] = useState<string>('');
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [currentTheme, setCurrentTheme] = useState<string>('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [viewingActivity, setViewingActivity] = useState<LessonActivity | null>(null);
  const [showDystopianUnitViewer, setShowDystopianUnitViewer] = useState(false);
  const [showStudentActivity, setShowStudentActivity] = useState<any>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showInteractiveLesson, setShowInteractiveLesson] = useState<any>(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use only enhanced activities since we removed Supabase
      const allActivities = [...allEnhancedActivities];
      setActivities(allActivities);
    } catch (err) {
      console.error('Error fetching activities:', err);
      setError(err instanceof Error ? err.message : 'Failed to load activities');
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSubject('');
    setSelectedYearGroup('');
    setSelectedActivityType('');
    setSelectedTheme('');
    setCurrentTheme('');
  };

  const toggleFavorite = (activityId: string) => {
    setFavorites(prev => 
      prev.includes(activityId) 
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    );
  };

  const handleOpenInteractiveLesson = (activity: LessonActivity) => {
    // Check if this is a dystopian activity that should use the interactive template
    const title = activity.title.toLowerCase();
    
    if (title.includes('dystopian world discovery') || title.includes('dystopian world quick-fire')) {
      setShowInteractiveLesson({
        type: 'template',
        template: 'InteractiveExplorationTemplate',
        data: {
          title: "Dystopian World Quick-Fire Exploration",
          learning_objective: "Learn quickly identify and explore key features of dystopian worlds through rapid-fire activities",
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
        },
        navigationData: {
          previousRoute: '/admin/lesson-library',
          nextRoute: '/admin/lesson-library'
        }
      });
    } else if (title.includes('complete sentence') || title.includes('sentence foundation')) {
      setShowInteractiveLesson({
        type: 'template',
        template: 'QuickFireDiscussionTemplate',
        data: {
          title: "Sentence Construction Speed Challenge",
          learning_objective: "I can construct complete sentences quickly and accurately using dystopian vocabulary",
          activity_type: "Quick-Fire Discussion",
          discussion_type: 'speed_challenge' as const,
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
          visual_stimulus: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80',
          theme: "Dystopian Fiction"
        },
        navigationData: {
          previousRoute: '/admin/lesson-library',
          nextRoute: '/admin/lesson-library'
        }
      });
    } else if (title.includes('personification') || title.includes('atmosphere')) {
      setShowInteractiveLesson({
        type: 'template',
        template: 'InteractiveExplorationTemplate',
        data: {
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
        },
        navigationData: {
          previousRoute: '/admin/lesson-library',
          nextRoute: '/admin/lesson-library'
        }
      });
    } else if (title.includes('think-pair-share')) {
      setShowInteractiveLesson({
        type: 'template',
        template: 'QuickFireDiscussionTemplate',
        data: {
          title: "Think-Pair-Share with a Twist",
          learning_objective: "Students think individually, discuss with a partner, then identify one agreement and one disagreement before sharing with the class",
          activity_type: "Enhanced Think-Pair-Share",
          visual_stimulus: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80',
          discussion_questions: [
            'Should society prioritize security over individual freedom?',
            'How do surveillance systems affect human behavior?',
            'What are the benefits and risks of government control?',
            'How can we balance safety with personal liberty?'
          ],
          think_pair_share_prompts: [
            'Identify one point you and your partner AGREE on about security vs freedom',
            'Identify one point you and your partner DISAGREE about',
            'Share your agreement and disagreement with the class',
            'Explain the reasoning behind both your consensus and conflict'
          ],
          theme: currentTheme || 'General Discussion'
        },
        navigationData: {
          previousRoute: '/admin/lesson-library',
          nextRoute: '/admin/lesson-library'
        }
      });
    } else {
      // For other activities, show the activity details modal
      setViewingActivity(activity);
    }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = 
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = !selectedSubject || activity.subject === selectedSubject;
    const matchesYearGroup = !selectedYearGroup || activity.year_group === selectedYearGroup;
    const matchesActivityType = !selectedActivityType || activity.activity_type === selectedActivityType;
    
    // Enhanced theme matching
    const matchesTheme = !selectedTheme || (() => {
      const themeQuery = selectedTheme.toLowerCase();
      
      // Special case: Think-Pair-Share should appear for ALL themes
      if (activity.title === 'Think-Pair-Share with a Twist') {
        return true;
      }
      
      // Direct theme matches
      if (activity.unit_context?.title.toLowerCase().includes(themeQuery)) return true;
      if (activity.phase?.toLowerCase().includes(themeQuery)) return true;
      
      // Keyword matches
      if (activity.keywords?.some(keyword => keyword.toLowerCase().includes(themeQuery))) return true;
      
      // Check if theme is in the unit_context themes array
      if (activity.unit_context?.themes?.some(theme => theme.toLowerCase().includes(themeQuery))) return true;
      
      // Title and description matches for theme content
      if (activity.title.toLowerCase().includes(themeQuery)) return true;
      if (activity.description.toLowerCase().includes(themeQuery)) return true;
      
      // Specific theme mappings
      if (themeQuery === 'dystopian fiction' || themeQuery === 'dystopian') {
        return activity.title.toLowerCase().includes('dystopian') ||
               activity.description.toLowerCase().includes('dystopian') ||
               activity.keywords?.includes('dystopian') ||
               activity.phase?.toLowerCase().includes('dystopian');
      }
      
      if (themeQuery === 'creative writing') {
        return activity.title.toLowerCase().includes('writing') ||
               activity.description.toLowerCase().includes('writing') ||
               activity.keywords?.includes('writing') ||
               activity.type === 'creative' ||
               activity.unit_context?.themes?.some(theme => theme.toLowerCase().includes('creative writing'));
      }
      
      if (themeQuery === 'energy transfer' || themeQuery === 'energy') {
        return activity.title.toLowerCase().includes('energy') ||
               activity.description.toLowerCase().includes('energy') ||
               activity.keywords?.includes('energy');
      }
      
      if (themeQuery === 'industrial revolution') {
        return activity.title.toLowerCase().includes('industrial') ||
               activity.description.toLowerCase().includes('industrial') ||
               activity.keywords?.includes('industrial');
      }
      
      return false;
    })();

    return matchesSearch && matchesSubject && matchesYearGroup && matchesActivityType && matchesTheme;
  });

  // Remove duplicates
  const uniqueActivities = filteredActivities.filter((activity, index, self) => 
    index === self.findIndex(a => a.title === activity.title && a.activity_type === activity.activity_type)
  );

  return (
    <div className="min-h-[calc(100vh-48px)] bg-[#F8F9FA]">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#768396]">Lesson Library</h1>
            <p className="text-sm text-gray-600">
              {loading ? 'Loading...' : `${activities.length} activities available`}
            </p>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 flex items-center gap-2 p-4 bg-red-50 text-red-600 rounded-lg">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Current Theme Banner */}
        {currentTheme && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-amber-800">Current Theme:</span>
                  <span className="font-bold text-amber-900">{currentTheme}</span>
                </div>
                <p className="text-xs text-amber-700 mt-1">
                  This theme will be applied to all starter activities. Each activity will adapt its content and examples to explore this theme through different approaches and perspectives.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={clearFilters}
                className="px-3 py-1.5 text-sm text-amber-700 border border-amber-300 rounded-lg hover:bg-amber-100 transition-colors"
              >
                Change
              </button>
              <button 
                onClick={() => selectedTheme && setCurrentTheme(selectedTheme)}
                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                  selectedTheme && selectedTheme !== currentTheme
                    ? 'bg-amber-600 text-white hover:bg-amber-700'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                }`}
                disabled={!selectedTheme || selectedTheme === currentTheme}
              >
                Set Theme
              </button>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC83D]"
            />
          </div>
          <div className="flex items-center gap-3">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC83D]"
            >
              <option value="">All Subjects</option>
              {SUBJECTS.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
            <select
              value={selectedYearGroup}
              onChange={(e) => setSelectedYearGroup(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC83D]"
            >
              <option value="">All Year Groups</option>
              {YEAR_GROUPS.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC83D]"
            >
              <option value="">All Themes</option>
              {THEMES.map(theme => (
                <option key={theme} value={theme}>{theme}</option>
              ))}
            </select>
            <select
              value={selectedActivityType}
              onChange={(e) => setSelectedActivityType(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFC83D]"
            >
              <option value="">All Phases</option>
              <option value="starter">Starter</option>
              <option value="main">Main</option>
              <option value="plenary">Plenary</option>
            </select>
            <button
              onClick={clearFilters}
              className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Unit Activities Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Unit Activities</h2>
          
          <div 
            onClick={() => setShowDystopianUnitViewer(true)}
            className="bg-white rounded-lg border border-gray-200 p-6 mb-6 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Dystopian Settings: Descriptive Writing Mastery</h3>
                <p className="text-gray-600 leading-relaxed">
                  Complete 16-lesson unit exploring dystopian worlds through immersive descriptive writing, developing sophisticated techniques to create unsettling atmospheres and compelling futuristic settings that reflect social commentary
                </p>
              </div>
              <div className="flex items-center gap-3 ml-6">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite('dystopian-writing-unit');
                  }}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  title={favorites.includes('dystopian-writing-unit') ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart className={`w-5 h-5 ${favorites.includes('dystopian-writing-unit') ? 'fill-current text-red-500' : ''}`} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDystopianUnitViewer(true);
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  title="View unit details"
                >
                  <Eye className="w-5 h-5" />
                </button>
                <div className="text-xs text-gray-500 mt-1">
                  Interactive lessons 1-5 available
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activities Section */}
        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-[#FFC83D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading activities...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Activities</h2>
              
              <div className="space-y-3 mb-8">
                {uniqueActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer"
                    onClick={() => setViewingActivity(activity)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 bg-gray-900 text-white rounded-lg flex items-center justify-center font-bold text-lg">
                          {activity.activity_type === 'starter' ? 'S' : 
                           activity.activity_type === 'main' ? 'M' : 'P'}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 text-lg mb-1">{activity.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                              {activity.subject}
                            </span>
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                              {activity.year_group}
                            </span>
                            {activity.activity_type && (
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                activity.activity_type === 'starter' ? 'bg-blue-100 text-blue-700' : 
                                activity.activity_type === 'main' ? 'bg-amber-100 text-amber-700' : 
                                'bg-green-100 text-green-700'
                              }`}>
                                {activity.activity_type.charAt(0).toUpperCase() + activity.activity_type.slice(1)}
                              </span>
                            )}
                            {activity.phase && (
                              <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                                {activity.phase}
                              </span>
                            )}
                            {activity.unit_context?.title && (
                              <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-full text-xs font-medium">
                                {activity.unit_context.title}
                              </span>
                            )}
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>{activity.duration}</span>
                            </div>
                            {activity.dialogic_structure && (
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                activity.dialogic_structure === 'Discussion' ? 'bg-blue-100 text-blue-700' :
                                activity.dialogic_structure === 'Think-Pair-Share' ? 'bg-cyan-100 text-cyan-700' :
                                activity.dialogic_structure === 'Collaborative Problem Solving' ? 'bg-indigo-100 text-indigo-700' :
                                activity.dialogic_structure === 'Role Play' ? 'bg-green-100 text-green-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {activity.dialogic_structure}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(activity.id);
                          }}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                          title={favorites.includes(activity.id) ? "Remove from favorites" : "Add to favorites"}
                        >
                          <Heart className={`w-5 h-5 ${favorites.includes(activity.id) ? 'fill-current text-red-500' : ''}`} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                           handleOpenInteractiveLesson(activity);
                          }}
                          className="px-4 py-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B434] transition-colors font-medium"
                          title="View details"
                        >
                          <span>View Lesson</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {uniqueActivities.length === 0 && !loading && (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No activities found matching your filters.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modals */}
        {showUploadModal && (
          <LessonUploadModal
            onClose={() => setShowUploadModal(false)}
            onSuccess={fetchActivities}
          />
        )}

        {showDystopianUnitViewer && (
          <DystopianUnitViewer
            onClose={() => setShowDystopianUnitViewer(false)}
          />
        )}

        {viewingActivity && (
          <ActivityDetailsModal
            activity={viewingActivity}
            onClose={() => setViewingActivity(null)}
            readOnly={true}
          />
        )}

        {showStudentActivity && (
          <StudentActivityModal
            activity={showStudentActivity}
            onClose={() => setShowStudentActivity(null)}
          />
        )}

        {/* Interactive Lesson Modal */}
        {showInteractiveLesson && (
          <InteractiveLessonModal
            lesson={showInteractiveLesson}
            onClose={() => setShowInteractiveLesson(null)}
          />
        )}
      </div>
    </div>
  );
}