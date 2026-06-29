export type CompanyType = "hyperscaler" | "gsi" | "si";
export type Region = "United Kingdom" | "Ireland";

// Service capabilities of the 2026 Lyzr Agentic AI Services Map — UK & Ireland.
// These are the rows of the market map and the grouping order for the directory.
export const CATEGORY_ORDER = [
  "Document Automation",
  "Workflow Optimization",
  "Decision Support",
  "Customer Experience Automation",
  "Process Intelligence",
] as const;

export const CATEGORY_FILTERS = ["All", ...CATEGORY_ORDER] as const;

// End-customer verticals (the columns of the map).
export const VERTICALS = [
  "Financial Services",
  "Healthcare",
  "Manufacturing",
  "Retail & Logistics",
] as const;

export const REGION_OPTIONS: Region[] = ["United Kingdom", "Ireland"];
export const TAG_OPTIONS = [
  "Financial Services",
  "Healthcare",
  "Manufacturing",
  "Retail & Logistics",
] as const;

export const TAG_EMOJIS: Record<string, string> = {
  "Lyzr Recognised": "",
  "Agentic AI Services Leader": "",
};

export interface Company {
  name: string;
  city: string;
  employees: string;
  services: string[];
  international: string;
  website: string;
  description: string;
  companyType: CompanyType;
  hyperscalerBadges?: ("AWS" | "GCP" | "Azure" | "GSI")[];
  region: Region;
  country?: string;
  revenue?: string;
  tags?: string[];
  /** Service capability — one of CATEGORY_ORDER. The market-map row. */
  category?: string;
  /** End-customer vertical — the market-map column. */
  vertical?: string;
}

// Helper to keep each entry terse and consistent.
function mk(
  name: string,
  website: string,
  city: string,
  region: Region,
  category: string,
  vertical: string,
  revenue: string,
  employees: string,
  description: string
): Company {
  const countryLabel = region === "Ireland" ? "Ireland" : "UK";
  return {
    name,
    website,
    city,
    region,
    country: countryLabel,
    category,
    vertical,
    revenue,
    employees,
    description,
    services: [vertical],
    international: countryLabel,
    companyType: "si",
    tags: ["Lyzr Recognised", "Agentic AI Services Leader", vertical, countryLabel, revenue],
  };
}

