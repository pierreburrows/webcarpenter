"use client";

import { useEffect, useState } from "react";
import { site, navLinks, positioning } from "@/lib/site";

/** Fixed nav. Transparent over the dark hero, solid plaster once the hero has scrolled past. */
export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const io = new IntersectionObserver(
      ([entry]) => setSolid(!entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 },
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const tone = solid || open ? "text-ink" : "text-on-dark";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        solid || open ? "bg-bg/90 backdrop-blur-md shadow-[0_1px_0_var(--line)]" : "bg-transparent"
      }`}
    >
      <div className={`container flex h-[72px] items-center justify-between ${tone}`}>
        <a href="#hero" className="flex items-baseline gap-2" aria-label={`${site.name}, home`}>
          <span className="display text-[1.35rem] leading-none">Antony Williams</span>
          <span className="eyebrow hidden sm:inline opacity-70">Carpentry &amp; Joinery</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {navLinks.slice(0, -1).map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium opacity-85 transition-opacity hover:opacity-100">
              {l.label}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary !py-3 !px-5 text-sm">
            {positioning.cta}
          </a>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <a href={site.phoneHref} className="btn btn-primary !py-3 !px-4 text-sm" aria-label={`Call ${site.phone}`}>
            Call
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-11 w-11 place-items-center rounded-full"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute inset-x-0 top-0 h-[2px] bg-current transition-transform duration-300 ${open ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`absolute inset-x-0 bottom-0 h-[2px] bg-current transition-transform duration-300 ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-x-0 top-[72px] bottom-0 bg-bg transition-[opacity,visibility] duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="container flex flex-col gap-1 py-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="display border-b border-line py-4 text-3xl text-ink"
            >
              {l.label}
            </a>
          ))}
          <p className="mt-6 text-sm text-muted">
            {site.phone} · {site.email}
          </p>
        </nav>
      </div>
    </header>
  );
}
