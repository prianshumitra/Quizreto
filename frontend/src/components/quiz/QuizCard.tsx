import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Star, ArrowRight, User } from 'lucide-react';
import type { QuizResponse } from '../../types/api';
import { Badge } from '../ui/Badge';
import { QuizCoverImage } from '../ui/QuizCoverImage';

interface QuizCardProps {
  quiz: QuizResponse;
  questionCount?: number;
  rating?: number;
  category?: string;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  quiz,
  questionCount,
  rating = 4.8,
  category,
}) => {
  // Use real question count from backend if available
  const actualQuestionCount =
    questionCount ?? quiz.question_count ?? quiz.questions_count ?? 5;

  // Detect category from tags like [Science] in description or title keywords
  const displayCategory = React.useMemo(() => {
    if (category && category !== 'History' && category !== 'General Knowledge') {
      return category;
    }
    const desc = quiz.description || '';
    const match = desc.match(/\[(.*?)\]/);
    if (match) {
      return match[1];
    }
    if (/polity|constitution|history|republic/i.test(quiz.title + desc)) return 'History';
    if (/science|astronomy|physics|biology|chemistry/i.test(quiz.title + desc)) return 'Science';
    if (/tech|computer|algorithm|web|code/i.test(quiz.title + desc)) return 'Technology';
    if (/geography|continent|river|lake|mountain/i.test(quiz.title + desc)) return 'Geography';
    if (/literature|classic|author|novel|poet/i.test(quiz.title + desc)) return 'Literature';
    return category || 'General Knowledge';
  }, [quiz, category]);

  return (
    <div className="bg-[#3A1F25] rounded-2xl border border-[#D6A24A]/25 shadow-[0_12px_32px_rgba(20,8,12,0.3)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#D6A24A]/60 hover:shadow-[0_20px_45px_rgba(0,0,0,0.4)] flex flex-col justify-between overflow-hidden group">
      {/* Top Cover Graphic Image */}
      <QuizCoverImage category={displayCategory} className="h-36 w-full" />

      {/* Card Body Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <Badge variant="saffron">{displayCategory}</Badge>
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#D6A24A] bg-[#D6A24A]/15 px-2 py-0.5 rounded-full border border-[#D6A24A]/30 shadow-[0_0_10px_rgba(214,162,74,0.15)]">
              <Star className="w-3 h-3 fill-[#D6A24A] text-[#D6A24A]" />
              <span>{rating}</span>
            </div>
          </div>

          <h3 className="font-serif text-base font-bold text-[#F5EBDD] group-hover:text-[#D6A24A] transition-colors line-clamp-1 mb-1">
            {quiz.title}
          </h3>

          <p className="text-[11px] text-[#F5EBDD]/70 line-clamp-2 leading-relaxed">
            {quiz.description || 'Challenge your knowledge with this carefully curated assessment.'}
          </p>
        </div>

        <div className="pt-2.5 border-t border-[#F5EBDD]/10 space-y-2.5">
          <div className="flex items-center justify-between text-[11px] text-[#F5EBDD]/70 font-medium">
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-[#D6A24A]" />
              {actualQuestionCount} {actualQuestionCount === 1 ? 'Question' : 'Questions'}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-[#F5EBDD]/50" />
              Quizreto
            </span>
          </div>

          <Link to={`/quiz/${quiz.id}`} className="block">
            <button
              className="
                w-full
                py-2
                px-3.5
                rounded-xl
                text-xs
                font-bold
                flex
                items-center
                justify-between
                transition-all
                duration-200
                shadow-md
                group-hover:shadow-[0_0_15px_rgba(214,162,74,0.3)]
              "
              style={{
                backgroundColor: '#D6A24A',
                color: '#321B22',
              }}
            >
              <span>Take Quiz</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
