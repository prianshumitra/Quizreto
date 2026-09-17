import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  History,
  Bookmark,
  User,
  LogOut,
  PlusCircle,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { MandalaPattern } from '../ui/MandalaPattern';
import { QuizretoLogo } from '../ui/QuizretoLogo';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen = false, onCloseMobile }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Explore', path: '/explore', icon: Compass },
    { name: 'My Attempts', path: '/my-attempts', icon: History },
    { name: 'Bookmarks', path: '/explore?tab=bookmarks', icon: Bookmark },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Create Quiz', path: '/create-quiz', icon: PlusCircle },
  ];

  const content = (
    <aside className="relative flex flex-col h-full bg-[#0F2D3D] text-[#FFFDF9] border-r-2 border-dashed border-[#183C50] overflow-hidden select-none">
      {/* Decorative Mandala Overlay */}
      <MandalaPattern className="absolute -bottom-20 -left-20 w-80 h-80 text-[#F4A261] opacity-10" />

      {/* Sidebar Header / Brand with Kantha Logo */}
      <div className="p-6 flex items-center justify-between border-b border-dashed border-[#183C50]">
        <NavLink to="/dashboard">
          <QuizretoLogo variant="dark" size="md" showTagline />
        </NavLink>
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden text-gray-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#D3542E] text-white font-semibold shadow-md border border-dashed border-white/40 translate-x-1'
                    : 'text-slate-300 hover:bg-[#183C50]/80 hover:text-white'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* User Info & Logout Footer */}
      <div className="p-4 m-4 bg-[#183C50]/60 rounded-2xl border border-dashed border-[#234F69] space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#D3542E] text-white font-bold flex items-center justify-center text-sm shadow-inner border border-dashed border-white/40">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-slate-300 truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-red-300 hover:text-white hover:bg-red-950/40 rounded-xl transition-colors border border-dashed border-red-900/40"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 shrink-0 h-screen sticky top-0">{content}</div>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Mobile Drawer Container */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 transition-transform duration-300 transform lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {content}
      </div>
    </>
  );
};
