import { Mail, ShieldCheck } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/primitives";
import { site } from "@/content/site";

const facts = [
  { k: "Based in", v: "Hyderabad, India" },
  { k: "Experience", v: "2+ years" },
  { k: "Current", v: "Blockchain Developer @ SoluLab" },
  { k: "Focus", v: "Smart contracts · DeFi · RWA · Cross-chain" },
  { k: "Languages", v: "Solidity · Rust (Anchor) · TypeScript" },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-20 border-b border-line py-24 sm:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <Reveal className="min-w-0">
          <SectionHeading eyebrow="About" title="Contracts that hold up under adversarial conditions." />

          <div className="mt-8 inline-flex items-start gap-3 rounded-xl border border-accent/25 bg-accent/5 p-4">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
            <div>
              <p className="text-sm font-medium text-ink">Certified Blockchain Developer</p>
              <p className="mt-1 font-mono text-[11px] text-dim">
                IIT Kanpur · Internship &amp; Certification Program, 2022
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <GithubIcon className="size-3.5" /> GitHub
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <LinkedinIcon className="size-3.5" /> LinkedIn
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <Mail className="size-3.5" aria-hidden /> Email
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="min-w-0">
          <p className="text-lg leading-relaxed text-muted sm:text-xl">
            {site.summary}
          </p>

          <dl className="mt-10 divide-y divide-line border-y border-line">
            {facts.map((fact) => (
              <div
                key={fact.k}
                className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <dt className="label-mono sm:w-32 sm:shrink-0">{fact.k}</dt>
                <dd className="text-sm text-ink">{fact.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
