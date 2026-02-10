import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessModal from './SuccessModal';

export default function ProfileSetup({ onSave }) {
  const navigate = useNavigate();

  // 1. Detect if the system is in "Admin Lock" mode
  const [isLocked] = useState(() => localStorage.getItem('user_profile_locked') === 'true');

  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem('user_diet_plan_cached');
    try {
      const parsed = saved ? JSON.parse(saved) : null;
      return parsed?.metrics || { age: '', weight: '', height: '', gender: 'Male', goal: 'Wellness' };
    } catch {
      return { age: '', weight: '', height: '', gender: 'Male', goal: 'Wellness' };
    }
  });

  const [isSuccess, setIsSuccess] = useState(false);

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    
    // Set the Admin Lock on first successful save
    localStorage.setItem('user_profile_locked', 'true');

    setTimeout(() => {
      onSave({
        ...form,
        weight: parseFloat(form.weight),
        height: parseFloat(form.height),
        age: parseInt(form.age)
      });
      navigate('/progress');
    }, 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 animate-in fade-in duration-700">
      <div className="bg-white rounded-[4rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[700px] border border-slate-100">
        
        {/* ADMIN STATUS SIDEBAR */}
        <div className="lg:w-1/3 bg-[#1B4332] p-12 text-white flex flex-col justify-between">
          <div>
            <div className="bg-[#FF8C42] px-4 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.3em] inline-block mb-6">
              {isLocked ? "Admin Locked" : "System Open"}
            </div>
            <h2 className="text-5xl font-black tracking-tighter leading-tight">
              Control <br/> <span className="text-[#FF8C42]">Matrix.</span>
            </h2>
            <p className="mt-8 text-emerald-100/50 text-sm font-medium leading-relaxed">
              {isLocked 
                ? "Biological constants are finalized. You can only update weight-variable parameters." 
                : "Initial setup mode. Please define the user baseline metrics."}
            </p>
          </div>
          
          <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
            <p className="text-[10px] font-black uppercase text-emerald-400 mb-2">Security Hash</p>
            <p className="text-[10px] font-mono opacity-40 break-all">8f2e91_metrics_v2.0_stable</p>
          </div>
        </div>

        {/* INPUT PANEL */}
        <div className="lg:w-2/3 p-10 lg:p-20 bg-slate-50/50">
          <form onSubmit={handleFinalSubmit} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              {/* READ-ONLY CONSTANTS (LOCKED FOR ADMIN INTEGRITY) */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Age (Constant)</label>
                <input type="number" value={form.age} readOnly={isLocked}
                  className={`w-full p-7 rounded-[2.5rem] border-2 font-black text-3xl outline-none transition-all ${isLocked ? 'bg-slate-100 text-slate-300 border-slate-200' : 'bg-white border-white focus:border-[#FF8C42]'}`}
                  onChange={e => setForm({...form, age: e.target.value})} />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Height (Constant)</label>
                <input type="number" value={form.height} readOnly={isLocked}
                  className={`w-full p-7 rounded-[2.5rem] border-2 font-black text-3xl outline-none transition-all ${isLocked ? 'bg-slate-100 text-slate-300 border-slate-200' : 'bg-white border-white focus:border-[#FF8C42]'}`}
                  onChange={e => setForm({...form, height: e.target.value})} />
              </div>

              {/* DYNAMIC VARIABLES (ALWAYS EDITABLE) */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-[#2D6A4F] uppercase tracking-widest ml-2">Current Weight (Variable)</label>
                <input type="number" step="0.1" value={form.weight} required
                  className="w-full p-7 rounded-[2.5rem] bg-white border-2 border-emerald-100 focus:border-[#FF8C42] outline-none font-black text-3xl shadow-sm"
                  onChange={e => setForm({...form, weight: e.target.value})} />
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-[#2D6A4F] uppercase tracking-widest ml-2">Target Strategy</label>
                <select value={form.goal} 
                  className="w-full p-7 rounded-[2.5rem] bg-white border-2 border-emerald-100 focus:border-[#FF8C42] outline-none font-black text-xs uppercase"
                  onChange={e => setForm({...form, goal: e.target.value})}>
                  <option>Weight Loss</option>
                  <option>Muscle Gain</option>
                  <option>Wellness</option>
                </select>
              </div>

            </div>

            <button type="submit" className="w-full bg-[#1B4332] text-white py-8 rounded-[3rem] font-black text-xs uppercase tracking-[0.5em] shadow-2xl hover:bg-emerald-800 transition-all transform active:scale-95">
              {isLocked ? "Sync New Metrics" : "Initialize System"}
            </button>
          </form>
        </div>
      </div>
      <SuccessModal isOpen={isSuccess} goal={form.goal} />
    </div>
  );
}