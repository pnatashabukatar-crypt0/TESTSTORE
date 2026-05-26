# Technical Architecture & Tech Stack - Candy Shop E-Commerce Platform

## Executive Summary

This document outlines the recommended technical architecture for the candy shop e-commerce platform. The architecture prioritizes **developer productivity, time-to-market, and operational simplicity** given the undefined timeline and team size constraints. The recommended stack uses proven, mature technologies with strong community support and comprehensive tooling.

---

## 1. Architecture Decision Record (ADR)

### ADR-001: Monolithic vs Microservices Architecture

**Decision:** **Monolithic architecture with modular design**

**Rationale:**
- **Unknown team size** makes microservices operational overhead risky
- Simpler deployment and debugging for small-to-medium teams
- Easier to refactor into microservices later if needed
- Reduces infrastructure complexity and cost
- Faster development velocity for MVP phase

**Structure:**
- Single deployable application with logical service layers (Auth, Products, Orders, Payments)
- Database per logical domain (can be separate schemas in same DB)
- Clear interfaces between modules enable future extraction to microservices

**Risks Mitigated:**
- Independent scaling handled via horizontal scaling of entire application
- Technology lock-in minimized through modular design

---

### ADR-002: Frontend Framework Selection

**Decision:** **React.js with TypeScript**

**Rationale:**
- **Largest ecosystem** for e-commerce: mature libraries for shopping carts (zustand, redux), UI components (Material-UI, shadcn/ui)
- **Superior developer experience** with better debugging tools, IDE support
- **TypeScript support** reduces runtime errors in payments/checkout critical paths
- **Component reusability** accelerates feature development
- **Wider talent pool** for future hiring/scaling
- **Strong mobile-responsive library support** (React Bootstrap, Tailwind CSS)

**Alternative Considered:** Vue.js
- Lighter learning curve, faster initial onboarding
- Smaller ecosystem for specialized e-commerce needs
- Recommendation: Use React for this project; Vue better suited for smaller teams with tighter timelines

**Tech Stack:**
- **Build tool:** Vite (faster than Create React App)
- **UI Framework:** Tailwind CSS + shadcn/ui (accessible, customizable)
- **State management:** Zustand (lightweight, modern alternative to Redux)
- **Routing:** React Router v6
- **Form handling:** React Hook Form + Zod (type-safe validation)
- **API client:** TanStack Query (React Query) for server state management
- **Testing:** Vitest + React Testing Library

---

### ADR-003: Backend Framework Selection

**Decision:** **Node.js/Express.js with TypeScript**

**Rationale:**
- **JavaScript full-stack** enables shared code patterns (types, validation schemas) between frontend and backend
- **Express ecosystem maturity:** Battle-tested for e-commerce (Shopify uses Node)
- **Fast development velocity:** Less boilerplate than Django/FastAPI
- **Excellent async handling** for I/O-heavy operations (DB, payment APIs, email)
- **Native JSON support** aligns with frontend data structures
- **Strong payment library support** (Stripe SDK is JavaScript-first)

**Alternative Considered:** Python/FastAPI
- Better for data-heavy operations or ML integration
- Steeper deployment learning curve
- Recommendation: Node.js preferred for rapid development; FastAPI if significant data processing required later

**Tech Stack:**
- **Runtime:** Node.js LTS (20.x or later)
- **Framework:** Express.js v4 with TypeScript
- **Authentication:** jsonwebtoken (JWT) + bcryptjs
- **Validation:** Zod (shared schema with frontend)
- **Database ORM:** Prisma (excellent TypeScript support, type safety)
- **API documentation:** Swagger/OpenAPI (express-jsdoc)
- **Logging:** Winston or Pino (structured logging)
- **Testing:** Jest + Supertest
- **Environment:** dotenv for configuration management

---

### ADR-004: Database Technology Selection

**Decision:** **PostgreSQL as primary database**

**Rationale:**
- **ACID guarantees** critical for order processing and financial consistency
- **JSON support** for flexible product attributes (allergens, ingredients, packaging options)
- **Full-text search** capabilities for product catalog search (no separate Elasticsearch needed initially)
- **Robust authentication** with row-level security for multi-tenant concerns
- **Mature ecosystem** with excellent Node.js drivers (node-postgres, Prisma)
- **Cost-effective** with generous free tier options (Heroku, Railway, Render)

