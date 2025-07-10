
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './hooks/useAuth';
import { Toaster } from './components/ui/toaster';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Packs from './pages/Packs';
import PackView from './pages/PackView';
import Library from './pages/Library';
import Account from './pages/Account';
import Login from './pages/Login';
import Terms from './pages/Terms';
import AdminPanel from './pages/AdminPanel';
import PaymentSuccess from './pages/PaymentSuccess';
import NotFound from './pages/NotFound';
import SiteFooter from './components/SiteFooter';
import ErrorBoundary from './components/ErrorBoundary';
import { useAuth } from './hooks/useAuth';
import './App.css';

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  const { user, loading, signOut, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-case-white">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Navigation user={user} onLogout={signOut} isAdmin={isAdmin} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/packs" element={<Packs user={user} />} />
          <Route path="/pack/:id" element={<PackView user={user} />} />
          <Route path="/library" element={user ? <Library user={user} /> : <Login />} />
          <Route path="/account" element={user ? <Account user={user} onLogout={signOut} /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/admin" element={user && isAdmin ? <AdminPanel user={user} /> : <NotFound />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <SiteFooter />
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <AppContent />
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
