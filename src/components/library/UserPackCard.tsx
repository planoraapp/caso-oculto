
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import ProgressBar from '../common/ProgressBar';
import { calculatePackProgress, getSolvedCards } from '../../utils/progress';
import { Pack } from '../../data/types';

interface UserPackCardProps {
  pack: Pack;
  userId: string;
}

const UserPackCard: React.FC<UserPackCardProps> = ({ pack, userId }) => {
  const solved = getSolvedCards(userId, pack.id);
  const cases = pack.cases || [];
  const { progress, solvedCount } = calculatePackProgress(cases, solved);

  return (
    <Card className="bg-noir-dark border-noir-medium overflow-hidden hover:border-case-red transition-all duration-200">
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
};

export default UserPackCard;
