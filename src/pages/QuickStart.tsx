import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, BookOpen, Clock, Users, Brain, CheckCircle2, Eye, Play, 
  Target, ChevronLeft, Filter, X 
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { allEnhancedActivities } from '../data/enhancedLessonActivities';
import { ActivityDetailsModal } from '../components/ActivityDetailsModal';

// Types and Interfaces
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
  keywords?: string[];
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

interface SelectedActivities {
  starter?: LessonActivity;
  main?: LessonActivity;
  plenary?: LessonActivity;
}

interface FilterState {
  subject: string;
  yearGroup: string;
  class: string;
  theme: string;
  search: string;
}

interface LessonData {
  id: string;
  subject: string;
  yearGroup: string;
  class: string;
  theme?: string;
  day: string;
  startTime: string;
  activities: SelectedActivities;
}

type ActivityType = 'starter' | 'main' | 'plenary';
type DialogicStructure = 'Discussion' | 'Simulation' | 'Debate' | 'Role Play' | 'Think-Pair-Share' | 'Collaborative Problem Solving';

// Constants
const SUBJECTS = [
  'English', 'Mathematics', 'Science', 'History', 'Geography',
  'Modern Languages', 'Art', 'Music', 'Physical Education', 'Computing'
] as const;

const YEAR_GROUPS = ['Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11'] as const;
const CLASS_GROUPS = ['A', 'B', 'C', 'D'] as const;

const THEMES = [
  'Dystopian Fiction', 'Creative Writing', 'War Poetry', 'Shakespeare',
  'Modern Literature', 'Travel Writing', 'Myths and Legends', 'Victorian Literature',
  'Energy Transfer', 'Forces and Motion', 'Chemical Reactions',
  'Industrial Revolution', 'World War I', 'World War II'
] as const;

const ACTIVITY_TYPES = ['starter', 'main', 'plenary'] as const;

const INITIAL_FILTER_STATE: FilterState = {
  subject: '',
  yearGroup: '',
  class: '',
  theme: '',
  search: ''
};

// Activity routing configuration
const ACTIVITY_ROUTES = {
  'dystopian world discovery': '/lesson/dystopian-lesson-1/starter',
  'future vision': '/lesson/dystopian-lesson-1/starter',
  'complete sentence': '/lesson/dystopian-lesson-2/starter',
  'sentence foundation': '/lesson/dystopian-lesson-2/starter',
  'simple vs compound': '/lesson/dystopian-lesson-3/starter',
  'sentence power': '/lesson/dystopian-lesson-3/starter',
  'complex sentence': '/lesson/dystopian-lesson-4/starter',
  'sophistication': '/lesson/dystopian-lesson-4/starter',
  'personification': '/lesson/dystopian-lesson-5/starter',
  'atmosphere': '/lesson/dystopian-lesson-5/starter',
  'simile': '/lesson/dystopian-lesson-6/starter',
  'impact analysis': '/lesson/dystopian-lesson-6/starter',
  'character conversations': '/lesson/character-conversations',
  'alternative endings': '/lesson/alternative-endings',
  'word associations': '/lesson/word-associations',
  'compare contrast': '/lesson/compare-contrast'
} as const;

// Helper Functions
const generateLessonId = (): string => Math.random().toString(36).substr(2, 9);

const getDialogicStructureStyle = (structure: DialogicStructure): string => {
  const styles = {
    'Discussion': 'bg-blue-100 text-blue-700',
    'Simulation': 'bg-purple-100 text-purple-700',
    'Debate': 'bg-orange-100 text-orange-700',
    'Role Play': 'bg-green-100 text-green-700',
    'Think-Pair-Share': 'bg-cyan-100 text-cyan-700',
    'Collaborative Problem Solving': 'bg-indigo-100 text-indigo-700'
  };
  return styles[structure] || 'bg-gray-100 text-gray-700';
};

const getActivityIcon = (type: ActivityType): JSX.Element => {
  const icons = {
    starter: <Brain className="w-5 h-5 text-blue-600" />,
    main: <BookOpen className="w-5 h-5 text-amber-600" />,
    plenary: <CheckCircle2 className="w-5 h-5 text-green-600" />
  };
  return icons[type];
};

const getActivityColor = (type: ActivityType): string => {
  const colors = {
    starter: 'border-blue-200 bg-blue-50',
    main: 'border-amber-200 bg-amber-50',
    plenary: 'border-green-200 bg-green-50'
  };
  return colors[type];
};

const getActivityBackgroundColor = (type: ActivityType): string => {
  const colors = {
    starter: 'bg-blue-100',
    main: 'bg-amber-100',
    plenary: 'bg-green-100'
  };
  return colors[type];
};

