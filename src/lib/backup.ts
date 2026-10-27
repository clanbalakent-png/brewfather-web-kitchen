import { read } from "./store";
import { readSettings, saveSettings } from "./settings";
import { normalizeSettings } from "./settings-model";

export const storageKeys: Record<string, string> = {
  receitas: "brewfather-recipes", lotes: "brewfather-batches", inventário: "brewfather-inventory",
  "perfil-equipamento": "brewfather-profiles-equipamento", "perfil-mostura": "brewfather-profiles-mostura",
  "perfil-fermentacao": "brewfather-profiles-fermentacao", "perfil-agua": "brewfather-profiles-agua", "perfil-estilos": "brewfather-profiles-estilos",
};
export type BackupData = Record<string, unknown[]>;
export function readBackupData(): BackupData {
  return Object.fromEntries(Object.entries(storageKeys).map(([name, key]) => {
    if (name === "receitas") return [name, read("recipes")];
    if (name === "lotes") return [name, read("batches")];
    if (name === "inventário") return [name, read("inventory")];
    try { const value = JSON.parse(localStorage.getItem(key) || "[]"); return [name, Array.isArray(value) ? value : []]; } catch { return [name, []]; }
  }));
}
export const makeBackup = () => ({ app: "brewfather-web", version: 2, exportedAt: new Date().toISOString(), data: readBackupData(), settings: readSettings() });
export type BackupPayload = ReturnType<typeof makeBackup>;
const HISTORY = "brewfather-backup-history";
export function readHistory(): { id: string; label: string; payload: BackupPayload }[] {
  try { const value = JSON.parse(localStorage.getItem(HISTORY) || "[]"); return Array.isArray(value) ? value : []; } catch { return []; }
}
export function snapshot(label: string) {
  const history = [{ id: crypto.randomUUID(), label, payload: makeBackup() }, ...readHistory()].slice(0, 5);
  localStorage.setItem(HISTORY, JSON.stringify(history));
}
export function restoreBackup(value: unknown): number {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Backup inválido");
  const input = value as Record<string, unknown>;
  const data = (input.data ?? input) as Record<string, unknown>;
  if (!data || typeof data !== "object" || Array.isArray(data)) throw new Error("Backup inválido");
  const entries = Object.entries(storageKeys).filter(([name]) => Array.isArray(data[name]));
  if (!entries.length) throw new Error("Backup inválido");
  for (const [name] of entries) {
    const list = data[name] as unknown[];
    if (list.some(item => !item || typeof item !== "object" || Array.isArray(item))) throw new Error("Backup inválido");
  }
  snapshot("Antes da restauração");
  for (const [name, key] of entries) localStorage.setItem(key, JSON.stringify(data[name]));
  if (input.settings) saveSettings(normalizeSettings(input.settings));
  window.dispatchEvent(new CustomEvent("brewfather-store"));
  return entries.length;
}
export function clearData() {
  snapshot("Antes de apagar os dados");
  for (const key of Object.values(storageKeys)) localStorage.setItem(key, "[]");
  window.dispatchEvent(new CustomEvent("brewfather-store"));
}