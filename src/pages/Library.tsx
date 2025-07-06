
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { t } from '../data/translations';
import { getUserPacks, getPackById, getUserProgress } from '../data/packs';

interface LibraryProps {
  user: any;
}

const Library: React.FC<LibraryProps> = ({ user }) => {
  const userPackIds = getUserPacks(user.id);
  const userPacks = userPackIds.map(id => getPackById(id)).filter(Boolean);

  const calculatePackProgress = (pack: any) => {
    if (pack.cards.length === 0) return 0;
    const solvedCards = pack.cards.filter((card: any) => getUserProgress(user.id, card.id));
    return (solvedCards.length / pack.cards.length) * 100;
  };

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
            const solvedCount = pack.cards.filter((card: any) => getUserProgress(user.id, card.id)).length;
            
            return (
              <Card
                key={pack.id}
                className="bg-noir-dark border-noir-medium overflow-hidden hover:border-case-red transition-all duration-200"
              >
                <Link to={`/pack/${pack.id}`} className="block">
                  <div 
                    className="h-48 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${pack.coverUrl})` }}
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
                        {solvedCount}/{pack.cards.length}
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