**Alternative Considered:** MongoDB
- Better for unstructured product data
- Weaker transaction support (important for orders)
- Recommendation: PostgreSQL superior for financial data; migrate product attributes to MongoDB only if query patterns prove problematic

**Caching Strategy:**
- **In-app caching:** Node-cache for simple application-level caching
- **Distributed caching (future):** Redis if performance analysis shows bottlenecks
  - Product catalog caching (TTL: 1 hour)
  - Session management (TTL: 24 hours)
  - Cart data (short-lived, 30 minutes)

---

### ADR-005: API Design Pattern

**Decision:** **RESTful API with clear resource-based design**

**Rationale:**
- **Simplicity and familiarity** for team onboarding
- **Excellent tooling** (Postman, OpenAPI/Swagger)
- **Mobile-friendly** with straightforward HTTP semantics
- **Sufficient for current scope** (GraphQL complexity not yet justified)
- **Standard authentication patterns** well-established (JWT in Authorization header)

**Alternative Considered:** GraphQL
- Advantages: Precise client data fetching, single endpoint
- Disadvantages: More complex caching, larger learning curve, overkill for MVP
- Recommendation: Adopt REST initially; migrate to GraphQL if frontend complexity or multiple client types (mobile app) justify it

**API Version Strategy:**
- URI versioning: `/api/v1/products` (allows backward compatibility)
- Header versioning avoided (complexity with proxies)
- Deprecation policy: Support two major versions simultaneously

**Key Resources:**

```
GET    /api/v1/products              # List all products with pagination
GET    /api/v1/products/:id          # Product details
POST   /api/v1/products/search       # Advanced search/filtering
GET    /api/v1/categories            # Product categories

POST   /api/v1/auth/register         # User registration
POST   /api/v1/auth/login            # User login
POST   /api/v1/auth/refresh          # Token refresh
POST   /api/v1/auth/logout           # Token revocation

POST   /api/v1/cart/items            # Add to cart
DELETE /api/v1/cart/items/:id        # Remove from cart
GET    /api/v1/cart                  # View cart
PUT    /api/v1/cart/items/:id        # Update item quantity

POST   /api/v1/orders                # Create order
GET    /api/v1/orders                # List user's orders
GET    /api/v1/orders/:id            # Order details
POST   /api/v1/orders/:id/checkout   # Initiate checkout

POST   /api/v1/payments/intent       # Create payment intent (Stripe)
POST   /api/v1/payments/webhook      # Stripe webhook receiver
GET    /api/v1/payments/status/:id   # Check payment status

GET    /api/v1/admin/products        # Admin: List products
POST   /api/v1/admin/products        # Admin: Create product
PUT    /api/v1/admin/products/:id    # Admin: Update product
DELETE /api/v1/admin/products/:id    # Admin: Delete product
GET    /api/v1/admin/inventory       # Admin: Inventory summary
GET    /api/v1/admin/orders          # Admin: All orders
```

---

### ADR-006: Authentication & Authorization

**Decision:** **JWT-based stateless authentication with role-based access control (RBAC)**

**Rationale:**
- **Stateless design** simplifies horizontal scaling (no session storage needed)
- **Modern standard** widely understood by developers
- **Works seamlessly** with SPA frontend architecture
- **Role-based access** enables admin functionality without complex permission matrix

**Implementation Strategy:**

**Tokens:**
- **Access Token:** JWT valid for 15 minutes
  - Contains: `userId`, `email`, `role` (user/admin), `iat`, `exp`
  - Stored in memory (not localStorage) to prevent XSS attacks
  - Sent in `Authorization: Bearer <token>` header
  
- **Refresh Token:** JWT valid for 7 days
  - Stored in httpOnly, Secure, SameSite cookie (resistant to XSS/CSRF)
  - Used to obtain new access tokens without re-authentication
  - Backend maintains blacklist for logout operations

**User Roles:**
- `user`: Customer account, can browse, purchase, view own orders
- `admin`: Full access to inventory, orders, user management

**Authorization Middleware:**
```
Authentication: Verify JWT validity and signature
Authorization: Check user.role matches required permission
```

**Password Security:**
- Minimum 12 characters enforced at client and server
- Hashed with bcryptjs (salt rounds: 12)
- Reset via time-limited token (30 minutes)

