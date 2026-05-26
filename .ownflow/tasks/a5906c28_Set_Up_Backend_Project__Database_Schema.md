# Backend Project Setup & Database Schema

I'll set up a complete backend project using Node.js/Express with PostgreSQL, including database schema, migrations, and connection configuration.

## Project Structure Overview

```
candy-shop-backend/
├── migrations/
│   └── 001_initial_schema.sql
├── src/
│   ├── config/
│   │   └── database.js
│   ├── models/
│   │   ├── Category.js
│   │   ├── Product.js
│   │   ├── User.js
│   │   └── Order.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── routes/
│   │   └── index.js
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Implementation

### 1. Database Configuration

The database module handles connections, pooling, and query execution with proper error handling.

### 2. Database Schema

The schema includes:
- **Categories**: Product category hierarchy
- **Products**: Product details with inventory tracking
- **Users**: Customer accounts with authentication support
- **Orders**: Order header with status tracking
- **Order Items**: Line items for each order
- Proper indexes for query performance
- Foreign key constraints for data integrity

### 3. Model Layer

Models provide typed interfaces for data validation and business logic.

### 4. Server Configuration

Express server with middleware setup for error handling, logging, and extensibility.

### 5. Environment & Dependencies

Proper configuration management and all required dependencies.

---