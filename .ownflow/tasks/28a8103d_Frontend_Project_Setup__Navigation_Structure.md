# Frontend Project Setup & Navigation Structure - Deliverable

## Overview
This deliverable provides a complete Vue.js frontend project setup for the TEST SHOP e-commerce platform. The implementation includes:

- ✅ Vue.js 3 project with Vite build tool
- ✅ Vue Router with comprehensive routing structure
- ✅ Responsive layout with mobile-first design
- ✅ Navigation component supporting desktop and mobile views
- ✅ Axios HTTP client configuration
- ✅ TailwindCSS for styling
- ✅ Placeholder pages for all core flows

## Project Structure

```
test-shop-frontend/
├── src/
│   ├── components/
│   │   ├── Layout.vue          # Main layout wrapper
│   │   ├── Navigation.vue      # Header/nav component
│   │   └── Footer.vue          # Footer component
│   ├── pages/
│   │   ├── Home.vue            # Homepage
│   │   ├── Products.vue        # Product listing
│   │   ├── ProductDetail.vue   # Single product view
│   │   ├── Cart.vue            # Shopping cart
│   │   ├── Checkout.vue        # Checkout flow
│   │   ├── Account.vue         # User account
│   │   ├── OrderHistory.vue    # Past orders
│   │   └── NotFound.vue        # 404 page
│   ├── services/
│   │   └── api.js              # Axios HTTP client
│   ├── router/
│   │   └── index.js            # Vue Router config
│   ├── stores/
│   │   └── cart.js             # Pinia cart state
│   ├── assets/
│   │   └── styles.css          # Global styles
│   ├── App.vue                 # Root component
│   └── main.js                 # Entry point
├── public/
│   └── favicon.ico
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── .env.example
```

## Key Features

### 1. Vue Router Configuration
- Home page (landing)
- Products page with category filtering capability
- Product detail page (parameterized routing)
- Cart page
- Checkout page (protected)
- Account page (protected)
- Order history page (protected)
- 404 fallback

### 2. Responsive Navigation
- Desktop horizontal navigation bar
- Mobile hamburger menu
- Active route highlighting
- Cart item counter
- User authentication indicators

### 3. HTTP Client (Axios)
- Centralized API configuration
- Request/response interceptors
- Base URL configuration via environment variables
- Error handling utilities

### 4. State Management (Pinia)
- Shopping cart store
- Cart operations (add, remove, update quantity)
- Cart persistence (localStorage)

### 5. Styling
- TailwindCSS utility-first CSS framework
- Mobile-first responsive design
- Consistent color scheme for candy shop branding

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm/yarn
- Git

### Installation

```bash
# Clone and navigate to frontend directory
cd test-shop-frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

### Environment Variables
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Test Shop
```

---