// Theme matching logic
const matchesTheme = (activity: LessonActivity, themeQuery: string): boolean => {
  const query = themeQuery.toLowerCase();
  
  // Direct theme matches
  if (activity.unit_context?.title.toLowerCase().includes(query)) return true;
  if (activity.phase?.toLowerCase().includes(query)) return true;
  if (activity.keywords?.some(keyword => keyword.toLowerCase().includes(query))) return true;
  if (activity.title.toLowerCase().includes(query)) return true;
  if (activity.description.toLowerCase().includes(query)) return true;
  
  // Specific theme mappings
  const themeMap = {
    'dystopian fiction': ['dystopian'],
    'dystopian': ['dystopian'],
    'creative writing': ['writing'],
    'energy transfer': ['energy'],
    'energy': ['energy'],
    'industrial revolution': ['industrial']
  };
  
  const keywords = themeMap[query as keyof typeof themeMap];
  if (keywords) {
    return keywords.some(keyword => 
      activity.title.toLowerCase().includes(keyword) ||
      activity.description.toLowerCase().includes(keyword) ||
      activity.keywords?.includes(keyword) ||
      activity.phase?.toLowerCase().includes(keyword)
    );
  }
  
  return false;
};

// Main Component
export default function QuickStart() {
  const navigate = useNavigate();
  
  // State
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER_STATE);
  const [activities, setActivities] = useState<LessonActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewingActivity, setViewingActivity] = useState<LessonActivity | null>(null);
  const [selectedActivities, setSelectedActivities] = useState<SelectedActivities>({});

  // Effects
  useEffect(() => {
    fetchActivities();
  }, []);

  // Data fetching
  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let allActivities = [...allEnhancedActivities];

      try {
        const { data, error: fetchError } = await supabase
          .from('lesson_activities')
          .select(`
            *,
            activity_details (
              id,
              activity_id,
              preparation,
              steps,
              tips,
              differentiation,
              assessment,
              answers
            )
          `)
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;

        const transformedData: LessonActivity[] = (data || []).map(activity => ({
          ...activity,
          details: Array.isArray(activity.activity_details) 
            ? activity.activity_details[0] 
            : activity.activity_details
        }));

        allActivities = [...allEnhancedActivities, ...transformedData];
      } catch (dbError) {
        console.warn('Database unavailable, using enhanced activities only:', dbError);
      }

      setActivities(allActivities);
    } catch (err) {
      console.error('Error fetching activities:', err);
      setError(err instanceof Error ? err.message : 'Failed to load activities');
    } finally {
      setLoading(false);
    }
  }, []);

  // Computed values
  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      const matchesSearch = 
        activity.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        activity.description.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesSubject = !filters.subject || activity.subject === filters.subject;
      const matchesYearGroup = !filters.yearGroup || activity.year_group === filters.yearGroup;
      const matchesThemeFilter = !filters.theme || matchesTheme(activity, filters.theme);

      return matchesSearch && matchesSubject && matchesYearGroup && matchesThemeFilter;
    });
  }, [activities, filters]);

  const activitiesByType = useMemo(() => {
    return {
      starter: filteredActivities.filter(a => a.activity_type === 'starter'),
      main: filteredActivities.filter(a => a.activity_type === 'main'),
      plenary: filteredActivities.filter(a => a.activity_type === 'plenary')
    };
  }, [filteredActivities]);

  const hasRequiredSelections = useMemo(() => 
    filters.subject && filters.yearGroup && filters.class, 
    [filters.subject, filters.yearGroup, filters.class]
  );

  const hasCompleteLesson = useMemo(() => 
    selectedActivities.starter && selectedActivities.main && selectedActivities.plenary,
    [selectedActivities]
  );

  const hasActiveFilters = useMemo(() => 
    filters.subject || filters.yearGroup || filters.theme || filters.search,
    [filters]
  );

  // Event handlers
  const updateFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(INITIAL_FILTER_STATE);
  }, []);

  const handleActivitySelect = useCallback((activity: LessonActivity) => {
    setSelectedActivities(prev => ({
      ...prev,
      [activity.activity_type]: activity
    }));
  }, []);

  const getActivityRoute = useCallback((activity: LessonActivity): string | null => {
    const title = activity.title.toLowerCase();
    
    for (const [keyword, route] of Object.entries(ACTIVITY_ROUTES)) {
      if (title.includes(keyword)) {
        return route;
      }
    }
    
    return null;
  }, []);

  const createLessonState = useCallback((activity: LessonActivity) => ({
    lesson: {
      yearGroup: filters.yearGroup || activity.year_group,
      class: filters.class || 'A',
      subject: filters.subject || activity.subject,
      theme: filters.theme || activity.unit_context?.title || 'Literature',
      title: activity.title,
      learningObjective: activity.description
    }
  }), [filters]);

  const handleActivityView = useCallback((activity: LessonActivity) => {
    const route = getActivityRoute(activity);
    
    if (route) {
      navigate(route, { state: createLessonState(activity) });
    } else {
      setViewingActivity(activity);
    }
  }, [navigate, getActivityRoute, createLessonState]);

  const handleStartLesson = useCallback(() => {
    if (!hasCompleteLesson) {
      alert('Please select a starter, main, and plenary activity');
      return;
    }

    if (!hasRequiredSelections) {
      alert('Please select subject, year group, and class');
      return;
    }

    const lesson: LessonData = {
      id: generateLessonId(),
      subject: filters.subject,
      yearGroup: filters.yearGroup,
      class: filters.class,
      theme: filters.theme || undefined,
      day: 'Today',
      startTime: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      activities: selectedActivities
    };

    navigate('/teach/lesson', { state: { lesson } });
  }, [hasCompleteLesson, hasRequiredSelections, filters, selectedActivities, navigate]);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        
        {/* Header */}
        <Header onBack={() => navigate('/')} />

        {/* Filters */}
        <FilterSection
          filters={filters}
          onUpdateFilter={updateFilter}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Selection Summary */}
        {hasRequiredSelections && (
          <SelectionSummary
            filters={filters}
            selectedActivities={selectedActivities}
            hasCompleteLesson={hasCompleteLesson}
            onStartLesson={handleStartLesson}
          />
        )}

        {/* Main Content */}
        <MainContent
          loading={loading}
          error={error}
          hasRequiredSelections={hasRequiredSelections}
          filteredActivities={filteredActivities}
          activitiesByType={activitiesByType}
          selectedActivities={selectedActivities}
          onActivitySelect={handleActivitySelect}
          onActivityView={handleActivityView}
          onClearFilters={clearFilters}
        />

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

