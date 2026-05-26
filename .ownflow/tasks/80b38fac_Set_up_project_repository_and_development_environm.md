# TEST SHOP - Project Repository & Development Environment Setup

I'll set up a complete, production-ready project structure with Git workflow, Node.js/Express backend, React frontend, and comprehensive documentation.

## Overview

This deliverable provides:
1. **Git repository structure** with branch strategy and `.gitignore`
2. **Node.js/Express backend** with middleware, error handling, logging, and environment configuration
3. **React frontend** with organized folder structure and best practices
4. **Development scripts** for easy local setup
5. **Comprehensive documentation** (README, SETUP.md, architecture guides)

---

## 1. Git Workflow & Repository Structure

### Branch Strategy
- **`main`** - Production-ready code, tagged releases
- **`develop`** - Integration branch for features, staging-ready
- **`feature/*`** - Feature branches (e.g., `feature/product-search`)
- **`bugfix/*`** - Bug fixes (e.g., `bugfix/cart-calculation`)
- **`release/*`** - Release preparation (e.g., `release/v1.0.0`)
- **`hotfix/*`** - Critical production fixes (e.g., `hotfix/payment-bug`)

---

## 2. Project Directory Structure

```
test-shop/
├── backend/                    # Node.js/Express server
│   ├── src/
│   │   ├── config/            # Configuration files
│   │   ├── middleware/        # Express middleware
│   │   ├── routes/            # API route handlers
│   │   ├── controllers/       # Business logic
│   │   ├── models/            # Database models
│   │   ├── services/          # Utility services
│   │   ├── utils/             # Helper functions
│   │   └── index.js           # Entry point
│   ├── tests/                 # Test files
│   ├── .env.example           # Environment template
│   ├── .env.local             # Local env (gitignored)
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
├── frontend/                   # React application
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   ├── pages/             # Page-level components
│   │   ├── services/          # API client & services
│   │   ├── context/           # React Context for state
│   │   ├── hooks/             # Custom React hooks
│   │   ├── styles/            # Global styles
│   │   ├── utils/             # Helper functions
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── package.json
│   ├── vite.config.js         # Vite configuration (modern bundler)
│   └── README.md
├── docs/                       # Project documentation
│   ├── API.md                 # API specification
│   ├── ARCHITECTURE.md        # System design
│   └── DATABASE.md            # Schema documentation
├── .gitignore
├── README.md                  # Main project README
├── SETUP.md                   # Local development setup
└── docker-compose.yml         # Optional: Docker setup
```

---

## 3. Backend Implementation (Node.js/Express)

### Key Features
- Environment-based configuration
- Structured logging (Winston)
- Error handling middleware
- CORS, body parser, and security headers
- Request validation
- Modular route structure

### Frontend Implementation (React)

### Key Features
- Component-based architecture
- Context API for state management
- API client service with error handling
- Responsive design ready
- Modern build tooling (Vite)

---

## 4. Documentation & Setup Instructions

All configuration, middleware, and setup documentation is provided below.

---

# Complete File Deliverables

