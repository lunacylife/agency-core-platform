import React, { useState } from 'react';

export default function AgencyJobQueue() {
  const [jobs, setJobs] = useState([
    { id: 1, client: 'Smith Landscaping', service: 'Patio Estimate & Build', status: 'Pending Approval' },
    { id: 2, client: 'Apex Roofing', service: 'Roof Repair Quote', status: 'In Progress' },
  ]);

  return (
    <div className="max-w-2xl mx-auto bg-slate-800 text-white p-6 rounded-xl shadow-lg border border-slate-700">
      <h3 className="text-xl font-bold mb-4 text-blue-400">Employee Job & Dispatch Queue</h3>
      
      <div className="space-y-3">
        {jobs.map((job) => (
          <div key={job.id} className="bg-slate-900 p-4 rounded-lg flex justify-between items-center border border-slate-700">
            <div>
              <h4 className="font-semibold text-white">{job.client}</h4>
              <p className="text-sm text-slate-400">{job.service}</p>
            </div>
            <span className={px-3 py-1 rounded-full text-xs font-semibold }>
              {job.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
