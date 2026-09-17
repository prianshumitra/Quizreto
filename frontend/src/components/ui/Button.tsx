import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-xl active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 shadow-sm';

  const variants = {
    primary: 'bg-[#D3542E] hover:bg-[#B84320] text-white focus:ring-[#D3542E] shadow-[#D3542E]/20',
    secondary: 'bg-[#0F2D3D] hover:bg-[#183C50] text-white focus:ring-[#0F2D3D] shadow-[#0F2D3D]/20',
    outline: 'border-2 border-[#D3542E] text-[#D3542E] hover:bg-[#D3542E] hover:text-white focus:ring-[#D3542E]',
    ghost: 'bg-transparent text-[#0F2D3D] hover:bg-[#E7DBCC]/40 focus:ring-[#0F2D3D] shadow-none',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs font-semibold gap-1.5',
    md: 'px-5 py-2.5 text-sm font-semibold gap-2',
    lg: 'px-7 py-3.5 text-base font-bold gap-2.5',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      <span>{children}</span>
    </button>
  );
};
