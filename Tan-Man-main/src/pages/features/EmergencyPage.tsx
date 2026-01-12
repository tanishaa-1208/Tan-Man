import { motion } from 'framer-motion';
import { Phone, AlertTriangle, Heart, Bookmark, Share2 } from 'lucide-react';

const EmergencyPage = () => {
  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Emergency Banner */}
          <motion.div 
            className="bg-red-500 text-white rounded-xl p-6 mb-8 shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center mb-4">
              <AlertTriangle size={32} className="mr-3" />
              <h1 className="text-3xl font-bold">Emergency Support</h1>
            </div>
            <p className="text-xl mb-6">
              If you're experiencing a mental health crisis or having thoughts of suicide, 
              please seek help immediately using one of the resources below.
            </p>
            <div className="bg-white text-red-600 rounded-lg p-4 font-bold text-xl flex items-center justify-center">
              <Phone size={24} className="mr-2" />
              <span>Mental Health Crisis Helpline: 1800-599-0019</span>
            </div>
          </motion.div>
          
          {/* Emergency Resources */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-6">Immediate Support Resources</h2>
            
            <div className="space-y-4">
              <motion.div 
                className="bg-white rounded-xl shadow-card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex-grow mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold mb-2">National Suicide Prevention Lifeline</h3>
                    <p className="text-gray-600 mb-2">
                      24/7, free and confidential support for people in distress, prevention and crisis resources.
                    </p>
                    <div className="flex items-center">
                      <Heart size={16} className="text-red-500 mr-1" />
                      <span className="text-sm text-gray-500">Available 24/7</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <a 
                      href="tel:18005990019" 
                      className="block bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Phone size={18} className="mr-2" />
                      1800-599-0019
                    </a>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex-grow mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold mb-2">Crisis Text Line</h3>
                    <p className="text-gray-600 mb-2">
                      Text-based crisis counseling service. Free, 24/7 support.
                    </p>
                    <div className="flex items-center">
                      <Heart size={16} className="text-red-500 mr-1" />
                      <span className="text-sm text-gray-500">Text support available anytime</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <a 
                      href="sms:+918888888888" 
                      className="block bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <span className="mr-2">Text</span>
                      HELP to 9833811111
                    </a>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="flex-grow mb-4 md:mb-0">
                    <h3 className="text-xl font-semibold mb-2">Emergency Services</h3>
                    <p className="text-gray-600 mb-2">
                      If you or someone else is in immediate danger, please call emergency services.
                    </p>
                    <div className="flex items-center">
                      <AlertTriangle size={16} className="text-red-500 mr-1" />
                      <span className="text-sm text-gray-500">For immediate emergency assistance</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <a 
                      href="tel:112" 
                      className="block bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                    >
                      <Phone size={18} className="mr-2" />
                      Call 112
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Coping Strategies */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-6">Coping Strategies for Crisis Moments</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                className="bg-white rounded-xl shadow-card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold mb-4">Grounding Techniques</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 bg-primary-100 text-primary-700 w-6 h-6 rounded-full flex items-center justify-center mr-2">1</span>
                    <div>
                      <p className="font-medium">5-4-3-2-1 Exercise</p>
                      <p className="text-gray-600">Identify 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, and 1 thing you taste.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 bg-primary-100 text-primary-700 w-6 h-6 rounded-full flex items-center justify-center mr-2">2</span>
                    <div>
                      <p className="font-medium">Deep Breathing</p>
                      <p className="text-gray-600">Breathe in for 4 counts, hold for 7 counts, and exhale for 8 counts. Repeat several times.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 bg-primary-100 text-primary-700 w-6 h-6 rounded-full flex items-center justify-center mr-2">3</span>
                    <div>
                      <p className="font-medium">Physical Grounding</p>
                      <p className="text-gray-600">Hold an ice cube, splash cold water on your face, or touch something with a strong texture.</p>
                    </div>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="bg-white rounded-xl shadow-card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-4">Emotional Regulation</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="flex-shrink-0 bg-secondary-100 text-secondary-700 w-6 h-6 rounded-full flex items-center justify-center mr-2">1</span>
                    <div>
                      <p className="font-medium">Distress Tolerance</p>
                      <p className="text-gray-600">Engage in an activity that requires focus: count backwards from 100 by 7s, name all the countries you can think of, etc.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 bg-secondary-100 text-secondary-700 w-6 h-6 rounded-full flex items-center justify-center mr-2">2</span>
                    <div>
                      <p className="font-medium">Self-Soothing</p>
                      <p className="text-gray-600">Engage your senses with something comforting: listen to calming music, hold a soft blanket, or look at photos that bring positive memories.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="flex-shrink-0 bg-secondary-100 text-secondary-700 w-6 h-6 rounded-full flex items-center justify-center mr-2">3</span>
                    <div>
                      <p className="font-medium">Thought Challenging</p>
                      <p className="text-gray-600">Identify negative thoughts and ask: "Is this thought helpful? Is there evidence against it? What would I tell a friend who had this thought?"</p>
                    </div>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
          
          {/* Safety Plan */}
          <motion.div 
            className="bg-white rounded-xl shadow-card p-6 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-6">Create a Safety Plan</h2>
            
            <p className="text-gray-700 mb-6">
              A safety plan is a personalized, practical plan that can help you avoid dangerous situations and know the best way to react when you're in crisis. Consider creating one with a mental health professional.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Elements of a Safety Plan:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Warning signs that a crisis may be developing</li>
                  <li>• Internal coping strategies</li>
                  <li>• People and social settings that provide distraction</li>
                  <li>• People you can ask for help</li>
                  <li>• Professionals or agencies to contact during a crisis</li>
                  <li>• Making your environment safe</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold mb-3">When to Use Your Safety Plan:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• When you notice warning signs</li>
                  <li>• During increasingly intense emotional distress</li>
                  <li>• When experiencing suicidal thoughts</li>
                  <li>• During panic attacks or severe anxiety</li>
                  <li>• Before using unhealthy coping mechanisms</li>
                  <li>• When feeling overwhelmed or hopeless</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <a 
                href="/safety-plan-template.pdf" 
                download
                className="btn-primary flex items-center"
              >
                <Bookmark size={16} className="mr-2" />
                Download Safety Plan Template
              </a>
            </div>
          </motion.div>
          
          {/* Support Resources */}
          <motion.div 
            className="bg-white rounded-xl shadow-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            <h2 className="text-2xl font-semibold mb-6">Additional Support Resources</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-3">Mental Health Organizations</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <a href="https://mhaipune.org/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Mental Health Association, India</a></li>
                  <li>• <a href="https://www.thecounsellorsnetwork.in/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">The Counsellors Network</a></li>
                  <li>• <a href="https://www.vandrevalafoundation.com/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Vandrevala Foundation</a></li>
                  <li>• <a href="https://sangath.in/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Sangath India</a></li>
                </ul>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-3">Support Groups</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <a href="https://www.manastha.com/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Manastha Mental Health Support Group</a></li>
                  <li>• <a href="https://www.thealternativespace.com/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">The Alternative Space</a></li>
                  <li>• <a href="https://manahwellness.com/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Manah Wellness</a></li>
                  <li>• <a href="https://www.healthcollective.in/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">The Health Collective India</a></li>
                </ul>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-3">Self-Help Resources</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <a href="https://www.therapyroute.com/article/how-to-help-someone-who-is-suicidal-by-k-dacosta" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">How to Help Someone Who is Suicidal</a></li>
                  <li>• <a href="https://www.who.int/news-room/fact-sheets/detail/suicide" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">WHO Suicide Prevention</a></li>
                  <li>• <a href="https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/behaviours/help-for-suicidal-thoughts/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Help for Suicidal Thoughts</a></li>
                  <li>• <a href="https://www.nimh.nih.gov/health/topics/suicide-prevention" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">NIMH Suicide Prevention</a></li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <button className="btn-secondary flex items-center">
                <Share2 size={16} className="mr-2" />
                Share These Resources
              </button>
            </div>
          </motion.div>
          
          {/* Disclaimer */}
          <div className="mt-10 p-4 bg-yellow-50 border border-yellow-100 rounded-lg text-sm text-gray-700">
            <div className="font-semibold mb-2">Important Disclaimer:</div>
            <p>
              This emergency page provides resources that may be helpful in a crisis, but it is not a substitute for professional medical advice, diagnosis, or treatment. If you or someone you know is in immediate danger, please call emergency services (112) immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyPage;