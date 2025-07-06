
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, Skull, Key, Fingerprint, Map, Crown, Shield, Zap, Search, Heart, Flame, Clock, Ghost, Bomb } from 'lucide-react';

interface Case {
  id: string;
  order: number;
  mystery: string;
  solution: string;
  difficulty: string;
  isFree?: boolean;
  theme?: string;
}

interface CaseCardProps {
  case: Case;
  isLocked: boolean;
  isSolved: boolean;
  onClick: () => void;
}

const CaseCard: React.FC<CaseCardProps> = ({ 
  case: caseData, 
  isLocked, 
  isSolved, 
  onClick 
}) => {
  const getThemeIcon = (theme: string) => {
    switch (theme?.toLowerCase()) {
      case 'murder': return Skull;
      case 'theft': return Key;
      case 'investigation': return Search;
      case 'mystery': return Eye;
      case 'crime': return Fingerprint;
      case 'location': return Map;
      case 'royal': return Crown;
      case 'protection': return Shield;
      case 'power': return Zap;
      case 'love': return Heart;
      case 'fire': return Flame;
      case 'time': return Clock;
      case 'supernatural': return Ghost;
      case 'danger': return Bomb;
      default: return Eye;
    }
  };

  const getCaseName = (order: number, theme: string) => {
    const names = {
      'murder': ['Morte Silenciosa', 'Sangue Frio', 'Último Suspiro', 'Fim Trágico', 'Vingança Mortal'],
      'theft': ['Roubo Perfeito', 'Ladrão Sombrio', 'Cofre Violado', 'Furto Noturno', 'Tesouro Perdido'],
      'investigation': ['Pistas Ocultas', 'Evidência Perdida', 'Rastro Frio', 'Caso Fechado', 'Verdade Revelada'],
      'mystery': ['Enigma Profundo', 'Segredo Guardado', 'Mistério Antigo', 'Incógnita Fatal', 'Puzzle Mortal'],
      'crime': ['Crime Perfeito', 'Delito Obscuro', 'Ato Sombrio', 'Culpa Oculta', 'Justiça Cega'],
      'location': ['Local Maldito', 'Lugar Sombrio', 'Território Perigoso', 'Zona Morta', 'Área Restrita'],
      'royal': ['Coroa Perdida', 'Sangue Real', 'Trono Vazio', 'Dinastia Caída', 'Reino Sombrio'],
      'protection': ['Guarda Caído', 'Escudo Quebrado', 'Proteção Falha', 'Defesa Perdida', 'Segurança Violada'],
      'power': ['Poder Corrupto', 'Força Oculta', 'Energia Mortal', 'Controle Perdido', 'Domínio Sombrio'],
      'love': ['Amor Proibido', 'Paixão Fatal', 'Coração Partido', 'Romance Sombrio', 'Desejo Mortal'],
      'fire': ['Chamas Mortais', 'Incêndio Suspeito', 'Fogo Vingador', 'Cinzas do Passado', 'Brasas da Morte'],
      'time': ['Tempo Perdido', 'Hora Final', 'Relógio Parado', 'Passado Sombrio', 'Futuro Incerto'],
      'supernatural': ['Espírito Vingativo', 'Alma Perdida', 'Fantasma do Passado', 'Assombração', 'Além da Morte'],
      'danger': ['Perigo Iminente', 'Ameaça Oculta', 'Risco Fatal', 'Zona de Perigo', 'Alerta Vermelho']
    };
    
    const themeNames = names[theme as keyof typeof names] || names.mystery;
    return themeNames[(order - 1) % themeNames.length];
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const IconComponent = getThemeIcon(caseData.theme || 'mystery');
  const caseName = getCaseName(caseData.order, caseData.theme || 'mystery');

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`relative bg-white rounded-xl p-6 cursor-pointer hover:shadow-xl transition-all duration-300 border-2 ${
        isLocked 
          ? 'border-gray-300 bg-gray-100' 
          : 'border-gray-200 hover:border-case-red'
      }`}
    >
      {/* Case Number */}
      <div className="absolute top-4 left-4">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm text-white ${
          isLocked ? 'bg-gray-400' : 'bg-case-red'
        }`}>
          {caseData.order}
        </div>
      </div>

      {/* Difficulty Indicator */}
      <div className="absolute top-4 right-4">
        <div className={`w-3 h-3 rounded-full ${getDifficultyColor(caseData.difficulty)}`}></div>
      </div>

      {/* Status Badges */}
      <div className="absolute top-12 right-4 flex flex-col gap-1">
        {caseData.isFree && (
          <div className="bg-green-600 text-white text-xs px-2 py-1 rounded">
            Grátis
          </div>
        )}
        {isSolved && (
          <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
            ✓ Resolvido
          </div>
        )}
      </div>

      {/* Lock Overlay for Locked Cases */}
      {isLocked && (
        <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center z-10">
          <div className="text-center">
            <Lock className="h-8 w-8 text-case-red mx-auto mb-2" />
            <p className="text-case-red font-bold text-sm">Bloqueado</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`flex flex-col items-center justify-center h-32 ${isLocked ? 'opacity-30' : ''}`}>
        {/* Theme Icon */}
        <div className="mb-4">
          <IconComponent className="h-12 w-12 text-case-red" />
        </div>

        {/* Case Name */}
        <h3 className="text-gray-900 font-bold text-center text-sm">
          {caseName}
        </h3>
      </div>
    </motion.div>
  );
};

export default CaseCard;
