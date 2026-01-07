// --- DATA ---
// Removed textColor, reverted to standard white (handled in CSS)
const HERO_SLIDES = [
    {
        id: 1, type: 'image',
        src: './assets/shop_image/top_banner/shop_banner1.gif',
        title: "Essential<br><em>Elegance</em>", 
        subtitle: "WINTER / SPRING 2025", 
        btnText: "Discover",
        targetId: "cat_1",
        align: "center"
    },
    {
        id: 2, type: 'image',
        src: './assets/shop_image/top_banner/shop_banner2.webp',
        title: "The Art of<br><em>Layering</em>", 
        subtitle: "MODERN SILHOUETTE", 
        btnText: "View Collection",
        targetId: "cat_2",
        align: "left-compact"
    },
    {
        id: 3, type: 'image',
        src: './assets/shop_image/top_banner/shop_banner3.webp',
        title: "Urban<br><em>Movement</em>", 
        subtitle: "NEW YORK CITY WALKERS", 
        btnText: "Shop Now",
        targetId: "cat_3",
        align: "left-compact"
    },
    {
        id: 4, type: 'image',
        src: './assets/shop_image/top_banner/shop_banner4.avif',
        title: "Modern<br><em>Classics</em>",
        subtitle: "OFFICE ESSENTIALS",
        btnText: "Shop Office",
        targetId: "cat_3",
        align: "left-compact"
    }
];

let ALL_PRODUCTS = [
    { id: 1, name: "Áo 1", price: 99000, originalPrice: 999000, image: "./assets/shop_image/products/row1/ao_MU.avif", tag: "Quý ông PHẢI CÓ",category: "Outerwear" },
    { id: 2, name: "Áo 2", price: 399000, originalPrice: 599000, image: "./assets/shop_image/products/row1/ao2.avif", tag: "OOia", category: "Knitwear" },
    { id: 3, name: "Áo 3", price: 399000, originalPrice: 599000, image: "./assets/shop_image/products/row1/ao3.avif", tag: "OOia", category: "Bottoms" },
    { id: 4, name: "Áo 4", price: 499000, image: "./assets/shop_image/products/row1/ao4.webp", tag: "OOia", category: "Shirts" },
    { id: 5, name: "Áo 5", price: 399000, originalPrice: 999000, image: "./assets/shop_image/products/row2/ao14.avif", tag: "OOia",category: "T-Shirts" },
    { id: 6, name: "Áo 6", price: 980000, originalPrice: 999000, image: "./assets/shop_image/products/row2/ao12.avif", tag: "OOia", category: "Jeans" },
    { id: 7, name: "Áo 36", price: 666666, originalPrice: 3600000, image: "./assets/shop_image/products/row2/ao_JU.jpg",tag: "Vô địch tầm giá", category: "Outerwear" },
    { id: 8, name: "Áo 7", price: 299000,  originalPrice: 499000, image: "./assets/shop_image/products/row2/ao13.avif", tag: "OOia", category: "Accessories" },
    { id: 9, name: "Áo 8", price: 599000,  originalPrice: 699000, image: "./assets/shop_image/products/row3/ao8.avif",tag: "OOia", category: "Outerwear" },
    { id: 10, name: "Quarter zip", price: 10000,  originalPrice: 1000000, image: "./assets/shop_image/products/row3/ao9.avif", tag: "Matcha boy", category: "Skirts" },
    { id: 11, name: "Áo 9", price: 699000,  originalPrice: 700000, image: "./assets/shop_image/products/row3/ao10.avif", tag: "OOia",  category: "Outerwear" },
    { id: 12, name: "Tê con 6 sao", price: 1800000, originalPrice: 3600000,image: "./assets/shop_image/products/row3/T1.png", tag: "Tê Oăn", category: "Accessories" }
];

let CATEGORY_SECTIONS = [
    {
        id: "cat_1", title: "Outerwear",
        description: "Bảo vệ bạn khỏi các yếu tố thời tiết nhưng vẫn giữ được vẻ thanh lịch. Các thiết kế áo khoác của chúng tôi tập trung vào phom dáng kiến trúc và chất liệu bền vững.",
        bannerImage: "./assets/shop_image/base_banner/base_banner1.webp",
        products: ALL_PRODUCTS.slice(0, 4)
    },
    {
        id: "cat_2", title: "Casual",
        description: "Sự sang trọng thầm lặng cho ngày thường. Chất liệu cotton Ai Cập và Linen thoáng khí mang lại cảm giác nhẹ nhàng tựa như không.",
        bannerImage: "./assets/shop_image/base_banner/base_banner2.jpg",
        products: ALL_PRODUCTS.slice(4, 8)
    },
    {
        id: "cat_3", title: "Office",
        description: "Định nghĩa lại trang phục công sở hiện đại. Những đường cắt sắc sảo, tối giản chi tiết thừa để tôn vinh sự chuyên nghiệp.",
        bannerImage: "./assets/shop_image/base_banner/base_banner3.jpg",
        products: ALL_PRODUCTS.slice(8, 12)
    }
];

