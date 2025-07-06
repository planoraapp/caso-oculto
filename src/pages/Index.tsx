
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import Carousel3D from '../components/Carousel3D';
import { t } from '../data/translations';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-noir-black via-noir-dark to-noir-medium">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="font-anton text-4xl lg:text-6xl text-case-white mb-6 leading-tight">
            {t('landing.heroTitle')}
          </h1>
          <p className="text-case-white/80 text-lg lg:text-xl mb-12 max-w-2xl mx-auto">
            {t('landing.heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Featured Packs Carousel */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="font-anton text-2xl lg:text-3xl text-case-white text-center mb-12">
            {t('landing.featuredPacks')}
          </h2>
          <Carousel3D />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <Link to="/home">
            <Button
              size="lg"
              className="bg-case-red hover:bg-red-600 text-white font-bold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              {t('landing.knowTheGame')}
            </Button>
          </Link>
        </div>
      </section>

      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-case-red/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-case-red/3 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default Index;
