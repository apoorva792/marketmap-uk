import { companies } from "@/data/companies";
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

type Logo = { name: string; url: string };
const logos: Logo[] = companies.map((c) => ({ name: c.name, url: getCompanyLogoUrl(c.name, c.website) }));

const rot = (a: Logo[], n: number): Logo[] => [...a.slice(n), ...a.slice(0, n)];
const q = Math.max(1, Math.ceil(logos.length / 4));
// Four rows, each showing all firms (rotated) so every row always fills the width.
const rows: { items: Logo[]; dir: "left" | "right"; speed: number }[] = [
  { items: logos, dir: "left", speed: 40 },
  { items: rot(logos, q), dir: "right", speed: 48 },
  { items: rot(logos, q * 2), dir: "left", speed: 36 },
  { items: rot(logos, q * 3), dir: "right", speed: 44 },
];

const LogoMarquee = () => (
  <div className="mq-wrap">
    {rows.map((row, i) => (
      <div className="mq-row" key={i}>
        <div className="mq-track" style={{ animation: `mq-${row.dir} ${row.speed}s linear infinite` }}>
          {[...row.items, ...row.items].map((l, j) => (
            <button
              key={`${l.name}-${j}`}
              className="mq-tile"
              title={l.name}
              onClick={() => scrollToCompany(l.name)}
            >
              <img src={l.url} alt={l.name} loading="lazy" />
            </button>
          ))}
        </div>
      </div>
    ))}

    <style>{`
      .mq-wrap {
        width: 100%;
        max-width: 500px;
        aspect-ratio: 1 / 1;
        margin-inline: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: clamp(10px, 1.2vw, 14px);
        padding: clamp(16px, 2vw, 22px);
        border-radius: 30px;
        background: linear-gradient(180deg, #F7F1EA 0%, #EFE4D8 100%);
        border: 1px solid rgba(74, 47, 45, 0.08);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 26px 60px rgba(42, 26, 24, 0.08);
        overflow: hidden;
      }
      .mq-row {
        flex: 1;
        display: flex;
        align-items: center;
        overflow: hidden;
        -webkit-mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent);
        mask-image: linear-gradient(90deg, transparent, #000 9%, #000 91%, transparent);
      }
      .mq-track { display: flex; align-items: center; gap: clamp(10px, 1.2vw, 14px); height: 100%; width: max-content; will-change: transform; }
      .mq-row:hover .mq-track { animation-play-state: paused; }
      .mq-tile {
        flex: 0 0 auto;
        height: 86%;
        aspect-ratio: 1 / 1;
        border-radius: 18px;
        background: #FFFFFF;
        border: 1px solid rgba(74, 47, 45, 0.06);
        box-shadow: 0 8px 18px rgba(74, 47, 45, 0.08);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: transform 160ms ease, box-shadow 160ms ease;
      }
      .mq-tile:hover { transform: translateY(-4px) scale(1.05); box-shadow: 0 16px 30px rgba(74, 47, 45, 0.16); }
      .mq-tile img { width: 62%; height: 62%; object-fit: contain; }
      @keyframes mq-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      @keyframes mq-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      @media (prefers-reduced-motion: reduce) { .mq-track { animation: none !important; } }
    `}</style>
  </div>
);

export default LogoMarquee;
