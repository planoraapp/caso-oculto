import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { t } from '../data/translations';
import { supabase } from '../integrations/supabase/client';
import { calculatePackProgress, getSolvedCards } from '../utils/progress';
import LoadingState from '../components/common/LoadingState';
import EmptyState from '../components/common/EmptyState';
import ProgressBar from '../components/common/ProgressBar';
import SiteFooter from '../components/SiteFooter';

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
        console.log('Fetching user packs for user:', user.id);

        // First check if user has complete access
        const { data: profile } = await supabase
          .from('profiles')
          .select('acesso_total')
          .eq('id', user.id)
          .single();

        console.log('User profile:', profile);

        if (profile?.acesso_total) {
          // User has complete access - fetch all packs
          console.log('User has complete access - fetching all packs');
          const { data: allPacks } = await supabase
            .from('packs')
            .select('*')
            .order('created_at', { ascending: false });

          const userPackData = (allPacks || [])
            .map(pack => {
              if (pack && typeof pack === 'object') {
                return {
                  id: pack.id,
                  name: pack.name,
                  description: pack.description,
                  image: pack.image,
                  price: pack.price,
                  difficulty: pack.difficulty,
                  category: pack.category,
                  created_at: pack.created_at,
                  updated_at: pack.updated_at,
                  cases: pack.cases,
                  owned: true
                };
              }
              return null;
            })
            .filter(Boolean);

          console.log('All packs for complete access user:', userPackData);
          setUserPacks(userPackData);
        } else {
          // Fetch specific packs using user_pack_access as primary source
          console.log('Fetching specific packs from user_pack_access');
          
          const { data: packAccess, error } = await supabase
            .from('user_pack_access')
            .select(`
              pack_id,
              packs!inner(*)
            `)
            .eq('user_id', user.id)
            .eq('is_active', true);

          console.log('Pack access data:', packAccess, 'Error:', error);

          if (error) {
            console.error('Error fetching user packs:', error);
            return;
          }

          const userPackData = (packAccess || [])
            .map(access => {
              if (access.packs && typeof access.packs === 'object') {
                const pack = access.packs;
                return { 
                  id: pack.id,
                  name: pack.name,
                  description: pack.description,
                  image: pack.image,
                  price: pack.price,
                  difficulty: pack.difficulty,
                  category: pack.category,
                  created_at: pack.created_at,
                  updated_at: pack.updated_at,
                  cases: pack.cases,
                  owned: true 
                };
              }
              return null;
            })
            .filter(Boolean);

          console.log('User specific packs:', userPackData);
          setUserPacks(userPackData);
        }
      } catch (error) {
        console.error('Error fetching user packs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPacks();
  }, [user?.id]);

  if (loading) {
    return <LoadingState message="Carregando biblioteca..." />;
  }

  if (userPacks.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <div className="flex-1">
          <EmptyState
            title={t('library.title')}
            description={t('library.empty')}
            actionText={t('library.goToShop')}
            actionPath="/packs"
          />
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="py-8 flex-1">
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
              
              const solved = getSolvedCards(user.id, pack.id);
              const cases = pack.cases || [];
              const { progress, solvedCount } = calculatePackProgress(cases, solved);
              
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
                    
                    <ProgressBar
                      progress={progress}
                      solvedCount={solvedCount}
                      totalCount={cases.length}
                    />
                    
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

      <SiteFooter />
    </div>
  );
};

export default Library;
