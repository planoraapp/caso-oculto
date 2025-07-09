
import React, { useState, useEffect } from 'react';
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
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    try {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      }
    } catch (error) {
      localStorage.removeItem('currentUser');
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    try {
      localStorage.setItem('currentUser', JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const showFooter = ['/', '/packs', '/library', '/terms'].includes(location.pathname);
  const isAdmin = user?.email === 'conectawebapps@outlook.com' || user?.isAdmin;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-case-white text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/login" 
          element={
            user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
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
            user ? <Account user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />
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
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
