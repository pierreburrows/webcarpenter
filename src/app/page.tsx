import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import { reviews, site } from "@/lib/site";

export default function Page() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />

        {/* Stage 3 begins here. A plain trust strip so the hero has somewhere to land. */}
        <section id="work" className="container py-20 md:py-28">
          <p className="eyebrow text-muted">What customers say</p>
          <ul className="mt-6 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <li key={r.name} className="rounded-[var(--radius-lg)] border border-line bg-surface p-6">
                <p className="display text-[1.35rem] leading-snug">“{r.text}”</p>
                <p className="mt-4 text-sm text-muted">
                  {r.name} · {r.date} · {r.source}
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-muted">
            Remaining sections follow in stage 3. Copy review is at /copy. {site.phone}.
          </p>
        </section>
        <div id="services" /><div id="process" /><div id="about" /><div id="contact" />
      </main>
    </>
  );
}
