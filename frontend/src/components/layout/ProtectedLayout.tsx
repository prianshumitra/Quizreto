import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Menu,
  User,
  Bell,
  Search,
  PlusCircle,
  X,
  CheckCircle2,
} from 'lucide-react';

import { Sidebar } from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import { getMyAttemptStats } from '../../api/attempts';

export const ProtectedLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const stats = await getMyAttemptStats();
        if (stats && stats.completed_attempts > 0) {
          setNotifications([
            `Great job! You have completed ${stats.completed_attempts} quiz assessments.`,
            `Your average score is ${stats.average_score} pts. Keep going!`,
          ]);
        } else {
          setNotifications(['Welcome to Quizreto! Start your first quiz.']);
        }
      } catch {
        // Ignore error
      }
    };

    fetchUserStats();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/explore');
    }
  };

  return (
    <div className="flex h-screen bg-[#6F2D2A] overflow-hidden">

      {/* =====================================================
          EXISTING BLUE SIDEBAR
          Kept exactly as before
      ===================================================== */}

      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />


      {/* =====================================================
          MAIN APPLICATION AREA
      ===================================================== */}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">


        {/* =================================================
            BACKGROUND — DIARY / NOTEBOOK PAGES
        ================================================= */}

        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">

          {/* Large left notebook page */}

          <div
            className="
              absolute
              w-[620px]
              h-[950px]
              -top-[250px]
              -left-[280px]
              rotate-[-8deg]
              rounded-[4px]
              opacity-[0.065]
              border
              border-[#F5EBDD]/40
            "
            style={{
              backgroundColor: '#E8D7BC',
              backgroundImage: `
                repeating-linear-gradient(
                  to bottom,
                  transparent 0px,
                  transparent 28px,
                  rgba(111,45,42,0.18) 29px,
                  transparent 30px
                ),
                linear-gradient(
                  to right,
                  transparent 0,
                  transparent 58px,
                  rgba(111,45,42,0.15) 59px,
                  transparent 60px
                )
              `,
            }}
          />

          {/* Right notebook page */}

          <div
            className="
              absolute
              w-[580px]
              h-[900px]
              -top-[180px]
              -right-[270px]
              rotate-[7deg]
              rounded-[4px]
              opacity-[0.05]
              border
              border-[#F5EBDD]/40
            "
            style={{
              backgroundColor: '#E8D7BC',
              backgroundImage: `
                repeating-linear-gradient(
                  to bottom,
                  transparent 0px,
                  transparent 30px,
                  rgba(111,45,42,0.17) 31px,
                  transparent 32px
                )
              `,
            }}
          />

          {/* Bottom page */}

          <div
            className="
              absolute
              w-[500px]
              h-[700px]
              -bottom-[350px]
              left-[25%]
              rotate-[5deg]
              rounded-[4px]
              opacity-[0.04]
              border
              border-[#F5EBDD]/30
            "
            style={{
              backgroundColor: '#E8D7BC',
              backgroundImage: `
                repeating-linear-gradient(
                  to bottom,
                  transparent 0px,
                  transparent 28px,
                  rgba(111,45,42,0.15) 29px,
                  transparent 30px
                )
              `,
            }}
          />

          {/* Paper grain */}

          <div
            className="absolute inset-0 opacity-[0.022]"
            style={{
              backgroundImage: `
                radial-gradient(
                  circle at 20% 30%,
                  #F5EBDD 0.7px,
                  transparent 0.8px
                ),
                radial-gradient(
                  circle at 70% 60%,
                  #F5EBDD 0.7px,
                  transparent 0.8px
                )
              `,
              backgroundSize: '9px 9px, 13px 13px',
            }}
          />

        </div>


        {/* =================================================
            TOP HEADER
        ================================================= */}

        <header
          className="
            relative
            z-30
            h-[64px]
            shrink-0
            flex
            items-center
            justify-between
            px-4
            sm:px-6
            lg:px-8
            border-b
            shadow-sm
          "
          style={{
            backgroundColor: '#321B22',
            borderColor: 'rgba(214,162,74,0.25)',
          }}
        >

          {/* Bottom gold accent */}

          <div
            className="
              absolute
              bottom-0
              left-0
              right-0
              h-[2px]
            "
            style={{
              backgroundColor: '#D6A24A',
              opacity: 0.55,
            }}
          />


          {/* =============================================
              LEFT HEADER
          ============================================= */}

          <div className="flex items-center gap-3 min-w-0">

            {/* Mobile menu */}

            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="
                lg:hidden
                w-9
                h-9
                rounded-lg
                flex
                items-center
                justify-center
                border
                transition-colors
              "
              style={{
                color: '#F5EBDD',
                borderColor: 'rgba(245,235,221,0.14)',
                backgroundColor: 'rgba(245,235,221,0.04)',
              }}
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>


            {/* Dynamic Search Form */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center">
              <div
                className="
                  flex
                  items-center
                  gap-2
                  px-3.5
                  py-1.5
                  rounded-full
                  border
                  transition-all
                  focus-within:border-[#D6A24A]/60
                  focus-within:bg-[#321B22]
                "
                style={{
                  borderColor: 'rgba(245,235,221,0.15)',
                  backgroundColor: 'rgba(245,235,221,0.04)',
                }}
              >
                <Search
                  className="w-3.5 h-3.5 shrink-0"
                  style={{ color: '#D6A24A' }}
                />
                <input
                  type="text"
                  placeholder="Search quizzes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-[11px] font-medium text-[#F5EBDD] placeholder-[#F5EBDD]/45 focus:outline-none w-40 lg:w-56"
                />
              </div>
            </form>
          </div>

          {/* =============================================
              RIGHT HEADER
          ============================================= */}
          <div className="flex items-center gap-2 sm:gap-3 relative">
            {/* New Quiz */}
            <button
              onClick={() => navigate('/create-quiz')}
              className="
                hidden
                sm:flex
                items-center
                gap-1.5
                px-3.5
                py-1.5
                rounded-full
                text-[11px]
                font-semibold
                transition-all
                hover:-translate-y-0.5
                shadow-sm
              "
              style={{
                backgroundColor: '#D6A24A',
                color: '#321B22',
              }}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>New Quiz</span>
            </button>

            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="
                  relative
                  w-9
                  h-9
                  rounded-full
                  flex
                  items-center
                  justify-center
                  border
                  transition-colors
                  hover:bg-[#F5EBDD]/[0.07]
                "
                style={{
                  color: 'rgba(245,235,221,0.75)',
                  borderColor: 'rgba(245,235,221,0.15)',
                }}
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {notifications.length > 0 && (
                  <span
                    className="
                      absolute
                      top-[7px]
                      right-[7px]
                      w-2
                      h-2
                      rounded-full
                      border
                    "
                    style={{
                      backgroundColor: '#D3542E',
                      borderColor: '#321B22',
                    }}
                  />
                )}
              </button>

              {/* Notifications Dropdown Panel */}
              {showNotifications && (
                <div
                  className="
                    absolute
                    right-0
                    mt-2
                    w-72
                    sm:w-80
                    rounded-2xl
                    bg-[#321B22]
                    border
                    border-[#D6A24A]/30
                    shadow-[0_15px_40px_rgba(0,0,0,0.5)]
                    p-4
                    z-50
                  "
                >
                  <div className="flex items-center justify-between pb-2.5 border-b border-[#F5EBDD]/10 mb-3">
                    <span className="text-xs font-bold text-[#F5EBDD]">Notifications</span>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-[#F5EBDD]/50 hover:text-[#F5EBDD]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {notifications.length > 0 ? (
                      notifications.map((note, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#3A1F25] border border-[#D6A24A]/15 text-xs text-[#F5EBDD]/85"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#D6A24A] shrink-0 mt-0.5" />
                          <span>{note}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-[#F5EBDD]/50 text-center py-2">
                        No new notifications
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>


            {/* Vertical separator */}

            <div
              className="
                hidden
                sm:block
                h-8
                w-px
              "
              style={{
                backgroundColor: 'rgba(245,235,221,0.14)',
              }}
            />


            {/* User */}

            <button
              onClick={() => navigate('/profile')}
              className="
                flex
                items-center
                gap-2.5
                group
                text-left
              "
            >

              <div className="relative shrink-0">

                <div
                  className="
                    w-9
                    h-9
                    rounded-full
                    flex
                    items-center
                    justify-center
                    font-bold
                    text-xs
                    border
                    transition-transform
                    group-hover:scale-105
                  "
                  style={{
                    backgroundColor: '#0F2D3D',
                    color: '#D6A24A',
                    borderColor: 'rgba(214,162,74,0.35)',
                  }}
                >

                  {user?.name ? (
                    user.name.charAt(0).toUpperCase()
                  ) : (
                    <User className="w-4 h-4" />
                  )}

                </div>


                <span
                  className="
                    absolute
                    bottom-0
                    right-0
                    w-2.5
                    h-2.5
                    rounded-full
                    border-2
                  "
                  style={{
                    backgroundColor: '#22C55E',
                    borderColor: '#321B22',
                  }}
                />

              </div>


              <div className="hidden md:block">

                <span
                  className="
                    block
                    text-[11px]
                    font-semibold
                    leading-tight
                    transition-colors
                    group-hover:text-[#D6A24A]
                  "
                  style={{
                    color: '#F5EBDD',
                  }}
                >
                  {user?.name || 'User'}
                </span>

                <span
                  className="
                    block
                    text-[9px]
                    mt-0.5
                    capitalize
                  "
                  style={{
                    color: '#D6A24A',
                  }}
                >
                  {user?.role || 'Learner'}
                </span>

              </div>

            </button>

          </div>

        </header>


        {/* =================================================
            SCROLLABLE CONTENT
        ================================================= */}

        <main
          className="
            relative
            z-10
            flex-1
            overflow-y-auto
          "
        >

          <div
            className="
              w-full
              max-w-[1440px]
              mx-auto
              px-4
              py-6
              sm:px-6
              sm:py-8
              lg:px-8
              lg:py-10
              xl:px-10
            "
          >

            <Outlet />

          </div>

        </main>

      </div>

    </div>
  );
};