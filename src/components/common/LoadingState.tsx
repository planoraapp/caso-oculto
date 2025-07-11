
import React from 'react';
import LoadingSpinner from '../LoadingSpinner';

interface LoadingStateProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = 'Carregando...', 
  size = 'lg' 
}) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <LoadingSpinner size={size} />
      <p className="text-case-white mt-4">{message}</p>
    </div>
  </div>
);

export default LoadingState;
