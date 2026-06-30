import { useEffect } from "react";
import CompanyCard from "./CompanyCard";
import type { Company } from "@/data/companies";

interface CompanyGridProps {
  companies: Company[];
}

const CompanyGrid = ({ companies }: CompanyGridProps) => {
  // Anchor scroll + highlight on hash (deep links from the hero map).
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const timeout = setTimeout(() => {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.style.boxShadow = "0 0 0 3px #C96A5A";
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
          Try adjusting your filters or search to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* One continuous grid of all (filtered) firms */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {companies.map((company, i) => (
            <CompanyCard key={`${company.name}-${company.website}`} company={company} index={i} />
          ))}
        </div>

        <p className="text-center mt-8 font-body text-sm text-text-muted">
          Showing {companies.length} companies
        </p>
      </div>
    </section>
  );
};

export default CompanyGrid;
