import { SOURCE_LENS, sourceMeaning } from "@/data/source-gloss";
import { sourceLabel } from "@/data/source-labels";
import type { SourceKey } from "@/data/symbols";
import { t } from "@/lib/i18n";
import type { Lang } from "@/lib/prefs";

export function SourceNote({
  sourceKey,
  text,
  title,
  lang,
}: {
  sourceKey: SourceKey;
  text: string;
  title: string;
  lang: Lang;
}) {
  const meaning = sourceMeaning(sourceKey, title, text, lang);
  return (
    <div className="rounded-md bg-raised px-3 py-2">
      <p className="text-xs text-subtle">{sourceLabel(sourceKey, lang)}</p>
      <p className="mt-1 text-[11px] leading-relaxed text-subtle">{SOURCE_LENS[sourceKey][lang]}</p>
      <p className="mt-2 text-sm leading-relaxed">{text}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        <span className="font-medium text-fg/80">{t(lang, "meaning")}: </span>
        {meaning}
      </p>
    </div>
  );
}
