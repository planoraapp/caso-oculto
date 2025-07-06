
import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { t } from '../data/translations';
import { packs } from '../data/packs';

const Home: React.FC = () => {
  const freePack = packs.find(pack => pack.isFree);

  return (
    <div className="min-h-screen bg-gradient-to-br from-noir-black via-noir-dark to-noir-medium py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-anton text-3xl lg:text-4xl text-case-white mb-4">
            {t('home.title')}
          </h1>
          <p className="text-case-white/80 text-lg lg:text-xl max-w-2xl mx-auto">
            {t('home.subtitle')}
          </p>
        </div>

        {/* Game Rules */}
        <Card className="bg-noir-dark border-noir-medium mb-12 p-6 lg:p-8">
          <h2 className="font-anton text-2xl text-case-red mb-6">
            {t('home.rules.title')}
          </h2>
          <div className="grid gap-4">
            <div className="flex items-start space-x-4">
              <div className="bg-case-red text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                1
              </div>
              <p className="text-case-white">{t('home.rules.rule1')}</p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-case-red text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                2
              </div>
              <p className="text-case-white">{t('home.rules.rule2')}</p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-case-red text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                3
              </div>
              <p className="text-case-white">{t('home.rules.rule3')}</p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-case-red text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                4
              </div>
              <p className="text-case-white">{t('home.rules.rule4')}</p>
            </div>
          </div>
        </Card>

        {/* Free Pack Highlight */}
        {freePack && (
          <Card className="bg-gradient-to-r from-noir-dark to-noir-medium border-case-red p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row items-center space-y-6 lg:space-y-0 lg:space-x-8">
              <div className="w-32 h-40 lg:w-40 lg:h-48 rounded-lg bg-cover bg-center flex-shrink-0 border-2 border-case-red"
                   style={{ backgroundImage: `url(${freePack.coverUrl})` }}>
                <div className="w-full h-full gradient-overlay rounded-lg flex items-end p-4">
                  <h3 className="font-anton text-lg text-case-white">
                    {freePack.name}
                  </h3>
                </div>
              </div>
              
              <div className="flex-1 text-center lg:text-left">
                <h2 className="font-anton text-2xl lg:text-3xl text-case-red mb-4">
                  {t('home.freePack.title')}
                </h2>
                <p className="text-case-white/80 mb-6 text-lg">
                  {t('home.freePack.description')}
                </p>
                <Link to={`/pack/${freePack.id}`}>
                  <Button
                    size="lg"
                    className="bg-case-red hover:bg-red-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    {t('home.freePack.button')}
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Home;
