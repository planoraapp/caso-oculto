
import React from 'react';
import { t } from '../../data/translations';

const LibraryHeader: React.FC = () => {
  return (
    <div className="text-center mb-12">
      <h1 className="font-anton text-3xl lg:text-4xl text-case-white mb-4">
        {t('library.title')}
      </h1>
      <p className="text-case-white/80 text-lg max-w-2xl mx-auto">
        Seus packs adquiridos e progresso de jogo
      </p>
    </div>
  );
};

export default LibraryHeader;
