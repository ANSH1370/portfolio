import { NextResponse } from "next/server";
import { site } from "@/lib/data";

// Sends form submissions to Ansh's inbox via Web3Forms (free relay, no database).
// Setup: get a free access key at https://web3forms.com (enter your email, the key
// arrives by mail — no password needed), then set WEB3FORMS_ACCESS_KEY in
// .env.local / Vercel env vars. Phase 2 (later): also persist submissions to a DB.

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim().slice(0, 120);
  const email = String(body.email ?? "").trim().slice(0, 200);
  const topic = String(body.topic ?? "").trim().slice(0, 80);
  const message = String(body.message ?? "").trim().slice(0, 4000);
  const honeypot = String(body.company ?? ""); // hidden field — bots fill it, humans don't

  if (honeypot) {
    // Silently accept so bots don't learn they were caught
    return NextResponse.json({ ok: true });
  }
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please fill in your name, a valid email, and a message." },
      { status: 400 }
    );
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    // Not configured yet — tell the UI to show the direct-email fallback
    return NextResponse.json(
      { ok: false, fallback: true, error: `Form not configured — email ${site.email} directly.` },
      { status: 503 }
    );
  }

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Portfolio contact: ${topic || "New inquiry"} — ${name}`,
        from_name: "Portfolio Contact Form",
        name,
        email, // reply-to
        topic,
        message,
      }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Relay rejected the submission");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { ok: false, fallback: true, error: `Something went wrong — email ${site.email} directly.` },
      { status: 502 }
    );
  }
}
