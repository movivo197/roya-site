import { SYMBOLS, type SourceKey, type SymbolEntry } from "@/data/symbols";
import type { Lang } from "@/lib/prefs";

const ARABIC_YE = /ي/g;
const ARABIC_KAF = /ك/g;
const TATWEEL = /ـ/g;
const DIACRITICS = /[\u064B-\u065F\u0670]/g;

export function normalizeFa(input: string) {
  return input
    .replace(DIACRITICS, "")
    .replace(TATWEEL, "")
    .replace(ARABIC_YE, "ی")
    .replace(ARABIC_KAF, "ک")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

export type SceneRole = "مکان" | "حال" | "اتفاق";

export type MatchHit = {
  symbol: SymbolEntry;
  score: number;
  matched: string[];
  at: number;
  role: SceneRole;
};

export type SceneChoices = Record<string, string>;

export type ReadingAmbiguity = {
  span: string;
  word: string;
  options: { id: string; title: string; titleEn: string }[];
};

const PLACE_IDS = new Set([
  "sea",
  "river",
  "lake",
  "garden",
  "desert",
  "forest",
  "mountain",
  "bridge",
  "road",
  "mosque",
  "church",
  "temple",
  "kaaba",
]);

export function sceneRole(symbol: SymbolEntry): SceneRole {
  if (symbol.category === "خانه و مکان" || PLACE_IDS.has(symbol.id)) return "مکان";
  if (symbol.category === "طبیعت" || symbol.category === "پدیده" || symbol.category === "دین و معنا" || symbol.category === "خوراک") return "حال";
  return "اتفاق";
}

function bareDarIsPreposition(hay: string, rawKey: string, start: number, end: number) {
  if (normalizeFa(rawKey) !== "در") return false;
  const words = hay.slice(end).match(/[^\s]+/g) ?? [];
  const next = words[0] ?? "";
  const next2 = words[1] ?? "";
  const prev = hay.slice(0, start).match(/(\S+)\s*$/)?.[1] ?? "";
  const doorNext = new Set(["را", "بسته", "باز", "سفید", "چوبی", "کهنه", "بزرگ", "کوچک", "آهنی", "قدیمی", "ورودی"]);
  const doorPrev = new Set(["یک", "آن", "این", "همان", "پشت", "دم", "جلوی", "کنار"]);
  if (doorNext.has(next) || doorPrev.has(prev) || next2 === "را") return false;
  return true;
}

function spansFor(hay: string, rawKey: string): { start: number; end: number }[] {
  const k = normalizeFa(rawKey);
  if (k.length < 2) return [];
  const esc = k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(?:^|[^\\p{L}])(${esc})(?=$|[^\\p{L}])`, "gu");
  const out: { start: number; end: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(hay))) {
    const word = m[1] ?? "";
    const start = m.index + m[0].length - word.length;
    out.push({ start, end: start + word.length });
    if (m.index === re.lastIndex) re.lastIndex += 1;
  }
  return out;
}

export function matchSymbols(text: string, choices: SceneChoices = {}): {
  hits: MatchHit[];
  ambiguities: ReadingAmbiguity[];
} {
  const n = normalizeFa(text);
  if (!n) return { hits: [], ambiguities: [] };
  type Cand = { symbol: SymbolEntry; key: string; start: number; end: number; len: number };
  const cands: Cand[] = [];
  for (const symbol of SYMBOLS) {
    const seen = new Set<string>();
    for (const key of [...symbol.keys, ...symbol.keysEn, symbol.title, symbol.titleEn]) {
      const nk = normalizeFa(key);
      if (!nk || seen.has(nk)) continue;
      seen.add(nk);
      for (const sp of spansFor(n, key)) {
        if (bareDarIsPreposition(n, key, sp.start, sp.end)) continue;
        cands.push({ symbol, key, start: sp.start, end: sp.end, len: sp.end - sp.start });
      }
    }
  }
  cands.sort((a, b) => b.len - a.len || a.start - b.start);
  const taken: { start: number; end: number; len: number }[] = [];
  const accepted: Cand[] = [];
  for (const c of cands) {
    const covered = taken.some((t) => t.start <= c.start && t.end >= c.end && t.len > c.len);
    if (covered) continue;
    if (!taken.some((t) => t.start === c.start && t.end === c.end)) {
      taken.push({ start: c.start, end: c.end, len: c.len });
    }
    accepted.push(c);
  }

  const groups = new Map<string, Cand[]>();
  for (const c of accepted) {
    const span = `${c.start}:${c.end}`;
    const list = groups.get(span);
    if (list) list.push(c);
    else groups.set(span, [c]);
  }

  const ambiguities: ReadingAmbiguity[] = [];
  const kept: Cand[] = [];
  for (const [span, list] of groups) {
    const ids: string[] = [];
    for (const c of list) if (!ids.includes(c.symbol.id)) ids.push(c.symbol.id);
    if (ids.length > 1) {
      const choice = choices[span];
      if (choice && ids.includes(choice)) {
        kept.push(...list.filter((c) => c.symbol.id === choice));
      } else {
        ambiguities.push({
          span,
          word: n.slice(list[0].start, list[0].end),
          options: ids.map((id) => {
            const symbol = list.find((c) => c.symbol.id === id)!.symbol;
            return { id, title: symbol.title, titleEn: symbol.titleEn };
          }),
        });
      }
    } else {
      kept.push(...list);
    }
  }

  const byId = new Map<string, MatchHit>();
  for (const c of kept) {
    const bonus = c.len >= 4 ? 3 : 0;
    const prev = byId.get(c.symbol.id);
    if (!prev) {
      byId.set(c.symbol.id, {
        symbol: c.symbol,
        score: c.len + bonus,
        matched: [c.key],
        at: c.start,
        role: sceneRole(c.symbol),
      });
    } else {
      prev.at = Math.min(prev.at, c.start);
      if (!prev.matched.includes(c.key)) {
        prev.matched.push(c.key);
        prev.score += c.len + bonus;
      }
    }
  }
  const hits = [...byId.values()]
    .sort((a, b) => b.score - a.score || a.at - b.at)
    .slice(0, 8);
  return { hits, ambiguities };
}

export type Mood =
  | "آرام"
  | "شاد"
  | "مضطرب"
  | "ترس"
  | "شگفتی"
  | "غم"
  | "مبهم";

export const MOODS: Mood[] = ["آرام", "شاد", "مضطرب", "ترس", "شگفتی", "غم", "مبهم"];

export type Tone = "بشارت" | "هشدار" | "درونی" | "گذار";

export type LocalReading = {
  tone: Tone;
  headline: string;
  conclusion: string;
  counsel: string[];
  hits: MatchHit[];
  leadCount: number;
  ambiguities: ReadingAmbiguity[];
  choices: SceneChoices;
  sourcesUsed: SourceKey[];
};

function detectTone(mood: Mood, hits: MatchHit[]): Tone {
  const ids = new Set(hits.map((h) => h.symbol.id));
  if (mood === "ترس" || ids.has("devil") || ids.has("flood") || ids.has("thief") || ids.has("nightmare") || ids.has("assault") || ids.has("war") || ids.has("sleepparalysis")) return "هشدار";
  if (ids.has("death") || ids.has("bridge") || ids.has("fall") || ids.has("lost") || ids.has("divorce") || ids.has("childbirth") || ids.has("resurrection")) return "گذار";
  if (mood === "شاد" || ids.has("garden") || ids.has("sun") || ids.has("quran") || ids.has("fly") || ids.has("rainbow") || ids.has("dawn")) return "بشارت";
  return "درونی";
}

const TONE_HEAD: Record<Tone, Record<Lang, string>> = {
  بشارت: {
    fa: "این خواب بیشتر بشارت و گشایش است تا تهدید.",
    en: "This dream leans toward glad tidings and opening, not a threat.",
  },
  هشدار: {
    fa: "این خواب هشدار است؛ نه محکومیت. می‌توان مسیر را عوض کرد.",
    en: "This is a warning, not a sentence. The path can still change.",
  },
  درونی: {
    fa: "این خواب بیشتر حدیث نفس است: آینهٔ حال و خواسته‌های شما.",
    en: "This is mostly the self speaking: a mirror of mood and wish.",
  },
  گذار: {
    fa: "این خواب از عبور سخن می‌گوید: چیزی تمام می‌شود تا چیزی بیاید.",
    en: "This dream speaks of passage: something ends so something can arrive.",
  },
};

const MOOD_COUNSEL: Record<Mood, Record<Lang, string>> = {
  آرام: {
    fa: "آرامش خواب را جدی بگیرید؛ تصمیم از روی طمأنینه بگیرید نه شتاب.",
    en: "Take the calm seriously. Decide from steadiness, not haste.",
  },
  شاد: {
    fa: "شادی را شکر کنید و بی‌صدا نگه دارید تا بپزد.",
    en: "Give thanks for the joy and keep it quiet until it ripens.",
  },
  مضطرب: {
    fa: "اضطراب خواب اغلب کار ناتمام بیداری است؛ یک گره کوچک را امروز باز کنید.",
    en: "Dream anxiety is often unfinished waking work. Untie one small knot today.",
  },
  ترس: {
    fa: "خواب ترسناک را برای هر کسی نقل نکنید. روشنی، ذکر و کار روز اثرش را کم می‌کند.",
    en: "Do not tell a frightening dream to everyone. Light and daytime work weaken it.",
  },
  شگفتی: {
    fa: "شگفتی یعنی نقشهٔ قبلی تنگ شده. کنجکاوی را جای ترس بگذارید.",
    en: "Awe means the old map is too small. Put curiosity where fear was.",
  },
  غم: {
    fa: "غم در خواب تخلیه است. اجازه دهید بدون نمایش جاری شود.",
    en: "Grief in a dream is a release. Let it move without a performance.",
  },
  مبهم: {
    fa: "ابهام یعنی هنوز سؤال درست پرسیده نشده. عجله در معناکردن لازم نیست.",
    en: "Unclarity means the right question is not yet asked. Do not rush a meaning.",
  },
};

function beatNames(beats: MatchHit[], lang: Lang) {
  const shown = beats.slice(0, 4);
  const sep = lang === "en" ? ", " : "، ";
  const base = shown.map((b) => symbolTitle(b.symbol, lang)).join(sep);
  const extra = beats.length - shown.length;
  if (!extra) return base;
  return lang === "en" ? `${base}, and ${extra} more` : `${base} و ${extra} تای دیگر`;
}

function sceneLine(beats: MatchHit[], lang: Lang) {
  if (!beats.length) return "";
  const places = beats.filter((b) => b.role === "مکان");
  const states = beats.filter((b) => b.role === "حال");
  const events = beats.filter((b) => b.role === "اتفاق");
  const open = beats[0].role;
  const close = beats[beats.length - 1].role;
  const P = beatNames(places, lang);
  const S = beatNames(states, lang);
  const E = beatNames(events, lang);
  if (lang === "en") {
    if (open === "مکان" && events.length && close === "اتفاق") {
      return states.length
        ? `The scene opens in ${P}. Its state is ${S}. What happens comes after: ${E}.`
        : `The scene opens in ${P}, and then ${E} arrives.`;
    }
    if (open === "اتفاق" && places.length) {
      return states.length
        ? `${E} comes first, and only then the place is clear: ${P}. In between, the state is ${S}.`
        : `${E} comes first, and only then the place is clear: ${P}.`;
    }
    if (open === "حال" && events.length && close === "اتفاق") {
      return places.length
        ? `The state ${S} comes first. The place is ${P}, and then ${E} happens.`
        : `The scene starts in the state of ${S} and arrives at ${E}.`;
    }
    if (events.length && !places.length && !states.length) {
      return `The scene is almost only an event: ${E}. Place and state were not written.`;
    }
    if (places.length && !events.length && !states.length) {
      return `The scene is mostly a place: ${P}. Nothing happens in it.`;
    }
    if (states.length && !events.length && !places.length) {
      return `The scene is a state, not a plot: ${S}.`;
    }
    const seq = beats
      .map((b) => `${symbolTitle(b.symbol, lang)} (${b.role === "مکان" ? "place" : b.role === "حال" ? "state" : "event"})`)
      .join(", then ");
    return `Scene order: ${seq}.`;
  }
  if (open === "مکان" && events.length && close === "اتفاق") {
    return states.length
      ? `صحنه در ${P} باز می‌شود. حالش ${S} است. اتفاق بعد از آن می‌آید: ${E}.`
      : `صحنه در ${P} باز می‌شود و بعد ${E} از راه می‌رسد.`;
  }
  if (open === "اتفاق" && places.length) {
    return states.length
      ? `اول ${E} می‌آید، بعد جا معلوم می‌شود: ${P}. حالِ میان صحنه ${S} است.`
      : `اول ${E} می‌آید، بعد جا معلوم می‌شود: ${P}.`;
  }
  if (open === "حال" && events.length && close === "اتفاق") {
    return places.length
      ? `حالِ ${S} اول است. مکان ${P} است و اتفاق بعد می‌آید: ${E}.`
      : `صحنه با حالِ ${S} شروع می‌شود و به ${E} می‌رسد.`;
  }
  if (events.length && !places.length && !states.length) {
    return `صحنه تقریباً فقط اتفاق است: ${E}. مکان و حال نوشته نشده.`;
  }
  if (places.length && !events.length && !states.length) {
    return `صحنه بیشتر مکان است: ${P}. اتفاقی در آن نیامده.`;
  }
  if (states.length && !events.length && !places.length) {
    return `صحنه حال است نه ماجرا: ${S}.`;
  }
  const seq = beats
    .map((b) => `${symbolTitle(b.symbol, lang)} (${b.role})`)
    .join("، سپس ");
  return `ترتیب صحنه: ${seq}.`;
}

function spineOf(beats: MatchHit[]) {
  const place = beats.find((b) => b.role === "مکان");
  const state = beats.find((b) => b.role === "حال");
  const event = [...beats].reverse().find((b) => b.role === "اتفاق");
  const end = beats[beats.length - 1];
  const picked: MatchHit[] = [];
  const ids = new Set<string>();
  for (const b of [end, event, place, state]) {
    if (!b || ids.has(b.symbol.id)) continue;
    if (picked.length >= 3) break;
    picked.push(b);
    ids.add(b.symbol.id);
  }
  for (const b of beats) {
    if (picked.length >= 3) break;
    if (ids.has(b.symbol.id)) continue;
    picked.push(b);
    ids.add(b.symbol.id);
  }
  return picked.sort((a, b) => a.at - b.at);
}

export function synthesize(text: string, mood: Mood, lang: Lang = "fa", choices: SceneChoices = {}): LocalReading {
  const { hits: matched, ambiguities } = matchSymbols(text, choices);
  const tone = detectTone(mood, matched);
  const ordered = [...matched].sort((a, b) => a.at - b.at);
  const spine = spineOf(ordered);
  const spineIds = new Set(spine.map((h) => h.symbol.id));
  const hits = [...spine, ...ordered.filter((h) => !spineIds.has(h.symbol.id))];
  const end = ordered[ordered.length - 1];

  const ask =
    lang === "en"
      ? "One word has two meanings. Choose it before the scene can be read."
      : "یک واژه دو معنا دارد. تا انتخاب نکنید، صحنه خوانده نمی‌شود.";
  const empty =
    lang === "en"
      ? "No clear symbol matched. Add place, people, color, and how the scene ended. Until then, the dominant feeling is your guide."
      : "نماد روشنی در متن پیدا نشد. خواب را با جزئیات بیشتر بنویسید: مکان، اشخاص، رنگ، و پایان صحنه. تا آن هنگام، احساس غالب خود راهنماست.";
  const scene = sceneLine(ordered, lang);
  const gloss = end ? (lang === "en" ? end.symbol.conclusionEn : end.symbol.conclusion) : "";
  const conclusion = ordered.length === 0 ? (ambiguities.length ? ask : empty) : `${scene} ${gloss}`;

  const counsel = [
    MOOD_COUNSEL[mood][lang],
    ...spine.map((h) => (lang === "en" ? h.symbol.counselEn : h.symbol.counsel)),
  ].filter(Boolean);

  return {
    tone,
    headline: TONE_HEAD[tone][lang],
    conclusion,
    counsel: [...new Set(counsel)].slice(0, 4),
    hits,
    leadCount: spine.length,
    ambiguities,
    choices,
    sourcesUsed: [],
  };
}

export function searchBank(query: string): SymbolEntry[] {
  const q = normalizeFa(query);
  if (!q) return SYMBOLS;
  return SYMBOLS.filter((s) => {
    const hay = [
      s.title,
      s.titleEn,
      s.category,
      s.conclusion,
      s.conclusionEn,
      ...s.keys,
      ...s.keysEn,
    ]
      .map(normalizeFa)
      .join(" ");
    return hay.includes(q);
  });
}

export function symbolTitle(s: SymbolEntry, lang: Lang) {
  return lang === "en" ? s.titleEn : s.title;
}

export function symbolConclusion(s: SymbolEntry, lang: Lang) {
  return lang === "en" ? s.conclusionEn : s.conclusion;
}

export function symbolCounsel(s: SymbolEntry, lang: Lang) {
  return lang === "en" ? s.counselEn : s.counsel;
}

export function symbolSource(s: SymbolEntry, key: SourceKey, lang: Lang) {
  return lang === "en" ? s.sourcesEn[key] ?? s.sources[key] : s.sources[key] ?? s.sourcesEn[key];
}
