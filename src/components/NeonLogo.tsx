
import React from 'react';

interface NeonLogoProps {
  onClick?: (e: React.MouseEvent) => void;
}

const NeonLogo: React.FC<NeonLogoProps> = ({ onClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <div 
      onClick={handleClick} 
      className="logo-neon text-2xl md:text-3xl cursor-pointer"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick(e as any);
        }
      }}
    >
      <span>C</span>
      <span>A</span>
      <span>S</span>
      <span>O</span>
      <span className="mx-1 md:mx-2"> </span>
      <span>O</span>
      <span>C</span>
      <span className="flicker-slow">U</span>
      <span>L</span>
      <span>T</span>
      <span className="flicker-fast">O</span>
    </div>
  );
};

export default NeonLogo;
