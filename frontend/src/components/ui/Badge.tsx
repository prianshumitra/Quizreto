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
    terracotta: 'bg-[#FDF1ED] text-[#D3542E] border-[#D3542E]/20',
    navy: 'bg-[#0F2D3D]/10 text-[#0F2D3D] border-[#0F2D3D]/20',
    saffron: 'bg-[#FEF3E7] text-[#D97706] border-[#F4A261]/30',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    gold: 'bg-amber-50 text-amber-700 border-amber-200',
    gray: 'bg-gray-100 text-gray-700 border-gray-200',
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
