
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Play, Star, Users, Trophy } from 'lucide-react';
import { t } from '../data/translations';
import Carousel3D from '../components/Carousel3D';
import SiteFooter from '../components/SiteFooter';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-noir-black via-noir-dark to-noir-medium">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-anton text-4xl md:text-6xl lg:text-7xl text-case-white mb-6 leading-tight">
              Prepare-se para horas de
              <span className="block text-case-red">MISTÉRIO</span>
            </h1>
            
            <p className="text-case-white/90 text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Mergulhe em casos enigmáticos que desafiarão sua mente. Cada pack contém mistérios únicos que vão testar sua capacidade de dedução.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/packs">
                <Button
                  size="lg"
                  className="bg-case-red hover:bg-red-600 text-white font-bold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
                >
                  <Play className="h-6 w-6" />
                  Conheça o Jogo
                </Button>
              </Link>
              
              <Link to="/library">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-case-white text-case-white hover:bg-case-white hover:text-noir-dark font-bold px-8 py-4 text-lg rounded-xl transition-all duration-300"
                >
                  Minha Biblioteca
                </Button>
              </Link>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <Trophy className="h-8 w-8 text-case-red mr-2" />
                  <span className="text-3xl font-bold text-case-white">140+</span>
                </div>
                <p className="text-case-white/80">Casos Únicos</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <Star className="h-8 w-8 text-case-red mr-2" />
                  <span className="text-3xl font-bold text-case-white">7</span>
                </div>
                <p className="text-case-white/80">Packs Temáticos</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <Users className="h-8 w-8 text-case-red mr-2" />
                  <span className="text-3xl font-bold text-case-white">1000+</span>
                </div>
                <p className="text-case-white/80">Jogadores Ativos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Packs Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-anton text-case-white mb-4">
              Packs em Destaque
            </h2>
            <p className="text-case-white/80 text-lg md:text-xl max-w-2xl mx-auto">
              Explore nossos mistérios mais desafiadores e populares
            </p>
          </div>
          
          <Carousel3D />
          
          <div className="text-center mt-12">
            <Link to="/packs">
              <Button
                size="lg"
                className="bg-case-red hover:bg-red-600 text-white font-bold px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Ver Todos os Packs
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
