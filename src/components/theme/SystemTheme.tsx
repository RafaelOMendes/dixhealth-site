"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-color-scheme: dark)";

/**
 * The site has no theme switcher — it simply obeys the operating system.
 *
 * `themeInitScript` stamps `data-theme` on <html> before the first paint, so
 * there is never a flash. This component exists only to keep that attribute
 * honest if the OS flips light/dark while the page is open.
 */
function subscribe(onStoreChange: () => void) {
  const mq = window.matchMedia(QUERY);
  const handle = () => {
    document.documentElement.dataset.theme = mq.matches ? "dark" : "light";
    onStoreChange();
  };
  mq.addEventListener("change", handle);
  return () => mq.removeEventListener("change", handle);
}

const getSnapshot = () => document.documentElement.dataset.theme ?? "dark";
const getServerSnapshot = () => "dark";

export function SystemTheme() {
  useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return null;
}

/** Injected as a blocking <script> so there is no theme flash. */
export const themeInitScript = `
(function(){
  try {
    document.documentElement.dataset.theme =
      window.matchMedia("${QUERY}").matches ? "dark" : "light";
  } catch (e) {
    document.documentElement.dataset.theme = "dark";
  }
})();
`;
