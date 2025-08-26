import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { LessonTeachingInterface } from '../components/LessonTeachingInterface';
import { allEnhancedActivities } from '../data/enhancedLessonActivities';

export default function TeachLesson() {
  const navigate = useNavigate();
  const location = useLocation();
  const [lesson, setLesson] = useState<any>(null);

  // Function to get direct route to interactive lesson
  const getInteractiveLessonRoute = (lesson: any, phase: 'starter' | 'main' | 'plenary' = 'starter') => {
    if (lesson.theme === 'Dystopian Fiction' && lesson.activities?.[phase]) {
      const activityTitle = lesson.activities[phase].title.toLowerCase();
      
      // Map activity titles to lesson numbers and routes
      if (activityTitle.includes('dystopian world discovery') || activityTitle.includes('future vision')) {
        return `/lesson/dystopian-lesson-1/${phase}`;
      } else if (activityTitle.includes('complete sentence') || activityTitle.includes('sentence foundation')) {
        return `/lesson/dystopian-lesson-2/${phase}`;
      } else if (activityTitle.includes('simple vs compound') || activityTitle.includes('sentence power')) {
        return `/lesson/dystopian-lesson-3/${phase}`;
      } else if (activityTitle.includes('complex sentence') || activityTitle.includes('sophistication')) {
        return `/lesson/dystopian-lesson-4/${phase}`;
      } else if (activityTitle.includes('personification') || activityTitle.includes('atmosphere')) {
        return `/lesson/dystopian-lesson-5/${phase}`;
      } else if (activityTitle.includes('simile') || activityTitle.includes('impact analysis')) {
        return `/lesson/dystopian-lesson-6/${phase}`;
      }
    }
    
    // Also check by week number for dystopian lessons
    if (lesson.theme === 'Dystopian Fiction' && lesson.week >= 1 && lesson.week <= 6) {
      return `/lesson/dystopian-lesson-${lesson.week}/${phase}`;
    }
    
    // Check for general interactive activities
    return getGeneralInteractiveRoute(lesson, phase);
  };

  // Function to get routes for general interactive activities
  const getGeneralInteractiveRoute = (lesson: any, phase: 'starter' | 'main' | 'plenary') => {
    if (!lesson.activities?.[phase]) return null;
    
    const activityTitle = lesson.activities[phase].title.toLowerCase();
    
    if (activityTitle.includes('think-pair-share with a twist') || activityTitle.includes('think-pair-share')) {
      return '/lesson/think-pair-share-twist';
    }
    
    if (activityTitle.includes('word association')) {
      return '/lesson/word-association-speed-game';
    }
    
    if (activityTitle.includes('two minute perspective') || activityTitle.includes('perspective challenge')) {
      return '/lesson/two-minute-perspective-challenge';
    }
    
    if (activityTitle.includes('press conference')) {
      return '/lesson/press-conference-simulation';
    }
    
    if (activityTitle.includes('socratic circle')) {
      return '/lesson/socratic-circle-reflection';
    }
    
    if (activityTitle.includes('character conversations')) {
      return '/lesson/character-conversations';
    }
    
    if (activityTitle.includes('alternative endings')) {
      return '/lesson/alternative-endings';
    }
    
    if (activityTitle.includes('compare contrast') || activityTitle.includes('compare and contrast')) {
      return '/lesson/compare-contrast';
    }
    
    return null;
  };

  useEffect(() => {
    const lessonData = location.state?.lesson;
    if (!lessonData) {
      // If no lesson data, redirect back to home
      navigate('/');
      return;
    }
    
    // Check if this lesson has interactive components and redirect immediately
    const startingPhase = lessonData.startingPhase || 'starter';
    
    // For dystopian lessons, always redirect to interactive version
    if (lessonData.theme === 'Dystopian Fiction') {
      let interactiveRoute = null;
      
      // Try to get route by activity title first
      if (lessonData.activities?.[startingPhase]) {
        interactiveRoute = getInteractiveLessonRoute(lessonData, startingPhase);
      }
      
      // If no route found by activity title, use week number
      if (!interactiveRoute && lessonData.week >= 1 && lessonData.week <= 6) {
        interactiveRoute = `/lesson/dystopian-lesson-${lessonData.week}/${startingPhase}`;
      }
      
      if (interactiveRoute) {
        navigate(interactiveRoute, { 
          state: { lesson: lessonData },
          replace: true 
        });
        return;
      }
    }
    
    // For other themes, check for general interactive routes
    const interactiveRoute = getInteractiveLessonRoute(lessonData, startingPhase);
    if (interactiveRoute) {
      navigate(interactiveRoute, { 
        state: { lesson: lessonData },
        replace: true 
      });
      return;
    }
    
    // Enhance lesson with library content if available
    const enhancedLesson = enhanceLessonWithLibraryContent(lessonData);
    setLesson(enhancedLesson);
  }, [location.state, navigate]);

  // Function to enhance lesson with library content
  const enhanceLessonWithLibraryContent = (lessonData: any) => {
    // If this is a dystopian fiction lesson, try to enhance with library content
    if (lessonData.theme === 'Dystopian Fiction' && lessonData.activities) {
      const enhancedActivities = { ...lessonData.activities };
      
      // Enhance each activity type with library content
      ['starter', 'main', 'plenary'].forEach(activityType => {
        const activity = enhancedActivities[activityType];
        if (activity) {
          // Find matching enhanced activity from library
          const enhancedActivity = allEnhancedActivities.find(libActivity => 
            libActivity.activity_type === activityType &&
            libActivity.subject === lessonData.subject &&
            libActivity.year_group === lessonData.yearGroup &&
            (libActivity.title === activity.title || 
             libActivity.description.includes(activity.title) ||
             activity.title.includes(libActivity.title) ||
             libActivity.title.toLowerCase().includes('dystopian'))
          );
          
          if (enhancedActivity) {
            enhancedActivities[activityType] = {
              ...activity,
              ...enhancedActivity,
              // Preserve original activity properties
              id: activity.id || enhancedActivity.id
            };
          }
        }
      });
      
      return {
        ...lessonData,
        activities: enhancedActivities
      };
    }
    
    return lessonData;
  };

  const handleClose = () => {
    navigate('/');
  };

  if (!lesson) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Preparing Interactive Lesson...</h2>
          <p className="text-gray-600">Loading the full interactive experience for your lesson.</p>
          <div className="mt-4 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-[#FFC83D] border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading lesson...</h2>
          <p className="text-gray-600">Please wait while we prepare your lesson.</p>
        </div>
      </div>
    );
  }

  // Check if lesson is fully planned
  const isFullyPlanned = lesson.activities?.starter && 
                         lesson.activities?.main && 
                         lesson.activities?.plenary;

  if (!isFullyPlanned) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ExternalLink className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Interactive Lesson Available</h2>
          <p className="text-gray-600 mb-6">
            This lesson has interactive components available. Would you like to use the full interactive experience or the basic teaching interface?
          </p>
          <div className="space-y-3">
            <button
              onClick={() => {
                const route = getInteractiveLessonRoute(lesson, 'starter');
                if (route) navigate(route, { state: { lesson } });
              }}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Launch Interactive Lesson
            </button>
            <button
              onClick={() => setLesson(lesson)} // Continue with basic interface
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Use Basic Teaching Interface
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isFullyPlanned) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-6">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ArrowLeft className="w-8 h-8 text-amber-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Lesson Not Ready</h2>
          <p className="text-gray-600 mb-6">
            This lesson needs to be fully planned before it can be taught. Please add starter, main, and plenary activities.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/resources', { state: { lesson } })}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Plan This Lesson
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <LessonTeachingInterface lesson={lesson} onClose={handleClose} />;
}