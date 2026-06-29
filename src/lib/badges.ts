import type { Company } from "@/data/companies";

export interface CompanyBadge {
  label: string;
  type: "industry" | "location";
}

function getSector(company: Company): string | null {
  const s = company.services.map((x) => x.toLowerCase()).join(" ");
  if (s.includes("healthcare") || s.includes("health") || s.includes("clinical")) return "Healthcare";
  if (s.includes("bfsi") || s.includes("fintech") || s.includes("financial") || s.includes("banking") || s.includes("insurance")) return "BFSI";
  if (s.includes("manufacturing") || s.includes("industrial")) return "Manufacturing";
  if (s.includes("public sector") || s.includes("education") || s.includes("government")) return "Public Sector";
  if (s.includes("retail") || s.includes("ecommerce") || s.includes("commerce")) return "Retail";
  if (s.includes("telecom") || s.includes("media")) return "Telecom & Media";
  if (s.includes("consulting") || s.includes("advisory")) return "Consulting";
  return "IT Services";
}

function getLocation(company: Company): string | null {
  if (company.region === "United States") return "USA";
  if (company.region === "United Kingdom") return "UK";
  if (company.region === "India") return "India";
  if (company.region === "Australia") return "Australia";
  if (company.region === "APAC") return "APAC";
  if (company.region === "Europe") return "Europe";
  return company.country ?? null;
}

export function getCompanyBadges(company: Company): CompanyBadge[] {
  const badges: CompanyBadge[] = [];
  const sector = getSector(company);
  if (sector) {
    badges.push({ label: `Top Emerging Agentic Partner · ${sector}`, type: "industry" });
  }
  const location = getLocation(company);
  if (location) {
    badges.push({ label: `Top Emerging Agentic Partner · ${location}`, type: "location" });
  }
  return badges;
}

export function drawBadge(
  canvas: HTMLCanvasElement,
  badgeLabel: string,
  variant: "light" | "dark" = "light",
  size: { w: number; h: number } = { w: 160, h: 180 }
) {
  const ctx = canvas.getContext("2d")!;
  const { w, h } = size;
  canvas.width = w * 2;
  canvas.height = h * 2;
  ctx.scale(2, 2);

  // Background
  if (variant === "dark") {
    ctx.fillStyle = "#2A1A18";
  } else {
    ctx.fillStyle = "#FFFAF5";
  }
  roundRect(ctx, 0, 0, w, h, 6);
  ctx.fill();

  // Border
  ctx.strokeStyle = variant === "dark" ? "#71514F" : "#C6A89A";
  ctx.lineWidth = 1.5;
  roundRect(ctx, 1, 1, w - 2, h - 2, 5);
  ctx.stroke();

  // Shadow effect
  ctx.shadowColor = "rgba(0,0,0,0.08)";
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 2;

  // Lyzr.ai wordmark
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  ctx.font = "bold 14px 'Playfair Display', serif";
  ctx.fillStyle = variant === "dark" ? "#E3D0C2" : "#4A2F2D";
  ctx.textAlign = "center";
  ctx.fillText("Lyzr.ai", w / 2, 36);

  // Decorative line
  ctx.strokeStyle = variant === "dark" ? "#71514F" : "#C6A89A";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(20, 48);
  ctx.lineTo(w - 20, 48);
  ctx.stroke();

  // Badge label - wrap text
  ctx.font = "bold 11px 'Noto Sans', sans-serif";
  ctx.fillStyle = variant === "dark" ? "#F3EFEA" : "#2A1A18";
  const lines = wrapText(ctx, badgeLabel, w - 30);
  const startY = h / 2 - ((lines.length - 1) * 15) / 2 + 5;
  lines.forEach((line, i) => {
    ctx.fillText(line, w / 2, startY + i * 15);
  });

  // Bottom decorative line
  ctx.strokeStyle = variant === "dark" ? "#71514F" : "#C6A89A";
  ctx.beginPath();
  ctx.moveTo(20, h - 40);
  ctx.lineTo(w - 20, h - 40);
  ctx.stroke();

  // Recognised by
  ctx.font = "400 9px 'Noto Sans', sans-serif";
  ctx.fillStyle = variant === "dark" ? "#9E7A73" : "#7A6558";
  ctx.fillText("Recognised by Lyzr.ai", w / 2, h - 22);
}

export function drawLinkedInBadge(
  canvas: HTMLCanvasElement,
  badgeLabel: string
) {
  const size = 1080;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Branded background
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, "#3D2422");
  gradient.addColorStop(1, "#5C3D3A");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Subtle pattern dots
  ctx.fillStyle = "rgba(227, 208, 194, 0.03)";
  for (let x = 0; x < size; x += 30) {
    for (let y = 0; y < size; y += 30) {
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Center card
  const cardW = 560;
  const cardH = 640;
  const cx = (size - cardW) / 2;
  const cy = (size - cardH) / 2;

  ctx.fillStyle = "#FFFAF5";
  ctx.shadowColor = "rgba(0,0,0,0.2)";
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 10;
  roundRect(ctx, cx, cy, cardW, cardH, 16);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // Border
  ctx.strokeStyle = "#C6A89A";
  ctx.lineWidth = 2;
  roundRect(ctx, cx, cy, cardW, cardH, 16);
  ctx.stroke();

  // Lyzr.ai
  ctx.font = "bold 42px 'Playfair Display', serif";
  ctx.fillStyle = "#4A2F2D";
  ctx.textAlign = "center";
  ctx.fillText("Lyzr.ai", size / 2, cy + 80);

  // Line
  ctx.strokeStyle = "#C6A89A";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx + 60, cy + 105);
  ctx.lineTo(cx + cardW - 60, cy + 105);
  ctx.stroke();

  // Badge label
  ctx.font = "bold 32px 'Noto Sans', sans-serif";
  ctx.fillStyle = "#2A1A18";
  const lines = wrapText(ctx, badgeLabel, cardW - 80);
  const startY = size / 2 - ((lines.length - 1) * 44) / 2;
  lines.forEach((line, i) => {
    ctx.fillText(line, size / 2, startY + i * 44);
  });

  // Bottom line
  ctx.strokeStyle = "#C6A89A";
  ctx.beginPath();
  ctx.moveTo(cx + 60, cy + cardH - 100);
  ctx.lineTo(cx + cardW - 60, cy + cardH - 100);
  ctx.stroke();

  // Recognised
  ctx.font = "400 22px 'Noto Sans', sans-serif";
  ctx.fillStyle = "#7A6558";
  ctx.fillText("Recognised by Lyzr.ai", size / 2, cy + cardH - 60);
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? current + " " + word : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}
