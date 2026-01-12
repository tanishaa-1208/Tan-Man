import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Clock, RefreshCw } from 'lucide-react';
import { useFeatures } from '../../contexts/FeatureContext';

const natureScenes = [
  {
    id: 'forest',
    name: 'Forest Retreat',
    description: 'Immerse yourself in a peaceful forest with birdsong and rustling leaves.',
    image: 'https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    audio: 'https://freesound.org/data/previews/516/516487_7756297-lq.mp3',
  },
  {
    id: 'beach',
    name: 'Ocean Waves',
    description: 'Listen to the rhythmic sounds of waves on a tranquil beach.',
    image: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    audio: 'https://freesound.org/data/previews/467/467987_7178903-lq.mp3',
  },
  {
    id: 'rain',
    name: 'Gentle Rain',
    description: 'Experience the calming sound of rainfall in a cozy setting.',
    image: 'https://images.pexels.com/photos/7002973/pexels-photo-7002973.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    audio: 'https://freesound.org/data/previews/346/346170_255786-lq.mp3',
  },
  {
    id: 'mountains',
    name: 'Mountain Breeze',
    description: 'Find peace with the sounds of wind through a mountain valley.',
    image: 'https://images.pexels.com/photos/1261728/pexels-photo-1261728.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    audio: 'https://freesound.org/data/previews/131/131723_2398403-lq.mp3',
  },
];

const VirtualNaturePage = () => {
  const [selectedScene, setSelectedScene] = useState(natureScenes[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [timer, setTimer] = useState(5); // Default 5 minutes
  const [remainingTime, setRemainingTime] = useState(timer * 60); // in seconds
  const [isTimerActive, setIsTimerActive] = useState(false);
  const { incrementNatureSessions } = useFeatures();
  
  // Handle audio playback
  useEffect(() => {
    const audio = new Audio(selectedScene.audio);
    
    if (isPlaying) {
      audio.loop = true;
      audio.volume = isMuted ? 0 : 0.5;
      audio.play().catch(error => console.error("Audio playback failed:", error));
    }
    
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [selectedScene, isPlaying, isMuted]);
  
  // Timer functionality
  useEffect(() => {
    let interval: number | undefined;
    
    if (isTimerActive && remainingTime > 0) {
      interval = window.setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);
    } else if (remainingTime === 0 && isTimerActive) {
      setIsPlaying(false);
      setIsTimerActive(false);
      incrementNatureSessions();
      // Would trigger a notification or sound effect in a real app
    }
    
    return () => clearInterval(interval);
  }, [isTimerActive, remainingTime, incrementNatureSessions]);
  
  const togglePlayPause = () => {
    if (!isPlaying && !isTimerActive) {
      // Starting a new session
      setRemainingTime(timer * 60);
      setIsTimerActive(true);
    } else if (!isPlaying && isTimerActive) {
      // Resuming paused session
      setIsTimerActive(true);
    } else {
      // Pausing active session
      setIsTimerActive(false);
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const resetSession = () => {
    setIsPlaying(false);
    setIsTimerActive(false);
    setRemainingTime(timer * 60);
  };
  
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Virtual Nature Escape</h1>
          <p className="text-center text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Transport yourself to calming natural environments. These immersive scenes combine beautiful visuals with soothing sounds to help reduce stress and anxiety.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {natureScenes.map((scene) => (
              <motion.button
                key={scene.id}
                onClick={() => {
                  setSelectedScene(scene);
                  if (isPlaying) {
                    setIsPlaying(false);
                    setTimeout(() => setIsPlaying(true), 100);
                  }
                }}
                className={`relative rounded-lg overflow-hidden h-24 group ${
                  selectedScene.id === scene.id ? 'ring-2 ring-primary-500' : ''
                }`}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
              >
                <img 
                  src={scene.image} 
                  alt={scene.name} 
                  className="absolute inset-0 w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all"></div>
                <span className="absolute inset-0 flex items-center justify-center text-white font-medium">
                  {scene.name}
                </span>
              </motion.button>
            ))}
          </div>
          
          <motion.div 
            className="bg-white rounded-xl shadow-card overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative h-72 md:h-96">
              <img 
                src={selectedScene.image} 
                alt={selectedScene.name} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black bg-opacity-10"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <h2 className="text-white text-xl font-semibold">{selectedScene.name}</h2>
                <p className="text-white text-opacity-90">{selectedScene.description}</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={togglePlayPause}
                    className="w-12 h-12 bg-primary-500 hover:bg-primary-600 text-white rounded-full flex items-center justify-center transition-colors"
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                  </button>
                  
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  
                  <button
                    onClick={resetSession}
                    className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                  >
                    <RefreshCw size={20} />
                  </button>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock size={20} className="text-gray-500" />
                  <div className="text-3xl font-mono font-bold">
                    {formatTime(remainingTime)}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Session Duration:</span>
                  <select
                    value={timer}
                    onChange={(e) => {
                      const newTimer = Number(e.target.value);
                      setTimer(newTimer);
                      if (!isTimerActive) {
                        setRemainingTime(newTimer * 60);
                      }
                    }}
                    className="bg-gray-100 border border-gray-300 rounded-md px-3 py-1"
                    disabled={isTimerActive}
                  >
                    <option value={1}>1 min</option>
                    <option value={3}>3 min</option>
                    <option value={5}>5 min</option>
                    <option value={10}>10 min</option>
                    <option value={15}>15 min</option>
                    <option value={30}>30 min</option>
                  </select>
                </div>
              </div>
              
              <div className="p-4 bg-secondary-50 border border-secondary-100 rounded-lg text-sm text-gray-600">
                <p className="font-medium mb-2">How to use Virtual Nature Escape:</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Select a nature scene that resonates with you</li>
                  <li>Choose your preferred session duration</li>
                  <li>Press play and find a comfortable position</li>
                  <li>Focus on the imagery and sounds while taking slow, deep breaths</li>
                  <li>Allow your mind to be fully present in this virtual environment</li>
                </ol>
                <p className="mt-3">Regular practice can help reduce stress and improve focus.</p>
              </div>
            </div>
          </motion.div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Taking regular breaks in nature, even virtual ones, has been shown to reduce stress hormones and improve mood.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualNaturePage;