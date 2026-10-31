import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, CheckCircle2, Clock3, Droplets, FlaskConical, ListChecks, Plus, TimerReset } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { recipeStats, volumes } from "@/lib/recipe-calc";
import { fmt, useRecipes } from "@/lib/store";

export default function BrewDayPage() {
  const [recipes] = useRecipes();
  const [selectedId, setSelectedId] = useState(recipes[0]?.id ?? "");
  const recipe = recipes.find(item => item.id === selectedId) ?? recipes[0] ?? null;

  if (!recipe) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Brew Day</h1>
        <p className="text-muted-foreground">Crie uma receita para começar um brew day guiado.</p>
        <Link to="/recipes/new">
          <Button className="gap-2"><Plus className="h-4 w-4" />Nova receita</Button>
        </Link>
      </div>
    );
  }

  const stats = recipeStats(recipe);
  const vol = volumes(recipe.equipment);
  const timeline = [
    { title: "Preparação", detail: `${recipe.fermentables.length} maltes · ${recipe.hops.length} lúpulos`, done: true },
    ...recipe.mashSteps.map(step => ({ title: step.name, detail: `${step.tempC}°C · ${step.minutes} min`, done: false })),
    { title: "Fervura", detail: `${recipe.equipment.boilMinutes} min · ${recipe.equipment.batchL} L`, done: false },
    ...recipe.hops.filter(item => item.use !== "dryhop").sort((a, b) => b.minutes - a.minutes).map(item => ({
      title: `Adicionar ${item.name}`,
      detail: `${item.grams} g · ${item.alpha}% · ${item.minutes} min`,
      done: false,
    })),
    { title: "Resfriamento", detail: `Até ${recipe.fermentationTempC}°C`, done: false },
    { title: "Fermentação", detail: `${recipe.fermentationDays} dias`, done: false },
  ];

  const checklist = [
    "Pesar maltes e adjuntos",
    "Aquecer água de mostura",
    "Executar os passos de mosturação",
    "Fervurar o mosto e registrar tempo",
    "Adicionar lúpulo conforme cronograma",
    "Resfriar até temperatura de inoculação",
    "Pitchar levedura",
    "Registrar fermentação e observações",
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Operação</p>
          <h1 className="text-3xl font-bold text-foreground">Brew Day</h1>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-sm text-muted-foreground">Receita</label>
          <select
            value={recipe.id}
            onChange={e => setSelectedId(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground"
          >
            {recipes.map(item => (
              <option key={item.id} value={item.id}>{item.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {[
          ["Volume final", `${fmt(vol.fermenter, 0)} L`, "volume"],
          ["OG", stats.og.toFixed(3), "SG"],
          ["IBU", stats.ibu.toFixed(0), "IBU"],
          ["SRM", stats.srm.toFixed(1), "SRM"],
          ["ABV", `${stats.abv.toFixed(1)} %`, "ABV"],
        ].map(([label, value, suffix]) => (
          <Card key={label} className="shadow-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{value}</div>
              <div className="text-xs text-muted-foreground">{suffix}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Clock3 className="h-5 w-5 text-primary" />Linha do tempo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {timeline.map((step, index) => (
              <div key={`${step.title}-${index}`} className="flex items-start gap-3 rounded-lg border border-border bg-background p-3">
                <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {step.done ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-[10px] font-bold">{index + 1}</span>}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-foreground">{step.title}</div>
                  <div className="text-sm text-muted-foreground">{step.detail}</div>
                </div>
                <Badge variant={step.done ? "default" : "secondary"}>{step.done ? "OK" : "Pendente"}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ListChecks className="h-5 w-5 text-primary" />Checklist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {checklist.map((item, index) => (
              <label key={item} className="flex items-center gap-3 rounded-md border border-border bg-background p-2">
                <input type="checkbox" defaultChecked={index < 2} className="h-4 w-4 rounded border-border text-primary" />
                <span className="text-sm text-foreground">{item}</span>
              </label>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><FlaskConical className="h-5 w-5 text-primary" />Resumo da receita</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-background p-4">
            <div className="flex items-center gap-2 text-muted-foreground"><Droplets className="h-4 w-4 text-primary" />Água</div>
            <div className="mt-2 text-xl font-bold text-foreground">{fmt(vol.preBoil, 0)} L pré-fervura</div>
            <p className="mt-1 text-sm text-muted-foreground">{fmt(vol.postBoil, 0)} L pós-fervura · {fmt(vol.fermenter, 0)} L fermentador</p>
          </div>
          <div className="rounded-lg border border-border bg-background p-4">
            <div className="flex items-center gap-2 text-muted-foreground"><TimerReset className="h-4 w-4 text-primary" />Mostura</div>
            <div className="mt-2 text-xl font-bold text-foreground">{recipe.mashSteps.reduce((sum, step) => sum + step.minutes, 0)} min</div>
            <p className="mt-1 text-sm text-muted-foreground">{recipe.mashSteps.map(step => `${step.name} ${step.tempC}°C`).join(" · ") || "Sem passos registrados"}</p>
          </div>
          <div className="rounded-lg border border-border bg-background p-4">
            <div className="flex items-center gap-2 text-muted-foreground"><ArrowRight className="h-4 w-4 text-primary" />Fervura</div>
            <div className="mt-2 text-xl font-bold text-foreground">{recipe.equipment.boilMinutes} min</div>
            <p className="mt-1 text-sm text-muted-foreground">{recipe.hops.filter(item => item.use !== "dryhop").length} adições de lúpulo</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
