import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, ArrowRight } from 'lucide-react';

import { loginUser } from '../api/auth';
import { useAuth } from '../context/AuthContext';

import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { QuizretoLogo } from '../components/ui/QuizretoLogo';

import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    setIsLoading(true);

    try {
      const data = await loginUser(email.trim(), password);
      await login(data.access_token);
      navigate('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#6F2D2A] flex flex-col relative overflow-hidden">

      {/* =====================================================
          DIARY / TILTED PAPER BACKGROUND
      ===================================================== */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">

        {/* Large tilted diary page - top left */}
        <div
          className="
            absolute
            w-[520px]
            h-[700px]
            -top-[280px]
            -left-[180px]
            rotate-[-18deg]
            rounded-[10px]
            border
            border-[#D8C3A5]/[0.10]
            bg-[#D8C3A5]/[0.035]
            shadow-[0_20px_50px_rgba(20,8,12,0.12)]
          "
        >
          <div className="absolute inset-8 border border-[#D8C3A5]/[0.05] rounded-md" />
        </div>


        {/* Large tilted diary page - top right */}
        <div
          className="
            absolute
            w-[480px]
            h-[680px]
            -top-[250px]
            -right-[170px]
            rotate-[16deg]
            rounded-[10px]
            border
            border-[#D8C3A5]/[0.10]
            bg-[#D8C3A5]/[0.03]
            shadow-[0_20px_50px_rgba(20,8,12,0.12)]
          "
        >
          <div className="absolute inset-8 border border-[#D8C3A5]/[0.05] rounded-md" />
        </div>


        {/* Middle left page */}
        <div
          className="
            absolute
            w-[420px]
            h-[620px]
            top-[180px]
            -left-[260px]
            rotate-[12deg]
            rounded-[8px]
            border
            border-[#D8C3A5]/[0.08]
            bg-[#D8C3A5]/[0.025]
          "
        />


        {/* Middle right page */}
        <div
          className="
            absolute
            w-[450px]
            h-[650px]
            top-[120px]
            -right-[280px]
            rotate-[-14deg]
            rounded-[8px]
            border
            border-[#D8C3A5]/[0.08]
            bg-[#D8C3A5]/[0.025]
          "
        />


        {/* Bottom left page */}
        <div
          className="
            absolute
            w-[500px]
            h-[680px]
            -bottom-[400px]
            -left-[120px]
            rotate-[20deg]
            rounded-[10px]
            border
            border-[#D8C3A5]/[0.08]
            bg-[#D8C3A5]/[0.025]
          "
        />


        {/* Bottom right page */}
        <div
          className="
            absolute
            w-[500px]
            h-[680px]
            -bottom-[400px]
            -right-[100px]
            rotate-[-18deg]
            rounded-[10px]
            border
            border-[#D8C3A5]/[0.08]
            bg-[#D8C3A5]/[0.025]
          "
        />


        {/* Notebook line texture */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.18]
          "
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 31px,
                rgba(216,195,165,0.055) 32px
              )
            `,
          }}
        />


        {/* Subtle paper grain */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.12]
          "
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                rgba(255,255,255,0.025) 0px,
                rgba(255,255,255,0.025) 1px,
                transparent 1px,
                transparent 4px
              ),
              repeating-linear-gradient(
                0deg,
                rgba(255,255,255,0.018) 0px,
                rgba(255,255,255,0.018) 1px,
                transparent 1px,
                transparent 5px
              )
            `,
          }}
        />

      </div>


      {/* ================= NAVBAR ================= */}

      <div className="relative z-50">
        <Navbar />
      </div>


      {/* ================= LOGIN AREA ================= */}

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">

        <div
          className="
            relative
            w-full
            max-w-5xl
            min-h-[620px]
            overflow-hidden
            rounded-[2rem]
            bg-[#D8C3A5]
            shadow-[0_30px_80px_rgba(20,8,12,0.40)]
            grid
            grid-cols-1
            lg:grid-cols-12
          "
        >

          {/* ==========================================
              LEFT — LOGIN FORM
          ========================================== */}

          <div
            className="
              lg:col-span-7
              p-7
              sm:p-10
              lg:p-12
              flex
              flex-col
              justify-between
            "
          >

            <div>

              {/* LOGO */}

              <Link
                to="/"
                className="
                  inline-block
                  mb-10
                  hover:opacity-80
                  transition-opacity
                "
              >
                <QuizretoLogo
                  size="md"
                  showTagline
                  variant="full"
                />
              </Link>


              {/* HEADING */}

              <div className="mb-7">

                <p
                  className="
                    text-[10px]
                    uppercase
                    tracking-[0.22em]
                    font-bold
                    text-[#8B3028]
                    mb-2
                  "
                >
                  Welcome back
                </p>

                <h1
                  className="
                    font-serif
                    text-3xl
                    sm:text-4xl
                    font-bold
                    text-[#321B22]
                  "
                >
                  Sign in to Quizreto
                </h1>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-[#321B22]/60
                  "
                >
                  Continue where you left off.
                </p>

              </div>


              {/* ERROR */}

              {error && (
                <div
                  className="
                    mb-6
                    p-3.5
                    rounded-xl
                    bg-[#A9442E]/[0.08]
                    border
                    border-[#A9442E]/25
                    text-[#7B2F29]
                    text-xs
                    flex
                    items-start
                    gap-2.5
                  "
                >

                  <AlertCircle
                    className="
                      w-4
                      h-4
                      text-[#A9442E]
                      shrink-0
                      mt-0.5
                    "
                  />

                  <span>{error}</span>

                </div>
              )}


              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail className="w-4 h-4" />}
                  required
                />


                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock className="w-4 h-4" />}
                  required
                />


                {/* FORGOT PASSWORD */}

                <div className="flex items-center justify-end text-xs">

                  <a
                    href="#forgot"
                    className="
                      font-semibold
                      text-[#A9442E]
                      hover:text-[#7B3933]
                      hover:underline
                    "
                  >
                    Forgot password?
                  </a>

                </div>


                {/* LOGIN */}

                <Button
                  variant="primary"
                  size="lg"
                  className="
                    w-full
                    !bg-[#7B3933]
                    hover:!bg-[#682E2A]
                    !text-[#F5EBDD]
                    !border-[#7B3933]
                    shadow-[0_8px_20px_rgba(59,31,37,0.20)]
                  "
                  isLoading={isLoading}
                  type="submit"
                >
                  Login
                </Button>


                {/* DIVIDER */}

                <div className="relative my-5 text-center">

                  <div className="absolute inset-0 flex items-center">

                    <div className="w-full border-t border-[#321B22]/15" />

                  </div>

                  <span
                    className="
                      relative
                      bg-[#D8C3A5]
                      px-3
                      text-[10px]
                      font-bold
                      uppercase
                      tracking-[0.16em]
                      text-[#321B22]/40
                    "
                  >
                    Or continue with
                  </span>

                </div>


                {/* GOOGLE */}

                <Button
                  variant="ghost"
                  type="button"
                  className="
                    w-full
                    border
                    border-[#321B22]/15
                    bg-transparent
                    hover:bg-[#321B22]/[0.05]
                    text-[#321B22]
                    text-xs
                  "
                  icon={
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                    >

                      <path
                        fill="#EA4335"
                        d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
                      />

                      <path
                        fill="#4285F4"
                        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                      />

                      <path
                        fill="#FBBC05"
                        d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.4 0 15.2c0 2.8.7 5.5 1.9 7.9l3.7-2.9c-.2-.7-.4-1.5-.4-2.3z"
                      />

                      <path
                        fill="#34A853"
                        d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                      />

                    </svg>
                  }
                >
                  Continue with Google
                </Button>

              </form>

            </div>


            {/* SIGN UP */}

            <div
              className="
                mt-8
                pt-5
                border-t
                border-[#321B22]/15
                text-center
                text-xs
                text-[#321B22]/60
              "
            >

              Don't have an account?{' '}

              <Link
                to="/register"
                className="
                  font-bold
                  text-[#A9442E]
                  hover:text-[#7B3933]
                  hover:underline
                  inline-flex
                  items-center
                  gap-1
                "
              >
                Sign Up

                <ArrowRight className="w-3 h-3" />

              </Link>

            </div>

          </div>


          {/* ==========================================
              RIGHT — BRAND PANEL
          ========================================== */}

          <div
            className="
              hidden
              lg:flex
              lg:col-span-5
              relative
              overflow-hidden
              bg-[#3A1F25]
              p-10
              flex-col
              justify-between
            "
          >

            {/* Texture */}

            <div
              className="
                absolute
                inset-0
                pointer-events-none
                opacity-60
              "
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    0deg,
                    rgba(255,255,255,0.025) 0px,
                    rgba(255,255,255,0.025) 1px,
                    transparent 1px,
                    transparent 5px
                  ),
                  repeating-linear-gradient(
                    90deg,
                    rgba(255,255,255,0.018) 0px,
                    rgba(255,255,255,0.018) 1px,
                    transparent 1px,
                    transparent 6px
                  )
                `,
              }}
            />


            {/* Gold glow */}

            <div
              className="
                absolute
                -top-20
                -right-20
                w-64
                h-64
                rounded-full
                bg-[#D6A24A]/15
                blur-[70px]
              "
            />


            {/* Decorative arches */}

            <div
              className="
                absolute
                right-[-50px]
                bottom-[-20px]
                w-[300px]
                h-[420px]
                rounded-t-[150px]
                border
                border-[#D6A24A]/20
              "
            />

            <div
              className="
                absolute
                right-[25px]
                bottom-[-10px]
                w-[220px]
                h-[350px]
                rounded-t-[120px]
                border
                border-[#E1B07A]/15
              "
            />

            <div
              className="
                absolute
                right-[105px]
                bottom-0
                w-[120px]
                h-[240px]
                rounded-t-[70px]
                border
                border-[#7FA6A0]/15
              "
            />


            {/* CONTENT */}

            <div className="relative z-10 pt-5">

              <span
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  font-semibold
                  text-[#E1B07A]
                "
              >

                <span className="w-7 h-px bg-[#D6A24A]" />

                Quizreto

              </span>


              <h2
                className="
                  mt-7
                  font-serif
                  text-4xl
                  xl:text-5xl
                  font-bold
                  leading-[1.05]
                  text-[#F5EBDD]
                "
              >

                Knowledge
                <br />

                has no
                <br />

                <span className="text-[#D6A24A]">
                  boundaries.
                </span>

              </h2>


              <p
                className="
                  mt-6
                  max-w-xs
                  text-sm
                  leading-6
                  text-[#F5EBDD]/55
                "
              >
                Explore quizzes across subjects,
                cultures and ideas. Learn something
                new every time you play.
              </p>

            </div>


            {/* BOTTOM */}

            <div
              className="
                relative
                z-10
                pt-5
                border-t
                border-[#F5EBDD]/10
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p
                    className="
                      font-serif
                      italic
                      text-sm
                      text-[#F5EBDD]/75
                    "
                  >
                    Test yourself.
                  </p>

                  <p
                    className="
                      mt-1
                      text-[10px]
                      uppercase
                      tracking-[0.16em]
                      text-[#E1B07A]
                    "
                  >
                    Learn · Explore · Discover
                  </p>

                </div>


                <div
                  className="
                    w-10
                    h-10
                    rounded-full
                    border
                    border-[#D6A24A]/35
                    flex
                    items-center
                    justify-center
                  "
                >

                  <ArrowRight
                    className="
                      w-4
                      h-4
                      text-[#D6A24A]
                    "
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>


      {/* ================= FOOTER ================= */}

      <div className="relative z-50">
        <Footer />
      </div>

    </div>
  );
};