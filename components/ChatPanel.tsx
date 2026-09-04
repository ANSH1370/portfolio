"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { BoltIcon, SendIcon } from "./Icons";

// The chat surface itself — header, messages, starter questions, input — with
// no positioning of its own. The portfolio's floating ChatWidget wraps it in a
// fixed panel; /demo/[slug] pages render it inline for a client's assistant.
// Each instance talks to its own endpoint, so demos never share state or
// data with the portfolio assistant.

export type Citation = { title: string; url: string };
export type Msg = { role: "user" | "assistant"; content: string; citations?: Citation[] };

export type ChatPanelProps = {
  endpoint: string; // e.g. "/api/chat" or "/api/demo/<slug>/chat"
  title: string;
  subtitle: string;
  welcome: string;
  starters: string[];
  errorReply: string;
  placeholder?: string;
  accent?: string; // hex colour for demos; omit for the portfolio gradient
  autoFocus?: boolean;
};

const MAX_INPUT_CHARS = 1000; // matches the API's per-message cap
const SLOW_HINT_AFTER_MS = 6_000; // free-tier backend may be waking up

export default function ChatPanel({
  endpoint,
  title,
  subtitle,
  welcome,
  starters,
  errorReply,
  placeholder = "Ask a question…",
  accent,
  autoFocus = true,
}: ChatPanelProps) {
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", content: welcome }]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [slow, setSlow] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  async function send(text: string) {
    const content = text.trim().slice(0, MAX_INPUT_CHARS);
    if (!content || sending) return;
    const next: Msg[] = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setSending(true);
    setSlow(false);
    const slowTimer = setTimeout(() => setSlow(true), SLOW_HINT_AFTER_MS);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Drop the canned welcome; the API caps history at 12 messages anyway.
          messages: next.slice(1).slice(-12).map(({ role, content }) => ({ role, content })),
        }),
      });
      if (!res.ok) throw new Error(`API ${res.status}`);
      const data = await res.json();
      if (typeof data?.reply !== "string" || !data.reply) throw new Error("empty reply");
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply, citations: data.citations ?? [] },
      ]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", content: errorReply }]);
    } finally {
      clearTimeout(slowTimer);
      setSlow(false);
      setSending(false);
    }
  }

  const showStarters = messages.length === 1 && !sending;
  const accentStyle = accent ? { background: accent } : undefined;
  const gradient = accent ? "" : "bg-gradient-to-r from-violet to-cyan";

  return (
    <>
      {/* glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-violet/25 blur-3xl" />

      {/* Header */}
      <div className="relative flex items-center gap-3 border-b border-line bg-mist px-4 py-3.5">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-full text-ink ${gradient}`}
          style={accentStyle}
        >
          <BoltIcon className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{title}</p>
          <p className="truncate text-xs text-fog">{subtitle}</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-cyan/40 bg-cyan/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-cyan">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
          Live
        </span>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="relative flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={
                m.role === "user"
                  ? `max-w-[85%] rounded-2xl rounded-br-sm px-3.5 py-2.5 text-sm font-medium leading-relaxed text-ink ${gradient}`
                  : "max-w-[85%] rounded-2xl rounded-bl-sm border border-line bg-ink px-3.5 py-2.5 text-sm leading-relaxed text-snow/90"
              }
              style={m.role === "user" ? accentStyle : undefined}
            >
              <p className="whitespace-pre-wrap">{m.content}</p>
              {m.citations && m.citations.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5 border-t border-line pt-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-fog/70">
                    Sources
                  </span>
                  {m.citations.map((c) => (
                    <a
                      key={c.url}
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-violet/40 bg-violet/10 px-2 py-0.5 text-[10px] font-medium text-violet transition-colors hover:bg-violet/20"
                    >
                      {c.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {sending && (
          <div className="flex flex-col items-start gap-1.5">
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-line bg-ink px-3.5 py-3">
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="h-1.5 w-1.5 rounded-full bg-fog"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                />
              ))}
            </div>
            {slow && (
              <p className="px-1 text-[11px] text-fog/70">
                Waking up the assistant — usually under 30 s. Real answer with sources coming.
              </p>
            )}
          </div>
        )}

        {showStarters && (
          <div className="space-y-1.5 pt-1">
            <p className="font-mono text-[10px] uppercase tracking-wider text-fog/70">Try asking</p>
            {starters.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="block w-full rounded-xl border border-line bg-ink px-3 py-2 text-left text-xs text-snow/85 transition-colors hover:border-violet/40 hover:bg-mist"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="relative flex items-center gap-2 border-t border-line bg-mist p-3"
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={MAX_INPUT_CHARS}
          placeholder={placeholder}
          aria-label="Your question"
          className="flex-1 rounded-xl border border-line bg-ink px-3.5 py-2.5 text-sm text-snow placeholder:text-fog/60 focus:border-violet/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!input.trim() || sending}
          aria-label="Send"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-ink transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 ${gradient}`}
          style={accentStyle}
        >
          <SendIcon className="h-4 w-4" />
        </button>
      </form>
    </>
  );
}
