import Link from "next/link";
import Reveal from "@/components/Reveal";
import Photo from "@/components/Photo";
import { services, projects } from "@/lib/site";

const bySlug = Object.fromEntries(projects.map((p) => [p.slug, p]));

/** Seven services. Each row carries a thumbnail of a real job that shows it. */
export default function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="bg-bg-deep">
      <Reveal stagger="[data-row]" className="container py-20 md:py-28">
        <div data-row className="max-w-[60ch]">
          <p className="eyebrow text-muted">What I do</p>
          <h2 id="services-heading" className="display mt-3 text-[clamp(2rem,5vw,3.6rem)]">
            If it&apos;s made of wood and has to fit, it&apos;s probably on this list.
          </h2>
        </div>
        <ul className="mt-10 divide-y divide-line border-y border-line md:mt-14">
          {services.map((s) => {
            const example = bySlug[s.projects[0]];
            const thumb = example?.images[0];
            return (
              <li key={s.id} data-row className="grid gap-4 py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_140px] md:items-center md:gap-10 md:py-7">
                <h3 className="text-lg font-semibold leading-snug md:text-xl">{s.name}</h3>
                <div>
                  <p className="text-muted">{s.short}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-2">{s.detail}</p>
                  {example ? (
                    <Link href={`/work/${example.slug}`} className="mt-2 inline-block text-sm font-medium text-oak-deep underline-offset-4 hover:underline">
                      Example: {example.title}
                    </Link>
                  ) : null}
                </div>
                {thumb ? (
                  <Link href={`/work/${example.slug}`} className="relative hidden aspect-square overflow-hidden rounded-[var(--radius)] md:block" aria-hidden tabIndex={-1}>
                    <Photo src={thumb.src} alt="" fill sizes="140px" className="object-cover" />
                  </Link>
                ) : null}
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
