import React from 'react';

export const MandalaPattern: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = 'currentColor',
}) => {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`opacity-15 pointer-events-none ${className}`}
    >
      <circle cx="100" cy="100" r="95" stroke={color} strokeWidth="1" strokeDasharray="4 2" />
      <circle cx="100" cy="100" r="75" stroke={color} strokeWidth="1.5" />
      <circle cx="100" cy="100" r="55" stroke={color} strokeWidth="1" />
      <circle cx="100" cy="100" r="35" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="100" cy="100" r="15" stroke={color} strokeWidth="1" />

      {/* Petals */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 100 + 35 * Math.cos(angle);
        const y1 = 100 + 35 * Math.sin(angle);
        const x2 = 100 + 75 * Math.cos(angle);
        const y2 = 100 + 75 * Math.sin(angle);
        return (
          <path
            key={i}
            d={`M 100 100 Q ${x1 + 10} ${y1 + 10} ${x2} ${y2} Q ${x1 - 10} ${y1 - 10} 100 100`}
            stroke={color}
            strokeWidth="1"
            fill="none"
          />
        );
      })}
    </svg>
  );
};
