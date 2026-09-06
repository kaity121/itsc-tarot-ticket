import React from 'react';

export type GemType = 'diamond' | 'star' | 'heart' | 'pearl';
export type GemColor = 'pink' | 'purple' | 'blue' | 'yellow';

interface RhinestoneGemProps {
  type?: GemType;
  color?: GemColor;
  size?: number;
  twinkle?: boolean;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

const colorPalettes = {
  pink: {
    base: '#F472B6',
    light: '#FDF2F8',
    mid: '#FBCFE8',
    deep: '#EC4899',
    stroke: '#DB2777'
  },
  purple: {
    base: '#C084FC',
    light: '#FAF5FF',
    mid: '#E9D5FF',
    deep: '#A855F7',
    stroke: '#8B5CF6'
  },
  blue: {
    base: '#93C5FD',
    light: '#EFF6FF',
    mid: '#BFDBFE',
    deep: '#60A5FA',
    stroke: '#3B82F6'
  },
  yellow: {
    base: '#FDE047',
    light: '#FEFCE8',
    mid: '#FEF08A',
    deep: '#FACC15',
    stroke: '#EAB308'
  }
};

export const RhinestoneGem: React.FC<RhinestoneGemProps> = ({
  type = 'diamond',
  color = 'purple',
  size = 18,
  twinkle = false,
  delay = 0,
  className = '',
  style = {}
}) => {
  const p = colorPalettes[color] || colorPalettes.purple;

  const animationClass = twinkle
    ? delay > 0
      ? 'animate-gem-twinkle-delayed'
      : 'animate-gem-twinkle'
    : '';

  return (
    <div
      className={`inline-flex items-center justify-center select-none pointer-events-none drop-shadow-[0_2px_5px_rgba(45,30,70,0.12)] ${animationClass} ${className}`}
      style={{
        width: size,
        height: size,
        ...style
      }}
    >
      {type === 'diamond' && (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Faceted Rhombus Diamond */}
          {/* Outer stroke / border */}
          <polygon points="12,1 23,12 12,23 1,12" fill={p.base} stroke="#FFFFFF" strokeWidth="1.2" strokeLinejoin="round" />
          {/* Top Facet */}
          <polygon points="12,1 17,7 7,7" fill={p.light} />
          {/* Center Table */}
          <polygon points="7,7 17,7 15,15 9,15" fill={p.mid} />
          {/* Bottom Point Facet */}
          <polygon points="9,15 15,15 12,23" fill={p.deep} />
          {/* Left Wing Facet */}
          <polygon points="1,12 7,7 9,15" fill={p.base} opacity="0.9" />
          {/* Right Wing Facet */}
          <polygon points="23,12 17,7 15,15" fill={p.deep} opacity="0.85" />
          {/* White Reflection Gleam Dots */}
          <circle cx="9" cy="6" r="1.3" fill="#FFFFFF" />
          <circle cx="11.5" cy="8.5" r="0.7" fill="#FFFFFF" />
        </svg>
      )}

      {type === 'star' && (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 4-Point Sharp Faceted Sparkle Star */}
          {/* Facets 8-way reflection */}
          {/* Top-left point */}
          <polygon points="12,1 12,12 5,12" fill={p.light} />
          <polygon points="5,12 12,12 12,19" fill={p.base} />
          {/* Bottom-right point */}
          <polygon points="12,23 12,12 19,12" fill={p.deep} />
          <polygon points="19,12 12,12 12,5" fill={p.mid} />
          {/* Outer crisp die-cut outline */}
          <path
            d="M 12 1 Q 12 12 1 12 Q 12 12 12 23 Q 12 12 23 12 Q 12 12 12 1 Z"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* High reflection starburst gleam */}
          <circle cx="10" cy="7.5" r="1.4" fill="#FFFFFF" />
          <circle cx="13" cy="9.5" r="0.8" fill="#FFFFFF" />
        </svg>
      )}

      {type === 'heart' && (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Faceted Heart Gem */}
          <path
            d="M 12 21.5 C 12 21.5 2 15 2 8 C 2 4.5 5 2 8.5 2 C 10.5 2 12 3.5 12 4 C 12 3.5 13.5 2 15.5 2 C 19 2 22 4.5 22 8 C 22 15 12 21.5 12 21.5 Z"
            fill={p.base}
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Upper Left Lobe Highlight */}
          <path d="M 8.5 3 C 6 3 3.5 5 3.5 8 C 3.5 10 6 13 12 17 C 8 13 7 8 8.5 3 Z" fill={p.light} opacity="0.8" />
          {/* Center Table Facet */}
          <polygon points="8,7 16,7 13,13 11,13" fill={p.mid} opacity="0.9" />
          {/* Bottom Facet */}
          <polygon points="11,13 13,13 12,20" fill={p.deep} opacity="0.8" />
          {/* White Reflection Highlight Dots */}
          <circle cx="6.5" cy="5.5" r="1.3" fill="#FFFFFF" />
          <circle cx="8.5" cy="7.5" r="0.7" fill="#FFFFFF" />
        </svg>
      )}

      {type === 'pearl' && (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Luminous Spherical Pearl Gem */}
          <circle cx="12" cy="12" r="9.5" fill={p.mid} stroke="#FFFFFF" strokeWidth="1.4" />
          {/* Inner ambient luster shadow at bottom */}
          <path d="M 5 14 C 6 18 10 20.5 14 20.5 C 18 20.5 20.5 18 21 14 C 19 18 15 19 12 19 C 9 19 6 17 5 14 Z" fill={p.deep} opacity="0.5" />
          {/* Upper highlight crescent */}
          <path d="M 6 10 C 7 6 11 4 15 4 C 11 4.5 8 7 7 11 Z" fill={p.light} opacity="0.8" />
          {/* Crisp pearl white specular highlight dot */}
          <circle cx="8.5" cy="8.5" r="1.8" fill="#FFFFFF" />
          <circle cx="11.5" cy="9.5" r="0.8" fill="#FFFFFF" />
        </svg>
      )}
    </div>
  );
};
