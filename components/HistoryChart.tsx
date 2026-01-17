import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { HistoryPoint, ViewMode, Theme } from '../types';
import { fetchHistory } from '../api';

interface HistoryChartProps {
  title: string;
  dataKey: keyof Omit<HistoryPoint, 'time'>; // 'cpu' | 'ram' | 'disk'
  color: string;
  liveData: HistoryPoint[];
  theme: Theme;
}

export const HistoryChart: React.FC<HistoryChartProps> = ({ 
  title, 
  dataKey, 
  color,
  liveData,
  theme
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('live');
  const [historyData, setHistoryData] = useState<HistoryPoint[]>([]);

  // Fetch history when viewMode changes to non-live
  useEffect(() => {
    if (viewMode === '24h' || viewMode === '7d') {
      fetchHistory(viewMode).then(data => {
        setHistoryData(data);
      });
    }
  }, [viewMode]);

  const currentData = viewMode === 'live' ? liveData : historyData;

  return (
    <div className={`${theme.colors.card} p-6 rounded-xl border ${theme.colors.border} shadow-lg transition-colors duration-300`}>
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <div>
          <h3 className={`${theme.colors.textSecondary} text-xs font-bold uppercase tracking-widest`}>
            {title} History
          </h3>
          <span className={`text-xs ${theme.colors.text} opacity-70`}>
            {viewMode === 'live' ? 'Real-time updates' : viewMode === '24h' ? 'Last 24 Hours' : 'Last 7 Days'}
          </span>
        </div>
        
        {/* View Switcher Tabs */}
        <div className={`flex rounded-lg p-1 ${theme.type === 'dark' ? 'bg-gray-700/50' : 'bg-gray-200/80'}`}>
          {(['live', '24h', '7d'] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
                viewMode === mode 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : `${theme.colors.textSecondary} hover:${theme.colors.text} hover:bg-black/5 dark:hover:bg-white/5`
              }`}
            >
              {mode === 'live' ? 'Live' : mode === '24h' ? '24h' : '7d'}
            </button>
          ))}
        </div>
      </div>
      
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={currentData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={theme.colors.chartGrid} 
              vertical={false} 
            />
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
                backgroundColor: theme.colors.chartTooltipBg, 
                borderColor: theme.colors.chartGrid, 
                color: theme.colors.chartTooltipText,
                borderRadius: '0.5rem'
              }}
              itemStyle={{ color: color }}
              labelStyle={{ color: theme.colors.textSecondary, marginBottom: '0.25rem' }}
            />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={3}
              dot={viewMode !== 'live'} 
              activeDot={{ r: 6, fill: color, stroke: theme.colors.chartTooltipBg, strokeWidth: 2 }}
              animationDuration={500}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};