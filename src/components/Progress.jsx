import React, { useMemo } from 'react';

/**
 * MODULE: PROGRESS & COMPARATIVE ANALYTICS
 * Purpose: Compares Baseline vs. Current metrics with responsive adjustments.
 */
export default function Progress({ data, user }) {
  
  const weightHistory = useMemo(() => {
    if (!user) return [];
    try {
      const history = JSON.parse(localStorage.getItem(`weight_history_${user.uid}`)) || [];
      return history;
    } catch {
      return [];
    }
  }, [user, data]);

  const analysis = useMemo(() => {
    if (!user || !data) return null;

    const initial = parseFloat(localStorage.getItem(`initial_weight_${user.uid}`)) || parseFloat(data.weight);
    const current = parseFloat(data.weight);
    const diff = (current - initial).toFixed(1);
    const goal = data.goal || "Wellness";

    let status = "Stabilizing";
    let color = "text-[#FF8C42]"; 
    let message = "Maintaining current metabolic baseline.";

    if (goal === "Weight Loss") {
      if (current < initial) {
        status = "On Track";
        color = "text-emerald-500";
        message = `Successfully reduced ${Math.abs(diff)}kg from start.`;
      } else if (current > initial) {
        status = "Surplus Alert";
        color = "text-amber-500";
        message = "Weight is trending above initial baseline.";
      }
    } else if (goal === "Muscle Gain") {
      if (current > initial) {
        status = "Growth Mode";
        color = "text-emerald-500";
        message = `Gained ${diff}kg of mass from start.`;
      } else {
        status = "Deficit Alert";
        color = "text-amber-500";
        message = "Weight is trending below initial baseline.";
      }
    }

    return { initial, current, diff, status, color, message, goal };
  }, [data, user]);

  if (!analysis) return null;

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-0 space-y-8 md:space-y-12 animate-in fade-in duration-1000">
      
      {/* SECTION 1: COMPARATIVE DASHBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
        
        {/* Baseline Card */}
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] shadow-xl border border-slate-100 flex flex-col justify-center relative overflow-hidden">
          <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Starting Point</p>
          <p className="text-5xl md:text-7xl font-black text-slate-200">{analysis.initial}<span className="text-lg md:text-xl ml-2">kg</span></p>
          <div className="absolute -right-6 -bottom-6 text-7xl md:text-9xl opacity-[0.03] grayscale italic font-black">START</div>
        </div>

        {/* Central Evaluation Card: Highlighted center */}
        <div className="bg-[#1B4332] p-8 md:p-12 rounded-[3rem] md:rounded-[5rem] shadow-2xl text-white lg:scale-110 z-10 border-4 border-white/5 flex flex-col justify-center text-center">
          <p className="text-[8px] md:text-[10px] font-black text-[#FF8C42] uppercase tracking-[0.4em] mb-4 md:mb-6">Goal: {analysis.goal}</p>
          <h3 className={`text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 ${analysis.color}`}>
            {analysis.status}
          </h3>
          <p className="text-xs md:text-sm font-medium text-emerald-100/60 leading-relaxed px-2 md:px-4">
            {analysis.message}
          </p>
          <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/10">
            <p className="text-xl md:text-2xl font-black">{analysis.diff > 0 ? `+${analysis.diff}` : analysis.diff} kg</p>
            <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest opacity-30">Total Net Variance</p>
          </div>
        </div>

        {/* Current Weight Card */}
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] shadow-xl border border-slate-100 flex flex-col justify-center relative overflow-hidden">
          <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Latest Sync</p>
          <p className="text-5xl md:text-7xl font-black text-[#1B4332]">{analysis.current}<span className="text-lg md:text-xl ml-2">kg</span></p>
          <div className="absolute -right-6 -bottom-6 text-7xl md:text-9xl opacity-[0.03] text-emerald-500 italic font-black">NOW</div>
        </div>

      </div>

      {/* SECTION 2: BIOMETRIC HISTORY TABLE */}
      <div className="bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-2xl border border-slate-50 overflow-hidden">
        <div className="p-8 md:p-14 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="text-center md:text-left">
             <h3 className="text-2xl md:text-3xl font-black text-[#1B4332] uppercase tracking-tighter">Biometric Log.</h3>
             <p className="text-[8px] md:text-[10px] font-black text-[#FF8C42] uppercase tracking-widest mt-1 md:mt-2">Historical Data Persistence</p>
           </div>
           <div className="bg-slate-50 px-6 md:px-8 py-2 md:py-3 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
             {weightHistory.length} Recorded Check-ins
           </div>
        </div>

        {/* Mobile-Friendly Scroll Container */}
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-slate-50/50 text-[8px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest">
                <th className="px-6 md:px-14 py-6 md:py-8">Timestamp</th>
                <th className="px-6 md:px-14 py-6 md:py-8">Mass (kg)</th>
                <th className="px-6 md:px-14 py-6 md:py-8">Variance</th>
                <th className="px-6 md:px-14 py-6 md:py-8">Clinical State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {weightHistory.slice().reverse().map((entry, i) => {
                const localDiff = (entry.weight - analysis.initial).toFixed(1);
                return (
                  <tr key={i} className="hover:bg-emerald-50/30 transition-all group">
                    <td className="px-6 md:px-14 py-6 md:py-8 text-xs md:text-sm font-black text-[#1B4332]">{entry.date}</td>
                    <td className="px-6 md:px-14 py-6 md:py-8 text-xs md:text-sm font-bold text-slate-600">{entry.weight} kg</td>
                    <td className={`px-6 md:px-14 py-6 md:py-8 text-[10px] md:text-xs font-black ${localDiff < 0 ? 'text-emerald-500' : localDiff > 0 ? 'text-amber-500' : 'text-slate-300'}`}>
                      {localDiff == 0 ? "BASELINE" : localDiff > 0 ? `+${localDiff}kg` : `${localDiff}kg`}
                    </td>
                    <td className="px-6 md:px-14 py-6 md:py-8">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-emerald-500 animate-pulse' : 'bg-slate-200'}`} />
                        <span className="text-[8px] md:text-[10px] font-black uppercase text-slate-400 tracking-widest">
                          {i === 0 ? "Latest" : "History"}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {weightHistory.length === 0 && (
          <div className="py-16 md:py-24 text-center">
            <p className="text-slate-200 font-black uppercase tracking-[0.3em] text-[10px]">Waiting for initial biometric input...</p>
          </div>
        )}
      </div>

      {/* SECTION 3: METABOLIC ADVISORY */}
      <div className="p-6 md:p-10 bg-white rounded-[2rem] md:rounded-[3rem] border border-slate-100 flex flex-col md:flex-row items-center gap-4 md:gap-8 shadow-sm text-center md:text-left">
        <div className="text-3xl md:text-4xl">⚖️</div>
        <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-wider">
          <span className="text-[#1B4332] font-black">Note:</span> Your comparison is based on your first recorded weight of {analysis.initial}kg. For consistent tracking, always weigh yourself at the same time in the morning.
        </p>
      </div>

    </div>
  );
}