
import React from 'react';
import { Progress } from '../ui/progress';
import { CheckCircle } from 'lucide-react';

interface ProgressBarProps {
  progress: number;
  solvedCount: number;
  totalCount: number;
  showLabel?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  solvedCount, 
  totalCount, 
  showLabel = true 
}) => (
  <div className="mb-6">
    {showLabel && (
      <div className="flex items-center gap-2 mb-2">
        <CheckCircle className="h-5 w-5 text-green-400" />
        <span className="text-case-white">
          {solvedCount} de {totalCount} casos resolvidos
        </span>
      </div>
    )}
    <div className="w-full max-w-md bg-gray-700 rounded-full h-2">
      <div 
        className="bg-green-500 h-2 rounded-full transition-all duration-300" 
        style={{ width: `${progress}%` }} 
      />
    </div>
    <p className="text-case-white/60 text-xs mt-1">{progress}% completo</p>
  </div>
);

export default ProgressBar;