// --- STATE ---
let currentState = {
    slideIndex: 0,
    // Cập nhật: Lấy user từ localStorage với key 'matmat_user' của BackEnd
    user: JSON.parse(localStorage.getItem('matmat_user')) || null, 
    cart: JSON.parse(localStorage.getItem('matmat_cart')) || [],
    wishlist: JSON.parse(localStorage.getItem('matmat_wishlist')) || [],
    selectedProductForCart: null
};

// --- CẬP NHẬT NAVBAR ---
function updateNavbar() {
    const wBadge = document.getElementById('wishlist-badge');
    const cBadge = document.getElementById('cart-badge');
    const uBtn = document.getElementById('user-btn');

    if(currentState.wishlist.length > 0) { 
        wBadge.innerText = currentState.wishlist.length; 
        wBadge.classList.remove('hidden'); 
    } else {
        wBadge.classList.add('hidden');
    }

    if(currentState.cart.length > 0) { 
        cBadge.innerText = currentState.cart.length; 
        cBadge.classList.remove('hidden'); 
    } else {
        cBadge.classList.add('hidden');
    }

    // Hiển thị tên user nếu đã đăng nhập
    if (currentState.user) {
        uBtn.innerText = currentState.user.email.split('@')[0].toUpperCase();
    } else {
        uBtn.innerText = 'LOGIN';
    }
}

// --- LOGIC ĐIỀU HƯỚNG LOGIN/LOGOUT ---
// Hàm này xử lý khi click vào nút LOGIN trên Header
function handleUserBtnClick() {
    if (currentState.user) {
        // Nếu đã đăng nhập, mở modal để xác nhận đăng xuất
        openModal('LOGOUT_CONFIRM');
    } else {
        // Nếu chưa đăng nhập, chuyển hướng sang trang login.html
        window.location.href = 'login.html';
    }
}

function handleLogout() {
    currentState.user = null;
    localStorage.removeItem('matmat_user'); // Xóa session
    showToast('Đã đăng xuất!');
    updateNavbar();
    closeModal();
}

// --- INIT ---
document.addEventListener('DOMContentLoaded', async () => {
    renderHero();
    renderCategories();
    updateNavbar();
    await fetchProducts(); 
    
});

async function fetchProducts() {
    try {
        // 1. Gọi API Categories
        const catRes = await fetch('/api/categories');
        const categories = await catRes.json();

        // 2. Gọi API Products
        const prodRes = await fetch('/api/products');
        let rawProducts = await prodRes.json(); 

        // 3. Map dữ liệu
        ALL_PRODUCTS = rawProducts.map(p => {
            // Tìm xem cột ảnh trong DB tên là gì (thử các trường hợp phổ biến)
            let dbImage = p.image || p.image_url || p.img || p.thumbnail || "";

            return {
                ...p, 
                id: p.id,
                name: p.name,
                // Map lại giá gốc để hiện màu đỏ
                price: Number(p.price),
                originalPrice: p.original_price ? Number(p.original_price) : null, 
                // Map lại category
                category: p.category_name,
                // Gán cột ảnh từ DB vào biến 'image' chuẩn của web
                image: dbImage 
            };
        });

        // 4. Chia sản phẩm vào các Section 
        CATEGORY_SECTIONS = categories.map(cat => ({
            id: `cat_${cat.id}`,
            title: cat.name,
            description: cat.description,
            bannerImage: cat.banner_image,
            products: ALL_PRODUCTS.filter(p => p.category_id === cat.id).slice(0, 4)
        }));

        renderCategories(); 
    } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
    }
}

