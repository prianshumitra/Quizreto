import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'flat' | 'elevated' | 'bordered';
  hoverEffect?: boolean;
  kanthaStitch?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  hoverEffect = false,
  kanthaStitch = true,
  className = '',
  ...props
}) => {
  const baseStyles = 'bg-[#FFFDF9] rounded-2xl p-5 sm:p-6 transition-all duration-200 border-2 border-dashed border-[#E7DBCC] relative';

  const variants = {
    default: 'shadow-xs',
    flat: 'bg-[#FDF7ED]/90 shadow-none border-dashed',
    elevated: 'shadow-md hover:shadow-lg',
    bordered: 'border-2 border-dashed border-[#D3542E]/30 shadow-none',
  };

  const hoverStyles = hoverEffect ? 'hover:-translate-y-1 hover:border-[#D3542E]/60 hover:shadow-md cursor-pointer' : '';
  const stitchStyles = kanthaStitch ? 'kantha-card' : '';

  return (
    <div className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${stitchStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};
