import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Beaker, FileText, Package, TrendingUp, Calculator, Droplets } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { batchStatuses, reportSummary } from "@/lib/recipe-calc";
import { fmt, useBatches, useInventory, useRecipes } from "@/lib/store";

export default function Dashboard() {
  const navigate = useNavigate();
  const [recipes] = useRecipes();
  const [batches] = useBatches();
  const [inventory] = useInventory();
  const active = batches.filter(b => b.status !== "concluido" && b.status !== "planejamento");
  const low = inventory.filter(i => i.amount <= i.minAmount);
  const rep = reportSummary(batches);
  const stats = [
    { title: "Receitas", value: String(recipes.length), icon: FileText, change: "no seu caderno", to: "/recipes" },
    { title: "Lotes em andamento", value: String(active.length), icon: Beaker, change: `${batches.length} lotes no total`, to: "/batches" },
    { title: "Itens em estoque", value: String(inventory.length), icon: Package, change: `${low.length} com estoque baixo`, to: "/inventory" },
    { title: "Litros produzidos", value: `${fmt(rep.liters, 0)} L`, icon: TrendingUp, change: "lotes já brassados", to: "/reports" },
  ];
  const recent = [...batches].sort((a, b) => b.number - a.number).slice(0, 5);

  return (
    <div className="space-y-6">
      <div><h1 className="text-3xl font-bold text-foreground">Dashboard</h1><p className="text-muted-foreground">Visão geral da sua cervejaria.</p></div>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {stats.map(s => (
          <Card key={s.title} className="shadow-card cursor-pointer hover:shadow-brew" onClick={() => navigate(s.to)}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">{s.title}</CardTitle><s.icon className="h-4 w-4 text-primary" /></CardHeader>
            <CardContent><div className="text-2xl font-bold">{s.value}</div><p className="text-xs text-muted-foreground">{s.change}</p></CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-card">
          <CardHeader><CardTitle>Lotes recentes</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {recent.length === 0 && <p className="text-sm text-muted-foreground">Nenhum lote ainda.</p>}
            {recent.map(b => (
              <button key={b.id} onClick={() => navigate(`/batches/${b.id}`)} className="w-full flex justify-between items-center rounded-md p-2 hover:bg-muted text-left">
                <span className="font-medium">#{b.number} {b.name}</span><Badge variant="secondary">{batchStatuses.find(s => s.id === b.status)?.label}</Badge>
              </button>
            ))}
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardHeader><CardTitle>Ações rápidas</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Button onClick={() => navigate("/recipes/new")} className="bg-gradient-primary text-primary-foreground"><Plus className="h-4 w-4 mr-2" />Nova receita</Button>
            <Button variant="outline" onClick={() => navigate("/batches")}><Beaker className="h-4 w-4 mr-2" />Novo lote</Button>
            <Button variant="outline" onClick={() => navigate("/calculators")}><Calculator className="h-4 w-4 mr-2" />Calculadoras</Button>
            <Button variant="outline" onClick={() => navigate("/water")}><Droplets className="h-4 w-4 mr-2" />Química da água</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
