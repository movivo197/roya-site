import { createFileRoute } from "@tanstack/react-router";
import { Compass, Landmark, Moon, PenLine, Search, Sun, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { NotifyPrompt } from "@/components/notify-prompt";
import { ReadingView } from "@/components/reading-view";
import { SymbolSources } from "@/components/symbol-sources";
import { Button } from "@/components/ui/button";
import { VoiceButton } from "@/components/voice-button";
import { CANON_LIST } from "@/data/source-canon";
import { orderedSourceKeys, sourceLabel } from "@/data/source-labels";
import { CATEGORIES, SOURCE_ORDER, SYMBOLS, type SourceKey } from "@/data/symbols";
import { interpretWithGrok } from "@/lib/ai";
import { CAT_LABEL, MOOD_LABEL, t } from "@/lib/i18n";
import {
  MOODS,
  searchBank,
  symbolConclusion,
  symbolCounsel,
  symbolSource,
  symbolTitle,
  synthesize,
  type Mood,
} from "@/lib/interpret";
import { useJournal, type DreamEntry } from "@/lib/journal";
import { monthPattern } from "@/lib/patterns";
import { usePrefs, type Lang } from "@/lib/prefs";

export const Route = createFileRoute("/")({ component: Home });

type Tab = "write" | "bank" | "journal" | "about";
const PAGE = 21;

function Home() {
  const lang = usePrefs((s) => s.lang);
  const theme = usePrefs((s) => s.theme);
  const setLang = usePrefs((s) => s.setLang);
  const toggleTheme = usePrefs((s) => s.toggleTheme);

  const [tab, setTab] = useState<Tab>("write");
  const [text, setText] = useState("");
  const [mood, setMood] = useState<Mood>("مبهم");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [activeId, setActiveId] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [openSymbol, setOpenSymbol] = useState<string | null>(null);
  const [atlasPane, setAtlasPane] = useState<"symbols" | "traditions">("symbols");
  const [tradition, setTradition] = useState<SourceKey | "all">("all");
  const [page, setPage] = useState(1);

  const dreams = useJournal((s) => s.dreams);
  const add = useJournal((s) => s.add);
  const update = useJournal((s) => s.update);
  const remove = useJournal((s) => s.remove);
  const active = dreams.find((d) => d.id === activeId) ?? dreams[0];

  const bank = useMemo(() => {
    const list = searchBank(query);
    if (cat === "all") return list;
    return list.filter((s) => s.category === cat);
  }, [query, cat]);

  useEffect(() => {
    setPage(1);
    setOpenSymbol(null);
  }, [query, cat, tradition, atlasPane]);

  const visible = bank.slice(0, page * PAGE);
  const pattern = useMemo(() => monthPattern(dreams, lang), [dreams, lang]);

  async function interpret() {
    const trimmed = text.trim();
    if (!trimmed) return;
    const reading = synthesize(trimmed, mood, lang);
    const id = add({ text: trimmed, mood, date, reading });
    setText("");
    setActiveId(id);
    setTab("journal");
    setAiLoading(true);
    setAiError(null);
    try {
      const ai = await interpretWithGrok({
        data: {
          dream: trimmed,
          mood: MOOD_LABEL[mood][lang],
          lang,
          matched: reading.hits.map((h) => ({
            title: symbolTitle(h.symbol, lang),
            conclusion: symbolConclusion(h.symbol, lang),
            counsel: symbolCounsel(h.symbol, lang),
          })),
        },
      });
      if (ai.ok) {
        update(id, { aiConclusion: ai.conclusion, aiCounsel: ai.counsel });
      } else {
        setAiError(t(lang, "aiFail"));
      }
    } catch {
      setAiError(t(lang, "aiFail"));
    } finally {
      setAiLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 pb-28 pt-5">
      <NotifyPrompt />
      <header className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Moon className="size-6 text-accent" strokeWidth={1.5} />
          <div>
            <h1 className="text-lg font-semibold leading-tight">{t(lang, "app")}</h1>
            <p className="max-w-xs text-xs text-muted sm:max-w-md">{t(lang, "tagline")}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="flex h-11 min-w-11 items-center justify-center rounded-md border border-border px-3 text-xs"
            onClick={() => setLang(lang === "fa" ? "en" : "fa")}
            aria-label="Language"
          >
            {lang === "fa" ? "EN" : "فا"}
          </button>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-md border border-border"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? t(lang, "themeLight") : t(lang, "themeDark")}
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
        </div>
      </header>

      {tab === "write" && (
        <section className="flex flex-col gap-4">
          <label className="text-sm text-muted" htmlFor="dream">
            {t(lang, "writeLabel")}
          </label>
          <textarea
            id="dream"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-64 w-full resize-y rounded-xl border border-border bg-surface px-4 py-4 text-base leading-relaxed outline-none ring-ring focus:ring-1 sm:min-h-80"
            placeholder={t(lang, "placeholder")}
          />
          <VoiceButton lang={lang} value={text} onChange={setText} />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs text-muted" htmlFor="mood">
                {t(lang, "mood")}
              </label>
              <select
                id="mood"
                value={mood}
                onChange={(e) => setMood(e.target.value as Mood)}
                className="h-11 w-full rounded-md border border-border bg-surface px-3 text-sm"
              >
                {MOODS.map((m) => (
                  <option key={m} value={m}>
                    {MOOD_LABEL[m][lang]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted" htmlFor="date">
                {t(lang, "date")}
              </label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="h-11 w-full rounded-md border border-border bg-surface px-3 text-sm"
              />
            </div>
          </div>
          <Button onClick={interpret} disabled={!text.trim() || aiLoading}>
            {aiLoading ? t(lang, "interpreting") : t(lang, "interpret")}
          </Button>
          <p className="text-xs leading-relaxed text-subtle">{t(lang, "writeHint")}</p>
        </section>
      )}

      {tab === "bank" && (
        <section className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Chip active={atlasPane === "symbols"} onClick={() => setAtlasPane("symbols")}>
              {t(lang, "atlasSymbols")}
            </Chip>
            <Chip active={atlasPane === "traditions"} onClick={() => setAtlasPane("traditions")}>
              {t(lang, "atlasTraditions")}
            </Chip>
          </div>
          <p className="text-sm leading-relaxed text-muted">{t(lang, "atlasIntro")}</p>

          {atlasPane === "traditions" && (
            <div className="flex flex-col gap-3 pb-8">
              {CANON_LIST.map((c) => (
                <article key={c.key} className="rounded-xl border border-border bg-surface p-4">
                  <h3 className="text-lg font-semibold leading-snug">{sourceLabel(c.key, lang)}</h3>
                  <p className="mt-1 text-xs text-subtle">
                    {c.era[lang]} · {c.region[lang]}
                  </p>
                  <CanonRow label={t(lang, "canonTexts")} text={c.texts[lang]} />
                  <CanonRow label={t(lang, "canonMethod")} text={c.method[lang]} />
                  <CanonRow label={t(lang, "canonTypical")} text={c.typical[lang]} />
                  <CanonRow label={t(lang, "canonCaution")} text={c.caution[lang]} />
                  <button
                    type="button"
                    className="mt-3 min-h-11 text-xs text-subtle"
                    onClick={() => {
                      setTradition(c.key);
                      setAtlasPane("symbols");
                    }}
                  >
                    {t(lang, "traditionRead")}
                  </button>
                </article>
              ))}
            </div>
          )}

          {atlasPane === "symbols" && (
            <>
              <div className="relative">
                <Search className="pointer-events-none absolute top-3.5 size-4 text-subtle rtl:right-3 ltr:left-3" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t(lang, "search")}
                  className="h-11 w-full rounded-md border border-border bg-surface text-sm outline-none ring-ring focus:ring-1 rtl:pr-10 rtl:pl-3 ltr:pl-10 ltr:pr-3"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                <Chip active={cat === "all"} onClick={() => setCat("all")}>
                  {t(lang, "all")}
                </Chip>
                {CATEGORIES.map((c) => (
                  <Chip key={c} active={cat === c} onClick={() => setCat(c)}>
                    {CAT_LABEL[c][lang]}
                  </Chip>
                ))}
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1">
                <Chip active={tradition === "all"} onClick={() => setTradition("all")}>
                  {t(lang, "allTraditions")}
                </Chip>
                {SOURCE_ORDER.map((k) => (
                  <Chip key={k} active={tradition === k} onClick={() => setTradition(k)}>
                    {sourceLabel(k, lang).split("·")[0].trim()}
                  </Chip>
                ))}
              </div>
              <p className="text-xs text-subtle">
                {t(lang, "showingOf")} {visible.length} {t(lang, "of")} {bank.length}{" "}
                {t(lang, "symbolsCount")} · {SOURCE_ORDER.length} {t(lang, "sourceCount")}
              </p>
              {bank.length === 0 && (
                <p className="rounded-xl border border-border bg-surface p-8 text-center text-sm text-muted">
                  {t(lang, "atlasEmpty")}
                </p>
              )}
              <div className="atlas-grid pb-4">
                {visible.map((s) => {
                  const open = openSymbol === s.id;
                  const srcMap = lang === "en" ? s.sourcesEn : s.sources;
                  const srcKeys = orderedSourceKeys(srcMap);
                  const focus = tradition === "all" ? null : tradition;
                  const focusText = focus ? symbolSource(s, focus, lang) : null;
                  return (
                    <article
                      key={s.id}
                      className="atlas-card rounded-xl border border-border bg-surface p-4"
                    >
                      <p className="text-xs text-subtle">{CAT_LABEL[s.category][lang]}</p>
                      <h3 className="mt-1 text-lg font-semibold leading-snug">{symbolTitle(s, lang)}</h3>
                      <p className="mt-1 text-xs text-muted">
                        {lang === "en" ? s.title : s.titleEn}
                      </p>
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed">
                        {symbolConclusion(s, lang)}
                      </p>
                      {focus && focusText && (
                        <p className="mt-3 line-clamp-3 border-border text-sm leading-relaxed text-muted ltr:border-l-2 ltr:pl-3 rtl:border-r-2 rtl:pr-3">
                          {sourceLabel(focus, lang).split("·")[0].trim()}: {focusText}
                        </p>
                      )}
                      <div className="mt-3 flex items-center justify-between gap-2">
                        <button
                          type="button"
                          className="min-h-11 text-xs text-subtle"
                          onClick={() => setOpenSymbol(open ? null : s.id)}
                        >
                          {t(lang, "sources")} · {srcKeys.length}
                        </button>
                        <span className="text-xs text-subtle">
                          {srcKeys.length}/{SOURCE_ORDER.length}
                        </span>
                      </div>
                      {open && (
                        <>
                          <p className="mt-2 text-sm text-muted">{symbolCounsel(s, lang)}</p>
                          <SymbolSources symbol={s} lang={lang} skip={focus} />
                        </>
                      )}
                    </article>
                  );
                })}
              </div>
              {visible.length < bank.length && (
                <Button className="mb-8 w-full" onClick={() => setPage((p) => p + 1)}>
                  {t(lang, "loadMore")} · {bank.length - visible.length}
                </Button>
              )}
            </>
          )}
        </section>
      )}

      {tab === "journal" && (
        <section className="flex flex-col gap-5">
          {dreams.length > 0 && (
            <section className="rounded-xl border border-border bg-surface p-5">
              <p className="text-xs font-medium text-muted">{t(lang, "patternTitle")}</p>
              {pattern.monthCount === 0 ? (
                <p className="mt-2 text-sm leading-relaxed text-muted">{t(lang, "patternNone")}</p>
              ) : (
                <>
                  {pattern.mood && (
                    <p className="mt-2 text-sm leading-relaxed">
                      {t(lang, "patternMood")}: {MOOD_LABEL[pattern.mood]?.[lang] ?? pattern.mood}
                      <span className="text-muted">
                        {" "}
                        · {pattern.moodCount} {t(lang, "patternOf")} {pattern.monthCount}
                      </span>
                    </p>
                  )}
                  {pattern.repeats.length === 0 ? (
                    <p className="mt-2 text-sm leading-relaxed text-muted">{t(lang, "patternQuiet")}</p>
                  ) : (
                    <ul className="mt-3 flex flex-col gap-2">
                      {pattern.repeats.map((row) => (
                        <li key={row.id} className="flex items-baseline justify-between gap-3 text-sm">
                          <span>{row.title}</span>
                          <span className="text-xs text-muted">
                            {row.count} {t(lang, "patternTimes")}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </section>
          )}
          {dreams.length === 0 && (
            <p className="rounded-xl border border-border bg-surface p-8 text-center text-sm text-muted">
              {t(lang, "emptyJournal")}
            </p>
          )}
          {dreams.length > 0 && (
            <div className="flex gap-2 overflow-x-auto">
              {dreams.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setActiveId(d.id)}
                  className={`h-11 shrink-0 rounded-md border px-3 text-xs ${
                    active?.id === d.id ? "border-accent bg-raised" : "border-border text-muted"
                  }`}
                >
                  {d.date} · {MOOD_LABEL[d.mood]?.[lang] ?? d.mood}
                </button>
              ))}
            </div>
          )}
          {active && (
            <DreamDetail
              dream={active}
              lang={lang}
              onRemove={() => remove(active.id)}
              onPick={(span, symbolId) => {
                const choices = { ...(active.choices ?? active.reading?.choices ?? {}), [span]: symbolId };
                update(active.id, {
                  choices,
                  reading: synthesize(active.text, active.mood, lang, choices),
                });
              }}
            />
          )}
          {aiLoading && active && <p className="text-sm text-muted">{t(lang, "deeperWait")}</p>}
          {aiError && <p className="text-sm text-warn">{aiError}</p>}
        </section>
      )}

      {tab === "about" && (
        <section className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 text-sm leading-relaxed">
          <h2 className="text-lg font-semibold">{t(lang, "methodTitle")}</h2>
          <p>{t(lang, "method1")}</p>
          <p>{t(lang, "method2")}</p>
          <p>{t(lang, "method3")}</p>
          <p className="text-xs text-subtle">
            {SYMBOLS.length} {t(lang, "symbolsCount")} · {SOURCE_ORDER.length} {t(lang, "sourceCount")} · {t(lang, "localOnly")}
          </p>
          <button
            type="button"
            className="min-h-11 self-start text-sm text-muted"
            onClick={() => {
              setAtlasPane("traditions");
              setTab("bank");
            }}
          >
            {t(lang, "atlasTraditions")}
          </button>
          <InstallBlock lang={lang} />
        </section>
      )}

      <nav className="fixed bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-1 rounded-full border border-border bg-bg/95 p-1.5">
        {(
          [
            ["write", "write", PenLine],
            ["bank", "atlas", Landmark],
            ["journal", "journal", Compass],
            ["about", "method", Moon],
          ] as const
        ).map(([id, key, Icon]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`flex h-11 min-w-16 flex-col items-center justify-center rounded-full px-3 text-xs ${
              tab === id ? "bg-raised text-fg" : "text-muted"
            }`}
          >
            <Icon className="size-4" strokeWidth={1.75} />
            {t(lang, key)}
          </button>
        ))}
      </nav>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-9 shrink-0 rounded-full border px-3 text-xs ${
        active ? "border-accent bg-accent text-accent-fg" : "border-border text-muted"
      }`}
    >
      {children}
    </button>
  );
}

function CanonRow({ label, text }: { label: string; text: string }) {
  return (
    <div className="mt-3">
      <p className="text-xs font-medium text-muted">{label}</p>
      <p className="mt-1 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

function DreamDetail({
  dream,
  lang,
  onRemove,
  onPick,
}: {
  dream: DreamEntry;
  lang: Lang;
  onRemove: () => void;
  onPick: (span: string, symbolId: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-border bg-surface p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-muted">
            {dream.date} · {MOOD_LABEL[dream.mood]?.[lang] ?? dream.mood}
          </p>
          <button type="button" onClick={onRemove} className="flex h-11 w-11 items-center justify-center text-subtle" aria-label={t(lang, "delete")}>
            <Trash2 className="size-4" />
          </button>
        </div>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed">{dream.text}</p>
      </div>
      {dream.reading && (
        <ReadingView
          lang={lang}
          reading={dream.reading}
          aiConclusion={dream.aiConclusion}
          aiCounsel={dream.aiCounsel}
          onPick={onPick}
        />
      )}
    </div>
  );
}

function InstallBlock({ lang }: { lang: Lang }) {
  const [promptEvent, setPromptEvent] = useState<{ prompt: () => Promise<void> } | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setPromptEvent(e as unknown as { prompt: () => Promise<void> });
    };
    const onInstalled = () => setInstalled(true);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    if (window.matchMedia("(display-mode: standalone)").matches) setInstalled(true);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  return (
    <div className="mt-2 rounded-lg border border-border bg-raised p-4">
      {installed ? (
        <p className="text-sm">{t(lang, "installed")}</p>
      ) : (
        <>
          <Button
            onClick={() => {
              void promptEvent?.prompt();
            }}
          >
            {t(lang, "install")}
          </Button>
          <p className="mt-3 text-xs leading-relaxed text-subtle">{t(lang, "installHint")}</p>
        </>
      )}
    </div>
  );
}
