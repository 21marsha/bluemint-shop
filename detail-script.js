document.addEventListener('DOMContentLoaded', () => {
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const buyNowBtn = document.getElementById('buy-now-btn');
    const inputJumlah = document.getElementById('input-jumlah');
    const pilihUkuran = document.getElementById('pilih-ukuran');
    const productDataElement = document.getElementById('product-data');
    const navMenu = document.querySelector('.nav-menu');
    const openBtn = document.getElementById('menu-open-button');
    const closeBtn = document.getElementById('menu-close-button');

    if (openBtn && navMenu) {
        openBtn.addEventListener('click', () => {
            navMenu.classList.add('active');
        });
    }

    if (closeBtn && navMenu) {
        closeBtn.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    }

    if (!productDataElement) {
        console.error("Elemen #product-data tidak ditemukan. Tombol tidak akan berfungsi.");
        return;
    }
    
    function getProductData() {
        const quantity = parseInt(inputJumlah ? inputJumlah.value : 1);
        
        return {
            id: productDataElement.dataset.id,
            name: productDataElement.dataset.name,
            price: productDataElement.dataset.price, 
            image: productDataElement.dataset.image,
            size: pilihUkuran ? pilihUkuran.value : 'Satu Ukuran',
            quantity: quantity,
        };
    }

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const product = getProductData();
            
            if (product.quantity < 1 || isNaN(product.quantity)) {
                alert("Jumlah produk tidak valid!");
                return;
            }
            
            if (typeof addToCart === 'function') {
                addToCart(product);
            }
        });
    }

    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            const product = getProductData();
            
            if (product.quantity < 1 || isNaN(product.quantity)) {
                alert("Jumlah produk tidak valid!");
                return;
            }
            
            if (typeof addToCart === 'function') {
                addToCart(product);
            }
            
            window.location.href = 'checkout.html'; 
        });
    }
});