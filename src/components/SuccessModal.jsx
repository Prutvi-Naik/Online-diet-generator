import React from 'react';

export default function SuccessModal({ isOpen, goal }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4 md:p-6 bg-[#1B4332]/60 backdrop-blur-xl animate-in fade-in duration-300">
      {/* Container: Scaled down max-width and padding for mobile */}
      <div className="w-full max-w-md md:max-w-lg bg-white rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
        
        {/* Top Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-2 md:h-3 bg-gradient-to-r from-emerald-500 via-[#FF8C42] to-emerald-500" />
        
        {/* Icon: Smaller on mobile */}
        <div className="w-16 h-16 md:w-24 md:h-24 bg-[#D8F3DC] rounded-[1.5rem] md:rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 md:mb-8 animate-bounce text-3xl md:text-5xl">
          ⚡
        </div>
        
        {/* Heading: Scaled text-3xl for mobile */}
        <h3 className="text-3xl md:text-4xl font-black text-[#1B4332] tracking-tighter mb-4">
          Protocol <br/> 
          <span className="text-[#FF8C42]">Synchronized.</span>
        </h3>
        
        <p className="text-slate-500 text-xs md:text-sm mb-8 md:mb-10 uppercase font-bold tracking-widest">
          Generating {goal} strategy...
        </p>
        
        {/* Progress Bar Container */}
        <div className="w-full h-1.5 md:h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#1B4332] w-full origin-left animate-[progress_2s_ease-in-out_forwards]" />
        </div>
      </div>

      <style>{`
        @keyframes progress { 
          0% { transform: scaleX(0); } 
          100% { transform: scaleX(1); } 
        }
      `}</style>
    </div>
  );
}