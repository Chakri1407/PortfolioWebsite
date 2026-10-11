"use client";

import { Check, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Email affordance that works even without a mail client.
 *
 * `mailto:` is kept as the href, so anyone with a configured client gets the
 * normal behaviour. But on a machine with no default mail app — common on
 * Windows without Outlook, and on locked-down corporate laptops — clicking a
 * mailto does nothing at all and reads as broken. So the click also copies the
 * address and says so.
 */
export function EmailLink({
  email,
  variant,
  className,
}: {
  email: string;
  variant: "chip" | "row";
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const confirm = () => {
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2200);
  };

  /**
   * Legacy path. The async Clipboard API rejects when the document is not
   * focused and is unavailable outside a secure context; execCommand has
   * neither restriction, so it covers the cases that would otherwise leave
   * the reader with no feedback at all.
   */
  const copyFallback = () => {
    try {
      const field = document.createElement("textarea");
      field.value = email;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.top = "0";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(field);
      return ok;
    } catch {
      return false;
    }
  };

  const copy = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(email).then(confirm, () => {
        if (copyFallback()) confirm();
      });
      return;
    }
    if (copyFallback()) confirm();
  };

  if (variant === "chip") {
    return (
      <a
        href={`mailto:${email}`}
        onClick={copy}
        title={`${email} — click to copy`}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs transition-colors",
          copied
            ? "border-accent text-accent"
            : "border-line-strong text-muted hover:border-accent hover:text-accent",
          className,
        )}
      >
        {copied ? (
          <Check className="size-3.5" aria-hidden />
        ) : (
          <Mail className="size-3.5" aria-hidden />
        )}
        {copied ? "Copied" : "Email"}
      </a>
    );
  }

  return (
    <a
      href={`mailto:${email}`}
      onClick={copy}
      title={`${email} — click to copy`}
      className="group flex items-center gap-4 py-4 transition-colors"
    >
      {copied ? (
        <Check className="size-4 shrink-0 text-accent" aria-hidden />
      ) : (
        <Mail
          className="size-4 shrink-0 text-dim transition-colors group-hover:text-accent"
          aria-hidden
        />
      )}
      <span className="label-mono w-20 shrink-0">Email</span>
      <span
        className={cn(
          "min-w-0 flex-1 truncate font-mono text-sm transition-colors",
          copied ? "text-accent" : "text-ink group-hover:text-accent",
        )}
      >
        {copied ? "Copied to clipboard" : email}
      </span>
    </a>
  );
}