**Alternative Considered:** OAuth2 / Social Login
- Valuable for user acquisition but adds complexity
- Recommendation: Defer to Phase 2; implement local + Stripe OAuth for future

---

### ADR-007: Payment Processing Integration

**Decision:** **Stripe as primary payment processor**

**Rationale:**
- **Easiest integration** with excellent Node.js SDK
- **Comprehensive features:** Card payments, ACH, digital wallets (Apple Pay, Google Pay)
- **Transparent pricing:** 2.9% + $0.30 per transaction
- **Webhook reliability** for order fulfillment notifications
- **PCI compliance** handled by Stripe (no card data in database)
- **Excellent testing tools** (test card numbers, webhook simulator)

**Architecture:**

```
Client → Stripe.js → Stripe Elements (secure tokenization)
         ↓
Backend → Stripe API (create PaymentIntent, confirm payment)
         ↓
Webhook → Order fulfillment (mark order paid)
```

**Key Flows:**
1. Frontend creates `PaymentIntent` on backend
2. Stripe.js securely collects card details (never touches backend)
3. Frontend confirms intent with Stripe
4. Stripe webhook notifies backend of success/failure
5. Backend updates order status and triggers fulfillment

**Stored Data:**
- Never store card numbers; use Stripe PaymentMethod IDs for recurring charges
- Securely store encrypted Stripe customer IDs for future transactions

**Alternative Considered:** PayPal
- Similar functionality, slightly higher fees
- Recommendation: Stripe primary; add PayPal in Phase 2 for payment method diversity

---

### ADR-008: Deployment Strategy & Infrastructure

**Decision:** **Cloud-native containerized deployment on PaaS platform**

**Target: Railway.app or Render.com** (for unknown team/timeline)
- Simpler than Kubernetes for early stages
- Automatic CI/CD from Git
- Built-in PostgreSQL hosting
- Pay-per-use without infrastructure management

**Alternative Recommended for Scale: AWS ECS or DigitalOcean App Platform**

**Containerization Strategy:**

**Docker:**
- Single Node.js container for backend
- Alpine-based images for minimal footprint
- Multi-stage builds for optimized layer caching

**Deployment Pipeline:**
```
Git Push → GitHub Actions → Docker Build → Registry → Deploy
                          ↓
                      Tests (Jest)
                      Linting (ESLint)
                      Type checking (tsc)
```

**Environment Tiers:**
- **Development:** Local with Docker Compose
- **Staging:** Automatic deployment on PR merge
- **Production:** Manual approval required

**Database Migration:**
- Prisma migrations as part of deployment
- Zero-downtime deployments via blue-green strategy
- Automated backups (handled by PaaS)

**CDN & Static Assets:**
- **Frontend hosting:** Vercel (optimized for Next.js-like React apps) or Netlify
- **Image optimization:** Cloudinary for product images with lazy-loading
- **Caching:** Browser cache (60 days for immutable assets), 1-hour for mutable

---

## 2. Security Architecture

### Data Protection

| Data Type | Storage | Transmission | Compliance |
|-----------|---------|--------------|-----------|
| Passwords | bcryptjs hashed (DB) | HTTPS/TLS 1.3 | OWASP |
| Payment data | Stripe (PCI-DSS) | Stripe.js | PCI-DSS Level 1 |
| User PII | PostgreSQL encrypted | HTTPS | GDPR encryption |
| API Keys | Environment variables | Never logged | Secrets management |
| Sessions | JWT (stateless) | httpOnly cookies | CSRF tokens |

### Authentication Flow

```
1. Registration: Email + Password → Hashed storage
2. Login: Credentials → JWT tokens issued
3. Authenticated Request: Bearer token → Verify signature + expiry
4. Logout: Revoke token → Add to blacklist (Redis)
5. Token Refresh: Refresh token → Issue new access token
```

### CSRF & XSS Mitigation

- **CSRF:** SameSite cookie policy + CSRF tokens for state-changing operations
- **XSS:** Content Security Policy headers, sanitized user input, no eval()
- **Dependency security:** npm audit, Snyk integration in CI/CD

### Rate Limiting

- API rate limits: 100 requests/minute per IP (stripe checkout: 10/minute)
- Login attempts: 5 failures = 15-minute lockout
- Password reset: 3 attempts per email per day

---

## 3. Scalability Considerations

