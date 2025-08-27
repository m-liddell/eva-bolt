import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { default as QuickFireDiscussionTemplate } from '../../components/templates/QuickFireDiscussionTemplate';
import { StudentActivityModal } from '../../components/StudentActivityModal';

export default function QuickDiscussionCarouselPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showStudentActivity, setShowStudentActivity] = useState(false);

  // Extract lesson data from location state if available
  const lessonData = {
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
          'What elements make a society feel oppressive or controlling?',
          'How do surveillance systems change human behavior?',
          'What role does technology play in modern control?',
          'How can fiction help us understand real-world issues?'
        ],
        think_pair_share_prompts: [
          'Station 1: Analyze surveillance and control mechanisms',
          'Station 2: Explore environmental and social decay',
          'Station 3: Examine resistance and hope themes',
          'Station 4: Connect dystopian fiction to current events'
        ]
      };
    } else if (theme === 'Creative Writing') {
      return {
        visual_stimulus: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80',
        discussion_questions: [
          'What inspires creativity and original thinking?',
          'How do personal experiences shape our writing?',
          'What makes a story memorable and engaging?',
          'How can writers connect with their audience?'
        ],
        think_pair_share_prompts: [
          'Station 1: Explore sources of creative inspiration',
          'Station 2: Discuss personal experience in writing',
          'Station 3: Analyze memorable story elements',
          'Station 4: Examine writer-reader connections'
        ]
      };
    } else if (theme === 'War Poetry') {
      return {
        visual_stimulus: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?auto=format&fit=crop&q=80',
        discussion_questions: [
          'How does poetry capture experiences we haven\'t lived?',
          'What responsibility do poets have to historical truth?',
          'How do different perspectives on conflict shape poetry?',
          'What makes war poetry powerful and lasting?'
        ],
        think_pair_share_prompts: [
          'Station 1: Explore poetry\'s power to convey experience',
          'Station 2: Discuss historical accuracy in creative work',
          'Station 3: Analyze different conflict perspectives',
          'Station 4: Examine what makes poetry endure'
        ]
      };
    } else if (theme === 'Shakespeare') {
      return {
        visual_stimulus: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
        discussion_questions: [
          'What makes Shakespeare\'s work relevant across centuries?',
          'How do we balance historical context with modern interpretation?',
          'What themes in Shakespeare connect to contemporary life?',
          'How should classic literature be taught today?'
        ],
        think_pair_share_prompts: [
          'Station 1: Explore Shakespeare\'s enduring relevance',
          'Station 2: Discuss historical vs modern interpretation',
          'Station 3: Analyze contemporary connections',
          'Station 4: Examine teaching approaches for classics'
        ]
      };
    } else if (theme === 'Energy Transfer' || theme === 'Forces and Motion') {
      return {
        visual_stimulus: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80',
        discussion_questions: [
          'How do we see energy transfer in everyday life?',
          'What factors affect energy efficiency?',
          'How can we predict energy outcomes?',
          'What real-world applications use energy principles?'
        ],
        think_pair_share_prompts: [
          'Station 1: Identify everyday energy transfer examples',
          'Station 2: Explore factors affecting efficiency',
          'Station 3: Discuss prediction methods',
          'Station 4: Examine real-world applications'
        ]
      };
    } else if (theme === 'Industrial Revolution' || theme === 'World War I' || theme === 'World War II') {
      return {
        visual_stimulus: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80',
        discussion_questions: [
          'How do different groups experience historical change?',
          'What factors shape how history is remembered?',
          'How can we understand multiple historical perspectives?',
          'What lessons from history apply to today?'
        ],
        think_pair_share_prompts: [
          'Station 1: Explore different group experiences',
          'Station 2: Discuss factors shaping historical memory',
          'Station 3: Analyze multiple perspectives',
          'Station 4: Connect historical lessons to present'
        ]
      };
    } else if (theme === 'Science' || lessonData.subject === 'Science') {
      return {
        visual_stimulus: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80',
        discussion_questions: [
          'How do scientific discoveries change our understanding?',
          'What ethical considerations guide scientific research?',
          'How do we balance innovation with safety?',
          'What role does collaboration play in science?'
        ],
        think_pair_share_prompts: [
          'Station 1: Explore how discoveries change understanding',
          'Station 2: Discuss ethical considerations in research',
          'Station 3: Analyze innovation vs safety balance',
          'Station 4: Examine collaboration in scientific progress'
        ]
      };
    } else if (theme === 'History' || lessonData.subject === 'History') {
      return {
        visual_stimulus: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&q=80',
        discussion_questions: [
          'How do different sources shape historical understanding?',
          'What challenges do historians face in interpreting evidence?',
          'How do contemporary events influence historical perspective?',
          'What makes historical analysis reliable and valid?'
        ],
        think_pair_share_prompts: [
          'Station 1: Explore how sources shape understanding',
          'Station 2: Discuss challenges in evidence interpretation',
          'Station 3: Analyze contemporary influence on perspective',
          'Station 4: Examine reliability in historical analysis'
        ]
      };
    } else if (theme === 'Mathematics' || lessonData.subject === 'Mathematics') {
      return {
        visual_stimulus: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80',
        discussion_questions: [
          'How do mathematical patterns appear in nature and art?',
          'What role does problem-solving play in mathematics?',
          'How do mathematical concepts connect to real-world applications?',
          'What makes mathematical thinking unique and valuable?'
        ],
        think_pair_share_prompts: [
          'Station 1: Explore patterns in nature and art',
          'Station 2: Discuss problem-solving approaches',
          'Station 3: Analyze real-world mathematical connections',
          'Station 4: Examine mathematical thinking processes'
        ]
      };
    } else {
      return {
        visual_stimulus: 'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?auto=format&fit=crop&q=80',
        discussion_questions: [
          'How do different perspectives shape our understanding?',
          'What factors influence how we form opinions?',
          'How can collaborative discussion deepen learning?',
          'What makes dialogue more effective than individual thinking?'
        ],
        think_pair_share_prompts: [
          'Station 1: Explore how perspectives shape understanding',
          'Station 2: Discuss factors influencing opinion formation',
          'Station 3: Analyze benefits of collaborative discussion',
          'Station 4: Examine effective dialogue techniques'
        ]
      };
    }
  };

  const discussionContent = getDiscussionContent();

  const templateLessonData = {
    title: "Quick Discussion Carousel",
    learning_objective: "Students rotate through discussion stations, building understanding through multiple perspectives and collaborative exploration",
    activity_type: "Discussion Carousel",
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
            id: 'quick-discussion-carousel-student',
            lessonNumber: 1,
            title: 'Quick Discussion Carousel',
            description: 'Rotate through discussion stations building collaborative understanding',
            phase: 'starter',
            duration: '10 mins',
            type: 'discussion',
            subject: lessonData.subject,
            year_group: lessonData.yearGroup,
            learning_objective: 'Students rotate through discussion stations, building understanding through multiple perspectives and collaborative exploration',
            instructions: [
              'Work in small groups of 3-4 students',
              'Spend 2-3 minutes at each discussion station',
              'Build on ideas left by previous groups',
              'Add your own insights and perspectives',
              'Prepare to share discoveries with the class'
            ],
            tasks: [
              {
                id: 'station-1',
                title: 'Station 1 Contributions',
                description: 'What insights did you add at the first station?',
                type: 'text_input',
                guidance: 'Build on previous ideas and add new perspectives'
              },
              {
                id: 'station-2',
                title: 'Station 2 Contributions',
                description: 'What insights did you add at the second station?',
                type: 'text_input',
                guidance: 'Connect ideas and develop deeper understanding'
              },
              {
                id: 'station-3',
                title: 'Station 3 Contributions',
                description: 'What insights did you add at the third station?',
                type: 'text_input',
                guidance: 'Synthesize learning and prepare for sharing'
              },
              {
                id: 'best-discovery',
                title: 'Best Discovery',
                description: 'What was your most interesting discovery from the carousel?',
                type: 'reflection',
                guidance: 'Reflect on what surprised or interested you most'
              }
            ],
            success_criteria: [
              'Contribute meaningfully at each discussion station',
              'Build constructively on previous groups\' ideas',
              'Engage actively in collaborative exploration',
              'Share insights that connect to lesson objectives'
            ],
            differentiation: {
              support: [
                'Provide question scaffolds for less confident students',
                'Use visual prompts at stations to support thinking',
                'Allow written contributions for students who prefer not to speak'
              ],
              extension: [
                'Ask students to identify connections between stations',
                'Encourage synthesis of ideas across different perspectives',
                'Challenge students to pose new questions for future exploration'
              ]
            },
            assessment_rubric: [
              {
                level: 'Secure',
                descriptors: [
                  'Meaningful contributions at all stations',
                  'Builds effectively on others\' ideas',
                  'Shows collaborative leadership and engagement'
                ]
              },
              {
                level: 'Developing',
                descriptors: [
                  'Some contributions at most stations',
                  'Attempts to build on others\' ideas',
                  'Participates in collaborative activities'
                ]
              }
            ],
            pdf_content: {
              header: 'Quick Discussion Carousel',
              instructions: [
                'Work in small groups of 3-4 students',
                'Spend 2-3 minutes at each discussion station',
                'Build on ideas left by previous groups',
                'Add your own insights and perspectives',
                'Prepare to share discoveries with the class'
              ],
              worksheet_sections: [
                {
                  title: 'Station 1 Contributions',
                  content: 'What insights did you add at the first discussion station? Build on previous ideas and add new perspectives.',
                  space_for_answers: true
                },
                {
                  title: 'Station 2 Contributions',
                  content: 'What insights did you add at the second discussion station? Connect ideas and develop deeper understanding.',
                  space_for_answers: true
                },
                {
                  title: 'Station 3 Contributions',
                  content: 'What insights did you add at the third discussion station? Synthesize learning and prepare for sharing.',
                  space_for_answers: true
                },
                {
                  title: 'Best Discovery',
                  content: 'What was your most interesting discovery from the carousel? Reflect on what surprised or interested you most.',
                  space_for_answers: true
                }
              ],
              footer: 'Collaboration builds understanding!'
            }
          }}
          onClose={() => setShowStudentActivity(false)}
        />
      )}
    </>
  );
}