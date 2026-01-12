import { useState } from 'react';
import { motion } from 'framer-motion';
import { Coffee, Check, ChevronDown, ChevronUp, BookOpen, AlertCircle } from 'lucide-react';

// Define food categories and their mood effects
const foodCategories = [
  {
    id: 'omega3',
    name: 'Omega-3 Fatty Acids',
    benefits: ['Reduces depression symptoms', 'Supports brain health', 'Improves mood regulation'],
    foods: ['Fatty fish (salmon, mackerel)', 'Walnuts', 'Flaxseeds', 'Chia seeds', 'Soybeans'],
    icon: '🐟',
    color: 'bg-blue-100 text-blue-700 border-blue-200'
  },
  {
    id: 'probiotics',
    name: 'Probiotics & Fermented Foods',
    benefits: ['Supports gut-brain connection', 'May reduce anxiety', 'Improves digestive health'],
    foods: ['Yogurt', 'Kefir', 'Kimchi', 'Sauerkraut', 'Kombucha', 'Miso'],
    icon: '🥛',
    color: 'bg-purple-100 text-purple-700 border-purple-200'
  },
  {
    id: 'antioxidants',
    name: 'Antioxidant-Rich Foods',
    benefits: ['Reduces inflammation', 'Protects brain cells', 'May improve mood'],
    foods: ['Berries', 'Dark chocolate', 'Colorful vegetables', 'Green tea', 'Turmeric'],
    icon: '🫐',
    color: 'bg-red-100 text-red-700 border-red-200'
  },
  {
    id: 'complex-carbs',
    name: 'Complex Carbohydrates',
    benefits: ['Stabilizes blood sugar', 'Increases serotonin', 'Provides sustained energy'],
    foods: ['Whole grains', 'Brown rice', 'Quinoa', 'Oats', 'Sweet potatoes', 'Legumes'],
    icon: '🌾',
    color: 'bg-amber-100 text-amber-700 border-amber-200'
  },
  {
    id: 'magnesium',
    name: 'Magnesium-Rich Foods',
    benefits: ['Reduces anxiety', 'Improves sleep quality', 'Supports nerve function'],
    foods: ['Dark leafy greens', 'Avocados', 'Nuts and seeds', 'Bananas', 'Beans'],
    icon: '🥑',
    color: 'bg-green-100 text-green-700 border-green-200'
  },
  {
    id: 'vitamin-d',
    name: 'Vitamin D Sources',
    benefits: ['May reduce depression', 'Improves mood', 'Supports immune function'],
    foods: ['Fatty fish', 'Egg yolks', 'Mushrooms', 'Fortified foods', 'Sunlight exposure'],
    icon: '☀️',
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200'
  },
  {
    id: 'avoid',
    name: 'Foods to Limit',
    benefits: ['Avoiding these may improve mood', 'Reduces inflammation', 'Stabilizes energy'],
    foods: ['Processed foods', 'Excessive caffeine', 'Alcohol', 'Added sugars', 'Trans fats'],
    icon: '⚠️',
    color: 'bg-gray-100 text-gray-700 border-gray-200'
  }
];

