import { type ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Globe, Palette, Calculator, SlidersHorizontal, Ruler, Calendar, Beaker, Save, Package, Thermometer, FlaskConical } from "lucide-react";
import { useSettings } from "@/lib/settings";
import { measurementOptions, type AppSettings } from "@/lib/settings-model";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return <section className="overflow-hidden rounded-md border border-border"><h2 className="border-b border-border bg-muted px-4 py-3 text-sm font-semibold">{title}</h2><div className="divide-y divide-border px-4">{children}</div></section>;
}
function Row({ label, description, icon: Icon = SlidersHorizontal, children }: { label: string; description?: string; icon?: typeof Globe; children: ReactNode }) {
  return <div className="flex flex-wrap items-center justify-between gap-3 py-4"><div className="flex min-w-0 flex-1 items-center gap-3"><Icon className="h-5 w-5 shrink-0 text-muted-foreground" /><div className="min-w-0"><p className="text-sm font-medium">{label}</p>{description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}</div></div>{children}</div>;
}
export default function SettingsPreferences() {
  const [s, save] = useSettings();
  const [dialog, setDialog] = useState<"mash" | "measurements" | null>(null);
  const isEnglish = s.language === "en-US";
  const t = (pt: string, en: string) => (isEnglish ? en : pt);
  const select = (key: keyof AppSettings, label: string, options: [string, string][]) => <Select value={String(s[key])} onValueChange={v => save({ [key]: v })}><SelectTrigger aria-label={label} className="w-40 max-w-full"><SelectValue /></SelectTrigger><SelectContent>{options.map(([v, text]) => <SelectItem key={v} value={v}>{text}</SelectItem>)}</SelectContent></Select>;
  const toggle = (key: keyof AppSettings, label: string) => <Switch aria-label={label} checked={s[key] === true} onCheckedChange={v => save({ [key]: v })} />;
  const segmented = (key: keyof AppSettings, label: string, options: [string, string][]) => <div className="flex flex-wrap gap-1" role="group" aria-label={label}>{options.map(([v, text]) => <Button key={v} size="sm" variant={s[key] === v ? "default" : "outline"} aria-pressed={s[key] === v} onClick={() => save({ [key]: v })}>{text}</Button>)}</div>;
  const preset = (mode: "metric" | "imperial" | "us") => save(mode === "metric" ? { volume: "L", weight: "kg", hopWeight: "g", temperature: "°C", pressure: "bar", altitude: "m" } : { volume: mode === "us" ? "gal (US)" : "gal (UK)", weight: "lb", hopWeight: "oz", temperature: "°F", pressure: "psi", altitude: "ft" });
  return <>
    <div className="grid items-start gap-5 xl:grid-cols-2">
      <div className="space-y-5">
        <Section title={t("Geral", "General")}>
          <Row label={t("Próximo Lote #", "Next Batch #")} icon={Beaker}><Input aria-label={t("Próximo Lote", "Next Batch")} type="number" min={1} step={1} className="w-24" value={s.nextBatch} onChange={e => save({ nextBatch: Number(e.target.value) })} /></Row>
          <Row label={t("Idioma", "Language")} icon={Globe}>{select("language", t("Idioma", "Language"), [["pt-BR", "Português (Brasil)"], ["en-US", "English (US)"], ["es-ES", "Español"], ["fr-FR", "Français"], ["de-DE", "Deutsch"]])}</Row>
          <Row label={t("Tema", "Theme")} icon={Palette}>{select("theme", t("Tema", "Theme"), [["system", t("Automático", "Automatic")], ["light", t("Claro", "Light")], ["dark", t("Escuro", "Dark")]])}</Row>
        </Section>
        <Section title={t("Fórmulas", "Formulas")}>
          <Row label={t("Álcool por Volume", "ABV")} icon={Calculator}>{select("abvFormula", t("Álcool por Volume", "ABV"), [["standard", t("Padrão", "Standard")], ["alternative", t("Alternativa", "Alternative")]])}</Row>
          <Row label={t("Densidade Final", "Final Gravity")} description={t("Estimativa pela atenuação da levedura; ajuste opcional pela temperatura de mostura.", "Estimate based on yeast attenuation; optional mash-temperature adjustment.")} icon={Calculator}>{select("fgFormula", t("Densidade Final", "Final Gravity"), [["normal", t("Normal", "Normal")], ["mash", t("Temperatura da mostura", "Mash temperature")]])}</Row>
          <Row label={t("Fórmula do IBU", "IBU Formula")} icon={Calculator}>{select("ibuFormula", t("Fórmula do IBU", "IBU Formula"), [["tinseth", "Tinseth"], ["rager", "Rager"]])}</Row>
        </Section>
        <Section title={t("Recursos", "Features")}>
          <Row label={t("Monitoramento da Brassagem", "Brew monitoring")} icon={Thermometer}>{toggle("brewMonitoring", t("Monitoramento da Brassagem", "Brew monitoring"))}</Row>
          <Row label={t("Estoque", "Inventory")} icon={Package}>{toggle("inventory", t("Estoque", "Inventory"))}</Row>
          <Row label={t("Permitir estoque negativo", "Allow negative inventory")} description={t("O valor do estoque pode ser negativo.", "Inventory can go below zero.")} icon={Package}>{toggle("negativeStock", t("Permitir estoque negativo", "Allow negative inventory"))}</Row>
          <Row label={t("Informação Nutricional", "Nutrition info")} icon={FlaskConical}>{toggle("nutrition", t("Informação Nutricional", "Nutrition info"))}</Row>
        </Section>
        <Section title={t("Configurador de Receitas", "Recipe Builder")}>
          <Row label={t("Salvar Receitas Automaticamente", "Auto-save recipes")} icon={Save}>{toggle("autoSave", t("Salvar Receitas Automaticamente", "Auto-save recipes"))}</Row>
          <Row label={t("Rampa de temperatura de mostura", "Mash temperature ramp")} description={t("Ajuste da estimativa de densidade final.", "Adjust final-gravity estimate.")}>{<Button size="sm" variant="outline" onClick={() => setDialog("mash")}>{t("Configurar", "Configure")}</Button>}</Row>
          <Row label={t("Guia de estilo BU/GU", "BU/GU style guide")}>{toggle("buGu", t("Guia de estilo BU/GU", "BU/GU style guide"))}</Row>
          <Row label={t("Guia de estilo RBR", "RBR style guide")}>{toggle("rbr", t("Guia de estilo RBR", "RBR style guide"))}</Row>
        </Section>
        <Section title={t("Configuração do Lote", "Batch Setup")}><Row label={t("Valores adicionais medidos", "Additional measured values")} icon={Beaker}><Button variant="outline" size="sm" onClick={() => setDialog("measurements")}>{t("Configurar", "Configure")}</Button></Row></Section>
      </div>
      <div className="space-y-5">
        <Section title={t("Unidades", "Units")}>
          <div className="flex flex-wrap gap-2 py-3" role="group" aria-label={t("Sistema de unidades", "Unit system")}>{[["metric", t("Métrica", "Metric")], ["imperial", "Imperial"], ["us", "US"]].map(([id, text]) => <Button key={id} size="sm" variant="outline" onClick={() => preset(id as "metric" | "imperial" | "us")}>{text}</Button>)}</div>
          <Row label={t("Exibir Densidade", "Display gravity")} icon={Ruler}>{select("gravity", t("Exibir Densidade", "Display gravity"), [["sg", "SG (1.XXX)"], ["plato", "Plato (°P)"]])}</Row>
          <Row label={t("Formato da Densidade Específica", "Specific gravity format")} icon={Ruler}>{select("sgFormat", t("Formato da Densidade Específica", "Specific gravity format"), [["decimal", "SG (1.XXX)"], ["points", "Pontos (XX)"]])}</Row>
          <Row label={t("Cor Padrão", "Default color")}>{segmented("color", t("Cor Padrão", "Default color"), [["ebc", "EBC"], ["srm", "SRM"]])}</Row>
          <Row label={t("Cor dos Grãos", "Grain color")}>{select("grainColor", t("Cor dos Grãos", "Grain color"), [["lovibond", t("Padrão (°L)", "Default (°L)")], ["srm", "SRM"], ["ebc", "EBC"]])}</Row>
          <Row label={t("Temperatura", "Temperature")} icon={Thermometer}>{segmented("temperature", t("Temperatura", "Temperature"), [["°F", "°F"], ["°C", "°C"]])}</Row>
          <Row label={t("Volume", "Volume")} icon={Ruler}>{select("volume", t("Volume", "Volume"), [["L", "Litros"], ["gal (US)", "Galões US"], ["gal (UK)", "Galões Imperial"]])}</Row>
          <Row label={t("Peso", "Weight")} icon={Ruler}>{select("weight", t("Peso", "Weight"), [["kg", "KG"], ["lb", "Libra"]])}</Row>
          <Row label={t("Lúpulo", "Hop")} icon={Ruler}>{select("hopWeight", t("Lúpulo", "Hop"), [["g", "Grama"], ["oz", "Onça"]])}</Row>
          <Row label={t("Carbonatação", "Carbonation")}>{select("carbonation", t("Carbonatação", "Carbonation"), [["vol", "CO₂-vol"], ["g/L", "g/L"]])}</Row>
          <Row label={t("Pressão", "Pressure")}>{select("pressure", t("Pressão", "Pressure"), [["bar", "Bar"], ["psi", "PSI"], ["kPa", "kPa"]])}</Row>
          <Row label={t("Altitude", "Altitude")}>{select("altitude", t("Altitude", "Altitude"), [["m", "Metros"], ["ft", "Pés"]])}</Row>
          <Row label={t("Poder Diastático", "Diastatic power")}>{select("diastatic", t("Poder Diastático", "Diastatic power"), [["lintner", "°Lintner"], ["wk", "°WK"]])}</Row>
        </Section>
        <Section title={t("Data & Hora", "Date & Time")}>
          <Row label={t("Data de Entrada", "Entry date")} icon={Calendar}>{select("dateFormat", t("Data de Entrada", "Entry date"), [["auto", t("Automático", "Automatic")], ["dmy", "DD/MM/AAAA"], ["mdy", "MM/DD/AAAA"], ["iso", "AAAA-MM-DD"]])}</Row>
          <Row label={t("Horário de Entrada", "Entry time")} icon={Calendar}>{select("timeFormat", t("Horário de Entrada", "Entry time"), [["auto", t("Automático", "Automatic")], ["24", "24 horas"], ["12", "12 horas"]])}</Row>
        </Section>
      </div>
    </div>
    <Dialog open={dialog !== null} onOpenChange={open => { if (!open) setDialog(null); }}><DialogContent className="max-h-[85vh] overflow-y-auto"><DialogHeader><DialogTitle>{dialog === "mash" ? "Rampa de temperatura de mostura" : "Valores adicionais medidos"}</DialogTitle><DialogDescription>{dialog === "mash" ? "Modelo aproximado: cada grau acima da referência reduz a atenuação pelo ajuste escolhido." : "Escolha as medições que aparecerão nos lotes."}</DialogDescription></DialogHeader>
      {dialog === "mash" ? <div className="space-y-4"><div className="space-y-2"><Label htmlFor="mash-ref">Temperatura de referência (°C)</Label><Input id="mash-ref" type="number" min={55} max={75} value={s.mashReference} onChange={e => save({ mashReference: Number(e.target.value) })} /></div><div className="space-y-2"><Label htmlFor="mash-adjust">Ajuste de atenuação (% por °C)</Label><Input id="mash-adjust" type="number" min={0} max={3} step={0.1} value={s.mashAdjustment} onChange={e => save({ mashAdjustment: Number(e.target.value) })} /></div></div> : measurementOptions.map(o => <Row key={o.id} label={o.label}><Switch aria-label={o.label} checked={s.additionalMeasurements.includes(o.id)} onCheckedChange={checked => save({ additionalMeasurements: checked ? [...s.additionalMeasurements, o.id] : s.additionalMeasurements.filter(id => id !== o.id) })} /></Row>)}
      <Button onClick={() => setDialog(null)}>Concluir</Button>
    </DialogContent></Dialog>
  </>;
}