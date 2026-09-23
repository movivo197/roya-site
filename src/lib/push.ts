import { createServerFn } from "@tanstack/react-start";

export const pushPublicKey = createServerFn({ method: "GET" }).handler(async () => {
  const { publicKey } = await import("./push-store.server");
  return publicKey();
});

export const pushSubscribe = createServerFn({ method: "POST" })
  .validator((input: { endpoint: string; p256dh: string; auth: string }) => {
    if (!input || typeof input.endpoint !== "string" || input.endpoint.length < 10) {
      throw new Error("bad subscription");
    }
    if (typeof input.p256dh !== "string" || typeof input.auth !== "string") {
      throw new Error("bad subscription");
    }
    return input;
  })
  .handler(async ({ data }) => {
    const { addSubscription } = await import("./push-store.server");
    return addSubscription(data);
  });
