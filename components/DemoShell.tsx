"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/data";
import ChatPanel from "./ChatPanel";
import { BoltIcon, CheckIcon } from "./Icons";

export type DemoTenant = {
  slug: string;
  name: string;
  short_name: string;
  site: string;
  description: string;
  industry: string;
  languages: string[];
  accent: string;
  starters: string[];
  welcome: string;
  disclaimer: string;
};

const inputCls =
  "w-full rounded-xl border border-line bg-ink px-3.5 py-2.5 text-sm text-snow placeholder:text-fog/60 focus:border-violet/50 focus:outline-none";

export default function DemoShell({ tenant }: { tenant: DemoTenant }) {
  const endpoint = `/api/demo/${tenant.slug}/chat`;

  // Wake the backend as soon as the page loads (Render free tier naps).
  useEffect(() => {
    fetch(endpoint).catch(() => {});
  }, [endpoint]);

  const host = tenant.site.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <main className="relative min-h-screen px-5 pb-16 pt-8">
      <div className="bg-grid absolute inset-0 -z-10" />
      <div className="orb left-[10%] top-[-10%] h-[420px] w-[420px] bg-violet/20" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Top bar */}
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-full text-ink"
              style={{ background: tenant.accent }}
            >
              <BoltIcon className="h-4 w-4" />
            </span>
            <div>
              <p className="font-display text-lg font-bold leading-tight">{tenant.name}</p>
              <p className="text-xs text-fog">
                AI assistant · demo · trained on{" "}
                <a href={tenant.site} target="_blank" rel="noreferrer" className="text-snow/80 underline-offset-2 hover:underline">
                  {host}
                </a>
              </p>
            </div>
          </div>
          <span className="rounded-full border border-line bg-mist px-3 py-1 text-xs text-fog">
            Demo built by{" "}
            <a href={site.url} className="text-snow/90 hover:underline" target="_blank" rel="noreferrer">
              {site.name}
            </a>
          </span>
        </header>

        {/* Disclaimer */}
        <p className="mt-6 rounded-xl border border-line bg-mist px-4 py-3 text-xs leading-relaxed text-fog">
          {tenant.disclaimer}
        </p>

        <div className="mt-6 grid items-start gap-8 lg:grid-cols-[1.25fr_1fr]">
          {/* Chat */}
          <div className="relative flex h-[min(40rem,calc(100vh-14rem))] min-h-[28rem] flex-col overflow-hidden rounded-2xl border border-line bg-ink-soft shadow-2xl shadow-black/50">
            <ChatPanel
              endpoint={endpoint}
              title={`${tenant.short_name} assistant`}
              subtitle={
                tenant.languages.length > 1
                  ? `Answers from ${host} · ${tenant.languages.map((l) => l.toUpperCase()).join(" / ")}`
                  : `Answers from ${host}, with sources`
              }
              welcome={tenant.welcome}
              starters={tenant.starters}
              errorReply="I couldn't reach the assistant just now — please try again in a moment, or use the contact details on the website."
              placeholder={`Ask about ${tenant.short_name}…`}
              accent={tenant.accent}
            />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="card p-5">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet">What this is</p>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-fog">
                {[
                  `Answers visitors' questions from ${tenant.short_name}'s own website — every answer links to the page it came from.`,
                  "General information only. It never gives advice on a visitor's own situation; it points them to a consultation instead.",
                  "Captures name, contact details and the matter so the firm gets a warm lead instead of a missed call — 24/7.",
                  "No client data involved. Runs on the firm's own API keys when it goes live.",
                ].map((line) => (
                  <li key={line} className="flex gap-2.5">
                    <CheckIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-cyan" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <LeadForm tenant={tenant} />

            <p className="px-1 text-xs leading-relaxed text-fog/80">
              This demo was built by{" "}
              <a href={site.url} className="text-snow/90 hover:underline" target="_blank" rel="noreferrer">
                {site.name}
              </a>
              , an AI engineer who builds production RAG and LLM systems. Questions about it →{" "}
              <a href={`mailto:${site.email}`} className="text-snow/90 hover:underline">
                {site.email}
              </a>
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}

// Lead capture: posts to the existing /api/contact relay (Web3Forms → Ansh's
// inbox, tagged with the demo). When a firm goes live, the same form points at
// the firm's own inbox.
function LeadForm({ tenant }: { tenant: DemoTenant }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const phone = String(fd.get("phone") ?? "").trim();
    const need = String(fd.get("message") ?? "").trim();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          company: fd.get("company"), // honeypot
          topic: `Demo lead — ${tenant.name}`,
          message: `${need}\n\nPhone: ${phone || "—"}\nDemo: ${tenant.slug} (${tenant.site})`,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Could not send");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not send");
    }
  }

  return (
    <form onSubmit={onSubmit} className="card p-5">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet">Leave your details</p>
      <p className="mt-2 text-xs text-fog">
        In the live version this goes straight to {tenant.short_name}. In the demo it goes to the builder.
      </p>
      <div className="mt-4 space-y-3">
        <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        <input name="name" required maxLength={120} placeholder="Your name" className={inputCls} />
        <input name="email" type="email" required maxLength={200} placeholder="Email" className={inputCls} />
        <input name="phone" maxLength={40} placeholder="Phone (optional)" className={inputCls} />
        <textarea
          name="message"
          required
          maxLength={2000}
          rows={3}
          placeholder="What do you need help with?"
          className={inputCls}
        />
        <button
          type="submit"
          disabled={status === "sending" || status === "sent"}
          className="w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
          style={{ background: tenant.accent }}
        >
          {status === "sending" ? "Sending…" : status === "sent" ? "Sent — the firm will follow up" : "Send"}
        </button>
        {status === "error" && <p className="text-xs text-red-400">{error}</p>}
      </div>
    </form>
  );
}
