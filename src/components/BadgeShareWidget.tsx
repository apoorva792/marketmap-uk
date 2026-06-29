import { useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, Download, Copy, Share2, Check } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import type { CompanyBadge } from "@/lib/badges";
import { drawBadge, drawLinkedInBadge } from "@/lib/badges";

interface BadgeShareWidgetProps {
  companyName: string;
  badges: CompanyBadge[];
}

const BadgeShareWidget = ({ companyName, badges }: BadgeShareWidgetProps) => {
  const [selectedBadge, setSelectedBadge] = useState<CompanyBadge | null>(null);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const close = useCallback(() => setSelectedBadge(null), []);

  const downloadPNG = (badge: CompanyBadge) => {
    const canvas = document.createElement("canvas");
    drawBadge(canvas, badge.label, "light");
    const link = document.createElement("a");
    link.download = `${companyName.replace(/\s+/g, "-")}-${badge.type}-badge.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const downloadLinkedIn = (badge: CompanyBadge) => {
    const canvas = document.createElement("canvas");
    drawLinkedInBadge(canvas, badge.label);
    const link = document.createElement("a");
    link.download = `${companyName.replace(/\s+/g, "-")}-${badge.type}-linkedin.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const copyEmbed = async (badge: CompanyBadge) => {
    const snippet = `<a href="https://lyzr.ai/partners" target="_blank"><img src="[badge-url]" alt="${badge.label}, Recognised by Lyzr.ai" width="160"/></a>`;
    await navigator.clipboard.writeText(snippet);
    setCopiedEmbed(true);
    setTimeout(() => setCopiedEmbed(false), 2000);
  };

  const copyShareMessage = async (badge: CompanyBadge) => {
    const msg = `${companyName} has been recognised as "${badge.label}" by Lyzr.ai 🎉\n\nCheck out the full partner directory: ${window.location.origin}/`;
    await navigator.clipboard.writeText(msg);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  if (badges.length === 0) return null;

  return (
    <>
      <div className="flex flex-wrap gap-1.5">
        {badges.map((badge) => (
          <button
            key={badge.label}
            onClick={() => setSelectedBadge(badge)}
            className="inline-flex items-center gap-1 rounded-full cursor-pointer transition-all hover:scale-105"
            style={{
              padding: "2px 8px",
              fontFamily: "'Noto Sans', sans-serif",
              fontWeight: 600,
              fontSize: "9px",
              letterSpacing: "0.03em",
              background: badge.type === "industry" ? "rgba(113, 81, 79, 0.1)" : "rgba(61, 140, 108, 0.1)",
              color: badge.type === "industry" ? "#7A6A60" : "#16A34A",
              border: `1px solid ${badge.type === "industry" ? "rgba(113, 81, 79, 0.3)" : "rgba(61, 140, 108, 0.3)"}`,
            }}
          >
            <Share2 size={8} />
            {badge.label}
          </button>
        ))}
      </div>

      {selectedBadge && createPortal(
        <div
          ref={overlayRef}
          className="fixed inset-0 flex justify-center"
          style={{
            zIndex: 1100,
            background: "rgba(42, 26, 25, 0.6)",
            backdropFilter: "blur(3px)",
            alignItems: isMobile ? "flex-end" : "center",
          }}
          onClick={(e) => { if (e.target === overlayRef.current) close(); }}
        >
          <div
            role="dialog"
            className="relative w-full outline-none"
            style={{
              zIndex: 1101,
              background: "#F2EDE8",
              border: "1px solid #C96A5A",
              boxShadow: "0 12px 40px -8px rgba(113,81,79,0.2)",
              maxWidth: isMobile ? "100%" : 400,
              borderRadius: isMobile ? "20px 20px 0 0" : 20,
              padding: isMobile ? 24 : 28,
              maxHeight: isMobile ? "85vh" : "80vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 p-2 rounded-full transition-colors hover:bg-[hsl(25,30%,85%)]"
              aria-label="Close"
            >
              <X size={16} style={{ color: "#8A6060" }} />
            </button>

            {/* Badge Preview */}
            <div className="flex justify-center mb-5">
              <BadgePreview label={selectedBadge.label} />
            </div>

            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 16,
              fontWeight: 700,
              color: "#2A1F1A",
              textAlign: "center",
              marginBottom: 4,
            }}>
              {companyName}
            </p>
            <p style={{
              fontFamily: "'Noto Sans', sans-serif",
              fontSize: 11,
              color: "#8A6060",
              textAlign: "center",
              marginBottom: 20,
            }}>
              Recognised by Lyzr.ai
            </p>

            {/* Actions */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => downloadPNG(selectedBadge)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-[10px] text-sm font-semibold transition-colors"
                style={{
                  background: "#7A6A60",
                  color: "#F2EDE8",
                  fontFamily: "'Noto Sans', sans-serif",
                }}
              >
                <Download size={14} /> Download PNG
              </button>

              <button
                onClick={() => downloadLinkedIn(selectedBadge)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-[10px] text-sm font-semibold transition-colors"
                style={{
                  background: "#2A1F1A",
                  color: "#F2EDE8",
                  fontFamily: "'Noto Sans', sans-serif",
                }}
              >
                <Download size={14} /> Download LinkedIn Image
              </button>

              <button
                onClick={() => copyEmbed(selectedBadge)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-[10px] text-sm font-semibold transition-colors"
                style={{
                  background: "#E3D0C2",
                  color: "#2A1F1A",
                  fontFamily: "'Noto Sans', sans-serif",
                }}
              >
                {copiedEmbed ? <Check size={14} /> : <Copy size={14} />}
                {copiedEmbed ? "Copied!" : "Copy Embed Code"}
              </button>

              <button
                onClick={() => copyShareMessage(selectedBadge)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-[10px] text-sm font-semibold transition-colors"
                style={{
                  background: "transparent",
                  color: "#7A6A60",
                  border: "1px solid #C96A5A",
                  fontFamily: "'Noto Sans', sans-serif",
                }}
              >
                {copiedShare ? <Check size={14} /> : <Share2 size={14} />}
                {copiedShare ? "Copied!" : "Share"}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

function BadgePreview({ label }: { label: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <canvas
      ref={(el) => {
        if (el) drawBadge(el, label, "light");
      }}
      style={{ width: 130, height: 146 }}
    />
  );
}

export default BadgeShareWidget;
