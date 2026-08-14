import { skillGroups } from "@/lib/data";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <section id="skills" className="relative px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet">Toolbox</p>
          <h2 className="font-display mt-3 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
            The stack I work with
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <Reveal key={g.title} delay={(i % 3) * 0.08}>
              <div className="card h-full p-6">
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-cyan">
                  {g.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-line bg-ink-soft px-3 py-1.5 text-xs text-snow/85"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
