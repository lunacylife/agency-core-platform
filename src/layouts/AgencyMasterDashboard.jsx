import React, { useState } from 'react';

export default function AgencyMasterDashboard() {
  const [selectedClient, setSelectedClient] = useState(null);

  const clients = [
    { id: 1, name: 'Apex Electric & HVAC', tier: 'Growth Pro', status: 'Active', mrr: 149 },
    { id: 2, name: 'Precision Roofing & Siding', tier: 'Startup Launchpad', status: 'Active', mrr: 49 },
    { id: 3, name: 'Summit Plumbing Solutions', tier: 'Enterprise', status: 'Onboarding', mrr: 399 }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white mb-8">Agency Core</h1>
          <nav className="space-y-2">
            <a href="#" className="block px-4 py-2 rounded-lg bg-blue-600 text-white font-medium">Clients</a>
            <a href="#" className="block px-4 py-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">Estimators</a>
            <a href="#" className="block px-4 py-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">Job Queues</a>
            <a href="#" className="block px-4 py-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">Settings</a>
          </nav>
        </div>
        <div className="text-xs text-slate-500">
          v1.0.0 Production Core
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Client Management</h2>
            <p className="text-sm text-slate-400">Manage isolated tenant schemas, portals, and billing tiers.</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition shadow-lg">
            + Provision New Client
          </button>
        </header>

        {/* Client Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {clients.map((client) => (
            <div
              key={client.id}
              onClick={() => setSelectedClient(client)}
              className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500 cursor-pointer transition shadow-md"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="font-semibold text-white text-lg">{client.name}</span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-blue-400 font-medium">{client.tier}</span>
              </div>
              <div className="text-sm text-slate-400 mb-2">Status: <span className="text-emerald-400 font-medium">{client.status}</span></div>
              <div className="text-sm text-slate-400">Monthly Revenue: <span className="text-white font-semibold">\/mo</span></div>
            </div>
          ))}
        </div>

        {/* Selected Client Detail Panel */}
        {selectedClient ? (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-2">{selectedClient.name} - Tenant Control Panel</h3>
            <p className="text-sm text-slate-400 mb-4">Isolated schema provisioned and linked to Vercel deployment.</p>
            <div className="flex gap-4">
              <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-medium transition">
                Open Client Portal
              </button>
              <button className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg font-medium transition">
                View Stripe Billing
              </button>
            </div>
          </div>
        ) : (
          <div className="text-slate-500 text-sm italic">Select a client above to view tenant details and controls.</div>
        )}
      </main>
    </div>
  );
}
