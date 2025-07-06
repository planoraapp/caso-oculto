import React from 'react';
const SiteFooter: React.FC = () => {
  return <footer className="site-footer">
      <style>{`
        .site-footer {
          position: relative;
          height: 400px;
          background-image: url('/lovable-uploads/854e76ba-1423-4b2a-bf59-2f1394558793.png');
          background-size: cover;
          background-position: center top;
          overflow: hidden;
        }

        .site-footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 100px;
          background: linear-gradient(to bottom, #111827 0%, rgba(17, 24, 39, 0) 100%);
          z-index: 5;
        }

        .site-footer::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: linear-gradient(0deg, rgba(255,255,255,0.03) 50%, transparent 50%);
          background-size: 3px 3px;
          animation: rain 0.5s linear infinite;
          opacity: 0.4;
          z-index: 2;
        }

        .copyright-text {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          color: white;
          font-weight: 600;
          font-size: 16px;
          text-shadow: 
            -2px -2px 0 #000,  
            2px -2px 0 #000,
            -2px  2px 0 #000,
             2px  2px 0 #000,
             0 -2px 0 #000,
             0  2px 0 #000,
            -2px  0 0 #000,
             2px  0 0 #000;
          z-index: 10;
          text-align: center;
        }

        @keyframes rain {
          0% { background-position: 0% 0%; }
          100% { background-position: 20% 100%; }
        }

        @media (max-width: 768px) {
          .site-footer {
            height: 300px;
            background-position: center top;
          }
          
          .copyright-text {
            font-size: 14px;
          }
        }
      `}</style>
      
      <div className="copyright-text">2025 - CASO OCULTO. Todos os direitos reservados.</div>
    </footer>;
};
export default SiteFooter;