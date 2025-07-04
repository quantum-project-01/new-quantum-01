import React from 'react';
import {
  HeroSection,
  HowItWorksSection,
  FeaturesSection,
  SportsSection,
  CTASection
} from '../components/home';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <SportsSection />
      <CTASection />
    </div>
  );
};

export default HomePage; 