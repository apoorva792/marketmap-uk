import MarketMap from "./MarketMap";

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

const HeroSection = () => {
  return (
    <section className="pt-14 sm:pt-20 lg:pt-24 pb-12 px-5 sm:px-10 lg:px-16">
      <div className="max-w-[1280px] mx-auto">
        {/* Centered editorial title — occupies the hero */}
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
              2026 Agentic AI Services Map &middot; UK & Ireland
            </span>
          </div>

          {/* Big headline */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(36px, 5.5vw, 60px)",
            fontWeight: 400,
            color: "#2A1F1A",
            lineHeight: 1.06,
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
            marginBottom: 16,
            textTransform: "uppercase",
          }}>
            UK & Ireland &middot; 2026
          </p>

          {/* Subtext */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 17,
            color: "#7A6A60",
            lineHeight: 1.6,
            maxWidth: 640,
            marginBottom: 28,
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

        {/* Market map — framed in a rectangle so the centered rows read as one whole unit */}
        <div
          style={{
            marginTop: "clamp(40px, 6vw, 72px)",
            background: "#FBF8F4",
            border: "1px solid rgba(74, 47, 45, 0.10)",
            borderRadius: 26,
            padding: "clamp(20px, 2.6vw, 36px)",
            boxShadow: "0 24px 60px rgba(42, 26, 24, 0.07)",
          }}
        >
          <MarketMap />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
