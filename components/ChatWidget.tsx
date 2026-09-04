"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { site } from "@/lib/data";
import { ChatIcon, CloseIcon } from "./Icons";
import ChatPanel from "./ChatPanel";

// Floating launcher for the portfolio's own assistant (the phase-2 RAG
// service on Render, proxied through /api/chat which falls back to
// Anthropic/FAQ modes if the backend is unreachable — so it always answers).
// The chat surface lives in ChatPanel so /demo/[slug] pages can reuse it.

const starterQuestions = [
  "How was this chatbot built?",
  "What did Ansh build at Commercient?",
  "Can Ansh build something like this for my business?",
  "How do I get in touch with him?",
];

const WELCOME =
  "Hi! I'm Ansh's AI assistant — a RAG system he built himself. Ask me about his projects, experience, or skills, and I'll answer from his actual work.";

const ERROR_REPLY = `Hmm, I couldn't reach my brain just now — please try again in a moment, or message Ansh directly at ${site.email}.`;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  // Wake the RAG backend (Render free tier cold-starts in ~30-50s) as soon as
  // the page loads — not when the widget opens — so it's usually ready by the
  // time a visitor asks their first question.
  useEffect(() => {
    fetch("/api/chat").catch(() => {});
  }, []);

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
            <ChatPanel
              endpoint="/api/chat"
              title="Ansh's AI Assistant"
              subtitle="RAG-powered · answers cite his real work"
              welcome={WELCOME}
              starters={starterQuestions}
              errorReply={ERROR_REPLY}
              placeholder="Ask about Ansh's work…"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
