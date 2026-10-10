# Chakravarthy Naik M — Portfolio

Personal portfolio for a blockchain developer. Static-first Next.js site, built to deploy on Vercel.

**Live:** _not deployed yet_

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4 (CSS-first `@theme` tokens in `src/app/globals.css`) |
| Fonts | `next/font` — Space Grotesk (display), Inter (body), JetBrains Mono (technical values) |
| Motion | Hand-rolled CSS transitions + IntersectionObserver. No animation library. |
| Smooth scroll | Lenis |
| Icons | lucide-react, plus inline brand SVGs in `components/ui/BrandIcons.tsx` |
| Contact | React Hook Form + Zod → Route Handler → Resend |
| Analytics | `@vercel/analytics`, `@vercel/speed-insights` |

Everything except the contact route is pre-rendered at build time.

## Structure

```
src/
├── app/
│   ├── layout.tsx            Fonts, metadata, JSON-LD Person schema, nav/footer
│   ├── page.tsx              Single-scroll home
│   ├── work/[slug]/page.tsx  Case studies (SSG via generateStaticParams)
│   ├── api/contact/route.ts  Resend + rate limit — the only server code
│   ├── opengraph-image.tsx   Social card
│   └── sitemap.ts, robots.ts
├── components/
│   ├── sections/   Hero · Metrics · Work · About · Stack · Experience · Contact
│   ├── ui/         Nav, Footer, primitives, brand icons
│   ├── motion/     Reveal, CountUp, TextScramble, Magnetic, SmoothScroll
│   └── HeroCanvas.tsx
├── content/        site.ts · projects.ts · experience.ts · skills.ts   ← edit these
└── lib/            fonts.ts · utils.ts · contact-schema.ts
```

**To change site content, edit `src/content/`.** Nothing else should need touching.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Environment variables

Copy `.env.example` to `.env.local`. Without these the contact form returns a clear
"not configured" message and tells visitors to email directly — nothing crashes.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key — https://resend.com/api-keys |
| `CONTACT_TO_EMAIL` | Where enquiries are delivered |
| `CONTACT_FROM_EMAIL` | Verified sender. Use `Portfolio <onboarding@resend.dev>` until a domain is verified. |

## Deploying to Vercel

1. Push this directory to a GitHub repository.
2. On [vercel.com/new](https://vercel.com/new), import the repo. Vercel detects Next.js —
   no build configuration needed.
3. Add the three environment variables above under **Settings → Environment Variables**.
4. Deploy. Subsequent pushes to `main` deploy automatically.
5. Add a custom domain under **Settings → Domains**, then update `site.url` in
   `src/content/site.ts` so canonical URLs, the sitemap and OG tags point at the real host.

## Rendering guarantees

The site is built so that content is never hidden behind JavaScript:

- Scroll-reveal start states are scoped to a `.js` class that an inline script sets
  **only** when `IntersectionObserver` exists. With JS blocked, failed, or still loading,
  every section renders fully visible.
- `prefers-reduced-motion` is honoured in CSS, so reveals cannot get stuck mid-transition.
- `CountUp` server-renders its final value and only animates elements that start below
  the fold — a broken bundle shows the real numbers, not zeros.
- No horizontal scroll at 320–414px (verified).

Keep these properties in mind before introducing an animation library.

## Content notes

Case-study prose in `src/content/projects.ts` was expanded from résumé bullet points.
It describes architecture and design reasoning rather than quoting proprietary code, and
contains no contract addresses — the SoluLab work is client-owned. Review the wording
before publishing, and confirm each project name is cleared for public use.
