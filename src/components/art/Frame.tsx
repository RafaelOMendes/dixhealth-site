import type { ReactNode } from "react";

/**
 * A hung, framed plate: outer moulding, passe-partout mat, glazed artwork and
 * an engraved plaque underneath — the furniture of a consulting room wall.
 */
export function Frame({
  children,
  plaque,
  className,
  ratio = "aspect-[16/10]",
  mat = "p-3 sm:p-4",
}: {
  children: ReactNode;
  plaque?: string;
  className?: string;
  ratio?: string;
  mat?: string;
}) {
  return (
    <figure className={`group/frame relative ${className ?? ""}`}>
      {/* moulding */}
      <div
        className="relative rounded-[20px] p-[3px] shadow-[0_28px_60px_-28px_rgb(16_22_27/0.5),0_6px_18px_-8px_rgb(16_22_27/0.28)] dark:shadow-[0_34px_70px_-30px_rgb(0_0_0/0.9)]"
        style={{
          background:
            "linear-gradient(160deg, var(--frame-edge), transparent 42%, transparent 58%, var(--frame-edge))",
        }}
      >
        <div
          className="rounded-[18px] p-[6px]"
          style={{ background: "var(--frame)" }}
        >
          {/* mat */}
          <div
            className={`rounded-[13px] ${mat}`}
            style={{ background: "var(--mat)" }}
          >
            {/* glazing */}
            <div
              className={`relative overflow-hidden rounded-[7px] ring-1 ring-black/10 dark:ring-white/10 ${ratio}`}
              style={{ background: "var(--art-bg)" }}
            >
              {children}

              {/* glass reflection sweeping the top-left corner */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-70 mix-blend-overlay"
                style={{
                  background:
                    "linear-gradient(128deg, rgb(255 255 255 / 0.28) 0%, rgb(255 255 255 / 0.05) 22%, transparent 46%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {plaque ? <Plaque>{plaque}</Plaque> : null}
    </figure>
  );
}

export function Plaque({ children }: { children: ReactNode }) {
  return (
    <figcaption className="mt-4 flex justify-center">
      <span
        className="plaque rounded-[4px] px-3 py-1 text-[11.5px] tracking-wide text-[color:var(--ink-3)] ring-1 ring-inset ring-[color:var(--line)]"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--ink) 4%, transparent), transparent)",
        }}
      >
        {children}
      </span>
    </figcaption>
  );
}
