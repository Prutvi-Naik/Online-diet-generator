import React, { useState } from 'react';
import { auth, provider } from "../firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 1. REGULAR GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      localStorage.setItem('isAdmin', 'false'); // Reset admin flag for safety
      navigate('/diet');
    } catch (error) {
      console.error("Auth Error:", error.message);
    }
  };

  // 2. SECRET ADMIN LOGIN (EMAIL/PASSWORD)
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Logic: Verify against your specific Admin email
      if (user.email === "admin@metric.com") {
        localStorage.setItem('isAdmin', 'true');
        console.log("Admin Access Verified.");
      } else {
        localStorage.setItem('isAdmin', 'false');
      }
      navigate('/diet');
    } catch (error) {
      alert("Admin Verification Failed: " + error.message);
    }
  };

  return (
    <div className="w-full flex justify-center items-center perspective-2000 px-4 py-8 md:py-10 lg:py-20 overflow-x-hidden min-h-screen">
      <div className="w-full max-w-6xl bg-white/70 backdrop-blur-3xl rounded-[3rem] lg:rounded-[5rem] shadow-[0_50px_100px_rgba(0,0,0,0.1)] border border-white/60 overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
        
        {/* Left Side: Branding */}
        <div className="w-full lg:w-1/2 relative overflow-hidden bg-emerald-900 flex flex-col justify-center p-8 md:p-12 lg:p-24 text-white">
          <img 
            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=2070" 
            className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
            alt="Healthy Food"
          />
          <div className="relative z-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-400/20 border border-emerald-400/30 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
              Automated Nutrition
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black leading-[1.1] mb-6 tracking-tighter">
              Eat <span className="text-emerald-400">Smarter.</span> <br/> 
              Live Better.
            </h1>
            <p className="text-emerald-100/70 text-sm lg:text-lg max-w-md font-medium">
              Access clinical algorithms and historical data tracking.
            </p>
          </div>
        </div>

        {/* Right Side: Interactive Login Hub */}
        <div className="w-full lg:w-1/2 p-8 md:p-10 lg:p-24 flex flex-col justify-center bg-[#D8F3DC]/10 relative">
          <div className="max-w-md mx-auto w-full text-center">
            
            <div className="relative mx-auto w-24 h-24 mb-10 group">
              <div className="absolute inset-0 bg-emerald-500 rounded-[2.5rem] blur-3xl opacity-30"></div>
              <div className="relative bg-white w-full h-full rounded-[2.5rem] flex items-center justify-center shadow-2xl border border-emerald-50 transition-transform group-hover:rotate-12">
                <span className="text-5xl">{isAdminMode ? "🔑" : "🥗"}</span>
              </div>
            </div>

            <h2 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">
              {isAdminMode ? "Admin Access" : "Member Portal"}
            </h2>
            <p className="text-xs font-bold uppercase tracking-widest mb-12 text-slate-400">
              {isAdminMode ? "Authorized Developers Only" : "Authorized Access Only"}
            </p>

            {/* TOGGLE CONTENT: Google vs Email */}
            {!isAdminMode ? (
              <button 
                onClick={handleGoogleLogin}
                className="w-full bg-white border border-slate-200 text-slate-700 py-6 rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:shadow-2xl hover:border-emerald-500/30 transition-all active:scale-95 flex items-center justify-center gap-4"
              >
                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="G" />
                Continue to Dashboard
              </button>
            ) : (
              <form onSubmit={handleAdminLogin} className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                <input 
                  type="email" placeholder="Admin Email" required
                  className="w-full p-6 rounded-3xl bg-white border border-slate-100 outline-none font-bold text-sm shadow-inner"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                  type="password" placeholder="Access Token" required
                  className="w-full p-6 rounded-3xl bg-white border border-slate-100 outline-none font-bold text-sm shadow-inner"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:bg-black transition-all">
                  Verify Identity
                </button>
              </form>
            )}

            {/* MODE SWITCHER */}
            <div className="mt-8">
              <button 
                onClick={() => setIsAdminMode(!isAdminMode)}
                className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline"
              >
                {isAdminMode ? "← Back to User Login" : "Switch to Admin Access"}
              </button>
            </div>

            <div className="mt-16 pt-8 border-t border-slate-200/60">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">
                Secured by Firebase OAuth 2.0
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}