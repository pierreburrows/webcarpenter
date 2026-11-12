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
