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
    bg: 'bg-blue-100 group-hover:bg-blue-200',
    iconColor: 'text-blue-600',
    hoverBorder: 'hover:border-blue-200',
    gradientFrom: 'from-blue-50'
  },
  green: {
    bg: 'bg-green-100 group-hover:bg-green-200',
    iconColor: 'text-green-600',
    hoverBorder: 'hover:border-green-200',
    gradientFrom: 'from-green-50'
  },
  purple: {
    bg: 'bg-purple-100 group-hover:bg-purple-200',
    iconColor: 'text-purple-600',
    hoverBorder: 'hover:border-purple-200',
    gradientFrom: 'from-purple-50'
  },
  yellow: {
    bg: 'bg-yellow-100 group-hover:bg-yellow-200',
    iconColor: 'text-yellow-600',
    hoverBorder: 'hover:border-yellow-200',
    gradientFrom: 'from-yellow-50'
  },
  red: {
    bg: 'bg-red-100 group-hover:bg-red-200',
    iconColor: 'text-red-600',
    hoverBorder: 'hover:border-red-200',
    gradientFrom: 'from-red-50'
  },
  indigo: {
    bg: 'bg-indigo-100 group-hover:bg-indigo-200',
    iconColor: 'text-indigo-600',
    hoverBorder: 'hover:border-indigo-200',
    gradientFrom: 'from-indigo-50'
  }
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, colorScheme }) => {
  const colors = colorClasses[colorScheme];

  return (
    <div className={`group relative bg-white p-8 rounded-3xl border border-gray-100 ${colors.hoverBorder} hover:shadow-xl transition-all duration-300`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradientFrom} to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
      <div className="relative">
        <div className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center mb-6 transition-colors`}>
          <Icon className={`h-7 w-7 ${colors.iconColor}`} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard; 