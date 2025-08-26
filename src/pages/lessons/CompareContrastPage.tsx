import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, Brain, BarChart2, Eye, ArrowLeftRight, CheckCircle } from 'lucide-react';
import { NavigationArrow } from '../../components/NavigationArrow';
import { MidAssistant } from '../../components/MidAssistant';
import { MiniAssistant } from '../../components/MiniAssistant';
import { useTheme } from '../../context/ThemeContext';
import { getThemeConfig } from '../../config/themes';

interface ComparisonType {
  type: string;
  description: string;
  examples: string[];
  questions: string[];
  answers: string[];
  color: string;
  icon: string;
}

export default function CompareContrastPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [selectedComparison, setSelectedComparison] = useState<ComparisonType | null>(null);
  const [showExamples, setShowExamples] = useState(false);
  const [analysisStep, setAnalysisStep] = useState<'similarities' | 'differences' | 'significance'>('similarities');
  const [timer, setTimer] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const currentTheme = getThemeConfig(theme);
  const defaultQuote = Object.values(currentTheme.topics).find(topic => topic.quote)?.quote;

  const comparisonTypes: ComparisonType[] = [
    {
      type: "Character",
      description: "Compare and contrast two characters, examining their motivations, values, and development.",
      color: 'from-purple-500 to-indigo-600',
      icon: '👥',
      examples: [
        "Character A values individual freedom above all else, while Character B prioritizes collective security.",
        "Both characters face similar challenges but respond differently based on their core values.",
        "Character A evolves from passive acceptance to active resistance, while Character B moves from blind loyalty to questioning authority."
      ],
      questions: [
        "How do the characters' backgrounds influence their values?",
        "What similar experiences do they share, and how do they respond differently?",
        "How does their relationship evolve throughout the narrative?",
        "What do these characters reveal about the work's central themes?"
      ],
      answers: [
        "Characters' backgrounds—including social class, education, and formative experiences—shape their worldviews and priorities.",
        "Shared experiences highlight character differences; one might respond with empathy while another with calculation, revealing core values.",
        "Character relationships often evolve from opposition to understanding, or from alliance to betrayal, driving narrative tension.",
        "Character contrasts often embody thematic tensions, such as tradition versus progress or individual versus collective good."
      ]
    },
    {
      type: "Setting",
      description: "Analyze different settings within a work or across multiple works, examining their symbolic significance.",
      color: 'from-emerald-500 to-teal-600',
      icon: '🏛️',
      examples: [
        "The sterile, controlled city contrasts with the wild, unpredictable outlands beyond the wall.",
        "Both settings represent different forms of confinement, though one is physical and the other psychological.",
        "The transition between settings mirrors the protagonist's internal journey."
      ],
      questions: [
        "How do different settings reflect the work's themes?",
        "What symbolic elements appear in each setting?",
        "How does the atmosphere of each setting affect characters?",
        "What does the contrast between settings reveal about society?"
      ],
      answers: [
        "Settings often physically embody thematic concerns—a walled city might represent societal constraints while wilderness represents freedom.",
        "Symbolic elements like water (representing change) or walls (representing division) create meaningful contrasts between settings.",
        "Setting atmosphere directly influences character behavior; restrictive environments might prompt rebellion while chaotic ones demand adaptation.",
        "Setting contrasts often critique real-world social divisions, showing how environment shapes opportunity and perspective."
      ]
    },
    {
      type: "Theme",
      description: "Explore how different themes interact and develop throughout a work or across multiple works.",
      color: 'from-amber-500 to-orange-600',
      icon: '💡',
      examples: [
        "The theme of technological progress is contrasted with the theme of human connection.",
        "Both themes of freedom and security are presented as necessary but potentially in conflict.",
        "The theme of individual identity evolves alongside the theme of collective responsibility."
      ],
      questions: [
        "How do these themes complement or contradict each other?",
        "How does the author balance competing themes?",
        "Which theme ultimately seems more dominant?",
        "How do these thematic tensions reflect real-world concerns?"
      ],
      answers: [
        "Complementary themes often create depth—freedom and responsibility naturally balance each other, while contradictory themes create tension.",
        "Authors balance competing themes through character perspectives, plot developments, and symbolic resolution.",
        "Dominant themes typically emerge in climactic moments and resolutions, revealing the work's ultimate values.",
        "Thematic tensions often mirror contemporary social debates, making literature a vehicle for exploring complex real-world issues."
      ]
    }
  ];

  const startTimer = (minutes: number) => {
    setTimer(minutes * 60);
    setIsTimerRunning(true);
    
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev === null || prev <= 1) {
          setIsTimerRunning(false);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(79, 70, 229, 0.95) 0%,
            rgba(79, 70, 229, 0.85) 15%,
            rgba(79, 70, 229, 0.85) 85%,
            rgba(79, 70, 229, 0.95) 100%
          ),
          url('${currentTheme.background}')
        `,
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <span className="text-amber-600 font-bold text-lg">Learning Objective:</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">
                Analyze similarities and differences between elements of {theme || 'literature'}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <MidAssistant context={{ topic: 'comparative analysis' }} />
              {timer !== null && (
                <div className={`px-6 py-3 rounded-full text-xl font-bold shadow-lg ${
                  timer > 180 ? 'bg-green-500 text-white' :
                  timer > 90 ? 'bg-amber-500 text-white' :
                  'bg-red-500 text-white'
                }`}>
                  {formatTime(timer)}
                </div>
              )}
            </div>
          </div>

          {/* Introduction */}
          <div className="mb-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
            <p className="text-lg text-indigo-900 leading-relaxed">
              Comparison and contrast are powerful analytical tools that help us understand complex ideas by examining 
              similarities and differences. By identifying patterns of connection and divergence, we can develop deeper 
              insights into literature, characters, and themes.
            </p>
          </div>

          {/* Building on Prior Knowledge */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-base font-bold mb-2">🧠 Building on Prior Knowledge:</h3>
            <ul className="text-sm space-y-2">
              <li>Understanding of analytical writing techniques</li>
              <li>Knowledge of literary elements and devices</li>
              <li>Experience with textual evidence and quotation</li>
              <li>Familiarity with comparative analysis structures</li>
            </ul>
          </div>

          {/* Success Criteria */}
          <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
            <h3 className="text-lg font-semibold mb-3">Success Criteria</h3>
            <ul className="space-y-2 text-sm text-indigo-900">
              <li>• Clear identification of comparison points</li>
              <li>• Balanced analysis of similarities and differences</li>
              <li>• Specific textual evidence</li>
              <li>• Meaningful conclusions about significance</li>
              <li>• Thoughtful connections to themes</li>
              <li>• Well-structured analytical responses</li>
            </ul>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-12 gap-8">
            {/* Left Column - Comparison Selection */}
            <div className="col-span-5">
              <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-8 shadow-2xl text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center">
                    <ArrowLeftRight className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold">Comparison Types</h2>
                </div>

                <div className="space-y-4">
                  {comparisonTypes.map((comparison) => (
                    <button
                      key={comparison.type}
                      onClick={() => {
                        setSelectedComparison(comparison);
                        setShowExamples(false);
                        setAnalysisStep('similarities');
                      }}
                      className={`w-full p-6 rounded-xl text-left transition-all duration-300 transform hover:scale-105 ${
                        selectedComparison?.type === comparison.type
                          ? `bg-gradient-to-r ${comparison.color} text-white shadow-2xl scale-105`
                          : 'bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{comparison.icon}</div>
                        <div>
                          <h3 className="text-lg font-bold mb-1">{comparison.type}</h3>
                          <p className="text-sm opacity-90">{comparison.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {selectedComparison && (
                  <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold">{selectedComparison.type} Analysis</h3>
                      <button
                        onClick={() => setShowExamples(!showExamples)}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors font-medium"
                      >
                        {showExamples ? "Hide Examples" : "Show Examples"}
                      </button>
                    </div>
                    
                    {showExamples && (
                      <div className="p-4 bg-white/20 rounded-lg mb-4">
                        <h4 className="font-medium mb-3">Example Analysis:</h4>
                        <div className="space-y-2">
                          {selectedComparison.examples.map((example, index) => (
                            <p key={index} className="text-sm bg-white/10 p-3 rounded-lg">
                              {example}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Analysis Framework */}
            <div className="col-span-7 space-y-6">
              {selectedComparison && (
                <>
                  {/* Analysis Steps */}
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <BarChart2 className="w-6 h-6 text-indigo-600" />
                      <h3 className="text-xl font-bold text-gray-800">Analysis Framework</h3>
                    </div>
                    
                    <div className="flex gap-2 mb-6">
                      {[
                        { step: 'similarities', label: 'Similarities', icon: '🔗', color: 'blue' },
                        { step: 'differences', label: 'Differences', icon: '⚡', color: 'purple' },
                        { step: 'significance', label: 'Significance', icon: '💎', color: 'amber' }
                      ].map((item) => (
                        <button
                          key={item.step}
                          onClick={() => setAnalysisStep(item.step as any)}
                          className={`flex-1 p-4 rounded-xl transition-all duration-300 ${
                            analysisStep === item.step
                              ? `bg-gradient-to-r from-${item.color}-500 to-${item.color}-600 text-white shadow-lg scale-105`
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          <div className="text-2xl mb-1">{item.icon}</div>
                          <div className="font-bold text-sm">{item.label}</div>
                        </button>
                      ))}
                    </div>

                    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                      {analysisStep === 'similarities' && (
                        <div>
                          <h4 className="text-lg font-bold text-blue-800 mb-3">🔗 Find Similarities</h4>
                          <p className="text-blue-700 mb-4">
                            Identify common elements, shared themes, or parallel characteristics between your chosen elements.
                          </p>
                          <div className="space-y-3">
                            <textarea
                              className="w-full p-4 border-2 border-blue-200 rounded-xl focus:ring-4 focus:ring-blue-300 focus:border-blue-400 resize-none"
                              rows={4}
                              placeholder="What similarities do you notice? List common themes, shared characteristics, or parallel elements..."
                            />
                            <button
                              onClick={() => startTimer(3)}
                              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-bold"
                            >
                              Start 3-Min Analysis
                            </button>
                          </div>
                        </div>
                      )}

                      {analysisStep === 'differences' && (
                        <div>
                          <h4 className="text-lg font-bold text-purple-800 mb-3">⚡ Identify Differences</h4>
                          <p className="text-purple-700 mb-4">
                            Analyze contrasting elements, opposing viewpoints, or unique features that set them apart.
                          </p>
                          <div className="space-y-3">
                            <textarea
                              className="w-full p-4 border-2 border-purple-200 rounded-xl focus:ring-4 focus:ring-purple-300 focus:border-purple-400 resize-none"
                              rows={4}
                              placeholder="What differences stand out? Note contrasting viewpoints, opposing characteristics, or unique features..."
                            />
                            <button
                              onClick={() => startTimer(3)}
                              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 font-bold"
                            >
                              Start 3-Min Analysis
                            </button>
                          </div>
                        </div>
                      )}

                      {analysisStep === 'significance' && (
                        <div>
                          <h4 className="text-lg font-bold text-amber-800 mb-3">💎 Explore Significance</h4>
                          <p className="text-amber-700 mb-4">
                            Explain why these similarities and differences matter to understanding the work or theme.
                          </p>
                          <div className="space-y-3">
                            <textarea
                              className="w-full p-4 border-2 border-amber-200 rounded-xl focus:ring-4 focus:ring-amber-300 focus:border-amber-400 resize-none"
                              rows={4}
                              placeholder="Why do these comparisons matter? What deeper insights do they reveal about the themes or characters..."
                            />
                            <button
                              onClick={() => startTimer(4)}
                              className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-300 font-bold"
                            >
                              Start 4-Min Reflection
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Questions Panel */}
                  <div className="bg-white rounded-2xl shadow-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Brain className="w-6 h-6 text-indigo-600" />
                      <h3 className="text-xl font-bold text-gray-800">Guiding Questions</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {selectedComparison.questions.map((question, index) => (
                        <div key={index} className="flex items-start justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {index + 1}
                            </div>
                            <span className="text-indigo-800 font-medium">{question}</span>
                          </div>
                          <MiniAssistant answer={selectedComparison.answers[index]} />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {!selectedComparison && (
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Scale className="w-8 h-8 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Ready to Compare?</h3>
                  <p className="text-gray-600">
                    Choose a comparison type from the left to begin your analytical journey.
                  </p>
                </div>
              )}

            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <NavigationArrow direction="left" onClick={() => navigate('/')} />
            <NavigationArrow direction="right" onClick={() => navigate('/lesson/compare-contrast/part2')} />
          </div>
        </div>
      </div>
    </div>
  );
}