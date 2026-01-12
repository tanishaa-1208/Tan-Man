import { createContext, useContext, useState, ReactNode } from 'react';

// Define types for feature data
type MoodEntry = {
  id: string;
  date: Date;
  mood: 'happy' | 'neutral' | 'sad' | 'anxious' | 'stressed';
  notes: string;
};

type StressTestResult = {
  id: string;
  date: Date;
  score: number;
  level: 'low' | 'moderate' | 'high';
};

type MeditationSession = {
  id: string;
  date: Date;
  duration: number; // in minutes
  type: string;
};

// Define the context type
type FeatureContextType = {
  // Mood tracking
  moodEntries: MoodEntry[];
  addMoodEntry: (mood: MoodEntry['mood'], notes: string) => void;
  
  // Stress test
  stressTestResults: StressTestResult[];
  addStressTestResult: (score: number) => void;
  
  // Meditation
  meditationSessions: MeditationSession[];
  addMeditationSession: (duration: number, type: string) => void;
  
  // Games data
  gamesPlayed: number;
  incrementGamesPlayed: () => void;
  
  // Virtual Nature
  natureSessionsCompleted: number;
  incrementNatureSessions: () => void;
};

// Create the context
const FeatureContext = createContext<FeatureContextType | undefined>(undefined);

// Provider Component
export const FeatureProvider = ({ children }: { children: ReactNode }) => {
  // Initialize states
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [stressTestResults, setStressTestResults] = useState<StressTestResult[]>([]);
  const [meditationSessions, setMeditationSessions] = useState<MeditationSession[]>([]);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [natureSessionsCompleted, setNatureSessionsCompleted] = useState(0);

  // Mood tracking functions
  const addMoodEntry = (mood: MoodEntry['mood'], notes: string) => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date(),
      mood,
      notes,
    };
    setMoodEntries([...moodEntries, newEntry]);
  };

  // Stress test functions
  const addStressTestResult = (score: number) => {
    // Determine stress level based on score
    let level: 'low' | 'moderate' | 'high';
    if (score <= 13) level = 'low';
    else if (score <= 26) level = 'moderate';
    else level = 'high';

    const newResult: StressTestResult = {
      id: Date.now().toString(),
      date: new Date(),
      score,
      level,
    };
    setStressTestResults([...stressTestResults, newResult]);
  };

  // Meditation functions
  const addMeditationSession = (duration: number, type: string) => {
    const newSession: MeditationSession = {
      id: Date.now().toString(),
      date: new Date(),
      duration,
      type,
    };
    setMeditationSessions([...meditationSessions, newSession]);
  };

  // Game functions
  const incrementGamesPlayed = () => {
    setGamesPlayed(prev => prev + 1);
  };

  // Virtual Nature functions
  const incrementNatureSessions = () => {
    setNatureSessionsCompleted(prev => prev + 1);
  };

  return (
    <FeatureContext.Provider
      value={{
        moodEntries,
        addMoodEntry,
        stressTestResults,
        addStressTestResult,
        meditationSessions,
        addMeditationSession,
        gamesPlayed,
        incrementGamesPlayed,
        natureSessionsCompleted,
        incrementNatureSessions,
      }}
    >
      {children}
    </FeatureContext.Provider>
  );
};

// Custom Hook
export const useFeatures = () => {
  const context = useContext(FeatureContext);
  if (context === undefined) {
    throw new Error('useFeatures must be used within a FeatureProvider');
  }
  return context;
};