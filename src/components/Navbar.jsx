import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ user }) {
  const location = useLocation();
  const avatarFallback = `https://ui-avatars.com/api/?name=Guest&background=D8F3DC&color=2D6A4F&bold=true`;

  // Define links in an array for easy management
  const navLinks = [
    { name: 'Metrics', path: '/setup' },
    { name: 'Tracking', path: '/progress' },
    { name: 'Meal Plan', path: '/diet' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] flex flex-col items-center">
      {/* 1. MAIN NAVBAR CONTAINER */}
      <div className="w-full max-w-7xl px-3 md:px-4 lg:p-6 mt-3 md:mt-4 lg:mt-6">
        <div className="w-full bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_20px_50px_rgba(45,106,79,0.08)] rounded-[1.2rem] md:rounded-[1.5rem] lg:rounded-[3rem] px-4 md:px-6 lg:px-10 py-2.5 md:py-3 lg:py-4 flex justify-between items-center transition-all duration-500">
          
          {/* BRAND IDENTITY */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="bg-[#2D6A4F] p-2 md:p-2.5 lg:p-3 rounded-lg md:rounded-xl shadow-lg shadow-emerald-100 group-hover:rotate-12 transition-transform">
              <span className="text-base md:text-lg lg:text-2xl">🥗</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm md:text-lg lg:text-xl font-black tracking-tighter text-[#1B4332] leading-none uppercase">
                ONLINE <span className="text-[#FF8C42]">DIET</span>
              </span>
              <span className="text-[7px] md:text-[8px] lg:text-[10px] font-black text-[#2D6A4F] uppercase tracking-[0.2em] mt-0.5 opacity-70">
                {user ? 'Member Dashboard' : 'Guest Access'}
              </span>
            </div>
          </Link>

          {/* RIGHT SIDE ACTIONS */}
          <div className="flex items-center gap-3 md:gap-4">
            
            {/* Desktop Navigation: Only shows if user is logged in */}
            {user && (
              <div className="hidden lg:flex gap-8 text-[10px] font-black uppercase tracking-widest text-slate-400 mr-8 border-r border-slate-200 pr-8">
                {navLinks.map((link) => (
                  <Link 
                    key={link.path}
                    to={link.path} 
                    className={`hover:text-[#2D6A4F] transition-colors ${location.pathname === link.path ? 'text-[#2D6A4F]' : ''}`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}

            {user ? (
              /* Profile Section */
              <div className="flex items-center gap-2 md:gap-4">
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-bold text-[#1B4332] truncate max-w-[80px]">{user.displayName}</p>
                  <p className="text-[7px] font-black text-emerald-500 uppercase">Pro</p>
                </div>
                <img 
                  src={user.photoURL || avatarFallback} 
                  className="w-8 h-8 md:w-10 rounded-xl border-2 border-[#2D6A4F] p-0.5" 
                  alt="User" 
                />
                <button 
                  onClick={() => signOut(auth)} 
                  className="bg-[#1B4332] text-white px-3 py-2 rounded-lg font-black text-[8px] md:text-[10px] uppercase tracking-widest hover:bg-red-600 transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              /* Guest CTA */
              <Link 
                to="/" 
                className="bg-slate-900 text-white px-4 md:px-6 py-2.5 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest shadow-xl hover:bg-[#2D6A4F] transition-colors"
              >
                GET STARTED
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 2. MOBILE SUB-NAV: Strictly hidden if user is logged out */}
      {user && (
        <div className="lg:hidden w-full px-4 mt-2 animate-in slide-in-from-top-2 duration-500">
          <div className="max-w-md mx-auto bg-white/60 backdrop-blur-xl border border-white/40 rounded-full shadow-lg p-1.5 flex justify-around items-center">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex-1 text-center py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${
                  location.pathname === link.path 
                    ? 'bg-[#2D6A4F] text-white shadow-md' 
                    : 'text-slate-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}