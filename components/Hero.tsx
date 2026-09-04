"use client";

import { motion } from "motion/react";
import { site } from "@/lib/data";
import { GithubIcon, LinkedinIcon, MailIcon, DownloadIcon } from "./Icons";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pb-24 pt-36 md:pt-44">
      {/* glow orbs */}
      <div className="orb left-[10%] top-[-10%] h-[420px] w-[420px] bg-violet/25" />
      <div className="orb right-[5%] top-[20%] h-[360px] w-[360px] bg-cyan/15" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-mist px-4 py-1.5 text-xs text-fog"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for freelance AI projects · Surat, India
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl"
        >
          I engineer <span className="text-gradient">production GenAI</span> — RAG, LLM
          systems & <span className="text-gradient">multi-agent</span> platforms.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-fog"
        >
          I&apos;m {site.name}, an {site.role} at Commercient. I spend my days making GenAI
          work in production — chatbot platforms, fine-tuned models, and inference stacks
          that real customers depend on.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet to-cyan px-6 py-3 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            <MailIcon className="h-4 w-4" />
            Let&apos;s connect
          </a>
          <a
            href="#projects"
            className="rounded-full border border-line bg-mist px-6 py-3 text-sm font-medium text-snow transition-colors hover:border-violet/50"
          >
            See my work
          </a>
          <a
            href={site.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-mist px-6 py-3 text-sm font-medium text-snow transition-colors hover:border-cyan/50"
          >
            <DownloadIcon className="h-4 w-4" />
            Resume
          </a>
          <div className="flex items-center gap-3 pl-1 text-fog">
            <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-colors hover:text-snow">
              <GithubIcon />
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="transition-colors hover:text-snow">
              <LinkedinIcon />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
