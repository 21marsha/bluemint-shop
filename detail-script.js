document.addEventListener("DOMContentLoaded", () => {

    const addToCartBtn = document.getElementById("add-to-cart-btn");
    const buyNowBtn = document.getElementById("buy-now-btn");
    const productData = document.getElementById("product-data");
    const sizeSelect = document.getElementById("pilih-ukuran");
    const qtyInput = document.getElementById("input-jumlah");

    function addToCart() {
        const cartItem = {
            id: productData.dataset.id,
            name: productData.dataset.name,
            price: parseInt(productData.dataset.price),
            image: productData.dataset.image,
            size: sizeSelect.value,
            quantity: parseInt(qtyInput.value)
        };

        let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

        const existingIndex = cart.findIndex(
            item => item.id === cartItem.id && item.size === cartItem.size
        );

        if (existingIndex !== -1) {
            cart[existingIndex].quantity += cartItem.quantity;
        } else {
            cart.push(cartItem);
        }

        localStorage.setItem("cartItems", JSON.stringify(cart));

        showMiniCart(cart);
    }

    function showMiniCart(cart) {
        const popup = document.getElementById("mini-cart-popup");
        const itemsContainer = document.getElementById("mini-cart-items");
        const totalDisplay = document.getElementById("mini-cart-total");

        itemsContainer.innerHTML = "";

        let total = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;

            const div = document.createElement("div");
            div.classList.add("mini-cart-item");

            div.innerHTML = `
                <img src="${item.image}" class="mini-cart-img">
                <div>
                    <p>${item.name}</p>
                    <p>Ukuran: ${item.size}</p>
                    <p>Qty: ${item.quantity}</p>
                    <p>Rp ${(item.price * item.quantity).toLocaleString()}</p>
                </div>
            `;
            itemsContainer.appendChild(div);
        });

        totalDisplay.innerText = "Rp " + total.toLocaleString();

        popup.classList.add("active");
    }

    addToCartBtn.addEventListener("click", (e) => {
        e.preventDefault();
        addToCart();
    });

    buyNowBtn.addEventListener("click", () => {
        const item = {
            id: productData.dataset.id,
            name: productData.dataset.name,
            price: parseInt(productData.dataset.price),
            image: productData.dataset.image,
            size: sizeSelect.value,
            quantity: parseInt(qtyInput.value)
        };

        sessionStorage.setItem("buyNowItem", JSON.stringify(item));

        window.location.href = "checkout.html";
    });

});
