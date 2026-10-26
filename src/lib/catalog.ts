/** Built-in ingredient catalog and BJCP 2021 style guidelines (subset). */
export type FermentableType = "grao" | "extrato" | "acucar" | "adjunto";
export interface CatalogFermentable { name: string; type: FermentableType; potential: number; color: number; price: number }
export interface CatalogHop { name: string; alpha: number; origin: string; price: number }
export interface CatalogYeast { name: string; lab: string; attenuation: number; tempMin: number; tempMax: number; price: number }
export interface CatalogMisc { name: string; use: string; price: number }

// potential = SG of 1 lb in 1 US gal at 100% efficiency (PPG as SG); color in °L; price in R$/kg
export const fermentables: CatalogFermentable[] = [
  { name: "Pilsen", type: "grao", potential: 1.037, color: 1.8, price: 18 },
  { name: "Pale Ale", type: "grao", potential: 1.037, color: 3, price: 20 },
  { name: "Maris Otter", type: "grao", potential: 1.038, color: 3.5, price: 28 },
  { name: "Viena", type: "grao", potential: 1.036, color: 4, price: 22 },
  { name: "Munique", type: "grao", potential: 1.037, color: 9, price: 22 },
  { name: "Trigo Malteado", type: "grao", potential: 1.038, color: 2, price: 22 },
  { name: "Centeio Malteado", type: "grao", potential: 1.029, color: 3.5, price: 26 },
  { name: "Aveia em Flocos", type: "adjunto", potential: 1.033, color: 1, price: 16 },
  { name: "Carapils / Carafoam", type: "grao", potential: 1.033, color: 2, price: 26 },
  { name: "Caramelo 20L", type: "grao", potential: 1.035, color: 20, price: 26 },
  { name: "Caramelo 40L", type: "grao", potential: 1.034, color: 40, price: 26 },
  { name: "Caramelo 60L", type: "grao", potential: 1.034, color: 60, price: 26 },
  { name: "Caramelo 120L", type: "grao", potential: 1.033, color: 120, price: 27 },
  { name: "Biscuit", type: "grao", potential: 1.035, color: 25, price: 28 },
  { name: "Melanoidina", type: "grao", potential: 1.037, color: 28, price: 28 },
  { name: "Acidulado", type: "grao", potential: 1.027, color: 2, price: 30 },
  { name: "Chocolate", type: "grao", potential: 1.034, color: 350, price: 30 },
  { name: "Cevada Torrada", type: "grao", potential: 1.025, color: 300, price: 30 },
  { name: "Black Malt", type: "grao", potential: 1.025, color: 500, price: 30 },
  { name: "Carafa III Special", type: "grao", potential: 1.032, color: 470, price: 34 },
  { name: "Extrato de Malte Seco (DME)", type: "extrato", potential: 1.044, color: 4, price: 60 },
  { name: "Extrato de Malte Líquido (LME)", type: "extrato", potential: 1.036, color: 4, price: 45 },
  { name: "Açúcar Cristal", type: "acucar", potential: 1.046, color: 0, price: 6 },
  { name: "Açúcar Candi Escuro", type: "acucar", potential: 1.036, color: 80, price: 50 },
  { name: "Mel", type: "acucar", potential: 1.035, color: 2, price: 40 },
  { name: "Arroz em Flocos", type: "adjunto", potential: 1.032, color: 1, price: 14 },
  { name: "Milho em Flocos", type: "adjunto", potential: 1.037, color: 1, price: 14 },
];

// price in R$/kg
export const hops: CatalogHop[] = [
  { name: "Cascade", alpha: 6, origin: "EUA", price: 250 },
  { name: "Centennial", alpha: 10, origin: "EUA", price: 280 },
  { name: "Chinook", alpha: 13, origin: "EUA", price: 280 },
  { name: "Citra", alpha: 12.5, origin: "EUA", price: 450 },
  { name: "Mosaic", alpha: 12, origin: "EUA", price: 450 },
  { name: "Simcoe", alpha: 13, origin: "EUA", price: 420 },
  { name: "Amarillo", alpha: 9, origin: "EUA", price: 380 },
  { name: "Columbus (CTZ)", alpha: 15, origin: "EUA", price: 260 },
  { name: "Magnum", alpha: 13, origin: "Alemanha", price: 220 },
  { name: "Hallertau Mittelfrüh", alpha: 4, origin: "Alemanha", price: 300 },
  { name: "Hallertau Blanc", alpha: 9, origin: "Alemanha", price: 380 },
  { name: "Tettnang", alpha: 4.5, origin: "Alemanha", price: 300 },
  { name: "Perle", alpha: 8, origin: "Alemanha", price: 260 },
  { name: "Saaz", alpha: 3.5, origin: "Rep. Tcheca", price: 300 },
  { name: "East Kent Goldings", alpha: 5, origin: "Reino Unido", price: 320 },
  { name: "Fuggle", alpha: 4.5, origin: "Reino Unido", price: 300 },
  { name: "Galaxy", alpha: 14, origin: "Austrália", price: 520 },
  { name: "Nelson Sauvin", alpha: 12, origin: "Nova Zelândia", price: 550 },
  { name: "Motueka", alpha: 7, origin: "Nova Zelândia", price: 480 },
  { name: "Sabro", alpha: 14, origin: "EUA", price: 480 },
  { name: "El Dorado", alpha: 15, origin: "EUA", price: 420 },
  { name: "Mandarina Bavaria", alpha: 8.5, origin: "Alemanha", price: 360 },
];

