// Interface defining the shape of data we expect from the backend
export interface SystemStats {
  cpu: number;
  ram: number;
  disk: number;
  timestamp: number;
}

// Interface for the data points used in the graph
export interface HistoryPoint {
  time: string;
  cpu: number;
  ram: number;
  disk: number;
}

// Type for the chart view mode
export type ViewMode = 'live' | '24h' | '7d';

// Theme definitions
export interface ThemeColors {
  background: string;     // Main app background (Tailwind class)
  card: string;           // Card background (Tailwind class)
  border: string;         // Card border (Tailwind class)
  text: string;           // Primary text (Tailwind class)
  textSecondary: string;  // Secondary text (Tailwind class)
  
  // Recharts requires specific Hex codes for some elements, not classes
  chartGrid: string;      
  chartTooltipBg: string;
  chartTooltipText: string;
}

export interface Theme {
  id: string;
  label: string;
  type: 'dark' | 'light';
  colors: ThemeColors;
}