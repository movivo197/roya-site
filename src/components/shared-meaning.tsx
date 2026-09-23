import { joinSourceNames, sharedMeanings } from "@/lib/consensus";
import { t } from "@/lib/i18n";
import type { Lang } from "@/lib/prefs";
import type { SymbolEntry } from "@/data/symbols";

export function SharedMeaning({ symbol, lang }: { symbol: SymbolEntry; lang: Lang }) {
  const items = sharedMeanings(symbol);
  if (!items.length) return null;
  return (
    <div className="mt-3 rounded-md border border-border bg-surface px-3 py-3">
      <p className="text-xs font-medium text-muted">{t(lang, "shared")}</p>
      <ul className="mt-2 flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.id} className="text-sm leading-relaxed">
            <span className="text-muted">{joinSourceNames(item.keys, lang)}</span>
            <span> — {item.label[lang]}</span>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs leading-relaxed text-subtle">{t(lang, "sharedHint")}</p>
    </div>
  );
}
