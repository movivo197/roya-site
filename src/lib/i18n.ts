import type { Lang } from "@/lib/prefs";

const dict = {
  app: { fa: "رؤیا", en: "Roya" },
  tagline: {
    fa: "دفتر خواب سینمایی با تعبیر چندمنبعی و پند کوتاه",
    en: "A cinematic dream journal with sourced readings and short counsel",
  },
  write: { fa: "ثبت خواب", en: "Write" },
  atlas: { fa: "اطلس", en: "Atlas" },
  journal: { fa: "دفتر", en: "Journal" },
  method: { fa: "روش", en: "Method" },
  writeLabel: { fa: "خواب امشب را بنویسید", en: "Write last night’s dream" },
  writeHint: {
    fa: "بنویسید یا بگویید. مکان، اشخاص، رنگ و پایان صحنه. ذخیره فقط روی همین دستگاه است.",
    en: "Type or speak. Place, people, color, and how it ended. Saved only on this device.",
  },
  placeholder: {
    fa: "در خانه‌ای قدیمی بودم. آب زلال جاری بود…",
    en: "I was in an old house. Clear water was running…",
  },
  mood: { fa: "احساس غالب", en: "Dominant feeling" },
  date: { fa: "تاریخ", en: "Date" },
  interpret: { fa: "تعبیر کن", en: "Interpret" },
  interpreting: { fa: "در حال خواندن نمادها…", en: "Reading the symbols…" },
  voice: { fa: "بگو", en: "Speak" },
  voiceStop: { fa: "بس کن", en: "Stop" },
  voiceUnsupported: {
    fa: "این مرورگر صدا را نمی‌گیرد. بنویسید.",
    en: "This browser cannot hear. Type instead.",
  },
  voiceDenied: { fa: "اجازهٔ میکروفون داده نشد.", en: "Microphone permission was denied." },
  voiceFailed: { fa: "صدا قطع شد. دوباره بگویید یا بنویسید.", en: "Listening stopped. Speak again, or type." },
  patternTitle: { fa: "الگوی این ماه", en: "This month’s pattern" },
  patternNone: { fa: "این ماه هنوز خوابی در دفتر نیست.", en: "No dream saved this month." },
  patternMood: { fa: "احساس غالب", en: "Dominant feeling" },
  patternQuiet: { fa: "هنوز نمادی دو بار تکرار نشده.", en: "No symbol has repeated twice yet." },
  patternOf: { fa: "از", en: "of" },
  patternTimes: { fa: "بار", en: "times" },
  search: { fa: "جستجوی نماد", en: "Search symbols" },
  all: { fa: "همه", en: "All" },
  symbolsCount: { fa: "نماد در اطلس", en: "symbols in the atlas" },
  sources: { fa: "منابع", en: "Sources" },
  meaning: { fa: "یعنی", en: "In other words" },
  atlasIntro: {
    fa: "گزیدهٔ تطبیقی است نه دانشنامهٔ کامل همهٔ چاپ‌ها. هر نماد از چشم ۱۷ سنت خوانده می‌شود؛ سنت را انتخاب کنید تا اطلس از همان زاویه باز شود.",
    en: "A comparative selection, not a complete encyclopedia of every edition. Each symbol is read through 17 traditions; pick a school to open the atlas from that angle.",
  },
  atlasSymbols: { fa: "نمادها", en: "Symbols" },
  atlasTraditions: { fa: "سنت‌ها", en: "Traditions" },
  allTraditions: { fa: "همه سنت‌ها", en: "All traditions" },
  traditionRead: { fa: "خوانش این سنت", en: "This school’s reading" },
  canonEra: { fa: "دوره", en: "Period" },
  canonRegion: { fa: "پهنه", en: "Region" },
  canonTexts: { fa: "متن‌های مرجع", en: "Reference texts" },
  canonMethod: { fa: "روش خواندن", en: "How it reads" },
  canonTypical: { fa: "نمونه‌های کلاسیک", en: "Classic mappings" },
  canonCaution: { fa: "حد و احتیاط", en: "Limits" },
  sourceCount: { fa: "منبع", en: "sources" },
  atlasEmpty: {
    fa: "نمادی با این فیلتر پیدا نشد.",
    en: "No symbol matches these filters.",
  },
  shared: { fa: "اشتراک فرهنگ‌ها", en: "Where traditions meet" },
  sharedHint: {
    fa: "اگر دو یا چند سنت یک معنا را تکرار کنند اینجا جمع می‌شود. اشتراک حکم واحد نیست؛ بافت خواب هنوز حاکم است.",
    en: "When two or more schools repeat a meaning, it is gathered here. Overlap is not a single ruling; the dream’s context still governs.",
  },
  loadMore: { fa: "نمادهای بیشتر", en: "More symbols" },
  showingOf: { fa: "نمایش", en: "Showing" },
  of: { fa: "از", en: "of" },
  conclusion: { fa: "نتیجه‌گیری هوشمند", en: "Smart conclusion" },
  counsel: { fa: "پند و توصیه", en: "Counsel" },
  scene: { fa: "خواندن صحنه", en: "How the scene moves" },
  rolePlace: { fa: "مکان", en: "Place" },
  roleState: { fa: "حال", en: "State" },
  roleEvent: { fa: "اتفاق", en: "Event" },
  whichMeaning: { fa: "این واژه دو معنا دارد. یکی را انتخاب کنید.", en: "This word has two meanings. Choose one." },
  found: { fa: "سه نماد اصلی", en: "Three main symbols" },
  foundTwo: { fa: "دو نماد اصلی", en: "Two main symbols" },
  foundOne: { fa: "نماد اصلی", en: "Main symbol" },
  alsoFound: { fa: "نمادهای دیگر", en: "Other symbols" },
  whyMatch: { fa: "به‌خاطر", en: "Matched" },
  showSources: { fa: "همهٔ منابع", en: "All sources" },
  hideSources: { fa: "بستن منابع", en: "Hide sources" },
  deeper: { fa: "جمع‌بندی ژرف‌تر", en: "Deeper synthesis" },
  deeperWait: { fa: "در حال ترکیب منابع…", en: "Combining sources…" },
  tone: { fa: "لحن", en: "Tone" },
  emptyJournal: {
    fa: "هنوز خوابی در دفتر نیست. از ثبت خواب شروع کنید.",
    en: "No dreams yet. Start by writing one.",
  },
  install: { fa: "نصب روی موبایل", en: "Install on phone" },
  installHint: {
    fa: "پس از نصب، پوسته و اطلس و دفتر بدون اینترنت باز می‌شوند. در آیفون: Share سپس Add to Home Screen.",
    en: "Once installed, the shell, atlas, and journal open offline. On iPhone: Share, then Add to Home Screen.",
  },
  installed: { fa: "روی دستگاه نصب است", en: "Installed on this device" },
  themeDark: { fa: "تاریک", en: "Dark" },
  themeLight: { fa: "روشن", en: "Light" },
  methodTitle: { fa: "روش و محدودیت", en: "Method and limits" },
  method1: {
    fa: "بانک نماد از سنت اسلامی، تلمود، ودا، بودایی، ژوگونگ، مصر، یونان، کتاب مقدس، نوردیک، مایا و آزتک، ژاپن، یوروبا، شمنی، یونگ، فروید و خواب‌شناسی معاصر است. دیکشنری حکم شرعی یا پزشکی نیست.",
    en: "The atlas draws on Islamic books, Talmud, Veda, Buddhist dream yoga, Zhou Gong, Egypt, Greece, Scripture, Norse and Celtic lore, Maya and Aztec, Japan, Yoruba, shamanic lore, Jung, Freud, and sleep science. A dictionary is not a legal or medical ruling.",
  },
  method2: {
    fa: "اول عبارت بلندتر برنده است. تعبیر ترتیب صحنه را نگه می‌دارد: مکان، حال، اتفاق. اگر واژه‌ای دو معنا داشته باشد، یکی را می‌پرسد. منابع با یک ضربه باز می‌شوند.",
    en: "A longer phrase wins. The reading keeps scene order: place, state, then what happens. A word with two meanings asks you to choose. Sources open with one tap.",
  },
  method3: {
    fa: "انتساب همهٔ مطالب چاپی به ابن‌سیرین از نظر پژوهشی محل بحث است. خواب ترسناک را برای هر کسی نقل نکنید.",
    en: "Printed books attributed to Ibn Sirin are debated by historians. Do not tell frightening dreams to just anyone.",
  },
  localOnly: { fa: "خواب‌ها از این دستگاه خارج نمی‌شوند.", en: "Dreams never leave this device." },
  delete: { fa: "حذف", en: "Delete" },
  noMatch: {
    fa: "نماد روشنی پیدا نشد. جزئیات مکان، رنگ و پایان صحنه را اضافه کنید.",
    en: "No clear symbol matched. Add place, color, and how the scene ended.",
  },
  aiFail: {
    fa: "جمع‌بندی ژرف‌تر در دسترس نبود. نتیجهٔ اطلس محلی کافی است.",
    en: "Deeper synthesis is unavailable. The local atlas reading still stands.",
  },
} as const;

