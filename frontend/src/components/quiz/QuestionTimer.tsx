import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface QuestionTimerProps {
  initialSeconds?: number;
  onTimeExpired?: () => void;
}

export const QuestionTimer: React.FC<QuestionTimerProps> = ({
  initialSeconds = 1800, // 30 mins default
  onTimeExpired,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (onTimeExpired) onTimeExpired();
      return;
    }
    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsLeft, onTimeExpired]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const isLow = secondsLeft < 300; // < 5 mins

  return (
    <div
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors ${
        isLow
          ? 'bg-red-50 text-red-700 border-red-200 animate-pulse'
          : 'bg-[#FDF1ED] text-[#D3542E] border-[#D3542E]/20'
      }`}
    >
      <Clock className="w-3.5 h-3.5" />
      <span>{formattedTime}</span>
    </div>
  );
};
