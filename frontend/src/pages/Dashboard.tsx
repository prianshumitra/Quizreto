import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckSquare,
  Trophy,
  Award,
  Zap,
  ArrowRight,
  Compass,
  AlertCircle,
  PlusCircle,
  Landmark,
  Atom,
  Scroll,
  Code,
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { getMyAttemptStats, getMyAttempts } from '../api/attempts';
import { getQuizzes } from '../api/quizzes';

import type {
  AttemptHistoryResponse,
  AttemptStatsResponse,
  QuizResponse,
} from '../types/api';

import { StatCard } from '../components/dashboard/StatCard';
import { ContinueCard } from '../components/dashboard/ContinueCard';
import { QuoteCard } from '../components/dashboard/QuoteCard';
import { QuizCard } from '../components/quiz/QuizCard';
import { CardSkeleton } from '../components/ui/Skeleton';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const [stats, setStats] = useState<AttemptStatsResponse | null>(null);
  const [recentAttempts, setRecentAttempts] = useState<
    AttemptHistoryResponse[]
  >([]);
  const [quizzes, setQuizzes] = useState<QuizResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const recommendedCategories = [
    {
      title: 'Indian Constitution',
      tag: 'Polity',
      icon: Landmark,
    },
    {
      title: 'General Science',
      tag: 'Science',
      icon: Atom,
    },
    {
      title: 'Bengali Literature',
      tag: 'Literature',
      icon: Scroll,
    },
    {
      title: 'Tech Trivia',
      tag: 'Technology',
      icon: Code,
    },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [statsData, attemptsData, quizzesData] = await Promise.all([
          getMyAttemptStats().catch(() => ({
            total_attempts: 0,
            completed_attempts: 0,
            average_score: 0,
            average_percentage: 0,
            best_percentage: 0,
          })),

          getMyAttempts().catch(() => []),

          getQuizzes().catch(() => []),
        ]);

        setStats(statsData);
        setRecentAttempts(attemptsData.slice(0, 4));
        setQuizzes(quizzesData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unable to load your dashboard.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const name = user?.name || 'Learner';

  return (
    <div className="space-y-10 pb-16">


      {/* =====================================================
          WELCOME
      ===================================================== */}

      <section>

        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            p-6
            sm:p-8
            lg:p-9
            border
            shadow-[0_18px_45px_rgba(35,10,15,0.18)]
          "
          style={{
            backgroundColor: '#3A1F25',
            borderColor: 'rgba(245,235,221,0.10)',
          }}
        >

          {/* Decorative arch */}

          <div
            className="
              absolute
              -right-16
              -top-28
              w-[300px]
              h-[400px]
              rounded-t-full
              border
              opacity-[0.16]
            "
            style={{
              borderColor: '#D6A24A',
            }}
          />

          <div
            className="
              absolute
              -right-1
              -top-12
              w-[210px]
              h-[300px]
              rounded-t-full
              border
              opacity-[0.08]
            "
            style={{
              borderColor: '#F5EBDD',
            }}
          />


          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-7">

            <div>

              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.28em]
                  font-semibold
                  mb-3
                "
                style={{
                  color: '#D6A24A',
                }}
              >
                Good to see you
              </p>

              <h1
                className="
                  font-serif
                  text-3xl
                  sm:text-4xl
                  lg:text-[42px]
                  leading-tight
                  font-bold
                "
                style={{
                  color: '#F5EBDD',
                }}
              >
                Welcome back, {name}
              </h1>

              <p
                className="
                  mt-3
                  text-sm
                  leading-relaxed
                  max-w-lg
                "
                style={{
                  color: '#F5EBDD',
                  opacity: 0.58,
                }}
              >
                Continue an unfinished quiz or find something
                new to try.
              </p>

            </div>


            <div className="flex items-center gap-3 relative z-10">

              <Link to="/explore">

                <button
                  className="
                    px-5
                    py-2.5
                    rounded-xl
                    text-xs
                    font-semibold
                    flex
                    items-center
                    gap-2
                    transition-all
                    hover:-translate-y-0.5
                  "
                  style={{
                    backgroundColor: '#D6A24A',
                    color: '#321B22',
                  }}
                >

                  <Compass className="w-4 h-4" />

                  Explore

                </button>

              </Link>


              <Link to="/create-quiz">

                <button
                  className="
                    px-4
                    py-2.5
                    rounded-xl
                    text-xs
                    font-semibold
                    flex
                    items-center
                    gap-2
                    border
                    transition-colors
                    hover:bg-[#F5EBDD]/[0.07]
                  "
                  style={{
                    color: '#F5EBDD',
                    borderColor: 'rgba(245,235,221,0.16)',
                  }}
                >

                  <PlusCircle className="w-4 h-4" />

                  Create

                </button>

              </Link>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (

        <div
          className="
            p-4
            rounded-2xl
            border
            flex
            items-center
            gap-3
            text-xs
          "
          style={{
            backgroundColor: 'rgba(245,235,221,0.07)',
            borderColor: 'rgba(245,235,221,0.14)',
            color: '#F5EBDD',
          }}
        >

          <AlertCircle className="w-4 h-4 shrink-0" />

          <span>{error}</span>

        </div>

      )}


      {/* =====================================================
          YOUR ACTIVITY
      ===================================================== */}

      <section>

        <div className="mb-5">

          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.25em]
              font-semibold
            "
            style={{
              color: '#D6A24A',
            }}
          >
            Your Activity
          </p>

          <h2
            className="
              font-serif
              text-2xl
              sm:text-3xl
              font-bold
              mt-1
            "
            style={{
              color: '#F5EBDD',
            }}
          >
            Your quiz activity
          </h2>

        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          <StatCard
            title="Attempts"
            value={
              isLoading
                ? '...'
                : stats?.total_attempts ?? 0
            }
            subtitle={`${stats?.completed_attempts ?? 0} Completed`}
            icon={<CheckSquare className="w-6 h-6" />}
            accentColor="green"
          />

          <StatCard
            title="Average Score"
            value={
              isLoading
                ? '...'
                : `${stats?.average_score ?? 0} pts`
            }
            subtitle="Across your attempts"
            icon={<Trophy className="w-6 h-6" />}
            accentColor="navy"
          />

          <StatCard
            title="Average Accuracy"
            value={
              isLoading
                ? '...'
                : `${stats?.average_percentage ?? 0}%`
            }
            subtitle="Your overall accuracy"
            icon={<Award className="w-6 h-6" />}
            accentColor="saffron"
          />

          <StatCard
            title="Best Result"
            value={
              isLoading
                ? '...'
                : `${stats?.best_percentage ?? 0}%`
            }
            subtitle="Your highest percentage"
            icon={<Zap className="w-6 h-6" />}
            accentColor="gold"
          />

        </div>

      </section>


      {/* =====================================================
          CONTINUE / PICK UP
      ===================================================== */}

      {quizzes.length > 0 && (

        <section>

          <div className="flex items-end justify-between mb-5">

            <div>

              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.25em]
                  font-semibold
                "
                style={{
                  color: '#D6A24A',
                }}
              >
                Start Here
              </p>

              <h2
                className="
                  font-serif
                  text-2xl
                  sm:text-3xl
                  font-bold
                  mt-1
                "
                style={{
                  color: '#F5EBDD',
                }}
              >
                Pick up where you left off
              </h2>

            </div>

            <Link
              to="/explore"
              className="
                hidden
                sm:flex
                items-center
                gap-1
                text-xs
                font-semibold
                hover:underline
              "
              style={{
                color: '#D6A24A',
              }}
            >
              Explore more
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

          </div>


          <ContinueCard
            quizTitle={quizzes[0]?.title || 'Explore a quiz'}
            category={quizzes[0]?.description || 'Quizreto'}
            currentQuestion={0}
            totalQuestions={0}
            quizId={quizzes[0]?.id || 1}
          />

        </section>

      )}


      {/* =====================================================
          BROWSE TOPICS
      ===================================================== */}

      <section>

        <div className="flex items-end justify-between mb-5">

          <div>

            <p
              className="
                text-[10px]
                uppercase
                tracking-[0.25em]
                font-semibold
              "
              style={{
                color: '#D6A24A',
              }}
            >
              Browse Topics
            </p>

            <h2
              className="
                font-serif
                text-2xl
                sm:text-3xl
                font-bold
                mt-1
              "
              style={{
                color: '#F5EBDD',
              }}
            >
              What are you in the mood for?
            </h2>

          </div>

          <Link
            to="/explore"
            className="
              hidden
              sm:flex
              items-center
              gap-1
              text-xs
              font-semibold
              hover:underline
            "
            style={{
              color: '#D6A24A',
            }}
          >
            See all
            <ArrowRight className="w-4 h-4" />
          </Link>

        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

          {recommendedCategories.map((item) => {

            const Icon = item.icon;

            return (

              <Link
                key={item.tag}
                to={`/explore?category=${encodeURIComponent(
                  item.tag
                )}`}
                className="group"
              >

                <div
                  className="
                    h-full
                    rounded-2xl
                    p-5
                    border
                    transition-all
                    duration-200
                    hover:-translate-y-1
                    hover:shadow-[0_14px_35px_rgba(35,10,15,0.18)]
                  "
                  style={{
                    backgroundColor: '#82403B',
                    borderColor: 'rgba(245,235,221,0.10)',
                  }}
                >

                  <div
                    className="
                      w-11
                      h-11
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      mb-6
                      transition-transform
                      duration-200
                      group-hover:scale-105
                    "
                    style={{
                      backgroundColor: '#D6A24A',
                      color: '#321B22',
                    }}
                  >

                    <Icon className="w-5 h-5" />

                  </div>


                  <h3
                    className="
                      font-serif
                      text-lg
                      font-bold
                    "
                    style={{
                      color: '#F5EBDD',
                    }}
                  >
                    {item.title}
                  </h3>


                  <div className="flex items-center justify-between mt-6">

                    <span
                      className="
                        text-[10px]
                        uppercase
                        tracking-[0.12em]
                        font-semibold
                        px-2.5
                        py-1
                        rounded-full
                      "
                      style={{
                        backgroundColor: 'rgba(245,235,221,0.08)',
                        color: '#D6A24A',
                      }}
                    >
                      {item.tag}
                    </span>


                    <ArrowRight
                      className="
                        w-4
                        h-4
                        transition-transform
                        duration-200
                        group-hover:translate-x-1
                      "
                      style={{
                        color: '#F5EBDD',
                        opacity: 0.65,
                      }}
                    />

                  </div>

                </div>

              </Link>

            );

          })}

        </div>

      </section>


      {/* =====================================================
          QUIZZES YOU CAN TAKE
      ===================================================== */}

      {quizzes.length > 0 && (

        <section>

          <div className="flex items-end justify-between mb-5">

            <div>

              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.25em]
                  font-semibold
                "
                style={{
                  color: '#D6A24A',
                }}
              >
                More to Explore
              </p>

              <h2
                className="
                  font-serif
                  text-2xl
                  sm:text-3xl
                  font-bold
                  mt-1
                "
                style={{
                  color: '#F5EBDD',
                }}
              >
                Quizzes you can take
              </h2>

            </div>

            <Link
              to="/explore"
              className="
                flex
                items-center
                gap-1
                text-xs
                font-semibold
                hover:underline
              "
              style={{
                color: '#D6A24A',
              }}
            >
              See all
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

          </div>


          {isLoading ? (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />

            </div>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {quizzes.slice(0, 3).map((quiz) => (

                <QuizCard
                  key={quiz.id}
                  quiz={quiz}
                />

              ))}

            </div>

          )}

        </section>

      )}


      {/* =====================================================
          RECENT ACTIVITY
      ===================================================== */}

      {recentAttempts.length > 0 && (

        <section>

          <div className="flex items-end justify-between mb-5">

            <div>

              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.25em]
                  font-semibold
                "
                style={{
                  color: '#D6A24A',
                }}
              >
                Recent Activity
              </p>

              <h2
                className="
                  font-serif
                  text-2xl
                  sm:text-3xl
                  font-bold
                  mt-1
                "
                style={{
                  color: '#F5EBDD',
                }}
              >
                Your recent attempts
              </h2>

            </div>

            <Link
              to="/my-attempts"
              className="
                flex
                items-center
                gap-1
                text-xs
                font-semibold
                hover:underline
              "
              style={{
                color: '#D6A24A',
              }}
            >
              See history
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

          </div>


          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {recentAttempts.map((att) => (

              <Card
                key={att.id}
                className="
                  !bg-[#82403B]
                  !border-[#F5EBDD]/10
                  flex
                  items-center
                  justify-between
                  gap-4
                "
              >

                <div>

                  <Badge
                    variant={
                      att.completed
                        ? 'green'
                        : 'saffron'
                    }
                    className="mb-2"
                  >
                    {att.completed
                      ? 'Completed'
                      : 'In Progress'}
                  </Badge>


                  <h3
                    className="
                      font-serif
                      text-base
                      font-bold
                    "
                    style={{
                      color: '#F5EBDD',
                    }}
                  >
                    Attempt #{att.id}
                  </h3>


                  <p
                    className="
                      text-xs
                      mt-1
                    "
                    style={{
                      color: '#F5EBDD',
                      opacity: 0.55,
                    }}
                  >
                    Score: {att.score}/{att.total_questions}{' '}
                    ({att.percentage}%)
                  </p>

                </div>


                <Link to={`/result/${att.id}`}>

                  <button
                    className="
                      px-3.5
                      py-2
                      rounded-lg
                      text-xs
                      font-semibold
                      whitespace-nowrap
                      transition-all
                      hover:-translate-y-0.5
                    "
                    style={{
                      backgroundColor: '#D6A24A',
                      color: '#321B22',
                    }}
                  >
                    View Result
                  </button>

                </Link>

              </Card>

            ))}

          </div>

        </section>

      )}

    </div>
  );
};