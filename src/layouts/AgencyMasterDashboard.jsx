import React, { useState } from 'react';

export default function AgencyMasterDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedClient, setSelectedClient] = useState(null);
  const [isProvisioningOpen, setIsProvisioningOpen] = useState(false);

  // Full multi-tenant state array restoring all client records
  const [clients, setClients] = useState([
    { 
      id: 1, 
      name: 'Apex Electric & HVAC', 
      tier: 'Growth Pro', 
      status: 'Active', 
      mrr: 149, 
      schema: 'tenant_apex_prod', 
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

  const handleUpdateBusinessConfig = (updatedClient) => {
    setClients(prev => prev.map(c => c.id === updatedClient.id ? updatedClient : c));
    setSelectedClient(updatedClient);
  };

  return (
    <div className="min-h-screen bg-[#05070c] text-slate-100 flex font-sans">
      <aside className="w-72 bg-[#090e1b] border-r border-slate-800 p-6 flex flex-col justify-between shadow-2xl">
        <div>
          <h1 className="text-sm font-black uppercase tracking-wider text-white mb-8">Agency Core OS</h1>
          <nav className="space-y-2">
            <button onClick={() => { setActiveTab('overview'); setSelectedClient(null); }} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm ${activeTab === 'overview' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
              ?? Tenant Fleet ({clients.length})
            </button>
          </nav>
        </div>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-black text-white">Client Business & Fleet Manager</h2>
            <p className="text-sm text-slate-400">Select any client card below to access their full configurator and employee roster.</p>
          </div>
        </div>

        {!selectedClient ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {clients.map(client => (
              <div key={client.id} onClick={() => setSelectedClient(client)} className="p-6 rounded-3xl bg-[#0a0f1d] border border-slate-800 cursor-pointer hover:border-blue-500 transition shadow-xl">
                <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-md border ${client.badge}`}>{client.tier}</span>
                <h3 className="text-lg font-bold text-white mt-3">{client.name}</h3>
                <p className="text-xs text-slate-400 mt-1">Specialty: {client.businessConfig.tradeType}</p>
                <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-bold text-blue-400 flex justify-between">
                  <span>Configure Business & Team</span>
                  <span>?</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-3xl bg-[#0a0f1d] border border-blue-500/50 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs uppercase font-mono text-blue-400 font-bold">Active Configuration View</span>
                <h3 className="text-xl font-black text-white mt-1">{selectedClient.name}</h3>
              </div>
              <button onClick={() => setSelectedClient(null)} className="text-xs font-bold bg-slate-800 px-3 py-1.5 rounded-xl text-slate-300 hover:bg-slate-700">? Back to Full Fleet</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-mono uppercase text-blue-400 font-bold">Custom Service Line Items</h4>
                {selectedClient.businessConfig.customServices.map(s => (
                  <div key={s.id} className="text-xs flex justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                    <span className="font-medium text-white">{s.name}</span>
                    <span className="text-emerald-400 font-bold">${s.price}</span>
                  </div>
                ))}
              </div>
              <div className="p-5 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-mono uppercase text-indigo-400 font-bold">Employee Dispatch Roster</h4>
                {selectedClient.businessConfig.employees.map(e => (
                  <div key={e.id} className="text-xs p-2.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                    <div className="font-bold text-white">{e.name} <span className="text-slate-400 font-normal">({e.role})</span></div>
                    <div className="text-emerald-400">?? SMS: {e.phone} • Status: {e.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
