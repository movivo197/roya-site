export const ALL_SOURCE_KEYS = [
  "islamic",
  "jung",
  "freud",
  "chinese",
  "egyptian",
  "greek",
  "persian",
  "jewish",
  "hindu",
  "japanese",
  "african",
  "shaman",
  "clinical",
  "christian",
  "buddhist",
  "nordic",
  "mesoamerican",
] as const;

export type SourceKey = (typeof ALL_SOURCE_KEYS)[number];

export const SOURCE_ORDER: SourceKey[] = [
  "islamic",
  "persian",
  "jewish",
  "christian",
  "hindu",
  "buddhist",
  "chinese",
  "japanese",
  "egyptian",
  "greek",
  "nordic",
  "african",
  "mesoamerican",
  "shaman",
  "jung",
  "freud",
  "clinical",
];

export const SOURCE_LABELS: Record<SourceKey, string> = {
  islamic: "اسلامی · ابن‌سیرین، نابلسی، تفلیسی",
  jung: "روان‌شناسی تحلیلی · یونگ",
  freud: "روانکاوی · فروید",
  chinese: "چینی · ژوگونگ",
  egyptian: "مصر باستان",
  greek: "یونان · آرتمیدوروس",
  persian: "فرهنگ ایرانی",
  jewish: "یهودی · تلمود",
  hindu: "هندی · ودا",
  japanese: "ژاپنی",
  african: "آفریقایی · یوروبا",
  shaman: "شمنی",
  clinical: "خواب‌شناسی معاصر",
  christian: "مسیحی · کتاب مقدس و مکروبیوس",
  buddhist: "بودایی · یوگای خواب تبتی",
  nordic: "نوردیک و سلتیک",
  mesoamerican: "میان‌آمریکا · مایا و آزتک",
};

export const CATEGORIES = [
  "طبیعت",
  "جانوران",
  "بدن",
  "خانه و مکان",
  "اشخاص",
  "اعمال",
  "اشیاء",
  "سفر",
  "دین و معنا",
  "خوراک",
  "پدیده",
] as const;

export type RawSymbol = {
  id: string;
  title: string;
  keys: string[];
  category: (typeof CATEGORIES)[number];
  sources: Partial<Record<SourceKey, string>>;
  conclusion: string;
  counsel: string;
};

export type SymbolEntry = RawSymbol & {
  titleEn: string;
  keysEn: string[];
  sourcesEn: Partial<Record<SourceKey, string>>;
  conclusionEn: string;
  counselEn: string;
};