export type I18nKey = keyof typeof dict;

export function t(lang: Lang, key: I18nKey) {
  return dict[key][lang];
}

export const MOOD_LABEL = {
  آرام: { fa: "آرام", en: "Calm" },
  شاد: { fa: "شاد", en: "Joy" },
  مضطرب: { fa: "مضطرب", en: "Anxious" },
  ترس: { fa: "ترس", en: "Fear" },
  شگفتی: { fa: "شگفتی", en: "Awe" },
  غم: { fa: "غم", en: "Grief" },
  مبهم: { fa: "مبهم", en: "Unclear" },
} as const;

export const TONE_LABEL = {
  بشارت: { fa: "بشارت", en: "Glad tiding" },
  هشدار: { fa: "هشدار", en: "Warning" },
  درونی: { fa: "درونی", en: "Inner" },
  گذار: { fa: "گذار", en: "Passage" },
} as const;

export const CAT_LABEL: Record<string, { fa: string; en: string }> = {
  طبیعت: { fa: "طبیعت", en: "Nature" },
  جانوران: { fa: "جانوران", en: "Animals" },
  بدن: { fa: "بدن", en: "Body" },
  "خانه و مکان": { fa: "خانه و مکان", en: "Place" },
  اشخاص: { fa: "اشخاص", en: "People" },
  اعمال: { fa: "اعمال", en: "Acts" },
  اشیاء: { fa: "اشیاء", en: "Objects" },
  سفر: { fa: "سفر", en: "Travel" },
  "دین و معنا": { fa: "دین و معنا", en: "Meaning" },
  خوراک: { fa: "خوراک", en: "Food" },
  پدیده: { fa: "پدیده", en: "Phenomena" },
};
