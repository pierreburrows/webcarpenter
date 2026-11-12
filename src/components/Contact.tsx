"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { contact, site } from "@/lib/site";

type State = "idle" | "sending" | "sent" | "logged" | "error";

/** The enquiry form. Posts multipart to /api/enquiry so a photo can come with it. */
export default function Contact() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/enquiry", { method: "POST", body: new FormData(form) });
      const json = (await res.json()) as { ok: boolean; delivered?: boolean; error?: string };
      if (!res.ok || !json.ok) {
        setError(json.error || contact.fallback);
        setState("error");
        return;
      }
      setState(json.delivered ? "sent" : "logged");
      form.reset();
    } catch {
      setError(contact.fallback);
      setState("error");
    }
  }

  const f = contact.fields;
  const field = "mt-1 w-full rounded-[var(--radius)] border border-line-strong bg-surface px-3.5 py-3 text-ink placeholder:text-faint focus:border-oak";

  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-bg">
      <Reveal stagger="[data-item]" className="container grid gap-10 py-20 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-16 md:py-28">
        <div>
          <p data-item className="eyebrow text-muted">
            Get a quote
          </p>
          <h2 data-item id="contact-heading" className="display mt-3 text-[clamp(2rem,5vw,3.6rem)]">
            {contact.heading}
          </h2>
          <p data-item className="lede mt-4 text-muted">
            {contact.sub}
          </p>
          <ul data-item className="mt-8 space-y-3 text-lg">
            <li>
              <a href={site.phoneHref} className="font-medium underline-offset-4 hover:underline">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="font-medium underline-offset-4 hover:underline">
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <form data-item onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2" noValidate>
          {/* Honeypot */}
          <div className="hidden" aria-hidden>
            <label>
              Website <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <label className="block text-sm font-medium">
            {f.name}
            <input name="name" required autoComplete="name" className={field} />
          </label>
          <label className="block text-sm font-medium">
            {f.phone}
            <input name="phone" required autoComplete="tel" inputMode="tel" className={field} />
          </label>
          <label className="block text-sm font-medium">
            {f.email}
            <input name="email" type="email" required autoComplete="email" className={field} />
          </label>
          <label className="block text-sm font-medium">
            {f.postcode}
            <input name="postcode" autoComplete="postal-code" className={field} />
          </label>
          <label className="block text-sm font-medium sm:col-span-2">
            {f.type}
            <select name="type" className={field} defaultValue="">
              <option value="" disabled>
                Choose one
              </option>
              {contact.types.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium sm:col-span-2">
            {f.message}
            <textarea name="message" rows={5} className={field} />
          </label>
          <label className="block text-sm font-medium sm:col-span-2">
            {f.photo}
            <input name="photo" type="file" accept="image/*" className={`${field} file:mr-3 file:rounded-full file:border-0 file:bg-bg-deep file:px-3 file:py-1.5 file:text-sm`} />
          </label>
          <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
            <button type="submit" disabled={state === "sending"} className="btn btn-primary disabled:opacity-60">
              {state === "sending" ? "Sending…" : contact.submit}
            </button>
            <p role="status" aria-live="polite" className="text-sm text-muted">
              {state === "sent" && contact.success}
              {state === "logged" && "Thanks. Your enquiry was received. If you don't hear back within a day, please call."}
              {state === "error" && <span className="text-[var(--todo,#b3261e)]">{error}</span>}
            </p>
          </div>
        </form>
      </Reveal>
    </section>
  );
}
