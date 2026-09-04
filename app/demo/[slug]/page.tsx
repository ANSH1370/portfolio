import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DemoShell, { type DemoTenant } from "@/components/DemoShell";

// A prospect's demo assistant: /demo/<slug>. Tenant info comes from the RAG
// backend (GET /demo/<slug>), which only exposes public fields. These pages
// are noindex and carry none of the portfolio chrome — no Navbar, no floating
// widget — so a firm's demo never mixes with Ansh's own assistant.

export const dynamic = "force-dynamic";

const SLUG = /^[a-z0-9][a-z0-9-]{1,40}$/;

async function getTenant(slug: string): Promise<DemoTenant | null> {
  const base = process.env.RAG_API_URL?.replace(/\/+$/, "");
  if (!base || !SLUG.test(slug)) return null;
  try {
    const res = await fetch(`${base}/demo/${slug}`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(20_000),
    });
    if (!res.ok) return null;
    return (await res.json()) as DemoTenant;
  } catch {
    return null;
  }
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
  const tenant = await getTenant(slug);
  if (!tenant) notFound();
  return <DemoShell tenant={tenant} />;
}
