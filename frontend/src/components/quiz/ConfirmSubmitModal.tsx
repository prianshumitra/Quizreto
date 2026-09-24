import React from 'react';
import { AlertCircle, HelpCircle } from 'lucide-react';

interface ConfirmSubmitModalProps {
  isOpen: boolean;
  answeredCount: number;
  totalQuestions: number;
  isSubmitting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmSubmitModal: React.FC<ConfirmSubmitModalProps> = ({
  isOpen,
  answeredCount,
  totalQuestions,
  isSubmitting,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#3A1F25] border border-[#D6A24A]/30 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#D6A24A]/15 text-[#D6A24A] flex items-center justify-center shrink-0 border border-[#D6A24A]/30">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-[#F5EBDD]">Submit Quiz?</h3>
            <p className="text-xs text-[#F5EBDD]/75">Review your attempt status before final submission.</p>
          </div>
        </div>

        <div className="bg-[#321B22] p-4 rounded-2xl border border-[#D6A24A]/20 space-y-3 text-sm">
          <div className="flex justify-between font-medium">
            <span className="text-[#F5EBDD]">Answered Questions:</span>
            <span className="font-bold text-[#D6A24A]">{answeredCount} / {totalQuestions}</span>
          </div>
          {unansweredCount > 0 && (
            <div className="flex justify-between items-center text-[#D6A24A] bg-[#D6A24A]/10 p-2.5 rounded-xl border border-[#D6A24A]/30 text-xs">
              <span className="flex items-center gap-1.5 font-semibold">
                <AlertCircle className="w-4 h-4 text-[#D6A24A]" />
                {unansweredCount} question(s) left unanswered!
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-xl text-xs font-bold text-[#F5EBDD]/70 hover:text-white transition-colors"
          >
            Continue Answering
          </button>
          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all hover:-translate-y-0.5 disabled:opacity-50"
            style={{ backgroundColor: '#D6A24A', color: '#321B22' }}
          >
            {isSubmitting ? 'Submitting...' : 'Yes, Submit Now'}
          </button>
        </div>
      </div>
    </div>
  );
};
