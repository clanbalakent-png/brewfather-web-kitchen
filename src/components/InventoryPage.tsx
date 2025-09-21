import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, AlertTriangle, Package } from "lucide-react";
import { useState } from "react";

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const grains = [
    { name: "Malte Pilsen", amount: 15, unit: "kg", lowStock: false, cost: 8.50 },
    { name: "Malte Munich", amount: 2, unit: "kg", lowStock: true, cost: 12.00 },
    { name: "Malte Crystal 60L", amount: 5, unit: "kg", lowStock: false, cost: 15.50 },
    { name: "Malte Chocolate", amount: 0.5, unit: "kg", lowStock: true, cost: 18.00 }
  ];

  const hops = [
    { name: "Cascade", amount: 200, unit: "g", aa: 6.8, lowStock: false, cost: 85.00 },
    { name: "Centennial", amount: 50, unit: "g", aa: 10.2, lowStock: true, cost: 95.00 },
    { name: "Citra", amount: 150, unit: "g", aa: 12.5, lowStock: false, cost: 120.00 },
    { name: "Amarillo", amount: 30, unit: "g", aa: 8.9, lowStock: true, cost: 110.00 }
  ];

  const yeasts = [
    { name: "Safale US-05", amount: 3, unit: "pcts", temp: "15-24°C", lowStock: false, cost: 25.00 },
    { name: "Wyeast 1056", amount: 1, unit: "pct", temp: "16-22°C", lowStock: true, cost: 35.00 },
    { name: "Lallemand Voss Kveik", amount: 2, unit: "pcts", temp: "25-40°C", lowStock: false, cost: 28.00 }
  ];

  const InventoryTable = ({ items, type }: { items: any[], type: string }) => (
    <div className="space-y-4">
      {items.map((item, index) => (
        <Card key={index} className={`shadow-foam border-border/50 ${item.lowStock ? 'border-destructive/50' : ''}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-foreground">{item.name}</h4>
                  {item.lowStock && (
                    <Badge variant="destructive" className="bg-destructive text-destructive-foreground">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Baixo Estoque
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                  <span>{item.amount} {item.unit}</span>
                  {item.aa && <span>AA: {item.aa}%</span>}
                  {item.temp && <span>Temp: {item.temp}</span>}
                  <span>R$ {item.cost.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" className="border-border hover:bg-muted">
                  Editar
                </Button>
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-accent">
                  + Adicionar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventário</h1>
          <p className="text-muted-foreground">Gerencie seus ingredientes e suprimentos</p>
        </div>
        <Button className="bg-gradient-primary hover:bg-primary-glow text-primary-foreground shadow-brew">
          <Plus className="h-4 w-4 mr-2" />
          Novo Item
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-foam border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-foreground">
              <Package className="h-5 w-5 mr-2 text-accent" />
              Resumo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total de Itens</span>
              <span className="font-semibold text-foreground">{grains.length + hops.length + yeasts.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Baixo Estoque</span>
              <span className="font-semibold text-destructive">
                {[...grains, ...hops, ...yeasts].filter(item => item.lowStock).length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Valor Total</span>
              <span className="font-semibold text-foreground">
                R$ {([...grains, ...hops, ...yeasts].reduce((acc, item) => acc + (item.cost * item.amount), 0)).toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 shadow-foam border-border/50">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar ingredientes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-border"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="grains" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted">
          <TabsTrigger value="grains" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Maltes ({grains.length})
          </TabsTrigger>
          <TabsTrigger value="hops" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Lúpulos ({hops.length})
          </TabsTrigger>
          <TabsTrigger value="yeasts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Leveduras ({yeasts.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="grains" className="mt-6">
          <InventoryTable items={grains} type="grains" />
        </TabsContent>

        <TabsContent value="hops" className="mt-6">
          <InventoryTable items={hops} type="hops" />
        </TabsContent>

        <TabsContent value="yeasts" className="mt-6">
          <InventoryTable items={yeasts} type="yeasts" />
        </TabsContent>
      </Tabs>
    </div>
  );
}