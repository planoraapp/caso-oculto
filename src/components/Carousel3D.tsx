
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { packs } from '../data/packs';

const Carousel3D: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredPacks = packs.slice(0, 6); // Show first 6 packs

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredPacks.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredPacks.length) % featuredPacks.length);
  };

  const getCardStyle = (index: number) => {
    const diff = index - currentIndex;
    const isActive = diff === 0;
    const isNext = diff === 1 || (diff === -(featuredPacks.length - 1));
    const isPrev = diff === -1 || (diff === featuredPacks.length - 1);

    if (isActive) {
      return {
        transform: 'translateX(0) scale(1) rotateY(0deg)',
        zIndex: 3,
        opacity: 1
      };
    } else if (isNext) {
      return {
        transform: 'translateX(120%) scale(0.8) rotateY(-25deg)',
        zIndex: 2,
        opacity: 0.7
      };
    } else if (isPrev) {
      return {
        transform: 'translateX(-120%) scale(0.8) rotateY(25deg)',
        zIndex: 2,
        opacity: 0.7
      };
    } else {
      return {
        transform: 'translateX(0) scale(0.6) rotateY(0deg)',
        zIndex: 1,
        opacity: 0.3
      };
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4">
      <div className="relative h-80 lg:h-96 flex items-center justify-center perspective-1000">
        {featuredPacks.map((pack, index) => (
          <Card
            key={pack.id}
            className="absolute w-64 h-80 transition-all duration-700 ease-in-out cursor-pointer overflow-hidden bg-cover bg-center border-2 border-noir-medium hover:border-case-red"
            style={{
              ...getCardStyle(index),
              backgroundImage: `url(${pack.coverUrl})`,
            }}
            onClick={() => setCurrentIndex(index)}
          >
            <div className="absolute inset-0 gradient-overlay" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="font-anton text-xl lg:text-2xl text-case-white drop-shadow-lg">
                {pack.name}
              </h3>
              <p className="text-case-white/80 text-sm mt-1 drop-shadow">
                {pack.isFree ? 'Grátis' : `€${pack.price.toFixed(2)}`}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Navigation buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-noir-dark/80 border-case-red text-case-red hover:bg-case-red hover:text-white backdrop-blur-sm"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-noir-dark/80 border-case-red text-case-red hover:bg-case-red hover:text-white backdrop-blur-sm"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {featuredPacks.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex ? 'bg-case-red' : 'bg-noir-medium hover:bg-noir-light'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel3D;
