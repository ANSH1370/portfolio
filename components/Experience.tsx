import { experience } from "@/lib/data";
import Reveal from "./Reveal";
import { CheckIcon } from "./Icons";

// Highlights metric substrings (e.g. "150+ tokens/sec", "80%") inside a bullet.
function highlightMetrics(text: string) {
  const parts = text.split(/(\d+(?:\+|%)(?:\s?tokens\/sec)?)/g);
  return parts.map((part, i) =>
    /^\d+(\+|%)/.test(part) ? (
      <span key={i} className="font-semibold text-cyan">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative px-5 py-24">
      <div className="orb left-[-8%] top-[15%] h-[380px] w-[380px] bg-violet/15" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet">Experience</p>
          <h2 className="font-display mt-3 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
            Production GenAI, shipped daily
          </h2>
        </Reveal>

        <div className="mt-12 space-y-6">
          {experience.map((job) => (
            <Reveal key={job.company}>
              <div className="card relative overflow-hidden p-8 md:p-10">
                {/* gradient spine */}
                <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-violet to-cyan" />
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <h3 className="font-display text-2xl font-semibold">
                      {job.role}{" "}
                      <span className="text-fog">·</span>{" "}
                      <a
                        href={job.companyUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-gradient transition-opacity hover:opacity-80"
                      >
                        {job.company}
                      </a>
                    </h3>
                  </div>
                  <p className="text-sm text-fog">
                    {job.period} · {job.mode}
                  </p>
                </div>

                <ul className="mt-6 grid gap-3.5 md:grid-cols-2">
                  {job.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-fog">
                      <CheckIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-violet" />
                      <span>{highlightMetrics(b)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
