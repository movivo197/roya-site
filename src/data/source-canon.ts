import { SOURCE_ORDER, type SourceKey } from "./meta";

export type TraditionCanon = {
  key: SourceKey;
  era: { fa: string; en: string };
  region: { fa: string; en: string };
  texts: { fa: string; en: string };
  method: { fa: string; en: string };
  typical: { fa: string; en: string };
  caution: { fa: string; en: string };
};

/** Comparative notes on how each school actually reads a dream — not a claim of complete books. */
export const SOURCE_CANON: Record<SourceKey, TraditionCanon> = {
  islamic: {
    key: "islamic",
    era: { fa: "قرن ۲–۱۱ قمری", en: "8th–17th c. CE" },
    region: { fa: "عراق، شام، مصر، ایران", en: "Iraq, Levant, Egypt, Iran" },
    texts: {
      fa: "کتاب‌های منسوب به ابن‌سیرین؛ تعطیر الانام نابلسی؛ کامل التعبیر تفلیسی؛ اشارات پراکنده در حدیث.",
      en: "Books attributed to Ibn Sirin; Nabulsi’s Taʿṭīr al-anām; Tiflisi’s Kāmil al-taʿbīr; scattered hadith remarks.",
    },
    method: {
      fa: "نماد را به کار، مال، خویشاوند و دین بیداری برمی‌گرداند. جزئیات (زلال/گل‌آلود، راست/چپ، زن/مرد) حکم را عوض می‌کند. خواب راست، حدیث نفس و خواب شیطان از هم جدا می‌شوند.",
      en: "Maps the image onto waking work, money, kin, and faith. Details (clear/muddy, right/left, woman/man) change the ruling. True dream, self-talk, and a satanic dream are split.",
    },
    typical: {
      fa: "آب زلال = روزی؛ مار = دشمن یا گنج؛ کلید = گشایش؛ مرگ = سفر یا توبه.",
      en: "Clear water = provision; snake = enemy or treasure; key = opening; death = travel or repentance.",
    },
    caution: {
      fa: "انتساب همهٔ چاپ‌های بازار به ابن‌سیرین از نظر پژوهشی محل بحث است. حکم شرعی از روی خواب صادر نمی‌شود.",
      en: "Market editions under Ibn Sirin’s name are historically debated. A dream is not a legal fatwa.",
    },
  },
  persian: {
    key: "persian",
    era: { fa: "قرون میانه تا ادب عامهٔ امروز", en: "Medieval to living folklore" },
    region: { fa: "ایران و حوزهٔ فارسی", en: "Iran and the Persianate world" },
    texts: {
      fa: "کامل التعبیر تفلیسی؛ فال‌نامه‌ها؛ قصه‌های آل و بختک و پری؛ ادب مهمان و راه.",
      en: "Tiflisi’s Kāmil; fāl-nāma omens; tales of āl, bakhtak, and peri; guest-and-road etiquette.",
    },
    method: {
      fa: "روشنایی و تیرگی صحنه، آمدن مهمان، و حال دل بیننده اغلب از خودِ شئ مهم‌تر است. فال است نه فقه.",
      en: "Brightness, a guest’s arrival, and the heart’s state often outrank the object itself. Omen, not fiqh.",
    },
    typical: {
      fa: "آب روشن گشایش؛ مهمان خبر؛ پری هم پناه است هم بلا؛ خانهٔ کهنه اصل.",
      en: "Bright water opens; a guest is news; a peri is shelter or calamity; an old house is origin.",
    },
    caution: {
      fa: "فال ایرانی با طب سنتی و دعا مخلوط شده؛ این اطلس آن را حکم پزشکی نمی‌خواند.",
      en: "Persian omen-lore is mixed with folk medicine and prayer; this atlas does not read it as a medical ruling.",
    },
  },
  jewish: {
    key: "jewish",
    era: { fa: "تلمود تا قبالای متأخر", en: "Talmud to later Kabbalah" },
    region: { fa: "بابل، شام، اروپا", en: "Babylonia, Levant, Europe" },
    texts: {
      fa: "تلمود براخوت ۵۵–۵۷؛ میدراش؛ زوهر در خوانش‌های بعدی؛ یوسف در سفر پیدایش.",
      en: "Talmud Berakhot 55–57; Midrash; later Zohar readings; Joseph in Genesis.",
    },
    method: {
      fa: "خواب گاهی واژگونه است. معنی به حلّ خواب (تعبیرکننده‌) و روزه و توبه بستگی دارد. آب ممکن است تورات باشد.",
      en: "A dream is sometimes inverted. Meaning hangs on the interpreter, on fasting and turning. Water may be Torah.",
    },
    typical: {
      fa: "چاه = همسر یا حکمت؛ دریای شور = تبعید؛ گندم = سال؛ عدد = جماتریا.",
      en: "A well = spouse or wisdom; the salt sea = exile; wheat = a year; a number = gematria.",
    },
    caution: {
      fa: "جمله‌های قبالایی متأخر را با حکم تلمودی یکی نکنید.",
      en: "Do not collapse later Kabbalistic lines into a Talmudic ruling.",
    },
  },
  christian: {
    key: "christian",
    era: { fa: "کتاب مقدس تا مکروبیوس و قرون میانه", en: "Scripture through Macrobius and the Middle Ages" },
    region: { fa: "مدیترانه، اروپا", en: "Mediterranean and Europe" },
    texts: {
      fa: "پیدایش، دانیال، متی؛ مکاشفه؛ شرح خواب اسکیپیو از مکروبیوس؛ میراث آرتمیدوروس در بیزانس.",
      en: "Genesis, Daniel, Matthew; Revelation; Macrobius on the Dream of Scipio; Artemidorus in Byzantium.",
    },
    method: {
      fa: "تصویر آزمون جان، یاد عهد، یا خیال شکمی است. مکروبیوس وحی را از خواب معده جدا می‌کند.",
      en: "The image is a trial of the soul, a covenant reminder, or a belly-phantasm. Macrobius splits revelation from a stomach-dream.",
    },
    typical: {
      fa: "آب = تعمید؛ نان = روزی ملکوت؛ صلیب = بار و نجات؛ فرشته = پیام نه فال بازار.",
      en: "Water = baptism; bread = the kingdom’s food; the cross = a load and a rescue; an angel = a message, not a market omen.",
    },
    caution: {
      fa: "خواب در کلیسا جای حکم شرعی بازار را نمی‌گیرد؛ تمیز ارواح لازم است.",
      en: "Church dream-reading is not a bazaar fatwa; discernment of spirits is required.",
    },
  },
  hindu: {
    key: "hindu",
    era: { fa: "ودا تا پورانا و یوگا", en: "Veda through Purana and yoga" },
    region: { fa: "شبه‌قاره", en: "Indian subcontinent" },
    texts: {
      fa: "اثروا ودا؛ سْوَپْنَ‌آدهیایه؛ پورانا؛ یوگا واسیشته؛ اشارات تانترا.",
      en: "Atharva Veda; Svapna-adhyāya; Purāṇas; Yoga Vāsiṣṭha; tantric notes.",
    },
    method: {
      fa: "نماد به کارما، شاکتی، تطهیر و زمان (یوگا/یوگه) گره می‌خورد. خواب پیش از سپیده‌دم گاهی میوه‌دارتر شمرده شده.",
      en: "The image ties to karma, shakti, cleansing, and time (yoga/yuga). A dream near dawn was sometimes counted more fruitful.",
    },
    typical: {
      fa: "مار = کوندالینی یا ترس؛ گاو = زمین و لکشمی؛ گنگ = تطهیر؛ نیلوفر = بیداری از گل.",
      en: "Snake = kundalini or fear; cow = earth and Lakshmi; Ganga = cleansing; lotus = waking from mud.",
    },
    caution: {
      fa: "تانترا را به هزل جنسی تقلیل ندهید؛ کارما پیش‌بینی قیمت نیست.",
      en: "Do not reduce tantra to a sex joke; karma is not a price forecast.",
    },
  },
  buddhist: {
    key: "buddhist",
    era: { fa: "سوترا تا یوگای خواب تبتی", en: "Sūtras through Tibetan dream yoga" },
    region: { fa: "هند، تبت، شرق آسیا", en: "India, Tibet, East Asia" },
    texts: {
      fa: "خواب‌های مادر بودا در متون پالی؛ باردو ته دول؛ آموزش میلَم (یوگای خواب).",
      en: "Dreams of the Buddha’s mother in Pali texts; Bardo Thödol; milam (dream-yoga) instruction.",
    },
    method: {
      fa: "خواب مادهٔ تمرین است: دلبستگی، باردو، شفافیت. پیشگویی قطعی مقام نیست.",
      en: "The dream is practice-material: clinging, bardo, lucidity. A fixed omen is not the rank.",
    },
    typical: {
      fa: "آب گل‌آلود = آلودگی ذهن؛ نور = طبیعت بودا؛ مرگ = بی‌دوامی؛ تعقیب = مارا.",
      en: "Muddy water = stain of mind; light = buddha-nature; death = impermanence; chase = mara.",
    },
    caution: {
      fa: "دیدن باردو در خواب مقام روشنی نیست؛ چسبیدن به «خواب مقدس» خود دلبستگی است.",
      en: "Seeing bardo in a dream is not enlightenment; clinging to a “holy dream” is itself thirst.",
    },
  },
  chinese: {
    key: "chinese",
    era: { fa: "هان تا folios ژوگونگ", en: "Han through Zhou Gong folios" },
    region: { fa: "چین", en: "China" },
    texts: {
      fa: "ژوگونگ جیمِنگ؛ خواب‌نامهٔ منسوب به امپراتور زرد؛ زبان پنج‌عنصر و دائوی درونی.",
      en: "Zhou Gong jiémèng; the Yellow Emperor dream book; five-phase language and inner Dao.",
    },
    method: {
      fa: "تصویر به بخت سال، شغل، خانواده و تعادل چوب/آتش/خاک/فلز/آب ترجمه می‌شود. افراط یک عنصر زیان است.",
      en: "The image is translated into yearly luck, work, family, and the balance of wood/fire/earth/metal/water. Excess of one phase costs.",
    },
    typical: {
      fa: "اژدها = مقام؛ آب روان = مال؛ دندان افتادن = نیا یا زیان خویشاوند؛ امتحان = نام.",
      en: "Dragon = rank; running water = wealth; a falling tooth = ancestor or kin-loss; an exam = a name.",
    },
    caution: {
      fa: "نسخه‌های بازار ژوگونگ یکدست نیستند؛ عنصر را با طالع روزنامه عوضی نگیرید.",
      en: "Zhou Gong market copies are not uniform; do not swap a phase for a newspaper horoscope.",
    },
  },
  japanese: {
    key: "japanese",
    era: { fa: "هی‌آن تا فولکلور یوکای", en: "Heian through yōkai folklore" },
    region: { fa: "ژاپن", en: "Japan" },
    texts: {
      fa: "یومه در ادبیات هی‌آن؛ تعبیر معبد؛ قصه‌های یوکای و یورِی؛ ادب مکان مقدس.",
      en: "Yume in Heian literature; shrine readings; yōkai and yūrei tales; manners of a sacred place.",
    },
    method: {
      fa: "خواب مرز کامی و انسان است. بی‌احترامی به مکان، نام یا مرده معنی را تیره می‌کند.",
      en: "A dream sits on the kami–human border. Insulting a place, a name, or the dead darkens the reading.",
    },
    typical: {
      fa: "مار = کامی یا مال؛ رویا در معبد = پیام؛ مو بریده‌ = سوگ یا قطع؛ فانوس = راهنما یا یوکای.",
      en: "Snake = kami or wealth; a shrine-dream = a message; cut hair = mourning or a cut; a lantern = guide or yōkai.",
    },
    caution: {
      fa: "یوکای دکوراسیون ترسناک نیست؛ کار ناتمام مرده یا مکان است.",
      en: "A yōkai is not horror décor; it is unfinished work of the dead or of a place.",
    },
  },
  egyptian: {
    key: "egyptian",
    era: { fa: "پادشاهی جدید (پاپیروس رعمسی)", en: "New Kingdom (Ramesside papyrus)" },
    region: { fa: "نیل", en: "The Nile" },
    texts: {
      fa: "پاپیروس چستر بیتی ۳ (خواب‌نامهٔ رعمسی)؛ کتاب مردگان؛ توزین قلب.",
      en: "Chester Beatty Papyrus III (Ramesside dream book); Book of the Dead; the weighing of the heart.",
    },
    method: {
      fa: "بسیاری از گزاره‌ها جفت «خوب/بد» دارند. تصویر با حیات، نیل، سفر روح و ماعت کار دارد.",
      en: "Many entries are paired good/bad. The image works with life, the Nile, soul-travel, and Ma’at.",
    },
    typical: {
      fa: "نیل = حیات؛ قلب = راستی؛ مار = هم اپوفیس هم محافظ؛ غرق = مرگ و پیوستن به ازیریس.",
      en: "Nile = life; heart = truth; snake = Apophis and also a guardian; drowning = death and joining Osiris.",
    },
    caution: {
      fa: "ترجمه‌های پاپیروس ناقص است؛ مصرشناسی هالیوود منبع نیست.",
      en: "Papyrus translations are incomplete; Hollywood Egyptology is not a source.",
    },
  },
  greek: {
    key: "greek",
    era: { fa: "قرن ۲ م · آرتمیدوروس", en: "2nd c. CE · Artemidorus" },
    region: { fa: "آناتولی، یونان، روم", en: "Anatolia, Greece, Rome" },
    texts: {
      fa: "اونیرُکریتیکا آرتمیدوروس دالدیایی؛ ارسطو دربارهٔ خواب؛ بقراط.",
      en: "Artemidorus of Daldis, Oneirocritica; Aristotle On Dreams; Hippocratic notes.",
    },
    method: {
      fa: "جزئیات نسبت: کی، با که، در کدام سمت، چه پایانی. استعارهٔ شاعرانه کافی نیست. شغل بیننده معنی را عوض می‌کند.",
      en: "Relational detail: who, with whom, which side, how it ends. A poetic metaphor is not enough. The dreamer’s trade changes the meaning.",
    },
    typical: {
      fa: "پرواز برای فقیر و توانگر دو حکم است؛ دندان شغل و خویشاوند؛ آمیزش با فرادست پیروزی.",
      en: "Flight has two rulings for poor and rich; teeth are trade and kin; intercourse with a superior is victory.",
    },
    caution: {
      fa: "آرتمیدوروس خودش از تعبیرهای کلی متنفر است؛ نقل کوتاه او را خیانت می‌کند اگر جزئیات حذف شود.",
      en: "Artemidorus himself hated generic readings; a short quote betrays him if the details are stripped.",
    },
  },
  nordic: {
    key: "nordic",
    era: { fa: "عصر وایکینگ تا سلت قرون میانه", en: "Viking Age through medieval Celtic" },
    region: { fa: "اسکاندیناوی، ایرلند، ولز", en: "Scandinavia, Ireland, Wales" },
    texts: {
      fa: "ادای شاعرانه؛ حماسه‌ها (مثلاً خواب‌های آتلی)؛ ایمباس فوروسنای ایرلندی؛ اوگام.",
      en: "Poetic Edda; sagas (e.g. Atli’s dreams); Irish imbas forosnai; ogham lore.",
    },
    method: {
      fa: "آزمون، پیمان، بهای دانش. هدیهٔ خدا رایگان نیست. خواب اغلب پیش از جنگ یا مرگ در حماسه می‌آید.",
      en: "Ordeal, oath, the price of knowledge. A god’s gift is never free. In saga, a dream often comes before war or death.",
    },
    typical: {
      fa: "گرگ = فنا یا وفا؛ کلاغ = خبر اودین؛ چاه = حکمت به بهای چشم؛ درخت = جهان.",
      en: "Wolf = doom or loyalty; raven = Odin’s news; a well = wisdom at the price of an eye; a tree = the world.",
    },
    caution: {
      fa: "سلت و نوردیک یکی نیستند؛ نوپاگانیسم امروزی را با متن حماسه عوضی نگیرید.",
      en: "Celtic and Norse are not one file; do not swap modern neopaganism for a saga text.",
    },
  },
  african: {
    key: "african",
    era: { fa: "سنت شفاهی زنده", en: "Living oral tradition" },
    region: { fa: "غرب آفریقا و گسترهٔ یوروبا؛ جنوب آفریقا", en: "West Africa and the Yoruba sphere; southern Africa" },
    texts: {
      fa: "ایفا و ادو یوروبا؛ پیام نیا در زولو و خوسا؛ قصه‌های اوریشا.",
      en: "Yoruba Ifá and ẹsẹ; ancestor-messages in Zulu and Xhosa; orisha narratives.",
    },
    method: {
      fa: "روح نیا و اوریشا در تصویر حاضرند. احترام، نذر اخلاقی و نام درست آیین است نه ترس خالی.",
      en: "Ancestor and orisha are present in the image. Respect, an ethical offering, and the right name are the rite — not empty fear.",
    },
    typical: {
      fa: "آب = یموجا؛ تندر = شنگو؛ طبل = سخن جمع؛ مار = زمین و دارو.",
      en: "Water = Yemoja; thunder = Shango; drum = the people’s speech; snake = earth and medicine.",
    },
    caution: {
      fa: "آفریقا یک سنت نیست. یوروبا را به کل قاره تعمیم ندهید.",
      en: "Africa is not one tradition. Do not stretch Yoruba across the whole continent.",
    },
  },
  mesoamerican: {
    key: "mesoamerican",
    era: { fa: "کلاسیک مایا تا آلفابتیک استعماری", en: "Classic Maya to colonial alphabetic texts" },
    region: { fa: "میان‌آمریکا", en: "Mesoamerica" },
    texts: {
      fa: "چیلم بالام؛ تونال‌آماتل؛ روایت ناوال؛ اسطورهٔ ذرت و خورشید.",
      en: "Chilam Balam; tonalamatl; nagual narrative; maize and sun myth.",
    },
    method: {
      fa: "تصویر اغلب کیهان کوچک است: چهار جهت، خورشید، خون پیمان، تقویم. افراط بی‌ادبانه خشم زمین است.",
      en: "The image is often a small cosmos: four directions, sun, pact-blood, calendar. Rude excess is the earth’s anger.",
    },
    typical: {
      fa: "ذرت = جان مردم؛ جگوار = شب و شمن؛ آب = چالچیوتلی‌کوئه؛ خورشید = پیمان.",
      en: "Maize = a people’s life; jaguar = night and shaman; water = Chalchiuhtlicue; sun = a pact.",
    },
    caution: {
      fa: "قربانی را به هیجان هالیوود تقلیل ندهید؛ تقویم فال روزنامه نیست.",
      en: "Do not reduce sacrifice to Hollywood thrill; the calendar is not a newspaper horoscope.",
    },
  },
  shaman: {
    key: "shaman",
    era: { fa: "قوم‌نگاری سیبری، آمازون، شمالگان", en: "Siberian, Amazonian, Arctic ethnography" },
    region: { fa: "چندقاره (نه یک ملت)", en: "Several continents (not one nation)" },
    texts: {
      fa: "گزارش‌های سفر روح، حیوان قدرت، پوست‌اندازی؛ این اطلس از نوع تصویر حرف می‌زند نه از یک قبیلهٔ واحد.",
      en: "Accounts of soul-flight, power-animal, and molt; this atlas speaks of image-type, not of one tribe.",
    },
    method: {
      fa: "خواب یا سفر روح است. حیوان، غار، طبل و پوست ابزار شفا یا خطرند. بی‌دعوت وارد شدن می‌شکند.",
      en: "The dream is (or is like) soul-travel. Animal, cave, drum, and skin are healing tools or dangers. Entering uninvited breaks.",
    },
    typical: {
      fa: "غار = جهان زیرین؛ پرنده = روح بالا؛ پوست‌کندن = تجدید؛ طبل = اسب سفر.",
      en: "Cave = underworld; bird = upper soul; flaying = renewal; drum = the horse of travel.",
    },
    caution: {
      fa: "«شمن» برچسب امپراتوری است. آیین زنده را از کتاب گردشگری ندزدید.",
      en: "“Shaman” is an imperial label. Do not steal a living rite from a tourist book.",
    },
  },
  jung: {
    key: "jung",
    era: { fa: "۱۹۱۲–۱۹۶۱ و سنت تحلیلی بعد", en: "1912–1961 and later analytical work" },
    region: { fa: "اروپا · روان‌شناسی عمق", en: "Europe · depth psychology" },
    texts: {
      fa: "نمادهای تحول؛ کهن‌الگوها و ناخودآگاه جمعی؛ سمینار خواب کودکان؛ انسان و سمبل‌هایش.",
      en: "Symbols of Transformation; Archetypes and the Collective Unconscious; Children’s Dreams seminars; Man and His Symbols.",
    },
    method: {
      fa: "تصویر از روان است نه از آینده. سؤال: کدام بخشِ من حرف می‌زند؟ جبران، سایه، آنیما/آنیموس، خود.",
      en: "The image is psyche, not a forecast. The question: which part of me speaks? Compensation, shadow, anima/animus, Self.",
    },
    typical: {
      fa: "آب = ناخودآگاه؛ خانه = روان؛ مار = انرژی حیاتی؛ پیر دانا = راهنما نه پدر واقعی حتمی.",
      en: "Water = unconscious; house = psyche; snake = life-energy; wise old man = a guide, not a certain real father.",
    },
    caution: {
      fa: "کهن‌الگو برچسب روی همه چیز نیست. یونگ تعبیر دیکشنری تک‌خطی را رد می‌کرد.",
      en: "An archetype is not a sticker on everything. Jung refused one-line dictionary decoding.",
    },
  },
  freud: {
    key: "freud",
    era: { fa: "۱۹۰۰ و ویرایش‌های بعد", en: "1900 and later editions" },
    region: { fa: "وین · روانکاوی", en: "Vienna · psychoanalysis" },
    texts: {
      fa: "تعبیر خواب (Die Traumdeutung)؛ سخنرانی‌های آشنایی؛ مقاله‌های سانسور و جابه‌جایی.",
      en: "The Interpretation of Dreams; Introductory Lectures; papers on censorship and displacement.",
    },
    method: {
      fa: "ظاهر خواب پوشش میل یا اضطراب است. فشردگی، جابه‌جایی، بازنمایی تصویری، ویرایش ثانویه. تداعی آزاد بیننده لازم است.",
      en: "The dream’s face covers a wish or anxiety. Condensation, displacement, pictorial representation, secondary revision. The dreamer’s free association is required.",
    },
    typical: {
      fa: "پرواز، افتادن، برهنگی در جمع، دندان: خوشه‌های میل و شرم؛ نه خبر تحت‌اللفظ شغل.",
      en: "Flying, falling, public nakedness, teeth: clusters of wish and shame — not a literal job bulletin.",
    },
    caution: {
      fa: "بدون تداعی خود بیننده، فروید به دیکشنری نماد تقلیل می‌یابد — که خودش آن را ناقص می‌دانست.",
      en: "Without the dreamer’s own associations, Freud collapses into a symbol dictionary — which he himself called incomplete.",
    },
  },
  clinical: {
    key: "clinical",
    era: { fa: "دههٔ ۱۹۵۰ تا پژوهش خواب امروز", en: "1950s through current sleep research" },
    region: { fa: "آزمایشگاه خواب بین‌المللی", en: "International sleep labs" },
    texts: {
      fa: "فعال‌سازی–ترکیب هابسون؛ شبیه‌سازی تهدید رِوونسو؛ پیوستگی هال و نوردبی؛ ادبیات فلج خواب.",
      en: "Hobson’s activation–synthesis; Revonsuo’s threat simulation; Hall and Nordby continuity; sleep-paralysis literature.",
    },
    method: {
      fa: "همبستگی هیجان، حافظه و استرس روز — نه حکم مال و مرگ. کابوس، بختک و تکرار را می‌توان سنجید.",
      en: "Correlates of emotion, memory, and daytime stress — not a ruling on money or death. Nightmare, old-hag, and repetition can be measured.",
    },
    typical: {
      fa: "تعقیب و افتادن شایع‌اند؛ بختک فلج REM است؛ خواب امتحان اضطراب ارزیابی است.",
      en: "Chase and falling are common; the old hag is REM paralysis; an exam dream is evaluation-anxiety.",
    },
    caution: {
      fa: "همبستگی پیش‌بینی قطعی نیست. پژوهش جای سنت را «باطل» نمی‌کند؛ زبانش عوض است.",
      en: "A correlation is not a sure forecast. Research does not “void” a tradition; it speaks another language.",
    },
  },
};

export const CANON_LIST: TraditionCanon[] = SOURCE_ORDER.map((k) => SOURCE_CANON[k]);
