import { Frame } from "@/components/art/Frame";
import { AuroraVitals } from "@/components/art/plates";
import { Reveal } from "@/components/ui/Reveal";
import { hero } from "@/lib/content";
import { glassStyle } from "@/lib/glass";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative scroll-mt-28 overflow-hidden px-5 pt-32 pb-20 sm:px-8 lg:pt-40 lg:pb-28"
    >
      {/* wall wash behind everything */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(120% 80% at 78% 8%, color-mix(in oklab, #3aa0ea 16%, transparent), transparent 60%), radial-gradient(90% 70% at 10% 40%, color-mix(in oklab, #44f17f 12%, transparent), transparent 62%)",
        }}
      />

      <div className="mx-auto grid max-w-[1180px] items-center gap-14 lg:grid-cols-[1.02fr_1fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow">{hero.eyebrow}</p>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="mt-5 text-[clamp(2.4rem,6.4vw,4.25rem)] leading-[1.02] font-extrabold tracking-[-0.035em] text-balance">
              Vamos <span className="brand-text">escalar</span>
              <br className="hidden sm:block" /> o seu negócio?
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[46ch] text-[1.0625rem] leading-relaxed text-[color:var(--ink-2)] sm:text-lg">
              {hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#contato"
                className="brand-gradient rounded-full px-6 py-3.5 text-[0.95rem] font-semibold text-[#06231a] shadow-[0_10px_30px_-10px_rgb(58_160_234/0.75)] transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                {hero.primaryCta}
              </a>
              <a
                href="#pilares"
                style={glassStyle}
                className="liquid liquid-rim rounded-full px-6 py-3.5 text-[0.95rem] font-semibold transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                {hero.secondaryCta}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.26}>
            <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-6 border-t border-[color:var(--line)] pt-8">
              {hero.stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block text-[1.75rem] leading-none font-extrabold tracking-tight">
                      {s.value}
                    </span>
                    <span className="mt-1.5 block text-[0.8125rem] text-[color:var(--ink-3)]">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <Frame plaque={hero.plaque} ratio="aspect-[4/3] sm:aspect-[16/11]">
            <AuroraVitals />
          </Frame>
        </Reveal>
      </div>
    </section>
  );
}
