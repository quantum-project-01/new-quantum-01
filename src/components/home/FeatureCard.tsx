import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  colorScheme: 'blue' | 'green' | 'purple' | 'yellow' | 'red' | 'indigo';
}

const colorClasses = {
  blue: {
    bg: 'bg-blue-500/10 group-hover:bg-blue-500/20',
    iconColor: 'text-blue-400',
    hoverBorder: 'hover:border-blue-500/30',
    gradientFrom: 'from-blue-500/10',
    shadowColor: 'group-hover:shadow-blue-500/20'
  },
  green: {
    bg: 'bg-green-500/10 group-hover:bg-green-500/20',
    iconColor: 'text-green-400',
    hoverBorder: 'hover:border-green-500/30',
    gradientFrom: 'from-green-500/10',
    shadowColor: 'group-hover:shadow-green-500/20'
  },
  purple: {
    bg: 'bg-purple-500/10 group-hover:bg-purple-500/20',
    iconColor: 'text-purple-400',
    hoverBorder: 'hover:border-purple-500/30',
    gradientFrom: 'from-purple-500/10',
    shadowColor: 'group-hover:shadow-purple-500/20'
  },
  yellow: {
    bg: 'bg-yellow-500/10 group-hover:bg-yellow-500/20',
    iconColor: 'text-yellow-400',
    hoverBorder: 'hover:border-yellow-500/30',
    gradientFrom: 'from-yellow-500/10',
    shadowColor: 'group-hover:shadow-yellow-500/20'
  },
  red: {
    bg: 'bg-red-500/10 group-hover:bg-red-500/20',
    iconColor: 'text-red-400',
    hoverBorder: 'hover:border-red-500/30',
    gradientFrom: 'from-red-500/10',
    shadowColor: 'group-hover:shadow-red-500/20'
  },
  indigo: {
    bg: 'bg-indigo-500/10 group-hover:bg-indigo-500/20',
    iconColor: 'text-indigo-400',
    hoverBorder: 'hover:border-indigo-500/30',
    gradientFrom: 'from-indigo-500/10',
    shadowColor: 'group-hover:shadow-indigo-500/20'
  }
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, colorScheme }) => {
  const colors = colorClasses[colorScheme];

  return (
    <div className={`group relative bg-gray-900/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-gray-700/50 ${colors.hoverBorder} hover:shadow-2xl ${colors.shadowColor} transition-all duration-500 transform hover:scale-105 hover:-translate-y-2`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradientFrom} to-transparent rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      <div className="relative">
        <div className={`w-12 h-12 sm:w-14 sm:h-14 ${colors.bg} rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}>
          <Icon className={`h-6 w-6 sm:h-7 sm:w-7 ${colors.iconColor} group-hover:scale-110 transition-transform duration-300`} />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-gray-100 transition-colors duration-300">{title}</h3>
        <p className="text-gray-400 leading-relaxed text-sm sm:text-base group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>
      </div>
      
      {/* Hover Effect Glow */}
      <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${colors.gradientFrom} blur-xl`}></div>
    </div>
  );
};

export default FeatureCard; 