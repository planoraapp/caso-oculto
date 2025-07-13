
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center space-y-8">
        {/* 404 com efeito neon vermelho */}
        <div className="relative">
          <h1 
            className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-case-red to-red-400"
            style={{
              textShadow: `
                0 0 5px #ff0000,
                0 0 10px #ff0000,
                0 0 15px #ff0000,
                0 0 20px #ff0000,
                0 0 35px #ff0000,
                0 0 40px #ff0000
              `,
              filter: 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.5))'
            }}
          >
            404
          </h1>
          <div 
            className="absolute inset-0 text-9xl md:text-[12rem] font-bold text-case-red opacity-20 blur-sm"
            aria-hidden="true"
          >
            404
          </div>
        </div>

        {/* Mensagem de erro */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-case-white">
            Página Não Encontrada
          </h2>
          <p className="text-case-white/80 text-lg max-w-md mx-auto">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        {/* Botões de navegação */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => navigate('/')}
            className="bg-case-red hover:bg-red-600 text-white font-semibold px-8 py-3 flex items-center gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-case-red/25"
          >
            <Home className="h-5 w-5" />
            Voltar para a Home
          </Button>
          
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="border-case-white/20 text-case-white hover:bg-case-white/10 px-8 py-3 flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Página Anterior
          </Button>
        </div>

        {/* Decoração adicional */}
        <div className="mt-12 opacity-20">
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-case-red to-transparent mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
