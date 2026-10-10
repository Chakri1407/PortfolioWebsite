import { ArrowLeft, ArrowRight, ArrowUpRight, ShieldCheck, Zap } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { Chip } from "@/components/ui/primitives";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Not found" };

  const title = `${project.title}${project.subtitle ? ` — ${project.subtitle}` : ""}`;

  return {
    title,
    description: project.tagline,
    openGraph: {
      title: `${title} — ${site.name}`,
      description: project.tagline,
      type: "article",
      url: `${site.url}/work/${project.slug}`,
    },
  };
}

function Block({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-14 sm:py-16">
      <div className="grid gap-8 lg:grid-cols-[14rem_1fr] lg:gap-12">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <span className="label-mono text-accent">{eyebrow}</span>
          <h2 className="mt-3 font-display text-xl font-semibold text-ink">
            {title}
          </h2>
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(currentIndex + 1) % projects.length];
  const prev =
    projects[(currentIndex - 1 + projects.length) % projects.length];

  return (
    <article className="pt-28 pb-24 sm:pt-32">
      <div className="container-site">
        {/* Back */}
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-wider text-dim uppercase transition-colors hover:text-accent"
        >
          <ArrowLeft
            className="size-3.5 transition-transform group-hover:-translate-x-0.5"
            aria-hidden
          />
          All work
        </Link>

        {/* Header */}
        <header className="mt-10 border-b border-line pb-14">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-mono text-xs text-accent/60">{project.index}</span>
            <span className="label-mono">{project.org}</span>
            <span className="size-1 rounded-full bg-faint" aria-hidden />
            <span className="label-mono">{project.period}</span>
          </div>

          <h1 className="mt-6 font-display text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.95] font-semibold tracking-[-0.03em] text-ink">
            {project.title}
          </h1>
          {project.subtitle && (
            <p className="mt-4 font-mono text-sm tracking-wide text-accent">
              {project.subtitle}
            </p>
          )}

          <p className="mt-7 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">
            {project.tagline}
          </p>

          <div className="mt-8 flex flex-wrap gap-1.5">
            {project.chains.map((chain) => (
              <Chip key={chain} tone="accent">
                {chain}
              </Chip>
            ))}
          </div>

          {/* Metrics */}
          <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="bg-bg p-6">
                <dt className="label-mono">{metric.label}</dt>
                <dd className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>
        </header>

        {/* Problem */}
        <Block eyebrow="01" title="The problem">
          <div className="max-w-2xl space-y-5">
            {project.problem.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-base leading-relaxed text-muted sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Block>

        {/* Architecture */}
        <Block eyebrow="02" title="Architecture">
          <div className="space-y-px overflow-hidden rounded-xl border border-line bg-line">
            {project.architecture.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="bg-bg p-6 sm:p-7">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] text-accent/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-base font-semibold text-ink">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Block>

        {/* Decisions */}
        <Block eyebrow="03" title="Design decisions">
          <div className="grid gap-5 sm:grid-cols-2">
            {project.decisions.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className="h-full rounded-xl border border-line bg-surface/40 p-6 transition-colors hover:border-line-strong">
                  <h3 className="text-base font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Block>

        {/* Security */}
        <Block eyebrow="04" title="Security measures">
          <ul className="max-w-2xl space-y-3.5">
            {project.security.map((item) => (
              <li key={item} className="flex gap-3.5">
                <ShieldCheck
                  className="mt-0.5 size-4 shrink-0 text-accent"
                  aria-hidden
                />
                <span className="text-sm leading-relaxed text-muted">{item}</span>
              </li>
            ))}
          </ul>
        </Block>

        {/* Optimization */}
        {project.optimization && (
          <Block eyebrow="05" title="Gas & cost optimization">
            <ul className="max-w-2xl space-y-3.5">
              {project.optimization.map((item) => (
                <li key={item} className="flex gap-3.5">
                  <Zap className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  <span className="text-sm leading-relaxed text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </Block>
        )}

        {/* Stack */}
        <Block eyebrow={project.optimization ? "06" : "05"} title="Stack">
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <Chip key={tech}>{tech}</Chip>
            ))}
          </div>

          {project.links && project.links.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  {link.label}
                  <ArrowUpRight
                    className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                </a>
              ))}
            </div>
          )}
        </Block>

        {/* Prev / next */}
        <nav
          className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2"
          aria-label="More projects"
        >
          <Link
            href={`/work/${prev.slug}`}
            className="group flex flex-col gap-2 bg-bg p-6 transition-colors hover:bg-surface sm:p-7"
          >
            <span className="label-mono inline-flex items-center gap-2">
              <ArrowLeft className="size-3" aria-hidden /> Previous
            </span>
            <span className="font-display text-lg font-semibold text-ink transition-colors group-hover:text-accent">
              {prev.title}
            </span>
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="group flex flex-col gap-2 bg-bg p-6 transition-colors hover:bg-surface sm:items-end sm:p-7"
          >
            <span className="label-mono inline-flex items-center gap-2">
              Next <ArrowRight className="size-3" aria-hidden />
            </span>
            <span className="font-display text-lg font-semibold text-ink transition-colors group-hover:text-accent">
              {next.title}
            </span>
          </Link>
        </nav>

        {/* CTA */}
        <div className="mt-20 rounded-2xl border border-line bg-surface/40 p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Want this level of detail on your protocol?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
            I&apos;m open to blockchain engineering roles and protocol work.
          </p>
          <Link
            href="/#contact"
            className="group mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-bg transition-colors hover:bg-accent-dim"
          >
            Get in touch
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
