# Brief

Site for Antony Williams Carpentry & Joinery. Next.js 16, Tailwind 4, GSAP.

The site's one job is to get a homeowner on a phone to send an enquiry. Every section is judged against that.

## Stages (stop after each for review)

1. **Copy.** Positioning line, about in Antony's voice, service list drawn from the projects, one paragraph per project. Reviewers shown as first name and initial; the 2014 joke review dropped. House number blurred in the portico photo. Area covered is a placeholder until confirmed.
2. **Design system and hero.** Display typeface, three-colour system drawn from the work, spacing. Hero: full-bleed, a media wall assembling on scroll, built first from the real slat-media-wall sequence (sketch, bare wall, carcass, finished) as a canvas image sequence. Also generate a 1080p clip of a media wall coming together and judge it against a gate: joinery proportions must look plausible to a tradesperson, no warped geometry, no text. If it passes, layer it in muted, autoplaying, under 3 MB, with a poster frame and a reduced-motion fallback. If it fails, say so and ship the photo sequence alone.
3. **Remaining sections.** Order: hero, trust strip with the three reviews, featured projects (pool house, slat media wall, attic wardrobes, decking), process in three steps, full project grid, enquiry form, footer. One deliberate scroll-driven motion moment per section, none decorative.
4. **Form and SEO.** Working enquiry form through Resend, LocalBusiness and Review structured data, sitemap, Open Graph image, AVIF/WebP images with blur placeholders.
5. **Measurements.** Lighthouse mobile 90+ in all four categories with the hero in place, LCP under 2.5 s throttled, a test enquiry landing in the inbox, Rich Results test passing, Playwright screenshots at 390 and 1440 px of every section. Report every number, including misses.

## Outstanding from Antony

- Town he works from and area covered
- Facebook page URL
- Captions for the living-room-storage set and the cottage shelving/steps set
- Whether he paints/finishes or hands over to a decorator
- Permission to use reviewers' full names (otherwise first name + initial)
- Original full-resolution photos (current ones are Facebook re-compressions)
- Any after-decoration photos from customers
- Logo, if one exists

## Source material

- `docs/source-project-notes.md`: per-project notes and verbatim captions as supplied
- `docs/source-reviews.md` and `docs/source-facebook-reviews.png`: reviews as supplied
- `public/img/projects/<slug>/`: photos, recompressed to max 1600 px, EXIF stripped

## Stage 2 decisions (12 Nov 2026)

- **Type:** Fraunces (variable, optical size and SOFT axes) for display, Inter Tight for body, JetBrains Mono for eyebrows.
- **Colour:** plaster off-white, charcoal, oak accent. Tokens in `src/app/globals.css`.
- **Hero:** built from the real slat-media-wall photo, cut into base run, slat panel, tower and tower door, assembling on scroll over Antony's own sketch. Layers in `public/hero/`, timeline in `src/components/Hero.tsx`. Sticky stage plus GSAP ScrollTrigger scrub; Lenis for smooth scroll; reduced-motion shows the finished state.
- **Generated clip:** one 8 s clip made with Seedance 2.5 from the finished photo (56 credits). Geometry clean, no text, but it is a generic rendered unit, not Antony's (different tower, no fuse-box door, floating base) and came back at 1280x720, not 1080p. Verdict: fails the gate on fidelity and resolution. Not shipped. Kept outside the repo for reference.
