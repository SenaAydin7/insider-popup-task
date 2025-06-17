# Insider Cart Popup – Real-Time Cart Overview (Vanilla JavaScript)

This project is a custom **shopping cart popup** designed to enhance the user experience on the [Insider demo Shopify cart page](https://insiderdemo.myshopify.com/cart). It dynamically extracts cart contents from the DOM and presents them in an interactive, responsive popup with real-time quantity and price updates.

## Features

- **Live Cart Parsing**: Fetches cart items, images, prices, and details from the existing DOM structure.
- **Real-Time Quantity Updates**: Users can increment/decrement quantity and see updated pricing without reloading the page.
- **Remove Items Dynamically**: Cart items can be removed using the trash icon. Item disappears instantly from both the popup and the original cart DOM.
- **Total Price Calculation**: Cart total is recalculated live as quantities or items change.
- **Conditional Checkout Button**: Hides checkout button and total section when the cart is empty.
- **Modern UI**: Fully styled popup with responsive layout and clear visual hierarchy.

## How It Works

- The script creates a `div#shoppingCart-popup` and injects it into the page.
- It parses `.cart__row` elements to extract all product-related data.
- It provides a flexible `<table>` layout to list items and controls:
  - Quantity input with plus/minus buttons.
  - Trash icon to remove items.
- Uses the `/cart.js` endpoint to fetch live unit prices and update the UI accordingly.

## Technologies Used

- JavaScript (Vanilla)
- HTML (Dynamic DOM creation)
- CSS (injected styles)
- Shopify DOM elements and APIs

## Cart Item Details

Each item includes:
- Product image
- Title
- Size & color info
- Quantity controls (plus/minus)
- Live price calculation
- Remove button (trash icon)

## How to Test

1. Go to the [Insider demo cart page](https://insiderdemo.myshopify.com/cart).
2. Paste or inject this script into the browser console.
3. The cart popup appears at the bottom right with all current items.
4. Interact with the popup to test quantity adjustments, price updates, and item removal.

## Notes

- This is a client-side enhancement that does **not** rely on third-party libraries (except Font Awesome for icons).
- The checkout button is visible only if the cart contains at least one item.
- Price updates are formatted as USD (`$`), assuming Shopify's currency settings.

---

Created as part of an Insider frontend evaluation task.
