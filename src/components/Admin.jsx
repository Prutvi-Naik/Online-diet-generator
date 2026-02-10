import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="w-full max-w-[1440px] mx-auto space-y-10 p-6 animate-in fade-in duration-1000">
      
      {/* 1. TOP STATS (BENTO GRID) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#1B4332] p-8 rounded-[3rem] text-white shadow-xl">
          <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2">Total Users</p>
          <p className="text-5xl font-black italic">1,284</p>
        </div>
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Active Diets</p>
          <p className="text-5xl font-black text-[#1B4332]">842</p>
        </div>
        <div className="bg-[#FF8C42] p-8 rounded-[3rem] text-white shadow-xl">
          <p className="text-[10px] font-black uppercase tracking-widest mb-2">Total Weight Lost</p>
          <p className="text-5xl font-black">412<span className="text-xl ml-1">kg</span></p>
        </div>
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Sync Success</p>
          <p className="text-5xl font-black text-emerald-500">99<span className="text-xl">%</span></p>
        </div>
      </div>

      {/* 2. USER CONTROL TABLE */}
      <div className="bg-white rounded-[4rem] shadow-2xl border border-slate-50 overflow-hidden">
        <div className="p-10 border-b border-slate-50 flex justify-between items-center">
          <h3 className="text-2xl font-black text-[#1B4332] uppercase tracking-tighter">User Command Center</h3>
          <input type="text" placeholder="Search by UID..." className="bg-slate-50 px-6 py-3 rounded-2xl outline-none border border-slate-100 text-xs font-bold" />
        </div>

        <table className="w-full text-left">
          <thead className="bg-slate-50/50 text-[10px] font-black text-slate-300 uppercase tracking-widest">
            <tr>
              <th className="px-10 py-6">User ID</th>
              <th className="px-10 py-6">Current Goal</th>
              <th className="px-10 py-6">Status</th>
              <th className="px-10 py-6 text-right">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            <tr className="group hover:bg-slate-50/50 transition-all">
              <td className="px-10 py-6 text-xs font-black font-mono">USR_8291_AX</td>
              <td className="px-10 py-6"><span className="bg-orange-50 text-[#FF8C42] px-3 py-1 rounded-lg text-[9px] font-black uppercase">Muscle Gain</span></td>
              <td className="px-10 py-6"><div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /></td>
              <td className="px-10 py-6 text-right space-x-2">
                <button className="bg-[#1B4332] text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase hover:bg-[#FF8C42] transition-all">Unlock Edit</button>
                <button className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-[9px] font-black uppercase">Wipe History</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}