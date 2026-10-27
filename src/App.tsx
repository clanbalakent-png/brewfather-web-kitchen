import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import RecipesPage from "./components/RecipesPage";
import RecipeFormPage from "./components/RecipeFormPage";
import BatchesPage from "./components/BatchesPage";
import InventoryPage from "./components/InventoryPage";
import CalculatorsPage from "./components/CalculatorsPage";
import ProfilesPage from "./components/ProfilesPage";
import BatchDetailPage from "./components/BatchDetailPage";
import WaterPage from "./components/WaterPage";
import ReportsPage from "./components/ReportsPage";
import SettingsPage from "./components/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Arquivos abertos direto do disco (file://) não têm servidor de rotas:
// usamos HashRouter para que a navegação funcione com dois cliques no index.html.
const Router = typeof window !== "undefined" && window.location.protocol === "file:" ? HashRouter : BrowserRouter;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/recipes/new" element={<RecipeFormPage />} />
            <Route path="/recipes/:id" element={<RecipeFormPage />} />
            <Route path="/batches" element={<BatchesPage />} />
            <Route path="/batches/:id" element={<BatchDetailPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/calculators" element={<CalculatorsPage />} />
            <Route path="/profiles" element={<ProfilesPage />} />
            <Route path="/profiles/:type" element={<ProfilesPage />} />
            <Route path="/water" element={<WaterPage />} />
            <Route path="/fermentation" element={<Navigate to="/profiles/fermentacao" replace />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-foreground">Configurações</h2><p className="text-muted-foreground">Em desenvolvimento</p></div>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
