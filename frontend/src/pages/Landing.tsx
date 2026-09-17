import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Landmark,
  Atom,
  Laptop,
  Scroll,
  Globe,
  History,
  Check,
} from 'lucide-react';

import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';

export const Landing: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCTA = () => {
    if (isAuthenticated) {
      navigate('/explore');
    } else {
      navigate('/register');
    }
  };

  const categories = [
    {
      title: 'Indian Constitution',
      desc: 'Polity, governance & fundamental rights',
      icon: Landmark,
      accent: '#D6A24A',
      tag: 'Polity',
    },
    {
      title: 'General Science',
      desc: 'Physics, chemistry, biology & space',
      icon: Atom,
      accent: '#7FA6A0',
      tag: 'Science',
    },
    {
      title: 'Bengali Literature',
      desc: 'Poetry, classics & literary culture',
      icon: Scroll,
      accent: '#D6A24A',
      tag: 'Literature',
    },
    {
      title: 'Tech Trivia',
      desc: 'Programming, web & technology',
      icon: Laptop,
      accent: '#7FA6A0',
      tag: 'Technology',
    },
    {
      title: 'Indian History',
      desc: 'Civilizations, movements & heritage',
      icon: History,
      accent: '#D6A24A',
      tag: 'History',
    },
    {
      title: 'World Geography',
      desc: 'Countries, places & the natural world',
      icon: Globe,
      accent: '#7FA6A0',
      tag: 'Geography',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#6F2D2A] text-[#F5EBDD] relative overflow-hidden">

      {/* =====================================================
          VERY BACKGROUND — DIARY / TILTED PAPER TEXTURE
      ===================================================== */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">

        {/* Large diary page — top left */}
        <div
          className="
            absolute
            w-[520px]
            h-[700px]
            -top-[300px]
            -left-[190px]
            rotate-[-18deg]
            rounded-[10px]
            border
            border-[#D8C3A5]/[0.09]
            bg-[#D8C3A5]/[0.025]
          "
        >
          <div className="absolute inset-8 rounded-md border border-[#D8C3A5]/[0.045]" />

          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent 0px,
                  transparent 31px,
                  rgba(216,195,165,0.05) 32px
                )
              `,
            }}
          />
        </div>


        {/* Large diary page — top right */}
        <div
          className="
            absolute
            w-[500px]
            h-[720px]
            -top-[310px]
            -right-[200px]
            rotate-[17deg]
            rounded-[10px]
            border
            border-[#D8C3A5]/[0.09]
            bg-[#D8C3A5]/[0.022]
          "
        >
          <div className="absolute inset-8 rounded-md border border-[#D8C3A5]/[0.045]" />

          <div
            className="absolute inset-0 opacity-[0.3]"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent 0px,
                  transparent 31px,
                  rgba(216,195,165,0.045) 32px
                )
              `,
            }}
          />
        </div>


        {/* Middle left diary page */}
        <div
          className="
            absolute
            w-[440px]
            h-[650px]
            top-[160px]
            -left-[290px]
            rotate-[13deg]
            rounded-[10px]
            border
            border-[#D8C3A5]/[0.065]
            bg-[#D8C3A5]/[0.018]
          "
        />


        {/* Middle right diary page */}
        <div
          className="
            absolute
            w-[450px]
            h-[660px]
            top-[140px]
            -right-[300px]
            rotate-[-14deg]
            rounded-[10px]
            border
            border-[#D8C3A5]/[0.065]
            bg-[#D8C3A5]/[0.018]
          "
        />


        {/* Bottom left diary page */}
        <div
          className="
            absolute
            w-[520px]
            h-[700px]
            -bottom-[430px]
            -left-[130px]
            rotate-[19deg]
            rounded-[10px]
            border
            border-[#D8C3A5]/[0.07]
            bg-[#D8C3A5]/[0.02]
          "
        />


        {/* Bottom right diary page */}
        <div
          className="
            absolute
            w-[520px]
            h-[700px]
            -bottom-[430px]
            -right-[130px]
            rotate-[-18deg]
            rounded-[10px]
            border
            border-[#D8C3A5]/[0.07]
            bg-[#D8C3A5]/[0.02]
          "
        />


        {/* Subtle notebook ruling across background */}
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                transparent 0px,
                transparent 34px,
                rgba(216,195,165,0.045) 35px
              )
            `,
          }}
        />


        {/* Very subtle paper grain */}
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                rgba(255,255,255,0.025) 0px,
                rgba(255,255,255,0.025) 1px,
                transparent 1px,
                transparent 5px
              ),
              repeating-linear-gradient(
                0deg,
                rgba(255,255,255,0.018) 0px,
                rgba(255,255,255,0.018) 1px,
                transparent 1px,
                transparent 6px
              )
            `,
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
          MAIN CONTENT
      ===================================================== */}

      <main className="relative z-10">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="px-4 sm:px-6 lg:px-8 pt-7 sm:pt-9">

          <div
            className="
              relative
              max-w-7xl
              mx-auto
              overflow-hidden
              rounded-[2rem]
              bg-[#3A1F25]
              text-[#F5EBDD]
              shadow-[0_20px_50px_rgba(45,15,18,0.30)]
            "
          >

            {/* Fabric texture */}

            <div
              className="absolute inset-0 pointer-events-none opacity-50"
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


            {/* Warm glow */}

            <div
              className="
                absolute
                -top-24
                right-24
                w-72
                h-72
                rounded-full
                bg-[#D6A24A]/20
                blur-[90px]
                pointer-events-none
              "
            />


            {/* Architectural background */}

            <div className="absolute inset-0 pointer-events-none">

              <div
                className="
                  absolute
                  right-[5%]
                  bottom-0
                  w-[275px]
                  h-[390px]
                  rounded-t-[150px]
                  border
                  border-[#D6A24A]/25
                "
              />

              <div
                className="
                  absolute
                  right-[9%]
                  bottom-0
                  w-[210px]
                  h-[325px]
                  rounded-t-[115px]
                  border
                  border-[#E1B07A]/20
                "
              />

              <div
                className="
                  absolute
                  right-[33%]
                  bottom-0
                  w-[155px]
                  h-[245px]
                  rounded-t-[90px]
                  border
                  border-[#7FA6A0]/20
                "
              />

              <div
                className="
                  absolute
                  right-[13%]
                  top-[22%]
                  w-8
                  h-8
                  rounded-full
                  bg-[#D6A24A]/40
                "
              />

              <div
                className="
                  absolute
                  right-[29%]
                  top-[18%]
                  w-5
                  h-5
                  rotate-45
                  border
                  border-[#D6A24A]/30
                "
              />

              <div
                className="
                  absolute
                  bottom-[22px]
                  left-0
                  right-0
                  h-px
                  bg-[#D6A24A]/20
                "
              />

            </div>


            {/* Hero content */}

            <div
              className="
                relative
                z-10
                grid
                lg:grid-cols-[1fr_0.85fr]
                items-center
                gap-8
                lg:gap-4
                px-7
                sm:px-10
                lg:px-14
                py-12
                sm:py-14
                lg:py-16
              "
            >

              {/* LEFT */}

              <div className="max-w-xl">

                <div className="flex items-center gap-3 mb-5">

                  <span className="w-8 h-px bg-[#D6A24A]" />

                  <p className="text-sm font-semibold tracking-wide text-[#E1B07A]">
                    QuizReto
                  </p>

                </div>


                <h1
                  className="
                    font-serif
                    text-[3.4rem]
                    sm:text-6xl
                    lg:text-[4.8rem]
                    font-bold
                    leading-[0.94]
                    tracking-tight
                  "
                >
                  Test Your
                  <br />
                  Knowledge.
                  <br />

                  <span className="text-[#D6A24A]">
                    Explore More.
                  </span>
                </h1>


                <p
                  className="
                    mt-6
                    max-w-lg
                    text-base
                    sm:text-lg
                    leading-7
                    text-[#F5EBDD]/70
                  "
                >
                  Quizzes for curious minds.
                  <br />
                  From History to Tech, from Bengal to the World.
                </p>


                <div className="mt-7 flex flex-col sm:flex-row gap-3">

                  <button
                    onClick={handleCTA}
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-[#D6A24A]
                      px-6
                      py-3.5
                      text-sm
                      font-semibold
                      text-[#3A1F25]
                      shadow-[0_8px_22px_rgba(214,162,74,0.20)]
                      transition-all
                      duration-200
                      hover:bg-[#E3B663]
                      hover:-translate-y-0.5
                    "
                  >
                    Explore Quizzes
                    <ArrowRight className="w-4 h-4" />
                  </button>


                  <Link
                    to="/explore"
                    className="
                      inline-flex
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-[#F5EBDD]/20
                      bg-[#F5EBDD]/[0.05]
                      px-6
                      py-3.5
                      text-sm
                      font-semibold
                      text-[#F5EBDD]
                      transition-colors
                      duration-200
                      hover:bg-[#F5EBDD]/[0.10]
                    "
                  >
                    Browse Categories
                  </Link>

                </div>


                <div className="mt-8 flex items-center gap-3">

                  <span className="w-2 h-2 rounded-full bg-[#7FA6A0]" />

                  <span className="text-xs text-[#F5EBDD]/40">
                    Learn something. Test yourself. Keep going.
                  </span>

                </div>

              </div>


              {/* RIGHT — QUIZ CARD */}

              <div className="relative hidden lg:flex items-center justify-center min-h-[400px]">

                <div
                  className="
                    absolute
                    bottom-0
                    right-10
                    w-[285px]
                    h-[365px]
                    rounded-t-[145px]
                    border
                    border-[#D6A24A]/20
                  "
                />


                <div
                  className="
                    relative
                    z-10
                    w-[290px]
                    rounded-2xl
                    bg-[#F5EBDD]
                    p-6
                    text-[#3A1F25]
                    shadow-[0_25px_55px_rgba(0,0,0,0.30)]
                    rotate-[1deg]
                  "
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8E493F]">
                        Quick Quiz
                      </p>

                      <p className="mt-1 text-xs text-[#3A1F25]/45">
                        General Knowledge
                      </p>

                    </div>


                    <div
                      className="
                        w-9
                        h-9
                        rounded-full
                        bg-[#D6A24A]/15
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <span className="font-serif font-bold text-[#A86F24]">
                        ?
                      </span>
                    </div>

                  </div>


                  <div className="mt-7">

                    <p className="text-[10px] uppercase tracking-wider text-[#3A1F25]/40">
                      Question 01
                    </p>

                    <h3 className="mt-2 font-serif text-xl font-bold leading-snug">
                      Which city is known as the{' '}
                      <span className="text-[#3E7775]">
                        City of Joy?
                      </span>
                    </h3>

                  </div>


                  <div className="mt-6 space-y-2.5">

                    <div className="flex items-center gap-3 rounded-lg border border-[#CDBBA6] bg-white/40 px-3 py-2.5">

                      <span className="w-6 h-6 rounded-full border border-[#B49F88] flex items-center justify-center text-[10px] font-semibold">
                        A
                      </span>

                      <span className="text-xs font-medium">
                        Mumbai
                      </span>

                    </div>


                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        rounded-lg
                        border
                        border-[#3E7775]/35
                        bg-[#3E7775]/[0.09]
                        px-3
                        py-2.5
                      "
                    >

                      <span
                        className="
                          w-6
                          h-6
                          rounded-full
                          bg-[#3E7775]
                          text-white
                          flex
                          items-center
                          justify-center
                          text-[10px]
                          font-semibold
                        "
                      >
                        B
                      </span>

                      <span className="text-xs font-semibold">
                        Kolkata
                      </span>

                      <Check className="ml-auto w-4 h-4 text-[#3E7775]" />

                    </div>


                    <div className="flex items-center gap-3 rounded-lg border border-[#CDBBA6] bg-white/40 px-3 py-2.5">

                      <span className="w-6 h-6 rounded-full border border-[#B49F88] flex items-center justify-center text-[10px] font-semibold">
                        C
                      </span>

                      <span className="text-xs font-medium">
                        Delhi
                      </span>

                    </div>

                  </div>


                  <div className="mt-6 pt-4 border-t border-[#CDBBA6] flex items-center justify-between">

                    <span className="text-[10px] text-[#3A1F25]/40">
                      1 of 10 questions
                    </span>

                    <span className="text-[10px] font-semibold text-[#3E7775]">
                      Quizreto
                    </span>

                  </div>

                </div>


                {/* Floating card */}

                <div
                  className="
                    absolute
                    bottom-7
                    left-4
                    z-20
                    rounded-xl
                    bg-[#E1B07A]
                    px-4
                    py-2.5
                    shadow-lg
                    rotate-[-4deg]
                  "
                >

                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#3A1F25]">
                    Learn
                  </p>

                  <p className="text-xs font-serif font-bold text-[#3A1F25]">
                    Test yourself.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            CATEGORIES
        ===================================================== */}

        <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-9">

            <div>

              <p className="mb-2 text-sm font-semibold text-[#E1B07A]">
                Explore
              </p>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F5EBDD]">
                Find something to test.
              </h2>

            </div>


            <Link
              to="/explore"
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-[#D6A24A]
                hover:text-[#E3B663]
                hover:gap-3
                transition-all
              "
            >
              View all quizzes
              <ArrowRight className="w-4 h-4" />
            </Link>

          </div>


          {/* CATEGORY GRID */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {categories.map((category) => {

              const Icon = category.icon;

              return (
                <Link
                  key={category.tag}
                  to={`/explore?category=${encodeURIComponent(category.tag)}`}
                  className="group"
                >

                  <div
                    className="
                      relative
                      h-full
                      min-h-[190px]
                      overflow-hidden
                      rounded-2xl
                      bg-[#82403B]
                      border
                      border-[#E1B07A]/20
                      p-6
                      transition-all
                      duration-200
                      hover:-translate-y-1
                      hover:bg-[#8B4540]
                      hover:border-[#E1B07A]/30
                      hover:shadow-[0_14px_30px_rgba(40,12,15,0.20)]
                    "
                  >

                    {/* Corner decoration */}

                    <div
                      className="
                        absolute
                        -right-8
                        -top-8
                        w-24
                        h-24
                        rounded-full
                        opacity-[0.10]
                      "
                      style={{
                        backgroundColor: category.accent,
                      }}
                    />


                    <div className="relative">

                      {/* ICON + ARROW */}

                      <div className="flex items-start justify-between">

                        <div
                          className="
                            w-11
                            h-11
                            rounded-xl
                            flex
                            items-center
                            justify-center
                          "
                          style={{
                            backgroundColor: `${category.accent}18`,
                            color: category.accent,
                          }}
                        >
                          <Icon className="w-5 h-5" />
                        </div>


                        <ArrowRight
                          className="
                            w-4
                            h-4
                            text-[#D6A24A]
                            opacity-0
                            -translate-x-2
                            group-hover:opacity-100
                            group-hover:translate-x-0
                            transition-all
                          "
                        />

                      </div>


                      {/* TITLE */}

                      <h3
                        className="
                          mt-6
                          font-serif
                          text-xl
                          font-bold
                          text-[#F5EBDD]
                        "
                      >
                        {category.title}
                      </h3>


                      {/* DESCRIPTION */}

                      <p
                        className="
                          mt-2
                          text-sm
                          leading-6
                          text-[#F5EBDD]/60
                        "
                      >
                        {category.desc}
                      </p>

                    </div>

                  </div>

                </Link>
              );

            })}

          </div>

        </section>


        {/* =====================================================
            BOTTOM CTA
        ===================================================== */}

        <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">

          <div
            className="
              relative
              max-w-7xl
              mx-auto
              overflow-hidden
              rounded-2xl
              bg-[#3A1F25]
              px-7
              sm:px-12
              py-10
              sm:py-12
              border
              border-[#E1B07A]/10
            "
          >

            {/* Fabric texture */}

            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(
                    0deg,
                    #ffffff 0px,
                    #ffffff 1px,
                    transparent 1px,
                    transparent 5px
                  ),
                  repeating-linear-gradient(
                    90deg,
                    #ffffff 0px,
                    #ffffff 1px,
                    transparent 1px,
                    transparent 6px
                  )
                `,
              }}
            />


            {/* Decorative circle */}

            <div
              className="
                absolute
                -right-20
                -top-20
                w-48
                h-48
                rounded-full
                border
                border-[#D6A24A]/20
              "
            />


            <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-7">

              <div>

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E1B07A]">
                  Quizreto
                </p>

                <h2 className="mt-2 font-serif text-3xl sm:text-4xl font-bold text-[#F5EBDD]">
                  Ready to test yourself?
                </h2>

              </div>


              <button
                onClick={handleCTA}
                className="
                  shrink-0
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#D6A24A]
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  text-[#3A1F25]
                  transition-all
                  duration-200
                  hover:bg-[#E3B663]
                "
              >
                Explore quizzes
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

          </div>

        </section>

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