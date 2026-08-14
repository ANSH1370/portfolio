"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChatIcon, CloseIcon, CheckIcon, BoltIcon } from "./Icons";

// Coming-soon teaser for the phase-2 RAG assistant.
// Cycles through questions visitors will be able to ask once it's live.
const teaserQuestions = [
  "What did Ansh build at Commercient?",
  "How did he reach 150+ tokens/sec on vLLM?",
  "Which of his projects use RAG?",
  "What's his experience with LangGraph agents?",
  "How does his price-prediction pipeline work?",
];

const features = [
  "Knows my real projects & experience",
  "Answers backed by the actual work",
  "Built with the same tech I ship daily",
];

function useTypewriter(phrases: string[]) {
  const [text, setText] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);

  useEffect(() => {
    const phrase = phrases[phraseIdx % phrases.length];
    let i = 0;
    let deleting = false;
    const tick = () => {
      if (!deleting) {
        i++;
        setText(phrase.slice(0, i));
        if (i === phrase.length) {
          deleting = true;
          timer = setTimeout(tick, 1800); // hold the full question
          return;
        }
        timer = setTimeout(tick, 38);
      } else {
        i -= 3;
        if (i <= 0) {
          setText("");
          setPhraseIdx((p) => p + 1);
          return;
        }
        setText(phrase.slice(0, i));
        timer = setTimeout(tick, 14);
      }
    };
    let timer = setTimeout(tick, 300);
    return () => clearTimeout(timer);
  }, [phraseIdx, phrases]);

  return text;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const typed = useTypewriter(teaserQuestions);

  function goToContact() {
    setOpen(false);
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      {/* Launcher */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close" : "AI assistant — coming soon"}
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
            className="fixed bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden rounded-2xl border border-line bg-ink-soft shadow-2xl shadow-black/50"
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
                <p className="text-xs text-fog">An AI that knows my work inside out</p>
              </div>
              <span className="rounded-full border border-cyan/40 bg-cyan/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-cyan">
                Coming soon
              </span>
            </div>

            {/* Body */}
            <div className="relative space-y-5 p-5">
              {/* typewriter preview */}
              <div className="rounded-xl border border-line bg-ink p-4">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-fog/70">
                  Soon you&apos;ll ask me things like
                </p>
                <p className="min-h-[44px] text-sm font-medium leading-snug text-snow">
                  {typed}
                  <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-cyan align-middle" />
                </p>
              </div>

              <p className="text-sm leading-relaxed text-fog">
                I&apos;m being trained on Ansh&apos;s projects, experience, and write-ups —
                so you can ask anything and get real answers, not canned ones.
              </p>

              <ul className="space-y-2">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-snow/85">
                    <CheckIcon className="h-3.5 w-3.5 shrink-0 text-violet" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* shimmering progress */}
              <div>
                <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-fog/70">
                  <span>Status: in development</span>
                  <span className="text-cyan">building…</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-mist">
                  <motion.div
                    className="h-full w-1/3 rounded-full bg-gradient-to-r from-violet to-cyan"
                    animate={{ x: ["-100%", "300%"] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>

              <button
                onClick={goToContact}
                className="w-full rounded-xl bg-gradient-to-r from-violet to-cyan px-5 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.01]"
              >
                Meanwhile, message me directly →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
