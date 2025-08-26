import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { default as QuickFireDiscussionTemplate } from '../../components/templates/QuickFireDiscussionTemplate';
import { StudentActivityModal } from '../../components/StudentActivityModal';

export default function ThinkPairShareTwistPage() {
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

  // Get theme-adaptable discussion content
  const getDiscussionContent = () => {
    const theme = currentTheme;
    
    if (theme === 'Dystopian Fiction') {
      return {
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
        ]
      };
    } else if (theme === 'Creative Writing') {
      return {
        visual_stimulus: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80',
        discussion_questions: [
          'Should creative writing follow traditional rules or break them?',
          'How do personal experiences influence creative expression?',
          'What role does imagination play versus reality in storytelling?',
          'How can writers balance originality with accessibility?'
        ],
        think_pair_share_prompts: [
          'Identify one creative writing principle you both AGREE on',
          'Find one area where your creative approaches DISAGREE',
          'Share your consensus and conflict about creative expression',
          'Explain how both traditional and innovative approaches have value'
        ]
      };
    } else if (theme === 'War Poetry') {
      return {
        visual_stimulus: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&q=80',
        discussion_questions: [
          'Should poetry about war focus on heroism or horror?',
          'How do different perspectives on conflict shape poetry?',
          'What responsibility do war poets have to historical accuracy?',
          'How can poetry help us understand experiences we haven\'t lived?'
        ],
        think_pair_share_prompts: [
          'Agree on one purpose that war poetry should serve',
          'Disagree on how graphic or realistic war poetry should be',
          'Present your shared purpose and your disagreement to the class',
          'Discuss how different approaches to war poetry serve different needs'
        ]
      };
    } else if (theme === 'Shakespeare') {
      return {
        visual_stimulus: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
        discussion_questions: [
          'Should Shakespeare be taught in modern English or original text?',
          'How relevant are Shakespeare\'s themes to contemporary life?',
          'What makes Shakespeare\'s work endure across centuries?',
          'How should we balance historical context with modern interpretation?'
        ],
        think_pair_share_prompts: [
          'Find one aspect of Shakespeare you both AGREE is valuable',
          'Identify one area where you DISAGREE about teaching approach',
          'Share your agreement about Shakespeare\'s value and your teaching disagreement',
          'Explore how different approaches to Shakespeare serve different learning goals'
        ]
      };
    } else if (theme === 'Energy Transfer' || theme === 'Forces and Motion') {
      return {
        visual_stimulus: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80',
        discussion_questions: [
          'Should we prioritize renewable energy even if it costs more?',
          'How do we balance energy efficiency with convenience?',
          'What role should individuals play versus governments in energy conservation?',
          'How do we weigh immediate needs against long-term sustainability?'
        ],
        think_pair_share_prompts: [
          'Agree on one energy principle that should guide decisions',
          'Disagree on how to balance cost versus environmental impact',
          'Present your shared principle and your disagreement about priorities',
          'Discuss how different energy perspectives reflect different values'
        ]
      };
    } else if (theme === 'Industrial Revolution' || theme === 'World War I' || theme === 'World War II') {
      return {
        visual_stimulus: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80',
        discussion_questions: [
          'Can historical progress justify human suffering?',
          'How do we judge past actions by modern standards?',
          'What factors determine how history is remembered?',
          'How should we balance multiple historical perspectives?'
        ],
        think_pair_share_prompts: [
          'Agree on one factor that shapes historical perspective',
          'Disagree on how much we should judge the past by present values',
          'Share your consensus about perspective and your disagreement about judgment',
          'Explore how different historical viewpoints enrich understanding'
        ]
      };
    } else if (theme === 'Science' || lessonData.subject === 'Science') {
      return {
        visual_stimulus: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80',
        discussion_questions: [
          'Should scientific research have ethical limits?',
          'How do we balance scientific progress with safety?',
          'What role should public opinion play in research decisions?',
          'How do we weigh potential benefits against risks?'
        ],
        think_pair_share_prompts: [
          'Find one ethical principle you and your partner AGREE on',
          'Identify one area where you and your partner DISAGREE',
          'Present your shared principle and your disagreement to the class',
          'Explain why both consensus and conflict are valuable in science'
        ]
      };
    } else if (theme === 'History' || lessonData.subject === 'History') {
      return {
        visual_stimulus: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80',
        discussion_questions: [
          'Can historical events be viewed objectively?',
          'How do different perspectives shape historical understanding?',
          'What factors influence how history is recorded?',
          'How should we handle conflicting historical accounts?'
        ],
        think_pair_share_prompts: [
          'Agree on one factor that influences historical perspective',
          'Disagree on how much objectivity is possible in history',
          'Share your consensus and disagreement with the class',
          'Discuss how multiple perspectives enrich historical understanding'
        ]
      };
    } else if (theme === 'Mathematics' || lessonData.subject === 'Mathematics') {
      return {
        visual_stimulus: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80',
        discussion_questions: [
          'Is mathematics discovered or invented?',
          'How do cultural differences affect mathematical thinking?',
          'What role does intuition play in mathematical understanding?',
          'How do mathematical concepts relate to the real world?'
        ],
        think_pair_share_prompts: [
          'Agree on one way mathematics connects to the real world',
          'Disagree on whether math is discovered or invented',
          'Present your shared connection and your disagreement',
          'Explore how different views of math affect learning'
        ]
      };
    } else {
      return {
        visual_stimulus: 'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?auto=format&fit=crop&q=80',
        discussion_questions: [
          'How do different perspectives shape our understanding of truth?',
          'What factors influence how we form opinions?',
          'How can disagreement lead to better understanding?',
          'What makes dialogue more effective than debate?'
        ],
        think_pair_share_prompts: [
          'Identify one factor you both agree influences perspective',
          'Find one area where your thinking differs',
          'Share your agreement and disagreement with the class',
          'Reflect on how both consensus and conflict deepen understanding'
        ]
      };
    }
  };

  const discussionContent = getDiscussionContent();

  const templateLessonData = {
    title: "Think-Pair-Share with a Twist",
    learning_objective: "Students think individually, discuss with a partner, then identify one agreement and one disagreement before sharing with the class",
    activity_type: "Enhanced Think-Pair-Share",
    visual_stimulus: discussionContent.visual_stimulus,
    discussion_questions: discussionContent.discussion_questions,
    think_pair_share_prompts: discussionContent.think_pair_share_prompts,
    theme: lessonData.theme
  };

  const navigationData = {
    previousRoute: '/',
    nextRoute: '/admin/lesson-library'
  };

  return (
    <>
      <QuickFireDiscussionTemplate
        lessonData={templateLessonData}
        navigationData={navigationData}
        onShowStudentActivity={() => setShowStudentActivity(true)}
      />
      {showStudentActivity && (
        <StudentActivityModal
          activity={{
            id: 'think-pair-share-twist-student',
            lessonNumber: 1,
            title: 'Think-Pair-Share with a Twist',
            description: 'Individual thinking, partner discussion, then identify agreements and disagreements',
            phase: 'starter',
            duration: '10 mins',
            type: 'discussion',
            subject: lessonData.subject,
            year_group: lessonData.yearGroup,
            learning_objective: 'Students think individually, discuss with a partner, then identify one agreement and one disagreement before sharing with the class',
            instructions: [
              'Think individually about the discussion topic for 3 minutes',
              'Discuss your thoughts with a partner for 4 minutes',
              'Identify one point you agree on and one you disagree about',
              'Share your agreement and disagreement with the class'
            ],
            tasks: [
              {
                id: 'individual-thinking',
                title: 'Individual Thinking (3 minutes)',
                description: 'Write your initial thoughts about the discussion topic',
                type: 'text_input',
                guidance: 'Consider multiple angles and write down your honest reactions'
              },
              {
                id: 'pair-agreement',
                title: 'Pair Agreement',
                description: 'What did you and your partner agree on?',
                type: 'text_input',
                guidance: 'Find common ground in your discussion'
              },
              {
                id: 'pair-disagreement',
                title: 'Pair Disagreement', 
                description: 'Where did you and your partner disagree?',
                type: 'text_input',
                guidance: 'Identify where your perspectives differed'
              }
            ],
            success_criteria: [
              'Engage thoughtfully in individual reflection',
              'Listen actively and discuss respectfully with partner',
              'Identify clear points of agreement and disagreement',
              'Share insights that contribute to class understanding'
            ],
            differentiation: {
              support: [
                'Provide sentence starters for less confident speakers',
                'Offer visual prompts to support thinking',
                'Allow written responses for students who prefer not to speak'
              ],
              extension: [
                'Ask students to identify underlying assumptions',
                'Encourage exploration of why disagreements occur',
                'Challenge students to find compromise positions'
              ]
            },
            assessment_rubric: [
              {
                level: 'Secure',
                descriptors: [
                  'Thoughtful individual reflection with clear reasoning',
                  'Active and respectful partner engagement',
                  'Clear identification of agreement and disagreement points'
                ]
              },
              {
                level: 'Developing',
                descriptors: [
                  'Some individual reflection with basic reasoning',
                  'Participates in partner discussion',
                  'Identifies some points of agreement or disagreement'
                ]
              }
            ],
            pdf_content: {
              header: 'Think-Pair-Share with a Twist',
              instructions: [
                'Think individually about the discussion topic for 3 minutes',
                'Discuss your thoughts with a partner for 4 minutes',
                'Identify one point you agree on and one you disagree about',
                'Share your agreement and disagreement with the class'
              ],
              worksheet_sections: [
                {
                  title: 'Individual Thinking (3 minutes)',
                  content: 'Write your initial thoughts about the discussion topic. Consider multiple angles and perspectives.',
                  space_for_answers: true
                },
                {
                  title: 'Pair Discussion - Agreement',
                  content: 'What did you and your partner agree on? Write down your shared perspective.',
                  space_for_answers: true
                },
                {
                  title: 'Pair Discussion - Disagreement',
                  content: 'Where did you and your partner disagree? Describe the different viewpoints.',
                  space_for_answers: true
                }
              ],
              footer: 'Remember: Disagreement leads to deeper understanding!'
            }
          }}
          onClose={() => setShowStudentActivity(false)}
        />
      )}
    </>
  );
}