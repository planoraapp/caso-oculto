
import React from 'react';
import { t } from '../data/translations';
import LoadingState from '../components/common/LoadingState';
import EmptyState from '../components/common/EmptyState';
import SiteFooter from '../components/SiteFooter';
import LibraryHeader from '../components/library/LibraryHeader';
import UserPacksGrid from '../components/library/UserPacksGrid';
import LibraryDebugPanel from '../components/debug/LibraryDebugPanel';
import { useUserPacks } from '../hooks/useUserPacks';

interface LibraryProps {
  user: any;
}

const Library: React.FC<LibraryProps> = ({ user }) => {
  const { userPacks, loading, error } = useUserPacks(user);

  if (loading) {
    return <LoadingState message="Carregando biblioteca..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold text-case-white mb-4">Erro ao carregar biblioteca</h2>
            <p className="text-case-white/80 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-case-red hover:bg-red-600 text-white px-6 py-2 rounded"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
        <SiteFooter />
        <LibraryDebugPanel user={user} />
      </div>
    );
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
        <LibraryDebugPanel user={user} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="py-8 flex-1">
        <div className="container mx-auto px-4">
          <LibraryHeader />
          <UserPacksGrid userPacks={userPacks} userId={user.id} />
        </div>
      </div>
      <SiteFooter />
      <LibraryDebugPanel user={user} />
    </div>
  );
};

export default Library;
