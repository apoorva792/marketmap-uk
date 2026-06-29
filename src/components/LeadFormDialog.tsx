import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Check, Loader2, ArrowRight } from "lucide-react";
import { submitEmailToHubspot, isValidEmail } from "@/lib/hubspot";
import { logToSheet } from "@/lib/sheets";
import { submitPartnerLead } from "@/lib/leadScoring";

export interface LeadFormDialogProps {
  open: boolean;
  onClose: () => void;
  eyebrow?: string;
  title: string;
  description?: string;
  submitLabel?: string;
  /** Label written to the Google Sheet (and used as the HubSpot page name). */
  logSource?: string;
}

type Status = "idle" | "loading" | "done" | "error";

/**
 * Custom name + email capture form (both required) that feeds the same places as
 * the rest of the site: HubSpot, the Google Sheet, and the full LSA pipeline
 * (HubSpot contact → Apollo enrichment → Slack #lead-partner-program).
 */
const LeadFormDialog = ({
  open,
  onClose,
  eyebrow,
  title,
  description,
  submitLabel = "Submit →",
  logSource,
}: LeadFormDialogProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Reset when reopened
  useEffect(() => {
    if (open) { setStatus("idle"); setError(""); }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setStatus("error"); setError("Please enter your name."); return; }
    if (!isValidEmail(email)) { setStatus("error"); setError("Please enter a valid work email."); return; }
    setStatus("loading");
    setError("");
    // Best-effort lead capture, never block on any single channel.
    try { await submitEmailToHubspot(email, logSource || title); } catch { /* swallow */ }
    await logToSheet({ name: name.trim(), email: email.trim(), source: logSource || title });
    // Run the lead through the full LSA pipeline (HubSpot → Apollo → Slack).
    void submitPartnerLead({ email, fullName: name });
    setStatus("done");
  };

  return createPortal(
    <div
      className="fixed inset-0 flex justify-center items-center"
      style={{ zIndex: 1300, background: "rgba(42, 26, 24, 0.75)", backdropFilter: "blur(8px)", padding: 20 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        role="dialog"
        className="relative w-full"
        style={{
          background: "#F9F5F1",
          borderRadius: 22,
          boxShadow: "0 25px 60px -12px rgba(42, 26, 24, 0.5)",
          maxWidth: 480,
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "clamp(26px, 5vw, 40px) clamp(20px, 5vw, 36px) clamp(24px, 5vw, 36px)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full transition-colors"
          style={{ background: "rgba(74,47,45,0.06)" }}
          aria-label="Close"
        >
          <X size={16} style={{ color: "#7A6A60" }} />
        </button>

        {status === "done" ? (
          <div className="text-center py-2">
            <div
              className="inline-flex items-center justify-center mb-5 rounded-full"
              style={{ width: 56, height: 56, background: "rgba(61,43,43,0.08)" }}
            >
              <Check size={26} style={{ color: "#6B4C4C" }} />
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 400, color: "#2A1F1A", marginBottom: 8 }}>
              Thanks, {name.trim().split(" ")[0] || "there"}.
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#7A6A60", lineHeight: 1.6, marginBottom: 24 }}>
              Our partnerships team will reach out to <strong style={{ color: "#2A1F1A" }}>{email}</strong> within 48 hours.
            </p>
            <button
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-semibold transition-all hover:opacity-90"
              style={{ background: "#6B4C4C", color: "#F2EDE8", fontFamily: "'DM Sans', sans-serif", fontSize: 15 }}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            {eyebrow && (
              <div className="inline-flex items-center px-3 py-1 rounded-full mb-4" style={{ border: "1px solid rgba(74,47,45,0.15)" }}>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8A6060" }}>
                  {eyebrow}
                </span>
              </div>
            )}
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 25, fontWeight: 400, color: "#2A1F1A", lineHeight: 1.2, marginBottom: description ? 8 : 20 }}>
              {title}
            </h3>
            {description && (
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, color: "#7A6A60", lineHeight: 1.6, marginBottom: 22 }}>
                {description}
              </p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); if (status === "error") setStatus("idle"); }}
                placeholder="Your name"
                aria-label="Your name"
                className="w-full px-4 py-3 rounded-xl outline-none"
                style={{ background: "#FFFFFF", border: "1px solid rgba(74,47,45,0.12)", fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#2A1F1A" }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
                placeholder="Work email"
                aria-label="Work email"
                className="w-full px-4 py-3 rounded-xl outline-none"
                style={{ background: "#FFFFFF", border: "1px solid rgba(74,47,45,0.12)", fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#2A1F1A" }}
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 mt-1 rounded-full font-semibold transition-all hover:opacity-90 disabled:opacity-60"
                style={{ background: "#6B4C4C", color: "#F2EDE8", fontFamily: "'DM Sans', sans-serif", fontSize: 15 }}
              >
                {status === "loading" ? (<><Loader2 size={16} className="animate-spin" /> Sending…</>) : (<>{submitLabel}<ArrowRight size={16} /></>)}
              </button>

              {status === "error" && (
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#DC2626" }}>{error}</p>
              )}
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#8A6060", textAlign: "center" }}>
                No spam. We'll only reach out about your AI practice.
              </p>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
};

export default LeadFormDialog;
