import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { BookOpen, Brain, Target, Edit2, MessageSquare, Users } from 'lucide-react';
import { NavigationArrow } from '../../components/NavigationArrow';
import { MidAssistant } from '../../components/MidAssistant';
import { MiniAssistant } from '../../components/MiniAssistant';

type ControlMechanism = 'Surveillance' | 'Propaganda' | 'Resource Control' | 'Social Division';

const DystopianWritingPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [primaryControl, setPrimaryControl] = useState<ControlMechanism | null>(null);
  const [secondaryControl, setSecondaryControl] = useState<ControlMechanism | null>(null);
  
  // Extract lesson data from location state if available
  const lessonData = {
    yearGroup: 'Year 10',
    class: 'A',
    subject: 'English',
    theme: 'Dystopian Fiction'
  };

  const controlMechanisms: {
    type: ControlMechanism;
    description: string;
  }[] = [
    {
      type: 'Surveillance',
      description: 'Constant monitoring through technology, informants, or other means'
    },
    {
      type: 'Propaganda',
      description: 'Control of information and manipulation of truth'
    },
    {
      type: 'Resource Control',
      description: 'Restriction of food, water, energy, or other necessities'
    },
    {
      type: 'Social Division',
      description: 'Enforced separation by class, ability, or other factors'
    }
  ];

  const handleControlSelect = (mechanism: ControlMechanism) => {
    if (primaryControl === mechanism) {
      setPrimaryControl(null);
    } else if (secondaryControl === mechanism) {
      setSecondaryControl(null);
    } else if (!primaryControl) {
      setPrimaryControl(mechanism);
    } else if (!secondaryControl) {
      setSecondaryControl(mechanism);
    }
  };

  const canContinueToStep2 = primaryControl && secondaryControl;

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
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[#FFB800] font-medium">Learning Objective:</span>
                <span className="ml-2 font-bold">Create a dystopian world through structured creative writing activities</span>
              </div>
              <MidAssistant context={{ 
                topic: 'creative writing',
                currentDiscussion: 'dystopian world building'
              }} />
            </div>

            {/* Introduction */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-sm text-slate-800">
                Dystopian fiction allows us to explore societal issues through imaginative world-building. 
                By creating settings where control, surveillance, or inequality have been taken to extremes, 
                we can examine our own world more critically. Today, we'll develop our own dystopian worlds 
                using key conventions of the genre while exploring themes that matter to us.
              </p>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-12 gap-6">
              {/* Left Column - Writing Process */}
              <div className="col-span-7">
                <div className="space-y-6">
                  <div className="p-5 bg-slate-800 rounded-lg shadow-lg text-white">
                    <div className="flex items-center space-x-2 mb-4">
                      <BookOpen className="w-6 h-6 text-[#FFB800]" />
                      <h2 className="text-xl font-bold text-white">Dystopian World Building</h2>
                    </div>
                    
                    <div className="space-y-6">
                      {/* Step 1 */}
                      <div className={`p-4 rounded-lg transition-colors ${currentStep === 1 ? 'bg-slate-700' : 'bg-slate-700/50'}`}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 1 ? 'bg-[#FFB800] text-slate-900' : 'bg-slate-600 text-slate-300'}`}>
                            <span className="font-bold">1</span>
                          </div>
                          <h3 className="font-semibold text-lg text-white">Establish Control Mechanisms</h3>
                        </div>
                        <div className="ml-11">
                          <p className="text-slate-300 mb-3">
                            How does your dystopian society maintain control over its citizens? Choose one primary and one secondary method.
                          </p>
                          <div className="grid grid-cols-2 gap-3 mb-4">
                            {controlMechanisms.map((mechanism) => (
                              <div 
                                key={mechanism.type}
                                onClick={() => handleControlSelect(mechanism.type)}
                                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                                  primaryControl === mechanism.type 
                                    ? 'bg-[#FFB800] text-slate-900' 
                                    : secondaryControl === mechanism.type
                                      ? 'bg-[#FFB800]/60 text-slate-900'
                                      : 'bg-slate-600 hover:bg-slate-500'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <h4 className={`font-medium ${
                                    primaryControl === mechanism.type || secondaryControl === mechanism.type
                                      ? 'text-slate-900'
                                      : 'text-[#FFB800]'
                                  }`}>
                                    {mechanism.type}
                                  </h4>
                                  {primaryControl === mechanism.type && (
                                    <span className="text-xs font-bold bg-slate-900 text-white px-2 py-0.5 rounded">Primary</span>
                                  )}
                                  {secondaryControl === mechanism.type && (
                                    <span className="text-xs font-bold bg-slate-900/70 text-white px-2 py-0.5 rounded">Secondary</span>
                                  )}
                                </div>
                                <p className={`text-sm ${
                                  primaryControl === mechanism.type || secondaryControl === mechanism.type
                                    ? 'text-slate-800'
                                    : 'text-slate-300'
                                }`}>
                                  {mechanism.description}
                                </p>
                              </div>
                            ))}
                          </div>
                          {!canContinueToStep2 && (
                            <p className="text-amber-300 text-sm mb-3">
                              Please select both a primary and secondary control mechanism to continue.
                            </p>
                          )}
                          <button 
                            onClick={() => setCurrentStep(2)}
                            disabled={!canContinueToStep2}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                              canContinueToStep2
                                ? 'bg-[#FFB800] text-slate-900 hover:bg-[#E6B434]'
                                : 'bg-slate-600 text-slate-400 cursor-not-allowed'
                            }`}
                          >
                            Continue
                          </button>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className={`p-4 rounded-lg transition-colors ${currentStep === 2 ? 'bg-slate-700' : 'bg-slate-700/50'}`}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 2 ? 'bg-[#FFB800] text-slate-900' : 'bg-slate-600 text-slate-300'}`}>
                            <span className="font-bold">2</span>
                          </div>
                          <h3 className="font-semibold text-lg text-white">Develop Your Protagonist</h3>
                          <MiniAssistant answer="Example: Elara Chen, age 17, works as a data analyst trainee for the Ministry of Information. As a conformist on the surface, she has access to classified information but secretly questions the system after discovering discrepancies in historical records. Her motivation is to protect her younger brother while uncovering the truth about their missing parents." />
                        </div>
                        {currentStep >= 2 && (
                          <div className="ml-11">
                            <p className="text-slate-300 mb-3">
                              Create a character who exists within this system. What is their position? How do they feel about the society they live in?
                            </p>
                            <div className="space-y-3 mb-4">
                              <div className="p-3 bg-slate-600 rounded-lg">
                                <h4 className="font-medium text-[#FFB800] mb-1">Character Position</h4>
                                <div className="grid grid-cols-2 gap-2 text-sm text-slate-300">
                                  <div className="flex items-center gap-2">
                                    <input type="radio" id="conformist" name="position" />
                                    <label htmlFor="conformist">Conformist</label>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <input type="radio" id="rebel" name="position" />
                                    <label htmlFor="rebel">Rebel</label>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <input type="radio" id="enforcer" name="position" />
                                    <label htmlFor="enforcer">Enforcer</label>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <input type="radio" id="outsider" name="position" />
                                    <label htmlFor="outsider">Outsider</label>
                                  </div>
                                </div>
                              </div>
                              <div className="p-3 bg-slate-600 rounded-lg">
                                <h4 className="font-medium text-[#FFB800] mb-1">Character Motivation</h4>
                                <p className="text-sm text-slate-300 mb-2">What drives your character? What do they want most?</p>
                                <textarea 
                                  className="w-full bg-slate-700 text-white border border-slate-500 rounded-lg p-2 text-sm"
                                  rows={2}
                                  placeholder="Describe your character's motivation..."
                                ></textarea>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <button 
                                onClick={() => setCurrentStep(1)}
                                className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-colors font-medium"
                              >
                                Back
                              </button>
                              <button 
                                onClick={() => setCurrentStep(3)}
                                className="px-4 py-2 bg-[#FFB800] text-slate-900 rounded-lg hover:bg-[#E6B434] transition-colors font-medium"
                              >
                                Continue
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Step 3 */}
                      <div className={`p-4 rounded-lg transition-colors ${currentStep === 3 ? 'bg-slate-700' : 'bg-slate-700/50'}`}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 3 ? 'bg-[#FFB800] text-slate-900' : 'bg-slate-600 text-slate-300'}`}>
                            <span className="font-bold">3</span>
                          </div>
                          <h3 className="font-semibold text-lg text-white">Create Narrative Tension</h3>
                          <MiniAssistant answer="Example: While archiving historical data, Elara discovers a file containing unaltered images of her city before 'The Restructuring.' The images show thriving communities and public gatherings—both now forbidden. When the system flags her extended viewing of the file, she must decide whether to report the 'corrupted data' as required or risk everything to preserve this evidence of a different past." />
                        </div>
                        {currentStep >= 3 && (
                          <div className="ml-11">
                            <p className="text-slate-300 mb-3">
                              What incident or realization disrupts your character's normal existence? This will be the catalyst for your story.
                            </p>
                            <div className="p-3 bg-slate-600 rounded-lg mb-4">
                              <h4 className="font-medium text-[#FFB800] mb-1">Inciting Incident</h4>
                              <p className="text-sm text-slate-300 mb-2">Choose one of the following or create your own:</p>
                              <div className="space-y-2 text-sm text-slate-300">
                                <div className="flex items-center gap-2">
                                  <input type="radio" id="discovery" name="incident" />
                                  <label htmlFor="discovery">Discovery of forbidden information</label>
                                </div>
                                <div className="flex items-center gap-2">
                                  <input type="radio" id="witness" name="incident" />
                                  <label htmlFor="witness">Witnessing an act of resistance</label>
                                </div>
                                <div className="flex items-center gap-2">
                                  <input type="radio" id="malfunction" name="incident" />
                                  <label htmlFor="malfunction">System malfunction revealing the truth</label>
                                </div>
                                <div className="flex items-center gap-2">
                                  <input type="radio" id="custom" name="incident" />
                                  <label htmlFor="custom">Other (describe below)</label>
                                </div>
                                <textarea 
                                  className="w-full bg-slate-700 text-white border border-slate-500 rounded-lg p-2 text-sm"
                                  rows={2}
                                  placeholder="Describe the incident that disrupts your character's world..."
                                ></textarea>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <button 
                                onClick={() => setCurrentStep(2)}
                                className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-500 transition-colors font-medium"
                              >
                                Back
                              </button>
                              <button 
                                onClick={() => navigate('/lesson/dystopian/plenary')}
                                className="px-4 py-2 bg-[#FFB800] text-slate-900 rounded-lg hover:bg-[#E6B434] transition-colors font-medium"
                              >
                                Complete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Resources and Tips */}
              <div className="col-span-5 space-y-4">
                <div className="p-4 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 shadow-md">
                  <div className="flex items-center space-x-2 mb-3">
                    <Target className="w-5 h-5 text-slate-700" />
                    <h3 className="text-lg font-semibold">Dystopian Conventions</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-[#FFB800] mt-1 mr-2">•</span>
                      <div>
                        <span className="font-medium">Controlled Society</span>
                        <p className="text-sm text-gray-600">A system of rules, surveillance, or social structures that limit freedom</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#FFB800] mt-1 mr-2">•</span>
                      <div>
                        <span className="font-medium">Protagonist Awakening</span>
                        <p className="text-sm text-gray-600">A character who begins to question or resist the established order</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#FFB800] mt-1 mr-2">•</span>
                      <div>
                        <span className="font-medium">Environmental Extremes</span>
                        <p className="text-sm text-gray-600">Settings that reflect the harshness of the society (sterile, decaying, or divided)</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#FFB800] mt-1 mr-2">•</span>
                      <div>
                        <span className="font-medium">Social Commentary</span>
                        <p className="text-sm text-gray-600">Themes that critique real-world issues or trends</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 shadow-md">
                  <div className="flex items-center space-x-2 mb-3">
                    <Edit2 className="w-5 h-5 text-slate-700" />
                    <h3 className="text-lg font-semibold">Writing Techniques</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start justify-between">
                      <div className="flex items-start">
                        <span className="text-[#FFB800] mt-1 mr-2">•</span>
                        <span>Use sensory details to create atmosphere</span>
                      </div>
                      <MiniAssistant answer="Describe how things look, sound, smell, feel, and taste to immerse readers in your dystopian world." />
                    </li>
                    <li className="flex items-start justify-between">
                      <div className="flex items-start">
                        <span className="text-[#FFB800] mt-1 mr-2">•</span>
                        <span>Create contrast between appearance and reality</span>
                      </div>
                      <MiniAssistant answer="Show the difference between the official narrative and the hidden truth of your dystopian society." />
                    </li>
                    <li className="flex items-start justify-between">
                      <div className="flex items-start">
                        <span className="text-[#FFB800] mt-1 mr-2">•</span>
                        <span>Use symbolism to represent control</span>
                      </div>
                      <MiniAssistant answer="Develop recurring symbols that represent authority, surveillance, or conformity in your world." />
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-center space-x-2 mb-3">
                    <Brain className="w-5 h-5 text-amber-800" />
                    <h3 className="font-semibold text-amber-900">Success Criteria</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-amber-800">
                    <li className="flex items-start space-x-2">
                      <span className="text-[#FFB800] mt-1">•</span>
                      <span>Clear dystopian control mechanisms</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#FFB800] mt-1">•</span>
                      <span>Developed protagonist with clear motivation</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#FFB800] mt-1">•</span>
                      <span>Effective use of descriptive techniques</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-[#FFB800] mt-1">•</span>
                      <span>Narrative tension through conflict or revelation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <NavigationArrow direction="left" onClick={() => navigate('/lesson/kick-off')} />
              <NavigationArrow direction="right" onClick={() => navigate('/lesson/dystopian/plenary')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DystopianWritingPage;