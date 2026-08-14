import { projects, site } from "@/lib/data";
import Reveal from "./Reveal";
import { ArrowIcon, GithubIcon } from "./Icons";

export default function Projects() {
  return (
    <section id="projects" className="relative px-5 py-24">
      <div className="orb left-[-10%] top-[30%] h-[400px] w-[400px] bg-violet/15" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet">Projects</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
              Real problems, shipped solutions
            </h2>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-fog transition-colors hover:text-snow"
            >
              <GithubIcon className="h-4 w-4" /> All repos on GitHub
            </a>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal
              key={p.title}
              delay={(i % 3) * 0.08}
              className={p.featured && i === 0 ? "md:col-span-2 lg:col-span-2" : ""}
            >
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="card group flex h-full flex-col p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-lg font-semibold leading-snug">{p.title}</h3>
                  <span className="rounded-full border border-line bg-mist p-2 text-fog transition-all group-hover:border-violet/50 group-hover:text-cyan">
                    <ArrowIcon />
                  </span>
                </div>
                <p className="mt-1.5 text-sm font-medium text-cyan/90">{p.summary}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-fog">{p.problem}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-line bg-mist px-2.5 py-1 text-xs text-fog"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
