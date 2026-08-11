"use client";

import { useCallback, useMemo, useSyncExternalStore, type ReactNode } from "react";

export type ThemeMode = "system" | "light" | "dark";
type Resolved = "light" | "dark";
type State = { mode: ThemeMode; resolved: Resolved };

const STORAGE_KEY = "dix-theme";

/**
 * The theme lives outside React: a blocking script sets `data-theme` on <html>
 * before first paint, and this store keeps the UI in sync with it. Modelling it
 * as an external store (rather than state + effects) means no cascading render
 * on mount and no flash.
 */
const SERVER_STATE: State = { mode: "system", resolved: "dark" };

let state: State = SERVER_STATE;
let started = false;
const listeners = new Set<() => void>();

const systemDark = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

function readStoredMode(): ThemeMode {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "light" || v === "dark" ? v : "system";
  } catch {
    return "system";
  }
}

function commit(mode: ThemeMode) {
  const resolved: Resolved =
    mode === "system" ? (systemDark() ? "dark" : "light") : mode;

  if (state.mode === mode && state.resolved === resolved) return;

  state = { mode, resolved };
  document.documentElement.dataset.theme = resolved;
  listeners.forEach((l) => l());
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);

  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const follow = () => commit(state.mode);
  mq.addEventListener("change", follow);

  if (!started) {
    started = true;
    commit(readStoredMode());
  }

  return () => {
    listeners.delete(onChange);
    mq.removeEventListener("change", follow);
  };
}

const getSnapshot = () => state;
const getServerSnapshot = () => SERVER_STATE;

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function useTheme() {
  const { mode, resolved } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const setMode = useCallback((m: ThemeMode) => {
    try {
      if (m === "system") localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, m);
    } catch {
      // Private mode / storage disabled — the choice just won't persist.
    }
    commit(m);
  }, []);

  const cycle = useCallback(() => {
    setMode(mode === "system" ? "light" : mode === "light" ? "dark" : "system");
  }, [mode, setMode]);

  return useMemo(
    () => ({ mode, resolved, setMode, cycle }),
    [mode, resolved, setMode, cycle],
  );
}

/** Injected as a blocking <script> so there is no theme flash. */
export const themeInitScript = `
(function(){
  try {
    var s = localStorage.getItem("${STORAGE_KEY}");
    var m = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme =
      (s === "light" || s === "dark") ? s : (m ? "dark" : "light");
  } catch (e) {
    document.documentElement.dataset.theme = "dark";
  }
})();
`;
