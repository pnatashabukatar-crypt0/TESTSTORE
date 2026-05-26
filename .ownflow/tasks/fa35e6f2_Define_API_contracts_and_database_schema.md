# TEST SHOP API Contracts & Database Schema

This document defines the complete RESTful API specification and PostgreSQL database schema for the TEST SHOP e-commerce platform.

---

## Table of Contents

1. [Database Schema](#database-schema)
2. [ERD Diagram](#erd-diagram)
3. [API Specification](#api-specification)
4. [Authentication](#authentication)
5. [Error Handling](#error-handling)

---

## Database Schema

### Overview

The schema supports core e-commerce functionality: user management, product catalog, shopping carts, and order processing.

### Table Definitions

#### 1. **users**
Stores customer and admin user accounts.

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_deleted_at ON users(deleted_at);
```

#### 2. **categories**
Product categories (chocolates, gummies, hard candies, etc.).

```sql
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  icon_url VARCHAR(500),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_is_active ON categories(is_active);
```

#### 3. **products**
Candy products available for purchase.

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
  cost DECIMAL(10, 2),
  stock_quantity INTEGER NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
  sku VARCHAR(100) UNIQUE,
  image_url VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  weight_grams DECIMAL(8, 2),
  allergens VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_products_is_featured ON products(is_featured);
CREATE INDEX idx_products_stock_quantity ON products(stock_quantity);
```

#### 4. **shopping_carts**
User shopping cart sessions.

```sql
CREATE TABLE shopping_carts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_token VARCHAR(255) UNIQUE,
  status VARCHAR(20) DEFAULT 'active',
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_shopping_carts_user_id ON shopping_carts(user_id);
CREATE INDEX idx_shopping_carts_session_token ON shopping_carts(session_token);
```

#### 5. **cart_items**
Items in a shopping cart.

```sql
CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  cart_id INTEGER NOT NULL REFERENCES shopping_carts(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  price_at_add DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(cart_id, product_id)
);

CREATE INDEX idx_cart_items_cart_id ON cart_items(cart_id);
CREATE INDEX idx_cart_items_product_id ON cart_items(product_id);
```

#### 6. **orders**
Customer orders.

```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  status VARCHAR(50) DEFAULT 'pending',
  total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
  subtotal DECIMAL(10, 2) NOT NULL CHECK (subtotal >= 0),
  tax_amount DECIMAL(10, 2) DEFAULT 0 CHECK (tax_amount >= 0),
  shipping_cost DECIMAL(10, 2) DEFAULT 0 CHECK (shipping_cost >= 0),
  discount_amount DECIMAL(10, 2) DEFAULT 0 CHECK (discount_amount >= 0),
  shipping_address TEXT NOT NULL,
  billing_address TEXT,
  payment_method VARCHAR(50),
  payment_status VARCHAR(50) DEFAULT 'pending',
  stripe_payment_id VARCHAR(255),
  notes TEXT,
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
```

#### 7. **order_items**
Individual items in an order.

```sql
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  unit_price DECIMAL(10, 2) NOT NULL CHECK (unit_price > 0),
  subtotal DECIMAL(10, 2) NOT NULL CHECK (subtotal > 0),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
```

#### 8. **inventory_logs** (Optional)
Track inventory changes for audit purposes.

```sql
CREATE TABLE inventory_logs (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity_change INTEGER NOT NULL,
  reason VARCHAR(100),
  order_id INTEGER REFERENCES orders(id) ON DELETE SET NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_inventory_logs_product_id ON inventory_logs(product_id);
CREATE INDEX idx_inventory_logs_created_at ON inventory_logs(created_at);
```

---

## ERD Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          E-COMMERCE SCHEMA                         │
└─────────────────────────────────────────────────────────────────────┘

                              ┌──────────────┐
                              │    users     │
                              ├──────────────┤
                              │ id (PK)      │
                              │ email        │
                              │ password_hash│
                              │ first_name   │
                              │ last_name    │
                              │ phone        │
                              │ is_admin     │
                              │ timestamps   │
                              └──────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    │               │               │
                    ↓               ↓               ↓
            ┌─────────────┐  ┌─────────────┐  ┌──────────────┐
            │shopping_cart│  │   orders    │  │orders (own)  │
            ├─────────────┤  ├─────────────┤  │              │
            │ id (PK)     │  │ id (PK)     │  │order_number  │
            │ user_id(FK) │  │ user_id(FK) │  │status        │
            │ session_tok.│  │ order_num   │  │total_amount  │
            │ status      │  │ status      │  │...timestamps│
            │ timestamps  │  │ total_amou..│  └──────────────┘
            └─────────────┘  └─────────────┘
                    │               │
                    ↓               ↓
            ┌─────────────┐  ┌──────────────┐
            │ cart_items  │  │ order_items  │
            ├─────────────┤  ├──────────────┤
            │ id (PK)     │  │ id (PK)      │
            │ cart_id(FK) │  │ order_id(FK) │
            │ product_id..│  │ product_id..│
            │ quantity    │  │ quantity     │
            │ price_at_add│  │ unit_price   │
            └─────────────┘  └──────────────┘
                    │               │
                    └───────┬───────┘
                            │
                            ↓
                    ┌──────────────────┐
                    │    products      │
                    ├──────────────────┤
                    │ id (PK)          │
                    │ category_id (FK) │
                    │ name             │
                    │ slug             │
                    │ description      │
                    │ price            │
                    │ cost             │
                    │ stock_quantity   │
                    │ sku              │
                    │ image_url        │
                    │ is_active        │
                    │ is_featured      │
                    │ weight_grams     │
                    │ allergens        │
                    │ timestamps       │
                    └──────────────────┘
                            │
                            ↓
                    ┌──────────────────┐
                    │   categories     │
                    ├──────────────────┤
                    │ id (PK)          │
                    │ name             │
                    │ slug             │
                    │ description      │
                    │ icon_url         │
                    │ display_order    │
                    │ is_active        │
                    │ timestamps       │
                    └──────────────────┘


                    ┌──────────────────┐
                    │ inventory_logs   │
                    ├──────────────────┤
                    │ id (PK)          │
                    │ product_id (FK)  │
                    │ quantity_change  │
                    │ reason           │
                    │ order_id (FK)    │
                    │ user_id (FK)     │
                    │ created_at       │
                    └──────────────────┘
```

---

## API Specification

### Base URL
```
http://api.testshop.local/api/v1
```

### Request/Response Format
- **Content-Type**: `application/json`
- **Date Format**: ISO 8601 (e.g., `2024-01-15T10:30:00Z`)
- **Monetary Values**: Decimal (e.g., `29.99`)

---

## Authentication

### JWT Token Authentication
All protected endpoints require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <jwt_token>
```

**Token Refresh**: Tokens expire after 24 hours. Use the `/auth/refresh` endpoint to obtain a new token.

**Admin Access**: Endpoints requiring admin privileges check the `is_admin` flag in the JWT payload.

---

## Error Handling

### Standard Error Response
```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Product not found",
    "details": "Product with ID 999 does not exist"
  }
}
```

### HTTP Status Codes
| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing/invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Duplicate/constraint violation |
| 422 | Unprocessable Entity - Validation error |
| 500 | Internal Server Error |

---

## API Endpoints

### 1. Authentication Endpoints

#### Register User
```
POST /auth/register
```

**Request Body:**
```json
{
  "email": "customer@example.com",
  "password": "securePassword123!",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "+1-555-0123"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "customer@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "phone": "+1-555-0123",
    "is_admin": false,
    "created_at": "2024-01-15T10:30:00Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Cases:**
- `400`: Email already exists
- `422`: Validation error (weak password, invalid email)

---

#### Login
```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "customer@example.com",
  "password": "securePassword123!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "customer@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "is_admin": false
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 86400
}
```

**Error Cases:**
- `401`: Invalid credentials
- `404`: User not found

---

#### Refresh Token
```
POST /auth/refresh
```

**Request Body:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expires_in": 86400
}
```

---

#### Logout
```
POST /auth/logout
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### 2. User Profile Endpoints

#### Get Current User Profile
```
GET /users/me
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "customer@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "phone": "+1-555-0123",
    "is_admin": false,
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-01-15T10:30:00Z"
  }
}
```

---

#### Update User Profile
```
PUT /users/me
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Smith",
  "phone": "+1-555-9876"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "customer@example.com",
    "first_name": "John",
    "last_name": "Smith",
    "phone": "+1-555-9876",
    "updated_at": "2024-01-15T15:45:00Z"
  }
}
```

---

#### Change Password
```
POST /users/me/change-password
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "current_password": "oldPassword123!",
  "new_password": "newPassword456!"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Error Cases:**
