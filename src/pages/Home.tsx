
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { t } from '../data/translations';
import Carousel3D from '../components/Carousel3D';
import SiteFooter from '../components/SiteFooter';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-noir-black via-noir-dark to-noir-medium">
      <div className="py-8">
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

          {/* Featured Packs Carousel */}
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-anton text-case-white text-center mb-8">
              Packs em Destaque
            </h2>
            <Carousel3D />
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Link to="/packs">
              <Button
                size="lg"
                className="bg-case-red hover:bg-red-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Conheça Todos os Packs
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <SiteFooter />
    </div>
  );
};

export default Home;
