"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Toast, type ToastData } from "@/components/ui/Toast";
import { contactSchema, type ContactInput } from "@/lib/contact-schema";

type Status = "idle" | "sending" | "sent";

const field =
  "w-full rounded-lg border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-dim transition-colors focus:border-accent focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [toast, setToast] = useState<ToastData>(null);

  // Stable so the toast's auto-dismiss timer is not reset on every render.
  const closeToast = useCallback(() => setToast(null), []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (values: ContactInput) => {
    setStatus("sending");
    setToast(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(
          data?.error ?? "Something went wrong. Please email me directly.",
        );
      }

      setStatus("sent");
      setToast({
        kind: "success",
        message: "Thanks for reaching out — I'll get back to you shortly.",
      });
      reset();
    } catch (err) {
      setStatus("idle");
      setToast({
        kind: "error",
        message:
          err instanceof Error
            ? err.message
            : "Something went wrong. Please email me directly.",
      });
    }
  };

  return (
    <>
      {status === "sent" ? (
        <div className="flex flex-col items-start gap-4 rounded-xl border border-accent/30 bg-accent/5 p-8">
          <span className="inline-flex size-10 items-center justify-center rounded-full bg-accent text-bg">
            <Check className="size-5" aria-hidden />
          </span>
          <div>
            <p className="font-display text-lg font-semibold text-ink">
              Message sent
            </p>
            <p className="mt-1.5 text-sm text-muted">
              Thanks for reaching out — I&apos;ll get back to you shortly.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="font-mono text-[11px] tracking-wider text-dim uppercase transition-colors hover:text-accent"
          >
            Send another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/*
            Honeypot — hidden from people but present for bots, so not display:none.
            Uses sr-only rather than a negative offset: a far-left absolute element
            widens the document and causes horizontal overflow on narrow screens.
          */}
          <div className="sr-only" aria-hidden>
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("website")}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="label-mono mb-2 block">
                Name
              </label>
              <input
                id="name"
                className={field}
                placeholder="Jane Doe"
                autoComplete="name"
                aria-invalid={!!errors.name}
                {...register("name")}
              />
              {errors.name && (
                <p className="mt-1.5 font-mono text-[11px] text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="label-mono mb-2 block">
                Email
              </label>
              <input
                id="email"
                type="email"
                className={field}
                placeholder="jane@company.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1.5 font-mono text-[11px] text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="company" className="label-mono mb-2 block">
              Company <span className="text-faint">(optional)</span>
            </label>
            <input
              id="company"
              className={field}
              placeholder="Acme Protocol"
              autoComplete="organization"
              {...register("company")}
            />
          </div>

          <div>
            <label htmlFor="message" className="label-mono mb-2 block">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              className={`${field} resize-y`}
              placeholder="What are you building?"
              aria-invalid={!!errors.message}
              {...register("message")}
            />
            {errors.message && (
              <p className="mt-1.5 font-mono text-[11px] text-red-400">
                {errors.message.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-bg transition-colors hover:bg-accent-dim disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? (
              <>
                Sending
                <LoaderCircle className="size-4 animate-spin" aria-hidden />
              </>
            ) : (
              <>
                Send message
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </>
            )}
          </button>
        </form>
      )}

      <Toast toast={toast} onClose={closeToast} />
    </>
  );
}
