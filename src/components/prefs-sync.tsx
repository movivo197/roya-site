import { useEffect } from "react";
import { applyDocumentPrefs, usePrefs } from "@/lib/prefs";

export function PrefsSync() {
  const lang = usePrefs((s) => s.lang);
  const theme = usePrefs((s) => s.theme);

  useEffect(() => {
    applyDocumentPrefs(lang, theme);
  }, [lang, theme]);

  return null;
}
