import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, LayoutDashboard, Compass, AlertCircle } from 'lucide-react';
import { getAttempt } from '../api/attempts';
import { getQuiz } from '../api/quizzes';
import type { AttemptResponse, QuizResponse } from '../types/api';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';
import { MandalaPattern } from '../components/ui/MandalaPattern';

export const Result: React.FC = () => {
  const { attemptId } = useParams<{ attemptId: string }>();
  const navigate = useNavigate();

  const [attempt, setAttempt] = useState<AttemptResponse | null>(null);
  const [quiz, setQuiz] = useState<QuizResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      if (!attemptId) return;
      setIsLoading(true);
      try {
        const id = parseInt(attemptId, 10);
        const attemptData = await getAttempt(id);
        setAttempt(attemptData);

        const quizData = await getQuiz(attemptData.quiz_id).catch(() => null);
        setQuiz(quizData);

        if (attemptData.percentage >= 60) {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#D3542E', '#F4A261', '#0F2D3D', '#16A34A', '#D99A2B'],
          });
        }
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult();
  }, [attemptId]);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto py-12 space-y-6 text-center">
        <Skeleton className="h-16 w-16 rounded-full mx-auto" />
        <Skeleton className="h-8 w-1/2 mx-auto" />
        <Skeleton className="h-32 w-full rounded-3xl" />
      </div>
    );
  }

  if (error || !attempt) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <AlertCircle className="w-12 h-12 text-red-600 mx-auto" />
        <h2 className="font-serif text-2xl font-bold text-[#0F2D3D]">Result Not Found</h2>
        <p className="text-xs text-red-700 font-medium">{error || 'Unable to retrieve attempt details.'}</p>
        <Button variant="primary" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const isSuccess = attempt.percentage >= 60;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left Side Calligraphic Script Annotations */}
        <div className="hidden lg:flex lg:col-span-3 flex-col items-center text-center p-6 bg-[#FDF7ED] rounded-3xl border border-[#E7DBCC] space-y-6">
          <span className="font-handwriting text-3xl text-[#F4A261] rotate-[-6deg] block">
            Small<br />
            Steps<br />
            Big<br />
            Knowledge
          </span>

          <svg viewBox="0 0 120 160" fill="none" className="w-full text-[#D3542E] opacity-20">
            <path d="M 20 140 L 20 90 Q 60 40 100 90 L 100 140 Z" stroke="currentColor" strokeWidth="2" />
            <circle cx="60" cy="30" r="8" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        {/* Center Main Result Card */}
        <div className="lg:col-span-9 bg-[#FFFDF9] p-8 sm:p-12 rounded-3xl border border-[#E7DBCC] text-center space-y-6 shadow-md relative overflow-hidden">
          <MandalaPattern className="absolute -top-10 -right-10 w-80 h-80 text-[#D3542E] opacity-15" />
          <MandalaPattern className="absolute -bottom-10 -left-10 w-80 h-80 text-[#0F2D3D] opacity-10" />

          {/* Golden Trophy Icon Header */}
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#FDF1ED] to-[#FEF3E7] text-[#D3542E] flex items-center justify-center mx-auto border-2 border-[#D3542E]/20 shadow-md">
            <Trophy className="w-10 h-10 fill-[#F4A261] text-[#D3542E]" />
          </div>

          <div className="space-y-2 relative z-10">
            <Badge variant={isSuccess ? 'green' : 'saffron'} size="md" className="uppercase tracking-wider">
              {isSuccess ? 'Great Job!' : 'Keep Learning!'}
            </Badge>
            <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#0F2D3D]">
              Quiz Completed!
            </h1>
            <p className="text-sm text-[#1F2937]/70 font-medium">
              {quiz?.title || `Quiz Assessment #${attempt.quiz_id}`}
            </p>
          </div>

          {/* 3 Metric Boxes (Correct Answers, Score %, Time Taken) */}
          <div className="grid grid-cols-3 gap-4 pt-4 relative z-10">
            <div className="bg-[#FDF7ED] p-4 sm:p-6 rounded-2xl border border-[#E7DBCC]">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#0F2D3D]/60 mb-1">
                Correct Answers
              </p>
              <p className="font-serif text-2xl sm:text-4xl font-extrabold text-[#D3542E]">
                {attempt.score} <span className="text-sm font-normal text-[#0F2D3D]/60">/ {attempt.total_questions}</span>
              </p>
            </div>

            <div className="bg-[#FDF7ED] p-4 sm:p-6 rounded-2xl border border-[#E7DBCC]">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#0F2D3D]/60 mb-1">
                Score
              </p>
              <p className="font-serif text-2xl sm:text-4xl font-extrabold text-[#0F2D3D]">
                {attempt.percentage}%
              </p>
            </div>

            <div className="bg-[#FDF7ED] p-4 sm:p-6 rounded-2xl border border-[#E7DBCC]">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#0F2D3D]/60 mb-1">
                Time Taken
              </p>
              <p className="font-serif text-xl sm:text-2xl font-bold text-[#16A34A] mt-1">
                00:12:34
              </p>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link to={`/quiz/${attempt.quiz_id}`}>
              <Button variant="outline" size="md" icon={<RotateCcw className="w-4 h-4" />}>
                View Answers / Retry
              </Button>
            </Link>
            <Link to="/explore">
              <Button variant="secondary" size="md" icon={<Compass className="w-4 h-4" />}>
                Try Another Quiz
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="primary" size="md" icon={<LayoutDashboard className="w-4 h-4" />}>
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
