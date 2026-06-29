import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import SectionFadeIn from "./SectionFadeIn";
import LeadFormDialog from "./LeadFormDialog";

const POINTS = [
  "No AI/ML team required to start",
  "POCs in under 48 hours",
  "Your Gen AI practice, accelerated",
];

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center px-4 py-1.5 rounded-full mb-6" style={{ border: "1px solid rgba(74, 47, 45, 0.15)" }}>
    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#8A6060" }}>
      {children}
    </span>
  </div>
);

const StartingPointSection = () => {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <section className="px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
      <div className="max-w-[980px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <SectionFadeIn>
          <div>
            <Eyebrow>The Starting Point</Eyebrow>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.6vw, 42px)", fontWeight: 400, color: "#2A1F1A", lineHeight: 1.2, marginBottom: 22 }}>
              You don't need an AI team. You need <em style={{ fontStyle: "italic", color: "#C96A5A" }}>a starting point.</em>
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, color: "#7A6A60", lineHeight: 1.7, marginBottom: 28 }}>
              The hard part, delivery talent and client trust, you already have.
            </p>
            <button
              onClick={() => setFormOpen(true)}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold transition-all hover:opacity-90"
              style={{ background: "#6B4C4C", color: "#F2EDE8", fontFamily: "'DM Sans', sans-serif", fontSize: 15 }}
            >
              Get started <ArrowRight size={16} />
            </button>
          </div>
        </SectionFadeIn>

        <SectionFadeIn delay={120}>
          <div className="flex flex-col gap-3">
            {POINTS.map((p) => (
              <div key={p} className="flex items-center gap-4 p-5 rounded-2xl" style={{ background: "#FFFFFF", border: "1px solid rgba(74, 47, 45, 0.08)" }}>
                <div className="shrink-0 flex items-center justify-center rounded-full" style={{ width: 30, height: 30, background: "rgba(61,43,43,0.08)" }}>
                  <Check size={16} style={{ color: "#6B4C4C" }} />
                </div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 500, color: "#2A1F1A" }}>{p}</span>
              </div>
            ))}
          </div>
        </SectionFadeIn>
      </div>

      <LeadFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        eyebrow="Become a Partner"
        title="Let's get started"
        description="Tell us about your firm and our partnerships team will be in touch within 48 hours."
        submitLabel="Get started"
        logSource="Get started"
      />
    </section>
  );
};

export default StartingPointSection;
