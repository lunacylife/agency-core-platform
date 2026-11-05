// Master Configuration Manager for Multi-Tenant Client Portals
import sampleConfig from './client-template.json';

export function getClientConfig(clientSubdomain) {
  // In production, this maps incoming subdomains or request headers 
  // to the specific client's isolated configuration object.
  // For now, it defaults to the template or a fetched client record.
  
  return {
    clientName: sampleConfig.clientName,
    subdomain: sampleConfig.subdomain,
    brandColor: sampleConfig.brandColor,
    features: sampleConfig.features,
    pricingFormula: sampleConfig.pricingFormula,
  };
}

export function getAllClientsMasterList() {
  // Central registry of all client instances managed by your agency
  return [
    { id: 1, name: 'Sample Contractor LLC', subdomain: 'samplecontractor', tier: 'Growth Pro', status: 'Active' },
  ];
}
