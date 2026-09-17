import type { DemoTenant } from "@/components/DemoShell";

// Snapshots of each demo tenant's public config, copied from the backend's
// tenants/<slug>/tenant.json. They exist so /demo/<slug> can render while the
// Render free-tier backend is still waking up (a cold start takes 30-50s, and
// a prospect who clicks the link from an email must never see a 404). The live
// backend response wins whenever it arrives in time; this is only the floor.
//
// When you add a tenant: copy the public fields of tenants/<slug>/tenant.json
// here as well (slug, name, short_name, site, description, industry,
// languages, accent, starters, welcome, disclaimer) — see DEMOS.md.
export const DEMO_TENANTS: Record<string, DemoTenant> = {
  cahanlaw: {
    slug: "cahanlaw",
    name: "Law Office of Richard Cahan",
    short_name: "the Law Office of Richard Cahan",
    site: "https://www.cahanlaw.com",
    description:
      "a probate, estate planning and landlord-tenant (eviction) law firm in Round Rock, Texas, serving Pflugerville, Austin and Central Texas",
    industry: "law",
    languages: ["en"],
    accent: "#7c3aed",
    starters: [
      "How does probate work in Texas?",
      "Can probate be avoided?",
      "I'm a landlord — how do I evict a tenant in Travis County?",
      "How do I contact Richard?",
    ],
    welcome:
      "Hi — I'm the AI assistant for the Law Office of Richard Cahan. I answer from the firm's website (probate, estate planning, landlord-tenant) and can help you get in touch. General information only, not legal advice.",
    disclaimer:
      "This assistant answers from the Law Office of Richard Cahan's published website content. It provides general information only — not legal advice — and does not create an attorney-client relationship. For advice on your situation, contact the firm.",
  },
};
