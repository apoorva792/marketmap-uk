import { useEffect } from "react";
import CompanyCard from "./CompanyCard";
import { CATEGORY_ORDER, type Company } from "@/data/companies";

interface CompanyGridProps {
  companies: Company[];
}

const CompanyGrid = ({ companies }: CompanyGridProps) => {
  // Anchor scroll + highlight on hash
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const timeout = setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.style.boxShadow = "0 0 0 3px #7A6A60";
        setTimeout(() => { el.style.boxShadow = ""; }, 1500);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [companies]);

  if (companies.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <p className="font-display text-2xl text-primary mb-2">No results found</p>
        <p className="font-body text-text-muted">
          Try adjusting your search or category to find what you're looking for.
        </p>
      </div>
    );
  }

  // Group the (already-filtered) companies by ecosystem-map category, in canonical order.
  const order = [...CATEGORY_ORDER];
  const groups = order
    .map((cat) => ({ cat, items: companies.filter((c) => c.category === cat) }))
    .filter((g) => g.items.length > 0);
  const uncategorised = companies.filter((c) => !c.category || !order.includes(c.category as typeof order[number]));
  if (uncategorised.length) groups.push({ cat: "Other", items: uncategorised });

  let cardIndex = 0;

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {groups.map(({ cat, items }) => (
          <div key={cat}>
            {/* Category header */}
            <div className="flex items-baseline gap-3 mb-5 px-1">
              <h3
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(20px, 2.4vw, 26px)",
                  fontWeight: 400,
                  color: "#2A1F1A",
                  lineHeight: 1.2,
                }}
              >
                {cat}
              </h3>
              <span
                className="shrink-0"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#8A6060" }}
              >
                {items.length}
              </span>
              <span className="flex-1" style={{ height: 1, background: "rgba(74,47,45,0.1)", alignSelf: "center" }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {items.map((company) => (
                <CompanyCard key={`${company.name}-${company.website}`} company={company} index={cardIndex++} />
              ))}
            </div>
          </div>
        ))}

        <p className="text-center mt-2 font-body text-sm text-text-muted">
          Showing all {companies.length} companies
        </p>
      </div>
    </section>
  );
};

export default CompanyGrid;
