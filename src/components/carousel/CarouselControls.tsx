
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  isLoading?: boolean;
}

const CarouselControls: React.FC<CarouselControlsProps> = ({
  onPrevious,
  onNext,
  isLoading = false
}) => {
  return (
    <div className="flex justify-center space-x-6 mb-6 md:mb-8 px-4">
      <button 
        onClick={onPrevious}
        disabled={isLoading}
        className="bg-white text-black p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-20"
        aria-label="Pack anterior"
      >
        <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
      </button>
      <button 
        onClick={onNext}
        disabled={isLoading}
        className="bg-white text-black p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed z-20"
        aria-label="Próximo pack"
      >
        <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
      </button>
    </div>
  );
};

export default CarouselControls;
