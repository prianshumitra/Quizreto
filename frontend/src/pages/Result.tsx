import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();

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
        <AlertCircle className="w-12 h-12 text-[#D6A24A] mx-auto" />
        <h2 className="font-serif text-2xl font-bold text-[#F5EBDD]">Result Not Found</h2>
        <p className="text-xs text-[#D6A24A] font-medium">{error || 'Unable to retrieve attempt details.'}</p>
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
        <div className="hidden lg:flex lg:col-span-3 flex-col items-center text-center p-6 bg-[#3A1F25] rounded-3xl border border-[#D6A24A]/25 space-y-6 shadow-md">
          <span className="font-handwriting text-3xl text-[#D6A24A] rotate-[-6deg] block">
            Small<br />
            Steps<br />
            Big<br />
            Knowledge
          </span>

          <svg viewBox="0 0 120 160" fill="none" className="w-full text-[#D6A24A] opacity-30">
            <path d="M 20 140 L 20 90 Q 60 40 100 90 L 100 140 Z" stroke="currentColor" strokeWidth="2" />
            <circle cx="60" cy="30" r="8" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        {/* Center Main Result Card */}
        <div className="lg:col-span-9 bg-[#3A1F25] p-6 sm:p-9 rounded-3xl border border-[#D6A24A]/30 text-center space-y-5 shadow-[0_15px_40px_rgba(20,8,12,0.4)] relative overflow-hidden">
          <MandalaPattern className="absolute -top-10 -right-10 w-80 h-80 text-[#D6A24A] opacity-10" />
          <MandalaPattern className="absolute -bottom-10 -left-10 w-80 h-80 text-[#D6A24A] opacity-10" />

          {/* Golden Trophy Icon Header */}
          <div className="w-16 h-16 rounded-2xl bg-[#D6A24A]/15 text-[#D6A24A] flex items-center justify-center mx-auto border-2 border-[#D6A24A]/40 shadow-[0_0_25px_rgba(214,162,74,0.25)]">
            <Trophy className="w-8 h-8 fill-[#D6A24A] text-[#D6A24A]" />
          </div>

          <div className="space-y-1.5 relative z-10">
            <Badge variant={isSuccess ? 'green' : 'saffron'} size="md" className="uppercase tracking-wider">
              {isSuccess ? 'Great Job!' : 'Keep Learning!'}
            </Badge>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#F5EBDD]">
              Quiz Completed!
            </h1>
            <p className="text-xs sm:text-sm text-[#F5EBDD]/70 font-medium">
              {quiz?.title || `Quiz Assessment #${attempt.quiz_id}`}
            </p>
          </div>

          {/* 3 Metric Boxes (Correct Answers, Score %, Time Taken) */}
          <div className="grid grid-cols-3 gap-3.5 pt-3 relative z-10">
            <div className="bg-[#321B22] p-3.5 sm:p-5 rounded-2xl border border-[#D6A24A]/20">
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#D6A24A] mb-1">
                Correct Answers
              </p>
              <p className="font-serif text-xl sm:text-3xl font-extrabold text-[#D6A24A]">
                {attempt.score} <span className="text-xs font-normal text-[#F5EBDD]/70">/ {attempt.total_questions}</span>
              </p>
            </div>

            <div className="bg-[#321B22] p-3.5 sm:p-5 rounded-2xl border border-[#D6A24A]/20">
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#D6A24A] mb-1">
                Score
              </p>
              <p className="font-serif text-xl sm:text-3xl font-extrabold text-[#F5EBDD]">
                {attempt.percentage}%
              </p>
            </div>

            <div className="bg-[#321B22] p-3.5 sm:p-5 rounded-2xl border border-[#D6A24A]/20">
              <p className="text-[9px] font-bold uppercase tracking-wider text-[#D6A24A] mb-1">
                Time Taken
              </p>
              <p className="font-serif text-lg sm:text-xl font-bold text-[#D6A24A] mt-0.5">
                {location.state?.timeTaken || `${Math.floor((attempt.total_questions * 35) / 60).toString().padStart(2, '0')}:${((attempt.total_questions * 35) % 60).toString().padStart(2, '0')}`}
              </p>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link to={`/quiz/${attempt.quiz_id}`}>
              <button
                className="px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border border-[#D6A24A]/40 text-[#D6A24A] hover:bg-[#D6A24A]/10 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>View Answers / Retry</span>
              </button>
            </Link>
            <Link to="/explore">
              <button
                className="px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 bg-[#321B22] border border-[#D6A24A]/30 text-[#F5EBDD] hover:bg-[#43232A] transition-all"
              >
                <Compass className="w-4 h-4" />
                <span>Try Another Quiz</span>
              </button>
            </Link>
            <Link to="/dashboard">
              <button
                className="px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: '#D6A24A', color: '#321B22' }}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
