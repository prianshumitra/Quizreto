import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { MandalaPattern } from '../ui/MandalaPattern';
import { QuizretoLogo } from '../ui/QuizretoLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#0F2D3D] text-[#FFFDF9] pt-16 pb-12 overflow-hidden border-t-4 border-dashed border-[#D3542E]">
      <MandalaPattern className="absolute top-0 right-0 w-96 h-96 text-[#F4A261] opacity-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-dashed border-[#183C50]">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <QuizretoLogo variant="dark" size="lg" showTagline />

            <p className="text-sm text-slate-300 max-w-sm leading-relaxed pt-2">
              Quizzes for curious minds. Rooted in India, open to the world. Explore history, science, literature, technology, and more.
            </p>
            <p className="font-handwriting text-xl text-[#F4A261]">
              "Knowledge Has No Boundaries"
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold text-lg text-[#F4A261] mb-4 flex items-center gap-2">
              <span>Explore</span>
              <span className="text-xs text-[#D3542E]">✦</span>
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300 font-medium">
              <li>
                <Link to="/explore" className="hover:text-white transition-colors">All Quizzes</Link>
              </li>
              <li>
                <Link to="/explore?category=History" className="hover:text-white transition-colors">Indian History</Link>
              </li>
              <li>
                <Link to="/explore?category=Science" className="hover:text-white transition-colors">General Science</Link>
              </li>
              <li>
                <Link to="/explore?category=Literature" className="hover:text-white transition-colors">Bengali Literature</Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-serif font-semibold text-lg text-[#F4A261] mb-4 flex items-center gap-2">
              <span>Account</span>
              <span className="text-xs text-[#D3542E]">✦</span>
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300 font-medium">
              <li>
                <Link to="/login" className="hover:text-white transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors">Sign Up</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
              </li>
              <li>
                <Link to="/my-attempts" className="hover:text-white transition-colors">My Attempts</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Quizreto. Handcrafted Kantha Edition.</p>
          <p className="flex items-center gap-1 font-medium">
            Crafted with <Heart className="w-3.5 h-3.5 text-[#D3542E] fill-[#D3542E]" /> for curious minds across Bengal & India.
          </p>
        </div>
      </div>
    </footer>
  );
};
