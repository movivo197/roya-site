import type { EnBlock } from "@/data/symbols-en";
import type { RawSymbol, SourceKey } from "@/data/meta";

export type PackedSymbol = {
  id: string;
  title: string;
  titleEn: string;
  keys: string[];
  keysEn: string[];
  category: RawSymbol["category"];
  conclusion: string;
  conclusionEn: string;
  counsel: string;
  counselEn: string;
  src: Partial<Record<SourceKey, [string, string]>>;
};

export function unpack(list: PackedSymbol[]): {
  raw: RawSymbol[];
  en: Record<string, EnBlock>;
} {
  const raw: RawSymbol[] = [];
  const en: Record<string, EnBlock> = {};
  for (const p of list) {
    const sources: RawSymbol["sources"] = {};
    const sourcesEn: EnBlock["sources"] = {};
    (Object.keys(p.src) as SourceKey[]).forEach((k) => {
      const pair = p.src[k];
      if (!pair) return;
      sources[k] = pair[0];
      sourcesEn[k] = pair[1];
    });
    raw.push({
      id: p.id,
      title: p.title,
      keys: p.keys,
      category: p.category,
      sources,
      conclusion: p.conclusion,
      counsel: p.counsel,
    });
    en[p.id] = {
      title: p.titleEn,
      keys: p.keysEn,
      conclusion: p.conclusionEn,
      counsel: p.counselEn,
      sources: sourcesEn,
    };
  }
  return { raw, en };
}
