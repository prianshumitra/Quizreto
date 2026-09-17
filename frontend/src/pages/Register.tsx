import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';

import { registerUser, loginUser } from '../api/auth';
import { useAuth } from '../context/AuthContext';

import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { QuizretoLogo } from '../components/ui/QuizretoLogo';

import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      await registerUser({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      const loginToken = await loginUser(email.trim(), password);

      await login(loginToken.access_token);

      navigate('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#6F2D2A] text-[#F5EBDD] flex flex-col relative overflow-hidden">

      {/* =====================================================
          BACKGROUND — TILTED DIARY / NOTEBOOK PAGES
      ===================================================== */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">

        {/* Page 1 */}
        <div
          className="
            absolute
            w-[620px]
            h-[900px]
            -top-[180px]
            -left-[260px]
            rotate-[-9deg]
            rounded-[4px]
            opacity-[0.10]
            border border-[#F5EBDD]/40
          "
          style={{
            backgroundColor: '#E8D7BC',
            backgroundImage: `
              repeating-linear-gradient(
                to bottom,
                transparent 0px,
                transparent 27px,
                rgba(111,45,42,0.18) 28px,
                transparent 29px
              ),
              linear-gradient(
                to right,
                transparent 0,
                transparent 58px,
                rgba(111,45,42,0.18) 59px,
                transparent 60px
              )
            `,
          }}
        />

        {/* Page 2 */}
        <div
          className="
            absolute
            w-[560px]
            h-[820px]
            top-[120px]
            right-[-240px]
            rotate-[8deg]
            rounded-[4px]
            opacity-[0.08]
            border border-[#F5EBDD]/40
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

        {/* Page 3 */}
        <div
          className="
            absolute
            w-[430px]
            h-[620px]
            bottom-[-250px]
            left-[20%]
            rotate-[5deg]
            rounded-[4px]
            opacity-[0.06]
            border border-[#F5EBDD]/30
          "
          style={{
            backgroundColor: '#E8D7BC',
            backgroundImage: `
              repeating-linear-gradient(
                to bottom,
                transparent 0px,
                transparent 28px,
                rgba(111,45,42,0.16) 29px,
                transparent 30px
              )
            `,
          }}
        />

        {/* Subtle paper grain */}
        <div
          className="absolute inset-0 opacity-[0.035]"
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


      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <div className="relative z-50">
        <Navbar />
      </div>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8">

        <div
          className="
            w-full
            max-w-5xl
            min-h-[620px]
            grid
            grid-cols-1
            lg:grid-cols-12
            overflow-hidden
            rounded-3xl
            border
            border-[#321B22]/20
            shadow-[0_25px_70px_rgba(35,10,15,0.30)]
          "
        >

          {/* =================================================
              LEFT — REGISTER FORM
          ================================================= */}

          <div
            className="
              lg:col-span-6
              p-7
              sm:p-10
              lg:p-12
              flex
              flex-col
              justify-between
            "
            style={{
              backgroundColor: '#D8C3A5',
            }}
          >

            <div>

              {/* Logo */}

              <Link
                to="/"
                className="inline-block mb-8"
              >
                <QuizretoLogo
                  size="md"
                  showTagline
                />
              </Link>


              {/* Heading */}

              <div className="space-y-2 mb-7">

                <p
                  className="
                    text-[11px]
                    uppercase
                    tracking-[0.22em]
                    font-semibold
                  "
                  style={{
                    color: '#8B3028',
                  }}
                >
                  Begin Your Journey
                </p>

                <h1
                  className="
                    font-serif
                    text-3xl
                    sm:text-4xl
                    font-bold
                    tracking-tight
                  "
                  style={{
                    color: '#321B22',
                  }}
                >
                  Create Account
                </h1>

                <p
                  className="
                    text-sm
                    leading-relaxed
                    max-w-sm
                  "
                  style={{
                    color: '#321B22',
                    opacity: 0.65,
                  }}
                >
                  Create your account and start exploring quizzes
                  across different subjects.
                </p>

              </div>


              {/* Error */}

              {error && (
                <div
                  className="
                    mb-6
                    p-3.5
                    rounded-xl
                    border
                    flex
                    items-start
                    gap-2.5
                    text-xs
                  "
                  style={{
                    backgroundColor: 'rgba(139,48,40,0.08)',
                    borderColor: 'rgba(139,48,40,0.22)',
                    color: '#7B2924',
                  }}
                >

                  <AlertCircle
                    className="w-4 h-4 shrink-0 mt-0.5"
                  />

                  <span>
                    {error}
                  </span>

                </div>
              )}


              {/* Form */}

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Prianshu Mitra"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  icon={<User className="w-4 h-4" />}
                  required
                />

                <Input
                  label="Email Address"
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
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={<Lock className="w-4 h-4" />}
                  required
                />


                {/* Submit */}

                <Button
                  variant="primary"
                  size="lg"
                  className="
                    w-full
                    !bg-[#7B3933]
                    hover:!bg-[#69302B]
                    !text-[#F5EBDD]
                    !border-0
                    !shadow-none
                  "
                  isLoading={isLoading}
                  type="submit"
                >
                  Create Account
                </Button>

              </form>

            </div>


            {/* Login Link */}

            <div
              className="
                text-center
                text-xs
                pt-5
                mt-7
                border-t
              "
              style={{
                color: '#321B22',
                borderColor: 'rgba(50,27,34,0.16)',
              }}
            >

              Already have an account?{' '}

              <Link
                to="/login"
                className="
                  font-bold
                  inline-flex
                  items-center
                  gap-1
                  hover:underline
                "
                style={{
                  color: '#8B3028',
                }}
              >
                Login

                <ArrowRight className="w-3 h-3" />

              </Link>

            </div>

          </div>


          {/* =================================================
              RIGHT — HERITAGE PANEL
          ================================================= */}

          <div
            className="
              hidden
              lg:flex
              lg:col-span-6
              relative
              p-10
              flex-col
              justify-between
              overflow-hidden
            "
            style={{
              backgroundColor: '#3A1F25',
            }}
          >

            {/* Architectural Glow */}

            <div
              className="
                absolute
                -top-32
                -right-24
                w-[420px]
                h-[420px]
                rounded-full
                blur-3xl
                opacity-20
              "
              style={{
                backgroundColor: '#D6A24A',
              }}
            />


            {/* Architectural Arches */}

            <div className="absolute inset-0 opacity-[0.16]">

              <div
                className="
                  absolute
                  w-[300px]
                  h-[470px]
                  border
                  rounded-t-[160px]
                  -right-20
                  top-20
                "
                style={{
                  borderColor: '#D6A24A',
                }}
              />

              <div
                className="
                  absolute
                  w-[220px]
                  h-[350px]
                  border
                  rounded-t-[120px]
                  right-20
                  top-36
                "
                style={{
                  borderColor: '#F5EBDD',
                }}
              />

              <div
                className="
                  absolute
                  w-[150px]
                  h-[250px]
                  border
                  rounded-t-[90px]
                  right-44
                  top-48
                "
                style={{
                  borderColor: '#D6A24A',
                }}
              />

            </div>


            {/* Decorative Vertical Lines */}

            <div className="absolute inset-y-0 left-12 w-px bg-[#F5EBDD]/[0.06]" />
            <div className="absolute inset-y-0 right-12 w-px bg-[#D6A24A]/[0.08]" />


            {/* Upper Content */}

            <div className="relative z-10 pt-12">

              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.3em]
                  mb-5
                "
                style={{
                  color: '#D6A24A',
                }}
              >
                Quizreto
              </p>

              <h2
                className="
                  font-serif
                  text-4xl
                  leading-tight
                  font-bold
                  max-w-sm
                "
                style={{
                  color: '#F5EBDD',
                }}
              >
                Curiosity
                <br />
                connects
                <br />
                cultures.
              </h2>

              <div
                className="
                  w-12
                  h-[2px]
                  mt-7
                  mb-6
                "
                style={{
                  backgroundColor: '#D6A24A',
                }}
              />

              <p
                className="
                  text-sm
                  leading-7
                  max-w-xs
                "
                style={{
                  color: '#F5EBDD',
                  opacity: 0.58,
                }}
              >
                A place to test what you know,
                discover what you don't, and keep
                learning along the way.
              </p>

            </div>


            {/* Bottom Quote */}

            <div
              className="
                relative
                z-10
                border-t
                pt-5
              "
              style={{
                borderColor: 'rgba(245,235,221,0.14)',
              }}
            >

              <p
                className="
                  font-serif
                  italic
                  text-sm
                  mb-2
                "
                style={{
                  color: '#F5EBDD',
                }}
              >
                Knowledge Has No Boundaries
              </p>

              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.18em]
                "
                style={{
                  color: '#D6A24A',
                }}
              >
                Quizreto
              </p>

            </div>

          </div>

        </div>

      </main>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div className="relative z-50">
        <Footer />
      </div>

    </div>
  );
};