### Horizontal Scaling
- **Stateless backend:** Multiple Node.js instances behind load balancer
- **Database:** Read replicas for reporting queries
- **Session management:** JWT eliminates session persistence needs

### Vertical Scaling Path
- **Product search:** Add Elasticsearch if full-text search performance degrades
- **Real-time inventory:** Switch to Redis Pub/Sub if live inventory updates needed
- **Media serving:** Implement CDN (Cloudflare) for images/assets

### Performance Targets
- **API response time:** <200ms (p95)
- **Page load:** <3 seconds (Lighthouse)
- **Database query:** <50ms (p95)

**Monitoring & Observability:**
- Logging: Structured JSON logs to centralized service (ELK or Datadog)
- APM: New Relic or DataDog for performance tracing
- Uptime monitoring: Uptime Robot or similar
- Error tracking: Sentry for client-side and server-side errors

---

## 4. Development Workflow

### Repository Structure

```
candy-shop/
├── backend/                    # Node.js/Express application
│   ├── src/
│   │   ├── models/            # Database schemas (Prisma)
│   │   ├── routes/            # API endpoint handlers
│   │   ├── services/          # Business logic
│   │   ├── middleware/        # Auth, validation, error handling
│   │   ├── utils/             # Helpers, constants
│   │   └── index.ts           # Server entry point
│   ├── tests/                 # Jest test files
│   ├── migrations/            # Prisma migrations
│   ├── Dockerfile
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/        # Reusable React components
│   │   ├── pages/             # Page-level components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API client functions
│   │   ├── store/             # Zustand state management
│   │   ├── types/             # TypeScript interfaces
│   │   ├── styles/            # Tailwind config
│   │   └── App.tsx
│   ├── tests/                 # Vitest test files
│   ├── public/                # Static assets
│   ├── Dockerfile
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── package.json
│
├── docker-compose.yml         # Local development stack
├── .github/workflows/         # CI/CD pipelines
└── README.md
```

### Development Tools Setup

**Local Environment:**
```bash
# Backend dependencies
Node.js 20+, npm/yarn

# Database
PostgreSQL 15+ (Docker via docker-compose)

# Stripe
Stripe CLI for webhook testing

# Code Quality
- ESLint + Prettier (formatting)
- TypeScript strict mode
- Husky + lint-staged (pre-commit hooks)
```

---

## 5. Testing Strategy

### Test Pyramid

```
        UI Tests (E2E) - 10%
      Integration Tests - 30%
    Unit Tests - 60%
```

**Backend Testing:**
- Unit tests for services (mocked DB)
- Integration tests with test database
- API endpoint tests via Supertest
- Target: 80% code coverage

**Frontend Testing:**
- Component tests via React Testing Library
- Hook tests via @testing-library/react
- Integration tests for user flows
- E2E tests via Playwright (critical paths only)

**Continuous Integration:**
- Run on every PR
- Enforce coverage thresholds
- Lint and type checks mandatory

---

## 6. Phase-Based Tech Roadmap

### Phase 1 (MVP - Months 1-2)
- ✅ REST API + React frontend
- ✅ PostgreSQL + basic caching
- ✅ Stripe payment integration
- ✅ JWT authentication
- ✅ Monolithic deployment

### Phase 2 (Production - Months 3-4)
- Add real-time inventory (Socket.io)
- Email notifications (Sendgrid + Bull queue)
- Advanced analytics dashboard
- Mobile app (React Native)

### Phase 3 (Scale - Months 5+)
- Elasticsearch for advanced search
- Redis for distributed caching
- Microservices extraction (if needed)
- GraphQL gateway layer

---

## 7. Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Unknown team size | Modular monolith; straightforward tech stack with strong community support |
| Payment integration complexity | Use Stripe as managed service; follow official docs rigorously |
| Database scaling | PostgreSQL handles 100k+ orders easily; plan read replicas at scale |
| Frontend performance | Lazy-load routes, image optimization, bundle analysis |
| Security vulnerabilities | Automated dependency scanning, OWASP top 10 checklist, penetration testing budget |
| Team skill gaps | Comprehensive onboarding docs, architecture decision records, video tutorials |

---

## 8. Cost Estimation (Monthly - Steady State)

