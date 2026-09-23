import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LocalReading, Mood, SceneChoices } from "@/lib/interpret";

export type DreamEntry = {
  id: string;
  text: string;
  mood: Mood;
  date: string;
  createdAt: number;
  reading?: LocalReading;
  choices?: SceneChoices;
  aiConclusion?: string;
  aiCounsel?: string[];
};

type JournalState = {
  dreams: DreamEntry[];
  add: (entry: Omit<DreamEntry, "id" | "createdAt">) => string;
  update: (id: string, patch: Partial<DreamEntry>) => void;
  remove: (id: string) => void;
};

export const useJournal = create<JournalState>()(
  persist(
    (set, get) => ({
      dreams: [],
      add: (entry) => {
        const id = crypto.randomUUID();
        const next: DreamEntry = { ...entry, id, createdAt: Date.now() };
        set({ dreams: [next, ...get().dreams] });
        return id;
      },
      update: (id, patch) =>
        set({
          dreams: get().dreams.map((d) => (d.id === id ? { ...d, ...patch } : d)),
        }),
      remove: (id) => set({ dreams: get().dreams.filter((d) => d.id !== id) }),
    }),
    { name: "roya-journal-v1" },
  ),
);