- `401`: Current password incorrect

---

### 3. Category Endpoints

#### List All Categories
```
GET /categories
```

**Query Parameters:**
- `is_active` (boolean, optional): Filter by active status (default: true)
- `sort` (string, optional): Sort by `display_order`, `name` (default: `display_order`)
- `limit` (integer, optional): Max results (default: 50)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Chocolates",
      "slug": "chocolates",
      "description": "Premium chocolate candies",
      "icon_url": "https://cdn.example.com/icons/chocolates.png",
      "display_order": 1,
      "is_active": true,
      "created_at": "2024-01-01T00:00:00Z"
    },
    {
      "id": 2,
      "name": "Gummies",
      "slug": "gummies",
      "description": "Gummy candies",
      "icon_url": "https://cdn.example.com/icons/gummies.png",
      "display_order": 2,
      "is_active": true,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "total": 2,
    "limit": 50,
    "offset": 0
  }
}
```

---

#### Get Category by ID
```
GET /categories/:id
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Chocolates",
    "slug": "chocolates",
    "description": "Premium chocolate candies",
    "icon_url": "https://cdn.example.com/icons/chocolates.png",
    "display_order": 1,
    "is_active": true,
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

**Error Cases:**
- `404`: Category not found

---

#### Create Category (Admin)
```
POST /admin/categories
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "Hard Candies",
  "slug": "hard-candies",
  "description": "Traditional hard candies",
  "icon_url": "https://cdn.example.com/icons/hard-candies.png",
  "display_order": 3
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 3,
    "name": "Hard Candies",
    "slug": "hard-candies",
    "description": "Traditional hard candies",
    "icon_url": "https://cdn.example.com/icons/hard-candies.png",
    "display_order": 3,
    "is_active": true,
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

**Error Cases:**
- `403`: Not an admin
- `409`: Slug already exists

---

#### Update Category (Admin)
```
PUT /admin/categories/:id
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "Premium Hard Candies",
  "description": "Updated description",
  "display_order": 4,
  "is_active": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 3,
    "name": "Premium Hard Candies",
    "slug": "hard-candies",
    "description": "Updated description",
    "icon_url": "https://cdn.example.com/icons/hard-candies.png",
    "display_order": 4,
    "is_active": true,
    "updated_at": "2024-01-15T14:20:00Z"
  }
}
```

---

#### Delete Category (Admin)
```
DELETE /admin/categories/:id
Authorization: Bearer <admin_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```

**Error Cases:**
- `409`: Category has associated products

---

### 4. Product Endpoints

#### List All Products
```
GET /products
```

**Query Parameters:**
- `category_id` (integer, optional): Filter by category
- `search` (string, optional): Search by name/description (min 2 chars)
- `is_active` (boolean, optional): Filter active products (default: true)
- `is_featured` (boolean, optional): Show featured only
- `sort` (string, optional): Sort by `name`, `price_asc`, `price_desc`, `newest` (default: `name`)
- `limit` (integer, optional): Max results (default: 20, max: 100)
- `offset` (integer, optional): Pagination offset (default: 0)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "category_id": 1,
      "category_name": "Chocolates",
      "name": "Dark Chocolate Bar",
      "slug": "dark-chocolate-bar",
      "description": "70% pure dark chocolate",
      "price": 4.99,
      "stock_quantity": 150,
      "sku": "CHO-001",
      "image_url": "https://cdn.example.com/products/dark-chocolate.jpg",
      "is_active": true,
      "is_featured": true,
      "weight_grams": 100,
      "allergens": "Contains: Tree Nuts, Milk",
      "created_at": "2024-01-01T00:00:00Z"
    },
    {
      "id": 2,
      "category_id": 1,
      "category_name": "Chocolates",
      "name": "Milk Chocolate Truffle",
      "slug": "milk-chocolate-truffle",
      "description": "Smooth milk chocolate truffles",
      "price": 6.99,
      "stock_quantity": 200,
      "sku": "CHO-002",
      "image_url": "https://cdn.example.com/products/milk-truffle.jpg",
      "is_active": true,
      "is_featured": false,
      "weight_grams": 150,
      "allergens": "Contains: Milk",
      "created_at": "2024-01-02T00:00:00Z"
    }
  ],
  "pagination": {
    "total": 45,
    "limit": 20,
    "offset": 0,
    "total_pages": 3
  }
}
```

