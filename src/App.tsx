
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/toaster';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Packs from './pages/Packs';
import PackView from './pages/PackView';
import Library from './pages/Library';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import { AuthProvider } from './hooks/useAuth';
import { useAffiliate } from './hooks/useAffiliate';
import './App.css';

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  const { affiliateCode } = useAffiliate();

  useEffect(() => {
    // Log affiliate tracking for debugging
    if (affiliateCode) {
      console.log('Affiliate code detected:', affiliateCode);
    }
  }, [affiliateCode]);

  return (
    <div className="min-h-screen bg-gray-900">
      <AuthProvider>
        <Router>
          <Navigation user={null} onLogout={() => {}} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/packs" element={<Packs user={null} />} />
            <Route path="/pack/:id" element={<PackView user={null} />} />
            <Route path="/biblioteca" element={<Library user={null} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminPanel user={null} />} />
          </Routes>
        </Router>
      </AuthProvider>
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
