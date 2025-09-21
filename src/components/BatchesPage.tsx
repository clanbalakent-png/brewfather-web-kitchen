import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Beaker, Clock, Thermometer, BarChart3 } from "lucide-react";

export default function BatchesPage() {
  const batches = [
    {
      id: 1,
      name: "IPA Tropical #3",
      recipe: "IPA Tropical",
      status: "Fermentação Primária",
      progress: 35,
      startDate: "2024-01-20",
      expectedEnd: "2024-02-10",
      volume: "20L",
      og: 1.058,
      currentGravity: 1.025,
      temp: 19,
      abv: 4.3
    },
    {
      id: 2,
      name: "Porter Chocolate #5",
      recipe: "Porter Chocolate",
      status: "Maturação",
      progress: 85,
      startDate: "2024-01-01",
      expectedEnd: "2024-01-25",
      volume: "25L",
      og: 1.062,
      currentGravity: 1.012,
      temp: 18,
      abv: 6.6
    },
    {
      id: 3,
      name: "Wheat Alemã #2",
      recipe: "Wheat Alemã",
      status: "Fermentação Secundária",
      progress: 60,
      startDate: "2024-01-10",
      expectedEnd: "2024-02-05",
      volume: "18L",
      og: 1.048,
      currentGravity: 1.014,
      temp: 20,
      abv: 4.5
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Fermentação Primária":
        return "bg-blue-500 text-blue-50";
      case "Fermentação Secundária":
        return "bg-purple-500 text-purple-50";
      case "Maturação":
        return "bg-green-500 text-green-50";
      case "Pronto":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const calculateDaysRemaining = (expectedEnd: string) => {
    const end = new Date(expectedEnd);
    const now = new Date();
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 3600 * 24));
    return diff > 0 ? diff : 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Lotes</h1>
          <p className="text-muted-foreground">Acompanhe seus lotes em produção</p>
        </div>
        <Button className="bg-gradient-primary hover:bg-primary-glow text-primary-foreground shadow-brew">
          <Plus className="h-4 w-4 mr-2" />
          Novo Lote
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {batches.map((batch) => (
          <Card key={batch.id} className="shadow-foam border-border/50 hover:shadow-brew transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg text-foreground">{batch.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{batch.recipe}</p>
                </div>
                <Badge className={getStatusColor(batch.status)}>
                  {batch.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Progresso</span>
                  <span className="text-accent font-medium">{batch.progress}%</span>
                </div>
                <Progress value={batch.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Volume</p>
                  <p className="font-semibold text-foreground">{batch.volume}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">ABV Atual</p>
                  <p className="font-semibold text-accent">{batch.abv}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">OG</p>
                  <p className="font-semibold text-foreground">{batch.og}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Gravidade</p>
                  <p className="font-semibold text-foreground">{batch.currentGravity}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Thermometer className="h-4 w-4" />
                  <span>{batch.temp}°C</span>
                </div>
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{calculateDaysRemaining(batch.expectedEnd)} dias</span>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-accent">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Detalhes
                </Button>
                <Button size="sm" variant="outline" className="flex-1 border-border hover:bg-muted">
                  <Beaker className="h-4 w-4 mr-1" />
                  Atualizar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-foam border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">Cronograma de Produção</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {batches.map((batch) => (
              <div key={batch.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Badge className={getStatusColor(batch.status)} variant="secondary">
                    {batch.status}
                  </Badge>
                  <div>
                    <h4 className="font-medium text-foreground">{batch.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Iniciado em {new Date(batch.startDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-accent">
                    {calculateDaysRemaining(batch.expectedEnd)} dias restantes
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Previsão: {new Date(batch.expectedEnd).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}