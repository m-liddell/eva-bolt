// Enhanced lesson activities following the comprehensive schema
import { allDystopianActivities } from './dystopianUnit';

export interface EnhancedLessonActivity {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'discussion' | 'individual' | 'group' | 'whole-class';
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

// Dialogic teaching starter activities
export const dialogicStarterActivities: EnhancedLessonActivity[] = [
  {
    id: 'think-pair-share-twist',
    title: 'Think-Pair-Share with a Twist',
    description: 'Students think individually, discuss with a partner, then identify one agreement and one disagreement before sharing with the class',
    duration: '10 mins',
    type: 'discussion',
    activity_type: 'starter',
    subject: 'English',
    year_group: 'All Years',
    dialogic_structure: 'Think-Pair-Share',
    created_at: new Date().toISOString(),
    keywords: ['critical thinking', 'dialogue', 'collaboration', 'perspective', 'reasoning'],
    phase: 'Dialogic Foundation',
    unit_context: {
      title: 'Dialogic Teaching Strategies',
      overview: 'Flexible starter activities that promote extended student talk, collaborative reasoning, and critical thinking across all subjects and themes.',
      themes: [
        'Critical thinking development',
        'Collaborative reasoning',
        'Multiple perspective exploration',
        'Extended student dialogue',
        'Inquiry-based learning',
        'Creative Writing',
        'Dystopian Fiction',
        'War Poetry',
        'Shakespeare',
        'Modern Literature',
        'Travel Writing',
        'Myths and Legends', 
        'Victorian Literature',
        'Energy Transfer',
        'Forces and Motion',
        'Chemical Reactions',
        'Industrial Revolution'
      ]
    },
    details: {
      preparation: [
        'Prepare a thought-provoking question related to your lesson topic',
        'Ensure students understand the three-phase structure',
        'Have a method ready to collect agreements and disagreements',
        'Plan how to facilitate the sharing phase effectively'
      ],
      steps: [
        'Present a thought-provoking question or scenario related to your lesson topic',
        '**Phase 1 - Think (3 minutes):**',
        '• Students reflect individually and write down their initial thoughts',
        '• Encourage them to consider multiple angles',
        '**Phase 2 - Pair (4 minutes):**',
        '• Students discuss their ideas with a partner',
        '• They must identify: 1 point they AGREE on, 1 point they DISAGREE about',
        '**Phase 3 - Share (3 minutes):**',
        '• Pairs share their agreement and disagreement with the class',
        '• Focus on the reasoning behind both consensus and conflict'
      ],
      tips: [
        'Choose questions that genuinely have multiple valid perspectives',
        'Encourage students to explain their reasoning, not just state opinions',
        'Use disagreements as learning opportunities, not conflicts',
        'Model respectful dialogue and active listening'
      ],
      differentiation: [
        'Provide sentence starters for less confident speakers',
        'Offer visual prompts or images to support thinking',
        'Allow written responses for students who prefer not to speak',
        'Provide more complex scenarios for advanced students'
      ],
      assessment: [
        'Monitor quality of individual thinking and preparation',
        'Assess ability to engage in respectful dialogue',
        'Evaluate reasoning skills and evidence use',
        'Track development of listening and response skills'
      ],
      success_criteria: [
        'Engage thoughtfully with the topic during individual thinking time',
        'Participate actively and respectfully in pair discussions',
        'Identify clear points of agreement and disagreement',
        'Share reasoning behind their conclusions with the class'
      ],
      answers: {
        'How do I facilitate the disagreement discussion?': 'Frame disagreements as different perspectives rather than right/wrong. Ask students to explain their reasoning and find the underlying values or assumptions that lead to different conclusions.',
        'What if students can\'t find any disagreements?': 'This often means the question needs more complexity. Try adding a scenario with competing priorities or ask them to consider different stakeholder perspectives.',
        'How do I keep the sharing phase focused?': 'Set clear time limits, ask for specific examples of agreements/disagreements, and use follow-up questions to deepen the discussion rather than just collecting responses.',
        'What makes a good Think-Pair-Share question?': 'The best questions are open-ended, connect to students\' experiences, have multiple valid perspectives, and relate clearly to your lesson objectives.'
      }
    }
  },
  {
    id: 'two-minute-perspective-challenge',
    title: 'Two Minute Perspective Challenge',
    description: 'Students defend assigned perspectives for exactly two minutes, developing rapid argumentation and critical thinking skills',
    duration: '10 mins',
    type: 'discussion',
    activity_type: 'starter',
    subject: 'English',
    year_group: 'All Years',
    dialogic_structure: 'Debate',
    created_at: new Date().toISOString(),
    keywords: ['debate', 'perspective', 'argumentation', 'critical thinking', 'rapid response'],
    phase: 'Dialogic Foundation',
    unit_context: {
      title: 'Dialogic Teaching Strategies',
      overview: 'Flexible starter activities that promote extended student talk, collaborative reasoning, and critical thinking across all subjects and themes.',
      themes: [
        'Critical thinking development',
        'Collaborative reasoning',
        'Multiple perspective exploration',
        'Extended student dialogue',
        'Inquiry-based learning',
        'Creative Writing',
        'Dystopian Fiction',
        'War Poetry',
        'Shakespeare',
        'Modern Literature',
        'Travel Writing',
        'Myths and Legends', 
        'Victorian Literature',
        'Energy Transfer',
        'Forces and Motion',
        'Chemical Reactions',
        'Industrial Revolution',
        'World War I',
        'World War II',
        'Mathematics',
        'Science',
        'History',
        'Geography',
        'Modern Languages',
        'Art',
        'Music',
        'Physical Education',
        'Computing'
      ]
    },
    details: {
      preparation: [
        'Prepare controversial or debatable statements related to your theme',
        'Ensure students understand the two-minute time limit',
        'Have a timer ready and visible to all students',
        'Plan how to assign perspectives fairly and randomly'
      ],
      steps: [
        'Present a controversial statement or scenario related to your lesson theme',
        '**Phase 1 - Position Assignment (1 minute):**',
        '• Randomly assign students to argue FOR or AGAINST the statement',
        '• Students may be assigned positions they personally disagree with',
        '**Phase 2 - Rapid Preparation (2 minutes):**',
        '• Students quickly gather arguments for their assigned position',
        '• Encourage use of evidence, examples, and logical reasoning',
        '**Phase 3 - Timed Arguments (7 minutes):**',
        '• Students present exactly 2-minute arguments for their position',
        '• No interruptions during presentations',
        '• Class evaluates strength of arguments regardless of personal agreement'
      ],
      tips: [
        'Choose statements that have legitimate arguments on both sides',
        'Emphasize that students are practicing argumentation skills, not expressing personal beliefs',
        'Keep strict time limits to maintain energy and focus',
        'Celebrate strong arguments regardless of the position taken'
      ],
      differentiation: [
        'Provide argument structure templates for less confident speakers',
        'Allow students to present in pairs if individual presentation is too challenging',
        'Offer key vocabulary or evidence cards to support arguments',
        'Give advanced students more complex or nuanced statements to defend'
      ],
      assessment: [
        'Monitor quality of evidence and reasoning used',
        'Assess ability to structure arguments within time constraints',
        'Evaluate listening skills and respectful engagement',
        'Track development of critical thinking and presentation skills'
      ],
      success_criteria: [
        'Present clear, well-structured arguments within the time limit',
        'Use relevant evidence and examples to support assigned position',
        'Demonstrate respectful listening during others\' presentations',
        'Evaluate arguments based on quality rather than personal agreement'
      ],
      answers: {
        'How do I choose good debate statements?': 'Select statements that connect to your theme, have valid arguments on both sides, are age-appropriate, and encourage critical thinking rather than personal attacks.',
        'What if students refuse to argue a position they disagree with?': 'Explain that this develops critical thinking skills and empathy. In real life, we often need to understand perspectives we don\'t share.',
        'How do I keep arguments respectful?': 'Set clear ground rules about attacking ideas not people, require evidence-based arguments, and model respectful disagreement yourself.',
        'What makes a strong 2-minute argument?': 'Clear opening statement, 2-3 key points with evidence, brief acknowledgment of counterarguments, and strong conclusion that reinforces the position.'
      }
    }
  },
  {
    id: 'press-conference-simulation',
    title: 'Press Conference Simulation',
    description: 'Students role-play as journalists and experts in a press conference format, developing questioning and response skills',
    duration: '10 mins',
    type: 'discussion',
    activity_type: 'starter',
    subject: 'English',
    year_group: 'All Years',
    dialogic_structure: 'Role Play',
    created_at: new Date().toISOString(),
    keywords: ['role play', 'questioning', 'expertise', 'media literacy', 'communication'],
    phase: 'Dialogic Foundation',
    unit_context: {
      title: 'Dialogic Teaching Strategies',
      overview: 'Flexible starter activities that promote extended student talk, collaborative reasoning, and critical thinking across all subjects and themes.',
      themes: [
        'Critical thinking development',
        'Collaborative reasoning',
        'Multiple perspective exploration',
        'Extended student dialogue',
        'Inquiry-based learning',
        'Creative Writing',
        'Dystopian Fiction',
        'War Poetry',
        'Shakespeare',
        'Modern Literature',
        'Travel Writing',
        'Myths and Legends', 
        'Victorian Literature',
        'Energy Transfer',
        'Forces and Motion',
        'Chemical Reactions',
        'Industrial Revolution',
        'World War I',
        'World War II',
        'Mathematics',
        'Science',
        'History',
        'Geography',
        'Modern Languages',
        'Art',
        'Music',
        'Physical Education',
        'Computing'
      ]
    },
    details: {
      preparation: [
        'Prepare expert roles related to your lesson theme',
        'Brief students on press conference etiquette and procedures',
        'Have background information ready for expert roles',
        'Plan how to facilitate questions and manage time'
      ],
      steps: [
        'Set up a press conference scenario related to your lesson theme',
        '**Phase 1 - Role Assignment (2 minutes):**',
        '• Assign 2-3 students as experts in theme-related fields',
        '• Remaining students become journalists with specific beats',
        '• Provide brief background information for each role',
        '**Phase 2 - Press Conference (6 minutes):**',
        '• Experts sit at front as panel',
        '• Journalists ask questions related to the theme',
        '• Experts respond based on their assigned expertise',
        '**Phase 3 - Debrief (2 minutes):**',
        '• Discuss what was learned about the theme',
        '• Reflect on different perspectives revealed'
      ],
      tips: [
        'Choose expert roles that offer different perspectives on your theme',
        'Encourage journalists to ask follow-up questions',
        'Help experts stay in character while providing thoughtful responses',
        'Use the format to introduce key concepts for your main lesson'
      ],
      differentiation: [
        'Provide question prompts for less confident journalists',
        'Give expert role cards with key information and talking points',
        'Allow students to work in pairs for expert roles if needed',
        'Offer extension questions for advanced students'
      ],
      assessment: [
        'Monitor quality and relevance of questions asked',
        'Assess ability to maintain role and provide thoughtful responses',
        'Evaluate listening skills and follow-up questioning',
        'Track development of communication and critical thinking skills'
      ],
      success_criteria: [
        'Ask relevant, well-structured questions as journalists',
        'Provide thoughtful, role-appropriate responses as experts',
        'Demonstrate active listening and build on others\' contributions',
        'Engage respectfully with different perspectives and viewpoints'
      ],
      answers: {
        'How do I choose good expert roles?': 'Select roles that offer different perspectives on your theme and connect to your lesson objectives. For Creative Writing: author, editor, reader. For Science: researcher, engineer, ethicist.',
        'What if experts don\'t know how to answer?': 'Provide role cards with key information, encourage them to think from their character\'s perspective, and allow them to say "I\'ll need to research that" like real experts do.',
        'How do I keep questions focused?': 'Brief journalists on their specific beats (politics, environment, social issues) and provide question starters related to your theme.',
        'What makes a good press conference question?': 'Good questions are specific, well-researched, seek to uncover information, and help the audience understand the topic better.'
      }
    }
  }
];

// Socratic Circle plenary activities
export const socraticCircleActivities: EnhancedLessonActivity[] = [
  {
    id: 'socratic-circle-reflection',
    title: 'Socratic Circle Reflection',
    description: 'Students engage in structured dialogue to deepen understanding through questioning, active listening, and collaborative reflection',
    duration: '10 mins',
    type: 'discussion',
    activity_type: 'plenary',
    subject: 'English',
    year_group: 'All Years',
    dialogic_structure: 'Socratic Dialogue',
    created_at: new Date().toISOString(),
    keywords: ['socratic dialogue', 'reflection', 'collaborative discussion', 'active listening', 'critical thinking'],
    phase: 'Dialogic Foundation',
    unit_context: {
      title: 'Dialogic Teaching Strategies',
      overview: 'Flexible plenary activities that promote deep reflection, collaborative knowledge building, and critical thinking across all subjects and themes.',
      themes: [
        'Critical thinking development',
        'Collaborative reasoning',
        'Multiple perspective exploration',
        'Extended student dialogue',
        'Inquiry-based learning',
        'Creative Writing',
        'Dystopian Fiction',
        'War Poetry',
        'Shakespeare',
        'Modern Literature',
        'Travel Writing',
        'Myths and Legends', 
        'Victorian Literature',
        'Energy Transfer',
        'Forces and Motion',
        'Chemical Reactions',
        'Industrial Revolution',
        'World War I',
        'World War II',
        'Mathematics',
        'Science',
        'History',
        'Geography',
        'Modern Languages',
        'Art',
        'Music',
        'Physical Education',
        'Computing'
      ]
    },
    details: {
      preparation: [
        'Arrange classroom with concentric circles of chairs',
        'Prepare reflection questions related to lesson content',
        'Brief students on Socratic dialogue principles',
        'Plan timing for role switches and discussion phases'
      ],
      steps: [
        'Arrange students in concentric circles with inner circle for discussion and outer circle for observation',
        '**Round 1 - Inner Circle Discussion (4 minutes):**',
        '• Inner circle students discuss key insights from the lesson',
        '• Outer circle students observe and take notes on discussion patterns',
        '• Focus on building understanding through questioning and dialogue',
        '**Role Switch (1 minute):**',
        '• Students switch positions: inner circle moves to outer, outer moves to inner',
        '• Brief transition time to settle into new roles',
        '**Round 2 - New Inner Circle Discussion (4 minutes):**',
        '• New inner circle continues discussion, building on previous insights',
        '• New outer circle observes different discussion dynamics',
        '**Synthesis (1 minute):**',
        '• Whole class reflects on insights gained from both discussion and observation'
      ],
      tips: [
        'Model Socratic questioning techniques before beginning',
        'Encourage students to build on each other\'s ideas rather than just sharing their own',
        'Use open-ended questions that promote deeper thinking',
        'Help students see the value of both speaking and listening roles'
      ],
      differentiation: [
        'Provide question prompts for less confident discussers',
        'Offer observation frameworks for students who struggle with note-taking',
        'Allow students to pass if they need thinking time',
        'Provide sentence starters for building on others\' ideas'
      ],
      assessment: [
        'Monitor quality of questions asked and responses given',
        'Assess ability to build on others\' contributions',
        'Evaluate active listening skills during observation rounds',
        'Track development of collaborative dialogue skills'
      ],
      success_criteria: [
        'Engage thoughtfully in Socratic dialogue when in inner circle',
        'Observe actively and take meaningful notes when in outer circle',
        'Build respectfully on others\' ideas and insights',
        'Demonstrate understanding through questioning and reflection'
      ],
      answers: {
        'How do I facilitate effective Socratic dialogue?': 'Ask open-ended questions, encourage students to question each other\'s ideas respectfully, and help them build on previous contributions rather than just stating opinions.',
        'What should outer circle students focus on?': 'They should observe how ideas develop, note effective discussion techniques, listen for insights they want to build on, and prepare thoughtful contributions for their turn.',
        'How do I keep the discussion focused?': 'Provide clear reflection questions, gently redirect when discussion strays, and remind students to connect their ideas to the lesson\'s key concepts.',
        'What makes a good Socratic question?': 'Good questions are open-ended, build on previous responses, encourage deeper thinking, and help students examine their assumptions and reasoning.'
      }
    }
  }
];

// All enhanced activities combined
export const allEnhancedActivities = [
  ...dialogicStarterActivities,
  ...socraticCircleActivities
];