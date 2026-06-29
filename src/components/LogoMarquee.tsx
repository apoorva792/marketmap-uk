import { companies } from "@/data/companies";
import { getCompanyLogoUrl } from "@/data/companyLogos";

const allLogos = companies.map((c) => ({
  name: c.name,
  url: getCompanyLogoUrl(c.name, c.website),
}));

const row1 = allLogos.slice(0, 25);
const row2 = allLogos.slice(25, 50);
const row3 = allLogos.slice(50, 75);
const row4 = allLogos.slice(75, 100);
const row5 = allLogos.slice(100, 125);

function LogoRow({ logos, direction, speed }: { logos: typeof row1; direction: "left" | "right"; speed: number }) {
  const doubled = [...logos, ...logos];

  return (
    <div
      className="flex gap-2 overflow-hidden"
      style={{ maskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)" }}
    >
      <div
        className="flex gap-2 shrink-0"
        style={{ animation: `marquee-${direction} ${speed}s linear infinite` }}
      >
        {doubled.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="shrink-0 flex items-center justify-center"
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#FFFFFF",
              border: "1px solid rgba(74, 47, 45, 0.05)",
              boxShadow: "0 1px 2px rgba(74, 47, 45, 0.03)",
            }}
          >
            <img
              src={logo.url}
              alt={logo.name}
              loading="lazy"
              style={{ width: 28, height: 28, objectFit: "contain" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const LogoMarquee = () => {
  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col gap-2 py-5 px-2"
      style={{
        background: "rgba(74, 47, 45, 0.025)",
        border: "1px solid rgba(74, 47, 45, 0.05)",
        height: 380,
        justifyContent: "center",
      }}
    >
      <LogoRow logos={row1} direction="left" speed={50} />
      <LogoRow logos={row2} direction="right" speed={55} />
      <LogoRow logos={row3} direction="left" speed={45} />
      <LogoRow logos={row4} direction="right" speed={52} />
      <LogoRow logos={row5} direction="left" speed={48} />
    </div>
  );
};

export default LogoMarquee;
