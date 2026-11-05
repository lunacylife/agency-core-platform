import React, { useState } from 'react';
import { getAllClientsMasterList } from '../config/masterConfig';

export default function AgencyMasterDashboard() {
  const [clients, setClients] = useState(getAllClientsMasterList());
  const [selectedClient, setSelectedClient] = useState(clients[0]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <header className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-3xl font-black text-blue-400">Agency Master Control Center</h1>
          <p className="text-sm text-slate-400">Multi-tenant client portal provisioning & configuration engine</p>
        </div>
        <div className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-lg text-sm">
          <span className="text-slate-400">Active Portals: </span>
          <span className="font-bold text-green-400">{clients.length}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Client List Sidebar */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-bold mb-4 text-slate-200">Managed Client Portals</h2>
          <div className="space-y-3">
            {clients.map((client) => (
              <div 
                key={client.id}
                onClick={() => setSelectedClient(client)}
                className={p-4 rounded-lg cursor-pointer transition border \}
              >
                <div className="font-semibold text-white">{client.name}</div>
                <div className="text-xs text-slate-400">Subdomain: {client.subdomain}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Client Configuration Panel */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-bold mb-4 text-slate-200">
            Configuration: <span className="text-blue-400">{selectedClient.name}</span>
          </h2>
          
          <div className="space-y-4 text-sm text-slate-300">
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <span className="block text-slate-500 text-xs uppercase mb-1">Service Tier</span>
              <span className="text-lg font-semibold text-white">{selectedClient.tier}</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <span className="block text-slate-500 text-xs uppercase mb-1">Status</span>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                {selectedClient.status}
              </span>
            </div>

            <div className="flex gap-4 pt-4">
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2.5 rounded-lg shadow transition">
                Push Config Update
              </button>
              <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-5 py-2.5 rounded-lg shadow transition">
                View Live Preview
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
