import { impact } from "@/lib/data";
import Reveal from "./Reveal";

// Big-number band right under the hero — real production metrics.
export default function Impact() {
  return (
    <section className="relative px-5 pb-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {impact.map((s, i) => (
            <Reveal key={s.value} delay={i * 0.08}>
              <div className="card h-full p-6">
                <p className="font-display text-4xl font-bold text-gradient">{s.value}</p>
                <p className="mt-2 text-sm leading-relaxed text-fog">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
