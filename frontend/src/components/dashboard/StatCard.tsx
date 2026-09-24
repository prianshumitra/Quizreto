import React from 'react';
import { Card } from '../ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  accentColor?: 'terracotta' | 'navy' | 'saffron' | 'gold' | 'green';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  accentColor = 'terracotta',
}) => {
  const iconBgMap = {
    terracotta: 'bg-[#D6A24A]/15 text-[#D6A24A] border-[#D6A24A]/30 shadow-[0_0_15px_rgba(214,162,74,0.15)]',
    navy: 'bg-[#D6A24A]/15 text-[#D6A24A] border-[#D6A24A]/30 shadow-[0_0_15px_rgba(214,162,74,0.15)]',
    saffron: 'bg-amber-500/15 text-[#D6A24A] border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]',
    gold: 'bg-amber-400/15 text-[#D6A24A] border-amber-400/30 shadow-[0_0_15px_rgba(251,191,36,0.15)]',
    green: 'bg-emerald-500/15 text-[#F5EBDD] border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]',
  };

  const subtitleColorMap = {
    terracotta: 'text-[#F5EBDD]',
    navy: 'text-[#D6A24A]',
    saffron: 'text-[#F5EBDD]',
    gold: 'text-[#D6A24A]',
    green: 'text-[#F5EBDD]',
  };

  return (
    <Card className="flex items-center gap-3.5 p-4 transition-all hover:-translate-y-1 hover:border-[#D6A24A]/50 hover:shadow-[0_15px_35px_rgba(0,0,0,0.35)]">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${iconBgMap[accentColor]}`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[9px] font-bold uppercase tracking-widest text-[#D6A24A] truncate">
          {title}
        </p>
        <h4 className="font-serif text-xl font-extrabold text-[#F5EBDD] tracking-tight mt-0.5">{value}</h4>
        {subtitle && (
          <p className={`text-[11px] font-semibold ${subtitleColorMap[accentColor]} mt-0.5 truncate`}>
            {subtitle}
          </p>
        )}
      </div>
    </Card>
  );
};
