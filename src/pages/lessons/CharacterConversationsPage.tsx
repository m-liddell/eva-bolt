import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { default as CreativeApplicationTemplate } from '../../components/templates/CreativeApplicationTemplate';

export default function CharacterConversationsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Extract lesson data from location state if available
  const lessonData = {
    yearGroup: 'Year 10',
    class: 'A',
    subject: 'English',
    theme: 'Character Development'
  };

  const templateLessonData = {
    title: "Character Conversations Workshop",
    learning_objective: "Create authentic dialogue between characters with opposing viewpoints to explore motivations, values, and dramatic tension",
    creation_type: 'creative_challenge' as const,
    creation_brief: "Write dialogue between two characters with opposing viewpoints. Focus on revealing their motivations, values, and creating dramatic tension through authentic conversation.",
    support_materials: [
      "Character motivation frameworks and development guides",
      "Dialogue writing techniques and authenticity checklists",
      "Conflict creation templates and tension building tools",
      "Voice differentiation guides and character speech patterns",
      "Dramatic tension techniques and pacing strategies",
      "Peer feedback forms for dialogue effectiveness"
    ],
    success_criteria: [
      "Create distinct character voices that feel authentic and believable",
      "Reveal character motivations and values through natural dialogue",
      "Build dramatic tension through conflict and opposing viewpoints",
      "Maintain character consistency throughout the conversation",
      "Use dialogue to advance plot and develop character relationships"
    ],
    theme: "character development"
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