import React from 'react';
import AgencyMasterDashboard from './layouts/AgencyMasterDashboard';
import ClientPublicPortal from './components/ClientPublicPortal';

export default function App() {
  const hostname = window.location.hostname;
  const path = window.location.pathname;

  // Mock tenant dictionary matching subdomains or path slugs
  const tenants = {
    'apex': {
      name: 'Apex Electric & HVAC',
      tradeType: 'HVAC & Electrical',
      landingPageHeadline: 'Expert Electrical & HVAC Services in Erie, PA',
      customDomain: 'apex-hvac-portal.vercel.app',
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
      customDomain: 'precision-roofing.vercel.app',
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

  // Check if subdomain matches apex-hvac-portal or path contains /client/apex
  if (hostname.includes('apex-hvac-portal') || path.includes('/client/apex')) {
    return <ClientPublicPortal clientData={tenants['apex']} />;
  }
  if (hostname.includes('precision-roofing') || path.includes('/client/precision')) {
    return <ClientPublicPortal clientData={tenants['precision']} />;
  }

  // Default: Render Master Agency Dashboard
  return <AgencyMasterDashboard />;
}
