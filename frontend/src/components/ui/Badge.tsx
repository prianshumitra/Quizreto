import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'terracotta' | 'navy' | 'saffron' | 'green' | 'gold' | 'gray';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'terracotta',
  size = 'sm',
  className = '',
}) => {
  const variants = {
    terracotta: 'bg-[#D3542E]/20 text-[#D6A24A] border-[#D6A24A]/40 shadow-[0_0_10px_rgba(214,162,74,0.15)]',
    navy: 'bg-[#D6A24A]/15 text-[#D6A24A] border-[#D6A24A]/30 shadow-[0_0_10px_rgba(214,162,74,0.15)]',
    saffron: 'bg-amber-500/20 text-[#D6A24A] border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.15)]',
    green: 'bg-emerald-500/20 text-[#F5EBDD] border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.15)]',
    gold: 'bg-amber-400/20 text-[#D6A24A] border-amber-400/30 shadow-[0_0_10px_rgba(251,191,36,0.15)]',
    gray: 'bg-white/10 text-white border-white/20',
  };

  const sizes = {
    sm: 'px-2.5 py-0.5 text-xs font-semibold',
    md: 'px-3 py-1 text-xs font-bold',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
};
