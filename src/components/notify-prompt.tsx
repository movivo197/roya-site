import { useEffect, useState } from "react";
import { pushPublicKey, pushSubscribe } from "@/lib/push";
import { usePrefs } from "@/lib/prefs";

const LATER = "roya-notify-later";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; ++i) out[i] = raw.charCodeAt(i);
  return out;
}

function iosNeedsInstall() {
  const ua = navigator.userAgent;
  const ios = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const standalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator && Boolean((navigator as { standalone?: boolean }).standalone));
  return ios && !standalone;
}

export function NotifyPrompt() {
  const lang = usePrefs((s) => s.lang);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const fa = lang === "fa";

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    if (!("Notification" in window)) return;
    if (Notification.permission === "granted" || Notification.permission === "denied") return;
    if (sessionStorage.getItem(LATER) === "1") return;
    setOpen(true);
  }, []);

  async function enable() {
    if (iosNeedsInstall()) {
      setNote(
        fa
          ? "در آیفون اول رؤیا را به صفحهٔ خانه اضافه کنید، بعد از همان آیکون بازش کنید و دوباره این دکمه را بزنید."
          : "On iPhone, add Roya to the Home Screen, open it from that icon, then press this again.",
      );
      return;
    }
    setBusy(true);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setNote(fa ? "مرورگر اجازه نداد. از قفلِ کنارِ نشانی سایت می‌توانید بعداً بازش کنید." : "The browser refused. You can allow it later from the site lock icon.");
        setOpen(false);
        return;
      }
      const reg = await navigator.serviceWorker.register("/sw.js");
      await navigator.serviceWorker.ready;
      try {
        const key = await pushPublicKey();
        if (key.ok && reg.pushManager) {
          const sub = await reg.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(key.publicKey),
          });
          const json = sub.toJSON();
          if (json.endpoint && json.keys?.p256dh && json.keys.auth) {
            await pushSubscribe({
              data: { endpoint: json.endpoint, p256dh: json.keys.p256dh, auth: json.keys.auth },
            });
          }
        }
      } catch {
        /* local permission still stands if the server cannot store the subscription */
      }
      new Notification(fa ? "رؤیا" : "Roya", {
        body: fa ? "اعلان روشن شد." : "Notifications are on.",
        icon: "/favicon.svg",
      });
      setOpen(false);
      setNote(fa ? "روشن شد. اگر پنجره باز بماند، اعلان آزمایشی را می‌بینید." : "On. If this window stays open, you will see a test notification.");
    } catch {
      setNote(fa ? "ثبت اعلان ممکن نشد. صفحه را تازه کنید و دوباره بزنید." : "Could not enable notifications. Refresh and try again.");
    } finally {
      setBusy(false);
    }
  }

  function later() {
    sessionStorage.setItem(LATER, "1");
    setOpen(false);
  }

  if (!open && !note) return null;

  return (
    <section className="mb-5 rounded-lg border border-border bg-surface px-4 py-3">
      {open ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium">{fa ? "اعلان رؤیا" : "Roya notifications"}</p>
            <p className="text-xs text-muted">
              {fa
                ? "اگر اجازه بدهید، یادآوری ثبت خواب برای همین دستگاه فرستاده می‌شود."
                : "If you allow it, dream reminders are sent to this device."}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className="h-11 rounded-md bg-accent px-4 text-sm text-accent-fg disabled:opacity-60"
              onClick={enable}
              disabled={busy}
            >
              {busy ? (fa ? "…" : "…") : fa ? "روشن کردن اعلان" : "Turn on"}
            </button>
            <button type="button" className="h-11 rounded-md border border-border px-4 text-sm" onClick={later}>
              {fa ? "بعداً" : "Later"}
            </button>
          </div>
        </div>
      ) : null}
      {note ? <p className="text-xs text-muted">{note}</p> : null}
    </section>
  );
}
