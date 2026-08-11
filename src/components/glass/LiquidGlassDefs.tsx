"use client";

import { useSyncExternalStore } from "react";

/**
 * Displacement map for the refraction pass.
 *
 * feDisplacementMap samples the source at
 *   (x + scale * (R - 0.5), y + scale * (G - 0.5))
 * so mid-grey (#808080) means "leave this pixel alone". We paint a neutral
 * field, ramp red left→right and green top→bottom across a rounded rect, then
 * stamp a blurred neutral rect back over the middle. Result: the interior is
 * untouched and light bends only along the rim — the way a real lens behaves.
 */
const MAP = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240">
  <defs>
    <linearGradient id="rx" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#000000"/>
      <stop offset="100%" stop-color="#ff0000"/>
    </linearGradient>
    <linearGradient id="gy" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000"/>
      <stop offset="100%" stop-color="#00ff00"/>
    </linearGradient>
    <filter id="soft" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="14"/>
    </filter>
    <filter id="softer" x="-25%" y="-25%" width="150%" height="150%">
      <feGaussianBlur stdDeviation="18"/>
    </filter>
  </defs>
  <rect width="240" height="240" fill="#808080"/>
  <g filter="url(#soft)">
    <rect width="240" height="240" rx="60" fill="url(#rx)"/>
    <rect width="240" height="240" rx="60" fill="url(#gy)" style="mix-blend-mode:screen"/>
  </g>
  <rect x="26" y="26" width="188" height="188" rx="46" fill="#808080" filter="url(#softer)"/>
</svg>`;

const MAP_URI = `data:image/svg+xml;utf8,${encodeURIComponent(MAP)}`;

/**
 * Chromium is currently the only engine that both parses *and* paints an SVG
 * filter reference inside backdrop-filter. Safari and Firefox would silently
 * drop the whole declaration, so we keep them on the CSS-only glass, which
 * already looks right.
 */
const REDUCED_TRANSPARENCY = "(prefers-reduced-transparency: reduce)";

let engineCapable: boolean | null = null;

function detectEngine() {
  const supports =
    typeof CSS !== "undefined" &&
    typeof CSS.supports === "function" &&
    (CSS.supports("backdrop-filter", "url(#x)") ||
      CSS.supports("-webkit-backdrop-filter", "url(#x)"));

  type UAD = { brands?: { brand: string }[] };
  const uad = (navigator as Navigator & { userAgentData?: UAD }).userAgentData;

  // Edge and Opera are Chromium too — the "Chrome/" token covers them all
  // while excluding Safari and Firefox.
  const chromium = uad?.brands
    ? uad.brands.some((b) => b.brand === "Chromium")
    : /Chrome\/\d+/.test(navigator.userAgent);

  return supports && chromium;
}

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_TRANSPARENCY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getSnapshot() {
  if (engineCapable === null) engineCapable = detectEngine();
  return engineCapable && !window.matchMedia(REDUCED_TRANSPARENCY).matches;
}

const getServerSnapshot = () => false;

export function useRefractionSupport() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Mounted once, near the root. Renders nothing visible. */
export function LiquidGlassDefs() {
  return (
    <svg
      aria-hidden
      focusable="false"
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <defs>
        <filter
          id="dix-liquid-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feImage
            href={MAP_URI}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            result="map"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="map"
            scale="52"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>

        {/* Gentler variant for large panels, where a strong bend reads as a bug. */}
        <filter
          id="dix-liquid-glass-soft"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feImage
            href={MAP_URI}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            result="map"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="map"
            scale="26"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
