import React, { useState } from 'react';

export default function DietGen({ profile }) {
  const [bmi, setBmi] = useState(null);

  const calculate = () => {
    const hM = profile.h / 100;
    const score = (profile.w / (hM * hM)).toFixed(1); 
    setBmi(score);
  };

  return (
    /* Adjusted padding, max-width, and border-radius for mobile */
    <div className="max-w-2xl mx-auto p-6 md:p-12 bg-white/60 backdrop-blur-xl rounded-[2rem] md:rounded-[4rem] shadow-3xl border border-white text-center">
      
      {/* Reduced text size for small screens */}
      <h2 className="text-2xl md:text-4xl font-black text-green-900 mb-6 md:mb-8">Yours Diet Plan</h2>
      
      <button 
        onClick={calculate} 
        className="w-full md:w-auto px-8 md:px-12 py-4 md:py-5 bg-gray-900 text-white rounded-2xl md:rounded-3xl font-black text-base md:text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all"
      >
        Generate Personalized Plan
      </button>

      {bmi && (
        /* Reduced padding and radius for the result card */
        <div className="mt-8 md:mt-12 p-6 md:p-10 bg-white rounded-[2rem] md:rounded-[3rem] shadow-[20px_20px_60px_#d1d1d1,-20px_-20px_60px_#ffffff] animate-in zoom-in duration-500">
          <h3 className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-2">BMI SCORE</h3>
          
          {/* Responsive font size for BMI: smaller on mobile so it doesn't overflow */}
          <p className="text-6xl md:text-8xl font-black text-green-600 mb-4">{bmi}</p>
          
          <div className="space-y-2 mb-8">
            <p className="text-lg md:text-xl font-bold text-gray-800">
              Target: {bmi > 25 ? "Weight Loss" : "Wellness Maintenance"}
            </p>
            <p className="text-sm md:text-base text-gray-500 italic">Preference: {profile.pref}</p>
          </div>
          
          <button 
            onClick={() => window.print()} 
            className="w-full py-4 border-2 border-dashed border-blue-400 text-blue-500 font-bold rounded-2xl hover:bg-blue-50 transition-colors print:hidden"
          >
            Print Diet Plan
          </button>
        </div>
      )}
    </div>
  );
}