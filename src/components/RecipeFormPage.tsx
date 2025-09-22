import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RecipeFormPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    style: "",
    description: "",
    targetAbv: "",
    targetIbu: "",
    targetSrm: "",
    batchSize: "20"
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Aqui seria a lógica para salvar a receita
    console.log("Salvando receita:", formData);
    navigate("/recipes");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/recipes")}
            className="hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Nova Receita</h1>
            <p className="text-muted-foreground">Crie uma nova receita de cerveja</p>
          </div>
        </div>
        <Button 
          onClick={handleSave}
          className="bg-gradient-primary hover:bg-primary-glow text-primary-foreground shadow-brew"
        >
          <Save className="h-4 w-4 mr-2" />
          Salvar Receita
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-foam border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome da Receita</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Ex: IPA Tropical"
                className="border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="style">Estilo</Label>
              <Select onValueChange={(value) => handleInputChange("style", value)}>
                <SelectTrigger className="border-border">
                  <SelectValue placeholder="Selecione o estilo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="american-ipa">American IPA</SelectItem>
                  <SelectItem value="porter">Porter</SelectItem>
                  <SelectItem value="stout">Stout</SelectItem>
                  <SelectItem value="hefeweizen">Hefeweizen</SelectItem>
                  <SelectItem value="pilsner">Pilsner</SelectItem>
                  <SelectItem value="amber-ale">Amber Ale</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Descreva sua receita..."
                className="border-border min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="batchSize">Tamanho do Lote (L)</Label>
              <Input
                id="batchSize"
                type="number"
                value={formData.batchSize}
                onChange={(e) => handleInputChange("batchSize", e.target.value)}
                placeholder="20"
                className="border-border"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-foam border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Especificações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="targetAbv">ABV Alvo (%)</Label>
                <Input
                  id="targetAbv"
                  type="number"
                  step="0.1"
                  value={formData.targetAbv}
                  onChange={(e) => handleInputChange("targetAbv", e.target.value)}
                  placeholder="5.0"
                  className="border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetIbu">IBU Alvo</Label>
                <Input
                  id="targetIbu"
                  type="number"
                  value={formData.targetIbu}
                  onChange={(e) => handleInputChange("targetIbu", e.target.value)}
                  placeholder="30"
                  className="border-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetSrm">SRM Alvo</Label>
                <Input
                  id="targetSrm"
                  type="number"
                  value={formData.targetSrm}
                  onChange={(e) => handleInputChange("targetSrm", e.target.value)}
                  placeholder="8"
                  className="border-border"
                />
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-lg font-semibold text-foreground mb-4">Ingredientes</h3>
              <div className="space-y-4">
                <div className="text-center py-8 text-muted-foreground border-2 border-dashed border-border rounded-lg">
                  <p>Ingredientes serão adicionados em uma próxima versão</p>
                  <p className="text-sm">Por enquanto, use a descrição para listar os ingredientes</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}