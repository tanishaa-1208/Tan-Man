import { Brain, Heart, Users, Award, Clock, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Tan-Man</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              We're on a mission to make mental wellness accessible to everyone, empowering individuals to take control of their mental health.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Tan-Man was founded in 2023 by a team of mental health professionals, technologists, and people with lived experience of mental health challenges.
              </p>
              <p className="text-gray-700 mb-4">
                We recognized that while mental health awareness was increasing, access to quality tools and resources remained limited for many. Our team set out to create a comprehensive platform that combines evidence-based approaches with innovative technology.
              </p>
              <p className="text-gray-700">
                Today, Tan-Man is helping thousands of people across India and beyond to monitor, understand, and improve their mental wellbeing through accessible digital tools.
              </p>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Team collaborating" 
                className="rounded-xl shadow-xl w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Guided by these core principles, we work every day to create positive impact in mental health.
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
              <div className="bg-primary-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Heart className="text-primary-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Compassion First</h3>
              <p className="text-gray-600">
                We approach every feature and interaction with empathy and understanding, recognizing that each person's mental health journey is unique.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-xl shadow-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-secondary-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Brain className="text-secondary-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Science-Backed</h3>
              <p className="text-gray-600">
                All our features are grounded in evidence-based approaches to mental health, continuously updated based on the latest research.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-xl shadow-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-accent-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Users className="text-accent-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Inclusive Design</h3>
              <p className="text-gray-600">
                We're committed to creating tools that are accessible and relevant to people across diverse backgrounds, cultures, and needs.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-xl shadow-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-success-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Shield className="text-success-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Privacy & Security</h3>
              <p className="text-gray-600">
                Your personal data and mental health information deserve the highest level of protection. We prioritize privacy and security in everything we build.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-xl shadow-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="bg-warning-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Clock className="text-warning-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Continuous Growth</h3>
              <p className="text-gray-600">
                We're always learning and improving our platform based on user feedback and emerging best practices in mental health.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-xl shadow-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="bg-error-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <Award className="text-error-500" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for the highest quality in our mental wellness tools, ensuring they're effective, engaging, and a joy to use.
              </p>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Mission</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Be part of the mental wellness revolution. Try Tan-Man today and take the first step towards a healthier mind.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/signup" className="bg-white text-primary-500 btn px-8 py-3 text-lg font-semibold hover:bg-primary-50 transition-colors">
                Start Free Trial
              </a>
              <a href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-primary-500 px-8 py-3 text-lg font-semibold transition-colors">
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;