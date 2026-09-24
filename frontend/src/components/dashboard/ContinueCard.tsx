import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface ContinueCardProps {
  quizTitle: string;
  category: string;
  currentQuestion: number;
  totalQuestions: number;
  quizId: number;
}

export const ContinueCard: React.FC<ContinueCardProps> = ({
  quizTitle,
  category,
  currentQuestion,
  totalQuestions,
  quizId,
}) => {
  const percentage = Math.round((currentQuestion / totalQuestions) * 100);

  return (
    <Card className="bg-[#3A1F25] border border-[#D6A24A]/30 relative overflow-hidden shadow-lg hover:border-[#D6A24A]/60 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#D6A24A]/15 text-[#D6A24A] flex items-center justify-center shrink-0 border border-[#D6A24A]/30 shadow-[0_0_20px_rgba(214,162,74,0.15)] mt-1">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <Badge variant="terracotta">{category}</Badge>
              <span className="text-xs text-[#D6A24A] font-semibold uppercase tracking-wider">In Progress</span>
            </div>
            <h4 className="font-serif text-xl font-bold text-[#F5EBDD]">{quizTitle}</h4>
            <div className="mt-3 flex items-center gap-3 max-w-xs">
              <div className="flex-1 bg-black/40 h-2.5 rounded-full border border-white/10 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#D3542E] to-[#D6A24A] h-full rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(214,162,74,0.5)]"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-xs font-extrabold text-[#D6A24A]">
                {percentage}% ({currentQuestion}/{totalQuestions})
              </span>
            </div>
          </div>
        </div>

        <Link to={`/quiz/${quizId}`}>
          <button
            className="
              px-5
              py-2.5
              rounded-xl
              text-xs
              font-bold
              flex
              items-center
              gap-2
              transition-all
              hover:-translate-y-0.5
              shadow-md
            "
            style={{
              backgroundColor: '#D6A24A',
              color: '#321B22',
            }}
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </Card>
  );
};
