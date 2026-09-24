import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, HelpCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { getQuiz } from '../api/quizzes';
import { getQuestions } from '../api/questions';
import { startAttempt, submitAttempt } from '../api/attempts';
import type { AttemptResponse, QuestionResponse, QuizResponse } from '../types/api';
import { OptionCard } from '../components/quiz/OptionCard';
import { QuestionTimer } from '../components/quiz/QuestionTimer';
import { ConfirmSubmitModal } from '../components/quiz/ConfirmSubmitModal';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import { MandalaPattern } from '../components/ui/MandalaPattern';

export const QuizAttempt: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<QuizResponse | null>(null);
  const [questions, setQuestions] = useState<QuestionResponse[]>([]);
  const [attempt, setAttempt] = useState<AttemptResponse | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const startTimeRef = React.useRef<number>(Date.now());

  useEffect(() => {
    const initQuizAttempt = async () => {
      if (!quizId) return;
      setIsLoading(true);
      setError(null);
      try {
        const id = parseInt(quizId, 10);
        const [quizData, questionsData, attemptData] = await Promise.all([
          getQuiz(id),
          getQuestions(id),
          startAttempt(id),
        ]);

        setQuiz(quizData);
        setQuestions(questionsData);
        setAttempt(attemptData);
        startTimeRef.current = Date.now();
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    initQuizAttempt();
  }, [quizId]);

  const handleSelectOption = (questionId: number, option: 'A' | 'B' | 'C' | 'D') => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmitAttempt = async () => {
    if (!attempt) return;
    setIsSubmitting(true);
    try {
      const answersPayload = Object.entries(selectedAnswers).map(([qid, option]) => ({
        question_id: parseInt(qid, 10),
        selected_option: option,
      }));

      await submitAttempt(attempt.id, { answers: answersPayload });

      const elapsedSeconds = Math.max(5, Math.round((Date.now() - startTimeRef.current) / 1000));
      const mins = Math.floor(elapsedSeconds / 60).toString().padStart(2, '0');
      const secs = (elapsedSeconds % 60).toString().padStart(2, '0');
      const formattedTime = `00:${mins}:${secs}`;

      navigate(`/result/${attempt.id}`, { state: { timeTaken: formattedTime } });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to submit attempt. Please try again.');
      }
      setShowConfirmModal(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 py-8">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="bg-[#FFFDF9] rounded-3xl p-8 border border-[#E7DBCC] space-y-6">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="max-w-xl mx-auto text-center py-16 space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#D6A24A]/15 text-[#D6A24A] flex items-center justify-center mx-auto border border-[#D6A24A]/30">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#F5EBDD]">Unable to Start Quiz</h2>
        <p className="text-xs text-[#D6A24A] font-medium">{error || 'Quiz parameters invalid.'}</p>
        <Button variant="primary" onClick={() => navigate('/explore')}>
          Return to Explore
        </Button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-xl mx-auto text-center py-16 space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#D6A24A]/15 text-[#D6A24A] flex items-center justify-center mx-auto border border-[#D6A24A]/30">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#F5EBDD]">No Questions Added Yet</h2>
        <p className="text-xs text-[#F5EBDD]/70">
          This quiz does not have any questions available for assessment yet.
        </p>
        <Button variant="primary" onClick={() => navigate('/explore')}>
          Return to Explore
        </Button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const selectedOption = selectedAnswers[currentQuestion?.id];
  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16 relative">
      {/* Quiz Top Bar */}
      <div className="bg-[#3A1F25] p-5 sm:p-7 rounded-3xl border border-[#D6A24A]/25 space-y-4 shadow-[0_12px_35px_rgba(20,8,12,0.35)] relative overflow-hidden">
        <MandalaPattern className="absolute top-0 right-0 w-64 h-64 text-[#D6A24A] opacity-10" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold text-[#D6A24A] uppercase tracking-widest bg-[#D6A24A]/10 px-3 py-1 rounded-full border border-[#D6A24A]/30 inline-block mb-2">
              Active Assessment
            </span>
            <h1 className="font-serif text-xl sm:text-2xl font-extrabold text-[#F5EBDD]">
              {quiz.title}
            </h1>
          </div>
          <QuestionTimer onTimeExpired={() => setShowConfirmModal(true)} />
        </div>

        {/* Progress Bar & Question Counter */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#F5EBDD]">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span className="text-[#D6A24A]">{answeredCount} Answered</span>
          </div>
          <div className="w-full bg-black/40 h-2.5 rounded-full border border-white/10 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#D3542E] to-[#D6A24A] h-full rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(214,162,74,0.5)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Grid with Question Card & Right Handwritten Overlay Margin */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Question Card */}
        <Card className="lg:col-span-9 bg-[#3A1F25] border border-[#D6A24A]/25 p-5 sm:p-8 space-y-6 shadow-[0_15px_40px_rgba(20,8,12,0.4)]">
          <div className="space-y-2.5">
            <span className="text-[10px] font-bold text-[#D6A24A] uppercase tracking-widest">
              Question #{currentIndex + 1}
            </span>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#F5EBDD] leading-relaxed">
              {currentQuestion.question_text}
            </h2>
          </div>

          <div className="space-y-3.5 pt-2">
            <OptionCard
              label="A"
              text={currentQuestion.option_a}
              isSelected={selectedOption === 'A'}
              onClick={() => handleSelectOption(currentQuestion.id, 'A')}
            />
            <OptionCard
              label="B"
              text={currentQuestion.option_b}
              isSelected={selectedOption === 'B'}
              onClick={() => handleSelectOption(currentQuestion.id, 'B')}
            />
            <OptionCard
              label="C"
              text={currentQuestion.option_c}
              isSelected={selectedOption === 'C'}
              onClick={() => handleSelectOption(currentQuestion.id, 'C')}
            />
            <OptionCard
              label="D"
              text={currentQuestion.option_d}
              isSelected={selectedOption === 'D'}
              onClick={() => handleSelectOption(currentQuestion.id, 'D')}
            />
          </div>

          <div className="pt-6 border-t border-[#F5EBDD]/10 flex items-center justify-between gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border border-[#D6A24A]/30 text-[#D6A24A] hover:bg-[#D6A24A]/10 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentIndex === questions.length - 1 ? (
              <button
                onClick={() => setShowConfirmModal(true)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: '#D6A24A', color: '#321B22' }}
              >
                <CheckCircle className="w-4 h-4" />
                <span>Submit Quiz</span>
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: '#D6A24A', color: '#321B22' }}
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </Card>

        {/* Right Margin Decorative Script & Watermark Line Art */}
        <div className="hidden lg:flex lg:col-span-3 flex-col items-center text-center p-6 bg-[#3A1F25] rounded-3xl border border-[#D6A24A]/25 space-y-6 shadow-md">
          <div className="space-y-2">
            <span className="font-handwriting text-3xl text-[#D6A24A] rotate-[-8deg] block drop-shadow-xs">
              Learn<br />
              Reflect<br />
              Grow
            </span>
          </div>

          <svg viewBox="0 0 150 200" fill="none" className="w-full text-[#D6A24A] opacity-30">
            {/* Monument Line Art Watermark */}
            <path d="M 25 180 L 25 120 Q 75 60 125 120 L 125 180 Z" stroke="currentColor" strokeWidth="2" />
            <circle cx="75" cy="40" r="10" stroke="currentColor" strokeWidth="2" />
            <line x1="75" y1="50" x2="75" y2="70" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
      </div>

      <ConfirmSubmitModal
        isOpen={showConfirmModal}
        answeredCount={answeredCount}
        totalQuestions={questions.length}
        isSubmitting={isSubmitting}
        onConfirm={handleSubmitAttempt}
        onCancel={() => setShowConfirmModal(false)}
      />
    </div>
  );
};
