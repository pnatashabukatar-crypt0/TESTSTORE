-- ============================================================================
-- CANDY SHOP E-COMMERCE DATABASE SCHEMA
-- Initial schema setup for product catalog, users, and orders
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- CATEGORIES TABLE
-- Product category hierarchy
-- ============================================================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  image_url VARCHAR(255),
  parent_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_categories_parent_id ON categories(parent_id);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_is_active ON categories(is_active);

-- ============================================================================
-- PRODUCTS TABLE
-- Product catalog with inventory tracking
-- ============================================================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  long_description TEXT,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  cost DECIMAL(10, 2) CHECK (cost >= 0),
  sku VARCHAR(100) UNIQUE,
  image_url VARCHAR(255),
  images_urls TEXT[],
  quantity_in_stock INTEGER NOT NULL DEFAULT 0 CHECK (quantity_in_stock >= 0),
  quantity_reserved INTEGER NOT NULL DEFAULT 0 CHECK (quantity_reserved >= 0),
  reorder_level INTEGER DEFAULT 10,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  tags TEXT[],
  weight_grams DECIMAL(8, 2),
  allergens TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_products_is_featured ON products(is_featured);
CREATE INDEX idx_products_tags ON products USING GIN(tags);

-- ============================================================================
-- USERS TABLE
-- Customer accounts with authentication
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  profile_image_url VARCHAR(255),
  is_email_verified BOOLEAN DEFAULT false,
  email_verified_at TIMESTAMP,
  last_login_at TIMESTAMP,
  is_active BOOLEAN DEFAULT true,
  role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'moderator')),
  preferences JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_is_active ON users(is_active);
CREATE INDEX idx_users_role ON users(role);

-- ============================================================================
-- USER ADDRESSES TABLE
-- Multiple addresses per user (billing, shipping, etc.)
-- ============================================================================
CREATE TABLE IF NOT EXISTS user_addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL CHECK (type IN ('billing', 'shipping', 'both')),
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  street_address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  state_province VARCHAR(100),
  postal_code VARCHAR(20) NOT NULL,
  country VARCHAR(100) NOT NULL,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_addresses_user_id ON user_addresses(user_id);
CREATE INDEX idx_user_addresses_type ON user_addresses(type);

-- ============================================================================
-- ORDERS TABLE
-- Order header information
-- ============================================================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number VARCHAR(50) NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (
    status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')
  ),
  payment_status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (
    payment_status IN ('pending', 'processing', 'completed', 'failed', 'refunded')
  ),
  subtotal DECIMAL(12, 2) NOT NULL DEFAULT 0 CHECK (subtotal >= 0),
  tax_amount DECIMAL(12, 2) NOT NULL DEFAULT 0 CHECK (tax_amount >= 0),
  shipping_cost DECIMAL(12, 2) NOT NULL DEFAULT 0 CHECK (shipping_cost >= 0),
  discount_amount DECIMAL(12, 2) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
  total_amount DECIMAL(12, 2) NOT NULL DEFAULT 0 CHECK (total_amount >= 0),
  currency VARCHAR(3) DEFAULT 'USD',
  
  -- Billing and Shipping Information
  billing_address JSONB NOT NULL,
  shipping_address JSONB NOT NULL,
  
  -- Shipping Details
  shipping_method VARCHAR(100),
  tracking_number VARCHAR(100),
  estimated_delivery_date DATE,
  actual_delivery_date DATE,
  
  -- Payment Information
  payment_method VARCHAR(50) CHECK (payment_method IN ('credit_card', 'debit_card', 'paypal', 'stripe')),
  payment_transaction_id VARCHAR(255),
  
  -- Customer Communication
  customer_notes TEXT,
  admin_notes TEXT,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  shipped_at TIMESTAMP,
  delivered_at TIMESTAMP
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_user_created ON orders(user_id, created_at);

