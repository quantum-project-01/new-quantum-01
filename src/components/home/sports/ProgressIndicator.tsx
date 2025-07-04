import React from 'react';

interface ProgressIndicatorProps {
  currentCard: number;
  totalCards: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentCard, totalCards }) => (
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50">
    <div className="flex justify-center items-center space-x-2 mb-4">
      {Array.from({ length: totalCards }).map((_, index) => (
        <div
          key={index}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index <= currentCard ? 'bg-orange-500 scale-125' : 'bg-white/30'
          }`}
        />
      ))}
    </div>
    <p className="text-white/60 text-center text-sm">
      {currentCard + 1} of {totalCards} sports
    </p>
  </div>
);

export default ProgressIndicator; 