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
        <label htmlFor={inputId} className="block text-[10px] font-bold uppercase tracking-wider text-[#D6A24A]">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && <div className="absolute left-3.5 text-[#D6A24A] pointer-events-none">{icon}</div>}
        <input
          id={inputId}
          className={`w-full bg-[#321B22] border border-[#D6A24A]/25 text-[#F5EBDD] placeholder-[#F5EBDD]/40 text-sm rounded-xl py-3 ${
            icon ? 'pl-10' : 'pl-4'
          } pr-4 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#D6A24A] focus:border-transparent ${
            error ? 'border-red-500 focus:ring-red-500' : ''
          } ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-600 font-medium mt-1">{error}</p>}
    </div>
  );
};
