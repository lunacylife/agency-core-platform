import React, { useState } from 'react';

export default function AgencyEstimator({ baseFee = 150, perUnitRate = 45.50, unitName = 'Square Feet' }) {
  const [units, setUnits] = useState(100);
  const totalEstimate = baseFee + (units * perUnitRate);

  return (
    <div className="max-w-md mx-auto bg-slate-800 text-white p-6 rounded-xl shadow-lg border border-slate-700">
      <h3 className="text-xl font-bold mb-4 text-blue-400">Instant Project Estimator</h3>
      
      <div className="mb-4">
        <label className="block text-sm text-slate-300 mb-2">
          Enter {unitName}: {units}
        </label>
        <input 
          type="range" 
          min="10" 
          max="1000" 
          step="10"
          value={units} 
          onChange={(e) => setUnits(Number(e.target.value))}
          className="w-full accent-blue-500 cursor-pointer"
        />
      </div>

      <div className="bg-slate-900 p-4 rounded-lg mb-6 flex justify-between items-center border border-slate-700">
        <span className="text-slate-400 text-sm">Estimated Total:</span>
        <span className="text-2xl font-extrabold text-green-400">
          ${totalEstimate.toFixed(2)}
        </span>
      </div>

      <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg shadow transition">
        Proceed to Secure Checkout
      </button>
    </div>
  );
}
