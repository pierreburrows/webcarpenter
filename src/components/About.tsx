import Reveal from "@/components/Reveal";
import Photo from "@/components/Photo";
import { about } from "@/lib/site";

/** About, in Antony's voice. The photo is him at work: a sash glued up on the drive. */
export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-bg-deep">
      <Reveal stagger="[data-item]" className="container grid gap-10 py-20 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:items-center md:gap-16 md:py-28">
        <div data-item className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] md:order-2">
          <Photo
            src="/img/projects/oast-house-sash/04-sash-in-clamps-on-site.jpg"
            alt="A hardwood sash glued up in clamps on a site bench, made to match an oast house porch"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="md:order-1">
          <p data-item className="eyebrow text-muted">
            About
          </p>
          <h2 data-item id="about-heading" className="display mt-3 text-[clamp(2rem,4.6vw,3.3rem)]">
            {about.heading}
          </h2>
          {about.paragraphs.map((p) => (
            <p key={p.slice(0, 24)} data-item className="mt-5 text-[1.05rem] leading-relaxed text-ink-2">
              {p}
            </p>
          ))}
          <dl data-item className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
            {about.facts.map((f) => (
              <div key={f.label}>
                <dt className="eyebrow text-muted">{f.label}</dt>
                <dd className="mt-1 text-sm font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
