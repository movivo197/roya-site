import type { SourceKey } from "@/data/meta";
import type { Lang } from "@/lib/prefs";

type Pair = { fa: string; en: string };

/** How this school reads a dream — one line under the source label. */
export const SOURCE_LENS: Record<SourceKey, Pair> = {
  islamic: {
    fa: "خواب را به کار، مال، خویشاوند و دین بیداری برمی‌گرداند؛ جزئیات صحنه حکم را عوض می‌کند.",
    en: "Maps the dream onto waking work, money, kin, and faith; scene details change the ruling.",
  },
  persian: {
    fa: "فال و ادب ایرانی است: روشن و تیره، مهمان و راه، اغلب با حال دل سنجیده می‌شود.",
    en: "Persian omen and etiquette: bright and dark, guest and road, often weighed by the heart’s state.",
  },
  jewish: {
    fa: "تلمود خواب را گاهی واژگونه می‌خواند؛ آب ممکن است تورات باشد نه آب.",
    en: "The Talmud sometimes reads a dream inverted; water may be Torah, not water.",
  },
  christian: {
    fa: "کتاب مقدس و مکروبیوس: تصویر یا آزمون جان است یا یاد عهد، نه فال بازار.",
    en: "Scripture and Macrobius: the image is a trial of the soul or a covenant reminder, not a market omen.",
  },
  hindu: {
    fa: "ودا و پورانا نماد را به کارما، شاکتی و تطهیر ربط می‌دهند.",
    en: "Veda and Purana tie the image to karma, shakti, and purification.",
  },
  buddhist: {
    fa: "خواب مادهٔ تمرین است؛ باردو و دلبستگی، نه پیشگویی قطعی.",
    en: "The dream is practice-material: bardo and clinging, not a fixed forecast.",
  },
  chinese: {
    fa: "ژوگونگ و پنج‌عنصر: تصویر را به بخت، شغل و تعادل عناصر ترجمه می‌کند.",
    en: "Zhou Gong and the five phases: the image is luck, work, and elemental balance.",
  },
  japanese: {
    fa: "یومه مرز کامی و انسان است؛ بی‌احترامی به مکان مقدس معنی را تیره می‌کند.",
    en: "Yume sits on the kami–human border; insulting a sacred place darkens the reading.",
  },
  egyptian: {
    fa: "نیل، توزین قلب و سفر روح: تصویر با مرگ و تولد دوباره کار دارد.",
    en: "Nile, the weighing of the heart, the soul’s travel: the image works with death and rebirth.",
  },
  greek: {
    fa: "آرتمیدوروس جزئیات را می‌سنجد: کی، با که، در کدام سمت — استعارهٔ شاعرانه کافی نیست.",
    en: "Artemidorus weighs detail: who, with whom, on which side — a poetic metaphor is not enough.",
  },
  nordic: {
    fa: "حماسه و سلت: آزمون، پیمان و بهای دانش؛ هدیهٔ خدایان رایگان نیست.",
    en: "Saga and Celtic lore: ordeal, oath, and the price of knowledge; a god’s gift is never free.",
  },
  african: {
    fa: "یوروبا و سنت شفاهی: روح نیا و اوریشا در تصویر حاضرند؛ احترام آیین است.",
    en: "Yoruba and oral tradition: ancestor and orisha are in the image; respect is the rite.",
  },
  mesoamerican: {
    fa: "مایا و آزتک: خورشید، خون، چهار جهت؛ تصویر اغلب کیهان کوچک است.",
    en: "Maya and Aztec: sun, blood, four directions; the image is often a small cosmos.",
  },
  shaman: {
    fa: "سفر روح: حیوان، غار و پوست‌اندازی ابزار شفا یا خطرند، نه دکور.",
    en: "Soul-travel: animal, cave, and molt are healing tools or dangers, not décor.",
  },
  jung: {
    fa: "تصویر از روان است نه از آینده. سؤال: کدام بخشِ من در این نماد حرف می‌زند؟",
    en: "The image is psyche, not a forecast. The question: which part of me speaks in this symbol?",
  },
  freud: {
    fa: "ظاهر خواب پوشش میل یا اضطراب است؛ ترجمهٔ تحت‌اللفظ گمراه‌کننده است.",
    en: "The dream’s face is a cover for wish or anxiety; a literal translation misleads.",
  },
  clinical: {
    fa: "پژوهش همبستگی هیجان و حافظه را می‌گوید، نه حکم مال و مرگ.",
    en: "Research speaks of emotion and memory correlates, not money or death rulings.",
  },
};

