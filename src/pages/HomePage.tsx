import React from 'react';
import {
  HeroSection,
  HowItWorksSection,
  FeaturesSection,
  SportsSection,
  TestimonialSection,
  CTASection
} from '../components/home';
import AnimatedCursor from '../components/ui/AnimatedCursor';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <AnimatedCursor />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <SportsSection />
      <TestimonialSection />
      <CTASection />
    </div>
  );
};

export default HomePage; 