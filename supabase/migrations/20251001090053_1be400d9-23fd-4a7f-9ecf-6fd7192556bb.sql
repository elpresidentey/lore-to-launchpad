-- Create user signups table
CREATE TABLE public.user_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  user_type TEXT NOT NULL CHECK (user_type IN ('tenant', 'landlord')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_signups ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public signup)
CREATE POLICY "Anyone can sign up" 
ON public.user_signups 
FOR INSERT 
WITH CHECK (true);

-- Create properties table
CREATE TABLE public.properties (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  city TEXT NOT NULL,
  price NUMERIC NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  area TEXT NOT NULL,
  image_url TEXT,
  description TEXT,
  landlord_email TEXT NOT NULL,
  landlord_phone TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view properties (public listing)
CREATE POLICY "Anyone can view properties" 
ON public.properties 
FOR SELECT 
USING (true);

-- Allow anyone to insert properties (for now, simplified)
CREATE POLICY "Anyone can create properties" 
ON public.properties 
FOR INSERT 
WITH CHECK (true);