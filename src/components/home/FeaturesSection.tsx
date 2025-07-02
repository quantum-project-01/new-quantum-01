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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-50 text-green-600 text-sm font-medium mb-6">
            <Award className="h-4 w-4 mr-2" />
            Why Choose Us
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We've built the most comprehensive sports venue booking platform 
            with features that make booking effortless and playing enjoyable.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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