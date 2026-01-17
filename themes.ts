import { Theme } from './types';

export const themes: Theme[] = [
  // --- Dark Themes ---
  {
    id: 'dark-gold',
    label: 'Dark Gold',
    type: 'dark',
    colors: {
      background: 'bg-neutral-950',
      card: 'bg-neutral-900',
      border: 'border-yellow-900/50',
      text: 'text-yellow-50',
      textSecondary: 'text-yellow-600',
      chartGrid: '#451a03',
      chartTooltipBg: '#171717',
      chartTooltipText: '#fefce8'
    }
  },
  {
    id: 'deep-ocean',
    label: 'Deep Ocean',
    type: 'dark',
    colors: {
      background: 'bg-slate-900',
      card: 'bg-slate-800',
      border: 'border-slate-700',
      text: 'text-slate-100',
      textSecondary: 'text-slate-400',
      chartGrid: '#334155',
      chartTooltipBg: '#1E293B',
      chartTooltipText: '#F1F5F9'
    }
  },
  {
    id: 'forest-night',
    label: 'Forest Night',
    type: 'dark',
    colors: {
      background: 'bg-green-950',
      card: 'bg-green-900',
      border: 'border-green-800',
      text: 'text-green-50',
      textSecondary: 'text-green-400',
      chartGrid: '#14532d',
      chartTooltipBg: '#064e3b',
      chartTooltipText: '#ecfdf5'
    }
  },
  {
    id: 'cyberpunk',
    label: 'Cyberpunk',
    type: 'dark',
    colors: {
      background: 'bg-zinc-950',
      card: 'bg-black',
      border: 'border-pink-500/30',
      text: 'text-zinc-100',
      textSecondary: 'text-zinc-400',
      chartGrid: '#27272a',
      chartTooltipBg: '#000000',
      chartTooltipText: '#e4e4e7'
    }
  },
  {
    id: 'crimson-night',
    label: 'Crimson Night',
    type: 'dark',
    colors: {
      background: 'bg-red-950',
      card: 'bg-[#450a0a]', // Very dark red
      border: 'border-red-900',
      text: 'text-red-50',
      textSecondary: 'text-red-400',
      chartGrid: '#7f1d1d',
      chartTooltipBg: '#450a0a',
      chartTooltipText: '#fef2f2'
    }
  },
  // --- Light Themes ---
  {
    id: 'light-default',
    label: 'Classic Light',
    type: 'light',
    colors: {
      background: 'bg-gray-100',
      card: 'bg-white',
      border: 'border-gray-200',
      text: 'text-gray-900',
      textSecondary: 'text-gray-500',
      chartGrid: '#e5e7eb',
      chartTooltipBg: '#ffffff',
      chartTooltipText: '#111827'
    }
  },
  {
    id: 'sakura',
    label: 'Sakura',
    type: 'light',
    colors: {
      background: 'bg-pink-50',
      card: 'bg-white',
      border: 'border-pink-200',
      text: 'text-pink-950',
      textSecondary: 'text-pink-500',
      chartGrid: '#fbcfe8',
      chartTooltipBg: '#fff1f2',
      chartTooltipText: '#831843'
    }
  },
  {
    id: 'azure-day',
    label: 'Azure Day',
    type: 'light',
    colors: {
      background: 'bg-blue-50',
      card: 'bg-white',
      border: 'border-blue-200',
      text: 'text-blue-900',
      textSecondary: 'text-blue-500',
      chartGrid: '#bfdbfe',
      chartTooltipBg: '#eff6ff',
      chartTooltipText: '#172554'
    }
  }
];