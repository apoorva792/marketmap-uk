import MarketMap from "./MarketMap";

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

const HeroSection = () => {
  return (
    <section className="pt-10 sm:pt-16 lg:pt-20 pb-6 px-5 sm:px-10 lg:px-16">
      <div className="max-w-[1180px] mx-auto">
        {/* Centered editorial header */}
        <div className="text-center flex flex-col items-center">
          {/* Market map pill */}
          <div
            className="inline-flex items-center px-4 py-1.5 rounded-full mb-6"
            style={{ border: "1px solid rgba(74, 47, 45, 0.15)", color: "#2A1F1A" }}
          >
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}>
              2026 Agentic AI Services Map &middot; UK &amp; Ireland
            </span>
          </div>

          {/* Big headline */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(34px, 5.5vw, 60px)",
            fontWeight: 400,
            color: "#2A1F1A",
            lineHeight: 1.08,
            marginBottom: 14,
            letterSpacing: "-0.01em",
          }}>
            Agentic AI Services <em style={{ fontStyle: "italic", color: "#C96A5A" }}>Leaders</em>
          </h1>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: "0.04em",
            color: "#6B4C4C",
            marginBottom: 14,
            textTransform: "uppercase",
          }}>
            UK &amp; Ireland &middot; 2026
          </p>

          {/* Subtext */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 17,
            color: "#7A6A60",
            lineHeight: 1.6,
            maxWidth: 640,
            marginBottom: 26,
          }}>
            The mid-market services firms shipping agentic AI in production &mdash;
            mapped by what they deliver and the industries they serve. Curated by Lyzr.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-7">
            <button
              onClick={() => scrollTo("the-list")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: "#6B4C4C", color: "#F2EDE8", fontFamily: "'DM Sans', sans-serif" }}
            >
              See if you made the list &darr;
            </button>
            <button
              onClick={() => scrollTo("methodology")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all hover:opacity-80"
              style={{
                background: "transparent",
                color: "#6B4C4C",
                border: "1px solid rgba(74,47,45,0.2)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              How we chose &rarr;
            </button>
          </div>
        </div>

        {/* Market map - the centerpiece */}
        <div className="mt-2 sm:mt-4">
          <MarketMap />
        </div>

        {/* Stats line */}
        <div
          className="flex items-center justify-center gap-3 flex-wrap mt-8"
          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: "#7A6A60" }}
        >
          <span><strong style={{ color: "#2A1F1A", fontWeight: 700 }}>19</strong> Firms</span>
          <span style={{ color: "#C96A5A" }}>&middot;</span>
          <span><strong style={{ color: "#2A1F1A", fontWeight: 700 }}>5</strong> Capabilities</span>
          <span style={{ color: "#C96A5A" }}>&middot;</span>
          <span><strong style={{ color: "#2A1F1A", fontWeight: 700 }}>4</strong> Verticals</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
