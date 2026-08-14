"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#credentials", label: "Credentials" },
  { href: "#about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-ink/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          Ansh <span className="text-gradient">Mangukiya</span>
        </a>

        <div className="hidden items-center gap-8 text-sm text-fog md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-snow">
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="rounded-full border border-line bg-mist px-4 py-2 text-sm font-medium transition-colors hover:border-violet/50 hover:text-white"
        >
          Get in touch
        </a>
      </nav>
    </header>
  );
}
