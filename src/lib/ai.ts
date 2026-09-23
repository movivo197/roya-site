import { createServerFn } from "@tanstack/react-start";

type AiInput = {
  dream: string;
  mood: string;
  lang: "fa" | "en";
  matched: { title: string; conclusion: string; counsel: string }[];
};

export type AiResult =
  | { ok: true; conclusion: string; counsel: string[]; note: string }
  | { ok: false; error: string };

export const interpretWithGrok = createServerFn({ method: "POST" })
  .validator((input: AiInput) => input)
  .handler(async ({ data }): Promise<AiResult> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false, error: "AI is not available" };

    const catalog = data.matched
      .slice(0, 6)
      .map((m) => `- ${m.title}: ${m.conclusion}`)
      .join("\n");

    const langName = data.lang === "en" ? "English" : "Persian";
    const fallbackNote =
      data.lang === "en"
        ? "This is not a certain ruling; the dreamer’s life context matters."
        : "تعبیر قطعی نیست؛ بافت زندگی بیننده مهم است.";

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 700,
        temperature: 0.4,
        messages: [
          {
            role: "system",
            content: `You are a careful dream reader. Combine Islamic tradition (three kinds of dreams), Talmud, Veda, Buddhist dream yoga, Zhou Gong, Egypt, Greece, Scripture, Norse/Celtic, Maya/Aztec, Yoruba, shamanic lore, Jung, Freud, and sleep science. Do not claim divine certainty. Do not give medical or legal rulings. Reply with valid JSON only: conclusion (one paragraph in ${langName}), counsel (array of 3 short practical advices in ${langName}), note (one sentence on uncertainty in ${langName}).`,
          },
          {
            role: "user",
            content: `Mood: ${data.mood}\nDream:\n${data.dream}\n\nMatched atlas symbols:\n${catalog || "(none)"}`,
          },
        ],
      }),
    });

    if (!res.ok) return { ok: false, error: `xAI API error ${res.status}` };

    const body = (await res.json()) as {
      choices: { message: { content: string } }[];
    };
    const raw = body.choices[0]?.message.content ?? "";
    const jsonText = raw.replace(/```json|```/g, "").trim();
    try {
      const parsed = JSON.parse(jsonText) as {
        conclusion?: string;
        counsel?: string[];
        note?: string;
      };
      return {
        ok: true,
        conclusion: parsed.conclusion?.trim() || raw,
        counsel: Array.isArray(parsed.counsel) ? parsed.counsel.slice(0, 4) : [],
        note: parsed.note?.trim() || fallbackNote,
      };
    } catch {
      return {
        ok: true,
        conclusion: raw,
        counsel: [],
        note: fallbackNote,
      };
    }
  });
