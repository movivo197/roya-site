import { readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { join } from "node:path";

const require = createRequire(import.meta.url);
const webpush = require("web-push");

const title = process.argv[2] || "رؤیا";
const body = process.argv[3] || "اگر خوابی مانده، همین حالا بنویسید.";
const dir = join(process.cwd(), "data");

const keys = JSON.parse(await readFile(join(dir, "vapid.json"), "utf8"));
webpush.setVapidDetails(process.env.VAPID_SUBJECT || "mailto:roya@localhost", keys.publicKey, keys.privateKey);

const subs = JSON.parse(await readFile(join(dir, "push-subscriptions.json"), "utf8"));
const keep = [];
let sent = 0;
let failed = 0;
for (const sub of subs) {
  try {
    await webpush.sendNotification(sub, JSON.stringify({ title, body, url: "/" }));
    keep.push(sub);
    sent += 1;
  } catch (err) {
    failed += 1;
    if (err?.statusCode !== 404 && err?.statusCode !== 410) keep.push(sub);
  }
}
await writeFile(join(dir, "push-subscriptions.json"), JSON.stringify(keep, null, 2));
console.log(`sent ${sent}, failed ${failed}, kept ${keep.length}`);
