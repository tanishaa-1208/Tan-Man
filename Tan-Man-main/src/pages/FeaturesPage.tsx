import { Link } from 'react-router-dom';
import { Activity, Flame, CloudLightning, BarChart2, PieChart, Bot, Coffee, Clock, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const features = [
  {
    id: 'stress-test',
    title: 'PSS Stress Test',
    description: 'Assess your current stress levels using the scientifically validated Perceived Stress Scale.',
    icon: <Activity size={24} />,
    color: 'primary',
    link: '/features/stress-test',
  },
  {
    id: 'virtual-nature',
    title: 'Virtual Nature Escape',
    description: 'Transport yourself to calming natural environments for quick stress relief.',
    icon: <CloudLightning size={24} />,
    color: 'secondary',
    link: '/features/virtual-nature',
  },
  {
    id: 'games',
    title: 'Stress Relieving Games',
    description: 'Engage in simple games designed to reduce stress and improve focus.',
    icon: <Flame size={24} />,
    color: 'accent',
    link: '/features/games',
  },
  {
    id: 'mood-tracking',
    title: 'Mood Tracking',
    description: 'Log and visualize your moods over time to identify patterns and triggers.',
    icon: <BarChart2 size={24} />,
    color: 'primary',
    link: '/features/mood-tracking',
  },
  {
    id: 'reports',
    title: 'Weekly & Monthly Reports',
    description: 'Get personalized insights into your mental wellness journey.',
    icon: <PieChart size={24} />,
    color: 'secondary',
    link: '/features/reports',
  },
  {
    id: 'ai-support',
    title: 'AI-based Emotional Support',
    description: 'Chat with our AI companion for emotional support and personalized coping strategies.',
    icon: <Bot size={24} />,
    color: 'accent',
    link: '/features/ai-support',
  },
  {
    id: 'diet',
    title: 'Personalized Diet Recommendations',
    description: 'Discover foods that can boost your mood and mental wellbeing.',
    icon: <Coffee size={24} />,
    color: 'primary',
    link: '/features/diet',
  },
  {
    id: 'meditation',
    title: 'Meditation Timer',
    description: 'Guided meditation sessions to help calm your mind and reduce anxiety.',
    icon: <Clock size={24} />,
    color: 'secondary',
    link: '/features/meditation',
  },
  {
    id: 'emergency',
    title: 'SOS Emergency',
    description: 'Immediate access to crisis resources and emergency contacts.',
    icon: <AlertTriangle size={24} />,
    color: 'error',
    link: '/features/emergency',
  },
];

const FeaturesPage = () => {
  const { user } = useAuth();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Mental Wellness Tools</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive suite of features designed to support your mental health journey.
          </p>
          
          {user?.subscription ? (
            <div className="mt-4 inline-block bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-medium">
              {user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1)} Plan · 
              {user.subscriptionEndDate && ` Valid until ${new Date(user.subscriptionEndDate).toLocaleDateString()}`}
            </div>
          ) : (
            <Link to="/subscription" className="mt-4 inline-block btn-primary">
              Upgrade to Premium
            </Link>
          )}
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature) => (
            <motion.div 
              key={feature.id}
              variants={itemVariants}
            >
              <Link 
                to={feature.link}
                className="block bg-white rounded-xl shadow-card hover:shadow-elevated p-6 transition-all duration-300 h-full"
              >
                <div className={`bg-${feature.color}-100 w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                  <span className={`text-${feature.color}-500`}>{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Emergency Help Banner */}
        <div className="mt-12 bg-red-50 border border-red-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <AlertTriangle size={32} className="text-red-500 mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-red-700">Need immediate help?</h3>
              <p className="text-red-600">If you're in crisis or having suicidal thoughts, please seek help immediately.</p>
            </div>
          </div>
          <Link to="/features/emergency" className="btn bg-red-500 hover:bg-red-600 text-white">
            Get Emergency Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturesPage;