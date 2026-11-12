import Image from "next/image";
import {
  site,
  positioning,
  about,
  services,
  steps,
  projects,
  reviews,
  contact,
  footer,
} from "@/lib/site";

/**
 * Stage 1: copy review page.
 * Renders every piece of site copy plainly, with thumbnails, so the wording can be
 * reviewed in a browser before any design work. Replaced wholesale in stage 2.
 */

function Todo({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded bg-todo/10 px-2 py-0.5 text-sm font-medium text-todo">
      TODO: {children}
    </span>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-20 mb-6 text-3xl font-semibold tracking-tight">{children}</h2>;
}

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16">
      <p className="mb-2 text-sm uppercase tracking-widest text-muted">Copy review · stage 1 of 5</p>
      <h1 className="text-4xl font-semibold tracking-tight">{site.name}</h1>
      <p className="mt-2 text-muted">
        {site.phone} · {site.email}
      </p>

      <H2>Hero</H2>
      <p className="text-4xl font-semibold leading-tight tracking-tight">{positioning.headline}</p>
      <p className="mt-4 text-lg text-muted">{positioning.sub}</p>
      <p className="mt-4 text-sm text-muted">
        Buttons: <strong>{positioning.cta}</strong> / {positioning.ctaSecondary} · Strap: {positioning.strap}
      </p>

      <H2>Reviews (trust strip)</H2>
      <ul className="space-y-4">
        {reviews.map((r) => (
          <li key={r.name} className="rounded-lg border border-line bg-surface p-4">
            <p className="text-lg leading-snug">“{r.text}”</p>
            <p className="mt-2 text-sm text-muted">
              {r.name} · {r.date} · {r.source}
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-muted">
        <Todo>confirm first name + initial is OK, or get permission for full names.</Todo>
      </p>

      <H2>Services</H2>
      <ul className="space-y-6">
        {services.map((s) => (
          <li key={s.id}>
            <h3 className="text-xl font-semibold">{s.name}</h3>
            <p className="text-muted">{s.short}</p>
            <p className="mt-1">{s.detail}</p>
          </li>
        ))}
      </ul>

      <H2>How it works</H2>
      <ol className="space-y-4">
        {steps.map((p) => (
          <li key={p.n} className="flex gap-4">
            <span className="font-mono text-muted">{p.n}</span>
            <div>
              <h3 className="font-semibold">{p.title}</h3>
              <p>{p.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-sm">
        <Todo>confirm whether Antony paints/finishes or hands over for decoration.</Todo>
      </p>

      <H2>About</H2>
      <h3 className="text-2xl font-semibold leading-snug">{about.heading}</h3>
      {about.paragraphs.map((p) => (
        <p key={p.slice(0, 24)} className="mt-4 text-lg leading-relaxed">
          {p}
        </p>
      ))}
      <p className="mt-3 text-sm">
        <Todo>area covered, years trading, anything else worth stating.</Todo>
      </p>

      <H2>Projects</H2>
      <div className="space-y-14">
        {projects.map((p) => (
          <article key={p.slug} id={p.slug}>
            <p className="text-sm uppercase tracking-widest text-muted">
              {p.category}
              {p.featured ? " · featured on home page" : ""}
            </p>
            <h3 className="mt-1 text-2xl font-semibold leading-snug">{p.title}</h3>
            <p className="mt-1 text-muted">{p.summary}</p>
            <p className="mt-3 leading-relaxed">{p.body}</p>
            {p.original ? (
              <p className="mt-2 text-sm text-muted">Antony&apos;s caption: “{p.original}”</p>
            ) : null}
            {p.prePaint ? (
              <p className="mt-2 text-sm text-muted">Photographed before decoration.</p>
            ) : null}
            {p.todo ? (
              <p className="mt-2 text-sm">
                <Todo>{p.todo}</Todo>
              </p>
            ) : null}
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {p.images.map((im) => (
                <li key={im.src}>
                  <Image
                    src={im.src}
                    alt={im.alt}
                    width={400}
                    height={400}
                    sizes="(min-width: 640px) 180px, 45vw"
                    className="aspect-square w-full rounded object-cover"
                  />
                  <p className="mt-1 text-xs text-muted">
                    <span className="uppercase">{im.phase}</span> · {im.caption}
                  </p>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <H2>Enquiry form</H2>
      <p className="text-2xl font-semibold">{contact.heading}</p>
      <p className="mt-1 text-muted">{contact.sub}</p>
      <ul className="mt-4 list-disc pl-5 text-sm">
        {Object.values(contact.fields).map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <p className="mt-2 text-sm text-muted">Job types: {contact.types.join(" · ")}</p>
      <p className="mt-2 text-sm text-muted">
        Button: {contact.submit} · Success: “{contact.success}”
      </p>

      <H2>Footer</H2>
      <p>{footer.line}</p>
      <p className="text-sm text-muted">{footer.legal}</p>
    </main>
  );
}
