import React from 'react';

export const HeritageIllustration: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#F4A261]/20 via-[#FDF7ED] to-[#FDF7ED] p-6 sm:p-10 border border-[#E7DBCC] shadow-lg ${className}`}>
      {/* Sun glow */}
      <div className="absolute top-8 right-12 w-32 h-32 rounded-full bg-gradient-to-br from-[#F4A261] to-[#D3542E] opacity-70 blur-md pointer-events-none" />

      {/* Quote Banner overlay */}
      <div className="absolute top-6 left-8 bg-[#FFFDF9]/90 backdrop-blur-sm border border-[#E7DBCC] px-4 py-1.5 rounded-full shadow-sm text-xs sm:text-sm font-handwriting text-[#D3542E]">
        ✨ Curiosity Connects Cultures
      </div>

      <svg
        viewBox="0 0 600 350"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto mt-4"
      >
        {/* Sky / Birds */}
        <path d="M 120 50 Q 130 45 140 50 Q 150 45 160 50" stroke="#0F2D3D" strokeWidth="1.5" opacity="0.4" />
        <path d="M 170 35 Q 180 30 190 35 Q 200 30 210 35" stroke="#0F2D3D" strokeWidth="1.5" opacity="0.4" />
        <path d="M 450 60 Q 460 55 470 60 Q 480 55 490 60" stroke="#0F2D3D" strokeWidth="1.5" opacity="0.4" />

        {/* Outer Domes Background Silhouette */}
        <path
          d="M 50 300 L 50 220 Q 75 170 100 220 L 100 300 M 500 300 L 500 220 Q 525 170 550 220 L 550 300"
          fill="#D99A2B"
          opacity="0.15"
        />

        {/* Main Heritage Palace / Monument Structure (Victoria Memorial & Grand Indian Architecture silhouette) */}
        {/* Left Wing */}
        <rect x="90" y="210" width="110" height="90" fill="#0F2D3D" opacity="0.85" rx="4" />
        <path d="M 90 210 L 145 150 L 200 210 Z" fill="#D3542E" />
        <circle cx="145" cy="140" r="14" fill="#F4A261" />

        {/* Center Grand Central Dome */}
        <rect x="220" y="190" width="160" height="110" fill="#0F2D3D" rx="6" />
        <path d="M 220 190 Q 300 80 380 190 Z" fill="#0F2D3D" />
        {/* Dome Spire */}
        <path d="M 300 80 L 300 40 M 295 45 L 305 45" stroke="#F4A261" strokeWidth="3" strokeLinecap="round" />
        <circle cx="300" cy="35" r="5" fill="#D99A2B" />

        {/* Arches on Center Building */}
        <path d="M 250 300 L 250 240 Q 275 220 300 240 L 300 300" fill="#FDF7ED" opacity="0.9" />
        <path d="M 300 300 L 300 240 Q 325 220 350 240 L 350 300" fill="#FDF7ED" opacity="0.9" />

        {/* Right Wing */}
        <rect x="400" y="210" width="110" height="90" fill="#0F2D3D" opacity="0.85" rx="4" />
        <path d="M 400 210 L 455 150 L 510 210 Z" fill="#D3542E" />
        <circle cx="455" cy="140" r="14" fill="#F4A261" />

        {/* Pillars & Windows */}
        {Array.from({ length: 6 }).map((_, i) => (
          <rect key={i} x={105 + i * 15} y={230} width="6" height="40" fill="#FDF7ED" opacity="0.7" rx="2" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <rect key={i} x={415 + i * 15} y={230} width="6" height="40" fill="#FDF7ED" opacity="0.7" rx="2" />
        ))}

        {/* River Water Front */}
        <rect x="0" y="295" width="600" height="55" fill="#0F2D3D" />
        <path
          d="M 0 310 Q 150 300 300 310 T 600 310 L 600 350 L 0 350 Z"
          fill="#183C50"
          opacity="0.8"
        />

        {/* Boat on River */}
        <path d="M 380 320 Q 420 330 460 320 L 445 332 L 395 332 Z" fill="#D3542E" />
        <path d="M 420 320 L 420 295 M 420 295 L 435 310 H 420" stroke="#F4A261" strokeWidth="2" fill="#F4A261" />

        {/* Water Ripple Reflections */}
        <line x1="80" y1="325" x2="160" y2="325" stroke="#F4A261" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <line x1="220" y1="335" x2="320" y2="335" stroke="#F4A261" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <line x1="480" y1="330" x2="550" y2="330" stroke="#F4A261" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      </svg>
    </div>
  );
};