###FILES###
[
  {
    "path": ".gitignore",
    "content": "# Dependencies\nnode_modules/\n.pnp\n.pnp.js\n\n# Environment variables\n.env\n.env.local\n.env.*.local\n\n# IDE & Editor\n.vscode/\n.idea/\n*.swp\n*.swo\n*~\n.DS_Store\n\n# Build outputs\ndist/\nbuild/\n.next/\n.nuxt/\nout/\n\n# Logs\nlogs/\n*.log\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\nlerna-debug.log*\n\n# OS\nThumbs.db\n.DS_Store\n\n# Testing\ncoverage/\n.nyc_output/\n\n# Package manager\npackage-lock.json\nyarn.lock\npnpm-lock.yaml\n\n# Local database\n*.db\n*.sqlite\n*.sqlite3\n\n# Misc\n.cache/\n*.pem\n"
  },
  {
    "path": "README.md",
    "content": "# TEST SHOP - E-Commerce Platform\n\n> A functional e-commerce platform for a candy shop enabling customers to browse products, manage shopping carts, and complete purchases online.\n\n## 🚀 Quick Start\n\n### Prerequisites\n- Node.js 18+ and npm/yarn\n- Git\n- PostgreSQL 12+ (or use Docker)\n\n### Local Development\n\n1. **Clone the repository**\n   ```bash\n   git clone https://github.com/yourusername/test-shop.git\n   cd test-shop\n   ```\n\n2. **Follow setup instructions**\n   See [SETUP.md](./SETUP.md) for detailed local development environment setup.\n\n3. **Quick start (Docker)**\n   ```bash\n   docker-compose up\n   ```\n   - Backend: http://localhost:5000\n   - Frontend: http://localhost:3000\n\n## 📁 Project Structure\n\n```\ntest-shop/\n├── backend/          # Node.js/Express API server\n├── frontend/         # React web application\n├── docs/             # Project documentation\n└── SETUP.md          # Development setup guide\n```\n\n## 🔧 Technology Stack\n\n| Layer | Technology |\n|-------|------------|\n| **Frontend** | React 18, Vite, Axios, Context API |\n| **Backend** | Node.js, Express.js, PostgreSQL |\n| **Payments** | Stripe API |\n| **Logging** | Winston |\n| **Testing** | Jest, Supertest |\n\n## 📋 Features\n\n### Core Functionality\n- ✅ Product catalog with categories\n- ✅ Product search and filtering\n- ✅ Shopping cart management\n- ✅ User authentication and accounts\n- ✅ Order checkout flow\n- ✅ Payment processing (Stripe)\n- ✅ Order history and tracking\n- ✅ Admin dashboard for inventory management\n- ✅ Email notifications\n- ✅ Mobile-responsive design\n\n### Developer Features\n- ✅ Structured logging and error handling\n- ✅ Environment-based configuration\n- ✅ API request validation\n- ✅ Security middleware (CORS, helmet)\n- ✅ Modular architecture\n- ✅ Comprehensive documentation\n\n## 🌳 Git Workflow\n\n### Branch Strategy\n\n- **`main`** - Production releases (protected branch)\n- **`develop`** - Integration/staging branch\n- **`feature/*`** - New features (e.g., `feature/product-search`)\n- **`bugfix/*`** - Bug fixes (e.g., `bugfix/cart-calculation`)\n- **`release/*`** - Release preparation (e.g., `release/v1.0.0`)\n- **`hotfix/*`** - Critical production fixes (e.g., `hotfix/payment-error`)\n\n### Typical Feature Workflow\n\n```bash\n# 1. Create feature branch from develop\ngit checkout develop\ngit pull origin develop\ngit checkout -b feature/my-feature\n\n# 2. Make changes, commit with clear messages\ngit add .\ngit commit -m \"feat: add product search functionality\"\n\n# 3. Push and create Pull Request\ngit push origin feature/my-feature\n# Create PR on GitHub targeting develop branch\n\n# 4. After merge, delete feature branch\ngit branch -d feature/my-feature\n```\n\n## 🚀 Running Locally\n\n### Backend\n```bash\ncd backend\nnpm install\nnpm run dev\n# Server runs on http://localhost:5000\n```\n\n### Frontend\n```bash\ncd frontend\nnpm install\nnpm run dev\n# App runs on http://localhost:5173\n```\n\n## 📚 Documentation\n\n- [Setup Guide](./SETUP.md) - Local development environment\n- [API Documentation](./docs/API.md) - RESTful API endpoints\n- [Architecture](./docs/ARCHITECTURE.md) - System design and components\n- [Database Schema](./docs/DATABASE.md) - Data models\n\n## 🤝 Contributing\n\n1. Create a feature branch from `develop`\n2. Make your changes with clear commit messages\n3. Write tests for new functionality\n4. Create a Pull Request with detailed description\n5. Request code review from team members\n6. Merge to `develop` after approval\n\n## 📝 Commit Message Convention\n\n```\n<type>(<scope>): <subject>\n\n<body>\n\n<footer>\n```\n\n**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`\n\n**Example:**\n```\nfeat(cart): add item quantity adjustment\n\nImplement functionality to increase/decrease item quantities in cart.\nAdd validation for maximum quantity limits.\n\nCloses #123\n```\n\n## 🔐 Security Notes\n\n- Never commit `.env` files with secrets\n- Use `.env.example` as template\n- Rotate API keys and secrets regularly\n- Enable branch protection on `main` and `develop`\n- Require code reviews for merges\n\n## 📦 Deployment\n\nSee deployment guides in respective README files:\n- [Backend Deployment](./backend/README.md#deployment)\n- [Frontend Deployment](./frontend/README.md#deployment)\n\n## 📞 Support\n\nFor issues or questions:\n1. Check existing documentation\n2. Search open issues\n3. Create new issue with detailed description\n4. Contact team lead\n\n## 📄 License\n\nMIT License - See LICENSE file for details\n\n---\n\n**Happy coding! 🎉**\n"
  },
  {
    "path": "SETUP.md",
    "content": "# Local Development Setup Guide\n\n## Prerequisites\n\nBefore starting, ensure you have:\n\n- **Node.js** 18.0.0 or higher\n  - Download: https://nodejs.org/\n  - Verify: `node --version` and `npm --version`\n\n- **Git** 2.30.0 or higher\n  - Download: https://git-scm.com/\n  - Verify: `git --version`\n\n- **PostgreSQL** 12.0 or higher (OR use Docker)\n  - Download: https://www.postgresql.org/download/\n  - Verify: `psql --version`\n  - Alternative (Docker): `docker run --name postgres -e POSTGRES_PASSWORD=dev -d -p 5432:5432 postgres`\n\n- **Code Editor** (recommended: VS Code)\n  - Download: https://code.visualstudio.com/\n\n## Step 1: Clone Repository\n\n```bash\n# Clone the repository\ngit clone https://github.com/yourusername/test-shop.git\ncd test-shop\n\n# Verify structure\nls -la\n# Should show: backend/, frontend/, docs/, .gitignore, README.md, SETUP.md\n```\n\n## Step 2: Backend Setup\n\n### 2.1 Navigate to Backend Directory\n\n```bash\ncd backend\n```\n\n### 2.2 Install Dependencies\n\n```bash\nnpm install\n# This installs all packages from package.json\n```\n\n### 2.3 Configure Environment Variables\n\n```bash\n# Copy example environment file\ncp .env.example .env.local\n\n# Edit .env.local with your local settings\nnano .env.local\n# or open in your editor\n```\n\n**Required environment variables:**\n\n```env\n# Server Configuration\nNODE_ENV=development\nPORT=5000\n\n# Database\nDB_HOST=localhost\nDB_PORT=5432\nDB_NAME=test_shop_dev\nDB_USER=postgres\nDB_PASSWORD=your_password\n\n# JWT Secret (generate: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\")\nJWT_SECRET=your_secret_key_here\n\n# Stripe API Keys (from Stripe dashboard)\nSTRIPE_SECRET_KEY=sk_test_...\nSTRIPE_PUBLIC_KEY=pk_test_...\n\n# Email Configuration\nSMTP_HOST=smtp.gmail.com\nSMTP_PORT=587\nSMTP_USER=your_email@gmail.com\nSMTP_PASSWORD=your_app_password\n\n# API URLs\nFRONTEND_URL=http://localhost:5173\n```\n\n### 2.4 Create Database\n\n```bash\n# Connect to PostgreSQL\npsql -U postgres\n\n# Create database\nCREATE DATABASE test_shop_dev;\n\n# Exit psql\n\\q\n```\n\nOR using Docker:\n\n```bash\ndocker exec postgres psql -U postgres -c \"CREATE DATABASE test_shop_dev;\"\n```\n\n### 2.5 Run Database Migrations (When Ready)\n\n```bash\n# Not included in boilerplate, but structure is ready\nnpm run migrate\n```\n\n### 2.6 Start Backend Server\n\n```bash\n# Development mode (with auto-reload)\nnpm run dev\n\n# You should see:\n# [INFO] Server running on http://localhost:5000\n# [INFO] Connected to database\n```\n\n**Backend is now running!** ✅\n\n---\n\n## Step 3: Frontend Setup\n\n### 3.1 Open New Terminal Window/Tab\n\n```bash\n# From test-shop root directory\ncd frontend\n```\n\n### 3.2 Install Dependencies\n\n```bash\nnpm install\n```\n\n### 3.3 Configure Environment Variables\n\n```bash\n# Create .env.local file\ncat > .env.local << EOF\nVITE_API_BASE_URL=http://localhost:5000/api\nVITE_APP_NAME=Test Shop\nEOF\n\n# Or manually create frontend/.env.local\n```\n\n### 3.4 Start Frontend Development Server\n\n```bash\nnpm run dev\n\n# You should see:\n# VITE v4.x.x ready in xxx ms\n# ➜  Local:   http://localhost:5173/\n```\n\n**Frontend is now running!** ✅\n\n---\n\n## Step 4: Verify Everything Works\n\n### 4.1 Open Browser\n\n- Frontend: http://localhost:5173/\n- Backend API: http://localhost:5000/api/health\n\n### 4.2 Test Backend Health Check\n\n```bash\n# In another terminal\ncurl http://localhost:5000/api/health\n\n# Should return:\n# {\"status\":\"ok\",\"message\":\"Server is running\"}\n```\n\n### 4.3 Check Console Logs\n\n- **Backend**: Should show startup logs and request logs\n- **Frontend**: Should show Vite build output and component logs\n\n---\n\n## Common Issues & Troubleshooting\n\n### Issue: Port Already in Use\n\n**Error:** `Error: listen EADDRINUSE: address already in use :::5000`\n\n**Solutions:**\n\n```bash\n# Find process using port 5000 (macOS/Linux)\nlsof -i :5000\n\n# Kill process\nkill -9 <PID>\n\n# Or change port in .env.local\nPORT=5001\n```\n\n### Issue: Database Connection Error\n\n**Error:** `Error: connect ECONNREFUSED 127.0.0.1:5432`\n\n**Solutions:**\n\n```bash\n# Verify PostgreSQL is running\npsql -U postgres\n\n# Or start with Docker\ndocker start postgres\n\n# Check database exists\npsql -U postgres -l | grep test_shop_dev\n```\n\n### Issue: npm install Fails\n\n**Error:** `npm ERR! code ERESOLVE`\n\n**Solutions:**\n\n```bash\n# Clear npm cache\nnpm cache clean --force\n\n# Delete node_modules and lock file\nrm -rf node_modules package-lock.json\n\n# Reinstall\nnpm install\n\n# Or use npm v7+ legacy peer deps\nnpm install --legacy-peer-deps\n```\n\n### Issue: Frontend Won't Connect to Backend\n\n**Error:** `CORS error` or `Failed to fetch`\n\n**Solutions:**\n\n```bash\n# Verify backend is running\ncurl http://localhost:5000/api/health\n\n# Check VITE_API_BASE_URL in frontend/.env.local\n# Should match backend URL and port\n\n# Verify CORS is enabled in backend\n# Check middleware/corsMiddleware.js\n```\n\n### Issue: Module Not Found Errors\n\n**Error:** `Cannot find module 'express'`\n\n**Solutions:**\n\n```bash\n# In backend directory\nnpm install\n\n# In frontend directory\ncd ../frontend\nnpm install\n```\n\n---\n\n## Available Scripts\n\n### Backend Scripts\n\n```bash\ncd backend\n\nnpm run dev      # Start development server with auto-reload\nnpm start        # Start production server\nnpm test         # Run tests\nnpm run lint     # Lint code\n```\n\n### Frontend Scripts\n\n```bash\ncd frontend\n\nnpm run dev      # Start development server\nnpm run build    # Build for production\nnpm run preview  # Preview production build\nnpm run lint     # Lint code\nnpm test         # Run tests\n```\n\n---\n\n## IDE Setup (VS Code)\n\n### 4.1 Recommended Extensions\n\n1. **ES7+ React/Redux/React-Native snippets**\n   - ID: `dsznajder.es7-react-js-snippets`\n\n2. **Prettier - Code formatter**\n   - ID: `esbenp.prettier-vscode`\n\n3. **ESLint**\n   - ID: `dbaeumer.vscode-eslint`\n\n4. **Thunder Client** (API testing)\n   - ID: `rangav.vscode-thunder-client`\n\n5. **PostgreSQL**\n   - ID: `ckolkman.vscode-postgres`\n\n### 4.2 Workspace Settings\n\nCreate `.vscode/settings.json` in repository root:\n\n```json\n{\n  \"editor.formatOnSave\": true,\n  \"editor.defaultFormatter\": \"esbenp.prettier-vscode\",\n  \"editor.codeActionsOnSave\": {\n    \"source.fixAll.eslint\": true\n  },\n  \"files.exclude\": {\n    \"**/node_modules\": true\n  }\n}\n```\n\n---\n\n## Docker Setup (Optional)\n\nIf you prefer using Docker:\n\n```bash\n# Start all services\ndocker-compose up -d\n\n# View logs\ndocker-compose logs -f\n\n# Stop services\ndocker-compose down\n```\n\nServices will be available at:\n- Frontend: http://localhost:3000\n- Backend: http://localhost:5000\n- PostgreSQL: localhost:5432\n\n---\n\n## Next Steps\n\n1. **Read the documentation:**\n   - [API Documentation](./docs/API.md)\n   - [Architecture Guide](./docs/ARCHITECTURE.md)\n\n2. **Familiarize with project structure:**\n   - Backend: `/backend/src/`\n   - Frontend: `/frontend/src/`\n\n3. **Run sample requests:**\n   - Use Thunder Client or Postman\n   - See docs/API.md for endpoints\n\n4. **Start developing:**\n   - Create a feature branch: `git checkout -b feature/your-feature`\n   - Make changes and test locally\n   - Push and create a Pull Request\n\n---\n\n## Getting Help\n\n1. Check existing issues on GitHub\n2. Read documentation in `/docs/`\n3. Ask teammates on Slack/Discord\n4. Check backend logs: `npm run dev` console output\n5. Check frontend browser console for errors\n\n---\n\n**You're all set! Happy coding! 🚀**\n"
  },
  {
    "path": "backend/package.json",
    "content": "{\n  \"name\": \"test-shop-backend\",\n  \"version\": \"1.0.0\",\n  \"description\": \"Test Shop - E-Commerce Platform Backend API\",\n  \"main\": \"src/index.js\",\n  \"type\": \"module\",\n  \"scripts\": {\n    \"dev\": \"nodemon src/index.js\",\n    \"start\": \"node src/index.js\",\n    \"test\": \"jest --detectOpenHandles\",\n    \"test:watch\": \"jest --watch\",\n    \"test:coverage\": \"jest --coverage\",\n    \"lint\": \"eslint src/\",\n    \"lint:fix\": \"eslint src/ --fix\"\n  },\n  \"keywords\": [\n    \"ecommerce\",\n    \"candy\",\n    \"shop\",\n    \"api\"\n  ],\n  \"author\": \"Test Shop Team\",\n  \"license\": \"MIT\",\n  \"dependencies\": {\n    \"express\": \"^4.18.2\",\n    \"cors\": \"^2.8.5\",\n    \"helmet\": \"^7.1.0\",\n    \"dotenv\": \"^16.3.1\",\n    \"winston\": \"^3.11.0\",\n    \"pg\": \"^8.11.3\",\n    \"jsonwebtoken\": \"^9.1.2\",\n    \"bcryptjs\": \"^2.4.3\",\n    \"stripe\": \"^14.10.0\",\n    \"joi\": \"^17.11.0\",\n    \"express-async-errors\": \"^3.1.1\"\n  },\n  \"devDependencies\": {\n    \"nodemon\": \"^3.0.2\",\n    \"jest\": \"^29.7.0\",\n    \"supertest\": \"^6.3.3\",\n    \"eslint\": \"^8.55.0\",\n    \"eslint-config-airbnb-base\": \"^15.0.0\",\n    \"eslint-plugin-import\": \"^2.29.0\"\n  },\n  \"engines\": {\n    \"node\": \">=18.0.0\",\n    \"npm\": \">=9.0.0\"\n  }\n}\n"
  },
  {
    "path": "backend/.env.example",
    "content": "# Server Configuration\nNODE_ENV=development\nPORT=5000\n\n# Database Connection\nDB_HOST=localhost\nDB_PORT=5432\nDB_NAME=test_shop_dev\nDB_USER=postgres\nDB_PASSWORD=your_password_here\n\n# Database Pool\nDB_POOL_MIN=2\nDB_POOL_MAX=10\n\n# JWT Authentication\nJWT_SECRET=your_super_secret_jwt_key_change_this_in_production\nJWT_EXPIRY=7d\n\n# Stripe Payment Gateway\nSTRIPE_SECRET_KEY=sk_test_your_stripe_secret_key\nSTRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key\n\n# Email Configuration\nSMTP_HOST=smtp.gmail.com\nSMTP_PORT=587\nSMTP_USER=your_email@gmail.com\nSMTP_PASSWORD=your_app_specific_password\nSMTP_FROM=noreply@testshop.com\n\n# Frontend URL (for CORS and email links)\nFRONTEND_URL=http://localhost:5173\n\n# Logging\nLOG_LEVEL=debug\nLOG_FILE=logs/app.log\n\n# API Keys (optional integrations)\nAPI_KEY=your_api_key_here\n"
  },
  {
    "path": "backend/src/index.js",
    "content": "import express from 'express';\nimport dotenv from 'dotenv';\nimport 'express-async-errors';\nimport logger from './config/logger.js';\nimport corsMiddleware from './middleware/corsMiddleware.js';\nimport errorHandlingMiddleware from './middleware/errorHandlingMiddleware.js';\nimport requestLoggingMiddleware from './middleware/requestLoggingMiddleware.js';\nimport securityMiddleware from './middleware/securityMiddleware.js';\n\n// Load environment variables\ndotenv.config({ path: '.env.local' });\ndotenv.config();\n\n// Initialize Express app\nconst app = express();\nconst PORT = process.env.PORT || 5000;\nconst NODE_ENV = process.env.NODE_ENV || 'development';\n\n// ============================================\n// MIDDLEWARE\n// ============================================\n\n// Security middleware (CORS, Helmet)\napp.use(securityMiddleware);\napp.use(corsMiddleware);\n\n// Body parsing middleware\napp.use(express.json({ limit: '10mb' }));\napp.use(express.urlencoded({ limit: '10mb', extended: true }));\n\n// Request logging middleware\napp.use(requestLoggingMiddleware);\n\n// ============================================\n// HEALTH CHECK ENDPOINT\n// ============================================\n\napp.get('/api/health', (req, res) => {\n  res.json({\n    status: 'ok',\n    message: 'Server is running',\n    timestamp: new Date().toISOString(),\n    environment: NODE_ENV,\n  });\n});\n\n// ============================================\n// ROUTE HANDLERS (To be implemented)\n// ============================================\n\n// TODO: Import and use route modules\n// app.use('/api/products', productRoutes);\n// app.use('/api/users', userRoutes);\n// app.use('/api/carts', cartRoutes);\n// app.use('/api/orders', orderRoutes);\n// app.use('/api/payments', paymentRoutes);\n\n// Example placeholder route\napp.get('/api/status', (req, res) => {\n  res.json({\n    status: 'API is operational',\n    version: '1.0.0',\n    timestamp: new Date().toISOString(),\n  });\n});\n\n// ============================================\n// 404 NOT FOUND HANDLER\n// ============================================\n\napp.use((req, res) => {\n  res.status(404).json({\n    success: false,\n    message: 'Route not found',\n    path: req.originalUrl,\n  });\n});\n\n// ============================================\n// GLOBAL ERROR HANDLING MIDDLEWARE\n// ============================================\n\napp.use(errorHandlingMiddleware);\n\n// ============================================\n// SERVER STARTUP\n// ============================================\n\nconst server = app.listen(PORT, () => {\n  logger.info(`🚀 Server running on http://localhost:${PORT}`);\n  logger.info(`📝 Environment: ${NODE_ENV}`);\n  logger.info(`📂 Routes ready at /api/*`);\n});\n\n// ============================================\n// GRACEFUL SHUTDOWN\n// ============================================\n\nprocess.on('SIGTERM', () => {\n  logger.info('SIGTERM signal received: closing HTTP server');\n  server.close(() => {\n    logger.info('HTTP server closed');\n    process.exit(0);\n  });\n});\n\nprocess.on('SIGINT', () => {\n  logger.info('SIGINT signal received: closing HTTP server');\n  server.close(() => {\n    logger.info('HTTP server closed');\n    process.exit(0);\n  });\n});\n\nprocess.on('uncaughtException', (error) => {\n  logger.error('Uncaught Exception:', error);\n  process.exit(1);\n});\n\nprocess.on('unhandledRejection', (reason, promise) => {\n  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);\n});\n\nexport default app;\n"
  },
  {
    "path": "backend/src/config/logger.js",
    "content": "import winston from 'winston';\nimport fs from 'fs';\nimport path from 'path';\nimport { fileURLToPath } from 'url';\n\nconst __filename = fileURLToPath(import.meta.url);\nconst __dirname = path.dirname(__filename);\n\n// Create logs directory if it doesn't exist\nconst logsDir = path.join(__dirname, '../../logs');\nif (!fs.existsSync(logsDir)) {\n  fs.mkdirSync(logsDir, { recursive: true });\n}\n\nconst levels = {\n  error: 0,\n  warn: 1,\n  info: 2,\n  http: 3,\n  debug: 4,\n};\n\nconst colors = {\n  error: 'red',\n  warn: 'yellow',\n  info: 'green',\n  http: 'magenta',\n  debug: 'white',\n};\n\nwinston.addColors(colors);\n\nconst format = winston.format.combine(\n  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),\n  winston.format.printf(\n    (info) => `${info.timestamp} ${info.level}: ${info.message}`,\n  ),\n);\n\nconst transports = [\n  // Console transport\n  new winston.transports.Console(),\n\n  // Error log file\n  new winston.transports.File({\n    filename: path.join(logsDir, 'error.log