import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const webpush = require("web-push") as {
  setVapidDetails: (subject: string, publicKey: string, privateKey: string) => void;
  generateVAPIDKeys: () => { publicKey: string; privateKey: string };
  sendNotification: (
    sub: { endpoint: string; keys: { p256dh: string; auth: string } },
    payload: string,
  ) => Promise<unknown>;
};

export type PushSub = {
  endpoint: string;
  keys: { p256dh: string; auth: string };
};

const dir = join(process.cwd(), "data");
const vapidPath = join(dir, "vapid.json");
const subsPath = join(dir, "push-subscriptions.json");

type Vapid = { publicKey: string; privateKey: string };

async function keys(): Promise<Vapid> {
  const fromEnv =
    process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY
      ? { publicKey: process.env.VAPID_PUBLIC_KEY, privateKey: process.env.VAPID_PRIVATE_KEY }
      : null;
  const pair = fromEnv ?? (await readOrCreate());
  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT || "mailto:roya@localhost",
    pair.publicKey,
    pair.privateKey,
  );
  return pair;
}

async function readOrCreate(): Promise<Vapid> {
  try {
    return JSON.parse(await readFile(vapidPath, "utf8")) as Vapid;
  } catch {
    const generated = webpush.generateVAPIDKeys();
    await mkdir(dir, { recursive: true });
    await writeFile(vapidPath, JSON.stringify(generated, null, 2), { mode: 0o600 });
    return generated;
  }
}

async function readSubs(): Promise<PushSub[]> {
  try {
    const list = JSON.parse(await readFile(subsPath, "utf8")) as PushSub[];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

async function writeSubs(list: PushSub[]) {
  await mkdir(dir, { recursive: true });
  await writeFile(subsPath, JSON.stringify(list, null, 2));
}

export async function publicKey(): Promise<{ ok: true; publicKey: string } | { ok: false; error: string }> {
  try {
    const pair = await keys();
    return { ok: true, publicKey: pair.publicKey };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "vapid" };
  }
}

export async function addSubscription(input: {
  endpoint: string;
  p256dh: string;
  auth: string;
}): Promise<{ ok: boolean; sent: boolean; error?: string }> {
  const sub: PushSub = {
    endpoint: input.endpoint,
    keys: { p256dh: input.p256dh, auth: input.auth },
  };
  try {
    const list = await readSubs();
    const next = list.filter((item) => item.endpoint !== sub.endpoint);
    next.push(sub);
    await writeSubs(next);
    await keys();
    await webpush.sendNotification(
      sub,
      JSON.stringify({
        title: "رؤیا",
        body: "اعلان روشن شد. یادآوری ثبت خواب از همین راه می‌رسد.",
        url: "/",
      }),
    );
    return { ok: true, sent: true };
  } catch (err) {
    return { ok: false, sent: false, error: err instanceof Error ? err.message : "push" };
  }
}

export async function broadcast(title: string, body: string): Promise<{ sent: number; failed: number }> {
  await keys();
  const list = await readSubs();
  const keep: PushSub[] = [];
  let sent = 0;
  let failed = 0;
  for (const sub of list) {
    try {
      await webpush.sendNotification(sub, JSON.stringify({ title, body, url: "/" }));
      keep.push(sub);
      sent += 1;
    } catch (err) {
      const status = (err as { statusCode?: number }).statusCode;
      failed += 1;
      if (status !== 404 && status !== 410) keep.push(sub);
    }
  }
  await writeSubs(keep);
  return { sent, failed };
}
