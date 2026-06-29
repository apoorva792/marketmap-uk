import { NavLink } from "react-router-dom";
import lyzrLogo from "@/assets/lyzr-logo-official.webp";

const Navbar = ({ topOffset = 0 }: { topOffset?: number }) => {
  return (
    <nav
      className="fixed left-0 right-0 z-[999]"
      style={{
        top: topOffset,
        background: "#FFFFFF",
        height: 64,
        borderBottom: "1px solid rgba(74, 47, 45, 0.08)",
        boxShadow: "0 1px 3px rgba(74, 47, 45, 0.04)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        <NavLink to="/" className="flex-shrink-0 flex items-center gap-3">
          <img src={lyzrLogo} alt="Lyzr" className="h-8 w-auto" />
          <span style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            fontWeight: 500,
            color: "#7A6A60",
          }}>
            Agentic AI Services Leaders
          </span>
        </NavLink>

        <div className="flex items-center gap-3">
          <button
            onClick={() => document.getElementById("the-list")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all hover:opacity-80"
            style={{ background: "transparent", color: "#6B4C4C" }}
          >
            See the list →
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
