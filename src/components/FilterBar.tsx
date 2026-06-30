import { useState, useRef, useEffect } from "react";
import { CATEGORY_FILTERS, VERTICALS } from "@/data/companies";

const VERTICAL_FILTERS = ["All", ...VERTICALS];

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  sort: string;
  onSortChange: (sort: string) => void;
  verticalFilter: string;
  onVerticalFilterChange: (vertical: string) => void;
  // Kept for compatibility (deep-link tag/region filters still apply); not shown in the bar.
  regionFilter?: string[];
  onRegionFilterChange?: (regions: string[]) => void;
  tagFilter?: string[];
  onTagFilterChange?: (tags: string[]) => void;
}

function Dropdown({
  value,
  options,
  onChange,
  allLabel,
}: {
  value: string;
  options: readonly string[];
  onChange: (v: string) => void;
  allLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  const active = value !== "All";
  const label = active ? value : allLabel;
  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 rounded-full text-sm font-medium border transition-all"
        style={{
          fontFamily: "'DM Sans', sans-serif",
          background: active ? "#6B4C4C" : "#FFFFFF",
          borderColor: active ? "#6B4C4C" : "rgba(74,47,45,0.15)",
          color: active ? "#F2EDE8" : "#2A1F1A",
        }}
      >
        {label} ▾
      </button>
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 mt-1 z-50 bg-white rounded-2xl border border-gray-100 shadow-xl p-1.5 w-[min(300px,calc(100vw-2rem))] max-h-[60vh] overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-xl text-sm transition-colors hover:bg-amber-50/50"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "#2A1F1A", fontWeight: value === opt ? 600 : 400 }}
            >
              <span
                className="w-4 h-4 shrink-0 rounded-full border flex items-center justify-center text-[10px]"
                style={{ borderColor: value === opt ? "#6B4C4C" : "#D1C4B8", background: value === opt ? "#6B4C4C" : "transparent", color: "#fff" }}
              >
                {value === opt ? "✓" : ""}
              </span>
              {opt === "All" ? allLabel : opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const FilterBar = ({
  activeFilter,
  onFilterChange,
  sort,
  onSortChange,
  verticalFilter,
  onVerticalFilterChange,
}: FilterBarProps) => {
  return (
    <section className="py-4 px-4">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-2">
        {/* Capability filter */}
        <Dropdown value={activeFilter} options={CATEGORY_FILTERS} onChange={onFilterChange} allLabel="All capabilities" />

        {/* Vertical filter */}
        <Dropdown value={verticalFilter} options={VERTICAL_FILTERS} onChange={onVerticalFilterChange} allLabel="All verticals" />

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="text-sm px-4 py-2 rounded-full border bg-white focus:outline-none cursor-pointer"
          style={{ fontFamily: "'DM Sans', sans-serif", borderColor: "rgba(74,47,45,0.15)", color: "#2A1F1A" }}
        >
          <option value="A–Z">Sort: A–Z</option>
          <option value="City">Sort: City</option>
        </select>
      </div>
    </section>
  );
};

export default FilterBar;
