import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { projects, site, positioning } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { title: p.title, description: p.summary, images: [{ url: p.images[0].src }] },
  };
}

const phaseLabel: Record<string, string> = {
  before: "Before",
  sketch: "The drawing",
  during: "In progress",
  after: "Finished",
  detail: "Detail",
};

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];
  const [lead, ...rest] = p.images;

  return (
    <>
      {/* A dark top band so the fixed nav reads over the first image. */}
      <div id="hero" className="absolute top-0 h-[72px] w-full bg-ink" aria-hidden />
      <Nav />
      <main className="flex-1">
        <article>
          <header className="container pt-[104px] md:pt-[128px]">
            <Link href="/#all-work" className="eyebrow text-muted underline-offset-4 hover:underline">
              ← All work
            </Link>
            <p className="eyebrow mt-6 text-muted">{p.category}</p>
            <h1 className="display mt-3 max-w-[20ch] text-[clamp(2.2rem,6vw,4.4rem)]">{p.title}</h1>
            <p className="lede mt-5 max-w-[60ch] text-ink-2">{p.body}</p>
            {p.prePaint ? <p className="mt-3 text-sm text-muted">Photographed before decoration.</p> : null}
          </header>

          <Reveal className="container mt-10 md:mt-14">
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] bg-bg-deep sm:aspect-[4/3]">
                <Photo src={lead.src} alt={lead.alt} fill priority sizes="(min-width: 1440px) 1344px, 100vw" className="object-cover" />
              </div>
              <figcaption className="mt-3 text-sm text-muted">
                <span className="eyebrow mr-2 text-faint">{phaseLabel[lead.phase]}</span>
                {lead.caption}
              </figcaption>
            </figure>
          </Reveal>

          {rest.length ? (
            <Reveal stagger="[data-fig]" as="ul" className="container mt-6 grid gap-6 sm:grid-cols-2 md:mt-8">
              {rest.map((im) => (
                <li key={im.src} data-fig>
                  <figure>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] bg-bg-deep">
                      <Photo src={im.src} alt={im.alt} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
                    </div>
                    <figcaption className="mt-3 text-sm text-muted">
                      <span className="eyebrow mr-2 text-faint">{phaseLabel[im.phase]}</span>
                      {im.caption}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </Reveal>
          ) : null}

          {p.original ? (
            <p className="container mt-12 max-w-[60ch] text-sm text-muted">
              In Antony&apos;s words: “{p.original}”
            </p>
          ) : null}
        </article>

        <section className="container mt-20 grid gap-6 border-t border-line py-14 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <p className="eyebrow text-muted">Something like this?</p>
            <p className="display mt-2 text-[clamp(1.6rem,3.4vw,2.6rem)]">Tell me about your space.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/#contact" className="btn btn-primary">
                {positioning.cta}
              </Link>
              <a href={site.phoneHref} className="btn btn-ghost">
                {site.phone}
              </a>
            </div>
          </div>
          <Link href={`/work/${next.slug}`} className="group flex items-center gap-5 rounded-[var(--radius-lg)] border border-line bg-surface p-4">
            <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-[var(--radius)]">
              <Photo src={next.images[0].src} alt="" fill sizes="128px" className="object-cover" />
            </div>
            <div>
              <p className="eyebrow text-muted">Next job</p>
              <p className="mt-1 font-semibold leading-snug group-hover:underline underline-offset-4">{next.title}</p>
            </div>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
