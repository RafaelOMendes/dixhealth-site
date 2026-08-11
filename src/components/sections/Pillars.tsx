import { Frame } from "@/components/art/Frame";
import { Helix, Strata, Systole } from "@/components/art/plates";
import { Reveal } from "@/components/ui/Reveal";
import { pillars } from "@/lib/content";

const ART = {
  dixcloud: Strata,
  dixhealth: Systole,
  dixdevelop: Helix,
} as const;

export function Pillars() {
  return (
    <section
      id="pilares"
      className="relative scroll-mt-28 px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-[1180px]">
        <header className="max-w-2xl">
          <Reveal>
            <p className="eyebrow">Pilares</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-4 text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] font-extrabold tracking-[-0.03em] text-balance">
              Como podemos te ajudar
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-[color:var(--ink-2)]">
              Três frentes, um só time. Cada uma resolve uma camada diferente do
              mesmo problema: fazer tecnologia sustentar o cuidado.
            </p>
          </Reveal>
        </header>

        <div className="mt-14 space-y-20 lg:mt-20 lg:space-y-28">
          {pillars.map((p, i) => {
            const Art = ART[p.id];
            const flipped = i % 2 === 1;

            return (
              <article
                key={p.id}
                className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                <Reveal
                  className={flipped ? "lg:order-2" : undefined}
                  delay={0.04}
                >
                  <Frame plaque={p.plaque} ratio="aspect-[16/10]">
                    <Art />
                  </Frame>
                </Reveal>

                <Reveal
                  className={flipped ? "lg:order-1" : undefined}
                  delay={0.1}
                >
                  <div>
                    <span
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.16em] uppercase"
                      style={{
                        color: p.accent,
                        background: `color-mix(in oklab, ${p.accent} 14%, transparent)`,
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: p.accent }}
                      />
                      0{i + 1}
                    </span>

                    <h3 className="mt-5 text-[clamp(1.6rem,3.2vw,2.25rem)] leading-tight font-extrabold tracking-[-0.03em]">
                      {p.name}
                    </h3>

                    <p className="mt-4 text-[1.0625rem] leading-relaxed text-[color:var(--ink-2)]">
                      <strong className="font-semibold text-[color:var(--ink)]">
                        {p.lead}
                      </strong>{" "}
                      {p.body}
                    </p>

                    <ul className="mt-7 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-[color:var(--line)] px-3 py-1.5 text-[0.8125rem] text-[color:var(--ink-2)]"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
