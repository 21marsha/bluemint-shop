const SHIPPING_FEE = 15000;
function getCartItems() {
    const itemsJson = localStorage.getItem('shoppingCart');
    return itemsJson ? JSON.parse(itemsJson) : [];
}

function saveCartItems(items) {
    localStorage.setItem('shoppingCart', JSON.stringify(items));
}

function calculateTotal(items) {
    return items.reduce((total, item) => 
        total + (item.price * item.quantity), 0
    );
}

function formatRupiah(number) {
    if (isNaN(number)) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(number);
}

function addToCart(product) {
    let cart = getCartItems();
    
    product.price = parseFloat(product.price);
    
    const existingItemIndex = cart.findIndex(item => 
        item.id === product.id && item.size === product.size
    );

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += product.quantity;
    } else {
        cart.push(product);
    }
    
    saveCartItems(cart);
    
    displayMiniCart(product); 
}

function removeItem(index) {
    const itemIndex = parseInt(index); 
    
    if (isNaN(itemIndex)) {
        console.error('Index untuk removeItem tidak valid.');
        return;
    }

    let cart = getCartItems();
    cart.splice(itemIndex, 1); 
    saveCartItems(cart);
    displayCart(); 
}

function displayCart() {
    const cart = getCartItems();
    const container = document.getElementById('cart-items-container');
    const subtotalDisplay = document.getElementById('cart-total-price');
    const grandTotalDisplay = document.getElementById('cart-grand-total'); // ID Baru
    
    if (!container || !subtotalDisplay || !grandTotalDisplay) return;

    container.innerHTML = ''; 
    const subtotal = calculateTotal(cart);
    const grandTotal = subtotal + SHIPPING_FEE;

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align: center; margin: 50px 0;">Keranjang Anda masih kosong. Yuk, belanja!</p>';
        subtotalDisplay.textContent = formatRupiah(0);
        grandTotalDisplay.textContent = formatRupiah(SHIPPING_FEE); // Menampilkan biaya kirim saja
        return;
    }

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        // PENTING: Menggunakan ikon X (fas fa-times) dan class 'remove-btn'
        itemElement.innerHTML = `
            <div style="display: flex; gap: 20px; align-items: center; justify-content: space-between; border-bottom: 1px solid #eee; padding: 15px 0;">
                <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                <div class="item-details" style="flex-grow: 1;">
                    <h4 style="margin: 0; font-size: 1.1rem;">${item.name}</h4>
                    <p style="margin: 5px 0 0;">Ukuran: ${item.size} | Qty: ${item.quantity}</p>
                    <p style="margin: 0; font-weight: bold;">Subtotal: ${formatRupiah(item.price * item.quantity)}</p>
                </div>
                <button class="remove-btn" data-index="${index}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        container.appendChild(itemElement);
    });

    subtotalDisplay.textContent = formatRupiah(subtotal);
    grandTotalDisplay.textContent = formatRupiah(grandTotal);

    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
            removeItem(parseInt(this.dataset.index)); 
        });
    });
}

function handleCheckout() {
    if (getCartItems().length === 0) {
        console.log("Keranjang masih kosong, tidak bisa checkout!"); 
        return;
    }
    window.location.href = 'checkout.html'; 
}

function displayCheckoutSummary() {
    const cart = getCartItems();
    const listContainer = document.getElementById('checkout-items-list');
    const totalDisplay = document.getElementById('checkout-total-price');
    
    if (!listContainer || !totalDisplay) return; 
    
    listContainer.innerHTML = '';
    const subtotal = calculateTotal(cart);
    const grandTotal = subtotal + SHIPPING_FEE;
    
    if (cart.length === 0) {
        listContainer.innerHTML = '<p>Tidak ada item di keranjang.</p>';
        totalDisplay.textContent = formatRupiah(SHIPPING_FEE); 
        return;
    }
    
    cart.forEach(item => {
        const itemHtml = document.createElement('div');
        itemHtml.style.marginBottom = '10px';
        itemHtml.innerHTML = `
            <p style="margin: 0;"><strong>${item.name}</strong> x ${item.quantity} (${item.size})</p>
            <p style="margin: 0 0 0 15px; font-size: 0.9em; color: #555;">Subtotal: ${formatRupiah(item.price * item.quantity)}</p>
        `;
        listContainer.appendChild(itemHtml);
    });
    
    totalDisplay.textContent = formatRupiah(grandTotal); 
}

function handlePlaceOrder() {
    const shippingForm = document.getElementById('shipping-form');
    
    if (!shippingForm || !shippingForm.checkValidity()) {
        // Jika form tidak lengkap, tampilkan pesan error bawaan browser
        shippingForm ? shippingForm.reportValidity() : alert("Gagal menemukan form pengiriman.");
        return;
    }
    
    let cart = getCartItems();
    if (cart.length === 0) {
        alert("Keranjang kosong. Tidak ada yang bisa dibayar.");
        return;
    }

    const subtotal = calculateTotal(cart);
    const finalTotal = subtotal + SHIPPING_FEE;
    
    const selectedPayment = document.querySelector('input[name="paymentMethod"]:checked');
    const paymentType = selectedPayment ? selectedPayment.value : 'transfer'; 

    console.log(`Pesanan diproses: Total ${formatRupiah(finalTotal)}, Metode: ${paymentType}.`);

    localStorage.removeItem('shoppingCart'); 

    window.location.href = `order-success.html?total=${finalTotal}&method=${paymentType}`;
}


document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('cart-items-container')) {
        displayCart();
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', handleCheckout);
        }
    }

    if (document.getElementById('checkout-items-list')) {
        displayCheckoutSummary();
        const placeOrderBtn = document.getElementById('place-order-btn');
        if (placeOrderBtn) {
            placeOrderBtn.addEventListener('click', handlePlaceOrder);
        }
    }
});