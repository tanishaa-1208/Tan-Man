import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { useFeatures } from '../../contexts/FeatureContext';

// Simplified BreathingGame component
const BreathingGame = () => {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'rest'>('rest');
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  
  useEffect(() => {
    let interval: number | undefined;
    
    if (isActive) {
      interval = window.setInterval(() => {
        setTimer(prevTimer => {
          const nextTimer = prevTimer + 1;
          
          // Phase timing logic
          if (phase === 'inhale' && nextTimer > 4) {
            setPhase('hold');
            return 0;
          } else if (phase === 'hold' && nextTimer > 7) {
            setPhase('exhale');
            return 0;
          } else if (phase === 'exhale' && nextTimer > 8) {
            if (cyclesCompleted >= 2) {
              setIsActive(false);
              setCyclesCompleted(0);
              setPhase('rest');
              return 0;
            }
            setPhase('inhale');
            setCyclesCompleted(prev => prev + 1);
            return 0;
          }
          
          return nextTimer;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isActive, phase, cyclesCompleted]);
  
  const startBreathing = () => {
    setIsActive(true);
    setPhase('inhale');
    setTimer(0);
    setCyclesCompleted(0);
  };
  
  return (
    <div className="text-center">
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Calm Breathing</h3>
        <p className="text-gray-600 mb-6">
          Follow the circle to practice deep breathing. This technique can quickly reduce stress and anxiety.
        </p>
        
        <div className="relative mx-auto mb-8" style={{ width: '200px', height: '200px' }}>
          <motion.div
            className="absolute inset-0 bg-primary-100 rounded-full border-4 border-primary-300 flex items-center justify-center text-primary-700 font-bold"
            animate={{
              scale: phase === 'inhale' ? 1.5 : phase === 'exhale' ? 1 : 1.5,
            }}
            transition={{ duration: phase === 'inhale' ? 4 : phase === 'exhale' ? 8 : 0.1 }}
          >
            {phase === 'rest' ? 'Ready' : phase === 'inhale' ? 'Inhale' : phase === 'hold' ? 'Hold' : 'Exhale'}
          </motion.div>
        </div>
        
        <button
          onClick={startBreathing}
          disabled={isActive}
          className="btn-primary"
        >
          {isActive ? `Breathing... ${cyclesCompleted}/3 cycles` : 'Start Breathing Exercise'}
        </button>
      </div>
    </div>
  );
};

// Color Harmony Game Component
const ColorHarmonyGame = () => {
  const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
  const [sequence, setSequence] = useState<string[]>([]);
  const [playerSequence, setPlayerSequence] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerTurn, setIsPlayerTurn] = useState(false);
  const [level, setLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const { incrementGamesPlayed } = useFeatures();
  
  const flashColor = useCallback((color: string, delay: number) => {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        const element = document.getElementById(color);
        if (element) element.classList.add('opacity-100');
        
        setTimeout(() => {
          if (element) element.classList.remove('opacity-100');
          resolve();
        }, 500);
      }, delay);
    });
  }, []);
  
  const playSequence = useCallback(async () => {
    setIsPlayerTurn(false);
    
    for (let i = 0; i < sequence.length; i++) {
      await flashColor(sequence[i], i * 1000);
    }
    
    setTimeout(() => {
      setIsPlayerTurn(true);
    }, sequence.length * 1000 + 500);
  }, [sequence, flashColor]);
  
  const startGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setLevel(1);
    setGameOver(false);
    setIsPlaying(true);
    
    // Start with one random color
    const firstColor = colors[Math.floor(Math.random() * colors.length)];
    setSequence([firstColor]);
    
    setTimeout(() => {
      playSequence();
    }, 1000);
  };
  
  const handleColorClick = (color: string) => {
    if (!isPlayerTurn) return;
    
    const newPlayerSequence = [...playerSequence, color];
    setPlayerSequence(newPlayerSequence);
    
    // Check if player made a mistake
    const currentIndex = playerSequence.length;
    if (color !== sequence[currentIndex]) {
      setGameOver(true);
      setIsPlaying(false);
      incrementGamesPlayed();
      return;
    }
    
    // Check if player completed the sequence
    if (newPlayerSequence.length === sequence.length) {
      // Correct sequence, advance to next level
      setPlayerSequence([]);
      setIsPlayerTurn(false);
      setLevel(level + 1);
      
      setTimeout(() => {
        const nextColor = colors[Math.floor(Math.random() * colors.length)];
        setSequence([...sequence, nextColor]);
      }, 1000);
      
      setTimeout(() => {
        playSequence();
      }, 2000);
    }
  };
  
  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-4">Color Harmony</h3>
      <p className="text-gray-600 mb-6">
        Remember and repeat the color sequence. This game improves focus and memory.
      </p>
      
      <div className="mb-8">
        {isPlaying && (
          <div className="mb-4">
            <p className="font-medium">
              Level: {level} | {isPlayerTurn ? 'Your turn' : 'Watch the sequence...'}
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-sm mx-auto mb-6">
          {colors.map((color, index) => (
            <motion.button
              key={index}
              id={color}
              onClick={() => handleColorClick(color)}
              disabled={!isPlayerTurn}
              className={`${color} h-16 rounded-lg opacity-50 transition-opacity`}
              whileTap={{ scale: 0.95 }}
            />
          ))}
        </div>
        
        {!isPlaying && (
          <button
            onClick={startGame}
            className="btn-primary"
          >
            {gameOver ? `Game Over - Level ${level}` : 'Start Game'}
          </button>
        )}
      </div>
    </div>
  );
};

// Zen Garden Game Component
const ZenGardenGame = () => {
  const [pattern, setPattern] = useState<number[][]>(Array(8).fill(Array(8).fill(0)));
  const [isDrawing, setIsDrawing] = useState(false);
  
  const handleMouseDown = (row: number, col: number) => {
    setIsDrawing(true);
    const newPattern = pattern.map(r => [...r]);
    newPattern[row][col] = 1;
    setPattern(newPattern);
  };
  
  const handleMouseEnter = (row: number, col: number) => {
    if (isDrawing) {
      const newPattern = pattern.map(r => [...r]);
      newPattern[row][col] = 1;
      setPattern(newPattern);
    }
  };
  
  const handleMouseUp = () => {
    setIsDrawing(false);
  };
  
  const resetGarden = () => {
    setPattern(Array(8).fill(Array(8).fill(0)));
  };
  
  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-4">Zen Garden</h3>
      <p className="text-gray-600 mb-6">
        Create peaceful patterns in the sand. A mindful activity to promote relaxation.
      </p>
      
      <div 
        className="bg-amber-100 p-4 rounded-lg mb-6 max-w-md mx-auto"
        onMouseLeave={() => setIsDrawing(false)}
      >
        {pattern.map((row, i) => (
          <div key={i} className="flex justify-center">
            {row.map((cell, j) => (
              <div
                key={j}
                className={`w-8 h-8 border border-amber-200 transition-colors ${
                  cell ? 'bg-amber-300' : 'hover:bg-amber-200'
                }`}
                onMouseDown={() => handleMouseDown(i, j)}
                onMouseEnter={() => handleMouseEnter(i, j)}
                onMouseUp={handleMouseUp}
              />
            ))}
          </div>
        ))}
      </div>
      
      <button onClick={resetGarden} className="btn-primary">
        Reset Garden
      </button>
    </div>
  );
};

