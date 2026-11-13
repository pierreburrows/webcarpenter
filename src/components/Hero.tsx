"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { positioning, site } from "@/lib/site";
import { useGsapEffect, prefersReducedMotion } from "@/lib/motion";

/*
  Fullscreen film hero. The film is cut from Antony's own finished-work photographs,
  each given a slow camera move, so nothing on screen is something he did not build.

  - A still poster (the first frame) paints immediately and is the LCP.
  - The video source is chosen after mount (1080p on wide screens, 720p on phones),
    skipped entirely for reduced-motion or data-saver users, and fades in over the
    poster once it can play.
  - On scroll the film eases back slightly and the copy lifts away, so the next
    section feels like it slides over the film.
*/

const VIDEO_1080 = "/hero/film-1080.mp4";
const VIDEO_720 = "/hero/film-720.mp4";
const POSTER = "/hero/film-poster.jpg";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (prefersReducedMotion()) return;
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) return;
    // The poster is the first paint. The film only starts loading once the page is idle,
    // so decoding never competes with hydration and first interaction.
    const onCanPlay = () => {
      v.play().then(() => setPlaying(true)).catch(() => {});
    };
    let cancelled = false;
    const start = () => {
      if (cancelled) return;
      v.src = window.innerWidth >= 900 ? VIDEO_1080 : VIDEO_720;
      v.addEventListener("canplay", onCanPlay, { once: true });
      v.load();
    };
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const afterLoad = () => (idle ? idle(start, { timeout: 2500 }) : window.setTimeout(start, 800));
    if (document.readyState === "complete") afterLoad();
    else window.addEventListener("load", afterLoad, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", afterLoad);
      v.removeEventListener("canplay", onCanPlay);
    };
  }, []);

  useGsapEffect(({ gsap }) => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.to("[data-film]", {
        scale: 1.08,
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-copy]", {
        yPercent: -30,
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "70% top", scrub: true },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={root} aria-label="Introduction" className="relative h-[100svh] min-h-[560px] overflow-hidden bg-ink text-on-dark">
      {/* Film */}
      <div data-film className="absolute inset-0 will-change-transform">
        <Image
          src={POSTER}
          alt="Antony Williams' pool house build: black timber cladding, green bifold doors, limestone terrace by the pool"
          fill
          priority
          sizes="100vw"
          quality={75}
          className="object-cover"
        />
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          aria-hidden
          tabIndex={-1}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-out ${playing ? "opacity-100" : "opacity-0"}`}
        />
      </div>

      {/* Grade: a soft vignette so the copy reads and the film keeps its depth */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(26,22,18,0.55) 0%, rgba(26,22,18,0.05) 30%, rgba(26,22,18,0.15) 60%, rgba(26,22,18,0.88) 100%), linear-gradient(90deg, rgba(26,22,18,0.55) 0%, rgba(26,22,18,0) 60%)",
        }}
      />

      {/* Copy */}
      <div data-copy className="container relative flex h-full flex-col justify-end pb-[max(6vh,2.5rem)] pt-[88px]">
        <p className="intro eyebrow text-on-dark-muted" style={{ animationDelay: "120ms" }}>
          Carpentry &amp; joinery · {site.area}
        </p>
        <h1 className="intro-settle display mt-4 max-w-[12ch] text-[clamp(2.6rem,8vw,6.4rem)]">
          Bespoke carpentry for the spaces{" "}
          <span className="display-italic text-oak">off-the-shelf</span> can&apos;t reach.
        </h1>
        <div className="mt-6 flex flex-col gap-6 md:mt-8 md:flex-row md:items-end md:justify-between">
          <p className="intro lede max-w-[46ch] text-on-dark-muted" style={{ animationDelay: "260ms" }}>
            {positioning.sub}
          </p>
          <div className="intro flex flex-wrap gap-3" style={{ animationDelay: "360ms" }}>
            <a href="#contact" className="btn btn-primary">
              {positioning.cta}
            </a>
            <a href="#work" className="btn btn-ghost-dark">
              {positioning.ctaSecondary}
            </a>
          </div>
        </div>
        <p className="intro mt-8 flex items-center gap-3 text-on-dark-muted" style={{ animationDelay: "600ms" }} aria-hidden>
          <span className="eyebrow">Scroll</span>
          <span className="hero-scroll-line block h-px w-10 bg-on-dark-muted" />
        </p>
      </div>
    </section>
  );
}
