import { NextResponse } from "next/server";

// Proxy for a demo/client assistant: forwards to the RAG backend's
// /demo/<slug>/chat, which runs the same LangGraph pipeline against that
// tenant's own Qdrant collection and prompts. Deliberately NO FAQ/Anthropic
// fallback here — a demo must never answer with Ansh's data.

const RAG_TIMEOUT_MS = 50_000;
export const maxDuration = 60;

const SLUG = /^[a-z0-9][a-z0-9-]{1,40}$/;

type Citation = { title: string; url: string };
type ChatMessage = { role: "user" | "assistant"; content: string };

function ragBase(): string | null {
  const base = process.env.RAG_API_URL;
  return base ? base.replace(/\/+$/, "") : null;
}

export async function GET() {
  const base = ragBase();
  if (base) await fetch(`${base}/health`, { signal: AbortSignal.timeout(5000) }).catch(() => {});
  return NextResponse.json({ ok: true });
}

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!SLUG.test(slug)) return NextResponse.json({ error: "Unknown demo" }, { status: 404 });
  const base = ragBase();
  if (!base) return NextResponse.json({ error: "Demo backend not configured" }, { status: 503 });

  let messages: ChatMessage[];
  try {
    const body = await req.json();
    messages = body?.messages;
    if (!Array.isArray(messages) || messages.length === 0) throw new Error("bad body");
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const history = messages
    .slice(-12)
    .filter(
      (m) =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1000) }));
  if (!history.some((m) => m.role === "user")) {
    return NextResponse.json({ error: "No user message" }, { status: 400 });
  }

  try {
    const res = await fetch(`${base}/demo/${slug}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history }),
      signal: AbortSignal.timeout(RAG_TIMEOUT_MS),
    });
    if (res.status === 404) return NextResponse.json({ error: "Unknown demo" }, { status: 404 });
    if (res.status === 429) {
      return NextResponse.json({ reply: "A lot of questions at once — give me a minute and try again.", citations: [] });
    }
    if (!res.ok) throw new Error(`backend ${res.status}`);
    const data = await res.json();
    if (typeof data?.answer !== "string" || !data.answer.trim()) throw new Error("empty answer");
    const reply = data.answer.replace(/\s*(?:\[\d+\]|【\d+[^】]*】)/g, "").trim();
    const citations: Citation[] = Array.isArray(data.citations)
      ? data.citations.filter((c: Citation) => typeof c?.title === "string" && typeof c?.url === "string")
      : [];
    return NextResponse.json({ reply, citations, source: "rag" });
  } catch (err) {
    console.error(`demo/${slug} backend error:`, err);
    return NextResponse.json({ error: "Assistant unavailable" }, { status: 502 });
  }
}
