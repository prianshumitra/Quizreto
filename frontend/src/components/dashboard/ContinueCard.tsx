import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

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
    <Card className="bg-[#FFFDF9] border border-[#E7DBCC] relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#FDF1ED] text-[#D3542E] flex items-center justify-center shrink-0 border border-[#D3542E]/20 mt-1">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="terracotta">{category}</Badge>
              <span className="text-xs text-[#0F2D3D]/60 font-medium">In Progress</span>
            </div>
            <h4 className="font-serif text-lg font-bold text-[#0F2D3D]">{quizTitle}</h4>
            <div className="mt-3 flex items-center gap-3 max-w-xs">
              <div className="flex-1 bg-[#E7DBCC]/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#D3542E] h-full rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-xs font-bold text-[#D3542E]">
                {percentage}% ({currentQuestion}/{totalQuestions})
              </span>
            </div>
          </div>
        </div>

        <Link to={`/quiz/${quizId}`}>
          <Button variant="primary" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
            Continue
          </Button>
        </Link>
      </div>
    </Card>
  );
};
