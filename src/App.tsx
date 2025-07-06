
import React, { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import SiteFooter from "./components/SiteFooter";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Packs from "./pages/Packs";
import PackView from "./pages/PackView";
import Library from "./pages/Library";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const showFooter = ['/', '/home', '/packs', '/library'].includes(location.pathname);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-case-white text-xl">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Navigation user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route 
          path="/login" 
          element={
            user ? <Navigate to="/home" replace /> : <Login onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/home" 
          element={
            user ? <Home /> : <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/packs" 
          element={
            user ? <Packs user={user} /> : <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/pack/:id" 
          element={
            user ? <PackView user={user} /> : <Navigate to="/login" replace />
          } 
        />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showFooter && <SiteFooter />}
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
