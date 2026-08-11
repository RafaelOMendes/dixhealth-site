import Image from "next/image";

import { Reveal } from "@/components/ui/Reveal";
import { clients } from "@/lib/content";

function Row({
  items,
  duration,
  reverse,
}: {
  items: (typeof clients.logos)[number][];
  duration: string;
  reverse?: boolean;
}) {
  // Two identical halves, each carrying its own trailing gap, so translating
  // the track by exactly -50% lands seamlessly on the start of the copy.
  const half = (copy: number) => (
    <div className="flex shrink-0 gap-4 pr-4 sm:gap-6 sm:pr-6">
      {items.map((c) => (
        <div
          key={`${copy}-${c.file}`}
          title={c.name}
          aria-hidden={copy === 1}
          className="group relative grid h-[74px] w-[74px] shrink-0 place-items-center rounded-full ring-1 ring-[color:var(--line)] transition duration-300 hover:scale-[1.06] hover:ring-[color:var(--line-strong)] sm:h-[88px] sm:w-[88px]"
        >
          <Image
            src={`/clients/${c.file}.png`}
            alt={copy === 0 ? c.name : ""}
            width={88}
            height={88}
            sizes="88px"
            className="h-full w-full rounded-full object-contain opacity-85 transition-opacity duration-300 group-hover:opacity-100"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="marquee mask-x overflow-hidden py-2">
      <div
        className="marquee-track flex w-max"
        style={{
          ["--marquee-duration" as string]: duration,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {half(0)}
        {half(1)}
      </div>
    </div>
  );
}

export function Clients() {
  const half = Math.ceil(clients.logos.length / 2);
  const top = clients.logos.slice(0, half);
  const bottom = clients.logos.slice(half);

  return (
    <section
      id="clientes"
      className="relative scroll-mt-28 overflow-hidden px-5 py-20 sm:px-8 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--line-strong), transparent)",
        }}
      />

      <div className="mx-auto max-w-[1180px]">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <Reveal>
              <p className="eyebrow">{clients.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-4 text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.06] font-extrabold tracking-[-0.03em]">
                <span className="brand-text">+200</span> projetos de sucesso
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-[34ch] text-[0.95rem] leading-relaxed text-[color:var(--ink-2)]">
              De siderúrgicas a operadoras de saúde — o mesmo rigor de
              engenharia, em escalas muito diferentes.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <div className="mt-12">
            <p className="eyebrow mb-5">{clients.sub}</p>
            <div className="space-y-3">
              <Row items={top} duration="52s" />
              <Row items={bottom} duration="64s" reverse />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
