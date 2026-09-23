import type { SourceKey } from "@/data/meta";

/** Extra tradition notes for high-traffic symbols (FA). */
export const ENRICH: Record<string, Partial<Record<SourceKey, string>>> = {
  sex: {
    christian: "در برخی خوانش‌های پدران کلیسا میل در خواب آزمون است نه فعل؛ اقرار جدا از تعبیر است.",
    buddhist: "در وینیه تماس جنسی بند است؛ در خواب نشانهٔ دلبستگی و بیداری نسبت به تشنگی.",
    nordic: "باروری فریا و نیز پیمان شکنی در حماسه‌ها.",
    mesoamerican: "نیروی زایش زمین؛ افراط بی‌ادبانه خشم تنانتزین است.",
    greek: "آرتمیدوروس جماع را با مقام طرف می‌سنجد: فرادست پیروزی، فرودست زیان.",
    hindu: "میتونا انرژی آفرینش؛ در تانترا نه هزل.",
    jewish: "نیدّه و قدوشه مرز نزدیکی است؛ خواب پیمان را یاد می‌آورد.",
    egyptian: "آفرینش آتوم با دست؛ باروری نه رسوایی.",
    african: "نیروی شنگو و اوشون؛ رضایت آیین است.",
    japanese: "کامیتوکی باروری؛ شرم جمع جدای از کام است.",
    shaman: "آیین مقدس زمین؛ زور در صحنه سفر روح را می‌شکند.",
  },
  death: {
    christian: "مرگ کهنه انسان و زندگی تازه.",
    buddhist: "بی‌دوامی و باردو.",
    nordic: "هل و والهالا دو مقصدند نه یک معنی.",
    mesoamerican: "میتلان گذر نه پایان.",
  },
  house: {
    christian: "خانه بر سنگ یا ریگ.",
    buddhist: "ترک خانه آغاز راه.",
    nordic: "تالار طایفه.",
    mesoamerican: "خانه چهارجهته کیهان کوچک.",
  },
  naked: {
    christian: "برهنگی عدن پیش از شرم، و برهنگی صلیب.",
    buddhist: "کندن جامهٔ من.",
    nordic: "بی‌سلاحی در تالار شرم یا صدق.",
  },
  quran: {
    christian: "کتاب مقدس و نماز جمع در خواب دعوت نظم است.",
    jewish: "تورا در خواب حکمت.",
    buddhist: "سوتره و ذکر.",
  },
  mother: {
    christian: "مریم پناه.",
    buddhist: "مادر پرجناپارامیتا.",
    nordic: "فریگ نگهبان خانه.",
    mesoamerican: "کواتلیکوئه مادر سترگ.",
  },
  father: {
    christian: "پدر آسمانی و نیز یوسف نجّار.",
    buddhist: "پدر راه و انضباط.",
    nordic: "اودین پدر کشته‌شده برای دانش.",
  },
  blood: {
    christian: "خون عهد.",
    buddhist: "خون دلبستگی و زخم سامسارا.",
    nordic: "خون پیمان.",
    mesoamerican: "خون خوراک خورشید در اسطوره؛ در خواب مدرن قربانی روانی.",
  },
  key: {
    islamic:
      "کلید گشایش کار، علم یا ازدواج است بسته به آنکه درِ کدام خانه باز شود. گم‌کردن کلید حیرت در انتخاب است نه طلسم.",
    jung: "درِ قفل‌شده اتاقی از روان است. «راز» اینجا کیفیت ندیده‌شدهٔ خودتان است، نه خبر پنهان دیگران.",
    freud: "کلید و قفل در خوانش کلاسیک او اغلب جفت بدن و دخول است؛ این تقلیل است، اما اضطراب آستانه را نشان می‌دهد.",
    chinese: "کلید اجازهٔ رسمی و مهر مقام؛ بی‌کلید ماندن یعنی زمان بخت نرسیده.",
    jewish: "کلیدهای بیت‌المقدس و نیز دانش تورات؛ گشودن مسئولیت است.",
    christian: "کلیدهای پطرس: بستن و گشودن. اختیار اخلاقی، نه جادو.",
    hindu: "آستانهٔ دارشان؛ در معبد را با نیت ناپاک باز نکنید.",
    clinical: "کلید و قفل با مسئلهٔ کنترل و دسترسی همبسته‌اند، نه با پیش‌بینی شغل.",
  },
  mirror: {
    islamic: "آینه همسر، باطن یا خودشناسی است؛ شکستن آینه حرف تلخ یا جدایی در برخی فهرست‌هاست.",
    jung: "آینه پرسونا و سایه است: چهره‌ای که در خواب غریب است همان است که روز انکار می‌کنید.",
    chinese: "آینه شکسته جدایی یا سخن تند.",
    jewish: "آینهٔ صیقل‌خورده حضور است؛ تیره یعنی غفلت.",
    clinical: "آینه با ارزیابی خود و اضطراب دیده شدن همبسته است.",
  },
};

