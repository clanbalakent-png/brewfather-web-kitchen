import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { recipeStats, reportSummary } from "@/lib/recipe-calc";
import { fmt, money, useBatches, useInventory, useRecipes } from "@/lib/store";

export default function ReportsPage() {
  const [batches] = useBatches();
  const [recipes] = useRecipes();
  const [inventory] = useInventory();
  const rep = reportSummary(batches);
  const stock = inventory.reduce((s, i) => s + i.amount * i.price, 0);
  const cards = [
    { label: "Lotes", value: String(rep.totalBatches), sub: `${rep.finished} finalizados` },
    { label: "Litros produzidos", value: `${fmt(rep.liters)} L`, sub: "lotes já brassados" },
    { label: "Custo total", value: money(rep.cost), sub: `${money(rep.costPerLiter)} por litro` },
    { label: "Valor em estoque", value: money(stock), sub: `${inventory.length} itens` },
  ];
  const axis = { stroke: "hsl(var(--muted-foreground))", fontSize: 12 };
  const Chart = ({ data, x, y, title }: { data: Record<string, unknown>[]; x: string; y: string; title: string }) => (
    <Card className="shadow-card"><CardHeader><CardTitle className="text-lg">{title}</CardTitle></CardHeader><CardContent className="h-64">
      {data.length === 0 ? <p className="text-sm text-muted-foreground">Sem dados ainda.</p> : (
        <ResponsiveContainer width="100%" height="100%"><BarChart data={data}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" /><XAxis dataKey={x} {...axis} /><YAxis {...axis} /><Tooltip /><Bar dataKey={y} fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer>
      )}
    </CardContent></Card>
  );
  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold text-foreground">Relatórios</h1><p className="text-muted-foreground">Produção, custos e consumo de ingredientes.</p></div>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {cards.map(c => <Card key={c.label} className="shadow-card"><CardContent className="p-4"><div className="text-sm text-muted-foreground">{c.label}</div><div className="text-2xl font-bold">{c.value}</div><div className="text-xs text-muted-foreground">{c.sub}</div></CardContent></Card>)}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Chart title="Litros por mês" data={rep.byMonth} x="month" y="litros" />
        <Chart title="Custo por mês (R$)" data={rep.byMonth.map(m => ({ ...m, custo: Math.round(m.custo * 100) / 100 }))} x="month" y="custo" />
        <Chart title="Lúpulos mais usados (g)" data={rep.hops} x="name" y="value" />
        <Chart title="Fermentáveis mais usados (kg)" data={rep.malts} x="name" y="value" />
      </div>
      <Card className="shadow-card"><CardHeader><CardTitle className="text-lg">Custo por receita</CardTitle></CardHeader><CardContent>
        <ul className="divide-y divide-border text-sm">{recipes.map(r => { const s = recipeStats(r); return <li key={r.id} className="flex justify-between py-2"><span>{r.name}</span><span>{money(s.cost.total)} · {money(s.costPerLiter)}/L</span></li>; })}</ul>
      </CardContent></Card>
    </div>
  );
}