// price in R$ per pack
export const yeasts: CatalogYeast[] = [
  { name: "SafAle US-05", lab: "Fermentis", attenuation: 81, tempMin: 15, tempMax: 24, price: 35 },
  { name: "SafAle S-04", lab: "Fermentis", attenuation: 75, tempMin: 15, tempMax: 20, price: 35 },
  { name: "SafAle WB-06", lab: "Fermentis", attenuation: 86, tempMin: 18, tempMax: 24, price: 35 },
  { name: "SafAle BE-256", lab: "Fermentis", attenuation: 84, tempMin: 15, tempMax: 25, price: 38 },
  { name: "SafAle T-58", lab: "Fermentis", attenuation: 74, tempMin: 15, tempMax: 24, price: 35 },
  { name: "SafLager W-34/70", lab: "Fermentis", attenuation: 83, tempMin: 9, tempMax: 15, price: 40 },
  { name: "SafLager S-23", lab: "Fermentis", attenuation: 82, tempMin: 9, tempMax: 15, price: 40 },
  { name: "Nottingham", lab: "Lallemand", attenuation: 80, tempMin: 10, tempMax: 22, price: 36 },
  { name: "Verdant IPA", lab: "Lallemand", attenuation: 77, tempMin: 18, tempMax: 23, price: 42 },
  { name: "Voss Kveik", lab: "Lallemand", attenuation: 79, tempMin: 25, tempMax: 40, price: 42 },
  { name: "Belle Saison", lab: "Lallemand", attenuation: 90, tempMin: 15, tempMax: 35, price: 40 },
  { name: "Novalager", lab: "Lallemand", attenuation: 80, tempMin: 10, tempMax: 20, price: 42 },
  { name: "WLP001 California Ale", lab: "White Labs", attenuation: 77, tempMin: 18, tempMax: 23, price: 60 },
  { name: "WY1968 London ESB", lab: "Wyeast", attenuation: 69, tempMin: 18, tempMax: 22, price: 60 },
];

export const miscs: CatalogMisc[] = [
  { name: "Whirlfloc", use: "Fervura", price: 2 },
  { name: "Musgo Irlandês", use: "Fervura", price: 1 },
  { name: "Nutriente de Levedura", use: "Fervura", price: 3 },
  { name: "Gipsita (CaSO₄)", use: "Mostura", price: 0.1 },
  { name: "Cloreto de Cálcio (CaCl₂)", use: "Mostura", price: 0.1 },
  { name: "Ácido Lático 85%", use: "Mostura", price: 0.5 },
  { name: "Casca de Laranja", use: "Fervura", price: 0.2 },
  { name: "Semente de Coentro", use: "Fervura", price: 0.2 },
];

