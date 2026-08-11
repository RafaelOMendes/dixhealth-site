"use client";

import { AnimatePresence, motion } from "motion/react";
import { useTheme, type ThemeMode } from "./ThemeProvider";

const LABEL: Record<ThemeMode, string> = {
  system: "Tema: sistema",
  light: "Tema: claro",
  dark: "Tema: escuro",
};

export function ThemeToggle() {
  const { mode, cycle } = useTheme();

  return (
    <button
      type="button"
      onClick={cycle}
      title={`${LABEL[mode]} — clique para alternar`}
      aria-label={`${LABEL[mode]}. Clique para alternar entre sistema, claro e escuro.`}
      className="relative grid h-9 w-9 shrink-0 place-items-center rounded-full text-[color:var(--ink-2)] transition-colors hover:bg-black/5 hover:text-[color:var(--ink)] dark:hover:bg-white/10"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mode}
          initial={{ opacity: 0, rotate: -70, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 70, scale: 0.6 }}
          transition={{ duration: 0.24, ease: [0.32, 0.72, 0, 1] }}
          className="grid place-items-center"
        >
          {mode === "system" ? <IconSystem /> : null}
          {mode === "light" ? <IconSun /> : null}
          {mode === "dark" ? <IconMoon /> : null}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

const base = {
  width: 17,
  height: 17,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconSun() {
  return (
    <svg {...base}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.6v2.2M12 19.2v2.2M4.2 12H2M22 12h-2.2M5.9 5.9 4.4 4.4M19.6 19.6l-1.5-1.5M18.1 5.9l1.5-1.5M4.4 19.6l1.5-1.5" />
    </svg>
  );
}

function IconMoon() {
  return (
    <svg {...base}>
      <path d="M20.5 14.3A8.6 8.6 0 0 1 9.7 3.5a8.6 8.6 0 1 0 10.8 10.8Z" />
    </svg>
  );
}

function IconSystem() {
  return (
    <svg {...base}>
      <rect x="2.6" y="4" width="18.8" height="13" rx="2.2" />
      <path d="M8.4 20.5h7.2" />
    </svg>
  );
}