function base(key: SourceKey, title: string, lang: Lang): string {
  const t = title;
  const rows: Record<SourceKey, Pair> = {
    islamic: {
      fa: `در این سنت «${t}» معمولاً به یک امر بیداری ترجمه می‌شود: کار، مال، خویشاوند یا دین — نه جادوی خودِ شئ.`,
      en: `Here “${t}” is usually translated into a waking matter: work, money, kin, or faith — not magic in the object itself.`,
    },
    persian: {
      fa: `فال ایرانی «${t}» را با روشنی/تیرگی صحنه می‌سنجد؛ حال دل بیننده از خودِ نماد مهم‌تر است.`,
      en: `Persian omen-reading weighs “${t}” by the scene’s brightness; the dreamer’s mood outranks the emblem.`,
    },
    jewish: {
      fa: `ممکن است «${t}» واژگونه یا رمزی باشد (آب = تورات). ظاهر خواب را فوری به رویداد بیرونی وصل نکنید.`,
      en: `“${t}” may be inverted or coded (water = Torah). Do not nail the surface to an outer event at once.`,
    },
    christian: {
      fa: `اینجا «${t}» بیشتر آزمون جان یا یاد عهد است تا خبر قیمت و مقام.`,
      en: `Here “${t}” is more a trial of the soul or a covenant reminder than news of price and rank.`,
    },
    hindu: {
      fa: `«${t}» به نیرو، کارما یا تطهیر اشاره دارد؛ صحنه می‌پرسد چه چیزی باید پخته یا رها شود.`,
      en: `“${t}” points to force, karma, or cleansing; the scene asks what must ripen or be dropped.`,
    },
    buddhist: {
      fa: `«${t}» مادهٔ دیدن است: دلبستگی کجاست، و آیا می‌توان در خواب بیدار ماند؟ پیشگویی قطعی نیست.`,
      en: `“${t}” is something to see with: where is the clinging, and can you wake inside the dream? It is not a fixed omen.`,
    },
    chinese: {
      fa: `«${t}» به جریان بخت، شغل و تعادل عناصر برمی‌گردد؛ افراط یک عنصر زیان است.`,
      en: `“${t}” maps onto luck, work, and the five phases; excess of one element costs.`,
    },
    japanese: {
      fa: `«${t}» مرز دنیای کامی و روزمره است؛ بی‌ادبی در صحنه معنی را تیره می‌کند.`,
      en: `“${t}” sits on the kami–ordinary border; rudeness in the scene darkens the reading.`,
    },
    egyptian: {
      fa: `«${t}» با حیات، توزین و سفر روح کار دارد؛ مرگ در این زبان اغلب گذار است نه پایان تقویم.`,
      en: `“${t}” works with life, weighing, and the soul’s travel; death in this tongue is often a crossing, not a calendar end.`,
    },
    greek: {
      fa: `آرتمیدوروس «${t}» را با نسبت‌ها می‌خواند: چه کسی، چه سویی، چه پایانی. استعارهٔ کلی کافی نیست.`,
      en: `Artemidorus reads “${t}” by relations: who, which side, how it ends. A loose metaphor is not enough.`,
    },
    nordic: {
      fa: `«${t}» آزمون یا بهای دانش است؛ هدیه در حماسه همیشه هزینه‌ای دارد.`,
      en: `“${t}” is an ordeal or the price of knowledge; a saga-gift always costs.`,
    },
    african: {
      fa: `«${t}» ممکن است حضور نیا یا اوریشا باشد؛ احترام و قربانیِ اخلاقی جای ترس خالی را می‌گیرد.`,
      en: `“${t}” may be ancestor or orisha present; respect and an ethical offering replace empty fear.`,
    },
    mesoamerican: {
      fa: `«${t}» اغلب کیهان کوچک است: جهت، خورشید، خون پیمان. افراط بی‌ادبانه خشم زمین است.`,
      en: `“${t}” is often a small cosmos: direction, sun, pact-blood. Rude excess is the earth’s anger.`,
    },
    shaman: {
      fa: `«${t}» ابزار سفر روح است: یا شفا می‌دهد یا اگر با زور وارد شوید می‌شکند.`,
      en: `“${t}” is a soul-travel tool: it heals, or it breaks if you enter by force.`,
    },
    jung: {
      fa: `یونگ «${t}» را رویداد بیرون نمی‌داند؛ تصویر نیرویی در روان است که می‌خواهد دیده شود.`,
      en: `Jung does not treat “${t}” as an outer event; it is a psychic force that wants to be seen.`,
    },
    freud: {
      fa: `فروید ظاهر «${t}» را پوشش می‌داند: میل یا ترس جابه‌جا شده، نه خبر تحت‌اللفظ.`,
      en: `Freud treats the face of “${t}” as a cover: a displaced wish or fear, not a literal bulletin.`,
    },
    clinical: {
      fa: `خواب‌شناسی «${t}» را با هیجان، حافظه و استرس روز پیوند می‌دهد — همبستگی است، نه پیش‌بینی قطعی.`,
      en: `Sleep science links “${t}” to daytime emotion, memory, and stress — a correlation, not a sure forecast.`,
    },
  };
  return rows[key][lang];
}

