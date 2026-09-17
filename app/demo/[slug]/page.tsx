import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import DemoShell, { type DemoTenant } from "@/components/DemoShell";
import { DEMO_TENANTS } from "@/lib/demo-tenants";

// A prospect's demo assistant: /demo/<slug>. Tenant info comes from the RAG
// backend (GET /demo/<slug>), which only exposes public fields. These pages
// are noindex and carry none of the portfolio chrome — no Navbar, no floating
// widget — so a firm's demo never mixes with Ansh's own assistant.
//
// Cold-start rule: the backend sleeps on Render's free tier and takes 30-50s to
// wake. A prospect clicking this link from an email must never get a 404, so a
// slug we ship a snapshot for (lib/demo-tenants.ts) renders from that snapshot
// when the backend is slow; DemoShell pings the chat route on mount, so the
// assistant is warming while they read the page. Unknown slugs still 404.

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SLUG = /^[a-z0-9][a-z0-9-]{1,40}$/;
const TENANT_TIMEOUT_MS = 8_000;

async function fetchTenant(slug: string): Promise<DemoTenant | null> {
  const base = process.env.RAG_API_URL?.replace(/\/+$/, "");
  if (!base) return null;
  try {
    const res = await fetch(`${base}/demo/${slug}`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(TENANT_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    return (await res.json()) as DemoTenant;
  } catch {
    return null; // asleep, slow or unreachable — the snapshot covers it
  }
}

async function getTenant(slug: string): Promise<DemoTenant | null> {
  if (!SLUG.test(slug)) return null;
  return (await fetchTenant(slug)) ?? DEMO_TENANTS[slug] ?? null;
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const t = await getTenant(slug);
  return {
    title: t ? `${t.name} — AI assistant demo` : "Demo not found",
    description: t
      ? `A working AI assistant trained on ${t.name}'s website. Demo built by Ansh Mangukiya.`
      : undefined,
    robots: { index: false, follow: false },
  };
}

export default async function DemoPage({ params }: Props) {
  const { slug } = await params;
  // Mail clients sometimes glue trailing punctuation onto a pasted link
  // ("/demo/cahanlaw." showed up in analytics as a 404). Recover instead of 404.
  const clean = slug.toLowerCase().replace(/[^a-z0-9-]+$/, "");
  if (clean !== slug && SLUG.test(clean)) redirect(`/demo/${clean}`);
  const tenant = await getTenant(slug);
  if (!tenant) notFound();
  return <DemoShell tenant={tenant} />;
}
