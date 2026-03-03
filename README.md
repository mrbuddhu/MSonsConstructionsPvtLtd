# M & Sons Construction Group LTD

Professional construction company website — London & surrounding areas.

## Stack

- **Next.js 14** (App Router)
- **TailwindCSS**
- Static generation, no database
- Optimized for Vercel

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & deploy

```bash
npm run build
npm start
```

Deploy to [Vercel](https://vercel.com): connect the repo, then:

1. **Root Directory:** leave empty (or `.`) so the project root is the repo root.
2. **Framework Preset:** should auto-detect as Next.js.
3. No env vars required.

If you see **404 NOT_FOUND** after deploy, check in Vercel → Project Settings → General that **Root Directory** is blank (repo root). If you imported from a monorepo or subfolder, set it back to the repo root.

## Project structure

- `app/` — Routes (Home, About, Services, Contact)
- `components/` — Header, Footer, Hero, sections, WhatsApp, Mobile CTA
- `lib/` — Service data
- `public/` — Static assets

## Contact

- **Phone:** 07454 704949
- **Email:** info@construction-group.co.uk
- **Address:** 99A Woodstock Gardens, Hayes, UB4 8BA
