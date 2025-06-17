# Insider Popup Task – Vanilla JavaScript Implementation

This project is a dynamic product popup designed for the [Insider demo Shopify product page](https://insiderdemo.myshopify.com/products/vans-sh-8-hi?variant=34820110680108). It provides an interactive user interface that displays product details in a customizable popup format and allows real-time interaction with product options.

##  Features

- **Dynamic Data Extraction**: Retrieves product name, current price, original price, badge, and image directly from the DOM.
- **Add to Cart Integration**: Triggers the native "Add to Cart" functionality. If the button is unavailable, shows a custom modal.
- **Live Thumbnail Switching**: Updates popup image when thumbnails are clicked.
- **Custom Styled Popup**: Modern popup design using pure JavaScript and dynamic CSS injection.
- **Real-time Option Tracking**: Tracks and updates selected size, color, and quantity values from the page.
- **Close Handlers**: Handles closing for both the popup and modal windows.

## How It Works

- Appends a popup element to the DOM containing product info, image, size, color, and quantity fields.
- Binds event listeners to Shopify's size/color selectors and quantity buttons.
- When the "Add to Cart" button inside the popup is clicked:
  - If the real store button is available, it triggers a click on it.
  - If unavailable (e.g., out of stock), it shows a "SOLD OUT" modal.

##  Technologies Used

- JavaScript (Vanilla)
- HTML (DOM manipulation)
- CSS (Injected via `<style>` tag)

## Demo Elements

| Element         | Description                          |
|----------------|--------------------------------------|
| Product Image   | Dynamically fetched & switchable     |
| Size & Color    | Real-time selected option tracking   |
| Quantity        | Linked to Shopify's native controls |
| Modal           | Custom fallback for "Add to Cart"    |

## Notes

- Works specifically on the Insider Shopify demo product page.
- Should be injected as a script on the page.
- Includes bonus functionality for image switching via thumbnails.

## How to Use

1. Copy and paste the entire IIFE (Immediately Invoked Function Expression) into the browser console or inject via script.
2. Navigate to the [demo product page](https://insiderdemo.myshopify.com/products/vans-sh-8-hi?variant=34820110680108).
3. Interact with the popup in real-time as product options change.

---

Created as part of an Insider frontend evaluation task.
