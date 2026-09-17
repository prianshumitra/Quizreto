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
    terracotta: 'bg-emerald-50 text-[#16A34A] border-emerald-200',
    navy: 'bg-amber-50 text-[#D99A2B] border-amber-200',
    saffron: 'bg-sky-50 text-sky-600 border-sky-200',
    gold: 'bg-rose-50 text-[#D3542E] border-rose-200',
    green: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  };

  return (
    <Card className="flex items-center gap-4 transition-transform hover:-translate-y-0.5">
      <div
        className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${iconBgMap[accentColor]} shadow-xs`}
      >
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#0F2D3D]/60 truncate">
          {title}
        </p>
        <h4 className="font-serif text-2xl font-bold text-[#0F2D3D] tracking-tight">{value}</h4>
        {subtitle && <p className="text-[11px] font-medium text-[#16A34A] mt-0.5">{subtitle}</p>}
      </div>
    </Card>
  );
};
