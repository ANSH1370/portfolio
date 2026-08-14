import { site } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line px-5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 text-sm text-fog sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name} · Surat, India
        </p>
        <div className="flex gap-6">
          <a href={site.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-snow">
            GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-snow">
            LinkedIn
          </a>
          <a href={`mailto:${site.email}`} className="transition-colors hover:text-snow">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
