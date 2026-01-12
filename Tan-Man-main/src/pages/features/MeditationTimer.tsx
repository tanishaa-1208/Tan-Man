import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RefreshCw, Clock, Volume2, VolumeX, Check, Settings } from 'lucide-react';
import { useFeatures } from '../../contexts/FeatureContext';

type MeditationType = 'breathing' | 'body-scan' | 'loving-kindness' | 'mindfulness' | 'guided' | 'unguided';

interface MeditationOption {
  id: MeditationType;
  name: string;
  description: string;
  bgColor: string;
  textColor: string;
}

const meditationOptions: MeditationOption[] = [
  {
    id: 'breathing',
    name: 'Breathing Meditation',
    description: 'Focus on your breath to calm the mind and reduce stress.',
    bgColor: 'bg-primary-100',
    textColor: 'text-primary-700',
  },
  {
    id: 'body-scan',
    name: 'Body Scan',
    description: 'Bring awareness to each part of your body to release tension.',
    bgColor: 'bg-secondary-100',
    textColor: 'text-secondary-700',
  },
  {
    id: 'loving-kindness',
    name: 'Loving-Kindness',
    description: 'Cultivate feelings of compassion for yourself and others.',
    bgColor: 'bg-red-100',
    textColor: 'text-red-700',
  },
  {
    id: 'mindfulness',
    name: 'Mindfulness',
    description: 'Be present with your thoughts and feelings without judgment.',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-700',
  },
  {
    id: 'guided',
    name: 'Guided Meditation',
    description: 'Follow along with verbal instructions for a deeper practice.',
    bgColor: 'bg-green-100',
    textColor: 'text-green-700',
  },
  {
    id: 'unguided',
    name: 'Unguided Silence',
    description: 'Meditate in silence with gentle interval bells.',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-700',
  },
];

