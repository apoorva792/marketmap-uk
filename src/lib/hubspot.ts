// Submits to the same HubSpot portal/form used on lyzr.ai/partners (email capture).
// Leads land in the same place as the public partner form.
const HUBSPOT_PORTAL_ID = "45094316";
const HUBSPOT_FORM_GUID = "af949e57-be37-4ee3-a607-10ae072fd835";

const SUBMIT_URL = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID}`;

export function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

/**
 * Submit an email to HubSpot. The public form only has an `email` field, so we
 * send just that (extra fields would be rejected by the form). Throws on failure.
 */
export async function submitEmailToHubspot(email: string, pageName?: string): Promise<void> {
  const res = await fetch(SUBMIT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fields: [{ objectTypeId: "0-1", name: "email", value: email.trim() }],
      context: {
        pageUri: typeof window !== "undefined" ? window.location.href : "",
        pageName: pageName || (typeof document !== "undefined" ? document.title : "Lyzr 2026 Agentic AI Services Leaders — UK & Ireland"),
      },
    }),
  });
  if (!res.ok) throw new Error(`HubSpot responded ${res.status}`);
}
