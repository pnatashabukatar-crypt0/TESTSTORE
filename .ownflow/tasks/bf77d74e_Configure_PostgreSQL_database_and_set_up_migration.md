# PostgreSQL Database Configuration and Migration Setup

I'll create a production-ready PostgreSQL database configuration with connection pooling and a comprehensive migration framework for the TEST SHOP e-commerce platform.

## Architecture Overview

The solution includes:
1. **PostgreSQL Configuration** - Connection pooling with pg-pool
2. **Migration Framework** - Custom migration runner with versioning
3. **Core Schema** - Tables for products, categories, users, orders, and order_items
4. **Environment Support** - Development, testing, and CI/CD compatibility
5. **Utilities** - Database initialization and migration status checking

---

## 1. Database Connection Module

Creates a connection pool with optimized settings for Express.js and provides database utilities.

## 2. Migration Framework

Implements a custom, framework-agnostic migration system that:
- Tracks applied migrations in a `schema_migrations` table
- Supports forward and rollback operations
- Manages transaction safety
- Provides CLI and programmatic interfaces

## 3. Core Schema Migrations

Five initial migrations covering:
- **001**: Users table with authentication fields
- **002**: Product categories
- **003**: Products with relationships to categories
- **004**: Orders with user references
- **005**: Order items with relationships to orders and products

## 4. Project Structure

```
test-shop/
├── src/
│   ├── database/
│   │   ├── db.js                 # Connection pool configuration
│   │   ├── migrations/
│   │   │   ├── 001_create_users.js
│   │   │   ├── 002_create_categories.js
│   │   │   ├── 003_create_products.js
│   │   │   ├── 004_create_orders.js
│   │   │   └── 005_create_order_items.js
│   │   └── migrationRunner.js    # Migration execution logic
│   └── config/
│       └── database.js           # Database config
├── scripts/
│   ├── migrate.js               # CLI migration tool
│   └── dbInit.js                # Database initialization
├── .env.example
├── .env.test
└── package.json
```

---

## Implementation

### Database Configuration

The database module provides:
- Connection pooling with pg-pool
- Environment-based configuration
- Connection error handling
- Query execution utilities

### Migration System

Key features:
- **Versioning**: Numeric prefix (001, 002, etc.) ensures ordering
- **State Tracking**: `schema_migrations` table tracks applied migrations
- **Rollback Support**: Each migration includes both `up` and `down` functions
- **Transaction Safety**: Wrapped in transactions where appropriate
- **Status Reporting**: List applied/pending migrations

### Running Migrations

```bash
# Apply all pending migrations
node scripts/migrate.js up

# Rollback last migration
node scripts/migrate.js down

# Check migration status
node scripts/migrate.js status

# Apply specific migration
node scripts/migrate.js up --target 003
```

---

## Data Model

### users
- `id` (uuid, primary key)
- `email` (varchar, unique)
- `password_hash` (varchar)
- `first_name`, `last_name`
- `phone` (varchar)
- `addresses` (jsonb for shipping/billing)
- `created_at`, `updated_at`

### categories
- `id` (uuid, primary key)
- `name` (varchar, unique)
- `description` (text)
- `slug` (varchar, unique)
- `is_active` (boolean)
- `created_at`, `updated_at`

### products
- `id` (uuid, primary key)
- `category_id` (foreign key)
- `name` (varchar)
- `description` (text)
- `sku` (varchar, unique)
- `price` (decimal)
- `cost_price` (decimal)
- `stock_quantity` (integer)
- `is_active` (boolean)
- `created_at`, `updated_at`

### orders
- `id` (uuid, primary key)
- `user_id` (foreign key)
- `order_number` (varchar, unique)
- `total_amount` (decimal)
- `status` (enum: pending, confirmed, shipped, delivered, cancelled)
- `payment_method` (varchar)
- `shipping_address` (jsonb)
- `created_at`, `updated_at`

### order_items
- `id` (uuid, primary key)
- `order_id` (foreign key)
- `product_id` (foreign key)
- `quantity` (integer)
- `unit_price` (decimal)
- `subtotal` (decimal)
- `created_at`

---

