import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Info, Loader2 } from 'lucide-react';

// Mock responses for the AI
const mockResponses = {
  greeting: [
    "Hello! I'm your AI mental wellness companion. How are you feeling today?",
    "Hi there! I'm here to support your mental wellbeing. What's on your mind?",
    "Welcome to AI Support. I'm here to listen and help. How are you doing today?"
  ],
  stressed: [
    "I'm sorry to hear you're feeling stressed. Would you like to try a quick breathing exercise to help calm your mind?",
    "Stress can be challenging. Have you identified what might be triggering this feeling? Sometimes naming the source can help us address it.",
    "When we're stressed, our body's fight-or-flight response activates. Let's try to activate your relaxation response instead. Would you like to try a simple grounding technique?"
  ],
  sad: [
    "I'm sorry you're feeling sad. Remember that all emotions, including sadness, are valid and temporary. Would it help to talk about what's causing these feelings?",
    "Sadness is a natural emotion that we all experience. Is there something specific that's contributing to how you're feeling right now?",
    "I hear that you're feeling sad. Sometimes expressing creativity can help process emotions - have you tried journaling, drawing, or any other creative outlet recently?"
  ],
  happy: [
    "That's wonderful to hear! Positive emotions are worth celebrating. What's contributing to your happiness today?",
    "I'm glad you're feeling happy! Taking note of what brings you joy can help you recreate these positive feelings in the future.",
    "That's great! Positive emotions can broaden our thinking and build our resilience. What activity or thought is bringing you this happiness?"
  ],
  anxious: [
    "Anxiety can feel overwhelming. Remember that you're not alone, and these feelings won't last forever. Would you like to try a grounding exercise?",
    "I understand anxiety can be difficult. Sometimes focusing on what we can control, rather than what we can't, can help reduce anxious feelings.",
    "When anxiety strikes, returning to our senses can help. Could we try the 5-4-3-2-1 technique? Name 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, and 1 thing you taste."
  ],
  general: [
    "Thank you for sharing that with me. How long have you been feeling this way?",
    "I appreciate you opening up. Would you like to explore some strategies that might help with this situation?",
    "I'm here to support you. Would it help to talk more about this, or would you prefer some practical suggestions?",
    "That sounds challenging. Have you spoken with a mental health professional about what you're experiencing?",
    "I'm listening. Sometimes just expressing our thoughts can help us process them better. Would you like to tell me more?"
  ]
};

// Get a random response from a category
const getRandomResponse = (category: keyof typeof mockResponses) => {
  const responses = mockResponses[category];
  return responses[Math.floor(Math.random() * responses.length)];
};

// AI response generation (mock)
const generateAIResponse = (message: string): Promise<string> => {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const lowercaseMsg = message.toLowerCase();
      
      if (lowercaseMsg.includes('hello') || lowercaseMsg.includes('hi') || lowercaseMsg.includes('hey')) {
        resolve(getRandomResponse('greeting'));
      } else if (lowercaseMsg.includes('stress') || lowercaseMsg.includes('overwhelm')) {
        resolve(getRandomResponse('stressed'));
      } else if (lowercaseMsg.includes('sad') || lowercaseMsg.includes('depress') || lowercaseMsg.includes('unhappy')) {
        resolve(getRandomResponse('sad'));
      } else if (lowercaseMsg.includes('happy') || lowercaseMsg.includes('good') || lowercaseMsg.includes('great')) {
        resolve(getRandomResponse('happy'));
      } else if (lowercaseMsg.includes('anxi') || lowercaseMsg.includes('worry') || lowercaseMsg.includes('nervous')) {
        resolve(getRandomResponse('anxious'));
      } else {
        resolve(getRandomResponse('general'));
      }
    }, 1000);
  });
};

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

const AISupport = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI mental wellness companion. How are you feeling today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Get AI response
    try {
      const aiResponseText = await generateAIResponse(inputMessage);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating AI response:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">AI Emotional Support</h1>
          <p className="text-center text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Chat with our AI companion for emotional support, personalized coping strategies, and mental wellness guidance.
          </p>
          
          <motion.div 
            className="bg-white rounded-xl shadow-card overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Chat Header */}
            <div className="bg-primary-500 text-white p-4 flex items-center">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary-500 mr-3">
                <Bot size={24} />
              </div>
              <div>
                <h2 className="font-semibold">Tan-Man AI Support</h2>
                <p className="text-sm text-primary-100">Here to listen and support</p>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-4 bg-gray-50">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender === 'ai' && (
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-500 mr-2 flex-shrink-0">
                      <Bot size={16} />
                    </div>
                  )}
                  <div 
                    className={`px-4 py-3 rounded-lg max-w-xs sm:max-w-md ${
                      message.sender === 'user' 
                        ? 'bg-secondary-500 text-white' 
                        : 'bg-white shadow border border-gray-100'
                    }`}
                  >
                    <p>{message.text}</p>
                    <div 
                      className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-secondary-200' : 'text-gray-400'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center text-secondary-500 ml-2 flex-shrink-0">
                      <User size={16} />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="mb-4 flex justify-start">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-500 mr-2 flex-shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="px-4 py-3 rounded-lg bg-white shadow border border-gray-100">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow input"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isTyping}
                  className={`ml-2 bg-primary-500 text-white p-2 rounded-lg flex items-center justify-center ${
                    !inputMessage.trim() || isTyping ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary-600'
                  }`}
                >
                  {isTyping ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                </button>
              </div>
            </form>
          </motion.div>
          
          <div className="mt-8 bg-secondary-50 border border-secondary-100 rounded-lg p-6">
            <div className="flex items-start">
              <Info size={20} className="text-secondary-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">About AI Emotional Support</h3>
                <p className="text-sm text-gray-600 mb-4">
                  This AI companion is designed to provide emotional support and coping strategies. 
                  While it can offer guidance based on evidence-based techniques, it is not a replacement 
                  for professional mental health care.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700 mb-1">AI Support Can Help With:</p>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Daily stress management</li>
                      <li>• Emotional check-ins</li>
                      <li>• Relaxation techniques</li>
                      <li>• Mindfulness guidance</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700 mb-1">For Serious Concerns:</p>
                    <ul className="space-y-1 text-gray-600">
                      <li>• Consult a mental health professional</li>
                      <li>• Use our <a href="/features/emergency" className="text-secondary-500 hover:underline">emergency resources</a></li>
                      <li>• Contact a crisis helpline</li>
                      <li>• Speak with your doctor</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISupport;