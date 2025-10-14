# 🌍 LanguageShop – Merch Store for Language Schools

**LanguageShop** is a modern, responsive **Progressive Web App (PWA)** built with **React 19**, **React Router v7**, and **Vite**. It simulates an online merchandise store for a language school, featuring hoodies, t-shirts, mugs, and more — all powered by **mocked data**.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)
![PWA](https://img.shields.io/badge/PWA-Enabled-FF6F00?style=flat-square&logo=pwa)
![Conventional Commits](https://img.shields.io/badge/Conventional_Commits-Enforced-2196F3?style=flat-square)

---

## ✨ Features

- 🛍️ **Product Catalog**: Hoodies, zip-up hoodies, t-shirts, mugs, and socks  
- 🔍 **Smart Filtering**: By category, price range, size, color, and availability  
- 🛒 **Shopping Cart**: Add, update quantity, remove — with `localStorage` persistence  
- 📱 **Fully Responsive**: Mobile-first design that works on all screen sizes  
- 📥 **Offline Support**: PWA with service worker caching for UI and product data  
- 🧪 **Comprehensive Testing**: Unit, integration, and E2E tests with Vitest + Playwright  
- 🧼 **Clean Code**: Built with **SOLID**, **DRY**, and **KISS** principles  
- 📦 **Zero Backend**: Full REST API simulation using **MSW (Mock Service Worker)**  
- 📝 **Conventional Commits**: Use Conventional Commits for commit messages  

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm 10+

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/gsroka/languageshop.git
   cd languageshop
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Start the development server:**

   ```bash
   pnpm dev
   ```

4. **Open your browser:**  
   Navigate to [http://localhost:5173](http://localhost:5173)

> 💡 **No environment setup needed!** All data is mocked — no API keys or `.env` files required.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) with `useOptimistic`, `useActionState`
- **Routing & SSR**: [React Router v7](https://reactrouter.com/)
- **Bundler**: [Vite 7](https://vitejs.dev/) for lightning-fast HMR
- **State Management**: [Zustand 5.x](https://github.com/pmndrs/zustand) — minimal, typed, scalable
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + `clsx` + `@headlessui/react`
- **Forms**: [React Hook Form v8](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **API Mocking**: [MSW (Mock Service Worker)](https://mswjs.io/)
- **PWA**: `vite-plugin-pwa`
- **Testing**: [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/), [Playwright](https://playwright.dev/)
- **Language**: TypeScript 5.5
- **Tooling**: ESLint, Prettier

---

## 📁 Project Structure (React Router v7)

```
language-shop/
├── app/                        # Main application directory (replaces src/)
│   ├── routes/                 # File-based routing (e.g., routes.products.$id.tsx)
│   ├── components/             # Shared UI and feature components
│   │   ├── ui/                 # Button, Input, Badge
│   │   ├── layout/             # Header, Footer, Root layout
│   │   └── features/           # ProductCard, CartItem, FilterPanel
│   ├── hooks/                  # useDebounce, useLocalStorage
│   ├── stores/                 # Zustand stores (cart, products, filters)
│   ├── types/                  # TypeScript interfaces (Product, CartItem)
│   ├── utils/                  # formatters, helpers
│   ├── app.css                 # global styles
│   └── root.tsx                # app root
├── public/                     
├── public/                     # Static assets, PWA manifest, icons
│   └── manifest.webmanifest
├── tests/                      # Unit & integration tests
├── e2e/                        # Playwright E2E tests
├── vite.config.ts              # Vite + PWA config
└── tsconfig.json               # With path alias: ~ → app/
```

---

## 🧼 Engineering Principles

This project strictly follows modern software engineering best practices:

- **SOLID**: Each store and component has a single responsibility.
- **DRY**: Shared types, hooks, and UI components are reused across the app.
- **KISS**: No over-engineering — logic lives only where necessary.
- **Conventional Commits**: All commits follow the [Conventional Commits 1.0.0](https://www.conventionalcommits.org/) spec.

Example commits:
```bash
feat(cart): persist cart state in localStorage
fix(products): handle missing image with fallback
refactor(filters): extract price range logic to custom hook
```

---

## 📝 Scripts

```bash
pnpm dev          # Start dev server (Vite + React Router)
pnpm build        # Build for production (SSR + PWA-ready)
pnpm start        # Start production server
pnpm preview      # Preview production build locally
pnpm lint         # Run ESLint
pnpm format:write # Format code with Prettier
pnpm typecheck    # Run TypeScript checks
pnpm test         # Run Vitest (unit + integration)
pnpm test:e2e     # Run Playwright E2E tests
```

---

## 🗺️ Development Roadmap (TODO Phases)

<details>
<summary><strong>View Full Implementation Plan</strong></summary>

### Phase 0: Project Setup & Configuration ✅
- [x] Initialize project with `pnpm create react-router@latest`
- [x] Install `vite-plugin-pwa` for PWA support
- [x] Configure shadcn/ui
- [x] Set up `tsconfig.json` with path alias `~/`
- [x] Create `README.md` with project overview
- [x] Initialize Git + Conventional Commits

### Phase 1: Architecture, Routing & Typing
- [ ] Define core types: `Product`, `CartItem`, `FilterOptions`
- [ ] Create folder structure inside `app/`: `components/`, `stores/`, `types/`, etc.
- [ ] Implement root layout (`app/root.tsx`)
- [ ] Set up routes: `/`, `/products/:id`, `/cart`, `/checkout`
- [ ] Add loading and error boundaries (React Router v7 conventions)
- [ ] Create shared layout components: `Header`, `Footer`

### Phase 2: Mock API with MSW
- [ ] Install MSW
- [ ] Create mock product data (5 categories, 20+ items)
- [ ] Implement `GET /api/products` and `GET /api/products/:id`
- [ ] Integrate `apiClient` abstraction in `app/api/client.ts`
- [ ] Add delay and error simulation in MSW

### Phase 3: Product Catalog & Filtering
- [ ] Build `ProductList` and `ProductCard` components
- [ ] Implement `useProductStore` with Zustand (fetch + cache)
- [ ] Create `FilterPanel` with React Hook Form + Zod
- [ ] Add search, category, price, size, color, availability filters
- [ ] Connect filters to product store via `useFilterStore`

### Phase 4: Shopping Cart (Zustand + localStorage)
- [ ] Create `useCartStore` with persistence via `useLocalStorage`
- [ ] Implement `addToCart`, `updateQuantity`, `removeFromCart`
- [ ] Build `CartPage` with editable items
- [ ] Add cart badge in `Header`

### Phase 5: Product Detail Page
- [ ] Create dynamic route `app/routes/products.$id.tsx`
- [ ] Fetch product by ID
- [ ] Display variants (size, color), image gallery, description
- [ ] Add “Add to Cart” button with variant selection

### Phase 6: Checkout Flow (Mock)
- [ ] Build `CheckoutPage` with contact form (RHF + Zod)
- [ ] Validate name, email, address
- [ ] Show order summary
- [ ] On submit: show success modal, clear cart

### Phase 7: PWA & Offline Support
- [ ] Configure `vite-plugin-pwa` to cache routes and API
- [ ] Add offline fallback page
- [ ] Test offline mode in DevTools

### Phase 8: Testing
- [ ] Unit tests for Zustand stores (Vitest)
- [ ] Component tests (RTL): `ProductCard`, `Cart`
- [ ] E2E test: add to cart → checkout (Playwright)

### Phase 9: Polish & Performance
- [ ] Lazy-load images (`loading="lazy"`)
- [ ] Optimize re-renders (`React.memo`, `useCallback`)
- [ ] Add meta tags, favicon, PWA icons
- [ ] Lighthouse audit → fix accessibility/performance

</details>

---

## 📧 Contact

Grzegorz Sroka - [@gsroka89](https://x.com/gsroka89)

Project Link: [https://github.com/gsroka/languageshop](https://github.com/gsroka/languageshop)