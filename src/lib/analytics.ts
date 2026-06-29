import { logToSheet } from "./sheets";

/**
 * Fire a lightweight analytics event. Goes to two places, both optional:
 *  1. Google Analytics 4 — if a gtag snippet is present on the page (window.gtag).
 *  2. The Google Sheet — via the same webhook used for lead capture (logToSheet).
 *
 * Neither blocks the UI and both fail silently, so it's safe to call from any handler.
 */
export function trackEvent(name: string, data: Record<string, string> = {}): void {
  // 1) Google Analytics 4 (no-op until you add the gtag snippet — see below)
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gtag = (window as any).gtag;
    if (typeof gtag === "function") gtag("event", name, data);
  } catch {
    /* ignore */
  }

  // 2) Google Sheet log (reuses SHEET_WEBHOOK_URL from sheets.ts)
  void logToSheet({ source: name, ...data });
}
