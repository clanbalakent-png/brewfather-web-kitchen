import {
  Home,
  FileText,
  Calculator,
  Package,
  BarChart3,
  Settings,
  Beaker,
  Layers,
  FlaskConical,
  Thermometer,
  Droplets,
  Wrench,
  CookingPot,
  BookOpen,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useSettings } from "@/lib/settings";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Receitas", url: "/recipes", icon: FileText },
  { title: "Lotes", url: "/batches", icon: Beaker },
  { title: "Inventário", url: "/inventory", icon: Package },
];

const toolsItems = [
  { title: "Calculadoras", url: "/calculators", icon: Calculator },
  { title: "Química da Água", url: "/water", icon: Droplets },
  { title: "Relatórios", url: "/reports", icon: BarChart3 },
];

const profileItems = [
  { title: "Equipamento", url: "/profiles/equipamento", icon: Wrench },
  { title: "Mostura", url: "/profiles/mostura", icon: CookingPot },
  { title: "Fermentação", url: "/profiles/fermentacao", icon: Thermometer },
  { title: "Água", url: "/profiles/agua", icon: Droplets },
  { title: "Estilos Personalizados", url: "/profiles/estilos", icon: BookOpen },
];

export function AppSidebar() {
  const location = useLocation();
  const [settings] = useSettings();

  const getNavClassName = (path: string) => {
    const isActive = location.pathname === path;
    return isActive
      ? "bg-primary text-primary-foreground font-medium shadow-brew"
      : "hover:bg-muted text-muted-foreground hover:text-foreground";
  };

  const profilesActive = location.pathname.startsWith("/profiles");

  return (
    <Sidebar className="border-r border-border bg-card">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-accent font-medium">Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.filter(item => item.url !== "/inventory" || settings.inventory).map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={getNavClassName(item.url)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-accent font-medium">Ferramentas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {toolsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={getNavClassName(item.url)}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={profilesActive}>
                  <NavLink to="/profiles/equipamento" className={profilesActive ? "bg-primary text-primary-foreground font-medium shadow-brew" : "hover:bg-muted text-muted-foreground hover:text-foreground"}>
                    <Layers className="h-4 w-4" />
                    <span>Perfis</span>
                  </NavLink>
                </SidebarMenuButton>
                {profilesActive && (
                  <SidebarMenuSub>
                    {profileItems.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={location.pathname === item.url}>
                          <NavLink to={item.url}>
                            <item.icon className="h-3.5 w-3.5" />
                            <span>{item.title}</span>
                          </NavLink>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/settings"
                    className={getNavClassName("/settings")}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Configurações</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
