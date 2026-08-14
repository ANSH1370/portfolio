# Ansh Mangukiya — Portfolio.

Personal portfolio for freelance AI engineering work. Next.js 15 (App Router) + Tailwind CSS v4 + Motion, with a built-in AI chat widget that doubles as a live demo.

## Run it on your Mac

```bash
cd portfolio
npm install
npm run dev
```

Open http://localhost:3000.

## Before you deploy — 3 required edits

All content lives in **`lib/data.ts`**:

1. **`site.email`** — already set to `anshmangukiya.ai@gmail.com`; double-check it.
2. **`site.url`** — set to your final domain (e.g. `https://anshmangukiya.com`).
3. Skim the rest of the file — bios, projects, services — and tweak wording to your taste.

## Contact form (emails you, no database)

The Connect section has a form that delivers submissions to your inbox via
[Web3Forms](https://web3forms.com) (free):

Already configured in `.env.local` (key created 2026-08-13). When deploying, add BOTH
variables in Vercel → Settings → Environment Variables:

```
WEB3FORMS_ACCESS_KEY=<the key>
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=<same key>
```

How it works: the form posts to `/api/contact`, which relays to Web3Forms server-side.
If the server can't reach Web3Forms (some corporate networks block it), the browser
posts directly as a fallback — so submissions never get lost. Web3Forms access keys
are public-by-design, so exposing the key via `NEXT_PUBLIC_` is fine.

Phase 2 (later): persist submissions to a database as well.

## AI chat widget

The floating chat button works in two modes:

- **Demo mode (default, free):** answers from the FAQ list in `lib/data.ts`. No key needed.
- **Real AI mode:** create `.env.local` with:

  ```
  ANTHROPIC_API_KEY=sk-ant-...
  # optional — cheapest model for a widget:
  ANTHROPIC_MODEL=claude-haiku-4-5
  ```

  Get a key at https://platform.claude.com. On Vercel, add the same variables under
  Project → Settings → Environment Variables. The route caps history at 12 messages
  and 512 output tokens per reply to keep costs tiny.

## Deploy (Vercel, free)

1. Push this folder to a new GitHub repo (e.g. `portfolio`).
2. Go to https://vercel.com → Add New Project → import the repo → Deploy (defaults are fine).
3. You get `something.vercel.app` immediately.
4. Buy your domain (Namecheap/Cloudflare), then in Vercel: Settings → Domains → add it
   and follow the DNS instructions shown.

See `../freelance-kit/launch-guide.md` for the full step-by-step launch plan.
