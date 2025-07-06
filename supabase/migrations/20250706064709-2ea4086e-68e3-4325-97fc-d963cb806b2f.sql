
-- Create table to track payment sessions and pack selections
CREATE TABLE public.payment_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  pack_id TEXT,
  selected_pack_ids TEXT[], -- For combo packs
  payment_type TEXT NOT NULL CHECK (payment_type IN ('individual', 'combo', 'complete')),
  mercadopago_preference_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security
ALTER TABLE public.payment_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own payment sessions" 
  ON public.payment_sessions 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own payment sessions" 
  ON public.payment_sessions 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own payment sessions" 
  ON public.payment_sessions 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create function to update payment status
CREATE OR REPLACE FUNCTION update_payment_session_status(
  session_id UUID,
  new_status TEXT
) RETURNS BOOLEAN AS $$
BEGIN
  UPDATE public.payment_sessions 
  SET status = new_status, updated_at = now()
  WHERE id = session_id;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
