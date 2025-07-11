
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';
import Carousel3D from '../components/Carousel3D';
import SiteFooter from '../components/SiteFooter';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Hero Section with fade-in - Moved up */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, ease: "easeOut" }} 
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
      >
        <div className="container mx-auto relative z-20 px-0">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-anton text-4xl md:text-6xl lg:text-7xl text-case-white mb-6 leading-tight">
              Prepare-se para horas de
              <span className="block text-case-red">diversão e mistérios</span>
            </h1>
            
            <p className="text-case-white/90 text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Mergulhe em casos enigmáticos que desafiarão sua mente. Cada pack contém mistérios únicos que vão testar sua capacidade de dedução.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link to="/packs">
                <Button size="lg" className="bg-case-red hover:bg-red-600 text-white font-bold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3">
                  <Play className="h-6 w-6" />
                  Conheça o Jogo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Featured Packs Section with reduced top spacing */}
      <motion.div 
        className="py-4" 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-anton text-case-white mb-4">
              Packs em Destaque
            </h2>
            <p className="text-case-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-6 md:mb-8">
              Explore nossos mistérios mais desafiadores e populares
            </p>
          </div>
          
          <Carousel3D />
          
          <div className="text-center mt-8">
            <Link to="/packs">
              <Button size="lg" className="bg-case-red hover:bg-red-600 text-white font-bold px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                Ver Todos os Packs
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      <SiteFooter />
    </div>
  );
};

export default Home;
