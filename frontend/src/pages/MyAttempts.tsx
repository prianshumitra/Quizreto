import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { History, Trophy, Award, CheckSquare, ArrowRight, AlertCircle, Calendar } from 'lucide-react';
import { getMyAttempts, getMyAttemptStats } from '../api/attempts';
import type { AttemptHistoryResponse, AttemptStatsResponse } from '../types/api';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';
import { StatCard } from '../components/dashboard/StatCard';

export const MyAttempts: React.FC = () => {
  const [attempts, setAttempts] = useState<AttemptHistoryResponse[]>([]);
  const [stats, setStats] = useState<AttemptStatsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [attemptsData, statsData] = await Promise.all([
          getMyAttempts(),
          getMyAttemptStats().catch(() => null),
        ]);
        setAttempts(attemptsData);
        setStats(statsData);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-[#3A1F25] p-6 sm:p-7 rounded-3xl border border-[#D6A24A]/25 space-y-2.5 shadow-[0_12px_35px_rgba(20,8,12,0.35)]">
        <span className="text-[10px] font-bold text-[#D6A24A] uppercase tracking-widest bg-[#D6A24A]/10 px-3 py-1 rounded-full border border-[#D6A24A]/30 inline-block">
          Assessment History
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#F5EBDD]">
          My Attempts
        </h1>
        <p className="text-xs sm:text-sm text-[#F5EBDD]/75">
          Track your quiz submission history, scores, and accuracy over time.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Summary Stats Row */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <StatCard
            title="Total Attempts"
            value={stats.total_attempts}
            subtitle={`${stats.completed_attempts} Completed`}
            icon={<CheckSquare className="w-6 h-6" />}
            accentColor="green"
          />
          <StatCard
            title="Average Percentage"
            value={`${stats.average_percentage}%`}
            subtitle="Overall accuracy"
            icon={<Trophy className="w-6 h-6" />}
            accentColor="navy"
          />
          <StatCard
            title="Best Percentage"
            value={`${stats.best_percentage}%`}
            subtitle="Peak performance"
            icon={<Award className="w-6 h-6" />}
            accentColor="saffron"
          />
        </div>
      )}

      {/* Attempt History List */}
      <div className="space-y-4">
        <h3 className="font-serif text-xl font-bold text-[#F5EBDD]">All Attempts ({attempts.length})</h3>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-20 w-full rounded-2xl" />
            <Skeleton className="h-20 w-full rounded-2xl" />
            <Skeleton className="h-20 w-full rounded-2xl" />
          </div>
        ) : attempts.length === 0 ? (
          <Card className="text-center py-16 space-y-4 bg-[#3A1F25] border border-[#D6A24A]/25">
            <div className="w-16 h-16 rounded-full bg-[#D6A24A]/15 text-[#D6A24A] border border-[#D6A24A]/30 flex items-center justify-center mx-auto">
              <History className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-xl font-bold text-[#F5EBDD]">No Attempts Found</h4>
            <p className="text-xs text-[#F5EBDD]/70 max-w-sm mx-auto">
              You haven't taken any quizzes yet. Explore our catalog and test your knowledge!
            </p>
            <Link to="/explore" className="inline-block">
              <button
                className="px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-md hover:-translate-y-0.5"
                style={{ backgroundColor: '#D6A24A', color: '#321B22' }}
              >
                Explore Quizzes
              </button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {attempts.map((attempt) => {
              const formattedDate = attempt.submitted_at
                ? new Date(attempt.submitted_at).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'In Progress';

              return (
                <Card key={attempt.id} hoverEffect className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#3A1F25] border border-[#D6A24A]/25 hover:border-[#D6A24A]/50">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge variant={attempt.completed ? 'green' : 'saffron'}>
                        {attempt.completed ? 'Completed' : 'In Progress'}
                      </Badge>
                      <span className="text-xs font-semibold text-[#D6A24A] flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formattedDate}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-[#F5EBDD]">
                      Attempt #{attempt.id} — Quiz #{attempt.quiz_id}
                    </h4>

                    <div className="flex items-center gap-4 text-xs font-medium text-[#F5EBDD]/80">
                      <span>
                        Score: <strong className="text-[#D6A24A] font-bold">{attempt.score} / {attempt.total_questions}</strong>
                      </span>
                      <span>
                        Percentage: <strong className="text-[#F5EBDD] font-bold">{attempt.percentage}%</strong>
                      </span>
                    </div>
                  </div>

                  <Link to={`/result/${attempt.id}`}>
                    <button
                      className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md hover:-translate-y-0.5"
                      style={{ backgroundColor: '#D6A24A', color: '#321B22' }}
                    >
                      <span>View Result</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
