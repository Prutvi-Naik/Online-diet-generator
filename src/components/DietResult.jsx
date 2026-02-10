import React, { useState, useMemo } from 'react';

export default function DietResult({ healthData }) {
  const [isVeg, setIsVeg] = useState(true);

  const portions = useMemo(() => {
    if (!healthData) return { scale: 1, cals: 2000 };
    const { age, weight, height, gender, goal } = healthData;
    let bmr = (10 * weight) + (6.25 * height) - (5 * age);
    bmr = gender === 'Male' ? bmr + 5 : bmr - 161;
    let tdee = bmr * 1.45; 
    if (goal === 'Weight Loss') tdee -= 500;
    if (goal === 'Muscle Gain') tdee += 400;
    return { scale: tdee / 2000, cals: Math.round(tdee) };
  }, [healthData]);

  const mealData = [
    {
      time: "08:30 AM",
      type: "First Fuel",
      icon: "☀️",
      protocol: "Consume within 45 mins of waking. Metabolic ignition phase.",
      options: isVeg ? [
        { n: "Oatmeal Matrix", q: `${Math.round(80 * portions.scale)}g Oats + Berries`, c: "Fiber High" },
        { n: "Protein Poha", q: `${Math.round(150 * portions.scale)}g with Peanuts`, c: "Complex Carbs" },
        { n: "Paneer Scramble", q: `${Math.round(120 * portions.scale)}g with 1 Toast`, c: "High Protein" }
      ] : [
        { n: "Classic Eggs", q: "3 Egg Whites + 2 Whole Wheat Slices", c: "Lean Protein" },
        { n: "Chicken Wrap", q: "100g Shredded Chicken + Veggie Wrap", c: "Energy Balanced" },
        { n: "Smoothie Bowl", q: "Whey Protein + Banana + Seeds", c: "Fast Absorption" }
      ]
    },
    {
      time: "01:45 PM",
      type: "Mid-Day Peak",
      icon: "🏔️",
      protocol: "Main insulin spike management. Eat slowly, no water during meal.",
      options: isVeg ? [
        { n: "Quinoa Bowl", q: `${Math.round(180 * portions.scale)}g + Black Beans`, c: "Iron Rich" },
        { n: "Roti & Dal", q: `2 Rotis + ${Math.round(200 * portions.scale)}ml Dal`, c: "B-Vitamin Hub" },
        { n: "Soya Salad", q: `${Math.round(150 * portions.scale)}g Chunks + Greens`, c: "Vegan Protein" }
      ] : [
        { n: "Grilled Fish", q: `${Math.round(160 * portions.scale)}g + Broccoli`, c: "Omega-3 Focus" },
        { n: "Chicken & Rice", q: `${Math.round(150 * portions.scale)}g + 1/2 cup Rice`, c: "Mass Builder" },
        { n: "Turkey Salad", q: "200g Lean Turkey + Avocado + Nuts", c: "Healthy Fats" }
      ]
    },
    {
      time: "08:15 PM",
      type: "Recovery Phase",
      icon: "🌙",
      protocol: "Low glycemic index focus. Prepare body for overnight repair.",
      options: isVeg ? [
        { n: "Lentil Soup", q: "2 Large Bowls + Sautéed Tofu", c: "Low Calorie" },
        { n: "Greek Yogurt", q: "250g with Pumpkin Seeds", c: "Probiotic Boost" },
        { n: "Steamed Veg", q: "300g Seasonal Veg + 50g Paneer", c: "Micronutrient Max" }
      ] : [
        { n: "Salmon Steak", q: "150g Baked with Asparagus", c: "Growth Hormone Support" },
        { n: "Boiled Eggs", q: "4 Egg Whites + Spinach Soup", c: "Zero Carb Path" },
        { n: "Chicken Soup", q: "250ml Clear Broth + 100g Meat", c: "Light Digestion" }
      ]
    }
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6 py-6 md:py-10 space-y-12 md:space-y-16 animate-in fade-in duration-1000">
      
      {/* 1. CLINICAL HEADER DASHBOARD */}
      <div className="relative group p-[1px] md:p-[2px] rounded-[2.5rem] md:rounded-[4rem] bg-gradient-to-r from-emerald-500 via-orange-400 to-emerald-600 shadow-2xl">
        <div className="bg-[#1B4332] rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 lg:p-20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white/5 rounded-full blur-[80px] md:blur-[100px] -mr-20 -mt-20 md:-mr-40 md:-mt-40" />
          
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-10">
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-none">
                Dietary <br/> <span className="text-[#FF8C42]">Synthesis.</span>
              </h2>
              <div className="flex flex-wrap gap-3 md:gap-4">
                <div className="bg-white/5 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl border border-white/10 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-[#FF8C42]">
                  Algorithm: {portions.cals} Kcal/Day
                </div>
                <div className="bg-white/5 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl border border-white/10 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-emerald-400">
                  ID: {healthData?.weight}KG-OPT-01
                </div>
              </div>
            </div>

            {/* Toggle Buttons - Switched to auto-width on mobile */}
            <div className="flex w-full sm:w-auto bg-white/5 p-2 rounded-[2rem] border border-white/10 backdrop-blur-xl lg:scale-110">
              <button onClick={() => setIsVeg(true)} className={`flex-1 sm:flex-none px-6 md:px-10 py-3 md:py-5 rounded-[1.5rem] md:rounded-[2rem] font-black text-[9px] md:text-[10px] uppercase tracking-widest transition-all ${isVeg ? 'bg-[#FF8C42] text-white shadow-2xl' : 'text-slate-400 hover:text-white'}`}>Pure Veg</button>
              <button onClick={() => setIsVeg(false)} className={`flex-1 sm:flex-none px-6 md:px-10 py-3 md:py-5 rounded-[1.5rem] md:rounded-[2rem] font-black text-[9px] md:text-[10px] uppercase tracking-widest transition-all ${!isVeg ? 'bg-[#FF8C42] text-white shadow-2xl' : 'text-slate-400 hover:text-white'}`}>Mixed Diet</button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MULTI-OPTION MEAL SECTIONS */}
      {mealData.map((meal, idx) => (
        <div key={idx} className="space-y-6 md:space-y-8">
          {/* Section Heading */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6 px-2 md:px-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-[2rem] bg-white shadow-xl flex items-center justify-center text-2xl md:text-3xl border border-slate-50">{meal.icon}</div>
              <div>
                <h3 className="text-xl md:text-3xl font-black text-[#1B4332] tracking-tighter uppercase">{meal.type}</h3>
                <p className="text-[8px] md:text-[10px] font-black text-[#FF8C42] uppercase tracking-[0.4em]">{meal.time}</p>
              </div>
            </div>
            <div className="hidden lg:block h-[1px] flex-1 bg-gradient-to-r from-slate-200 to-transparent ml-10" />
            <div className="bg-[#D8F3DC] px-4 md:px-6 py-2 rounded-xl md:rounded-2xl text-[8px] md:text-[9px] font-black text-[#2D6A4F] uppercase tracking-widest italic leading-tight">
              {meal.protocol}
            </div>
          </div>

          {/* Triple Options Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {meal.options.map((opt, i) => (
              <div key={i} className="group bg-white p-8 md:p-10 rounded-[2.5rem] md:rounded-[4rem] border border-slate-100 shadow-sm hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-slate-50 rounded-bl-[2.5rem] md:rounded-bl-[4rem] flex items-center justify-center font-black text-slate-200 text-xs transition-colors group-hover:bg-[#FF8C42]/10 group-hover:text-[#FF8C42]">
                  0{i+1}
                </div>
                
                <p className="text-[8px] md:text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-4 md:mb-6 px-3 py-1 bg-emerald-50 rounded-full inline-block">{opt.c}</p>
                <h4 className="text-xl md:text-2xl font-black text-[#1B4332] mb-2 md:mb-3 leading-tight group-hover:text-[#FF8C42] transition-colors">{opt.n}</h4>
                <p className="text-slate-500 font-bold text-base md:text-lg italic leading-relaxed">"{opt.q}"</p>
                
                <div className="mt-8 md:mt-10 pt-6 md:pt-8 border-t border-slate-50 flex justify-between items-center">
                   <span className="text-[8px] md:text-[10px] font-black uppercase text-slate-300">Measured Dose</span>
                   <button className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-50 flex items-center justify-center text-[#1B4332] group-hover:bg-[#1B4332] group-hover:text-white transition-all">➔</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* 3. SCIENTIFIC ADVISORY */}
      <div className="bg-white p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl border-4 border-emerald-50 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 md:w-2 h-full bg-[#FF8C42]" />
          <p className="text-[8px] md:text-[10px] font-black text-[#FF8C42] uppercase tracking-[0.5em] mb-3 md:mb-4">Official Clinical Guidelines</p>
          <h4 className="text-xl md:text-2xl font-black text-[#1B4332] mb-3 md:mb-4">Adherence Protocol</h4>
          <p className="text-sm md:text-base text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed">
            This diet plan utilizes the **Mifflin-St Jeor** algorithm for BMR calculation. For maximum physiological results, ensure water intake of 1L per 20kg of body weight. Do not skip meals to maintain steady glucose levels.
          </p>
      </div>

    </div>
  );
}