import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { default as CreativeApplicationTemplate } from '../../components/templates/CreativeApplicationTemplate';

export default function AlternativeEndingsPage() {
  const navigate = useNavigate();

  const templateLessonData = {
    title: "Alternative Endings Workshop",
    learning_objective: "Develop creative writing skills by reimagining narratives through alternative endings and exploring different narrative possibilities",
    creation_type: 'creative_challenge' as const,
    creation_brief: "Reimagine story endings by exploring different narrative possibilities. Choose from rebellion, assimilation, or escape endings and develop them with character authenticity, thematic coherence, and narrative logic.",
    support_materials: [
      "Original story endings for comparison and analysis",
      "Character development frameworks and motivation guides",
      "Thematic analysis templates and coherence checklists",
      "Narrative logic guides and plot development tools",
      "Creative writing prompts and scenario exploration cards",
      "Peer feedback forms and revision guidance"
    ],
    success_criteria: [
      "Create alternative endings that maintain character authenticity",
      "Demonstrate thematic coherence throughout the new narrative",
      "Apply narrative logic to ensure believable story progression",
      "Show creative innovation while respecting the original work's foundation",
      "Develop endings that offer meaningful commentary on the themes explored"
    ],
    theme: "creative writing"
  };

  const navigationData = {
    previousRoute: '/',
    nextRoute: '/admin/lesson-library'
  };

  return (
    <CreativeApplicationTemplate
      lessonData={templateLessonData}
      navigationData={navigationData}
    />
  );
}