# Shelif — Landing Page

Investor-grade marketing site for **Shelif**, a retail-tech platform for Turkey's 600,000 independent retailers (ESL + autonomous ordering AI + POS sync).

## Stack

- **Next.js 15** (App Router) + React 19 + TypeScript
- **Tailwind v4** (CSS-first `@theme` tokens in [`app/globals.css`](./app/globals.css))
- **motion/react** (renamed `framer-motion`) + **Lenis** smooth scroll
- **react-hook-form** + **zod** for the contact form, **Resend** for delivery
- Bilingual **TR / EN** via static segment routing (`/[locale]/page.tsx`)

## Run

```bash
npm install
npm run dev      # http://localhost:3000 → redirects to /tr
npm run build    # production build (verifies types)
npm run start    # serve production build
```

## Environment

Copy `.env.local.example` to `.env.local`:

```
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=halim@shelif.com
```

If `RESEND_API_KEY` is unset, `/api/contact` logs the payload server-side and returns `{ ok: true, mode: "log" }`.

## Sections

Hero · Problem · How It Works · Live Demo · Pillars · Market · Comparison · Team · Roadmap · CTA · Footer.

Editable copy: [`lib/i18n/tr.ts`](./lib/i18n/tr.ts) and [`lib/i18n/en.ts`](./lib/i18n/en.ts).

Hero ESL device: [`components/hero/EslDevice.tsx`](./components/hero/EslDevice.tsx) (rendered in CSS for full reactivity, original photo at `public/esl/ESL1.png`).
