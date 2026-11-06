import React, { useState } from 'react';

export default function AgencyMasterDashboard() {
  const [activeTab, setActiveTab] = useState('fleet');
  const [isProvisioningOpen, setIsProvisioningOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  // Full Multi-Tenant Fleet State with Domains, Stripe, Business Configs & Employees
  const [clients, setClients] = useState([
    { 
      id: 1, 
      name: 'Apex Electric & HVAC', 
      tier: 'Growth Pro', 
      status: 'Active', 
      mrr: 149, 
      schema: 'tenant_apex_prod', 
      customDomain: 'apexelectric.com',
      vercelUrl: 'apex-hvac-portal.vercel.app',
      stripeKey: 'pk_live_51M...Apex',
      badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      businessConfig: {
        tradeType: 'HVAC & Electrical',
        baseQuoteRate: 1500,
        emergencyFee: 400,
        taxRate: 7.0,
        customServices: [
          { id: 1, name: 'Heat Pump Diagnostics', price: 175 },
          { id: 2, name: '220V Circuit Install', price: 350 }
        ],
        employees: [
          { id: 1, name: 'Marcus Vance', role: 'Lead Electrician', phone: '(814) 555-0192', status: 'On Job' }
        ]
      }
    },
    { 
      id: 2, 
      name: 'Precision Roofing & Siding', 
      tier: 'Startup Launchpad', 
      status: 'Active', 
      mrr: 49, 
      schema: 'tenant_precision_prod', 
      customDomain: 'precisionroofingpa.com',
      vercelUrl: 'precision-roofing.vercel.app',
      stripeKey: 'pk_live_51M...Prec',
      badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      businessConfig: {
        tradeType: 'Roofing & Siding',
        baseQuoteRate: 2400,
        emergencyFee: 750,
        taxRate: 6.0,
        customServices: [
          { id: 1, name: 'Shingle Replacement', price: 350 }
        ],
        employees: [
          { id: 1, name: 'Tom Bradley', role: 'Crew Chief', phone: '(814) 555-7733', status: 'Available' }
        ]
      }
    },
    { 
      id: 3, 
      name: 'Summit Plumbing Solutions', 
      tier: 'Enterprise', 
      status: 'Provisioning', 
      mrr: 399, 
      schema: 'tenant_summit_prod', 
      customDomain: 'summitplumbing.net',
      vercelUrl: 'summit-plumbing.vercel.app',
      stripeKey: 'pk_live_51M...Summ',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      businessConfig: {
        tradeType: 'Plumbing & Drains',
        baseQuoteRate: 1200,
        emergencyFee: 350,
        taxRate: 7.0,
        customServices: [
          { id: 1, name: 'Hydro Jetting', price: 450 }
        ],
        employees: [
          { id: 1, name: 'Sarah Jenkins', role: 'Master Plumber', phone: '(814) 555-8822', status: 'Dispatched' }
        ]
      }
    }
  ]);

  // Agency Master Stripe & Global Settings State
  const [agencyStripeConfig, setAgencyStripeConfig] = useState({
    secretKey: 'sk_live_51AgencyMaster...Secure',
    webhookSecret: 'whsec_AgencyCoreWebhook2026',
    platformFeePercent: 12.5
  });

  // Onboarding Form State
  const [newClientName, setNewClientName] = useState('');
  const [newClientTier, setNewClientTier] = useState('Growth Pro');
  const [newClientDomain, setNewClientDomain] = useState('');
  const [provisionLogs, setProvisionLogs] = useState([]);
  const [isProvisioning, setIsProvisioning] = useState(false);

  const handleUpdateClient = (updated) => {
    setClients(prev => prev.map(c => c.id === updated.id ? updated : c));
    setSelectedClient(updated);
  };

  const handleProvisionTenant = (e) => {
    e.preventDefault();
    if (!newClientName) return;

    setIsProvisioning(true);
    setProvisionLogs([`Initializing zero-overlap PostgreSQL schema for ${newClientName}...`]);

    setTimeout(() => {
      setProvisionLogs(prev => [...prev, `Allocating namespace: tenant_${newClientName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_prod`]);
    }, 700);

    setTimeout(() => {
      setProvisionLogs(prev => [...prev, `Configuring Vercel Edge custom domain binding (${newClientDomain || 'pending.vercel.app'})...`]);
    }, 1400);

    setTimeout(() => {
      setProvisionLogs(prev => [...prev, `Linking automated Stripe checkout webhooks and deposit endpoints...`]);
    }, 2100);

    setTimeout(() => {
      const slug = newClientName.toLowerCase().replace(/[^a-z0-9]/g, '_');
      const newTenant = {
        id: clients.length + 1,
        name: newClientName,
        tier: newClientTier,
        status: 'Active',
        mrr: newClientTier === 'Enterprise' ? 399 : newClientTier === 'Growth Pro' ? 149 : 49,
        schema: `tenant_${slug}_prod`,
        customDomain: newClientDomain || `${slug}.com`,
        vercelUrl: `${slug}-portal.vercel.app`,
        stripeKey: `pk_live_51M...${slug.slice(0,4)}`,
        badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
        businessConfig: {
          tradeType: 'General Contracting',
          baseQuoteRate: 1500,
          emergencyFee: 350,
          taxRate: 6.5,
          customServices: [{ id: 1, name: 'Initial Inspection & Quote', price: 150 }],
          employees: [{ id: 1, name: 'Field Lead', role: 'Manager', phone: '(814) 555-0000', status: 'Available' }]
        }
      };
      setClients(prev => [newTenant, ...prev]);
      setIsProvisioning(false);
      setIsProvisioningOpen(false);
      setNewClientName('');
      setNewClientDomain('');
      setProvisionLogs([]);
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-[#05070c] text-slate-100 flex font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Master Sidebar Navigation */}
      <aside className="w-72 bg-[#090e1b]/95 backdrop-blur-2xl border-r border-slate-800/80 p-6 flex flex-col justify-between shadow-2xl">
        <div>
          <div className="flex items-center gap-3.5 mb-10 pb-6 border-b border-slate-800/80">
            <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center font-black text-xl text-white shadow-xl shadow-blue-500/30 ring-1 ring-white/20">
              A
            </div>
            <div>
              <h1 className="text-sm font-black tracking-wider text-white uppercase">Agency Master</h1>
              <p className="text-xs text-blue-400 font-medium">Command Center v2.5</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button 
              onClick={() => { setActiveTab('fleet'); setSelectedClient(null); }} 
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${activeTab === 'fleet' && !selectedClient ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 ring-1 ring-white/10' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
            >
              <span>??</span> Tenant Fleet ({clients.length})
            </button>
            <button 
              onClick={() => setActiveTab('domains')} 
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${activeTab === 'domains' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 ring-1 ring-white/10' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
            >
              <span>??</span> Domain & URL Routing
            </button>
            <button 
              onClick={() => setActiveTab('payments')} 
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${activeTab === 'payments' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 ring-1 ring-white/10' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
            >
              <span>??</span> Stripe & Payment Config
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
          <div className="text-[11px] text-emerald-400 font-bold mt-1">100% Uptime Guaranteed</div>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-1 p-10 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-[#05070c] to-[#05070c]">
        
        {/* TAB 1: TENANT FLEET & BUSINESS CONFIGURATOR */}
        {activeTab === 'fleet' && !selectedClient && (
          <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
            
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-white">Client Tenant Fleet & Onboarding</h2>
                <p className="text-sm text-slate-400 mt-1">Provision new contractor accounts, manage database schemas, and configure business operations.</p>
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
              <div className="p-6 rounded-3xl bg-[#0a0f1d] border border-slate-800/80 shadow-xl">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Monthly Recurring</div>
                <div className="text-3xl font-black text-white">${clients.reduce((acc, c) => acc + c.mrr, 0)} <span className="text-xs text-emerald-400 font-bold">/mo</span></div>
                <div className="text-xs text-slate-500 mt-2">Active billing stream</div>
              </div>
              <div className="p-6 rounded-3xl bg-[#0a0f1d] border border-slate-800/80 shadow-xl">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Active Tenants</div>
                <div className="text-3xl font-black text-white">{clients.length}</div>
                <div className="text-xs text-indigo-400 mt-2 font-medium">Zero-overlap verified</div>
              </div>
              <div className="p-6 rounded-3xl bg-[#0a0f1d] border border-slate-800/80 shadow-xl">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Data Isolation</div>
                <div className="text-3xl font-black text-emerald-400">100%</div>
                <div className="text-xs text-slate-500 mt-2">PostgreSQL namespaces</div>
              </div>
              <div className="p-6 rounded-3xl bg-[#0a0f1d] border border-slate-800/80 shadow-xl">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Platform Status</div>
                <div className="text-3xl font-black text-blue-400">Live</div>
                <div className="text-xs text-slate-500 mt-2">Vercel edge production</div>
              </div>
            </div>

            {/* Tenant Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {clients.map((client) => (
                <div
                  key={client.id}
                  onClick={() => setSelectedClient(client)}
                  className="p-7 rounded-3xl bg-[#0a0f1d] border border-slate-800/80 cursor-pointer hover:border-blue-500 transition-all shadow-2xl relative group"
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
                      <span className="text-slate-400">Custom Domain:</span>
                      <span className="font-mono text-xs text-blue-400">{client.customDomain}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                      <span className="text-slate-400">Services Configured:</span>
                      <span className="font-bold text-emerald-400">{client.businessConfig.customServices.length} items</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-400">Dispatch Techs:</span>
                      <span className="font-bold text-indigo-400">{client.businessConfig.employees.length} active</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs font-bold text-blue-400 group-hover:translate-x-1 transition-transform">
                    <span>Manage Business & Domain Config</span>
                    <span>?</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SELECTED CLIENT BUSINESS CONFIGURATOR */}
        {activeTab === 'fleet' && selectedClient && (
          <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs uppercase font-mono text-blue-400 font-bold tracking-wider">Tenant Business Configurator & Operations</span>
                <h3 className="text-2xl font-black text-white mt-1">{selectedClient.name}</h3>
              </div>
              <button onClick={() => setSelectedClient(null)} className="text-xs font-bold bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl text-slate-200 transition">
                ? Back to Tenant Fleet
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Pricing & Formulas */}
              <div className="p-6 rounded-3xl bg-[#0a0f1d] border border-slate-800 space-y-4 shadow-xl">
                <h4 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">1. Estimator Formula</h4>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Base Project Quote ($)</label>
                  <input 
                    type="number"
                    value={selectedClient.businessConfig.baseQuoteRate}
                    onChange={(e) => handleUpdateClient({
                      ...selectedClient, 
                      businessConfig: { ...selectedClient.businessConfig, baseQuoteRate: Number(e.target.value) }
                    })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Emergency Dispatch Fee ($)</label>
                  <input 
                    type="number"
                    value={selectedClient.businessConfig.emergencyFee}
                    onChange={(e) => handleUpdateClient({
                      ...selectedClient, 
                      businessConfig: { ...selectedClient.businessConfig, emergencyFee: Number(e.target.value) }
                    })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Custom Services */}
              <div className="p-6 rounded-3xl bg-[#0a0f1d] border border-slate-800 space-y-4 shadow-xl">
                <h4 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">2. Custom Services</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedClient.businessConfig.customServices.map(s => (
                    <div key={s.id} className="flex justify-between items-center p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                      <span className="text-white font-medium">{s.name}</span>
                      <span className="text-emerald-400 font-bold">${s.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Employee Roster */}
              <div className="p-6 rounded-3xl bg-[#0a0f1d] border border-slate-800 space-y-4 shadow-xl">
                <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold">3. Employee SMS Roster</h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedClient.businessConfig.employees.map(e => (
                    <div key={e.id} className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                      <div className="font-bold text-white">{e.name} ({e.role})</div>
                      <div className="text-emerald-400 text-[10px]">{e.phone} • {e.status}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DOMAIN & URL ROUTING */}
        {activeTab === 'domains' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-white">Domain & URL Routing Manager</h2>
              <p className="text-sm text-slate-400 mt-1">Configure custom domain mappings and Vercel edge endpoints for your agency and contractor clients.</p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0a0f1d] border border-slate-800 shadow-2xl space-y-6">
              <h3 className="text-lg font-bold text-white">Active Client Domain Mappings</h3>
              <div className="space-y-4">
                {clients.map(c => (
                  <div key={c.id} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex justify-between items-center">
                    <div>
                      <div className="font-bold text-white text-sm">{c.name}</div>
                      <div className="text-xs font-mono text-blue-400 mt-0.5">Custom Domain: {c.customDomain}</div>
                      <div className="text-xs font-mono text-slate-400">Vercel Edge: {c.vercelUrl}</div>
                    </div>
                    <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl font-bold text-xs transition">
                      Configure DNS
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: STRIPE & PAYMENT CONFIG */}
        {activeTab === 'payments' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-white">Stripe & Payment Configuration</h2>
              <p className="text-sm text-slate-400 mt-1">Manage global API keys, webhook signing secrets, and automated SaaS billing splits.</p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0a0f1d] border border-slate-800 shadow-2xl space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold">Stripe Live Secret Key</label>
                <input 
                  type="password"
                  value={agencyStripeConfig.secretKey}
                  onChange={(e) => setAgencyStripeConfig({...agencyStripeConfig, secretKey: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold">Webhook Signing Secret</label>
                <input 
                  type="password"
                  value={agencyStripeConfig.webhookSecret}
                  onChange={(e) => setAgencyStripeConfig({...agencyStripeConfig, webhookSecret: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg transition text-sm">
                Save Payment Gateway Credentials
              </button>
            </div>
          </div>
        )}

        {/* PROVISIONING MODAL */}
        {isProvisioningOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#0a0f1d] border border-slate-800 rounded-3xl p-8 max-w-lg w-full shadow-2xl space-y-6">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <h3 className="text-xl font-black text-white">Provision New Tenant Account</h3>
                <button onClick={() => setIsProvisioningOpen(false)} className="text-slate-400 hover:text-white font-bold text-sm">?</button>
              </div>

              <form onSubmit={handleProvisionTenant} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold">Contractor Business Name</label>
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
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold">Custom Domain</label>
                  <input 
                    type="text" 
                    placeholder="e.g. keystoneelectric.com" 
                    value={newClientDomain}
                    onChange={(e) => setNewClientDomain(e.target.value)}
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
                    className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-3.5 rounded-2xl transition shadow-lg text-sm"
                  >
                    {isProvisioning ? 'Provisioning...' : 'Deploy Tenant Account'}
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
      </main>
    </div>
  );
}
