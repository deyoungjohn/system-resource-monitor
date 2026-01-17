import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Theme } from '../types';

interface MetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  colorClass: string;
  warningThreshold?: number;
  theme: Theme;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  colorClass,
  warningThreshold,
  theme,
}) => {
  // Determine if we should show a warning color based on threshold
  const isWarning = warningThreshold !== undefined && value > warningThreshold;
  
  // Dynamic classes for text and background
  const textColor = isWarning ? 'text-red-500' : colorClass;
  
  // Construct background classes dynamically
  // If colorClass is 'text-blue-500', replace 'text-' with 'bg-'
  const barColor = isWarning 
    ? 'bg-red-500' 
    : colorClass.replace('text-', 'bg-');

  // Background for the icon circle (slight opacity)
  const iconBg = isWarning ? 'bg-red-500/20' : colorClass.replace('text-', 'bg-').replace('500', '500/20');

  return (
    <div className={`${theme.colors.card} rounded-xl p-6 border ${theme.colors.border} shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className={`${theme.colors.textSecondary} text-xs font-bold uppercase tracking-widest mb-1`}>
            {title}
          </h3>
          <div className={`text-3xl font-bold ${textColor}`}>
            {value}%
          </div>
        </div>
        <div className={`p-3 rounded-lg ${iconBg} ${textColor}`}>
          <Icon size={24} />
        </div>
      </div>
      
      {/* Progress Bar Track */}
      {/* We use a generic gray/20 for the track to work on both light and dark backgrounds */}
      <div className={`w-full rounded-full h-2 overflow-hidden ${theme.type === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
        {/* Progress Bar Fill */}
        <div 
          className={`h-full rounded-full transition-all duration-500 ease-out ${barColor}`} 
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        />
      </div>
    </div>
  );
};