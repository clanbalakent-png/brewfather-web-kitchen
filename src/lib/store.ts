/** Browser-local persistence for recipes, batches and inventory, with cross-component sync. */
import { useCallback, useEffect, useState } from "react";
import { defaultEquipment, type Batch, type InventoryItem, type Recipe } from "./recipe-calc";

const KEYS = { recipes: "brewfather-recipes", batches: "brewfather-batches", inventory: "brewfather-inventory" } as const;
type Key = keyof typeof KEYS;
const EVENT = "brewfather-store";

export const uid = () => (typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2));

const now = new Date().toISOString();
const seedRecipe: Recipe = {
  id: "seed-apa", name: "APA da Casa", styleCode: "18B", author: "", notes: "Receita de exemplo. Edite ou exclua à vontade.",
  equipment: { ...defaultEquipment }, mashSteps: [{ name: "Sacarificação", tempC: 66, minutes: 60 }, { name: "Mash-out", tempC: 76, minutes: 10 }],
  fermentationTempC: 19, fermentationDays: 14,
  fermentables: [
    { id: "f1", name: "Pale Ale", kg: 4.2, potential: 1.037, color: 3, type: "grao", price: 20 },
    { id: "f2", name: "Caramelo 40L", kg: 0.3, potential: 1.034, color: 40, type: "grao", price: 26 },
  ],
  hops: [
    { id: "h1", name: "Magnum", grams: 15, alpha: 13, minutes: 60, use: "fervura", price: 220 },
    { id: "h2", name: "Cascade", grams: 30, alpha: 6, minutes: 10, use: "fervura", price: 250 },
    { id: "h3", name: "Cascade", grams: 50, alpha: 6, minutes: 0, use: "dryhop", price: 250, dryHopDay: 7 },
  ],
  yeasts: [{ id: "y1", name: "SafAle US-05", attenuation: 81, packs: 1, price: 35 }],
  miscs: [{ id: "m1", name: "Whirlfloc", amount: 1, unit: "un", use: "Fervura", price: 2 }],
  createdAt: now, updatedAt: now,
};
const seedInventory: InventoryItem[] = [
  { id: "i1", kind: "fermentavel", name: "Pale Ale", amount: 10, unit: "kg", price: 20, minAmount: 5, potential: 1.037, color: 3 },
  { id: "i2", kind: "fermentavel", name: "Caramelo 40L", amount: 0.2, unit: "kg", price: 26, minAmount: 0.5, potential: 1.034, color: 40 },
  { id: "i3", kind: "lupulo", name: "Cascade", amount: 100, unit: "g", price: 0.25, minAmount: 50, alpha: 6 },
  { id: "i4", kind: "lupulo", name: "Magnum", amount: 50, unit: "g", price: 0.22, minAmount: 20, alpha: 13 },
  { id: "i5", kind: "levedura", name: "SafAle US-05", amount: 2, unit: "pacote", price: 35, minAmount: 1, attenuation: 81 },
];
const seeds: Record<Key, unknown[]> = { recipes: [seedRecipe], batches: [], inventory: seedInventory };

export function read<T>(key: Key): T[] {
  const raw = localStorage.getItem(KEYS[key]);
  if (raw === null) return seeds[key] as T[];
  try { return JSON.parse(raw) as T[]; } catch { return []; }
}
export function write<T>(key: Key, value: T[]) {
  localStorage.setItem(KEYS[key], JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(EVENT, { detail: key }));
}

function useCollection<T>(key: Key) {
  const [items, setItems] = useState<T[]>(() => read<T>(key));
  useEffect(() => {
    const sync = () => setItems(read<T>(key));
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener(EVENT, sync); window.removeEventListener("storage", sync); };
  }, [key]);
  const save = useCallback((next: T[]) => write(key, next), [key]);
  return [items, save] as const;
}

export const useRecipes = () => useCollection<Recipe>("recipes");
export const useBatches = () => useCollection<Batch>("batches");
export const useInventory = () => useCollection<InventoryItem>("inventory");

export interface SavedProfile { id: string; name: string; descricao?: string; values: Record<string, string> }
export function readProfiles(slug: "equipamento" | "mostura" | "fermentacao" | "agua" | "estilos"): SavedProfile[] {
  try { return JSON.parse(localStorage.getItem(`brewfather-profiles-${slug}`) || "[]"); } catch { return []; }
}

export const fmt = (v: number, d = 1) => v.toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d });
export const money = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
