import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface OptionCardProps {
  label: 'A' | 'B' | 'C' | 'D';
  text: string;
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  label,
  text,
  isSelected,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-[#D3542E] ${
        isSelected
          ? 'border-[#D3542E] bg-[#FDF1ED] shadow-sm'
          : 'border-[#E7DBCC] bg-[#FFFDF9] hover:border-[#D3542E]/40 hover:bg-[#FDF7ED]'
      } ${disabled ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div className="flex items-center gap-4 min-w-0">
        <div
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center shrink-0 transition-colors ${
            isSelected
              ? 'bg-[#D3542E] text-white shadow-sm'
              : 'bg-[#FDF7ED] text-[#0F2D3D] border border-[#E7DBCC]'
          }`}
        >
          {label}
        </div>
        <span
          className={`text-sm sm:text-base font-medium leading-snug ${
            isSelected ? 'text-[#0F2D3D] font-semibold' : 'text-[#1F2937]'
          }`}
        >
          {text}
        </span>
      </div>

      {isSelected && (
        <CheckCircle2 className="w-5 h-5 text-[#D3542E] shrink-0 animate-in fade-in zoom-in-75 duration-200" />
      )}
    </button>
  );
};
