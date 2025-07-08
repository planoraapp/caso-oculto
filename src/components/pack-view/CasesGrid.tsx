
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
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h2 className="text-2xl font-anton text-case-white mb-6">
          Casos do Pack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cases.map((caseData) => (
            <div
              key={caseData.id}
              className="relative group cursor-pointer rounded-lg overflow-hidden bg-gray-800 hover:scale-105 transition-transform duration-300"
              onClick={() => onCardClick(caseData)}
            >
              {/* Case Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={caseData.image}
                  alt={caseData.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay for locked cases */}
                {!caseData.isFree && !hasAccess && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-case-red flex items-center justify-center">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-sm font-medium">Bloqueado</p>
                    </div>
                  </div>
                )}

                {/* Solved indicator */}
                {user && solvedCards.includes(caseData.id) && (
                  <div className="absolute top-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Case information - positioned at bottom left */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-lg font-bold mb-1">
                    {caseData.title}
                  </h3>
                  <p className="text-white/80 text-sm line-clamp-2">
                    {caseData.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CasesGrid;
