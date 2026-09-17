import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-[#0F2D3D]">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && <div className="absolute left-3.5 text-[#0F2D3D]/50 pointer-events-none">{icon}</div>}
        <input
          id={inputId}
          className={`w-full bg-[#FFFDF9] border border-[#E7DBCC] text-[#1F2937] placeholder-[#1F2937]/40 text-sm rounded-xl py-3 ${
            icon ? 'pl-10' : 'pl-4'
          } pr-4 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#D3542E] focus:border-transparent ${
            error ? 'border-red-500 focus:ring-red-500' : ''
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-600 font-medium mt-1">{error}</p>}
    </div>
  );
};
