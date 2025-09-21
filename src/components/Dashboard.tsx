import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Beaker, FileText, Package, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Receitas Ativas",
      value: "12",
      icon: FileText,
      change: "+2 este mês"
    },
    {
      title: "Lotes em Fermentação",
      value: "3",
      icon: Beaker,
      change: "2 prontos em breve"
    },
    {
      title: "Itens em Estoque",
      value: "47",
      icon: Package,
      change: "5 com baixo estoque"
    },
    {
      title: "Litros Produzidos",
      value: "156L",
      icon: TrendingUp,
      change: "+23L este mês"
    }
  ];

  const recentBatches = [
    { name: "IPA Tropical", stage: "Fermentação Primária", days: 5 },
    { name: "Porter Chocolate", stage: "Maturação", days: 21 },
    { name: "Wheat Alemã", stage: "Fermentação Secundária", days: 12 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral da sua cervejaria</p>
        </div>
        <Button 
          className="bg-gradient-primary hover:bg-primary-glow text-primary-foreground shadow-brew"
          onClick={() => navigate('/recipes/new')}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Receita
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-foam border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-foam border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Lotes Recentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentBatches.map((batch, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div>
                  <h4 className="font-medium text-foreground">{batch.name}</h4>
                  <p className="text-sm text-muted-foreground">{batch.stage}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-accent">{batch.days} dias</p>
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full mt-4 border-border hover:bg-muted"
              onClick={() => navigate('/batches')}
            >
              Ver Todos os Lotes
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-foam border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start border-border hover:bg-muted"
              onClick={() => navigate('/recipes')}
            >
              <FileText className="h-4 w-4 mr-2" />
              Gerenciar Receitas
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start border-border hover:bg-muted"
              onClick={() => navigate('/inventory')}
            >
              <Package className="h-4 w-4 mr-2" />
              Atualizar Inventário
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start border-border hover:bg-muted"
              onClick={() => navigate('/calculators')}
            >
              <Beaker className="h-4 w-4 mr-2" />
              Calculadoras
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}