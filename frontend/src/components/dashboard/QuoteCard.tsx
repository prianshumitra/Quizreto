import React from 'react';
import { Card } from '../ui/Card';

export const QuoteCard: React.FC = () => {
  return (
    <Card className="bg-gradient-to-br from-[#FFFDF9] via-[#FDF7ED] to-[#FEF3E7] border border-[#E7DBCC] relative overflow-hidden flex flex-col justify-between p-6 sm:p-7 shadow-xs">
      <div className="flex items-start justify-between gap-4">
        {/* Quote Copy */}
        <div className="space-y-3 flex-1 z-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#D3542E] bg-[#FDF1ED] px-3 py-1 rounded-full border border-[#D3542E]/20 inline-block">
            Wisdom of India
          </span>

          <h3 className="font-serif italic text-xl sm:text-2xl font-bold text-[#0F2D3D] leading-snug pt-1">
            "Knowledge is<br />
            the true freedom."
          </h3>

          <p className="text-xs font-handwriting text-lg text-[#D3542E]">
            — Rabindranath Tagore
          </p>
        </div>

        {/* Rabindranath Tagore Portrait Line Art Vector */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#FDF7ED] border border-[#E7DBCC] p-1 shrink-0 overflow-hidden shadow-xs flex items-center justify-center relative">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#0F2D3D]">
            {/* Soft parchment background */}
            <rect width="100" height="100" fill="#FEF3E7" rx="8" />

            {/* Hair & Long Iconic Beard Silhouette */}
            <path d="M 30 45 Q 25 20 50 20 Q 75 20 70 45 Q 75 70 75 95 L 25 95 Q 25 70 30 45 Z" fill="#D99A2B" opacity="0.15" />
            <path d="M 32 40 Q 28 22 50 22 Q 72 22 68 40 Q 72 65 70 95 L 30 95 Q 28 65 32 40 Z" stroke="#0F2D3D" strokeWidth="1.5" fill="none" />

            {/* Long Flowing Beard lines */}
            {Array.from({ length: 9 }).map((_, i) => (
              <path key={i} d={`M ${35 + i * 4} 55 Q ${30 + i * 5} 75 ${35 + i * 4} 95`} stroke="#0F2D3D" strokeWidth="1" opacity="0.6" />
            ))}

            {/* Eyes & Brows */}
            <path d="M 40 40 Q 44 37 48 40" stroke="#0F2D3D" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 52 40 Q 56 37 60 40" stroke="#0F2D3D" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="44" cy="42" r="1.5" fill="#0F2D3D" />
            <circle cx="56" cy="42" r="1.5" fill="#0F2D3D" />

            {/* Nose & Mustache */}
            <path d="M 50 42 L 50 50 L 48 51" stroke="#0F2D3D" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 42 53 Q 50 50 58 53" stroke="#0F2D3D" strokeWidth="1.5" />

            {/* Robe Shawl */}
            <path d="M 20 95 Q 50 80 80 95" stroke="#D3542E" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-[#E7DBCC]/60 text-[11px] text-[#0F2D3D]/60 flex items-center justify-between">
        <span>Nobel Laureate in Literature</span>
        <span>Kolkata, India</span>
      </div>
    </Card>
  );
};
