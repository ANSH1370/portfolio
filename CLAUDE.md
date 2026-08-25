# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server at http://localhost:3000
npm run build    # production build (also the type-check — there is no separate test suite)
npm run lint     # next lint
```

There are no tests in this repo.

## What this is

A single-page personal portfolio (Next.js 15 App Router, React 19, Tailwind CSS v4, Motion) deployed on Vercel. One page ([app/page.tsx](app/page.tsx)) stacks section components from `components/` in order, plus three API routes.

## Architecture

**All site content lives in [lib/data.ts](lib/data.ts).** Text, links, projects, experience, skills, FAQ answers, and the `site` object (name, email, URL, resume path) are exported from this one file and imported everywhere — components, metadata in [app/layout.tsx](app/layout.tsx), and API routes. Content edits go here, not in components.

**Server vs client components:** Section components are server components by default. The ones marked `"use client"` (Navbar, Hero, ProfilePhoto, Reveal, ContactForm, ChatWidget) need interactivity or Motion. [components/Reveal.tsx](components/Reveal.tsx) is the shared scroll-into-view fade-up wrapper used across sections.

**API routes** (all in `app/api/`, each designed to degrade gracefully rather than fail):

- `chat/route.ts` — powers the ChatWidget. Three modes, best-available-first, each falling back to the next on failure so the widget never breaks: (1) with `RAG_API_URL` set it proxies to the external `ansh-ai-assistant` RAG service (separate repo, FastAPI on Render) and returns `{reply, citations}`; (2) with `ANTHROPIC_API_KEY` it calls the Anthropic API (`ANTHROPIC_MODEL` overrides the model); (3) otherwise keyword matching against the `faq` list in `lib/data.ts`. `GET /api/chat` is a warmup ping the widget fires on open to wake the Render free-tier instance. History is capped at 12 messages / 1000 chars per message (the RAG backend's validation limits) and 512 output tokens in Anthropic mode.
- `contact/route.ts` — relays form submissions to Web3Forms using `WEB3FORMS_ACCESS_KEY`; includes a honeypot field (`company`) that silently accepts bot submissions. If the server can't reach Web3Forms, it returns `fallback: true` and [components/ContactForm.tsx](components/ContactForm.tsx) posts directly from the browser using `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (Web3Forms keys are public-by-design, so exposing it is intentional).
- `resume-download/route.ts` — `site.resume` points here instead of the static PDF. It emails a download notification via Web3Forms (skipping bots by user-agent, 5s timeout), then 307-redirects to `/public/resume.pdf`. The download must never be blocked by a failed notification.

**Styling:** Tailwind v4 with the theme defined via `@theme` CSS variables in [app/globals.css](app/globals.css) (colors `ink`, `fog`, `snow`, `violet`, `cyan`, etc.) — there is no `tailwind.config` file. Fonts (Inter, Space Grotesk) are loaded in `layout.tsx` and exposed as `--font-body` / `--font-display`.

## Environment variables

Set in `.env.local` locally and in Vercel project settings for production:

- `WEB3FORMS_ACCESS_KEY` and `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (same key, both required) — contact form + resume notifications
- `RAG_API_URL` (optional) — base URL of the deployed `ansh-ai-assistant` RAG service (no trailing slash); enables RAG mode with citations for the chat widget
- `ANTHROPIC_API_KEY` (optional) — enables real AI mode for the chat widget; `ANTHROPIC_MODEL` optionally overrides the model
