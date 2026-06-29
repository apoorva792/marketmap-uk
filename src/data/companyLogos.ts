/**
 * Maps company name → self-hosted logo file under /public/logos/<domain>.png.
 * The 19 firms of the 2026 Agentic AI Services Map — UK & Ireland.
 */

const COMPANY_DOMAINS: Record<string, string> = {
  "Sparta Global": "spartaglobal.com",
  "Bytes": "bytes.co.uk",
  "Version 1": "version1.com",
  "Kainos": "kainos.com",
  "Equal Experts": "equalexperts.com",
  "Made Tech": "madetech.com",
  "ANS Group": "ans.co.uk",
  "Softwire": "softwire.com",
  "ECS Group": "ecs.co.uk",
  "Faculty AI": "faculty.ai",
  "PA Consulting": "paconsulting.com",
  "CACI UK": "caci.co.uk",
  "xDesign": "xdesign.com",
  "Inviqa": "inviqa.com",
  "AND Digital": "and.digital",
  "TPXimpact": "tpximpact.com",
  "Hippo Digital": "hippodigital.co.uk",
  "Scott Logic": "scottlogic.com",
  "Kerv Group": "kerv.com",
};

/**
 * Get the logo URL for a company. Logos are self-hosted under
 * /public/logos/<domain>.png (real brand mark where available, otherwise a clean
 * generated monogram). Falls back to the bare website domain when not mapped.
 */
export function getCompanyLogoUrl(companyName: string, website?: string): string {
  const domain =
    COMPANY_DOMAINS[companyName] ||
    (website ? website.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0] : "");
  if (domain) {
    return `/logos/${domain}.png`;
  }
  return `/logos/_fallback.png`;
}
