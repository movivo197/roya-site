import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Lang = "fa" | "en";
export type Theme = "dark" | "light";

type Prefs = {
  lang: Lang;
  theme: Theme;
  setLang: (lang: Lang) => void;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const usePrefs = create<Prefs>()(
  persist(
    (set, get) => ({
      lang: "fa",
      theme: "dark",
      setLang: (lang) => set({ lang }),
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set({ theme: get().theme === "dark" ? "light" : "dark" }),
    }),
    { name: "roya-prefs-v1" },
  ),
);

export function applyDocumentPrefs(lang: Lang, theme: Theme) {
  const root = document.documentElement;
  root.lang = lang;
  root.dir = lang === "fa" ? "rtl" : "ltr";
  root.dataset.theme = theme;
}
