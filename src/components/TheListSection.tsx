import { Search } from "lucide-react";
import FilterBar from "./FilterBar";
import CompanyGrid from "./CompanyGrid";
import type { Company } from "@/data/companies";

interface TheListSectionProps {
  search: string;
  onSearchChange: (value: string) => void;
  filtered: Company[];
  activeFilter: string;
  onFilterChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
  regionFilter: string[];
  onRegionFilterChange: (regions: string[]) => void;
  tagFilter: string[];
  onTagFilterChange: (tags: string[]) => void;
  verticalFilter: string;
  onVerticalFilterChange: (vertical: string) => void;
}

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center px-4 py-1.5 rounded-full mb-5" style={{ border: "1px solid rgba(74, 47, 45, 0.15)" }}>
    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#8A6060" }}>
      {children}
    </span>
  </div>
);

const TheListSection = ({
  search,
  onSearchChange,
  filtered,
  activeFilter,
  onFilterChange,
  sort,
  onSortChange,
  regionFilter,
  onRegionFilterChange,
  tagFilter,
  onTagFilterChange,
  verticalFilter,
  onVerticalFilterChange,
}: TheListSectionProps) => {
  return (
    <section id="the-list" className="pt-20 sm:pt-24 pb-8" style={{ scrollMarginTop: 80 }}>
      {/* Heading */}
      <div className="px-6 sm:px-10 lg:px-16">
        <div className="max-w-[1200px] mx-auto text-center flex flex-col items-center">
          <Eyebrow>The Full List</Eyebrow>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 400, color: "#2A1F1A", lineHeight: 1.15, marginBottom: 16 }}>
            Find your badge <em style={{ fontStyle: "italic", color: "#C96A5A" }}>here</em>
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: "#7A6A60", marginBottom: 28 }}>
            Filter by capability and vertical, or search by name.
          </p>

          {/* Search (moved from hero) */}
          <div className="relative w-full max-w-[520px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "#8A6060" }} />
            <input
              id="directory-search"
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by name or category…"
              className="w-full pl-11 pr-5 py-3.5 rounded-full text-sm transition-all"
              style={{ fontFamily: "'DM Sans', sans-serif", background: "#FFFFFF", border: "1px solid rgba(74, 47, 45, 0.12)", outline: "none", color: "#2A1F1A" }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(74, 47, 45, 0.3)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(74, 47, 45, 0.12)"; }}
            />
          </div>
        </div>
      </div>

      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={onFilterChange}
        sort={sort}
        onSortChange={onSortChange}
        verticalFilter={verticalFilter}
        onVerticalFilterChange={onVerticalFilterChange}
        regionFilter={regionFilter}
        onRegionFilterChange={onRegionFilterChange}
        tagFilter={tagFilter}
        onTagFilterChange={onTagFilterChange}
      />
      <CompanyGrid companies={filtered} />
    </section>
  );
};

export default TheListSection;
