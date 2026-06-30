import MarketMap from "./MarketMap";

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

const HeroSection = () => {
  return (
    <section className="pt-10 sm:pt-14 lg:pt-16 pb-8 px-5 sm:px-10 lg:px-16">
      <div className="max-w-[1300px] mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
        {/* LEFT: title block */}
        <div className="w-full lg:w-[37%] flex flex-col items-center lg:items-start text-center lg:text-left">
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
              2026 Agentic AI Services Map &middot; UK & Ireland
            </span>
          </div>

          {/* Big headline */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(32px, 3.6vw, 50px)",
            fontWeight: 400,
            color: "#2A1F1A",
            lineHeight: 1.08,
            marginBottom: 12,
            letterSpacing: "-0.01em",
          }}>
            Agentic AI Services <em style={{ fontStyle: "italic", color: "#C96A5A" }}>Leaders</em>
          </h1>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.04em",
            color: "#6B4C4C",
            marginBottom: 16,
            textTransform: "uppercase",
          }}>
            UK & Ireland &middot; 2026
          </p>

          {/* Subtext */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 16,
            color: "#7A6A60",
            lineHeight: 1.6,
            maxWidth: 440,
            marginBottom: 26,
          }}>
            The mid-market services firms shipping agentic AI in production &mdash;
            mapped by what they deliver and the industries they serve. Curated by Lyzr.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
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

        {/* RIGHT: market map */}
        <div className="w-full lg:w-[63%]">
          <MarketMap compact />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
