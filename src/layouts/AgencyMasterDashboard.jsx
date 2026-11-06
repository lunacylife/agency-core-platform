import React, { useState } from 'react';

export default function AgencyMasterDashboard() {
  const [activeTab, setActiveTab] = useState('fleet');
  const [selectedClient, setSelectedClient] = useState(null);
  const [clientSubTab, setClientSubTab] = useState('config'); // 'config' | 'employees' | 'dns' | 'preview'
  const [isProvisioningOpen, setIsProvisioningOpen] = useState(false);

  // Full Multi-Tenant Fleet State with Complete Client Backends
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
      landingPageHeadline: 'Expert Electrical & HVAC Services in Erie, PA',
      badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      businessConfig: {
        tradeType: 'HVAC & Electrical',
        baseQuoteRate: 1500,
        emergencyFee: 400,
        taxRate: 7.0,
        customServices: [
          { id: 1, name: 'Heat Pump Diagnostics', price: 175 },
          { id: 2, name: '220V Circuit Install', price: 350 },
          { id: 3, name: 'Full Duct Cleaning', price: 600 }
        ],
        employees: [
          { id: 1, name: 'Marcus Vance', role: 'Lead Electrician', phone: '(814) 555-0192', status: 'On Job' },
          { id: 2, name: 'Dave Miller', role: 'HVAC Tech', phone: '(814) 555-4821', status: 'Available' }
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
      landingPageHeadline: 'Premier Roofing & Siding Installation',
      badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      businessConfig: {
        tradeType: 'Roofing & Siding',
        baseQuoteRate: 2400,
        emergencyFee: 750,
        taxRate: 6.0,
        customServices: [
          { id: 1, name: 'Shingle Replacement', price: 350 },
          { id: 2, name: 'Gutter Guard Install', price: 900 }
        ],
        employees: [
          { id: 1, name: 'Tom Bradley', role: 'Crew Chief', phone: '(814) 555-7733', status: 'On Job' }
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
      landingPageHeadline: '24/7 Emergency Plumbing & Drain Overhaul',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      businessConfig: {
        tradeType: 'Plumbing & Drains',
        baseQuoteRate: 1200,
        emergencyFee: 350,
        taxRate: 7.0,
        customServices: [
          { id: 1, name: 'Hydro Jetting', price: 450 },
          { id: 2, name: 'Tankless Water Heater', price: 1800 }
        ],
        employees: [
          { id: 1, name: 'Sarah Jenkins', role: 'Master Plumber', phone: '(814) 555-8822', status: 'Dispatched' },
          { id: 2, name: 'Leo Gomez', role: 'Apprentice', phone: '(814) 555-9944', status: 'Available' }
        ]
      }
    }
  ]);

  // New Service / Employee Input State for Selected Client
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [newEmpName, setNewEmpName] = useState('');
  const [newEmpRole, setNewEmpRole] = useState('');
  const [newEmpPhone, setNewEmpPhone] = useState('');

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

  const handleAddService = () => {
    if (!newServiceName || !newServicePrice || !selectedClient) return;
    const updatedServices = [
      ...selectedClient.businessConfig.customServices,
      { id: Date.now(), name: newServiceName, price: Number(newServicePrice) }
    ];
    const updatedClient = {
      ...selectedClient,
      businessConfig: { ...selectedClient.businessConfig, customServices: updatedServices }
    };
    handleUpdateClient(updatedClient);
    setNewServiceName('');
    setNewServicePrice('');
  };

  const handleDeleteService = (serviceId) => {
    const updatedServices = selectedClient.businessConfig.customServices.filter(s => s.id !== serviceId);
    const updatedClient = {
      ...selectedClient,
      businessConfig: { ...selectedClient.businessConfig, customServices: updatedServices }
    };
    handleUpdateClient(updatedClient);
  };

  const handleAddEmployee = () => {
    if (!newEmpName || !selectedClient) return;
    const updatedEmployees = [
      ...selectedClient.businessConfig.employees,
      { id: Date.now(), name: newEmpName, role: newEmpRole || 'Field Tech', phone: newEmpPhone || '(814) 555-0000', status: 'Available' }
    ];
    const updatedClient = {
      ...selectedClient,
      businessConfig: { ...selectedClient.businessConfig, employees: updatedEmployees }
    };
    handleUpdateClient(updatedClient);
    setNewEmpName('');
    setNewEmpRole('');
    setNewEmpPhone('');
  };

  const handleDeleteEmployee = (empId) => {
    const updatedEmployees = selectedClient.businessConfig.employees.filter(e => e.id !== empId);
    const updatedClient = {
      ...selectedClient,
      businessConfig: { ...selectedClient.businessConfig, employees: updatedEmployees }
    };
    handleUpdateClient(updatedClient);
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
        landingPageHeadline: `Professional ${newClientName} Services`,
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
    }, 2100);
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
              <p className="text-xs text-blue-400 font-medium">Command Center v2.6</p>
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
              onClick={() => setActiveTab('global-settings')} 
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${activeTab === 'global-settings' ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 ring-1 ring-white/10' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
            >
              <span>??</span> Global Agency Settings
            </button>
          </nav>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-900/40 border border-slate-800/80 shadow-inner">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Master Status</div>
          <div className="text-xs text-emerald-400 font-bold mt-1">Full Backend Access Active</div>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <main className="flex-1 p-10 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-[#05070c] to-[#05070c]">
        
        {/* VIEW A: TENANT FLEET GRID */}
        {activeTab === 'fleet' && !selectedClient && (
          <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
            
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-white">Client Tenant Fleet</h2>
                <p className="text-sm text-slate-400 mt-1">Select any contractor client below to open their full backend command center, employee roster, and DNS settings.</p>
              </div>
              <button 
                onClick={() => setIsProvisioningOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow-xl shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>+</span> Provision New Tenant
              </button>
            </div>

            {/* Tenant Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {clients.map((client) => (
                <div
                  key={client.id}
                  onClick={() => { setSelectedClient(client); setClientSubTab('config'); }}
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
                      <span className="text-slate-400">Custom Services:</span>
                      <span className="font-bold text-emerald-400">{client.businessConfig.customServices.length} items</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-400">Dispatch Techs:</span>
                      <span className="font-bold text-indigo-400">{client.businessConfig.employees.length} active</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs font-bold text-blue-400 group-hover:translate-x-1 transition-transform">
                    <span>Open Client Backend Admin</span>
                    <span>?</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW B: FULL CLIENT BACKEND COMMAND CENTER */}
        {activeTab === 'fleet' && selectedClient && (
          <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
            
            {/* Top Bar with Sub-Navigation */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 gap-4">
              <div>
                <span className="text-xs uppercase font-mono text-blue-400 font-bold tracking-wider">Client Backend Admin Control</span>
                <h3 className="text-2xl font-black text-white mt-1">{selectedClient.name}</h3>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setClientSubTab('config')} 
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${clientSubTab === 'config' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
                >
                  ?? Business Config & Quotes
                </button>
                <button 
                  onClick={() => setClientSubTab('employees')} 
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${clientSubTab === 'employees' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
                >
                  ?? Employee Roster & SMS
                </button>
                <button 
                  onClick={() => setClientSubTab('dns')} 
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${clientSubTab === 'dns' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'}`}
                >
                  ?? DNS & Web Deploy
                </button>
                <button 
                  onClick={() => setSelectedClient(null)} 
                  className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl text-slate-300 text-xs font-bold transition ml-2"
                >
                  ? All Clients
                </button>
              </div>
            </div>

            {/* SUB-TAB 1: BUSINESS CONFIG & QUOTING FORMULAS */}
            {clientSubTab === 'config' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeIn">
                <div className="p-7 rounded-3xl bg-[#0a0f1d] border border-slate-800 space-y-6 shadow-2xl">
                  <h4 className="text-sm font-mono uppercase tracking-wider text-blue-400 font-bold">Estimator Pricing Formulas</h4>
                  
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Base Project Quote ($)</label>
                    <input 
                      type="number"
                      value={selectedClient.businessConfig.baseQuoteRate}
                      onChange={(e) => handleUpdateClient({
                        ...selectedClient, 
                        businessConfig: { ...selectedClient.businessConfig, baseQuoteRate: Number(e.target.value) }
                      })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold text-sm focus:outline-none focus:border-blue-500"
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
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white font-bold text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Landing Page Hero Headline</label>
                    <input 
                      type="text"
                      value={selectedClient.landingPageHeadline}
                      onChange={(e) => handleUpdateClient({ ...selectedClient, landingPageHeadline: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="p-7 rounded-3xl bg-[#0a0f1d] border border-slate-800 space-y-6 shadow-2xl flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-mono uppercase tracking-wider text-blue-400 font-bold mb-4">Custom Service Line Items</h4>
                    <div className="space-y-3 mb-6 max-h-48 overflow-y-auto pr-1">
                      {selectedClient.businessConfig.customServices.map(s => (
                        <div key={s.id} className="flex justify-between items-center p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                          <span className="font-semibold text-white">{s.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-emerald-400 font-bold">${s.price}</span>
                            <button onClick={() => handleDeleteService(s.id)} className="text-rose-400 hover:text-rose-300 font-bold">?</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-slate-800">
                    <input 
                      type="text"
                      placeholder="New Service Name"
                      value={newServiceName}
                      onChange={(e) => setNewServiceName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-blue-500"
                    />
                    <div className="flex gap-3">
                      <input 
                        type="number"
                        placeholder="Price ($)"
                        value={newServicePrice}
                        onChange={(e) => setNewServicePrice(e.target.value)}
                        className="w-32 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-blue-500"
                      />
                      <button onClick={handleAddService} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-lg">
                        + Add Service Item
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 2: EMPLOYEE ROSTER & SMS DISPATCH */}
            {clientSubTab === 'employees' && (
              <div className="p-7 rounded-3xl bg-[#0a0f1d] border border-slate-800 space-y-6 shadow-2xl animate-fadeIn">
                <h4 className="text-sm font-mono uppercase tracking-wider text-indigo-400 font-bold">Employee Dispatch Roster & Twilio SMS Config</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h5 className="text-xs font-semibold text-slate-400 uppercase">Active Technicians</h5>
                    {selectedClient.businessConfig.employees.map(e => (
                      <div key={e.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
                        <div>
                          <div className="font-bold text-white text-sm">{e.name} <span className="text-slate-400 font-normal">({e.role})</span></div>
                          <div className="text-emerald-400 font-mono mt-1">?? SMS: {e.phone} • Status: {e.status}</div>
                        </div>
                        <button onClick={() => handleDeleteEmployee(e.id)} className="text-rose-400 hover:text-rose-300 font-bold">Remove</button>
                      </div>
                    ))}
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                    <h5 className="text-xs font-semibold text-slate-400 uppercase">Add Field Technician</h5>
                    <input 
                      type="text"
                      placeholder="Technician Name"
                      value={newEmpName}
                      onChange={(e) => setNewEmpName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-indigo-500"
                    />
                    <input 
                      type="text"
                      placeholder="Role (e.g. Lead Installer)"
                      value={newEmpRole}
                      onChange={(e) => setNewEmpRole(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-indigo-500"
                    />
                    <input 
                      type="text"
                      placeholder="Mobile Phone (for Twilio SMS)"
                      value={newEmpPhone}
                      onChange={(e) => setNewEmpPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-indigo-500"
                    />
                    <button onClick={handleAddEmployee} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl text-xs transition shadow-lg">
                      + Register & Enable SMS Dispatch
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SUB-TAB 3: DNS & WEB DEPLOYMENT SETTINGS */}
            {clientSubTab === 'dns' && (
              <div className="p-7 rounded-3xl bg-[#0a0f1d] border border-slate-800 space-y-6 shadow-2xl animate-fadeIn">
                <h4 className="text-sm font-mono uppercase tracking-wider text-blue-400 font-bold">DNS & Vercel Edge Deployment Settings</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="text-xs font-semibold text-slate-400 uppercase">Custom Domain Mapping</div>
                    <input 
                      type="text"
                      value={selectedClient.customDomain}
                      onChange={(e) => handleUpdateClient({ ...selectedClient, customDomain: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                    />
                    <div className="text-[11px] text-emerald-400">? SSL Certificate Automatically Provisioned via Vercel Edge</div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="text-xs font-semibold text-slate-400 uppercase">Vercel Production Deployment URL</div>
                    <input 
                      type="text"
                      value={selectedClient.vercelUrl}
                      onChange={(e) => handleUpdateClient({ ...selectedClient, vercelUrl: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-white font-mono text-xs focus:outline-none focus:border-blue-500"
                    />
                    <div className="text-[11px] text-blue-400">? Linked to Isolated Schema: <code className="text-white">{selectedClient.schema}</code></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW C: GLOBAL AGENCY SETTINGS */}
        {activeTab === 'global-settings' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div>
              <h2 className="text-3xl font-black tracking-tight text-white">Global Agency Settings</h2>
              <p className="text-sm text-slate-400 mt-1">Configure master Stripe credentials, Twilio API keys, and default white-label templates.</p>
            </div>

            <div className="p-8 rounded-3xl bg-[#0a0f1d] border border-slate-800 shadow-2xl space-y-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold">Master Twilio Account SID</label>
                <input 
                  type="password"
                  defaultValue="AC_agency_master_sid_2026"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold">Master Stripe Live Secret Key</label>
                <input 
                  type="password"
                  defaultValue="sk_live_51AgencyMaster...Secure"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg transition text-sm">
                Save Global Gateway Credentials
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