| Service | Cost | Notes |
|---------|------|-------|
| Hosting (PaaS) | $20-50 | Railway/Render; scales to production |
| PostgreSQL | $15-30 | Managed database |
| Email service | $10 | SendGrid free tier for startup |
| CDN (Cloudflare) | $20 | Images, static assets |
| Monitoring (Sentry) | Free-50 | Pay-as-you-grow |
| **Total** | **$75-150** | Excluding Stripe payment fees (2.9% + $0.30) |

---

## 9. Recommended Tech Stack Summary

| Layer | Technology | Justification |
|-------|-----------|---------------|
| **Frontend** | React 18 + TypeScript + Vite | Developer experience, ecosystem |
| **Backend** | Node.js + Express + TypeScript | Full-stack JavaScript, rapid development |
| **Database** | PostgreSQL + Prisma ORM | ACID compliance, type safety |
| **Authentication** | JWT + bcryptjs | Stateless, scalable, standard |
| **Payments** | Stripe API | Seamless integration, compliance |
| **Hosting** | Railway/Render (PaaS) | Simplicity, unknown team size |
| **API Pattern** | RESTful | Simplicity, maturity |
| **Testing** | Jest + Vitest + Playwright | Comprehensive coverage |
| **Deployment** | Docker + GitHub Actions | Containerization, CI/CD automation |

---

## 10. Next Steps for Implementation

1. **Repository Setup:** Create monorepo structure with shared TypeScript types
2. **Database Schema:** Design Prisma models (Users, Products, Orders, Payments)
3. **Backend Scaffold:** Express setup with middleware, error handling, logging
4. **Frontend Scaffold:** React project with routing, state management, styling
5. **Authentication Module:** JWT flow, registration, login, protected routes
6. **Product Catalog:** List, search, filter endpoints with Postgres full-text search
7. **Shopping Cart:** Client-side state management with Zustand
8. **Stripe Integration:** Payment intent flow, webhook handling
9. **CI/CD Pipeline:** GitHub Actions with tests and automated deployment
10. **Monitoring:** Sentry + structured logging setup

---

## Appendix: Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                            │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ React SPA (Vite)                                     │   │
│  │ - Product Browsing, Cart, Checkout                  │   │
│  │ - State: Zustand + TanStack Query                   │   │
│  │ - Styling: Tailwind CSS                             │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTPS/TLS 1.3
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                      API GATEWAY                             │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Node.js/Express (Containerized)                      │   │
│  │ ├─ Auth Middleware (JWT validation)                  │   │
│  │ ├─ Rate Limiting                                     │   │
│  │ ├─ CORS / Security Headers                           │   │
│  │ └─ Request Logging                                   │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────┬─────────────────┬──────────────┬────────────────┘
             │                 │              │
             ▼                 ▼              ▼
      ┌────────────┐   ┌──────────────┐  ┌──────────┐
      │   Routes   │   │  Services    │  │Middleware│
      │ - Products │   │ - Auth Logic │  │- Validation│
      │ - Orders   │   │ - Cart Logic │  │- Error Handle│
      │ - Cart     │   │ - Payment    │  │- Logging │
      │ - Admin    │   │ - Email      │  └──────────┘
      └────────────┘   └──────────────┘
             │                 │
             └─────────┬───────┘
                       │
                       ▼
      ┌──────────────────────────────────┐
      │   Data Access Layer (Prisma)     │
      │ - Type-safe queries              │
      │ - Migrations                      │
      │ - Connection pooling              │
      └──────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        ▼                             ▼
    ┌──────────────┐          ┌──────────────────┐
    │  PostgreSQL  │          │  In-App Cache    │
    │   Database   │          │  (Node-cache)    │
    │ - Tables     │          │  - Products      │
    │ - Indexes    │          │  - Categories    │
    │ - Full-text  │          │  - Sessions      │
    │   search     │          └──────────────────┘
    └──────────────┘
        │
        ├──► Orders, Users, Products, Inventory
        ├──► Full-text search on product names
        └──► Transaction support for payments

         ┌──────────────────────────────┐
         │  External Services           │
         ├──────────────────────────────┤
         │ Stripe API (Payments)        │
         │ SendGrid (Email)             │
         │ Cloudinary (Images)          │
         └──────────────────────────────┘
```

---

**Document Version:** 1.0  
**Last Updated:** 2024  
**Status:** APPROVED FOR IMPLEMENTATION

This architecture document is designed to be **flexible and iterative**. Technology choices should be revisited after the first month of development based on actual team velocity and discovered constraints.