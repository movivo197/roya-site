import { CORE_EN, CORE_RAW } from "./symbols-core";
import { PLUS2_EN, PLUS2_RAW } from "./symbols-plus2";
import { PLUS3_EN, PLUS3_RAW } from "./symbols-plus3";
import { PLUS4_EN, PLUS4_RAW } from "./symbols-plus4";
import { PLUS5_EN, PLUS5_RAW } from "./symbols-plus5";
import { PLUS6_EN, PLUS6_RAW } from "./symbols-plus6";
import { PLUS7_EN, PLUS7_RAW } from "./symbols-plus7";
import { PLUS8_EN, PLUS8_RAW } from "./symbols-plus8";
import { PLUS9_EN, PLUS9_RAW } from "./symbols-plus9";
import { PLUS10_BARE, PLUS10_EN, PLUS10_RAW } from "./symbols-plus10";
import { PLUS11_BARE, PLUS11_EN, PLUS11_RAW } from "./symbols-plus11";
import { PLUS12_BARE, PLUS12_EN, PLUS12_RAW } from "./symbols-plus12";
import { PLUS13_BARE, PLUS13_EN, PLUS13_RAW } from "./symbols-plus13";
import { PLUS14_BARE, PLUS14_EN, PLUS14_RAW } from "./symbols-plus14";
import { PLUS15_BARE, PLUS15_EN, PLUS15_RAW } from "./symbols-plus15";
import { PLUS16_BARE, PLUS16_EN, PLUS16_RAW } from "./symbols-plus16";
import { PLUS17_BARE, PLUS17_EN, PLUS17_RAW } from "./symbols-plus17";
import { PLUS18_BARE, PLUS18_EN, PLUS18_RAW } from "./symbols-plus18";
import { PLUS19_BARE, PLUS19_EN, PLUS19_RAW } from "./symbols-plus19";
import { PLUS20_BARE, PLUS20_EN, PLUS20_RAW } from "./symbols-plus20";
import { PLUS21_BARE, PLUS21_EN, PLUS21_RAW } from "./symbols-plus21";
import { PLUS22_BARE, PLUS22_EN, PLUS22_RAW } from "./symbols-plus22";
import { PLUS23_BARE, PLUS23_EN, PLUS23_RAW } from "./symbols-plus23";
import { PLUS24_BARE, PLUS24_EN, PLUS24_RAW } from "./symbols-plus24";
import { PLUS25_BARE, PLUS25_EN, PLUS25_RAW } from "./symbols-plus25";
import { PLUS26_BARE, PLUS26_EN, PLUS26_RAW } from "./symbols-plus26";
import { PLUS27_BARE, PLUS27_EN, PLUS27_RAW } from "./symbols-plus27";
import { PLUS_EN, PLUS_RAW } from "./symbols-plus";
import { ENRICH, ENRICH_EN } from "./source-enrich";
import { fillFor } from "./motif-fill";
import {
  KEY_PATCH,
  KEY_PATCH_EN,
  MORE_EN,
  MORE_RAW,
  SOURCE_PATCH,
  SOURCE_PATCH_EN,
} from "./symbols-more";
import type { SymbolEntry } from "./meta";



export {
  ALL_SOURCE_KEYS,
  CATEGORIES,
  SOURCE_LABELS,
  SOURCE_ORDER,
  type RawSymbol,
  type SourceKey,
  type SymbolEntry,
} from "./meta";

export const SYMBOLS: SymbolEntry[] = [
  ...CORE_RAW,
  ...MORE_RAW,
  ...PLUS_RAW,
  ...PLUS2_RAW,
  ...PLUS3_RAW,
  ...PLUS4_RAW,
  ...PLUS5_RAW,
  ...PLUS6_RAW,
  ...PLUS7_RAW,
  ...PLUS8_RAW,
  ...PLUS9_RAW,
  ...PLUS10_RAW,
  ...PLUS11_RAW,
  ...PLUS12_RAW,
  ...PLUS13_RAW,
  ...PLUS14_RAW,
  ...PLUS15_RAW,
  ...PLUS16_RAW,
  ...PLUS17_RAW,
  ...PLUS18_RAW,
  ...PLUS19_RAW,
  ...PLUS20_RAW,
  ...PLUS21_RAW,
  ...PLUS22_RAW,
  ...PLUS23_RAW,
  ...PLUS24_RAW,
  ...PLUS25_RAW,
  ...PLUS26_RAW,
  ...PLUS27_RAW,
].map((s) => {
  const en = {
    ...CORE_EN[s.id],
    ...MORE_EN[s.id],
    ...PLUS_EN[s.id],
    ...PLUS2_EN[s.id],
    ...PLUS3_EN[s.id],
    ...PLUS4_EN[s.id],
    ...PLUS5_EN[s.id],
    ...PLUS6_EN[s.id],
    ...PLUS7_EN[s.id],
    ...PLUS8_EN[s.id],
    ...PLUS9_EN[s.id],
    ...PLUS10_EN[s.id],
    ...PLUS11_EN[s.id],
    ...PLUS12_EN[s.id],
    ...PLUS13_EN[s.id],
    ...PLUS14_EN[s.id],
    ...PLUS15_EN[s.id],
    ...PLUS16_EN[s.id],
    ...PLUS17_EN[s.id],
    ...PLUS18_EN[s.id],
    ...PLUS19_EN[s.id],
    ...PLUS20_EN[s.id],
    ...PLUS21_EN[s.id],
    ...PLUS22_EN[s.id],
    ...PLUS23_EN[s.id],
    ...PLUS24_EN[s.id],
    ...PLUS25_EN[s.id],
    ...PLUS26_EN[s.id],
    ...PLUS27_EN[s.id],
  };
  const filled =
    PLUS10_BARE.has(s.id) || PLUS11_BARE.has(s.id) || PLUS12_BARE.has(s.id) || PLUS13_BARE.has(s.id) || PLUS14_BARE.has(s.id) || PLUS15_BARE.has(s.id) || PLUS16_BARE.has(s.id) || PLUS17_BARE.has(s.id) || PLUS18_BARE.has(s.id) || PLUS19_BARE.has(s.id) || PLUS20_BARE.has(s.id) || PLUS21_BARE.has(s.id) || PLUS22_BARE.has(s.id) || PLUS23_BARE.has(s.id) || PLUS24_BARE.has(s.id) || PLUS25_BARE.has(s.id) || PLUS26_BARE.has(s.id) || PLUS27_BARE.has(s.id)
    ? { fa: {}, en: {} }
    : fillFor(s.id, s.title, en.title ?? s.title, s.category);
  const sources = { ...filled.fa, ...s.sources, ...SOURCE_PATCH[s.id], ...ENRICH[s.id] };
  const sourcesEn = {
    ...filled.en,
    ...(en.sources ?? {}),
    ...SOURCE_PATCH_EN[s.id],
    ...ENRICH_EN[s.id],
  };
  return {
    ...s,
    keys: [...s.keys, ...(KEY_PATCH[s.id] ?? [])],
    titleEn: en.title ?? s.title,
    keysEn: [...(en.keys ?? []), ...(KEY_PATCH_EN[s.id] ?? [])],
    conclusionEn: en.conclusion ?? s.conclusion,
    counselEn: en.counsel ?? s.counsel,
    sources,
    sourcesEn,
  };
});
