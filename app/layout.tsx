import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { site } from "@/lib/data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role} | GenAI, RAG & Multi-Agent Systems`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Ansh Mangukiya",
    "AI Engineer",
    "Generative AI",
    "RAG",
    "LLM systems",
    "Multi-Agent Orchestration",
    "vLLM",
    "LangGraph",
  ],
  authors: [{ name: site.name, url: site.url }],
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.tagline,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
