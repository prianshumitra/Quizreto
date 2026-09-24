import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, AlertCircle, Compass } from 'lucide-react';
import { getQuizzes } from '../api/quizzes';
import type { QuizResponse } from '../types/api';
import { QuizCard } from '../components/quiz/QuizCard';
import { CardSkeleton } from '../components/ui/Skeleton';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

export const Explore: React.FC = () => {
  const [quizzes, setQuizzes] = useState<QuizResponse[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'latest' | 'oldest'>('latest');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    'All',
    'History',
    'Science',
    'Technology',
    'Literature',
    'Geography',
    'Current Affairs',
  ];

  useEffect(() => {
    const fetchQuizzesData = async () => {
      setIsLoading(true);
      try {
        const data = await getQuizzes();
        setQuizzes(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizzesData();
  }, []);

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(search.toLowerCase()) ||
      (quiz.description && quiz.description.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' ||
      (quiz.description && quiz.description.toLowerCase().includes(selectedCategory.toLowerCase()));

    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'latest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="bg-[#3A1F25] p-6 sm:p-7 rounded-3xl border border-[#D6A24A]/25 space-y-3 shadow-[0_12px_35px_rgba(20,8,12,0.35)]">
        <span className="text-[10px] font-bold text-[#D6A24A] uppercase tracking-widest bg-[#D6A24A]/10 px-3 py-1 rounded-full border border-[#D6A24A]/30 inline-block">
          Assessment Catalog
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#F5EBDD]">
          Explore Quizzes
        </h1>
        <p className="text-xs sm:text-sm text-[#F5EBDD]/70">
          Choose a category and start your next challenge.
        </p>

        {/* Search & Sort Controls */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex-1 w-full">
            <Input
              type="text"
              placeholder="Search by title, topic or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <SlidersHorizontal className="w-4 h-4 text-[#D6A24A] shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'latest' | 'oldest')}
              className="bg-[#321B22] border border-[#D6A24A]/25 text-[#F5EBDD] text-xs font-semibold rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#D6A24A] w-full sm:w-auto"
            >
              <option value="latest" className="bg-[#321B22] text-[#F5EBDD]">Sort by: Latest</option>
              <option value="oldest" className="bg-[#321B22] text-[#F5EBDD]">Sort by: Oldest</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="pt-2 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[#D6A24A] text-[#321B22] shadow-md'
                  : 'bg-[#321B22]/80 text-[#F5EBDD]/80 hover:bg-[#321B22] border border-[#D6A24A]/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-3">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Quiz Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : filteredQuizzes.length === 0 ? (
        <Card className="text-center py-16 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#FDF1ED] text-[#D3542E] flex items-center justify-center mx-auto">
            <Compass className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-[#0F2D3D]">No Quizzes Found</h3>
          <p className="text-xs text-[#1F2937]/70 max-w-md mx-auto">
            We couldn't find any quizzes matching your search parameters. Try adjusting your search query or category filter.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} category={selectedCategory !== 'All' ? selectedCategory : 'General Knowledge'} />
          ))}
        </div>
      )}
    </div>
  );
};
