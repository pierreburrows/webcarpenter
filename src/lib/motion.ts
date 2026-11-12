"use client";

import { useEffect, type DependencyList } from "react";

type Gsap = typeof import("gsap").default;
type ST = typeof import("gsap/ScrollTrigger").ScrollTrigger;
export type GsapBundle = { gsap: Gsap; ScrollTrigger: ST };

let bundle: Promise<GsapBundle> | null = null;

/**
 * GSAP and ScrollTrigger are loaded once, after hydration, with a dynamic import.
 * Nothing above the fold waits for them: the hero's resting state is plain HTML and CSS.
 */
export function loadGsap(): Promise<GsapBundle> {
  if (!bundle) {
    bundle = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, s]) => {
      g.default.registerPlugin(s.ScrollTrigger);
      return { gsap: g.default, ScrollTrigger: s.ScrollTrigger };
    });
  }
  return bundle;
}

/** useEffect that runs once GSAP is available. The callback may return a cleanup. */
export function useGsapEffect(fn: (g: GsapBundle) => void | (() => void), deps: DependencyList) {
  useEffect(() => {
    let cleanup: void | (() => void);
    let cancelled = false;
    loadGsap().then((g) => {
      if (cancelled) return;
      cleanup = fn(g);
    });
    return () => {
      cancelled = true;
      cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Shared easing names so sections feel like one system. */
export const ease = {
  out: "power3.out",
  inOut: "power2.inOut",
  settle: "back.out(1.2)",
} as const;
