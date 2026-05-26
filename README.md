# TEST SHOP - E-Commerce Platform

## ð¯ Project Overview

TEST SHOP is a modern, full-stack e-commerce platform for a candy shop. Built with Vue.js (frontend), Node.js/Express (backend), and MongoDB (database).

### Features
- ðï¸ Product catalog with categories (chocolates, gummies, hard candies, etc.)
- ð Advanced search and filtering
- ð Shopping cart and checkout flow
- ð¤ User accounts and order history
- ð³ Stripe payment integration
- ð§ Order confirmation emails
- ð Admin dashboard for inventory management
- ð± Mobile-responsive design
- â¡ Hot-reload development environment

## ð Quick Start (15 minutes)

### Prerequisites
- **Docker** & **Docker Compose** (recommended)
- **Git**
- **Node.js 18+** (optional, for local development)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourorg/test-shop.git
cd test-shop

# 2. Create environment files
cp backend/.env.example backend/.env.local
cp frontend/.env.example frontend/.env.local

# 3. Start all services with Docker Compose
docker-compose up -d

# 4. Wait for services to be ready (~30 seconds)
sleep 10

# 5. Access the applications
# Frontend: http://localhost:5173
# Backend API: http://localhost:3000
# MongoDB Admin: localhost:27017
```

### Verify Setup

```bash
# Check all services are running
docker-compose ps

# Test backend health endpoint
curl http://localhost:3000/health

# View logs
docker-compose logs -f
```

## ð Project Structure

```
test-shop/
âââ backend/                    # Node.js/Express API
â   âââ src/
â   â   âââ controllers/       # Route controllers
â   â   âââ models/            # MongoDB schemas
â   â   âââ routes/            # API routes
â   â   âââ middleware/        # Express middleware
â   â   âââ config/            # Configuration files
â   â   âââ app.js             # Express app setup
â   âââ tests/                 # Jest test files
â   âââ .eslintrc.json         # ESLint configuration
â   âââ .env.example           # Environment template
â   âââ Dockerfile             # Backend container
â   âââ package.json           # Dependencies
â   âââ README.md              # Backend documentation
â
âââ frontend/                   # Vue.js application
â   âââ src/
â   â   âââ components/        # Vue components
â   â   âââ pages/             # Page components
â   â   âââ stores/            # Pinia state management
â   â   âââ api/               # API client
â   â   âââ styles/            # Global styles
â   â   âââ App.vue            # Root component
â   â   âââ main.js            # Vue entry point
â   âââ tests/                 # Vitest test files
â   âââ .eslintrc.json         # ESLint configuration
â   âââ .env.example           # Environment template
â   âââ vite.config.js         # Vite configuration
â   âââ Dockerfile             # Frontend container
â   âââ package.json           # Dependencies
â   âââ README.md              # Frontend documentation
â
âââ docker/                     # Docker configurations
â   âââ backend.dockerfile      # Backend image
â   âââ frontend.dockerfile     # Frontend image
â
âââ .github/
â   âââ workflows/              # CI/CD pipelines
â       âââ lint.yml            # Linting checks
â       âââ test.yml            # Test suite
â       âââ deploy.yml          # Deployment pipeline
â
âââ .husky/                     # Git hooks
â   âââ pre-commit             # Pre-commit hook
â
âââ docs/                       # Documentation
â   âââ SETUP.md               # Detailed setup guide
â   âââ CONTRIBUTING.md        # Contribution guidelines
â   âââ ARCHITECTURE.md        # System architecture
â   âââ API.md                 # API documentation
â   âââ TROUBLESHOOTING.md     # Troubleshooting guide
â
âââ .gitignore                 # Git ignore rules
âââ .editorconfig              # Editor configuration
âââ docker-compose.yml         # Local dev environment
âââ docker-compose.prod.yml    # Production environment
âââ README.md                  # This file
```

## ð ï¸ Development Commands

### Using Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild containers
docker-compose build

# Run backend tests
docker-compose exec backend npm test

# Run frontend tests
docker-compose exec frontend npm run test

# Lint backend code
docker-compose exec backend npm run lint

# Lint frontend code
docker-compose exec frontend npm run lint

# Format all code
docker-compose exec backend npm run format
docker-compose exec frontend npm run format

# Access MongoDB
docker-compose exec mongodb mongo
```

### Local Development (Without Docker)

```bash
# Backend setup
cd backend
npm install
cp .env.example .env.local
npm run dev

# In another terminal - Frontend
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

## ð§ª Testing

### Backend Tests (Jest)

```bash
# Run all tests
docker-compose exec backend npm test

# Watch mode
docker-compose exec backend npm run test:watch

# Coverage report
docker-compose exec backend npm run test:coverage
```

### Frontend Tests (Vitest)

```bash
# Run all tests
docker-compose exec frontend npm run test

