import React from 'react';

interface AztroLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  className?: string;
}

export const AztroLogo: React.FC<AztroLogoProps> = ({ 
  size = 'md', 
  variant = 'light',
  className = ''
}) => {
  const isDark = variant === 'dark';
  
  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl'
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  return (
    <div className={`flex items-center gap-2 select-none font-sans ${className}`}>
      {/* Aztro Symbol: Stylized Cosmic Rocket Orbit 'A' Icon */}
      <div className={`relative flex items-center justify-center ${iconSizes[size]} shrink-0`}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
          {/* Outer orbital gradient ring */}
          <circle cx="20" cy="20" r="18" stroke="url(#aztro_grad)" strokeWidth="2.5" strokeDasharray="80 30" opacity="0.9" />
          {/* Central stylized 'A' vector with orbital star */}
          <path 
            d="M 20 6 L 31 32 L 25 32 L 20 18 L 15 32 L 9 32 Z" 
            fill="url(#aztro_grad)" 
          />
          {/* Inner horizontal connector beam */}
          <path 
            d="M 13.5 24.5 H 26.5" 
            stroke="#10b981" 
            strokeWidth="3" 
            strokeLinecap="round" 
          />
          {/* Sparkle Star at Peak */}
          <circle cx="20" cy="6" r="2.5" fill="#facc15" />

          <defs>
            <linearGradient id="aztro_grad" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f59e0b" />
              <stop offset="0.5" stopColor="#fbbf24" />
              <stop offset="1" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex items-baseline tracking-tight font-black leading-none">
        <span className={`${textSizes[size]} ${isDark ? 'text-slate-900' : 'text-white'} font-black`}>
          aztro
        </span>
        <span className="text-[#f59e0b] font-bold text-xs ml-0.5">.com</span>
      </div>
    </div>
  );
};
