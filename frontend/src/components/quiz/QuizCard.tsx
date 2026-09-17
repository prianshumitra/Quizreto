import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Star, ArrowRight, User } from 'lucide-react';
import type { QuizResponse } from '../../types/api';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { QuizCoverImage } from '../ui/QuizCoverImage';

interface QuizCardProps {
  quiz: QuizResponse;
  questionCount?: number;
  rating?: number;
  category?: string;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  quiz,
  questionCount = 10,
  rating = 4.8,
  category = 'History',
}) => {
  return (
    <div className="bg-[#FFFDF9] rounded-2xl border border-[#E7DBCC] shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-[#D3542E]/50 hover:shadow-md flex flex-col justify-between overflow-hidden group">
      {/* Top Cover Graphic Image */}
      <QuizCoverImage category={category || quiz.title} className="h-40 w-full" />

      {/* Card Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <Badge variant="saffron">{category}</Badge>
            <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{rating}</span>
            </div>
          </div>

          <h3 className="font-serif text-lg font-bold text-[#0F2D3D] group-hover:text-[#D3542E] transition-colors line-clamp-1 mb-1.5">
            {quiz.title}
          </h3>

          <p className="text-xs text-[#1F2937]/70 line-clamp-2 leading-relaxed">
            {quiz.description || 'Challenge your knowledge with this carefully curated assessment.'}
          </p>
        </div>

        <div className="pt-3 border-t border-[#E7DBCC]/60 space-y-3">
          <div className="flex items-center justify-between text-xs text-[#0F2D3D]/70 font-medium">
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#D3542E]" />
              {questionCount} Questions
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#0F2D3D]/50" />
              Quizreto
            </span>
          </div>

          <Link to={`/quiz/${quiz.id}`} className="block">
            <Button variant="primary" size="sm" className="w-full justify-between group-hover:bg-[#B84320]">
              <span>Take Quiz</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
