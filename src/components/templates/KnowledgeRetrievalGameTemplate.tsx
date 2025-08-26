import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Timer, Trophy, Shuffle, BookOpen, Brain, CheckCircle2 } from 'lucide-react';
import { LessonLayout } from '../LessonLayout';
import { NavigationArrow } from '../NavigationArrow';
import { MidAssistant } from '../MidAssistant';
import { MiniAssistant } from '../MiniAssistant';

interface KnowledgeRetrievalGameProps {
  lessonData: {
    title: string;
    learning_objective: string;
    activity_type: string;
    game_type: 'speed_sorting' | 'challenge_matching' | 'rapid_recall';
    game_content: {
      items: string[];
      categories?: string[];
      matches?: Array<{ item: string; match: string }>;
      questions?: string[];
    };
    timer_duration: number;
    theme?: string;
  };
  navigationData: {
    previousRoute: string;
    nextRoute: string;
  };
}

// THEME COLOR SYSTEM - Option 1 Implementation
const getThemeColors = (theme?: string) => {
  switch (theme) {
    case 'dystopian':
    case 'dark':
      return {
        primary: 'bg-gray-900',
        secondary: 'bg-gray-800/50', 
        text: 'text-white',
        accent: 'text-yellow-400',
        border: 'border-gray-600',
        hover: 'hover:bg-gray-700',
        itemBg: 'bg-white',
        itemText: 'text-gray-800',
        categoryBg: 'bg-white/90'
      };
    case 'nature':
    case 'science':
    case 'Creative Writing':
    case 'Energy Transfer':
      return {
        primary: 'bg-green-900',
        secondary: 'bg-green-800/50',
        text: 'text-white', 
        accent: 'text-green-300',
        border: 'border-green-600',
        hover: 'hover:bg-green-700',
        itemBg: 'bg-white',
        itemText: 'text-gray-800',
        categoryBg: 'bg-white/90'
      };
    case 'technology':
    case 'Shakespeare':
      return {
        primary: 'bg-blue-900',
        secondary: 'bg-blue-800/50',
        text: 'text-white',
        accent: 'text-blue-300', 
        border: 'border-blue-600',
        hover: 'hover:bg-blue-700',
        itemBg: 'bg-white',
        itemText: 'text-gray-800',
        categoryBg: 'bg-white/90'
      };
    case 'history':
    case 'Industrial Revolution':
    case 'War Poetry':
      return {
        primary: 'bg-amber-900',
        secondary: 'bg-amber-800/50',
        text: 'text-white',
        accent: 'text-amber-300',
        border: 'border-amber-600', 
        hover: 'hover:bg-amber-700',
        itemBg: 'bg-white',
        itemText: 'text-gray-800',
        categoryBg: 'bg-white/90'
      };
    case 'light':
      return {
        primary: 'bg-white',
        secondary: 'bg-gray-50',
        text: 'text-gray-900',
        accent: 'text-blue-600',
        border: 'border-gray-300',
        hover: 'hover:bg-gray-100',
        itemBg: 'bg-gray-100',
        itemText: 'text-gray-800',
        categoryBg: 'bg-gray-50'
      };
    default:
      // Default to green theme
      return {
        primary: 'bg-green-900',
        secondary: 'bg-green-800/50',
        text: 'text-white', 
        accent: 'text-green-300',
        border: 'border-green-600',
        hover: 'hover:bg-green-700',
        itemBg: 'bg-white',
        itemText: 'text-gray-800',
        categoryBg: 'bg-white/90'
      };
  }
};

