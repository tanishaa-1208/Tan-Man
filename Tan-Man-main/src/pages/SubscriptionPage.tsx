import { useState } from 'react';
import { Check, X, Badge } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

type PlanType = 'free' | 'monthly' | 'quarterly' | 'yearly';

interface Plan {
  id: PlanType;
  name: string;
  price: number;
  duration: string;
  savings: string | null;
  features: string[];
  recommended?: boolean;
}

const plans: Plan[] = [
  {
    id: 'free',
    name: 'Free Trial',
    price: 0,
    duration: '10 days',
    savings: null,
    features: [
      'Access to all features',
      'Basic reports',
      'Limited AI support',
      'Cancel anytime',
    ],
  },
  {
    id: 'monthly',
    name: 'Monthly',
    price: 500,
    duration: '1 month',
    savings: null,
    features: [
      'Unlimited access to all features',
      'Weekly reports',
      'Full AI support',
      'Personalized recommendations',
      'Cancel anytime',
    ],
  },
  {
    id: 'quarterly',
    name: 'Quarterly',
    price: 1200,
    duration: '3 months',
    savings: 'Save ₹300',
    features: [
      'Everything in Monthly',
      'Monthly detailed reports',
      'Priority support',
      'Offline mode',
      'Cancel anytime',
    ],
    recommended: true,
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: 5000,
    duration: '12 months',
    savings: 'Save ₹1,000',
    features: [
      'Everything in Quarterly',
      'Annual wellness analysis',
      'VIP support',
      'Early access to new features',
      'Personal wellness coach',
    ],
  },
];

const SubscriptionPage = () => {
  const { user, updateSubscription } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(user?.subscription || 'monthly');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      updateSubscription(selectedPlan);
      setIsProcessing(false);
      navigate('/features');
    }, 1500);
  };

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the subscription that works best for your mental wellness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative bg-white rounded-xl ${
                selectedPlan === plan.id
                  ? 'ring-2 ring-primary-500 shadow-xl'
                  : 'shadow-card'
              } overflow-hidden`}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 bg-secondary-500 text-white py-1 px-3 text-sm font-medium">
                  Recommended
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold">₹{plan.price}</span>
                  <span className="text-gray-500">/{plan.duration}</span>
                </div>
                
                {plan.savings && (
                  <div className="mb-4 inline-block bg-green-50 text-green-700 px-2 py-1 rounded text-sm font-medium">
                    {plan.savings}
                  </div>
                )}
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check size={18} className="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-2 rounded-lg font-medium transition-colors ${
                    selectedPlan === plan.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Select'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-card p-8">
          <h3 className="text-2xl font-semibold mb-6">Summary</h3>
          
          <div className="flex justify-between items-center mb-4 pb-4 border-b">
            <div>
              <span className="font-medium">{plans.find(p => p.id === selectedPlan)?.name} Plan</span>
              <p className="text-gray-500 text-sm">
                {plans.find(p => p.id === selectedPlan)?.duration} subscription
              </p>
            </div>
            <span className="font-semibold">
              ₹{plans.find(p => p.id === selectedPlan)?.price}
            </span>
          </div>
          
          {selectedPlan !== 'free' && (
            <div className="flex justify-between items-center mb-4 pb-4 border-b">
              <span className="text-gray-700">Tax</span>
              <span className="text-gray-700">Included</span>
            </div>
          )}
          
          <div className="flex justify-between items-center mb-6 pt-2">
            <span className="text-lg font-semibold">Total</span>
            <span className="text-xl font-bold text-primary-500">
              ₹{plans.find(p => p.id === selectedPlan)?.price}
            </span>
          </div>
          
          <button
            onClick={handleSubscribe}
            disabled={isProcessing || (user?.subscription === selectedPlan)}
            className="w-full btn-primary py-3 text-lg disabled:opacity-70"
          >
            {isProcessing 
              ? 'Processing...' 
              : user?.subscription === selectedPlan 
                ? 'Current Plan' 
                : `Subscribe Now`}
          </button>
          
          <div className="mt-6 flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center text-gray-600">
              <Badge size={16} className="mr-1" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center text-gray-600">
              <X size={16} className="mr-1" />
              <span>No Hidden Fees</span>
            </div>
          </div>
        </div>
        
        <div className="mt-12 max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h4 className="font-semibold">Can I cancel my subscription?</h4>
              <p className="text-gray-600 mt-1">
                Yes, you can cancel your subscription at any time. If you cancel, you'll still have access until the end of your billing period.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h4 className="font-semibold">How do I get a refund?</h4>
              <p className="text-gray-600 mt-1">
                If you're not satisfied with your purchase, contact our support team within 7 days of subscribing and we'll process your refund.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h4 className="font-semibold">What payment methods do you accept?</h4>
              <p className="text-gray-600 mt-1">
                We accept all major credit cards, debit cards, UPI, and net banking.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h4 className="font-semibold">Is my payment information secure?</h4>
              <p className="text-gray-600 mt-1">
                Yes, all payment information is processed securely through our payment gateway. We never store your full card details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;