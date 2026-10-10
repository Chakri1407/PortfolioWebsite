import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";

/**
 * In-memory rate limit. Good enough for a personal site on a single region;
 * swap for Upstash Redis if this ever runs multi-instance.
 *
 * Disabled outside production: locally there is no `x-forwarded-for`, so every
 * request shares one bucket and a few test submissions lock you out for an hour.
 */
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 10;
const ENABLED = process.env.NODE_ENV === "production";
const hits = new Map<string, number[]>();

/** Returns seconds until the next slot frees up, or 0 if not limited. */
function retryAfter(ip: string) {
  if (!ENABLED) return 0;

  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  if (recent.length <= MAX_PER_WINDOW) return 0;
  return Math.ceil((WINDOW_MS - (now - recent[0])) / 1000);
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const wait = retryAfter(ip);
  if (wait > 0) {
    const minutes = Math.max(1, Math.ceil(wait / 60));
    return NextResponse.json(
      {
        error: `Too many messages. Try again in about ${minutes} minute${
          minutes === 1 ? "" : "s"
        }, or email me directly.`,
      },
      { status: 429, headers: { "Retry-After": String(wait) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  const { name, email, company, message, website } = parsed.data;

  // Honeypot tripped — accept silently so bots do not learn anything.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    console.error("Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set.");
    return NextResponse.json(
      { error: "Messaging is not configured yet. Please email me directly." },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: [to],
      replyTo: email,
      subject: `Portfolio enquiry — ${name}${company ? ` (${company})` : ""}`,
      text: [
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Company: ${company || "—"}`,
        "",
        message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Could not send right now. Please email me directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Could not send right now. Please email me directly." },
      { status: 500 },
    );
  }
}
