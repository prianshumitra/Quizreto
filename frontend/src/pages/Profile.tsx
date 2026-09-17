import React, { useEffect, useState } from 'react';
import { User, Mail, Shield, Calendar, LogOut, Trophy, CheckSquare, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getMyAttemptStats } from '../api/attempts';
import type { AttemptStatsResponse } from '../types/api';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
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
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Profile Banner */}
      <div className="bg-[#FFFDF9] p-8 sm:p-10 rounded-3xl border border-[#E7DBCC] relative overflow-hidden shadow-sm">
        <MandalaPattern className="absolute -top-10 -right-10 w-80 h-80 text-[#D3542E] opacity-15" />

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          <div className="w-24 h-24 rounded-3xl bg-[#0F2D3D] text-[#F4A261] font-serif font-bold text-4xl flex items-center justify-center shadow-lg border-2 border-[#F4A261]/30 shrink-0">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>

          <div className="space-y-3 text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <Badge variant="terracotta" size="md" className="capitalize">
                {user?.role || 'Learner'}
              </Badge>
              <Badge variant="saffron" size="md">
                Verified Quizreto Member
              </Badge>
            </div>

            <h1 className="font-serif text-3xl font-extrabold text-[#0F2D3D]">
              {user?.name || 'User Profile'}
            </h1>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-medium text-[#1F2937]/70">
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-[#D3542E]" />
                {user?.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#0F2D3D]" />
                Joined {formattedDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Account Details Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#0F2D3D] flex items-center gap-2 border-b border-[#E7DBCC]/60 pb-3">
            <User className="w-5 h-5 text-[#D3542E]" />
            Personal Information
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-[#0F2D3D]/60 uppercase tracking-wider font-semibold block">Full Name</span>
              <span className="text-sm font-bold text-[#0F2D3D]">{user?.name}</span>
            </div>
            <div>
              <span className="text-[#0F2D3D]/60 uppercase tracking-wider font-semibold block">Email Address</span>
              <span className="text-sm font-bold text-[#0F2D3D]">{user?.email}</span>
            </div>
            <div>
              <span className="text-[#0F2D3D]/60 uppercase tracking-wider font-semibold block">User ID</span>
              <span className="text-sm font-mono text-[#0F2D3D]">#{user?.id}</span>
            </div>
          </div>
        </Card>

        <Card className="space-y-4">
          <h3 className="font-serif text-lg font-bold text-[#0F2D3D] flex items-center gap-2 border-b border-[#E7DBCC]/60 pb-3">
            <Shield className="w-5 h-5 text-[#D3542E]" />
            Security & Session
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-[#0F2D3D]/60 uppercase tracking-wider font-semibold block">Account Role</span>
              <span className="text-sm font-bold text-[#0F2D3D] capitalize">{user?.role || 'User'}</span>
            </div>
            <div>
              <span className="text-[#0F2D3D]/60 uppercase tracking-wider font-semibold block">Authentication</span>
              <span className="text-sm font-bold text-emerald-600">JWT Token Active</span>
            </div>
            <div className="pt-2">
              <Button variant="danger" size="sm" icon={<LogOut className="w-4 h-4" />} onClick={logout}>
                Log Out of Account
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Performance Summary Stats */}
      {stats && (
        <div className="space-y-4">
          <h3 className="font-serif text-xl font-bold text-[#0F2D3D]">Performance Summary</h3>
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
