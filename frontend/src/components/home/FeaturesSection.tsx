import React from 'react';
import { Zap, Shield, Award, MapPin, Heart, Smartphone } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: 'Instant Booking',
      description: 'Book your slot instantly with real-time availability and immediate confirmation. No waiting, no delays.',
      colorScheme: 'blue' as const
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Pay securely with multiple payment options including cards, UPI, and wallets. Full refund protection guaranteed.',
      colorScheme: 'green' as const
    },
    {
      icon: Award,
      title: 'Verified Venues',
      description: 'All venues are personally verified with genuine photos, reviews, and quality standards you can trust.',
      colorScheme: 'purple' as const
    },
    {
      icon: MapPin,
      title: 'Smart Location',
      description: 'Find venues near you with GPS integration, detailed directions, and accurate location information.',
      colorScheme: 'yellow' as const
    },
    {
      icon: Heart,
      title: 'Community',
      description: 'Join sports events, find teammates, and connect with fellow sports enthusiasts in your area.',
      colorScheme: 'red' as const
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Optimized mobile experience with easy rescheduling, cancellation policies, and booking management.',
      colorScheme: 'indigo' as const
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-32 left-20 w-80 h-80 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-blue-500/3 to-purple-500/3 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-green-500/10 backdrop-blur-sm border border-green-500/20 text-green-400 text-xs sm:text-sm font-medium mb-4 sm:mb-6 hover:bg-green-500/20 hover:border-green-500/30 transition-all duration-300">
            <Award className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 animate-pulse" />
            Why Choose Us
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
            Everything You Need
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            We've built the most comprehensive sports venue booking platform 
            with features that make booking effortless and playing enjoyable.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              colorScheme={feature.colorScheme}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection; 