// Sample meal plans
const mealPlans = {
  anxiety: {
    title: 'Anti-Anxiety Meal Plan',
    description: 'Foods that help reduce anxiety and promote calmness',
    meals: [
      {
        title: 'Breakfast',
        content: 'Greek yogurt with berries and walnuts, green tea'
      },
      {
        title: 'Lunch',
        content: 'Avocado toast on whole grain bread with spinach and pumpkin seeds'
      },
      {
        title: 'Dinner',
        content: 'Baked salmon with quinoa and steamed broccoli'
      },
      {
        title: 'Snacks',
        content: 'Dark chocolate square, handful of almonds, chamomile tea'
      }
    ]
  },
  depression: {
    title: 'Mood-Boosting Meal Plan',
    description: 'Foods that may help alleviate depression symptoms',
    meals: [
      {
        title: 'Breakfast',
        content: 'Oatmeal with banana, flaxseeds and a boiled egg'
      },
      {
        title: 'Lunch',
        content: 'Tuna salad with olive oil, mixed greens, and whole grain crackers'
      },
      {
        title: 'Dinner',
        content: 'Lentil soup with leafy greens and a side of sweet potato'
      },
      {
        title: 'Snacks',
        content: 'Apple with almond butter, turmeric latte with cinnamon'
      }
    ]
  },
  stress: {
    title: 'Stress-Reducing Meal Plan',
    description: 'Foods that help manage cortisol levels and reduce stress',
    meals: [
      {
        title: 'Breakfast',
        content: 'Smoothie with spinach, banana, chia seeds and almond milk'
      },
      {
        title: 'Lunch',
        content: 'Quinoa bowl with chickpeas, avocado, and roasted vegetables'
      },
      {
        title: 'Dinner',
        content: 'Turkey with roasted sweet potatoes and sautéed kale'
      },
      {
        title: 'Snacks',
        content: 'Orange slices, small handful of Brazil nuts, herbal tea'
      }
    ]
  },
  energy: {
    title: 'Energy-Boosting Meal Plan',
    description: 'Foods that provide sustained energy and reduce fatigue',
    meals: [
      {
        title: 'Breakfast',
        content: 'Whole grain toast with eggs and avocado, berries on the side'
      },
      {
        title: 'Lunch',
        content: 'Brown rice bowl with beans, grilled chicken, and vegetables'
      },
      {
        title: 'Dinner',
        content: 'Baked white fish with roasted vegetables and quinoa'
      },
      {
        title: 'Snacks',
        content: 'Hummus with vegetable sticks, small handful of mixed nuts'
      }
    ]
  }
};

