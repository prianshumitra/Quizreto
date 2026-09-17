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
      navigate(`/result/${attempt.id}`);
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
        <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-200">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#0F2D3D]">Unable to Start Quiz</h2>
        <p className="text-xs text-red-700 font-medium">{error || 'Quiz parameters invalid.'}</p>
        <Button variant="primary" onClick={() => navigate('/explore')}>
          Return to Explore
        </Button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-xl mx-auto text-center py-16 space-y-4">
        <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
          <HelpCircle className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-[#0F2D3D]">No Questions Added Yet</h2>
        <p className="text-xs text-[#1F2937]/70">
          This quiz does not have any questions available for assessment yet.
        </p>
        <Button variant="primary" onClick={() => navigate('/explore')}>
          Back to Explore
        </Button>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const selectedOption = selectedAnswers[currentQuestion.id];
  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16 relative">
      {/* Quiz Top Bar */}
      <div className="bg-[#FFFDF9] p-6 sm:p-8 rounded-3xl border border-[#E7DBCC] space-y-4 shadow-sm relative overflow-hidden">
        <MandalaPattern className="absolute top-0 right-0 w-64 h-64 text-[#D3542E] opacity-10" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#D3542E] uppercase tracking-wider bg-[#FDF1ED] px-3 py-1 rounded-full border border-[#D3542E]/20 inline-block mb-2">
              Active Assessment
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#0F2D3D]">
              {quiz.title}
            </h1>
          </div>
          <QuestionTimer onTimeExpired={() => setShowConfirmModal(true)} />
        </div>

        {/* Progress Bar & Question Counter */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs font-bold text-[#0F2D3D]">
            <span>Question {currentIndex + 1} of {questions.length}</span>
            <span className="text-[#D3542E]">{answeredCount} Answered</span>
          </div>
          <div className="w-full bg-[#E7DBCC]/50 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-[#D3542E] h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Grid with Question Card & Right Handwritten Overlay Margin */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Question Card */}
        <Card className="lg:col-span-9 bg-[#FFFDF9] border border-[#E7DBCC] p-6 sm:p-10 space-y-8 shadow-md">
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#0F2D3D]/50 uppercase tracking-widest">
              Question #{currentIndex + 1}
            </span>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2D3D] leading-relaxed">
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

          <div className="pt-6 border-t border-[#E7DBCC]/70 flex items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              icon={<ArrowLeft className="w-4 h-4" />}
            >
              Previous
            </Button>

            {currentIndex === questions.length - 1 ? (
              <Button
                variant="primary"
                onClick={() => setShowConfirmModal(true)}
                icon={<CheckCircle className="w-4 h-4" />}
              >
                Submit Quiz
              </Button>
            ) : (
              <Button
                variant="secondary"
                onClick={handleNext}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Next
              </Button>
            )}
          </div>
        </Card>

        {/* Right Margin Decorative Script & Watermark Line Art (Matching Reference UI) */}
        <div className="hidden lg:flex lg:col-span-3 flex-col items-center text-center p-6 bg-[#FDF7ED] rounded-3xl border border-[#E7DBCC] space-y-6">
          <div className="space-y-2">
            <span className="font-handwriting text-3xl text-[#F4A261] rotate-[-8deg] block drop-shadow-xs">
              Learn<br />
              Reflect<br />
              Grow
            </span>
          </div>

          <svg viewBox="0 0 150 200" fill="none" className="w-full text-[#D3542E] opacity-20">
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
