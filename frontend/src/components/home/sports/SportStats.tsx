import React from 'react';
import { SportCard } from './types';

interface SportStatsProps {
  sport: SportCard;
}

const SportStats: React.FC<SportStatsProps> = ({ sport }) => (
  <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-8">
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-bold text-white">{sport.venues}</div>
      <div className="text-sm text-gray-300">Venues</div>
    </div>
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-bold text-white">{sport.players}</div>
      <div className="text-sm text-gray-300">Players</div>
    </div>
    <div className="text-center">
      <div className="text-2xl sm:text-3xl font-bold text-white">{sport.rating}</div>
      <div className="text-sm text-gray-300">Rating</div>
    </div>
  </div>
);

export default SportStats; 