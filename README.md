# Antony Williams Carpentry & Joinery — website

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · GSAP · Vercel-ready.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
```

- **All copy and business facts** live in `src/lib/site.ts`. Components read from it.
- **Photos** are in `public/img/projects/<slug>/` and mapped in `src/lib/site.ts`.
- **The brief and outstanding questions** are in `docs/BRIEF.md`.
- Anything marked `TODO` must be confirmed with Antony before launch.

## Enquiry form email

`src/app/api/enquiry/route.ts` receives the form. With `RESEND_API_KEY` set it emails the enquiry (reply-to is the customer, photo attached if given). Without the key it logs the enquiry to the server console and tells the visitor to call or email. Copy `.env.example` to `.env.local` and fill it in.

## Deploy (Vercel)

Import the repo, set the variables from `.env.example`, deploy. `NEXT_PUBLIC_SITE_URL` must be set on production or the site stays `noindex`.

## Regenerating assets

- `scripts/blur.sh` rebuilds the blur placeholders after adding photos.
- Hero layers in `public/hero/` are cut from `public/img/projects/slat-media-wall/02-after-closed-slat-wall.jpg`; the crop boxes are in `src/components/Hero.tsx`.
- The italic headline font is a lowercase-only subset. To widen it, fetch Google Fonts' CSS for Fraunces italic with a `text=` parameter covering the characters you need and replace `src/app/fonts/Fraunces-Italic-subset.woff2`.

## Measurements

See `docs/MEASUREMENTS.md`.
