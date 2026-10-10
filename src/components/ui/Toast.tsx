"use client";

import { CircleAlert, CircleCheck, X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export type ToastKind = "success" | "error";
export type ToastData = { kind: ToastKind; message: string } | null;

const AUTO_DISMISS_MS = 7000;

/**
 * A single transient notification, portalled to <body>.
 *
 * Success messages dismiss themselves; errors stay until the reader closes
 * them, so something like a rate-limit notice cannot disappear before it has
 * been read. Portalled because the contact form sits inside a scroll-reveal
 * wrapper that is transformed mid-animation, which would otherwise trap a
 * position:fixed child.
 */
export function Toast({
  toast,
  onClose,
}: {
  toast: ToastData;
  onClose: () => void;
}) {
  const isError = toast?.kind === "error";

  useEffect(() => {
    if (!toast || isError) return;
    const timer = setTimeout(onClose, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [toast, isError, onClose]);

  useEffect(() => {
    if (!toast) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toast, onClose]);

  // Null until a submission happens, so this never runs during SSR.
  if (!toast || typeof document === "undefined") return null;

  const Icon = isError ? CircleAlert : CircleCheck;

  return createPortal(
    <div
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      className="toast-enter fixed inset-x-4 bottom-4 z-[200] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-full sm:max-w-sm"
    >
      <div
        className={cn(
          "flex items-start gap-3 rounded-xl border bg-surface-2/95 p-4 shadow-2xl shadow-black/50 backdrop-blur-md",
          isError ? "border-red-500/40" : "border-accent/40",
        )}
      >
        <Icon
          className={cn(
            "mt-0.5 size-5 shrink-0",
            isError ? "text-red-400" : "text-accent",
          )}
          aria-hidden
        />

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-ink">
            {isError ? "Couldn't send" : "Message sent"}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {toast.message}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="-m-1 shrink-0 rounded-md p-1 text-dim transition-colors hover:text-ink"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>
    </div>,
    document.body,
  );
}
