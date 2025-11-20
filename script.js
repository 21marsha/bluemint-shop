// ==========================================================
// 1. LOGIKA MENU NAVIGASI 
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
    // Ambil elemen-elemen navbar
    const navMenu = document.querySelector('.nav-menu');
    const openBtn = document.getElementById('menu-open-button'); 
    const closeBtn = document.getElementById('menu-close-button'); 

    if (openBtn && closeBtn && navMenu) {

        openBtn.addEventListener('click', () => {
            navMenu.classList.add('active');
        });

        closeBtn.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                }
            });
        });
    }


    // ==========================================================
    // 2. LOGIKA DETAIL PRODUK 
    // ==========================================================
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    const buyNowBtn = document.getElementById('buy-now-btn');
    const inputJumlah = document.getElementById('input-jumlah');
    const pilihUkuran = document.getElementById('pilih-ukuran');
    const productIdElement = document.getElementById('product-data'); 

    if (productIdElement) {
        const productName = productIdElement.dataset.name || 'Produk Tidak Dikenal';
        
        function handleAddToCart() {
            const quantity = parseInt(inputJumlah.value);
            const size = pilihUkuran ? pilihUkuran.value : 'Satu Ukuran';

            if (quantity < 1 || isNaN(quantity)) {
                alert("Jumlah produk tidak valid!");
                return;
            }

            alert(`Berhasil! ${quantity}x ${productName} (Ukuran ${size}) ditambahkan ke keranjang.`);
            console.log(`Produk: ${productName}, Ukuran: ${size}, Kuantitas: ${quantity} ditambahkan ke keranjang.`);
        }

        function handleBuyNow() {
            const quantity = parseInt(inputJumlah.value);
            const size = pilihUkuran ? pilihUkuran.value : 'Satu Ukuran';
            
            if (quantity < 1 || isNaN(quantity)) {
                alert("Jumlah produk tidak valid!");
                return;
            }

            alert(`Anda akan diarahkan ke halaman pembayaran untuk ${quantity}x ${productName} (Ukuran ${size}).`);
            console.log(`Melanjutkan ke checkout: ${productName}, Ukuran: ${size}, Kuantitas: ${quantity}`);
        }

        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', handleAddToCart);
        }

        if (buyNowBtn) {
            buyNowBtn.addEventListener('click', handleBuyNow);
        }
    }
});