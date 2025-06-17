(function () {
    const popup = document.createElement("div");
    popup.id = "shoppingCart-popup";
    popup.innerHTML = `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <h2>SHOPPING CART</h2>
    <p id="cart-status"></p>
    <table id="productList"></table>
    <div id="cart-total" style="margin: 10px 0 30px 0;font-size:large;"></div>
    <div style="text-align:center; ">
      <a href="/checkout" id="checkout-button">Check Out</a>
    </div>
    `;

    const style = document.createElement("style");
    style.innerHTML = `
      #shoppingCart-popup {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 360px;
        background-color: white;
        border: 1px solid #ddd;
        border-radius: 7px;
        box-shadow: 0px 0px 7px 1px rgba(0, 0, 0, 0.2);
        padding: 13px;
        font-family: sans-serif;
        font-size: 14px;
        z-index: 9999;
        overflow-y: auto;
        max-height: 80vh;
      }
      #shoppingCart-popup h2{
        font-size: 22px;
        font-weight: light;
        font-family: "Unica One", sans-serif;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      table {
        width: 100%;
      }
      tr {
        border-bottom: 1px solid #eee;
        padding: 10px 0;
        
      }
      .popup-img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 5px;
        float: left;
        margin-right: 10px;
      }
      .product-row {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .popup-img {
        width: 60px;
        height: auto;
        object-fit: contain;
      }
      .popup-details {
        flex: 1;
        font-size: 14px;
        font-family: sans-serif;
      }
      .js-qty {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
}

.js-qty__input {
  width: 90px;
  height: 28px;
  text-align: center;
  font-size: 14px;
  padding: 2px;
  border: 1px solid #ccc;
  border-radius: 2px;
}

.js-qty__adjust {
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
}

.js-qty__adjust svg {
  width: 12px;
  height: 12px;
}


      .quantity-remove {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .remove-btn {
        background: transparent;
        border: none;
        cursor: pointer;
        font-size: 16px;
        color: #d00;
        padding: 0;
        margin-left: 10px;
      }
      #checkout-button{
        display: block;
        width: 100%;
        background-color: #000;
        color: #fff;
        padding: 10px;
        width: 100%;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        letter-spacing: .15em;
        font-family: Karla, sans-serif;
        font-size: 15px;
     }
     #checkout-button:hover{
        background-color: #ff6000f0;
     }`;

    document.body.appendChild(style);
    document.body.appendChild(popup);

    const products = document.querySelectorAll(".cart__row");
    const productList = document.getElementById("productList");

    const statusText = document.getElementById("cart-status");
    const totalDisplay = document.getElementById("cart-total");

    let total = 0;
    
    function parsePrice(text) {
      return parseFloat(text.replace(/[^0-9.]/g, '').replace(',', '')) || 0;
    }

    // Listeyi temizle
    productList.innerHTML = "";

    // Ürünleri filtrele
    const listedProducts = Array.from(products).filter(product => {
        return product.querySelector(".h5"); // Gerçek ürün satırları bu sınıfa sahip
    });

    if (listedProducts.length > 0) {
        listedProducts.forEach((product) => {
            const imageUrl = product.querySelector(".cart__image img")?.src || '';
            const productName = product.querySelector(".h5")?.innerText.trim() || 'Product';
            const sizeAndColor = product.querySelector("p")?.innerText.trim() || '';
            const quantity = product.querySelector(".js-qty__input")?.value || '1';
            const priceText = product.querySelector(".cart__cell--total")?.innerText.trim() || '0';
            const removeHref = product.querySelector('a[href*="/cart/change?"]')?.href || '#';

            
            
            const numericPrice = parsePrice(priceText);
            total += numericPrice;

            const tr = document.createElement("tr");
            tr.dataset.productName = productName; // DOM'dan kaldırmak için
            tr.innerHTML = `
            <td>
                <div class="product-row">
                    <img src="${imageUrl}" alt="Product Image" class="popup-img"/>
                    <div class="popup-details">
                    <h4 style="margin:0 0 5px 0;" data-name="${productName}">${productName}</h4>
                    <p style="margin:0;">${sizeAndColor}</p>
                    <div class="quantity-remove">

                    <div class="js-qty">
                    <input type="text" value="${quantity}" onchange="updateItemPrice(this.value, this)" id="popup-qty" name="updates[]" pattern="[0-9]*" data-line="1" class="js-qty__input" aria-live="polite">
                    <button type="button" class="js-qty__adjust js-qty__adjust--minus" aria-label="Reduce item quantity by one">
                      <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon--wide icon-minus" viewBox="0 0 22 3"><path fill="#000" d="M21.5.5v2H.5v-2z" fill-rule="evenodd"></path></svg>
                      <span class="icon__fallback-text">−</span>
                    </button>
                    <button type="button" class="js-qty__adjust js-qty__adjust--plus" aria-label="Increase item quantity by one">
                      <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-plus" viewBox="0 0 22 21"><path d="M12 11.5h9.5v-2H12V0h-2v9.5H.5v2H10V21h2v-9.5z" fill="#000" fill-rule="evenodd"></path></svg>
                      <span class="icon__fallback-text">+</span>
                    </button>
                  </div>
                  
                        <button class="remove-btn" data-href="${removeHref}" data-name="${productName}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                    <p style="margin:0;">Price: ${priceText}</p>
                    </div>
                </div>
            </td>
          `;
            productList.appendChild(tr);
        });
    }
    updateCartStatusAndTotal();

    //Remove butonlarına tıklama----sayfa yenileniyor
    /*
    popup.addEventListener("click", function (e) {
        const removeBtn = e.target.closest(".remove-btn");
        if (removeBtn) {
            const href = removeBtn.getAttribute("data-href");
            if (href && href !== "#") {
                window.location.href = href;
            } else {
                alert("Remove bağlantısı bulunamadı.");
            }
        }
    });
    */

    //Select Quantity
    document.addEventListener("click", function (e) {
      const isPlus = e.target.closest(".js-qty__adjust--plus");
      const isMinus = e.target.closest(".js-qty__adjust--minus");
    
      if (!isPlus && !isMinus) return;
    
      const qtyWrapper = e.target.closest(".js-qty");
      const input = qtyWrapper.querySelector(".js-qty__input");
    
      let value = parseInt(input.value, 10) || 0;
    
      if (isPlus) {
        value++;
      } else if (isMinus && value > 1) {
        value--;

      }
    
      input.value = value;
      updateItemPrice(input.value, input);
    });

    //Price update
    function updateItemPrice(newQuantity, input) {
    
      const tr = input.closest("tr");
      if (!tr) {
        console.error("TR bulunamadı!");
        return;
      }
    
      const productName = tr.dataset.productName;
    
      fetch('/cart.js')
        .then(response => response.json())
        .then(cart => {
          const product = cart.items.find(item => item.product_title === productName);
          if (!product) {
            console.error("Ürün bulunamadı!");
            return;
          }
    
          const unitPrice = product.price / 100;
          const newPrice = newQuantity * unitPrice;
    
          priceParagraph = tr.querySelector("p:last-of-type");
          priceParagraph.innerText = `Price: $${newPrice.toFixed(2)}`;
    
          recalculateTotal();
        });
    }
        
    function recalculateTotal() {
      let newTotal = 0;
      const priceElements = document.querySelectorAll("#productList p:last-of-type");
    
      priceElements.forEach(priceElement => {
        const price = parsePrice(priceElement.innerText);
        newTotal += price;
      });
    
      totalDisplay.innerHTML = `Total: <span style="font-weight:bolder; color:#ff6000f0;">${newTotal.toFixed(2)} $</span>`;
    }
    
    
    //Remove butonlarına tıklama----sayfa yenilenmeden güncellenir
    popup.addEventListener("click", async function (e) {
      const removeBtn = e.target.closest(".remove-btn");
    
      if (!removeBtn) return;                     //Eğer tıklanan şey .remove-btn değilse, fonksiyon boşuna devam etmesin.
    
      const href = removeBtn.dataset.href;
      const productName = removeBtn.dataset.name;
    
      if (href && href !== "#") {
        if (confirm("Are you sure you want to remove this item?")) {
          // fetch ve silme işlemleri burada yapılır
          try {                                     //try/catch, hem ağ hatalarını hem de kod içindeki diğer hataları daha net yakalar.
            const response = await fetch(href, {    //async/await daha temiz, okunabilir ve hata ayıklaması kolaydır.
              method: "GET",
              credentials: "same-origin"
            });
            
            //Bu kontrolle birlikte işlem erken sonlandırılır, aşağıdaki DOM işlemleri boşa yapılmaz.
            if (!response.ok) { 
              console.error("Ürün silinemedi. Sunucu hatası:", response.status);
              return;
            }
      
            // Popup içinden ürünü kaldır
            removeBtn.closest("tr")?.remove();
      
            // Ana sayfa sepetinden ürünü kaldır
            const allCartRows = document.querySelectorAll(".cart__row");
            allCartRows.forEach(row => {
              const name = row.querySelector(".h5")?.innerText.trim();
              if (name === productName) {
                row.remove();
              }
            });
      
            // Toplamı ve ürün sayısını güncelle
            updateCartStatusAndTotal();
      
          } catch (error) {
            console.error("İstek sırasında bir hata oluştu:", error);
          }
       }
        
      }
    });
    

    function updateCartStatusAndTotal() {
      const rows = productList.querySelectorAll("tr");
      let total = 0;
      rows.forEach(row => {
        const priceText = row.querySelector(".popup-details p:last-child")?.textContent || "";
        const price = parsePrice(priceText);
        total += price;
      });
    
      // ürün sayısı
      const count = rows.length;
      statusText.textContent = count > 1
        ? `There are ${count} products in your cart.`
        : count === 1
        ? `There is 1 product in your cart.`
        : `There are no products in your cart.`;
    
        const checkoutButton = document.getElementById("checkout-button");

        if (total === 0) {
          checkoutButton.style.display = "none";
          totalDisplay.style.display = "none";
        } else {
          checkoutButton.style.display = "block";
          totalDisplay.style.display = "block";
          totalDisplay.innerHTML = `Total: <span style="font-weight:bolder; color:#ff6000f0;">${total.toFixed(2)} $</span>`;
        }

        const subtotalElement = document.querySelector("#CartSubtotal");
        if (subtotalElement) {
          subtotalElement.innerText = `${total.toFixed(2)} $`;
        }
    }
})();
