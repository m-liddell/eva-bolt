import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { default as KnowledgeRetrievalGameTemplate } from '../../components/templates/KnowledgeRetrievalGameTemplate';
import { StudentActivityModal } from '../../components/StudentActivityModal';

export default function WordAssociationSpeedGamePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showStudentActivity, setShowStudentActivity] = useState(false);

  // Extract lesson data from location state if available
  const lessonData = location.state?.lesson || {
    yearGroup: 'Year 10',
    class: 'A',
    subject: 'English',
    theme: 'General Discussion'
  };

  // Get the actual theme from the lesson data, prioritizing what was passed from the library
  const currentTheme = lessonData.theme === 'General Discussion' ? 'General Discussion' : lessonData.theme;

  // Get theme-adaptable game content
  const getGameContent = () => {
    const theme = currentTheme;
    
    if (theme === 'Dystopian Fiction') {
      return {
        items: [
          'surveillance', 'control', 'freedom', 'resistance', 'oppression', 'technology',
          'rebellion', 'conformity', 'propaganda', 'truth', 'power', 'fear',
          'society', 'individual', 'system', 'escape', 'hope', 'despair'
        ],
        categories: ['Control Mechanisms', 'Human Responses']
      };
    } else if (theme === 'Creative Writing') {
      return {
        items: [
          'imagination', 'inspiration', 'character', 'plot', 'setting', 'dialogue',
          'conflict', 'resolution', 'theme', 'voice', 'style', 'emotion',
          'experience', 'memory', 'observation', 'creativity', 'expression', 'audience'
        ],
        categories: ['Story Elements', 'Writing Process']
      };
    } else if (theme === 'War Poetry') {
      return {
        items: [
          'courage', 'sacrifice', 'honor', 'loss', 'memory', 'trauma',
          'heroism', 'suffering', 'duty', 'brotherhood', 'home', 'peace',
          'conflict', 'violence', 'survival', 'remembrance', 'grief', 'hope'
        ],
        categories: ['Heroic Themes', 'Human Cost']
      };
    } else if (theme === 'Shakespeare') {
      return {
        items: [
          'ambition', 'love', 'betrayal', 'power', 'fate', 'choice',
          'honor', 'revenge', 'jealousy', 'loyalty', 'deception', 'truth',
          'nobility', 'corruption', 'redemption', 'tragedy', 'comedy', 'history'
        ],
        categories: ['Character Motivations', 'Dramatic Themes']
      };
    } else if (theme === 'Energy Transfer' || theme === 'Forces and Motion') {
      return {
        items: [
          'kinetic', 'potential', 'conservation', 'transfer', 'efficiency', 'friction',
          'momentum', 'acceleration', 'force', 'motion', 'gravity', 'velocity',
          'work', 'power', 'heat', 'sound', 'light', 'electrical'
        ],
        categories: ['Energy Types', 'Energy Effects']
      };
    } else if (theme === 'Industrial Revolution') {
      return {
        items: [
          'machinery', 'factories', 'steam', 'coal', 'workers', 'owners',
          'progress', 'pollution', 'urbanization', 'innovation', 'exploitation', 'prosperity',
          'conditions', 'reform', 'unions', 'technology', 'society', 'economy'
        ],
        categories: ['Technological Progress', 'Social Impact']
      };
    } else if (theme === 'Science') {
      return {
        items: [
          'hypothesis', 'experiment', 'observation', 'data', 'analysis', 'conclusion',
          'theory', 'evidence', 'method', 'variable', 'control', 'measurement',
          'accuracy', 'precision', 'reliability', 'validity', 'peer review', 'ethics'
        ],
        categories: ['Scientific Method', 'Research Quality']
      };
    } else if (theme === 'History') {
      return {
        items: [
          'evidence', 'source', 'perspective', 'bias', 'interpretation', 'context',
          'chronology', 'causation', 'consequence', 'continuity', 'change', 'significance',
          'primary', 'secondary', 'reliability', 'validity', 'narrative', 'analysis'
        ],
        categories: ['Historical Evidence', 'Historical Thinking']
      };
    } else if (theme === 'Mathematics') {
      return {
        items: [
          'pattern', 'relationship', 'equation', 'solution', 'proof', 'logic',
          'reasoning', 'calculation', 'estimation', 'accuracy', 'precision', 'model',
          'variable', 'constant', 'function', 'graph', 'data', 'probability'
        ],
        categories: ['Mathematical Concepts', 'Mathematical Processes']
      };
    } else {
      return {
        items: [
          'knowledge', 'understanding', 'analysis', 'evaluation', 'synthesis', 'application',
          'critical thinking', 'creativity', 'collaboration', 'communication', 'reflection', 'connection',
          'perspective', 'evidence', 'reasoning', 'interpretation', 'insight', 'discovery'
        ],
        categories: ['Learning Skills', 'Thinking Processes']
      };
    }
  };

  const gameContent = getGameContent();

  const templateLessonData = {
    title: "Word Association Speed Game",
    learning_objective: "Students rapidly build word association chains to explore vocabulary connections and activate prior knowledge related to the lesson theme",
    activity_type: "Word Association Game",
    game_type: 'speed_sorting' as const,
    game_content: gameContent,
    timer_duration: 600, // 10 minutes
    theme: lessonData.theme
  };

  const navigationData = {
    previousRoute: '/',
    nextRoute: '/admin/lesson-library'
  };

  return (
    <>
      <KnowledgeRetrievalGameTemplate
        lessonData={templateLessonData}
        navigationData={navigationData}
      />
      {showStudentActivity && (
        <StudentActivityModal
          activity={{
            id: 'word-association-speed-game-student',
            lessonNumber: 1,
            title: 'Word Association Speed Game',
            description: 'Rapidly build word association chains to explore vocabulary connections',
            phase: 'starter',
            duration: '10 mins',
            type: 'interactive',
            subject: lessonData.subject,
            year_group: lessonData.yearGroup,
            learning_objective: 'Students rapidly build word association chains to explore vocabulary connections and activate prior knowledge related to the lesson theme',
            instructions: [
              'Work in small teams of 3-4 students',
              'Sort theme-related words into logical categories',
              'Build word association chains quickly',
              'Explain connections between words',
              'Compete for speed and accuracy'
            ],
            tasks: [
              {
                id: 'word-sorting',
                title: 'Word Sorting Challenge',
                description: 'Sort the theme-related words into the correct categories as quickly as possible',
                type: 'multiple_choice',
                guidance: 'Think about logical connections and category relationships',
                options: gameContent.categories
              },
              {
                id: 'association-chain',
                title: 'Association Chain Building',
                description: 'Create a word association chain starting from the theme word',
                type: 'text_input',
                guidance: 'Each word should logically connect to the previous one'
              },
              {
                id: 'connection-explanation',
                title: 'Connection Explanation',
                description: 'Explain the connections in your word association chain',
                type: 'text_input',
                guidance: 'Describe how each word relates to the next'
              }
            ],
            success_criteria: [
              'Generate creative and relevant word associations',
              'Build logical connections between words in chains',
              'Collaborate effectively in team activities',
              'Connect word associations to lesson themes and objectives'
            ],
            differentiation: {
              support: [
                'Provide visual word cards for students who need support',
                'Allow students to draw connections instead of just writing',
                'Offer theme-specific word banks for less confident students'
              ],
              extension: [
                'Challenge advanced students to explain deeper connections',
                'Ask students to create multiple branching association paths',
                'Encourage exploration of etymology and word origins'
              ]
            },
            assessment_rubric: [
              {
                level: 'Secure',
                descriptors: [
                  'Creative and logical word associations',
                  'Clear explanations of word connections',
                  'Effective collaboration and rapid thinking'
                ]
              },
              {
                level: 'Developing',
                descriptors: [
                  'Some logical word associations',
                  'Basic explanations of connections',
                  'Participates in collaborative activities'
                ]
              }
            ],
            pdf_content: {
              header: 'Word Association Speed Game',
              instructions: [
                'Work in small teams of 3-4 students',
                'Sort theme-related words into logical categories',
                'Build word association chains quickly',
                'Explain connections between words',
                'Compete for speed and accuracy'
              ],
              worksheet_sections: [
                {
                  title: 'Word Sorting Challenge',
                  content: 'Sort the theme-related words into the correct categories as quickly as possible. Think about logical connections and category relationships.',
                  space_for_answers: true
                },
                {
                  title: 'Association Chain Building',
                  content: 'Create a word association chain starting from the theme word. Each word should logically connect to the previous one.',
                  space_for_answers: true
                },
                {
                  title: 'Connection Explanation',
                  content: 'Explain the connections in your word association chain. Describe how each word relates to the next.',
                  space_for_answers: true
                }
              ],
              footer: 'Words connect to create meaning!'
            }
          }}
          onClose={() => setShowStudentActivity(false)}
        />
      )}
    </>
  );
}