export const ENRICH_EN: Record<string, Partial<Record<SourceKey, string>>> = {
  sex: {
    christian: "Some church fathers treat desire in sleep as a trial, not a deed; confession is a separate file.",
    buddhist: "Vinaya binds sexual contact; in a dream it marks clinging and a waking to thirst.",
    nordic: "Freyja’s fertility, and broken oaths in the sagas.",
    mesoamerican: "Earth’s birthing force; rude excess angers the mother of gods.",
    greek: "Artemidorus weighs the partner’s rank: above you, victory; below, loss.",
    hindu: "Mithuna as creative energy; in tantra, not a joke.",
    jewish: "Niddah and qedushah mark the border of intimacy; the dream recalls a covenant.",
    egyptian: "Atum’s creation by hand; fertility, not scandal.",
    african: "The force of Shango and Oshun; consent is the rite.",
    japanese: "Kami of fertility; public shame is not the kami.",
    shaman: "A sacred earth-rite; force in the scene breaks soul-travel.",
    islamic:
      "With a lawful partner, opening and victory; with the forbidden, grief or discord. Nocturnal emission has its own legal file, separate from interpretation.",
    freud: "A repressed wish fulfilled; censorship displaces the scene.",
    jung: "A meeting of opposites and life-energy, not only a sexual act.",
    clinical: "Sexual content in dreams is common and not in itself an injury.",
  },
  death: {
    christian: "Death of the old self and a new life.",
    buddhist: "Impermanence and the bardo.",
    nordic: "Hel and Valhalla are two destinations, not one meaning.",
    mesoamerican: "Mictlan is a crossing, not an end.",
  },
  house: {
    christian: "A house on rock or sand.",
    buddhist: "Leaving home begins the path.",
    nordic: "The clan hall.",
    mesoamerican: "A four-sided house is a small cosmos.",
  },
  naked: {
    christian: "Eden before shame, and the nakedness of the cross.",
    buddhist: "Stripping the garment of I.",
    nordic: "Unarmed in the hall: shame or candor.",
  },
  quran: {
    christian: "Scripture and common prayer as a call to order.",
    jewish: "Torah in a dream is wisdom.",
    buddhist: "Sutra and recitation.",
  },
  mother: {
    christian: "Mary as shelter.",
    buddhist: "Prajnaparamita the mother of insight.",
    nordic: "Frigg, keeper of the house.",
    mesoamerican: "Coatlicue the great mother.",
  },
  father: {
    christian: "The heavenly Father, and Joseph the carpenter.",
    buddhist: "A father of the path and of discipline.",
    nordic: "Odin, a father who dies into knowledge.",
  },
  blood: {
    christian: "Covenant blood.",
    buddhist: "Blood of clinging and a samsaric wound.",
    nordic: "Blood of a pact.",
    mesoamerican: "In myth, blood feeds the sun; in a modern dream it is a psychic offering.",
  },
  key: {
    islamic:
      "A key opens work, knowledge, or a marriage, depending which house the door belongs to. Losing it is bewilderment in a choice, not a hex.",
    jung: "A locked door is a room of the psyche. The “secret” is an unseen quality of yours, not someone else’s hidden news.",
    freud: "Key and lock in his classical reading often pair body and entry; that is reductive, but it does mark threshold-anxiety.",
    chinese: "A key is official permission and a seal of rank; remaining keyless means the lucky hour has not come.",
    jewish: "Keys of the sanctuary and of Torah; opening is a responsibility.",
    christian: "Peter’s keys: to bind and loose. Moral authority, not magic.",
    hindu: "The threshold of darshan; do not open a temple door with a soiled intent.",
    clinical: "Keys and locks correlate with control and access, not with job prediction.",
  },
  mirror: {
    islamic: "A mirror is a spouse, the inner state, or self-knowledge; breaking it is harsh speech or a split in some lists.",
    jung: "The mirror is persona and shadow: a strange face in the dream is what the day denies.",
    chinese: "A broken mirror is a split or a harsh word.",
    jewish: "A polished mirror is presence; a dull one is heedlessness.",
    clinical: "Mirrors track self-evaluation and the anxiety of being seen.",
  },
};