// --- RENDER FUNCTIONS ---
function renderHero() {
    const container = document.getElementById('hero-slides');
    const indicators = document.getElementById('hero-indicators');
    
    container.innerHTML = HERO_SLIDES.map((slide, idx) => `
        <div class="hero-slide ${idx === 0 ? 'active' : ''}" id="slide-${idx}">
            <div class="hero-media" style="background-image: url('${slide.src}'); background-size: cover; background-position: center;"></div>
            <div class="hero-overlay"></div>
            <div class="hero-content ${slide.align === 'left-compact' ? 'align-left-compact' : 'align-center'}">
                <div class="hero-text">
                    <p>${slide.subtitle}</p>
                    <h2>${slide.title}</h2>
                    <button onclick="document.getElementById('${slide.targetId}').scrollIntoView({behavior:'smooth'})" class="hero-btn">
                        ${slide.btnText}
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    indicators.innerHTML = HERO_SLIDES.map((_, idx) => `
        <div onclick="goToSlide(${idx})" class="indicator ${idx === 0 ? 'active' : ''}" id="indicator-${idx}"></div>
    `).join('');
}

function renderCategories() {
    const main = document.getElementById('main-content');
    main.innerHTML = CATEGORY_SECTIONS.map(section => `
        <section id="${section.id}" class="category-section">
            <div class="container">
                <div class="section-header">
                    <h3>${section.title}</h3>
                    <div class="divider"></div>
                </div>
                
                <!-- Big Banner Layout: Banner on top, then Desc + Products -->
                <div class="cat-content">
                    <div class="banner-img-wrap">
                        <img src="${section.bannerImage}" class="banner-img" alt="${section.title}">
                    </div>

                    <div class="cat-desc">
                        <p>${section.description}</p>
                        <button class="outline-btn">View All</button>
                    </div>

                    <div class="product-grid" id="products-${section.id}">
                        ${section.products.map(p => renderProductCard(p)).join('')}
                    </div>
                </div>
            </div>
        </section>
    `).join('');
}

function renderProductCard(product) {
    const isLiked = currentState.wishlist.includes(product.id);
    // Added ID to the wrapper div to allow scrolling to it
    return `
        <div class="product-card" id="p-card-${product.id}">
            <div class="p-img-box">
                <img src="${product.image_url}" class="p-img" alt="${product.name}">
                ${product.tag ? `<span class="p-tag">${product.tag}</span>` : ''}
                <button onclick="initAddToCart(${product.id})" class="add-cart-btn">Add to Cart</button>
            </div>
            <div class="p-info">
                <div style="flex:1">
                    <h4 class="p-name">${product.name}</h4>
                    <div>
                        <span class="p-price ${product.originalPrice ? 'text-red' : ''}">${product.price.toLocaleString()} ₫</span>
                        ${product.originalPrice ? `<span class="p-price-old">${product.originalPrice.toLocaleString()} ₫</span>` : ''}
                    </div>
                </div>
                <button onclick="toggleWishlist(${product.id})" class="like-btn ${isLiked ? 'liked' : ''}" id="like-btn-${product.id}">
                    <i class="fa-${isLiked ? 'solid' : 'regular'} fa-heart"></i>
                </button>
            </div>
        </div>
    `;
}

// --- LOGIC: SLIDER ---
function changeSlide(direction) {
    let nextIndex = (currentState.slideIndex + direction + HERO_SLIDES.length) % HERO_SLIDES.length;
    goToSlide(nextIndex);
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if(slides[currentState.slideIndex]) {
        slides[currentState.slideIndex].classList.remove('active');
        indicators[currentState.slideIndex].classList.remove('active');
    }

    currentState.slideIndex = index;
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
}

// --- LOGIC: ACTIONS ---
function updateNavbar() {
    const wBadge = document.getElementById('wishlist-badge');
    const cBadge = document.getElementById('cart-badge');
    const uBtn = document.getElementById('user-btn');

    if(currentState.wishlist.length > 0) { 
        wBadge.innerText = currentState.wishlist.length; 
        wBadge.classList.remove('hidden'); 
    } else {
        wBadge.classList.add('hidden');
    }

    if(currentState.cart.length > 0) { 
        cBadge.innerText = currentState.cart.length; 
        cBadge.classList.remove('hidden'); 
    } else {
        cBadge.classList.add('hidden');
    }

    uBtn.innerText = currentState.user ? currentState.user : 'LOGIN';
}

function toggleWishlist(id) {
    const idx = currentState.wishlist.indexOf(id);
    if(idx === -1) {
        currentState.wishlist.push(id);
        showToast('Added to Wishlist');
    } else {
        currentState.wishlist.splice(idx, 1);
        showToast('Removed from Wishlist');
    }
    localStorage.setItem('matmat_wishlist', JSON.stringify(currentState.wishlist));
    updateNavbar();
    
    // Update UI icons without re-rendering everything
    const btns = document.querySelectorAll(`#like-btn-${id}`);
    btns.forEach(btn => {
        const isLiked = currentState.wishlist.includes(id);
        btn.innerHTML = `<i class="fa-${isLiked ? 'solid' : 'regular'} fa-heart"></i>`;
        if(isLiked) btn.classList.add('liked');
        else btn.classList.remove('liked');
    });
    
    if(document.getElementById('wishlist-content-list')) renderWishlistModal();
}

function initAddToCart(id) {
    const product = ALL_PRODUCTS.find(p => p.id === id);
    currentState.selectedProductForCart = product;
    openModal('SIZE_SELECTION');
}

async function confirmAddToCart(size) {
    if(!currentState.selectedProductForCart) return;
    const priceAsNumber = Number(currentState.selectedProductForCart.price);
    
// --- LOGIC MỚI: CHECK USER ---
    if (currentState.user) {
        // A. ĐÃ ĐĂNG NHẬP -> GỌI API
        try {
            await fetch('/api/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: currentState.user.id,
                    product_id: product.id,
                    size: size,
                    quantity: 1
                })
            });
            // Sau khi thêm DB thành công, cần tải lại giỏ hàng mới nhất từ DB
            await syncCartFromDB(); 
        } catch (err) {
            console.error(err);
        }
    } else {
        // B. CHƯA ĐĂNG NHẬP -> DÙNG LOCAL STORAGE (Code cũ của bạn)
        const item = { ...product, size, quantity: 1 };
        currentState.cart.push(item);
        localStorage.setItem('matmat_cart', JSON.stringify(currentState.cart));
    }

    showToast(`Added to Cart`);
    updateNavbar();
    closeModal();
}
function removeFromCart(index) {
    currentState.cart.splice(index, 1);
    localStorage.setItem('matmat_cart', JSON.stringify(currentState.cart));
    showToast('Item removed from bag');
    updateNavbar();
    openModal('CART'); // Re-render modal to show updated list
}

