import { NextResponse } from "next/server";

// Sends you a notification email, then hands the visitor the PDF.
// The download is never blocked — if the notification fails, they still get the file.
export async function GET(req: Request) {
  const ua = req.headers.get("user-agent") || "";
  const isBot = /bot|crawler|spider|preview|scrape|facebookexternalhit|slurp|headless/i.test(ua);

  console.log("[resume] isBot:", isBot, "| key loaded:", !!process.env.WEB3FORMS_ACCESS_KEY);

  if (!isBot && process.env.WEB3FORMS_ACCESS_KEY) {
    const country = req.headers.get("x-vercel-ip-country") || "unknown";
    const city = decodeURIComponent(req.headers.get("x-vercel-ip-city") || "") || "unknown";
    const referer = req.headers.get("referer") || "direct visit";
    const time = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_ACCESS_KEY,
          subject: "📄 Someone downloaded your resume",
          from_name: "Portfolio Resume Tracker",
          name: "Resume Tracker",
          email: "anshmangukiya.ai@gmail.com",
          message: `Resume downloaded!\n\nTime: ${time} (IST)\nLocation: ${city}, ${country}\nCame from: ${referer}\nDevice: ${ua.slice(0, 120)}`,
        }),
        signal: AbortSignal.timeout(5000),
      });
      console.log("[resume] web3forms replied:", res.status, await res.text());
    } catch (err) {
      console.log("[resume] send failed:", err);
    }
  }

  return NextResponse.redirect(new URL("/resume.pdf", req.url), 307);
}