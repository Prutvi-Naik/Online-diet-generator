import React from 'react';

export default function Register() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-2xl">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Customer Register</h2>
      <div className="space-y-3">
        <input type="text" placeholder="Name" className="w-full p-2 border rounded" /> [cite: 80]
        <input type="email" placeholder="Email Id" className="w-full p-2 border rounded" /> [cite: 79]
        <input type="text" placeholder="Phone No" className="w-full p-2 border rounded" /> [cite: 81]
        <input type="password" placeholder="Password" className="w-full p-2 border rounded" /> [cite: 83]
        <select className="w-full p-2 border rounded">
          <option>Veg</option> [cite: 85]
          <option>Non-Veg</option>
        </select>
        <button className="w-full bg-green-600 text-white py-2 rounded">Register</button>
      </div>
    </div>
  );
}