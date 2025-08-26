import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Brain, Clock, Users, Target, BookOpen, CheckCircle2 } from 'lucide-react';
import { default as CreativeApplicationTemplate } from '../../components/templates/CreativeApplicationTemplate';
import { StudentActivityModal } from '../../components/StudentActivityModal';
import { getStudentActivityByLessonAndPhase } from '../../data/studentActivities';

export default function DystopianLesson1Main() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showStudentActivity, setShowStudentActivity] = useState(false);

  // Extract lesson data from location state if available
  const lessonData = location.state?.lesson || {
    yearGroup: 'Year 10',
    class: 'A',
    subject: 'English',
    theme: 'Dystopian Fiction'
  };

  const templateLessonData = {
    title: "Dystopian Features Exploration Workshop",
    learning_objective: "I can analyze dystopian setting characteristics through multimedia and create identification guides",
    activity_type: "Dystopian Features Workshop",
    creation_type: 'design_challenge' as const,
    creation_brief: "Watch dystopian film clips and analyze text extracts to create visual guides identifying genre features. Focus on understanding how visual and textual elements work together to create oppressive atmospheres and serve as social commentary.",
    support_materials: [
      "Dystopian_multimedia_examples_and_film_clips",
      "Feature_identification_frameworks_and_analysis_guides",
      "Visual_analysis_templates_and_comparison_charts",
      "Atmospheric_creation_technique_references",
      "Social_commentary_analysis_resources",
      "Creative_design_templates_and_layout_guides"
    ],
    success_criteria: [
      "Create_visual_guides_identifying_dystopian_genre_features",
      "Analyze_how_multimedia_elements_work_together_to_create_atmosphere",
      "Understand_the_relationship_between_dystopian_features_and_social_commentary",
      "Demonstrate_ability_to_recognize_and_categorize_genre_conventions",
      "Apply_analytical_skills_to_both_visual_and_textual_dystopian_elements"
    ],
    theme: "Dystopian Fiction"
  };

  const navigationData = {
    previousRoute: '/lesson/dystopian-lesson-1/starter',
    nextRoute: '/lesson/dystopian-lesson-1/plenary'
  };

  const studentActivity = getStudentActivityByLessonAndPhase('dystopian-lesson-1', 'main');

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(30, 41, 59, 0.95) 0%,
            rgba(30, 41, 59, 0.85) 15%,
            rgba(30, 41, 59, 0.85) 85%,
            rgba(30, 41, 59, 0.95) 100%
          ),
          url('https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&q=80')
        `,
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <CreativeApplicationTemplate
          lessonData={templateLessonData}
          navigationData={navigationData}
        />
      </div>

      {showStudentActivity && studentActivity && (
        <StudentActivityModal
          activity={studentActivity}
          onClose={() => setShowStudentActivity(false)}
        />
      )}
    </div>
  );
}