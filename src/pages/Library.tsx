
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { t } from '../data/translations';
import { getPackById } from '../utils/pack/packQueries';
import { supabase } from '../integrations/supabase/client';

interface LibraryProps {
  user: any;
}

const Library: React.FC<LibraryProps> = ({ user }) => {
  const [userPacks, setUserPacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPacks = async () => {
      if (!user?.id) return;

      try {
        // Fetch user pack access from Supabase
        const { data: packAccess, error } = await supabase
          .from('user_pack_access')
          .select('pack_id')
          .eq('user_id', user.id)
          .eq('is_active', true);

        if (error) {
          console.error('Error fetching user packs:', error);
          return;
        }

        // Get the actual pack data for each pack the user has access to
        const userPackData = packAccess
          ?.map(access => getPackById(access.pack_id))
          .filter(Boolean) || [];

        setUserPacks(userPackData);
      } catch (error) {
        console.error('Error fetching user packs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPacks();
  }, [user?.id]);

  const calculatePackProgress = (pack: any) => {
    if (pack.cases.length === 0) return 0;
    const solved = JSON.parse(localStorage.getItem(`solved_${user.id}_${pack.id}`) || '[]');
    const solvedCards = pack.cases.filter((card: any) => solved.includes(card.id));
    return (solvedCards.length / pack.cases.length) * 100;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-case-red mx-auto mb-4"></div>
          <p className="text-case-white">Carregando biblioteca...</p>
        </div>
      </div>
    );
  }

  if (userPacks.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-anton text-3xl text-case-white mb-4">
            {t('library.title')}
          </h1>
          <p className="text-case-white/80 mb-8 max-w-md">
            {t('library.empty')}
          </p>
          <Link to="/packs">
            <Button className="bg-case-red hover:bg-red-600 text-white">
              {t('library.goToShop')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-anton text-3xl lg:text-4xl text-case-white mb-4">
            {t('library.title')}
          </h1>
          <p className="text-case-white/80 text-lg max-w-2xl mx-auto">
            Seus packs adquiridos e progresso de jogo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userPacks.map((pack) => {
            if (!pack) return null;
            
            const progress = calculatePackProgress(pack);
            const solved = JSON.parse(localStorage.getItem(`solved_${user.id}_${pack.id}`) || '[]');
            const solvedCount = pack.cases.filter((card: any) => solved.includes(card.id)).length;
            
            return (
              <Card
                key={pack.id}
                className="bg-noir-dark border-noir-medium overflow-hidden hover:border-case-red transition-all duration-200"
              >
                <Link to={`/pack/${pack.id}`} className="block">
                  <div 
                    className="h-48 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${pack.image})` }}
                  >
                    <div className="absolute inset-0 gradient-overlay" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-anton text-xl text-case-white drop-shadow-lg">
                        {pack.name}
                      </h3>
                    </div>
                  </div>
                </Link>

                <div className="p-6">
                  <p className="text-case-white/80 mb-4 line-clamp-2">
                    {pack.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-case-white font-medium text-sm">
                        {t('library.progress')}
                      </span>
                      <span className="text-case-white text-sm">
                        {solvedCount}/{pack.cases.length}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-case-white/60 text-xs mt-1">
                      {Math.round(progress)}% completo
                    </p>
                  </div>
                  
                  <Link to={`/pack/${pack.id}`}>
                    <Button className="w-full bg-case-red hover:bg-red-600 text-white">
                      Continuar Jogando
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Library;
