# Architectural Decision

One architectural decision I considered was choosing between Context API and Redux Toolkit for state management.

Redux Toolkit provides excellent scalability, advanced debugging capabilities, and predictable state updates. However, for this project the only shared global state is the shopping cart. Introducing Redux Toolkit would add additional setup and boilerplate without providing significant benefits.

I chose Context API because it offers a lightweight solution that is easy to maintain and sufficient for the current scope of the application. The cart state is accessible throughout the application while keeping the codebase simple and readable.

---

# What I Would Improve With More Time

If more time were available, I would focus on the following improvements:

## Testing

Add unit tests for:

- Variant selection
- Quantity controls
- Cart calculations
- Sold-out state handling

using Vitest and React Testing Library.

## Better Product Data

The Fake Store API does not provide product variants, inventory information, or multiple product images. In a production application these values would come from a backend service rather than being mocked locally.

## Performance

- Add skeleton loaders while products are loading.
- Implement image lazy loading.
- Introduce React Query for caching and server-state management.

## Accessibility

- Improve keyboard navigation.
- Add ARIA labels.
- Improve screen reader support.

## Additional Features

- Product search
- Product filtering
- Product sorting
- Wishlist functionality
- Checkout flow

---

# Summary

The implementation prioritizes clean component structure, responsive design, localStorage persistence, and maintainable state management while fulfilling all assignment requirements.