// @ts-expect-error bun test runtime types are not installed
import { describe, expect, test } from "bun:test";
import { applySalts, deductInventory, finalGravity, originalGravity, recipeCost, shoppingList, styleCheck, volumes, type InventoryItem, type Recipe } from "./recipe-calc";

const eq = { batchL: 20, boilMinutes: 60, evaporationLh: 4, trubLossL: 1, fermenterLossL: 1, efficiency: 75 };
const recipe: Recipe = { id: "r", name: "T", styleCode: "18B", author: "", notes: "", equipment: eq, mashSteps: [], fermentationTempC: 19, fermentationDays: 14,
  fermentables: [{ id: "a", name: "Pale Ale", kg: 4, potential: 1.037, color: 3, type: "grao", price: 20 }],
  hops: [{ id: "h", name: "Cascade", grams: 50, alpha: 6, minutes: 60, use: "fervura", price: 250 }],
  yeasts: [{ id: "y", name: "US-05", attenuation: 80, packs: 1, price: 35 }], miscs: [], createdAt: "", updatedAt: "" };

describe("recipe", () => {
  test("volumes add trub and evaporation", () => { const v = volumes(eq); expect(v.postBoil).toBe(21); expect(v.preBoil).toBe(25); expect(v.packaged).toBe(19); });
  test("OG from 4 kg at 75% in 21 L", () => expect(originalGravity(recipe.fermentables, eq)).toBeCloseTo(1 + 37 * 4 * 0.75 / 21 / 1000, 5));
  test("FG uses yeast attenuation", () => expect(finalGravity(1.05, recipe.yeasts)).toBeCloseTo(1.01, 5));
  test("cost sums ingredients", () => expect(recipeCost(recipe).total).toBeCloseTo(80 + 12.5 + 35, 5));
  test("style check flags out-of-range", () => expect(styleCheck({ og: 1.04, fg: 1.012, ibu: 40, srm: 7, abv: 5 }, { code: "x", name: "x", og: [1.045, 1.06], fg: [1.01, 1.015], ibu: [30, 50], srm: [5, 10], abv: [4.5, 6.2] }).og).toBe("baixo"));
});
describe("inventory", () => {
  const inv: InventoryItem[] = [{ id: "1", kind: "fermentavel", name: "Pale Ale", amount: 3, unit: "kg", price: 20, minAmount: 0 }, { id: "2", kind: "lupulo", name: "cascade", amount: 100, unit: "g", price: 0.25, minAmount: 0 }];
  test("shopping list reports missing", () => { const s = shoppingList(recipe, inv); expect(s.find(x => x.name === "Pale Ale")!.missing).toBe(1); expect(s.find(x => x.name === "US-05")!.missing).toBe(1); });
  test("deduct never below zero", () => { const d = deductInventory(recipe, inv); expect(d[0].amount).toBe(0); expect(d[1].amount).toBe(50); });
});
test("1 g gypsum in 10 L adds 23 ppm Ca", () => expect(applySalts({ ca: 0, mg: 0, na: 0, so4: 0, cl: 0, hco3: 0 }, { gypsum: 1 }, 10).ca).toBeCloseTo(23.28, 2));
