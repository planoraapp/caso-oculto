
import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';

export const useAffiliate = () => {
  const [affiliateCode, setAffiliateCode] = useState<string | null>(null);

  useEffect(() => {
    // Verificar se há código de afiliado na URL
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    
    if (refCode) {
      setAffiliateCode(refCode);
      // Salvar no localStorage para persistir durante a sessão
      localStorage.setItem('affiliate_code', refCode);
      
      // Registrar visita do afiliado
      trackAffiliateVisit(refCode);
    } else {
      // Verificar se há código salvo no localStorage
      const savedCode = localStorage.getItem('affiliate_code');
      if (savedCode) {
        setAffiliateCode(savedCode);
      }
    }
  }, []);

  const trackAffiliateVisit = async (code: string) => {
    try {
      await supabase.rpc('track_affiliate_visit', { affiliate_code: code });
    } catch (error) {
      console.error('Error tracking affiliate visit:', error);
    }
  };

  const clearAffiliateCode = () => {
    setAffiliateCode(null);
    localStorage.removeItem('affiliate_code');
  };

  return {
    affiliateCode,
    clearAffiliateCode
  };
};
