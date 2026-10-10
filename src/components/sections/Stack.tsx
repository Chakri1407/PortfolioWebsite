import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/primitives";
import { skillGroups } from "@/content/skills";

export function Stack() {
  return (
    <section id="stack" className="scroll-mt-20 border-b border-line py-24 sm:py-32">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            eyebrow="Stack"
            title="Tools, networks and standards"
            description="The languages, chains and security tooling I work in day to day."
          />
        </Reveal>

        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <RevealItem key={group.id}>
              <div className="group h-full bg-bg p-6 transition-colors duration-300 hover:bg-surface sm:p-7">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] text-accent/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-sm font-semibold tracking-tight text-ink">
                    {group.title}
                  </h3>
                </div>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-line bg-surface-2 px-2.5 py-1.5 font-mono text-[11px] leading-none text-muted transition-colors group-hover:border-line-strong"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
