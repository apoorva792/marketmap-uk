import { useState, useEffect } from "react";
import { ListChecks } from "lucide-react";

const BecomePartnerButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <button
      onClick={() => document.getElementById("the-list")?.scrollIntoView({ behavior: "smooth", block: "start" })}
      className="fixed z-40 flex items-center bottom-4 right-4 sm:bottom-6 sm:right-6 sm:hidden"
      style={{
        background: "#6B4C4C",
        borderRadius: 50,
        padding: "14px 24px",
        boxShadow: "0 8px 24px rgba(42, 26, 24, 0.35)",
        textDecoration: "none",
        transition: "all 0.3s ease",
        opacity: visible ? 1 : 0,
        translate: visible ? "0 0" : "0 20px",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <ListChecks size={18} color="#F2EDE8" style={{ marginRight: 8 }} />
      <span style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
        fontWeight: 600,
        color: "#F2EDE8",
      }}>
        See the list
      </span>
    </button>
  );
};

export default BecomePartnerButton;