// Sub-components
interface HeaderProps {
  onBack: () => void;
}

function Header({ onBack }: HeaderProps) {
  return (
    <div className="mb-6">
      <button 
        onClick={onBack}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="text-sm">Back to Dashboard</span>
      </button>
      
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-[#FFF9E7] flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-[#FFC83D]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#768396]">Quick Start</h1>
          <p className="text-sm text-gray-600">
            Select activities from the lesson library and start teaching immediately
          </p>
        </div>
      </div>
    </div>
  );
}

interface FilterSectionProps {
  filters: FilterState;
  onUpdateFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

function FilterSection({ filters, onUpdateFilter, onClearFilters, hasActiveFilters }: FilterSectionProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-semibold text-gray-800">Filter Activities</h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            <span>Clear</span>
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-5 gap-4">
        <FilterSelect
          label="Subject"
          required
          value={filters.subject}
          onChange={(value) => onUpdateFilter('subject', value)}
          options={SUBJECTS}
          placeholder="All Subjects"
        />

        <FilterSelect
          label="Year Group"
          required
          value={filters.yearGroup}
          onChange={(value) => onUpdateFilter('yearGroup', value)}
          options={YEAR_GROUPS}
          placeholder="All Years"
        />

        <FilterSelect
          label="Class"
          required
          value={filters.class}
          onChange={(value) => onUpdateFilter('class', value)}
          options={CLASS_GROUPS}
          placeholder="Select Class"
          formatOption={(option) => `Class ${option}`}
        />

        <FilterSelect
          label="Theme"
          value={filters.theme}
          onChange={(value) => onUpdateFilter('theme', value)}
          options={THEMES}
          placeholder="All Themes"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search activities..."
              value={filters.search}
              onChange={(e) => onUpdateFilter('search', e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC83D] focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface FilterSelectProps {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
  placeholder: string;
  formatOption?: (option: string) => string;
}

function FilterSelect({ 
  label, 
  required, 
  value, 
  onChange, 
  options, 
  placeholder, 
  formatOption = (option) => option 
}: FilterSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFC83D] focus:border-transparent"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {formatOption(option)}
          </option>
        ))}
      </select>
    </div>
  );
}

interface SelectionSummaryProps {
  filters: FilterState;
  selectedActivities: SelectedActivities;
  hasCompleteLesson: boolean;
  onStartLesson: () => void;
}

function SelectionSummary({ 
  filters, 
  selectedActivities, 
  hasCompleteLesson, 
  onStartLesson 
}: SelectionSummaryProps) {
  const selectedCount = Object.keys(selectedActivities).length;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-600" />
            <span className="font-medium text-gray-800">
              {filters.subject} • {filters.yearGroup} Class {filters.class}
            </span>
            {filters.theme && (
              <>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{filters.theme}</span>
              </>
            )}
          </div>
          <div className="text-sm text-gray-600">
            {selectedCount}/3 activities selected
          </div>
        </div>
        <button
          onClick={onStartLesson}
          disabled={!hasCompleteLesson}
          className="px-6 py-2 bg-[#FFC83D] text-white rounded-lg hover:bg-[#E6B434] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
        >
          <Play className="w-4 h-4" />
          <span>Start Lesson</span>
        </button>
      </div>
    </div>
  );
}

