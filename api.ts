import { SystemStats, HistoryPoint, ViewMode } from './types';

const BASE_URL = 'http://localhost:5000/api';

// Helper to generate fake data if backend is offline (for demo purposes)
const generateMockStats = (): SystemStats => ({
  cpu: Math.floor(Math.random() * 40) + 30, // Random between 30-70%
  ram: Math.floor(Math.random() * 20) + 40,
  disk: 55,
  timestamp: Date.now() / 1000,
});

const generateMockHistory = (period: ViewMode): HistoryPoint[] => {
  const data: HistoryPoint[] = [];
  const count = period === '24h' ? 24 : 7;
  const now = new Date();
  
  for (let i = 0; i < count; i++) {
    const pointDate = new Date(now);
    if (period === '24h') {
      pointDate.setHours(pointDate.getHours() - (count - 1 - i));
      data.push({
        time: pointDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        cpu: Math.floor(Math.random() * 60) + 20,
        ram: Math.floor(Math.random() * 30) + 40,
        disk: 50 + (i * 0.5)
      });
    } else {
      pointDate.setDate(pointDate.getDate() - (count - 1 - i));
      data.push({
        time: pointDate.toLocaleDateString('en-US', { weekday: 'short' }),
        cpu: Math.floor(Math.random() * 50) + 30,
        ram: Math.floor(Math.random() * 20) + 40,
        disk: 50 + Math.floor(Math.random() * 10)
      });
    }
  }
  return data;
};

export const fetchSystemStats = async (): Promise<{ data: SystemStats; isLive: boolean }> => {
  try {
    const controller = new AbortController();
    // Timeout after 1 second if server isn't running
    const timeoutId = setTimeout(() => controller.abort(), 1000);

    const response = await fetch(`${BASE_URL}/stats`, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return { data, isLive: true };
  } catch (error) {
    // If fetch fails (server not running), return mock data so the UI still works
    console.warn("Backend not detected, switching to Simulation Mode.");
    return { data: generateMockStats(), isLive: false };
  }
};

export const fetchHistory = async (period: '24h' | '7d'): Promise<HistoryPoint[]> => {
  try {
    const response = await fetch(`${BASE_URL}/history?period=${period}`);
    if (!response.ok) throw new Error('Failed to fetch history');
    return await response.json();
  } catch (error) {
    console.warn("History fetch failed, using mock data");
    return generateMockHistory(period);
  }
};