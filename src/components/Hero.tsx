"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { positioning, site } from "@/lib/site";
import { useGsapEffect, prefersReducedMotion, ease } from "@/lib/motion";

/*
  The hero is Antony's own oak slat media wall assembling itself as the visitor scrolls.
  The pieces are cut from the real photograph of the finished job: the base run of five
  cupboards, the slat panel, the side tower and the tower door. Underneath them sits his
  hand-drawn design for the same unit. Scroll scrubs a single timeline:

    0.00  sketch already visible (it animates in on page load, not on scroll)
    0.12  base run slides up into place
    0.32  slat panel rises behind it
    0.52  tower slides in from the right, then its door
    0.74  sketch fades, the full photograph fades in (room, wall, light)
    1.00  resting state

  Reduced-motion users get the resting state immediately.
*/

// Stage geometry: every layer is positioned as a percentage of the 1050 x 1160 stage.
const W = 1050;
const H = 1160;
const pct = (n: number, of: number) => `${(n / of) * 100}%`;

const layers = {
  sketch: { x: 0, y: 150, w: 1050, h: 817 },
  base: { x: 50, y: 810, w: 960, h: 290 },
  slats: { x: 30, y: 90, w: 790, h: 720 },
  tower: { x: 820, y: 30, w: 200, h: 560 },
  towerDoor: { x: 820, y: 590, w: 190, h: 220 },
} as const;

