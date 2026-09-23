import { matchSymbols, symbolTitle, type Mood } from "@/lib/interpret";
import type { DreamEntry } from "@/lib/journal";
import type { Lang } from "@/lib/prefs";

export type MonthPattern = {
  monthCount: number;
  mood: Mood | null;
  moodCount: number;
  repeats: { id: string; title: string; count: number }[];
};

export function monthPattern(dreams: DreamEntry[], lang: Lang, now = new Date()): MonthPattern {
  const key = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const month = dreams.filter((d) => d.date.startsWith(key));
  const moodCounts = new Map<Mood, number>();
  const symbolCounts = new Map<string, { title: string; count: number }>();

  for (const dream of month) {
    moodCounts.set(dream.mood, (moodCounts.get(dream.mood) ?? 0) + 1);
    const hits = dream.reading?.hits?.length
      ? dream.reading.hits
      : matchSymbols(dream.text, dream.choices ?? dream.reading?.choices ?? {}).hits;
    const seen = new Set<string>();
    for (const hit of hits) {
      const id = hit.symbol?.id;
      if (!id || seen.has(id)) continue;
      seen.add(id);
      const prev = symbolCounts.get(id);
      if (prev) prev.count += 1;
      else symbolCounts.set(id, { title: symbolTitle(hit.symbol, lang), count: 1 });
    }
  }

  let mood: Mood | null = null;
  let moodCount = 0;
  for (const [name, count] of moodCounts) {
    if (count > moodCount) {
      mood = name;
      moodCount = count;
    }
  }

  const repeats = [...symbolCounts.entries()]
    .filter(([, row]) => row.count >= 2)
    .sort((a, b) => b[1].count - a[1].count || a[1].title.localeCompare(b[1].title))
    .slice(0, 4)
    .map(([id, row]) => ({ id, title: row.title, count: row.count }));

  return { monthCount: month.length, mood, moodCount, repeats };
}
