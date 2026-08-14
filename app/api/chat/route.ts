import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";
import { site, projects, faq, experience, skillGroups } from "@/lib/data";

// Works in two modes:
//  1. Demo mode (no API key set): answers from the FAQ list in lib/data.ts. Free.
//  2. AI mode: set ANTHROPIC_API_KEY in .env.local / Vercel env vars and the
//     widget becomes a real LLM assistant. Optionally set ANTHROPIC_MODEL
//     (default "claude-opus-5"; "claude-haiku-4-5" is the cheapest option).

const MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-5";
const MAX_MESSAGES = 12;
const MAX_CHARS = 1000;

const systemPrompt = `You are the friendly AI assistant on ${site.name}'s personal portfolio website. ${site.name} is an ${site.role} working on production Generative AI.

Facts you can use:
- Role: ${experience[0].role} at ${experience[0].company} (${experience[0].period}) — production GenAI: RAG pipelines, multi-GPU vLLM inference (150+ tokens/sec), LangGraph agents, LLM fine-tuning platforms
- Education: B.E. Computer Science, CGPA 9.78/10
- Skills: ${skillGroups.map((g) => `${g.title}: ${g.items.slice(0, 3).join(", ")}`).join(" | ")}
- Selected projects: ${projects.map((p) => `${p.title} (${p.summary})`).join("; ")}
- To connect: the Connect form on this page, or ${site.email} — replies within 24 hours
- GitHub: ${site.github} | LinkedIn: ${site.linkedin}

Rules: Answer questions about ${site.name}'s experience, projects, skills, and background. Be warm and concise (2-4 sentences). Point people who want to reach him to the Connect form or ${site.email}. If asked something unrelated to ${site.name} or his work, politely redirect. Never invent facts, prices, or commitments on his behalf.`;

type ChatMessage = { role: "user" | "assistant"; content: string };

function faqAnswer(text: string): string {
  const lower = text.toLowerCase();
  for (const item of faq) {
    if (item.q.some((kw) => lower.includes(kw))) return item.a;
  }
  return `Great question! I'm a simple demo bot right now — for anything specific, use the Connect form or email ${site.email} and Ansh will reply within 24 hours. (Ask me about his work, projects, or experience!)`;
}

export async function POST(req: Request) {
  let messages: ChatMessage[];
  try {
    const body = await req.json();
    messages = body?.messages;
    if (!Array.isArray(messages) || messages.length === 0) throw new Error("bad body");
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Basic hygiene: cap history and message size, keep only expected fields
  const history: ChatMessage[] = messages
    .slice(-MAX_MESSAGES)
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  const lastUser = [...history].reverse().find((m) => m.role === "user");
  if (!lastUser) {
    return NextResponse.json({ error: "No user message" }, { status: 400 });
  }

  // Demo mode — no key configured
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ reply: faqAnswer(lastUser.content), source: "faq" });
  }

  try {
    const client = new Anthropic();
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 512,
      system: [{ type: "text", text: systemPrompt, cache_control: { type: "ephemeral" } }],
      messages: history,
    });

    if (response.stop_reason === "refusal") {
      return NextResponse.json({
        reply: `I can't help with that one — but I'm happy to talk about ${site.name}'s work! Or email ${site.email}.`,
        source: "ai",
      });
    }

    const text = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");

    return NextResponse.json({ reply: text || faqAnswer(lastUser.content), source: "ai" });
  } catch (err) {
    console.error("Chat API error:", err);
    // Graceful degradation: fall back to FAQ so the widget never breaks
    return NextResponse.json({ reply: faqAnswer(lastUser.content), source: "faq" });
  }
}
