import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, PieChart, LineChart, ArrowUpRight, ArrowDownRight, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { useFeatures } from '../../contexts/FeatureContext';
import { BarChart, PieChart as RechartsPie, Cell, ResponsiveContainer, LineChart as RechartsLine, Line, XAxis, YAxis, Tooltip, CartesianGrid, Bar } from 'recharts';

const ReportsPage = () => {
  const { moodEntries, stressTestResults, meditationSessions, gamesPlayed, natureSessionsCompleted } = useFeatures();
  const [reportType, setReportType] = useState<'weekly' | 'monthly'>('weekly');
  const [currentWeek, setCurrentWeek] = useState(0); // 0 = current week, -1 = last week, etc.
  const [currentMonth, setCurrentMonth] = useState(0); // 0 = current month, -1 = last month, etc.
  
  // Calculate date ranges for reports
  const getCurrentDateRange = () => {
    const today = new Date();
    
    if (reportType === 'weekly') {
      // Get start of the selected week (Sunday)
      const startOfWeek = new Date(today);
      const dayOfWeek = startOfWeek.getDay();
      const diff = startOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 0); // adjust when day is Sunday
      startOfWeek.setDate(diff + (currentWeek * 7));
      startOfWeek.setHours(0, 0, 0, 0);
      
      // Get end of the selected week (Saturday)
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      
      return {
        start: startOfWeek,
        end: endOfWeek,
        label: `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
      };
    } else {
      // Get start of the selected month
      const startOfMonth = new Date(today.getFullYear(), today.getMonth() + currentMonth, 1);
      
      // Get end of the selected month
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + currentMonth + 1, 0);
      endOfMonth.setHours(23, 59, 59, 999);
      
      return {
        start: startOfMonth,
        end: endOfMonth,
        label: startOfMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
      };
    }
  };
  
  const dateRange = getCurrentDateRange();
  
  // Filter data based on selected time range
  const filteredMoodEntries = moodEntries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate >= dateRange.start && entryDate <= dateRange.end;
  });
  
  const filteredStressResults = stressTestResults.filter(result => {
    const resultDate = new Date(result.date);
    return resultDate >= dateRange.start && resultDate <= dateRange.end;
  });
  
  const filteredMeditationSessions = meditationSessions.filter(session => {
    const sessionDate = new Date(session.date);
    return sessionDate >= dateRange.start && sessionDate <= dateRange.end;
  });
  
  // Prepare data for charts
  const moodDistribution = {
    happy: filteredMoodEntries.filter(entry => entry.mood === 'happy').length,
    neutral: filteredMoodEntries.filter(entry => entry.mood === 'neutral').length,
    sad: filteredMoodEntries.filter(entry => entry.mood === 'sad').length,
    anxious: filteredMoodEntries.filter(entry => entry.mood === 'anxious').length,
    stressed: filteredMoodEntries.filter(entry => entry.mood === 'stressed').length,
  };
  
  const moodChartData = Object.entries(moodDistribution).map(([mood, count]) => ({
    name: mood.charAt(0).toUpperCase() + mood.slice(1),
    value: count
  }));
  
  const stressChartData = filteredStressResults.map(result => ({
    date: new Date(result.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    score: result.score
  }));
  
  // Meditation minutes data
  const totalMeditationMinutes = filteredMeditationSessions.reduce((total, session) => total + session.duration, 0);
  
  // Activity data
  const activityData = [
    { name: 'Games', count: gamesPlayed },
    { name: 'Nature', count: natureSessionsCompleted },
    { name: 'Meditation', count: filteredMeditationSessions.length },
    { name: 'Mood Logs', count: filteredMoodEntries.length },
    { name: 'Stress Tests', count: filteredStressResults.length },
  ];
  
  // Color constants for charts
  const COLORS = ['#FF4281', '#8585FF', '#FFBB00', '#10B981', '#F59E0B'];
  
  // Navigation functions
  const goToPrevious = () => {
    if (reportType === 'weekly') {
      setCurrentWeek(currentWeek - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };
  
  const goToNext = () => {
    if ((reportType === 'weekly' && currentWeek < 0) || (reportType === 'monthly' && currentMonth < 0)) {
      if (reportType === 'weekly') {
        setCurrentWeek(currentWeek + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Wellness Reports</h1>
          <p className="text-center text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Track your mental health journey with detailed reports that provide insights into your moods, stress levels, and activities.
          </p>
          
          {/* Report Controls */}
          <div className="bg-white rounded-xl shadow-card p-6 mb-8">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setReportType('weekly')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    reportType === 'weekly' 
                      ? 'bg-primary-100 text-primary-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Weekly Report
                </button>
                <button
                  onClick={() => setReportType('monthly')}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    reportType === 'monthly' 
                      ? 'bg-primary-100 text-primary-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Monthly Report
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={goToPrevious}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="font-medium">{dateRange.label}</span>
                <button
                  onClick={goToNext}
                  disabled={currentWeek === 0 || currentMonth === 0}
                  className={`p-2 rounded-lg ${
                    currentWeek === 0 || currentMonth === 0 
                      ? 'text-gray-300 cursor-not-allowed' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              
              <button className="btn-outline-primary py-1.5 flex items-center">
                <Download size={16} className="mr-2" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
          
          {/* Main Report Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Mood Distribution */}
            <motion.div 
              className="bg-white rounded-xl shadow-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <PieChart size={20} className="text-primary-500 mr-2" />
                Mood Distribution
              </h2>
              
              {filteredMoodEntries.length > 0 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPie data={moodChartData} cx="50%" cy="50%" outerRadius={80} label>
                      {moodChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </RechartsPie>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-gray-500">
                  <PieChart size={40} className="mb-2 text-gray-300" />
                  <p>No mood data available for this period.</p>
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-sm font-medium mb-2">Mood Legend</div>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(moodDistribution).map(([mood, count], index) => (
                    <div key={mood} className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <span className="capitalize">{mood}</span>
                      <span className="ml-auto font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {/* Stress Scores */}
            <motion.div 
              className="bg-white rounded-xl shadow-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <LineChart size={20} className="text-primary-500 mr-2" />
                Stress Levels
              </h2>
              
              {filteredStressResults.length > 0 ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLine data={stressChartData} margin={{ top: 5, right: 20, bottom: 20, left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 40]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#FF4281" strokeWidth={2} dot={{ r: 4 }} />
                    </RechartsLine>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex flex-col items-center justify-center text-gray-500">
                  <LineChart size={40} className="mb-2 text-gray-300" />
                  <p>No stress test data available for this period.</p>
                </div>
              )}
              
              {filteredStressResults.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium">Average Stress Score</div>
                      <div className="text-2xl font-bold">
                        {Math.round(filteredStressResults.reduce((sum, result) => sum + result.score, 0) / filteredStressResults.length)}
                        <span className="text-sm text-gray-500 ml-1">/40</span>
                      </div>
                    </div>
                    
                    {filteredStressResults.length > 1 && (
                      <div>
                        {(() => {
                          const first = filteredStressResults[0].score;
                          const last = filteredStressResults[filteredStressResults.length - 1].score;
                          const diff = last - first;
                          const diffPercentage = Math.round((diff / first) * 100);
                          
                          if (diff < 0) {
                            return (
                              <div className="flex items-center text-green-500">
                                <ArrowDownRight size={16} className="mr-1" />
                                <span>{Math.abs(diffPercentage)}% decrease</span>
                              </div>
                            );
                          } else if (diff > 0) {
                            return (
                              <div className="flex items-center text-red-500">
                                <ArrowUpRight size={16} className="mr-1" />
                                <span>{diffPercentage}% increase</span>
                              </div>
                            );
                          } else {
                            return <span className="text-gray-500">No change</span>;
                          }
                        })()}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
          
          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Activity Stats */}
            <motion.div 
              className="bg-white rounded-xl shadow-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <BarChart2 size={20} className="text-primary-500 mr-2" />
                Your Activities
              </h2>
              
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 65 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={80} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8585FF" barSize={20} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                <div className="text-sm font-medium mb-1">Total Activities</div>
                <div className="text-2xl font-bold">
                  {activityData.reduce((sum, item) => sum + item.count, 0)}
                </div>
              </div>
            </motion.div>
            
            {/* Meditation Stats */}
            <motion.div 
              className="bg-white rounded-xl shadow-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-4">Meditation</h2>
              
              <div className="flex flex-col items-center justify-center h-48">
                <div className="text-4xl font-bold text-secondary-500 mb-2">
                  {totalMeditationMinutes}
                </div>
                <div className="text-lg text-gray-600">Minutes</div>
                <div className="mt-4 text-gray-500 text-sm">
                  Across {filteredMeditationSessions.length} sessions
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-sm font-medium mb-2">Benefits of Meditation</div>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Reduces stress and anxiety</li>
                  <li>• Improves focus and concentration</li>
                  <li>• Enhances self-awareness</li>
                  <li>• Promotes emotional well-being</li>
                </ul>
              </div>
            </motion.div>
            
            {/* Wellness Score */}
            <motion.div 
              className="bg-white rounded-xl shadow-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <h2 className="text-xl font-semibold mb-4">Wellness Score</h2>
              
              {(() => {
                // Calculate a simplified wellness score based on available data
                let score = 60; // baseline score
                
                // Adjust based on mood distribution
                const positiveCount = moodDistribution.happy;
                const negativeCount = moodDistribution.sad + moodDistribution.stressed + moodDistribution.anxious;
                const totalMoods = Object.values(moodDistribution).reduce((sum, count) => sum + count, 0);
                
                if (totalMoods > 0) {
                  const moodRatio = (positiveCount - negativeCount) / totalMoods;
                  score += moodRatio * 20;
                }
                
                // Adjust based on stress test results
                if (filteredStressResults.length > 0) {
                  const avgStress = filteredStressResults.reduce((sum, result) => sum + result.score, 0) / filteredStressResults.length;
                  // Higher stress = lower score (stress is on a 0-40 scale)
                  score -= (avgStress / 40) * 15;
                }
                
                // Adjust based on meditation and activities
                score += Math.min(10, (totalMeditationMinutes / 60) * 5); // Up to 10 points for meditation
                score += Math.min(15, (gamesPlayed + natureSessionsCompleted) * 2); // Up to 15 points for activities
                
                // Ensure score is between 0-100
                score = Math.max(0, Math.min(100, Math.round(score)));
                
                let scoreLevel = 'Good';
                let scoreColor = 'text-green-500';
                
                if (score < 40) {
                  scoreLevel = 'Needs Attention';
                  scoreColor = 'text-red-500';
                } else if (score < 70) {
                  scoreLevel = 'Average';
                  scoreColor = 'text-yellow-500';
                } else if (score >= 90) {
                  scoreLevel = 'Excellent';
                  scoreColor = 'text-green-600';
                }
                
                return (
                  <div className="flex flex-col items-center justify-center h-48">
                    <div className="relative mb-2">
                      <svg className="w-32 h-32">
                        <circle
                          className="text-gray-200"
                          strokeWidth="8"
                          stroke="currentColor"
                          fill="transparent"
                          r="56"
                          cx="64"
                          cy="64"
                        />
                        <circle
                          className="text-primary-500"
                          strokeWidth="8"
                          strokeDasharray={360}
                          strokeDashoffset={360 - (score / 100) * 360}
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="56"
                          cx="64"
                          cy="64"
                        />
                      </svg>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <div className="text-4xl font-bold">{score}</div>
                        <div className="text-sm">out of 100</div>
                      </div>
                    </div>
                    <div className={`text-lg font-semibold ${scoreColor}`}>
                      {scoreLevel}
                    </div>
                  </div>
                );
              })()}
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-sm font-medium mb-2">Weekly Progress</div>
                <p className="text-sm text-gray-600">
                  Your wellness score is calculated based on your mood patterns, stress levels, and wellness activities.
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Recommendations */}
          <motion.div 
            className="bg-white rounded-xl shadow-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <h2 className="text-xl font-semibold mb-6">Personalized Recommendations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(() => {
                // Generate personalized recommendations based on user data
                const recommendations = [];
                
                const totalMoods = Object.values(moodDistribution).reduce((sum, count) => sum + count, 0);
                const hasStressTests = filteredStressResults.length > 0;
                const hasMeditations = filteredMeditationSessions.length > 0;
                
                if (totalMoods < 3) {
                  recommendations.push({
                    title: 'Track Your Mood More Frequently',
                    description: 'Log your mood at least once daily to get better insights into your emotional patterns.',
                    icon: <BarChart2 size={24} />,
                    link: '/features/mood-tracking',
                    linkText: 'Go to Mood Tracker'
                  });
                }
                
                if (!hasStressTests) {
                  recommendations.push({
                    title: 'Take a Stress Assessment',
                    description: 'Complete a PSS stress test to understand your current stress levels and get tailored recommendations.',
                    icon: <LineChart size={24} />,
                    link: '/features/stress-test',
                    linkText: 'Take Stress Test'
                  });
                }
                
                if (moodDistribution.stressed > 0 || moodDistribution.anxious > 0) {
                  recommendations.push({
                    title: 'Try a Nature Escape Session',
                    description: 'Virtual nature experiences can reduce stress and anxiety in just a few minutes.',
                    icon: <PieChart size={24} />,
                    link: '/features/virtual-nature',
                    linkText: 'Start Nature Escape'
                  });
                }
                
                if (!hasMeditations) {
                  recommendations.push({
                    title: 'Start a Meditation Practice',
                    description: 'Even 5 minutes of meditation daily can significantly improve your mental wellbeing.',
                    icon: <PieChart size={24} />,
                    link: '/features/meditation',
                    linkText: 'Try Meditation'
                  });
                }
                
                if (recommendations.length === 0) {
                  recommendations.push({
                    title: 'Continue Your Wellness Journey',
                    description: 'You\'re doing great! Keep up with your current practices and consider exploring new features.',
                    icon: <PieChart size={24} />,
                    link: '/features',
                    linkText: 'Explore More Features'
                  });
                }
                
                return recommendations.slice(0, 3).map((rec, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-500 mb-3">
                      {rec.icon}
                    </div>
                    <h3 className="font-semibold mb-2">{rec.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{rec.description}</p>
                    <a href={rec.link} className="text-primary-500 font-medium text-sm flex items-center">
                      {rec.linkText}
                      <ChevronRight size={16} className="ml-1" />
                    </a>
                  </div>
                ));
              })()}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;