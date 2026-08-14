import { site } from "@/lib/data";
import Reveal from "./Reveal";
import ContactForm from "./ContactForm";
import { MailIcon, GithubIcon, LinkedinIcon, PhoneIcon } from "./Icons";

export default function Contact() {
  return (
    <section id="contact" className="relative px-5 py-24">
      <div className="orb left-1/2 top-[-10%] h-[400px] w-[600px] -translate-x-1/2 bg-violet/15" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Reveal>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-violet">Connect</p>
              <h2 className="font-display mt-3 text-3xl font-bold tracking-tight sm:text-5xl">
                Let&apos;s build something
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-fog">
                A collaboration, an opportunity, or just a question about GenAI — drop a
                message. I reply within 24 hours.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 space-y-3">
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center gap-3 text-sm text-fog transition-colors hover:text-snow"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-mist transition-colors group-hover:border-violet/50">
                    <MailIcon className="h-4 w-4" />
                  </span>
                  {site.email}
                </a>
                <a
                  href={site.phoneHref}
                  className="group flex items-center gap-3 text-sm text-fog transition-colors hover:text-snow"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-mist transition-colors group-hover:border-violet/50">
                    <PhoneIcon className="h-4 w-4" />
                  </span>
                  {site.phone}
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 text-sm text-fog transition-colors hover:text-snow"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-mist transition-colors group-hover:border-violet/50">
                    <LinkedinIcon className="h-4 w-4" />
                  </span>
                  linkedin.com/in/anshmangukiya
                </a>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 text-sm text-fog transition-colors hover:text-snow"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-mist transition-colors group-hover:border-violet/50">
                    <GithubIcon className="h-4 w-4" />
                  </span>
                  github.com/ANSH1370
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
