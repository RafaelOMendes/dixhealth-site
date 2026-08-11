import type { CSSProperties } from "react";

/**
 * Tailwind v4 pipes globals.css through Lightning CSS, which drops
 * `backdrop-filter` declarations on the floor. Inline styles skip that pass,
 * so every frosted surface gets its blur from here.
 *
 * Pair with the `liquid liquid-rim` classes, which supply the tint, the drop
 * shadow and the specular edge.
 */
export const glassStyle: CSSProperties = {
  backdropFilter: "blur(16px) saturate(var(--glass-tint))",
  WebkitBackdropFilter: "blur(16px) saturate(var(--glass-tint))",
};

export const glassStyleSoft: CSSProperties = {
  backdropFilter: "blur(10px) saturate(var(--glass-tint))",
  WebkitBackdropFilter: "blur(10px) saturate(var(--glass-tint))",
};

/** Bends the already-blurred backdrop along the rim. Chromium only. */
export const refractionStyle = (soft = false): CSSProperties => ({
  backdropFilter: `url(#dix-liquid-glass${soft ? "-soft" : ""})`,
  WebkitBackdropFilter: `url(#dix-liquid-glass${soft ? "-soft" : ""})`,
});
