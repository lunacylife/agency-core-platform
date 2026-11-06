import React, { useState } from 'react';

export default function AgencyMasterDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedClient, setSelectedClient] = useState(null);

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
        customServices: [
          { id: 1, name: 'Heat Pump Diagnostics', price: 175 },
          { id: 2, name: '220V Circuit Install', price: 350 }
        ],
        employees: [
          { id: 1, name: 'Marcus Vance', role: 'Lead Electrician', phone: '(814) 555-0192', status: 'On Job' }
        ]
      }
    }
  ]);

  const [newServiceName, setNewServiceName] = useState('');
  const [newServicePrice, setNewServicePrice] = useState('');
  const [newEmpName, setNewEmpName] = useState('');
  const [newEmpRole, setNewEmpRole] = useState('');
  const [newEmpPhone, setNewEmpPhone] = useState('');

  const handleUpdate = (updated) => {
    setClients(prev => prev.map(c => c.id === updated.id ? updated : c));
    setSelectedClient(updated);
  };

  return (
    <div className="min-h-screen bg-[#05070c] text-slate-100 flex font-sans">
      <aside className="w-72 bg-[#090e1b] border-r border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-sm font-black uppercase text-white mb-8">Agency Core OS</h1>
          <nav className="space-y-2">
            <button onClick={() => setActiveTab('overview')} className="w-full text-left px-4 py-3 rounded-xl bg-blue-600 text-white font-bold text-sm">Tenant Business Configs</button>
          </nav>
        </div>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        <h2 className="text-2xl font-black text-white mb-6">Client Business & Employee Manager</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clients.map(client => (
            <div key={client.id} onClick={() => setSelectedClient(client)} className="p-6 rounded-3xl bg-[#0a0f1d] border border-slate-800 cursor-pointer hover:border-blue-500 transition">
              <h3 className="text-lg font-bold text-white">{client.name}</h3>
              <p className="text-xs text-slate-400 mt-1">Trade: {client.businessConfig.tradeType}</p>
              <div className="mt-4 text-xs text-blue-400 font-bold">Configure Business & Employees ?</div>
            </div>
          ))}
        </div>

        {selectedClient && (
          <div className="mt-8 p-8 rounded-3xl bg-[#0a0f1d] border border-blue-500/50 space-y-6">
            <h3 className="text-xl font-bold text-white">Configuring: {selectedClient.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-mono uppercase text-blue-400 font-bold">Custom Services</h4>
                {selectedClient.businessConfig.customServices.map(s => (
                  <div key={s.id} className="text-xs flex justify-between p-2 bg-slate-950 rounded-xl">
                    <span>{s.name}</span>
                    <span className="text-emerald-400">${s.price}</span>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-xs font-mono uppercase text-indigo-400 font-bold">Employee Dispatch Roster</h4>
                {selectedClient.businessConfig.employees.map(e => (
                  <div key={e.id} className="text-xs p-2 bg-slate-950 rounded-xl">
                    <div className="font-bold text-white">{e.name} ({e.role})</div>
                    <div className="text-emerald-400">SMS: {e.phone} • {e.status}</div>
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
