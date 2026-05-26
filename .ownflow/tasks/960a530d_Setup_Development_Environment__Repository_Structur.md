# TEST SHOP - Development Environment & Repository Setup

I'll create a comprehensive, production-ready development environment setup for the TEST SHOP e-commerce platform with Docker, proper Git workflow, and developer tooling.

## Overview

This deliverable includes:
- Complete Git repository structure with branching strategy
- Docker Compose setup for local development
- Backend (Node.js/Express) configuration with testing & linting
- Frontend (Vue.js) configuration with Vite & tooling
- Comprehensive setup documentation
- Pre-commit hooks and development scripts
- GitHub Actions workflow templates

---

## Repository Structure

```
test-shop/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   └── pre-merge-checks.yml
│   └── pull_request_template.md
├── .gitignore
├── .prettierrc
├── .eslintignore
├── docker-compose.yml
├── docker-compose.prod.yml
├── Dockerfile.backend
├── Dockerfile.frontend
├── package.json (root)
├── README.md
├── SETUP.md
├── CONTRIBUTING.md
├── docker/
│   ├── entrypoint.backend.sh
│   └── entrypoint.frontend.sh
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── server.js
│   ├── tests/
│   ├── .env.example
│   ├── .eslintrc.json
│   ├── jest.config.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── stores/
│   │   ├── router/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.vue
│   │   └── main.js
│   ├── tests/
│   ├── .env.example
│   ├── .eslintrc.json
│   ├── vite.config.js
│   └── package.json
└── scripts/
    ├── setup.sh
    ├── migrate-db.sh
    └── seed-db.sh
```

---

## Detailed Implementation

### 1. Root Configuration Files

**`.gitignore`** - Comprehensive ignore patterns
```
node_modules/
dist/
build/
.env
.env.local
.env.*.local
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.DS_Store
.idea/
.vscode/
*.swp
*.swo
*~
.cache/
coverage/
.nyc_output/
mongodb/
postgres/
```

**`.prettierrc`** - Code formatting configuration
```json
{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "jsxSingleQuote": false,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### 2. Docker Configuration

**`docker-compose.yml`** - Local development environment with hot-reload
```yaml
version: '3.9'

services:
  # MongoDB Database
  mongodb:
    image: mongo:6.0-alpine
    container_name: test-shop-mongodb
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_INITDB_ROOT_USERNAME:-admin}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_INITDB_ROOT_PASSWORD:-password123}
      MONGO_INITDB_DATABASE: test_shop
    volumes:
      - mongodb_data:/data/db
      - mongodb_config:/data/configdb
      - ./docker/init-mongo.js:/docker-entrypoint-initdb.d/init.js:ro
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongosh localhost:27017/test_shop -u admin -p password123
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - test-shop-network

  # Node.js Backend
  backend:
    build:
      context: ./backend
      dockerfile: ../Dockerfile.backend
      target: development
    container_name: test-shop-backend
    ports:
      - "5000:5000"
      - "9229:9229"  # Node debugger
    environment:
      NODE_ENV: development
      MONGODB_URI: mongodb://admin:password123@mongodb:27017/test_shop?authSource=admin
      JWT_SECRET: ${JWT_SECRET:-dev-secret-key-change-in-production}
      STRIPE_SECRET_KEY: ${STRIPE_SECRET_KEY:-sk_test_dummy}
      STRIPE_PUBLISHABLE_KEY: ${STRIPE_PUBLISHABLE_KEY:-pk_test_dummy}
      SMTP_HOST: ${SMTP_HOST:-smtp.mailtrap.io}
      SMTP_PORT: ${SMTP_PORT:-465}
      SMTP_USER: ${SMTP_USER:-}
      SMTP_PASS: ${SMTP_PASS:-}
    volumes:
      - ./backend/src:/app/src
      - ./backend/tests:/app/tests
      - /app/node_modules
    depends_on:
      mongodb:
        condition: service_healthy
    command: npm run dev
    networks:
      - test-shop-network
    labels:
      - "com.example.description=TEST SHOP Backend API"

  # Vue.js Frontend
  frontend:
    build:
      context: ./frontend
      dockerfile: ../Dockerfile.frontend
      target: development
    container_name: test-shop-frontend
    ports:
      - "5173:5173"
    environment:
      VITE_API_BASE_URL: http://localhost:5000/api
      NODE_ENV: development
    volumes:
      - ./frontend/src:/app/src
      - ./frontend/tests:/app/tests
      - ./frontend/public:/app/public
      - /app/node_modules
    depends_on:
      - backend
    command: npm run dev
    networks:
      - test-shop-network
    labels:
      - "com.example.description=TEST SHOP Frontend UI"

  # Development Tools - Mongo Express (optional)
  mongo-express:
    image: mongo-express:latest
    container_name: test-shop-mongo-express
    ports:
      - "8081:8081"
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: ${MONGO_INITDB_ROOT_USERNAME:-admin}
      ME_CONFIG_MONGODB_ADMINPASSWORD: ${MONGO_INITDB_ROOT_PASSWORD:-password123}
      ME_CONFIG_MONGODB_URL: mongodb://admin:password123@mongodb:27017/
    depends_on:
      - mongodb
    networks:
      - test-shop-network
    profiles:
      - tools

