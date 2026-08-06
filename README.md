# Ecommerce System

A full-stack ecommerce platform built with Next.js 16, React 19, Sanity CMS, Stripe, and Clerk. The application supports multi-currency pricing, real-time language switching across eight regions, a complete checkout flow, order management, a blog, and a full admin content studio.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [Internationalisation](#internationalisation)
- [Content Management](#content-management)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS v4, shadcn/ui, Base UI |
| CMS | Sanity v3 |
| Authentication | Clerk |
| Payments | Stripe (Checkout Sessions, Webhooks, Invoices) |
| Internationalisation | next-intl 3 |
| State management | Zustand |
| Animations | Motion (Framer Motion v12) |
| Language | TypeScript 5 |

---

## Features

**Shopping**

- Product listing with tab filters by category (Gadgets, Smartphones, Appliances)
- Product detail pages with image gallery, stock indicator, reviews, and related delivery info
- Cart with per-item selection, quantity controls, and real-time subtotal calculation
- Wishlist with persistent state across sessions
- Shop page with sidebar filters for category, brand, and price range
- Hot deals page surfacing products marked with `status: hot`

**Checkout and Payments**

- Stripe Checkout Sessions with support for USD, EUR, BRL, GBP, JPY, CAD, AUD, and MXN
- Stripe Webhooks handle order creation, stock decrement, and payment status updates
- Invoice generation via Stripe for supported currencies
- Order history page with per-order currency display and invoice download

**Content**

- Blog with category filtering, rich text rendering via Portable Text, and related posts sidebar
- Category pages with dynamic product filtering
- Brand pages with brand-filtered product listings
- Static informational pages: About, Contact, Privacy Policy, Terms and Conditions, FAQ, Help

**Internationalisation**

- Eight supported regions with automatic language selection based on the chosen currency
- Real-time UI translation without page reload using next-intl and a client-side provider
- Message files in JSON format, one file per language
- Default language is Portuguese (Brazil)

**Admin**

- Full Sanity Studio at `/studio` for managing products, categories, brands, blog posts, and orders
- Featured categories controlled via a boolean toggle in the studio

---

## Project Structure

```
ecommerce-system/
├── actions/                    # Server actions (checkout, currency, exchange rates)
├── messages/                   # i18n message files (pt, en, es, de, ja)
│   ├── pt.json
│   ├── en.json
│   ├── es.json
│   ├── de.json
│   └── ja.json
├── src/
│   ├── app/
│   │   ├── (client)/           # All storefront routes
│   │   │   ├── page.tsx        # Home
│   │   │   ├── shop/           # Shop with filters
│   │   │   ├── product/[slug]/ # Product detail
│   │   │   ├── cart/           # Cart and checkout
│   │   │   ├── orders/         # Order history
│   │   │   ├── wishlist/       # Wishlist
│   │   │   ├── blog/           # Blog listing and single post
│   │   │   ├── brand/[slug]/   # Brand-filtered products
│   │   │   ├── category/[slug]/# Category-filtered products
│   │   │   ├── deal/           # Hot deals
│   │   │   ├── success/        # Post-checkout confirmation
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── faq/
│   │   │   ├── help/
│   │   │   ├── privacy-policy/
│   │   │   └── terms-conditions/
│   │   ├── studio/             # Sanity Studio (embedded)
│   │   └── globals.css
│   ├── components/             # Shared UI components
│   │   ├── shop/               # Filter sidebar components
│   │   └── blog/               # Blog-specific components
│   ├── context/
│   │   └── CurrencyContext.tsx # Currency state and exchange rates
│   ├── i18n/
│   │   ├── config.ts           # Locale list and currency-to-locale mapping
│   │   ├── request.ts          # next-intl server configuration
│   │   └── I18nProvider.tsx    # Client provider bridging CurrencyContext to next-intl
│   ├── lib/
│   │   └── reviewStats.ts      # Deterministic review generation from product ID
│   ├── sanity/
│   │   ├── schemaTypes/        # Sanity document schemas
│   │   ├── queries/            # GROQ query functions
│   │   └── lib/                # Sanity client, image helpers, live preview
│   ├── constants/
│   │   └── data.ts             # Nav links, footer categories, product tab config
│   └── middleware.ts           # Clerk authentication middleware
├── store.ts                    # Zustand store (cart, wishlist)
├── next.config.ts
├── sanity.config.ts
└── sanity.types.ts             # Auto-generated Sanity TypeScript types
```

---

## Routes

| Path | Description |
|---|---|
| `/` | Home page with banner, product tabs, popular categories, brands, and blog |
| `/shop` | Full shop with category, brand, and price filters |
| `/product/[slug]` | Product detail with images, reviews, cart, and wishlist |
| `/cart` | Shopping cart with item selection and Stripe checkout |
| `/orders` | Order history (requires authentication) |
| `/wishlist` | Saved products (requires authentication) |
| `/deal` | Products with hot status |
| `/blog` | Blog post listing |
| `/blog/[slug]` | Single blog post with rich text and sidebar |
| `/category/[slug]` | Products filtered by category |
| `/brand/[slug]` | Products filtered by brand |
| `/success` | Order confirmation after Stripe checkout |
| `/about` | About page |
| `/contact` | Contact form |
| `/faq` | Frequently asked questions with accordion |
| `/help` | Help centre with quick-action cards |
| `/privacy-policy` | Privacy policy |
| `/terms-conditions` | Terms and conditions |
| `/studio` | Sanity content studio |

---

## Internationalisation

The UI language is derived from the currency selected in the region selector in the header. Changing the currency immediately re-renders the entire interface in the corresponding language without a page reload.

**Supported regions**

| Currency | Language | Region |
|---|---|---|
| BRL | Portuguese | Brazil (default) |
| USD | English | United States |
| GBP | English | United Kingdom |
| CAD | English | Canada |
| AUD | English | Australia |
| EUR | German | Europe |
| MXN | Spanish | Mexico |
| JPY | Japanese | Japan |

**How it works**

1. The user selects a currency in `CurrencyLanguageSelector`.
2. `CurrencyContext` updates the active currency and writes a `preferred-locale` cookie.
3. `I18nProvider` derives the locale from the currency using `currencyToLocale` in `src/i18n/config.ts`.
4. `NextIntlClientProvider` receives the corresponding message bundle from `messages/*.json` and all `useTranslations()` consumers re-render.
5. Server Components read the `preferred-locale` cookie via `src/i18n/request.ts` to serve the correct locale on the next request.

**Adding a new language**

1. Create `messages/<locale>.json` matching the structure of `messages/en.json`.
2. Add the locale to the `locales` array in `src/i18n/config.ts`.
3. Add the currency-to-locale entry in `currencyToLocale`.
4. Import and register the message bundle in `src/i18n/I18nProvider.tsx`.
5. Add the locale config to `LOCALE_CONFIGS` in `actions/currency.ts`.

---

## Content Management

All content is managed through Sanity Studio at `/studio`.

**Document types**

| Schema | Description |
|---|---|
| `product` | Name, slug, images, price, discount, stock, brand reference, category references, status (new/hot/sale), variant, featured flag |
| `category` | Title, slug, description, image, featured toggle (controls home page display) |
| `brand` | Name, slug, logo image |
| `blog` | Title, slug, author, main image, body (Portable Text), blog categories, published date, latest flag |
| `blogCategory` | Title and slug for blog taxonomy |
| `order` | Created automatically by Stripe webhook: order number, customer, products, totals, currency, status, invoice, address |
| `address` | Delivery addresses associated with orders |
| `author` | Name and image for blog authorship |

**Featured categories**

Categories shown on the home page Popular Categories section are controlled by the `featured` boolean field in the category document. Toggle it on in the studio to include a category.

---

## Environment Variables

Create a `.env.local` file at the project root with the following variables. Do not commit real credentials.

```env
# Clerk authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Application base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-07-30
SANITY_API_READ_TOKEN=
SANITY_API_TOKEN=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Exchange rate API (exchangerate-api.com)
EXCHANGE_RATE_API_KEY=
```

---

## Getting Started

**Prerequisites**

- Node.js 20 or later
- A Sanity project (create one at sanity.io)
- A Clerk application (create one at clerk.com)
- A Stripe account with a webhook endpoint configured

**Installation**

```bash
git clone https://github.com/your-username/ecommerce-system.git
cd ecommerce-system
npm install
```

Copy the environment variables template and fill in your credentials:

```bash
cp .env.example .env.local
```

Run the development server:

```bash
npm run dev
```

The storefront is available at `http://localhost:3000` and the Sanity Studio at `http://localhost:3000/studio`.

**Stripe webhook (local development)**

Forward webhook events to your local server using the Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/webhook
```

Copy the webhook signing secret printed by the CLI into `STRIPE_WEBHOOK_SECRET`.

**Regenerate Sanity types**

After modifying any Sanity schema, regenerate the TypeScript types:

```bash
npm run typegen
```

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run typegen` | Extract Sanity schema and regenerate TypeScript types |
