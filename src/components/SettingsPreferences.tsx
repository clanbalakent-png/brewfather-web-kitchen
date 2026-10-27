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
  const select = (key: keyof AppSettings, label: string, options: [string, string][]) => <Select value={String(s[key])} onValueChange={v => save({ [key]: v })}><SelectTrigger aria-label={label} className="w-40 max-w-full"><SelectValue /></SelectTrigger><SelectContent>{options.map(([v, text]) => <SelectItem key={v} value={v}>{text}</SelectItem>)}</SelectContent></Select>;
  const toggle = (key: keyof AppSettings, label: string) => <Switch aria-label={label} checked={s[key] === true} onCheckedChange={v => save({ [key]: v })} />;
  const segmented = (key: keyof AppSettings, label: string, options: [string, string][]) => <div className="flex flex-wrap gap-1" role="group" aria-label={label}>{options.map(([v, text]) => <Button key={v} size="sm" variant={s[key] === v ? "default" : "outline"} aria-pressed={s[key] === v} onClick={() => save({ [key]: v })}>{text}</Button>)}</div>;
  const preset = (mode: "metric" | "imperial" | "us") => save(mode === "metric" ? { volume: "L", weight: "kg", hopWeight: "g", temperature: "°C", pressure: "bar", altitude: "m" } : { volume: mode === "us" ? "gal (US)" : "gal (UK)", weight: "lb", hopWeight: "oz", temperature: "°F", pressure: "psi", altitude: "ft" });
  return <>
    <div className="grid items-start gap-5 xl:grid-cols-2">
      <div className="space-y-5">
        <Section title="Geral">
          <Row label="Próximo Lote #" icon={Beaker}><Input aria-label="Próximo Lote" type="number" min={1} step={1} className="w-24" value={s.nextBatch} onChange={e => save({ nextBatch: Number(e.target.value) })} /></Row>
          <Row label="Idioma" icon={Globe}><span className="text-sm text-muted-foreground">Português (Brasil)</span></Row>
          <Row label="Tema" icon={Palette}>{select("theme", "Tema", [["system", "Automático"], ["light", "Claro"], ["dark", "Escuro"]])}</Row>
        </Section>
        <Section title="Fórmulas">
          <Row label="Álcool por Volume" icon={Calculator}>{select("abvFormula", "Álcool por Volume", [["standard", "Padrão"], ["alternative", "Alternativa"]])}</Row>
          <Row label="Densidade Final" description="Estimativa pela atenuação da levedura; ajuste opcional pela temperatura de mostura." icon={Calculator}>{select("fgFormula", "Densidade Final", [["normal", "Normal"], ["mash", "Temperatura da mostura"]])}</Row>
          <Row label="Fórmula do IBU" icon={Calculator}>{select("ibuFormula", "Fórmula do IBU", [["tinseth", "Tinseth"], ["rager", "Rager"]])}</Row>
        </Section>
        <Section title="Recursos">
          <Row label="Monitoramento da Brassagem" icon={Thermometer}>{toggle("brewMonitoring", "Monitoramento da Brassagem")}</Row>
          <Row label="Estoque" icon={Package}>{toggle("inventory", "Estoque")}</Row>
          <Row label="Permitir estoque negativo" description="O valor do estoque pode ser negativo." icon={Package}>{toggle("negativeStock", "Permitir estoque negativo")}</Row>
          <Row label="Informação Nutricional" icon={FlaskConical}>{toggle("nutrition", "Informação Nutricional")}</Row>
        </Section>
        <Section title="Configurador de Receitas">
          <Row label="Salvar Receitas Automaticamente" icon={Save}>{toggle("autoSave", "Salvar Receitas Automaticamente")}</Row>
          <Row label="Rampa de temperatura de mostura" description="Ajuste da estimativa de densidade final.">{<Button size="sm" variant="outline" onClick={() => setDialog("mash")}>Configurar</Button>}</Row>
          <Row label="Guia de estilo BU/GU">{toggle("buGu", "Guia de estilo BU/GU")}</Row>
          <Row label="Guia de estilo RBR">{toggle("rbr", "Guia de estilo RBR")}</Row>
        </Section>
        <Section title="Configuração do Lote"><Row label="Valores adicionais medidos" icon={Beaker}><Button variant="outline" size="sm" onClick={() => setDialog("measurements")}>Configurar</Button></Row></Section>
      </div>
      <div className="space-y-5">
        <Section title="Unidades">
          <div className="flex flex-wrap gap-2 py-3" role="group" aria-label="Sistema de unidades">{[["metric", "Métrica"], ["imperial", "Imperial"], ["us", "US"]].map(([id, text]) => <Button key={id} size="sm" variant="outline" onClick={() => preset(id as "metric" | "imperial" | "us")}>{text}</Button>)}</div>
          <Row label="Exibir Densidade" icon={Ruler}>{select("gravity", "Exibir Densidade", [["sg", "SG (1.XXX)"], ["plato", "Plato (°P)"]])}</Row>
          <Row label="Formato da Densidade Específica" icon={Ruler}>{select("sgFormat", "Formato da Densidade Específica", [["decimal", "SG (1.XXX)"], ["points", "Pontos (XX)"]])}</Row>
          <Row label="Cor Padrão">{segmented("color", "Cor Padrão", [["ebc", "EBC"], ["srm", "SRM"]])}</Row>
          <Row label="Cor dos Grãos">{select("grainColor", "Cor dos Grãos", [["lovibond", "Padrão (°L)"], ["srm", "SRM"], ["ebc", "EBC"]])}</Row>
          <Row label="Temperatura" icon={Thermometer}>{segmented("temperature", "Temperatura", [["°F", "°F"], ["°C", "°C"]])}</Row>
          <Row label="Volume" icon={Ruler}>{select("volume", "Volume", [["L", "Litros"], ["gal (US)", "Galões US"], ["gal (UK)", "Galões Imperial"]])}</Row>
          <Row label="Peso" icon={Ruler}>{select("weight", "Peso", [["kg", "KG"], ["lb", "Libra"]])}</Row>
          <Row label="Lúpulo" icon={Ruler}>{select("hopWeight", "Lúpulo", [["g", "Grama"], ["oz", "Onça"]])}</Row>
          <Row label="Carbonatação">{select("carbonation", "Carbonatação", [["vol", "CO₂-vol"], ["g/L", "g/L"]])}</Row>
          <Row label="Pressão">{select("pressure", "Pressão", [["bar", "Bar"], ["psi", "PSI"], ["kPa", "kPa"]])}</Row>
          <Row label="Altitude">{select("altitude", "Altitude", [["m", "Metros"], ["ft", "Pés"]])}</Row>
          <Row label="Poder Diastático">{select("diastatic", "Poder Diastático", [["lintner", "°Lintner"], ["wk", "°WK"]])}</Row>
        </Section>
        <Section title="Data & Hora">
          <Row label="Data de Entrada" icon={Calendar}>{select("dateFormat", "Data de Entrada", [["auto", "Automático"], ["dmy", "DD/MM/AAAA"], ["mdy", "MM/DD/AAAA"], ["iso", "AAAA-MM-DD"]])}</Row>
          <Row label="Horário de Entrada" icon={Calendar}>{select("timeFormat", "Horário de Entrada", [["auto", "Automático"], ["24", "24 horas"], ["12", "12 horas"]])}</Row>
        </Section>
      </div>
    </div>
    <Dialog open={dialog !== null} onOpenChange={open => { if (!open) setDialog(null); }}><DialogContent className="max-h-[85vh] overflow-y-auto"><DialogHeader><DialogTitle>{dialog === "mash" ? "Rampa de temperatura de mostura" : "Valores adicionais medidos"}</DialogTitle><DialogDescription>{dialog === "mash" ? "Modelo aproximado: cada grau acima da referência reduz a atenuação pelo ajuste escolhido." : "Escolha as medições que aparecerão nos lotes."}</DialogDescription></DialogHeader>
      {dialog === "mash" ? <div className="space-y-4"><div className="space-y-2"><Label htmlFor="mash-ref">Temperatura de referência (°C)</Label><Input id="mash-ref" type="number" min={55} max={75} value={s.mashReference} onChange={e => save({ mashReference: Number(e.target.value) })} /></div><div className="space-y-2"><Label htmlFor="mash-adjust">Ajuste de atenuação (% por °C)</Label><Input id="mash-adjust" type="number" min={0} max={3} step={0.1} value={s.mashAdjustment} onChange={e => save({ mashAdjustment: Number(e.target.value) })} /></div></div> : measurementOptions.map(o => <Row key={o.id} label={o.label}><Switch aria-label={o.label} checked={s.additionalMeasurements.includes(o.id)} onCheckedChange={checked => save({ additionalMeasurements: checked ? [...s.additionalMeasurements, o.id] : s.additionalMeasurements.filter(id => id !== o.id) })} /></Row>)}
      <Button onClick={() => setDialog(null)}>Concluir</Button>
    </DialogContent></Dialog>
  </>;
}