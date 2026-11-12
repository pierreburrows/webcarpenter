"use client";

import { useRef } from "react";
import { useGsapEffect, prefersReducedMotion, ease } from "@/lib/motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Selector for children to stagger. Defaults to the element itself. */
  stagger?: string;
  y?: number;
  as?: "div" | "section" | "ul" | "ol" | "li" | "article";
  id?: string;
  [key: string]: unknown;
};

/** Reveal-on-scroll. One motion per section, scrubbed by ScrollTrigger's toggle, never looping. */
export default function Reveal({ children, className, stagger, y = 28, as = "div", id, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGsapEffect(({ gsap }) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const targets = stagger ? el.querySelectorAll(stagger) : el;
    const ctx = gsap.context(() => {
      gsap.from(targets, {
        autoAlpha: 0,
        y,
        duration: 0.9,
        ease: ease.out,
        stagger: stagger ? 0.08 : 0,
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
      });
    }, el);
    return () => ctx.revert();
  }, [stagger, y]);

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} id={id} className={className} {...rest}>
      {children}
    </Tag>
  );
}
