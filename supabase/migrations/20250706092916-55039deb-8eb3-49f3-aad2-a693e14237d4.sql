
-- Create refund requests table
CREATE TABLE public.refund_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  pack_id TEXT NOT NULL,
  request_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reason TEXT,
  processed_by UUID REFERENCES auth.users,
  processed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security
ALTER TABLE public.refund_requests ENABLE ROW LEVEL SECURITY;

-- Create policies for refund requests
CREATE POLICY "Users can view their own refund requests" 
  ON public.refund_requests 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own refund requests" 
  ON public.refund_requests 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all refund requests" 
  ON public.refund_requests 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'conectawebapps@outlook.com'
    )
  );

CREATE POLICY "Admins can update refund requests" 
  ON public.refund_requests 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'conectawebapps@outlook.com'
    )
  );

-- Create user_pack_access table to manage individual pack access
CREATE TABLE public.user_pack_access (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  pack_id TEXT NOT NULL,
  granted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  revoked_at TIMESTAMP WITH TIME ZONE,
  is_active BOOLEAN NOT NULL DEFAULT true,
  granted_by UUID REFERENCES auth.users,
  UNIQUE(user_id, pack_id)
);

-- Add Row Level Security
ALTER TABLE public.user_pack_access ENABLE ROW LEVEL SECURITY;

-- Create policies for user pack access
CREATE POLICY "Users can view their own pack access" 
  ON public.user_pack_access 
  FOR SELECT 
  USING (auth.uid() = user_id AND is_active = true);

CREATE POLICY "Admins can manage all pack access" 
  ON public.user_pack_access 
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'conectawebapps@outlook.com'
    )
  );

-- Function to check if user can request refund (within 7 days)
CREATE OR REPLACE FUNCTION can_request_refund(user_id UUID, pack_id TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.payment_sessions ps
    WHERE ps.user_id = user_id 
    AND (ps.pack_id = pack_id OR pack_id = ANY(ps.selected_pack_ids))
    AND ps.status = 'approved'
    AND ps.created_at >= NOW() - INTERVAL '7 days'
    AND NOT EXISTS (
      SELECT 1 FROM public.refund_requests rr
      WHERE rr.user_id = user_id AND rr.pack_id = pack_id
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