// Bubble Pop Game Component
const BubblePopGame = () => {
  const [bubbles, setBubbles] = useState<{ id: number; x: number; y: number }[]>([]);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      
      const bubbleGenerator = setInterval(() => {
        const newBubble = {
          id: Date.now(),
          x: Math.random() * 80 + 10, // Keep bubbles within 10-90% of container
          y: Math.random() * 80 + 10,
        };
        setBubbles(prev => [...prev, newBubble]);
      }, 1000);
      
      return () => {
        clearInterval(timer);
        clearInterval(bubbleGenerator);
      };
    } else if (timeLeft === 0) {
      setIsPlaying(false);
      setBubbles([]);
    }
  }, [isPlaying, timeLeft]);
  
  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setBubbles([]);
    setIsPlaying(true);
  };
  
  const popBubble = (id: number) => {
    setBubbles(prev => prev.filter(bubble => bubble.id !== id));
    setScore(prev => prev + 1);
  };
  
  return (
    <div className="text-center">
      <h3 className="text-xl font-semibold mb-4">Bubble Pop</h3>
      <p className="text-gray-600 mb-6">
        Pop the bubbles to release stress. A fun way to practice mindfulness and focus.
      </p>
      
      <div className="mb-4">
        <span className="font-medium mr-4">Score: {score}</span>
        <span className="font-medium">Time: {timeLeft}s</span>
      </div>
      
      <div className="relative bg-blue-50 h-64 rounded-lg mb-6 overflow-hidden">
        {bubbles.map(bubble => (
          <motion.div
            key={bubble.id}
            className="absolute w-8 h-8 bg-blue-300 rounded-full cursor-pointer"
            style={{ left: `${bubble.x}%`, top: `${bubble.y}%` }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.2 }}
            onClick={() => popBubble(bubble.id)}
          />
        ))}
        
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
            <button onClick={startGame} className="btn-primary">
              {timeLeft === 0 ? `Play Again (Score: ${score})` : 'Start Game'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Games Page Component
const GamesPage = () => {
  const [activeGame, setActiveGame] = useState<'breathing' | 'color' | 'zen' | 'bubble' | null>(null);
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Stress Relieving Games</h1>
          <p className="text-center text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            These mindful games are designed to reduce stress, improve focus, and provide a moment of calm during your day.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <motion.div 
              className="bg-white rounded-xl shadow-card overflow-hidden"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-48 bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Calm Breathing</h3>
                <p className="text-gray-600 mb-4">
                  A guided breathing exercise that helps activate your body's relaxation response in just 3 minutes.
                </p>
                <button
                  onClick={() => setActiveGame(activeGame === 'breathing' ? null : 'breathing')}
                  className="btn-primary w-full"
                >
                  {activeGame === 'breathing' ? 'Hide Game' : 'Play Now'}
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl shadow-card overflow-hidden"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-48 bg-gradient-to-r from-secondary-400 to-secondary-600 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-2">
                  <div className="w-10 h-10 bg-white/20 rounded-lg" />
                  <div className="w-10 h-10 bg-white/20 rounded-lg" />
                  <div className="w-10 h-10 bg-white/20 rounded-lg" />
                  <div className="w-10 h-10 bg-white rounded-lg" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Color Harmony</h3>
                <p className="text-gray-600 mb-4">
                  Test your memory and improve focus by remembering and repeating color sequences.
                </p>
                <button
                  onClick={() => setActiveGame(activeGame === 'color' ? null : 'color')}
                  className="btn-primary w-full"
                >
                  {activeGame === 'color' ? 'Hide Game' : 'Play Now'}
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl shadow-card overflow-hidden"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-48 bg-gradient-to-r from-amber-400 to-amber-600 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-1">
                  {Array(9).fill(null).map((_, i) => (
                    <div key={i} className="w-8 h-8 bg-white/20 rounded-sm" />
                  ))}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Zen Garden</h3>
                <p className="text-gray-600 mb-4">
                  Create peaceful patterns in a virtual sand garden to promote mindfulness and relaxation.
                </p>
                <button
                  onClick={() => setActiveGame(activeGame === 'zen' ? null : 'zen')}
                  className="btn-primary w-full"
                >
                  {activeGame === 'zen' ? 'Hide Game' : 'Play Now'}
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white rounded-xl shadow-card overflow-hidden"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                <div className="relative w-32 h-32">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="absolute w-8 h-8 bg-white/20 rounded-full"
                      style={{
                        left: `${Math.random() * 80}%`,
                        top: `${Math.random() * 80}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Bubble Pop</h3>
                <p className="text-gray-600 mb-4">
                  Pop virtual bubbles to release stress and practice mindful focus in a calming environment.
                </p>
                <button
                  onClick={() => setActiveGame(activeGame === 'bubble' ? null : 'bubble')}
                  className="btn-primary w-full"
                >
                  {activeGame === 'bubble' ? 'Hide Game' : 'Play Now'}
                </button>
              </div>
            </motion.div>
          </div>
          
          {activeGame === 'breathing' && (
            <motion.div
              className="bg-white rounded-xl shadow-card p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <BreathingGame />
            </motion.div>
          )}
          
          {activeGame === 'color' && (
            <motion.div
              className="bg-white rounded-xl shadow-card p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ColorHarmonyGame />
            </motion.div>
          )}
          
          {activeGame === 'zen' && (
            <motion.div
              className="bg-white rounded-xl shadow-card p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ZenGardenGame />
            </motion.div>
          )}
          
          {activeGame === 'bubble' && (
            <motion.div
              className="bg-white rounded-xl shadow-card p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <BubblePopGame />
            </motion.div>
          )}
          
          <div className="bg-secondary-50 border border-secondary-100 rounded-lg p-6">
            <h3 className="font-semibold mb-2">Benefits of Mindful Games</h3>
            <ul className="space-y-2 text-gray-700">
              <li>• Reduce cortisol (stress hormone) levels</li>
              <li>• Improve focus and concentration</li>
              <li>• Provide a mental break from worries</li>
              <li>• Practice mindfulness in an engaging way</li>
              <li>• Create moments of calm throughout your day</li>
            </ul>
            <p className="mt-4 text-sm text-gray-600">
              Even just 5 minutes of game play can significantly reduce stress levels and improve mood.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesPage;