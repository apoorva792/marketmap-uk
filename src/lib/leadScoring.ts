// Pushes a captured lead through the full Lead Scoring Agent (LSA) pipeline:
// HubSpot contact creation/assignment → Apollo enrichment → Slack (#lead-partner-program).
//
// This mirrors scripts/process-emerging-partner-lead.mjs, parameterised to the
// email/name captured by each form. Every lead is attributed to the same campaign
// so it lands the same way the script does (assigned to Harshini, Partner Form).
//
// NOTE: this is a cross-origin browser POST to the Vercel API. The endpoint must
// allow CORS from this site's origin for the request to go through. It is fired
// best-effort and never blocks the UI.
const LSA_API_URL = "https://lead-scoring-agent-by-lyzr.vercel.app/api/hubspot/create-contact";

const CAMPAIGN_PAGE = "https://www.lyzr.ai/agentic-ai-services-leaders-uk-ireland/";

export interface PartnerLeadInput {
  email: string;
  fullName?: string;
  /** Where the lead was captured (defaults to the campaign page, like the script). */
  source?: string;
}

export async function submitPartnerLead({ email, fullName = "", source }: PartnerLeadInput): Promise<void> {
  if (!email || !email.trim()) return;
  const page = typeof window !== "undefined" ? window.location.href : CAMPAIGN_PAGE;
  const body = {
    email: email.trim(),
    fullName: fullName.trim(),
    isBecomePartner: true,
    source: source || CAMPAIGN_PAGE,
    leadSourceCategory: "Emerging Partner Campaigns",
    leadCampaignName: "Agentic AI Services Leaders - UK & Ireland 2026",
    firstTouchUrl: page,
    lastTouchPage: page,
    referrer: typeof document !== "undefined" ? document.referrer || page : page,
  };
  try {
    await fetch(LSA_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    /* best-effort, never block the UI */
  }
}