###FILES###
[
  {
    "path": ".env.example",
    "content": "# PostgreSQL Configuration\nDB_HOST=localhost\nDB_PORT=5432\nDB_NAME=test_shop\nDB_USER=postgres\nDB_PASSWORD=postgres\n\n# Connection Pool\nDB_POOL_MIN=2\nDB_POOL_MAX=20\nDB_POOL_IDLE_TIMEOUT=30000\n\n# Environment\nNODE_ENV=development\n"
  },
  {
    "path": ".env.test",
    "content": "# PostgreSQL Configuration (Test)\nDB_HOST=localhost\nDB_PORT=5432\nDB_NAME=test_shop_test\nDB_USER=postgres\nDB_PASSWORD=postgres\n\n# Connection Pool (Smaller for tests)\nDB_POOL_MIN=1\nDB_POOL_MAX=5\nDB_POOL_IDLE_TIMEOUT=10000\n\n# Environment\nNODE_ENV=test\n"
  },
  {
    "path": "src/config/database.js",
    "content": "/**\n * Database Configuration\n * Centralizes all PostgreSQL connection parameters\n */\n\nconst path = require('path');\nrequire('dotenv').config({ path: path.resolve(__dirname, '../../.env') });\n\nconst config = {\n  development: {\n    host: process.env.DB_HOST || 'localhost',\n    port: parseInt(process.env.DB_PORT || '5432', 10),\n    database: process.env.DB_NAME || 'test_shop',\n    user: process.env.DB_USER || 'postgres',\n    password: process.env.DB_PASSWORD || 'postgres',\n    poolMin: parseInt(process.env.DB_POOL_MIN || '2', 10),\n    poolMax: parseInt(process.env.DB_POOL_MAX || '20', 10),\n    idleTimeoutMillis: parseInt(process.env.DB_POOL_IDLE_TIMEOUT || '30000', 10),\n    connectionTimeoutMillis: 2000,\n  },\n  test: {\n    host: process.env.DB_HOST || 'localhost',\n    port: parseInt(process.env.DB_PORT || '5432', 10),\n    database: process.env.DB_NAME || 'test_shop_test',\n    user: process.env.DB_USER || 'postgres',\n    password: process.env.DB_PASSWORD || 'postgres',\n    poolMin: parseInt(process.env.DB_POOL_MIN || '1', 10),\n    poolMax: parseInt(process.env.DB_POOL_MAX || '5', 10),\n    idleTimeoutMillis: parseInt(process.env.DB_POOL_IDLE_TIMEOUT || '10000', 10),\n    connectionTimeoutMillis: 2000,\n  },\n  production: {\n    host: process.env.DB_HOST,\n    port: parseInt(process.env.DB_PORT || '5432', 10),\n    database: process.env.DB_NAME,\n    user: process.env.DB_USER,\n    password: process.env.DB_PASSWORD,\n    poolMin: parseInt(process.env.DB_POOL_MIN || '5', 10),\n    poolMax: parseInt(process.env.DB_POOL_MAX || '30', 10),\n    idleTimeoutMillis: parseInt(process.env.DB_POOL_IDLE_TIMEOUT || '30000', 10),\n    connectionTimeoutMillis: 3000,\n    ssl: {\n      rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false',\n    },\n  },\n};\n\nconst env = process.env.NODE_ENV || 'development';\n\nmodule.exports = {\n  ...config[env],\n  env,\n};\n"
  },
  {
    "path": "src/database/db.js",
    "content": "/**\n * PostgreSQL Connection Pool\n * Manages database connections with pooling for optimal performance\n */\n\nconst { Pool } = require('pg');\nconst dbConfig = require('../config/database');\n\n// Create connection pool\nconst pool = new Pool({\n  host: dbConfig.host,\n  port: dbConfig.port,\n  database: dbConfig.database,\n  user: dbConfig.user,\n  password: dbConfig.password,\n  min: dbConfig.poolMin,\n  max: dbConfig.poolMax,\n  idleTimeoutMillis: dbConfig.idleTimeoutMillis,\n  connectionTimeoutMillis: dbConfig.connectionTimeoutMillis,\n  ...(dbConfig.env === 'production' && { ssl: dbConfig.ssl }),\n});\n\n// Error handling for pool\npool.on('error', (err) => {\n  console.error('Unexpected error on idle client', err);\n});\n\npool.on('connect', () => {\n  // Connection established\n  if (process.env.NODE_ENV === 'development') {\n    console.log('[DB] New connection established');\n  }\n});\n\npool.on('remove', () => {\n  // Connection removed from pool\n  if (process.env.NODE_ENV === 'development') {\n    console.log('[DB] Connection removed from pool');\n  }\n});\n\n/**\n * Execute a query with automatic connection management\n * @param {string} text - SQL query text\n * @param {Array} values - Query parameters\n * @returns {Promise<object>} Query result\n */\nasync function query(text, values) {\n  const start = Date.now();\n  try {\n    const result = await pool.query(text, values);\n    const duration = Date.now() - start;\n    if (process.env.NODE_ENV === 'development') {\n      console.log('[DB] Executed query', { text, duration, rows: result.rowCount });\n    }\n    return result;\n  } catch (error) {\n    console.error('[DB] Query error', { text, error: error.message });\n    throw error;\n  }\n}\n\n/**\n * Get a client from the pool for manual transaction management\n * @returns {Promise<PoolClient>} Database client\n */\nasync function getClient() {\n  return pool.connect();\n}\n\n/**\n * Execute a query within a transaction\n * @param {Function} callback - Async function receiving client as parameter\n * @returns {Promise<any>} Transaction result\n */\nasync function transaction(callback) {\n  const client = await pool.connect();\n  try {\n    await client.query('BEGIN');\n    const result = await callback(client);\n    await client.query('COMMIT');\n    return result;\n  } catch (error) {\n    await client.query('ROLLBACK');\n    throw error;\n  } finally {\n    client.release();\n  }\n}\n\n/**\n * Get the current number of idle connections\n * @returns {number} Idle connection count\n */\nfunction getPoolStats() {\n  return {\n    totalConnections: pool.totalCount,\n    idleConnections: pool.idleCount,\n    waitingRequests: pool.waitingCount,\n  };\n}\n\n/**\n * Close the connection pool gracefully\n * @returns {Promise<void>}\n */\nasync function close() {\n  await pool.end();\n  console.log('[DB] Connection pool closed');\n}\n\nmodule.exports = {\n  query,\n  getClient,\n  transaction,\n  getPoolStats,\n  close,\n  pool, // For advanced use cases\n};\n"
  },
  {
    "path": "src/database/migrationRunner.js",
    "content": "/**\n * Database Migration Runner\n * Manages schema versioning and migrations with rollback support\n */\n\nconst fs = require('fs').promises;\nconst path = require('path');\nconst db = require('./db');\n\nconst MIGRATIONS_DIR = path.join(__dirname, 'migrations');\nconst MIGRATIONS_TABLE = 'schema_migrations';\n\n/**\n * Initialize the migrations table if it doesn't exist\n */\nasync function initializeMigrationsTable() {\n  const createTableSQL = `\n    CREATE TABLE IF NOT EXISTS ${MIGRATIONS_TABLE} (\n      id SERIAL PRIMARY KEY,\n      version VARCHAR(255) UNIQUE NOT NULL,\n      name VARCHAR(255) NOT NULL,\n      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n    );\n    \n    CREATE INDEX IF NOT EXISTS idx_schema_migrations_version \n      ON ${MIGRATIONS_TABLE}(version);\n  `;\n\n  try {\n    await db.query(createTableSQL);\n    console.log('[Migration] Migrations table initialized');\n  } catch (error) {\n    console.error('[Migration] Failed to initialize migrations table:', error.message);\n    throw error;\n  }\n}\n\n/**\n * Get list of applied migrations\n * @returns {Promise<Array>} Applied migration versions\n */\nasync function getAppliedMigrations() {\n  const result = await db.query(`\n    SELECT version, name, applied_at \n    FROM ${MIGRATIONS_TABLE} \n    ORDER BY version ASC\n  `);\n  return result.rows;\n}\n\n/**\n * Get list of migration files from disk\n * @returns {Promise<Array>} Migration file objects with version, name, and path\n */\nasync function getMigrationFiles() {\n  try {\n    const files = await fs.readdir(MIGRATIONS_DIR);\n    return files\n      .filter((file) => file.endsWith('.js'))\n      .sort()\n      .map((file) => {\n        const match = file.match(/^(\\d+)_(.+)\\.js$/);\n        if (!match) return null;\n        return {\n          version: match[1],\n          name: match[2],\n          file,\n          path: path.join(MIGRATIONS_DIR, file),\n        };\n      })\n      .filter(Boolean);\n  } catch (error) {\n    console.error('[Migration] Failed to read migration files:', error.message);\n    throw error;\n  }\n}\n\n/**\n * Get list of pending migrations\n * @returns {Promise<Array>} Pending migration objects\n */\nasync function getPendingMigrations() {\n  const applied = await getAppliedMigrations();\n  const allMigrations = await getMigrationFiles();\n\n  const appliedVersions = new Set(applied.map((m) => m.version));\n\n  return allMigrations.filter((m) => !appliedVersions.has(m.version));\n}\n\n/**\n * Load and execute a migration module\n * @param {string} migrationPath - Path to migration file\n * @param {string} direction - 'up' or 'down'\n * @param {object} client - Database client for transaction\n * @returns {Promise<void>}\n */\nasync function executeMigration(migrationPath, direction, client) {\n  // Clear require cache to ensure fresh load\n  delete require.cache[require.resolve(migrationPath)];\n  const migration = require(migrationPath);\n\n  if (typeof migration[direction] !== 'function') {\n    throw new Error(`Migration does not have a '${direction}' function`);\n  }\n\n  await migration[direction](client);\n}\n\n/**\n * Run all pending migrations\n * @param {string} targetVersion - Optional: run migrations up to this version\n * @returns {Promise<Array>} Applied migrations\n */\nasync function migrateUp(targetVersion = null) {\n  await initializeMigrationsTable();\n\n  const pending = await getPendingMigrations();\n\n  if (pending.length === 0) {\n    console.log('[Migration] No pending migrations');\n    return [];\n  }\n\n  const migrationsToRun = targetVersion\n    ? pending.filter((m) => m.version <= targetVersion)\n    : pending;\n\n  const applied = [];\n\n  for (const migration of migrationsToRun) {\n    await db.transaction(async (client) => {\n      try {\n        console.log(`[Migration] Running: ${migration.version}_${migration.name}...`);\n        await executeMigration(migration.path, 'up', client);\n\n        // Record migration as applied\n        await client.query(\n          `INSERT INTO ${MIGRATIONS_TABLE} (version, name) VALUES ($1, $2)`,\n          [migration.version, migration.name]\n        );\n\n        console.log(`[Migration] ✓ Applied: ${migration.version}_${migration.name}`);\n        applied.push(migration);\n      } catch (error) {\n        console.error(\n          `[Migration] ✗ Failed: ${migration.version}_${migration.name}`,\n          error.message\n        );\n        throw error;\n      }\n    });\n  }\n\n  return applied;\n}\n\n/**\n * Rollback the last applied migration(s)\n * @param {number} count - Number of migrations to rollback (default: 1)\n * @returns {Promise<Array>} Rolled back migrations\n */\nasync function migrateDown(count = 1) {\n  await initializeMigrationsTable();\n\n  const applied = await getAppliedMigrations();\n  const allMigrations = await getMigrationFiles();\n\n  if (applied.length === 0) {\n    console.log('[Migration] No migrations to rollback');\n    return [];\n  }\n\n  const migrationsToRollback = applied.slice(-count).reverse();\n  const rolledBack = [];\n\n  for (const migration of migrationsToRollback) {\n    const migrationFile = allMigrations.find((m) => m.version === migration.version);\n\n    if (!migrationFile) {\n      console.error(\n        `[Migration] Migration file not found for version ${migration.version}`\n      );\n      continue;\n    }\n\n    await db.transaction(async (client) => {\n      try {\n        console.log(\n          `[Migration] Rolling back: ${migration.version}_${migration.name}...`\n        );\n        await executeMigration(migrationFile.path, 'down', client);\n\n        // Remove migration record\n        await client.query(`DELETE FROM ${MIGRATIONS_TABLE} WHERE version = $1`, [\n          migration.version,\n        ]);\n\n        console.log(\n          `[Migration] ✓ Rolled back: ${migration.version}_${migration.name}`\n        );\n        rolledBack.push(migration);\n      } catch (error) {\n        console.error(\n          `[Migration] ✗ Rollback failed: ${migration.version}_${migration.name}`,\n          error.message\n        );\n        throw error;\n      }\n    });\n  }\n\n  return rolledBack;\n}\n\n/**\n * Get migration status report\n * @returns {Promise<object>} Status report\n */\nasync function getStatus() {\n  await initializeMigrationsTable();\n\n  const applied = await getAppliedMigrations();\n  const pending = await getPendingMigrations();\n\n  return {\n    applied: applied.length,\n    pending: pending.length,\n    total: applied.length + pending.length,\n    appliedMigrations: applied,\n    pendingMigrations: pending,\n  };\n}\n\nmodule.exports = {\n  initializeMigrationsTable,\n  getAppliedMigrations,\n  getMigrationFiles,\n  getPendingMigrations,\n  migrateUp,\n  migrateDown,\n  getStatus,\n};\n"
  },
  {
    "path": "src/database/migrations/001_create_users.js",
    "content": "/**\n * Migration 001: Create users table\n * Stores user account information including authentication credentials\n */\n\nconst up = async (client) => {\n  const sql = `\n    CREATE TABLE users (\n      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n      email VARCHAR(255) UNIQUE NOT NULL,\n      password_hash VARCHAR(255) NOT NULL,\n      first_name VARCHAR(100),\n      last_name VARCHAR(100),\n      phone VARCHAR(20),\n      addresses JSONB DEFAULT '[]'::jsonb,\n      is_active BOOLEAN DEFAULT true,\n      last_login TIMESTAMP,\n      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n    );\n\n    CREATE INDEX idx_users_email ON users(email);\n    CREATE INDEX idx_users_is_active ON users(is_active);\n    CREATE INDEX idx_users_created_at ON users(created_at);\n\n    COMMENT ON TABLE users IS 'User accounts for the e-commerce platform';\n    COMMENT ON COLUMN users.addresses IS 'JSON array of shipping/billing addresses';\n  `;\n\n  await client.query(sql);\n};\n\nconst down = async (client) => {\n  const sql = 'DROP TABLE IF EXISTS users CASCADE;';\n  await client.query(sql);\n};\n\nmodule.exports = { up, down };\n"
  },
  {
    "path": "src/database/migrations/002_create_categories.js",
    "content": "/**\n * Migration 002: Create categories table\n * Stores product categories for organizing the product catalog\n */\n\nconst up = async (client) => {\n  const sql = `\n    CREATE TABLE categories (\n      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n      name VARCHAR(255) UNIQUE NOT NULL,\n      description TEXT,\n      slug VARCHAR(255) UNIQUE NOT NULL,\n      is_active BOOLEAN DEFAULT true,\n      display_order INTEGER DEFAULT 0,\n      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n    );\n\n    CREATE INDEX idx_categories_slug ON categories(slug);\n    CREATE INDEX idx_categories_is_active ON categories(is_active);\n    CREATE INDEX idx_categories_display_order ON categories(display_order);\n\n    COMMENT ON TABLE categories IS 'Product categories (chocolates, gummies, hard candies, etc.)';\n  `;\n\n  await client.query(sql);\n};\n\nconst down = async (client) => {\n  const sql = 'DROP TABLE IF EXISTS categories CASCADE;';\n  await client.query(sql);\n};\n\nmodule.exports = { up, down };\n"
  },
  {
    "path": "src/database/migrations/003_create_products.js",\    "content": "/**\n * Migration 003: Create products table\n * Stores product information including pricing and inventory\n */\n\nconst up = async (client) => {\n  const sql = `\n    CREATE TABLE products (\n      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n      category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,\n      name VARCHAR(255) NOT NULL,\n      description TEXT,\n      sku VARCHAR(100) UNIQUE NOT NULL,\n      price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),\n      cost_price DECIMAL(10, 2) CHECK (cost_price >= 0),\n      stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),\n      low_stock_threshold INTEGER DEFAULT 10,\n      is_active BOOLEAN DEFAULT true,\n      image_url VARCHAR(500),\n      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n    );\n\n    CREATE INDEX idx_products_category_id ON products(category_id);\n    CREATE INDEX idx_products_sku ON products(sku);\n    CREATE INDEX idx_products_is_active ON products(is_active);\n    CREATE INDEX idx_products_name ON products USING GIN(to_tsvector('english', name));\n    CREATE INDEX idx_products_created_at ON products(created_at);\n\n    COMMENT ON TABLE products IS 'Product catalog for the candy shop';\n    COMMENT ON COLUMN products.sku IS 'Stock Keeping Unit for inventory tracking';\n    COMMENT ON COLUMN products.low_stock_threshold IS 'Alert threshold for low inventory';\n  `;\n\n  await client.query(sql);\n};\n\nconst down = async (client) => {\n  const sql = 'DROP TABLE IF EXISTS products CASCADE;';\n  await client.query(sql);\n};\n\nmodule.exports = { up, down };\n"
  },
  {
    "path": "src/database/migrations/004_create_orders.js",
    "content": "/**\n * Migration 004: Create orders table\n * Stores order headers with status and payment information\n */\n\nconst up = async (client) => {\n  const sql = `\n    CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled');\n\n    CREATE TABLE orders (\n      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n      user_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,\n      order_number VARCHAR(50) UNIQUE NOT NULL,\n      total_amount DECIMAL(12, 2) NOT NULL CHECK (total_amount >= 0),\n      subtotal DECIMAL(12, 2) NOT NULL DEFAULT 0,\n      tax_amount DECIMAL(12, 2) NOT NULL DEFAULT 0,\n      shipping_cost DECIMAL(12, 2) NOT NULL DEFAULT 0,\n      discount_amount DECIMAL(12, 2) NOT NULL DEFAULT 0,\n      status order_status NOT NULL DEFAULT 'pending',\n      payment_method VARCHAR(50),\n      payment_status VARCHAR(50) DEFAULT 'pending',\n      shipping_address JSONB,\n      billing_address JSONB,\n      notes TEXT,\n      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n    );\n\n    CREATE INDEX idx_orders_user_id ON orders(user_id);\n    CREATE INDEX idx_orders_order_number ON orders(order_number);\n    CREATE INDEX idx_orders_status ON orders(status);\n    CREATE INDEX idx_orders_payment_status ON orders(payment_status);\n    CREATE INDEX idx_orders_created_at ON orders(created_at);\n\n    COMMENT ON TABLE orders IS 'Customer orders';\n    COMMENT ON COLUMN orders.order_number IS 'Human-readable order identifier';\n    COMMENT ON COLUMN orders.shipping_address IS 'JSON object with shipping details';\n  `;\n\n  await client.query(sql);\n};\n\nconst down = async (client) => {\n  const sql = `\n    DROP TABLE IF EXISTS orders CASCADE;\n    DROP TYPE IF EXISTS order_status;\n  `;\n  await client.query(sql);\n};\n\nmodule.exports = { up, down };\n"
  },
  {
    "path": "src/database/migrations/005_create_order_items.js",
    "content": "/**\n * Migration 005: Create order_items table\n * Stores individual line items within orders\n */\n\nconst up = async (client) => {\n  const sql = `\n    CREATE TABLE order_items (\n      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n      order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,\n      product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,\n      quantity INTEGER NOT NULL CHECK (quantity > 0),\n      unit_price DECIMAL(10, 2) NOT NULL CHECK (unit_price >= 0),\n      subtotal DECIMAL(12, 2) NOT NULL CHECK (subtotal >= 0),\n      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n    );\n\n    CREATE INDEX idx_order_items_order_id ON order_items(order_id);\n    CREATE INDEX idx_order_items_product_id ON order_items(product_id);\n\n    COMMENT ON TABLE order_items IS 'Individual items within orders';\n    COMMENT ON COLUMN order_items.unit_price IS 'Price at time of purchase (snapshot)';\n  `;\n\n  await client.query(sql);\n};\n\nconst down = async (client) => {\n  const sql = 'DROP TABLE IF EXISTS order_items CASCADE;';\n  await client.query(sql);\n};\n\nmodule.exports = { up, down };\n"
  },
  {
    "path": "scripts/migrate.js",
    "content": "#!/usr/bin/env node\n\n/**\n * Database Migration CLI Tool\n * Usage:\n *   node scripts/migrate.js up              - Run all pending migrations\n *   node scripts/migrate.js up --target 003 - Run migrations up to version 003\n *   node scripts/migrate.js down            - Rollback last migration\n *   node scripts/migrate.js down --count 2  - Rollback last 2 migrations\n *   node scripts/migrate.js status          - Show migration status\n */\n\nconst path = require('path');\nrequire('dotenv').config({ path: path.resolve(__dirname, '../.env') });\n\nconst migrationRunner = require('../src/database/migrationRunner');\nconst db = require('../src/database/db');\n\nconst command = process.argv[2];\nconst arg = process.argv[3];\nconst value = process.argv[4];\n\nasync function handleCommand() {\n  try {\n    console.log('[Migrate] Starting migration tool...\\n');\n\n    switch (command) {\n      case 'up': {\n        const targetVersion = arg === '--target' ? value : null;\n        console.log('[Migrate] Running forward migrations...\\n');\n        await migrationRunner.migrateUp(targetVersion);\n        console.log('[Migrate] ✓ Forward migrations completed\\n');\n        break;\n      }\n\n      case 'down': {\n        const count = arg === '--count' ? parseInt(value, 10) : 1;\n        if (Number.isNaN(count) || count < 1) {\n          console.error('[Migrate] Invalid count parameter');\n          process.exit(1);\n        }\n        console.log(`[Migrate] Rolling back ${count} migration(s)...\\n`);\n        await migrationRunner.migrateDown(count);\n        console.log('[Migrate] ✓ Rollback completed\\n');\n        break;\n      }\n\n      case 'status': {\n        console.log('[Migrate] Migration Status:\\n');\n        const status = await migrationRunner.getStatus();\n\n        console.log(`