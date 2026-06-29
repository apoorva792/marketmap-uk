import type { Company } from "./companies";

export interface CompanyEnrichment {
  size: string;
  aiFocus: string;
  cloud: string;
  industries: string;
  revenue: string;
}

function parseMinEmployees(employees: string): number {
  const match = employees.match(/(\d[\d,]*)/);
  if (!match) return 0;
  return parseInt(match[1].replace(/,/g, ""), 10);
}

function getCompanySize(company: Company): string {
  const min = parseMinEmployees(company.employees);
  if (min >= 1000) return "1,000–2,000";
  if (min >= 500) return "500–1,000";
  return "Under 500";
}

function getAIFocus(company: Company): string {
  const desc = company.description.toLowerCase();
  const svcs = company.services.map(s => s.toLowerCase());
  if (desc.includes("lyzr") || desc.includes("agentic")) return "Agentic AI";
  if (svcs.includes("rpa") || desc.includes("automation") || desc.includes("rpa")) return "NLP & Automation";
  if (svcs.includes("data analytics") || svcs.includes("analytics") || svcs.includes("data engineering") || desc.includes("analytics") || desc.includes("data")) return "MLOps & Platforms";
  if (svcs.includes("ai/ml")) return "Generative AI";
  if (desc.includes("cloud")) return "AI + Cloud Migration";
  return "Generative AI";
}

function getPrimaryCloud(company: Company): string {
  const badges = company.hyperscalerBadges?.filter(b => b !== "GSI") ?? [];
  if (badges.length === 0) return "Cloud Agnostic";
  if (badges.length >= 2) return "Multi-Cloud";
  if (badges.includes("AWS")) return "AWS";
  if (badges.includes("GCP")) return "Google Cloud";
  if (badges.includes("Azure")) return "Azure";
  return "Cloud Agnostic";
}

function getIndustries(company: Company): string {
  const desc = company.description.toLowerCase();
  const svcs = company.services.map(s => s.toLowerCase());
  if (svcs.includes("banking software") || svcs.includes("fintech") || desc.includes("banking") || desc.includes("financial") || desc.includes("bfsi")) return "BFSI, Fintech";
  if (svcs.includes("healthcare it") || desc.includes("healthcare") || desc.includes("health") || desc.includes("pharma")) return "Healthcare, Pharma";
  if (desc.includes("telecom") || svcs.includes("telecom it") || svcs.includes("telecom analytics")) return "Telecom, Media";
  if (svcs.includes("insurance it") || svcs.includes("insurtech") || desc.includes("insurance")) return "Insurance, BFSI";
  if (desc.includes("automotive") || svcs.includes("automotive")) return "Automotive, Manufacturing";
  if (svcs.includes("sap") || svcs.includes("oracle") || svcs.includes("erp")) return "Manufacturing, BFSI";
  if (svcs.includes("salesforce") || svcs.includes("crm")) return "BFSI, Retail";
  if (desc.includes("security") || desc.includes("cyber")) return "BFSI, Government";
  if (desc.includes("retail") || desc.includes("cpg")) return "Retail, CPG";
  if (desc.includes("media")) return "Media, Technology";
  return "BFSI, Technology";
}

function getRevenue(company: Company): string {
  if (company.revenue) return company.revenue;
  const min = parseMinEmployees(company.employees);
  if (min >= 1000) return "$50M–$100M";
  return "$20M–$50M";
}

export function getCompanyEnrichment(company: Company): CompanyEnrichment {
  return {
    size: getCompanySize(company),
    aiFocus: getAIFocus(company),
    cloud: getPrimaryCloud(company),
    industries: getIndustries(company),
    revenue: getRevenue(company),
  };
}
