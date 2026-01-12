import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, BarChart } from 'lucide-react';
import { useFeatures } from '../../contexts/FeatureContext';
import { useNavigate } from 'react-router-dom';

// PSS Questions based on the Perceived Stress Scale (Cohen, S., 1994)
const questions = [
  {
    id: 1,
    text: 'In the last month, how often have you been upset because of something that happened unexpectedly?',
  },
  {
    id: 2,
    text: 'In the last month, how often have you felt that you were unable to control the important things in your life?',
  },
  {
    id: 3,
    text: 'In the last month, how often have you felt nervous and stressed?',
  },
  {
    id: 4,
    text: 'In the last month, how often have you felt confident about your ability to handle your personal problems?',
    reverse: true,
  },
  {
    id: 5,
    text: 'In the last month, how often have you felt that things were going your way?',
    reverse: true,
  },
  {
    id: 6,
    text: 'In the last month, how often have you found that you could not cope with all the things that you had to do?',
  },
  {
    id: 7,
    text: 'In the last month, how often have you been able to control irritations in your life?',
    reverse: true,
  },
  {
    id: 8,
    text: 'In the last month, how often have you felt that you were on top of things?',
    reverse: true,
  },
  {
    id: 9,
    text: 'In the last month, how often have you been angered because of things that happened that were outside of your control?',
  },
  {
    id: 10,
    text: 'In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?',
  },
];

// Response options
const options = [
  { value: 0, label: 'Never' },
  { value: 1, label: 'Almost Never' },
  { value: 2, label: 'Sometimes' },
  { value: 3, label: 'Fairly Often' },
  { value: 4, label: 'Very Often' },
];

const StressTestPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(questions.length).fill(-1));
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const { addStressTestResult } = useFeatures();
  const navigate = useNavigate();

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
  };

  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const isAnswered = answers[currentQuestion] !== -1;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const calculateScore = () => {
    // Calculate raw score
    let totalScore = 0;
    for (let i = 0; i < questions.length; i++) {
      const value = answers[i];
      if (questions[i].reverse) {
        // For positively stated items, we reverse the score
        totalScore += 4 - value;
      } else {
        totalScore += value;
      }
    }
    
    setScore(totalScore);
    addStressTestResult(totalScore);
    setIsCompleted(true);
  };

  const getStressLevel = () => {
    if (score <= 13) return { level: 'Low', color: 'text-green-500' };
    if (score <= 26) return { level: 'Moderate', color: 'text-yellow-500' };
    return { level: 'High', color: 'text-red-500' };
  };

  const getRecommendations = () => {
    const { level } = getStressLevel();
    
    if (level === 'Low') {
      return [
        'Continue your current stress management practices',
        'Consider incorporating regular mindfulness or meditation',
        'Maintain healthy sleep patterns',
        'Stay connected with your support network',
      ];
    } else if (level === 'Moderate') {
      return [
        'Schedule regular breaks throughout your day',
        'Try our meditation timer for guided relaxation',
        'Consider limiting caffeine and alcohol',
        'Prioritize physical activity for at least 30 minutes daily',
        'Use our mood tracking feature to identify stress triggers',
      ];
    } else {
      return [
        'Consider speaking with a mental health professional',
        'Practice deep breathing exercises several times daily',
        'Establish clear boundaries between work and personal time',
        'Use our Virtual Nature feature for quick stress relief',
        'Prioritize self-care activities that you enjoy',
        'Consider our AI emotional support feature for coping strategies',
      ];
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">PSS Stress Test</h1>
          
          {!isCompleted ? (
            <motion.div 
              className="bg-white rounded-xl shadow-card p-6 md:p-8"
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-500">Question {currentQuestion + 1} of {questions.length}</span>
                  <span className="text-sm font-medium text-primary-500">{Math.round(progress)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-primary-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold mb-6">{questions[currentQuestion].text}</h2>
              
              <div className="space-y-3 mb-8">
                {options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all flex justify-between items-center ${
                      answers[currentQuestion] === option.value
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span>{option.label}</span>
                    {answers[currentQuestion] === option.value && (
                      <Check size={20} className="text-primary-500" />
                    )}
                  </button>
                ))}
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={goToPreviousQuestion}
                  disabled={currentQuestion === 0}
                  className="flex items-center text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} />
                  <span>Previous</span>
                </button>
                
                <button
                  onClick={goToNextQuestion}
                  disabled={!isAnswered}
                  className={`btn-primary ${!isAnswered ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
                  {currentQuestion < questions.length - 1 && <ChevronRight size={20} className="ml-1" />}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              className="bg-white rounded-xl shadow-card p-6 md:p-8"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 mb-4">
                  <BarChart size={32} className="text-primary-500" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Your Stress Assessment Results</h2>
                <p className="text-gray-600">Based on the Perceived Stress Scale (PSS)</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium">Your Stress Score:</span>
                  <span className="text-2xl font-bold">{score}/40</span>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Low Stress</span>
                    <span>Moderate Stress</span>
                    <span>High Stress</span>
                  </div>
                  <div className="w-full h-3 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full"></div>
                  <div className="relative">
                    <div 
                      className="absolute top-0 w-3 h-5 bg-gray-800 rounded-full transform -translate-x-1/2 mt-1" 
                      style={{ left: `${(score / 40) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200 mt-4">
                  <p className="font-medium mb-2">
                    Your stress level is currently: 
                    <span className={`font-bold ${getStressLevel().color} ml-2`}>
                      {getStressLevel().level}
                    </span>
                  </p>
                  <p className="text-gray-600 text-sm">
                    {getStressLevel().level === 'Low' && 'Great job! Your stress levels are well-managed. Keep up the good work.'}
                    {getStressLevel().level === 'Moderate' && 'You\'re experiencing a moderate level of stress. This is common, but it\'s important to implement stress management techniques.'}
                    {getStressLevel().level === 'High' && 'You\'re experiencing a high level of stress. It\'s important to take steps to reduce your stress levels and consider professional support.'}
                  </p>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Recommendations</h3>
                <ul className="space-y-2">
                  {getRecommendations().map((recommendation, index) => (
                    <li key={index} className="flex items-start">
                      <Check size={20} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button
                  onClick={() => navigate('/features')}
                  className="btn-outline-primary"
                >
                  Back to Features
                </button>
                <button
                  onClick={() => {
                    setIsCompleted(false);
                    setCurrentQuestion(0);
                    setAnswers(Array(questions.length).fill(-1));
                  }}
                  className="btn-primary"
                >
                  Take Test Again
                </button>
              </div>
            </motion.div>
          )}
          
          <div className="mt-8 p-4 bg-secondary-50 border border-secondary-100 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>About this test:</strong> The Perceived Stress Scale (PSS) is one of the most widely used psychological instruments for measuring the perception of stress. It assesses the degree to which situations in one's life are appraised as stressful.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StressTestPage;