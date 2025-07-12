
import React from 'react';
import { t } from '../data/translations';
import LoadingState from '../components/common/LoadingState';
import EmptyState from '../components/common/EmptyState';
import SiteFooter from '../components/SiteFooter';
import LibraryHeader from '../components/library/LibraryHeader';
import UserPacksGrid from '../components/library/UserPacksGrid';
import { useUserPacks } from '../hooks/useUserPacks';

interface LibraryProps {
  user: any;
}

const Library: React.FC<LibraryProps> = ({ user }) => {
  const { userPacks, loading } = useUserPacks(user);

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
          <LibraryHeader />
          <UserPacksGrid userPacks={userPacks} userId={user.id} />
        </div>
      </div>
      <SiteFooter />
    </div>
  );
};

export default Library;
