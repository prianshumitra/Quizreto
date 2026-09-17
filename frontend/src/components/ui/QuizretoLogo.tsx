import React from 'react';

interface QuizretoLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'full';
  showTagline?: boolean;
  className?: string;
}

export const QuizretoLogo: React.FC<QuizretoLogoProps> = ({
  size = 'md',
  variant = 'full',
  showTagline = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  };

  const isDark = variant === 'dark';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Kantha-Stitched Q Emblem Logo Icon */}
      <div
        className={`${iconSizes[size]} rounded-2xl flex items-center justify-center shrink-0 shadow-md relative overflow-hidden transition-transform duration-200 hover:scale-105 ${isDark
            ? 'bg-[#FDF7ED] text-[#0F2D3D] border-2 border-dashed border-[#D3542E]'
            : 'bg-[#0F2D3D] text-[#F4A261] border-2 border-dashed border-[#F4A261]/60'
          }`}
      >
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full p-1.5">
          {/* Outer Kantha Running-Stitch Circle */}
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke={isDark ? '#D3542E' : '#F4A261'}
            strokeWidth="2.5"
            strokeDasharray="5 3"
          />

          {/* Inner Lotus Petal Motifs */}
          <path
            d="M 50 22 C 38 35 38 48 50 62 C 62 48 62 35 50 22 Z"
            fill={isDark ? '#D3542E' : '#D3542E'}
            opacity="0.9"
          />

          <path
            d="M 28 50 C 40 38 52 38 65 50 C 52 62 40 62 28 50 Z"
            fill={isDark ? '#D99A2B' : '#F4A261'}
            opacity="0.8"
          />

          {/* Stylized 'Q' Tail with Kantha Embroidery Thread Loop */}
          <path
            d="M 55 55 L 75 75 M 65 65 L 80 65"
            stroke={isDark ? '#0F2D3D' : '#FFFDF9'}
            strokeWidth="4"
            strokeLinecap="round"
          />

          <circle
            cx="75"
            cy="75"
            r="4"
            fill={isDark ? '#D3542E' : '#F4A261'}
          />

          {/* Kantha Cross Stitches ✦ */}
          <path
            d="M 50 15 L 50 20 M 47.5 17.5 L 52.5 17.5"
            stroke={isDark ? '#D3542E' : '#F4A261'}
            strokeWidth="1.5"
          />

          <path
            d="M 15 50 L 20 50 M 17.5 47.5 L 17.5 52.5"
            stroke={isDark ? '#D3542E' : '#F4A261'}
            strokeWidth="1.5"
          />

          <path
            d="M 80 50 L 85 50 M 82.5 47.5 L 82.5 52.5"
            stroke={isDark ? '#D3542E' : '#F4A261'}
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      <div>
        <span
          className={`font-serif font-bold tracking-tight block leading-none ${textSizes[size]} ${isDark ? 'text-white' : 'text-[#F5EBDD]'
            }`}
        >
          Quiz<span className="text-[#D3542E]">Reto</span>
        </span>

        {showTagline && (
          <span
            className={`text-[10px] font-handwriting block -mt-0.5 tracking-wide ${isDark ? 'text-[#F4A261]' : 'text-[#D3542E]'
              }`}
          >
            Knowledge Has No Boundaries
          </span>
        )}
      </div>
    </div>
  );
};