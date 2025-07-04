import React from 'react';

interface ScrollIndicatorProps {
  currentCard: number;
  totalCards: number;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ currentCard, totalCards }) => (
  <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-white/60 z-50">
    <div className="flex flex-col items-center">
      <span className="text-sm mb-2 text-center px-4">
        {currentCard < totalCards - 1 ? 'Scroll to see next sport' : 'Scroll to continue'}
      </span>
      <div className="w-6 h-10 border-2 border-white/30 rounded-full relative">
        <div className="w-1 h-3 bg-white/60 rounded-full absolute top-2 left-1/2 transform -translate-x-1/2 animate-bounce"></div>
      </div>
    </div>
  </div>
);

export default ScrollIndicator; 