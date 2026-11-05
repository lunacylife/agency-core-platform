import React from 'react';

export default function AgencyLandingPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
          Niche Business Portals & Automated Workflows
        </h1>
        <p className="text-lg text-slate-300 mb-8">
          Secure, zero-overlap client portals equipped with dynamic estimating engines and Stripe payment integration.
        </p>
        <div className="flex justify-center gap-4">
          <a href="#contact" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow">
            Request a Proposal
          </a>
        </div>
      </div>
    </div>
  );
}
