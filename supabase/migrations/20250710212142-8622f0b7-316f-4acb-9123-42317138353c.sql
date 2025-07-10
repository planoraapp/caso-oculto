
-- Adicionar campo para sessões Stripe na tabela payment_sessions
ALTER TABLE public.payment_sessions 
ADD COLUMN stripe_session_id TEXT;

-- Criar índice para melhor performance nas consultas por stripe_session_id
CREATE INDEX idx_payment_sessions_stripe_session_id 
ON public.payment_sessions(stripe_session_id);
