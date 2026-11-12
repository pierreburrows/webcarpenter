"use client";

import { useRef } from "react";
import { steps } from "@/lib/site";
import { useGsapEffect, prefersReducedMotion, ease } from "@/lib/motion";

/** Three steps. The connecting line draws itself as the section scrolls into view. */
export default function Process() {
  const root = useRef<HTMLElement>(null);

  useGsapEffect(({ gsap }) => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-line]", { scaleX: 0 }, {
        scaleX: 1,
        ease: "none",
        transformOrigin: "0 50%",
        scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 70%", scrub: 0.4 },
      });
      gsap.from("[data-step]", {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        ease: ease.out,
        stagger: 0.14,
        scrollTrigger: { trigger: el, start: "top 72%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={root} aria-labelledby="process-heading" className="bg-ink text-on-dark">
      <div className="container py-20 md:py-28">
        <p className="eyebrow text-on-dark-muted">How it works</p>
        <h2 id="process-heading" className="display mt-3 max-w-[22ch] text-[clamp(2rem,5vw,3.6rem)]">
          Three steps. The drawing comes before the saw.
        </h2>

        <div className="relative mt-12 md:mt-16">
          <div aria-hidden className="absolute left-0 right-0 top-[22px] hidden h-px bg-dark-line md:block">
            <div data-line className="h-full w-full bg-oak" />
          </div>
          <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((s) => (
              <li key={s.n} data-step className="relative md:pt-12">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-oak font-mono text-sm font-medium text-oak-ink md:absolute md:top-0 md:left-0">
                  {s.n}
                </span>
                <h3 className="display mt-4 text-[1.6rem] md:mt-2">{s.title}</h3>
                <p className="mt-3 max-w-[40ch] text-on-dark-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
