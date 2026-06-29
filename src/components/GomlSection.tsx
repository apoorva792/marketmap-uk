import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import SectionFadeIn from "./SectionFadeIn";
import GatedDialog from "./GatedDialog";

// TODO: replace with the real goML playbook / case-study URL once available.
export const GOML_PLAYBOOK_URL = "https://www.lyzr.ai";

const STATS = [
  { value: "$0 → $1M", label: "New AI services revenue" },
  { value: "5 months", label: "Of close collaboration" },
  { value: "Production", label: "Agent solutions shipped" },
];

const OUTCOMES = [
  "Scaled from $0 to over $1 million in new AI services revenue",
  "Expanded their AI delivery team and technical bench",
  "Strengthened their pipeline with larger enterprise opportunities",
  "Delivered more robust, production-ready agent solutions to clients",
];

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center px-4 py-1.5 rounded-full mb-6" style={{ border: "1px solid rgba(74, 47, 45, 0.15)" }}>
    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#8A6060" }}>
      {children}
    </span>
  </div>
);

const GomlSection = () => {
  const [gateOpen, setGateOpen] = useState(false);

  return (
    <section className="px-6 sm:px-10 lg:px-16 py-20 sm:py-28" style={{ background: "rgba(74,47,45,0.025)" }}>
      <div className="max-w-[980px] mx-auto">
        <SectionFadeIn>
          <Eyebrow>goML</Eyebrow>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.8vw, 44px)", fontWeight: 400, color: "#2A1F1A", lineHeight: 1.18, maxWidth: 720, marginBottom: 24 }}>
            Five months. From zero to <em style={{ fontStyle: "italic", color: "#C96A5A" }}>a million in AI revenue.</em>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: "#7A6A60", lineHeight: 1.7, maxWidth: 640, marginBottom: 40 }}>
            goML is one example of what becomes possible when strong mid-market teams deepen their capabilities with Lyzr. In just five months of close collaboration, goML:
          </p>
        </SectionFadeIn>

        <SectionFadeIn delay={120}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {OUTCOMES.map((o) => (
              <div key={o} className="flex items-start gap-3.5 p-5 rounded-2xl" style={{ background: "#FFFFFF", border: "1px solid rgba(74, 47, 45, 0.08)" }}>
                <div className="shrink-0 flex items-center justify-center rounded-full" style={{ width: 28, height: 28, background: "rgba(61,43,43,0.07)" }}>
                  <Check size={15} style={{ color: "#6B4C4C" }} />
                </div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15.5, fontWeight: 500, color: "#2A1F1A", lineHeight: 1.5 }}>{o}</span>
              </div>
            ))}
          </div>
        </SectionFadeIn>

        <SectionFadeIn delay={160}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {STATS.map(({ value, label }) => (
              <div key={label} className="p-7 rounded-2xl" style={{ background: "rgba(74,47,45,0.04)", border: "1px solid rgba(74, 47, 45, 0.08)" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 2.8vw, 32px)", fontWeight: 400, color: "#2A1F1A", marginBottom: 6, lineHeight: 1.05 }}>
                  {value}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#7A6A60" }}>{label}</div>
              </div>
            ))}
          </div>
        </SectionFadeIn>

        <SectionFadeIn delay={200}>
          <button
            onClick={() => setGateOpen(true)}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold transition-all hover:opacity-90"
            style={{ background: "#6B4C4C", color: "#F2EDE8", fontFamily: "'DM Sans', sans-serif", fontSize: 15 }}
          >
            See how they did it <ArrowRight size={16} />
          </button>
        </SectionFadeIn>
      </div>

      <GatedDialog
        open={gateOpen}
        onClose={() => setGateOpen(false)}
        eyebrow="The goML Playbook"
        title="Get the goML playbook"
        description="How goML built a $1M AI practice on Lyzr in five months: the use cases, the motion, and the numbers."
        resourceUrl={GOML_PLAYBOOK_URL}
        resourceLabel="Open the playbook →"
        showRoleToggle
        submitLabel="Send me the playbook"
        logSource="goML playbook"
      />
    </section>
  );
};

export default GomlSection;
