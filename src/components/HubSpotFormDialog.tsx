import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { HUBSPOT_PORTAL_ID, HUBSPOT_PARTNER_FORM_ID, HUBSPOT_REGION } from "@/lib/hubspotConfig";
import { logToSheet } from "@/lib/sheets";
import { submitPartnerLead } from "@/lib/leadScoring";

let scriptPromise: Promise<void> | null = null;
function loadHubSpotScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((window as any).hbspt) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://js.hsforms.net/forms/embed/v2.js";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load HubSpot embed script"));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

let counter = 0;

export interface HubSpotFormDialogProps {
  open: boolean;
  onClose: () => void;
  eyebrow?: string;
  title: string;
  description?: string;
  /** Override the default partner form. */
  formId?: string;
  /** Label written to the Google Sheet for this CTA (defaults to the title). */
  logSource?: string;
}

const HubSpotFormDialog = ({ open, onClose, eyebrow, title, description, formId, logSource }: HubSpotFormDialogProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(`hs-form-target-${++counter}`);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Mirror every HubSpot form submission to the Google Sheet. HubSpot fires a
  // window "message" with eventName "onFormSubmit" carrying the field values.
  useEffect(() => {
    if (!open) return;
    const onMessage = (e: MessageEvent) => {
      const d = e?.data as { type?: string; eventName?: string; data?: { name: string; value: string }[] } | undefined;
      if (!d || d.type !== "hsFormCallback" || d.eventName !== "onFormSubmit") return;
      const fields: Record<string, string> = {};
      if (Array.isArray(d.data)) for (const f of d.data) if (f?.name) fields[f.name] = f.value;
      const fullName = [fields.firstname, fields.lastname].filter(Boolean).join(" ") || fields.name || "";
      void logToSheet({
        source: logSource || title,
        name: fullName,
        email: fields.email || "",
        company: fields.company || fields.company_name || "",
      });
      // Run the lead through the full LSA pipeline (HubSpot → Apollo → Slack).
      if (fields.email) void submitPartnerLead({ email: fields.email, fullName });
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [open, logSource, title]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    loadHubSpotScript()
      .then(() => {
        if (cancelled || !targetRef.current) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const hbspt = (window as any).hbspt;
        if (!hbspt?.forms) return;
        targetRef.current.innerHTML = "";
        hbspt.forms.create({
          region: HUBSPOT_REGION,
          portalId: HUBSPOT_PORTAL_ID,
          formId: formId || HUBSPOT_PARTNER_FORM_ID,
          target: `#${idRef.current}`,
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      if (targetRef.current) targetRef.current.innerHTML = "";
    };
  }, [open, formId]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 flex justify-center items-center"
      style={{ zIndex: 1300, background: "rgba(42, 26, 24, 0.75)", backdropFilter: "blur(8px)", padding: 20 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Light styling so the embedded HubSpot form matches the palette */}
      <style>{`
        #${idRef.current} .hs-form-field { margin-bottom: 14px; }
        #${idRef.current} .hs-form-field > label { font-family:'DM Sans',sans-serif; font-size:13px; font-weight:600; color:#2A1F1A; display:block; margin-bottom:6px; }
        #${idRef.current} input[type=text], #${idRef.current} input[type=email], #${idRef.current} input[type=tel], #${idRef.current} select, #${idRef.current} textarea {
          width:100%; box-sizing:border-box; padding:11px 14px; border-radius:12px; border:1px solid rgba(74,47,45,0.14);
          background:#FFFFFF; font-family:'DM Sans',sans-serif; font-size:15px; color:#2A1F1A; outline:none;
        }
        #${idRef.current} input:focus, #${idRef.current} select:focus, #${idRef.current} textarea:focus { border-color: rgba(74,47,45,0.4); }
        #${idRef.current} .hs-button {
          width:100%; margin-top:6px; padding:12px 24px; border:none; border-radius:9999px; cursor:pointer;
          background:#6B4C4C; color:#F2EDE8; font-family:'DM Sans',sans-serif; font-size:15px; font-weight:600;
        }
        #${idRef.current} .hs-button:hover { opacity:.9; }
        #${idRef.current} .hs-error-msg, #${idRef.current} .hs-error-msgs label { color:#DC2626; font-family:'DM Sans',sans-serif; font-size:12.5px; }
        #${idRef.current} ul { list-style:none; padding:0; margin:6px 0 0; }
        #${idRef.current} .legal-consent-container, #${idRef.current} .hs-richtext { font-family:'DM Sans',sans-serif; font-size:12px; color:#8A6060; line-height:1.5; }
      `}</style>

      <div
        role="dialog"
        className="relative w-full"
        style={{ background: "#F9F5F1", borderRadius: 22, boxShadow: "0 25px 60px -12px rgba(42, 26, 24, 0.5)", maxWidth: 480, maxHeight: "90vh", overflowY: "auto", padding: "clamp(26px, 5vw, 40px) clamp(20px, 5vw, 36px) clamp(24px, 5vw, 36px)" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full transition-colors"
          style={{ background: "rgba(74,47,45,0.06)" }}
          aria-label="Close"
        >
          <X size={16} style={{ color: "#7A6A60" }} />
        </button>

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

        <div id={idRef.current} ref={targetRef} />
      </div>
    </div>,
    document.body
  );
};

export default HubSpotFormDialog;
