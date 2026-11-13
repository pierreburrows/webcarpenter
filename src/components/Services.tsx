"use client";

import { useRef } from "react";
import Link from "next/link";
import Photo from "@/components/Photo";
import { services, projects } from "@/lib/site";
import { useGsapEffect, prefersReducedMotion, ease } from "@/lib/motion";

const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

const HEADING = "If it's made of wood and has to fit, it's probably on this list.";

/**
 * Seven services, each with a thumbnail of a real job that shows it.
 *
 * Motion, all scroll-driven and once-only except the last:
 *   - the heading rises word by word out of a clipped line
 *   - as each row enters, its rule draws left to right, the number and title slide in,
 *     the copy fades up and the thumbnail wipes upward from under its own edge
 *   - the row nearest the middle of the screen is "lit": full-contrast text and a
 *     slightly larger thumbnail, so the list reads one item at a time on a phone,
 *     where there is no hover
 */
export default function Services() {
  const root = useRef<HTMLElement>(null);

  useGsapEffect(({ gsap, ScrollTrigger }) => {
    const el = root.current;
    if (!el) return;
    const rows = Array.from(el.querySelectorAll<HTMLElement>("[data-row]"));

    if (prefersReducedMotion()) {
      rows.forEach((r) => r.classList.add("is-lit"));
      return;
    }

    const ctx = gsap.context(() => {
      // Heading: words rise out of a clip.
      gsap.from("[data-word] > span", {
        yPercent: 110,
        duration: 0.9,
        ease: ease.out,
        stagger: 0.045,
        scrollTrigger: { trigger: "[data-heading]", start: "top 85%", once: true },
      });
      gsap.from("[data-eyebrow]", {
        autoAlpha: 0,
        y: 10,
        duration: 0.6,
        ease: ease.out,
        scrollTrigger: { trigger: "[data-heading]", start: "top 85%", once: true },
      });

      rows.forEach((row) => {
        const rule = row.querySelector("[data-rule]");
        const lead = row.querySelectorAll("[data-lead]");
        const copy = row.querySelectorAll("[data-copy]");
        const thumb = row.querySelector("[data-thumb]");
        const img = row.querySelector("[data-thumb] img");

        const tl = gsap.timeline({
          defaults: { ease: ease.out },
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        });
        // GSAP only ever touches the inner [data-lead]/[data-copy] spans and clears its inline
        // styles when done, so the CSS "lit" state on the outer wrappers is never overridden.
        tl.fromTo(rule, { scaleX: 0, transformOrigin: "0 50%" }, { scaleX: 1, duration: 0.9, ease: ease.inOut, clearProps: "transform" }, 0)
          .from(lead, { x: -18, autoAlpha: 0, duration: 0.7, stagger: 0.06, clearProps: "all" }, 0.1)
          .from(copy, { y: 14, autoAlpha: 0, duration: 0.7, stagger: 0.06, clearProps: "all" }, 0.2);
        if (thumb && img) {
          tl.fromTo(thumb, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 0.8, clearProps: "clipPath" }, 0.15)
            .fromTo(img, { scale: 1.15, yPercent: 8 }, { scale: 1, yPercent: 0, duration: 1.1, clearProps: "all" }, 0.15);
        }

        // Lit state while the row sits in the middle band of the viewport.
        ScrollTrigger.create({
          trigger: row,
          start: "top 62%",
          end: "bottom 38%",
          onToggle: (self) => row.classList.toggle("is-lit", self.isActive),
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={root} aria-labelledby="services-heading" className="bg-bg-deep">
      <div className="container py-20 md:py-28">
        <div data-heading className="max-w-[60ch]">
          <p data-eyebrow className="eyebrow text-muted">
            What I do
          </p>
          <h2 id="services-heading" className="display mt-3 text-[clamp(2rem,5vw,3.6rem)]">
            {HEADING.split(" ").map((w, i) => (
              <span key={i} data-word className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
                <span className="inline-block">{w}&nbsp;</span>
              </span>
            ))}
          </h2>
        </div>

        <ul className="mt-10 md:mt-14">
          {services.map((s, i) => {
            const example = bySlug[s.projects[0]];
            const thumb = example?.images[0];
            return (
              <li key={s.id} data-row className="svc-row relative">
                <span data-rule aria-hidden className="absolute inset-x-0 top-0 h-px bg-line-strong" />
                <div className="grid grid-cols-1 gap-x-5 gap-y-3 py-7 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,2fr)_150px] md:items-center md:gap-x-8 md:py-8">
                  <div className="flex items-baseline gap-4 md:contents">
                    <span className="svc-dim eyebrow text-faint md:pt-1">
                      <span data-lead className="inline-block">{String(i + 1).padStart(2, "0")}</span>
                    </span>
                    <h3 className="svc-dim text-xl font-semibold leading-snug md:text-[1.35rem]">
                      <span data-lead className="inline-block">{s.name}</span>
                    </h3>
                  </div>
                  <div className="svc-dim md:col-start-3">
                    <p className="text-ink-2">
                      <span data-copy className="inline-block">{s.short}</span>
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      <span data-copy className="inline-block">{s.detail}</span>
                    </p>
                    {example ? (
                      <span data-copy className="inline-block">
                        <Link
                          href={`/work/${example.slug}`}
                          className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-oak-deep underline-offset-4 hover:underline"
                        >
                          <span>See: {example.title}</span>
                          <span aria-hidden className="svc-arrow">→</span>
                        </Link>
                      </span>
                    ) : null}
                  </div>
                  {thumb ? (
                    <Link
                      href={`/work/${example.slug}`}
                      data-thumb
                      className="svc-thumb relative mt-2 aspect-[4/3] w-44 overflow-hidden rounded-[var(--radius)] md:col-start-4 md:mt-0 md:aspect-square md:w-full"
                      aria-label={`See ${example.title}`}
                    >
                      <Photo src={thumb.src} alt="" fill sizes="(min-width: 768px) 150px, 160px" className="object-cover" />
                    </Link>
                  ) : null}
                </div>
              </li>
            );
          })}
          <li aria-hidden className="h-px bg-line-strong" />
        </ul>
      </div>
    </section>
  );
}
