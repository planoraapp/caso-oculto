import React from 'react';
import { motion } from 'framer-motion';
import SiteFooter from '../components/SiteFooter';
const Terms: React.FC = () => {
  return <div className="min-h-screen bg-gray-900 flex flex-col">
      <motion.div className="pt-20 px-4 pb-8 flex-1" initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.8,
      ease: "easeOut"
    }}>
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-anton text-4xl md:text-5xl lg:text-6xl text-case-white mb-4">
              Termos e Políticas
            </h1>
            <p className="text-case-white/80 text-lg md:text-xl max-w-3xl mx-auto">
              Informações importantes sobre o uso da plataforma, privacidade e seus direitos
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Termos de Uso */}
            <motion.div className="space-y-6" initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 0.2
          }}>
              <div>
                <h2 className="font-anton text-2xl md:text-3xl text-case-red mb-4">
                  Termos de Uso
                </h2>
                <div className="text-case-white/90 space-y-4 text-sm md:text-base leading-relaxed">
                  <p>
                    Ao acessar e utilizar a plataforma <strong>Caso Oculto</strong>, você concorda com os seguintes termos:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>O conteúdo é destinado exclusivamente para entretenimento</li>
                    <li>É proibido compartilhar, copiar ou distribuir o conteúdo dos packs</li>
                    <li>Você deve ter pelo menos 13 anos para usar a plataforma</li>
                    <li>É proibido criar múltiplas contas para contornar limitações</li>
                    <li>Reservamos o direito de suspender contas que violem estes termos</li>
                  </ul>
                  <p>
                    O uso inadequado da plataforma pode resultar no cancelamento do acesso sem reembolso.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-anton text-2xl md:text-3xl text-case-red mb-4">
                  Política de Reembolso
                </h2>
                <div className="text-case-white/90 space-y-4 text-sm md:text-base leading-relaxed">
                  <p>
                    Você tem direito ao reembolso integral em até <strong>7 dias</strong> após a compra, conforme o Código de Defesa do Consumidor:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Reembolso disponível por 7 dias corridos após a compra</li>
                    <li>Não é necessário justificar o motivo do reembolso</li>
                    <li>O valor será estornado em até 5 dias úteis</li>
                    <li>Entre em contato através do nosso suporte para solicitar</li>
                  </ul>
                  <p>
                    Após o período de 7 dias, não será possível solicitar reembolso, exceto em casos específicos previstos em lei.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Política de Privacidade e Código de Conduta */}
            <motion.div className="space-y-6" initial={{
            opacity: 0,
            x: 20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 0.4
          }}>
              <div>
                <h2 className="font-anton text-2xl md:text-3xl text-case-red mb-4">
                  Política de Privacidade
                </h2>
                <div className="text-case-white/90 space-y-4 text-sm md:text-base leading-relaxed">
                  <p>
                    Respeitamos sua privacidade e protegemos seus dados pessoais:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Coletamos apenas dados essenciais para o funcionamento da plataforma</li>
                    <li>Seus dados não são vendidos ou compartilhados com terceiros</li>
                    <li>Utilizamos criptografia para proteger informações sensíveis</li>
                    <li>Você pode solicitar a exclusão de seus dados a qualquer momento</li>
                    <li>Cookies são usados apenas para melhorar sua experiência</li>
                  </ul>
                  <p>
                    Para mais detalhes sobre como tratamos seus dados, entre em contato conosco.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="font-anton text-2xl md:text-3xl text-case-red mb-4">
                  Código de Conduta
                </h2>
                <div className="text-case-white/90 space-y-4 text-sm md:text-base leading-relaxed">
                  <p>
                    Para manter um ambiente saudável, esperamos que todos os usuários:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Usem a plataforma de forma ética e responsável</li>
                    <li>Não tentem burlar sistemas de segurança</li>
                    <li>Respeitem os direitos autorais do conteúdo</li>
                    <li>Não compartilhem credenciais de acesso</li>
                    <li>Reportem problemas técnicos ou de conteúdo</li>
                  </ul>
                  <p>
                    O descumprimento deste código pode resultar na suspensão da conta.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Section */}
          <motion.div className="mt-12 pt-8 border-t border-gray-700 text-center" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.6
        }}>
            <h2 className="font-anton text-2xl md:text-3xl text-case-white mb-4">
              Precisa de Ajuda?
            </h2>
            <p className="text-case-white/80 text-base md:text-lg mb-6">
              Entre em contato conosco para dúvidas, suporte ou solicitações
            </p>
            <div className="text-case-white space-y-2">
              <p><strong>Email:</strong> suporte@casooculto.com</p>
              <p><strong>Horário de Atendimento:</strong> Segunda a Sexta, 9h às 18h</p>
              <p><strong>Tempo de Resposta:</strong> Até 24 horas úteis</p>
            </div>
          </motion.div>

          {/* Last Updated */}
          <div className="mt-8 pt-6 border-t border-gray-800 text-center">
            <p className="text-case-white/60 text-sm">Última atualização: Julho de 2025</p>
          </div>
        </div>
      </motion.div>

      <SiteFooter />
    </div>;
};
export default Terms;