
import React from 'react';
import CaseCard from '../CaseCard';

interface Case {
  id: string;
  isFree?: boolean;
}

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
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h2 className="text-2xl font-anton text-case-white mb-6">
          Casos do Pack
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
