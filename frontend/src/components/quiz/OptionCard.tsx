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
      className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-[#D6A24A] ${
        isSelected
          ? 'border-[#D6A24A] bg-[#D6A24A]/15 shadow-[0_0_20px_rgba(214,162,74,0.2)]'
          : 'border-[#D6A24A]/20 bg-[#3A1F25] hover:border-[#D6A24A]/50 hover:bg-[#43232A]'
      } ${disabled ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div className="flex items-center gap-4 min-w-0">
        <div
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-bold text-sm sm:text-base flex items-center justify-center shrink-0 transition-colors ${
            isSelected
              ? 'bg-[#D6A24A] text-[#321B22] shadow-sm font-extrabold'
              : 'bg-[#2A161B] text-[#D6A24A] border border-[#D6A24A]/30'
          }`}
        >
          {label}
        </div>
        <span
          className={`text-sm sm:text-base font-medium leading-snug ${
            isSelected ? 'text-[#F5EBDD] font-bold' : 'text-[#F5EBDD]/85'
          }`}
        >
          {text}
        </span>
      </div>

      {isSelected && (
        <CheckCircle2 className="w-5 h-5 text-[#D6A24A] shrink-0 animate-in fade-in zoom-in-75 duration-200" />
      )}
    </button>
  );
};
