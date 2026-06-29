import type { Company } from "@/data/companies";
import { getCompanyEnrichment } from "@/data/companyEnrichment";
import { getCompanyLogoUrl } from "@/data/companyLogos";
import RecognitionShareButton from "./RecognitionShareButton";
import { ExternalLink } from "lucide-react";

interface CompanyCardProps {
  company: Company;
  index: number;
}

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function getCompanyUrl(website: string): string {
  if (website.startsWith("https://")) return website;
  if (website.startsWith("http://")) return website;
  if (website.startsWith("www.")) return `https://${website}`;
  return `https://www.${website}`;
}

const CompanyCard = ({ company, index }: CompanyCardProps) => {
  const url = getCompanyUrl(company.website);
  const enrichment = getCompanyEnrichment(company);
  const logoUrl = getCompanyLogoUrl(company.name, company.website);

  const industry = company.services[0];
  // Chips shown on the card: secondary recognition tags + country, excluding the
  // industry (already shown as the pill) to avoid duplication.
  const displayTags = (company.tags ?? []).filter(
    (t) =>
      ![
        "Lyzr Recognised",
        "AI-Ready",
        "Agentic AI Services Leader",
        "Top Emerging Partner",
        "Active Partner Program",
      ].includes(t) && t !== industry
  );
  const location = company.city || company.country || "";

  return (
    <div
      id={slugify(company.name)}
      className="company-card group relative flex flex-col"
      style={{
        background: "#FFFFFF",
        borderRadius: 14,
        border: "1px solid rgba(74, 47, 45, 0.08)",
        padding: "28px 24px 22px",
        animationDelay: `${index * 40}ms`,
      }}
    >
      {/* Top row: Logo + Tag */}
      <div className="flex items-start justify-between mb-5">
        <img
          src={logoUrl}
          alt={`${company.name} logo`}
          className="shrink-0 rounded-lg"
          style={{
            width: 40,
            height: 40,
            objectFit: "contain",
            background: "#F9F5F1",
            border: "1px solid rgba(74, 47, 45, 0.06)",
            padding: 5,
          }}
          loading="lazy"
        />
        {/* Service tag pill */}
        <span
          className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium"
          style={{
            background: "rgba(74, 47, 45, 0.06)",
            color: "#2A1F1A",
            border: "1px solid rgba(74, 47, 45, 0.1)",
          }}
        >
          {industry || "IT Services"}
        </span>
      </div>

      {/* Company name */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block font-bold text-[16px] leading-tight hover:underline mb-1"
        style={{ fontFamily: "'DM Sans', sans-serif", color: "#2A1F1A" }}
      >
        {company.name}
      </a>

      {/* Location */}
      <span className="text-[13px] mb-3 block" style={{ color: "#8A6060", fontFamily: "'DM Sans', sans-serif" }}>
        {location}
      </span>

      {/* Industry / country tags */}
      {displayTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {displayTags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
              style={{
                background: "rgba(74, 47, 45, 0.04)",
                color: "#7A5C58",
                border: "1px solid rgba(74, 47, 45, 0.08)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Spacer to push bottom content down */}
      <div className="flex-1" />

      {/* Bottom link */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-[13px] font-medium transition-opacity hover:opacity-70 mb-3"
        style={{ color: "#2A1F1A", fontFamily: "'DM Sans', sans-serif" }}
      >
        View details →
      </a>

      {/* Share badge */}
      <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgba(74,47,45,0.06)" }}>
        <RecognitionShareButton companyName={company.name} tags={company.tags ?? []} />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-full transition-opacity hover:opacity-70"
          aria-label="Visit website"
        >
          <ExternalLink size={14} style={{ color: "#8A6060" }} />
        </a>
      </div>
    </div>
  );
};

export default CompanyCard;
