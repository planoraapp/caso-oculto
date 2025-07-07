
import React from 'react';
import { X, Brain, Eye, Question } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Brain className="h-6 w-6 text-case-red" />
                  <h2 className="text-xl font-bold text-case-white">Como Jogar</h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-case-white/60 hover:text-case-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6">
                {/* Introduction */}
                <div>
                  <h3 className="text-lg font-semibold text-case-white mb-3">O que são Black Stories?</h3>
                  <p className="text-case-white/80 leading-relaxed">
                    As Black Stories são mistérios macabros onde você recebe apenas uma situação intrigante 
                    e deve descobrir o que realmente aconteceu fazendo perguntas que só podem ser respondidas 
                    com "sim", "não" ou "irrelevante".
                  </p>
                </div>

                {/* How to Play */}
                <div>
                  <h3 className="text-lg font-semibold text-case-white mb-3 flex items-center gap-2">
                    <Question className="h-5 w-5 text-case-red" />
                    Como Jogar
                  </h3>
                  <div className="space-y-3">
                    <div className="flex gap-3">
                      <span className="bg-case-red text-white font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">1</span>
                      <p className="text-case-white/80">Leia a situação misteriosa apresentada no card</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="bg-case-red text-white font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">2</span>
                      <p className="text-case-white/80">Faça perguntas para descobrir os detalhes ocultos</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="bg-case-red text-white font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">3</span>
                      <p className="text-case-white/80">As respostas serão apenas: SIM, NÃO ou IRRELEVANTE</p>
                    </div>
                    <div className="flex gap-3">
                      <span className="bg-case-red text-white font-bold rounded-full w-6 h-6 flex items-center justify-center text-sm flex-shrink-0">4</span>
                      <p className="text-case-white/80">Continue investigando até desvendar o mistério completo</p>
                    </div>
                  </div>
                </div>

                {/* Tips */}
                <div>
                  <h3 className="text-lg font-semibold text-case-white mb-3 flex items-center gap-2">
                    <Eye className="h-5 w-5 text-case-red" />
                    Dicas para Investigar
                  </h3>
                  <div className="bg-gray-900/50 p-4 rounded-lg space-y-2">
                    <p className="text-case-white/80 text-sm">• Questione tudo: pessoas, objetos, tempo, local</p>
                    <p className="text-case-white/80 text-sm">• Pense fora da caixa - a solução pode ser inesperada</p>
                    <p className="text-case-white/80 text-sm">• Faça perguntas específicas e diretas</p>
                    <p className="text-case-white/80 text-sm">• Use sua criatividade e lógica em conjunto</p>
                    <p className="text-case-white/80 text-sm">• Não há limite de perguntas - seja persistente!</p>
                  </div>
                </div>

                {/* Example */}
                <div>
                  <h3 className="text-lg font-semibold text-case-white mb-3">Exemplo Rápido</h3>
                  <div className="bg-gray-900/50 p-4 rounded-lg">
                    <p className="text-case-red font-semibold mb-2">Situação:</p>
                    <p className="text-case-white/80 mb-3">"Um homem vive no 20º andar. Todo dia ele pega o elevador até o térreo. Quando volta, ele pega o elevador só até o 15º andar e sobe o resto a pé, exceto em dias chuvosos."</p>
                    
                    <p className="text-case-red font-semibold mb-2">Perguntas possíveis:</p>
                    <p className="text-case-white/80 text-sm mb-1">• "Ele tem alguma limitação física?" - SIM</p>
                    <p className="text-case-white/80 text-sm mb-1">• "A chuva afeta sua capacidade?" - SIM</p>
                    <p className="text-case-white/80 text-sm mb-3">• "Ele usa algo nos dias chuvosos?" - SIM</p>
                    
                    <p className="text-case-red font-semibold mb-2">Solução:</p>
                    <p className="text-case-white/80 text-sm">Ele é anão e só alcança o botão do 15º andar. Em dias chuvosos, usa o guarda-chuva para apertar o botão do 20º.</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-gray-700 text-center">
                <p className="text-case-white/60 text-sm">
                  Divirta-se desvendando os mistérios mais intrigantes!
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default HowToPlayModal;