interface MainContentProps {
  loading: boolean;
  error: string | null;
  hasRequiredSelections: boolean;
  filteredActivities: LessonActivity[];
  activitiesByType: Record<ActivityType, LessonActivity[]>;
  selectedActivities: SelectedActivities;
  onActivitySelect: (activity: LessonActivity) => void;
  onActivityView: (activity: LessonActivity) => void;
  onClearFilters: () => void;
}

function MainContent({
  loading,
  error,
  hasRequiredSelections,
  filteredActivities,
  activitiesByType,
  selectedActivities,
  onActivitySelect,
  onActivityView,
  onClearFilters
}: MainContentProps) {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-8 h-8 border-2 border-[#FFC83D] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading activities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!hasRequiredSelections) {
    return (
      <EmptySelectionState />
    );
  }

  if (filteredActivities.length === 0) {
    return (
      <NoActivitiesState onClearFilters={onClearFilters} />
    );
  }

  return (
    <div className="space-y-8">
      {ACTIVITY_TYPES.map((type) => {
        const typeActivities = activitiesByType[type];
        if (typeActivities.length === 0) return null;

        return (
          <ActivityTypeSection
            key={type}
            type={type}
            activities={typeActivities}
            selectedActivity={selectedActivities[type]}
            onActivitySelect={onActivitySelect}
            onActivityView={onActivityView}
          />
        );
      })}
    </div>
  );
}

function EmptySelectionState() {
  return (
    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
      <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-600 mb-2">Select Your Lesson Details</h3>
      <p className="text-xl font-bold text-blue-600 mb-4">Coming Soon!</p>
      <p className="text-gray-500">
        Please select a subject, year group, and class to see available activities.
      </p>
    </div>
  );
}

interface NoActivitiesStateProps {
  onClearFilters: () => void;
}

function NoActivitiesState({ onClearFilters }: NoActivitiesStateProps) {
  return (
    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
      <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 className="text-lg font-semibold text-gray-600 mb-2">No activities found</h3>
      <p className="text-gray-500 mb-4">
        No activities match your current filters. Try adjusting your selection.
      </p>
      <button
        onClick={onClearFilters}
        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );
}

interface ActivityTypeSectionProps {
  type: ActivityType;
  activities: LessonActivity[];
  selectedActivity?: LessonActivity;
  onActivitySelect: (activity: LessonActivity) => void;
  onActivityView: (activity: LessonActivity) => void;
}

function ActivityTypeSection({
  type,
  activities,
  selectedActivity,
  onActivitySelect,
  onActivityView
}: ActivityTypeSectionProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getActivityBackgroundColor(type)}`}>
          {getActivityIcon(type)}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 capitalize">{type} Activities</h3>
          <p className="text-sm text-gray-600">
            {activities.length} available • Select one to continue
          </p>
        </div>
        {selectedActivity && (
          <div className="ml-auto px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
            Selected: {selectedActivity.title}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            isSelected={selectedActivity?.id === activity.id}
            onSelect={() => onActivitySelect(activity)}
            onView={() => onActivityView(activity)}
          />
        ))}
      </div>
    </div>
  );
}

interface ActivityCardProps {
  activity: LessonActivity;
  isSelected: boolean;
  onSelect: () => void;
  onView: () => void;
}

function ActivityCard({ activity, isSelected, onSelect, onView }: ActivityCardProps) {
  return (
    <div
      className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
        isSelected 
          ? 'border-[#FFC83D] bg-[#FFF9E7] shadow-md transform scale-105'
          : 'border-gray-200 hover:border-[#FFC83D] hover:shadow-sm'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-gray-900 flex-1">{activity.title}</h4>
        <div className="flex items-center gap-2 ml-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView();
            }}
            className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="View lesson"
          >
            <Eye className="w-4 h-4" />
          </button>
          {isSelected && (
            <div className="w-6 h-6 bg-[#FFC83D] rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-4">{activity.description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>{activity.duration}</span>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDialogicStructureStyle(activity.dialogic_structure as DialogicStructure)}`}>
            {activity.dialogic_structure}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {activity.phase && (
            <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">
              {activity.phase}
            </span>
          )}
          {activity.unit_context?.title && (
            <span className="px-2 py-1 bg-cyan-100 text-cyan-700 rounded text-xs">
              {activity.unit_context.title}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}