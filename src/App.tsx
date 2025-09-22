import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import RecipesPage from "./components/RecipesPage";
import RecipeFormPage from "./components/RecipeFormPage";
import BatchesPage from "./components/BatchesPage";
import InventoryPage from "./components/InventoryPage";
import CalculatorsPage from "./components/CalculatorsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/recipes/new" element={<RecipeFormPage />} />
            <Route path="/batches" element={<BatchesPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/calculators" element={<CalculatorsPage />} />
            {/* Placeholder routes for other features */}
            <Route path="/water" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-foreground">Perfis de Água</h2><p className="text-muted-foreground">Em desenvolvimento</p></div>} />
            <Route path="/fermentation" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-foreground">Fermentação</h2><p className="text-muted-foreground">Em desenvolvimento</p></div>} />
            <Route path="/reports" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-foreground">Relatórios</h2><p className="text-muted-foreground">Em desenvolvimento</p></div>} />
            <Route path="/settings" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-foreground">Configurações</h2><p className="text-muted-foreground">Em desenvolvimento</p></div>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
