import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle, Brain, AlertTriangle } from 'lucide-react';
import { NavigationArrow } from '../../components/NavigationArrow';
import { MidAssistant } from '../../components/MidAssistant';
import { MiniAssistant } from '../../components/MiniAssistant';
import { useTheme } from '../../context/ThemeContext';
import { getThemeConfig } from '../../config/themes';

export default function DystopianPlenaryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useTheme();
  const [selectedCriteria, setSelectedCriteria] = useState<string | null>(null);
  
  // Extract lesson data from location state if available
  const lessonData = {
    yearGroup: 'Year 10',
    class: 'A',
    subject: 'English',
    theme: 'Dystopian Fiction'
  };

  const currentTheme = getThemeConfig(theme || "Dystopian Fiction");
  const defaultQuote = Object.values(currentTheme.topics).find(topic => topic.quote)?.quote;

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(30, 41, 59, 0.95) 0%,
            rgba(30, 41, 59, 0.85) 15%,
            rgba(30, 41, 59, 0.85) 85%,
            rgba(30, 41, 59, 0.95) 100%
          ),
          url('https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?auto=format&fit=crop&q=80')
        `,
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="max-w-[1186px] mx-auto px-6 py-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <span className="text-[#FFB800] font-medium">Learning Objective:</span>
              <span className="ml-2 font-bold">
                {theme 
                  ? `Evaluate the effectiveness of dystopian narrative techniques in ${theme}`
                  : "Evaluate the effectiveness of dystopian narrative techniques"}
              </span>
            </div>
            <MidAssistant context={{ topic: 'literature' }} />
          </div>

          <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
            <p className="text-base text-amber-900">
              Now that we've explored dystopian narrative techniques, let's evaluate our work against our success criteria. 
              This reflection will help us understand how effectively we've used language and structure to create tension, 
              atmosphere, and control in our dystopian narratives.
            </p>
          </div>

          {defaultQuote && (
            <div className="mb-6 p-4 bg-amber-100 rounded-lg border border-amber-200">
              <blockquote className="text-lg italic text-amber-900 mb-2">
                "{defaultQuote.text}"
              </blockquote>
              <div className="text-sm text-amber-700">
                <p className="font-medium">— {defaultQuote.source}</p>
                <p className="mt-1">{defaultQuote.context}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-6 bg-slate-800 rounded-lg shadow-lg text-white">
                <div className="flex items-center space-x-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-[#FFB800]" />
                  <h2 className="text-xl font-bold">Self-Assessment</h2>
                </div>
                <p className="text-sm mb-4">
                  Review your dystopian narrative against the success criteria. For each criterion, 
                  evaluate how effectively you've applied the technique and provide evidence from your writing.
                </p>
                <div className="space-y-3">
                  {[
                    'Created a vivid dystopian setting using sensory details',
                    'Introduced a protagonist facing oppression or conflict',
                    'Used descriptive techniques to build tension and atmosphere',
                    'Established control mechanisms within the society',
                    'Varied sentence structures for dramatic effect'
                  ].map((criterion, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedCriteria(criterion)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedCriteria === criterion
                          ? 'bg-amber-500 text-slate-900'
                          : 'bg-slate-700 hover:bg-slate-600'
                      }`}
                    >
                      {criterion}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {selectedCriteria && (
                <div className="p-4 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 shadow-md">
                  <div className="flex items-center space-x-2 mb-3">
                    <Brain className="w-5 h-5 text-amber-600" />
                    <h3 className="text-lg font-semibold">Evaluation Guide</h3>
                  </div>
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      {selectedCriteria === 'Created a vivid dystopian setting using sensory details' && (
                        <>Look for evidence of visual, auditory, tactile, olfactory, and gustatory details that create a clear mental image of your dystopian world.</>
                      )}
                      {selectedCriteria === 'Introduced a protagonist facing oppression or conflict' && (
                        <>Examine how you've established your character's situation and their relationship to the dystopian society. Is their conflict internal, external, or both?</>
                      )}
                      {selectedCriteria === 'Used descriptive techniques to build tension and atmosphere' && (
                        <>Identify your use of literary devices such as metaphor, simile, personification, and imagery to create an atmosphere of unease or oppression.</>
                      )}
                      {selectedCriteria === 'Established control mechanisms within the society' && (
                        <>Analyze how you've shown the methods of control in your dystopian world. These might include surveillance, propaganda, restricted movement, or thought control.</>
                      )}
                      {selectedCriteria === 'Varied sentence structures for dramatic effect' && (
                        <>Consider how you've used different sentence types and lengths to create rhythm and emphasis in your writing.</>
                      )}
                    </p>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 mb-2">Example Evidence:</h4>
                        <p className="text-sm text-gray-600">
                          {selectedCriteria === 'Created a vivid dystopian setting using sensory details' && (
                            <>"The city stretched endlessly beneath a sky of perpetual twilight. The air carried the artificial scent of sanitization, masking the underlying decay."</>
                          )}
                          {selectedCriteria === 'Introduced a protagonist facing oppression or conflict' && (
                            <>"Sarah's fingers traced the edge of her mandatory identification band, its cold metal a constant reminder of her captivity."</>
                          )}
                          {selectedCriteria === 'Used descriptive techniques to build tension and atmosphere' && (
                            <>"Towering screens flickered with approved messages, their harsh light reflecting off the polished surfaces of identical buildings."</>
                          )}
                          {selectedCriteria === 'Established control mechanisms within the society' && (
                            <>"In the streets below, people moved in perfect synchronization, their footsteps echoing in haunting unison."</>
                          )}
                          {selectedCriteria === 'Varied sentence structures for dramatic effect' && (
                            <>"The screens never stopped. Day and night. Constant surveillance. And no one seemed to notice anymore."</>
                          )}
                        </p>
                      </div>
                      <MiniAssistant 
                        answer={
                          selectedCriteria === 'Created a vivid dystopian setting using sensory details' 
                            ? "Strong evidence uses multiple senses: visual (perpetual twilight), olfactory (artificial scent), and implied tactile (decay). Consider adding sounds to enhance immersion."
                            : selectedCriteria === 'Introduced a protagonist facing oppression or conflict'
                            ? "Effective character introduction combines physical detail (identification band) with emotional state (captivity). Consider developing internal thoughts to deepen conflict."
                            : selectedCriteria === 'Used descriptive techniques to build tension and atmosphere'
                            ? "Good use of contrasting imagery (harsh/polished) and personification (flickering screens). Consider adding metaphor to strengthen the atmosphere."
                            : selectedCriteria === 'Established control mechanisms within the society'
                            ? "Strong implication of control through synchronized movement. Consider adding more explicit control mechanisms like surveillance or restricted speech."
                            : "Effective variation with one longer descriptive sentence followed by three fragments for emphasis. Consider using this technique selectively for maximum impact."
                        } 
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="p-4 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 shadow-md">
                <div className="flex items-center space-x-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <h3 className="text-lg font-semibold">Reflection Questions</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-[#FFB800] mt-1">•</span>
                    <span>Which descriptive technique was most effective in creating your dystopian world?</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#FFB800] mt-1">•</span>
                    <span>How did you balance explicit and implicit methods of showing control?</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#FFB800] mt-1">•</span>
                    <span>What would you develop further if you were to continue this narrative?</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#FFB800] mt-1">•</span>
                    <span>How does your dystopian world reflect or comment on aspects of our real world?</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <h3 className="text-lg font-semibold mb-3">Success Criteria</h3>
                <ul className="space-y-2 text-sm text-amber-900">
                  <li className="flex items-start space-x-2">
                    <span className="text-[#FFB800] mt-1">•</span>
                    <span>Vivid sensory details create an immersive dystopian setting</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#FFB800] mt-1">•</span>
                    <span>Clear establishment of control mechanisms</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#FFB800] mt-1">•</span>
                    <span>Effective use of varied sentence structures</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-[#FFB800] mt-1">•</span>
                    <span>Tension built through descriptive techniques</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <NavigationArrow direction="left" onClick={() => navigate('/lesson/dystopian-writing')} />
            <NavigationArrow direction="right" onClick={() => navigate('/admin/lesson-library')} />
          </div>
        </div>
      </div>
    </div>
  );
}