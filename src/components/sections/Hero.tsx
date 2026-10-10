import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { HeroCanvas } from "@/components/HeroCanvas";
import { Magnetic } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { TextScramble } from "@/components/motion/TextScramble";
import { chains, site } from "@/content/site";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-24">
      {/* Backdrop */}
      <div className="absolute inset-0 -z-10">
        <HeroCanvas />
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[42rem] max-w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(198,242,78,0.12) 0%, transparent 65%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-bg to-transparent"
        aria-hidden
      />

      <div className="container-site flex flex-1 flex-col justify-center py-10">
        {/* Availability */}
        <Reveal y={12}>
          <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 backdrop-blur-sm">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-pulse-dot rounded-full bg-accent" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[11px] tracking-wider text-muted">
              {site.availableLabel}
            </span>
          </div>
        </Reveal>

        {/* Name */}
        <Reveal delay={0.08}>
          <h1 className="mt-7 font-display text-[clamp(2.75rem,9vw,7.5rem)] leading-[0.92] font-semibold tracking-[-0.04em] text-gradient">
            Chakravarthy
            <br />
            Naik M
          </h1>
        </Reveal>

        {/* Role */}
        <Reveal delay={0.16}>
          <div className="mt-7 flex items-center gap-3">
            <span className="h-px w-10 bg-accent" aria-hidden />
            <TextScramble
              phrases={site.roles}
              className="font-mono text-xs tracking-[0.2em] text-accent uppercase sm:text-sm"
            />
          </div>
        </Reveal>

        {/* Tagline */}
        <Reveal delay={0.24}>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {site.tagline}
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={0.32}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-bg transition-colors hover:bg-accent-dim"
              >
                View work
                <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" aria-hidden />
              </a>
            </Magnetic>

            <a
              href={site.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Download résumé
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
            </a>

            <span className="ml-1 inline-flex items-center gap-1.5 font-mono text-xs text-dim">
              <MapPin className="size-3.5" aria-hidden />
              {site.location}
            </span>
          </div>
        </Reveal>
      </div>

      {/* Chain marquee */}
      <div className="mt-auto border-t border-line bg-surface/40 py-3.5 backdrop-blur-sm">
        <div className="mask-fade-x flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
            {[...chains, ...chains].map((chain, i) => (
              <span
                key={`${chain}-${i}`}
                className="flex shrink-0 items-center gap-10 font-mono text-xs tracking-[0.15em] whitespace-nowrap text-dim uppercase"
              >
                {chain}
                <span className="text-accent/40" aria-hidden>
                  ◆
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
