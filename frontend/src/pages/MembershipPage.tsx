import React, { useState } from 'react';
import { Check, Star, Zap, Crown, Gift, Users, Calendar, Shield } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import FaqAndInfo from './membership/components/FaqAndInfo';
import HeroSection from './membership/components/HeroSection';

interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  bookingValue: number;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  popular?: boolean;
  features: string[];
  perks: string[];
}

const MembershipPage: React.FC = () => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const membershipPlans: MembershipPlan[] = [
    {
      id: 'basic',
      name: 'Basic Pro',
      price: 5000,
      bookingValue: 6000,
      icon: <Zap className="h-8 w-8" />,
      color: 'from-blue-600 to-cyan-600',
      gradient: 'from-blue-600/20 to-cyan-600/20',
      features: [
        'Book turfs worth ₹6,000',
        '20% bonus value',
        'Priority booking slots',
        'Free cancellation',
        'Member exclusive events',
        '24/7 customer support'
      ],
      perks: [
        'Save ₹1,000 instantly',
        'VIP customer status',
        'Early access to new venues'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Elite',
      price: 10000,
      bookingValue: 12000,
      icon: <Crown className="h-8 w-8" />,
      color: 'from-purple-600 to-pink-600',
      gradient: 'from-purple-600/20 to-pink-600/20',
      popular: true,
      features: [
        'Book turfs worth ₹12,000',
        '20% bonus value',
        'Guaranteed priority slots',
        'Free cancellation anytime',
        'Exclusive premium events',
        'Dedicated support manager',
        'Complimentary equipment',
        'Guest booking privileges'
      ],
      perks: [
        'Save ₹2,000 instantly',
        'Elite member status',
        'Premium venue access',
        'Monthly bonus credits'
      ]
    }
  ];

  const handlePlanSelect = (planId: string) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setSelectedPlan(planId);
    // Here you would typically integrate with payment gateway
    console.log('Selected plan:', planId);
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-20 ">
      {/* Hero Section */}
      <HeroSection />

      {/* Membership Plans */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 ">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {membershipPlans.map((plan, index) => (
            <div
              key={plan.id}
              className={`relative group transition-all duration-500 transform ${
                hoveredPlan === plan.id 
                  ? 'scale-105 -translate-y-2' 
                  : hoveredPlan && hoveredPlan !== plan.id 
                    ? 'scale-95 opacity-75'
                    : 'scale-100'
              }`}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
              style={{
                animationDelay: `${index * 200}ms`
              }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    <Star className="inline h-4 w-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Card */}
              <div className={`
                relative overflow-hidden rounded-2xl border transition-all duration-500
                ${plan.popular 
                  ? 'border-purple-500/50 bg-gradient-to-br from-gray-800 via-gray-800 to-purple-900/20' 
                  : 'border-gray-700/50 bg-gradient-to-br from-gray-800 to-gray-900'
                }
                ${hoveredPlan === plan.id ? 'shadow-2xl shadow-purple-500/20' : 'shadow-xl'}
                backdrop-blur-xl
              `}>
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Content */}
                <div className="relative p-8">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} mb-4 shadow-lg`}>
                      <div className="text-white">
                        {plan.icon}
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                          ₹{plan.price.toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-400">One-time payment</p>
                    </div>
                    
                    {/* Value Proposition */}
                    <div className={`mt-4 p-4 rounded-xl bg-gradient-to-r ${plan.gradient} border border-gray-600/30`}>
                      <div className="flex items-center justify-center space-x-2">
                        <Gift className="h-5 w-5 text-green-400" />
                        <span className="text-lg font-semibold text-white">
                          Get ₹{plan.bookingValue.toLocaleString()} Booking Value
                        </span>
                      </div>
                      <p className="text-sm text-gray-300 mt-1">
                        Save ₹{(plan.bookingValue - plan.price).toLocaleString()} instantly!
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    <h4 className="font-semibold text-gray-200 text-center">What's Included:</h4>
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li 
                          key={idx} 
                          className="flex items-center space-x-3 text-gray-300"
                          style={{
                            animationDelay: `${(index * 200) + (idx * 100)}ms`
                          }}
                        >
                          <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center flex-shrink-0`}>
                            <Check className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Perks */}
                  <div className="space-y-3 mb-8">
                    <h4 className="font-semibold text-gray-200 text-center">Exclusive Perks:</h4>
                    <div className="space-y-2">
                      {plan.perks.map((perk, idx) => (
                        <div 
                          key={idx}
                          className={`text-center p-2 rounded-lg bg-gradient-to-r ${plan.gradient} border border-gray-600/20`}
                        >
                          <span className="text-sm text-gray-200 font-medium">{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`
                      w-full py-4 px-6 rounded-xl font-bold text-white text-lg
                      bg-gradient-to-r ${plan.color}
                      hover:shadow-2xl hover:shadow-purple-500/25
                      transform transition-all duration-300
                      ${hoveredPlan === plan.id ? 'scale-105' : ''}
                      ${selectedPlan === plan.id ? 'animate-pulse' : ''}
                      relative overflow-hidden group
                    `}
                  >
                    <span className="relative z-10">
                      {selectedPlan === plan.id ? 'Processing...' : 'Choose This Plan'}
                    </span>
                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </button>

                  {!isAuthenticated && (
                    <p className="text-xs text-gray-500 text-center mt-2">
                      *Login required to purchase membership
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ or Additional Info */}
        <FaqAndInfo />
      </div>
    </div>
  );
};

export default MembershipPage; 