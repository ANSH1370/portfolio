"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/lib/data";
import { SendIcon, CheckIcon, MailIcon } from "./Icons";

const topics = ["Collaboration", "Opportunity", "Question about my work", "Something else"];
const MESSAGE_LIMIT = 4000;

type Status = "idle" | "sending" | "sent" | "error";

// Direct browser → Web3Forms fallback, used when the server route can't reach
// the relay (e.g. a corporate network blocking server-side requests).
async function directRelay(payload: { name: string; email: string; topic: string; message: string }) {
  const key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!key) return false;
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: key,
        subject: `Portfolio contact: ${payload.topic || "New inquiry"} — ${payload.name}`,
        from_name: "Portfolio Contact Form",
        ...payload,
      }),
    });
    const data = await res.json();
    return !!data.success;
  } catch {
    return false;
  }
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState("");
  const [sentTo, setSentTo] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const visitorEmail = String(fd.get("email") ?? "");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: visitorEmail,
          topic,
          message: fd.get("message"),
          company: fd.get("company"), // honeypot
        }),
      });
      const data = await res.json();
      let delivered = !!data.ok;
      if (!delivered && data.fallback) {
        // Server couldn't reach the relay — post directly from the browser
        delivered = await directRelay({
          name: String(fd.get("name") ?? ""),
          email: visitorEmail,
          topic,
          message: String(fd.get("message") ?? ""),
        });
      }
      if (delivered) {
        setSentTo(visitorEmail);
        setStatus("sent");
        setMessage("");
        form.reset();
      } else {
        setStatus("error");
        setError(data.error || `Something went wrong — email ${site.email} directly.`);
      }
    } catch {
      setStatus("error");
      setError(`Connection problem — please email ${site.email} directly.`);
    }
  }

  const inputCls =
    "w-full rounded-xl border border-line bg-mist px-4 py-3 text-sm text-snow placeholder:text-fog/50 outline-none transition-all focus:border-violet/60 focus:ring-2 focus:ring-violet/20";
  const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wider text-fog";

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="card flex h-full min-h-[420px] flex-col items-center justify-center gap-4 p-10 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 18 }}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-violet to-cyan text-ink"
        >
          <CheckIcon className="h-8 w-8" />
        </motion.div>
        <h3 className="font-display text-2xl font-semibold">Message sent!</h3>
        <p className="max-w-sm text-sm leading-relaxed text-fog">
          Thanks for reaching out — it&apos;s already in my inbox.
          {sentTo ? (
            <>
              {" "}I&apos;ll reply to <span className="text-snow">{sentTo}</span> within 24 hours.
            </>
          ) : (
            " I'll reply within 24 hours."
          )}
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-3 rounded-full border border-line bg-mist px-5 py-2 text-sm text-snow transition-colors hover:border-violet/50"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card relative overflow-hidden p-7">
      {/* subtle top accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-violet via-cyan to-transparent" />

      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-mist text-cyan">
          <MailIcon className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-semibold">Send me a message</p>
          <p className="text-xs text-fog">Goes straight to my inbox · I reply within 24 hours</p>
        </div>
      </div>

      {/* honeypot — hidden from humans, tempting for bots */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className={labelCls}>
            Name
          </label>
          <input id="cf-name" name="name" required maxLength={120} placeholder="Your name" className={inputCls} />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelCls}>
            Email
          </label>
          <input
            id="cf-email"
            name="email"
            required
            type="email"
            maxLength={200}
            placeholder="you@company.com"
            className={inputCls}
          />
        </div>
      </div>

      <div className="mt-4">
        <p className={labelCls}>What&apos;s this about?</p>
        <div className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              aria-pressed={topic === t}
              className={`rounded-full border px-3.5 py-1.5 text-xs transition-all ${
                topic === t
                  ? "border-violet/60 bg-violet/15 text-snow shadow-[0_0_12px_rgba(139,92,246,0.15)]"
                  : "border-line bg-mist text-fog hover:border-line hover:text-snow"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="mb-1.5 flex items-baseline justify-between">
          <label htmlFor="cf-message" className={`${labelCls} mb-0`}>
            Message
          </label>
          <span className={`text-[11px] tabular-nums ${message.length > MESSAGE_LIMIT * 0.9 ? "text-red-400" : "text-fog/60"}`}>
            {message.length} / {MESSAGE_LIMIT}
          </span>
        </div>
        <textarea
          id="cf-message"
          name="message"
          required
          maxLength={MESSAGE_LIMIT}
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me about your idea, project, or question — 2-3 sentences is perfect."
          className={`${inputCls} resize-none`}
        />
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-3 rounded-lg border border-red-500/30 bg-red-500/10 px-3.5 py-2.5 text-sm text-red-300"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet to-cyan px-6 py-3.5 text-sm font-semibold text-ink transition-all hover:scale-[1.01] hover:shadow-[0_0_24px_rgba(34,211,238,0.25)] disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink" />
            Sending...
          </>
        ) : (
          <>
            <SendIcon />
            Send message
          </>
        )}
      </button>

    </form>
  );
}
