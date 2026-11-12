"use client";

import { useRef } from "react";
import Link from "next/link";
import Photo from "@/components/Photo";
import { featuredProjects } from "@/lib/site";
import LazyMount from "@/components/LazyMount";
import { useGsapEffect, prefersReducedMotion, ease } from "@/lib/motion";

/**
 * Four featured jobs, full-bleed images that drift slowly as you scroll past.
 * The motion is a gentle parallax on the image inside a fixed frame; the frame
 * itself and the text reveal once.
 */
export default function FeaturedProjects() {
  const root = useRef<HTMLElement>(null);

  useGsapEffect(({ gsap }) => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      el.querySelectorAll<HTMLElement>("[data-feature]").forEach((card) => {
        const img = card.querySelector("[data-img]");
        const text = card.querySelectorAll("[data-text]");
        gsap.fromTo(img, { yPercent: -8 }, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
        });
        gsap.from(text, {
          autoAlpha: 0,
          y: 24,
          duration: 0.8,
          ease: ease.out,
          stagger: 0.07,
          scrollTrigger: { trigger: card, start: "top 75%", once: true },
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={root} aria-labelledby="work-heading" className="bg-bg">
      <div className="container pt-20 md:pt-28">
        <p className="eyebrow text-muted">Recent work</p>
        <h2 id="work-heading" className="display mt-3 max-w-[22ch] text-[clamp(2rem,5vw,3.6rem)]">
          Four jobs that show how it goes.
        </h2>
      </div>

      <div className="container mt-10 grid gap-6 md:mt-14 md:grid-cols-2 md:gap-8">
        {featuredProjects.map((p, i) => {
          const hero = p.images[0];
          const tall = i === 0 || i === 3;
          return (
            <article
              key={p.slug}
              data-feature
              className={`group relative overflow-hidden rounded-[var(--radius-lg)] bg-ink text-on-dark ${tall ? "md:row-span-2" : ""}`}
            >
              <Link href={`/work/${p.slug}`} className="block" aria-label={`${p.title}: see the job`}>
                <div className={`relative overflow-hidden ${tall ? "aspect-[4/5] md:aspect-auto md:h-full md:min-h-[720px]" : "aspect-[4/3]"}`}>
                  <LazyMount className="absolute -inset-y-[10%] inset-x-0">
                  <div data-img className="absolute inset-0">
                    <Photo
                      src={hero.src}
                      alt={hero.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  </LazyMount>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <p data-text className="eyebrow text-on-dark-muted">
                    {p.category}
                  </p>
                  <h3 data-text className="display mt-2 text-[clamp(1.5rem,2.6vw,2.2rem)]">
                    {p.title}
                  </h3>
                  <p data-text className="mt-2 max-w-[48ch] text-sm text-on-dark-muted md:text-base">
                    {p.summary}
                  </p>
                  <p data-text className="mt-4 text-sm font-medium underline-offset-4 group-hover:underline">
                    See the job
                  </p>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