---

#### Get Product by ID
```
GET /products/:id
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "category_id": 1,
    "category_name": "Chocolates",
    "name": "Dark Chocolate Bar",
    "slug": "dark-chocolate-bar",
    "description": "70% pure dark chocolate with premium cocoa beans",
    "price": 4.99,
    "stock_quantity": 150,
    "sku": "CHO-001",
    "image_url": "https://cdn.example.com/products/dark-chocolate.jpg",
    "is_active": true,
    "is_featured": true,
    "weight_grams": 100,
    "allergens": "Contains: Tree Nuts, Milk",
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

**Error Cases:**
- `404`: Product not found

---

#### Get Product by Slug
```
GET /products/slug/:slug
```

**Response (200 OK):**
Same structure as Get Product by ID.

---

#### Search Products
```
GET /products/search
```

**Query Parameters:**
- `q` (string, required): Search term (min 2 chars)
- `category_id` (integer, optional): Limit to category
- `limit` (integer, optional): Max results (default: 20)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Dark Chocolate Bar",
      "slug": "dark-chocolate-bar",
      "price": 4.99,
      "image_url": "https://cdn.example.com/products/dark-chocolate.jpg",
      "category_name": "Chocolates"
    }
  ],
  "pagination": {
    "total": 1,
    "limit": 20
  }
}
```

