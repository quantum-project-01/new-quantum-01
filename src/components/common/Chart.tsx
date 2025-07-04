import React from 'react';

interface ChartProps {
  data: number[];
  labels: string[];
  title?: string;
  color?: 'blue' | 'green' | 'purple' | 'orange';
  type?: 'line' | 'bar';
}

const Chart: React.FC<ChartProps> = ({
  data,
  labels,
  title,
  color = 'blue',
  type = 'line',
}) => {
  const maxValue = Math.max(...data);
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
      
      {type === 'bar' ? (
        <div className="flex items-end justify-between h-40 space-x-2">
          {data.map((value, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className={`w-full ${colorClasses[color]} rounded-t-md transition-all duration-300`}
                style={{ height: `${(value / maxValue) * 100}%` }}
              />
              <span className="text-xs text-gray-600 mt-2 text-center">
                {labels[index]}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="relative h-40">
          <svg className="w-full h-full">
            <defs>
              <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" className={`stop-${color}-400`} stopOpacity="0.3" />
                <stop offset="100%" className={`stop-${color}-400`} stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((y) => (
              <line
                key={y}
                x1="0"
                y1={`${y}%`}
                x2="100%"
                y2={`${y}%`}
                stroke="#e5e7eb"
                strokeWidth="1"
              />
            ))}
            
            {/* Line chart */}
            <polyline
              fill="none"
              stroke={color === 'blue' ? '#3b82f6' : color === 'green' ? '#10b981' : color === 'purple' ? '#8b5cf6' : '#f59e0b'}
              strokeWidth="2"
              points={data
                .map((value, index) => {
                  const x = (index / (data.length - 1)) * 100;
                  const y = 100 - (value / maxValue) * 100;
                  return `${x},${y}`;
                })
                .join(' ')}
            />
            
            {/* Data points */}
            {data.map((value, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = 100 - (value / maxValue) * 100;
              return (
                <circle
                  key={index}
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r="4"
                  fill={color === 'blue' ? '#3b82f6' : color === 'green' ? '#10b981' : color === 'purple' ? '#8b5cf6' : '#f59e0b'}
                />
              );
            })}
          </svg>
          
          {/* Labels */}
          <div className="flex justify-between mt-2">
            {labels.map((label, index) => (
              <span key={index} className="text-xs text-gray-600">
                {label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chart; 