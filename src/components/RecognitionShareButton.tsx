import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { Copy, X, Check, Linkedin, Twitter, Download, Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { getCompanyLogoUrl } from "@/data/companyLogos";
import lyzrLogoSrc from "@/assets/lyzr-logo-official.webp";
import GatedDialog from "./GatedDialog";
import LeadFormDialog from "./LeadFormDialog";
import { trackEvent } from "@/lib/analytics";
import { logToSheet } from "@/lib/sheets";
import { submitEmailToHubspot, isValidEmail } from "@/lib/hubspot";
import { submitPartnerLead } from "@/lib/leadScoring";

// TODO: replace with the real goML case study URL.
const GOML_CASE_STUDY_URL = "https://www.lyzr.ai";

interface RecognitionShareButtonProps {
  companyName: string;
  tags: string[];
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const SHARE_MESSAGE =
  "Recognised as an Agentic AI Services Leader on the Lyzr 2026 Agentic AI Services Map — UK & Ireland, among the mid-market services firms shipping agentic AI in production.\n\n" +
  "Lyzr powers production AI agents across 100+ enterprises. Being named among UK & Ireland's agentic AI services leaders in 2026 reflects the work our team puts into getting AI past the pilot and into production for our clients.\n\n" +
  "#AgenticAI #EnterpriseAI #AIServices";

/** Draw a G2-style badge with Lyzr colors using canvas */
function drawBadgeCanvas(
  canvas: HTMLCanvasElement,
  companyName: string,
  companyLogoUrl: string
): Promise<void> {
  return new Promise((resolve) => {
    const w = 512;
    const h = 580;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d")!;

    ctx.clearRect(0, 0, w, h);

    // Monochrome award badge — white face, black border & text.
    const INK = "#111111";
    const SUBTLE = "#6B7280";
    const ACCENT = "#C9C9C9";

    const bw = 13;                 // border thickness
    const shoulderY = Math.round(h * 0.74);
    const r = 18;                  // top corner radius

    // Trace a shield (flat top, straight sides, pointed bottom, rounded top corners)
    function shield(x: number, y: number, ww: number, hh: number, shY: number, rr: number) {
      ctx.beginPath();
      ctx.moveTo(x + rr, y);
      ctx.lineTo(x + ww - rr, y);
      ctx.arcTo(x + ww, y, x + ww, y + rr, rr);
      ctx.lineTo(x + ww, shY);
      ctx.lineTo(x + ww / 2, y + hh);
      ctx.lineTo(x, shY);
      ctx.lineTo(x, y + rr);
      ctx.arcTo(x, y, x + rr, y, rr);
      ctx.closePath();
    }
    function roundRectPath(x: number, y: number, ww: number, hh: number, rr: number) {
      ctx.beginPath();
      ctx.moveTo(x + rr, y);
      ctx.arcTo(x + ww, y, x + ww, y + hh, rr);
      ctx.arcTo(x + ww, y + hh, x, y + hh, rr);
      ctx.arcTo(x, y + hh, x, y, rr);
      ctx.arcTo(x, y, x + ww, y, rr);
      ctx.closePath();
    }

    // Outer black border
    shield(0, 0, w, h, shoulderY, r);
    ctx.fillStyle = INK;
    ctx.fill();

    // Inner white body
    shield(bw, bw, w - bw * 2, h - bw * 2, shoulderY - bw, r - 4);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();

    // Top band geometry + crisp black divider (clipped to the inner shield)
    const bandTop = bw;
    const bandH = 96;
    const bandBottom = bandTop + bandH;
    ctx.save();
    shield(bw, bw, w - bw * 2, h - bw * 2, shoulderY - bw, r - 4);
    ctx.clip();
    ctx.strokeStyle = INK;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(bw, bandBottom);
    ctx.lineTo(w - bw, bandBottom);
    ctx.stroke();
    ctx.restore();

    // Company logo chip (TOP-LEFT)
    const cs = 54;
    const cx = bw + 22;
    const cy = bandTop + (bandH - cs) / 2;
    ctx.fillStyle = "#FFFFFF";
    roundRectPath(cx, cy, cs, cs, 12);
    ctx.fill();
    ctx.strokeStyle = INK;
    ctx.lineWidth = 1.5;
    roundRectPath(cx, cy, cs, cs, 12);
    ctx.stroke();

    // Lyzr chip (TOP-RIGHT)
    const chipW = 110;
    const chipH = 46;
    const chipX = w - bw - 22 - chipW;
    const chipY = bandTop + (bandH - chipH) / 2;

    // Load the company logo (top-left), then the Lyzr logo (top-right), then the text
    const logoImg = new Image();
    logoImg.crossOrigin = "anonymous";
    logoImg.onload = () => {
      ctx.save();
      roundRectPath(cx + 5, cy + 5, cs - 10, cs - 10, 8);
      ctx.clip();
      ctx.drawImage(logoImg, cx + 6, cy + 6, cs - 12, cs - 12);
      ctx.restore();
      loadLyzrLogo();
    };
    logoImg.onerror = () => {
      ctx.save();
      ctx.fillStyle = INK;
      ctx.font = "bold 26px 'DM Sans', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(companyName.charAt(0).toUpperCase(), cx + cs / 2, cy + cs / 2);
      ctx.restore();
      loadLyzrLogo();
    };
    logoImg.src = companyLogoUrl;

    function loadLyzrLogo() {
      const lz = new Image();
      lz.onload = () => {
        ctx.fillStyle = "#FFFFFF";
        roundRectPath(chipX, chipY, chipW, chipH, 10);
        ctx.fill();
        ctx.strokeStyle = INK;
        ctx.lineWidth = 1.5;
        roundRectPath(chipX, chipY, chipW, chipH, 10);
        ctx.stroke();
        const pad = 9;
        const availW = chipW - pad * 2;
        const availH = chipH - pad * 2;
        const ratio = lz.width && lz.height ? lz.width / lz.height : 2.8;
        let dw = availW;
        let dh = dw / ratio;
        if (dh > availH) { dh = availH; dw = dh * ratio; }
        ctx.drawImage(lz, chipX + (chipW - dw) / 2, chipY + (chipH - dh) / 2, dw, dh);
        drawBody();
      };
      lz.onerror = () => drawBody();
      lz.src = lyzrLogoSrc;
    }

    function drawBody() {
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";

      // "Agentic AI Services Leader" — solid black, two lines.
      ctx.fillStyle = INK;
      ctx.font = "800 54px 'DM Sans', sans-serif";
      ctx.fillText("Agentic AI", w / 2, 286);
      ctx.font = "800 47px 'DM Sans', sans-serif";
      ctx.fillText("Services Leader", w / 2, 338);

      // Subtitle
      ctx.fillStyle = SUBTLE;
      ctx.font = "600 18px 'DM Sans', sans-serif";
      ctx.fillText("UK & Ireland · 2026 Map", w / 2, 380);

      resolve();
    }
  });
}

const RecognitionShareButton = ({ companyName }: RecognitionShareButtonProps) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [badgeDataUrl, setBadgeDataUrl] = useState<string | null>(null);
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  // Email gate shown before the badge download.
  const [emailGateOpen, setEmailGateOpen] = useState(false);
  const [gateName, setGateName] = useState("");
  const [gateEmail, setGateEmail] = useState("");
  const [gateStatus, setGateStatus] = useState<"idle" | "loading" | "error">("idle");
  const [gateError, setGateError] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const message = SHARE_MESSAGE;
  const close = useCallback(() => setOpen(false), []);
  const companyLogoUrl = getCompanyLogoUrl(companyName);

  // Generate badge when modal opens
  useEffect(() => {
    if (!open) return;
    const canvas = document.createElement("canvas");
    drawBadgeCanvas(canvas, companyName, companyLogoUrl).then(() => {
      setBadgeDataUrl(canvas.toDataURL("image/png"));
    });
  }, [open, companyName, companyLogoUrl]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, close]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    trackEvent("badge_copy_message", { company: companyName });
  };

  // Trigger the actual PNG download. Called only after the email gate is passed.
  const performDownload = () => {
    if (!badgeDataUrl) return;
    const a = document.createElement("a");
    a.href = badgeDataUrl;
    a.download = `${slugify(companyName)}-lyzr-badge-2026.png`;
    a.click();
  };

  // "Download Badge" no longer downloads directly — it opens the email gate first.
  const handleDownload = () => {
    setGateStatus("idle");
    setGateError("");
    setEmailGateOpen(true);
    trackEvent("badge_download_intent", { company: companyName });
  };

  const handleGateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gateName.trim()) { setGateStatus("error"); setGateError("Please enter your name."); return; }
    if (!isValidEmail(gateEmail)) { setGateStatus("error"); setGateError("Please enter a valid work email."); return; }
    setGateStatus("loading");
    setGateError("");
    // Log the email against the badge-download action in the Google Sheet.
    await logToSheet({
      source: "badge_download",
      name: gateName.trim(),
      email: gateEmail.trim(),
      company: companyName,
    });
    // Best-effort lead capture into HubSpot too — never block the download on it.
    try { await submitEmailToHubspot(gateEmail, `Badge download: ${companyName}`); } catch { /* swallow */ }
    // Run the lead through the full LSA pipeline (HubSpot → Apollo → Slack).
    void submitPartnerLead({ email: gateEmail, fullName: gateName });
    trackEvent("badge_download", { company: companyName });
    performDownload();
    setEmailGateOpen(false);
    setGateStatus("idle");
  };

  const handleLinkedIn = () => {
    trackEvent("badge_share", { company: companyName, channel: "linkedin" });
    const url = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    close();
  };

  const handleTwitter = () => {
    trackEvent("badge_share", { company: companyName, channel: "twitter" });
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    close();
  };

  return (
    <>
      <button
        onClick={() => { setOpen(true); trackEvent("badge_modal_open", { company: companyName }); }}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-all hover:opacity-80"
        style={{ background: "#6B4C4C", color: "#F2EDE8" }}
      >
        Share Badge
      </button>

      {open && createPortal(
        <div
          ref={overlayRef}
          className="fixed inset-0 flex justify-center items-center"
          style={{
            zIndex: 1100,
            background: "rgba(42, 26, 24, 0.75)",
            backdropFilter: "blur(8px)",
            padding: isMobile ? 12 : 24,
          }}
          onClick={(e) => { if (e.target === overlayRef.current) close(); }}
        >
          <div
            role="dialog"
            className="relative w-full outline-none"
            style={{
              zIndex: 1101,
              background: "#F9F5F1",
              borderRadius: 20,
              boxShadow: "0 25px 60px -12px rgba(42, 26, 24, 0.5)",
              maxWidth: isMobile ? "100%" : 960,
              maxHeight: isMobile ? "92vh" : "92vh",
              overflowY: "auto",
              padding: isMobile ? "24px 20px" : "52px 60px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={close}
              className="absolute top-4 right-4 z-10 p-2 rounded-full transition-colors"
              style={{ background: "rgba(74,47,45,0.06)" }}
              aria-label="Close"
            >
              <X size={16} style={{ color: "#7A6A60" }} />
            </button>

            {/* Two-column layout: Badge left, Content right */}
            <div className={`flex ${isMobile ? "flex-col items-center gap-6" : "flex-row gap-10 items-center"}`}>
              {/* LEFT: Badge - rendered as HTML (instant, like cards) */}
              <div className="shrink-0 flex flex-col items-center">
                <div
                  style={{
                    width: isMobile ? 220 : 280,
                    position: "relative",
                    overflow: "visible",
                  }}
                >
                  {/* Monochrome award badge — white face, crisp black border */}
                  <div style={{
                    background: "#111111",
                    clipPath: "polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)",
                    padding: 7,
                  }}>
                    <div style={{
                      background: "#FFFFFF",
                      clipPath: "polygon(0 0, 100% 0, 100% 73%, 50% 100%, 0 73%)",
                      position: "relative",
                      overflow: "hidden",
                      paddingBottom: 92,
                    }}>
                      {/* Top band */}
                      <div style={{
                        position: "relative", height: 60, background: "#FFFFFF",
                        borderBottom: "2px solid #111111",
                        display: "flex", alignItems: "center", justifyContent: "space-between",
                        padding: "0 14px",
                      }}>
                        {/* Company logo (left) */}
                        <img
                          src={companyLogoUrl}
                          alt={companyName}
                          style={{ width: 38, height: 38, borderRadius: 8, objectFit: "contain", background: "#fff", border: "1px solid #111111" }}
                        />
                        {/* Lyzr logo (right) */}
                        <div style={{ background: "#FFFFFF", borderRadius: 7, padding: "5px 9px", display: "flex", alignItems: "center", border: "1px solid #111111" }}>
                          <img src={lyzrLogoSrc} alt="Lyzr" style={{ height: 13, objectFit: "contain", display: "block" }} />
                        </div>
                      </div>
                      {/* Text */}
                      <div style={{ padding: "30px 14px 0", textAlign: "center" }}>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 31, lineHeight: 1.0, color: "#111111", letterSpacing: "-0.01em" }}>
                          Agentic AI
                        </div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: 28, lineHeight: 1.08, color: "#111111", marginTop: 2, letterSpacing: "-0.01em" }}>
                          Services Leader
                        </div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12, color: "#6B7280", marginTop: 12, letterSpacing: "0.02em" }}>
                          UK & Ireland · 2026 Map
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Download badge button */}
                <button
                  onClick={handleDownload}
                  className="mt-4 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[12px] font-medium transition-all hover:opacity-80"
                  style={{ background: "#6B4C4C", color: "#F2EDE8" }}
                >
                  <Download size={13} />
                  Download Badge
                </button>
              </div>

              {/* RIGHT: Content */}
              <div className="flex-1 min-w-0">
                {/* Title */}
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 26,
                  fontWeight: 700,
                  color: "#2A1F1A",
                  marginBottom: 6,
                }}>
                  Share your recognition
                </h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  color: "#8A6060",
                  marginBottom: 24,
                }}>
                  {companyName} · Recognised by Lyzr, 2026
                </p>

                {/* Message preview - full visible, no scroll */}
                <div
                  className="w-full cursor-pointer mb-5 select-all"
                  onClick={() => { navigator.clipboard.writeText(message); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(74,47,45,0.1)",
                    borderRadius: 12,
                    padding: 16,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: "#2A1F1A",
                    lineHeight: 1.7,
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                >
                  {message}
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleCopy}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-[13px] font-semibold transition-all hover:opacity-90"
                    style={{
                      background: copied ? "#2A1F1A" : "#6B4C4C",
                      color: "#F2EDE8",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    {copied ? "Copied!" : "Copy Message"}
                  </button>

                  <div className="flex gap-3">
                    <button
                      onClick={handleLinkedIn}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-[13px] font-semibold transition-all hover:opacity-90"
                      style={{
                        background: "rgba(74,47,45,0.08)",
                        color: "#6B4C4C",
                        border: "1px solid rgba(74,47,45,0.12)",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      <Linkedin size={14} />
                      LinkedIn
                    </button>

                    <button
                      onClick={handleTwitter}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-full text-[13px] font-semibold transition-all hover:opacity-90"
                      style={{
                        background: "rgba(74,47,45,0.08)",
                        color: "#6B4C4C",
                        border: "1px solid rgba(74,47,45,0.12)",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      <Twitter size={14} />
                      Twitter / X
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Close band, the conversion moment */}
            <div
              className="mt-10 rounded-2xl"
              style={{ background: "#2A1F1A", padding: isMobile ? "26px 22px" : "40px 44px" }}
            >
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: isMobile ? 21 : 27, fontWeight: 400, color: "#F8F1EA", lineHeight: 1.2, marginBottom: 10 }}>
                You made the list. Let's make it count.
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#D9C7BC", lineHeight: 1.65, maxWidth: 660, marginBottom: 24 }}>
                Our partnerships team is actively engaging AI-forward service providers serious about scaling production-grade agent solutions. We bring the infrastructure, the funding, and the playbook behind a $10M AI practice built in nine months.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setBookOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-semibold transition-all hover:opacity-90"
                  style={{ background: "#F2EDE8", color: "#2A1F1A", fontFamily: "'DM Sans', sans-serif", fontSize: 15 }}
                >
                  Book a 20-min call →
                </button>
                <button
                  onClick={() => setCaseStudyOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-semibold transition-all hover:opacity-80"
                  style={{ background: "transparent", color: "#E3D0C2", border: "1px solid rgba(243,239,234,0.25)", fontFamily: "'DM Sans', sans-serif", fontSize: 15 }}
                >
                  Or see how goML did it →
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {emailGateOpen && createPortal(
        <div
          className="fixed inset-0 flex justify-center items-center"
          style={{ zIndex: 1200, background: "rgba(42, 26, 24, 0.75)", backdropFilter: "blur(8px)", padding: 20 }}
          onClick={(e) => { if (e.target === e.currentTarget) setEmailGateOpen(false); }}
        >
          <div
            role="dialog"
            className="relative w-full"
            style={{
              background: "#F9F5F1",
              borderRadius: 22,
              boxShadow: "0 25px 60px -12px rgba(42, 26, 24, 0.5)",
              maxWidth: 460,
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "clamp(26px, 5vw, 40px) clamp(20px, 5vw, 36px) clamp(24px, 5vw, 36px)",
            }}
          >
            <button
              onClick={() => setEmailGateOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full transition-colors"
              style={{ background: "rgba(74,47,45,0.06)" }}
              aria-label="Close"
            >
              <X size={16} style={{ color: "#7A6A60" }} />
            </button>

            <div className="inline-flex items-center px-3 py-1 rounded-full mb-4" style={{ border: "1px solid rgba(74,47,45,0.15)" }}>
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8A6060" }}>
                Download your badge
              </span>
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 25, fontWeight: 400, color: "#2A1F1A", lineHeight: 1.2, marginBottom: 8 }}>
              Get the {companyName} badge
            </h3>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, color: "#7A6A60", lineHeight: 1.6, marginBottom: 22 }}>
              Enter your email and we'll start the download. We'll only reach out about your AI practice.
            </p>

            <form onSubmit={handleGateSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                value={gateName}
                onChange={(e) => { setGateName(e.target.value); if (gateStatus === "error") setGateStatus("idle"); }}
                placeholder="Your name"
                aria-label="Your name"
                className="w-full px-4 py-3 rounded-xl outline-none"
                style={{ background: "#FFFFFF", border: "1px solid rgba(74,47,45,0.12)", fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#2A1F1A" }}
              />
              <input
                type="email"
                value={gateEmail}
                onChange={(e) => { setGateEmail(e.target.value); if (gateStatus === "error") setGateStatus("idle"); }}
                placeholder="Work email"
                aria-label="Work email"
                className="w-full px-4 py-3 rounded-xl outline-none"
                style={{ background: "#FFFFFF", border: "1px solid rgba(74,47,45,0.12)", fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#2A1F1A" }}
              />
              <button
                type="submit"
                disabled={gateStatus === "loading"}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 mt-1 rounded-full font-semibold transition-all hover:opacity-90 disabled:opacity-60"
                style={{ background: "#6B4C4C", color: "#F2EDE8", fontFamily: "'DM Sans', sans-serif", fontSize: 15 }}
              >
                {gateStatus === "loading" ? (<><Loader2 size={16} className="animate-spin" /> Preparing…</>) : (<><Download size={16} /> Download badge</>)}
              </button>
              {gateStatus === "error" && (
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#DC2626" }}>{gateError}</p>
              )}
            </form>
          </div>
        </div>,
        document.body
      )}

      <GatedDialog
        open={caseStudyOpen}
        onClose={() => setCaseStudyOpen(false)}
        eyebrow="goML Case Study"
        title="See how goML did it"
        description="$0 → $1M AI revenue in five months on Lyzr. Get the full case study: the motion, the use cases, and the numbers."
        resourceUrl={GOML_CASE_STUDY_URL}
        resourceLabel="Read the goML story →"
        submitLabel="Send me the case study"
        logSource="goML case study"
      />

      <LeadFormDialog
        open={bookOpen}
        onClose={() => setBookOpen(false)}
        eyebrow="Let's talk"
        title="Book 20 minutes with us"
        description="Tell us about your firm and our partnerships team will set up a call."
        submitLabel="Request a call"
        logSource="Book a 20-min call"
      />
    </>
  );
};

export default RecognitionShareButton;