**Error Cases:**
- `422`: Search query too short (< 2 chars)

---

#### Create Product (Admin)
```
POST /admin/products
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "category_id": 1,
  "name": "White Chocolate Bark",
  "slug": "white-chocolate-bark",
  "description": "Creamy white chocolate with almonds",
  "price": 5.99,
  "cost": 2.50,
  "stock_quantity": 100,
  "sku": "CHO-003",
  "image_url": "https://cdn.example.com/products/white-bark.jpg",
  "weight_grams": 120,
  "allergens": "Contains: Tree Nuts, Milk"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": 3,
    "category_id": 1,
    "name": "White Chocolate Bark",
    "slug": "white-chocolate-bark",
    "description": "Creamy white chocolate with almonds",
    "price": 5.99,
    "cost": 2.50,
    "stock_quantity": 100,
    "sku": "CHO-003",
    "image_url": "https://cdn.example.com/products/white-bark.jpg",
    "is_active": true,
    "is_featured": false,
    "weight_grams": 120,
    "allergens": "Contains: Tree Nuts, Milk",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

**Error Cases:**
- `403`: Not an admin
- `404`: Category not found
- `409`: SKU already exists
- `422`: Validation error (price <= 0, missing required fields)

---

#### Update Product (Admin)
```
PUT /admin/products/:id
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "name": "Premium White Chocolate Bark",
  "description": "Updated description",
  "price": 6.49,
  "stock_quantity": 120,
  "is_featured": true,
  "is_active": true
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 3,
    "category_id": 1,
    "name": "Premium White Chocolate Bark",
    "slug": "white-chocolate-bark",
    "description": "Updated description",
    "price": 6.49,
    "stock_quantity": 120,
    "sku": "CHO-003",
    "image_url": "https://cdn.example.com/products/white-bark.jpg",
    "is_active": true,
    "is_featured": true,
    "updated_at": "2024-01-15T14:20:00Z"
  }
}
```

---

#### Delete Product (Admin)
```
DELETE /admin/products/:id
Authorization: Bearer <admin_token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

#### Update Product Inventory (Admin)
```
PATCH /admin/products/:id/inventory
Authorization: Bearer <admin_token>
```

**Request Body:**
```json
{
  "quantity_change": -10,
  "reason": "Adjustment for inventory count"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "product_id": 1,
    "previous_stock": 150,
    "new_stock": 140,
    "quantity_change": -10,
    "reason": "Adjustment for inventory count"
  }
}
```

**Error Cases:**
- `422`: Insufficient stock
- `403`: Not an admin

---

### 5. Shopping Cart Endpoints

#### Get Current Cart
```
GET /cart
Authorization: Bearer <token>
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 10,
    "user_id": 1,
    "status": "active",
    "items": [
      {
        "id": 25,
        "product_id": 1,
        "product_name": "Dark Chocolate Bar",
        "product_slug": "dark-chocolate-bar",
        "quantity": 2,
        "price_at_add": 4.99,
        "line_total": 9.98,
        "image_url": "https://cdn.example.com/products/dark-chocolate.jpg"
      },
      {
        "id": 26,
        "product_id": 2,
        "product_name": "Milk Chocolate Truffle",
        "product_slug": "milk-chocolate-truffle",
        "quantity": 1,
        "price_at_add": 6.99,
        "line_total": 6.99,
        "image_url": "https://cdn.example.com/products/milk-truffle.jpg"
      }
    ],
    "summary": {
      "subtotal": 16.97,
      "item_count": 3,
      "unique_items": 2
    },
    "created_at": "2024-01-15T08