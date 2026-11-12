import Reveal from "@/components/Reveal";
import { reviews, site } from "@/lib/site";

/** Three Facebook recommendations straight after the hero. */
export default function TrustStrip() {
  return (
    <section aria-labelledby="trust-heading" className="border-b border-line bg-bg">
      <Reveal stagger="[data-item]" className="container py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4" data-item>
          <h2 id="trust-heading" className="eyebrow text-muted">
            What customers say
          </h2>
          <p className="text-sm text-muted">
            Recommended on{" "}
            <a href={site.facebook} className="underline underline-offset-4 hover:text-ink" rel="noopener">
              Facebook
            </a>
          </p>
        </div>
        <ul className="mt-8 grid gap-5 md:grid-cols-3 md:gap-6">
          {reviews.map((r) => (
            <li key={r.name} data-item className="flex flex-col rounded-[var(--radius-lg)] border border-line bg-surface p-6 md:p-7">
              <p className="display text-[1.25rem] leading-snug text-ink-2 md:text-[1.4rem]">“{r.text}”</p>
              <p className="mt-auto pt-5 text-sm text-muted">
                <span className="font-medium text-ink">{r.name}</span> · {r.date}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
