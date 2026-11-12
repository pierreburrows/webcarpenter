"use client";

import { useGsapEffect, prefersReducedMotion } from "@/lib/motion";

/** Lenis smooth scrolling wired into GSAP's ticker so ScrollTrigger stays in sync. Loaded after hydration. */
export default function SmoothScroll() {
  useGsapEffect(({ gsap, ScrollTrigger }) => {
    if (prefersReducedMotion()) return;
    let destroyed = false;
    let teardown: (() => void) | undefined;
    import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;
      const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95, touchMultiplier: 1.2 });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
        if (!a) return;
        const el = document.querySelector(a.getAttribute("href") || "");
        if (!el) return;
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -72 });
      };
      document.addEventListener("click", onClick);
      teardown = () => {
        document.removeEventListener("click", onClick);
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    });
    return () => {
      destroyed = true;
      teardown?.();
    };
  }, []);
  return null;
}
