import { SharedMeaning } from "@/components/shared-meaning";
import { SourceNote } from "@/components/source-note";
import { orderedSourceKeys } from "@/data/source-labels";
import type { SourceKey, SymbolEntry } from "@/data/symbols";
import { symbolSource, symbolTitle } from "@/lib/interpret";
import type { Lang } from "@/lib/prefs";

export function SymbolSources({
  symbol,
  lang,
  skip,
}: {
  symbol: SymbolEntry;
  lang: Lang;
  skip?: SourceKey | null;
}) {
  const srcMap = lang === "en" ? symbol.sourcesEn : symbol.sources;
  const keys = orderedSourceKeys(srcMap);
  const title = symbolTitle(symbol, lang);
  return (
    <div className="mt-2 flex flex-col gap-2">
      {keys.map((k) => {
        if (skip && k === skip) return null;
        const text = symbolSource(symbol, k, lang);
        if (!text) return null;
        return <SourceNote key={k} sourceKey={k} text={text} title={title} lang={lang} />;
      })}
      <SharedMeaning symbol={symbol} lang={lang} />
    </div>
  );
}
