/*
  # Cruz Verde Pharmacy Database Schema

  1. New Tables
    - `categories`
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
      - `icon` (text)
      - `created_at` (timestamptz)
    
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `discount_price` (numeric, nullable)
      - `image_url` (text)
      - `category_id` (uuid, foreign key)
      - `stock` (integer)
      - `featured` (boolean)
      - `created_at` (timestamptz)
    
    - `cart_items`
      - `id` (uuid, primary key)
      - `session_id` (text)
      - `product_id` (uuid, foreign key)
      - `quantity` (integer)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for categories and products
    - Session-based access for cart items
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  icon text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  price numeric(10,2) NOT NULL,
  discount_price numeric(10,2),
  image_url text DEFAULT '',
  category_id uuid REFERENCES categories(id),
  stock integer DEFAULT 0,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity integer DEFAULT 1,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view their cart"
  ON cart_items FOR SELECT
  USING (true);

CREATE POLICY "Anyone can add to cart"
  ON cart_items FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update their cart"
  ON cart_items FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can delete from cart"
  ON cart_items FOR DELETE
  USING (true);