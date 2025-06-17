(function () {
    // Get product information from the DOM
    const productName = document.querySelector("h1")?.innerText || "Product Name Not Found";
    const price = document.querySelector(".product-single__price")?.innerText || "Price Unknown.";
    const originalPrice = document.querySelector(".product-single__price--compare")?.innerText || "";
    
    const image = document.querySelector(".product-single__photo img");
    const imageUrl = image?.getAttribute("data-zoom") || image?.src || "";

    const productTag = document.querySelector("#ProductSaleTag-product-template");
    const badge = productTag && !productTag.classList.contains("hide") ? productTag.querySelector(".product-tag")?.innerText : "";

    
    // Creating Pop-up div
    const popup = document.createElement("div");
    popup.id = "product-popup";
    popup.innerHTML = `
    <h3>${productName}<span id="closePopup" style="position: absolute; top: 10px; right: 15px; cursor: pointer;">&times;</span></h3>
    ${badge ? `<p class="product-badge">${badge}</p>` : ""}
    <div class="popup-content">
        <div class="popup-details">
        <p><strong>Price:</strong> 
            <span class="current-price">${price}</span>
            ${originalPrice ? `<span class="original-price">${originalPrice}</span>` : ""}
        </p>
        <p><strong>Size:</strong> <span id="popup-size">${"Select"}</span></p>
        <p><strong>Color:</strong> <span id="popup-color">${"Select"}</span></p>
        <p><strong>Quantity:</strong> <span id="popup-quantity">${"1"}</span></p>
        </div>
        <img src="${imageUrl}" alt="Product Image" class="popup-img"/>
    </div>
    <button id="popup-add-to-cart">ADD TO CART</button>
    `;
    // Adding PopUp to the page.
    document.body.appendChild(popup);

    //creating modal
    const modal = document.createElement("div");
    modal.id = "modal";
    modal.style = `display: none; position: fixed; z-index: 1000; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5);`
    modal.innerHTML = `
    <div style="background: white; padding: 20px; margin: 15% auto; width: 300px; position: relative; border-radius: 8px;">
    <span id="closeCustomModal" style="position: absolute; top: 10px; right: 15px; cursor: pointer;">&times;</span>
    <p>SOLD OUT</p>
  </div>
    `;
    document.body.appendChild(modal);


    // Defining the CSS styles.
    const style = document.createElement("style");
    style.innerHTML = `
        #product-popup {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 360px;
          background-color: white;
          border: 2px;
          border-radius: 7px;
          box-shadow: 0px 0px 7px 1px rgba(0, 0, 0, 0.2);
          padding: 13px;
          font-family: sans-serif;
          font-size: 14px;
          z-index: 9999;
          overflow: hidden;
        }

        #product-popup h3 {
          background-color: #051336;
          border-radius: 3px 3px 0 0;
          padding: 10px;
          margin: 0;
          color: #ffffff;
          font-size: 22px;
          font-family: "Unica One", sans-serif;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .product-badge {
          font-weight: 700;
          letter-spacing: .6px;
          text-transform: uppercase;
          display: ruby-text;
          font-size: .75em;
          background-color: #006eff;
          color: #fff;
          padding: 4px 10px;
          margin-top: 10px;
        }

        .popup-content {
          display: flex;
          flex-direction: row;
          padding: 16px;
          gap: 12px;
          align-items: flex-start;
          margin-top: -10px; /* Reduced the space between the badge and the content */
        }


        .popup-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .popup-details p {
          margin: 4px 0;
        }

        .popup-img {
          width: 120px;
          height: auto;
          border-radius: 3px;
          object-fit: cover;
        }

        #popup-add-to-cart {
          background-color: #006eff;
          color: #fff;
          padding: 10px;
          width: 100%;
          border: none;
          font-weight: bold;
          border-radius: 3px;
          cursor: pointer;
          letter-spacing: .15em;
          font-family: Karla, sans-serif;
          font-size: 15px;
        }

        #popup-add-to-cart:hover {
          background-color: #0055cc;
        }

        .original-price {
          text-decoration: line-through;
          color: #999;
          margin-right: 10px;
        }

        .current-price {
          font-weight: bold;
          font-size: large;
          color: #006eff;
        }
      `,

    // Adding Style to the page.
    document.body.appendChild(style);
    

    // Tracking size, color, and quantity changes.
    function updateSelected() {
        const newSize = document.querySelector("#SingleOptionSelector-0")?.value || "Select";  // Beden değişikliği
        const newColor = document.querySelector("#SingleOptionSelector-1")?.value || "Select";  // Renk değişikliği


        // Updating PopUp
        document.querySelector("#popup-size").innerText = newSize;
        document.querySelector("#popup-color").innerText = newColor;
    }

    // Common function to add event listeners for size and color
    function trackSelectionChanges(selector) {
      const element = document.querySelector(selector);
      if (element) {
          element.addEventListener("change", updateSelected);
      }
    }
    // Track size and color selection changes
    trackSelectionChanges("#SingleOptionSelector-0");
    trackSelectionChanges("#SingleOptionSelector-1");

    /*----------Repetitive code
    const selectSize = document.querySelector("#SingleOptionSelector-0");
    const selectColor = document.querySelector("#SingleOptionSelector-1");


    // Track size selection changes
    if (selectSize) {
        selectSize.addEventListener("change", updateSelected);
    }

    // Track color selection changes
    if (selectColor) {
        selectColor.addEventListener("change", updateSelected);
    }
    ----------*/

    // Update quantity
    function updateQuantity(change) {
        const popupQuantity = document.querySelector("#popup-quantity");
        const currentQuantity = Math.max(1, parseInt(popupQuantity.innerText, 10) + change); // Ensuring quantity doesn't go below 1
        popupQuantity.innerText = currentQuantity;
    }

    // Select the increase and decrease buttons.
    const increaseBtn = document.querySelector(".js-qty__adjust--plus");
    const decreaseBtn = document.querySelector(".js-qty__adjust--minus");

    // Common function to handle button clicks for increase and decrease
    function handleQuantityChange(button, changeValue) {
      if (button) {
          button.addEventListener("click", function() {
              updateQuantity(changeValue); // update the quantity by the changeValue (positive or negative)
          });
      }
    }

    // Handle increase and decrease button clicks
    handleQuantityChange(increaseBtn, 1);  // Increase the quantity
    handleQuantityChange(decreaseBtn, -1); // Decrease the quantity

    /*---------Repetitive code
    // Clicking the increase button.
    if (increaseBtn) {
        increaseBtn.addEventListener("click", function() {
            updateQuantity(1); // increease
        });
    }

    // Clicking the decrease button.
    if (decreaseBtn) {
        decreaseBtn.addEventListener("click", function() {
            updateQuantity(-1); // decrease
        });
    }

    --------*/

    // Add to Cart button click functionality.
    document.getElementById("popup-add-to-cart").addEventListener("click", function () {
      const addToCartButton = document.querySelector("form[action='/cart/add'] button[type='submit']:not([disabled])");
      if (addToCartButton) {
          console.log("buton var")
          addToCartButton.click();
          popup.remove();
      } else {
          console.log("buton yok")
          alert("There is no ADD TO CART button.");
          // Modal'ı göster
          modal.style.display = "block";
      }
    });

    // Modal'ı veya popup kapatma
    const closeCustomModal = document.getElementById("closeCustomModal");
    const closePopup = document.getElementById("closePopup");

    /*closePopup.addEventListener("click",()=>{
      popup.remove();
    })*/

    function closeSelection(button, onCloseAction) {
        if (!button) return;
        button.addEventListener("click", onCloseAction);
    }

    closeSelection(closeCustomModal, () => {
        modal.style.display = "none";
    });

    closeSelection(closePopup, () => {
        popup.remove();
    });

    /*// Modal'ı veya popup kapatma
    function closeSelection(close) {
      if (close == closeCustomModal) {
          close.addEventListener("click",function () {
          modal.style.display = "none";
          });
      }
      else{
          close.addEventListener("click",function () {
          popup.remove();
          })
      }
    }*/
    
    //closeSelection(closeCustomModal);
    //closeSelection(closePopup);


    // ---BONUS---
    // Update popUp image on thumbnail clicks.
    const thumbnails = document.querySelectorAll(".product-single__thumbnail");

    thumbnails.forEach(thumb => {
        thumb.addEventListener("click", function(e) {
            e.preventDefault();
            
            // New large image URL.
            const newImageUrl = thumb.getAttribute("data-zoom") || thumb.getAttribute("href");

            // Update the image in the pop-up.
            const popupImg = document.querySelector("#product-popup .popup-img");
            if (popupImg && newImageUrl) {
                popupImg.src = newImageUrl.startsWith("//") ? "https:" + newImageUrl : newImageUrl;
            }
        });
    });


    // Update the initial selections after the page loads.
    updateSelected();
})();