import { Check } from "lucide-react";
import SectionFadeIn from "./SectionFadeIn";
import lyzrLogo from "@/assets/lyzr-logo-official.webp";
import accentureLogo from "@/assets/0fe30aa622d5d01ec4e15b870c29c61e.png";
import awsLogo from "@/assets/e80b2a03460a8b5856b92b06c3d42ad5.png";

const STATS = [
  { logo: accentureLogo, logoAlt: "Accenture", logoH: 16, label: "Backed by" },
  { value: "100+", label: "Enterprises running agents in production" },
  { value: "80,000+", label: "Users building on the platform" },
  { logo: awsLogo, logoAlt: "AWS", logoH: 26, label: "AWS Partner, co-selling at scale" },
];

const CAPABILITIES = [
  "Rapidly build, deploy, and manage production-grade AI agents",
  "Maintain enterprise standards for security, compliance, and reliability",
  "Orchestrate complex multi-agent workflows",
  "Shorten delivery timelines while reducing risk",
];

const WhoIsLyzrSection = () => {
  return (
    <section className="px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
      <div
        className="max-w-[1080px] mx-auto rounded-[28px] px-7 sm:px-14 py-16 sm:py-20"
        style={{ background: "#2A1F1A", boxShadow: "0 30px 80px rgba(42,26,24,0.28)" }}
      >
        <SectionFadeIn>
          <div className="flex items-center gap-3 mb-7">
            <div className="flex items-center justify-center rounded-xl" style={{ background: "#FFFFFF", padding: "6px 10px" }}>
              <img src={lyzrLogo} alt="Lyzr" style={{ height: 18, objectFit: "contain", display: "block" }} />
            </div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#C96A5A" }}>
              Lyzr
            </span>
          </div>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.6vw, 42px)", fontWeight: 400, color: "#F8F1EA", lineHeight: 1.2, maxWidth: 760, marginBottom: 20 }}>
            Powering the era of <em style={{ fontStyle: "italic", color: "#C96A5A" }}>AI delivery</em>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: "#D9C7BC", lineHeight: 1.7, maxWidth: 700, marginBottom: 36 }}>
            We build the infrastructure that helps capable teams scale faster, more reliably, and with better governance. The Lyzr Agent Platform lets service providers:
          </p>
        </SectionFadeIn>

        <SectionFadeIn delay={120}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-12">
            {CAPABILITIES.map((c) => (
              <div key={c} className="flex items-start gap-3">
                <Check size={18} style={{ color: "#C96A5A", marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15.5, color: "#EADFD6", lineHeight: 1.55 }}>{c}</span>
              </div>
            ))}
          </div>
        </SectionFadeIn>

        <SectionFadeIn delay={200}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-end" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 32 }}>
            {STATS.map((stat) => (
              <div key={stat.label}>
                {"logo" in stat ? (
                  <div
                    className="inline-flex items-center justify-center rounded-lg"
                    style={{ background: "#FFFFFF", padding: "8px 12px", marginBottom: 10, height: 42 }}
                  >
                    <img src={stat.logo} alt={stat.logoAlt} style={{ height: stat.logoH, objectFit: "contain", display: "block" }} />
                  </div>
                ) : (
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 2.4vw, 30px)", fontWeight: 400, color: "#F8F1EA", marginBottom: 6, lineHeight: 1.1 }}>
                    {stat.value}
                  </div>
                )}
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#B59A8E", lineHeight: 1.45 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </SectionFadeIn>
      </div>
    </section>
  );
};

export default WhoIsLyzrSection;
