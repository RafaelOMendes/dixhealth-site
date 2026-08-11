/**
 * The artwork. Every plate is generated from plain deterministic maths (no
 * randomness, so server and client agree) and painted with CSS variables, so
 * each one flips between an ink-on-paper engraving and a luminous night print
 * when the theme changes.
 */

/* --------------------------------------------------------------- helpers */

const f = (n: number) => Math.round(n * 100) / 100;

/** Smooth polyline built from stacked sines. */
function wave(
  width: number,
  y: number,
  amp: number,
  freq: number,
  phase: number,
  steps = 96,
) {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = t * width;
    const yy =
      y +
      Math.sin(t * Math.PI * 2 * freq + phase) * amp +
      Math.sin(t * Math.PI * 2 * freq * 2.3 + phase * 1.7) * amp * 0.32 +
      Math.sin(t * Math.PI * 2 * freq * 0.6 - phase * 0.9) * amp * 0.5;
    d += `${i === 0 ? "M" : "L"}${f(x)} ${f(yy)}`;
    if (i < steps) d += " ";
  }
  return d;
}

/** Parametric heart, sampled into points. */
function heartPoints(count: number, cx: number, cy: number, scale: number) {
  const pts: [number, number][] = [];
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);
    pts.push([f(cx + x * scale), f(cy - y * scale)]);
  }
  return pts;
}

function BrandDefs({ id }: { id: string }) {
  return (
    <>
      <linearGradient id={`${id}-g`} x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="#3aa0ea" />
        <stop offset="55%" stopColor="#3fd0a8" />
        <stop offset="100%" stopColor="#44f17f" />
      </linearGradient>
      {/* User space, not the default object bounding box: this one paints
          vertical <line>s, whose bbox is zero-wide, and a bounding-box
          gradient on a zero-area box is simply not rendered. */}
      <linearGradient
        id={`${id}-gv`}
        gradientUnits="userSpaceOnUse"
        x1="0"
        y1="100"
        x2="0"
        y2="300"
      >
        <stop offset="0%" stopColor="#44f17f" />
        <stop offset="100%" stopColor="#3aa0ea" />
      </linearGradient>
      <filter id={`${id}-blur`} x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="42" />
      </filter>
      <filter id={`${id}-soft`} x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="6" />
      </filter>
    </>
  );
}

const plate = "absolute inset-0 h-full w-full";

/* ----------------------------------------------------------- 1 · hero art */

const ECG =
  "M0 250 L88 250 L104 250 L114 236 L126 264 L138 250 L172 250 L186 250 L196 224 L206 250 L214 250 L224 250 L236 108 L250 392 L262 250 L286 250 L300 250 L314 214 L330 250 L392 250 L404 250 L414 236 L426 264 L438 250 L472 250 L486 250 L496 224 L506 250 L514 250 L524 250 L536 118 L550 382 L562 250 L586 250 L600 250 L614 214 L630 250 L800 250";

