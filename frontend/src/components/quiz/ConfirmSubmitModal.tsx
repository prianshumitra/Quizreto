import React from 'react';
import { AlertCircle, HelpCircle } from 'lucide-react';
import { Button } from '../ui/Button';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FFFDF9] border border-[#E7DBCC] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FDF1ED] text-[#D3542E] flex items-center justify-center shrink-0 border border-[#D3542E]/20">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-bold text-[#0F2D3D]">Submit Quiz?</h3>
            <p className="text-xs text-[#1F2937]/70">Review your attempt status before final submission.</p>
          </div>
        </div>

        <div className="bg-[#FDF7ED] p-4 rounded-2xl border border-[#E7DBCC] space-y-2 text-sm">
          <div className="flex justify-between font-medium">
            <span className="text-[#0F2D3D]">Answered Questions:</span>
            <span className="font-bold text-[#16A34A]">{answeredCount} / {totalQuestions}</span>
          </div>
          {unansweredCount > 0 && (
            <div className="flex justify-between items-center text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-xs">
              <span className="flex items-center gap-1.5 font-semibold">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                {unansweredCount} question(s) left unanswered!
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="ghost" onClick={onCancel} disabled={isSubmitting}>
            Continue Answering
          </Button>
          <Button variant="primary" onClick={onConfirm} isLoading={isSubmitting}>
            Yes, Submit Now
          </Button>
        </div>
      </div>
    </div>
  );
};
