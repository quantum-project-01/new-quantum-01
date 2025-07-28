import React from 'react';
import { SportCard } from './types';

interface FeaturesCardProps {
  sport: SportCard;
}

const FeaturesCard: React.FC<FeaturesCardProps> = ({ sport }) => (
  <div className="hidden lg:block">
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 space-y-6">
      <h3 className="text-2xl font-bold text-white mb-6">Why Choose {sport.name}?</h3>
      
      <div className="space-y-4">
        {sport.features.map((feature, idx) => (
          <div key={idx} className="flex items-center space-x-3 p-3 bg-white/5 rounded-xl">
            <div className={`w-3 h-3 bg-gradient-to-r ${sport.color} rounded-full`}></div>
            <span className="text-white font-medium">{feature}</span>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-white/20">
        <div className="flex justify-between items-center">
          <span className="text-gray-300">Starting from</span>
          {/* <span className="text-2xl font-bold text-white">₹199/hr</span> */}
        </div>
      </div>
    </div>
  </div>
);

export default FeaturesCard; 