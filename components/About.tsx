import { about, site } from "@/lib/data";
import Reveal from "./Reveal";
import ProfilePhoto from "./ProfilePhoto";
import { BookIcon, CodeIcon, RocketIcon, BoltIcon } from "./Icons";

const journeyIcons = {
  book: BookIcon,
  code: CodeIcon,
  rocket: RocketIcon,
  bolt: BoltIcon,
};

export default function About() {
  return (
    <section id="about" className="relative px-5 py-24">
      <div className="orb right-[-8%] top-[10%] h-[380px] w-[380px] bg-cyan/12" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.5fr]">
          {/* Photo + quick stats */}
          <div className="space-y-5 lg:sticky lg:top-24">
            <Reveal>
              <ProfilePhoto />
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card divide-y divide-line">
                {about.stats.map((s) => (
                  <div key={s.label} className="flex items-center justify-between px-6 py-4">
                    <span className="font-display text-2xl font-bold text-gradient">{s.value}</span>
                    <span className="max-w-[60%] text-right text-xs text-fog">{s.label}</span>
                  </div>
                ))}
                <div className="px-6 py-4">
                  <p className="text-xs text-fog">
                    Based in <span className="text-snow">{site.location}</span>
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Intro + journey timeline */}
          <div>
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet">About</p>
              <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                The person behind the code
              </h2>
            </Reveal>

            <div className="mt-6 space-y-4 text-fog">
              {about.intro.map((p, i) => (
                <Reveal key={i} delay={0.06 * (i + 1)}>
                  <p className="leading-relaxed">{p}</p>
                </Reveal>
              ))}
            </div>

            {/* Journey timeline */}
            <div className="relative mt-12 space-y-9 border-l border-line pl-12">
              {/* gradient overlay on the spine */}
              <div className="absolute -left-px top-0 h-full w-px bg-gradient-to-b from-violet via-cyan/60 to-transparent" />
              {about.journey.map((item, i) => {
                const Icon = journeyIcons[item.icon];
                return (
                  <Reveal key={item.period} delay={i * 0.08}>
                    <div className="group relative transition-transform duration-300 hover:translate-x-1">
                      {/* icon node, centered on the spine */}
                      <span className="absolute -left-[66px] top-0 flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-ink-soft text-cyan shadow-lg shadow-black/40 transition-colors duration-300 group-hover:border-violet/60 group-hover:text-violet">
                        <Icon className="h-4 w-4" />
                        {item.current && (
                          <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                          </span>
                        )}
                      </span>
                      <span className="inline-flex items-center rounded-full border border-line bg-mist px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-cyan">
                        {item.period}
                      </span>
                      <h3 className="font-display mt-2.5 text-xl font-semibold text-snow">
                        {item.title}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-fog">{item.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