export function AuroraVitals() {
  const id = "art-aurora";
  const rings = [0, 1, 2, 3, 4, 5, 6];

  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className={plate}
      aria-hidden
    >
      <defs>
        <BrandDefs id={id} />
        <radialGradient id={`${id}-vig`} cx="50%" cy="45%" r="75%">
          <stop offset="55%" stopColor="var(--art-bg)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--art-bg)" stopOpacity="0.85" />
        </radialGradient>
        <mask id={`${id}-fade`}>
          <rect width="800" height="500" fill="url(#art-aurora-fadegrad)" />
        </mask>
        <linearGradient id={`${id}-fadegrad`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000" />
          <stop offset="18%" stopColor="#fff" />
          <stop offset="82%" stopColor="#fff" />
          <stop offset="100%" stopColor="#000" />
        </linearGradient>
      </defs>

      <rect width="800" height="500" fill="var(--art-bg)" />

      {/* aurora — the only colour in the room */}
      <g
        filter={`url(#${id}-blur)`}
        style={{ opacity: `calc(0.42 * var(--art-glow) + 0.18)` }}
      >
        <ellipse
          cx="250"
          cy="190"
          rx="210"
          ry="150"
          fill="#3aa0ea"
          className="motion-safe:animate-[dix-drift_15s_ease-in-out_infinite]"
        />
        <ellipse
          cx="560"
          cy="300"
          rx="230"
          ry="160"
          fill="#44f17f"
          className="motion-safe:animate-[dix-drift_19s_ease-in-out_infinite_reverse]"
        />
        <ellipse
          cx="420"
          cy="120"
          rx="160"
          ry="110"
          fill="#37c8c0"
          className="motion-safe:animate-[dix-drift_23s_ease-in-out_infinite]"
        />
      </g>

      {/* contour survey */}
      <g
        stroke="var(--art-ink-soft)"
        fill="none"
        strokeWidth="1"
        opacity="0.85"
      >
        {rings.map((r) => (
          <ellipse
            key={r}
            cx="400"
            cy="250"
            rx={90 + r * 62}
            ry={56 + r * 40}
          />
        ))}
      </g>

      {/* measuring grid */}
      <g stroke="var(--art-ink-soft)" strokeWidth="1" opacity="0.5">
        {Array.from({ length: 33 }, (_, i) => (
          <line
            key={i}
            x1={i * 25}
            y1={i % 4 === 0 ? 470 : 480}
            x2={i * 25}
            y2="490"
          />
        ))}
        <line x1="0" y1="490" x2="800" y2="490" />
      </g>

      {/* the trace */}
      <g mask={`url(#${id}-fade)`}>
        <path
          d={ECG}
          fill="none"
          stroke="var(--art-ink-soft)"
          strokeWidth="1.5"
        />
        <path
          d={ECG}
          fill="none"
          stroke={`url(#${id}-g)`}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="240 2400"
          className="motion-safe:animate-[dix-pulse-line_6s_linear_infinite]"
          filter={`url(#${id}-soft)`}
          opacity="0.9"
        />
        <path
          d={ECG}
          fill="none"
          stroke={`url(#${id}-g)`}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="240 2400"
          className="motion-safe:animate-[dix-pulse-line_6s_linear_infinite]"
        />
      </g>

      <rect width="800" height="500" fill={`url(#${id}-vig)`} />
    </svg>
  );
}

/* ------------------------------------------------------- 2 · DixCloud art */

export function Strata() {
  const id = "art-strata";
  const layers = Array.from({ length: 15 }, (_, i) => i);

  return (
    <svg
      viewBox="0 0 640 400"
      preserveAspectRatio="xMidYMid slice"
      className={plate}
      aria-hidden
    >
      <defs>
        <BrandDefs id={id} />
      </defs>

      <rect width="640" height="400" fill="var(--art-bg)" />

      <ellipse
        cx="330"
        cy="150"
        rx="200"
        ry="120"
        fill="#3aa0ea"
        filter={`url(#${id}-blur)`}
        style={{ opacity: `calc(0.34 * var(--art-glow) + 0.14)` }}
      />

      {/* cloud drawn as a topographic survey */}
      <g fill="none" strokeLinecap="round">
        {layers.map((i) => {
          const t = i / (layers.length - 1);
          const y = 108 + i * 15;
          const isKey = i % 4 === 0;
          return (
            <path
              key={i}
              d={wave(640, y, 26 - t * 16, 1.1 + t * 0.35, i * 0.42)}
              stroke={isKey ? `url(#${id}-g)` : "var(--art-ink-soft)"}
              strokeWidth={isKey ? 1.7 : 1}
              opacity={isKey ? 0.95 : 0.7 - t * 0.25}
            />
          );
        })}
      </g>

      {/* three regions, three providers */}
      <g
        stroke="var(--art-ink)"
        fill="none"
        strokeWidth="1.2"
        opacity="0.55"
      >
        {[160, 320, 480].map((x, i) => (
          <g key={x}>
            <circle cx={x} cy={332} r="16" />
            <circle cx={x} cy={332} r="4" fill="var(--art-ink)" stroke="none" />
            <line x1={x} y1={306} x2={x} y2={316} strokeDasharray="2 3" />
            {i < 2 ? (
              <line
                x1={x + 16}
                y1="332"
                x2={x + 144}
                y2="332"
                strokeDasharray="4 5"
              />
            ) : null}
          </g>
        ))}
      </g>
    </svg>
  );
}

/* ------------------------------------------------------ 3 · DixHealth art */

