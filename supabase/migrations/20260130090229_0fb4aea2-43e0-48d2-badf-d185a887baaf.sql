-- Create enum for order status
CREATE TYPE public.order_status AS ENUM ('pending', 'in_progress', 'completed', 'cancelled');

-- Create enum for contact preference
CREATE TYPE public.contact_preference AS ENUM ('call', 'text', 'email');

-- Create enum for payment method
CREATE TYPE public.payment_method AS ENUM ('cash', 'card', 'other');

-- Create enum for pet name case
CREATE TYPE public.pet_name_case AS ENUM ('uppercase', 'mixed');

-- Create enum for animal type
CREATE TYPE public.animal_type AS ENUM ('dog', 'cat', 'other');

-- Create enum for tag size
CREATE TYPE public.tag_size AS ENUM ('small', 'large');

-- Create enum for tag material
CREATE TYPE public.tag_material AS ENUM ('brass', 'stainless');

-- Create enum for icon placement
CREATE TYPE public.icon_placement AS ENUM ('before', 'after', 'above', 'back');

-- Create the main pet_tag_orders table
CREATE TABLE public.pet_tag_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT NOT NULL UNIQUE,
  
  -- Customer Information
  customer_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  email TEXT,
  preferred_contact contact_preference NOT NULL DEFAULT 'call',
  
  -- Font & Icons
  font_choice CHAR(1) NOT NULL CHECK (font_choice IN ('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J')),
  add_image BOOLEAN NOT NULL DEFAULT false,
  icons JSONB NOT NULL DEFAULT '{"paw": false, "bone": false, "heart": false, "star": false, "other": false}'::jsonb,
  icon_placement icon_placement NOT NULL DEFAULT 'before',
  notes TEXT,
  
  -- Price & Order Info
  base_tag_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  add_ons_total DECIMAL(10, 2) NOT NULL DEFAULT 0,
  order_total DECIMAL(10, 2) NOT NULL DEFAULT 0,
  payment_method payment_method NOT NULL DEFAULT 'cash',
  payment_method_other TEXT,
  date_ordered DATE NOT NULL DEFAULT CURRENT_DATE,
  ready_by DATE,
  staff_initials TEXT,
  
  -- Confirmation
  spelling_confirmed BOOLEAN NOT NULL DEFAULT false,
  signature TEXT NOT NULL,
  signature_date DATE NOT NULL DEFAULT CURRENT_DATE,
  
  -- Metadata
  status order_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create the tag details table (one-to-many relationship)
CREATE TABLE public.pet_tag_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.pet_tag_orders(id) ON DELETE CASCADE,
  tag_number INTEGER NOT NULL,
  
  -- Pet Information
  pet_name TEXT NOT NULL,
  pet_name_case pet_name_case NOT NULL DEFAULT 'mixed',
  animal_type animal_type NOT NULL DEFAULT 'dog',
  animal_type_other TEXT,
  
  -- Tag Style
  shape TEXT NOT NULL,
  size tag_size NOT NULL DEFAULT 'small',
  material tag_material NOT NULL DEFAULT 'brass',
  
  -- Text & Layout
  front_line_1 TEXT NOT NULL,
  front_line_2 TEXT,
  back_line_1 TEXT NOT NULL,
  back_line_2 TEXT,
  back_line_3 TEXT,
  
  -- Mockup file URL (if uploaded)
  mockup_url TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  UNIQUE(order_id, tag_number)
);

-- Enable Row Level Security
ALTER TABLE public.pet_tag_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pet_tag_items ENABLE ROW LEVEL SECURITY;

-- Create public read/write policies (for now, since this is a staff-facing form)
-- In production, you'd want to add authentication for the admin panel
CREATE POLICY "Allow public insert on pet_tag_orders"
ON public.pet_tag_orders FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow public select on pet_tag_orders"
ON public.pet_tag_orders FOR SELECT
USING (true);

CREATE POLICY "Allow public update on pet_tag_orders"
ON public.pet_tag_orders FOR UPDATE
USING (true);

CREATE POLICY "Allow public insert on pet_tag_items"
ON public.pet_tag_items FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow public select on pet_tag_items"
ON public.pet_tag_items FOR SELECT
USING (true);

CREATE POLICY "Allow public update on pet_tag_items"
ON public.pet_tag_items FOR UPDATE
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_pet_tag_orders_updated_at
BEFORE UPDATE ON public.pet_tag_orders
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to generate order numbers
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
  NEW.order_number := 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for generating order numbers
CREATE TRIGGER set_order_number
BEFORE INSERT ON public.pet_tag_orders
FOR EACH ROW
WHEN (NEW.order_number IS NULL)
EXECUTE FUNCTION public.generate_order_number();

-- Create indexes for better query performance
CREATE INDEX idx_pet_tag_orders_customer_name ON public.pet_tag_orders(customer_name);
CREATE INDEX idx_pet_tag_orders_phone_number ON public.pet_tag_orders(phone_number);
CREATE INDEX idx_pet_tag_orders_status ON public.pet_tag_orders(status);
CREATE INDEX idx_pet_tag_orders_date_ordered ON public.pet_tag_orders(date_ordered);
CREATE INDEX idx_pet_tag_items_order_id ON public.pet_tag_items(order_id);