import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LessonLayout } from '../../components/LessonLayout';
import { NavigationArrow } from '../../components/NavigationArrow';
import { MidAssistant } from '../../components/MidAssistant';

export default function LessonPage() {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(75, 85, 99, 0.95) 0%,
            rgba(255, 255, 255, 0.95) 15%,
            rgba(255, 255, 255, 0.95) 85%,
            rgba(75, 85, 99, 0.95) 100%
          ),
          url('https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&q=80')
        `,
        backgroundBlendMode: 'overlay'
      }}
    >
      <LessonLayout 
        lessonPhase="Starter"
        exampleText="Sea of Stories"
      >
        <div className="max-w-[1186px] mx-auto px-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Learning Objective */}
            <div className="mb-4 flex items-center justify-between">
              <div>
                <span className="text-[#FFB800] font-medium">Learning Objective:</span>
                <span className="ml-2 font-bold">Write an engaging story opening that builds tension through atmosphere and control</span>
              </div>
              <MidAssistant context={{ topic: 'literature' }} />
            </div>

            {/* Introduction */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg border border-gray-200">
              <p className="text-base text-gray-800">
                "💡 Like a ship setting sail into uncharted waters, we'll embark on a journey of storytelling. 
                In this ocean of narratives, we'll explore how to create openings that pull readers into the 
                depths of our tales. Think of yourself as a navigator, charting a course through the waves 
                of imagination to discover new literary horizons."
              </p>
            </div>

            <div className="space-y-6">
              {/* Think-Pair-Share */}
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-xl">👥</span>
                  <h3 className="text-lg font-semibold">Think-Pair-Share:</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <span className="text-[#FFB800]">•</span>
                    <span className="text-gray-900">What mysteries lie beneath the surface of your story?</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-[#FFB800]">•</span>
                    <span className="text-gray-900">How will you navigate your readers through the narrative?</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-[#FFB800]">•</span>
                    <span className="text-gray-900">What currents of tension will pull readers deeper?</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-[#FFB800]">•</span>
                    <span className="text-gray-900">How will your story ebb and flow?</span>
                  </li>
                </ul>
              </div>

              {/* Prior Knowledge */}
              <div className="p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-xl">🧠</span>
                  <h3 className="text-lg font-semibold">Building on Prior Knowledge:</h3>
                </div>
                <ul className="space-y-2">
                  <li>Understanding of narrative structure and pacing</li>
                  <li>Experience with descriptive writing techniques</li>
                  <li>Knowledge of how to create atmosphere</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <NavigationArrow direction="left" onClick={() => navigate('/library')} />
              <NavigationArrow direction="right" onClick={() => navigate('/lesson/dystopian/part2')} />
            </div>
          </div>
        </div>
      </LessonLayout>
    </div>
  );
}