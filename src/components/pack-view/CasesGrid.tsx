
import React from 'react';
import CaseCard from '../CaseCard';
import { Case } from '../../data/types';

interface CasesGridProps {
  cases: Case[];
  hasAccess: boolean;
  solvedCards: string[];
  user: any;
  onCardClick: (caseData: Case) => void;
}

const CasesGrid: React.FC<CasesGridProps> = ({
  cases,
  hasAccess,
  solvedCards,
  user,
  onCardClick
}) => {
  console.log(`CasesGrid received ${cases.length} cases`);
  
  if (!cases || cases.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-anton text-case-white mb-6">
            Casos do Pack
          </h2>
          <div className="text-center py-12">
            <p className="text-case-white/60 text-lg">
              Nenhum caso encontrado para este pack.
            </p>
            <p className="text-case-white/40 text-sm mt-2">
              Os casos podem estar sendo carregados ou não foram configurados corretamente.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h2 className="text-2xl font-anton text-case-white mb-6">
          Casos do Pack ({cases.length} casos)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cases.map((caseData) => (
            <CaseCard
              key={caseData.id}
              case={caseData}
              isLocked={!caseData.isFree && !hasAccess}
              isSolved={user && solvedCards.includes(caseData.id)}
              onClick={() => onCardClick(caseData)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CasesGrid;
