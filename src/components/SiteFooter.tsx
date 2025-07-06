
import React from 'react';

const SiteFooter: React.FC = () => {
  return (
    <footer className="site-footer">
      <style jsx>{`
        .site-footer {
          position: relative;
          height: 250px;
          background-image: url('https://storage.googleapis.com/gemini-prod/images/420a8118-2c40-4c7b-9c71-c0e863152701');
          background-size: cover;
          background-position: center 80%;
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

        @keyframes rain {
          0% { background-position: 0% 0%; }
          100% { background-position: 20% 100%; }
        }

        @media (max-width: 768px) {
          .site-footer {
            height: 200px;
            background-position: 30% bottom;
          }
        }
      `}</style>
    </footer>
  );
};

export default SiteFooter;
