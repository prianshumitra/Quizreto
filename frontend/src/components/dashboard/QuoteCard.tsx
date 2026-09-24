import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';

const QUOTES = [
  {
    quote: "Knowledge is the true freedom.",
    author: "Rabindranath Tagore",
    role: "Nobel Laureate in Literature",
    location: "Kolkata, India",
  },
  {
    quote: "Arise, awake, and stop not till the goal is reached.",
    author: "Swami Vivekananda",
    role: "Philosopher & Teacher",
    location: "Kolkata, India",
  },
  {
    quote: "Excellence is a continuous process and not an accident.",
    author: "A. P. J. Abdul Kalam",
    role: "Aerospace Scientist & President",
    location: "Rameswaram, India",
  },
  {
    quote: "A country's greatness lies in its undying ideals of love and sacrifice.",
    author: "Sarojini Naidu",
    role: "Poet & Freedom Fighter",
    location: "Hyderabad, India",
  },
];

export const QuoteCard: React.FC = () => {
  const [currentQuote, setCurrentQuote] = useState(QUOTES[0]);

  useEffect(() => {
    // Dynamic quote index based on day of year
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    setCurrentQuote(QUOTES[dayOfYear % QUOTES.length]);
  }, []);

  return (
    <Card className="bg-gradient-to-br from-[#3A1F25] via-[#45242C] to-[#2B161B] border border-[#D6A24A]/30 relative overflow-hidden flex flex-col justify-between p-6 sm:p-7 shadow-[0_12px_32px_rgba(20,8,12,0.35)] h-full">
      <div className="flex items-start justify-between gap-4">
        {/* Quote Copy */}
        <div className="space-y-3 flex-1 z-10">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#D6A24A] bg-[#D6A24A]/10 px-3 py-1 rounded-full border border-[#D6A24A]/30 inline-block">
            Wisdom & Inspiration
          </span>

          <h3 className="font-serif italic text-lg sm:text-xl font-bold text-[#F5EBDD] leading-snug pt-1">
            "{currentQuote.quote}"
          </h3>

          <p className="text-lg font-handwriting text-[#D6A24A]">
            — {currentQuote.author}
          </p>
        </div>

        {/* Rabindranath Tagore Portrait Line Art Vector */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#2A161B] border border-[#D6A24A]/30 p-1 shrink-0 overflow-hidden shadow-md flex items-center justify-center relative">
          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#F5EBDD]">
            {/* Soft dark background */}
            <rect width="100" height="100" fill="#321B22" rx="8" />

            {/* Hair & Long Iconic Beard Silhouette */}
            <path d="M 30 45 Q 25 20 50 20 Q 75 20 70 45 Q 75 70 75 95 L 25 95 Q 25 70 30 45 Z" fill="#D6A24A" opacity="0.2" />
            <path d="M 32 40 Q 28 22 50 22 Q 72 22 68 40 Q 72 65 70 95 L 30 95 Q 28 65 32 40 Z" stroke="#F5EBDD" strokeWidth="1.5" fill="none" />

            {/* Long Flowing Beard lines */}
            {Array.from({ length: 9 }).map((_, i) => (
              <path key={i} d={`M ${35 + i * 4} 55 Q ${30 + i * 5} 75 ${35 + i * 4} 95`} stroke="#F5EBDD" strokeWidth="1" opacity="0.6" />
            ))}

            {/* Eyes & Brows */}
            <path d="M 40 40 Q 44 37 48 40" stroke="#F5EBDD" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M 52 40 Q 56 37 60 40" stroke="#F5EBDD" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="44" cy="42" r="1.5" fill="#D6A24A" />
            <circle cx="56" cy="42" r="1.5" fill="#D6A24A" />

            {/* Nose & Mustache */}
            <path d="M 50 42 L 50 50 L 48 51" stroke="#F5EBDD" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M 42 53 Q 50 50 58 53" stroke="#F5EBDD" strokeWidth="1.5" />

            {/* Robe Shawl */}
            <path d="M 20 95 Q 50 80 80 95" stroke="#D6A24A" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>

      <div className="pt-3 mt-3 border-t border-[#F5EBDD]/10 text-[10px] text-[#F5EBDD]/60 flex items-center justify-between">
        <span>{currentQuote.role}</span>
        <span className="text-[#D6A24A]">{currentQuote.location}</span>
      </div>
    </Card>
  );
};
