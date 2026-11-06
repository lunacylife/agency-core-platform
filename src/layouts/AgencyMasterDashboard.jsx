import React, { useState } from 'react';

export default function AgencyMasterDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isProvisioningOpen, setIsProvisioningOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  // Expanded Client Fleet State with Business Configurators & Employees
  const [clients, setClients] = useState([
    { 
      id: 1, 
      name: 'Apex Electric & HVAC', 
      tier: 'Growth Pro', 
      status: 'Active', 
      mrr: 149, 
      schema: 'tenant_apex_prod', 
      leads: 42, 
      uptime: '99.99%', 
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
          { id: 2, name: 'Dave Miller', role: 'HVAC Technician', phone: '(814) 555-4821', status: 'Available' }
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
      leads: 18, 
      uptime: '100%', 
      badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      businessConfig: {
        tradeType: 'Roofing & Siding',
        baseQuoteRate: 2400,
        emergencyFee: 750,
        taxRate: 6.0,
        customServices: [
          { id: 1, name: 'Shingle Replacement (Sq)', price: 350 },
          { id: 2, name: 'Gutter Guard Installation', price: 900 }
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
      leads: 64, 
      uptime: '99.95%', 
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

  // New Service Item Input State for Selected Client
  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');

  // New Employee Input State for Selected Client
  const [newEmpName, setNewEmpName] = useState('');
  const [newEmpRole, setNewEmpRole] = useState('');
  const [newEmpPhone, setNewEmpPhone] = useState('');

  // New Tenant Form State
  const [newClientName, setNewClientName] = useState('');
  const [newClientTier, setNewClientTier] = useState('Growth Pro');
  const [provisionLogs, setProvisionLogs] = useState([]);
  const [isProvisioning, setIsProvisioning] = useState(false);

  const handleUpdateBusinessConfig = (updatedClient) => {
    setClients(prev => prev.map(c => c.id === updatedClient.id ? updatedClient : c));
    setSelectedClient(updatedClient);
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
    handleUpdateBusinessConfig(updatedClient);
    setNewServiceName('');
    setNewServicePrice('');
  };

  const handleDeleteService = (serviceId) => {
    const updatedServices = selectedClient.businessConfig.customServices.filter(s => s.id !== serviceId);
    const updatedClient = {
      ...selectedClient,
      businessConfig: { ...selectedClient.businessConfig, customServices: updatedServices }
    };
    handleUpdateBusinessConfig(updatedClient);
  };

  const handleAddEmployee = () => {
    if (!newEmpName || !selectedClient) return;
    const updatedEmployees = [
      ...selectedClient.businessConfig.employees,
      { id: Date.now(), name: newEmpName, role: newEmpRole || 'Field Tech', phone: newEmpPhone || 'N/A', status: 'Available' }
    ];
    const updatedClient = {
      ...selectedClient,
      businessConfig: { ...selectedClient.businessConfig, employees: updatedEmployees }
    };
    handleUpdateBusinessConfig(updatedClient);
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
    handleUpdateBusinessConfig(updatedClient);
  };

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
              <span>??</span> Tenant Fleet & Business Configs
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
                <h2 className="text-3xl font-black tracking-tight text-white">Client Business Configurators & Fleet</h2>
                <p className="text-sm text-slate-400 mt-1">Configure client estimation formulas, custom services, employee dispatch rosters, and billing tiers.</p>
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
                      <span className="text-slate-400">Trade Specialty:</span>
                      <span className="font-semibold text-white">{client.businessConfig.tradeType}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                      <span className="text-slate-400">Custom Services:</span>
                      <span className="font-bold text-emerald-400">{client.businessConfig.customServices.length} items configured</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-slate-400">Active Employees:</span>
                      <span className="font-bold text-indigo-400">{client.businessConfig.employees.length} techs</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 text-xs font-bold text-blue-400 group-hover:translate-x-1 transition-transform">
                    <span>Configure Business & Employees</span>
                    <span>?</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Client Comprehensive Business Configurator & Employee Manager */}
            {selectedClient && (
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0a0f1d] via-[#0a0f1d] to-blue-950/30 border border-blue-500/50 shadow-2xl relative overflow-hidden animate-fadeIn space-y-8">
                <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-xs uppercase font-mono text-blue-400 font-bold tracking-wider">Client Business Configurator & Employee Manager</span>
                    <h3 className="text-2xl font-black text-white mt-1">{selectedClient.name}</h3>
                    <p className="text-xs font-mono text-slate-400 mt-1">Schema Namespace: <span className="text-emerald-400 font-bold">{selectedClient.schema}</span></p>
                  </div>
                  <button onClick={() => setSelectedClient(null)} className="h-9 w-9 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-sm font-bold transition">?</button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Column 1: Estimator Formula & Rates */}
                  <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold">1. Client Estimator Formula</h4>
                    
                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Base Project Quote ($)</label>
                      <input 
                        type="number"
                        value={selectedClient.businessConfig.baseQuoteRate}
                        onChange={(e) => handleUpdateBusinessConfig({
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
                        onChange={(e) => handleUpdateBusinessConfig({
                          ...selectedClient, 
                          businessConfig: { ...selectedClient.businessConfig, emergencyFee: Number(e.target.value) }
                        })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">Sales Tax Rate (%)</label>
                      <input 
                        type="number"
                        step="0.1"
                        value={selectedClient.businessConfig.taxRate}
                        onChange={(e) => handleUpdateBusinessConfig({
                          ...selectedClient, 
                          businessConfig: { ...selectedClient.businessConfig, taxRate: Number(e.target.value) }
                        })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold text-sm focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Column 2: Custom Service Line Items */}
                  <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold mb-3">2. Custom Service Line Items</h4>
                      
                      <div className="space-y-2 mb-4 max-h-48 overflow-y-auto pr-1">
                        {selectedClient.businessConfig.customServices.map((service) => (
                          <div key={service.id} className="flex justify-between items-center p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                            <div>
                              <span className="font-semibold text-white">{service.name}</span>
                              <span className="text-slate-400 ml-2">${service.price}</span>
                            </div>
                            <button onClick={() => handleDeleteService(service.id)} className="text-rose-400 hover:text-rose-300 font-bold">?</button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <input 
                        type="text"
                        placeholder="Service Name (e.g. Panel Upgrade)"
                        value={newServiceName}
                        onChange={(e) => setNewServiceName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-blue-500"
                      />
                      <div className="flex gap-2">
                        <input 
                          type="number"
                          placeholder="Price ($)"
                          value={newServicePrice}
                          onChange={(e) => setNewServicePrice(e.target.value)}
                          className="w-28 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-blue-500"
                        />
                        <button onClick={handleAddService} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 rounded-xl text-xs transition">
                          + Add Service
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Employee Dispatch Roster */}
                  <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold mb-3">3. Employee Dispatch Roster</h4>
                      
                      <div className="space-y-2 mb-4 max-h-48 overflow-y-auto pr-1">
                        {selectedClient.businessConfig.employees.map((emp) => (
                          <div key={emp.id} className="flex justify-between items-center p-2 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                            <div>
                              <div className="font-semibold text-white">{emp.name} <span className="text-slate-400 font-normal">({emp.role})</span></div>
                              <div className="text-[10px] text-emerald-400">{emp.phone} • {emp.status}</div>
                            </div>
                            <button onClick={() => handleDeleteEmployee(emp.id)} className="text-rose-400 hover:text-rose-300 font-bold">?</button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <input 
                        type="text"
                        placeholder="Employee Name"
                        value={newEmpName}
                        onChange={(e) => setNewEmpName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-blue-500"
                      />
                      <div className="flex gap-2">
                        <input 
                          type="text"
                          placeholder="Role (e.g. Lead Tech)"
                          value={newEmpRole}
                          onChange={(e) => setNewEmpRole(e.target.value)}
                          className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-blue-500"
                        />
                        <button onClick={handleAddEmployee} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition">
                          + Add Tech
                        </button>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="flex gap-4 pt-4 border-t border-slate-800">
                  <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg transition">
                    Save Config & Sync to Tenant Portal
                  </button>
                  <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-6 py-3 rounded-2xl font-bold text-sm transition">
                    Test Estimator Preview
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