function jargonExtra(key: SourceKey, hay: string, lang: Lang): string {
  const h = hay.toLowerCase();
  const has = (re: RegExp) => re.test(h);

  if (key === "jung") {
    if (has(/راز|secret|psychic/)) {
      return lang === "fa"
        ? "«راز روان» خبر پنهانِ همسایه نیست؛ اتاقی از خودتان است که هنوز بی‌نام مانده."
        : "A “psychic secret” is not the neighbor’s gossip; it is a still-unnamed room of yourself.";
    }
    if (has(/سایه|shadow/)) {
      return lang === "fa"
        ? "سایه آن کیفیتی است که در خود نمی‌پسندید و به دیگران نسبت می‌دهید."
        : "The shadow is a quality you refuse in yourself and pin on others.";
    }
    if (has(/ناخود|unconscious/)) {
      return lang === "fa"
        ? "ناخودآگاه انبار احساس و خاطره‌ای است که روز اجازه‌اش نمی‌دهد."
        : "The unconscious is feeling and memory the day-mind will not admit.";
    }
    if (has(/پرسونا|persona|نقاب|mask/)) {
      return lang === "fa"
        ? "پرسونا نقش اجتماعی است؛ اگر به آن بچسبید، خودِ زنده‌تر خفه می‌شود."
        : "Persona is the social role; glued to it, the livelier self chokes.";
    }
  }

  if (key === "islamic") {
    if (has(/گشایش|opening|فرج/)) {
      return lang === "fa"
        ? "گشایش یعنی گرهٔ کار یا دل باز می‌شود، نه اینکه کلید طلا از آسمان بیفتد."
        : "Opening means a knot in work or the heart loosening — not a gold key falling from the sky.";
    }
    if (has(/فتنه|discord/)) {
      return lang === "fa"
        ? "فتنه یعنی آشوب اجتماعی یا اخلاقی در بیداری؛ الزاماً بلای طبیعی نیست."
        : "Discord means social or moral unrest in waking life, not necessarily a natural disaster.";
    }
    if (has(/روزی|provision|livelihood/)) {
      return lang === "fa"
        ? "روزی یعنی معاش و برکت کار، نه بلیت بخت‌آزمایی."
        : "Provision means livelihood and the blessing of work, not a lottery ticket.";
    }
    if (has(/دشمن|خصم|enemy|foe/)) {
      return lang === "fa"
        ? "دشمن ممکن است رقیب بیرونی باشد یا خصلت درونی؛ رفتار حیوان/شخص در صحنه فرق را می‌گوید."
        : "An enemy may be an outer rival or an inner trait; the figure’s behavior in the scene tells which.";
    }
  }

  if (key === "freud") {
    if (has(/اخته|castrat/)) {
      return lang === "fa"
        ? "اضطراب اخته در خوانش او ترس از بی‌قدرتی است، نه پیش‌بینی آسیب بدن."
        : "Castration anxiety in his reading is fear of powerlessness, not a forecast of bodily harm.";
    }
    if (has(/میل|wish|desire|libido/)) {
      return lang === "fa"
        ? "میل اغلب جابه‌جا شده: آنچه می‌بینید جانشین چیزی است که گفتنش سخت بوده."
        : "The wish is often displaced: what you see stands in for something hard to say.";
    }
  }

  if (key === "clinical" && has(/همبسته|correlat|پیش‌بینی|predict|forecast/)) {
    return lang === "fa"
      ? "همبستگی یعنی با هم می‌آیند، نه اینکه یکی علت قطعی دیگری است."
      : "Correlation means they travel together, not that one is the other’s certain cause.";
  }

  if (key === "hindu" && has(/کوندالینی|kundalini|چاکرا|chakra/)) {
    return lang === "fa"
      ? "این نیرو را در سنت هندی انرژی بیداری در تن می‌دانند، نه اژدهای بیرونی."
      : "In the Indian reading this is waking energy in the body, not an outer dragon.";
  }

  return "";
}

export function sourceMeaning(key: SourceKey, title: string, note: string, lang: Lang): string {
  const extra = jargonExtra(key, `${title} ${note}`, lang);
  const core = base(key, title, lang);
  return extra ? `${core} ${extra}` : core;
}