// The 19 UK & Ireland firms, placed exactly as on the market map (poster layout).
export const companies: Company[] = [
  // ── Document Automation ──
  mk("Sparta Global", "spartaglobal.com", "London, UK", "United Kingdom", "Document Automation", "Financial Services", "$20-50M", "600",
    "London tech consultancy with a hire-train-deploy delivery model (graduate 'Spartans') serving UK FS, insurance and retail mid-market — a differentiated talent supply with strong UK FS exposure."),
  mk("Bytes", "bytes.co.uk", "Leatherhead, UK", "United Kingdom", "Document Automation", "Financial Services", "$100-250M", "800",
    "LSE-listed Microsoft Solutions Partner (all six designations) delivering software resale, cloud services and AI Copilot deployments across UK enterprise and public sector, with strong channel relationships."),

  // ── Workflow Optimization ──
  mk("Version 1", "version1.com", "Dublin / London", "Ireland", "Workflow Optimization", "Financial Services", "$250-500M", "3,500",
    "Dublin + London digital-transformation firm and AWS Premier Partner with a strong Microsoft / Oracle practice — multi-cloud capability and broad UK & Ireland GTM coverage."),
  mk("Kainos", "kainos.com", "Belfast, UK", "United Kingdom", "Workflow Optimization", "Manufacturing", "$250-500M", "3,000",
    "LSE-listed Belfast digital-services firm and Workday Diamond Partner with a strong UK-government practice. 8+ year DVSA partnership: ML fraud detection in MOT testing and 3M remote theory tests a year."),
  mk("Equal Experts", "equalexperts.com", "London, UK", "United Kingdom", "Workflow Optimization", "Financial Services", "$100-250M", "1,500",
    "Distributed-delivery digital consultancy with deep HMRC, FS and insurance work. Quantified production cases — 450+ HMRC APIs and a white-labelled insurance engine processing £600k/day."),
  mk("Made Tech", "madetech.com", "London, UK", "United Kingdom", "Workflow Optimization", "Financial Services", "$50-100M", "700",
    "AIM-listed UK public-sector specialist and AWS Advanced Partner with a GOV.UK, NHS and MoJ track record across central-government digital transformation."),
  mk("ANS Group", "ans.co.uk", "Manchester, UK", "United Kingdom", "Workflow Optimization", "Financial Services", "$50-100M", "500",
    "Manchester Microsoft + Azure specialist and the first UK Microsoft Frontier Partner — peer-validated MS GenAI credentials with Azure + Copilot deployments across the UK mid-market."),
  mk("Softwire", "softwire.com", "London, UK", "United Kingdom", "Workflow Optimization", "Financial Services", "$20-50M", "400",
    "UK software-engineering firm with a strong custom-development, cloud and AI practice for media, retail and public sector — a high-quality engineering reputation and national delivery."),
  mk("ECS Group", "ecs.co.uk", "Glasgow, UK", "United Kingdom", "Workflow Optimization", "Financial Services", "$100-250M", "1,200",
    "Glasgow + London PE-backed IT-services firm focused on cloud, digital and cybersecurity for UK enterprise and public sector — a Scotland hub for UK coverage."),

  // ── Decision Support ──
  mk("Faculty AI", "faculty.ai", "London, UK", "United Kingdom", "Decision Support", "Healthcare", "$50-100M", "300",
    "UK applied-AI company with strong public-sector, healthcare and defence depth. EMRAD/NHS breast-cancer-screening partnership across 7 trusts (5M+ patients) and UK Government AI Institute (i.AI) work."),
  mk("PA Consulting", "paconsulting.com", "London, UK", "United Kingdom", "Decision Support", "Financial Services", "$250-500M", "3,800",
    "Innovation + technology consultancy (a Jacobs company) with strong FS, defence and healthcare practices, taking an agentic-factory approach that maps cleanly to Lyzr Studio enterprise positioning."),
  mk("CACI UK", "caci.co.uk", "London, UK", "United Kingdom", "Decision Support", "Retail & Logistics", "$100-250M", "800",
    "UK arm of CACI — a data, customer-analytics and marketing-technology specialist for retail, FS and telecom, complementing Lyzr Decision Support with first-party data depth."),

  // ── Customer Experience Automation ──
  mk("xDesign", "xdesign.com", "Edinburgh, UK", "United Kingdom", "Customer Experience Automation", "Financial Services", "$20-50M", "600",
    "Edinburgh digital product-engineering firm with a strong FS, travel and retail mid-market base. Named tier-1 clients include Skyscanner, NatWest and Tesco Bank, adding Scotland coverage."),
  mk("Inviqa", "inviqa.com", "London, UK", "United Kingdom", "Customer Experience Automation", "Manufacturing", "$20-50M", "250",
    "UK digital-experience consultancy with an Adobe + Salesforce CX stack and a strong cultural and luxury-brand client base (BMW, Tate) — aligned to Lyzr CX automation use cases."),
  mk("AND Digital", "and.digital", "London, UK", "United Kingdom", "Customer Experience Automation", "Financial Services", "$100-250M", "1,600",
    "UK digital product-engineering firm with a 'Guide Build Equip' model across 25 distributed Clubs and a strong UK FS + retail private-sector base — squarely mid-market."),
  mk("TPXimpact", "tpximpact.com", "London, UK", "United Kingdom", "Customer Experience Automation", "Healthcare", "$50-100M", "552",
    "AIM-listed UK public-sector digital-transformation firm with deep NHS and central-government exposure — Welsh Ambulance, DfT and MoJ work plus AI-readiness advisory."),
  mk("Hippo Digital", "hippodigital.co.uk", "Leeds, UK", "United Kingdom", "Customer Experience Automation", "Healthcare", "$20-50M", "200",
    "Leeds + London consultancy with strong public-sector and healthcare focus and a user-centred design + delivery model — NHS and UK public-sector digital services, diversifying London-centric coverage."),

  // ── Process Intelligence ──
  mk("Scott Logic", "scottlogic.com", "Newcastle, UK", "United Kingdom", "Process Intelligence", "Financial Services", "$20-50M", "400",
    "UK tech consultancy with a deep FS practice — the FCA and Bank of England as clients — and a trading-systems and capital-markets focus that differentiates it from other UK firms."),
  mk("Kerv Group", "kerv.com", "London, UK", "United Kingdom", "Process Intelligence", "Retail & Logistics", "$100-250M", "750+",
    "Bridgepoint-backed UK cloud + digital-services firm with all six Microsoft Solution Partner designations and named tier-1 clients (M&S, Welsh Government, Marston Holdings)."),
];

const TYPE_ORDER: Record<CompanyType, number> = {
  hyperscaler: 0,
  gsi: 1,
  si: 2,
};

export function getFilteredCompanies(
  companyList: Company[],
  search?: string,
  filter?: string,
  sort?: string,
  typeFilter?: string,
  regionFilter?: string[],
  tagFilter?: string[]
): Company[] {
  let result = [...companyList];

  if (typeFilter && typeFilter !== "All") {
    const typeMap: Record<string, CompanyType> = {
      "Hyperscaler Partner": "hyperscaler",
      "GSI": "gsi",
      "SI": "si",
    };
    const t = typeMap[typeFilter];
    if (t) result = result.filter((c) => c.companyType === t);
  }

  if (regionFilter && regionFilter.length > 0) {
    result = result.filter((c) => regionFilter.includes(c.region));
  }

  if (tagFilter && tagFilter.length > 0) {
    result = result.filter((c) => c.tags && tagFilter.every((t) => c.tags!.includes(t)));
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.services.some((s) => s.toLowerCase().includes(q)) ||
        c.description.toLowerCase().includes(q) ||
        (c.country && c.country.toLowerCase().includes(q)) ||
        (c.category && c.category.toLowerCase().includes(q)) ||
        (c.vertical && c.vertical.toLowerCase().includes(q)) ||
        c.region.toLowerCase().includes(q)
    );
  }

  // Filter by service capability (market-map row).
  if (filter && filter !== "All") {
    result = result.filter((c) => c.category === filter);
  }

  if (sort === "A–Z") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort?.startsWith("Tag: ")) {
    const tagName = sort.replace("Tag: ", "");
    result.sort((a, b) => {
      const aHas = a.tags?.includes(tagName) ? 1 : 0;
      const bHas = b.tags?.includes(tagName) ? 1 : 0;
      if (bHas !== aHas) return bHas - aHas;
      return a.name.localeCompare(b.name);
    });
  } else if (sort === "City") {
    result.sort((a, b) => a.city.localeCompare(b.city));
  }

  return result;
}
