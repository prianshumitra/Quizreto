import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Compass,
  LayoutDashboard,
  LogIn,
  UserPlus,
  Menu,
  X,
  ClipboardList,
  PlusCircle,
  ChevronRight,
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/Button';
import { QuizretoLogo } from '../ui/QuizretoLogo';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }

    return location.pathname.startsWith(path);
  };

  const closeMobile = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full">

      <div
        className="
          relative
          w-full
          border-b
          border-[#D6A24A]/15
          shadow-[0_8px_25px_rgba(25,8,12,0.22)]
        "
        style={{
          backgroundColor: '#321B22',
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              rgba(255,255,255,0.018) 0px,
              rgba(255,255,255,0.018) 1px,
              transparent 1px,
              transparent 5px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255,255,255,0.012) 0px,
              rgba(255,255,255,0.012) 1px,
              transparent 1px,
              transparent 6px
            )
          `,
        }}
      >

        {/* ==========================================
            NAVBAR CONTENT
        ========================================== */}

        <div className="relative max-w-7xl mx-auto h-[78px] px-4 sm:px-6 lg:px-8 flex items-center">

          {/* LOGO */}

          <Link
            to="/"
            onClick={closeMobile}
            className="shrink-0 flex items-center group"
          >
            <div className="transition-transform duration-200 group-hover:scale-[1.02]">
              <QuizretoLogo
                size="md"
                showTagline={false}
              />
            </div>
          </Link>


          {/* ==========================================
              DESKTOP NAVIGATION
          ========================================== */}

          <nav className="hidden md:flex items-center ml-auto mr-5 lg:mr-7">

            {/* HOME */}

            <Link
              to="/"
              className={`
                group
                relative
                flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-lg
                text-sm
                font-medium
                transition-all
                duration-200

                ${isActive('/')
                  ? 'text-[#F5EBDD] bg-[#F5EBDD]/[0.07]'
                  : 'text-[#F5EBDD]/65 hover:text-[#F5EBDD] hover:bg-[#F5EBDD]/[0.05]'
                }
              `}
            >
              Home

              {isActive('/') && (
                <span
                  className="
                    absolute
                    left-4
                    right-4
                    bottom-0
                    h-[2px]
                    rounded-full
                    bg-[#D6A24A]
                  "
                />
              )}
            </Link>


            {/* EXPLORE */}

            <Link
              to="/explore"
              className={`
                group
                relative
                flex
                items-center
                gap-2
                px-4
                py-2.5
                rounded-lg
                text-sm
                font-medium
                transition-all
                duration-200

                ${isActive('/explore')
                  ? 'text-[#F5EBDD] bg-[#F5EBDD]/[0.07]'
                  : 'text-[#F5EBDD]/65 hover:text-[#F5EBDD] hover:bg-[#F5EBDD]/[0.05]'
                }
              `}
            >

              <Compass className="w-4 h-4" />

              Explore

              {isActive('/explore') && (
                <span
                  className="
                    absolute
                    left-4
                    right-4
                    bottom-0
                    h-[2px]
                    rounded-full
                    bg-[#D6A24A]
                  "
                />
              )}

            </Link>


            {/* AUTHENTICATED LINKS */}

            {isAuthenticated && (
              <>

                {/* DASHBOARD */}

                <Link
                  to="/dashboard"
                  className={`
                    relative
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2.5
                    rounded-lg
                    text-sm
                    font-medium
                    transition-all
                    duration-200

                    ${isActive('/dashboard')
                      ? 'text-[#F5EBDD] bg-[#F5EBDD]/[0.07]'
                      : 'text-[#F5EBDD]/65 hover:text-[#F5EBDD] hover:bg-[#F5EBDD]/[0.05]'
                    }
                  `}
                >

                  <LayoutDashboard className="w-4 h-4" />

                  Dashboard

                  {isActive('/dashboard') && (
                    <span
                      className="
                        absolute
                        left-4
                        right-4
                        bottom-0
                        h-[2px]
                        rounded-full
                        bg-[#D6A24A]
                      "
                    />
                  )}

                </Link>


                {/* MY ATTEMPTS */}

                <Link
                  to="/my-attempts"
                  className={`
                    relative
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2.5
                    rounded-lg
                    text-sm
                    font-medium
                    transition-all
                    duration-200

                    ${isActive('/my-attempts')
                      ? 'text-[#F5EBDD] bg-[#F5EBDD]/[0.07]'
                      : 'text-[#F5EBDD]/65 hover:text-[#F5EBDD] hover:bg-[#F5EBDD]/[0.05]'
                    }
                  `}
                >

                  <ClipboardList className="w-4 h-4" />

                  My Attempts

                  {isActive('/my-attempts') && (
                    <span
                      className="
                        absolute
                        left-4
                        right-4
                        bottom-0
                        h-[2px]
                        rounded-full
                        bg-[#D6A24A]
                      "
                    />
                  )}

                </Link>


                {/* CREATE QUIZ */}

                <Link
                  to="/create-quiz"
                  className={`
                    relative
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2.5
                    rounded-lg
                    text-sm
                    font-medium
                    transition-all
                    duration-200

                    ${isActive('/create-quiz')
                      ? 'text-[#F5EBDD] bg-[#F5EBDD]/[0.07]'
                      : 'text-[#F5EBDD]/65 hover:text-[#F5EBDD] hover:bg-[#F5EBDD]/[0.05]'
                    }
                  `}
                >

                  <PlusCircle className="w-4 h-4" />

                  Create Quiz

                  {isActive('/create-quiz') && (
                    <span
                      className="
                        absolute
                        left-4
                        right-4
                        bottom-0
                        h-[2px]
                        rounded-full
                        bg-[#D6A24A]
                      "
                    />
                  )}

                </Link>

              </>
            )}

          </nav>


          {/* ==========================================
              DESKTOP AUTH AREA
          ========================================== */}

          <div className="hidden md:flex items-center gap-2">

            {!isAuthenticated ? (
              <>

                {/* LOGIN */}

                <Link
                  to="/login"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2.5
                    rounded-lg
                    text-sm
                    font-medium
                    text-[#F5EBDD]/75
                    hover:text-[#F5EBDD]
                    hover:bg-[#F5EBDD]/[0.06]
                    transition-all
                    duration-200
                  "
                >

                  <LogIn className="w-4 h-4" />

                  Login

                </Link>


                {/* SIGN UP */}

                <Link to="/register">

                  <button
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      px-5
                      py-2.5
                      rounded-lg
                      bg-[#D6A24A]
                      text-[#321B22]
                      text-sm
                      font-semibold
                      shadow-[0_4px_14px_rgba(214,162,74,0.15)]
                      transition-all
                      duration-200
                      hover:bg-[#E3B663]
                      hover:-translate-y-0.5
                    "
                  >

                    <UserPlus className="w-4 h-4" />

                    Sign Up

                  </button>

                </Link>

              </>

            ) : (

              /* PROFILE */

              <Link
                to="/profile"
                className="
                  group
                  flex
                  items-center
                  gap-3
                  pl-2
                  pr-3
                  py-1.5
                  rounded-xl
                  border
                  border-[#F5EBDD]/10
                  bg-[#F5EBDD]/[0.04]
                  hover:bg-[#F5EBDD]/[0.08]
                  transition-all
                  duration-200
                "
              >

                <div
                  className="
                    w-8
                    h-8
                    rounded-lg
                    bg-[#D6A24A]
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >

                  <span className="text-xs font-bold text-[#321B22]">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>

                </div>


                <div className="hidden lg:block text-left">

                  <p className="text-xs font-semibold text-[#F5EBDD] leading-none">
                    {user?.name?.split(' ')[0] || 'User'}
                  </p>

                  <p className="mt-1 text-[10px] text-[#F5EBDD]/40">
                    View profile
                  </p>

                </div>


                <ChevronRight
                  className="
                    w-3.5
                    h-3.5
                    text-[#F5EBDD]/30
                    group-hover:text-[#D6A24A]
                    transition-colors
                  "
                />

              </Link>

            )}

          </div>


          {/* ==========================================
              MOBILE MENU BUTTON
          ========================================== */}

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="
              md:hidden
              ml-auto
              w-10
              h-10
              rounded-lg
              border
              border-[#F5EBDD]/10
              bg-[#F5EBDD]/[0.05]
              flex
              items-center
              justify-center
              text-[#F5EBDD]
              hover:bg-[#F5EBDD]/[0.09]
              transition-colors
            "
            aria-label={
              mobileOpen
                ? 'Close navigation'
                : 'Open navigation'
            }
            aria-expanded={mobileOpen}
          >

            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}

          </button>

        </div>


        {/* ==========================================
            MOBILE NAVIGATION
        ========================================== */}

        {mobileOpen && (

          <div className="md:hidden border-t border-[#F5EBDD]/[0.07] bg-[#29171D]">

            <nav className="px-4 py-4 space-y-1">

              {/* HOME */}

              <Link
                to="/"
                onClick={closeMobile}
                className={`
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  text-sm
                  font-medium

                  ${isActive('/')
                    ? 'bg-[#F5EBDD]/[0.08] text-[#F5EBDD]'
                    : 'text-[#F5EBDD]/65 hover:bg-[#F5EBDD]/[0.05] hover:text-[#F5EBDD]'
                  }
                `}
              >

                <span className="w-2 h-2 rounded-full bg-[#D6A24A]" />

                Home

              </Link>


              {/* EXPLORE */}

              <Link
                to="/explore"
                onClick={closeMobile}
                className={`
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  text-sm
                  font-medium

                  ${isActive('/explore')
                    ? 'bg-[#F5EBDD]/[0.08] text-[#F5EBDD]'
                    : 'text-[#F5EBDD]/65 hover:bg-[#F5EBDD]/[0.05] hover:text-[#F5EBDD]'
                  }
                `}
              >

                <Compass className="w-4 h-4" />

                Explore

              </Link>


              {/* AUTHENTICATED MOBILE LINKS */}

              {isAuthenticated && (
                <>

                  {/* DASHBOARD */}

                  <Link
                    to="/dashboard"
                    onClick={closeMobile}
                    className={`
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      rounded-xl
                      text-sm
                      font-medium

                      ${isActive('/dashboard')
                        ? 'bg-[#F5EBDD]/[0.08] text-[#F5EBDD]'
                        : 'text-[#F5EBDD]/65 hover:bg-[#F5EBDD]/[0.05] hover:text-[#F5EBDD]'
                      }
                    `}
                  >

                    <LayoutDashboard className="w-4 h-4" />

                    Dashboard

                  </Link>


                  {/* MY ATTEMPTS */}

                  <Link
                    to="/my-attempts"
                    onClick={closeMobile}
                    className={`
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      rounded-xl
                      text-sm
                      font-medium

                      ${isActive('/my-attempts')
                        ? 'bg-[#F5EBDD]/[0.08] text-[#F5EBDD]'
                        : 'text-[#F5EBDD]/65 hover:bg-[#F5EBDD]/[0.05] hover:text-[#F5EBDD]'
                      }
                    `}
                  >

                    <ClipboardList className="w-4 h-4" />

                    My Attempts

                  </Link>


                  {/* CREATE QUIZ */}

                  <Link
                    to="/create-quiz"
                    onClick={closeMobile}
                    className={`
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      rounded-xl
                      text-sm
                      font-medium

                      ${isActive('/create-quiz')
                        ? 'bg-[#F5EBDD]/[0.08] text-[#F5EBDD]'
                        : 'text-[#F5EBDD]/65 hover:bg-[#F5EBDD]/[0.05] hover:text-[#F5EBDD]'
                      }
                    `}
                  >

                    <PlusCircle className="w-4 h-4" />

                    Create Quiz

                  </Link>


                  {/* PROFILE */}

                  <Link
                    to="/profile"
                    onClick={closeMobile}
                    className="
                      mt-2
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      rounded-xl
                      border
                      border-[#F5EBDD]/10
                      bg-[#F5EBDD]/[0.04]
                      text-[#F5EBDD]/70
                    "
                  >

                    <div
                      className="
                        w-8
                        h-8
                        rounded-lg
                        bg-[#D6A24A]
                        flex
                        items-center
                        justify-center
                      "
                    >

                      <span className="text-xs font-bold text-[#321B22]">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>

                    </div>


                    <div>

                      <p className="text-sm font-semibold text-[#F5EBDD]">
                        {user?.name || 'User'}
                      </p>

                      <p className="text-xs text-[#F5EBDD]/40">
                        View profile
                      </p>

                    </div>

                  </Link>

                </>
              )}


              {/* LOGGED OUT MOBILE */}

              {!isAuthenticated && (

                <div className="pt-3 mt-3 border-t border-[#F5EBDD]/[0.07]">

                  {/* LOGIN */}

                  <Link
                    to="/login"
                    onClick={closeMobile}
                    className="
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      rounded-xl
                      text-sm
                      font-medium
                      text-[#F5EBDD]/70
                      hover:bg-[#F5EBDD]/[0.05]
                      hover:text-[#F5EBDD]
                    "
                  >

                    <LogIn className="w-4 h-4" />

                    Login

                  </Link>


                  {/* REGISTER */}

                  <Link
                    to="/register"
                    onClick={closeMobile}
                    className="
                      mt-1
                      flex
                      items-center
                      justify-center
                      gap-2
                      px-4
                      py-3
                      rounded-xl
                      bg-[#D6A24A]
                      text-[#321B22]
                      text-sm
                      font-semibold
                    "
                  >

                    <UserPlus className="w-4 h-4" />

                    Create Account

                  </Link>

                </div>

              )}

            </nav>

          </div>

        )}


        {/* ==========================================
            GOLD ACCENT LINE
        ========================================== */}

        <div
          className="h-[2px] w-full bg-[#D6A24A]"
          style={{ opacity: 0.65 }}
        />

      </div>

    </header>
  );
};