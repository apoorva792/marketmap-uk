export interface Recognition { why: string; work: string[]; }

// Sourced from the Lyzr Agentic AI Services Map sheet:
// why = 'Why Lyzr Picked Them'; work = top 3 items from 'Notable AI Work'.
const RECOGNITION: Record<string, Recognition> = {
  "Faculty AI": { why: "EMRAD/NHS partnership = peer-validated healthcare AI delivery at population scale. UK Government AI Institute work = public sector credibility.", work: ["EMRAD partnership for breast cancer screening across 7 NHS trusts", "UK Government AI Institute", "UK defence AI"] },
  "Version 1": { why: "AWS Premier + multi-cloud capability; Ireland HQ + London office = strong UK&I GTM coverage.", work: ["public sector + FS delivery across UK & Ireland"] },
  "Kainos": { why: "LSE-listed = public-company credibility. Workday Diamond Partner + 8+ year DVSA partnership with multi-award solutions.", work: ["DVSA 8+ year partnership: ML fraud detection in MOT testing", "remote theory test", "digital transformation of 85-year-old driving test process"] },
  "PA Consulting": { why: "Agentic factory approach for clients matches Lyzr Studio enterprise positioning. Strong UK FS/defence/healthcare exposure.", work: ["Agentic factory approach for FS / Defence / Healthcare clients", "intelligent healthcare systems work"] },
  "Equal Experts": { why: "Quantified production cases (450+ HMRC APIs, £600k/day insurance engine). UK government + FS heavyweight.", work: ["HMRC 450+ APIs delivery", "PX compliance AI", "FS giant legacy modernization via GenAI"] },
  "Made Tech": { why: "AIM-listed = public-company governance. GOV.UK + NHS + MoJ track record. AWS Advanced Partner.", work: ["GOV.UK government services", "public sector digital transformation across UK central government and NHS"] },
  "ANS Group": { why: "First UK Microsoft Frontier Partner — peer-validated MS GenAI delivery credentials.", work: ["First UK Microsoft Frontier Partner", "Microsoft Azure + Copilot deployments across UK mid-market", "public sector + private FS clients"] },
  "Softwire": { why: "High-quality engineering reputation; UK national delivery; complements Lyzr Studio with custom integration depth.", work: ["Custom software engineering + cloud + AI delivery for UK media / retail / public…"] },
  "Scott Logic": { why: "FCA + Bank of England = top-tier regulator exposure. Trading systems + capital markets focus differentiates from other UK firms.", work: ["FCA + Bank of England as clients", "trading systems and capital markets focus", "UK FS regulator work"] },
  "Bytes": { why: "LSE-listed Microsoft Solutions Partner with all 6 designations; strong UK channel relationships.", work: ["Microsoft Solutions Partner", "software resale + cloud services across UK enterprise", "AI Copilot deployments"] },
  "Sparta Global": { why: "Distinct delivery model (graduate Spartans) = differentiated talent supply. Strong UK FS exposure.", work: ["Hire-train-deploy delivery model", "UK FS / insurance / retail mid-market client base", "AI + cloud training tracks"] },
  "xDesign": { why: "Named tier-1 clients (Skyscanner, NatWest, Tesco Bank). Edinburgh hub adds Scotland coverage for UK ecosystem map.", work: ["Skyscanner, NatWest, Tesco Bank", "Edinburgh + London delivery centers"] },
  "Inviqa": { why: "Named brands (BMW, Tate). Adobe + Salesforce CX stack aligns with Lyzr Customer Experience Automation use cases.", work: ["BMW, Tate", "Adobe + Salesforce delivery stack"] },
  "ECS Group": { why: "Scotland hub for UK coverage; PE-backed = mid-market profile match.", work: ["Cloud + digital + cybersecurity services for UK enterprise + public sector", "Glasgow + London delivery"] },
  "CACI UK": { why: "Strong UK data/analytics positioning; complements Lyzr Decision Support practice with first-party data depth.", work: ["Customer analytics + marketing technology for UK retail / FS / telecom", "data-led customer engagement"] },
  "AND Digital": { why: "Mid-market sweet spot; distinctive distributed Clubs model; strong UK FS + retail private sector base.", work: ["\"Guide Build Equip\" model across 25 distributed Clubs", "UK FS / retail private sector client base"] },
  "TPXimpact": { why: "AIM-listed governance; deep UK public sector + NHS exposure; AI work currently advisory/readiness-stage (good first stop, watch for production work).", work: ["Welsh Ambulance Services NHS Trust optimization", "Department for Transport road data", "Ministry of Justice"] },
  "Kerv Group": { why: "All 6 MS Solution Partner designations (rare for UK partners). PE-backed mid-market sweet spot. Named tier-1 clients.", work: ["M&S, Welsh Government, Marston Holdings", "Inciper acquisition added Microsoft Dynamics depth", "all 6 Microsoft Solution Partner designations"] },
  "Hippo Digital": { why: "NHS + public sector vertical depth; UK regional (Leeds) hub diversifies London-centric coverage.", work: ["NHS + UK public sector digital service delivery", "user-centered design model", "Leeds + London offices"] },
};

export function getRecognition(name: string): Recognition | undefined {
  return RECOGNITION[name];
}
