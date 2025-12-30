// data ảnh ban đầu
const HERO_SLIDES = [
    { id: 1, type: 'image', src: 'https://assets.vogue.com/photos/6939ce24672674ea722296a1/16:9/w_1280%2Cc_limit/2doechii_1-ezgif.com-video-to-gif-converter%2520(1).gif', title: "ESSENTIAL ELEGANCE", subtitle: "Vẻ đẹp tối giản.", btnText: "KHÁM PHÁ", targetId: "cat_1" },
    { id: 2, type: 'image', src: 'https://assets.vogue.com/photos/68e58b7c8c5cb304e0c1028e/16:9/w_1920%2Cc_limit/PFW_SS26_streetstyle_day8_philoh_03.jpg', title: "WINTER LAYERS", subtitle: "Ấm áp và phong cách.", btnText: "XEM BST", targetId: "cat_2" },
    { id: 3, type: 'image', src: 'https://assets.vogue.com/photos/6941ccde1117f69e11df3276/master/w_1920,c_limit/121625_bestalbums2025_collage%20(1).jpg', title: "URBAN MOVEMENT", subtitle: "Tự do khám phá.", btnText: "MUA NGAY", targetId: "cat_3" },
    { id: 4, type: 'image', src: 'https://www.prada.com/content/dam/pradaspa/home_page/2025/10/Holiday/pradasphere/Pradasphere_DT.jpg/_jcr_content/renditions/cq5dam.web.3360.3360.jpg', title: "MODERN CLASSICS", subtitle: "Thiết kế kinh điển.", btnText: "CHI TIẾT", targetId: "cat_1" }
];

let ALL_PRODUCTS = [];
let CATEGORY_SECTIONS = [];


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