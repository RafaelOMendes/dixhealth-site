import Image from "next/image";
import type { ReactNode } from "react";

import { Frame } from "@/components/art/Frame";
import { AnatomyPlate } from "@/components/art/plates";
import { Reveal } from "@/components/ui/Reveal";
import { about } from "@/lib/content";
import { glassStyle } from "@/lib/glass";

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Re-creates the brand's habit of colouring the load-bearing words. */
function Marked({
  text,
  highlights,
}: {
  text: string;
  highlights?: readonly string[];
}) {
  if (!highlights?.length) return <>{text}</>;

  const ordered = [...highlights].sort((a, b) => b.length - a.length);
  const re = new RegExp(`(${ordered.map(escape).join("|")})`, "g");

  return (
    <>
      {text.split(re).map((part, i) =>
        highlights.some((h) => h === part) ? (
          <strong key={i} className="brand-text font-bold">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      style={glassStyle}
      className="liquid liquid-rim relative h-full rounded-[22px] p-6 sm:p-7"
    >
      <span
        aria-hidden
        className="brand-gradient absolute top-0 left-6 h-[2px] w-14 rounded-full opacity-80"
      />
      <h3 className="text-lg font-bold tracking-tight">{title}</h3>
      <div className="mt-3.5 text-[0.95rem] leading-relaxed text-[color:var(--ink-2)]">
        {children}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section
      id="essencia"
      className="relative scroll-mt-28 px-5 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="eyebrow">{about.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] font-extrabold tracking-[-0.03em] text-balance">
                {about.title}
              </h2>
            </Reveal>
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.05}>
                <p className="mt-5 max-w-[54ch] text-[1.0625rem] leading-relaxed text-[color:var(--ink-2)]">
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.08}>
            <Frame plaque={about.plaque} ratio="aspect-[5/6] sm:aspect-[4/5]">
              <AnatomyPlate />
            </Frame>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className="mt-20 lg:mt-24">
            <Frame
              plaque="O ateliê — Vila Velha, ES"
              ratio="aspect-[16/9] sm:aspect-[21/9]"
              mat="p-2 sm:p-3"
            >
              <Image
                src="/brand/office.jpg"
                alt="Equipe da DixHealth em ambiente de trabalho colaborativo"
                fill
                sizes="(max-width: 1180px) 100vw, 1180px"
                className="object-cover"
              />
            </Frame>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3 lg:mt-20">
          {about.cards.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.07}>
              <Card title={c.title}>
                {"list" in c && c.list ? (
                  <ul className="space-y-2.5">
                    {c.list.map((v) => (
                      <li key={v} className="flex items-center gap-2.5">
                        <span className="brand-gradient h-1.5 w-1.5 shrink-0 rounded-full" />
                        {v}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Marked
                    text={"text" in c ? c.text : ""}
                    highlights={"highlights" in c ? c.highlights : undefined}
                  />
                )}
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
