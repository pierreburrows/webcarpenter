"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Photo from "@/components/Photo";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/site";

const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

/** Every job, filterable by category. Each card opens its own page. */
export default function ProjectGrid() {
  const [cat, setCat] = useState("All");
  const list = useMemo(() => (cat === "All" ? projects : projects.filter((p) => p.category === cat)), [cat]);

  return (
    <section id="all-work" aria-labelledby="grid-heading" className="bg-bg">
      <div className="container py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-muted">All work</p>
            <h2 id="grid-heading" className="display mt-3 text-[clamp(2rem,5vw,3.6rem)]">
              {projects.length} jobs, {projects.reduce((n, p) => n + p.images.length, 0)} photos.
            </h2>
          </div>
          <div role="group" aria-label="Filter by type" className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCat(c)}
                aria-pressed={cat === c}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  cat === c ? "bg-ink text-on-dark" : "bg-bg-deep text-ink hover:bg-line"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <Reveal key={cat} stagger="[data-card]" as="ul" className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 md:mt-14">
          {list.map((p) => {
            const img = p.images[0];
            return (
              <li key={p.slug} data-card>
                <Link href={`/work/${p.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] bg-bg-deep">
                    <Photo
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-wider text-on-dark backdrop-blur-sm">
                      {p.images.length} photo{p.images.length === 1 ? "" : "s"}
                    </span>
                  </div>
                  <p className="eyebrow mt-4 text-muted">{p.category}</p>
                  <h3 className="mt-1 text-lg font-semibold leading-snug group-hover:underline underline-offset-4">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted">{p.summary}</p>
                </Link>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
