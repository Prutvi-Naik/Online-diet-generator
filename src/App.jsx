import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

// Components
import Navbar from './components/Navbar';
import ProfileSetup from './components/ProfileSetup';
import Progress from './components/Progress';
import DietResult from './components/DietResult';
import Login from './components/Login';

/**
 * CORE APPLICATION ENGINE
 * Features: Automatic Baseline Locking, Historical Weight Tracking, and Route Protection.
 */
export default function App() {
  const [user, setUser] = useState(null);
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. AUTHENTICATION & INITIAL STATE
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Load existing metrics for this specific user
        const savedData = localStorage.getItem(`diet_metrics_${currentUser.uid}`);
        if (savedData) {
          try {
            setHealthData(JSON.parse(savedData));
          } catch {
            setHealthData(null);
          }
        }
      }
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  // 2. GLOBAL SAVE HANDLER
  const handleSaveMetrics = (newData) => {
    if (!user) return;
    const uid = user.uid;

    // A. BASELINE LOCKING (Ensures Initial Weight != Current Weight after update)
    const baselineKey = `initial_weight_${uid}`;
    if (!localStorage.getItem(baselineKey)) {
      // First time saving? Lock this as the permanent anchor point.
      localStorage.setItem(baselineKey, newData.weight);
    }

    // B. PERSIST CURRENT DATA
    setHealthData(newData);
    localStorage.setItem(`diet_metrics_${uid}`, JSON.stringify(newData));
    // Cache for ProfileSetup lazy initializer
    localStorage.setItem('user_diet_plan_cached', JSON.stringify({ metrics: newData }));

    // C. UPDATE WEIGHT HISTORY (For the Charts & Tables)
    const historyKey = `weight_history_${uid}`;
    let history = [];
    
    try {
      const storedHistory = localStorage.getItem(historyKey);
      history = storedHistory ? JSON.parse(storedHistory) : [];
      if (!Array.isArray(history)) history = [];
    } catch {
      history = [];
    }

    const newEntry = {
      weight: parseFloat(newData.weight) || 0,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
      timestamp: Date.now()
    };

    if (newEntry.weight > 0) {
      // Check if updating on the same day - if so, replace. Else, push.
      const lastEntry = history[history.length - 1];
      if (lastEntry && lastEntry.date === newEntry.date) {
        history[history.length - 1] = newEntry;
      } else {
        history.push(newEntry);
      }

      // Keep last 15 entries for a clean UI
      localStorage.setItem(historyKey, JSON.stringify(history.slice(-15)));
    }
  };

  // 3. GLOBAL LOADING STATE
  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-[#F4F9F6]">
        <div className="w-12 h-12 border-4 border-[#2D6A4F] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1B4332]">
          Synchronizing Health Data...
        </p>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-[#F4F9F6] selection:bg-[#FF8C42] selection:text-white">
        <Navbar user={user} />
        
        {/* PAGE LAYOUT */}
        <main className="pt-32 pb-20 px-4 md:px-10 max-w-[1440px] mx-auto">
          <Routes>
            {/* Logic: Landing/Auth redirect */}
            <Route path="/" element={!user ? <Login /> : <Navigate to="/diet" />} />

            {/* Logic: Setup Page (The Matrix) */}
            <Route 
              path="/setup" 
              element={user ? <ProfileSetup onSave={handleSaveMetrics} /> : <Navigate to="/" />} 
            />
            
            {/* Logic: Meal Plan Result */}
            <Route 
              path="/diet" 
              element={user && healthData ? <DietResult healthData={healthData} /> : <Navigate to="/setup" />} 
            />

            {/* Logic: Tracking & Comparison Page */}
            <Route 
              path="/progress" 
              element={user && healthData ? <Progress data={healthData} user={user} /> : <Navigate to="/setup" />} 
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}