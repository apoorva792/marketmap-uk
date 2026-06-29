import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

interface FindCompanyPopupProps {
  hasInteracted: boolean;
}

const FindCompanyPopup = ({ hasInteracted }: FindCompanyPopupProps) => {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const autoHideRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (hasInteracted || dismissed) return;
    timerRef.current = setTimeout(() => {
      if (!hasInteracted) setVisible(true);
    }, 3000);
    return () => clearTimeout(timerRef.current);
  }, [hasInteracted, dismissed]);

  useEffect(() => {
    if (!visible || dismissed) return;
    autoHideRef.current = setTimeout(() => dismiss(), 10000);
    return () => clearTimeout(autoHideRef.current);
  }, [visible, dismissed]);

  useEffect(() => {
    if (hasInteracted && !visible) {
      setDismissed(true);
      clearTimeout(timerRef.current);
    }
  }, [hasInteracted, visible]);

  const dismiss = () => {
    setExiting(true);
    setTimeout(() => { setVisible(false); setDismissed(true); }, 300);
  };

  const handleFindClick = () => {
    dismiss();
    setTimeout(() => {
      const input = document.getElementById("directory-search") as HTMLInputElement | null;
      if (input) {
        input.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => input.focus(), 400);
      }
    }, 50);
  };

  if (!visible || dismissed) return null;

  return (
    <div
      className="fixed z-40 sm:bottom-6 sm:left-6 bottom-20 left-4 right-4 sm:right-auto sm:max-w-[320px]"
      style={{
        animation: exiting
          ? "popupExit 0.3s ease-in forwards"
          : "popupEnter 0.4s ease-out forwards",
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          background: "#FFFFFF",
          borderRadius: 16,
          padding: "16px 40px 16px 20px",
          boxShadow: "0 8px 32px rgba(42,26,24,0.12), 0 0 0 1px rgba(74,47,45,0.06)",
        }}
      >
        <button onClick={dismiss} className="absolute top-3 right-3 p-0.5" aria-label="Close">
          <X size={14} color="#8A6060" />
        </button>

        <button
          onClick={handleFindClick}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
          style={{
            background: "transparent",
            border: "none",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            color: "#6B4C4C",
            padding: 0,
          }}
        >
          <Search size={16} color="#7A6A60" />
          Find My Company →
        </button>

        <div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: 3, background: "rgba(74,47,45,0.06)", borderRadius: "0 0 16px 16px" }}
        >
          <div
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #6B4C4C, #7A6A60)",
              borderRadius: "0 0 16px 16px",
              animation: "progressShrink 10s linear forwards",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FindCompanyPopup;
