
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
          <rect x="5" y="8" width="3" height="24" rx="1.5" fill="url(#logoGradient)" className="tube tube-1" />
          <rect x="12" y="6" width="3" height="28" rx="1.5" fill="url(#logoGradient)" className="tube tube-2" />
          <rect x="19" y="10" width="3" height="20" rx="1.5" fill="url(#logoGradient)" className="tube tube-3" />
          <rect x="26" y="4" width="3" height="32" rx="1.5" fill="url(#logoGradient)" className="tube tube-4" />
          <rect x="33" y="12" width="3" height="16" rx="1.5" fill="url(#logoGradient)" className="tube tube-5" />
        </svg>
        
        <style jsx>{`
          .logo-animation .tube {
            animation: flicker 3s infinite;
            transform-origin: center;
          }
          
          .tube-1 { animation-delay: 0s; }
          .tube-2 { animation-delay: 0.5s; }
          .tube-3 { animation-delay: 1s; }
          .tube-4 { animation-delay: 1.5s; }
          .tube-5 { animation-delay: 2s; }
          
          @keyframes flicker {
            0%, 100% { opacity: 1; }
            2% { opacity: 0.3; }
            4% { opacity: 1; }
            8% { opacity: 0.8; }
            10% { opacity: 1; }
            15% { opacity: 0.2; }
            18% { opacity: 1; }
            25% { opacity: 0.7; }
            30% { opacity: 1; }
            45% { opacity: 0.4; }
            50% { opacity: 1; }
            70% { opacity: 0.9; }
            75% { opacity: 0.1; }
            80% { opacity: 1; }
            90% { opacity: 0.6; }
            95% { opacity: 1; }
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