const DietRecommendation = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<keyof typeof mealPlans>('anxiety');
  const [expandedMeal, setExpandedMeal] = useState<number | null>(null);
  
  const toggleCategory = (id: string) => {
    if (expandedCategory === id) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(id);
    }
  };
  
  const toggleMeal = (index: number) => {
    if (expandedMeal === index) {
      setExpandedMeal(null);
    } else {
      setExpandedMeal(index);
    }
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Personalized Diet Recommendations</h1>
          <p className="text-center text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover how nutrition can impact your mental health with our personalized food recommendations and meal plans.
          </p>
          
          {/* Introduction Card */}
          <motion.div 
            className="bg-white rounded-xl shadow-card p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-500 mr-4">
                <Coffee size={24} />
              </div>
              <h2 className="text-2xl font-semibold">Food & Mood Connection</h2>
            </div>
            
            <p className="text-gray-700 mb-4">
              What you eat can significantly impact your mental health and emotional wellbeing. The foods 
              you consume affect your brain chemistry, energy levels, and overall mood. Our nutrition 
              recommendations are based on current research in nutritional psychiatry.
            </p>
            
            <div className="bg-primary-50 border border-primary-100 rounded-lg p-4">
              <div className="font-medium text-primary-700 mb-2">Key Principles:</div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <li className="flex items-start">
                  <Check size={16} className="text-primary-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Eat whole, unprocessed foods</span>
                </li>
                <li className="flex items-start">
                  <Check size={16} className="text-primary-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Focus on anti-inflammatory options</span>
                </li>
                <li className="flex items-start">
                  <Check size={16} className="text-primary-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Support gut health with fiber and probiotics</span>
                </li>
                <li className="flex items-start">
                  <Check size={16} className="text-primary-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Include omega-3 fatty acids regularly</span>
                </li>
                <li className="flex items-start">
                  <Check size={16} className="text-primary-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Avoid blood sugar spikes and crashes</span>
                </li>
                <li className="flex items-start">
                  <Check size={16} className="text-primary-500 mr-2 mt-1 flex-shrink-0" />
                  <span>Stay hydrated throughout the day</span>
                </li>
              </ul>
            </div>
          </motion.div>
          
          {/* Food Categories */}
          <h2 className="text-2xl font-semibold mb-4">Brain-Healthy Food Categories</h2>
          <p className="text-gray-600 mb-6">
            These food groups contain nutrients that support brain health and may help improve mood and mental wellbeing.
          </p>
          
          <div className="space-y-4 mb-10">
            {foodCategories.map((category) => (
              <motion.div 
                key={category.id}
                className={`border rounded-lg overflow-hidden ${expandedCategory === category.id ? 'shadow-md' : 'shadow-sm'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full px-6 py-4 flex items-center justify-between bg-white text-left focus:outline-none"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </div>
                  {expandedCategory === category.id ? (
                    <ChevronUp size={20} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-500" />
                  )}
                </button>
                
                {expandedCategory === category.id && (
                  <div className="px-6 pb-4">
                    <div className="mb-3">
                      <div className="font-medium mb-2">Benefits:</div>
                      <ul className="space-y-1">
                        {category.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <Check size={16} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <div className="font-medium mb-2">Recommended Foods:</div>
                      <div className="flex flex-wrap gap-2">
                        {category.foods.map((food, index) => (
                          <span 
                            key={index} 
                            className={`inline-block px-3 py-1 rounded-full text-sm ${category.color}`}
                          >
                            {food}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Meal Plans */}
          <h2 className="text-2xl font-semibold mb-4">Sample Meal Plans</h2>
          <p className="text-gray-600 mb-6">
            These meal plans are designed to support specific mental health needs. Choose the one that aligns with your current goals.
          </p>
          
          <div className="bg-white rounded-xl shadow-card overflow-hidden mb-8">
            <div className="border-b">
              <div className="flex">
                {(Object.keys(mealPlans) as Array<keyof typeof mealPlans>).map((planKey) => (
                  <button
                    key={planKey}
                    onClick={() => setSelectedPlan(planKey)}
                    className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                      selectedPlan === planKey
                        ? 'border-primary-500 text-primary-700'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {mealPlans[planKey].title}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{mealPlans[selectedPlan].title}</h3>
              <p className="text-gray-600 mb-6">{mealPlans[selectedPlan].description}</p>
              
              <div className="space-y-4">
                {mealPlans[selectedPlan].meals.map((meal, index) => (
                  <div 
                    key={index} 
                    className="border rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleMeal(index)}
                      className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 text-left focus:outline-none"
                    >
                      <span className="font-medium">{meal.title}</span>
                      {expandedMeal === index ? (
                        <ChevronUp size={18} className="text-gray-500" />
                      ) : (
                        <ChevronDown size={18} className="text-gray-500" />
                      )}
                    </button>
                    
                    {expandedMeal === index && (
                      <div className="px-4 py-3 bg-white">
                        <p>{meal.content}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-6">
            <div className="flex items-start">
              <AlertCircle size={20} className="text-yellow-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Important Note</h3>
                <p className="text-sm text-gray-700">
                  These dietary recommendations are general guidelines based on current research. Individual 
                  nutritional needs vary. If you have specific health concerns, allergies, or medical conditions, 
                  please consult with a healthcare provider or registered dietitian before making significant 
                  changes to your diet.
                </p>
              </div>
            </div>
          </div>
          
          {/* Additional Resources */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <BookOpen size={20} className="text-primary-500 mr-2" />
                <h3 className="font-semibold">Further Reading</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li><a href="#" className="text-primary-600 hover:underline">The Food-Mood Connection</a></li>
                <li><a href="#" className="text-primary-600 hover:underline">Nutritional Psychiatry: Your Brain on Food</a></li>
                <li><a href="#" className="text-primary-600 hover:underline">How the Gut Microbiome Affects Mental Health</a></li>
                <li><a href="#" className="text-primary-600 hover:underline">Anti-inflammatory Diets for Depression</a></li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <Coffee size={20} className="text-primary-500 mr-2" />
                <h3 className="font-semibold">Mood-Boosting Recipes</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li><a href="#" className="text-primary-600 hover:underline">Anti-Anxiety Smoothie Bowl</a></li>
                <li><a href="#" className="text-primary-600 hover:underline">Omega-3 Rich Salmon Cakes</a></li>
                <li><a href="#" className="text-primary-600 hover:underline">Gut-Friendly Probiotic Breakfast</a></li>
                <li><a href="#" className="text-primary-600 hover:underline">Serotonin-Boosting Comfort Soup</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietRecommendation;