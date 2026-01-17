import React, { useState, useEffect, useCallback } from 'react';
import { Activity, HardDrive, Cpu, ServerOff, Server, Mail, GraduationCap } from 'lucide-react';
import { MetricCard } from './components/MetricCard';
import { HistoryChart } from './components/HistoryChart';
import { ThemeSelector } from './components/ThemeSelector';
import { fetchSystemStats } from './api';
import { SystemStats, HistoryPoint, Theme } from './types';
import { themes } from './themes';

const App: React.FC = () => {
  // State to hold the current snapshot of system stats
  const [stats, setStats] = useState<SystemStats>({
    cpu: 0,
    ram: 0,
    disk: 0,
    timestamp: 0,
  });

  // Theme State
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

  // History for live data (polled)
  const [liveHistory, setLiveHistory] = useState<HistoryPoint[]>([]);
  
  // UI State
  const [isLive, setIsLive] = useState<boolean>(false);

  // Function to update stats, wrapped in useCallback to be stable for useEffect
  const updateStats = useCallback(async () => {
    const { data, isLive: liveStatus } = await fetchSystemStats();
    
    setIsLive(liveStatus);
    setStats(data);

    // Always update live history in background
    setLiveHistory(prevHistory => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { hour12: false });
      
      const newPoint: HistoryPoint = {
        time: timeString,
        cpu: data.cpu,
        ram: data.ram,
        disk: data.disk
      };

      const newHistory = [...prevHistory, newPoint];
      if (newHistory.length > 20) {
        return newHistory.slice(newHistory.length - 20);
      }
      return newHistory;
    });
  }, []);

  // Main Polling Effect
  useEffect(() => {
    updateStats();
    const intervalId = setInterval(updateStats, 2000);
    return () => clearInterval(intervalId);
  }, [updateStats]);

  return (
    <div className={`min-h-screen p-6 md:p-12 transition-colors duration-500 flex flex-col ${currentTheme.colors.background}`}>
      <div className="max-w-7xl mx-auto w-full flex-grow">
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              System Resource Monitor
            </h1>
            <p className={`mt-2 ${currentTheme.colors.textSecondary}`}>Real-time performance metrics</p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Theme Selector */}
            <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />

            {/* Connection Status Indicator */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm transition-colors duration-300
              ${isLive 
                ? 'bg-green-500/10 border-green-500/20 text-green-500' 
                : 'bg-orange-500/10 border-orange-500/20 text-orange-500'
              }`}>
              {isLive ? <Server size={18} /> : <ServerOff size={18} />}
              <span className="text-sm font-semibold hidden sm:inline">
                {isLive ? 'Online' : 'Simulated'}
              </span>
            </div>
          </div>
        </header>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MetricCard
            title="CPU Usage"
            value={stats.cpu}
            icon={Activity}
            colorClass="text-blue-500"
            warningThreshold={80} 
            theme={currentTheme}
          />
          <MetricCard
            title="RAM Usage"
            value={stats.ram}
            icon={Cpu}
            colorClass="text-purple-500"
            theme={currentTheme}
          />
          <MetricCard
            title="Disk Usage"
            value={stats.disk}
            icon={HardDrive}
            colorClass="text-emerald-500"
            theme={currentTheme}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <HistoryChart 
            title="CPU Usage"
            dataKey="cpu"
            color="#3B82F6" 
            liveData={liveHistory}
            theme={currentTheme}
          />
          <HistoryChart 
            title="RAM Usage"
            dataKey="ram"
            color="#A855F7" 
            liveData={liveHistory}
            theme={currentTheme}
          />
          <HistoryChart 
            title="Disk Usage"
            dataKey="disk"
            color="#10B981" 
            liveData={liveHistory}
            theme={currentTheme}
          />
        </div>

        {!isLive && (
          <div className={`mt-8 p-4 rounded-lg border text-sm transition-colors duration-300
            ${currentTheme.colors.card} ${currentTheme.colors.border} ${currentTheme.colors.textSecondary}`}>
            <p className="font-semibold text-orange-500 mb-1">Note:</p>
            <p>
              The app is currently in <strong>Simulation Mode</strong> because it couldn't connect to 
              <code> http://localhost:5000</code>. To see real data, make sure 
              <code> server.py</code> is running.
            </p>
          </div>
        )}
      </div>

      {/* Footer Section */}
      <footer className={`max-w-7xl mx-auto w-full mt-20 pt-8 border-t transition-colors duration-500 ${currentTheme.colors.border}`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Author Identity */}
          <div className="text-center md:text-left">
            <div className={`flex items-center justify-center md:justify-start gap-2 mb-2 ${currentTheme.colors.text}`}>
              <GraduationCap size={20} className="text-blue-500" />
              <span className="font-bold text-lg">Made by John Obiora</span>
            </div>
            <p className={`text-sm ${currentTheme.colors.textSecondary}`}>
              Computer Science Student @ FUT Minna
            </p>
          </div>

          {/* CTA & Contact */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <a 
              href="mailto:john.m1904973@st.futminna.edu.ng"
              className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-white text-sm transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent"
            >
              <Mail size={16} className="group-hover:animate-bounce" />
              Get in Touch
            </a>
            <div className={`font-mono text-xs px-3 py-1 rounded-md transition-colors duration-300 
              ${currentTheme.type === 'dark' ? 'bg-white/5 text-gray-400' : 'bg-black/5 text-gray-600'}`}>
              john.m1904973@st.futminna.edu.ng
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;