const MeditationTimer = () => {
  const [selectedType, setSelectedType] = useState<MeditationType>('breathing');
  const [duration, setDuration] = useState(5); // in minutes
  const [remainingTime, setRemainingTime] = useState(duration * 60); // in seconds
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isSessionCompleted, setIsSessionCompleted] = useState(false);
  const { addMeditationSession } = useFeatures();
  
  // Reference to audio elements
  const ambientSoundRef = useRef<HTMLAudioElement | null>(null);
  const bellSoundRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio elements
  useEffect(() => {
    ambientSoundRef.current = new Audio('https://freesound.org/data/previews/456/456413_8099555-lq.mp3');
    ambientSoundRef.current.loop = true;
    
    bellSoundRef.current = new Audio('https://freesound.org/data/previews/339/339818_5121236-lq.mp3');
    
    return () => {
      if (ambientSoundRef.current) {
        ambientSoundRef.current.pause();
        ambientSoundRef.current = null;
      }
      if (bellSoundRef.current) {
        bellSoundRef.current.pause();
        bellSoundRef.current = null;
      }
    };
  }, []);
  
  // Reset timer when duration changes
  useEffect(() => {
    setRemainingTime(duration * 60);
  }, [duration]);
  
  // Timer functionality
  useEffect(() => {
    let interval: number | undefined;
    
    if (isActive && !isPaused && remainingTime > 0) {
      interval = window.setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0 && isActive) {
      // Meditation session completed
      if (bellSoundRef.current && !isMuted) {
        bellSoundRef.current.play().catch(err => console.error('Error playing bell sound:', err));
      }
      
      if (ambientSoundRef.current) {
        ambientSoundRef.current.pause();
      }
      
      setIsActive(false);
      setIsSessionCompleted(true);
      addMeditationSession(duration, selectedType);
    }
    
    return () => clearInterval(interval);
  }, [isActive, isPaused, remainingTime, isMuted, duration, selectedType, addMeditationSession]);
  
  // Handle audio based on state
  useEffect(() => {
    if (!ambientSoundRef.current) return;
    
    if (isActive && !isPaused && !isMuted) {
      ambientSoundRef.current.play().catch(err => console.error('Error playing ambient sound:', err));
    } else {
      ambientSoundRef.current.pause();
    }
    
    ambientSoundRef.current.muted = isMuted;
  }, [isActive, isPaused, isMuted]);
  
  const startMeditation = () => {
    setIsActive(true);
    setIsPaused(false);
    setIsSessionCompleted(false);
    
    // Play starting bell
    if (bellSoundRef.current && !isMuted) {
      bellSoundRef.current.play().catch(err => console.error('Error playing bell sound:', err));
    }
  };
  
  const pauseMeditation = () => {
    setIsPaused(true);
  };
  
  const resumeMeditation = () => {
    setIsPaused(false);
  };
  
  const resetMeditation = () => {
    setIsActive(false);
    setIsPaused(false);
    setRemainingTime(duration * 60);
    setIsSessionCompleted(false);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const getSelectedMeditationType = () => {
    return meditationOptions.find(option => option.id === selectedType) || meditationOptions[0];
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Meditation Timer</h1>
          <p className="text-center text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Build a consistent meditation practice with our customizable timer. Choose your preferred style,
            duration, and ambient sounds for a peaceful session.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Meditation Type Selection */}
            <div className="md:col-span-1">
              <div className="bg-white rounded-xl shadow-card p-6">
                <h2 className="text-xl font-semibold mb-4">Meditation Type</h2>
                
                <div className="space-y-3">
                  {meditationOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => !isActive && setSelectedType(option.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedType === option.id
                          ? `${option.bgColor} ${option.textColor} border-2 border-current`
                          : 'bg-gray-50 hover:bg-gray-100'
                      } ${isActive ? 'cursor-not-allowed opacity-70' : ''}`}
                      disabled={isActive}
                    >
                      <div className="flex items-center">
                        {selectedType === option.id && (
                          <Check size={16} className="mr-2 flex-shrink-0" />
                        )}
                        <span className="font-medium">{option.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Timer Display & Controls */}
            <div className="md:col-span-2">
              <motion.div 
                className="bg-white rounded-xl shadow-card overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Main Timer */}
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">{getSelectedMeditationType().name}</h2>
                    <button
                      onClick={() => !isActive && setShowSettings(!showSettings)}
                      className={`p-2 rounded-full hover:bg-gray-100 ${isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
                      disabled={isActive}
                    >
                      <Settings size={20} />
                    </button>
                  </div>
                  
                  {/* Settings Panel */}
                  {showSettings && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium mb-3">Session Settings</h3>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Duration (minutes)
                        </label>
                        <div className="flex space-x-2">
                          {[1, 3, 5, 10, 15, 20, 30].map((mins) => (
                            <button
                              key={mins}
                              onClick={() => setDuration(mins)}
                              className={`px-3 py-1 rounded text-sm font-medium ${
                                duration === mins
                                  ? 'bg-primary-500 text-white'
                                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                              }`}
                            >
                              {mins}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sound
                        </label>
                        <button
                          onClick={toggleMute}
                          className="flex items-center text-sm text-gray-700 hover:text-gray-900"
                        >
                          {isMuted ? (
                            <>
                              <VolumeX size={16} className="mr-2" />
                              <span>Sounds muted</span>
                            </>
                          ) : (
                            <>
                              <Volume2 size={16} className="mr-2" />
                              <span>Ambient nature sounds</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <div className="mb-8">
                      <div className="relative mx-auto" style={{ width: '200px', height: '200px' }}>
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                          {/* Background circle */}
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#E5E7EB"
                            strokeWidth="4"
                          />
                          
                          {/* Progress circle */}
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#FF4281"
                            strokeWidth="4"
                            strokeDasharray="283"
                            strokeDashoffset={283 - (283 * (remainingTime / (duration * 60)))}
                            strokeLinecap="round"
                            transform="rotate(-90 50 50)"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="text-4xl font-mono font-bold">
                            {formatTime(remainingTime)}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <Clock size={14} className="mr-1" />
                            {duration} min session
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center items-center space-x-4">
                      {!isActive ? (
                        <button
                          onClick={startMeditation}
                          className="w-16 h-16 rounded-full bg-primary-500 hover:bg-primary-600 text-white flex items-center justify-center transition-colors"
                        >
                          <Play size={32} />
                        </button>
                      ) : (
                        <>
                          {isPaused ? (
                            <button
                              onClick={resumeMeditation}
                              className="w-16 h-16 rounded-full bg-primary-500 hover:bg-primary-600 text-white flex items-center justify-center transition-colors"
                            >
                              <Play size={32} />
                            </button>
                          ) : (
                            <button
                              onClick={pauseMeditation}
                              className="w-16 h-16 rounded-full bg-primary-500 hover:bg-primary-600 text-white flex items-center justify-center transition-colors"
                            >
                              <Pause size={32} />
                            </button>
                          )}
                          
                          <button
                            onClick={resetMeditation}
                            className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center transition-colors"
                          >
                            <RefreshCw size={20} />
                          </button>
                        </>
                      )}
                    </div>
                    
                    {isSessionCompleted && (
                      <motion.div
                        className="mt-6 p-4 bg-green-50 text-green-700 rounded-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="font-medium mb-1">Meditation Complete</div>
                        <p className="text-sm">
                          Great job! You've completed a {duration} minute {getSelectedMeditationType().name.toLowerCase()} session.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
                
                {/* Guidance Panel */}
                <div className="p-6 bg-gray-50 border-t">
                  <h3 className="font-medium mb-3">Guidance for {getSelectedMeditationType().name}</h3>
                  <p className="text-gray-600 mb-4">{getSelectedMeditationType().description}</p>
                  
                  <div className="text-sm text-gray-600">
                    {selectedType === 'breathing' && (
                      <ol className="space-y-2 list-decimal list-inside">
                        <li>Find a comfortable sitting position with your back straight</li>
                        <li>Close your eyes and take a deep breath in through your nose</li>
                        <li>Hold the breath briefly, then exhale slowly through your mouth</li>
                        <li>Focus your attention on the sensations of your breath</li>
                        <li>When your mind wanders, gently return your focus to your breath</li>
                      </ol>
                    )}
                    
                    {selectedType === 'body-scan' && (
                      <ol className="space-y-2 list-decimal list-inside">
                        <li>Start by bringing awareness to your feet and toes</li>
                        <li>Gradually move your attention upward through your body</li>
                        <li>Notice any sensations, tension, or comfort in each area</li>
                        <li>Don't try to change anything, just observe with curiosity</li>
                        <li>End by holding awareness of your entire body as one</li>
                      </ol>
                    )}
                    
                    {selectedType === 'loving-kindness' && (
                      <ol className="space-y-2 list-decimal list-inside">
                        <li>Begin by directing kind wishes toward yourself</li>
                        <li>Repeat phrases like "May I be happy, may I be healthy"</li>
                        <li>Extend these wishes to a loved one, then a neutral person</li>
                        <li>Continue to someone difficult, then all beings everywhere</li>
                        <li>Feel the warmth of compassion expanding outward</li>
                      </ol>
                    )}
                    
                    {selectedType === 'mindfulness' && (
                      <ol className="space-y-2 list-decimal list-inside">
                        <li>Sit comfortably and bring awareness to the present moment</li>
                        <li>Notice thoughts, feelings, and sensations as they arise</li>
                        <li>Observe each experience without judgment or resistance</li>
                        <li>If you get caught in thoughts, gently return to awareness</li>
                        <li>Practice being a witness to your experience</li>
                      </ol>
                    )}
                    
                    {selectedType === 'guided' && (
                      <ol className="space-y-2 list-decimal list-inside">
                        <li>Follow the verbal instructions throughout the meditation</li>
                        <li>Allow yourself to be led through the practice</li>
                        <li>If your mind wanders, return to the guide's voice</li>
                        <li>Adjust your position if needed for comfort</li>
                        <li>Trust the process and stay present with the guidance</li>
                      </ol>
                    )}
                    
                    {selectedType === 'unguided' && (
                      <ol className="space-y-2 list-decimal list-inside">
                        <li>Choose a focus for your meditation (breath, body, etc.)</li>
                        <li>Sit in silence, maintaining your chosen focus</li>
                        <li>When your mind wanders, gently guide it back</li>
                        <li>Use the interval bells as reminders to refocus</li>
                        <li>Practice self-guidance and gentle discipline</li>
                      </ol>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Benefits Section */}
          <div className="bg-white rounded-xl shadow-card p-6">
            <h2 className="text-xl font-semibold mb-6">Benefits of Regular Meditation</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-primary-50 rounded-lg">
                <h3 className="font-medium text-primary-700 mb-2">Mental Benefits</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Reduces stress and anxiety</li>
                  <li>• Improves focus and concentration</li>
                  <li>• Enhances self-awareness</li>
                  <li>• Promotes emotional well-being</li>
                  <li>• Helps manage depression symptoms</li>
                </ul>
              </div>
              
              <div className="p-4 bg-secondary-50 rounded-lg">
                <h3 className="font-medium text-secondary-700 mb-2">Physical Benefits</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Lowers blood pressure</li>
                  <li>• Improves sleep quality</li>
                  <li>• Reduces pain perception</li>
                  <li>• Strengthens immune system</li>
                  <li>• Decreases tension-related issues</li>
                </ul>
              </div>
              
              <div className="p-4 bg-accent-50 rounded-lg">
                <h3 className="font-medium text-accent-700 mb-2">Long-Term Benefits</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Builds resilience to stress</li>
                  <li>• Increases compassion and kindness</li>
                  <li>• Improves relationships</li>
                  <li>• Enhances overall well-being</li>
                  <li>• Promotes cognitive longevity</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeditationTimer;