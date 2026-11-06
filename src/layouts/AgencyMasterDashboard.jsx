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
    { id: 1, name: 'Apex Electric & HVAC', tier: 'Growth Pro', status: 'Active', mrr: 149, schema: 'tenant_apex_prod', leads: 42, uptime: '99.99%' },
    { id: 2, name: 'Precision Roofing & Siding', tier: 'Startup Launchpad', status: 'Active', mrr: 49, schema: 'tenant_precision_prod', leads: 18, uptime: '100%' },
    { id: 3, name: 'Summit Plumbing Solutions', tier: 'Enterprise', status: 'Provisioning', mrr: 399, schema: 'tenant_summit_prod', leads: 64, uptime: '99.95%' }
  ];

  return (
    <div className="min-h-screen bg-[#06080f] text-slate-100 flex">
      
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-[#0b0e17] border-r border-slate-800 p-6 flex flex-col justify-between shadow-2xl">
        <div>
          <div className="flex items-center gap-3.5 mb-10 pb-6 border-b border-slate-800">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-blue-500/30">
              A
            </div>
            <div>
              <h1 className="text-sm font-extrabold tracking-wider text-white uppercase">Agency Core</h1>
              <p className="text-xs text-blue-400 font-medium">Multi-Tenant OS</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('overview')} 
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-semibold text-sm transition ${activeTab === 'overview' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <span>??</span> Tenant Fleet
            </button>
            <button 
              onClick={() => setActiveTab('estimator')} 
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-semibold text-sm transition ${activeTab === 'estimator' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <span>?</span> Quoting Engine
            </button>
            <button 
              onClick={() => setActiveTab('schemas')} 
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-semibold text-sm transition ${activeTab === 'schemas' ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
            >
              <span>???</span> Data Isolation
            </button>
          </nav>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Cluster Status</div>
          <div className="text-xs text-emerald-400 font-semibold flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            3 Schemas Secured
          </div>
        </div>
      </aside>

      {/* Main Workspace */}
      <main className="flex-1 p-10 overflow-y-auto bg-[#06080f]">
        
        {activeTab === 'overview' && (
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">Client Tenant Fleet</h2>
                <p className="text-sm text-slate-400 mt-1">Manage zero-overlap database schemas and Stripe subscriptions.</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-blue-500/25 transition flex items-center gap-2">
                <span>+</span> Provision New Tenant
              </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div className="p-6 rounded-3xl bg-[#0b0e17] border border-slate-800 shadow-xl">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Monthly Recurring</div>
                <div className="text-3xl font-black text-white">$597 <span className="text-xs text-emerald-400 font-bold">/mo</span></div>
              </div>
              <div className="p-6 rounded-3xl bg-[#0b0e17] border border-slate-800 shadow-xl">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Total Active Leads</div>
                <div className="text-3xl font-black text-white">124</div>
              </div>
              <div className="p-6 rounded-3xl bg-[#0b0e17] border border-slate-800 shadow-xl">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Data Isolation</div>
                <div className="text-3xl font-black text-emerald-400">100%</div>
              </div>
              <div className="p-6 rounded-3xl bg-[#0b0e17] border border-slate-800 shadow-xl">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Platform Status</div>
                <div className="text-3xl font-black text-blue-400">Live</div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {clients.map((client) => (
                <div
                  key={client.id}
                  onClick={() => setSelectedClient(client)}
                  className={`p-7 rounded-3xl bg-[#0b0e17] border cursor-pointer transition shadow-xl ${selectedClient?.id === client.id ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-slate-800 hover:border-slate-700'}`}
                >
                  <div className="flex justify-between items-start mb-5">
                    <div>
                      <span className="text-[11px] font-extrabold font-mono text-blue-400 uppercase tracking-widest px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20">{client.tier}</span>
                      <h3 className="text-lg font-bold text-white mt-3">{client.name}</h3>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {client.status}
                    </span>
                  </div>

                  <div className="space-y-3 my-6 text-sm">
                    <div className="flex justify-between py-1.5 border-b border-slate-800">
                      <span className="text-slate-400">Schema:</span>
                      <code className="text-xs text-indigo-300 font-mono bg-slate-900 px-2 py-0.5 rounded">{client.schema}</code>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800">
                      <span className="text-slate-400">Revenue:</span>
                      <span className="font-bold text-white">${client.mrr}/mo</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-400">Uptime:</span>
                      <span className="text-emerald-400 font-semibold">{client.uptime}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs font-bold text-blue-400">
                    <span>Manage Tenant</span>
                    <span>?</span>
                  </div>
                </div>
              ))}
            </div>

            {selectedClient && (
              <div className="p-8 rounded-3xl bg-[#0b0e17] border border-blue-500/50 shadow-2xl space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs uppercase font-mono text-blue-400 font-bold">Tenant Drawer</span>
                    <h3 className="text-2xl font-black text-white mt-1">{selectedClient.name}</h3>
                    <p className="text-xs font-mono text-slate-400 mt-1">Schema: <span className="text-emerald-400 font-bold">{selectedClient.schema}</span></p>
                  </div>
                  <button onClick={() => setSelectedClient(null)} className="h-9 w-9 rounded-2xl bg-slate-800 text-slate-300 font-bold">?</button>
                </div>
                <div className="flex gap-4">
                  <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow-lg">Launch Portal</button>
                  <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-3.5 rounded-2xl font-bold text-sm border border-slate-700">Sync Stripe</button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'estimator' && (
          <div className="max-w-5xl mx-auto space-y-8">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white">Quoting Engine</h2>
              <p className="text-sm text-slate-400 mt-1">Interactive pricing estimator for contractors.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 bg-[#0b0e17] border border-slate-800 rounded-3xl p-8 space-y-6 shadow-2xl">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-bold">Service Trade</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button onClick={() => setProjectType('hvac')} className={`py-3.5 px-4 rounded-2xl border text-xs font-bold ${projectType === 'hvac' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>HVAC</button>
                    <button onClick={() => setProjectType('roofing')} className={`py-3.5 px-4 rounded-2xl border text-xs font-bold ${projectType === 'roofing' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>Roofing</button>
                    <button onClick={() => setProjectType('plumbing')} className={`py-3.5 px-4 rounded-2xl border text-xs font-bold ${projectType === 'plumbing' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>Plumbing</button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#0b0e17] border border-blue-500/30 rounded-3xl p-8 flex flex-col justify-between shadow-2xl">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold mb-2">Quote Summary</div>
                  <div className="text-5xl font-black text-white mb-6">${calculateEstimate().toLocaleString()}</div>
                </div>
                <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-2xl transition shadow-xl">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'schemas' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl font-extrabold text-white">Zero-Overlap Architecture</h2>
            <div className="p-8 rounded-3xl bg-[#0b0e17] border border-slate-800 shadow-2xl">
              <p className="text-sm text-slate-400">Isolated PostgreSQL namespaces (`tenant_X`) guarantee absolute data security.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
