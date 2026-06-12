# MiniStore

MiniStore is a responsive mini e-commerce application built using React, TypeScript, Vite, SCSS Modules, Context API, and the Fake Store API.

## Live Demo

Add deployed URL here after deployment.

Example:

https://your-app.vercel.app

---

## Setup

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

---

## Build

Create a production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Features

### Product Listing Page

- Fetches products from Fake Store API
- Responsive product grid
- Product image, title, and price
- Quick Add To Cart functionality

### Product Detail Page

- Product information display
- Image gallery
- Variant selection (color and size)
- Stock state handling
- Quantity selector
- URL-based variant state

### Cart Drawer

- Slide-in cart drawer
- Add and remove products
- Quantity management
- Subtotal and total calculation
- Empty cart state

### Persistence

- Cart data stored in localStorage
- Cart survives page refresh
- Variant selection synchronized with URL

### Responsive Design

- Desktop layout
- Tablet layout
- Mobile layout

---

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router DOM
- Context API
- SCSS Modules
- Fake Store API

---

## Folder Structure

```txt
src/
├── api
├── components
├── context
├── data
├── hooks
├── pages
├── styles
├── types
```

---

## Design Decisions

- Context API was chosen for global cart state management.
- localStorage was used for cart persistence.
- SCSS Modules were used to keep styles scoped and maintainable.
- Variant data was mocked because Fake Store API does not provide product variants.

---

## Known Trade-offs

- Fake Store API provides only a single image per product.
- Product variants are simulated locally.
- Checkout functionality is intentionally out of scope.

---

## API

Products are fetched from:

https://fakestoreapi.com/products

---

## Author

Gunalaxmi Bandaru
Frontend Developer