import React from 'react';
import { Palette, Moon, Sun } from 'lucide-react';
import { Theme } from '../types';
import { themes } from '../themes';

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onThemeChange }) => {
  return (
    <div className="relative group z-10">
      <button 
        className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors duration-200 
          ${currentTheme.colors.card} ${currentTheme.colors.border} ${currentTheme.colors.text}`}
      >
        <Palette size={16} />
        <span className="text-sm font-medium hidden sm:inline">{currentTheme.label}</span>
      </button>

      {/* Dropdown Menu */}
      <div className={`absolute right-0 mt-2 w-56 rounded-xl shadow-2xl overflow-hidden hidden group-hover:block border ${currentTheme.colors.card} ${currentTheme.colors.border} ${currentTheme.colors.text}`}>
        <div className={`${currentTheme.colors.card} p-1 max-h-96 overflow-y-auto`}>
          <div className={`px-3 py-2 text-xs font-bold uppercase tracking-wider opacity-50`}>
            Dark Themes
          </div>
          {themes.filter(t => t.type === 'dark').map(theme => (
            <button
              key={theme.id}
              onClick={() => onThemeChange(theme)}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center justify-between hover:bg-black/10 dark:hover:bg-white/10
                ${currentTheme.id === theme.id ? 'bg-blue-500/10 text-blue-500 font-semibold' : ''}`}
            >
              <div className="flex items-center gap-2">
                <Moon size={12} className="opacity-70" />
                {theme.label}
              </div>
            </button>
          ))}
          
          <div className="border-t opacity-20 my-1"></div>

          <div className={`px-3 py-2 text-xs font-bold uppercase tracking-wider opacity-50`}>
            Light Themes
          </div>
          {themes.filter(t => t.type === 'light').map(theme => (
            <button
              key={theme.id}
              onClick={() => onThemeChange(theme)}
              className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center justify-between hover:bg-black/10 dark:hover:bg-white/10
                ${currentTheme.id === theme.id ? 'bg-blue-500/10 text-blue-500 font-semibold' : ''}`}
            >
              <div className="flex items-center gap-2">
                <Sun size={12} className="opacity-70" />
                {theme.label}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};