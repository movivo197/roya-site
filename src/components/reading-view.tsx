import { useState } from "react";
import { SharedMeaning } from "@/components/shared-meaning";
import { SourceNote } from "@/components/source-note";
import { Button } from "@/components/ui/button";
import { orderedSourceKeys } from "@/data/source-labels";
import { CAT_LABEL, TONE_LABEL, t, type I18nKey } from "@/lib/i18n";
import {
  symbolConclusion,
  symbolSource,
  symbolTitle,
  type LocalReading,
  type MatchHit,
} from "@/lib/interpret";
import type { Lang } from "@/lib/prefs";

function leadKey(n: number): I18nKey {
  if (n >= 3) return "found";
  if (n === 2) return "foundTwo";
  return "foundOne";
}

function SymbolCard({
  hit,
  lang,
  open,
  onToggle,
}: {
  hit: MatchHit;
  lang: Lang;
  open: boolean;
  onToggle: () => void;
}) {
  const roleName =
    hit.role === "مکان"
      ? t(lang, "rolePlace")
      : hit.role === "حال"
        ? t(lang, "roleState")
        : hit.role === "اتفاق"
          ? t(lang, "roleEvent")
          : (CAT_LABEL[hit.symbol.category]?.[lang] ?? hit.symbol.category);
  const title = symbolTitle(hit.symbol, lang);
  const keys = orderedSourceKeys(lang === "en" ? hit.symbol.sourcesEn : hit.symbol.sources);
  const sep = lang === "en" ? ", " : "، ";
  return (
    <article className="rounded-lg border border-border bg-surface p-4">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-base font-semibold">{title}</h3>
        <span className="shrink-0 text-xs text-subtle">{roleName}</span>
      </div>
      {hit.matched.length > 0 && (
        <p className="mt-2 text-xs leading-relaxed text-subtle">
          {t(lang, "whyMatch")} {hit.matched.join(sep)}
        </p>
      )}
      <p className="mt-2 text-sm leading-relaxed">{symbolConclusion(hit.symbol, lang)}</p>
      <SharedMeaning symbol={hit.symbol} lang={lang} />
      <Button
        type="button"
        variant="ghost"
        className="mt-3 w-full"
        aria-expanded={open}
        onClick={onToggle}
      >
        {open ? t(lang, "hideSources") : t(lang, "showSources")}
      </Button>
      {open && (
        <div className="mt-3 flex flex-col gap-2">
          {keys.map((key) => {
            const text = symbolSource(hit.symbol, key, lang);
            if (!text) return null;
            return <SourceNote key={key} sourceKey={key} text={text} title={title} lang={lang} />;
          })}
        </div>
      )}
    </article>
  );
}

export function ReadingView({
  reading,
  lang,
  aiConclusion,
  aiCounsel,
  aiNote,
  aiLoading,
  onPick,
}: {
  reading: LocalReading;
  lang: Lang;
  aiConclusion?: string;
  aiCounsel?: string[];
  aiNote?: string;
  aiLoading?: boolean;
  onPick?: (span: string, symbolId: string) => void;
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [showRest, setShowRest] = useState(false);
  const leadN = reading.leadCount ?? Math.min(3, reading.hits.length);
  const lead = reading.hits.slice(0, leadN);
  const rest = reading.hits.slice(leadN);
  const toggle = (id: string) => setOpenId((cur) => (cur === id ? null : id));
  const ambiguities = reading.ambiguities ?? [];

  return (
    <div className="flex flex-col gap-4">
      {ambiguities.map((item) => (
        <section key={item.span} className="rounded-xl border border-border bg-raised p-5">
          <p className="text-xs font-medium text-muted">{t(lang, "whichMeaning")}</p>
          <h2 className="mt-1 text-lg font-semibold leading-snug">«{item.word}»</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {item.options.map((option) => (
              <Button
                key={option.id}
                type="button"
                variant="ghost"
                className="min-w-28 flex-1"
                onClick={() => onPick?.(item.span, option.id)}
              >
                {lang === "en" ? option.titleEn : option.title}
              </Button>
            ))}
          </div>
        </section>
      ))}
      <section className="rounded-xl border border-border bg-surface p-5">
        <p className="text-xs font-medium text-muted">{t(lang, "conclusion")}</p>
        <h2 className="mt-1 text-lg font-semibold leading-snug">{reading.headline}</h2>
        <p className="mt-3 text-sm leading-relaxed text-fg/90">{reading.conclusion}</p>
        <div className="mt-3">
          <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">
            {t(lang, "tone")}: {TONE_LABEL[reading.tone][lang]}
          </span>
        </div>
      </section>

      <section className="rounded-xl border border-border bg-surface p-5">
        <p className="text-xs font-medium text-muted">{t(lang, "counsel")}</p>
        <ul className="mt-3 flex flex-col gap-3">
          {reading.counsel.map((c) => (
            <li
              key={c}
              className="border-accent/40 text-sm leading-relaxed ltr:border-l-2 ltr:pl-3 rtl:border-r-2 rtl:pr-3"
            >
              {c}
            </li>
          ))}
        </ul>
      </section>

      {(aiLoading || aiConclusion) && (
        <section className="rounded-xl border border-border bg-raised p-5">
          <p className="text-xs font-medium text-muted">{t(lang, "deeper")}</p>
          {aiLoading && <p className="mt-2 text-sm text-muted">{t(lang, "deeperWait")}</p>}
          {aiConclusion && <p className="mt-3 text-sm leading-relaxed">{aiConclusion}</p>}
          {aiCounsel && aiCounsel.length > 0 && (
            <ul className="mt-3 flex flex-col gap-2">
              {aiCounsel.map((c) => (
                <li key={c} className="text-sm text-fg/90">
                  {c}
                </li>
              ))}
            </ul>
          )}
          {aiNote && <p className="mt-3 text-xs text-subtle">{aiNote}</p>}
        </section>
      )}

      {lead.length > 0 && (
        <section className="flex flex-col gap-3">
          <p className="text-xs font-medium text-muted">
            {lead.some((h) => h.role) ? t(lang, "scene") : t(lang, leadKey(lead.length))}
          </p>
          {lead.map((hit) => (
            <SymbolCard
              key={hit.symbol.id}
              hit={hit}
              lang={lang}
              open={openId === hit.symbol.id}
              onToggle={() => toggle(hit.symbol.id)}
            />
          ))}
        </section>
      )}

      {rest.length > 0 && (
        <section className="flex flex-col gap-3">
          <Button
            type="button"
            variant="ghost"
            className="w-full justify-between"
            aria-expanded={showRest}
            onClick={() => setShowRest((v) => !v)}
          >
            <span>{t(lang, "alsoFound")}</span>
            <span className="text-xs text-muted">{rest.length}</span>
          </Button>
          {showRest &&
            rest.map((hit) => (
              <SymbolCard
                key={hit.symbol.id}
                hit={hit}
                lang={lang}
                open={openId === hit.symbol.id}
                onToggle={() => toggle(hit.symbol.id)}
              />
            ))}
        </section>
      )}
    </div>
  );
}
