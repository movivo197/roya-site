import { SOURCE_ORDER, type SourceKey, type SymbolEntry } from "@/data/symbols";
import { sourceLabel } from "@/data/source-labels";
import type { Lang } from "@/lib/prefs";

type Theme = {
  id: string;
  label: { fa: string; en: string };
  re: RegExp;
};

/** Recurring motifs that actually show up across the 17 notes. */
const THEMES: Theme[] = [
  {
    id: "provision",
    label: { fa: "روزی، مال و بخت کار", en: "provision, wealth, and work-luck" },
    re: /روزی|معاش|مال |بخت|غله|ذخیره|wealth|provision|livelihood|fortune|luck of|yearly luck/i,
  },
  {
    id: "opening",
    label: { fa: "گشایش گره و فرج", en: "opening of a knot, relief" },
    re: /گشایش|فرج|گشودن|opening|relief|ease(?!l)/i,
  },
  {
    id: "warning",
    label: { fa: "هشدار، فتنه یا زیان", en: "warning, discord, or loss" },
    re: /هشدار|فتنه|زیان|عذاب|بلا|اندوه|warning|discord|harm|torment|blight|loss/i,
  },
  {
    id: "purity",
    label: { fa: "پاکی، غسل و تطهیر", en: "purity and cleansing" },
    re: /پاک|تطهیر|غسل|وضو|purity|cleans|baptis|purif/i,
  },
  {
    id: "unconscious",
    label: { fa: "ناخودآگاه، سایه و لایهٔ نادیده", en: "the unconscious, shadow, unseen layer" },
    re: /ناخودآگاه|سایهٔ|سایه |عقده|unconscious|shadow|psyche|complex/i,
  },
  {
    id: "rebirth",
    label: { fa: "گذار، مرگ آیینی و تولد دوباره", en: "passage, initiatory death, rebirth" },
    re: /تولد دوباره|گذار|باردو|رستاخیز|rebirth|bardo|crossing|initiat|renewal/i,
  },
  {
    id: "kin",
    label: { fa: "خویشاوند، نسل و خانه", en: "kin, lineage, and household" },
    re: /خویشاوند|نسل|همسر|برادر|خواهر|خانواد|طایف|kin|lineage|spouse|household|clan|ancestor/i,
  },
  {
    id: "power",
    label: { fa: "مقام، قدرت و ریاست", en: "rank, power, and rule" },
    re: /مقام|سلطان|ریاست|فرمانروا|تاج|rank|ruler|sovereign|kingship|authority/i,
  },
  {
    id: "wisdom",
    label: { fa: "دانش، حکمت و کتاب مقدس", en: "knowledge, wisdom, and scripture" },
    re: /علم|حکمت|تورات|دانش|وحی|سوتره|wisdom|torah|knowledge|scripture|sutra/i,
  },
  {
    id: "fertility",
    label: { fa: "باروری و زایش", en: "fertility and birth" },
    re: /بارور|زایش|حامله|نطفه|fertil|womb|birth|pregnancy/i,
  },
  {
    id: "journey",
    label: { fa: "سفر، راه و عبور", en: "travel, road, and crossing" },
    re: /سفر|راه |عبور|سفر روح|travel|road|voyage|journey|soul-travel/i,
  },
  {
    id: "clinical",
    label: { fa: "همبستگی با هیجان و حافظه، نه فال قطعی", en: "tracks emotion and memory, not a sure omen" },
    re: /همبسته|اضطراب|حافظه|correlation|anxiety|not a (sure|fixed|certain)|do not predict/i,
  },
  {
    id: "sacred",
    label: { fa: "حضور قدسی و آزمون جان", en: "sacred presence and a trial of the soul" },
    re: /قدس|عهد|آزمون جان|قربان|نذر|sacred|covenant|orisha|kami|offering|rite/i,
  },
  {
    id: "desire",
    label: { fa: "میل و پوشش ظاهر خواب", en: "wish and the dream’s cover" },
    re: /میل |پوشش|سرکوب|تحقق میل|wish|repressed|desire|cover for/i,
  },
  {
    id: "honor",
    label: { fa: "آبرو، شرم و حریم", en: "honor, shame, and a private bound" },
    re: /آبرو|شرم|حریم|ناموس|honor|shame|privacy|covering/i,
  },
  {
    id: "time",
    label: { fa: "زمان، اجل و مهلت", en: "time, a term, and a deadline" },
    re: /اجل|مهلت|زمان|ضرب‌الاجل|deadline|kairos|term of|circadian/i,
  },
];

export type SharedHit = {
  id: string;
  label: { fa: string; en: string };
  keys: SourceKey[];
};

export function sharedMeanings(symbol: SymbolEntry): SharedHit[] {
  const hits: SharedHit[] = [];
  for (const theme of THEMES) {
    const keys: SourceKey[] = [];
    for (const k of SOURCE_ORDER) {
      const hay = `${symbol.sources[k] ?? ""} ${symbol.sourcesEn[k] ?? ""}`;
      if (theme.re.test(hay)) keys.push(k);
    }
    if (keys.length >= 2) hits.push({ id: theme.id, label: theme.label, keys });
  }
  hits.sort((a, b) => b.keys.length - a.keys.length || a.id.localeCompare(b.id));
  return hits.slice(0, 4);
}

export function joinSourceNames(keys: SourceKey[], lang: Lang) {
  const names = keys.map((k) => sourceLabel(k, lang).split("·")[0].trim());
  if (names.length <= 1) return names[0] ?? "";
  if (lang === "fa") {
    if (names.length === 2) return `${names[0]} و ${names[1]}`;
    return `${names.slice(0, -1).join("، ")} و ${names[names.length - 1]}`;
  }
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}
