import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Share2, X, Copy, Link } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ShareWidgetProps {
  companyName: string;
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const ShareWidget = ({ companyName }: ShareWidgetProps) => {
  const [open, setOpen] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copyPulse, setCopyPulse] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const isMobile = useIsMobile();

  const slug = slugify(companyName);
  const pageUrl = `${window.location.origin}${window.location.pathname}`;
  const shareUrl = `${pageUrl}#${slug}`;

  const message = `Excited to share that ${companyName} has been featured in Lyzr's India AI & IT Partner Directory, a curated list of companies Lyzr is actively looking to partner with for enterprise AI implementation across India. 🎉

It's great to be recognized alongside India's leading GSIs and hyperscaler partners as a company building real AI value for enterprises.

If you're exploring AI agent deployments or want to understand how Lyzr's platform fits into your tech stack, let's talk.

👉 ${shareUrl}

#LyzrAI #EnterpriseAI #AIPartners #IndiaIT`;

  const closeModal = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = "";
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => modalRef.current?.focus(), 50);
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { closeModal(); return; }
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, closeModal]);

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopiedMsg(true);
      setCopyPulse(true);
      setTimeout(() => setCopyPulse(false), 200);
      setTimeout(() => setCopiedMsg(false), 2500);
    } catch {}
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {}
  };

  return (
    <>
      <button
        ref={triggerRef}
        onClick={(e) => { e.stopPropagation(); setOpen(true); }}
        className="p-1.5 rounded-full transition-colors hover:bg-[hsl(25,30%,80%)]"
        aria-label="Share"
      >
        <Share2 size={16} color="#7A6A60" />
      </button>

      {open && createPortal(
        <div
          ref={overlayRef}
          className="fixed inset-0 flex justify-center"
          style={{
            zIndex: 1100,
            background: "rgba(42, 26, 25, 0.6)",
            backdropFilter: "blur(3px)",
            WebkitBackdropFilter: "blur(3px)",
            alignItems: isMobile ? "flex-end" : "center",
            paddingTop: isMobile ? 0 : 52,
            paddingBottom: isMobile ? 0 : 24,
          }}
          onClick={(e) => { if (e.target === overlayRef.current) closeModal(); }}
        >
          <div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            className="relative w-full outline-none"
            style={{
              zIndex: 1101,
              background: "#F2EDE8",
              border: "1px solid #C96A5A",
              boxShadow: "0 12px 40px -8px rgba(113,81,79,0.2), 0 4px 12px -4px rgba(113,81,79,0.1)",
              maxWidth: isMobile ? "100%" : 440,
              borderRadius: isMobile ? "20px 20px 0 0" : 20,
              padding: isMobile ? 24 : 28,
              maxHeight: isMobile ? "85vh" : "calc(100vh - 104px - 48px)",
              overflowY: "auto",
              margin: isMobile ? 0 : undefined,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile drag handle */}
            {isMobile && (
              <div className="flex justify-center" style={{ marginBottom: 16 }}>
                <div style={{ width: 32, height: 4, background: "#C96A5A", borderRadius: 4 }} />
              </div>
            )}

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute flex items-center justify-center transition-colors"
              style={{
                zIndex: 1102,
                top: 16, right: 16,
                width: 36, height: 36,
                borderRadius: "50%",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#E3D0C2";
                const svg = e.currentTarget.querySelector("svg");
                if (svg) svg.style.color = "#2A1F1A";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                const svg = e.currentTarget.querySelector("svg");
                if (svg) svg.style.color = "#8A6060";
              }}
              aria-label="Close"
            >
              <X size={18} style={{ color: "#8A6060", transition: "color 0.2s ease" }} />
            </button>

            {/* Badge */}
            <div
              style={{
                background: "linear-gradient(135deg, #7A6A60, #2A1F1A)",
                borderRadius: 14,
                padding: 24,
                marginBottom: 20,
              }}
            >
              <p style={{
                fontFamily: "'Noto Sans', 'DM Sans', sans-serif", fontSize: 9,
                color: "#E3D0C2", letterSpacing: "0.1em", fontWeight: 500,
                textTransform: "uppercase", marginBottom: 10,
              }}>
                LYZR · INDIA AI & IT PARTNER DIRECTORY
              </p>
              <div style={{ height: 1, background: "rgba(198,168,154,0.3)", marginBottom: 12 }} />
              <p style={{
                fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#F2EDE8",
                fontWeight: 700, lineHeight: 1.3, textAlign: "center", marginBottom: 8,
              }}>
                We made the list.
              </p>
              <p style={{
                fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#E3D0C2",
                fontWeight: 600, lineHeight: 1.3, textAlign: "center", marginBottom: 8,
              }}>
                {companyName}
              </p>
              <p style={{
                fontFamily: "'Noto Sans', 'DM Sans', sans-serif", fontSize: 12, color: "#E3D0C2",
                textAlign: "center", opacity: 0.85, lineHeight: 1.5, marginBottom: 12,
              }}>
                Recognized as one of the companies Lyzr wants to partner with, among India's most promising AI & IT implementation partners.
              </p>
              <div className="flex items-end justify-between">
                <span style={{ fontFamily: "'Noto Sans', 'DM Sans', sans-serif", fontSize: 10, color: "#C96A5A", fontWeight: 500, opacity: 0.7 }}>
                  lyzr.ai
                </span>
                <span style={{ fontSize: 18, color: "#C96A5A", opacity: 0.7, fontWeight: 700 }} aria-hidden="true">
                  ❮✕❯
                </span>
              </div>
            </div>

            {/* Share label */}
            <p style={{
              fontFamily: "'Noto Sans', 'DM Sans', sans-serif", fontSize: 13,
              color: "#27272A", fontWeight: 600, marginBottom: 10,
            }}>
              Share this with your network
            </p>

            {/* Message text box */}
            <textarea
              readOnly
              value={message}
              onClick={(e) => e.currentTarget.select()}
              className="w-full resize-none cursor-pointer"
              style={{
                background: "#E3D0C2",
                border: "1px solid #C96A5A",
                borderRadius: 12,
                padding: 16,
                fontFamily: "'Noto Sans', 'DM Sans', sans-serif",
                fontSize: 13,
                color: "#2A1F1A",
                lineHeight: 1.7,
                outline: "none",
                maxHeight: 140,
                overflowY: "auto",
                marginBottom: 14,
              }}
              rows={4}
            />

            {/* Copy This Message button */}
            <button
              onClick={handleCopyMessage}
              className="w-full flex items-center justify-center py-[13px] px-5 transition-colors"
              style={{
                background: copiedMsg ? "#2A1F1A" : "#7A6A60",
                color: "#F2EDE8",
                fontFamily: "'Noto Sans', 'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                borderRadius: 10,
                marginBottom: 10,
                transition: "background 0.2s ease, transform 0.15s ease",
                transform: copyPulse ? "scale(0.97)" : "scale(1)",
              }}
              onMouseEnter={(e) => { if (!copiedMsg) e.currentTarget.style.background = "#2A1F1A"; }}
              onMouseLeave={(e) => { if (!copiedMsg) e.currentTarget.style.background = "#7A6A60"; }}
            >
              <Copy size={16} color="#F2EDE8" style={{ marginRight: 8 }} />
              {copiedMsg ? "✓ Message Copied!" : "Copy This Message"}
            </button>

            {/* Copy Link button */}
            <button
              onClick={handleCopyLink}
              className="w-full flex items-center justify-center py-[13px] px-5 transition-opacity hover:opacity-90"
              style={{
                background: "#E3D0C2",
                color: "#2A1F1A",
                fontFamily: "'Noto Sans', 'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                borderRadius: 10,
              }}
            >
              <Link size={16} color="#2A1F1A" style={{ marginRight: 8 }} />
              {copiedLink ? "✓ Link Copied!" : "Copy Link"}
            </button>
          </div>
        </div>
      , document.body)}
    </>
  );
};

export default ShareWidget;
