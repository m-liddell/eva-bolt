// Dystopian unit information
export const dystopianUnitInfo = {
  title: "Dystopian Fiction: Setting Descriptions",
  yearGroup: "Year 10",
  duration: "16 lessons",
  overview: "Students explore the craft of descriptive writing through the lens of dystopian fiction, developing sophisticated sentence structures and literary techniques to create compelling atmospheric descriptions.",
  themes: [
    "Surveillance and Control",
    "Environmental Destruction", 
    "Social Inequality",
    "Loss of Individual Freedom",
    "Technology vs Humanity"
  ],
  coreTexts: [
    "1984 by George Orwell",
    "The Handmaid's Tale by Margaret Atwood",
    "Brave New World by Aldous Huxley",
    "The Giver by Lois Lowry"
  ]
};

// Complete dystopian lesson structure with allocated templates
export const dystopianLessons = [
  // Lesson 1: Foundation - Interactive Exploration
  {
    lessonNumber: 1,
    title: "Dystopian World Discovery",
    phase: "Dystopian Foundation Knowledge",
    learningObjective: "I can understand and identify features of dystopian settings and recognize how they reflect social commentary",
    weekDay: "Monday",
    template: "InteractiveExplorationTemplate",
    activities: {
      starter: {
        id: "dystopian-lesson-1-starter",
        title: "Dystopian World Quick-Fire Exploration",
        description: "Rapidly identify and explore key features of dystopian worlds through rapid-fire activities",
        duration: "10 mins",
        type: "Quick-fire Discussion",
        activity_type: "starter",
        template: "InteractiveExplorationTemplate",
        exploration_focus: "Rapid identification and analysis of dystopian world characteristics",
        interactive_elements: [
          {
            element_type: 'hands_on_activity',
            title: 'Dystopian Image Analysis Sprint',
            description: 'Rapidly analyze dystopian images to identify key visual features and atmospheric elements',
            materials: ['Dystopian image collection', 'Feature identification sheets', 'Timer for rapid analysis']
          },
          {
            element_type: 'scenario_analysis',
            title: 'World-Building Speed Challenge',
            description: 'Quick-fire creation of dystopian world elements using prompts and constraints',
            materials: ['World-building prompt cards', 'Constraint challenge sheets', 'Collaborative planning tools']
          }
        ],
        discovery_questions: [
          "What visual elements immediately signal a dystopian world?",
          "How do dystopian societies control their citizens?",
          "What role does technology play in dystopian control?",
          "How do dystopian worlds reflect real-world concerns?"
        ]
      },
      main: {
        id: "dystopian-lesson-1-main",
        title: "Dystopian Features Exploration Workshop",
        description: "Analyze dystopian setting characteristics through multimedia and create identification guides",
        duration: "40 mins",
        type: "Creative Application",
        activity_type: "main",
        template: "CreativeApplicationTemplate",
        creation_type: 'design_challenge',
        creation_brief: "Watch dystopian film clips and analyze text extracts to create visual guides identifying genre features",
        support_materials: [
          "Dystopian multimedia examples and film clips",
          "Feature identification frameworks and analysis guides",
          "Visual analysis templates and comparison charts"
        ]
      },
      plenary: {
        id: "dystopian-lesson-1-plenary",
        title: "Dystopian Feature Gallery",
        description: "Consolidate understanding of dystopian features and evaluate their psychological impact",
        duration: "10 mins",
        type: "Showcase Analysis",
        activity_type: "plenary",
        template: "ShowcaseAnalysisTemplate",
        showcase_focus: "dystopian feature identification and psychological impact analysis",
        analysis_questions: [
          "What dystopian features did you identify most clearly?",
          "How do these features create psychological impact?",
          "Which features seem most threatening and why?",
          "How do these features reflect real-world concerns?"
        ]
      }
    }
  },
  
  // Lesson 2: Technical Foundation - Quick-Fire Discussion
  {
    lessonNumber: 2,
    title: "Complete Sentences for Dystopian Description",
    phase: "Technical Writing Foundation",
    learningObjective: "I can use complete sentences to write compelling and technically accurate dystopian descriptions",
    weekDay: "Wednesday",
    template: "QuickFireDiscussionTemplate",
    activities: {
      starter: {
        id: "dystopian-lesson-2-starter",
        title: "Complete Sentence Foundation",
        description: "Practice identifying and creating complete sentences for clear dystopian descriptions",
        duration: "10 mins",
        type: "Quick-fire Discussion",
        activity_type: "starter",
        template: "QuickFireDiscussionTemplate",
        discussion_type: 'speed_challenge',
        discussion_questions: [
          "Create a simple sentence describing a dystopian setting",
          "Build a compound sentence about government control",
          "Construct a complex sentence showing character rebellion",
          "Form a sentence using dystopian vocabulary (surveillance, oppression, conformity)"
        ]
      },
      main: {
        id: "dystopian-lesson-2-main",
        title: "Dystopian Sentence Construction Workshop",
        description: "Master complete sentence components using dystopian examples and practice atmospheric writing",
        duration: "40 mins",
        type: "Collaborative Investigation",
        activity_type: "main",
        template: "CollaborativeInvestigationTemplate",
        investigation_type: 'text_analysis_workshop',
        investigation_focus: "Collaborative analysis of complete sentence construction in dystopian contexts",
        collaboration_structure: {
          group_size: 4,
          roles: [
            "Sentence Structure Analyst",
            "Atmospheric Language Expert", 
            "Grammar Accuracy Checker",
            "Dystopian Context Specialist"
          ]
        }
      },
      plenary: {
        id: "dystopian-lesson-2-plenary",
        title: "Sentence Showcase",
        description: "Evaluate and share the most atmospheric complete sentences created during the lesson",
        duration: "10 mins",
        type: "Showcase Analysis",
        activity_type: "plenary",
        template: "ShowcaseAnalysisTemplate",
        showcase_focus: "atmospheric sentence effectiveness and peer learning",
        analysis_questions: [
          "What makes your sentence particularly atmospheric?",
          "How does sentence structure enhance the dystopian mood?",
          "Which techniques create the strongest impact?",
          "How will you apply these skills in future writing?"
        ]
      }
    }
  },

  // Lesson 3: Sentence Variety - Knowledge Retrieval Game
  {
    lessonNumber: 3,
    title: "Simple and Compound Sentences for Dystopian Impact",
    phase: "Sentence Variety Development",
    learningObjective: "I can use simple and compound sentences strategically to create varied and engaging dystopian descriptions",
    weekDay: "Friday",
    template: "KnowledgeRetrievalGameTemplate",
    activities: {
      starter: {
        id: "dystopian-lesson-3-starter",
        title: "Simple vs Compound Sentence Power",
        description: "Compare simple and compound sentences to understand their different impacts in dystopian writing",
        duration: "10 mins",
        type: "Knowledge Retrieval Game",
        activity_type: "starter",
        template: "KnowledgeRetrievalGameTemplate",
        game_type: 'speed_sorting',
        game_content: {
          items: [
            "The alarm screamed.",
            "Guards appeared, and order was restored.",
            "Citizens ran.",
            "Cameras watched, but citizens ignored them.",
            "Freedom died.",
            "Propaganda echoed, and people hurried past."
          ],
          categories: ["Simple Sentences", "Compound Sentences"]
        },
        timer_duration: 480
      },
      main: {
        id: "dystopian-lesson-3-main",
        title: "Simple and Compound Sentence Mastery Workshop",
        description: "Practice creating both sentence types strategically for different dystopian atmospheric effects",
        duration: "40 mins",
        type: "Scaffolded Practice",
        activity_type: "main",
        template: "ScaffoldedPracticeTemplate",
        practice_type: 'progressive_difficulty',
        skill_focus: "Strategic use of simple and compound sentences for atmospheric effect",
        practice_stages: [
          {
            stage_name: "Foundation Practice",
            description: "Create basic simple and compound sentences with dystopian vocabulary",
            duration_minutes: 12,
            difficulty_level: 'foundation'
          },
          {
            stage_name: "Atmospheric Development",
            description: "Add descriptive elements to create mood and atmosphere",
            duration_minutes: 15,
            difficulty_level: 'developing'
          },
          {
            stage_name: "Strategic Application",
            description: "Use sentence variety strategically for specific atmospheric effects",
            duration_minutes: 13,
            difficulty_level: 'secure'
          }
        ],
        feedback_structure: {
          self_assessment: true,
          peer_feedback: true,
          teacher_guidance: true
        }
      },
      plenary: {
        id: "dystopian-lesson-3-plenary",
        title: "Sentence Variety Mastery Reflection",
        description: "Reflect on sentence variety progress and set goals for continued writing development",
        duration: "10 mins",
        type: "Consolidation Connection",
        activity_type: "plenary",
        template: "ConsolidationConnectionTemplate",
        key_insights: [
          "Simple sentences create direct impact and urgency, making them perfect for dramatic dystopian moments",
          "Compound sentences show relationships between ideas and create more complex rhythms",
          "Strategic sentence variety keeps readers engaged and allows writers to control pacing",
          "Different sentence types create different atmospheric effects"
        ],
        unit_connections: [
          "Today's sentence variety mastery provides the foundation for all future dystopian writing workshops",
          "Understanding of simple vs compound effects connects to upcoming complex sentence lessons",
          "Strategic sentence choice skills will enhance every piece of atmospheric writing in the unit"
        ],
        next_lesson_preview: "Tomorrow we'll elevate your writing sophistication by mastering complex sentences with multiple clauses"
      }
    }
  },

  // Lesson 4: Advanced Mastery - Knowledge Retrieval Game (different type)
  {
    lessonNumber: 4,
    title: "Complex Sentences for Dystopian Sophistication",
    phase: "Advanced Sentence Mastery",
    learningObjective: "I can use sophisticated complex sentences to create layered and compelling dystopian descriptions",
    weekDay: "Tuesday",
    template: "KnowledgeRetrievalGameTemplate",
    activities: {
      starter: {
        id: "dystopian-lesson-4-starter",
        title: "Complex Sentence Sophistication",
        description: "Analyze how complex sentences add depth and sophistication to dystopian descriptions",
        duration: "10 mins",
        type: "Knowledge Retrieval Game",
        activity_type: "starter",
        template: "KnowledgeRetrievalGameTemplate",
        game_type: 'challenge_matching',
        game_content: {
          matches: [
            {
              item: "Although the city appeared peaceful...",
              match: "...surveillance cameras monitored every citizen's movement."
            },
            {
              item: "While propaganda promised safety...",
              match: "...freedom slowly disappeared from daily life."
            },
            {
              item: "Because technology controlled everything...",
              match: "...human connection became nearly impossible."
            }
          ]
        },
        timer_duration: 480
      },
      main: {
        id: "dystopian-lesson-4-main",
        title: "Complex Sentence Mastery Workshop",
        description: "Create sophisticated dystopian descriptions using complex sentences with multiple subordinate clauses",
        duration: "40 mins",
        type: "Collaborative Investigation",
        activity_type: "main",
        template: "CollaborativeInvestigationTemplate",
        investigation_type: 'text_analysis_workshop',
        investigation_focus: "Analysis of complex sentence construction and sophistication techniques",
        collaboration_structure: {
          group_size: 4,
          roles: [
            "Complex Sentence Analyst",
            "Sophistication Expert", 
            "Effect Evaluator",
            "Technique Teacher"
          ]
        }
      },
      plenary: {
        id: "dystopian-lesson-4-plenary",
        title: "Sophistication Showcase",
        description: "Present most sophisticated complex sentence created and analyze how complexity enhances description",
        duration: "10 mins",
        type: "Showcase Analysis",
        activity_type: "plenary",
        template: "ShowcaseAnalysisTemplate",
        showcase_focus: "sophisticated writing techniques and complexity analysis",
        analysis_questions: [
          "What makes your complex sentence particularly sophisticated?",
          "How does complexity enhance your dystopian description?",
          "What relationships between ideas does your complex sentence show?",
          "What impact does this complexity have on the reader?"
        ]
      }
    }
  },

  // Lesson 5: Literary Devices - Interactive Exploration (different focus)
  {
    lessonNumber: 5,
    title: "Personification for Unsettling Dystopian Atmosphere",
    phase: "Literary Device Mastery",
    learningObjective: "I can use personification strategically to create unsettling and oppressive atmospheres in dystopian settings",
    weekDay: "Thursday",
    template: "InteractiveExplorationTemplate",
    activities: {
      starter: {
        id: "dystopian-lesson-5-starter",
        title: "Personification for Atmosphere",
        description: "Give human qualities to dystopian objects to create threatening atmospheres",
        duration: "10 mins",
        type: "Interactive Exploration",
        activity_type: "starter",
        template: "InteractiveExplorationTemplate",
        exploration_focus: "Hands-on exploration of personification techniques for threatening atmosphere",
        interactive_elements: [
          {
            element_type: 'hands_on_activity',
            title: 'Object Personality Assignment',
            description: 'Give threatening human personalities to surveillance cameras, buildings, and technology',
            materials: ['Dystopian object cards', 'Personality trait lists', 'Threatening quality worksheets']
          },
          {
            element_type: 'collaborative_investigation',
            title: 'Unsettling Effect Creation',
            description: 'Collaborate to create the most unsettling personification examples possible',
            materials: ['Creative brainstorming frameworks', 'Peer feedback forms', 'Effectiveness rubrics']
          }
        ],
        discovery_questions: [
          "What human qualities make surveillance cameras feel most threatening?",
          "How might government buildings 'behave' if they were alive and hostile?",
          "What emotions could sterile environments 'feel' toward humans?"
        ]
      },
      main: {
        id: "dystopian-lesson-5-main",
        title: "Personification Mastery Workshop",
        description: "Practice personifying surveillance, buildings, and oppressive elements for unsettling effects",
        duration: "40 mins",
        type: "Scaffolded Practice",
        activity_type: "main",
        template: "ScaffoldedPracticeTemplate",
        practice_type: 'guided_skill_development',
        skill_focus: "Personification techniques for creating unsettling dystopian atmosphere",
        practice_stages: [
          {
            stage_name: "Basic Personification",
            description: "Give simple human qualities to dystopian objects",
            duration_minutes: 10,
            difficulty_level: 'foundation'
          },
          {
            stage_name: "Threatening Qualities",
            description: "Develop more sophisticated and unsettling human characteristics",
            duration_minutes: 15,
            difficulty_level: 'developing'
          },
          {
            stage_name: "Atmospheric Mastery",
            description: "Create complex personification that enhances overall dystopian atmosphere",
            duration_minutes: 15,
            difficulty_level: 'secure'
          }
        ],
        feedback_structure: {
          self_assessment: true,
          peer_feedback: true,
          teacher_guidance: true
        }
      },
      plenary: {
        id: "dystopian-lesson-5-plenary",
        title: "Unsettling Effects Showcase",
        description: "Share most unsettling personification example and discuss their threatening impact",
        duration: "10 mins",
        type: "Showcase Analysis",
        activity_type: "plenary",
        template: "ShowcaseAnalysisTemplate",
        showcase_focus: "personification techniques and threatening atmosphere creation",
        analysis_questions: [
          "What makes your personification example particularly unsettling?",
          "How does personification make dystopian worlds feel threatening?",
          "What psychological effects does personification create on readers?",
          "Why is personification particularly effective in dystopian fiction?"
        ]
      }
    }
  },

  // Lesson 6: Advanced Literary Devices - Creative Application
  {
    lessonNumber: 6,
    title: "Similes for Dystopian Atmospheric Creation",
    phase: "Literary Device Mastery",
    learningObjective: "I can identify and create powerful similes that enhance dystopian atmosphere and convey themes of oppression",
    weekDay: "Monday",
    template: "CreativeApplicationTemplate",
    activities: {
      starter: {
        id: "dystopian-lesson-6-starter",
        title: "Simile Impact Analysis",
        description: "Analyze how similes enhance dystopian atmosphere and convey themes of oppression",
        duration: "10 mins",
        type: "Quick-fire Discussion",
        activity_type: "starter",
        template: "QuickFireDiscussionTemplate",
        discussion_questions: [
          "How do professional authors use similes in dystopian descriptions?",
          "What makes a simile particularly effective for conveying oppression?",
          "How do similes enhance atmospheric writing compared to direct description?",
          "Which simile examples create the strongest dystopian imagery?"
        ]
      },
      main: {
        id: "dystopian-lesson-6-main",
        title: "Simile Mastery Workshop",
        description: "Create and test original similes that convey oppression and decay for maximum atmospheric impact",
        duration: "40 mins",
        type: "Creative Application",
        activity_type: "main",
        template: "CreativeApplicationTemplate",
        creation_type: 'creative_challenge',
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
        ]
      },
      plenary: {
        id: "dystopian-lesson-6-plenary",
        title: "Simile Power Showcase",
        description: "Present most powerful dystopian simile created and evaluate their effectiveness for conveying themes",
        duration: "10 mins",
        type: "Showcase Analysis",
        activity_type: "plenary",
        template: "ShowcaseAnalysisTemplate",
        showcase_focus: "simile effectiveness and thematic impact analysis",
        analysis_questions: [
          "What makes your simile particularly powerful for dystopian atmosphere?",
          "How does your simile convey themes effectively?",
          "What emotions does your simile evoke in readers?",
          "How does your simile compare to professional examples we studied?"
        ]
      }
    }
  }
];

// Legacy activities for backward compatibility
export const allDystopianActivities = dystopianLessons.flatMap(lesson => [
  lesson.activities.starter,
  lesson.activities.main,
  lesson.activities.plenary
]);