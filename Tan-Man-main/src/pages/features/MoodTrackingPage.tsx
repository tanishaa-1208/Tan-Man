import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, BarChart2, PlusCircle, Edit, Trash2, Save, ChevronRight, ChevronLeft } from 'lucide-react';
import { useFeatures } from '../../contexts/FeatureContext';

type Mood = 'happy' | 'neutral' | 'sad' | 'anxious' | 'stressed';

const moodEmojis = {
  happy: { emoji: '😃', color: 'bg-green-100 text-green-500 border-green-300' },
  neutral: { emoji: '😐', color: 'bg-blue-100 text-blue-500 border-blue-300' },
  sad: { emoji: '😔', color: 'bg-purple-100 text-purple-500 border-purple-300' },
  anxious: { emoji: '😰', color: 'bg-yellow-100 text-yellow-500 border-yellow-300' },
  stressed: { emoji: '😫', color: 'bg-red-100 text-red-500 border-red-300' },
};

const MoodTrackingPage = () => {
  const { moodEntries, addMoodEntry } = useFeatures();
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [notes, setNotes] = useState('');
  const [editingEntry, setEditingEntry] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  const saveMoodEntry = () => {
    if (selectedMood) {
      addMoodEntry(selectedMood, notes);
      setSelectedMood(null);
      setNotes('');
      setShowForm(false);
    }
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  // Get entries for current month
  const currentMonthEntries = moodEntries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate.getMonth() === currentMonth && entryDate.getFullYear() === currentYear;
  });
  
  // Calculate mood distribution for current month
  const moodDistribution = {
    happy: currentMonthEntries.filter(entry => entry.mood === 'happy').length,
    neutral: currentMonthEntries.filter(entry => entry.mood === 'neutral').length,
    sad: currentMonthEntries.filter(entry => entry.mood === 'sad').length,
    anxious: currentMonthEntries.filter(entry => entry.mood === 'anxious').length,
    stressed: currentMonthEntries.filter(entry => entry.mood === 'stressed').length,
  };
  
  const totalEntries = Object.values(moodDistribution).reduce((sum, count) => sum + count, 0);
  
  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Mood Tracking</h1>
          <p className="text-center text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Track your moods over time to identify patterns and gain insights into your emotional wellbeing.
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Mood Entry Form */}
            <motion.div 
              className="lg:col-span-2 bg-white rounded-xl shadow-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">How are you feeling?</h2>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="btn-outline-primary py-1 px-3 flex items-center"
                >
                  {showForm ? 'Cancel' : <><PlusCircle size={16} className="mr-1" /> New Entry</>}
                </button>
              </div>
              
              {showForm && (
                <div className="mb-6">
                  <div className="flex flex-wrap justify-center gap-4 mb-6">
                    {(Object.keys(moodEmojis) as Mood[]).map((mood) => (
                      <button
                        key={mood}
                        onClick={() => setSelectedMood(mood)}
                        className={`w-16 h-16 rounded-full border-2 flex items-center justify-center text-2xl transition-all ${
                          selectedMood === mood 
                            ? `${moodEmojis[mood].color} border-2` 
                            : 'bg-gray-100 border-gray-200 hover:bg-gray-200'
                        }`}
                      >
                        {moodEmojis[mood].emoji}
                      </button>
                    ))}
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                      Notes (optional)
                    </label>
                    <textarea
                      id="notes"
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="What's contributing to your mood? Any specific triggers or thoughts?"
                      className="input"
                    />
                  </div>
                  
                  <button
                    onClick={saveMoodEntry}
                    disabled={!selectedMood}
                    className="btn-primary w-full disabled:opacity-50"
                  >
                    Save Mood Entry
                  </button>
                </div>
              )}
              
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">Recent Entries</h3>
                  <div className="flex items-center space-x-2">
                    <button onClick={previousMonth} className="p-1 rounded-full hover:bg-gray-200">
                      <ChevronLeft size={20} />
                    </button>
                    <span className="font-medium">
                      {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </span>
                    <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-200">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
                
                {currentMonthEntries.length > 0 ? (
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {currentMonthEntries.map((entry, index) => (
                      <div 
                        key={entry.id} 
                        className="p-3 border rounded-lg hover:shadow-sm transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex items-center">
                            <span className="text-2xl mr-3">
                              {moodEmojis[entry.mood].emoji}
                            </span>
                            <div>
                              <div className="font-medium capitalize">{entry.mood}</div>
                              <div className="text-sm text-gray-500">{formatDate(new Date(entry.date))}</div>
                            </div>
                          </div>
                        </div>
                        {entry.notes && (
                          <div className="mt-2 text-gray-700">
                            {entry.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    No mood entries for this month.
                  </div>
                )}
              </div>
            </motion.div>
            
            {/* Mood Stats */}
            <motion.div 
              className="bg-white rounded-xl shadow-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h2 className="text-xl font-semibold mb-6">Monthly Overview</h2>
              
              {totalEntries > 0 ? (
                <>
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Mood Distribution</span>
                      <span className="text-sm font-medium">{totalEntries} entries</span>
                    </div>
                    
                    {(Object.keys(moodDistribution) as Mood[]).map((mood) => {
                      const percentage = totalEntries > 0 
                        ? Math.round((moodDistribution[mood] / totalEntries) * 100) 
                        : 0;
                      
                      return (
                        <div key={mood} className="mb-3">
                          <div className="flex justify-between mb-1">
                            <div className="flex items-center">
                              <span className="mr-2">{moodEmojis[mood].emoji}</span>
                              <span className="capitalize">{mood}</span>
                            </div>
                            <span className="text-sm font-medium">{percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className={`h-2.5 rounded-full ${moodEmojis[mood].color.split(' ')[0]}`} 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-4">Dominant Mood</h3>
                    
                    {(() => {
                      const dominantMood = Object.entries(moodDistribution)
                        .reduce((a, b) => a[1] > b[1] ? a : b)[0] as Mood;
                      
                      return (
                        <div className={`p-4 rounded-lg flex items-center ${moodEmojis[dominantMood].color}`}>
                          <span className="text-4xl mr-4">{moodEmojis[dominantMood].emoji}</span>
                          <div>
                            <div className="font-medium capitalize">{dominantMood}</div>
                            <div className="text-sm">
                              {dominantMood === 'happy' && 'You\'ve been feeling great this month!'}
                              {dominantMood === 'neutral' && 'You\'ve been feeling balanced this month.'}
                              {dominantMood === 'sad' && 'You\'ve been feeling down this month.'}
                              {dominantMood === 'anxious' && 'You\'ve been feeling anxious this month.'}
                              {dominantMood === 'stressed' && 'You\'ve been feeling stressed this month.'}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </>
              ) : (
                <div className="text-center py-10">
                  <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 mb-4">No mood data available for this month.</p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="btn-primary"
                  >
                    Log Your First Mood
                  </button>
                </div>
              )}
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-3">Mood Insights</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Regularly tracking your mood can help you:
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Identify emotional patterns</li>
                  <li>• Recognize triggers</li>
                  <li>• Understand the impact of your daily habits</li>
                  <li>• Measure progress in your mental wellness journey</li>
                </ul>
              </div>
            </motion.div>
          </div>
          
          <div className="bg-secondary-50 border border-secondary-100 rounded-lg p-6">
            <h3 className="font-semibold mb-3">Tips for Effective Mood Tracking</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-secondary-700 mb-2">Best Practices:</p>
                <ul className="text-gray-700 space-y-1">
                  <li>• Track at consistent times each day</li>
                  <li>• Note significant events that may affect mood</li>
                  <li>• Be honest with yourself about how you feel</li>
                  <li>• Look for patterns over weeks and months</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-secondary-700 mb-2">What to Include in Notes:</p>
                <ul className="text-gray-700 space-y-1">
                  <li>• Sleep quality and duration</li>
                  <li>• Exercise or physical activity</li>
                  <li>• Social interactions</li>
                  <li>• Diet and nutrition</li>
                  <li>• Stressful or positive events</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoodTrackingPage;