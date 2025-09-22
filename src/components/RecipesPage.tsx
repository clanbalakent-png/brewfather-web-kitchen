import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Star, Clock, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RecipesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const recipes = [
    {
      id: 1,
      name: "IPA Tropical",
      style: "American IPA",
      abv: 6.2,
      ibu: 65,
      srm: 6,
      rating: 4.5,
      brews: 3,
      lastBrewed: "2024-01-15"
    },
    {
      id: 2,
      name: "Porter Chocolate",
      style: "Robust Porter",
      abv: 5.8,
      ibu: 35,
      srm: 35,
      rating: 4.8,
      brews: 5,
      lastBrewed: "2024-01-10"
    },
    {
      id: 3,
      name: "Wheat Alemã",
      style: "Hefeweizen",
      abv: 5.0,
      ibu: 12,
      srm: 4,
      rating: 4.2,
      brews: 2,
      lastBrewed: "2024-01-20"
    }
  ];

  const filteredRecipes = recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.style.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Receitas</h1>
          <p className="text-muted-foreground">Gerencie suas receitas de cerveja</p>
        </div>
        <Button 
          onClick={() => navigate("/recipes/new")}
          className="bg-gradient-primary hover:bg-primary-glow text-primary-foreground shadow-brew"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Receita
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar receitas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-border"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe) => (
          <Card key={recipe.id} className="shadow-foam border-border/50 hover:shadow-brew transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg text-foreground">{recipe.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{recipe.style}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">ABV</p>
                  <p className="font-semibold text-accent">{recipe.abv}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">IBU</p>
                  <p className="font-semibold text-accent">{recipe.ibu}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">SRM</p>
                  <p className="font-semibold text-accent">{recipe.srm}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{recipe.rating}</span>
                </div>
                <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                  {recipe.brews} lotes
                </Badge>
              </div>

              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-4 w-4 mr-1" />
                Última vez: {new Date(recipe.lastBrewed).toLocaleDateString('pt-BR')}
              </div>

              <div className="flex space-x-2 pt-2">
                <Button size="sm" className="flex-1 bg-primary text-primary-foreground hover:bg-accent">
                  Brassar
                </Button>
                <Button size="sm" variant="outline" className="flex-1 border-border hover:bg-muted">
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}