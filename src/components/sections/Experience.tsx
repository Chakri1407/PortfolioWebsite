import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/primitives";
import { experience } from "@/content/experience";

export function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-20 border-b border-line py-24 sm:py-32"
    >
      <div className="container-site">
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title="Where I've worked"
            description="2.5+ years building production blockchain systems."
          />
        </Reveal>

        <ol className="mt-14 space-y-px">
          {experience.map((role, i) => (
            <Reveal key={role.company} delay={i * 0.08}>
              <li className="group relative grid gap-6 border-t border-line py-10 lg:grid-cols-[14rem_1fr] lg:gap-12">
                {/* Left rail */}
                <div className="lg:sticky lg:top-24 lg:self-start">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={
                        role.current
                          ? "size-1.5 rounded-full bg-accent"
                          : "size-1.5 rounded-full bg-faint"
                      }
                      aria-hidden
                    />
                    <span className="label-mono">{role.period}</span>
                  </div>
                  <p className="mt-3 font-display text-xl font-semibold text-ink">
                    {role.company}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-dim">
                    {role.location}
                  </p>
                </div>

                {/* Right content */}
                <div>
                  <h3 className="text-lg font-medium text-ink sm:text-xl">
                    {role.title}
                  </h3>
                  <ul className="mt-5 space-y-3.5">
                    {role.points.map((point) => (
                      <li key={point} className="flex gap-3.5">
                        <span
                          className="mt-2 size-1 shrink-0 rounded-full bg-accent/60"
                          aria-hidden
                        />
                        <span className="text-sm leading-relaxed text-muted">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
