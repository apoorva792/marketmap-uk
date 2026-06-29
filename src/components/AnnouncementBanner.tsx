import { useState } from "react";
import { Sparkles, X } from "lucide-react";

interface AnnouncementBannerProps {
  onDismiss: () => void;
}

const AnnouncementBanner = ({ onDismiss }: AnnouncementBannerProps) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss();
  };

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-center px-4"
      style={{
        background: "#6B4C4C",
        height: 40,
      }}
    >
      <div className="flex items-center gap-2">
        <Sparkles size={13} color="#C96A5A" className="flex-shrink-0" />
        <span
          className="hidden sm:inline"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: "#E3D0C2",
            fontWeight: 400,
          }}
        >
          Bring agentic AI into the real world. Let's build something together.
        </span>
        <span
          className="sm:hidden"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: "#E3D0C2",
            fontWeight: 400,
          }}
        >
          Build with agentic AI.
        </span>
        <a
          href="https://www.lyzr.ai/partners/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline whitespace-nowrap"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: "#FFFFFF",
            fontWeight: 600,
          }}
        >
          Partner with Lyzr →
        </a>
      </div>
      <button
        onClick={handleDismiss}
        className="absolute right-4 p-1 rounded-full hover:bg-white/10 transition-colors"
        aria-label="Dismiss"
      >
        <X size={14} color="#C96A5A" />
      </button>
    </div>
  );
};

export default AnnouncementBanner;
