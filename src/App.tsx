
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/toaster';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Packs from './pages/Packs';
import PackView from './pages/PackView';
import Library from './pages/Library';
import Login from './pages/Login';
import Terms from './pages/Terms';
import AdminPanel from './pages/AdminPanel';
import Account from './pages/Account';
import EmailConfirmed from './pages/EmailConfirmed';
import NotFound from './pages/NotFound';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { useAffiliate } from './hooks/useAffiliate';
import './App.css';

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  const { user, signOut } = useAuth();
  const { affiliateCode } = useAffiliate();

  useEffect(() => {
    // Log affiliate tracking for debugging
    if (affiliateCode) {
      console.log('Affiliate code detected:', affiliateCode);
    }
  }, [affiliateCode]);

  return (
    <div className="min-h-screen bg-gray-900">
      <Router>
        <Navigation user={user} onLogout={signOut} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/packs" element={<Packs user={user} />} />
          <Route path="/pack/:id" element={<PackView user={user} />} />
          <Route path="/biblioteca" element={<Navigate to="/library" replace />} />
          <Route path="/library" element={<Library user={user} />} />
          <Route path="/account" element={<Account user={user} onLogout={signOut} />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminPanel user={user} />} />
          <Route path="/email-confirmed" element={<EmailConfirmed />} />
          {/* Rota 404 como fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