# Watch mode
docker-compose exec frontend npm run test:watch

# Coverage report
docker-compose exec frontend npm run test:coverage
```

## ð Git Workflow

### Branch Strategy

```
main (production-ready) ââââââââââ
                                 âââ release/v1.0.0
                                 â
develop (integration) ââââââââââââ¤
      â²                           â
      â                           â
  âââââ´ââââ¬âââââââââââ¬ââââââââââââ
feature/ bugfix/    hotfix/     ââ
  âââââââââ´âââââââââââ´ââââââââââââ
         (from develop)           â
                                 â
         (merge back to main) ââââ
```

### Creating a Feature Branch

```bash
# Update develop
git checkout develop
git pull origin develop

# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: description of changes"

# Push to remote
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

### Commit Message Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new product filtering
fix: resolve cart total calculation
refactor: reorganize API middleware
docs: update API documentation
test: add unit tests for products
chore: update dependencies
```

## ð§ Code Quality

### ESLint

```bash
# Lint code
docker-compose exec backend npm run lint
docker-compose exec frontend npm run lint

# Auto-fix issues
docker-compose exec backend npm run lint:fix
docker-compose exec frontend npm run lint:fix
```

### Prettier

```bash
# Format code
docker-compose exec backend npm run format
docker-compose exec frontend npm run format

# Check formatting
docker-compose exec backend npm run format:check
docker-compose exec frontend npm run format:check
```

### Pre-commit Hooks

Husky automatically runs checks before commits:
- ESLint validation
- Prettier formatting
- Commit message validation

If hooks fail, fix issues and try committing again.

## ð Additional Documentation

- **[Setup Guide](docs/SETUP.md)** - Detailed installation and configuration
- **[Contributing Guide](docs/CONTRIBUTING.md)** - How to contribute
- **[Architecture](docs/ARCHITECTURE.md)** - System design and decisions
- **[API Documentation](docs/API.md)** - Backend API endpoints
- **[Troubleshooting](docs/TROUBLESHOOTING.md)** - Common issues and solutions
- **[Backend README](backend/README.md)** - Backend-specific information
- **[Frontend README](frontend/README.md)** - Frontend-specific information

## ð Environment Variables

### Backend (.env.local)

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://mongodb:27017/test-shop
JWT_SECRET=your-secret-key
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxx
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CLIENT_URL=http://localhost:5173
```

### Frontend (.env.local)

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

## ð¨ Troubleshooting

### Services won't start

```bash
# Check for port conflicts
lsof -i :3000    # Backend
lsof -i :5173    # Frontend
lsof -i :27017   # MongoDB

# Force rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Database connection issues

```bash
# Check MongoDB is running
docker-compose ps mongodb

# View MongoDB logs
docker-compose logs mongodb

# Reset database
docker-compose exec mongodb mongo
> db.dropDatabase()
```

### Hot-reload not working

```bash
# Restart services
docker-compose restart backend frontend

# Check file permissions
chmod -R 755 ./backend ./frontend
```

See [Troubleshooting Guide](docs/TROUBLESHOOTING.md) for more help.

## ð¤ Contributing

1. Create a feature branch from `develop`
2. Make changes following code quality standards
3. Run tests and linting
4. Create a Pull Request
5. Get code review and merge

See [Contributing Guide](docs/CONTRIBUTING.md) for detailed guidelines.

## ð Checklist for New Team Members

- [ ] Clone repository
- [ ] Install Docker & Docker Compose
- [ ] Copy `.env.example` files to `.env.local`
- [ ] Run `docker-compose up -d`
- [ ] Verify all services running
- [ ] Access frontend at http://localhost:5173
- [ ] Read documentation
- [ ] Configure IDE with ESLint/Prettier
- [ ] Create feature branch and make a test commit

## ð¦ Technology Stack

| Layer | Technology | Version |
|-------|-----------|----------|
| **Frontend** | Vue.js | 3.x |
| **Frontend Build** | Vite | 5.x |
| **State Management** | Pinia | 2.x |
| **Backend** | Node.js | 18.x LTS |
| **Web Framework** | Express | 4.x |
| **Database** | MongoDB | 6.x |
| **Testing (Backend)** | Jest | 29.x |
| **Testing (Frontend)** | Vitest | 1.x |
| **Linting** | ESLint | 8.x |
| **Formatting** | Prettier | 3.x |
| **Container** | Docker | Latest |
| **Orchestration** | Docker Compose | Latest |

## ð License

MIT License - See LICENSE file for details

## ð§ Contact & Support

For questions or issues:
1. Check [Troubleshooting Guide](docs/TROUBLESHOOTING.md)
2. Search existing GitHub Issues
3. Create a new Issue with details
4. Ask in team chat

---

**Happy Coding! ð**