export interface BjcpStyle { code: string; name: string; og: [number, number]; fg: [number, number]; ibu: [number, number]; srm: [number, number]; abv: [number, number] }
export const bjcpStyles: BjcpStyle[] = [
  { code: "1A", name: "American Light Lager", og: [1.028, 1.04], fg: [0.998, 1.008], ibu: [8, 12], srm: [2, 3], abv: [2.8, 4.2] },
  { code: "1B", name: "American Lager", og: [1.04, 1.05], fg: [1.004, 1.01], ibu: [8, 18], srm: [2, 3.5], abv: [4.2, 5.3] },
  { code: "1D", name: "American Wheat Beer", og: [1.04, 1.055], fg: [1.008, 1.013], ibu: [15, 30], srm: [3, 6], abv: [4, 5.5] },
  { code: "3B", name: "Czech Premium Pale Lager", og: [1.044, 1.06], fg: [1.013, 1.017], ibu: [30, 45], srm: [3.5, 6], abv: [4.2, 5.8] },
  { code: "4A", name: "Munich Helles", og: [1.044, 1.048], fg: [1.006, 1.012], ibu: [16, 22], srm: [3, 5], abv: [4.7, 5.4] },
  { code: "5D", name: "German Pils", og: [1.044, 1.05], fg: [1.008, 1.013], ibu: [22, 40], srm: [2, 4], abv: [4.4, 5.2] },
  { code: "6A", name: "Märzen", og: [1.054, 1.06], fg: [1.01, 1.014], ibu: [18, 24], srm: [8, 17], abv: [5.6, 6.3] },
  { code: "8B", name: "Schwarzbier", og: [1.046, 1.052], fg: [1.01, 1.016], ibu: [20, 35], srm: [19, 30], abv: [4.4, 5.4] },
  { code: "9A", name: "Doppelbock", og: [1.072, 1.112], fg: [1.016, 1.024], ibu: [16, 26], srm: [6, 25], abv: [7, 10] },
  { code: "10A", name: "Weissbier", og: [1.044, 1.053], fg: [1.008, 1.014], ibu: [8, 15], srm: [2, 6], abv: [4.3, 5.6] },
  { code: "11B", name: "Best Bitter", og: [1.04, 1.048], fg: [1.008, 1.012], ibu: [25, 40], srm: [8, 16], abv: [3.8, 4.6] },
  { code: "13C", name: "English Porter", og: [1.04, 1.052], fg: [1.008, 1.014], ibu: [18, 35], srm: [20, 30], abv: [4, 5.4] },
  { code: "15B", name: "Irish Stout", og: [1.036, 1.044], fg: [1.007, 1.011], ibu: [25, 45], srm: [25, 40], abv: [3.8, 5] },
  { code: "16A", name: "Sweet Stout", og: [1.044, 1.06], fg: [1.012, 1.024], ibu: [20, 40], srm: [30, 40], abv: [4, 6] },
  { code: "17C", name: "Wee Heavy", og: [1.07, 1.13], fg: [1.018, 1.04], ibu: [17, 35], srm: [14, 25], abv: [6.5, 10] },
  { code: "18B", name: "American Pale Ale", og: [1.045, 1.06], fg: [1.01, 1.015], ibu: [30, 50], srm: [5, 10], abv: [4.5, 6.2] },
  { code: "19A", name: "American Amber Ale", og: [1.045, 1.06], fg: [1.01, 1.015], ibu: [25, 40], srm: [10, 17], abv: [4.5, 6.2] },
  { code: "19C", name: "American Brown Ale", og: [1.045, 1.06], fg: [1.01, 1.016], ibu: [20, 30], srm: [18, 35], abv: [4.3, 6.2] },
  { code: "20A", name: "American Porter", og: [1.05, 1.07], fg: [1.012, 1.018], ibu: [25, 50], srm: [22, 40], abv: [4.8, 6.5] },
  { code: "20B", name: "American Stout", og: [1.05, 1.075], fg: [1.01, 1.022], ibu: [35, 75], srm: [30, 40], abv: [5, 7] },
  { code: "20C", name: "Imperial Stout", og: [1.075, 1.115], fg: [1.018, 1.03], ibu: [50, 90], srm: [30, 40], abv: [8, 12] },
  { code: "21A", name: "American IPA", og: [1.056, 1.07], fg: [1.008, 1.014], ibu: [40, 70], srm: [6, 14], abv: [5.5, 7.5] },
  { code: "21B", name: "Hazy IPA", og: [1.06, 1.085], fg: [1.01, 1.015], ibu: [25, 60], srm: [3, 7], abv: [6, 9] },
  { code: "22A", name: "Double IPA", og: [1.065, 1.085], fg: [1.008, 1.018], ibu: [60, 100], srm: [6, 14], abv: [7.5, 10] },
  { code: "24A", name: "Witbier", og: [1.044, 1.052], fg: [1.008, 1.012], ibu: [8, 20], srm: [2, 4], abv: [4.5, 5.5] },
  { code: "25B", name: "Saison", og: [1.048, 1.065], fg: [1.002, 1.008], ibu: [20, 35], srm: [5, 14], abv: [5, 7] },
  { code: "25C", name: "Belgian Golden Strong Ale", og: [1.07, 1.095], fg: [1.005, 1.016], ibu: [22, 35], srm: [3, 6], abv: [7.5, 10.5] },
  { code: "26B", name: "Belgian Dubbel", og: [1.062, 1.075], fg: [1.008, 1.018], ibu: [15, 25], srm: [10, 17], abv: [6, 7.6] },
  { code: "26C", name: "Belgian Tripel", og: [1.075, 1.085], fg: [1.008, 1.014], ibu: [20, 40], srm: [4.5, 7], abv: [7.5, 9.5] },
  { code: "26D", name: "Belgian Dark Strong Ale", og: [1.075, 1.11], fg: [1.01, 1.024], ibu: [20, 35], srm: [12, 22], abv: [8, 12] },
  { code: "X4", name: "Catharina Sour", og: [1.039, 1.048], fg: [1.004, 1.012], ibu: [2, 8], srm: [2, 7], abv: [4, 5.5] },
];
