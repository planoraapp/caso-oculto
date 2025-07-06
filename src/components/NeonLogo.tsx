
import React from 'react';

interface NeonLogoProps {
  onClick: (e: React.MouseEvent) => void;
}

const NeonLogo: React.FC<NeonLogoProps> = ({ onClick }) => {
  return (
    <a href="#" onClick={onClick} className="logo-neon text-2xl md:text-3xl">
      <span>C</span>
      <span>A</span>
      <span className="flicker-fast">S</span>
      <span>O</span>
      <span className="mx-1 md:mx-2"> </span>
      <span>O</span>
      <span>C</span>
      <span className="flicker-slow">U</span>
      <span>L</span>
      <span>T</span>
      <span>O</span>
    </a>
  );
};

export default NeonLogo;
