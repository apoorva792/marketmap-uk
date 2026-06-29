import { X } from "lucide-react";

interface TagRecognitionBannerProps {
  tagName: string;
  onDismiss: () => void;
}

const TagRecognitionBanner = ({ tagName, onDismiss }: TagRecognitionBannerProps) => {
  return (
    <div
      className="flex items-center justify-center gap-2 px-4 relative"
      style={{
        background: "#F9F5F1",
        height: 36,
        borderBottom: "1px solid rgba(74,47,45,0.08)",
      }}
    >
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 12,
        color: "#2A1F1A",
        fontWeight: 500,
      }}>
        ✦ Showing companies recognised as{" "}
        <strong style={{ fontWeight: 700 }}>{tagName}</strong>{" "}
        by Lyzr.ai
      </span>
      <button
        onClick={onDismiss}
        className="absolute right-3 p-0.5 rounded-full hover:bg-white/50 transition-colors"
        aria-label="Dismiss"
      >
        <X size={14} color="#7A6A60" />
      </button>
    </div>
  );
};

export default TagRecognitionBanner;