export default function KnowledgeRetrievalGameTemplate({ lessonData, navigationData }: KnowledgeRetrievalGameProps) {
  const navigate = useNavigate();
  
  // Get theme colors
  const themeColors = getThemeColors(lessonData.theme);
  
  const [gameActive, setGameActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(lessonData.timer_duration);
  const [playerResponses, setPlayerResponses] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [availableItems, setAvailableItems] = useState<string[]>(lessonData.game_content.items || []);
  const [sortedItems, setSortedItems] = useState<Record<string, string[]>>({});
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [difficultyLevel, setDifficultyLevel] = useState(1);
  const [completedSets, setCompletedSets] = useState(0);

  // Progressive sentence sets with increasing difficulty
  const sentenceSets = {
    1: { // Basic level
      simple: [
        "The alarm screamed.",
        "Citizens ran.",
        "Freedom died.",
        "Hope vanished.",
        "Guards watched.",
        "Screens glowed.",
        "Sirens wailed.",
        "Doors slammed."
      ],
      compound: [
        "Guards appeared, and order was restored.",
        "Cameras watched, but citizens ignored them.",
        "Propaganda echoed, and people hurried past.",
        "Lights flickered, and shadows danced.",
        "Alarms sounded, but nobody responded.",
        "Screens displayed messages, and crowds gathered.",
        "Doors opened, and officials emerged.",
        "Voices whispered, but words were forbidden."
      ]
    },
    2: { // Intermediate level
      simple: [
        "Surveillance cameras tracked every movement through the empty streets.",
        "The city sprawled beneath threatening skies.",
        "Propaganda broadcasts filled the air with false promises.",
        "Citizens moved like ghosts through the monitored districts.",
        "Technology controlled every aspect of daily life.",
        "The government's grip tightened around individual freedoms.",
        "Resistance movements operated in the deepest shadows.",
        "Environmental decay poisoned the surrounding landscape."
      ],
      compound: [
        "The surveillance system monitored every citizen, and privacy became extinct.",
        "Propaganda filled the airwaves, but truth remained hidden underground.",
        "Citizens obeyed without question, or they faced immediate consequences.",
        "Technology promised convenience, yet it delivered total control instead.",
        "The environment crumbled around them, but leaders ignored the warnings.",
        "Resistance fighters gathered in secret, and hope flickered in darkness.",
        "Information was strictly controlled, so independent thought became dangerous.",
        "The city gleamed with false prosperity, while inequality festered beneath."
      ]
    },
    3: { // Advanced level
      simple: [
        "The omnipresent surveillance apparatus systematically catalogued every citizen's behavioral patterns.",
        "Sophisticated propaganda algorithms manipulated public perception through carefully crafted emotional triggers.",
        "Environmental degradation accelerated exponentially despite technological advancement promises.",
        "Authoritarian control mechanisms infiltrated previously autonomous social institutions.",
        "Psychological conditioning programs eliminated critical thinking capabilities among the population.",
        "Economic stratification created insurmountable barriers between social classes.",
        "Technological dependency rendered basic human skills obsolete and forgotten.",
        "Cultural homogenization eradicated diverse perspectives and creative expression."
      ],
      compound: [
        "The surveillance state promised security and protection, but it delivered oppression and fear instead.",
        "Citizens surrendered their privacy for convenience, yet they received manipulation and control.",
        "Technology advanced at breakneck speed, while human connection deteriorated proportionally.",
        "Environmental warnings multiplied exponentially, but corporate interests suppressed meaningful action.",
        "Resistance movements operated with increasing sophistication, so government countermeasures became more brutal.",
        "Information became weaponized for social control, and truth transformed into a revolutionary act.",
        "Economic inequality reached unprecedented levels, while propaganda celebrated false prosperity.",
        "Cultural diversity faced systematic elimination, but underground movements preserved forbidden knowledge."
      ]
    }
  };

  // Generate new sentence set when current one is completed
  const generateNewSentences = () => {
    const currentSet = sentenceSets[difficultyLevel as keyof typeof sentenceSets];
    if (!currentSet) return;

    const simpleCount = Math.min(4, currentSet.simple.length);
    const compoundCount = Math.min(4, currentSet.compound.length);
    
    const selectedSimple = currentSet.simple
      .sort(() => Math.random() - 0.5)
      .slice(0, simpleCount);
    
    const selectedCompound = currentSet.compound
      .sort(() => Math.random() - 0.5)
      .slice(0, compoundCount);
    
    const newItems = [...selectedSimple, ...selectedCompound].sort(() => Math.random() - 0.5);
    setAvailableItems(newItems);
    
    // Reset sorted items
    const resetSorted: Record<string, string[]> = {};
    lessonData.game_content.categories?.forEach(category => {
      resetSorted[category] = [];
    });
    setSortedItems(resetSorted);
  };

  // Check if current set is completed
  const checkSetCompletion = () => {
    const totalSorted = Object.values(sortedItems).reduce((sum, arr) => sum + arr.length, 0);
    const totalAvailable = availableItems.length;
    
    if (totalAvailable === 0 && totalSorted > 0 && gameActive) {
      setCompletedSets(prev => prev + 1);
      setScore(prev => prev + 50); // Bonus for completing set
      
      // Increase difficulty if possible
      if (difficultyLevel < 3) {
        setDifficultyLevel(prev => prev + 1);
      }
      
      // Generate new sentences after short delay
      setTimeout(() => {
        generateNewSentences();
      }, 1000);
    }
  };

  // Check completion whenever sorted items change
  React.useEffect(() => {
    checkSetCompletion();
  }, [sortedItems, availableItems, gameActive]);

  // Initialize sorted items with empty arrays for each category
  React.useEffect(() => {
    if (lessonData.game_content.categories) {
      const initialSorted: Record<string, string[]> = {};
      lessonData.game_content.categories.forEach(category => {
        initialSorted[category] = [];
      });
      setSortedItems(initialSorted);
    }
  }, [lessonData.game_content.categories]);

  const handleDragStart = (e: React.DragEvent, item: string) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, category: string) => {
    e.preventDefault();
    if (draggedItem) {
      // Remove from available items
      setAvailableItems(prev => prev.filter(item => item !== draggedItem));
      
      // Add to category
      setSortedItems(prev => ({
        ...prev,
        [category]: [...prev[category], draggedItem]
      }));
      
      // Update score (simple scoring - could be enhanced)
      setScore(prev => prev + 10);
      
      setDraggedItem(null);
      
      // Check if set is completed
      checkSetCompletion();
    }
  };

  const handleRemoveFromCategory = (item: string, category: string) => {
    // Remove from category
    setSortedItems(prev => ({
      ...prev,
      [category]: prev[category].filter(i => i !== item)
    }));
    
    // Add back to available items
    setAvailableItems(prev => [...prev, item]);
    
    // Reduce score
    setScore(prev => Math.max(0, prev - 10));
  };

  const startGame = () => {
    setGameActive(true);
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Get activity-specific content
  const getActivityContent = () => {
    const activityType = lessonData.activity_type || lessonData.title;
    
    if (activityType.includes('Word Associations')) {
      return {
        icon: '🧠',
        hookText: "Ready to unlock the hidden connections in your mind? Words are like threads in a tapestry - each one connects to create deeper meaning. In just minutes, you'll discover how your brain links ideas in surprising ways. Challenge yourself to think fast, make bold connections, and watch as simple words transform into powerful insights that will fuel your learning!",
        gameDescription: "Build word association chains to explore vocabulary connections and deepen understanding"
      };
    } else if (activityType.includes('Agree Disagree Corners')) {
      return {
        icon: '🏃',
        hookText: "Are you ready to defend what you believe? No sitting on the fence today - you'll take a stand, move your body, and use your voice to justify your position! Feel the energy as you physically commit to your beliefs and discover the power of conviction. Your ideas matter, your voice counts, and your movement creates momentum!",
        gameDescription: "Physical positioning game where students move to corners based on their agreement level"
      };
    } else if (activityType.includes('Question Carousel')) {
      return {
        icon: '🎠',
        hookText: "Step aboard the carousel of ideas! Each rotation brings fresh perspectives, new challenges, and deeper thinking. Feel the excitement build as you move from question to question, building on brilliant insights from your classmates. Every stop is a new adventure in critical thinking - are you ready for the ride?",
        gameDescription: "Rotating discussion game where groups move between different thought-provoking questions"
      };
    } else if (activityType.includes('Simple and Compound Sentences')) {
      return {
        icon: '🎯',
        hookText: "Become a sentence detective! Like a skilled conductor who knows exactly when to speed up or slow down the music, you'll master the rhythm of writing. These dystopian sentences hold secrets - can you crack the code and sort them correctly? Race against time, work with your team, and feel the satisfaction of mastering sentence variety!",
        gameDescription: "Speed sorting game to identify and categorize simple and compound sentences"
      };
    } else {
      return {
        icon: '🎯',
        hookText: "Your brain is about to come alive! Feel the rush of quick thinking, the thrill of fast responses, and the joy of friendly competition. This isn't just review - it's your chance to show what you know and build unstoppable momentum for deeper learning. Ready to surprise yourself with how much you've learned?",
        gameDescription: "Knowledge retrieval game to strengthen memory and create positive energy"
      };
    }
  };

  const activityContent = getActivityContent();

  const getGameIcon = () => {
    switch (lessonData.game_type) {
      case 'speed_sorting': return <Shuffle className="w-6 h-6" />;
      case 'challenge_matching': return <Trophy className="w-6 h-6" />;
      case 'rapid_recall': return <Timer className="w-6 h-6" />;
      default: return <Gamepad2 className="w-6 h-6" />;
    }
  };

  const getGameTitle = () => {
    return lessonData.title;
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(34, 197, 94, 0.95) 0%,
            rgba(34, 197, 94, 0.85) 15%,
            rgba(34, 197, 94, 0.85) 85%,
            rgba(34, 197, 94, 0.95) 100%
          ),
          url('https://images.unsplash.com/photo-1516414447565-b14be0adf13e?auto=format&fit=crop&q=80')
        `,
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-8">
          {/* Lesson Navigation */}
          <div className="mb-8 p-6 bg-white/95 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{lessonData.title}</h3>
                  <p className="text-sm text-gray-600">Knowledge retrieval and memory strengthening</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg flex items-center gap-2"
                >
                  <Brain className="w-4 h-4" />
                  <span>Starter</span>
                </button>
                <button
                  onClick={() => navigate(navigationData.nextRoute)}
                  className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Main</span>
                </button>
                <button
                   onClick={() => navigate(navigationData.nextRoute.replace('/starter', '/plenary'))}
                  className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Plenary</span>
                </button>
              </div>
            </div>
          </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-8">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <div>
                <span className="text-[#FFB800] font-medium">Learning Objective:</span>
                <span className="ml-2 font-bold">{lessonData.learning_objective}</span>
              </div>
              <MidAssistant context={{ topic: 'literature' }} />
            </div>

            {/* Hook Section */}
            <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-2xl">{activityContent.icon}</span>
                <h2 className="text-xl font-bold text-green-900">{getGameTitle()}</h2>
              </div>
              <p className="text-base text-green-800 mb-4 font-medium">
                {activityContent.hookText}
              </p>
            </div>

            {/* Success Criteria and Game Rules */}
            <div className="mb-6 grid grid-cols-3 gap-6">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="text-lg font-semibold mb-3 text-green-900">Success Criteria</h3>
                <ul className="space-y-2 text-sm text-green-900">
                  <li>• Accurately identify and categorize knowledge elements</li>
                  <li>• Demonstrate quick recall of previously learned concepts</li>
                  <li>• Collaborate effectively to strengthen understanding</li>
                  <li>• Build confidence and energy for deeper learning</li>
                </ul>
              </div>
              <div className="p-4 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 shadow-md">
                <h3 className="text-lg font-semibold mb-3">Game Rules</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Drag sentences to correct categories</li>
                  <li>• Work quickly but accurately</li>
                  <li>• Collaborate with your team</li>
                  <li>• Simple = one complete thought</li>
                  <li>• Compound = two thoughts joined with 'and', 'but', 'or'</li>
                </ul>
              </div>
              <div className="p-4 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200 shadow-md">
                <h3 className="text-lg font-semibold mb-3">Why This Matters</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Strengthens memory connections</li>
                  <li>• Creates positive energy</li>
                  <li>• Reviews previous learning</li>
                  <li>• Prepares for new concepts</li>
                  <li>• Sentence variety creates engaging writing</li>
                  <li>• Different types create different effects</li>
                </ul>
              </div>
            </div>

            {/* 10-Minute Structure Indicator */}
            <div className="mb-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-4 shadow-inner">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Timer className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-900">10-Minute Game Structure</h3>
                </div>
                <div className="flex space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-green-800">2 mins</div>
                    <div className="text-green-600">Setup & Rules</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-800">6 mins</div>
                    <div className="text-green-600">Game Play</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-800">2 mins</div>
                    <div className="text-green-600">Review & Connect</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
              {/* Game Area - Left Side */}
              <div className="col-span-8 space-y-4">
                <div className={`p-6 ${themeColors.primary} rounded-lg shadow-lg ${themeColors.text}`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className={themeColors.text}>{getGameIcon()}</span>
                      <h3 className={`text-xl font-bold ${themeColors.text}`}>{getGameTitle()}</h3>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${themeColors.accent}`}>{timeRemaining}</div>
                        <div className={`text-sm ${themeColors.text}`}>seconds</div>
                      </div>
                      <button
                        onClick={startGame}
                        disabled={gameActive}
                        className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                          gameActive 
                            ? 'bg-gray-500 cursor-not-allowed text-white' 
                            : 'bg-[#FFB800] hover:bg-[#FFB800]/90 text-gray-900'
                        }`}
                      >
                        {gameActive ? 'Game Active' : 'Start Game'}
                      </button>
                    </div>
                  </div>

                  {/* Game Content Area */}
                  <div className={`${themeColors.secondary} p-6 rounded-lg min-h-[300px]`}>
                    {lessonData.game_type === 'speed_sorting' && (
                      <div className="space-y-4">
                        <h4 className={`font-semibold mb-3 ${themeColors.text}`}>Sort these items into categories:</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h5 className={`font-medium ${themeColors.text}`}>Items to Sort:</h5>
                            <div className="space-y-2 min-h-[200px]">
                              {availableItems.map((item, index) => (
                                <div 
                                  key={index} 
                                  draggable
                                  onDragStart={(e) => handleDragStart(e, item)}
                                  className={`p-3 ${themeColors.itemBg} border ${themeColors.border} rounded text-sm cursor-move hover:bg-gray-50 transition-colors ${themeColors.itemText} shadow-sm`}
                                >
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <h5 className={`font-medium ${themeColors.text}`}>Categories:</h5>
                            <div className="space-y-3">
                              {lessonData.game_content.categories?.map((category, index) => (
                                <div 
                                  key={index} 
                                  onDragOver={handleDragOver}
                                  onDrop={(e) => handleDrop(e, category)}
                                  className={`p-4 ${themeColors.categoryBg} rounded border-2 border-dashed ${themeColors.border} min-h-[120px]`}
                                >
                                  <div className="font-medium text-center text-gray-800 mb-2">{category}</div>
                                  <div className="text-xs text-gray-600 text-center mb-3">
                                    {category === 'Simple Sentences' ? 'One complete thought' : 'Two complete thoughts joined'}
                                  </div>
                                  <div className="space-y-1">
                                    {sortedItems[category]?.map((item, itemIndex) => (
                                      <div 
                                        key={itemIndex}
                                        onClick={() => handleRemoveFromCategory(item, category)}
                                        className={`p-2 bg-gray-100 border ${themeColors.border} rounded text-xs cursor-pointer ${themeColors.hover} transition-colors text-gray-800`}
                                      >
                                        {item}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {lessonData.game_type === 'challenge_matching' && (
                      <div className="space-y-4">
                        <h4 className={`font-semibold mb-3 ${themeColors.text}`}>Match the pairs:</h4>
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <h5 className={`font-medium ${themeColors.text}`}>Column A:</h5>
                            {lessonData.game_content.matches?.map((match, index) => (
                              <div key={index} className={`p-3 ${themeColors.itemBg} border ${themeColors.border} rounded text-sm cursor-pointer hover:bg-gray-50 transition-colors ${themeColors.itemText}`}>
                                {match.item}
                              </div>
                            ))}
                          </div>
                          <div className="space-y-2">
                            <h5 className={`font-medium ${themeColors.text}`}>Column B:</h5>
                            {lessonData.game_content.matches?.map((match, index) => (
                              <div key={index} className={`p-3 ${themeColors.categoryBg} rounded border-2 border-dashed ${themeColors.border} text-sm cursor-pointer hover:bg-gray-50 transition-colors ${themeColors.itemText}`}>
                                {match.match}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {lessonData.game_type === 'rapid_recall' && (
                      <div className="space-y-4">
                        <h4 className={`font-semibold mb-3 ${themeColors.text}`}>Quick recall questions:</h4>
                        <div className="grid grid-cols-1 gap-2">
                          {lessonData.game_content.questions?.map((question, index) => (
                            <div key={index} className={`p-3 ${themeColors.itemBg} border ${themeColors.border} rounded text-sm cursor-pointer hover:bg-gray-50 transition-colors ${themeColors.itemText}`}>
                              <div className={`font-medium mb-2 ${themeColors.itemText}`}>{question}</div>
                              <input
                                type="text"
                                placeholder="Quick answer..."
                                className={`w-full p-2 rounded border ${themeColors.border} ${themeColors.itemText} placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Default sorting interface for sentence types */}
                    {!lessonData.game_type && (
                      <div className="space-y-4">
                        <h4 className={`font-semibold mb-3 ${themeColors.text}`}>Sort sentences by type:</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h5 className={`font-medium ${themeColors.text}`}>Sentences to Sort:</h5>
                            <div className="space-y-3">
                              {lessonData.game_content.items.map((item, index) => (
                                <div key={index} className={`p-3 ${themeColors.itemBg} border ${themeColors.border} rounded text-sm cursor-pointer hover:bg-gray-50 transition-colors ${themeColors.itemText} shadow-sm`}>
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className={`p-4 ${themeColors.categoryBg} rounded border-2 border-dashed ${themeColors.border} min-h-[120px]`}>
                              <div className="font-medium text-center text-gray-800 mb-2">Simple Sentences</div>
                              <div className="text-xs text-gray-600 text-center">One complete thought</div>
                            </div>
                            <div className={`p-4 ${themeColors.categoryBg} rounded border-2 border-dashed ${themeColors.border} min-h-[120px]`}>
                              <div className="font-medium text-center text-gray-800 mb-2">Compound Sentences</div>
                              <div className="text-xs text-gray-600 text-center">Two complete thoughts joined</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Score Display */}
                  <div className="mt-4 text-center">
                    <div className="flex justify-center space-x-6">
                      <div className="text-center">
                        <div className={`text-2xl font-bold ${themeColors.accent}`}>Score: {score}</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg font-bold ${themeColors.accent}`}>Level: {difficultyLevel}</div>
                        <div className={`text-sm ${themeColors.text} opacity-75`}>Sets: {completedSets}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instructions & Support - Right Side */}
              <div className="col-span-4 space-y-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h3 className="text-lg font-semibold mb-3">Examples</h3>
                  <div className="space-y-3">
                    <div className="p-2 bg-white rounded border border-green-200">
                      <div className="text-sm font-medium text-green-800">Simple:</div>
                      <div className="text-sm text-green-700">"The alarm screamed."</div>
                    </div>
                    <div className="p-2 bg-white rounded border border-green-200">
                      <div className="text-sm font-medium text-green-800">Compound:</div>
                      <div className="text-sm text-green-700">"Guards appeared, and order was restored."</div>
                    </div>
                  </div>
                </div>

                {/* Dialogic Questions Section */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold mb-3">Dialogic Questions</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-medium text-blue-800 flex-1">
                          How do different sentence types create different effects in writing?
                        </p>
                        <MiniAssistant answer="Simple sentences create direct impact and clarity, while compound sentences show relationships between ideas and create more complex rhythms. Varying sentence types keeps readers engaged and allows writers to control pacing and emphasis." />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-medium text-blue-800 flex-1">
                          Why might writers choose simple sentences over compound sentences?
                        </p>
                        <MiniAssistant answer="Simple sentences create dramatic impact, emphasize key points, increase reading pace, and provide clarity in complex passages. They're particularly effective for creating tension, showing urgency, or highlighting important moments." />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <p className="text-sm font-medium text-blue-800 flex-1">
                          How does sentence variety affect reader engagement?
                        </p>
                        <MiniAssistant answer="Sentence variety creates rhythm and flow, prevents monotony, controls reading pace, and helps maintain reader interest. It allows writers to guide readers' attention and create sophisticated prose that feels natural and engaging." />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Vocabulary Section */}
                <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                  <h3 className="text-lg font-semibold mb-3">Key Vocabulary</h3>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {[
                        'simple sentence',
                        'compound sentence',
                        'complete thought',
                        'coordinating conjunction',
                        'sentence variety',
                        'rhythm',
                        'emphasis',
                        'flow'
                      ].map((term, index) => (
                        <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-medium">
                          {term}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 p-3 bg-white rounded-lg border border-indigo-200">
                      <h4 className="text-sm font-medium text-indigo-800 mb-2">Quick Definitions:</h4>
                      <ul className="text-xs text-indigo-700 space-y-1">
                        <li><strong>Simple sentence:</strong> Contains one complete thought (subject + predicate)</li>
                        <li><strong>Compound sentence:</strong> Two complete thoughts joined by 'and', 'but', or 'or'</li>
                        <li><strong>Sentence variety:</strong> Using different sentence types for better writing flow</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}