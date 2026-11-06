import React, { useState } from 'react';

export default function AgencyMasterDashboard() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [projectType, setProjectType] = useState('hvac');
  const [urgency, setUrgency] = useState('standard');
  const [addons, setAddons] = useState({ portal: true, stripe: true, dispatch: true });

  const calculateEstimate = () => {
    let base = projectType === 'hvac' ? 1450 : projectType === 'roofing' ? 2200 : 1750;
    if (urgency === 'emergency') base *= 1.4;
    if (addons.portal) base += 450;
    if (addons.stripe) base += 300;
    if (addons.dispatch) base += 600;
    return base;
  };

  const clients = [
    { id: 1, name: 'Apex Electric & HVAC', tier: 'Growth Pro', status: 'Active', mrr: 149, schema: 'tenant_apex_prod', leads: 42, uptime: '99.99%', badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    { id: 2, name: 'Precision Roofing & Siding', tier: 'Startup Launchpad', status: 'Active', mrr: 49, schema: 'tenant_precision_prod', leads: 18, uptime: '100%', badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
    { id: 3, name: 'Summit Plumbing Solutions', tier: 'Enterprise', status: 'Provisioning', mrr: 399, schema: 'tenant_summit_prod', leads: 64, uptime: '99.95%', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' }
  ];

  return (
    <div className="min-h-screen bg-[#05070c] text-slate-100 flex font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-[#090e1b]/95 backdrop-blur-2xl border-r border-slate-800/80 p-6 flex flex-col justify-between shadow-2xl">
        <div>
          {/* Logo & Brand Header */}
          <div className="flex items-center gap-3.5 mb-10 pb-6 border-b border-slate-800/80">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center font-black text-xl text-white shadow-xl shadow-blue-500/30 ring-1 ring-white/20">
              A
            </div>
            <div>
              <h1 className="text-sm font-black tracking-wider text-white uppercase">Agency Core</h1>
              <p className="text-xs text-blue-400 font-medium">Multi-Tenant Platform</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('overview')} 
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 ${activeTab === 'overview' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 ring-1 ring-white/10' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
            >
              <span>??</span> Tenant Fleet
            </button>
            <button 
              onClick={() => setActiveTab('estimator')} 
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 ${activeTab === 'estimator' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 ring-1 ring-white/10' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
            >
              <span>?</span> Quoting Engine
            </button>
            <button 
              onClick={() => setActiveTab('schemas')} 
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 ${activeTab === 'schemas' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 ring-1 ring-white/10' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
            >
              <span>???</span> Data Isolation
            </button>
          </nav>
        </div>

        {/* Cluster Health Widget */}
        <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-900/40 border border-slate-800/80 shadow-inner">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cluster Health</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <div className="text-xs text-slate-200 font-mono">Vercel Edge / US-East</div>
          <div className="text-[11px] text-emerald-400 font-bold mt-1">3 Schemas Secured</div>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-1 p-10 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-[#05070c] to-[#05070c]">
        
        {activeTab === 'overview' && (
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Header Banner */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-white">Client Tenant Fleet</h2>
                <p className="text-sm text-slate-400 mt-1">Manage zero-overlap database schemas, isolated portals, and Stripe subscriptions.</p>
              </div>
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2">
                <span>+</span> Provision New Tenant
              </button>
            </div>

            {/* Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div className="p-6 rounded-3xl bg-[#0a0f1d] border border-slate-800/80 shadow-xl relative overflow-hidden group hover:border-blue-500/40 transition">
                <div className="absolute top-0 right-0 p-4 text-blue-500/10 text-4xl font-black">$$</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Monthly Recurring</div>
                <div className="text-3xl font-black text-white">$597 <span className="text-xs text-emerald-400 font-bold">/mo</span></div>
                <div className="text-xs text-slate-500 mt-2">100% collection rate</div>
              </div>

              <div className="p-6 rounded-3xl bg-[#0a0f1d] border border-slate-800/80 shadow-xl relative overflow-hidden group hover:border-indigo-500/40 transition">
                <div className="absolute top-0 right-0 p-4 text-indigo-500/10 text-4xl font-black">?</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Total Active Leads</div>
                <div className="text-3xl font-black text-white">124</div>
                <div className="text-xs text-indigo-400 mt-2 font-medium">Routed to job queues</div>
              </div>

              <div className="p-6 rounded-3xl bg-[#0a0f1d] border border-slate-800/80 shadow-xl relative overflow-hidden group hover:border-emerald-500/40 transition">
                <div className="absolute top-0 right-0 p-4 text-emerald-500/10 text-4xl font-black">??</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Data Isolation</div>
                <div className="text-3xl font-black text-emerald-400">100%</div>
                <div className="text-xs text-slate-500 mt-2">Zero-overlap verified</div>
              </div>

              <div className="p-6 rounded-3xl bg-[#0a0f1d] border border-slate-800/80 shadow-xl relative overflow-hidden group hover:border-blue-500/40 transition">
                <div className="absolute top-0 right-0 p-4 text-blue-500/10 text-4xl font-black">??</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Platform Status</div>
                <div className="text-3xl font-black text-blue-400">Live</div>
                <div className="text-xs text-slate-500 mt-2">Vercel production edge</div>
              </div>
            </div>

            {/* Tenant Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {clients.map((client) => (
                <div
                  key={client.id}
                  onClick={() => setSelectedClient(client)}
                  className={`p-7 rounded-3xl bg-[#0a0f1d] border cursor-pointer transition-all duration-300 shadow-2xl relative group ${selectedClient?.id === client.id ? 'border-blue-500 ring-2 ring-blue-500/30 bg-gradient-to-b from-blue-950/30 to-[#0a0f1d]' : 'border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40'}`}
                >
                  <div className="flex justify-between items-start mb-5">
                    <div>
                      <span className={`text-[11px] font-extrabold font-mono uppercase tracking-widest px-2.5 py-1 rounded-lg border ${client.badge}`}>{client.tier}</span>
                      <h3 className="text-lg font-bold text-white mt-3 group-hover:text-blue-300 transition">{client.name}</h3>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {client.status}
                    </span>
                  </div>

                  <div className="space-y-3 my-6 text-sm">
                    <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                      <span className="text-slate-400">Schema Namespace:</span>
                      <code className="text-xs text-indigo-300 font-mono bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">{client.schema}</code>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                      <span className="text-slate-400">Monthly Revenue:</span>
                      <span className="font-bold text-white">${client.mrr} <span className="text-xs text-slate-400 font-normal">/mo</span></span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-400">Uptime Guarantee:</span>
                      <span className="text-emerald-400 font-semibold">{client.uptime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs font-bold text-blue-400 group-hover:translate-x-1 transition-transform">
                    <span>Manage Tenant Controls</span>
                    <span>?</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Client Inspection Drawer */}
            {selectedClient && (
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0a0f1d] via-[#0a0f1d] to-blue-950/30 border border-blue-500/50 shadow-2xl relative overflow-hidden animate-fadeIn">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-xs uppercase font-mono text-blue-400 font-bold tracking-wider">Active Tenant Inspection</span>
                    <h3 className="text-2xl font-black text-white mt-1">{selectedClient.name}</h3>
                    <p className="text-xs font-mono text-slate-400 mt-1">Database Schema: <span className="text-emerald-400 font-bold">{selectedClient.schema}</span></p>
                  </div>
                  <button onClick={() => setSelectedClient(null)} className="h-9 w-9 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-sm font-bold transition">?</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
                    <div className="text-xs text-slate-400 mb-1 font-medium">Subscription Tier</div>
                    <div className="text-lg font-extrabold text-white">{selectedClient.tier}</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
                    <div className="text-xs text-slate-400 mb-1 font-medium">Stripe Billing</div>
                    <div className="text-lg font-extrabold text-emerald-400">${selectedClient.mrr} <span className="text-xs text-slate-400 font-normal">/mo</span></div>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
                    <div className="text-xs text-slate-400 mb-1 font-medium">Captured Leads</div>
                    <div className="text-lg font-extrabold text-white">{selectedClient.leads} leads</div>
                  </div>
                  <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
                    <div className="text-xs text-slate-400 mb-1 font-medium">Partition Status</div>
                    <div className="text-lg font-extrabold text-emerald-400">Encrypted / Secure</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-blue-500/25 transition">
                    Launch Client Portal
                  </button>
                  <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-3.5 rounded-2xl font-bold text-sm border border-slate-700 transition">
                    Sync Stripe Webhooks
                  </button>
                  <button className="bg-slate-900 hover:bg-rose-950/40 text-rose-400 px-6 py-3.5 rounded-2xl font-bold text-sm border border-rose-900/40 transition">
                    Backup / Export Schema
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'estimator' && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-white">Embeddable Quoting & Estimator Engine</h2>
              <p className="text-sm text-slate-400 mt-1">High-converting dynamic pricing estimator deployed for niche trade contractors.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Controls */}
              <div className="lg:col-span-7 bg-[#0a0f1d] border border-slate-800/80 rounded-3xl p-8 space-y-6 shadow-2xl">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-bold">Select Service Trade</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button onClick={() => setProjectType('hvac')} className={`py-3.5 px-4 rounded-2xl border text-xs font-bold transition-all ${projectType === 'hvac' ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/25' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'}`}>HVAC & Heat Pump</button>
                    <button onClick={() => setProjectType('roofing')} className={`py-3.5 px-4 rounded-2xl border text-xs font-bold transition-all ${projectType === 'roofing' ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/25' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'}`}>Roofing & Siding</button>
                    <button onClick={() => setProjectType('plumbing')} className={`py-3.5 px-4 rounded-2xl border text-xs font-bold transition-all ${projectType === 'plumbing' ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/25' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'}`}>Plumbing Overhaul</button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-bold">Job Urgency & Scheduling</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setUrgency('standard')} className={`py-3.5 px-4 rounded-2xl border text-sm font-semibold transition ${urgency === 'standard' ? 'bg-blue-600/10 border-blue-500 text-blue-400' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>Standard Dispatch</button>
                    <button onClick={() => setUrgency('emergency')} className={`py-3.5 px-4 rounded-2xl border text-sm font-semibold transition ${urgency === 'emergency' ? 'bg-blue-600/10 border-blue-500 text-blue-400' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>Emergency (+40%)</button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-bold">Portal Add-on Modules</label>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700 transition">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked={addons.portal} onChange={(e) => setAddons({...addons, portal: e.target.checked})} className="rounded bg-slate-950 border-slate-700 text-blue-600 focus:ring-0 h-4 w-4" />
                        <span className="text-sm font-semibold text-slate-200">Secure Client Portal Access</span>
                      </div>
                      <span className="text-xs font-mono text-blue-400 font-bold">+$450</span>
                    </label>

                    <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700 transition">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked={addons.stripe} onChange={(e) => setAddons({...addons, stripe: e.target.checked})} className="rounded bg-slate-950 border-slate-700 text-blue-600 focus:ring-0 h-4 w-4" />
                        <span className="text-sm font-semibold text-slate-200">Stripe Instant Deposit Link</span>
                      </div>
                      <span className="text-xs font-mono text-blue-400 font-bold">+$300</span>
                    </label>

                    <label className="flex items-center justify-between p-4 rounded-2xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700 transition">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked={addons.dispatch} onChange={(e) => setAddons({...addons, dispatch: e.target.checked})} className="rounded bg-slate-950 border-slate-700 text-blue-600 focus:ring-0 h-4 w-4" />
                        <span className="text-sm font-semibold text-slate-200">Employee Job Dispatch Queue</span>
                      </div>
                      <span className="text-xs font-mono text-blue-400 font-bold">+$600</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Summary Card */}
              <div className="lg:col-span-5 bg-gradient-to-br from-blue-950/40 via-[#0a0f1d] to-[#0a0f1d] border border-blue-500/30 rounded-3xl p-8 flex flex-col justify-between shadow-2xl">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold mb-2">Real-Time Quote Summary</div>
                  <div className="text-5xl font-black text-white mb-6 tracking-tight">
                    ${calculateEstimate().toLocaleString()}
                    <span className="text-xs font-normal text-slate-400 block mt-1">Estimated Project Total</span>
                  </div>

                  <div className="space-y-3 text-sm text-slate-300 mb-8 border-t border-slate-800/80 pt-6">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Trade Profile:</span>
                      <span className="font-bold text-white uppercase">{projectType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Urgency:</span>
                      <span className="font-bold text-white capitalize">{urgency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Active Add-ons:</span>
                      <span className="font-bold text-emerald-400">{Object.values(addons).filter(Boolean).length} Enabled</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-4 rounded-2xl transition shadow-xl shadow-emerald-600/25 flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
                  <span>??</span> Proceed to Secure Stripe Checkout
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schemas' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-white">Zero-Overlap Database Architecture</h2>
              <p className="text-sm text-slate-400 mt-1">Isolated PostgreSQL schemas per contractor tenant guaranteeing absolute security.</p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0a0f1d] border border-slate-800/80 shadow-2xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-lg">
                  <div className="text-2xl mb-3">???</div>
                  <h3 className="text-base font-bold text-white mb-1">Schema Partitioning</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">Dedicated namespaces (`tenant_X`) guarantee zero data leaking across competing businesses.</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-lg">
                  <div className="text-2xl mb-3">?</div>
                  <h3 className="text-base font-bold text-white mb-1">Vercel Edge Routing</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">Incoming requests are dynamically routed to specific frontend bundles and secure DB URIs.</p>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-lg">
                  <div className="text-2xl mb-3">??</div>
                  <h3 className="text-base font-bold text-white mb-1">Stripe Automations</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">Successful invoice payments trigger automated tenant account provisioning instantly.</p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 flex justify-between items-center">
                <span className="text-xs font-mono text-slate-400">PostgreSQL 16 Cluster • SSL Enforced</span>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-2xl font-bold text-xs shadow-lg transition">
                  Run Schema Migration Test
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
