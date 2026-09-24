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
  const baseStyles =
    'bg-[#3A1F25] text-[#F5EBDD] rounded-2xl p-5 sm:p-6 transition-all duration-300 border border-[#D6A24A]/20 relative shadow-[0_12px_32px_rgba(20,8,12,0.3)]';

  const variants = {
    default: 'hover:border-[#D6A24A]/40',
    flat: 'bg-[#321B22]/90 border-[#D6A24A]/15 shadow-none',
    elevated: 'shadow-[0_18px_45px_rgba(20,8,12,0.4)] border-[#D6A24A]/30 hover:border-[#D6A24A]/60',
    bordered: 'border-2 border-[#D6A24A]/40 bg-[#3A1F25]',
  };

  const hoverStyles = hoverEffect
    ? 'hover:-translate-y-1 hover:border-[#D6A24A]/70 hover:shadow-[0_20px_45px_rgba(0,0,0,0.45)] cursor-pointer'
    : '';
  const stitchStyles = kanthaStitch ? 'kantha-card-dark' : '';

  return (
    <div className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${stitchStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};
