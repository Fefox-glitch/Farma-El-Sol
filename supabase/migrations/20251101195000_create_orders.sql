-- Tabla de órdenes/reservas para Supabase real
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  buyer_code text NOT NULL,
  seller_code text NOT NULL,
  total numeric NOT NULL,
  status text DEFAULT 'reserved',
  buyer_name text,
  buyer_phone text,
  reserved_at timestamptz NOT NULL,
  expires_at timestamptz NOT NULL,
  buyer_receipt_text text,
  seller_receipt_text text,
  items jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view orders"
  ON orders FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert orders"
  ON orders FOR INSERT
  WITH CHECK (true);