import { useEffect, useRef, useState } from "react";
import { companies } from "@/data/companies";

interface StatsBarProps {
  totalCount: number;
}

function useCountUp(target: number, triggered: boolean, duration = 1500) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!triggered) return;
    const start = performance.now();
    let raf: number;
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [triggered, target, duration]);
  return value;
}

const StatsBar = ({ totalCount }: StatsBarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);
  const actualCount = companies.length;
  const count = useCountUp(actualCount, triggered);
  const regions = useCountUp(7, triggered);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTriggered(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-6 px-4" ref={ref}>
      <div className="max-w-md mx-auto flex justify-center gap-12">
        <div className="text-center">
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 36,
            fontWeight: 700,
            color: "#2A1F1A",
          }}>
            {triggered ? count : 0}
          </div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: "#8A6060",
            fontWeight: 500,
          }}>
            Companies Listed
          </div>
        </div>
        <div className="text-center">
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 36,
            fontWeight: 700,
            color: "#2A1F1A",
          }}>
            {triggered ? regions : 0}
          </div>
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: "#8A6060",
            fontWeight: 500,
          }}>
            Regions
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
