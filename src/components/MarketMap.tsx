import { companies, type Company } from "@/data/companies";
import { getCompanyLogoUrl } from "@/data/companyLogos";

function slugify(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const scrollToCompany = (name: string) => {
  const el = document.getElementById(slugify(name));
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.style.boxShadow = "0 0 0 3px #EC7943";
    setTimeout(() => { el.style.boxShadow = ""; }, 1600);
  } else {
    document.getElementById("the-list")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

// Short vertical tags shown on each card.
const VTAG: Record<string, string> = {
  "Financial Services": "FS",
  "Manufacturing": "Mfg",
  "Retail & Logistics": "R&L",
  "Insurance": "Insurance",
  "Healthcare": "Health",
  "Telecom": "Telecom",
};

// Billboard layout: rows of [capability, columns]. Tuned so panels tile evenly.
const LAYOUT: [string, number][][] = [
  [["Workflow Optimization", 4], ["Customer Experience Automation", 3]],
  [["Decision Support", 3], ["Document Automation", 2], ["Process Intelligence", 2]],
];

const GAP = 10;

const Tile = ({ c, style }: { c: Company; style?: React.CSSProperties }) => (
  <button
    className="mm-tile"
    style={style}
    onClick={() => scrollToCompany(c.name)}
    title={`${c.name} · ${c.vertical}`}
  >
    <span className="mm-logo">
      <img src={getCompanyLogoUrl(c.name, c.website)} alt={c.name} loading="lazy" />
    </span>
    <span className="mm-name">{c.name}</span>
    <span className="mm-vert">{VTAG[c.vertical ?? ""] ?? c.vertical}</span>
  </button>
);

const Panel = ({ cat, cols }: { cat: string; cols: number }) => {
  const items = companies.filter((c) => c.category === cat);
  const full = Math.floor(items.length / cols) * cols;
  const head = items.slice(0, full);
  const tail = items.slice(full);
  return (
    <div className="mm-panel" style={{ flex: `${cols} 1 0` }}>
      <div className="mm-head">
        <span className="mm-cat">{cat}</span>
        <span className="mm-count">{items.length}</span>
      </div>
      <div className="mm-body">
        {head.length > 0 && (
          <div className="mm-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: GAP }}>
            {head.map((c) => <Tile key={c.name} c={c} />)}
          </div>
        )}
        {tail.length > 0 && (
          <div className="mm-tail" style={{ gap: GAP, marginTop: head.length ? GAP : 0 }}>
            {tail.map((c) => (
              <Tile key={c.name} c={c} style={{ width: `calc((100% - ${(cols - 1) * GAP}px) / ${cols})` }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const MarketMap = () => (
  <div className="mm-board">
    {LAYOUT.map((row, i) => (
      <div className="mm-row" key={i}>
        {row.map(([cat, cols]) => <Panel key={cat} cat={cat} cols={cols} />)}
      </div>
    ))}

    <style>{`
      .mm-board {
        width: 100%;
        background: radial-gradient(130% 150% at 12% 0%, #3C2B22 0%, #241914 58%, #1B1210 100%);
        border: 1px solid rgba(242, 237, 232, 0.08);
        border-radius: 24px;
        padding: clamp(14px, 2vw, 24px);
        display: flex;
        flex-direction: column;
        gap: clamp(12px, 1.6vw, 18px);
        box-shadow: 0 30px 70px rgba(20, 12, 8, 0.30);
      }
      .mm-row { display: flex; gap: clamp(12px, 1.6vw, 18px); align-items: stretch; }
      .mm-panel {
        flex: 1 1 0;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(242, 237, 232, 0.09);
        border-radius: 16px;
        padding: 13px 13px 15px;
      }
      .mm-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding-bottom: 9px;
        border-bottom: 1px solid rgba(236, 121, 67, 0.45);
      }
      .mm-cat {
        font-family: 'DM Sans', sans-serif;
        font-size: 11.5px;
        font-weight: 800;
        letter-spacing: 0.07em;
        text-transform: uppercase;
        color: #F2EDE8;
        line-height: 1.25;
      }
      .mm-count {
        font-family: 'DM Sans', sans-serif;
        font-size: 24px;
        font-weight: 800;
        color: #EC7943;
        line-height: 1;
        letter-spacing: -0.02em;
      }
      .mm-body { display: flex; flex-direction: column; flex: 1; justify-content: center; }
      .mm-grid { display: grid; }
      .mm-tail { display: flex; justify-content: center; }
      .mm-tile {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        background: #FCFAF7;
        border: 1px solid rgba(0, 0, 0, 0.06);
        border-radius: 12px;
        padding: 10px 5px 8px;
        cursor: pointer;
        transition: transform 160ms ease, box-shadow 160ms ease;
      }
      .mm-tile:hover { transform: translateY(-3px); box-shadow: 0 12px 24px rgba(0, 0, 0, 0.32); }
      .mm-logo {
        width: 40px;
        height: 40px;
        border-radius: 9px;
        background: #F4EEE8;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border: 1px solid rgba(0, 0, 0, 0.05);
      }
      .mm-logo img { width: 30px; height: 30px; object-fit: contain; }
      .mm-name {
        font-family: 'DM Sans', sans-serif;
        font-size: 11px;
        font-weight: 700;
        color: #2A1F1A;
        text-align: center;
        line-height: 1.15;
      }
      .mm-vert {
        font-family: 'DM Sans', sans-serif;
        font-size: 8.5px;
        font-weight: 700;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: #B0937F;
      }
      @media (max-width: 860px) {
        .mm-row { flex-direction: column; }
      }
    `}</style>
  </div>
);

export default MarketMap;