type Box = { x: number; y: number; w: number; h: number };
const boxStyle = (b: Box) => ({
  left: pct(b.x, W),
  top: pct(b.y, H),
  width: pct(b.w, W),
  height: pct(b.h, H),
});

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  // The assembled layers are hidden at load, so their images are only mounted once GSAP is
  // ready to reveal them. That keeps roughly 80 KB off the first paint's critical path.
  const [ready, setReady] = useState(false);

  useGsapEffect(({ gsap }) => {
    const el = root.current;
    const st = stage.current;
    if (!el || !st) return;
    setReady(true);

    const q = gsap.utils.selector(st);
    const sketch = q("[data-layer=sketch]");
    const base = q("[data-layer=base]");
    const slats = q("[data-layer=slats]");
    const tower = q("[data-layer=tower]");
    const towerDoor = q("[data-layer=tower-door]");
    const full = q("[data-layer=full]");
    const caption = el.querySelectorAll("[data-caption]");

    if (prefersReducedMotion()) {
      gsap.set([base, slats, tower, towerDoor, full], { autoAlpha: 1, x: 0, y: 0, clipPath: "inset(0 0 0 0)" });
      gsap.set(sketch, { autoAlpha: 0 });
      gsap.set(caption, { autoAlpha: 0 });
      gsap.set(caption[caption.length - 1], { autoAlpha: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // The sketch and the copy are visible from first paint; their entrance is a CSS animation
      // (see .intro in globals.css) so the LCP never waits for JavaScript.
      gsap.set(sketch, { autoAlpha: 1, scale: 1, transformOrigin: "50% 50%" });
      gsap.set(base, { autoAlpha: 0, y: "60%" });
      gsap.set(slats, { autoAlpha: 0, clipPath: "inset(100% 0 0 0)", y: 24 });
      gsap.set(tower, { autoAlpha: 0, x: "70%" });
      gsap.set(towerDoor, { autoAlpha: 0, x: "70%" });
      gsap.set(full, { autoAlpha: 0 });
      gsap.set(caption, { autoAlpha: 0, y: 8 });

      const tl = gsap.timeline({
        defaults: { ease: ease.out },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
        },
      });

      const showCaption = (i: number, at: number) => {
        tl.to(caption[i], { autoAlpha: 1, y: 0, duration: 0.05 }, at);
        if (i < caption.length - 1) tl.to(caption[i], { autoAlpha: 0, y: -8, duration: 0.05 }, at + 0.16);
      };

      showCaption(0, 0);

      tl.to(base, { autoAlpha: 1, y: "0%", duration: 0.2, ease: ease.settle }, 0.12);
      showCaption(1, 0.2);

      tl.to(slats, { autoAlpha: 1, clipPath: "inset(0% 0 0 0)", y: 0, duration: 0.22 }, 0.32);
      showCaption(2, 0.4);

      tl.to(tower, { autoAlpha: 1, x: "0%", duration: 0.16, ease: ease.settle }, 0.52);
      tl.to(towerDoor, { autoAlpha: 1, x: "0%", duration: 0.12, ease: ease.settle }, 0.6);
      showCaption(3, 0.6);

      tl.to(sketch, { autoAlpha: 0, duration: 0.14 }, 0.74);
      tl.to(full, { autoAlpha: 1, duration: 0.2 }, 0.78);
      showCaption(4, 0.84);
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={root}
      aria-label="Introduction"
      className="relative bg-ink text-on-dark"
      style={{ height: "320vh" }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden bg-ink">
        {/* subtle plaster grain on charcoal */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 10%, #fff 0, transparent 40%), radial-gradient(circle at 80% 90%, #b9834a 0, transparent 45%)",
          }}
        />

        <div className="container grid flex-1 grid-rows-[auto_1fr] items-center gap-6 pt-[88px] pb-6 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:grid-rows-1 md:gap-10 md:pb-10">
          {/* Copy */}
          <div className="relative z-10 max-w-[34rem]">
            <p className="intro eyebrow text-on-dark-muted" style={{ animationDelay: "0ms" }}>Carpentry &amp; joinery · {site.area}</p>
            <h1 className="intro-settle display mt-4 text-[clamp(2.4rem,7.5vw,5.2rem)]" style={{ animationDelay: "80ms" }}>
              Bespoke carpentry for the spaces{" "}
              <span className="display-italic text-oak">off-the-shelf</span> can&apos;t reach.
            </h1>
            <p className="intro lede mt-5 hidden text-on-dark-muted md:block" style={{ animationDelay: "160ms" }}>{positioning.sub}</p>
            <div className="intro mt-6 flex flex-wrap gap-3 md:mt-8" style={{ animationDelay: "240ms" }}>
              <a href="#contact" className="btn btn-primary">
                {positioning.cta}
              </a>
              <a href="#work" className="btn btn-ghost-dark">
                {positioning.ctaSecondary}
              </a>
            </div>
          </div>

          {/* Stage */}
          <div className="relative flex min-h-0 items-center justify-center">
            <div
              ref={stage}
              className="relative w-full max-w-[min(100%,calc((100svh-200px)*0.905))] md:max-w-[min(100%,calc((100svh-140px)*0.905))]"
              style={{ aspectRatio: `${W} / ${H}` }}
            >
              {/* Final photograph: fades in at the end so the room appears around the unit. */}
              <div data-layer="full" className="layer-hidden absolute inset-0 overflow-hidden rounded-[var(--radius-lg)]">
                {ready ? (
                  <Image
                    src="/hero/full.webp"
                    alt="The finished oak slat media wall: five handleless cupboards, a full-height slat panel and a side tower of shelves"
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : null}
              </div>

              <div data-layer="sketch" className="intro-settle absolute mix-blend-screen" style={{ ...boxStyle(layers.sketch), animationDelay: "120ms" }}>
                <Image src="/hero/sketch.png" alt="" fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-contain" />
              </div>

              <div data-layer="base" className="layer-hidden absolute" style={boxStyle(layers.base)}>
                {ready ? <Image src="/hero/base.webp" alt="" fill sizes="(min-width: 768px) 46vw, 92vw" className="object-cover" /> : null}
              </div>

              <div data-layer="slats" className="layer-hidden absolute" style={boxStyle(layers.slats)}>
                {ready ? <Image src="/hero/slats.webp" alt="" fill sizes="(min-width: 768px) 38vw, 76vw" className="object-cover" /> : null}
              </div>

              <div data-layer="tower" className="layer-hidden absolute" style={boxStyle(layers.tower)}>
                {ready ? <Image src="/hero/tower.webp" alt="" fill sizes="10vw" className="object-cover" /> : null}
              </div>

              <div data-layer="tower-door" className="layer-hidden absolute" style={boxStyle(layers.towerDoor)}>
                {ready ? <Image src="/hero/tower-door.webp" alt="" fill sizes="10vw" className="object-cover" /> : null}
              </div>
            </div>

            {/* Step captions, one at a time, bottom-left of the stage */}
            <ol className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center md:justify-start" aria-hidden>
              {[
                "The drawing, agreed before anything is cut",
                "Base run: five doors, 400 each",
                "Oak slat panel, cable void behind",
                "Tower, with a door that hides the fuse box",
                "Oak slat media wall. Designed, measured, built on site.",
              ].map((t) => (
                <li
                  key={t}
                  data-caption
                  className="eyebrow absolute rounded-full bg-ink/70 px-3 py-2 text-on-dark backdrop-blur-sm"
                >
                  {t}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <p className="eyebrow pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-on-dark-muted md:left-auto md:right-[var(--gutter)] md:translate-x-0">
          Scroll
        </p>
      </div>
    </section>
  );
}
