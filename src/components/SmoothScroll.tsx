"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useGsap, prefersReducedMotion } from "@/lib/motion";

/** Lenis smooth scrolling wired into GSAP's ticker so ScrollTrigger stays in sync. */
export default function SmoothScroll() {
  const { gsap, ScrollTrigger } = useGsap();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 0.95, touchMultiplier: 1.2 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    // Anchor links go through Lenis so they ease as well.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a) return;
      const el = document.querySelector(a.getAttribute("href") || "");
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -72 });
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [gsap, ScrollTrigger]);

  return null;
}