export function Systole() {
  const id = "art-systole";
  const nodes = heartPoints(34, 320, 196, 8.4);

  return (
    <svg
      viewBox="0 0 640 400"
      preserveAspectRatio="xMidYMid slice"
      className={plate}
      aria-hidden
    >
      <defs>
        <BrandDefs id={id} />
      </defs>

      <rect width="640" height="400" fill="var(--art-bg)" />

      <ellipse
        cx="320"
        cy="200"
        rx="180"
        ry="140"
        fill="#3fd0a8"
        filter={`url(#${id}-blur)`}
        style={{ opacity: `calc(0.3 * var(--art-glow) + 0.12)` }}
      />

      {/* chords — every record talking to every other */}
      <g stroke="var(--art-ink-soft)" strokeWidth="0.8" fill="none">
        {nodes.map((a, i) =>
          nodes
            .filter((_, j) => (i * 7 + j) % 11 === 0 && j > i)
            .map((b, k) => (
              <line
                key={`${i}-${k}`}
                x1={a[0]}
                y1={a[1]}
                x2={b[0]}
                y2={b[1]}
              />
            )),
        )}
      </g>

      {/* the outline */}
      <polygon
        points={nodes.map((p) => p.join(",")).join(" ")}
        fill="none"
        stroke={`url(#${id}-g)`}
        strokeWidth="2"
        strokeLinejoin="round"
        opacity="0.95"
      />
      <polygon
        points={nodes.map((p) => p.join(",")).join(" ")}
        fill="none"
        stroke={`url(#${id}-g)`}
        strokeWidth="6"
        strokeLinejoin="round"
        filter={`url(#${id}-soft)`}
        style={{ opacity: `calc(0.55 * var(--art-glow))` }}
      />

      {/* nodes */}
      <g>
        {nodes.map((p, i) => (
          <circle
            key={i}
            cx={p[0]}
            cy={p[1]}
            r={i % 5 === 0 ? 3.4 : 2}
            fill="var(--art-bg)"
            stroke={`url(#${id}-g)`}
            strokeWidth="1.4"
            className="motion-safe:animate-[dix-node_4.5s_ease-in-out_infinite]"
            style={{
              animationDelay: `${(i % 10) * 0.22}s`,
              transformOrigin: `${p[0]}px ${p[1]}px`,
            }}
          />
        ))}
      </g>

      {/* baseline vitals */}
      <path
        d="M40 344 H190 l14-26 12 52 14-26 H420 l16-34 14 68 16-34 H600"
        fill="none"
        stroke="var(--art-ink)"
        strokeWidth="1.4"
        opacity="0.4"
      />
    </svg>
  );
}

/* ----------------------------------------------------- 4 · DixDevelop art */

export function Helix() {
  const id = "art-helix";
  const steps = 44;
  const rungs = Array.from({ length: steps }, (_, i) => {
    const t = i / (steps - 1);
    const x = 60 + t * 520;
    const a = t * Math.PI * 4.2;
    const y1 = 200 + Math.sin(a) * 96;
    const y2 = 200 + Math.sin(a + Math.PI) * 96;
    return { x: f(x), y1: f(y1), y2: f(y2), t };
  });

  const strand = (offset: number) => {
    let d = "";
    for (let i = 0; i <= 160; i++) {
      const t = i / 160;
      const x = 60 + t * 520;
      const y = 200 + Math.sin(t * Math.PI * 4.2 + offset) * 96;
      d += `${i === 0 ? "M" : "L"}${f(x)} ${f(y)} `;
    }
    return d.trim();
  };

  return (
    <svg
      viewBox="0 0 640 400"
      preserveAspectRatio="xMidYMid slice"
      className={plate}
      aria-hidden
    >
      <defs>
        <BrandDefs id={id} />
      </defs>

      <rect width="640" height="400" fill="var(--art-bg)" />

      <ellipse
        cx="320"
        cy="200"
        rx="220"
        ry="120"
        fill="#44f17f"
        filter={`url(#${id}-blur)`}
        style={{ opacity: `calc(0.28 * var(--art-glow) + 0.12)` }}
      />

      {/* rungs read as lines of code */}
      <g strokeLinecap="round">
        {rungs.map((r, i) => {
          const key = i % 3 === 0;
          return (
            <line
              key={i}
              x1={r.x}
              y1={r.y1}
              x2={r.x}
              y2={r.y2}
              stroke={key ? `url(#${id}-gv)` : "var(--art-ink)"}
              strokeWidth={key ? 2.4 : 1.1}
              opacity={key ? 0.85 : 0.28}
            />
          );
        })}
      </g>

      {/* base pairs sitting on the strands */}
      <g>
        {rungs
          .filter((_, i) => i % 3 === 0)
          .map((r, i) => (
            <g key={i}>
              <circle
                cx={r.x}
                cy={r.y1}
                r="3.4"
                fill="var(--art-bg)"
                stroke={`url(#${id}-g)`}
                strokeWidth="1.6"
              />
              <circle
                cx={r.x}
                cy={r.y2}
                r="2.6"
                fill="var(--art-bg)"
                stroke="var(--art-ink)"
                strokeWidth="1.3"
                opacity="0.6"
              />
            </g>
          ))}
      </g>

      <path
        d={strand(0)}
        fill="none"
        stroke={`url(#${id}-g)`}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d={strand(Math.PI)}
        fill="none"
        stroke="var(--art-ink)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.62"
      />

      {/* the brackets that hold it together */}
      <g
        fill="none"
        stroke="var(--art-ink)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.5"
      >
        <path d="M34 152 C18 168 18 232 34 248" />
        <path d="M606 152 C622 168 622 232 606 248" />
      </g>
    </svg>
  );
}

