import { CountUp } from "@/components/motion/CountUp";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { metrics } from "@/content/site";

export function Metrics() {
  return (
    <section
      className="relative border-b border-line py-16 sm:py-20"
      aria-label="Key results"
    >
      <div className="container-site">
        <RevealGroup className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
          {metrics.map((metric) => (
            <RevealItem key={metric.label}>
              <div className="group">
                <div className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-none font-semibold tracking-tight text-ink transition-colors group-hover:text-accent">
                  <CountUp
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                  />
                </div>
                <div className="mt-3 h-px w-full bg-line" aria-hidden />
                <p className="mt-3 text-sm font-medium text-ink">{metric.label}</p>
                <p className="mt-1 font-mono text-[11px] leading-relaxed text-dim">
                  {metric.sub}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
