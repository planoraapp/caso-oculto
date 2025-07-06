
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 40 40" 
          className="logo-animation"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor: '#ef4444', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: '#dc2626', stopOpacity: 1}} />
            </linearGradient>
          </defs>
          
          {/* Tubos de LED arredondados */}
          <rect x="5" y="8" width="2" height="24" rx="1" fill="url(#logoGradient)" className="tube tube-1" />
          <rect x="11" y="6" width="2" height="28" rx="1" fill="url(#logoGradient)" className="tube tube-2" />
          <rect x="17" y="10" width="2" height="20" rx="1" fill="url(#logoGradient)" className="tube tube-3" />
          <rect x="23" y="4" width="2" height="32" rx="1" fill="url(#logoGradient)" className="tube tube-4" />
          <rect x="29" y="12" width="2" height="16" rx="1" fill="url(#logoGradient)" className="tube tube-5" />
        </svg>
        
        <style>{`
          .logo-animation .tube {
            animation: flicker 3s infinite;
            transform-origin: center;
          }
          
          .tube-1 { animation-delay: 0s; }
          .tube-2 { animation-delay: 0.8s; }
          .tube-3 { animation-delay: 1.2s; }
          .tube-4 { animation-delay: 0.3s; }
          .tube-5 { animation-delay: 1.8s; }
          
          @keyframes flicker {
            0%, 100% { opacity: 1; }
            3% { opacity: 0.2; }
            6% { opacity: 1; }
            12% { opacity: 0.6; }
            15% { opacity: 1; }
            22% { opacity: 0.1; }
            28% { opacity: 1; }
            35% { opacity: 0.4; }
            42% { opacity: 1; }
            58% { opacity: 0.8; }
            65% { opacity: 0.3; }
            72% { opacity: 1; }
            85% { opacity: 0.5; }
            92% { opacity: 1; }
          }
        `}</style>
      </div>
      <span className="font-anton text-xl text-case-white tracking-wider">
        CASO OCULTO
      </span>
    </div>
  );
};

export default Logo;
