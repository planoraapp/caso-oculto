
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Navigation from "./components/Navigation";
import SiteFooter from "./components/SiteFooter";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Packs from "./pages/Packs";
import PackView from "./pages/PackView";
import Library from "./pages/Library";
import Account from "./pages/Account";
import AdminPanel from "./pages/AdminPanel";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "./hooks/useAuth";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
});

const AppContent = () => {
  const location = useLocation();
  const { user, loading, signOut, isAdmin } = useAuth();

  const showFooter = ['/', '/packs', '/library', '/terms'].includes(location.pathname);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-case-white text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation user={user} onLogout={signOut} isAdmin={isAdmin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/login" 
          element={
            user ? <Navigate to="/" replace /> : <Login />
          } 
        />
        <Route path="/packs" element={<Packs user={user} />} />
        <Route path="/pack/:id" element={<PackView user={user} />} />
        <Route path="/terms" element={<Terms />} />
        <Route 
          path="/library" 
          element={
            user ? <Library user={user} /> : <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/account" 
          element={
            user ? <Account user={user} onLogout={signOut} /> : <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/admin" 
          element={
            user && isAdmin ? 
            <AdminPanel user={user} /> : 
            <Navigate to="/" replace />
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showFooter && <SiteFooter />}
    </div>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <AppContent />
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
