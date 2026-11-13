import Reveal from "@/components/Reveal";
import Photo from "@/components/Photo";
import { reviews, site } from "@/lib/site";

/** Three Facebook recommendations straight after the hero, as frosted glass over a blurred still from the film. */
export default function TrustStrip() {
  return (
    <section aria-labelledby="trust-heading" className="relative overflow-hidden bg-ink text-on-dark">
      {/* Backdrop: the film's first frame, blurred and dimmed, with a warm oak glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Photo src="/hero/film-poster.jpg" alt="" fill sizes="100vw" quality={60} className="scale-110 object-cover opacity-80 blur-2xl saturate-[1.1]" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(50% 70% at 15% 25%, rgba(185,131,74,0.45) 0%, rgba(26,22,18,0) 60%), radial-gradient(45% 60% at 85% 80%, rgba(245,241,234,0.22) 0%, rgba(26,22,18,0) 60%), linear-gradient(180deg, rgba(26,22,18,0.35) 0%, rgba(26,22,18,0.6) 100%)" }} />
      </div>

      <Reveal stagger="[data-item]" className="container relative py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4" data-item>
          <h2 id="trust-heading" className="eyebrow text-on-dark-muted">
            What customers say
          </h2>
          <p className="text-sm text-on-dark-muted">
            Recommended on{" "}
            <a href={site.facebook} className="underline underline-offset-4 hover:text-on-dark" rel="noopener">
              Facebook
            </a>
          </p>
        </div>
        <ul className="mt-8 grid gap-5 md:grid-cols-3 md:gap-6">
          {reviews.map((r) => (
            <li key={r.name} data-item className="glass flex flex-col rounded-[var(--radius-lg)] p-6 md:p-7">
              <span aria-hidden className="display text-oak text-4xl leading-none">“</span>
              <p className="display mt-1 text-[1.25rem] leading-snug text-on-dark md:text-[1.4rem]">{r.text}</p>
              <p className="mt-auto pt-5 text-sm text-on-dark-muted">
                <span className="font-medium text-on-dark">{r.name}</span> · {r.date}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
