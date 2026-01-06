// data ảnh ban đầu
const HERO_SLIDES = [
    {
        id: 1, type: 'image',
        src: '/assets/shop_image/top_banner/shop_banner1.gif',
        title: "Essential<br><em>Elegance</em>", 
        subtitle: "WINTER / SPRING 2025", 
        btnText: "Discover",
        targetId: "cat_1",
        align: "center"
    },
    {
        id: 2, type: 'image',
        src: '/assets/shop_image/top_banner/shop_banner2.webp',
        title: "The Art of<br><em>Layering</em>", 
        subtitle: "MODERN SILHOUETTE", 
        btnText: "View Collection",
        targetId: "cat_2",
        align: "left-compact"
    },
    {
        id: 3, type: 'image',
        src: '/assets/shop_image/top_banner/shop_banner3.webp',
        title: "Urban<br><em>Movement</em>", 
        subtitle: "NEW YORK CITY WALKERS", 
        btnText: "Shop Now",
        targetId: "cat_3",
        align: "left-compact"
    },
    {
        id: 4, type: 'image',
        src: '/assets/shop_image/top_banner/shop_banner4.avif',
        title: "Modern<br><em>Classics</em>",
        subtitle: "OFFICE ESSENTIALS",
        btnText: "Shop Office",
        targetId: "cat_3",
        align: "left-compact"
    }
];

let ALL_PRODUCTS = [
    { id: 1, name: "Áo 1", price: 99000, originalPrice: 999000, image: "/assets/shop_image/products/row1/ao_MU.avif", tag: "Quý ông PHẢI CÓ",category: "Outerwear" },
    { id: 2, name: "Áo 2", price: 399000, originalPrice: 599000, image: "/assets/shop_image/products/row1/ao2.avif", tag: "OOia", category: "Knitwear" },
    { id: 3, name: "Áo 3", price: 399000, originalPrice: 599000, image: "/assets/shop_image/products/row1/ao3.avif", tag: "OOia", category: "Bottoms" },
    { id: 4, name: "Áo 4", price: 499000, image: "/assets/shop_image/products/row1/ao4.webp", tag: "OOia", category: "Shirts" },
    { id: 5, name: "Áo 5", price: 399000, originalPrice: 999000, image: "/assets/shop_image/products/row2/ao14.avif", tag: "OOia",category: "T-Shirts" },
    { id: 6, name: "Áo 6", price: 980000, originalPrice: 999000, image: "/assets/shop_image/products/row2/ao12.avif", tag: "OOia", category: "Jeans" },
    { id: 7, name: "Áo 36", price: 666666, originalPrice: 3600000, image: "/assets/shop_image/products/row2/ao_JU.jpg",tag: "Vô địch tầm giá", category: "Outerwear" },
    { id: 8, name: "Áo 7", price: 299000,  originalPrice: 499000, image: "/assets/shop_image/products/row2/ao13.avif", tag: "OOia", category: "Accessories" },
    { id: 9, name: "Áo 8", price: 599000,  originalPrice: 699000, image: "/assets/shop_image/products/row3/ao8.avif",tag: "OOia", category: "Outerwear" },
    { id: 10, name: "Quarter zip", price: 10000,  originalPrice: 1000000, image: "/assets/shop_image/products/row3/ao9.avif", tag: "Matcha boy", category: "Skirts" },
    { id: 11, name: "Áo 9", price: 699000,  originalPrice: 700000, image: "/assets/shop_image/products/row3/ao10.avif", tag: "OOia",  category: "Outerwear" },
    { id: 12, name: "Tê con 6 sao", price: 1800000, originalPrice: 3600000,image: "/assets/shop_image/products/row3/T1.png", tag: "Tê Oăn", category: "Accessories" }
];

let CATEGORY_SECTIONS = [
    {
        id: "cat_1", title: "Outerwear",
        description: "Bảo vệ bạn khỏi các yếu tố thời tiết nhưng vẫn giữ được vẻ thanh lịch. Các thiết kế áo khoác của chúng tôi tập trung vào phom dáng kiến trúc và chất liệu bền vững.",
        bannerImage: "/assets/shop_image/base_banner/base_banner1.webp",
        products: ALL_PRODUCTS.slice(0, 4)
    },
    {
        id: "cat_2", title: "Casual",
        description: "Sự sang trọng thầm lặng cho ngày thường. Chất liệu cotton Ai Cập và Linen thoáng khí mang lại cảm giác nhẹ nhàng tựa như không.",
        bannerImage: "/assets/shop_image/base_banner/base_banner2.jpg",
        products: ALL_PRODUCTS.slice(4, 8)
    },
    {
        id: "cat_3", title: "Office",
        description: "Định nghĩa lại trang phục công sở hiện đại. Những đường cắt sắc sảo, tối giản chi tiết thừa để tôn vinh sự chuyên nghiệp.",
        bannerImage: "/assets/shop_image/base_banner/base_banner3.jpg",
        products: ALL_PRODUCTS.slice(8, 12)
    }
];



let currentState = {
    slideIndex: 0
};

