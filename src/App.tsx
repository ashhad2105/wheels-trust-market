
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import CarsBuy from "./pages/CarsBuy";
import CarsSell from "./pages/CarsSell";
import CarDetails from "./pages/CarDetails";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import AdminDashboard from "./pages/AdminDashboard";
import ServiceProviderDashboard from "./pages/ServiceProviderDashboard";
import NotFound from "./pages/NotFound";
import ChatSystem from "./components/chat/ChatSystem";
import AuthModal from "@/components/auth/AuthModal";

const queryClient = new QueryClient();

// This wrapper component will provide navigation functionality to child components that need it
const AppContent = () => {
  const navigate = useNavigate();
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/cars/buy" element={<CarsBuy />} />
        <Route path="/cars/sell" element={<CarsSell />} />
        <Route path="/cars/details/:id" element={<CarDetails />} />
        {/* Redirect /cars to /cars/buy */}
        <Route path="/cars" element={<Navigate to="/cars/buy" replace />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
        <Route path="/service-provider-dashboard/*" element={<ServiceProviderDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ChatSystem minimized={true} />
      <AuthModal />
    </AuthProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
