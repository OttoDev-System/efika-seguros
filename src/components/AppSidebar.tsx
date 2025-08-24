// AppSidebar Component - Fixed lucide-react imports
import { NavLink, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  FileText, 
  Briefcase, 
  UserCheck, 
  Calculator, 
  PiggyBank,
  Ticket,
  BookOpen,
  Shield
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar
} from "@/components/ui/sidebar";

const AppSidebar = () => {
  const { user } = useAuth();
  const { state } = useSidebar();
  const location = useLocation();
  
  const collapsed = state === "collapsed";
  
  if (!user) return null;

  // Configuração de navegação por role
  const navigationItems = {
    admin: [
      { title: "Dashboard", url: "/admin/dashboard", icon: BarChart3 },
      { title: "Equipe", url: "/admin/equipe", icon: Users },
      { title: "Financeiro", url: "/admin/financeiro", icon: DollarSign },
      { title: "Relatórios", url: "/admin/relatorios", icon: FileText },
    ],
    corretor: [
      { title: "Meu Pipeline", url: "/corretor/pipeline", icon: Briefcase },
      { title: "Clientes", url: "/corretor/clientes", icon: UserCheck },
      { title: "Cotações", url: "/corretor/cotacoes", icon: Calculator },
      { title: "Comissões", url: "/corretor/comissoes", icon: PiggyBank },
    ],
    suporte: [
      { title: "Tickets", url: "/suporte/tickets", icon: Ticket },
      { title: "Contratos", url: "/suporte/contratos", icon: FileText },
      { title: "Base de Conhecimento", url: "/suporte/base-conhecimento", icon: BookOpen },
    ]
  };

  const items = navigationItems[user.role] || [];

  const isActive = (path: string) => location.pathname === path;

  const getNavClassName = (isActive: boolean) => 
    isActive 
      ? "bg-primary text-white font-medium" 
      : "hover:bg-muted/50 text-gray-700";

  return (
    <Sidebar collapsible="icon">
      {/* Header da Sidebar */}
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-primary">EFIKA</h2>
              <p className="text-xs text-muted-foreground">Corretora</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Navegação Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={({ isActive }) => getNavClassName(isActive)}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export { AppSidebar };