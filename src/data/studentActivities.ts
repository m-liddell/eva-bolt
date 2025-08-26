export interface StudentActivity {
  id: string;
  lessonNumber: number;
  title: string;
  description: string;
  phase: 'starter' | 'main' | 'plenary';
  duration: string;
  type: 'worksheet' | 'interactive' | 'discussion' | 'creative';
  subject: string;
  year_group: string;
  learning_objective: string;
  instructions: string[];
  tasks: {
    id: string;
    title: string;
    description: string;
    type: 'text_input' | 'multiple_choice' | 'drawing' | 'discussion' | 'reflection';
    points?: number;
    options?: string[];
    guidance?: string;
  }[];
  success_criteria: string[];
  differentiation: {
    support: string[];
    extension: string[];
  };
  assessment_rubric: {
    level: string;
    descriptors: string[];
  }[];
  pdf_content: {
    header: string;
    instructions: string[];
    worksheet_sections: {
      title: string;
      content: string;
      space_for_answers: boolean;
    }[];
    footer: string;
  };
}

export const dystopianStudentActivities: StudentActivity[] = [
  // Lesson 1: Dystopian World Discovery - Starter
  {
    id: 'dystopian-student-1-starter',
    lessonNumber: 1,
    title: 'Future Vision Challenge - Student Worksheet',
    description: 'Student worksheet for understanding and identifying features of dystopian settings',
    phase: 'starter',
    duration: '10 mins',
    type: 'interactive',
    subject: 'English',
    year_group: 'Year 7',
    learning_objective: 'I can understand and identify features of dystopian settings and recognize how they reflect social commentary',
    instructions: [
      'Look carefully at the images of different future worlds',
      'Write your immediate emotional responses to each image',
      'Identify key differences between utopian and dystopian futures',
      'Think about how these images connect to real-world concerns',
      'Participate in class discussions about your observations'
    ],
    tasks: [
      {
        id: 'task-1-utopian-analysis',
        title: 'Utopian Image Analysis',
        description: 'Look at the utopian future images. What emotions do they make you feel? What elements create a sense of hope and positivity?',
        type: 'text_input',
        points: 5,
        guidance: 'Focus on colors, environments, people, and technology. Think about what makes these futures feel appealing.'
      },
      {
        id: 'task-1-dystopian-analysis',
        title: 'Dystopian Image Analysis',
        description: 'Examine the dystopian future images. What feelings do they evoke? What elements create unease or fear?',
        type: 'text_input',
        points: 5,
        guidance: 'Look for signs of control, surveillance, environmental damage, or loss of freedom.'
      },
      {
        id: 'task-1-key-differences',
        title: 'Key Differences',
        description: 'What are the most important differences you notice between the utopian and dystopian images?',
        type: 'text_input',
        points: 5,
        guidance: 'Compare specific visual elements like colors, architecture, people, and atmosphere.'
      },
      {
        id: 'task-1-discussion-responses',
        title: 'Think-Pair-Share Responses',
        description: 'Record your thoughts on the discussion questions about dystopian elements and their real-world connections.',
        type: 'discussion',
        points: 10,
        guidance: 'Use specific examples and explain your reasoning clearly.'
      }
    ],
    success_criteria: [
      'Identify key features of dystopian settings accurately',
      'Understand how dystopian elements create unsettling atmosphere',
      'Recognize dystopian settings as social commentary',
      'Make connections between fictional and real-world elements'
    ],
    differentiation: {
      support: [
        'Visual dystopian feature cards with clear examples',
        'Guided questions for less confident students',
        'Vocabulary banks for descriptive responses',
        'Sentence starters for analysis'
      ],
      extension: [
        'Challenge students to identify social commentary in images',
        'Encourage connections to current events and historical examples',
        'Ask students to predict consequences of dystopian trends',
        'Invite analysis of artistic techniques used in the images'
      ]
    },
    assessment_rubric: [
      {
        level: 'Secure',
        descriptors: [
          'Accurately identifies multiple dystopian features',
          'Makes sophisticated connections to real-world issues',
          'Uses specific evidence from images',
          'Demonstrates deep understanding of social commentary'
        ]
      },
      {
        level: 'Developing',
        descriptors: [
          'Identifies some dystopian features correctly',
          'Makes basic connections to real-world issues',
          'Uses some evidence from images',
          'Shows understanding of genre conventions'
        ]
      },
      {
        level: 'Emerging',
        descriptors: [
          'Identifies basic dystopian features',
          'Makes simple observations about images',
          'Limited use of evidence',
          'Basic understanding of dystopian concepts'
        ]
      }
    ],
    pdf_content: {
      header: 'Lesson 1: Future Vision Challenge - Dystopian World Discovery',
      instructions: [
        'Examine the images of different future worlds carefully',
        'Write your honest emotional responses to each type of image',
        'Look for specific visual elements that create different atmospheres',
        'Think about how these fictional futures might relate to our real world',
        'Participate actively in class discussions'
      ],
      worksheet_sections: [
        {
          title: 'Part A: Utopian Future Analysis',
          content: 'Look at the three utopian future images. For each image, write down:\n• Your immediate emotional response\n• Three specific visual elements that create hope\n• How this future might be achieved',
          space_for_answers: true
        },
        {
          title: 'Part B: Dystopian Future Analysis',
          content: 'Examine the three dystopian future images. For each image, write down:\n• Your immediate emotional response\n• Three specific visual elements that create unease\n• What real-world trends this future might represent',
          space_for_answers: true
        },
        {
          title: 'Part C: Comparison and Reflection',
          content: 'Compare the two types of futures:\n• What are the key differences between utopian and dystopian images?\n• Which type of future seems more realistic to you and why?\n• How might dystopian fiction help us think about real-world problems?',
          space_for_answers: true
        },
        {
          title: 'Part D: Real-World Connections',
          content: 'Think about our current world:\n• Can you identify any dystopian elements in today\'s society?\n• What steps could we take to move toward more utopian futures?\n• Why do you think writers create dystopian stories?',
          space_for_answers: true
        }
      ],
      footer: 'Remember: Dystopian fiction helps us understand our present world by imagining where current trends might lead us.'
    }
  },

  // Lesson 2: Complete Sentences - Starter
  {
    id: 'dystopian-student-2-starter',
    lessonNumber: 2,
    title: 'Complete Sentence Foundation - Student Worksheet',
    description: 'Student worksheet for practicing complete sentence identification and construction',
    phase: 'starter',
    duration: '15 mins',
    type: 'worksheet',
    subject: 'English',
    year_group: 'Year 7',
    learning_objective: 'I can identify and create complete sentences for clear dystopian descriptions',
    instructions: [
      'Read each sentence carefully',
      'Identify whether each sentence is complete or incomplete',
      'Fix any incomplete sentences by adding missing parts',
      'Create your own complete sentences using dystopian themes',
      'Check your work with a partner'
    ],
    tasks: [
      {
        id: 'task-2-identification',
        title: 'Complete or Incomplete?',
        description: 'Read each sentence and decide if it is complete (has subject and predicate) or incomplete (missing parts).',
        type: 'multiple_choice',
        points: 10,
        options: ['Complete', 'Incomplete'],
        guidance: 'A complete sentence must have both a subject (who/what) and a predicate (what they do).'
      },
      {
        id: 'task-2-fixing',
        title: 'Fix the Fragments',
        description: 'Take the incomplete sentences and add the missing parts to make them complete.',
        type: 'text_input',
        points: 15,
        guidance: 'Add subjects, predicates, or objects as needed to create complete thoughts.'
      },
      {
        id: 'task-2-creation',
        title: 'Create Complete Sentences',
        description: 'Write five complete sentences about dystopian surveillance systems.',
        type: 'text_input',
        points: 15,
        guidance: 'Each sentence should have a clear subject and predicate. Use descriptive words to create atmosphere.'
      }
    ],
    success_criteria: [
      'Accurately identify complete and incomplete sentences',
      'Successfully fix sentence fragments',
      'Create technically correct complete sentences',
      'Use complete sentences to enhance dystopian atmosphere'
    ],
    differentiation: {
      support: [
        'Sentence structure visual guides',
        'Subject and predicate identification cards',
        'Sentence completion templates',
        'Peer support partnerships'
      ],
      extension: [
        'Challenge students to vary sentence lengths',
        'Encourage use of complex vocabulary',
        'Ask students to explain their sentence choices',
        'Invite creation of mini-stories using complete sentences'
      ]
    },
    assessment_rubric: [
      {
        level: 'Secure',
        descriptors: [
          'Consistently identifies sentence completeness',
          'Effectively fixes all fragments',
          'Creates varied and sophisticated complete sentences',
          'Demonstrates clear understanding of sentence structure'
        ]
      },
      {
        level: 'Developing',
        descriptors: [
          'Usually identifies sentence completeness',
          'Fixes most fragments successfully',
          'Creates basic complete sentences',
          'Shows developing understanding of structure'
        ]
      },
      {
        level: 'Emerging',
        descriptors: [
          'Sometimes identifies sentence completeness',
          'Fixes some fragments with support',
          'Creates simple complete sentences',
          'Basic understanding of sentence requirements'
        ]
      }
    ],
    pdf_content: {
      header: 'Lesson 2: Complete Sentence Foundation Workshop',
      instructions: [
        'Read each sentence example carefully',
        'Identify the subject (who/what) and predicate (what they do)',
        'Mark sentences as complete or incomplete',
        'Fix any fragments by adding missing parts',
        'Create your own complete sentences about dystopian themes'
      ],
      worksheet_sections: [
        {
          title: 'Part A: Sentence Identification',
          content: 'Read each sentence and mark it as Complete (C) or Incomplete (I):\n\n1. The surveillance cameras watched.\n2. Every citizen in the city.\n3. Guards patrolled the empty streets.\n4. Screens displaying propaganda.\n5. The alarm sounded at midnight.',
          space_for_answers: true
        },
        {
          title: 'Part B: Fix the Fragments',
          content: 'Rewrite these incomplete sentences to make them complete:\n\n1. Cameras everywhere.\n2. People afraid.\n3. In the dark corridors.\n4. Watching and waiting.\n5. The sound of footsteps.',
          space_for_answers: true
        },
        {
          title: 'Part C: Create Complete Sentences',
          content: 'Write five complete sentences about dystopian surveillance systems. Make sure each sentence has both a subject and predicate:',
          space_for_answers: true
        }
      ],
      footer: 'Remember: Complete sentences have both a subject (who/what) and a predicate (what they do).'
    }
  },

  // Lesson 3: Simple and Compound Sentences - Starter
  {
    id: 'dystopian-student-3-starter',
    lessonNumber: 3,
    title: 'Sentence Variety Power - Student Worksheet',
    description: 'Student worksheet for understanding and creating simple and compound sentences',
    phase: 'starter',
    duration: '15 mins',
    type: 'worksheet',
    subject: 'English',
    year_group: 'Year 7',
    learning_objective: 'I can use simple and compound sentences strategically to create varied and engaging dystopian descriptions',
    instructions: [
      'Read the sentence examples carefully',
      'Identify whether each sentence is simple or compound',
      'Practice creating both types of sentences',
      'Think about when each type is most effective',
      'Share your best examples with the class'
    ],
    tasks: [
      {
        id: 'task-3-identification',
        title: 'Simple or Compound?',
        description: 'Read each sentence and identify whether it is simple (one complete thought) or compound (two complete thoughts joined).',
        type: 'multiple_choice',
        points: 10,
        options: ['Simple', 'Compound'],
        guidance: 'Look for joining words like "and," "but," or "or" that connect two complete thoughts.'
      },
      {
        id: 'task-3-simple-creation',
        title: 'Create Simple Sentences',
        description: 'Write three simple sentences about dystopian control that create strong impact.',
        type: 'text_input',
        points: 10,
        guidance: 'Simple sentences are powerful for creating emphasis and dramatic effect.'
      },
      {
        id: 'task-3-compound-creation',
        title: 'Create Compound Sentences',
        description: 'Write three compound sentences that show relationships between dystopian elements.',
        type: 'text_input',
        points: 10,
        guidance: 'Use "and," "but," or "or" to join two complete thoughts that relate to each other.'
      },
      {
        id: 'task-3-strategic-choice',
        title: 'Strategic Sentence Choice',
        description: 'Explain when you would use simple sentences vs compound sentences in dystopian writing.',
        type: 'reflection',
        points: 10,
        guidance: 'Think about the different effects each sentence type creates for readers.'
      }
    ],
    success_criteria: [
      'Accurately identify simple and compound sentences',
      'Create effective simple sentences for impact',
      'Construct proper compound sentences showing relationships',
      'Understand strategic use of different sentence types'
    ],
    differentiation: {
      support: [
        'Sentence type identification charts',
        'Joining word reference lists',
        'Sentence construction templates',
        'Visual examples of sentence structures'
      ],
      extension: [
        'Challenge students to create sentence chains',
        'Encourage experimentation with different joining words',
        'Ask students to analyze professional writing examples',
        'Invite creation of mini-narratives using varied sentences'
      ]
    },
    assessment_rubric: [
      {
        level: 'Secure',
        descriptors: [
          'Consistently identifies sentence types correctly',
          'Creates impactful simple sentences',
          'Constructs effective compound sentences',
          'Demonstrates strategic understanding of sentence choice'
        ]
      },
      {
        level: 'Developing',
        descriptors: [
          'Usually identifies sentence types',
          'Creates basic simple sentences',
          'Constructs simple compound sentences',
          'Shows developing understanding of sentence effects'
        ]
      },
      {
        level: 'Emerging',
        descriptors: [
          'Sometimes identifies sentence types',
          'Creates simple sentences with support',
          'Attempts compound sentences',
          'Basic understanding of sentence variety'
        ]
      }
    ],
    pdf_content: {
      header: 'Lesson 3: Sentence Variety Power Workshop',
      instructions: [
        'Study the sentence examples provided',
        'Look for patterns in simple vs compound sentences',
        'Practice creating both types with dystopian themes',
        'Consider the different effects each type creates',
        'Share your best examples with classmates'
      ],
      worksheet_sections: [
        {
          title: 'Part A: Sentence Type Identification',
          content: 'Read each sentence and mark it as Simple (S) or Compound (C):\n\n1. The alarm screamed.\n2. Guards appeared, and order was restored.\n3. Citizens moved like ghosts.\n4. Cameras watched, but people ignored them.\n5. Freedom died that day.',
          space_for_answers: true
        },
        {
          title: 'Part B: Create Simple Sentences',
          content: 'Write three simple sentences about dystopian control that create strong dramatic impact:',
          space_for_answers: true
        },
        {
          title: 'Part C: Create Compound Sentences',
          content: 'Write three compound sentences that show relationships between dystopian elements using "and," "but," or "or":',
          space_for_answers: true
        },
        {
          title: 'Part D: Strategic Choice Reflection',
          content: 'Explain when you would use simple sentences vs compound sentences in dystopian writing and why:',
          space_for_answers: true
        }
      ],
      footer: 'Remember: Simple sentences create impact; compound sentences show relationships between ideas.'
    }
  },

  // Lesson 4: Complex Sentences - Starter
  {
    id: 'dystopian-student-4-starter',
    lessonNumber: 4,
    title: 'Complex Sentence Sophistication - Student Worksheet',
    description: 'Student worksheet for understanding and creating complex sentences with subordinate clauses',
    phase: 'starter',
    duration: '15 mins',
    type: 'worksheet',
    subject: 'English',
    year_group: 'Year 7',
    learning_objective: 'I can use sophisticated complex sentences to create layered and compelling dystopian descriptions',
    instructions: [
      'Study the complex sentence examples',
      'Identify main clauses and subordinate clauses',
      'Practice creating complex sentences with dystopian themes',
      'Experiment with different subordinate clause positions',
      'Evaluate the sophistication of your sentences'
    ],
    tasks: [
      {
        id: 'task-4-clause-identification',
        title: 'Identify Clauses',
        description: 'In each complex sentence, identify the main clause and the subordinate clause.',
        type: 'text_input',
        points: 10,
        guidance: 'The main clause can stand alone; the subordinate clause depends on the main clause.'
      },
      {
        id: 'task-4-complex-creation',
        title: 'Create Complex Sentences',
        description: 'Write four complex sentences about dystopian surveillance using different subordinate clause positions.',
        type: 'text_input',
        points: 15,
        guidance: 'Try starting with the subordinate clause, ending with it, or placing it in the middle.'
      },
      {
        id: 'task-4-sophistication-analysis',
        title: 'Analyze Sophistication',
        description: 'Compare a simple sentence with a complex sentence on the same topic. Explain how the complex sentence adds sophistication.',
        type: 'reflection',
        points: 10,
        guidance: 'Consider how the subordinate clause adds detail, context, or nuance to the main idea.'
      }
    ],
    success_criteria: [
      'Accurately identify main and subordinate clauses',
      'Create technically correct complex sentences',
      'Use subordinate clauses to add descriptive detail',
      'Understand how complexity enhances writing sophistication'
    ],
    differentiation: {
      support: [
        'Complex sentence structure diagrams',
        'Subordinate clause starter word lists',
        'Sentence building templates',
        'Visual clause identification guides'
      ],
      extension: [
        'Challenge students to use multiple subordinate clauses',
        'Encourage experimentation with different clause types',
        'Ask students to analyze professional writing examples',
        'Invite creation of complex sentence chains'
      ]
    },
    assessment_rubric: [
      {
        level: 'Secure',
        descriptors: [
          'Consistently identifies clauses correctly',
          'Creates sophisticated complex sentences',
          'Uses subordinate clauses effectively for detail',
          'Demonstrates clear understanding of sentence sophistication'
        ]
      },
      {
        level: 'Developing',
        descriptors: [
          'Usually identifies clauses correctly',
          'Creates basic complex sentences',
          'Uses subordinate clauses with some effectiveness',
          'Shows developing understanding of complexity'
        ]
      },
      {
        level: 'Emerging',
        descriptors: [
          'Sometimes identifies clauses',
          'Attempts complex sentences with support',
          'Basic use of subordinate clauses',
          'Emerging understanding of sentence complexity'
        ]
      }
    ],
    pdf_content: {
      header: 'Lesson 4: Complex Sentence Sophistication Workshop',
      instructions: [
        'Examine the complex sentence examples carefully',
        'Look for main clauses that can stand alone',
        'Identify subordinate clauses that add extra information',
        'Practice creating your own complex sentences',
        'Experiment with different clause arrangements'
      ],
      worksheet_sections: [
        {
          title: 'Part A: Clause Identification',
          content: 'In each sentence, underline the main clause and circle the subordinate clause:\n\n1. Although the city appeared peaceful, surveillance cameras monitored every movement.\n2. The citizens who questioned the system disappeared without explanation.\n3. When the alarm sounded, everyone knew to return home immediately.',
          space_for_answers: true
        },
        {
          title: 'Part B: Complex Sentence Creation',
          content: 'Create four complex sentences about dystopian surveillance. Try different positions for your subordinate clauses:\n\n1. Start with subordinate clause:\n2. End with subordinate clause:\n3. Subordinate clause in middle:\n4. Multiple subordinate clauses:',
          space_for_answers: true
        },
        {
          title: 'Part C: Sophistication Analysis',
          content: 'Compare these two sentences and explain how the complex version adds sophistication:\n\nSimple: "The cameras watched."\nComplex: "Although they claimed to provide security, the cameras watched with cold, calculating eyes that never blinked."\n\nAnalysis:',
          space_for_answers: true
        }
      ],
      footer: 'Remember: Complex sentences allow you to layer meaning and create sophisticated descriptions.'
    }
  },

  // Lesson 5: Personification - Starter
  {
    id: 'dystopian-student-5-starter',
    lessonNumber: 5,
    title: 'Personification Power - Student Worksheet',
    description: 'Student worksheet for understanding and creating personification in dystopian settings',
    phase: 'starter',
    duration: '15 mins',
    type: 'creative',
    subject: 'English',
    year_group: 'Year 7',
    learning_objective: 'I can use personification strategically to create unsettling and oppressive atmospheres in dystopian settings',
    instructions: [
      'Study how objects can be given human qualities',
      'Identify personification in dystopian examples',
      'Practice giving human qualities to surveillance equipment',
      'Create personification that feels unsettling',
      'Explain why your personification creates atmosphere'
    ],
    tasks: [
      {
        id: 'task-5-identification',
        title: 'Spot the Personification',
        description: 'Read each sentence and identify what human quality is being given to a non-human object.',
        type: 'text_input',
        points: 10,
        guidance: 'Look for human actions, emotions, or characteristics given to objects or places.'
      },
      {
        id: 'task-5-surveillance-personification',
        title: 'Personify Surveillance',
        description: 'Give human qualities to surveillance cameras, making them feel threatening and alive.',
        type: 'text_input',
        points: 15,
        guidance: 'Think about human behaviors that would make cameras feel scary - watching, judging, hunting.'
      },
      {
        id: 'task-5-building-personification',
        title: 'Personify Buildings',
        description: 'Give human qualities to dystopian buildings or architecture.',
        type: 'text_input',
        points: 10,
        guidance: 'Consider how buildings might "feel" emotions or "behave" in threatening ways.'
      },
      {
        id: 'task-5-effect-analysis',
        title: 'Analyze the Effect',
        description: 'Choose your best personification example and explain why it creates an unsettling atmosphere.',
        type: 'reflection',
        points: 10,
        guidance: 'Think about how giving human qualities to objects makes them feel more threatening.'
      }
    ],
    success_criteria: [
      'Accurately identify personification in examples',
      'Create effective personification for surveillance elements',
      'Use personification to enhance threatening atmosphere',
      'Understand how personification affects reader emotions'
    ],
    differentiation: {
      support: [
        'Human quality word banks',
        'Personification example cards',
        'Sentence starter templates',
        'Visual prompts for inspiration'
      ],
      extension: [
        'Challenge students to create extended personification',
        'Encourage use of sophisticated human qualities',
        'Ask students to analyze professional examples',
        'Invite creation of personification stories'
      ]
    },
    assessment_rubric: [
      {
        level: 'Secure',
        descriptors: [
          'Consistently identifies personification accurately',
          'Creates sophisticated and unsettling personification',
          'Effectively uses personification for atmosphere',
          'Demonstrates clear understanding of literary device impact'
        ]
      },
      {
        level: 'Developing',
        descriptors: [
          'Usually identifies personification',
          'Creates basic personification examples',
          'Uses personification with some atmospheric effect',
          'Shows developing understanding of device purpose'
        ]
      },
      {
        level: 'Emerging',
        descriptors: [
          'Sometimes identifies personification',
          'Attempts personification with support',
          'Basic use of human qualities for objects',
          'Emerging understanding of atmospheric effects'
        ]
      }
    ],
    pdf_content: {
      header: 'Lesson 5: Personification Power Workshop',
      instructions: [
        'Look for examples where objects are given human qualities',
        'Think about what human behaviors would make objects scary',
        'Practice giving life to surveillance equipment and buildings',
        'Consider how personification affects the mood of writing',
        'Create your own unsettling personification examples'
      ],
      worksheet_sections: [
        {
          title: 'Part A: Identify Personification',
          content: 'Read each sentence and identify what human quality is given to the object:\n\n1. "The surveillance cameras glared down at the citizens with suspicious eyes."\n2. "The building loomed over the street, breathing with menace."\n3. "Screens whispered propaganda into every home."\n4. "The city walls stood guard, jealously protecting their secrets."',
          space_for_answers: true
        },
        {
          title: 'Part B: Personify Surveillance',
          content: 'Give human qualities to these surveillance elements to make them feel threatening:\n\n1. Security cameras:\n2. Motion sensors:\n3. Listening devices:\n4. Tracking systems:',
          space_for_answers: true
        },
        {
          title: 'Part C: Personify Buildings',
          content: 'Give human qualities to these dystopian structures:\n\n1. Government building:\n2. Prison walls:\n3. Control tower:\n4. Underground tunnels:',
          space_for_answers: true
        },
        {
          title: 'Part D: Effect Analysis',
          content: 'Choose your best personification example and explain:\n• What human quality you gave to the object\n• Why this makes it feel threatening\n• How it enhances the dystopian atmosphere',
          space_for_answers: true
        }
      ],
      footer: 'Remember: Personification makes objects feel alive and can create powerful atmospheric effects.'
    }
  },

  // Lesson 6: Similes - Starter
  {
    id: 'dystopian-student-6-starter',
    lessonNumber: 6,
    title: 'Simile Impact Analysis - Student Worksheet',
    description: 'Student worksheet for analyzing and creating powerful similes for dystopian atmosphere',
    phase: 'starter',
    duration: '15 mins',
    type: 'creative',
    subject: 'English',
    year_group: 'Year 7',
    learning_objective: 'I can identify and create powerful similes that enhance dystopian atmosphere and convey themes of oppression',
    instructions: [
      'Study how similes compare dystopian elements to other things',
      'Identify the comparisons being made in example similes',
      'Practice creating your own dystopian similes',
      'Focus on comparisons that enhance atmosphere',
      'Test your similes for emotional impact'
    ],
    tasks: [
      {
        id: 'task-6-simile-identification',
        title: 'Identify Similes',
        description: 'Find the similes in each sentence and identify what is being compared to what.',
        type: 'text_input',
        points: 10,
        guidance: 'Look for "like" or "as" that signal comparisons between different things.'
      },
      {
        id: 'task-6-oppression-similes',
        title: 'Create Oppression Similes',
        description: 'Create similes that compare dystopian control elements to things that feel oppressive.',
        type: 'text_input',
        points: 15,
        guidance: 'Think about what oppression feels like and compare dystopian elements to those feelings.'
      },
      {
        id: 'task-6-decay-similes',
        title: 'Create Decay Similes',
        description: 'Create similes that compare environmental destruction to things that show decay.',
        type: 'text_input',
        points: 10,
        guidance: 'Consider what decay looks, smells, or feels like in the real world.'
      },
      {
        id: 'task-6-effectiveness-test',
        title: 'Test Effectiveness',
        description: 'Choose your most powerful simile and explain why it effectively enhances dystopian atmosphere.',
        type: 'reflection',
        points: 10,
        guidance: 'Consider the emotional impact and visual imagery your simile creates.'
      }
    ],
    success_criteria: [
      'Accurately identify similes and their comparisons',
      'Create effective similes for oppression themes',
      'Use similes to enhance dystopian atmosphere',
      'Understand how similes affect reader emotions'
    ],
    differentiation: {
      support: [
        'Simile structure guides ("like" and "as" examples)',
        'Comparison word banks for atmosphere',
        'Visual prompts for simile inspiration',
        'Sentence completion templates'
      ],
      extension: [
        'Challenge students to create extended similes',
        'Encourage use of unexpected comparisons',
        'Ask students to analyze professional simile examples',
        'Invite creation of simile chains or sequences'
      ]
    },
    assessment_rubric: [
      {
        level: 'Secure',
        descriptors: [
          'Consistently identifies similes and comparisons',
          'Creates powerful and atmospheric similes',
          'Effectively uses similes to convey themes',
          'Demonstrates sophisticated understanding of comparison impact'
        ]
      },
      {
        level: 'Developing',
        descriptors: [
          'Usually identifies similes correctly',
          'Creates basic atmospheric similes',
          'Uses similes with some thematic connection',
          'Shows developing understanding of comparison effects'
        ]
      },
      {
        level: 'Emerging',
        descriptors: [
          'Sometimes identifies similes',
          'Attempts simile creation with support',
          'Basic use of comparisons',
          'Emerging understanding of simile purpose'
        ]
      }
    ],
    pdf_content: {
      header: 'Lesson 6: Simile Impact Analysis Workshop',
      instructions: [
        'Look for comparisons using "like" or "as"',
        'Think about what makes comparisons powerful',
        'Practice creating similes that enhance atmosphere',
        'Consider the emotional impact of your comparisons',
        'Test your similes by reading them aloud'
      ],
      worksheet_sections: [
        {
          title: 'Part A: Identify Similes',
          content: 'Find the similes in these sentences and explain what is being compared:\n\n1. "The surveillance drones moved like mechanical vultures circling their prey."\n2. "The city walls stood as tall as mountains, blocking out hope."\n3. "Citizens walked through the streets like ghosts, silent and pale."\n4. "The propaganda screens flickered like hungry eyes in the darkness."',
          space_for_answers: true
        },
        {
          title: 'Part B: Create Oppression Similes',
          content: 'Create similes that compare these dystopian control elements to oppressive things:\n\n1. Government surveillance:\n2. Movement restrictions:\n3. Thought control:\n4. Social monitoring:',
          space_for_answers: true
        },
        {
          title: 'Part C: Create Decay Similes',
          content: 'Create similes that compare environmental destruction to decay:\n\n1. Polluted air:\n2. Dead rivers:\n3. Barren landscapes:\n4. Toxic waste:',
          space_for_answers: true
        },
        {
          title: 'Part D: Effectiveness Analysis',
          content: 'Choose your most powerful simile and analyze its effectiveness:\n• What comparison does it make?\n• Why is this comparison effective?\n• What emotions does it create?\n• How does it enhance dystopian atmosphere?',
          space_for_answers: true
        }
      ],
      footer: 'Remember: Effective similes create vivid mental images and strong emotional responses.'
    }
  },

  // Lesson 1: Main Activity
  {
    id: 'dystopian-student-1-main',
    lessonNumber: 1,
    title: 'Dystopian Feature Investigation - Student Worksheet',
    description: 'Student worksheet for collaborative investigation of dystopian features across multimedia sources',
    phase: 'main',
    duration: '40 mins',
    type: 'interactive',
    subject: 'English',
    year_group: 'Year 7',
    learning_objective: 'I can analyze dystopian setting characteristics through multimedia and create identification guides',
    instructions: [
      'Work in teams to analyze dystopian features',
      'Take notes on multimedia examples',
      'Examine text extracts for dystopian elements',
      'Create a visual guide to dystopian features',
      'Share findings with other teams'
    ],
    tasks: [
      {
        id: 'task-1m-multimedia-analysis',
        title: 'Multimedia Analysis',
        description: 'Watch the dystopian film clips and identify recurring features across different dystopian worlds.',
        type: 'text_input',
        points: 15,
        guidance: 'Look for visual elements like surveillance, environmental damage, social control, and oppressive architecture.'
      },
      {
        id: 'task-1m-text-analysis',
        title: 'Text Extract Analysis',
        description: 'Read extracts from 1984 and The Hunger Games. Highlight dystopian features and compare techniques.',
        type: 'text_input',
        points: 15,
        guidance: 'Focus on how different authors create dystopian atmosphere through language choices.'
      },
      {
        id: 'task-1m-feature-guide',
        title: 'Feature Guide Creation',
        description: 'Create a visual guide to dystopian features using examples from both visual and textual sources.',
        type: 'text_input',
        points: 15,
        guidance: 'Organize your findings into clear categories with specific examples.'
      }
    ],
    success_criteria: [
      'Accurately identify dystopian features across different media',
      'Explain how features create unsettling atmosphere',
      'Compare dystopian techniques across texts and films',
      'Create clear visual guides showing understanding'
    ],
    differentiation: {
      support: [
        'Feature identification checklists',
        'Guided analysis questions',
        'Visual organizers for note-taking',
        'Team role cards with specific responsibilities'
      ],
      extension: [
        'Challenge students to identify subtle dystopian elements',
        'Encourage analysis of artistic and literary techniques',
        'Ask students to predict societal commentary',
        'Invite connections to historical examples'
      ]
    },
    assessment_rubric: [
      {
        level: 'Secure',
        descriptors: [
          'Identifies complex dystopian features across media',
          'Makes sophisticated connections between sources',
          'Creates comprehensive and organized guides',
          'Demonstrates deep understanding of genre conventions'
        ]
      },
      {
        level: 'Developing',
        descriptors: [
          'Identifies obvious dystopian features',
          'Makes basic connections between sources',
          'Creates simple but accurate guides',
          'Shows developing understanding of conventions'
        ]
      },
      {
        level: 'Emerging',
        descriptors: [
          'Identifies basic dystopian elements',
          'Makes simple observations',
          'Creates basic guides with support',
          'Emerging understanding of genre'
        ]
      }
    ],
    pdf_content: {
      header: 'Lesson 1: Dystopian Feature Investigation Workshop',
      instructions: [
        'Work collaboratively in your assigned team role',
        'Take detailed notes on multimedia and text examples',
        'Look for patterns across different dystopian sources',
        'Create clear, organized guides for other students',
        'Prepare to share your team\'s discoveries'
      ],
      worksheet_sections: [
        {
          title: 'Part A: Multimedia Analysis Notes',
          content: 'For each film clip, record:\n• Title and source\n• Key dystopian features observed\n• Visual techniques used\n• Emotional impact created\n• Connections to real-world concerns',
          space_for_answers: true
        },
        {
          title: 'Part B: Text Analysis Notes',
          content: 'For each text extract, record:\n• Author and source\n• Dystopian features described\n• Language techniques used\n• Atmospheric effects created\n• Themes or commentary suggested',
          space_for_answers: true
        },
        {
          title: 'Part C: Feature Guide Creation',
          content: 'Create your team\'s visual guide:\n• List main dystopian features identified\n• Provide examples from multimedia and texts\n• Explain why each feature feels unsettling\n• Include visual elements or diagrams',
          space_for_answers: true
        }
      ],
      footer: 'Remember: Dystopian features work together to create atmosphere and convey social commentary.'
    }
  },

  // Lesson 2: Main Activity
  {
    id: 'dystopian-student-2-main',
    lessonNumber: 2,
    title: 'Complete Sentence Construction Workshop - Student Worksheet',
    description: 'Student worksheet for scaffolded practice in complete sentence construction',
    phase: 'main',
    duration: '40 mins',
    type: 'worksheet',
    subject: 'English',
    year_group: 'Year 7',
    learning_objective: 'I can master complete sentence components using dystopian examples and practice atmospheric writing',
    instructions: [
      'Work through each stage of sentence construction',
      'Practice with increasingly complex examples',
      'Get feedback from peers and teacher',
      'Build confidence with complete sentence writing',
      'Apply skills to dystopian atmosphere creation'
    ],
    tasks: [
      {
        id: 'task-2m-component-mastery',
        title: 'Master Sentence Components',
        description: 'Practice identifying and using Subject + Predicate + Object structure in dystopian contexts.',
        type: 'text_input',
        points: 15,
        guidance: 'Focus on who is doing what to whom in your dystopian sentences.'
      },
      {
        id: 'task-2m-atmospheric-practice',
        title: 'Atmospheric Writing Practice',
        description: 'Create complete sentences about surveillance, environmental decay, social control, and character emotions.',
        type: 'text_input',
        points: 20,
        guidance: 'Use complete sentence structure to create clear, atmospheric descriptions.'
      },
      {
        id: 'task-2m-fragment-transformation',
        title: 'Transform Fragments',
        description: 'Convert sentence fragments into powerful complete sentences with atmospheric impact.',
        type: 'text_input',
        points: 10,
        guidance: 'Add missing components and descriptive details to create complete, engaging sentences.'
      }
    ],
    success_criteria: [
      'Write technically accurate complete sentences consistently',
      'Use complete sentences to enhance dystopian atmosphere',
      'Transform fragments into effective complete sentences',
      'Demonstrate understanding of sentence component functions'
    ],
    differentiation: {
      support: [
        'Sentence component visual guides',
        'Step-by-step construction templates',
        'Peer support partnerships',
        'Teacher feedback checkpoints'
      ],
      extension: [
        'Challenge students to vary sentence lengths',
        'Encourage sophisticated vocabulary choices',
        'Ask students to explain their construction decisions',
        'Invite creation of sentence variety showcases'
      ]
    },
    assessment_rubric: [
      {
        level: 'Secure',
        descriptors: [
          'Consistently constructs accurate complete sentences',
          'Effectively uses sentences for atmospheric impact',
          'Successfully transforms all fragments',
          'Demonstrates mastery of sentence components'
        ]
      },
      {
        level: 'Developing',
        descriptors: [
          'Usually constructs complete sentences correctly',
          'Uses sentences with some atmospheric effect',
          'Transforms most fragments successfully',
          'Shows developing mastery of components'
        ]
      },
      {
        level: 'Emerging',
        descriptors: [
          'Sometimes constructs complete sentences',
          'Basic use of sentences for description',
          'Transforms simple fragments with support',
          'Emerging understanding of sentence structure'
        ]
      }
    ],
    pdf_content: {
      header: 'Lesson 2: Complete Sentence Construction Workshop',
      instructions: [
        'Work through each practice stage systematically',
        'Focus on accuracy before attempting complexity',
        'Use peer feedback to improve your sentences',
        'Apply complete sentence skills to atmospheric writing',
        'Build confidence through progressive practice'
      ],
      worksheet_sections: [
        {
          title: 'Stage 1: Master Components (12 minutes)',
          content: 'Practice Subject + Predicate + Object structure:\n\nExample: "The surveillance drones (subject) monitored (predicate) every citizen\'s movement (object)."\n\nYour practice sentences:\n1. _________________ watched _________________\n2. _________________ controlled _________________\n3. _________________ destroyed _________________',
          space_for_answers: true
        },
        {
          title: 'Stage 2: Atmospheric Practice (20 minutes)',
          content: 'Create complete sentences for each theme:\n\nSurveillance systems:\n1.\n2.\n\nEnvironmental decay:\n1.\n2.\n\nSocial control:\n1.\n2.\n\nCharacter emotions:\n1.\n2.',
          space_for_answers: true
        },
        {
          title: 'Stage 3: Transform Fragments (8 minutes)',
          content: 'Transform these fragments into complete sentences:\n\n1. "Cameras everywhere." →\n2. "People afraid." →\n3. "Rules strict." →\n4. "No escape." →',
          space_for_answers: true
        }
      ],
      footer: 'Remember: Complete sentences provide clarity and can create powerful atmospheric effects.'
    }
  },

  // Lesson 3: Main Activity
  {
    id: 'dystopian-student-3-main',
    lessonNumber: 3,
    title: 'Sentence Variety Mastery Workshop - Student Worksheet',
    description: 'Student worksheet for progressive practice with simple and compound sentence variety',
    phase: 'main',
    duration: '40 mins',
    type: 'worksheet',
    subject: 'English',
    year_group: 'Year 7',
    learning_objective: 'I can use simple and compound sentences strategically to create varied and engaging dystopian descriptions',
    instructions: [
      'Progress through foundation to advanced sentence variety',
      'Practice strategic sentence choice for different effects',
      'Work with peers to improve sentence effectiveness',
      'Apply sentence variety to create engaging writing',
      'Reflect on your progress and set goals'
    ],
    tasks: [
      {
        id: 'task-3m-foundation-practice',
        title: 'Foundation Practice',
        description: 'Learn when to use simple vs compound sentences for different atmospheric effects.',
        type: 'text_input',
        points: 10,
        guidance: 'Simple sentences create impact; compound sentences show relationships and flow.'
      },
      {
        id: 'task-3m-guided-application',
        title: 'Guided Application',
        description: 'Practice creating both sentence types for surveillance, decay, control, and character themes.',
        type: 'text_input',
        points: 20,
        guidance: 'Experiment with different sentence combinations for maximum atmospheric impact.'
      },
      {
        id: 'task-3m-independent-mastery',
        title: 'Independent Mastery',
        description: 'Create a short dystopian scene using strategic sentence variety for maximum impact.',
        type: 'text_input',
        points: 15,
        guidance: 'Mix simple and compound sentences strategically to create engaging, varied writing.'
      }
    ],
    success_criteria: [
      'Use simple and compound sentences strategically for different effects',
      'Create varied sentence structures that enhance reader engagement',
      'Understand how sentence choice impacts dystopian atmosphere',
      'Apply sentence variety techniques to create compelling writing'
    ],
    differentiation: {
      support: [
        'Sentence type reference charts',
        'Strategic choice decision trees',
        'Peer collaboration opportunities',
        'Teacher guidance checkpoints'
      ],
      extension: [
        'Challenge students to create complex sentence combinations',
        'Encourage analysis of professional writing variety',
        'Ask students to teach others their strategies',
        'Invite creation of sentence variety guides'
      ]
    },
    assessment_rubric: [
      {
        level: 'Secure',
        descriptors: [
          'Strategically uses both sentence types for specific effects',
          'Creates engaging and varied sentence structures',
          'Demonstrates sophisticated understanding of sentence impact',
          'Applies variety techniques effectively in creative writing'
        ]
      },
      {
        level: 'Developing',
        descriptors: [
          'Uses both sentence types with some strategy',
          'Creates basic sentence variety',
          'Shows developing understanding of sentence effects',
          'Applies variety techniques with some success'
        ]
      },
      {
        level: 'Emerging',
        descriptors: [
          'Attempts to use different sentence types',
          'Creates simple sentence variety',
          'Basic understanding of sentence differences',
          'Beginning to apply variety techniques'
        ]
      }
    ],
    pdf_content: {
      header: 'Lesson 3: Sentence Variety Mastery Workshop',
      instructions: [
        'Work through each practice stage at your own pace',
        'Focus on understanding when to use each sentence type',
        'Collaborate with peers to improve your writing',
        'Apply sentence variety to create engaging descriptions',
        'Reflect on your progress and celebrate improvements'
      ],
      worksheet_sections: [
        {
          title: 'Stage 1: Foundation Practice (10 minutes)',
          content: 'Practice choosing the right sentence type:\n\nFor dramatic impact, use: _________________ sentences\nFor showing relationships, use: _________________ sentences\n\nCreate examples:\nSimple for impact: _________________________________\nCompound for flow: _________________________________',
          space_for_answers: true
        },
        {
          title: 'Stage 2: Guided Application (25 minutes)',
          content: 'Create sentences for each theme using both types strategically:\n\nSurveillance (simple): _________________________________\nSurveillance (compound): _________________________________\n\nEnvironmental decay (simple): _________________________________\nEnvironmental decay (compound): _________________________________\n\nCharacter emotions (simple): _________________________________\nCharacter emotions (compound): _________________________________',
          space_for_answers: true
        },
        {
          title: 'Stage 3: Independent Mastery (5 minutes)',
          content: 'Write a short dystopian scene (50-75 words) using strategic sentence variety:\n\nYour scene:',
          space_for_answers: true
        }
      ],
      footer: 'Remember: Strategic sentence variety creates engaging, professional-quality writing.'
    }
  },

  // Lesson 4: Main Activity
  {
    id: 'dystopian-student-4-main',
    lessonNumber: 4,
    title: 'Complex Sentence Mastery Workshop - Student Worksheet',
    description: 'Student worksheet for mastering complex sentence construction with dystopian themes',
    phase: 'main',
    duration: '40 mins',
    type: 'creative',
    subject: 'English',
    year_group: 'Year 7',
    learning_objective: 'I can master complex sentence construction with dystopian themes and combine sentence types for maximum impact',
    instructions: [
      'Master complex sentence construction techniques',
      'Practice with multiple subordinate clauses',
      'Create sophisticated dystopian descriptions',
      'Combine all sentence types strategically',
      'Evaluate the sophistication of your writing'
    ],
    tasks: [
      {
        id: 'task-4m-complex-construction',
        title: 'Master Complex Construction',
        description: 'Practice creating complex sentences with multiple subordinate clauses about dystopian themes.',
        type: 'text_input',
        points: 15,
        guidance: 'Use subordinate clauses to add layers of meaning and sophisticated detail.'
      },
      {
        id: 'task-4m-sophisticated-descriptions',
        title: 'Create Sophisticated Descriptions',
        description: 'Write detailed descriptions of surveillance, decay, control, and character psychology using complex sentences.',
        type: 'text_input',
        points: 20,
        guidance: 'Focus on creating nuanced, layered descriptions that show sophisticated understanding.'
      },
      {
        id: 'task-4m-sentence-combination',
        title: 'Strategic Sentence Combination',
        description: 'Combine simple, compound, and complex sentences strategically for maximum atmospheric impact.',
        type: 'text_input',
        points: 15,
        guidance: 'Use each sentence type for its strengths: simple for impact, compound for flow, complex for sophistication.'
      }
    ],
    success_criteria: [
      'Construct accurate and sophisticated complex sentences',
      'Use subordinate clauses to add descriptive detail',
      'Combine sentence types for maximum atmospheric impact',
      'Demonstrate mastery of advanced sentence construction'
    ],
    differentiation: {
      support: [
        'Complex sentence structure guides',
        'Subordinate clause starter word lists',
        'Sentence building scaffolds',
        'Peer collaboration opportunities'
      ],
      extension: [
        'Challenge students to use multiple clause types',
        'Encourage experimentation with clause positioning',
        'Ask students to analyze professional complex sentences',
        'Invite creation of sophisticated writing showcases'
      ]
    },
    assessment_rubric: [
      {
        level: 'Secure',
        descriptors: [
          'Consistently creates sophisticated complex sentences',
          'Effectively uses subordinate clauses for detail',
          'Strategically combines all sentence types',
          'Demonstrates mastery of advanced construction techniques'
        ]
      },
      {
        level: 'Developing',
        descriptors: [
          'Usually creates accurate complex sentences',
          'Uses subordinate clauses with some effectiveness',
          'Combines sentence types with basic strategy',
          'Shows developing mastery of construction'
        ]
      },
      {
        level: 'Emerging',
        descriptors: [
          'Attempts complex sentences with support',
          'Basic use of subordinate clauses',
          'Simple sentence combination attempts',
          'Emerging understanding of advanced construction'
        ]
      }
    ],
    pdf_content: {
      header: 'Lesson 4: Complex Sentence Mastery Workshop',
      instructions: [
        'Focus on creating sophisticated, layered sentences',
        'Use subordinate clauses to add depth and detail',
        'Experiment with different clause arrangements',
        'Combine all sentence types for maximum impact',
        'Evaluate the sophistication of your final writing'
      ],
      worksheet_sections: [
        {
          title: 'Phase 1: Complex Construction (15 minutes)',
          content: 'Practice complex sentence structure:\n\nMain clause + subordinate clause examples:\n"Although the surveillance system appeared protective, it actually monitored every thought."\n\nYour complex sentences:\n1. Although _______________, _______________\n2. Because _______________, _______________\n3. When _______________, _______________',
          space_for_answers: true
        },
        {
          title: 'Phase 2: Sophisticated Descriptions (20 minutes)',
          content: 'Create sophisticated descriptions using complex sentences:\n\nSurveillance systems:\n\nEnvironmental decay:\n\nSocial control:\n\nCharacter psychology:',
          space_for_answers: true
        },
        {
          title: 'Phase 3: Maximum Impact Challenge (5 minutes)',
          content: 'Write a dystopian passage combining all sentence types strategically:\n\nYour passage (aim for 75-100 words):',
          space_for_answers: true
        }
      ],
      footer: 'Remember: Complex sentences allow for sophisticated expression of layered ideas and relationships.'
    }
  },

  // Lesson 5: Main Activity
  {
    id: 'dystopian-student-5-main',
    lessonNumber: 5,
    title: 'Personification Atmosphere Workshop - Student Worksheet',
    description: 'Student worksheet for creating unsettling atmospheres using personification',
    phase: 'main',
    duration: '40 mins',
    type: 'creative',
    subject: 'English',
    year_group: 'Year 7',
    learning_objective: 'I can use personification strategically to create unsettling and oppressive atmospheres in dystopian settings',
    instructions: [
      'Explore how personification creates unsettling effects',
      'Practice personifying surveillance, buildings, and oppressive elements',
      'Create threatening atmospheres using personification',
      'Test your personification for emotional impact',
      'Share and evaluate the most effective examples'
    ],
    tasks: [
      {
        id: 'task-5m-effect-exploration',
        title: 'Explore Personification Effects',
        description: 'Analyze how giving human qualities to objects creates unsettling feelings in readers.',
        type: 'text_input',
        points: 10,
        guidance: 'Think about why making objects seem alive and conscious feels threatening.'
      },
      {
        id: 'task-5m-element-personification',
        title: 'Personify Dystopian Elements',
        description: 'Give human qualities to surveillance equipment, buildings, and control systems.',
        type: 'text_input',
        points: 20,
        guidance: 'Choose human qualities that make these objects feel threatening and malevolent.'
      },
      {
        id: 'task-5m-atmosphere-creation',
        title: 'Create Threatening Atmospheres',
        description: 'Write a short dystopian scene using personification to make the environment feel alive and hostile.',
        type: 'text_input',
        points: 15,
        guidance: 'Use personification to make readers feel that danger could come from anywhere.'
      }
    ],
    success_criteria: [
      'Use personification to create unsettling effects',
      'Apply personification to dystopian surveillance and control themes',
      'Understand how personification enhances threatening atmosphere',
      'Create original personification that effectively conveys mood'
    ],
    differentiation: {
      support: [
        'Human quality word banks',
        'Personification example libraries',
        'Atmospheric effect guides',
        'Collaborative brainstorming opportunities'
      ],
      extension: [
        'Challenge students to create extended personification narratives',
        'Encourage analysis of professional personification techniques',
        'Ask students to experiment with subtle personification',
        'Invite creation of personification effect studies'
      ]
    },
    assessment_rubric: [
      {
        level: 'Secure',
        descriptors: [
          'Creates sophisticated and unsettling personification',
          'Effectively applies personification to enhance themes',
          'Demonstrates clear understanding of atmospheric impact',
          'Produces original and creative personification examples'
        ]
      },
      {
        level: 'Developing',
        descriptors: [
          'Creates basic personification with some unsettling effect',
          'Applies personification to themes with some success',
          'Shows developing understanding of atmospheric enhancement',
          'Produces simple but effective personification'
        ]
      },
      {
        level: 'Emerging',
        descriptors: [
          'Attempts personification with support',
          'Basic application to dystopian themes',
          'Emerging understanding of atmospheric effects',
          'Simple personification attempts'
        ]
      }
    ],
    pdf_content: {
      header: 'Lesson 5: Personification Atmosphere Workshop',
      instructions: [
        'Think about how objects might behave if they were alive',
        'Choose human qualities that create threatening feelings',
        'Practice with surveillance equipment and buildings',
        'Create scenes where the environment feels hostile',
        'Test your personification by reading it aloud'
      ],
      worksheet_sections: [
        {
          title: 'Phase 1: Explore Effects (12 minutes)',
          content: 'Analyze these personification examples:\n\n"The cameras glared with hungry eyes, feeding on every secret."\n"The building breathed with malice, its windows blinking like predatory eyes."\n\nWhy do these feel unsettling?\n\nWhat human qualities make objects threatening?',
          space_for_answers: true
        },
        {
          title: 'Phase 2: Practice Personification (23 minutes)',
          content: 'Give threatening human qualities to these elements:\n\nSurveillance cameras:\n\nGovernment buildings:\n\nSecurity systems:\n\nPropaganda screens:\n\nControl mechanisms:',
          space_for_answers: true
        },
        {
          title: 'Phase 3: Create Threatening Scene (5 minutes)',
          content: 'Write a short scene (50-75 words) where personification makes the environment feel alive and threatening:\n\nYour threatening scene:',
          space_for_answers: true
        }
      ],
      footer: 'Remember: Personification makes readers feel that the environment itself is hostile and conscious.'
    }
  },

  // Lesson 6: Main Activity
  {
    id: 'dystopian-student-6-main',
    lessonNumber: 6,
    title: 'Simile Mastery Workshop - Student Worksheet',
    description: 'Student worksheet for creating and analyzing powerful dystopian similes',
    phase: 'main',
    duration: '40 mins',
    type: 'creative',
    subject: 'English',
    year_group: 'Year 7',
    learning_objective: 'I can identify and create powerful similes that enhance dystopian atmosphere and convey themes of oppression',
    instructions: [
      'Analyze how professional authors use similes',
      'Create original similes for oppression and decay',
      'Test your similes for atmospheric effectiveness',
      'Compare your work with professional examples',
      'Refine your similes for maximum impact'
    ],
    tasks: [
      {
        id: 'task-6m-professional-analysis',
        title: 'Analyze Professional Similes',
        description: 'Study how published authors use similes in dystopian writing and identify what makes them effective.',
        type: 'text_input',
        points: 10,
        guidance: 'Look for unexpected comparisons that create vivid mental images and emotional responses.'
      },
      {
        id: 'task-6m-original-creation',
        title: 'Create Original Similes',
        description: 'Write original similes that convey oppression and decay using powerful comparisons.',
        type: 'text_input',
        points: 20,
        guidance: 'Choose comparisons that help readers feel the emotional weight of dystopian themes.'
      },
      {
        id: 'task-6m-effectiveness-testing',
        title: 'Test Effectiveness',
        description: 'Select your most powerful simile and evaluate its effectiveness for creating dystopian atmosphere.',
        type: 'reflection',
        points: 15,
        guidance: 'Consider the visual imagery, emotional impact, and thematic connection of your simile.'
      }
    ],
    success_criteria: [
      'Create powerful similes that enhance dystopian atmosphere',
      'Use similes to convey themes of oppression and decay',
      'Understand simile effectiveness for atmospheric writing',
      'Demonstrate creativity and sophistication in comparisons'
    ],
    differentiation: {
      support: [
        'Professional simile example collections',
        'Comparison word banks for atmosphere',
        'Simile construction templates',
        'Peer feedback partnerships'
      ],
      extension: [
        'Challenge students to create extended simile sequences',
        'Encourage analysis of simile techniques in literature',
        'Ask students to experiment with unexpected comparisons',
        'Invite creation of simile effectiveness guides'
      ]
    },
    assessment_rubric: [
      {
        level: 'Secure',
        descriptors: [
          'Creates sophisticated and atmospheric similes',
          'Effectively conveys themes through comparisons',
          'Demonstrates clear understanding of simile impact',
          'Shows creativity and originality in comparisons'
        ]
      },
      {
        level: 'Developing',
        descriptors: [
          'Creates basic atmospheric similes',
          'Conveys themes with some effectiveness',
          'Shows developing understanding of simile purpose',
          'Demonstrates some creativity in comparisons'
        ]
      },
      {
        level: 'Emerging',
        descriptors: [
          'Attempts simile creation with support',
          'Basic thematic connections in comparisons',
          'Emerging understanding of simile effects',
          'Simple but appropriate comparisons'
        ]
      }
    ],
    pdf_content: {
      header: 'Lesson 6: Simile Mastery Workshop',
      instructions: [
        'Study professional examples of dystopian similes',
        'Look for comparisons that create strong mental images',
        'Practice creating your own powerful comparisons',
        'Focus on similes that convey oppression and decay',
        'Test your similes by considering their emotional impact'
      ],
      worksheet_sections: [
        {
          title: 'Phase 1: Professional Analysis (15 minutes)',
          content: 'Analyze these professional similes:\n\n"The surveillance drones moved like mechanical vultures circling their prey." - Why is this effective?\n\n"The city walls stood like prison bars against the sky." - What does this comparison suggest?\n\nYour analysis:',
          space_for_answers: true
        },
        {
          title: 'Phase 2: Original Creation (20 minutes)',
          content: 'Create powerful similes for these dystopian elements:\n\nOppressive government: "The government was like _______________"\n\nEnvironmental decay: "The polluted air moved like _______________"\n\nSocial control: "The rules wrapped around citizens like _______________"\n\nSurveillance: "The cameras watched like _______________"\n\nLoss of freedom: "Their trapped lives felt like _______________"',
          space_for_answers: true
        },
        {
          title: 'Phase 3: Effectiveness Testing (5 minutes)',
          content: 'Choose your most powerful simile and evaluate it:\n\nYour best simile: _______________\n\nWhy it\'s effective:\n• Visual imagery created:\n• Emotional impact:\n• Thematic connection:\n• Overall atmospheric enhancement:',
          space_for_answers: true
        }
      ],
      footer: 'Remember: Powerful similes create immediate emotional responses and memorable mental images.'
    }
  }
];

export const getStudentActivityByLessonAndPhase = (lessonNumber: number, phase: 'starter' | 'main' | 'plenary'): StudentActivity | null => {
  return dystopianStudentActivities.find(activity => 
    activity.lessonNumber === lessonNumber && activity.phase === phase
  ) || null;
};