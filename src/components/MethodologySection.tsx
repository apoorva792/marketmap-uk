import { Layers, Sparkles, Building2, Rocket } from "lucide-react";
import SectionFadeIn from "./SectionFadeIn";

const CRITERIA = [
  { icon: Layers, title: "Delivery depth", body: "Teams that ship." },
  { icon: Sparkles, title: "AI practice maturity", body: "Gen AI already in client hands." },
  { icon: Building2, title: "Enterprise client base", body: "Trusted inside serious organizations." },
  { icon: Rocket, title: "Production track record", body: "AI past the pilot." },
];

const PURPOSE = [
  "Recognize the firms doing excellent work today",
  "Help enterprises find capable, agile partners",
  "Showcase the maturing mid-market AI delivery ecosystem",
];

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center px-4 py-1.5 rounded-full mb-6" style={{ border: "1px solid rgba(74, 47, 45, 0.15)" }}>
    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#8A6060" }}>
      {children}
    </span>
  </div>
);

const MethodologySection = () => {
  return (
    <section id="methodology" className="px-6 sm:px-10 lg:px-16 py-20 sm:py-28" style={{ scrollMarginTop: 90 }}>
      <div className="max-w-[980px] mx-auto">
        <SectionFadeIn>
          <div className="max-w-[680px]">
            <Eyebrow>Why This Map Matters</Eyebrow>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 400, color: "#2A1F1A", lineHeight: 1.15, marginBottom: 28 }}>
              We built this map <em style={{ fontStyle: "italic", color: "#C96A5A" }}>to</em>
            </h2>
            <div className="flex flex-col gap-2.5 max-w-[640px]">
              {PURPOSE.map((p, i) => (
                <div key={p} className="flex items-center gap-3.5">
                  <span
                    className="shrink-0 flex items-center justify-center rounded-full"
                    style={{ width: 26, height: 26, background: "rgba(61,43,43,0.06)", fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, color: "#8A6060" }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16.5, color: "#2A1F1A", lineHeight: 1.5 }}>{p}</span>
                </div>
              ))}
            </div>
          </div>
        </SectionFadeIn>

        <SectionFadeIn delay={120}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "#8A6060", margin: "44px 0 20px" }}>
            What we looked for
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CRITERIA.map(({ icon: Icon, title, body }) => (
              <div
                key={title}
                className="flex items-start gap-4 p-6 rounded-2xl"
                style={{ background: "#FFFFFF", border: "1px solid rgba(74, 47, 45, 0.08)" }}
              >
                <div className="shrink-0 flex items-center justify-center rounded-xl" style={{ width: 44, height: 44, background: "rgba(61,43,43,0.06)" }}>
                  <Icon size={20} style={{ color: "#2A1F1A" }} />
                </div>
                <div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 700, color: "#2A1F1A", marginBottom: 3 }}>{title}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14.5, color: "#7A6A60", lineHeight: 1.5 }}>{body}</div>
                </div>
              </div>
            ))}
          </div>
        </SectionFadeIn>
      </div>
    </section>
  );
};

export default MethodologySection;
