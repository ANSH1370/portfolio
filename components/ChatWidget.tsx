"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/lib/data";
import { ChatIcon, CloseIcon, SendIcon, BoltIcon } from "./Icons";

// Live chat over the phase-2 RAG assistant (ansh-ai-assistant on Render),
// proxied through /api/chat which falls back to Anthropic/FAQ modes if the
// backend is unreachable — so the widget always answers something.

const starterQuestions = [
  "What did Ansh build at Commercient?",
  "How did he reach 150+ tokens/sec on vLLM?",
  "Which of his projects use RAG?",
  "How can I get in touch with him?",
];

type Citation = { title: string; url: string };
type Msg = { role: "user" | "assistant"; content: string; citations?: Citation[] };

const WELCOME: Msg = {
  role: "assistant",
  content:
    "Hi! I'm Ansh's AI assistant — a RAG system he built himself. Ask me about his projects, experience, or skills, and I'll answer from his actual work.",
};

const ERROR_REPLY = `Hmm, I couldn't reach my brain just now — please try again in a moment, or message Ansh directly at ${site.email}.`;

const MAX_INPUT_CHARS = 1000; // matches the API's per-message cap

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const warmedUp = useRef(false);

  // Wake the RAG backend (Render free tier cold-starts) while the visitor types.
  useEffect(() => {
    if (open && !warmedUp.current) {
      warmedUp.current = true;
      fetch("/api/chat").catch(() => {});
    }
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

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
    try {
      const res = await fetch("/api/chat", {
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
      setMessages((m) => [...m, { role: "assistant", content: ERROR_REPLY }]);
    } finally {
      setSending(false);
    }
  }

  const showStarters = messages.length === 1 && !sending;

  return (
    <>
      {/* Launcher */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Chat with Ansh's AI assistant"}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-violet to-cyan text-ink shadow-lg shadow-violet/25 transition-transform hover:scale-105"
      >
        {open ? <CloseIcon /> : <ChatIcon />}
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-70" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan" />
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-5 z-50 flex max-h-[min(34rem,calc(100vh-8rem))] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-line bg-ink-soft shadow-2xl shadow-black/50"
          >
            {/* glow */}
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-violet/25 blur-3xl" />

            {/* Header */}
            <div className="relative flex items-center gap-3 border-b border-line bg-mist px-4 py-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-violet to-cyan text-ink">
                <BoltIcon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Ansh&apos;s AI Assistant</p>
                <p className="text-xs text-fog">RAG-powered · answers cite his real work</p>
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
                        ? "max-w-[85%] rounded-2xl rounded-br-sm bg-gradient-to-r from-violet to-cyan px-3.5 py-2.5 text-sm font-medium leading-relaxed text-ink"
                        : "max-w-[85%] rounded-2xl rounded-bl-sm border border-line bg-ink px-3.5 py-2.5 text-sm leading-relaxed text-snow/90"
                    }
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
                <div className="flex justify-start">
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
                </div>
              )}

              {showStarters && (
                <div className="space-y-1.5 pt-1">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-fog/70">
                    Try asking
                  </p>
                  {starterQuestions.map((q) => (
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
                placeholder="Ask about Ansh's work…"
                aria-label="Your question"
                className="flex-1 rounded-xl border border-line bg-ink px-3.5 py-2.5 text-sm text-snow placeholder:text-fog/60 focus:border-violet/50 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || sending}
                aria-label="Send"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-violet to-cyan text-ink transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100"
              >
                <SendIcon className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
