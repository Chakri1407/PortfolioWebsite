import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Chip, SectionHeading } from "@/components/ui/primitives";
import { projects, type Project } from "@/content/projects";

function ProjectRow({ project, delay }: { project: Project; delay: number }) {
  return (
    <Reveal delay={delay}>
      <Link
        href={`/work/${project.slug}`}
        className="group relative block border-t border-line py-8 transition-colors duration-300 hover:bg-surface/50 sm:py-10"
      >
        {/* Accent rail on hover */}
        <span
          className="absolute left-0 top-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full"
          aria-hidden
        />

        <div className="grid gap-5 px-1 lg:grid-cols-[4rem_1fr_auto] lg:items-start lg:gap-8">
          <span className="font-mono text-xs text-accent/60 lg:pt-2">
            {project.index}
          </span>

          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-display text-2xl font-semibold tracking-tight text-ink transition-colors group-hover:text-accent sm:text-3xl">
                {project.title}
              </h3>
              {project.subtitle && (
                <span className="font-mono text-xs text-dim">
                  {project.subtitle}
                </span>
              )}
            </div>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              {project.tagline}
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.chains.map((chain) => (
                <Chip key={chain} tone="accent">
                  {chain}
                </Chip>
              ))}
              {project.stack.slice(0, 5).map((tech) => (
                <Chip key={tech}>{tech}</Chip>
              ))}
              {project.stack.length > 5 && (
                <Chip>+{project.stack.length - 5}</Chip>
              )}
            </div>
          </div>

          <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-wider text-dim uppercase transition-colors group-hover:text-accent lg:pt-2">
            Case study
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function Work() {
  const professional = projects.filter((p) => p.org === "SoluLab");
  const personal = projects.filter((p) => p.org === "Personal");

  return (
    <section id="work" className="scroll-mt-20 border-b border-line py-24 sm:py-32">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title="Protocols, marketplaces and migrations"
            description="Each one links to a case study covering the problem, the architecture and why it was built that way."
          />
        </Reveal>

        <div className="mt-14">
          <Reveal>
            <div className="flex items-center gap-3 pb-5">
              <span className="label-mono">Professional · SoluLab</span>
              <span className="h-px flex-1 bg-line" aria-hidden />
              <span className="font-mono text-[11px] text-faint">
                {String(professional.length).padStart(2, "0")}
              </span>
            </div>
          </Reveal>

          {professional.map((project, i) => (
            <ProjectRow key={project.slug} project={project} delay={i * 0.05} />
          ))}
        </div>

        <div className="mt-20">
          <Reveal>
            <div className="flex items-center gap-3 pb-5">
              <span className="label-mono">Personal</span>
              <span className="h-px flex-1 bg-line" aria-hidden />
              <span className="font-mono text-[11px] text-faint">
                {String(personal.length).padStart(2, "0")}
              </span>
            </div>
          </Reveal>

          {personal.map((project, i) => (
            <ProjectRow key={project.slug} project={project} delay={i * 0.05} />
          ))}
          <div className="border-t border-line" aria-hidden />
        </div>
      </div>
    </section>
  );
}
