import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[70svh] flex-col justify-center py-32">
      <span className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
        404
      </span>
      <h1 className="mt-5 font-display text-[clamp(2.5rem,8vw,5rem)] leading-none font-semibold tracking-tight text-ink">
        Page not found
      </h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
        That route does not exist. The work, stack and contact sections are all on
        the home page.
      </p>
      <Link
        href="/"
        className="group mt-9 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-bg transition-colors hover:bg-accent-dim"
      >
        <ArrowLeft
          className="size-4 transition-transform group-hover:-translate-x-0.5"
          aria-hidden
        />
        Back home
      </Link>
    </div>
  );
}
