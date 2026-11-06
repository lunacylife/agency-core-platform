import React, { useState } from 'react';
import AgencyMasterDashboard from './layouts/AgencyMasterDashboard';
import ClientPublicPortal from './components/ClientPublicPortal';

export default function App() {
  // Simple path-based router check for client landing pages vs master dashboard
  const path = window.location.pathname;

  // Mock tenant dictionary for client-specific landing pages
  const tenants = {
    'apex': {
      name: 'Apex Electric & HVAC',
      tradeType: 'HVAC & Electrical',
      landingPageHeadline: 'Expert Electrical & HVAC Services in Erie, PA',
      customDomain: 'apexelectric.com',
      businessConfig: {
        baseQuoteRate: 1500,
        emergencyFee: 400,
        customServices: [
          { id: 1, name: 'Heat Pump Diagnostics', price: 175 },
          { id: 2, name: '220V Circuit Install', price: 350 },
          { id: 3, name: 'Full Duct Cleaning', price: 600 }
        ]
      }
    },
    'precision': {
      name: 'Precision Roofing & Siding',
      tradeType: 'Roofing & Siding',
      landingPageHeadline: 'Premier Roofing & Siding Installation',
      customDomain: 'precisionroofingpa.com',
      businessConfig: {
        baseQuoteRate: 2400,
        emergencyFee: 750,
        customServices: [
          { id: 1, name: 'Shingle Replacement', price: 350 },
          { id: 2, name: 'Gutter Guard Install', price: 900 }
        ]
      }
    }
  };

  // Check if URL matches /client/apex or similar slug
  if (path.includes('/client/apex')) {
    return <ClientPublicPortal clientData={tenants['apex']} />;
  }
  if (path.includes('/client/precision')) {
    return <ClientPublicPortal clientData={tenants['precision']} />;
  }

  // Default: Render Master Agency Dashboard
  return <AgencyMasterDashboard />;
}
