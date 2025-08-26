import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Brain, BookOpen, CheckCircle2 } from 'lucide-react';
import { default as QuickFireDiscussionTemplate } from '../../components/templates/QuickFireDiscussionTemplate';
import { StudentActivityModal } from '../../components/StudentActivityModal';
import { getStudentActivityByLessonAndPhase } from '../../data/studentActivities';

export default function DystopianLesson3Starter() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showStudentActivity, setShowStudentActivity] = useState(false);

  const lessonData = {
    title: "Simple vs Compound Sentence Power",
    learning_objective: "I can compare simple and compound sentences to understand their different impacts in dystopian writing",
    activity_type: "Sentence Variety Analysis",
    visual_stimulus: "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&q=80",
    discussion_questions: [
      "What's the difference between simple and compound sentences?",
      "When should you use simple sentences in dystopian writing?",
      "When are compound sentences more effective?",
      "How does sentence variety affect reader engagement?"
    ],
    think_pair_share_prompts: [
      "Compare the impact of simple versus compound sentence examples",
      "Discuss when each sentence type is most effective",
      "Share your analysis of how sentence variety creates engagement",
      "Explain which sentence structure works best for different dystopian effects"
    ],
    theme: "Dystopian Fiction"
  };

  const navigationData = {
    previousRoute: '/lesson/dystopian-lesson-2/plenary',
    nextRoute: '/lesson/dystopian-lesson-3/main'
  };

  const studentActivity = getStudentActivityByLessonAndPhase('dystopian-lesson-3', 'starter');

}