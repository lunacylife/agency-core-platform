import React, { useState } from 'react';

export default function AgencyMasterDashboard() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [activeTab, setActiveTab] = useState('clients');

  // Estimator State for live preview
  const [projectType, setProjectType] = useState('hvac');
  const [urgency, setUrgency] = useState('standard');
  const [addons, setAddons] = useState({ portal: true, stripe: true, dispatch: false });

  const calculateEstimate = () => {
    let base = projectType === 'hvac' ? 1200 : projectType === 'roofing' ? 1800 : 1500;
    if (urgency === 'emergency') base *= 1.5;
    if (addons.portal) base += 350;
    if (addons.stripe) base += 250;
    if (addons.dispatch) base += 500;
    return base;
  };

  const clients = [
    { id: 1, name: 'Apex Electric & HVAC', tier: 'Growth Pro', status: 'Active', mrr: 149, leads: 38, jobs: 14 },
    { id: 2, name: 'Precision Roofing & Siding', tier: 'Startup Launchpad', status: 'Active', mrr: 49, leads: 19, jobs: 8 },
    { id: 3, name: 'Summit Plumbing Solutions', tier: 'Enterprise', status: 'Onboarding', mrr: 399, leads: 62, jobs: 27 }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900/80 backdrop-blur border-r border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">A</div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white leading-tight">Agency Core</h1>
              <p className="text-xs text-slate-400">Multi-Tenant Platform</p>
            </div>
          </div>
          <nav className="space-y-1.5">
            <button onClick={() => setActiveTab('clients')} className={w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition }>
              <span>??</span> Client Portals
            </button>
            <button onClick={() => setActiveTab('estimator')} className={w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition }>
              <span>??</span> Public Estimator Engine
            </button>
            <button onClick={() => setActiveTab('jobs')} className={w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition }>
              <span>?</span> Job Dispatch Queue
            </button>
          </nav>
        </div>
        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
          <div className="text-xs font-semibold text-slate-300 mb-1">System Status</div>
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Isolated Schemas Active
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        {activeTab === 'clients' && (
          <div>
            <header className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Client Tenant Management</h2>
                <p className="text-sm text-slate-400 mt-1">Zero-overlap database schemas and active subscription monitoring.</p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition shadow-lg shadow-blue-600/25 flex items-center gap-2">
                <span>+</span> Provision New Tenant
              </button>
            </header>

            {/* Client Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {clients.map((client) => (
                <div
                  key={client.id}
                  onClick={() => setSelectedClient(client)}
                  className={p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-900/60 border cursor-pointer transition-all shadow-xl hover:shadow-blue-500/10 }
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-bold text-white text-base">{client.name}</span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 font-medium border border-blue-500/20">{client.tier}</span>
                  </div>
                  <div className="space-y-2 text-sm text-slate-400 mb-4">
                    <div className="flex justify-between"><span>Status:</span> <span className="text-emerald-400 font-medium">{client.status}</span></div>
                    <div className="flex justify-between"><span>Monthly Revenue:</span> <span className="text-white font-semibold">\/mo</span></div>
                    <div className="flex justify-between"><span>Active Leads:</span> <span className="text-slate-200">{client.leads}</span></div>
                  </div>
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-blue-400 font-medium">
                    <span>Configure Schema</span>
                    <span>?</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Client Detail Panel */}
            {selectedClient ? (
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedClient.name}</h3>
                    <p className="text-sm text-slate-400">Schema ID: <code className="text-blue-400">tenant_{selectedClient.id}_prod</code></p>
                  </div>
                  <button onClick={() => setSelectedClient(null)} className="text-slate-400 hover:text-white text-sm">? Close</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
                    <div className="text-xs text-slate-400 mb-1">Stripe Billing</div>
                    <div className="text-lg font-bold text-white">\ <span className="text-xs font-normal text-slate-400">/ month</span></div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
                    <div className="text-xs text-slate-400 mb-1">Dispatched Jobs</div>
                    <div className="text-lg font-bold text-white">{selectedClient.jobs} completed</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
                    <div className="text-xs text-slate-400 mb-1">Isolated Database</div>
                    <div className="text-lg font-bold text-emerald-400">Encrypted & Active</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition shadow-lg shadow-blue-600/20">
                    Launch Client Portal
                  </button>
                  <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 rounded-xl font-medium text-sm transition border border-slate-700">
                    Stripe Dashboard Sync
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 rounded-2xl border border-dashed border-slate-800 text-center text-slate-500 text-sm">
                Select a client card above to manage isolated database schemas, billing, and dispatcher rules.
              </div>
            )}
          </div>
        )}

        {activeTab === 'estimator' && (
          <div>
            <header className="mb-8">
              <h2 className="text-2xl font-bold text-white tracking-tight">Public Estimator Engine Preview</h2>
              <p className="text-sm text-slate-400 mt-1">Test the embeddable quoting widget generated for trade contractors.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Controls */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Service Trade / Project Type</label>
                  <select value={projectType} onChange={(e) => setProjectType(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500">
                    <option value="hvac">HVAC Replacement & Repair</option>
                    <option value="roofing">Roofing & Siding Installation</option>
                    <option value="plumbing">Full Home Plumbing Overhaul</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Service Urgency</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => setUrgency('standard')} className={py-3 px-4 rounded-xl border text-sm font-medium transition }>Standard Scheduling</button>
                    <button onClick={() => setUrgency('emergency')} className={py-3 px-4 rounded-xl border text-sm font-medium transition }>Emergency Dispatch (+50%)</button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Selected Add-ons</label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                      <input type="checkbox" checked={addons.portal} onChange={(e) => setAddons({...addons, portal: e.target.checked})} className="rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0" />
                      <span className="text-sm text-slate-300">Client Portal Access ()</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                      <input type="checkbox" checked={addons.stripe} onChange={(e) => setAddons({...addons, stripe: e.target.checked})} className="rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0" />
                      <span className="text-sm text-slate-300">Stripe Instant Deposit Link ()</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                      <input type="checkbox" checked={addons.dispatch} onChange={(e) => setAddons({...addons, dispatch: e.target.checked})} className="rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-0" />
                      <span className="text-sm text-slate-300">Advanced Employee Dispatch Queue ()</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Real-Time Quote Summary Card */}
              <div className="bg-gradient-to-b from-blue-950/40 to-slate-900 border border-blue-500/30 rounded-2xl p-6 flex flex-col justify-between shadow-2xl">
                <div>
                  <div className="text-xs uppercase tracking-wider text-blue-400 font-semibold mb-2">Instant Estimate Breakdown</div>
                  <div className="text-4xl font-extrabold text-white mb-6">\ <span className="text-sm font-normal text-slate-400">Estimated Total</span></div>
                  <ul className="space-y-3 text-sm text-slate-300 mb-8">
                    <li className="flex justify-between pb-2 border-b border-slate-800"><span>Project Type:</span> <span className="font-semibold text-white uppercase">{projectType}</span></li>
                    <li className="flex justify-between pb-2 border-b border-slate-800"><span>Urgency Multiplier:</span> <span className="font-semibold text-white capitalize">{urgency}</span></li>
                    <li className="flex justify-between pb-2 border-b border-slate-800"><span>Active Add-ons:</span> <span className="font-semibold text-emerald-400">{Object.values(addons).filter(Boolean).length} Selected</span></li>
                  </ul>
                </div>
                <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3.5 rounded-xl transition shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2">
                  <span>??</span> Proceed to Stripe Secure Deposit
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'jobs' && (
          <div>
            <header className="mb-8">
              <h2 className="text-2xl font-bold text-white tracking-tight">Job Dispatch Queue</h2>
              <p className="text-sm text-slate-400 mt-1">Real-time task routing for field technicians and contractors.</p>
            </header>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
              <div className="text-3xl mb-3">?</div>
              <h3 className="text-lg font-bold text-white mb-1">Queue Synchronized</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">All incoming leads from the estimator engine are automatically routed to tenant-specific job queues.</p>
              <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition">
                Simulate New Lead Submission
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
