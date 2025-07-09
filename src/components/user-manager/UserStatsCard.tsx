
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface UserStatsCardProps {
  email: string;
  createdAt: string;
  lastSignInAt?: string;
}

const UserStatsCard: React.FC<UserStatsCardProps> = ({
  email,
  createdAt,
  lastSignInAt
}) => {
  return (
    <div>
      <CardTitle className="text-case-white">{email || 'Email não disponível'}</CardTitle>
      <p className="text-case-white/60 text-sm">
        Criado em: {new Date(createdAt).toLocaleDateString('pt-BR')}
      </p>
      {lastSignInAt && (
        <p className="text-case-white/60 text-sm">
          Último login: {new Date(lastSignInAt).toLocaleDateString('pt-BR')}
        </p>
      )}
    </div>
  );
};

export default UserStatsCard;
