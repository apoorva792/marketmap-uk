import { CATEGORY_ORDER, companies, type Company } from "@/data/companies";
import { getCompanyLogoUrl } from "@/data/companyLogos";

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const scrollToCompany = (name: string) => {
  const el = document.getElementById(slugify(name));
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.style.boxShadow = "0 0 0 3px #C96A5A";
    setTimeout(() => { el.style.boxShadow = ""; }, 1600);
  } else {
    document.getElementById("the-list")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

// Two-digit row numbers, matching the poster styling.
const ROW_NUM = ["02", "07", "03", "05", "02"];

const Tile = ({ company }: { company: Company }) => (
  <button
    onClick={() => scrollToCompany(company.name)}
    className="market-tile group"
    title={`${company.name} · ${company.vertical}`}
  >
    <div className="market-tile-logo">
      <img src={getCompanyLogoUrl(company.name, company.website)} alt={company.name} loading="lazy" />
    </div>
    <span className="market-tile-name">{company.name}</span>
  </button>
);

const MarketMap = () => {
  const rows = CATEGORY_ORDER.map((cat, i) => ({
    cat,
    num: ROW_NUM[i] ?? String(i + 1).padStart(2, "0"),
    items: companies.filter((c) => c.category === cat),
  }));

  return (
    <div className="market-map">
      {rows.map(({ cat, num, items }) => (
        <div className="market-row" key={cat}>
          <div className="market-label">
            <span className="market-label-num">{num}</span>
            <span className="market-label-text">{cat}</span>
            <span className="market-label-count">{items.length}</span>
          </div>
          <div className="market-tiles">
            {items.map((c) => (
              <Tile key={c.name} company={c} />
            ))}
          </div>
        </div>
      ))}

      <style>{`
        .market-map {
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: 100%;
        }
        .market-row {
          display: grid;
          grid-template-columns: 210px 1fr;
          gap: 16px;
          align-items: stretch;
        }
        .market-label {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 4px;
          padding: 18px 20px;
          border-radius: 16px;
          background: linear-gradient(150deg, #3A2A22 0%, #2A1F1A 100%);
          box-shadow: 0 10px 26px rgba(42, 26, 24, 0.16);
          min-height: 96px;
        }
        .market-label-num {
          position: absolute;
          top: 12px;
          right: 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: rgba(201, 106, 90, 0.85);
          letter-spacing: 0.05em;
        }
        .market-label-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #F2EDE8;
          line-height: 1.3;
        }
        .market-label-count {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          color: rgba(242, 237, 232, 0.55);
        }
        .market-tiles {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 14px;
          align-content: center;
          padding: 4px 0;
        }
        .market-tile {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          gap: 8px;
          width: 104px;
          padding: 14px 8px 12px;
          background: #FFFFFF;
          border: 1px solid rgba(74, 47, 45, 0.08);
          border-radius: 14px;
          cursor: pointer;
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }
        .market-tile:hover {
          transform: translateY(-3px);
          border-color: rgba(201, 106, 90, 0.4);
          box-shadow: 0 12px 26px rgba(42, 26, 24, 0.12);
        }
        .market-tile-logo {
          width: 48px;
          height: 48px;
          border-radius: 11px;
          background: #F9F5F1;
          border: 1px solid rgba(74, 47, 45, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .market-tile-logo img {
          width: 38px;
          height: 38px;
          object-fit: contain;
        }
        .market-tile-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 11.5px;
          font-weight: 600;
          color: #2A1F1A;
          text-align: center;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }
        @media (max-width: 900px) {
          .market-row { grid-template-columns: 1fr; gap: 10px; }
          .market-label {
            flex-direction: row;
            align-items: center;
            min-height: 0;
            padding: 12px 16px;
          }
          .market-label-num { position: static; order: 3; }
          .market-label-text { flex: 1; }
          .market-tile { width: calc((100% - 36px) / 4); min-width: 78px; }
        }
        @media (max-width: 520px) {
          .market-tile { width: calc((100% - 24px) / 3); }
          .market-tile-name { font-size: 10.5px; }
        }
      `}</style>
    </div>
  );
};

export default MarketMap;
