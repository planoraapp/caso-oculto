
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-1">
      <span className="font-anton text-2xl lg:text-3xl tracking-wider logo-neon">
        <span>C</span>
        <span className="flicker-fast">A</span>
        <span>S</span>
        <span className="flicker-slow">O</span>
        <span className="mx-1 lg:mx-2"> </span>
        <span>O</span>
        <span>C</span>
        <span className="flicker-fast">U</span>
        <span>L</span>
        <span className="flicker-slow">T</span>
        <span>O</span>
      </span>
    </div>
  );
};

export default Logo;