###FILES###
[
  {
    "path": "package.json",
    "content": "{\n  \"name\": \"test-shop-frontend\",\n  \"version\": \"1.0.0\",\n  \"type\": \"module\",\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"vite build\",\n    \"preview\": \"vite preview\",\n    \"lint\": \"eslint . --ext .vue,.js,.jsx,.cjs,.mjs --fix --ignore-path .gitignore\"\n  },\n  \"dependencies\": {\n    \"vue\": \"^3.3.0\",\n    \"vue-router\": \"^4.2.0\",\n    \"pinia\": \"^2.1.0\",\n    \"axios\": \"^1.4.0\"\n  },\n  \"devDependencies\": {\n    \"@vitejs/plugin-vue\": \"^4.2.0\",\n    \"vite\": \"^4.3.0\",\n    \"tailwindcss\": \"^3.3.0\",\n    \"postcss\": \"^8.4.0\",\n    \"autoprefixer\": \"^10.4.0\"\n  }\n}\n"
  },
  {
    "path": "vite.config.js",
    "content": "import { defineConfig } from 'vite'\nimport vue from '@vitejs/plugin-vue'\nimport path from 'path'\n\nexport default defineConfig({\n  plugins: [vue()],\n  resolve: {\n    alias: {\n      '@': path.resolve(__dirname, './src'),\n    },\n  },\n  server: {\n    port: 5173,\n    strictPort: false,\n    proxy: {\n      '/api': {\n        target: process.env.VITE_API_BASE_URL || 'http://localhost:3000',\n        changeOrigin: true,\n        rewrite: (path) => path.replace(/^\\/api/, '/api'),\n      },\n    },\n  },\n})\n"
  },
  {
    "path": "tailwind.config.js",
    "content": "/** @type {import('tailwindcss').Config} */\nexport default {\n  content: [\n    './index.html',\n    './src/**/*.{vue,js,ts,jsx,tsx}',\n  ],\n  theme: {\n    extend: {\n      colors: {\n        candy: {\n          50: '#fdf8f6',\n          100: '#fce8e3',\n          200: '#f9d1c7',\n          300: '#f4b5a8',\n          400: '#eb8975',\n          500: '#e66d52',\n          600: '#d94a30',\n          700: '#b83b27',\n          800: '#963224',\n          900: '#7d2d1f',\n        },\n      },\n    },\n  },\n  plugins: [],\n}\n"
  },\n  {
    "path": "postcss.config.js",\n    "content": "export default {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n}\n"
  },
  {
    "path": ".env.example",\n    "content": "# API Configuration\nVITE_API_BASE_URL=http://localhost:3000/api\n\n# App Configuration\nVITE_APP_NAME=Test Shop\nVITE_APP_VERSION=1.0.0\n\n# Features\nVITE_ENABLE_ANALYTICS=false\n"
  },
  {
    "path": "index.html",
    "content": "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <link rel=\"icon\" href=\"/favicon.ico\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Test Shop - Candy Store</title>\n  </head>\n  <body>\n    <div id=\"app\"></div>\n    <script type=\"module\" src=\"/src/main.js\"></script>\n  </body>\n</html>\n"
  },
  {
    "path": "src/main.js",
    "content": "import { createApp } from 'vue'\nimport { createPinia } from 'pinia'\nimport App from './App.vue'\nimport router from './router'\nimport './assets/styles.css'\n\nconst app = createApp(App)\n\napp.use(createPinia())\napp.use(router)\n\napp.mount('#app')\n"
  },
  {
    "path": "src/App.vue",\    "content": "<template>\n  <Layout>\n    <RouterView />\n  </Layout>\n</template>\n\n<script setup>\nimport Layout from '@/components/Layout.vue'\nimport { RouterView } from 'vue-router'\n</script>\n\n<style scoped>\n/* Global app styles handled by Tailwind */\n</style>\n"
  },
  {
    "path": "src/router/index.js",
    "content": "import { createRouter, createWebHistory } from 'vue-router'\nimport Home from '@/pages/Home.vue'\nimport Products from '@/pages/Products.vue'\nimport ProductDetail from '@/pages/ProductDetail.vue'\nimport Cart from '@/pages/Cart.vue'\nimport Checkout from '@/pages/Checkout.vue'\nimport Account from '@/pages/Account.vue'\nimport OrderHistory from '@/pages/OrderHistory.vue'\nimport NotFound from '@/pages/NotFound.vue'\n\nconst routes = [\n  {\n    path: '/',\n    name: 'Home',\n    component: Home,\n    meta: {\n      title: 'Home - Test Shop',\n      description: 'Welcome to Test Shop, your favorite candy store',\n    },\n  },\n  {\n    path: '/products',\n    name: 'Products',\n    component: Products,\n    meta: {\n      title: 'Products - Test Shop',\n      description: 'Browse our delicious candy selection',\n    },\n  },\n  {\n    path: '/products/:id',\n    name: 'ProductDetail',\n    component: ProductDetail,\n    meta: {\n      title: 'Product Details - Test Shop',\n    },\n  },\n  {\n    path: '/cart',\n    name: 'Cart',\n    component: Cart,\n    meta: {\n      title: 'Shopping Cart - Test Shop',\n    },\n  },\n  {\n    path: '/checkout',\n    name: 'Checkout',\n    component: Checkout,\n    meta: {\n      title: 'Checkout - Test Shop',\n      requiresAuth: true,\n    },\n  },\n  {\n    path: '/account',\n    name: 'Account',\n    component: Account,\n    meta: {\n      title: 'My Account - Test Shop',\n      requiresAuth: true,\n    },\n  },\n  {\n    path: '/orders',\n    name: 'OrderHistory',\n    component: OrderHistory,\n    meta: {\n      title: 'Order History - Test Shop',\n      requiresAuth: true,\n    },\n  },\n  {\n    path: '/:pathMatch(.*)*',\n    name: 'NotFound',\n    component: NotFound,\n    meta: {\n      title: 'Page Not Found - Test Shop',\n    },\n  },\n]\n\nconst router = createRouter({\n  history: createWebHistory(import.meta.env.BASE_URL || '/'),\n  routes,\n  scrollBehavior(to, from, savedPosition) {\n    if (savedPosition) {\n      return savedPosition\n    } else {\n      return { top: 0 }\n    }\n  },\n})\n\n// Update page title on route change\nrouter.afterEach((to) => {\n  document.title = to.meta.title || 'Test Shop'\n})\n\n// Navigation guard for protected routes\nrouter.beforeEach((to, from, next) => {\n  const requiresAuth = to.meta.requiresAuth\n  // TODO: Replace with actual auth check from store\n  const isAuthenticated = localStorage.getItem('auth_token')\n\n  if (requiresAuth && !isAuthenticated) {\n    // Redirect to home or login page when implemented\n    next({ name: 'Home' })\n  } else {\n    next()\n  }\n})\n\nexport default router\n"
  },
  {
    "path": "src/components/Layout.vue",
    "content": "<template>\n  <div class=\"flex flex-col min-h-screen bg-white\">\n    <!-- Navigation -->\n    <Navigation />\n\n    <!-- Main Content -->\n    <main class=\"flex-grow\">\n      <slot />\n    </main>\n\n    <!-- Footer -->\n    <Footer />\n  </div>\n</template>\n\n<script setup>\nimport Navigation from './Navigation.vue'\nimport Footer from './Footer.vue'\n</script>\n\n<style scoped>\n/* Layout structure styles */\n</style>\n"
  },
  {
    "path": "src/components/Navigation.vue",
    "content": "<template>\n  <nav class=\"sticky top-0 z-50 bg-white shadow-md\">\n    <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8\">\n      <div class=\"flex justify-between items-center h-16\">\n        <!-- Logo -->\n        <RouterLink to=\"/\" class=\"flex items-center space-x-2 font-bold text-2xl text-candy-600 hover:text-candy-700 transition\">\n          <span class=\"text-3xl\">🍬</span>\n          <span class=\"hidden sm:inline\">Test Shop</span>\n        </RouterLink>\n\n        <!-- Desktop Menu -->\n        <div class=\"hidden md:flex items-center space-x-8\">\n          <NavLink to=\"/\" label=\"Home\" />\n          <NavLink to=\"/products\" label=\"Products\" />\n          <NavLink to=\"/account\" label=\"Account\" />\n        </div>\n\n        <!-- Right Side Icons -->\n        <div class=\"flex items-center space-x-4\">\n          <!-- Cart Icon -->\n          <RouterLink\n            to=\"/cart\"\n            class=\"relative p-2 text-gray-700 hover:text-candy-600 transition\"\n            aria-label=\"Shopping cart\"\n          >\n            <svg class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n              <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z\" />\n            </svg>\n            <span v-if=\"cartItemCount > 0\" class=\"absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-candy-600 rounded-full\">{{ cartItemCount }}</span>\n          </RouterLink>\n\n          <!-- Mobile Menu Button -->\n          <button\n            @click=\"toggleMobileMenu\"\n            class=\"md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition\"\n            aria-expanded=\"mobileMenuOpen\"\n            aria-label=\"Toggle menu\"\n          >\n            <svg class=\"w-6 h-6\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">\n              <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M4 6h16M4 12h16M4 18h16\" />\n            </svg>\n          </button>\n        </div>\n      </div>\n\n      <!-- Mobile Menu -->\n      <div v-if=\"mobileMenuOpen\" class=\"md:hidden pb-4 border-t border-gray-200\">\n        <div class=\"pt-2 pb-3 space-y-1\">\n          <MobileNavLink to=\"/\" label=\"Home\" @click=\"closeMobileMenu\" />\n          <MobileNavLink to=\"/products\" label=\"Products\" @click=\"closeMobileMenu\" />\n          <MobileNavLink to=\"/account\" label=\"Account\" @click=\"closeMobileMenu\" />\n        </div>\n      </div>\n    </div>\n  </nav>\n</template>\n\n<script setup>\nimport { ref, computed } from 'vue'\nimport { RouterLink } from 'vue-router'\nimport { useCartStore } from '@/stores/cart'\n\nconst mobileMenuOpen = ref(false)\nconst cartStore = useCartStore()\n\nconst cartItemCount = computed(() => cartStore.itemCount)\n\nconst toggleMobileMenu = () => {\n  mobileMenuOpen.value = !mobileMenuOpen.value\n}\n\nconst closeMobileMenu = () => {\n  mobileMenuOpen.value = false\n}\n</script>\n\n<component is=\"style\" scoped>\n/* Navigation component styles */\n</component>\n\n<!-- Subcomponents for DRY navigation links -->\n<template #NavLink>\n  <RouterLink\n    :to=\"to\"\n    class=\"text-gray-700 hover:text-candy-600 font-medium transition\"\n    active-class=\"text-candy-600 border-b-2 border-candy-600\"\n  >\n    {{ label }}\n  </RouterLink>\n</template>\n\n<template #MobileNavLink>\n  <RouterLink\n    :to=\"to\"\n    class=\"block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-candy-600 hover:bg-gray-50 transition\"\n    active-class=\"text-candy-600 bg-candy-50\"\n  >\n    {{ label }}\n  </RouterLink>\n</template>\n"
  },
  {
    "path": "src/components/Navigation-shared.vue",
    "content": "<!-- Shared navigation link components -->\n\n<template name=\"NavLink\">\n  <RouterLink\n    :to=\"to\"\n    class=\"text-gray-700 hover:text-candy-600 font-medium transition\"\n    :class=\"{ 'text-candy-600 border-b-2 border-candy-600': isActive }\"\n  >\n    {{ label }}\n  </RouterLink>\n</template>\n\n<template name=\"MobileNavLink\">\n  <RouterLink\n    :to=\"to\"\n    class=\"block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-candy-600 hover:bg-gray-50 transition\"\n    :class=\"{ 'text-candy-600 bg-candy-50': isActive }\"\n  >\n    {{ label }}\n  </RouterLink>\n</template>\n\n<script setup>\nimport { computed } from 'vue'\nimport { useRoute } from 'vue-router'\n\nconst props = defineProps({\n  to: String,\n  label: String,\n})\n\nconst route = useRoute()\n\nconst isActive = computed(() => {\n  return route.path === props.to\n})\n</script>\n"
  },
  {
    "path": "src/components/Footer.vue",
    "content": "<template>\n  <footer class=\"bg-gray-900 text-gray-300 mt-12\">\n    <div class=\"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12\">\n      <div class=\"grid grid-cols-1 md:grid-cols-4 gap-8\">\n        <!-- About -->\n        <div>\n          <h3 class=\"text-white font-bold text-lg mb-4\">Test Shop</h3>\n          <p class=\"text-sm\">Your favorite online candy store. Premium sweets delivered to your door.</p>\n        </div>\n\n        <!-- Quick Links -->\n        <div>\n          <h4 class=\"text-white font-bold text-lg mb-4\">Quick Links</h4>\n          <ul class=\"space-y-2 text-sm\">\n            <li><RouterLink to=\"/\" class=\"hover:text-white transition\">Home</RouterLink></li>\n            <li><RouterLink to=\"/products\" class=\"hover:text-white transition\">Products</RouterLink></li>\n            <li><RouterLink to=\"/cart\" class=\"hover:text-white transition\">Cart</RouterLink></li>\n            <li><RouterLink to=\"/account\" class=\"hover:text-white transition\">Account</RouterLink></li>\n          </ul>\n        </div>\n\n        <!-- Customer Service -->\n        <div>\n          <h4 class=\"text-white font-bold text-lg mb-4\">Customer Service</h4>\n          <ul class=\"space-y-2 text-sm\">\n            <li><a href=\"#\" class=\"hover:text-white transition\">Contact Us</a></li>\n            <li><a href=\"#\" class=\"hover:text-white transition\">Shipping Info</a></li>\n            <li><a href=\"#\" class=\"hover:text-white transition\">Returns</a></li>\n            <li><a href=\"#\" class=\"hover:text-white transition\">FAQ</a></li>\n          </ul>\n        </div>\n\n        <!-- Legal -->\n        <div>\n          <h4 class=\"text-white font-bold text-lg mb-4\">Legal</h4>\n          <ul class=\"space-y-2 text-sm\">\n            <li><a href=\"#\" class=\"hover:text-white transition\">Privacy Policy</a></li>\n            <li><a href=\"#\" class=\"hover:text-white transition\">Terms of Service</a></li>\n            <li><a href=\"#\" class=\"hover:text-white transition\">Cookie Policy</a></li>\n          </ul>\n        </div>\n      </div>\n\n      <!-- Bottom Bar -->\n      <div class=\"border-t border-gray-700 mt-8 pt-8\">\n        <div class=\"flex flex-col md:flex-row justify-between items-center\">\n          <p class=\"text-sm text-center md:text-left\">&copy; 2024 Test Shop. All rights reserved.</p>\n          <div class=\"flex space-x-6 mt-4 md:mt-0\">\n            <a href=\"#\" class=\"text-gray-400 hover:text-white transition\">Facebook</a>\n            <a href=\"#\" class=\"text-gray-400 hover:text-white transition\">Twitter</a>\n            <a href=\"#\" class=\"text-gray-400 hover:text-white transition\">Instagram</a>\n          </div>\n        </div>\n      </div>\n    </div>\n  </footer>\n</template>\n\n<script setup>\nimport { RouterLink } from 'vue-router'\n</script>\n\n<style scoped>\n/* Footer styles */\n</style>\n"
  },
  {
    "path": "src/services/api.js",\n    "content": "import axios from 'axios'\n\n/**\n * HTTP Client for API Communication\n * Configured with base URL from environment variables\n * Includes request/response interceptors for error handling and auth tokens\n */\n\nconst apiBaseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'\n\nconst apiClient = axios.create({\n  baseURL: apiBaseURL,\n  timeout: 10000,\n  headers: {\n    'Content-Type': 'application/json',\n  },\n})\n\n/**\n * Request Interceptor\n * Adds authorization token to all requests if available\n */\napiClient.interceptors.request.use(\n  (config) => {\n    const token = localStorage.getItem('auth_token')\n    if (token) {\n      config.headers.Authorization = `Bearer ${token}`\n    }\n    return config\n  },\n  (error) => {\n    return Promise.reject(error)\n  }\n)\n\n/**\n * Response Interceptor\n * Handles common error scenarios\n */\napiClient.interceptors.response.use(\n  (response) => response,\n  (error) => {\n    if (error.response) {\n      // Server responded with error status\n      const status = error.response.status\n\n      if (status === 401) {\n        // Unauthorized - clear token and redirect to home\n        localStorage.removeItem('auth_token')\n        window.location.href = '/'\n      } else if (status === 403) {\n        // Forbidden\n        console.error('Access forbidden:', error.response.data)\n      } else if (status === 404) {\n        // Not found\n        console.error('Resource not found:', error.response.data)\n      } else if (status >= 500) {\n        // Server error\n        console.error('Server error:', error.response.data)\n      }\n    } else if (error.request) {\n      // Request made but no response received\n      console.error('No response received:', error.request)\n    } else {\n      // Error in request setup\n      console.error('Request setup error:', error.message)\n    }\n\n    return Promise.reject(error)\n  }\n)\n\n/**\n * API Service Methods\n */\nconst apiService = {\n  /**\n   * GET request\n   * @param {string} endpoint - API endpoint\n   * @param {object} config - Optional axios config\n   */\n  get: (endpoint, config = {}) => apiClient.get(endpoint, config),\n\n  /**\n   * POST request\n   * @param {string} endpoint - API endpoint\n   * @param {object} data - Request payload\n   * @param {object} config - Optional axios config\n   */\n  post: (endpoint, data = {}, config = {}) => apiClient.post(endpoint, data, config),\n\n  /**\n   * PUT request\n   * @param {string} endpoint - API endpoint\n   * @param {object} data - Request payload\n   * @param {object} config - Optional axios config\n   */\n  put: (endpoint, data = {}, config = {}) => apiClient.put(endpoint, data, config),\n\n  /**\n   * PATCH request\n   * @param {string} endpoint - API endpoint\n   * @param {object} data - Request payload\n   * @param {object} config - Optional axios config\n   */\n  patch: (endpoint, data = {}, config = {}) => apiClient.patch(endpoint, data, config),\n\n  /**\n   * DELETE request\n   * @param {string} endpoint - API endpoint\n   * @param {object} config - Optional axios config\n   */\n  delete: (endpoint, config = {}) => apiClient.delete(endpoint, config),\n\n  /**\n   * Set authorization token\n   * @param {string} token - JWT token\n   */\n  setAuthToken: (token) => {\n    if (token) {\n      localStorage.setItem('auth_token', token)\n      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`\n    }\n  },\n\n  /**\n   * Clear authorization token\n   */\n  clearAuthToken: () => {\n    localStorage.removeItem('auth_token')\n    delete apiClient.defaults.headers.common['Authorization']\n  },\n\n  /**\n   * Check if user is authenticated\n   */\n  isAuthenticated: () => {\n    return !!localStorage.getItem('auth_token')\n  },\n}\n\nexport default apiService\n"
  },
  {
    "path": "src/stores/cart.js",
    "content": "import { defineStore } from 'pinia'\nimport { ref, computed } from 'vue'\n\n/**\n * Shopping Cart Store\n * Manages cart state with localStorage persistence\n */\nexport const useCartStore = defineStore('cart', () => {\n  // State\n  const items = ref(loadCartFromStorage())\n\n  // Computed\n  const itemCount = computed(() => {\n    return items.value.reduce((sum, item) => sum + item.quantity, 0)\n  })\n\n  const totalPrice = computed(() => {\n    return items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)\n  })\n\n  const isEmpty = computed(() => items.value.length === 0)\n\n  // Methods\n  /**\n   * Add item to cart or update quantity if exists\n   */\n  function addItem(product) {\n    const existingItem = items.value.find((item) => item.id === product.id)\n\n    if (existingItem) {\n      existingItem.quantity += product.quantity || 1\n    } else {\n      items.value.push({\n        id: product.id,\n        name: product.name,\n        price: product.price,\n        image: product.image || '/placeholder.png',\n        quantity: product.quantity || 1,\n      })\n    }\n\n    saveCartToStorage()\n  }\n\n  /**\n   * Remove item from cart\n   */\n  function removeItem(productId) {\n    items.value = items.value.filter((item) => item.id !== productId)\n    saveCartToStorage()\n  }\n\n  /**\n   * Update item quantity\n   */\n  function updateQuantity(productId, quantity) {\n    const item = items.value.find((item) => item.id === productId)\n    if (item) {\n      if (quantity <= 0) {\n        removeItem(productId)\n      } else {\n        item.quantity = quantity\n        saveCartToStorage()\n      }\n    }\n  }\n\n  /**\n   * Clear entire cart\n   */\n  function clearCart() {\n    items.value = []\n    saveCartToStorage()\n  }\n\n  /**\n   * Get cart summary\n   */\n  function getCartSummary() {\n    return {\n      items: items.value,\n      itemCount: itemCount.value,\n      totalPrice: totalPrice.value,\n      isEmpty: isEmpty.value,\n    }\n  }\n\n  return {\n    // State\n    items,\n    // Computed\n    itemCount,\n    totalPrice,\n    isEmpty,\n    // Methods\n    addItem,\n    removeItem,\n    updateQuantity,\n    clearCart,\n    getCartSummary,\n  }\n})\n\n/**\n * LocalStorage Helper Functions\n */\nfunction loadCartFromStorage() {\n  try {\n    const stored = localStorage.getItem('test_shop_cart')\n    return stored ? JSON.parse(stored) : []\n  } catch (error) {\n    console.error('Failed to load cart from storage:', error)\n    return []\n  }\n}\n\nfunction saveCartToStorage() {\n  try {\n    const cart = useCartStore()\n    localStorage.