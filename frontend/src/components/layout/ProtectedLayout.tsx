import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Menu,
  Sparkles,
  User,
  Bell,
  Search,
  Flame,
  PlusCircle,
} from 'lucide-react';

import { Sidebar } from './Sidebar';
import { useAuth } from '../../context/AuthContext';

export const ProtectedLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

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


            {/* Workspace label */}

            <div
              className="
                hidden
                sm:flex
                items-center
                gap-2
                px-3.5
                py-1.5
                rounded-full
                border
              "
              style={{
                color: '#D6A24A',
                borderColor: 'rgba(214,162,74,0.28)',
                backgroundColor: 'rgba(214,162,74,0.06)',
              }}
            >

              <Sparkles className="w-3.5 h-3.5" />

              <span className="text-[11px] font-semibold tracking-wide">
                Quizreto Learning Workspace
              </span>

            </div>


            {/* Search */}

            <button
              onClick={() => navigate('/explore')}
              className="
                hidden
                md:flex
                items-center
                gap-2
                px-3.5
                py-1.5
                rounded-full
                border
                transition-all
                hover:bg-[#F5EBDD]/[0.07]
              "
              style={{
                color: 'rgba(245,235,221,0.55)',
                borderColor: 'rgba(245,235,221,0.12)',
                backgroundColor: 'rgba(245,235,221,0.035)',
              }}
            >

              <Search
                className="w-3.5 h-3.5"
                style={{
                  color: '#D6A24A',
                }}
              />

              <span className="text-[11px] font-medium">
                Search quizzes...
              </span>

            </button>

          </div>


          {/* =============================================
              RIGHT HEADER
          ============================================= */}

          <div className="flex items-center gap-2 sm:gap-3">

            {/* Streak */}

            <div
              className="
                hidden
                sm:flex
                items-center
                gap-1.5
                px-3
                py-1.5
                rounded-full
                border
              "
              style={{
                color: '#D6A24A',
                borderColor: 'rgba(214,162,74,0.25)',
                backgroundColor: 'rgba(214,162,74,0.06)',
              }}
            >

              <Flame
                className="w-3.5 h-3.5"
                fill="#D6A24A"
              />

              <span className="text-[11px] font-semibold">
                5 Day Streak
              </span>

            </div>


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
              "
              style={{
                backgroundColor: '#D6A24A',
                color: '#321B22',
              }}
            >

              <PlusCircle className="w-3.5 h-3.5" />

              <span>New Quiz</span>

            </button>


            {/* Notifications */}

            <button
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
                color: 'rgba(245,235,221,0.65)',
                borderColor: 'rgba(245,235,221,0.12)',
              }}
              aria-label="Notifications"
            >

              <Bell className="w-4 h-4" />

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

            </button>


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