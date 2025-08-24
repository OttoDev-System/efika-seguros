
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import FireCatProject from "./pages/FireCatProject";
import SportRetailProject from "./pages/SportRetailProject";
import WorkwearProject from "./pages/WorkwearProject";
import HockeyProject from "./pages/HockeyProject";
import PetProject from "./pages/PetProject";
import TechDetails from "./pages/TechDetails";
import DevelopmentProcess from "./pages/DevelopmentProcess";
import About from "./pages/About";
import Careers from "./pages/Careers";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Blog from "./pages/Blog";
import BlogPostDetail from "./pages/BlogPostDetail";
import DashboardLayout from "./components/DashboardLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminEquipe from "./pages/admin/Equipe";
import CorretorPipeline from "./pages/corretor/Pipeline";
import SuporteTickets from "./pages/suporte/Tickets";

// Componente para redirecionamento baseado no role do usuário
const DashboardRedirect = () => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  
  const dashboardRoutes = {
    admin: '/admin/dashboard',
    corretor: '/corretor/pipeline', 
    suporte: '/suporte/tickets'
  };
  
  return <Navigate to={dashboardRoutes[user.role]} replace />;
};

// Componente para verificar se usuário está logado na landing page
const IndexWithRedirect = () => {
  const { isAuthenticated, user } = useAuth();
  
  if (isAuthenticated && user) {
    return <DashboardRedirect />;
  }
  
  return <Index />;
};

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<IndexWithRedirect />} />
            <Route path="/login" element={<Login />} />
            <Route path="/projects/firecat" element={<FireCatProject />} />
            <Route path="/projects/sport-retail" element={<SportRetailProject />} />
            <Route path="/projects/workwear" element={<WorkwearProject />} />
            <Route path="/projects/hockey" element={<HockeyProject />} />
            <Route path="/projects/pet-tracker" element={<PetProject />} />
            <Route path="/tech-details" element={<TechDetails />} />
            <Route path="/development-process" element={<DevelopmentProcess />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPostDetail />} />
            
            {/* Rotas Protegidas - Dashboard */}
            <Route path="/admin" element={<DashboardLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="equipe" element={<AdminEquipe />} />
            </Route>
            
            <Route path="/corretor" element={<DashboardLayout />}>
              <Route path="pipeline" element={<CorretorPipeline />} />
            </Route>
            
            <Route path="/suporte" element={<DashboardLayout />}>
              <Route path="tickets" element={<SuporteTickets />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
