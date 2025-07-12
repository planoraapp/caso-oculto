
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface UserStatsCardProps {
  email?: string;
  createdAt?: string;
  lastSignInAt?: string;
  icon?: React.ReactNode;
  title?: string;
  value?: number | string;
  subtitle?: string;
  color?: string;
}

const UserStatsCard: React.FC<UserStatsCardProps> = ({
  email,
  createdAt,
  lastSignInAt,
  icon,
  title,
  value,
  subtitle,
  color
}) => {
  // Se for usado como estatística (com title e value)
  if (title && value !== undefined) {
    return (
      <div className="bg-noir-medium rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-case-white/80 text-sm">{title}</h4>
          {icon && <div className={color}>{icon}</div>}
        </div>
        <div className={`text-2xl font-bold ${color || 'text-case-white'}`}>
          {value}
        </div>
        {subtitle && (
          <p className="text-case-white/60 text-xs mt-1">{subtitle}</p>
        )}
      </div>
    );
  }

  // Se for usado como card de usuário (modo original)
  return (
    <div>
      <CardTitle className="text-case-white">{email || 'Email não disponível'}</CardTitle>
      <p className="text-case-white/60 text-sm">
        Criado em: {new Date(createdAt!).toLocaleDateString('pt-BR')}
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
