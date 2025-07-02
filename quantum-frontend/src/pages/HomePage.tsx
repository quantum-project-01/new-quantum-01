import React from 'react';
import {
  HeroSection,
  HowItWorksSection,
  FeaturesSection,
  CTASection
} from '../components/home';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <CTASection />
    </div>
  );
};

export default HomePage; 