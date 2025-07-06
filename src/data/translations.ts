
export const translations = {
  'pt-BR': {
    // Navigation
    navigation: {
      home: 'Início',
      packs: 'Packs',
      library: 'Biblioteca',
      login: 'Entrar',
      logout: 'Sair',
      admin: 'Admin'
    },
    // Landing page
    landing: {
      heroTitle: 'Prepare-se para horas de diversão e mistérios...',
      heroSubtitle: 'Desvende casos intrigantes com seus amigos',
      knowTheGame: 'Conheça o Jogo',
      featuredPacks: 'Packs em Destaque'
    },
    // Home page
    home: {
      title: 'Como Jogar Caso Oculto',
      subtitle: 'O jogo perfeito para noites de mistério',
      rules: {
        title: 'Regras do Jogo',
        rule1: 'Uma pessoa atua como moderador e lê o mistério da carta',
        rule2: 'Os outros jogadores fazem perguntas que só podem ser respondidas com "sim", "não" ou "irrelevante"',
        rule3: 'O objetivo é descobrir a solução completa do mistério',
        rule4: 'O moderador pode dar dicas se os jogadores estiverem muito perdidos'
      },
      freePack: {
        title: 'Pack Gratuito de Amostra',
        description: 'Experimente 5 mistérios gratuitamente',
        button: 'Jogar Agora'
      }
    },
    // Packs page
    packs: {
      title: 'Packs Disponíveis',
      buyButton: 'Comprar',
      playButton: 'Jogar',
      price: 'Preço',
      cards: 'cartas',
      free: 'Grátis'
    },
    // Pack view
    packView: {
      backToPacksButton: 'Voltar aos Packs',
      difficulty: {
        easy: 'Fácil',
        medium: 'Médio',
        hard: 'Difícil'
      },
      solved: 'Resolvido',
      unsolved: 'Não resolvido',
      progress: 'Progresso'
    },
    // Library
    library: {
      title: 'Minha Biblioteca',
      empty: 'Você ainda não possui nenhum pack. Visite a loja para começar!',
      goToShop: 'Ir para a Loja',
      progress: 'Progresso'
    },
    // Auth
    auth: {
      login: 'Entrar',
      signup: 'Criar Conta',
      email: 'Email',
      password: 'Senha',
      name: 'Nome',
      loginButton: 'Entrar',
      signupButton: 'Criar Conta',
      switchToSignup: 'Não tem conta? Criar uma',
      switchToLogin: 'Já tem conta? Entrar',
      loginError: 'Email ou senha incorretos',
      signupError: 'Erro ao criar conta. Tente novamente.',
      emailRequired: 'Email é obrigatório',
      passwordRequired: 'Senha é obrigatória',
      nameRequired: 'Nome é obrigatório'
    },
    // Card viewer
    cardViewer: {
      mystery: 'Mistério',
      solution: 'Solução',
      clickToFlip: 'Clique para virar',
      close: 'Fechar',
      markSolved: 'Marcar como Resolvido',
      markUnsolved: 'Marcar como Não Resolvido'
    },
    // Purchase modal
    purchase: {
      title: 'Comprar Pack',
      price: 'Preço',
      confirmPurchase: 'Confirmar Compra',
      cancel: 'Cancelar',
      success: 'Pack comprado com sucesso!',
      error: 'Erro ao comprar pack. Tente novamente.'
    },
    // Common
    common: {
      loading: 'Carregando...',
      error: 'Erro',
      success: 'Sucesso',
      cancel: 'Cancelar',
      confirm: 'Confirmar',
      close: 'Fechar'
    }
  }
};

export type TranslationKey = keyof typeof translations['pt-BR'];
export const t = (key: string): string => {
  const keys = key.split('.');
  let value: any = translations['pt-BR'];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};
