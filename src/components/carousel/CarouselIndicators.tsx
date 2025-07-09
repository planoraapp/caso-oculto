
import React from 'react';

interface CarouselIndicatorsProps {
  totalItems: number;
  currentIndex: number;
  onIndicatorClick: (index: number) => void;
}

const CarouselIndicators: React.FC<CarouselIndicatorsProps> = ({
  totalItems,
  currentIndex,
  onIndicatorClick
}) => {
  return (
    <div className="flex justify-center space-x-3 mt-6 md:mt-8 px-4">
      {Array.from({ length: totalItems }, (_, index) => (
        <button
          key={index}
          onClick={() => onIndicatorClick(index)}
          className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
            index === currentIndex ? 'bg-case-red' : 'bg-gray-600'
          }`}
          aria-label={`Ir para pack ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default CarouselIndicators;