function toggleSizeGuide() {
    const guide = document.getElementById('size-guide');
    if(guide) guide.classList.toggle('hidden');
}

// --- LOGIC: SEARCH & NAVIGATION ---

// New function to handle navigation to a product from search
function navigateToProduct(id) {
    closeModal();
    const element = document.getElementById(`p-card-${id}`);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Optional: Add a visual cue class momentarily
        element.classList.add('highlight-product');
        setTimeout(() => element.classList.remove('highlight-product'), 2000);
    }
}

function performSearch(query) {
    const container = document.getElementById('search-results');
    if (!query) {
        container.innerHTML = '<p style="color:#999; text-align:center;">Start typing to search...</p>';
        return;
    }
    const lowerQuery = query.toLowerCase();
    const results = ALL_PRODUCTS.filter(p => p.name.toLowerCase().includes(lowerQuery));

    if (results.length === 0) {
        container.innerHTML = '<p style="color:#999; text-align:center;">No products found.</p>';
    } else {
        container.innerHTML = results.map(p => `
            <div class="search-result-item" onclick="navigateToProduct(${p.id})">
                <img src="${p.image}" class="search-result-img">
                <div>
                    <h4 style="font-family: var(--font-serif); font-size: 1rem;">${p.name}</h4>
                    <p style="font-size: 0.8rem; color: #666;">${p.category}</p>
                    <div>
                        <span class="${p.originalPrice ? 'text-red' : ''}" style="font-weight: 600;">${p.price.toLocaleString()} ₫</span>
                        ${p.originalPrice ? `<span style="text-decoration: line-through; color:#999; font-size:0.8rem; margin-left:5px;">${p.originalPrice.toLocaleString()} ₫</span>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function subscribeNewsletter() {
    const emailInput = document.getElementById('cs-email');
    const email = emailInput.value.trim(); //Xóa khoảng trắng thừa

    // Kiểm tra rỗng
    if (!email) {
        showToast('Vui lòng nhập địa chỉ Email!');
        emailInput.focus();
        return;
    }

    // Kiểm tra định dạng Email
    if (!isValidEmail(email)) {
        showToast('Email không hợp lệ! (Ví dụ: abc@gmail.com)');
        emailInput.focus();
        return;
    }

    //Thành công
    showToast('Cảm ơn bạn đã đăng ký!');
    emailInput.value = '';
}


// --- LOGIC: MODALS ---
function openModal(type) {
    const overlay = document.getElementById('modal-overlay');
    const body = document.getElementById('modal-body');
    body.innerHTML = ''; 

    overlay.classList.remove('hidden');

    // 1. LOGIN
    if(type === 'LOGIN') {
        if(currentState.user) {
            // Đã đăng nhập
            const displayName = currentState.user.name || currentState.user.email || 'User';
            body.innerHTML = `
                <div class="modal-body-content">
                    <h2 class="modal-title">Tài khoản</h2>
                    <div style="text-align: center; padding: 2rem 0;">
                        <p style="margin-bottom: 2rem; font-size: 1.2rem;">
                            Xin chào, <strong>${displayName}</strong>
                        </p>
                        <button onclick="logout()" class="modal-btn">Đăng xuất</button>
                    </div>
                </div>`;
        } else {
            // Chưa đăng nhập
            body.innerHTML = `
                <div class="modal-body-content">
                    <button onclick="closeModal()" class="close-modal-btn"><i class="fa-solid fa-xmark"></i></button>
                    <h2 class="modal-title">Đăng Nhập</h2>
                    <div class="auth-form" style="padding: 0 1rem;">
                        <input type="text" id="login-username" placeholder="Email của bạn" class="input-field">
                        <input type="password" id="login-password" placeholder="Mật khẩu" class="input-field">
                        <p id="auth-error" class="error-msg"></p>
                        <button onclick="handleLogin()" class="modal-btn">Đăng Nhập</button>
                        <p style="text-align: center; margin-top: 1rem; font-size: 0.8rem; color: #666;">
                            Chưa có tài khoản? 
                            <a href="#" onclick="openModal('REGISTER')" style="text-decoration: underline; color: #000; font-weight: 600;">Đăng ký ngay</a>
                        </p>
                    </div>
                </div>`;
        }
    }
    // 2. REGISTER
    else if (type === 'REGISTER') {
        body.innerHTML = `
            <div class="modal-body-content">
                <button onclick="closeModal()" class="close-modal-btn"><i class="fa-solid fa-xmark"></i></button>
                <h2 class="modal-title">Đăng Ký</h2>
                <div class="auth-form" style="padding: 0 1rem;">
                    <input type="text" id="reg-username" placeholder="Tên hiển thị (VD: Tuan Anh)" class="input-field">
                    <input type="email" id="reg-email" placeholder="Email (VD: abc@gmail.com)" class="input-field">
                    <input type="password" id="reg-password" placeholder="Mật khẩu" class="input-field">
                    <p id="auth-error" class="error-msg"></p>
                    <button onclick="handleRegister()" class="modal-btn">Tạo Tài Khoản</button>
                    <p style="text-align: center; margin-top: 1rem; font-size: 0.8rem; color: #666;">
                        Đã có tài khoản? 
                        <a href="#" onclick="openModal('LOGIN')" style="text-decoration: underline; color: #000; font-weight: 600;">Đăng nhập</a>
                    </p>
                </div>
            </div>`;
    }
    // 3. SEARCH 
    else if (type === 'SEARCH') {
        body.innerHTML = `
            <div class="modal-body-content">
                <button onclick="closeModal()" class="close-modal-btn"><i class="fa-solid fa-xmark"></i></button>
                <h2 class="modal-title">Search</h2>
                <div class="search-input-container">
                    <input type="text" placeholder="Type to search..." class="search-input" oninput="performSearch(this.value)" autofocus>
                </div>
                <div id="search-results" class="search-results-grid">
                    <p style="color:#999; text-align:center;">Type to search for products...</p>
                </div>
            </div>
        `;
        // Autofocus input
        setTimeout(() => {
            const input = document.querySelector('.search-input');
            if(input) input.focus();
        }, 100);
    } 
    // 4. CART
    else if (type === 'CART') {
        const total = currentState.cart.reduce((sum, item) => sum + item.price, 0);
        body.innerHTML = `
            <div style="display: flex; flex-direction: column; height: 100%;">
                <div class="modal-header-cart">
                    <h2 class="modal-title">Shopping Bag</h2>
                    <span class="modal-subtitle">${currentState.cart.length} ITEMS</span>
                    <button onclick="closeModal()" class="close-modal-btn light"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div style="flex:1; overflow-y: auto; padding: 2rem;">
                    ${currentState.cart.length === 0 ? '<p style="color:#999; margin-top: 20px;">Your bag is empty.</p>' : currentState.cart.map((item, index) => `
                        <div class="modal-p-item">
                            <img src="${item.image}" class="modal-p-img">
                            <div style="flex:1">
                                <h4 style="font-family: var(--font-serif); font-size: 1rem;">${item.name}</h4>
                                <p style="font-size: 0.8rem; color: #666; margin: 5px 0;">Size: ${item.size}</p>
                                <div>
                                    <span style="font-weight: 600;" class="${item.originalPrice ? 'text-red' : ''}">${item.price.toLocaleString()} ₫</span>
                                </div>
                                <button onclick="removeFromCart(${index})" class="remove-item-btn">Remove</button>
                            </div>
                        </div>`).join('')}
                </div>
                <div style="padding: 2rem; border-top: 1px solid #eee;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 1.5rem; font-size: 1.1rem;">
                        <span>Total</span>
                        <span style="font-weight: 600;">${total.toLocaleString()} ₫</span>
                    </div>
                    <button onclick="openModal('CHECKOUT')" class="modal-btn">PROCEED TO CHECKOUT</button>
                </div>
            </div>`;
    } 
    // 5. CHECKOUT
    else if (type === 'CHECKOUT') {
        if(currentState.cart.length === 0) {
            showToast('Giỏ hàng của bạn đang trống.');
            return openModal('CART');
        }
        const total = currentState.cart.reduce((sum, item) => sum + item.price, 0);
        
        body.innerHTML = `
            <div style="display: flex; flex-direction: column; height: 100%;">
                <div class="modal-header-cart">
                    <h2 class="modal-title">Thanh Toán</h2>
                    <span class="modal-subtitle">BẢO MẬT & AN TOÀN</span>
                    <button onclick="closeModal()" class="close-modal-btn light"><i class="fa-solid fa-xmark"></i></button>
                </div>
                
                <div class="modal-body-content" style="flex:1; overflow-y: auto; background: #fff;">
                    <div class="checkout-grid">
                        <div>
                            <h4 style="font-family: var(--font-serif); margin-bottom: 1rem; border-bottom: 2px solid #000; padding-bottom: 0.5rem;">1. Thông tin giao hàng</h4>
                            <div class="cx-form-group">
                                <label class="cx-label">Họ và tên</label>
                                <input type="text" id="cx-name" class="input-field" value="${currentState.user ? (currentState.user.name || '') : ''}" placeholder="Nhập họ tên người nhận">
                            </div>
                            <div class="cx-form-group">
                                <label class="cx-label">Số điện thoại</label>
                                <input type="text" id="cx-phone" class="input-field" placeholder="Ví dụ: 0912345678">
                            </div>
                            <div class="cx-form-group">
                                <label class="cx-label">Địa chỉ nhận hàng</label>
                                <input type="text" id="cx-address" class="input-field" placeholder="Số nhà, đường, phường/xã...">
                            </div>

                            <h4 style="font-family: var(--font-serif); margin-top: 2rem; margin-bottom: 1rem; border-bottom: 2px solid #000; padding-bottom: 0.5rem;">2. Phương thức thanh toán</h4>
                            <div class="payment-methods">
                                <div class="payment-option active" onclick="selectPayment('cod', this)">
                                    <i class="fa-solid fa-truck-fast"></i> Thanh toán khi nhận hàng (COD)
                                </div>
                                <div class="payment-option" onclick="selectPayment('zalopay', this)">
                                    <i class="fa-solid fa-qrcode"></i> Ví ZaloPay / QR Code
                                </div>
                            </div>

                            <div id="payment-info-area">
                                <div id="info-cod" class="payment-details show">
                                    <p style="font-size: 0.9rem; color: #666;">Bạn sẽ thanh toán bằng tiền mặt cho shipper khi nhận hàng.</p>
                                </div>
                                <div id="info-zalopay" class="payment-details">
                                    <p style="font-size: 0.9rem;">Mở ứng dụng ZaloPay và quét mã:</p>
                                    <div class="qr-wrapper">
                                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=DemoZaloPay" class="qr-img"> 
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div class="order-summary-box">
                                <h4 style="font-family: var(--font-serif); margin-bottom: 1rem;">Đơn hàng của bạn</h4>
                                <div style="max-height: 200px; overflow-y: auto; margin-bottom: 1rem;">
                                    ${currentState.cart.map(item => `
                                        <div class="summary-row">
                                            <span>${item.name} (${item.size})</span>
                                            <span>${item.price.toLocaleString()} ₫</span>
                                        </div>`).join('')}
                                </div>
                                <div class="summary-row total">
                                    <span>TỔNG CỘNG</span>
                                    <span>${total.toLocaleString()} ₫</span>
                                </div>
                                <button onclick="processOrder()" class="modal-btn" style="margin-top: 1.5rem;">ĐẶT HÀNG NGAY</button>
                                <button onclick="openModal('CART')" class="back-cart-btn">Quay lại giỏ hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
    } 
    // 6. WISHLIST
    else if (type === 'WISHLIST') {
        renderWishlistModal();
    } 
    // 7. SIZE SELECTION
    else if (type === 'SIZE_SELECTION') {
        const p = currentState.selectedProductForCart;
        if(!p) return;
        body.innerHTML = `
            <div class="modal-body-content">
                <button onclick="closeModal()" class="close-modal-btn"><i class="fa-solid fa-xmark"></i></button>
                <h2 class="modal-title">Select Size</h2>
                <div style="display: flex; gap: 1.5rem; margin-bottom: 2rem;">
                    <img src="${p.image}" style="width: 6rem; height: 8rem; object-fit: cover;">
                    <div>
                        <h4 style="font-family: var(--font-serif); font-size: 1.2rem; margin-bottom: 0.5rem;">${p.name}</h4>
                        <span style="font-weight: 600; font-size: 1rem;">${p.price.toLocaleString()} ₫</span>
                    </div>
                </div>
                <div style="display: flex; gap: 10px; margin-bottom: 1rem;">
                    ${['S','M','L','XL'].map(s => `<button onclick="selectSize(this, '${s}')" class="size-btn">${s}</button>`).join('')}
                </div>
                <div style="margin-bottom: 2rem;">
                    <button onclick="toggleSizeGuide()" class="guide-btn"><i class="fa-solid fa-ruler-horizontal"></i> Size Guide</button>
                    <div id="size-guide" class="size-table-wrap hidden">
                        <table class="size-table">
                            <thead><tr><th>Size</th><th>Height (cm)</th><th>Weight (kg)</th></tr></thead>
                            <tbody>
                                <tr><td>S</td><td>150-160</td><td>45-55</td></tr>
                                <tr><td>M</td><td>160-170</td><td>55-65</td></tr>
                                <tr><td>L</td><td>170-175</td><td>65-75</td></tr>
                                <tr><td>XL</td><td>175-180</td><td>75-85</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <button id="add-btn" disabled onclick="confirmAddToCart(this.dataset.size)" class="modal-btn">Add to Bag</button>
            </div>`;
    }
}

function renderWishlistModal() {
    const body = document.getElementById('modal-body');
    const items = ALL_PRODUCTS.filter(p => currentState.wishlist.includes(p.id));
    // Wishlist Layout: Light Header
    body.innerHTML = `
        <div id="wishlist-content-list" style="display: flex; flex-direction: column; height: 100%;">
            <div class="modal-header-wishlist">
                <h2 class="modal-title">Wishlist</h2>
                <span class="modal-subtitle">${items.length} SAVED</span>
                <button onclick="closeModal()" class="close-modal-btn"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div style="flex:1; overflow-y: auto; padding: 2rem;">
                ${items.length === 0 ? '<p style="color:#999;">No items saved.</p>' : items.map(item => `
                    <div class="modal-p-item">
                        <img src="${item.image}" class="modal-p-img">
                        <div style="flex:1">
                            <h4 style="font-family: var(--font-serif);">${item.name}</h4>
                            <p style="font-weight: 600; margin: 5px 0;">${item.price.toLocaleString()} ₫</p>
                            <button onclick="toggleWishlist(${item.id})" style="font-size: 0.7rem; text-decoration: underline; text-transform: uppercase;">Remove</button>
                        </div>
                    </div>`).join('')}
            </div>
        </div>`;
}

function closeModal() {
    document.getElementById('modal-overlay').classList.add('hidden');
}

function selectSize(btn, size) {
    document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    const addBtn = document.getElementById('add-btn');
    addBtn.disabled = false;
    addBtn.dataset.size = size;
}

function login() {
    const name = document.getElementById('login-name').value;
    if(name) {
        currentState.user = name;
        localStorage.setItem('currentUser', name);
        showToast(`Welcome back, ${name}`);
        updateNavbar();
        closeModal();
    }
}

function logout() {
    currentState.user = null;
    localStorage.removeItem('currentUser');
    showToast('Signed out');
    updateNavbar();
    closeModal();
}

function showToast(msg) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    const overlay = document.querySelector('.menu-overlay');
    if(menu && overlay) {
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
    }
}
// --- LOGIC: CHECKOUT & PAYMENT ---
let selectedPaymentMethod = 'cod';

function selectPayment(method, element) {
    selectedPaymentMethod = method;
    
    // Đổi màu nút được chọn
    document.querySelectorAll('.payment-option').forEach(el => el.classList.remove('active'));
    element.classList.add('active');

    // Ẩn/Hiện nội dung tương ứng (Mã QR)
    document.querySelectorAll('.payment-details').forEach(el => el.classList.remove('show'));
    const detailBox = document.getElementById(`info-${method}`);
    if(detailBox) detailBox.classList.add('show');
}

async function processOrder() {
    const nameInput = document.getElementById('cx-name');
    const phoneInput = document.getElementById('cx-phone');
    const addressInput = document.getElementById('cx-address');

    // 1. Validate Họ tên
    if (!nameInput.value.trim()) {
        showToast('Vui lòng nhập họ tên người nhận!');
        nameInput.focus();
        return;
    }

    // 2. Validate Số điện thoại
    const phone = phoneInput.value.trim();
    if (!phone) {
        showToast('Vui lòng nhập số điện thoại!');
        phoneInput.focus();
        return;
    }
    if (!isValidPhone(phone)) {
        showToast('Số điện thoại không hợp lệ (VD: 0912345678)!');
        phoneInput.focus();
        return;
    }

    // 3. Validate Địa chỉ
    if (!addressInput.value.trim()) {
        showToast('Vui lòng nhập địa chỉ giao hàng!');
        addressInput.focus();
        return;
    }

    const orderData = {
        customer_name: nameInput.value,
        customer_phone: phone,
        shipping_address: addressInput.value,
        cart: currentState.cart,
        total_amount: currentState.cart.reduce((sum, item) => sum + item.price, 0)
    };

    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });

        const result = await response.json();
        
        if (response.ok) {
            showToast(`Đặt hàng thành công! Mã đơn: ${result.orderId}`);
            // Reset biến giỏ hàng
            currentState.cart = [];
            localStorage.removeItem('matmat_cart');
            updateNavbar();
            closeModal();
        } else {
            showToast('Lỗi: ' + result.error);
        }
    } catch (error) {
        console.error('Lỗi kết nối server:', error);
        showToast('Không thể kết nối đến máy chủ.');
    }
}

// 1. XỬ LÝ ĐĂNG NHẬP
async function handleLogin() {
    const usernameInput = document.getElementById('login-username');
    const passwordInput = document.getElementById('login-password');
    const email = usernameInput.value.trim();
    const pass = passwordInput.value.trim();

   // 1. Validate Email/Tên đăng nhập
    if (!email) {
        showToast('Vui lòng nhập Email đăng nhập!');
        usernameInputEl.focus()
        return;
    }
    if (!isValidEmail(email)) {
        showToast('Định dạng Email không hợp lệ!');
        usernameInputEl.focus();
        return;
    }

    // 2. Validate Mật khẩu
    if (!pass) {
        showToast('Vui lòng nhập Mật khẩu!');
        passwordInputEl.focus();
        return;
    }
    if (pass.length < 6) {
        showToast('Mật khẩu phải có ít nhất 6 ký tự!');
        passwordInputEl.focus();
        return;
    }

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: pass })
        });

        const data = await response.json();

        if (!response.ok) {
            showToast(data.message);
            return;
        }

        // Đăng nhập thành công
        const userToSave = data.user || { email: email };
        currentState.user = userToSave;
        localStorage.setItem('matmat_user', JSON.stringify(userToSave));

        showToast(`Chào mừng trở lại, ${userToSave.full_name || userToSave.email}`);
        updateNavbar();
        closeModal();

    } catch (err) {
        console.error("Login Error:", err);
        showToast("Lỗi kết nối Server.");
    }
}

// 2. XỬ LÝ ĐĂNG KÝ
async function handleRegister() {
    const nameInput = document.getElementById('reg-username');
    const emailInput = document.getElementById('reg-email');
    const passInput = document.getElementById('reg-password');
    
    const username = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passInput.value.trim();

    if (!username) {
        showToast('Vui lòng nhập Tên hiển thị!');
        nameInput.focus();
        return;
    }
    if (!isValidEmail(email)) {
        showToast('Email không đúng định dạng!');
        emailInput.focus();
        return;
    }
    if (password.length < 6) {
        showToast('Mật khẩu đăng ký phải từ 6 ký tự!');
        passInput.focus();
        return;
    }

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            showToast(data.message || "Đăng ký thất bại.");
            return;
        }

        showToast("Đăng ký thành công! Hãy đăng nhập.");
        openModal('LOGIN'); 
        
        setTimeout(() => {
            const loginInput = document.getElementById('login-username');
            if(loginInput) loginInput.value = email;
        }, 100);

    } catch (err) {
        showToast("Lỗi kết nối Server.");
    }
}
//Kiểm tra email
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function isValidPhone(phone) {
    // Kiểm tra số điện thoại Việt Nam (bắt đầu bằng 0, theo sau là 9 chữ số)
    const re = /(0[3|5|7|8|9])+([0-9]{8})\b/g;
    return re.test(phone);
}