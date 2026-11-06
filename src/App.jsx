import React from 'react';
import AgencyMasterDashboard from './layouts/AgencyMasterDashboard';
import ClientPublicPortal from './components/ClientPublicPortal';

export default function App() {
  const path = window.location.pathname.toLowerCase();

  // Tenant database dictionary
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
    },
    'summit': {
      name: 'Summit Plumbing Solutions',
      tradeType: 'Plumbing & Drains',
      landingPageHeadline: '24/7 Emergency Plumbing & Drain Overhaul',
      customDomain: 'summitplumbing.net',
      businessConfig: {
        baseQuoteRate: 1200,
        emergencyFee: 350,
        customServices: [
          { id: 1, name: 'Hydro Jetting', price: 450 },
          { id: 2, name: 'Tankless Water Heater', price: 1800 }
        ]
      }
    }
  };

  // Route matching based on clean URL paths
  if (path === '/apex' || path === '/client/apex') {
    return <ClientPublicPortal clientData={tenants['apex']} />;
  }
  if (path === '/precision' || path === '/client/precision') {
    return <ClientPublicPortal clientData={tenants['precision']} />;
  }
  if (path === '/summit' || path === '/client/summit') {
    return <ClientPublicPortal clientData={tenants['summit']} />;
  }

  // Default: Render Master Agency Dashboard
  return <AgencyMasterDashboard />;
}
