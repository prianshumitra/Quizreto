import React from 'react';

interface QuizCoverImageProps {
  category?: string;
  className?: string;
}

export const QuizCoverImage: React.FC<QuizCoverImageProps> = ({
  category = 'History',
  className = 'h-40 w-full',
}) => {
  const cat = category.toLowerCase();

  if (cat.includes('history') || cat.includes('freedom')) {
    return (
      <div className={`relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#0F2D3D] via-[#183C50] to-[#D3542E]/80 ${className}`}>
        {/* Sun Glow */}
        <div className="absolute top-2 right-6 w-20 h-20 rounded-full bg-[#F4A261] opacity-60 blur-md" />

        {/* Tricolor & Monument Overlay */}
        <svg viewBox="0 0 400 180" fill="none" className="w-full h-full object-cover">
          {/* Indian Tricolor Wave Accent */}
          <path d="M 0 40 Q 100 20 200 45 T 400 30 L 400 0 L 0 0 Z" fill="#FF9933" opacity="0.3" />
          <path d="M 0 60 Q 100 40 200 65 T 400 50 L 400 30 L 0 30 Z" fill="#FFFFFF" opacity="0.2" />
          <path d="M 0 80 Q 100 60 200 85 T 400 70 L 400 50 L 0 50 Z" fill="#138808" opacity="0.3" />

          {/* Fort / Monument Silhouette */}
          <rect x="50" y="100" width="300" height="80" fill="#0F2D3D" opacity="0.9" rx="4" />
          <path d="M 100 100 Q 150 40 200 100 Z" fill="#D3542E" />
          <path d="M 200 100 Q 250 50 300 100 Z" fill="#0F2D3D" />
          <circle cx="200" cy="40" r="6" fill="#F4A261" />

          {/* Ashoka Chakra vector silhouette */}
          <circle cx="340" cy="45" r="16" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.5" strokeDasharray="2 2" />
        </svg>

        <span className="absolute bottom-3 left-3 bg-[#0F2D3D]/80 backdrop-blur-md text-white px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase border border-white/20">
          History & Heritage
        </span>
      </div>
    );
  }

  if (cat.includes('science')) {
    return (
      <div className={`relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#0B1D28] via-[#0F2D3D] to-[#183C50] ${className}`}>
        <svg viewBox="0 0 400 180" fill="none" className="w-full h-full object-cover">
          {/* Glowing Atom orbits */}
          <circle cx="200" cy="90" r="30" fill="#F4A261" opacity="0.8" />
          <ellipse cx="200" cy="90" rx="90" ry="30" stroke="#60A5FA" strokeWidth="2" strokeDasharray="6 4" opacity="0.7" transform="rotate(-30 200 90)" />
          <ellipse cx="200" cy="90" rx="90" ry="30" stroke="#F4A261" strokeWidth="2" strokeDasharray="6 4" opacity="0.7" transform="rotate(30 200 90)" />
          <ellipse cx="200" cy="90" rx="90" ry="30" stroke="#34D399" strokeWidth="2" opacity="0.5" transform="rotate(90 200 90)" />
          <circle cx="120" cy="65" r="5" fill="#60A5FA" />
          <circle cx="280" cy="115" r="5" fill="#F4A261" />
          <circle cx="200" cy="160" r="5" fill="#34D399" />
        </svg>
        <span className="absolute bottom-3 left-3 bg-[#0F2D3D]/80 backdrop-blur-md text-white px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase border border-white/20">
          General Science
        </span>
      </div>
    );
  }

  if (cat.includes('literature') || cat.includes('bengali')) {
    return (
      <div className={`relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#3B2314] via-[#5C3A21] to-[#D3542E] ${className}`}>
        <svg viewBox="0 0 400 180" fill="none" className="w-full h-full object-cover">
          {/* Stacked Vintage Books Illustration */}
          <rect x="110" y="110" width="180" height="30" rx="4" fill="#F4A261" />
          <rect x="120" y="85" width="160" height="25" rx="4" fill="#D3542E" />
          <rect x="135" y="60" width="130" height="25" rx="4" fill="#0F2D3D" />

          {/* Quill Feather */}
          <path d="M 270 40 Q 250 80 200 110" stroke="#FFFDF9" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          <path d="M 270 40 Q 285 55 260 70" fill="#F4A261" opacity="0.6" />
        </svg>
        <span className="absolute bottom-3 left-3 bg-[#0F2D3D]/80 backdrop-blur-md text-white px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase border border-white/20">
          Literature & Poetry
        </span>
      </div>
    );
  }

  if (cat.includes('tech') || cat.includes('code')) {
    return (
      <div className={`relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F2D3D] ${className}`}>
        <svg viewBox="0 0 400 180" fill="none" className="w-full h-full object-cover">
          {/* Laptop IDE screen */}
          <rect x="100" y="40" width="200" height="110" rx="8" fill="#020617" stroke="#334155" strokeWidth="3" />
          <path d="M 80 150 L 320 150 L 300 160 L 100 160 Z" fill="#475569" />

          {/* Code lines visual */}
          <text x="120" y="70" fill="#38BDF8" fontSize="12" fontFamily="monospace">&lt;Quizreto&gt;</text>
          <line x1="120" y1="85" x2="240" y2="85" stroke="#F4A261" strokeWidth="3" strokeLinecap="round" />
          <line x1="120" y1="100" x2="270" y2="100" stroke="#4ADE80" strokeWidth="3" strokeLinecap="round" />
          <line x1="120" y1="115" x2="200" y2="115" stroke="#E879F9" strokeWidth="3" strokeLinecap="round" />
          <text x="120" y="135" fill="#38BDF8" fontSize="12" fontFamily="monospace">&lt;/Code&gt;</text>
        </svg>
        <span className="absolute bottom-3 left-3 bg-[#0F2D3D]/80 backdrop-blur-md text-white px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase border border-white/20">
          Technology & Trivia
        </span>
      </div>
    );
  }

  if (cat.includes('polity') || cat.includes('constitution')) {
    return (
      <div className={`relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#1E293B] via-[#0F2D3D] to-[#D99A2B] ${className}`}>
        <svg viewBox="0 0 400 180" fill="none" className="w-full h-full object-cover">
          {/* Parliament House Dome */}
          <path d="M 120 160 L 120 110 Q 200 40 280 110 L 280 160 Z" fill="#0F2D3D" opacity="0.9" />
          <path d="M 160 110 Q 200 60 240 110 Z" fill="#F4A261" opacity="0.8" />
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i} x1={135 + i * 18} y1="120" x2={135 + i * 18} y2="160" stroke="#FFFDF9" strokeWidth="2.5" opacity="0.7" />
          ))}
          <circle cx="200" cy="50" r="10" fill="#D3542E" />
        </svg>
        <span className="absolute bottom-3 left-3 bg-[#0F2D3D]/80 backdrop-blur-md text-white px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase border border-white/20">
          Indian Constitution
        </span>
      </div>
    );
  }

  // Default / Geography / General
  return (
    <div className={`relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-[#0F2D3D] via-[#16A34A]/40 to-[#F4A261]/60 ${className}`}>
      <svg viewBox="0 0 400 180" fill="none" className="w-full h-full object-cover">
        {/* India Map outline representation */}
        <path
          d="M 200 30 L 230 60 L 250 100 L 220 150 L 180 140 L 150 90 L 170 50 Z"
          fill="#F4A261"
          opacity="0.5"
          stroke="#FFFDF9"
          strokeWidth="2"
        />
        <circle cx="200" cy="90" r="6" fill="#D3542E" />
        <circle cx="200" cy="90" r="14" stroke="#D3542E" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>
      <span className="absolute bottom-3 left-3 bg-[#0F2D3D]/80 backdrop-blur-md text-white px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase border border-white/20">
        Geography & World
      </span>
    </div>
  );
};
