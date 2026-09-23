import { Mic } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { t, type I18nKey } from "@/lib/i18n";
import type { Lang } from "@/lib/prefs";

type SpeechResult = { isFinal: boolean; 0?: { transcript?: string } };

type Rec = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((ev: { resultIndex: number; results: ArrayLike<SpeechResult> }) => void) | null;
  onerror: ((ev: { error?: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

function recognitionCtor(): (new () => Rec) | null {
  if (typeof window === "undefined") return null;
  const w = window as Window & {
    SpeechRecognition?: new () => Rec;
    webkitSpeechRecognition?: new () => Rec;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function VoiceButton({
  lang,
  value,
  onChange,
}: {
  lang: Lang;
  value: string;
  onChange: (next: string) => void;
}) {
  const [listening, setListening] = useState(false);
  const [hint, setHint] = useState<I18nKey | null>(null);
  const recRef = useRef<Rec | null>(null);
  const baseRef = useRef("");
  const finalRef = useRef("");

  useEffect(() => {
    return () => recRef.current?.stop();
  }, []);

  function stop() {
    recRef.current?.stop();
    recRef.current = null;
    setListening(false);
  }

  function start() {
    const Ctor = recognitionCtor();
    if (!Ctor) {
      setHint("voiceUnsupported");
      return;
    }
    const previous = recRef.current;
    recRef.current = null;
    previous?.stop();
    setHint(null);
    const rec = new Ctor();
    rec.lang = lang === "fa" ? "fa-IR" : "en-US";
    rec.continuous = true;
    rec.interimResults = true;
    baseRef.current = value.trim();
    finalRef.current = "";
    rec.onresult = (ev) => {
      let interim = "";
      for (let i = ev.resultIndex; i < ev.results.length; i++) {
        const row = ev.results[i];
        const piece = row?.[0]?.transcript ?? "";
        if (row?.isFinal) finalRef.current = `${finalRef.current} ${piece}`.trim();
        else interim += piece;
      }
      const spoken = `${finalRef.current} ${interim}`.trim();
      const base = baseRef.current;
      onChange(base && spoken ? `${base} ${spoken}` : base || spoken);
    };
    rec.onerror = (ev) => {
      setHint(ev.error === "not-allowed" || ev.error === "service-not-allowed" ? "voiceDenied" : "voiceFailed");
      setListening(false);
    };
    rec.onend = () => {
      if (recRef.current === rec) setListening(false);
    };
    recRef.current = rec;
    try {
      rec.start();
      setListening(true);
    } catch {
      setHint("voiceFailed");
      setListening(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        variant={listening ? "primary" : "ghost"}
        aria-pressed={listening}
        onClick={() => (listening ? stop() : start())}
      >
        <Mic className="size-4" strokeWidth={1.75} />
        {listening ? t(lang, "voiceStop") : t(lang, "voice")}
      </Button>
      {hint && (
        <p className="text-xs leading-relaxed text-subtle" aria-live="polite">
          {t(lang, hint)}
        </p>
      )}
    </div>
  );
}
