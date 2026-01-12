import { Link } from 'react-router-dom';
import { Brain, HeartPulse, Star, Shield, BarChart, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
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
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative bg-gradient-to-b from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
          <motion.div 
            className="lg:w-1/2 mb-10 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Your Mental Wellness <span className="text-primary-500">Companion</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Nurture your mental health with our comprehensive suite of tools designed to help you manage stress, track your mood, and find peace in your daily life.
            </p>
            <div className="flex flex-wrap gap-4">
              {isAuthenticated ? (
                <Link to="/features" className="btn-primary px-8 py-3 text-lg">
                  Explore Features
                </Link>
              ) : (
                <>
                  <Link to="/signup" className="btn-primary px-8 py-3 text-lg">
                    Start Free Trial
                  </Link>
                  <Link to="/login" className="btn-outline-primary px-8 py-3 text-lg">
                    Login
                  </Link>
                </>
              )}
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <img
                src="https://images.pexels.com/photos/3758048/pexels-photo-3758048.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Peaceful woman with eyes closed"
                className="rounded-2xl shadow-xl max-w-full h-auto"
                style={{ maxHeight: "500px" }}
              />
              <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-lg">
                <Brain size={40} className="text-primary-500" />
              </div>
              <div className="absolute -top-5 -right-5 bg-white p-4 rounded-lg shadow-lg">
                <HeartPulse size={40} className="text-secondary-500" />
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 text-white fill-current">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.73,118.43,156.39,67,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>
      
      {/* Features Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Mental Wellness Tools</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our suite of features is designed to support every aspect of your mental health journey.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="card hover:shadow-elevated transition-shadow" variants={itemVariants}>
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <BarChart size={28} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Mood Tracking</h3>
              <p className="text-gray-600 mb-4">
                Track your mood over time to identify patterns and gain insights into your emotional wellbeing.
              </p>
              <Link to={isAuthenticated ? "/features/mood-tracking" : "/signup"} className="link font-medium">
                Learn more →
              </Link>
            </motion.div>
            
            <motion.div className="card hover:shadow-elevated transition-shadow" variants={itemVariants}>
              <div className="bg-secondary-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Star size={28} className="text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Stress Assessment</h3>
              <p className="text-gray-600 mb-4">
                Evaluate your stress levels with our standardized PSS (Perceived Stress Scale) test.
              </p>
              <Link to={isAuthenticated ? "/features/stress-test" : "/signup"} className="link font-medium">
                Learn more →
              </Link>
            </motion.div>
            
            <motion.div className="card hover:shadow-elevated transition-shadow" variants={itemVariants}>
              <div className="bg-accent-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Sparkles size={28} className="text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Support</h3>
              <p className="text-gray-600 mb-4">
                Get personalized emotional support and guidance from our AI companion.
              </p>
              <Link to={isAuthenticated ? "/features/ai-support" : "/signup"} className="link font-medium">
                Learn more →
              </Link>
            </motion.div>
            
            <motion.div className="card hover:shadow-elevated transition-shadow" variants={itemVariants}>
              <div className="bg-success-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Shield size={28} className="text-success-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Emergency Support</h3>
              <p className="text-gray-600 mb-4">
                Quick access to crisis resources and emergency contacts when you need them most.
              </p>
              <Link to="/features/emergency" className="link font-medium">
                Learn more →
              </Link>
            </motion.div>
            
            <motion.div className="card hover:shadow-elevated transition-shadow" variants={itemVariants}>
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <HeartPulse size={28} className="text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Meditation Timer</h3>
              <p className="text-gray-600 mb-4">
                Guided sessions to help you build a consistent meditation practice for better mental health.
              </p>
              <Link to={isAuthenticated ? "/features/meditation" : "/signup"} className="link font-medium">
                Learn more →
              </Link>
            </motion.div>
            
            <motion.div className="card hover:shadow-elevated transition-shadow" variants={itemVariants}>
              <div className="bg-secondary-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Brain size={28} className="text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Health Reports</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive weekly and monthly reports to track your progress and mental health journey.
              </p>
              <Link to={isAuthenticated ? "/features/reports" : "/signup"} className="link font-medium">
                Learn more →
              </Link>
            </motion.div>
          </motion.div>
          
          <div className="mt-16 text-center">
            <Link to={isAuthenticated ? "/features" : "/signup"} className="btn-primary px-8 py-3 text-lg">
              {isAuthenticated ? "Explore All Features" : "Start Your Journey"}
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of people who are improving their mental wellness with Tan-Man.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-primary-500 font-bold">RP</span>
                </div>
                <div>
                  <h4 className="font-semibold">Rahul P.</h4>
                  <p className="text-gray-500 text-sm">Using Tan-Man for 6 months</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The mood tracking feature has been eye-opening. I never realized how my daily habits affected my mental state until I started using Tan-Man."
              </p>
              <div className="mt-4 flex text-yellow-400">
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-secondary-500 font-bold">AK</span>
                </div>
                <div>
                  <h4 className="font-semibold">Ananya K.</h4>
                  <p className="text-gray-500 text-sm">Using Tan-Man for 3 months</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The meditation timer has transformed my mornings. I'm more focused at work and my anxiety levels have dropped significantly since using Tan-Man regularly."
              </p>
              <div className="mt-4 flex text-yellow-400">
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-accent-500 font-bold">SM</span>
                </div>
                <div>
                  <h4 className="font-semibold">Sanjay M.</h4>
                  <p className="text-gray-500 text-sm">Using Tan-Man for 1 year</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The virtual nature escape is my go-to when I'm feeling stressed. Just 5 minutes and I feel recharged. The yearly subscription is absolutely worth it."
              </p>
              <div className="mt-4 flex text-yellow-400">
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Mental Wellness Journey Today</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Try Tan-Man free for 10 days. No credit card required.
            </p>
            <Link to="/signup" className="bg-white text-primary-500 btn px-8 py-3 text-lg font-semibold hover:bg-primary-50 transition-colors">
              Start Free Trial
            </Link>
            <p className="mt-4 text-primary-100">
              Already have an account? <Link to="/login" className="underline font-medium">Login here</Link>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;