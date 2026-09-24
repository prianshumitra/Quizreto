import React, { useEffect, useState } from 'react';
import { User, Mail, Shield, Calendar, LogOut, Trophy, CheckSquare, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getMyAttemptStats } from '../api/attempts';
import type { AttemptStatsResponse } from '../types/api';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { StatCard } from '../components/dashboard/StatCard';
import { MandalaPattern } from '../components/ui/MandalaPattern';

export const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<AttemptStatsResponse | null>(null);

  useEffect(() => {
    getMyAttemptStats()
      .then((data) => setStats(data))
      .catch(() => setStats(null));
  }, []);

  const formattedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Recently';

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Profile Banner */}
      <div className="bg-[#3A1F25] p-6 sm:p-8 rounded-3xl border border-[#D6A24A]/30 relative overflow-hidden shadow-[0_12px_35px_rgba(20,8,12,0.35)]">
        <MandalaPattern className="absolute -top-10 -right-10 w-80 h-80 text-[#D6A24A] opacity-10" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10">
          <div className="w-20 h-20 rounded-3xl bg-[#321B22] text-[#D6A24A] font-serif font-bold text-3xl flex items-center justify-center shadow-[0_0_25px_rgba(214,162,74,0.2)] border-2 border-[#D6A24A]/40 shrink-0">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>

          <div className="space-y-2.5 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <Badge variant="terracotta" size="md" className="capitalize">
                {user?.role || 'Learner'}
              </Badge>
              <Badge variant="navy" size="md">
                Verified Quizreto Member
              </Badge>
            </div>

            <h1 className="font-serif text-2xl font-extrabold text-[#F5EBDD]">
              {user?.name || 'User Profile'}
            </h1>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-[#F5EBDD]/80">
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-[#D6A24A]" />
                {user?.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#D6A24A]" />
                Joined {formattedDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Account Details Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="space-y-4 bg-[#3A1F25] border border-[#D6A24A]/25">
          <h3 className="font-serif text-lg font-bold text-[#F5EBDD] flex items-center gap-2 border-b border-[#F5EBDD]/10 pb-3">
            <User className="w-5 h-5 text-[#D6A24A]" />
            Personal Information
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-[#D6A24A] uppercase tracking-widest font-bold text-[10px] block">Full Name</span>
              <span className="text-sm font-bold text-[#F5EBDD]">{user?.name}</span>
            </div>
            <div>
              <span className="text-[#D6A24A] uppercase tracking-widest font-bold text-[10px] block">Email Address</span>
              <span className="text-sm font-bold text-[#F5EBDD]">{user?.email}</span>
            </div>
            <div>
              <span className="text-[#D6A24A] uppercase tracking-widest font-bold text-[10px] block">User ID</span>
              <span className="text-sm font-mono text-[#F5EBDD]/90">#{user?.id}</span>
            </div>
          </div>
        </Card>

        <Card className="space-y-4 bg-[#3A1F25] border border-[#D6A24A]/25">
          <h3 className="font-serif text-lg font-bold text-[#F5EBDD] flex items-center gap-2 border-b border-[#F5EBDD]/10 pb-3">
            <Shield className="w-5 h-5 text-[#D6A24A]" />
            Security & Session
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-[#D6A24A] uppercase tracking-widest font-bold text-[10px] block">Account Role</span>
              <span className="text-sm font-bold text-[#F5EBDD] capitalize">{user?.role || 'User'}</span>
            </div>
            <div>
              <span className="text-[#D6A24A] uppercase tracking-widest font-bold text-[10px] block">Authentication</span>
              <span className="text-sm font-bold text-[#D6A24A]">JWT Token Active</span>
            </div>
            <div className="pt-2">
              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 bg-[#321B22] border border-[#D6A24A]/40 text-[#F5EBDD] hover:bg-[#43232A] hover:border-[#D6A24A]/70 transition-all shadow-md"
              >
                <LogOut className="w-4 h-4 text-[#D6A24A]" />
                <span>Log Out of Account</span>
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* Performance Summary Stats */}
      {stats && (
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#F5EBDD]">Performance Summary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <StatCard
              title="Total Quizzes"
              value={stats.total_attempts}
              subtitle="Lifetime attempts"
              icon={<CheckSquare className="w-6 h-6" />}
              accentColor="green"
            />
            <StatCard
              title="Average Accuracy"
              value={`${stats.average_percentage}%`}
              subtitle="All submissions"
              icon={<Trophy className="w-6 h-6" />}
              accentColor="navy"
            />
            <StatCard
              title="Best Percentage"
              value={`${stats.best_percentage}%`}
              subtitle="Personal record"
              icon={<Award className="w-6 h-6" />}
              accentColor="saffron"
            />
          </div>
        </div>
      )}
    </div>
  );
};