-- ============================================================================
-- ORDER ITEMS TABLE
-- Line items for each order
-- ============================================================================
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  product_name VARCHAR(255) NOT NULL,
  product_sku VARCHAR(100),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10, 2) NOT NULL CHECK (unit_price >= 0),
  line_total DECIMAL(12, 2) NOT NULL CHECK (line_total >= 0),
  discount_amount DECIMAL(10, 2) DEFAULT 0 CHECK (discount_amount >= 0),
  line_total_after_discount DECIMAL(12, 2) NOT NULL CHECK (line_total_after_discount >= 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- ============================================================================
-- INVENTORY LOGS TABLE
-- Audit trail for inventory changes
-- ============================================================================
CREATE TABLE IF NOT EXISTS inventory_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  change_type VARCHAR(50) NOT NULL CHECK (
    change_type IN ('purchase', 'return', 'restock', 'adjustment', 'reserved')
  ),
  quantity_change INTEGER NOT NULL,
  previous_quantity INTEGER NOT NULL,
  new_quantity INTEGER NOT NULL,
  reference_id UUID,
  reference_type VARCHAR(50) CHECK (reference_type IN ('order', 'adjustment', 'manual')),
  notes TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_inventory_logs_product_id ON inventory_logs(product_id);
CREATE INDEX idx_inventory_logs_created_at ON inventory_logs(created_at);

-- ============================================================================
-- AUDIT LOG TABLE
-- Track important system changes
-- ============================================================================
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type VARCHAR(100) NOT NULL,
  entity_id UUID NOT NULL,
  action VARCHAR(50) NOT NULL,
  user_id UUID REFERENCES users(id),
  changes JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- ============================================================================
-- VIEWS
-- ============================================================================

-- Available inventory view (in stock - reserved)
CREATE OR REPLACE VIEW product_availability AS
SELECT
  id,
  name,
  sku,
  quantity_in_stock,
  quantity_reserved,
  (quantity_in_stock - quantity_reserved) AS available_quantity,
  CASE
    WHEN (quantity_in_stock - quantity_reserved) <= 0 THEN 'out_of_stock'
    WHEN (quantity_in_stock - quantity_reserved) < reorder_level THEN 'low_stock'
    ELSE 'in_stock'
  END AS stock_status
FROM products
WHERE is_active = true;

-- Order summary view
CREATE OR REPLACE VIEW order_summaries AS
SELECT
  o.id,
  o.order_number,
  o.user_id,
  u.email,
  u.first_name,
  u.last_name,
  o.status,
  o.payment_status,
  o.total_amount,
  o.currency,
  COUNT(oi.id) AS item_count,
  SUM(oi.quantity) AS total_quantity,
  o.created_at,
  o.updated_at
FROM orders o
JOIN users u ON o.user_id = u.id
LEFT JOIN order_items oi ON o.id = oi.order_id
GROUP BY o.id, u.id;

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Update product's updated_at timestamp
CREATE OR REPLACE FUNCTION update_product_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Update user's updated_at timestamp
CREATE OR REPLACE FUNCTION update_user_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Update order's updated_at timestamp
CREATE OR REPLACE FUNCTION update_order_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- TRIGGERS
-- ============================================================================

CREATE TRIGGER trigger_update_product_timestamp
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_product_timestamp();

CREATE TRIGGER trigger_update_user_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_user_timestamp();

CREATE TRIGGER trigger_update_order_timestamp
BEFORE UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION update_order_timestamp();

-- ============================================================================
-- INITIAL DATA
-- ============================================================================

-- Insert root categories
INSERT INTO categories (name, slug, description, display_order, is_active)
VALUES
  ('Chocolates', 'chocolates', 'Premium chocolate candies and treats', 1, true),
  ('Gummies', 'gummies', 'Chewy gummy candies in various flavors', 2, true),
  ('Hard Candies', 'hard-candies', 'Classic hard candies and lollipops', 3, true),
  ('Licorice', 'licorice', 'Licorice strips and twists', 4, true),
  ('Sour Candies', 'sour-candies', 'Sour and tangy candy selections', 5, true)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample products
INSERT INTO products (name, slug, description, category_id, price, cost, sku, quantity_in_stock, reorder_level, is_active, is_featured)
SELECT
  'Dark Chocolate Truffle',
  'dark-chocolate-truffle',
  'Rich dark chocolate truffle with smooth ganache filling',
  id,
  12.99,
  4.50,
  'CHOC-001',
  150,
  20,
  true,
  true
FROM categories WHERE slug = 'chocolates'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, category_id, price, cost, sku, quantity_in_stock, reorder_level, is_active, is_featured)
SELECT
  'Gummy Bears Assortment',
  'gummy-bears-assortment',
  'Colorful assorted fruit-flavored gummy bears',
  id,
  8.99,
  2.50,
  'GUMMY-001',
  200,
  30,
  true,
  true
FROM categories WHERE slug = 'gummies'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO products (name, slug, description, category_id, price, cost, sku, quantity_in_stock, reorder_level, is_active, is_featured)
SELECT
  'Classic Lollipops',
  'classic-lollipops',
  'Colorful round lollipops with classic fruit flavors',
  id,
  5.99,
  1.50,
  'LOLL-001',
  300,
  50,
  true,
  true
FROM categories WHERE slug = 'hard-candies'
ON CONFLICT (slug) DO NOTHING;
