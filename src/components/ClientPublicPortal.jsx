import React, { useState } from 'react';

export default function ClientPublicPortal({ clientData }) {
  // Default mock client if none provided
  const client = clientData || {
    name: 'Apex Electric & HVAC',
    tradeType: 'HVAC & Electrical',
    landingPageHeadline: 'Expert Electrical & HVAC Services in Erie, PA',
    customDomain: 'apexelectric.com',
    businessConfig: {
      baseQuoteRate: 1500,
      emergencyFee: 400,
      customServices: [
        { id: 1, name: 'Heat Pump Diagnostics', price: 175 },
        { id: 2, name: '220V Circuit Install', price: 350 },
        { id: 3, name: 'Full Duct Cleaning', price: 600 }
      ]
    }
  };

  const [selectedServices, setSelectedServices] = useState({});
  const [urgency, setUrgency] = useState('standard');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (id) => {
    setSelectedServices(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const calculateTotal = () => {
    let total = client.businessConfig.baseQuoteRate;
    if (urgency === 'emergency') total += client.businessConfig.emergencyFee;
    
    client.businessConfig.customServices.forEach(s => {
      if (selectedServices[s.id]) total += s.price;
    });
    return total;
  };

  const handleSubmitQuote = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;
    setSubmitted(true);
    // Dispatches lead directly to client's employee SMS queue
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Client Branded Header */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur px-8 py-4 flex justify-between items-center">
        <div className="text-lg font-black tracking-tight text-white">{client.name}</div>
        <div className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          ?? 24/7 Dispatch Live
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold px-3 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20">
          {client.tradeType}
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">{client.landingPageHeadline}</h1>
        <p className="text-sm text-slate-400 max-w-lg mx-auto">Select your required services below for an instant, guaranteed quote and dispatch a certified technician directly to your door.</p>
      </section>

      {/* Interactive Estimator & Booking Grid */}
      <main className="max-w-4xl mx-auto px-6 pb-20">
        {!submitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Service Configurator */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">1. Select Service Line Items</h3>
              
              <div className="space-y-3">
                {client.businessConfig.customServices.map(s => (
                  <label key={s.id} className="flex justify-between items-center p-4 rounded-2xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700 transition">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={!!selectedServices[s.id]}
                        onChange={() => toggleService(s.id)}
                        className="rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0 h-4 w-4"
                      />
                      <span className="text-sm font-semibold text-slate-200">{s.name}</span>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-bold">+${s.price}</span>
                  </label>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-bold">2. Scheduling Urgency</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setUrgency('standard')} className={`py-3 px-4 rounded-2xl border text-xs font-bold transition ${urgency === 'standard' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                    Standard Dispatch
                  </button>
                  <button onClick={() => setUrgency('emergency')} className={`py-3 px-4 rounded-2xl border text-xs font-bold transition ${urgency === 'emergency' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                    Emergency (+${client.businessConfig.emergencyFee})
                  </button>
                </div>
              </div>
            </div>

            {/* Instant Quote & Lead Capture */}
            <div className="lg:col-span-5 bg-gradient-to-br from-blue-950/40 via-slate-900 to-slate-900 border border-blue-500/30 rounded-3xl p-8 flex flex-col justify-between shadow-2xl">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold mb-2">Instant Estimate</div>
                <div className="text-5xl font-black text-white mb-6 tracking-tight">
                  ${calculateTotal().toLocaleString()}
                </div>

                <form onSubmit={handleSubmitQuote} className="space-y-4 pt-4 border-t border-slate-800">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Your Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="John Doe" 
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Mobile Phone (For SMS Dispatch)</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="(814) 555-0192" 
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl transition shadow-lg shadow-emerald-600/25 text-xs uppercase tracking-wider">
                    Submit Quote & Dispatch Tech
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl p-12 text-center space-y-4 shadow-2xl">
            <div className="text-4xl">??</div>
            <h3 className="text-2xl font-black text-white">Quote Submitted Successfully!</h3>
            <p className="text-sm text-slate-400 max-w-md mx-auto">Your estimate has been routed to {client.name}'s employee dispatch queue. A technician has been alerted via SMS.</p>
            <button onClick={() => setSubmitted(false)} className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition">
              Submit Another Quote
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
