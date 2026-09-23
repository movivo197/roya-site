import { SOURCE_ORDER, type SourceKey } from "@/data/meta";
import type { Lang } from "@/lib/prefs";

export const SOURCE_I18N: Record<SourceKey, { fa: string; en: string }> = {
  islamic: { fa: "اسلامی · ابن‌سیرین، نابلسی، تفلیسی", en: "Islamic · Ibn Sirin, Nabulsi, Tiflisi" },
  jung: { fa: "روان‌شناسی تحلیلی · یونگ", en: "Analytical · Jung" },
  freud: { fa: "روانکاوی · فروید", en: "Psychoanalysis · Freud" },
  chinese: { fa: "چینی · ژوگونگ و دائو", en: "Chinese · Zhou Gong & Dao" },
  egyptian: { fa: "مصر باستان", en: "Ancient Egypt" },
  greek: { fa: "یونان · آرتمیدوروس", en: "Greek · Artemidorus" },
  persian: { fa: "فرهنگ ایرانی و تفلیسی", en: "Persian folklore" },
  jewish: { fa: "یهودی · تلمود و قبالا", en: "Jewish · Talmud & Kabbalah" },
  hindu: { fa: "هندی · ودا و پورانا", en: "Indian · Veda & Purana" },
  japanese: { fa: "ژاپنی · یومه و یوکای", en: "Japanese · yume & yokai" },
  african: { fa: "آفریقایی · یوروبا و سنت شفاهی", en: "African · Yoruba & oral" },
  shaman: { fa: "شمنی و بومی", en: "Shamanic & indigenous" },
  clinical: { fa: "خواب‌شناسی معاصر", en: "Contemporary sleep science" },
  christian: { fa: "مسیحی · کتاب مقدس و مکروبیوس", en: "Christian · Scripture & Macrobius" },
  buddhist: { fa: "بودایی · یوگای خواب تبتی", en: "Buddhist · dream yoga" },
  nordic: { fa: "نوردیک و سلتیک", en: "Norse & Celtic" },
  mesoamerican: { fa: "میان‌آمریکا · مایا و آزتک", en: "Mesoamerica · Maya & Aztec" },
};

export function sourceLabel(key: SourceKey, lang: Lang) {
  return SOURCE_I18N[key][lang];
}

export function orderedSourceKeys(present: Partial<Record<SourceKey, string | undefined>>): SourceKey[] {
  const extra = (Object.keys(present) as SourceKey[]).filter((k) => !SOURCE_ORDER.includes(k) && present[k]);
  return [...SOURCE_ORDER.filter((k) => Boolean(present[k])), ...extra];
}
