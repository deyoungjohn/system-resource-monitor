import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { HistoryPoint, ViewMode } from '../types';

interface CpuHistoryChartProps {
  data: HistoryPoint[];
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
}

export const CpuHistoryChart: React.FC<CpuHistoryChartProps> = ({ 
  data, 
  viewMode, 
  onViewChange 
}) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-lg">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">
            CPU Usage History
          </h3>
          <span className="text-xs text-gray-500">
            {viewMode === 'live' ? 'Real-time updates' : viewMode === '24h' ? 'Last 24 Hours' : 'Last 7 Days'}
          </span>
        </div>
        
        {/* View Switcher Tabs */}
        <div className="flex bg-gray-700/50 rounded-lg p-1">
          {(['live', '24h', '7d'] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => onViewChange(mode)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
                viewMode === mode 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
              }`}
            >
              {mode === 'live' ? 'Live' : mode === '24h' ? '24h' : '7d'}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
            <XAxis 
              dataKey="time" 
              stroke="#9CA3AF" 
              tick={{ fontSize: 12 }}
              tickMargin={10}
            />
            <YAxis 
              stroke="#9CA3AF" 
              domain={[0, 100]} 
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                borderColor: '#374151', 
                color: '#F3F4F6',
                borderRadius: '0.5rem'
              }}
              itemStyle={{ color: '#60A5FA' }}
              labelStyle={{ color: '#9CA3AF', marginBottom: '0.25rem' }}
            />
            <Line 
              type="monotone" 
              dataKey="cpu" 
              stroke="#3B82F6" 
              strokeWidth={3}
              dot={viewMode !== 'live'} // Show dots on history views since points are scarce
              activeDot={{ r: 6, fill: '#60A5FA', stroke: '#1E40AF', strokeWidth: 2 }}
              animationDuration={500}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};