/* --------------------------------------------------- 5 · about-page plate */

export function AnatomyPlate() {
  const id = "art-anatomy";
  const spokes = Array.from({ length: 48 }, (_, i) => i);
  const ring = (r: number, n: number, phase: number) =>
    Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2 + phase;
      return [f(300 + Math.cos(a) * r), f(280 + Math.sin(a) * r)] as const;
    });

  const inner = ring(74, 9, -0.3);
  const outer = ring(150, 15, 0.2);

  return (
    <svg
      viewBox="0 0 600 560"
      preserveAspectRatio="xMidYMid slice"
      className={plate}
      aria-hidden
    >
      <defs>
        <BrandDefs id={id} />
      </defs>

      <rect width="600" height="560" fill="var(--art-bg)" />
      <ellipse
        cx="300"
        cy="270"
        rx="200"
        ry="180"
        fill="#3aa0ea"
        filter={`url(#${id}-blur)`}
        style={{ opacity: `calc(0.26 * var(--art-glow) + 0.1)` }}
      />

      {/* graticule */}
      <g stroke="var(--art-ink-soft)" fill="none" strokeWidth="1">
        {spokes.map((i) => {
          const a = (i / spokes.length) * Math.PI * 2;
          const long = i % 4 === 0;
          const r0 = long ? 168 : 182;
          return (
            <line
              key={i}
              x1={f(300 + Math.cos(a) * r0)}
              y1={f(280 + Math.sin(a) * r0)}
              x2={f(300 + Math.cos(a) * 196)}
              y2={f(280 + Math.sin(a) * 196)}
            />
          );
        })}
        <circle cx="300" cy="280" r="196" />
        <circle cx="300" cy="280" r="150" />
        <circle cx="300" cy="280" r="74" />
      </g>

      {/* the network: outer ring feeding a hub */}
      <g stroke="var(--art-ink-soft)" strokeWidth="0.9" fill="none">
        {outer.map((o, i) =>
          inner
            .filter((_, j) => (i + j) % 3 === 0)
            .map((n, k) => (
              <line
                key={`${i}-${k}`}
                x1={o[0]}
                y1={o[1]}
                x2={n[0]}
                y2={n[1]}
              />
            )),
        )}
      </g>

      <g fill="none" stroke={`url(#${id}-g)`} strokeWidth="1.6">
        <polygon points={inner.map((p) => p.join(",")).join(" ")} />
      </g>

      <g>
        {outer.map((p, i) => (
          <circle
            key={i}
            cx={p[0]}
            cy={p[1]}
            r="3.2"
            fill="var(--art-bg)"
            stroke="var(--art-ink)"
            strokeWidth="1.3"
            opacity="0.75"
          />
        ))}
        {inner.map((p, i) => (
          <circle
            key={i}
            cx={p[0]}
            cy={p[1]}
            r="4.2"
            fill="var(--art-bg)"
            stroke={`url(#${id}-g)`}
            strokeWidth="1.8"
          />
        ))}
        <circle
          cx="300"
          cy="280"
          r="15"
          fill="var(--art-bg)"
          stroke={`url(#${id}-g)`}
          strokeWidth="2.2"
        />
        <circle cx="300" cy="280" r="5" fill="#44f17f" />
      </g>

      {/* plate numbering, as on an old anatomical print */}
      <g
        fill="var(--art-ink)"
        opacity="0.45"
        fontSize="11"
        fontFamily="var(--font-serif), Georgia, serif"
        fontStyle="italic"
      >
        <text x="300" y="512" textAnchor="middle">
          Fig. III — sistema integrado
        </text>
        <text x="300" y="72" textAnchor="middle" letterSpacing="3">
          D I X H E A L T H
        </text>
      </g>
    </svg>
  );
}
