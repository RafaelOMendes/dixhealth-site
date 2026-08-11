"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

import { nav as navItems, waLink } from "@/lib/content";
import { glassStyle, refractionStyle } from "@/lib/glass";
import { useRefractionSupport } from "@/components/glass/LiquidGlassDefs";
import { Wordmark } from "@/components/brand/Wordmark";

type Rect = { left: number; width: number; center: number };

const DOCK_THRESHOLD = 72;
const ISLAND_GAP = 18;
const DOCK_TOP = 16;

const cx = (...c: (string | false | undefined)[]) =>
  c.filter(Boolean).join(" ");

/**
 * Window scroll is an external system, so it is read through
 * useSyncExternalStore rather than mirrored into state from an effect. That
 * also makes browser scroll restoration work: the first client snapshot
 * already reflects where the page actually is.
 */
function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

const isAtTop = () => window.scrollY < DOCK_THRESHOLD;
const serverIsAtTop = () => true;

export function LiquidNav() {
  const shellRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rectsRef = useRef<Rect[]>([]);
  const spyLockedUntil = useRef(0);
  const dragStartX = useRef(0);
  const didDrag = useRef(false);

  const reduceMotion = useReducedMotion();
  const refract = useRefractionSupport();

  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [dragging, setDragging] = useState(false);

  const docked = useSyncExternalStore(
    subscribeToScroll,
    isAtTop,
    serverIsAtTop,
  );

  /* ------------------------------------------------------ vertical dock */

  const y = useSpring(DOCK_TOP, {
    stiffness: 260,
    damping: 30,
    mass: 0.9,
  });

  const placeShell = useCallback(
    (isDocked: boolean, animate = true) => {
      const h = shellRef.current?.offsetHeight ?? 60;
      const next = isDocked ? DOCK_TOP : window.innerHeight - h - ISLAND_GAP;
      if (animate && !reduceMotion) y.set(next);
      else y.jump(next);
    },
    [y, reduceMotion],
  );

  // First placement happens before paint; later ones spring.
  const placed = useRef(false);
  useLayoutEffect(() => {
    placeShell(docked, placed.current);
    placed.current = true;
  }, [docked, placeShell]);

  // The island is anchored to the viewport bottom, so it has to be re-measured
  // whenever the viewport changes height (mobile URL bar, rotation).
  useEffect(() => {
    const onResize = () => placeShell(isAtTop(), false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [placeShell]);

  /* ----------------------------------------------------------- the pill */

  const pillX = useSpring(0, { stiffness: 620, damping: 44, mass: 0.85 });
  const pillW = useSpring(0, { stiffness: 520, damping: 46, mass: 0.85 });
  const squish = useMotionValue(1);
  const stretch = useSpring(squish, { stiffness: 340, damping: 26 });

  // Velocity drives the elastic squash — the detail that makes it feel liquid.
  // Sampled every frame rather than on change, so it relaxes back to 1 once
  // the pill stops moving (a "change" listener never fires at rest).
  useAnimationFrame(() => {
    if (reduceMotion) return;
    const target = 1 + Math.min(Math.abs(pillX.getVelocity()) / 3400, 0.3);
    if (Math.abs(squish.get() - target) > 0.002) squish.set(target);
  });

  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list) return;
    const base = list.getBoundingClientRect();
    rectsRef.current = tabRefs.current.map((el) => {
      if (!el) return { left: 0, width: 0, center: 0 };
      const r = el.getBoundingClientRect();
      return {
        left: r.left - base.left,
        width: r.width,
        center: r.left - base.left + r.width / 2,
      };
    });
  }, []);

  const snapTo = useCallback(
    (index: number, instant = false) => {
      const r = rectsRef.current[index];
      if (!r || r.width === 0) return;
      if (instant) {
        pillX.jump(r.left);
        pillW.jump(r.width);
      } else {
        pillX.set(r.left);
        pillW.set(r.width);
      }
    },
    [pillX, pillW],
  );

  // Keep the pill glued to its tab while the shell morphs, resizes or reflows.
  useLayoutEffect(() => {
    measure();
    snapTo(active, true);
  }, [measure, snapTo, active]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    let first = true;
    const ro = new ResizeObserver(() => {
      measure();
      if (!dragging) snapTo(active, first);
      first = false;
    });

    ro.observe(list);
    tabRefs.current.forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
  }, [measure, snapTo, active, dragging]);

  /* -------------------------------------------------------- section spy */

  useEffect(() => {
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (Date.now() < spyLockedUntil.current) return;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const i = navItems.findIndex((n) => n.id === visible.target.id);
        if (i >= 0) setActive(i);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.01, 0.5, 1] },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const goTo = useCallback((index: number) => {
    const item = navItems[index];
    if (!item) return;
    spyLockedUntil.current = Date.now() + 900;
    setActive(index);
    document
      .getElementById(item.id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  /* --------------------------------------------------- drag interaction */

  const indexAt = useCallback((clientX: number) => {
    const list = listRef.current;
    const rects = rectsRef.current;
    if (!list || !rects.length) return 0;
    const x = clientX - list.getBoundingClientRect().left;

    for (let i = 0; i < rects.length; i++) {
      const r = rects[i];
      if (x >= r.left && x <= r.left + r.width) return i;
    }
    // Outside the strip: clamp to the closest tab.
    let best = 0;
    let bestD = Infinity;
    rects.forEach((r, i) => {
      const d = Math.abs(x - r.center);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    });
    return best;
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    measure();
    dragStartX.current = e.clientX;
    didDrag.current = false;
    setDragging(true);
    setHovered(indexAt(e.clientX));
    try {
      listRef.current?.setPointerCapture(e.pointerId);
    } catch {
      // Pointer already released — dragging still works without capture.
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    if (Math.abs(e.clientX - dragStartX.current) > 4) didDrag.current = true;

    const i = indexAt(e.clientX);
    setHovered(i);

    const list = listRef.current;
    const rects = rectsRef.current;
    if (!list || !rects[i]) return;

    if (didDrag.current && !reduceMotion) {
      // The pill tracks the finger, but never escapes the strip.
      const x = e.clientX - list.getBoundingClientRect().left;
      const w = rects[i].width;
      const maxLeft = list.clientWidth - w;
      pillX.set(Math.max(0, Math.min(x - w / 2, maxLeft)));
      pillW.set(w);
    } else {
      snapTo(i);
    }
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const i = indexAt(e.clientX);
    setDragging(false);
    setHovered(null);
    if (listRef.current?.hasPointerCapture(e.pointerId)) {
      listRef.current.releasePointerCapture(e.pointerId);
    }
    goTo(i);
    requestAnimationFrame(() => snapTo(i));
  };

  const onPointerCancel = () => {
    setDragging(false);
    setHovered(null);
    snapTo(active);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const next =
        (active + dir + navItems.length) % navItems.length;
      tabRefs.current[next]?.focus();
      goTo(next);
    }
  };

  const shown = hovered ?? active;

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <motion.div
        ref={shellRef}
        style={{ x: "-50%", y, ...glassStyle }}
        className={cx(
          "pointer-events-auto absolute left-1/2 top-0 flex items-center gap-1",
          "liquid liquid-rim",
          "transition-[width,border-radius,padding,box-shadow] duration-[550ms]",
          "[transition-timing-function:cubic-bezier(0.32,0.72,0,1)]",
          docked
            ? "w-[min(1120px,calc(100vw_-_2rem))] rounded-[26px] px-3 py-2.5"
            : "w-[min(600px,calc(100vw_-_1.5rem))] rounded-full px-2 py-2",
        )}
      >
        {/* Edge refraction — bends the already-blurred backdrop at the rim.
            Purely additive: if the engine ignores it, the frosted glass below
            is untouched. */}
        {refract ? (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
            style={refractionStyle()}
          />
        ) : null}

        {/* Wordmark — docked only, and only where there is room for it */}
        <div
          className={cx(
            "relative z-10 overflow-hidden transition-all duration-[550ms]",
            "[transition-timing-function:cubic-bezier(0.32,0.72,0,1)]",
            docked
              ? "max-w-0 opacity-0 sm:ml-1 sm:mr-2 sm:max-w-[96px] sm:opacity-100"
              : "max-w-0 opacity-0",
          )}
        >
          <button
            onClick={() => goTo(0)}
            aria-label="Ir para o início"
            className="block shrink-0 cursor-pointer"
          >
            <Wordmark className="h-[22px] w-auto" />
          </button>
        </div>

        {/* Tab strip — the draggable surface */}
        <nav
          aria-label="Navegação principal"
          className="relative z-10 min-w-0 flex-1"
        >
          <div
            ref={listRef}
            role="tablist"
            tabIndex={-1}
            onKeyDown={onKeyDown}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={onPointerCancel}
            className={cx(
              "relative flex touch-none select-none items-stretch",
              dragging ? "cursor-grabbing" : "cursor-pointer",
            )}
          >
            {/* the lens */}
            <motion.span
              aria-hidden
              style={{
                x: pillX,
                width: pillW,
                scaleX: stretch,
              }}
              className={cx(
                "pointer-events-none absolute inset-y-0 left-0 rounded-full",
                "origin-center will-change-transform",
                "bg-white/70 dark:bg-white/12",
                "shadow-[inset_0_1px_0_rgb(255_255_255/0.9),0_2px_10px_-2px_rgb(16_22_27/0.25)]",
                "dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.28),0_4px_14px_-4px_rgb(0_0_0/0.7)]",
                "ring-1 ring-black/[0.04] dark:ring-white/10",
                "transition-[filter] duration-200",
                dragging && "brightness-110 saturate-150",
              )}
            >
              <span className="brand-gradient absolute inset-x-2 bottom-[3px] h-[2px] rounded-full opacity-70" />
            </motion.span>

            {navItems.map((item, i) => (
              <button
                key={item.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                aria-selected={active === i}
                aria-controls={item.id}
                onClick={(e) => {
                  e.preventDefault();
                  // A pointer press was already handled by endDrag. detail === 0
                  // means the click came from Enter/Space, which fires no
                  // pointer events at all.
                  if (e.detail === 0) goTo(i);
                }}
                className={cx(
                  "relative z-10 flex-1 rounded-full px-2 py-2.5 text-center",
                  "text-[13px] leading-none whitespace-nowrap transition-colors",
                  "duration-200 sm:px-3 sm:text-sm",
                  shown === i
                    ? "font-semibold text-[color:var(--ink)]"
                    : "font-medium text-[color:var(--ink-2)] hover:text-[color:var(--ink)]",
                )}
              >
                <span className="hidden sm:inline">{item.label}</span>
                <span className="sm:hidden">{item.short}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="relative z-10 flex shrink-0 items-center gap-1">
          {/* CTA — docked only, from lg up (below that the tabs need the room) */}
          <div
            className={cx(
              "overflow-hidden transition-all duration-[550ms]",
              "[transition-timing-function:cubic-bezier(0.32,0.72,0,1)]",
              docked
                ? "max-w-0 opacity-0 lg:max-w-[190px] lg:opacity-100"
                : "max-w-0 opacity-0",
            )}
          >
            <a
              href={waLink(
                "Olá! Vim pelo site da DixHealth e gostaria de conversar.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className={cx(
                "brand-gradient ml-1 block whitespace-nowrap rounded-full px-4 py-2",
                "text-[13px] font-semibold text-[#06231a]",
                "shadow-[0_2px_10px_-2px_rgb(58_160_234/0.6)]",
                "transition-transform duration-200 hover:scale-[1.03] active:scale-95",
              )}
            >
              Entre em contato
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
