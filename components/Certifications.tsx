import { certifications, education } from "@/lib/data";
import Reveal from "./Reveal";
import { ArrowIcon } from "./Icons";

export default function Certifications() {
  return (
    <section id="credentials" className="relative px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet">Credentials</p>
          <h2 className="font-display mt-3 max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
            Education & certifications
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          {/* Education card */}
          <Reveal>
            <div className="card relative flex h-full flex-col justify-between overflow-hidden p-8">
              <div className="orb right-[-30%] top-[-40%] h-[260px] w-[260px] bg-cyan/15" />
              <div className="relative z-10">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-fog">Education</p>
                <h3 className="font-display mt-3 text-2xl font-semibold">{education.degree}</h3>
                <p className="mt-2 text-fog">{education.school}</p>
              </div>
              <div className="relative z-10 mt-8 flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full border border-line bg-mist px-4 py-1.5 text-sm text-fog">
                  {education.period}
                </span>
                <span className="font-display text-xl font-bold text-gradient">{education.gpa}</span>
              </div>
            </div>
          </Reveal>

          {/* Certifications list */}
          <div className="flex flex-col gap-4">
            {certifications.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <a
                  href={c.link}
                  target="_blank"
                  rel="noreferrer"
                  className="card group flex items-center justify-between gap-4 p-5"
                >
                  <div>
                    <p className="font-medium leading-snug">{c.title}</p>
                    <p className="mt-1 text-sm text-fog">{c.issuer}</p>
                  </div>
                  <span className="rounded-full border border-line bg-mist p-2 text-fog transition-all group-hover:border-violet/50 group-hover:text-cyan">
                    <ArrowIcon />
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
