
import React from 'react';
import UserPackCard from './UserPackCard';
import { Pack } from '../../data/types';

interface UserPacksGridProps {
  userPacks: Pack[];
  userId: string;
}

const UserPacksGrid: React.FC<UserPacksGridProps> = ({ userPacks, userId }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {userPacks.map((pack) => {
        if (!pack) return null;
        
        return (
          <UserPackCard
            key={pack.id}
            pack={pack}
            userId={userId}
          />
        );
      })}
    </div>
  );
};

export default UserPacksGrid;
