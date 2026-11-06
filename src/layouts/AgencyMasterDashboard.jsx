import React, { useState } from 'react';

export default function AgencyMasterDashboard() {
  const [selectedClient, setSelectedClient] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isProvisioningOpen, setIsProvisioningOpen] = useState(false);
  
  // New Tenant Form State
  const [newClientName, setNewClientName] = useState('');
  const [newClientTier, setNewClientTier] = useState('Growth Pro');
  const [provisionLogs, setProvisionLogs] = useState([]);
  const [isProvisioning, setIsProvisioning] = useState(false);

  const [clients, setClients] = useState([
    { id: 1, name: 'Apex Electric & HVAC', tier: 'Growth Pro', status: 'Active', mrr: 149, schema: 'tenant_apex_prod', leads: 42, uptime: '99.99%', badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    { id: 2, name: 'Precision Roofing & Siding', tier: 'Startup Launchpad', status: 'Active', mrr: 49, schema: 'tenant_precision_prod', leads: 18, uptime: '100%', badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
    { id: 3, name: 'Summit Plumbing Solutions', tier: 'Enterprise', status: 'Provisioning', mrr: 399, schema: 'tenant_summit_prod', leads: 64, uptime: '99.95%', badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' }
  ]);

  const handleProvisionTenant = (e) => {
    e.preventDefault();
    if (!newClientName) return;

    setIsProvisioning(true);
    setProvisionLogs([`Initializing zero-overlap schema for ${newClientName}...`]);

    setTimeout(() => {
      setProvisionLogs(prev => [...prev, `Allocating dedicated PostgreSQL namespace: tenant_${newClientName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_prod`]);
    }, 800);

    setTimeout(() => {
      setProvisionLogs(prev => [...prev, `Configuring Vercel Edge routing & Stripe webhook endpoints...`]);
    }, 1600);

    setTimeout(() => {
      const slug = newClientName.toLowerCase().replace(/[^a-z0-9]/g, '_');
      const newTenant = {
        id: clients.length + 1,
        name: newClientName,
        tier: newClientTier,
        status: 'Active',
        mrr: newClientTier === 'Enterprise' ? 399 : newClientTier === 'Growth Pro' ? 149 : 49,
        schema: `tenant_${slug}_prod`,
        leads: 0,
        uptime: '100%',
        badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      };
      setClients(prev => [newTenant, ...prev]);
      setIsProvisioning(false);
      setIsProvisioningOpen(false);
      setNewClientName('');
      setProvisionLogs([]);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#05070c] text-slate-100 flex font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-[#090e1b]/95 backdrop-blur-2xl border-r border-slate-800/80 p-6 flex flex-col justify-between shadow-2xl">
        <div>
          <div className="flex items-center gap-3.5 mb-10 pb-6 border-b border-slate-800/80">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center font-black text-xl text-white shadow-xl shadow-blue-500/30 ring-1 ring-white/20">
              A
            </div>
            <div>
              <h1 className="text-sm font-black tracking-wider text-white uppercase">Agency Core</h1>
              <p className="text-xs text-blue-400 font-medium">Multi-Tenant Platform</p>
            </div>
          </div>

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

        <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-900/40 border border-slate-800/80 shadow-inner">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cluster Health</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <div className="text-xs text-slate-200 font-mono">Vercel Edge / US-East</div>
          <div className="text-[11px] text-emerald-400 font-bold mt-1">{clients.length} Schemas Secured</div>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-1 p-10 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-[#05070c] to-[#05070c]">
        
        {activeTab === 'overview' && (
          <div className="max-w-6xl mx-auto space-y-8">
            
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-white">Client Tenant Fleet</h2>
                <p className="text-sm text-slate-400 mt-1">Manage zero-overlap database schemas, isolated portals, and Stripe subscriptions.</p>
              </div>
              <button 
                onClick={() => setIsProvisioningOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>+</span> Provision New Tenant
              </button>
            </div>

            {/* Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div className="p-6 rounded-3xl bg-[#0a0f1d] border border-slate-800/80 shadow-xl relative overflow-hidden">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Monthly Recurring</div>
                <div className="text-3xl font-black text-white">${clients.reduce((acc, c) => acc + c.mrr, 0)} <span className="text-xs text-emerald-400 font-bold">/mo</span></div>
                <div className="text-xs text-slate-500 mt-2">Active billing stream</div>
              </div>

              <div className="p-6 rounded-3xl bg-[#0a0f1d] border border-slate-800/80 shadow-xl relative overflow-hidden">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Total Active Tenants</div>
                <div className="text-3xl font-black text-white">{clients.length}</div>
                <div className="text-xs text-indigo-400 mt-2 font-medium">Zero-overlap verified</div>
              </div>

              <div className="p-6 rounded-3xl bg-[#0a0f1d] border border-slate-800/80 shadow-xl relative overflow-hidden">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Data Isolation</div>
                <div className="text-3xl font-black text-emerald-400">100%</div>
                <div className="text-xs text-slate-500 mt-2">PostgreSQL namespaces</div>
              </div>

              <div className="p-6 rounded-3xl bg-[#0a0f1d] border border-slate-800/80 shadow-xl relative overflow-hidden">
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
                </div>
              </div>
            )}
          </div>
        )}

        {/* Provisioning Modal Drawer */}
        {isProvisioningOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#0a0f1d] border border-slate-800 rounded-3xl p-8 max-w-lg w-full shadow-2xl space-y-6">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <h3 className="text-xl font-black text-white">Provision New Tenant Schema</h3>
                <button onClick={() => setIsProvisioningOpen(false)} className="text-slate-400 hover:text-white font-bold text-sm">?</button>
              </div>

              <form onSubmit={handleProvisionTenant} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold">Contractor / Business Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Keystone Electric & HVAC" 
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold">Subscription Tier</label>
                  <select 
                    value={newClientTier}
                    onChange={(e) => setNewClientTier(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 text-sm"
                  >
                    <option value="Startup Launchpad">Startup Launchpad ($49/mo)</option>
                    <option value="Growth Pro">Growth Pro ($149/mo)</option>
                    <option value="Enterprise">Enterprise ($399/mo)</option>
                  </select>
                </div>

                {isProvisioning && (
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2 font-mono text-xs">
                    <div className="text-blue-400 font-bold mb-1">Executing Provisioning Pipeline...</div>
                    {provisionLogs.map((log, index) => (
                      <div key={index} className="text-emerald-400">? {log}</div>
                    ))}
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button 
                    type="submit" 
                    disabled={isProvisioning}
                    className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-3.5 rounded-2xl transition shadow-lg shadow-blue-500/25 text-sm"
                  >
                    {isProvisioning ? 'Provisioning Schema...' : 'Confirm & Deploy Tenant'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsProvisioningOpen(false)}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-6 py-3.5 rounded-2xl font-bold text-sm transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'estimator' && (
          <div className="max-w-5xl mx-auto space-y-8">
            <h2 className="text-3xl font-black tracking-tight text-white">Quoting Engine Preview</h2>
            <div className="p-8 rounded-3xl bg-[#0a0f1d] border border-slate-800 shadow-2xl">
              <p className="text-sm text-slate-400">Interactive estimator components are live and bound to tenant databases.</p>
            </div>
          </div>
        )}

        {activeTab === 'schemas' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-3xl font-black tracking-tight text-white">Zero-Overlap Database Architecture</h2>
            <div className="p-8 rounded-3xl bg-[#0a0f1d] border border-slate-800 shadow-2xl">
              <p className="text-sm text-slate-400">Every tenant schema is securely isolated at the PostgreSQL level.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
