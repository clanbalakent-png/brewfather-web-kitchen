import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wand2 } from "lucide-react";
import { applySalts, ions, salts, suggestSalts, sulfateChlorideRatio, type WaterProfile } from "@/lib/recipe-calc";
import { fmt, profileNumber as pn, readProfiles } from "@/lib/store";

const zero: WaterProfile = { ca: 0, mg: 0, na: 0, so4: 0, cl: 0, hco3: 0 };
const presets: Record<string, WaterProfile> = {
  "Destilada / osmose": zero,
  "Pilsen (Plzeň)": { ca: 7, mg: 3, na: 2, so4: 5, cl: 5, hco3: 15 },
  "Munique": { ca: 76, mg: 17, na: 2, so4: 41, cl: 2, hco3: 152 },
  "Burton on Trent": { ca: 275, mg: 40, na: 25, so4: 610, cl: 35, hco3: 270 },
  "Dublin": { ca: 118, mg: 4, na: 12, so4: 54, cl: 19, hco3: 160 },
  "IPA americana (lupulada)": { ca: 110, mg: 18, na: 16, so4: 280, cl: 50, hco3: 0 },
  "NEIPA (macia)": { ca: 120, mg: 10, na: 15, so4: 75, cl: 175, hco3: 0 },
  "Equilibrada": { ca: 80, mg: 5, na: 25, so4: 80, cl: 75, hco3: 50 },
};
const fromProfile = (v: Record<string, string>): WaterProfile => ({ ca: pn(v.calcio), mg: pn(v.magnesio), na: pn(v.sodio), so4: pn(v.sulfato), cl: pn(v.cloreto), hco3: pn(v.bicarbonato) });

export default function WaterPage() {
  const [params] = useSearchParams();
  const saved = useMemo(() => readProfiles("agua"), []);
  const options: Record<string, WaterProfile> = { ...presets, ...Object.fromEntries(saved.map(p => [`Meu perfil: ${p.name}`, fromProfile(p.values)])) };
  const initialTarget = saved.find(p => p.id === params.get("profile"));
  const [sourceName, setSourceName] = useState("Destilada / osmose");
  const [targetName, setTargetName] = useState(initialTarget ? `Meu perfil: ${initialTarget.name}` : "Equilibrada");
  const [source, setSource] = useState<WaterProfile>(presets["Destilada / osmose"]);
  const [liters, setLiters] = useState(Number(params.get("liters")) || 30);
  const [add, setAdd] = useState<Record<string, number>>({});
  const target = options[targetName] ?? zero;
  const result = applySalts(source, add, liters);
  const ratio = sulfateChlorideRatio(result);

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold text-foreground">Química da Água</h1><p className="text-muted-foreground">Calcule os sais para chegar ao perfil de água desejado.</p></div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader><CardTitle>Água de origem</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Select value={sourceName} onValueChange={n => { setSourceName(n); setSource(options[n]); }}>
              <SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{Object.keys(options).map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent>
            </Select>
            <div className="grid grid-cols-3 gap-2">
              {ions.map(i => <div key={i.id} className="space-y-1"><Label className="text-xs text-muted-foreground">{i.label}</Label><Input type="number" value={source[i.id]} onChange={e => setSource({ ...source, [i.id]: Number(e.target.value) || 0 })} /></div>)}
            </div>
            <div className="space-y-1"><Label className="text-xs text-muted-foreground">Volume total de água (L)</Label><Input type="number" value={liters} onChange={e => setLiters(Number(e.target.value) || 0)} /></div>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader><CardTitle>Sais (g)</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-wrap gap-2 items-end">
              <div className="flex-1 min-w-48 space-y-1"><Label className="text-xs text-muted-foreground">Perfil alvo</Label>
                <Select value={targetName} onValueChange={setTargetName}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{Object.keys(options).map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent></Select></div>
              <Button onClick={() => setAdd(suggestSalts(source, target, liters))}><Wand2 className="h-4 w-4 mr-2" />Sugerir sais</Button>
            </div>
            {salts.map(s => <div key={s.id} className="grid grid-cols-[1fr_6rem] items-center gap-2"><Label>{s.label}</Label><Input type="number" step="0.1" value={add[s.id] ?? 0} onChange={e => setAdd({ ...add, [s.id]: Number(e.target.value) || 0 })} /></div>)}
          </CardContent>
        </Card>
      </div>
      <Card className="shadow-card">
        <CardHeader><CardTitle>Resultado (ppm)</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
            {ions.map(i => {
              const diff = result[i.id] - target[i.id];
              return <div key={i.id} className="rounded-md bg-muted/50 p-3"><div className="text-xs text-muted-foreground">{i.label}</div><div className="text-xl font-bold">{fmt(result[i.id], 0)}</div><div className={`text-xs ${Math.abs(diff) <= Math.max(10, target[i.id] * 0.1) ? "text-success" : "text-destructive"}`}>alvo {fmt(target[i.id], 0)} ({diff >= 0 ? "+" : ""}{fmt(diff, 0)})</div></div>;
            })}
          </div>
          <p className="mt-4 text-sm">Relação sulfato/cloreto: <b>{fmt(ratio, 2)}</b> — {ratio === 0 ? "sem cloreto" : ratio > 2 ? "realça o amargor (seca)" : ratio < 0.8 ? "realça o malte (macia)" : "equilibrada"}</p>
        </CardContent>
      </Card>
    </div>
  );
}