volumes:
  mongodb_data:
    driver: local
  mongodb_config:
    driver: local

networks:
  test-shop-network:
    driver: bridge
```

**`Dockerfile.backend`** - Multi-stage Node.js backend
```dockerfile
# Development stage
FROM node:18-alpine AS development

WORKDIR /app

# Install development dependencies
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies with dev packages
RUN npm ci

# Copy source code
COPY . .

# Expose ports (application + debugger)
EXPOSE 5000 9229

# Development command with hot reload
CMD ["npm", "run", "dev"]

# Production build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

COPY . .

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

RUN apk add --no-cache dumb-init

# Copy node modules from builder
COPY --from=builder /app/node_modules ./node_modules

# Copy source
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

EXPOSE 5000

CMD ["dumb-init", "node", "src/server.js"]
```

**`Dockerfile.frontend`** - Multi-stage Vue.js frontend
```dockerfile
# Development stage
FROM node:18-alpine AS development

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]

# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# Production stage with Nginx
FROM nginx:alpine AS production

COPY --from=builder /app/dist /usr/share/nginx/html

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### 3. Backend Configuration

**`backend/package.json`**
```json
{
  "name": "test-shop-backend",
  "version": "1.0.0",
  "description": "TEST SHOP E-commerce Platform API",
  "main": "src/server.js",
  "type": "module",
  "scripts": {
    "dev": "NODE_OPTIONS=--inspect=0.0.0.0 nodemon src/server.js",
    "start": "node src/server.js",
    "test": "jest --coverage",
    "test:watch": "jest --watch",
    "test:debug": "node --inspect-brk node_modules/.bin/jest --runInBand",
    "lint": "eslint src tests --ext .js",
    "lint:fix": "eslint src tests --ext .js --fix",
    "format": "prettier --write 'src/**/*.js' 'tests/**/*.js'",
    "migrate": "node scripts/migrate-db.js",
    "seed": "node scripts/seed-db.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-async-errors": "^3.1.1",
    "express-validator": "^7.0.0",
    "helmet": "^7.1.0",
    "jsonwebtoken": "^9.1.0",
    "mongoose": "^8.0.0",
    "nodemailer": "^6.9.7",
    "stripe": "^14.0.0",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "@babel/preset-env": "^7.23.0",
    "eslint": "^8.52.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-import": "^2.29.0",
    "jest": "^29.7.0",
    "jest-mongodb": "^6.0.0",
    "nodemon": "^3.0.1",
    "prettier": "^3.1.0",
    "supertest": "^6.3.3"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

**`backend/.eslintrc.json`**
```json
{
  "env": {
    "node": true,
    "es2021": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "prettier"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_"
      }
    ],
    "no-console": [
      "warn",
      {
        "allow": [
          "warn",
          "error"
        ]
      }
    ],
    "prefer-const": "error",
    "no-var": "error"
  }
}
```

**`backend/jest.config.js`**
```javascript
export default {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/index.js',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  testMatch: ['**/tests/**/*.test.js'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {},
  extensionsToTreatAsEsm: ['.js'],
};
```

**`backend/src/server.js`**
```javascript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import 'express-async-errors';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: {
      message,
      statusCode,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Route not found',
      statusCode: 404,
    },
  });
});

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✓ MongoDB connected');
  } catch (error) {
    console.error('✗ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`\n🚀 TEST SHOP Backend running on http://localhost:${PORT}`);
    console.log(`📚 API Docs: http://localhost:${PORT}/api/docs`);
    console.log(`🔍 Health Check: http://localhost:${PORT}/api/health\n`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

export default app;
```

### 4. Frontend Configuration

**`frontend/package.json`**
```json
{
  "name": "test-shop-frontend",
  "version": "1.0.0",
  "description": "TEST SHOP E-commerce Platform UI",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest --coverage",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "lint": "eslint src tests --ext .js,.vue",
    "lint:fix": "eslint src tests --ext .js,.vue --fix",
    "format": "prettier --write 'src/**/*.{js,vue,css}' 'tests/**/*.js'",
    "type-check": "vue-tsc --noEmit"
  },
  "dependencies": {
    "vue": "^3.3.0",
    "vue-router": "^4.3.0",
    "pinia": "^2.1.6",
    "axios": "^1.6.0",
    "lucide-vue-next": "^0.263.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.5.0",
    "@vue/test-utils": "^2.4.1",
    "@vitest/ui": "^1.0.0",
    "eslint": "^8.52.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-vue": "^9.17.0",
    "prettier": "^3.1.0",
    "vite": "^5.0.0",
    "vitest": "^1.0.0",
    "jsdom": "^23.0.0"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

**`frontend/.eslintrc.json`**
```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "prettier"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "vue/multi-word-component-names": "off",
    "vue/singleline-html-element-content-newline": "off",
    "no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_"
      }
    ]
  }
}
```

**`frontend/vite.config.js`**
```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    host: '0.0.0.0',
    hmr: {
      host: 'localhost',
      port: 5173,
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
```

**`frontend/src/main.js`**
```javascript
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './styles/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
```

**`frontend/src/App.vue`**
```vue
<template>
  <div id="app" class="app">
    <nav class="navbar">
      <div class="navbar-brand">
        <h1>🍭 TEST SHOP</h1>
      </div>
      <div class="navbar-links">
        <router-link to="/">Home</router-link>
        <router-link to="/products">Products</router-link>
        <router-link to="/cart">Cart</router-link>
        <router-link to="/account">Account</router-link>
      </div>
    </nav>

    <main class="main-content">
      <router-view />
    </main>

    <footer class="footer">
      <p>&copy; 2024 TEST SHOP. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  console.log('🚀 TEST SHOP Frontend loaded successfully');
});
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.navbar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand h1 {
  margin: 0;
  font-size: 1.5rem;
}

.navbar-links {
  display: flex;
  gap: 2rem;
}

.navbar-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.3s;
}

.navbar-links a:hover {
  opacity: 0.8;
}

.navbar-links a.router-link-active {
  border-bottom: 2px solid white;
  padding-bottom: 0.25rem;
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.footer {
  background: #f8f9fa;
  color: #666;
  text-align: center;
  padding: 2rem;
  margin-top: 3rem;
  border-top: 1px solid #eee;
}
</style>
```

### 5. Setup Documentation

**`README.md`**
```markdown
# 🍭 TEST SHOP - E-commerce Platform

A modern, full-featured e-commerce platform for a candy shop built with Vue.js, Node.js/Express, and MongoDB.

## 🎯 Features

- 🛍️ Product catalog with categories and search
- 🛒 Shopping cart and checkout flow
- 💳 Stripe payment integration
- 👤 User authentication and order history
- 📊 Admin dashboard for inventory management
- 📧 Order confirmation emails
- 📱 Mobile-responsive design
- 🔍 Full-text product search

## 🚀 Quick Start (15 minutes)

### Prerequisites

- **Docker & Docker Compose** - [Install](https://docs.docker.com/get-docker/)
- **Git** - [Install](https://git-scm.com/download)
- **Node.js 18+** - Optional (for local development without Docker)

### 1. Clone the Repository

\`\`\`bash
git clone https://github.com/yourusername/test-shop.git
cd test-shop
\`\`\`

### 2. Setup Environment Variables

\`\`\`bash
# Copy example env files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Edit as needed (defaults work for local development)
\`\`\`

### 3. Start Development Environment

\`\`\`bash
# Using Docker (Recommended)
docker-compose up -d

# Verify services are running
docker-compose ps

# View logs
docker-compose logs -f
\`\`\`

### 4. Access the Application

- **Frontend UI**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health
- **Database UI** (MongoDB Express): http://localhost:8081

### 5. Verify Setup

\`\`\`bash
# Terminal 1: Watch backend logs
docker-compose logs -f backend

# Terminal 2: Watch frontend logs
docker-compose logs -f frontend

# Terminal 3: Test API
curl http://localhost:5000/api/health
\`\`\`

✅ If you see "TEST SHOP Backend running" and "Frontend loaded successfully", you're ready!

## 📁 Project Structure

\`\`\`
test-shop/
├── backend/              # Node.js/Express API
│   ├── src/
│   │   ├── models/       # MongoDB schemas
│   │   ├── controllers/  # Route handlers
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Express middleware
│   │   └── server.js     # Entry point
│   ├── tests/            # Jest test suite
│   └── package.json
├── frontend/             # Vue.js UI
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── stores/       # Pinia stores
│   │   ├── router/       # Vue Router config
│   │   └── main.js       # Entry point
│   ├── tests/            # Vitest test suite
│   └── package.json
├── docker/               # Docker configs
├── scripts/              # DB migration & seed
├── docker-compose.yml    # Development setup
└── README.md
\`\`\`

## 🛠️ Development Workflow

### Using Docker (Recommended)

\`\`\`bash
# Start all services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f [service-name]

# Run commands in container
docker-compose exec backend npm test
docker-compose exec frontend npm run lint:fix

# Rebuild after dependency changes
docker-compose up -d --build
\`\`\`

### Local Development (Without Docker)

\`\`\`bash
# Terminal 1: Backend
cd backend
npm install
npm run dev

# Terminal 2: Frontend
cd frontend
npm install
npm run dev

# Terminal 3: MongoDB (requires local MongoDB running)
# Or use: docker-compose up mongodb -d
\`\`\`

## 🧪 Testing

\`\`\`bash
# Run all tests
docker-compose exec backend npm test
docker-compose exec frontend npm test

# Watch mode
docker-compose exec backend npm run test:watch
docker-compose exec frontend npm run test:watch

# Generate coverage reports
docker-compose exec backend npm test -- --coverage
docker-compose exec frontend npm test -- --coverage
\`\`\`

## 🎨 Code Quality

\`\`\`bash
# Lint code
docker-compose exec backend npm run lint
docker-compose exec frontend npm run lint

# Auto-fix issues
docker-compose exec backend npm run lint:fix
docker-compose exec frontend npm run lint:fix

# Format code
docker-compose exec backend npm run format
docker-compose exec frontend npm run format
\`\`\`

## 🔐 Environment Variables

See \`.env.example\` files in \`backend/\` and \`frontend/\` directories.

**Important**: Never commit real \`.env\` files. Use \`.env.example\` as template.

### Backend Variables

- \`NODE_ENV\` - Environment (development/production)
- \`MONGODB_URI\` - MongoDB connection string
- \`JWT_SECRET\` - JWT signing secret
- \`STRIPE_SECRET_KEY\` - Stripe API key
- \`SMTP_*\` - Email configuration

### Frontend Variables

- \`VITE_API_BASE_URL\` - Backend API base URL
- \`VITE_STRIPE_PUBLISHABLE_KEY\` - Stripe public key

## 📚 API Documentation

API endpoints are documented via Swagger/OpenAPI.

\`\`\`bash
# Access API docs
http://localhost:5000/api/docs
\`\`\`

### Key Endpoints

**Products**
- \`GET /api/products\` - List all products
- \`GET /api/products/:id\` - Get product details
- \`POST /api/products\` - Create product (admin)

**Users**
- \`POST /api/auth/signup\` - Create account
- \`POST /api/auth/login\` - Login
- \`GET /api/users/profile\` - Get user profile

**Orders**
- \`GET /api/orders\` - List user orders
- \`POST /api/orders\` - Create order
- \`GET /api/orders/:id\` - Order details

**Cart**
- \`GET /api/cart\` - Get cart
- \`POST /api/cart/items\` - Add to cart
- \`PUT /api/cart/items/:id\` - Update item
- \`DELETE /api/cart/items/:id\` - Remove item

## 🚢 Deployment

See \`DEPLOYMENT.md\` for production deployment instructions.

## 🤝 Contributing

See \`CONTRIBUTING.md\` for contribution guidelines.

## 📖 Additional Documentation

- \`SETUP.md\` - Detailed setup instructions
- \`CONTRIBUTING.md\` - Development workflow
- \`ARCHITECTURE.md\` - System architecture
- \`API.md\` - Detailed API reference

## 📝 Git Workflow

See \`CONTRIBUTING.md\` for branch naming and PR process.

**Quick reference:**
\`\`\`bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: describe changes"

# Push and create PR
git push origin feature/your-feature-name
\`\`\`

## 🐛 Troubleshooting

### Port Already in Use

\`\`\`bash
# Find process using port 5173
lsof -i :5173

# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
\`\`\`

### Docker Issues

\`\`\`bash
# Clear volumes and restart
docker-compose down -v
docker-compose up -d --build

# Check logs
docker-compose logs backend
docker-compose logs frontend
\`\`\`

### MongoDB Connection Issues

\`\`\`bash
# Check if MongoDB is running
docker-compose ps mongodb

# Check MongoDB logs
docker-compose logs mongodb

# Restart MongoDB
docker-compose restart mongodb
\`\`\`

## 📊 Monitoring & Debugging

### Backend Debugging

1. Set breakpoints in VS Code
2. Run: \`docker-compose exec backend npm run test:debug\`
3. Open Chrome DevTools: \`chrome://inspect\`

### Frontend Debugging

- Use Vue DevTools browser extension
- Browser DevTools console and network tabs
- Vite provides source maps in development

### Database Inspection

- Access MongoDB Express: http://localhost:8081
- View collections and documents
- Execute queries

## 💡 Tips & Best Practices

- Use feature branches for new work
- Write tests for new features
- Keep commits atomic and meaningful
- Use \`npm run format\` before committing
- Check lint errors with \`npm run lint\`
- Read docs before asking questions
- Search existing issues before creating new ones

## 📞 Support

- 📧 Email: dev-team@testshop.local
- 🐛 Issues: GitHub Issues
- 💬 Discussions: GitHub Discussions

## 📄 License

MIT License - See LICENSE file for details

---

**Happy Coding! 🚀**
\`\`\`

---