import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Beaker, Droplets, Thermometer } from "lucide-react";
import { useState } from "react";

export default function CalculatorsPage() {
  const [abvData, setAbvData] = useState({ og: "", fg: "" });
  const [ibuData, setIbuData] = useState({ hopWeight: "", alphaAcid: "", boilTime: "", volume: "" });
  const [srmData, setSrmData] = useState({ grain1: "", color1: "", grain2: "", color2: "", volume: "" });

  const calculateABV = () => {
    const og = parseFloat(abvData.og);
    const fg = parseFloat(abvData.fg);
    if (og && fg) {
      return ((og - fg) * 131.25).toFixed(2);
    }
    return "0.00";
  };

  const calculateIBU = () => {
    const weight = parseFloat(ibuData.hopWeight);
    const alpha = parseFloat(ibuData.alphaAcid);
    const time = parseFloat(ibuData.boilTime);
    const volume = parseFloat(ibuData.volume);
    
    if (weight && alpha && time && volume) {
      const utilization = time >= 60 ? 0.30 : time * 0.005;
      return ((weight * alpha * utilization * 1000) / volume).toFixed(1);
    }
    return "0.0";
  };

  const calculateSRM = () => {
    const grain1Weight = parseFloat(srmData.grain1);
    const grain1Color = parseFloat(srmData.color1);
    const grain2Weight = parseFloat(srmData.grain2);
    const grain2Color = parseFloat(srmData.color2);
    const volume = parseFloat(srmData.volume);
    
    if (volume) {
      const mcu = ((grain1Weight * grain1Color) + (grain2Weight * grain2Color)) / volume;
      return (1.4922 * Math.pow(mcu, 0.6859)).toFixed(1);
    }
    return "0.0";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Calculadoras</h1>
        <p className="text-muted-foreground">Ferramentas essenciais para cervejeiros</p>
      </div>

      <Tabs defaultValue="abv" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted">
          <TabsTrigger value="abv" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Calculator className="h-4 w-4 mr-2" />
            ABV
          </TabsTrigger>
          <TabsTrigger value="ibu" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Beaker className="h-4 w-4 mr-2" />
            IBU
          </TabsTrigger>
          <TabsTrigger value="srm" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Droplets className="h-4 w-4 mr-2" />
            SRM
          </TabsTrigger>
          <TabsTrigger value="temp" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Thermometer className="h-4 w-4 mr-2" />
            Temp
          </TabsTrigger>
        </TabsList>

        <TabsContent value="abv" className="mt-6">
          <Card className="shadow-foam border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <Calculator className="h-5 w-5 mr-2 text-accent" />
                Calculadora de ABV
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="og">Densidade Inicial (OG)</Label>
                  <Input
                    id="og"
                    placeholder="1.050"
                    value={abvData.og}
                    onChange={(e) => setAbvData({ ...abvData, og: e.target.value })}
                    className="border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fg">Densidade Final (FG)</Label>
                  <Input
                    id="fg"
                    placeholder="1.010"
                    value={abvData.fg}
                    onChange={(e) => setAbvData({ ...abvData, fg: e.target.value })}
                    className="border-border"
                  />
                </div>
              </div>
              <div className="pt-4 text-center">
                <div className="bg-gradient-secondary p-6 rounded-lg">
                  <p className="text-sm text-secondary-foreground mb-2">Teor Alcoólico</p>
                  <p className="text-3xl font-bold text-accent">{calculateABV()}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ibu" className="mt-6">
          <Card className="shadow-foam border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <Beaker className="h-5 w-5 mr-2 text-accent" />
                Calculadora de IBU
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hopWeight">Peso do Lúpulo (g)</Label>
                  <Input
                    id="hopWeight"
                    placeholder="30"
                    value={ibuData.hopWeight}
                    onChange={(e) => setIbuData({ ...ibuData, hopWeight: e.target.value })}
                    className="border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alphaAcid">Ácido Alfa (%)</Label>
                  <Input
                    id="alphaAcid"
                    placeholder="12.5"
                    value={ibuData.alphaAcid}
                    onChange={(e) => setIbuData({ ...ibuData, alphaAcid: e.target.value })}
                    className="border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="boilTime">Tempo de Fervura (min)</Label>
                  <Input
                    id="boilTime"
                    placeholder="60"
                    value={ibuData.boilTime}
                    onChange={(e) => setIbuData({ ...ibuData, boilTime: e.target.value })}
                    className="border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="volume">Volume do Mosto (L)</Label>
                  <Input
                    id="volume"
                    placeholder="20"
                    value={ibuData.volume}
                    onChange={(e) => setIbuData({ ...ibuData, volume: e.target.value })}
                    className="border-border"
                  />
                </div>
              </div>
              <div className="pt-4 text-center">
                <div className="bg-gradient-secondary p-6 rounded-lg">
                  <p className="text-sm text-secondary-foreground mb-2">Amargor</p>
                  <p className="text-3xl font-bold text-accent">{calculateIBU()} IBU</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="srm" className="mt-6">
          <Card className="shadow-foam border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <Droplets className="h-5 w-5 mr-2 text-accent" />
                Calculadora de SRM (Cor)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="grain1">Malte 1 - Peso (kg)</Label>
                  <Input
                    id="grain1"
                    placeholder="4.0"
                    value={srmData.grain1}
                    onChange={(e) => setSrmData({ ...srmData, grain1: e.target.value })}
                    className="border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color1">Malte 1 - Cor (°L)</Label>
                  <Input
                    id="color1"
                    placeholder="2"
                    value={srmData.color1}
                    onChange={(e) => setSrmData({ ...srmData, color1: e.target.value })}
                    className="border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grain2">Malte 2 - Peso (kg)</Label>
                  <Input
                    id="grain2"
                    placeholder="0.5"
                    value={srmData.grain2}
                    onChange={(e) => setSrmData({ ...srmData, grain2: e.target.value })}
                    className="border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color2">Malte 2 - Cor (°L)</Label>
                  <Input
                    id="color2"
                    placeholder="40"
                    value={srmData.color2}
                    onChange={(e) => setSrmData({ ...srmData, color2: e.target.value })}
                    className="border-border"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="volumeSrm">Volume Final (L)</Label>
                  <Input
                    id="volumeSrm"
                    placeholder="20"
                    value={srmData.volume}
                    onChange={(e) => setSrmData({ ...srmData, volume: e.target.value })}
                    className="border-border"
                  />
                </div>
              </div>
              <div className="pt-4 text-center">
                <div className="bg-gradient-secondary p-6 rounded-lg">
                  <p className="text-sm text-secondary-foreground mb-2">Cor da Cerveja</p>
                  <p className="text-3xl font-bold text-accent">{calculateSRM()} SRM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="temp" className="mt-6">
          <Card className="shadow-foam border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <Thermometer className="h-5 w-5 mr-2 text-accent" />
                Conversor de Temperatura
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="celsius">Celsius (°C)</Label>
                  <Input
                    id="celsius"
                    placeholder="20"
                    className="border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fahrenheit">Fahrenheit (°F)</Label>
                  <Input
                    id="fahrenheit"
                    placeholder="68"
                    className="border-border"
                  />
                </div>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                Temperaturas comuns: Fermentação Ale (18-24°C), Lager (7-13°C), Mash (64-68°C)
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}