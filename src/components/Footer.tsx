import { site, footer, navLinks } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink text-on-dark">
      <div className="container grid gap-10 py-14 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] md:py-20">
        <div>
          <p className="display text-2xl">Antony Williams</p>
          <p className="eyebrow mt-1 text-on-dark-muted">Carpentry &amp; Joinery</p>
          <p className="mt-6 max-w-[40ch] text-on-dark-muted">{footer.line}</p>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow text-on-dark-muted">Site</p>
          <ul className="mt-3 space-y-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={`/${l.href}`} className="underline-offset-4 hover:underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="eyebrow text-on-dark-muted">Contact</p>
          <ul className="mt-3 space-y-2">
            <li>
              <a href={site.phoneHref} className="underline-offset-4 hover:underline">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="break-all underline-offset-4 hover:underline">
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.facebook} rel="noopener" className="underline-offset-4 hover:underline">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-dark-line">
        <p className="container py-5 text-xs text-on-dark-muted">{footer.legal}</p>
      </div>
    </footer>
  );
}
