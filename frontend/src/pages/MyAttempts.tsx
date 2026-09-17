import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { History, Trophy, Award, CheckSquare, ArrowRight, AlertCircle, Calendar } from 'lucide-react';
import { getMyAttempts, getMyAttemptStats } from '../api/attempts';
import type { AttemptHistoryResponse, AttemptStatsResponse } from '../types/api';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
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
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-[#FFFDF9] p-6 sm:p-8 rounded-3xl border border-[#E7DBCC] space-y-2">
        <span className="text-xs font-bold text-[#D3542E] uppercase tracking-wider bg-[#FDF1ED] px-3 py-1 rounded-full border border-[#D3542E]/20 inline-block">
          Assessment History
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0F2D3D]">
          My Attempts
        </h1>
        <p className="text-xs sm:text-sm text-[#1F2937]/70">
          Track your quiz submission history, scores, and accuracy over time.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 shrink-0" />
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
        <h3 className="font-serif text-xl font-bold text-[#0F2D3D]">All Attempts ({attempts.length})</h3>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-20 w-full rounded-2xl" />
            <Skeleton className="h-20 w-full rounded-2xl" />
            <Skeleton className="h-20 w-full rounded-2xl" />
          </div>
        ) : attempts.length === 0 ? (
          <Card className="text-center py-16 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FDF1ED] text-[#D3542E] flex items-center justify-center mx-auto">
              <History className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-xl font-bold text-[#0F2D3D]">No Attempts Found</h4>
            <p className="text-xs text-[#1F2937]/70 max-w-sm mx-auto">
              You haven't taken any quizzes yet. Explore our catalog and test your knowledge!
            </p>
            <Link to="/explore" className="inline-block">
              <Button variant="primary" size="sm">
                Explore Quizzes
              </Button>
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
                <Card key={attempt.id} hoverEffect className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge variant={attempt.completed ? 'green' : 'saffron'}>
                        {attempt.completed ? 'Completed' : 'In Progress'}
                      </Badge>
                      <span className="text-xs font-semibold text-[#0F2D3D]/60 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formattedDate}
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-[#0F2D3D]">
                      Attempt #{attempt.id} — Quiz #{attempt.quiz_id}
                    </h4>

                    <div className="flex items-center gap-4 text-xs font-medium text-[#1F2937]/80">
                      <span>
                        Score: <strong className="text-[#D3542E] font-bold">{attempt.score} / {attempt.total_questions}</strong>
                      </span>
                      <span>
                        Percentage: <strong className="text-[#0F2D3D] font-bold">{attempt.percentage}%</strong>
                      </span>
                    </div>
                  </div>

                  <Link to={`/result/${attempt.id}`}>
                    <Button variant="primary" size="sm" icon={<ArrowRight className="w-4 h-4" />}>
                      View Result
                    </Button>
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
