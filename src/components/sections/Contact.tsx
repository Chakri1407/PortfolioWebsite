import { Mail, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/primitives";
import { site } from "@/content/site";

const channels = [
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { icon: LinkedinIcon, label: "LinkedIn", value: "/in/chakravarthyn1407", href: site.linkedin },
  { icon: GithubIcon, label: "GitHub", value: "@Chakri1407", href: site.github },
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 py-24 sm:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <Reveal className="min-w-0">
          <SectionHeading
            eyebrow="Contact"
            title="Let's build something secure."
            description="Open to blockchain engineering roles and protocol work. The fastest way to reach me is email — or use the form and it lands in the same inbox."
          />

          <ul className="mt-10 divide-y divide-line border-y border-line">
            {channels.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 py-4 transition-colors"
                >
                  <channel.icon
                    className="size-4 shrink-0 text-dim transition-colors group-hover:text-accent"
                    aria-hidden
                  />
                  <span className="label-mono w-20 shrink-0">{channel.label}</span>
                  <span className="min-w-0 flex-1 truncate font-mono text-sm text-ink transition-colors group-hover:text-accent">
                    {channel.value}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="min-w-0">
          <div className="rounded-2xl border border-line bg-surface/40 p-6 sm:p-8">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
