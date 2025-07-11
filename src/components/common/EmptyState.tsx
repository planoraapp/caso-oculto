
import React from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  actionPath?: string;
  icon?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  title, 
  description, 
  actionText, 
  actionPath,
  icon 
}) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      {icon && <div className="mb-4">{icon}</div>}
      <h1 className="font-anton text-3xl text-case-white mb-4">{title}</h1>
      <p className="text-case-white/80 mb-8 max-w-md">{description}</p>
      {actionText && actionPath && (
        <Link to={actionPath}>
          <Button className="bg-case-red hover:bg-red-600 text-white">
            {actionText}
          </Button>
        </Link>
      )}
    </div>
  </div>
);

export default EmptyState;