// --- INIT ---
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Render Hero Slider ngay (vì nó là dữ liệu tĩnh)
    renderHero();

    // 2. Gọi API để lấy dữ liệu sản phẩm thật
    await fetchHomeData();

    // 3. Các hiệu ứng slide, scroll, animation giữ nguyên
    setInterval(() => changeSlide(1), 8000);
    
    const nav = document.getElementById('header') || document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (nav) {
            if (window.scrollY > 20) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        }
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            // Xử lý link từ trang khác trỏ về index
            if(targetId.includes('shop.html')) return; 
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Animation Fade-in
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 }); 
    
    // Select lại các element sau khi render xong để gán animation
    setTimeout(() => {
        const hiddenElements = document.querySelectorAll('.fade-in-scroll');
        hiddenElements.forEach(el => observer.observe(el));
    }, 500); // Chờ 1 chút để DOM render xong
});

// --- HÀM GỌI API ---
async function fetchHomeData() {
    try {
        // Gọi API Categories
        const catRes = await fetch('http://localhost:3000/api/categories');
        const categories = await catRes.json();

        // Gọi API Products
        const prodRes = await fetch('http://localhost:3000/api/products');
        ALL_PRODUCTS = await prodRes.json();

        // Map dữ liệu: Mỗi category lấy 4 sản phẩm để hiển thị trang chủ
        CATEGORY_SECTIONS = categories.map(cat => ({
            id: `cat_${cat.id}`, // Đảm bảo ID khớp với HTML (cat_1, cat_2...)
            title: cat.name.toUpperCase(),
            description: cat.description || "Mô tả mặc định",
            bannerImage: cat.banner_image,
            // Lọc 4 sản phẩm đầu tiên của danh mục đó
            products: ALL_PRODUCTS.filter(p => p.category_id === cat.id).slice(0, 4)
        }));

        // Render ra HTML
        renderCategories();

    } catch (error) {
        console.error("Lỗi tải dữ liệu từ Server:", error);
    }
}

// --- RENDER FUNCTIONS ---
function renderHero() {
    const container = document.getElementById('hero-slides');
    const indicators = document.getElementById('hero-indicators');
    if (!container || !indicators) return; 

    container.innerHTML = HERO_SLIDES.map((slide, idx) => `
        <div class="hero-slide ${idx === 0 ? 'active' : ''}" id="slide-${idx}">
            <div class="hero-media" style="background-image: url('${slide.src}'); background-size: cover; background-position: center;"></div>
            <div class="hero-overlay"></div>
            <div class="hero-content">
                <div class="hero-text">
                    <h2>${slide.title}</h2>
                    <p>${slide.subtitle}</p>
                    <button onclick="document.getElementById('${slide.targetId}')?.scrollIntoView({behavior:'smooth'})" class="hero-btn">${slide.btnText}</button>
                </div>
            </div>
        </div>
    `).join('');
    
    indicators.innerHTML = HERO_SLIDES.map((_, idx) => `<div onclick="goToSlide(${idx})" class="indicator ${idx === 0 ? 'active' : ''}" id="indicator-${idx}"></div>`).join('');
}

function renderCategories() {
    // Sửa lại ID target cho đúng với file index.html của bạn
    // Trong index.html bạn dùng id="collections" cho section chứa categories, 
    // nhưng trong code cũ lại render vào main-content hoặc đè lên section.
    // Dựa vào HTML index.html, ta sẽ render vào .cat-grid bên trong section#collections
    // TUY NHIÊN: Cấu trúc HTML hiện tại của bạn đang hardcode các ô category.
    // Để code động hoạt động, ta sẽ tìm div cha chứa các category.
    
    // Cách tốt nhất: Thay thế nội dung của section#collections bằng dữ liệu động
    const collectionSection = document.getElementById('collections');
    if (!collectionSection) return;

    // Giữ lại header, chỉ thay thế phần grid
    collectionSection.innerHTML = `
        <div class="cat-header fade-in-scroll visible">
            <span>Collections</span>
            <h3>Phong Cách Chủ Đạo</h3>
        </div>
        
        <div class="cat-grid">
            ${CATEGORY_SECTIONS.map((section, index) => `
                <div class="cat-item fade-in-scroll visible" style="transition-delay: ${index * 0.1}s;">
                    <div class="cat-img">
                        <img src="${section.bannerImage}" alt="${section.title}">
                    </div>
                    <div class="cat-info">
                        <h2>0${index + 1}. ${section.title}</h2>
                        <p>${section.description}</p>
                        <a href="shop.html#${section.id}" class="btn-explore">Xem chi tiết</a>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// Các hàm xử lý Slide giữ nguyên
function changeSlide(direction) { 
    goToSlide((currentState.slideIndex + direction + HERO_SLIDES.length) % HERO_SLIDES.length); 
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.indicator');
    if (slides.length === 0) return;

    slides[currentState.slideIndex].classList.remove('active');
    indicators[currentState.slideIndex].classList.remove('active');
    currentState.slideIndex = index;
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
}