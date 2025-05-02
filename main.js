/**
 * فروشگاه کفش امیری - اسکریپت اصلی
 * نسخه 2.0.0 - ترند 2025
 */

// استفاده از IIFE برای جلوگیری از تداخل با سایر اسکریپت‌ها
(function() {
    'use strict';
    
    // متغیرهای عمومی
    const body = document.body;
    const app = document.querySelector('.app');
    const header = document.querySelector('.header');
    const pageLoader = document.getElementById('page-loader');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const searchToggle = document.getElementById('search-toggle');
    const closeSearch = document.getElementById('close-search');
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchSuggestions = document.getElementById('search-suggestions');
    const clearSearch = document.getElementById('clear-search');
    const voiceSearch = document.getElementById('voice-search');
    const aiAssistantMessage = document.querySelector('.ai-assistant-message');
    const profileToggle = document.getElementById('profile-toggle');
    const cartToggle = document.getElementById('cart-toggle');
    const cartDrawer = document.getElementById('cart-drawer');
    const closeCart = document.getElementById('close-cart');
    const continueShopping = document.getElementById('continue-shopping');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const quickViewModal = document.getElementById('quick-view-modal');
    const closeQuickView = document.getElementById('close-quick-view');
    const arModal = document.getElementById('ar-modal');
    const closeArModal = document.getElementById('close-ar-modal');
    
    // تابع اصلی پس از بارگیری صفحه
    document.addEventListener('DOMContentLoaded', function() {
        // حذف لودر صفحه
        setTimeout(function() {
            if (pageLoader) {
                pageLoader.style.opacity = '0';
                setTimeout(function() {
                    pageLoader.style.display = 'none';
                }, 500);
            }
        }, 800);
        
        // راه‌اندازی اسلایدر هیرو
        initHeroSlider();
        
        // راه‌اندازی اسلایدر پیشنهاد هوشمند
        initAIRecommendationsSlider();
        
        // راه‌اندازی اسلایدر نظرات
        initTestimonialsSlider();
        
        // راه‌اندازی اسلایدر برندها
        initBrandsSlider();
        
        // راه‌اندازی فیلتر تب‌ها
        initTabFilter();
        
        // راه‌اندازی نکات برجسته کفش هوشمند
        initSmartFeatureHighlights();
        
        // راه‌اندازی تایمر تخفیف ویژه
        initCountdownTimer();
        
        // راه‌اندازی سیستم سبد خرید
        initCartFunctionality();
        
        // راه‌اندازی جستجوی هوشمند
        initSmartSearch();
        
        // راه‌اندازی نمایش سریع محصول
        initQuickView();
        
        // راه‌اندازی واقعیت افزوده
        initARExperience();
        
        // راه‌اندازی انیمیشن‌های اسکرول
        initScrollAnimations();
        
        // راه‌اندازی تغییر رنگ هدر هنگام اسکرول
        initStickyHeader();
        
        // راه‌اندازی تم تاریک
        initDarkMode();
        
        // اضافه کردن دکمه بازگشت به بالا
        addBackToTopButton();
        
        // راه‌اندازی اسکیپ لینک برای دسترسی‌پذیری
        initAccessibility();
    });
    
    // === منوی موبایل ===
    if (menuToggle && mobileMenu && closeMenu) {
        menuToggle.addEventListener('click', function() {
            openMobileMenu();
        });
        
        closeMenu.addEventListener('click', function() {
            closeMobileMenu();
        });
        
        function openMobileMenu() {
            mobileMenu.classList.add('open');
            body.classList.add('no-scroll');
            modalBackdrop.classList.add('active');
        }
        
        function closeMobileMenu() {
            mobileMenu.classList.remove('open');
            body.classList.remove('no-scroll');
            modalBackdrop.classList.remove('active');
        }
    }
    
    // === جستجو ===
    if (searchToggle && searchOverlay && closeSearch) {
        searchToggle.addEventListener('click', function() {
            openSearchOverlay();
        });
        
        closeSearch.addEventListener('click', function() {
            closeSearchOverlay();
        });
        
        if (clearSearch && searchInput) {
            clearSearch.addEventListener('click', function() {
                searchInput.value = '';
                searchInput.focus();
                searchResults.style.display = 'none';
                searchSuggestions.style.display = 'block';
                clearSearch.style.display = 'none';
            });
        }
        
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                const query = this.value.trim();
                clearSearch.style.display = query.length > 0 ? 'flex' : 'none';
                
                if (query.length > 2) {
                    performSearch(query);
                } else {
                    searchResults.style.display = 'none';
                    searchSuggestions.style.display = 'block';
                }
            });
            
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && this.value.trim().length > 0) {
                    e.preventDefault();
                    performSearch(this.value.trim());
                }
            });
        }
        
        // جستجوی صوتی
        if (voiceSearch) {
            voiceSearch.addEventListener('click', function() {
                if ('webkitSpeechRecognition' in window) {
                    const recognition = new webkitSpeechRecognition();
                    recognition.lang = 'fa-IR';
                    recognition.continuous = false;
                    recognition.interimResults = false;
                    
                    // نمایش وضعیت ضبط صدا
                    voiceSearch.innerHTML = '<i class="ri-mic-fill"></i>';
                    voiceSearch.classList.add('recording');
                    
                    recognition.start();
                    
                    recognition.onresult = function(event) {
                        const transcript = event.results[0][0].transcript;
                        searchInput.value = transcript;
                        performSearch(transcript);
                        
                        voiceSearch.innerHTML = '<i class="ri-mic-line"></i>';
                        voiceSearch.classList.remove('recording');
                    };
                    
                    recognition.onerror = function(event) {
                        voiceSearch.innerHTML = '<i class="ri-mic-line"></i>';
                        voiceSearch.classList.remove('recording');
                        console.error('خطا در تشخیص صدا:', event.error);
                        showNotification('خطا در تشخیص صدا. لطفاً دوباره تلاش کنید.', 'error');
                    };
                    
                    recognition.onend = function() {
                        voiceSearch.innerHTML = '<i class="ri-mic-line"></i>';
                        voiceSearch.classList.remove('recording');
                    };
                } else {
                    showNotification('مرورگر شما از جستجوی صوتی پشتیبانی نمی‌کند.', 'error');
                }
            });
        }
        
        // باز کردن پنل جستجو
        function openSearchOverlay() {
            searchOverlay.classList.add('open');
            body.classList.add('no-scroll');
            setTimeout(() => {
                searchInput.focus();
            }, 300);
        }
        
        // بستن پنل جستجو
        function closeSearchOverlay() {
            searchOverlay.classList.remove('open');
            body.classList.remove('no-scroll');
            setTimeout(() => {
                searchInput.value = '';
                searchResults.style.display = 'none';
                searchSuggestions.style.display = 'block';
                clearSearch.style.display = 'none';
            }, 300);
        }
    }
    
    // جستجوی هوشمند
    function initSmartSearch() {
        if (!searchInput) return;
        
        // اتصال به تگ‌های پیشنهادی
        const tags = document.querySelectorAll('.tag');
        tags.forEach(tag => {
            tag.addEventListener('click', function() {
                searchInput.value = this.textContent;
                performSearch(this.textContent);
            });
        });
        
        // اضافه کردن جستجوهای مثال به دستیار هوشمند
        if (aiAssistantMessage) {
            aiAssistantMessage.addEventListener('click', function() {
                const aiSuggestions = [
                    "کفش مناسب پیاده‌روی طولانی",
                    "کفش ورزشی با قابلیت تنفس بالا",
                    "کفش رسمی چرم مردانه",
                    "کفش اسپرت زنانه سبک وزن",
                    "کفش مناسب ورزش‌های سرعتی"
                ];
                
                const randomSuggestion = aiSuggestions[Math.floor(Math.random() * aiSuggestions.length)];
                searchInput.value = randomSuggestion;
                performSearch(randomSuggestion, true);
            });
        }
    }
    
    // انجام جستجو
    function performSearch(query, isAI = false) {
        // نمایش لودر
        searchResults.innerHTML = '<div class="search-loading"><div class="spinner"></div><span>در حال جستجو...</span></div>';
        searchResults.style.display = 'block';
        searchSuggestions.style.display = 'none';
        
        // شبیه‌سازی تأخیر شبکه (در حالت واقعی با AJAX جایگزین می‌شود)
        setTimeout(() => {
            // در اینجا اطلاعات از سرور دریافت می‌شود
            const mockResults = getMockSearchResults(query, isAI);
            renderSearchResults(mockResults, query, isAI);
        }, 800);
    }
    
    // شبیه‌سازی نتایج جستجو (در پروژه واقعی با API جایگزین می‌شود)
    function getMockSearchResults(query, isAI) {
        const products = [
            {
                id: 1,
                name: 'کفش نایک ایر مکس 2025',
                brand: 'نایک',
                price: '2,380,000',
                image: 'images/products/shoe1.webp',
                category: 'sport',
                tags: ['ورزشی', 'دویدن', 'جذب ضربه', 'راحت'],
                features: ['کوسن هوا', 'سبک', 'انعطاف‌پذیر']
            },
            {
                id: 2,
                name: 'کفش آدیداس اولترابوست 24',
                brand: 'آدیداس',
                price: '3,850,000',
                image: 'images/products/shoe2.webp',
                category: 'sport',
                tags: ['ورزشی', 'دویدن', 'تکنولوژی بوست', 'راحت'],
                features: ['بوست', 'پرایم‌نیت', 'سبک']
            },
            {
                id: 3,
                name: 'کفش پوما متریکس دوستدار محیط‌زیست',
                brand: 'پوما',
                price: '2,790,000',
                image: 'images/products/shoe3.webp',
                category: 'casual',
                tags: ['روزمره', 'دوستدار محیط زیست', 'راحت'],
                features: ['مواد بازیافتی', 'سازگار با محیط زیست', 'بادوام']
            },
            {
                id: 4,
                name: 'کفش هوشمند نایک ادپت 3.0',
                brand: 'نایک',
                price: '4,950,000',
                image: 'images/products/shoe4.webp',
                category: 'smart',
                tags: ['هوشمند', 'تکنولوژی', 'بلوتوث', 'اپلیکیشن'],
                features: ['بند خودکار', 'اتصال به اپلیکیشن', 'سنسور فشار']
            },
            {
                id: 5,
                name: 'کفش روزمره نیوبالانس 574',
                brand: 'نیوبالانس',
                price: '2,100,000',
                image: 'images/products/reco1.webp',
                category: 'casual',
                tags: ['روزمره', 'کلاسیک', 'سبک', 'راحت'],
                features: ['کفی فوم', 'رویه جیر', 'کفه لاستیکی']
            },
            {
                id: 6,
                name: 'کفش چرم رسمی کلارک',
                brand: 'کلارک',
                price: '3,200,000',
                image: 'images/products/reco2.webp',
                category: 'formal',
                tags: ['رسمی', 'چرم', 'دفتر کار', 'مهمانی'],
                features: ['چرم طبیعی', 'کفی قابل تعویض', 'دوخت دستی']
            },
            {
                id: 7,
                name: 'کفش پیاده‌روی آسیکس جل-کایانو',
                brand: 'آسیکس',
                price: '3,950,000',
                image: 'images/products/reco3.webp',
                category: 'hiking',
                tags: ['پیاده‌روی', 'کوهنوردی', 'طبیعت‌گردی', 'راحت'],
                features: ['فناوری جل', 'آب‌گریز', 'جذب ضربه']
            },
            {
                id: 8,
                name: 'کفش سوئد پوما کلاسیک',
                brand: 'پوما',
                price: '1,890,000',
                image: 'images/products/reco4.webp',
                category: 'casual',
                tags: ['روزمره', 'سوئد', 'کلاسیک', 'استایل'],
                features: ['رویه سوئد', 'لاستیک طبیعی', 'کفی ارگونومیک']
            }
        ];
        
        // فیلتر کردن محصولات بر اساس کوئری
        query = query.toLowerCase();
        
        if (isAI) {
            // جستجوی هوشمند بر اساس متن توصیفی
            if (query.includes('پیاده‌روی')) {
                return products.filter(p => p.tags.includes('پیاده‌روی') || p.category === 'hiking');
            } else if (query.includes('ورزشی') || query.includes('سرعتی')) {
                return products.filter(p => p.category === 'sport');
            } else if (query.includes('رسمی') || query.includes('چرم')) {
                return products.filter(p => p.category === 'formal');
            } else if (query.includes('زنانه')) {
                // در مثال ما، تخیل می‌کنیم که این محصولات زنانه هستند
                return [products[4], products[7]];
            } else if (query.includes('سبک') || query.includes('تنفس')) {
                return products.filter(p => p.features.includes('سبک'));
            } else {
                // اگر کوئری خاصی تشخیص داده نشد، محصولات مرتبط برگردانده می‌شوند
                return products.slice(0, 4);
            }
        } else {
            // جستجوی معمولی بر اساس کلمات کلیدی
            return products.filter(product => {
                return product.name.toLowerCase().includes(query) || 
                      product.brand.toLowerCase().includes(query) ||
                      product.category.toLowerCase().includes(query) ||
                      product.tags.some(tag => tag.toLowerCase().includes(query));
            });
        }
    }
    
    // نمایش نتایج جستجو
    function renderSearchResults(results, query, isAI) {
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">موردی یافت نشد. لطفاً عبارت دیگری را جستجو کنید.</div>';
            return;
        }
        
        let html = '';
        
        if (isAI) {
            html += `<div class="ai-search-result">
                <div class="ai-search-header">
                    <div class="ai-icon"><i class="ri-robot-line"></i></div>
                    <div class="ai-search-query">برای "${query}" این موارد پیشنهاد می‌شود:</div>
                </div>
            </div>`;
        }
        
        html += '<div class="search-results-grid">';
        
        results.forEach(product => {
            html += `
                <a href="product-detail.html?id=${product.id}" class="search-result-item">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="result-content">
                        <span class="result-brand">${product.brand}</span>
                        <h4>${product.name}</h4>
                        <div class="result-price">${product.price} تومان</div>
                    </div>
                </a>
            `;
        });
        
        html += '</div>';
        html += `<div class="view-all-results">
            <a href="products.html?q=${encodeURIComponent(query)}" class="btn btn-sm btn-outline-dark">مشاهده همه نتایج</a>
        </div>`;
        
        searchResults.innerHTML = html;
    }
    
/**
 * سیستم یکپارچه سبد خرید
 * نسخه اصلاح شده با رفع مشکلات تکرار کد و محاسبات قیمت
 */
const ShoppingCart = (function() {
    // متغیرهای خصوصی
    let cartItems = [];
    let cartDrawer = null;
    let cartOverlay = null;
    
    // مقادیر پیکربندی
    const TAX_RATE = 0.09; // نرخ مالیات: ۹٪
    
    /**
     * راه‌اندازی سیستم سبد خرید
     */
    function init() {
        console.log('راه‌اندازی سیستم سبد خرید...');
        
        // بارگذاری اطلاعات سبد خرید از حافظه محلی
        loadCart();
        
        // پیدا کردن المان‌های اصلی سبد خرید
        cartDrawer = document.querySelector('.cart-drawer');
        cartOverlay = document.querySelector('.cart-drawer-overlay');
        
        // اضافه کردن رویدادهای اصلی
        attachCartEvents();
        
        // اضافه کردن رویدادها به دکمه‌های "افزودن به سبد خرید"
        attachAddToCartEvents();
        
        // بروزرسانی نمایش سبد خرید
        updateCartBadge();
        renderCart();
    }
    
    /**
     * بارگذاری اطلاعات سبد خرید از حافظه محلی
     */
    function loadCart() {
        try {
            const savedCart = localStorage.getItem('cartItems');
            if (savedCart) {
                cartItems = JSON.parse(savedCart);
                
                // اطمینان از معتبر بودن داده‌های بارگذاری شده
                cartItems = cartItems.filter(item => 
                    item && item.id && item.name && 
                    !isNaN(parseFloat(item.price)) && 
                    !isNaN(parseInt(item.quantity))
                );
                
                console.log(`${cartItems.length} محصول از حافظه محلی بارگذاری شد`);
            }
        } catch (error) {
            console.error('خطا در بارگذاری سبد خرید:', error);
            cartItems = [];
        }
    }
    
    /**
     * ذخیره سبد خرید در حافظه محلی
     */
    function saveCart() {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } catch (error) {
            console.error('خطا در ذخیره سبد خرید:', error);
            showNotification('خطا در ذخیره اطلاعات سبد خرید', 'error');
        }
    }
    
    /**
     * اضافه کردن رویدادهای اصلی سبد خرید
     */
    function attachCartEvents() {
        // رویداد باز کردن سبد خرید
        document.querySelectorAll('.cart-icon, .cart-toggle').forEach(el => {
            el.addEventListener('click', openCartDrawer);
        });
        
        // رویداد بستن سبد خرید
        document.querySelectorAll('.cart-drawer-close, .cart-close').forEach(el => {
            el.addEventListener('click', closeCartDrawer);
        });
        
        // رویداد بستن با کلیک روی پس‌زمینه
        if (cartOverlay) {
            cartOverlay.addEventListener('click', closeCartDrawer);
        }
        
        // رویداد دکمه خالی کردن سبد خرید
        const clearCartBtn = document.querySelector('.clear-cart-btn');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', clearCart);
        }
        
        // رویداد دکمه پرداخت
        document.querySelectorAll('.checkout-button').forEach(btn => {
            btn.addEventListener('click', proceedToCheckout);
        });
    }
    
    /**
     * اضافه کردن رویدادها به دکمه‌های "افزودن به سبد خرید"
     */
    function attachAddToCartEvents() {
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            // اطمینان از اینکه رویداد تکراری اضافه نشود
            button.removeEventListener('click', handleAddToCartClick);
            button.addEventListener('click', handleAddToCartClick);
        });
    }
    
    /**
     * مدیریت رویداد کلیک روی دکمه "افزودن به سبد خرید"
     */
    function handleAddToCartClick(e) {
        e.preventDefault();
        
        const button = this;
        const productCard = button.closest('.product-card, .product-details, .quick-view-content');
        
        if (!productCard) {
            console.error('کارت محصول یافت نشد');
            return;
        }
        
        // استخراج اطلاعات محصول
        const product = extractProductData(productCard, button);
        
        if (!product) {
            return;
        }
        
        // نمایش بازخورد اضافه شدن محصول
        const originalText = button.textContent || button.innerHTML;
        
        // افزودن محصول به سبد خرید و نمایش بازخورد
        if (addToCart(product)) {
            showAddFeedback(button, originalText);
            
            // انیمیشن اضافه شدن به سبد خرید (اگر تصویر محصول موجود باشد)
            const productImage = productCard.querySelector('.product-image img');
            const cartIcon = document.querySelector('.cart-icon, .cart-toggle');
            
            if (productImage && cartIcon) {
                animateAddToCart(productImage, cartIcon);
            }
        }
    }
    
    /**
     * استخراج اطلاعات محصول از کارت محصول
     */
    function extractProductData(productCard, button) {
        // استخراج نام محصول
        const nameElement = productCard.querySelector('.product-title, .product-name');
        if (!nameElement) {
            console.error('نام محصول یافت نشد');
            showNotification('خطا در افزودن محصول: نام محصول یافت نشد', 'error');
            return null;
        }
        const productName = nameElement.textContent.trim();
        
        // استخراج و پردازش قیمت
        const priceElement = productCard.querySelector('.product-price');
        if (!priceElement) {
            console.error('قیمت محصول یافت نشد');
            showNotification('خطا در افزودن محصول: قیمت محصول یافت نشد', 'error');
            return null;
        }
        
        let productPrice = 0;
        
        // ابتدا بررسی می‌کنیم آیا قیمت در data attribute ذخیره شده است
        if (priceElement.dataset.price) {
            productPrice = parseInt(priceElement.dataset.price);
        } else {
            // استخراج اعداد از متن قیمت
            const priceText = priceElement.textContent.trim();
            productPrice = parseInt(priceText.replace(/[^\d]/g, ''));
        }
        
        if (isNaN(productPrice) || productPrice <= 0) {
            console.error('قیمت نامعتبر:', priceElement.textContent);
            showNotification('خطا در افزودن محصول: قیمت نامعتبر', 'error');
            return null;
        }
        
        // استخراج شناسه محصول
        const productId = button.dataset.productId || 
                          productCard.dataset.productId || 
                          `product-${Date.now()}`;
        
        // استخراج تصویر محصول
        const productImage = productCard.querySelector('.product-image img')?.src || 
                             'images/default-product.jpg';
        
        // بررسی انتخاب رنگ و سایز در صورت وجود
        let color = null;
        const colorSelector = productCard.querySelector('.color-option.selected, .color-selector select');
        if (colorSelector) {
            color = colorSelector.dataset.color || colorSelector.value;
        }
        
        let size = null;
        const sizeSelector = productCard.querySelector('.size-option.selected, .size-selector select');
        if (sizeSelector) {
            size = sizeSelector.dataset.size || sizeSelector.value;
        }
        
        // استخراج تعداد
        let quantity = 1;
        const quantityInput = productCard.querySelector('.quantity-input');
        if (quantityInput) {
            quantity = parseInt(quantityInput.value) || 1;
        }
        
        return {
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            color: color,
            size: size,
            quantity: quantity
        };
    }
    
    /**
     * افزودن محصول به سبد خرید
     */
    function addToCart(product) {
        if (!product || !product.name) {
            console.error('داده محصول نامعتبر:', product);
            return false;
        }
        
        // اطمینان از معتبر بودن قیمت و تعداد
        const price = parseFloat(product.price);
        const quantity = parseInt(product.quantity) || 1;
        
        if (isNaN(price) || price <= 0) {
            console.error('قیمت نامعتبر:', product.price);
            showNotification('خطا در افزودن محصول: قیمت نامعتبر', 'error');
            return false;
        }
        
        // بررسی وجود محصول در سبد خرید
        const existingItemIndex = cartItems.findIndex(item => 
            item.id === product.id && 
            (!product.color || item.color === product.color) && 
            (!product.size || item.size === product.size)
        );
        
        // اگر محصول در سبد خرید وجود دارد، تعداد آن را افزایش می‌دهیم
        if (existingItemIndex > -1) {
            cartItems[existingItemIndex].quantity += quantity;
        } else {
            // در غیر این صورت، محصول جدید را اضافه می‌کنیم
            cartItems.push({
                id: product.id,
                name: product.name,
                price: price,
                image: product.image,
                quantity: quantity,
                color: product.color || null,
                size: product.size || null
            });
        }
        
        // ذخیره سبد خرید، بروزرسانی نمایش و باز کردن کشوی سبد خرید
        saveCart();
        updateCartBadge();
        renderCart();
        showNotification(`${product.name} به سبد خرید اضافه شد`, 'success');
        
        // باز کردن سبد خرید با تأخیر (اگر انیمیشن اضافه شدن در حال اجراست)
        setTimeout(openCartDrawer, 800);
        
        return true;
    }
    
    /**
     * پاک کردن سبد خرید
     */
    function clearCart() {
        cartItems = [];
        saveCart();
        renderCart();
        updateCartBadge();
        showNotification('سبد خرید خالی شد', 'info');
    }
    
    /**
     * انتقال به صفحه پرداخت
     */
    function proceedToCheckout(e) {
        e.preventDefault();
        
        if (cartItems.length === 0) {
            showNotification('سبد خرید شما خالی است', 'error');
            return;
        }
        
        window.location.href = '/checkout.html';
    }
    
    /**
     * بروزرسانی نشانگر تعداد محصولات در سبد خرید
     */
    function updateCartBadge() {
        const cartCountElements = document.querySelectorAll('.cart-count, .badge');
        
        if (cartCountElements.length === 0) return;
        
        const itemCount = cartItems.reduce((total, item) => total + (parseInt(item.quantity) || 0), 0);
        
        cartCountElements.forEach(element => {
            element.textContent = itemCount;
            element.style.display = itemCount > 0 ? 'flex' : 'none';
        });
    }
    
    /**
     * نمایش سبد خرید
     */
    function renderCart() {
        const cartItemsContainer = document.querySelector('.cart-items');
        
        if (!cartItemsContainer) {
            console.error('کانتینر آیتم‌های سبد خرید یافت نشد');
            return;
        }
        
        // اگر سبد خرید خالی است، پیام مناسب را نمایش می‌دهیم
        if (cartItems.length === 0) {
            showEmptyCart();
            return;
        }
        
        // نمایش محصولات سبد خرید
        cartItemsContainer.innerHTML = '';
        
        cartItems.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.dataset.id = item.id;
            
            // محاسبه مجموع قیمت آیتم
            const itemTotal = item.price * item.quantity;
            
            cartItemElement.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-content">
                    <h4>${item.name}</h4>
                    ${item.color ? `<p class="item-color">رنگ: ${item.color}</p>` : ''}
                    ${item.size ? `<p class="item-size">سایز: ${item.size}</p>` : ''}
                    <div class="cart-item-price">${formatPrice(item.price)}</div>
                    <div class="cart-item-controls">
                        <button class="quantity-decrease">-</button>
                        <span class="item-quantity">${item.quantity}</span>
                        <button class="quantity-increase">+</button>
                        <button class="remove-item">حذف</button>
                    </div>
                    <div class="item-total">مجموع: ${formatPrice(itemTotal)}</div>
                </div>
            `;
            
            cartItemsContainer.appendChild(cartItemElement);
        });
        
        // اضافه کردن رویدادها به آیتم‌های سبد خرید
        attachCartItemEvents();
        
        // بروزرسانی مجموع قیمت‌ها
        updateCartTotals();
    }
    
    /**
     * نمایش سبد خرید خالی
     */
    function showEmptyCart() {
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartTotals = document.querySelector('.cart-totals');
        
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <div class="empty-cart-icon">🛒</div>
                    <p>سبد خرید شما خالی است</p>
                    <button class="continue-shopping">ادامه خرید</button>
                </div>
            `;
            
            // اضافه کردن رویداد به دکمه ادامه خرید
            const continueBtn = cartItemsContainer.querySelector('.continue-shopping');
            if (continueBtn) {
                continueBtn.addEventListener('click', closeCartDrawer);
            }
        }
        
        // پنهان کردن بخش مجموع در صورت خالی بودن سبد خرید
        if (cartTotals) {
            cartTotals.style.display = 'none';
        }
        
        // غیرفعال کردن دکمه پرداخت
        document.querySelectorAll('.checkout-button').forEach(btn => {
            btn.disabled = true;
        });
    }
    
    /**
     * اضافه کردن رویدادها به آیتم‌های سبد خرید
     */
    function attachCartItemEvents() {
        document.querySelectorAll('.cart-item').forEach(item => {
            const itemId = item.dataset.id;
            const cartItemIndex = cartItems.findIndex(i => i.id === itemId);
            
            if (cartItemIndex === -1) return;
            
            const decreaseBtn = item.querySelector('.quantity-decrease');
            const increaseBtn = item.querySelector('.quantity-increase');
            const removeBtn = item.querySelector('.remove-item');
            
            if (decreaseBtn) {
                decreaseBtn.addEventListener('click', () => {
                    decreaseItemQuantity(cartItemIndex);
                });
            }
            
            if (increaseBtn) {
                increaseBtn.addEventListener('click', () => {
                    increaseItemQuantity(cartItemIndex);
                });
            }
            
            if (removeBtn) {
                removeBtn.addEventListener('click', () => {
                    removeCartItem(cartItemIndex);
                });
            }
        });
    }
    
    /**
     * کاهش تعداد محصول در سبد خرید
     */
    function decreaseItemQuantity(index) {
        if (index < 0 || index >= cartItems.length) return;
        
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity--;
            saveCart();
            renderCart();
            updateCartBadge();
        }
    }
    
    /**
     * افزایش تعداد محصول در سبد خرید
     */
    function increaseItemQuantity(index) {
        if (index < 0 || index >= cartItems.length) return;
        
        cartItems[index].quantity++;
        saveCart();
        renderCart();
        updateCartBadge();
    }
    
    /**
     * حذف محصول از سبد خرید
     */
    function removeCartItem(index) {
        if (index < 0 || index >= cartItems.length) return;
        
        const removedItem = cartItems.splice(index, 1)[0];
        saveCart();
        renderCart();
        updateCartBadge();
        showNotification(`${removedItem.name} از سبد خرید حذف شد`, 'info');
    }
    
    /**
     * بروزرسانی مجموع قیمت‌های سبد خرید
     */
    function updateCartTotals() {
        const subtotalEl = document.querySelector('.cart-subtotal .amount');
        const taxEl = document.querySelector('.cart-tax .amount');
        const totalEl = document.querySelector('.cart-total .amount');
        const cartTotals = document.querySelector('.cart-totals');
        
        if (!subtotalEl || !totalEl) return;
        
        // محاسبه زیرمجموع
        let subtotal = 0;
        for (const item of cartItems) {
            subtotal += item.price * item.quantity;
        }
        
        // محاسبه مالیات
        const tax = Math.round(subtotal * TAX_RATE);
        
        // محاسبه مجموع کل
        const total = subtotal + tax;
        
        // نمایش مقادیر
        subtotalEl.textContent = formatPrice(subtotal);
        
        if (taxEl) {
            taxEl.textContent = formatPrice(tax);
        }
        
        totalEl.textContent = formatPrice(total);
        
        // نمایش بخش مجموع
        if (cartTotals) {
            cartTotals.style.display = cartItems.length > 0 ? 'block' : 'none';
        }
        
        // فعال/غیرفعال کردن دکمه پرداخت
        document.querySelectorAll('.checkout-button').forEach(btn => {
            btn.disabled = cartItems.length === 0;
        });
    }
    
    /**
     * باز کردن کشوی سبد خرید
     */
    function openCartDrawer() {
        if (!cartDrawer) return;
        
        cartDrawer.classList.add('open', 'active');
        
        if (cartOverlay) {
            cartOverlay.style.display = 'block';
            setTimeout(() => {
                cartOverlay.style.opacity = '1';
                cartOverlay.classList.add('active');
            }, 10);
        }
        
        document.body.style.overflow = 'hidden';
        document.body.classList.add('cart-drawer-open');
    }
    
    /**
     * بستن کشوی سبد خرید
     */
    function closeCartDrawer() {
        if (!cartDrawer) return;
        
        cartDrawer.classList.remove('open', 'active');
        
        if (cartOverlay) {
            cartOverlay.style.opacity = '0';
            cartOverlay.classList.remove('active');
            setTimeout(() => {
                cartOverlay.style.display = 'none';
            }, 300);
        }
        
        document.body.style.overflow = '';
        document.body.classList.remove('cart-drawer-open');
    }
    
    /**
     * نمایش بازخورد اضافه شدن محصول
     */
    function showAddFeedback(button, originalText) {
        const originalHTML = button.innerHTML;
        button.innerHTML = '<span class="icon-check"></span> اضافه شد';
        button.classList.add('added');
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.classList.remove('added');
        }, 2000);
    }
    
    /**
     * انیمیشن اضافه شدن به سبد خرید
     */
    function animateAddToCart(productImage, cartIcon) {
        // ایجاد المان انیمیشن
        const flyingImage = document.createElement('img');
        flyingImage.src = productImage.src;
        flyingImage.style.position = 'fixed';
        flyingImage.style.zIndex = '1000';
        flyingImage.style.width = '100px';
        flyingImage.style.height = '100px';
        flyingImage.style.objectFit = 'cover';
        flyingImage.style.borderRadius = '50%';
        flyingImage.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        flyingImage.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        document.body.appendChild(flyingImage);
        
        // مختصات اولیه و نهایی
        const productRect = productImage.getBoundingClientRect();
        const cartRect = cartIcon.getBoundingClientRect();
        
        // تنظیم موقعیت اولیه
        flyingImage.style.top = `${productRect.top}px`;
        flyingImage.style.left = `${productRect.left}px`;
        flyingImage.style.width = `${productRect.width}px`;
        flyingImage.style.height = `${productRect.height}px`;
        flyingImage.style.opacity = '1';
        
        // اجرای انیمیشن با تأخیر کوتاه
        setTimeout(() => {
            flyingImage.style.top = `${cartRect.top}px`;
            flyingImage.style.left = `${cartRect.left}px`;
            flyingImage.style.width = '20px';
            flyingImage.style.height = '20px';
            flyingImage.style.opacity = '0';
            
            // اضافه کردن انیمیشن به آیکون سبد خرید
            cartIcon.classList.add('pulse');
            
            // حذف المان انیمیشن پس از اتمام
            setTimeout(() => {
                flyingImage.remove();
                cartIcon.classList.remove('pulse');
            }, 800);
        }, 100);
    }
    
    /**
     * نمایش اعلان
     */
    function showNotification(message, type = 'info') {
        // حذف اعلان‌های قبلی با همان متن
        document.querySelectorAll('.notification').forEach(notif => {
            if (notif.querySelector('.notification-message')?.textContent === message) {
                notif.remove();
            }
        });
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
            </div>
            <button class="notification-close">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        // اضافه کردن کلاس نمایش با تأخیر برای ایجاد انیمیشن
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // پنهان کردن اعلان پس از مدت مشخص
        const duration = type === 'error' ? 5000 : 3000;
        
        setTimeout(() => {
            notification.classList.remove('show');
            notification.addEventListener('transitionend', () => {
                notification.remove();
            });
        }, duration);
        
        // رویداد بستن اعلان
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            notification.addEventListener('transitionend', () => {
                notification.remove();
            });
        });
    }
    
    /**
     * فرمت‌بندی قیمت
     */
    function formatPrice(price) {
        // اطمینان از معتبر بودن قیمت
        if (isNaN(price) || price < 0) {
            console.warn('مقدار قیمت نامعتبر:', price);
            price = 0;
        }
        
        // گرد کردن به عدد صحیح
        price = Math.round(price);
        
        // افزودن جداکننده هزارگان و واحد پولی
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' تومان';
    }
    
    // API عمومی
    return {
        init: init,
        addToCart: addToCart,
        updateCart: renderCart,
        clearCart: clearCart,
        openCart: openCartDrawer,
        closeCart: closeCartDrawer,
        getCartItems: () => [...cartItems],
        getCartTotal: () => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    };
})();

// راه‌اندازی سیستم سبد خرید پس از بارگذاری صفحه
document.addEventListener('DOMContentLoaded', ShoppingCart.init);
    
    // === اسلایدر هیرو ===
    function initHeroSlider() {
        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.slider-dot');
        const prevBtn = document.querySelector('.slider-arrow.prev');
        const nextBtn = document.querySelector('.slider-arrow.next');
        
        if (!slides.length || !dots.length) return;
        
        let currentSlide = 0;
        let slideInterval;
        const slideDuration = 5000; // زمان نمایش هر اسلاید (5 ثانیه)
        
        // نمایش اسلاید فعلی
        function showSlide(index) {
            // مخفی کردن همه اسلایدها
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // غیرفعال کردن همه نقاط
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // نمایش اسلاید فعلی
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            
            // ذخیره ایندکس جاری
            currentSlide = index;
        }
        
        // رفتن به اسلاید بعدی
        function nextSlide() {
            let next = currentSlide + 1;
            if (next >= slides.length) next = 0;
            showSlide(next);
        }
        
        // رفتن به اسلاید قبلی
        function prevSlide() {
            let prev = currentSlide - 1;
            if (prev < 0) prev = slides.length - 1;
            showSlide(prev);
        }
        
        // راه‌اندازی اسلاید خودکار
        function startSlideInterval() {
            stopSlideInterval();
            slideInterval = setInterval(nextSlide, slideDuration);
        }
        
        // توقف اسلاید خودکار
        function stopSlideInterval() {
            if (slideInterval) {
                clearInterval(slideInterval);
            }
        }
        
        // رویدادهای دکمه‌های کنترل
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                prevSlide();
                startSlideInterval();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                nextSlide();
                startSlideInterval();
            });
        }
        
        // رویدادهای نقاط کنترل
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
                startSlideInterval();
            });
        });
        
        // توقف اسلاید خودکار هنگام هاور روی اسلایدر
        const heroWrapper = document.querySelector('.hero-wrapper');
        if (heroWrapper) {
            heroWrapper.addEventListener('mouseenter', stopSlideInterval);
            heroWrapper.addEventListener('mouseleave', startSlideInterval);
        }
        
        // شروع اسلاید خودکار
        startSlideInterval();
        
        // واکنش‌پذیری به کلیدهای جهت‌دار صفحه کلید
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                nextSlide(); // در حالت RTL، کلید چپ برای رفتن به اسلاید بعدی است
                startSlideInterval();
            } else if (e.key === 'ArrowRight') {
                prevSlide(); // در حالت RTL، کلید راست برای رفتن به اسلاید قبلی است
                startSlideInterval();
            }
        });
        
        // پشتیبانی از سوایپ برای دستگاه‌های لمسی
        let touchStartX = 0;
        let touchEndX = 0;
        
        heroWrapper.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        heroWrapper.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const swipeThreshold = 50; // حداقل فاصله سوایپ
            
            if (touchEndX - touchStartX > swipeThreshold) {
                // سوایپ به راست (در RTL یعنی اسلاید قبلی)
                prevSlide();
            } else if (touchStartX - touchEndX > swipeThreshold) {
                // سوایپ به چپ (در RTL یعنی اسلاید بعدی)
                nextSlide();
            }
            
            startSlideInterval();
        }
    }
    
    // === اسلایدر پیشنهاد هوشمند ===
    function initAIRecommendationsSlider() {
        const slider = document.querySelector('.ai-recommendations-slider');
        
        if (!slider) return;
        
        let isDown = false;
        let startX;
        let scrollLeft;
        
        // رویدادهای موس برای اسکرول افقی
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // سرعت اسکرول
            slider.scrollLeft = scrollLeft - walk;
        });
        
        // پشتیبانی از تاچ برای موبایل
        slider.addEventListener('touchstart', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.touches[0].pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        }, { passive: true });
        
        slider.addEventListener('touchend', () => {
            isDown = false;
            slider.classList.remove('active');
        }, { passive: true });
        
        slider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        }, { passive: true });
        
        // اسکرول خودکار اولیه برای نمایش محصولات بیشتر
        setTimeout(() => {
            const scrollAmount = 100; // مقدار اسکرول اولیه
            slider.scrollLeft = slider.scrollLeft + scrollAmount;
            
            // انیمیشن اسکرول به عقب
            setTimeout(() => {
                slider.scrollLeft = slider.scrollLeft - scrollAmount / 2;
            }, 700);
        }, 1500);
    }
    
    // === اسلایدر نظرات مشتریان ===
    function initTestimonialsSlider() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const testimonialDots = document.querySelectorAll('.testimonial-dot');
        const prevBtn = document.querySelector('.testimonial-nav.prev');
        const nextBtn = document.querySelector('.testimonial-nav.next');
        
        if (!testimonialCards.length) return;
        
        let currentIndex = 0;
        let testimonialInterval;
        const testimonialDuration = 6000; // زمان نمایش هر نظر (6 ثانیه)
        
        // نمایش نظر فعلی
        function showTestimonial(index) {
            // مخفی کردن همه نظرات
            testimonialCards.forEach(card => {
                card.classList.remove('active');
            });
            
            // غیرفعال کردن همه نقاط
            if (testimonialDots.length) {
                testimonialDots.forEach(dot => {
                    dot.classList.remove('active');
                });
                
                testimonialDots[index].classList.add('active');
            }
            
            // نمایش نظر فعلی
            testimonialCards[index].classList.add('active');
            
            // ذخیره ایندکس جاری
            currentIndex = index;
        }
        
        // رفتن به نظر بعدی
        function nextTestimonial() {
            let next = currentIndex + 1;
            if (next >= testimonialCards.length) next = 0;
            showTestimonial(next);
        }
        
        // رفتن به نظر قبلی
        function prevTestimonial() {
            let prev = currentIndex - 1;
            if (prev < 0) prev = testimonialCards.length - 1;
            showTestimonial(prev);
        }
        
        // راه‌اندازی نمایش خودکار
        function startTestimonialInterval() {
            stopTestimonialInterval();
            testimonialInterval = setInterval(nextTestimonial, testimonialDuration);
        }
        
        // توقف نمایش خودکار
        function stopTestimonialInterval() {
            if (testimonialInterval) {
                clearInterval(testimonialInterval);
            }
        }
        
        // رویدادهای دکمه‌های کنترل
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                prevTestimonial();
                startTestimonialInterval();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                nextTestimonial();
                startTestimonialInterval();
            });
        }
        
        // رویدادهای نقاط کنترل
        if (testimonialDots.length) {
            testimonialDots.forEach((dot, index) => {
                dot.addEventListener('click', function() {
                    showTestimonial(index);
                    startTestimonialInterval();
                });
            });
        }
        
        // شروع نمایش خودکار
        startTestimonialInterval();
    }
    
    // === اسلایدر برندها ===
    function initBrandsSlider() {
        const brandsSlider = document.querySelector('.brands-slider');
        
        if (!brandsSlider) return;
        
        // اسکرول خودکار برندها
        let scrollAmount = 0;
        const scrollSpeed = 0.5;
        const maxScroll = brandsSlider.scrollWidth - brandsSlider.clientWidth;
        let direction = 1; // 1 برای اسکرول به چپ، -1 برای اسکرول به راست
        
        function autoScroll() {
            if (!document.hidden) { // فقط زمانی که تب فعال است
                scrollAmount += scrollSpeed * direction;
                
                // تغییر جهت اسکرول در انتها یا ابتدا
                if (scrollAmount >= maxScroll) {
                    direction = -1;
                } else if (scrollAmount <= 0) {
                    direction = 1;
                }
                
                brandsSlider.scrollLeft = scrollAmount;
            }
            
            requestAnimationFrame(autoScroll);
        }
        
        // شروع اسکرول خودکار
        autoScroll();
        
        // توقف اسکرول خودکار هنگام هاور
        brandsSlider.addEventListener('mouseenter', () => {
            scrollSpeed = 0;
        });
        
        brandsSlider.addEventListener('mouseleave', () => {
            scrollSpeed = 0.5;
        });
    }
    
    // === فیلتر تب‌ها ===
    function initTabFilter() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const productCards = document.querySelectorAll('.product-card');
        
        if (!tabButtons.length || !productCards.length) return;
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // حذف کلاس اکتیو از همه دکمه‌ها
                tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // افزودن کلاس اکتیو به دکمه فعلی
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                // انیمیشن محو کردن همه محصولات
                productCards.forEach(card => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                });
                
                // نمایش محصولات فیلتر شده با تأخیر
                setTimeout(() => {
                    // فیلتر کردن محصولات
                    productCards.forEach(card => {
                        if (category === 'all') {
                            card.style.display = 'block';
                        } else {
                            if (card.getAttribute('data-category') === category) {
                                card.style.display = 'block';
                            } else {
                                card.style.display = 'none';
                            }
                        }
                    });
                    
                    // انیمیشن نمایش محصولات فیلتر شده
                    setTimeout(() => {
                        productCards.forEach(card => {
                            if (card.style.display !== 'none') {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }
                        });
                    }, 50);
                }, 300);
            });
        });
    }
    
    // === نکات برجسته کفش هوشمند ===
    function initSmartFeatureHighlights() {
        const highlightDots = document.querySelectorAll('.highlight-dot');
        
        if (!highlightDots.length) return;
        
        // تابع ایجاد انیمیشن ضربان با تأخیر
        function animateDotsWithDelay() {
            highlightDots.forEach((dot, index) => {
                setTimeout(() => {
                    dot.classList.add('pulse');
                    
                    // نمایش تولتیپ برای مدت کوتاه
                    dot.querySelector('.highlight-tooltip').style.opacity = '1';
                    
                    setTimeout(() => {
                        dot.querySelector('.highlight-tooltip').style.opacity = '0';
                    }, 2000);
                    
                }, index * 1500);
            });
            
            // تکرار انیمیشن پس از اتمام همه نقاط
            setTimeout(() => {
                highlightDots.forEach(dot => {
                    dot.classList.remove('pulse');
                    dot.querySelector('.highlight-tooltip').style.opacity = '0';
                });
                
                setTimeout(animateDotsWithDelay, 2000);
            }, highlightDots.length * 1500 + 2000);
        }
        
        // شروع انیمیشن با تأخیر اولیه
        setTimeout(animateDotsWithDelay, 2000);
        
        // واکنش به هاور کاربر
        highlightDots.forEach(dot => {
            dot.addEventListener('mouseenter', function() {
                // متوقف کردن انیمیشن خودکار و نمایش تولتیپ
                this.classList.add('active');
                this.querySelector('.highlight-tooltip').style.opacity = '1';
            });
            
            dot.addEventListener('mouseleave', function() {
                // ادامه انیمیشن خودکار و مخفی کردن تولتیپ
                this.classList.remove('active');
                this.querySelector('.highlight-tooltip').style.opacity = '0';
            });
        });
    }
    
    // === تایمر تخفیف ویژه ===
    function initCountdownTimer() {
        const daysElement = document.getElementById('timer-days');
        const hoursElement = document.getElementById('timer-hours');
        const minutesElement = document.getElementById('timer-minutes');
        const secondsElement = document.getElementById('timer-seconds');
        
        if (!daysElement || !hoursElement || !minutesElement || !secondsElement) return;
        
        // تاریخ پایان تخفیف (3 روز از الان)
        const now = new Date();
        const endDate = new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000));
        
        function updateCountdown() {
            const currentTime = new Date();
            const difference = endDate - currentTime;
            
            if (difference <= 0) {
                clearInterval(timerInterval);
                daysElement.textContent = '00';
                hoursElement.textContent = '00';
                minutesElement.textContent = '00';
                secondsElement.textContent = '00';
                return;
            }
            
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            daysElement.textContent = days < 10 ? '0' + days : days;
            hoursElement.textContent = hours < 10 ? '0' + hours : hours;
            minutesElement.textContent = minutes < 10 ? '0' + minutes : minutes;
            secondsElement.textContent = seconds < 10 ? '0' + seconds : seconds;
            
            // افزودن انیمیشن به المانی که تغییر می‌کند
            if (seconds % 10 === 0) {
                secondsElement.classList.add('pulse');
                setTimeout(() => {
                    secondsElement.classList.remove('pulse');
                }, 500);
            }
            
            if (seconds === 0 && minutes % 10 === 0) {
                minutesElement.classList.add('pulse');
                setTimeout(() => {
                    minutesElement.classList.remove('pulse');
                }, 500);
            }
            
            if (minutes === 0 && seconds === 0 && hours % 1 === 0) {
                hoursElement.classList.add('pulse');
                setTimeout(() => {
                    hoursElement.classList.remove('pulse');
                }, 500);
            }
        }
        
        // آپدیت اولیه
        updateCountdown();
        
        // آپدیت هر ثانیه
        const timerInterval = setInterval(updateCountdown, 1000);
    }
    
    // === نمایش سریع محصول ===
    function initQuickView() {
        const quickViewButtons = document.querySelectorAll('.product-action-btn.quick-view-btn');
        
        if (!quickViewButtons.length) return;
        
        quickViewButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const productId = this.getAttribute('data-product-id');
                openQuickViewModal(productId);
            });
        });
        
        // بستن مودال با دکمه بستن
        if (closeQuickView) {
            closeQuickView.addEventListener('click', function() {
                closeQuickViewModal();
            });
        }
        
        // باز کردن مودال نمایش سریع
        function openQuickViewModal(productId) {
            const quickViewContent = document.querySelector('.quick-view-content');
            
            if (!quickViewContent) return;
            
            // نمایش لودر
            quickViewContent.innerHTML = '<div class="product-loading"><div class="loader"></div></div>';
            
            // نمایش مودال
            modalBackdrop.classList.add('active');
            quickViewModal.classList.add('open');
            body.classList.add('no-scroll');
            
            // در حالت واقعی، اطلاعات محصول از سرور دریافت می‌شود
            setTimeout(() => {
                // شبیه‌سازی دریافت اطلاعات محصول
                fetchProductDetails(productId, quickViewContent);
            }, 800);
        }
        
        // بستن مودال نمایش سریع
        function closeQuickViewModal() {
            quickViewModal.classList.remove('open');
            modalBackdrop.classList.remove('active');
            body.classList.remove('no-scroll');
        }
        
        // شبیه‌سازی دریافت اطلاعات محصول
        function fetchProductDetails(productId, container) {
            // اطلاعات محصول نمونه (در حالت واقعی از سرور دریافت می‌شود)
            const products = {
                '1': {
                    name: 'کفش نایک ایر مکس 2025',
                    brand: 'نایک',
                    price: '2,380,000',
                    oldPrice: '2,980,000',
                    rating: 4.8,
                    reviews: 145,
                    description: 'کفش نایک ایر مکس با طراحی منحصر به فرد و تکنولوژی پیشرفته برای راحتی بیشتر پا. این کفش با استفاده از سیستم کوسن هوا در کف، ضربات وارده به پا را کاهش می‌دهد.',
                    colors: ['#000', '#1976d2', '#e53935'],
                    sizes: [39, 40, 41, 42, 43, 44, 45],
                    images: ['images/products/shoe1-1.webp', 'images/products/shoe1-2.webp', 'images/products/shoe1-3.webp']
                },
                '2': {
                    name: 'کفش آدیداس اولترابوست 24',
                    brand: 'آدیداس',
                    price: '3,850,000',
                    oldPrice: '',
                    rating: 4.9,
                    reviews: 312,
                    description: 'کفش ورزشی آدیداس اولترابوست با تکنولوژی Boost برای انرژی بیشتر در هر قدم. این کفش با رویه Primeknit به پا کاملاً می‌چسبد و تنفس هوا را تسهیل می‌کند.',
                    colors: ['#000', '#fff', '#43a047'],
                    sizes: [40, 41, 42, 43, 44, 45],
                    images: ['images/products/shoe2-1.webp', 'images/products/shoe2-2.webp', 'images/products/shoe2-3.webp']
                },
                '3': {
                    name: 'کفش پوما متریکس دوستدار محیط‌زیست',
                    brand: 'پوما',
                    price: '2,790,000',
                    oldPrice: '3,100,000',
                    rating: 4.7,
                    reviews: 89,
                    description: 'این کفش با استفاده از مواد بازیافتی و دوستدار محیط زیست تولید شده است. رویه سازگار با طبیعت و کفی ارگونومیک برای راحتی بیشتر در طول روز.',
                    colors: ['#43a047', '#757575', '#1976d2'],
                    sizes: [39, 40, 41, 42, 43, 44],
                    images: ['images/products/shoe3-1.webp', 'images/products/shoe3-2.webp', 'images/products/shoe3-3.webp']
                },
                '4': {
                    name: 'کفش هوشمند نایک ادپت 3.0',
                    brand: 'نایک',
                    price: '4,950,000',
                    oldPrice: '',
                    rating: 4.9,
                    reviews: 54,
                    description: 'نسل جدید کفش‌های هوشمند با قابلیت اتصال به گوشی هوشمند و تنظیم خودکار بندها. این کفش دارای سنسورهای فشار و شتاب‌سنج برای آنالیز دقیق حرکات پا است.',
                    colors: ['#000', '#795548'],
                    sizes: [40, 41, 42, 43, 44],
                    images: ['images/products/shoe4-1.webp', 'images/products/shoe4-2.webp', 'images/products/shoe4-3.webp']
                }
            };
            
            // اگر محصول موجود نباشد
            if (!products[productId]) {
                container.innerHTML = '<div class="error-message">محصول مورد نظر یافت نشد.</div>';
                return;
            }
            
            const product = products[productId];
            
            // ساخت HTML محصول
            let html = `
                <div class="quick-view-product">
                    <div class="product-gallery">
                        <div class="product-main-image">
                            <img src="${product.images[0]}" alt="${product.name}" id="main-image">
                        </div>
                        <div class="product-thumbnails">
            `;
            
            // تصاویر کوچک محصول
            product.images.forEach((image, index) => {
                html += `<div class="thumbnail${index === 0 ? ' active' : ''}" data-image="${image}"><img src="${image}" alt="${product.name}"></div>`;
            });
            
            html += `
                        </div>
                    </div>
                    <div class="product-details">
                        <div class="product-brand">${product.brand}</div>
                        <h2 class="product-title">${product.name}</h2>
                        <div class="product-rating">
                            <div class="stars">
                                <i class="ri-star-fill"></i>
                                <span>${product.rating}</span>
                            </div>
                            <span class="reviews">${product.reviews} نظر</span>
                        </div>
                        <div class="product-price">
            `;
            
            if (product.oldPrice) {
                html += `<span class="old-price">${product.oldPrice} تومان</span>`;
            }
            
            html += `
                            <span class="current-price">${product.price} تومان</span>
                        </div>
                        <p class="product-description">${product.description}</p>
                        <div class="product-options">
                            <div class="option-group">
                                <h4>رنگ:</h4>
                                <div class="color-options">
            `;
            
            // گزینه‌های رنگ
            product.colors.forEach(color => {
                let style = `background-color: ${color}`;
                if (color === '#fff' || color === '#ffffff') {
                    style += '; border: 1px solid #e1e1e1';
                }
                html += `<div class="color-option" style="${style}" data-color="${color}"></div>`;
            });
            
            html += `
                                </div>
                            </div>
                            <div class="option-group">
                                <h4>سایز:</h4>
                                <div class="size-options">
            `;
            
            // گزینه‌های سایز
            product.sizes.forEach(size => {
                html += `<div class="size-option" data-size="${size}">${size}</div>`;
            });
            
            html += `
                                </div>
                            </div>
                            <div class="product-quantity">
                                <h4>تعداد:</h4>
                                <div class="quantity-selector">
                                    <button class="quantity-btn minus">-</button>
                                    <input type="number" value="1" min="1" max="10">
                                    <button class="quantity-btn plus">+</button>
                                </div>
                            </div>
                        </div>
                        <div class="product-actions">
                            <button class="btn btn-primary add-to-cart-btn" data-product-id="${productId}">
                                <i class="ri-shopping-cart-line"></i>
                                <span>افزودن به سبد</span>
                            </button>
                            <button class="btn btn-outline wishlist-btn">
                                <i class="ri-heart-line"></i>
                                <span>افزودن به علاقه‌مندی‌ها</span>
                            </button>
                        </div>
                        <div class="product-meta">
                            <div class="meta-item"><span>شناسه:</span> SKU-${productId}${productId}${productId}</div>
                            <div class="meta-item"><span>دسته‌بندی:</span> کفش ورزشی</div>
                            <div class="meta-item"><span>برچسب‌ها:</span> کفش، ورزشی، دویدن</div>
                        </div>
                    </div>
                </div>
            `;
            
            // قرار دادن محتوا در مودال
            container.innerHTML = html;
            
            // اضافه کردن رویدادها به المان‌های داخل مودال
            initQuickViewEvents(container, productId);
        }
        
        // رویدادهای داخل مودال نمایش سریع
        function initQuickViewEvents(container, productId) {
            // تغییر تصویر اصلی با کلیک روی تصاویر کوچک
            const thumbnails = container.querySelectorAll('.thumbnail');
            const mainImage = container.querySelector('#main-image');
            
            if (thumbnails.length && mainImage) {
                thumbnails.forEach(thumbnail => {
                    thumbnail.addEventListener('click', function() {
                        const imageUrl = this.getAttribute('data-image');
                        mainImage.src = imageUrl;
                        
                        // حذف کلاس اکتیو از همه تصاویر کوچک
                        thumbnails.forEach(thumb => {
                            thumb.classList.remove('active');
                        });
                        
                        // افزودن کلاس اکتیو به تصویر انتخاب شده
                        this.classList.add('active');
                    });
                });
            }
            
            // انتخاب رنگ
            const colorOptions = container.querySelectorAll('.color-option');
            colorOptions.forEach(option => {
                option.addEventListener('click', function() {
                    colorOptions.forEach(opt => {
                        opt.classList.remove('active');
                    });
                    this.classList.add('active');
                });
            });
            
            // انتخاب سایز
            const sizeOptions = container.querySelectorAll('.size-option');
            sizeOptions.forEach(option => {
                option.addEventListener('click', function() {
                    sizeOptions.forEach(opt => {
                        opt.classList.remove('active');
                    });
                    this.classList.add('active');
                });
            });
            
                       // تغییر تعداد محصول
                       const minusBtn = container.querySelector('.quantity-btn.minus');
                       const plusBtn = container.querySelector('.quantity-btn.plus');
                       const quantityInput = container.querySelector('.quantity-selector input');
                       
                       if (minusBtn && plusBtn && quantityInput) {
                           minusBtn.addEventListener('click', function() {
                               if (parseInt(quantityInput.value) > 1) {
                                   quantityInput.value = parseInt(quantityInput.value) - 1;
                               }
                           });
                           
                           plusBtn.addEventListener('click', function() {
                               if (parseInt(quantityInput.value) < 10) {
                                   quantityInput.value = parseInt(quantityInput.value) + 1;
                               }
                           });
                           
                           quantityInput.addEventListener('change', function() {
                               if (parseInt(this.value) < 1) {
                                   this.value = 1;
                               } else if (parseInt(this.value) > 10) {
                                   this.value = 10;
                               }
                           });
                       }
                       
                       // افزودن به سبد خرید
                       const addToCartBtn = container.querySelector('.add-to-cart-btn');
                       if (addToCartBtn) {
                           addToCartBtn.addEventListener('click', function() {
                               const productName = container.querySelector('.product-title').textContent;
                               const selectedColor = container.querySelector('.color-option.active');
                               const selectedSize = container.querySelector('.size-option.active');
                               const quantity = parseInt(quantityInput.value);
                               
                               // بررسی انتخاب رنگ و سایز
                               if (!selectedColor) {
                                   showNotification('لطفاً رنگ محصول را انتخاب کنید', 'warning');
                                   return;
                               }
                               
                               if (!selectedSize) {
                                   showNotification('لطفاً سایز محصول را انتخاب کنید', 'warning');
                                   return;
                               }
                               
                               // افزودن به سبد خرید
                               addProductToCart(productName, productId, selectedColor.getAttribute('data-color'), selectedSize.getAttribute('data-size'), quantity);
                               
                               // بستن مودال
                               closeQuickViewModal();
                           });
                       }
                       
                       // افزودن به علاقه‌مندی‌ها
                       const wishlistBtn = container.querySelector('.wishlist-btn');
                       if (wishlistBtn) {
                           wishlistBtn.addEventListener('click', function() {
                               const productName = container.querySelector('.product-title').textContent;
                               showNotification(`${productName} به لیست علاقه‌مندی‌ها اضافه شد`, 'success');
                               
                               // تغییر آیکون دکمه
                               wishlistBtn.querySelector('i').className = 'ri-heart-fill';
                               wishlistBtn.classList.add('active');
                           });
                       }
                   }
                   
                   // افزودن محصول به سبد خرید
                   function addProductToCart(productName, productId, color, size, quantity) {
                       // در حالت واقعی این اطلاعات به سرور ارسال می‌شوند
                       console.log(`محصول "${productName}" با ID: ${productId}، رنگ: ${color}، سایز: ${size}، تعداد: ${quantity} به سبد خرید اضافه شد`);
                       
                       openCartDrawer();
                       showNotification(`${productName} به سبد خرید اضافه شد`, 'success');
                   }
               }
               
               // === واقعیت افزوده ===
               function initARExperience() {
                   const arViewButtons = document.querySelectorAll('.product-action-btn.ar-view-btn');
                   
                   if (!arViewButtons.length) return;
                   
                   arViewButtons.forEach(button => {
                       button.addEventListener('click', function(e) {
                           e.preventDefault();
                           e.stopPropagation();
                           
                           const productCard = this.closest('.product-card');
                           const productName = productCard ? productCard.querySelector('.product-name a').textContent : 'کفش';
                           const productImage = productCard ? productCard.querySelector('.product-image img').src : '';
                           
                           openARModal(productName, productImage);
                       });
                   });
                   
                   // بستن مودال با دکمه بستن
                   if (closeArModal) {
                       closeArModal.addEventListener('click', function() {
                           closeARModal();
                       });
                   }
                   
                   // باز کردن مودال واقعیت افزوده
                   function openARModal(productName, productImage) {
                       modalBackdrop.classList.add('active');
                       arModal.classList.add('open');
                       body.classList.add('no-scroll');
                       
                       // عنوان محصول در مودال
                       const arHeader = arModal.querySelector('.ar-header h3');
                       if (arHeader) {
                           arHeader.textContent = `مشاهده ${productName} با واقعیت افزوده`;
                       }
                       
                       // شبیه‌سازی بارگذاری مدل سه‌بعدی
                       simulateARLoading(productImage);
                   }
                   
                   // بستن مودال واقعیت افزوده
                   function closeARModal() {
                       arModal.classList.remove('open');
                       modalBackdrop.classList.remove('active');
                       body.classList.remove('no-scroll');
                   }
                   
                   // شبیه‌سازی بارگذاری واقعیت افزوده
                   function simulateARLoading(productImage) {
                       const arViewer = document.getElementById('ar-viewer');
                       
                       if (!arViewer) return;
                       
                       // نمایش لودر
                       arViewer.innerHTML = `
                           <div class="ar-loading">
                               <div class="spinner"></div>
                               <p>در حال بارگذاری مدل سه‌بعدی...</p>
                           </div>
                       `;
                       
                       // شبیه‌سازی بارگذاری
                       setTimeout(() => {
                           // در یک پروژه واقعی، اینجا مدل سه‌بعدی WebXR بارگذاری می‌شود
                           arViewer.innerHTML = `
                               <div class="ar-model-placeholder">
                                   <div class="ar-model-image">
                                       <img src="${productImage || 'images/ar-model.webp'}" alt="مدل سه بعدی کفش">
                                       <div class="ar-model-overlay">
                                           <p>دوربین خود را به سمت زمین یا پای خود بگیرید</p>
                                           <div class="ar-scan-animation"></div>
                                       </div>
                                   </div>
                               </div>
                           `;
                           
                           // اضافه کردن رویدادها به دکمه‌های کنترل AR
                           initARControls();
                       }, 2000);
                   }
                   
                   // رویدادهای کنترل‌های AR
                   function initARControls() {
                       const arControlButtons = document.querySelectorAll('.ar-control-btn');
                       
                       arControlButtons.forEach(button => {
                           button.addEventListener('click', function() {
                               const action = this.getAttribute('aria-label');
                               showNotification(`عملیات ${action} انجام شد`, 'info');
                               
                               // فعال کردن دکمه
                               arControlButtons.forEach(btn => btn.classList.remove('active'));
                               this.classList.add('active');
                           });
                       });
                   }
               }
               
               // === انیمیشن‌های اسکرول ===
               function initScrollAnimations() {
                   // انتخاب المان‌هایی که باید انیمیشن داشته باشند
                   const animateElements = document.querySelectorAll(
                       '.section-header, .feature-card, .category-card, ' +
                       '.product-card, .special-offer-wrapper, .smart-feature-item, ' +
                       '.ai-product-card, .testimonial-card, .blog-card, .info-card, ' +
                       '.footer-logo, .footer-nav-column'
                   );
                   
                   if (!animateElements.length) return;
                   
                   // بررسی قابلیت پشتیبانی از Intersection Observer
                   if ('IntersectionObserver' in window &&
                       !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                       
                       const observer = new IntersectionObserver((entries) => {
                           entries.forEach(entry => {
                               if (entry.isIntersecting) {
                                   entry.target.classList.add('animate');
                                   observer.unobserve(entry.target);
                               }
                           });
                       }, {
                           root: null,
                           threshold: 0.1,
                           rootMargin: '0px 0px -100px 0px'
                       });
                       
                       animateElements.forEach((element, index) => {
                           // اضافه کردن تأخیر متفاوت به هر المان
                           element.style.transitionDelay = `${index % 5 * 0.1}s`;
                           element.classList.add('animate-on-scroll');
                           observer.observe(element);
                       });
                   } else {
                       // پشتیبانی از مرورگرهای قدیمی که Intersection Observer را پشتیبانی نمی‌کنند
                       // یا کاربرانی که انیمیشن را کاهش داده‌اند
                       animateElements.forEach(element => {
                           element.classList.add('animate');
                       });
                   }
               }
               
               // === تغییر رنگ هدر هنگام اسکرول ===
               function initStickyHeader() {
                   if (!header) return;
                   
                   let lastScrollTop = 0;
                   const scrollThreshold = 100; // آستانه اسکرول برای تغییر حالت هدر
                   
                   window.addEventListener('scroll', function() {
                       const currentScrollTop = window.scrollY;
                       
                       // تغییر حالت هدر بر اساس جهت اسکرول
                       if (currentScrollTop > scrollThreshold) {
                           header.classList.add('scrolled');
                           
                           // مخفی کردن هدر هنگام اسکرول به پایین و نمایش آن هنگام اسکرول به بالا
                           if (currentScrollTop > lastScrollTop && currentScrollTop > 300) {
                               header.classList.add('hidden');
                           } else {
                               header.classList.remove('hidden');
                           }
                       } else {
                           header.classList.remove('scrolled');
                           header.classList.remove('hidden');
                       }
                       
                       lastScrollTop = currentScrollTop;
                   });
               }
               
               // === تم تاریک ===
               function initDarkMode() {
                   const darkModeToggle = document.createElement('button');
                   darkModeToggle.className = 'dark-mode-toggle';
                   darkModeToggle.setAttribute('aria-label', 'تغییر حالت روشن/تاریک');
                   darkModeToggle.innerHTML = '<i class="ri-moon-line"></i>';
                   document.body.appendChild(darkModeToggle);
                   
                   // بررسی تنظیمات ذخیره شده کاربر
                   const savedTheme = localStorage.getItem('theme');
                   if (savedTheme === 'dark' || (savedTheme === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                       document.body.classList.add('dark-theme');
                       darkModeToggle.innerHTML = '<i class="ri-sun-line"></i>';
                   }
                   
                   // تغییر تم با کلیک روی دکمه
                   darkModeToggle.addEventListener('click', function() {
                       if (document.body.classList.contains('dark-theme')) {
                           document.body.classList.remove('dark-theme');
                           localStorage.setItem('theme', 'light');
                           darkModeToggle.innerHTML = '<i class="ri-moon-line"></i>';
                       } else {
                           document.body.classList.add('dark-theme');
                           localStorage.setItem('theme', 'dark');
                           darkModeToggle.innerHTML = '<i class="ri-sun-line"></i>';
                       }
                   });
                   
                   // پاسخگویی به تغییرات سیستمی تم
                   window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                       if (localStorage.getItem('theme') === null) {
                           if (e.matches) {
                               document.body.classList.add('dark-theme');
                               darkModeToggle.innerHTML = '<i class="ri-sun-line"></i>';
                           } else {
                               document.body.classList.remove('dark-theme');
                               darkModeToggle.innerHTML = '<i class="ri-moon-line"></i>';
                           }
                       }
                   });
               }
               
               // === دکمه بازگشت به بالا ===
               function addBackToTopButton() {
                   const backToTopButton = document.createElement('button');
                   backToTopButton.className = 'back-to-top';
                   backToTopButton.innerHTML = '<i class="ri-arrow-up-line"></i>';
                   backToTopButton.setAttribute('aria-label', 'بازگشت به بالای صفحه');
                   document.body.appendChild(backToTopButton);
                   
                   backToTopButton.addEventListener('click', function() {
                       window.scrollTo({
                           top: 0,
                           behavior: 'smooth'
                       });
                   });
                   
                   // نمایش دکمه بعد از اسکرول
                   window.addEventListener('scroll', function() {
                       if (window.scrollY > 300) {
                           backToTopButton.classList.add('visible');
                       } else {
                           backToTopButton.classList.remove('visible');
                       }
                   });
               }
               
               // === دسترسی‌پذیری ===
               function initAccessibility() {
                   // اضافه کردن اسکیپ لینک برای دسترسی‌پذیری
                   const skipLink = document.createElement('a');
                   skipLink.href = '#main';
                   skipLink.className = 'skip-link';
                   skipLink.textContent = 'رفتن به محتوای اصلی';
                   document.body.insertBefore(skipLink, document.body.firstChild);
                   
                   // بررسی وجود لندمارک‌های مهم
                   if (!document.querySelector('main')) {
                       console.warn('تگ main در صفحه یافت نشد. برای دسترسی‌پذیری بهتر، از تگ main استفاده کنید.');
                   }
                   
                   // افزودن ویژگی‌های ARIA به عناصر تعاملی بدون آن
                   document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])').forEach(button => {
                       if (!button.textContent.trim() && !button.title) {
                           console.warn('دکمه بدون متن و بدون ویژگی aria-label یا title یافت شد:', button);
                       }
                   });
               }
               
               // === عملکردهای مرتبط با پروفایل کاربر ===
               if (profileToggle) {
                   profileToggle.addEventListener('click', function(e) {
                       e.preventDefault();
                       e.stopPropagation();
                       
                       // نمایش/مخفی کردن منوی پروفایل
                       this.classList.toggle('active');
                       showNotification('این قابلیت در نسخه دمو غیرفعال است', 'info');
                   });
               }
               
               // === رویدادهای کلیک روی پس‌زمینه مودال‌ها ===
               if (modalBackdrop) {
                   modalBackdrop.addEventListener('click', function() {
                       // بستن همه مودال‌ها
                       closeAllModals();
                   });
               }
               
               // تابع بستن همه مودال‌ها
               function closeAllModals() {
                   if (mobileMenu) {
                       mobileMenu.classList.remove('open');
                   }
                   
                   if (searchOverlay) {
                       searchOverlay.classList.remove('open');
                   }
                   
                   if (cartDrawer) {
                       cartDrawer.classList.remove('open');
                   }
                   
                   if (quickViewModal) {
                       quickViewModal.classList.remove('open');
                   }
                   
                   if (arModal) {
                       arModal.classList.remove('open');
                   }
                   
                   modalBackdrop.classList.remove('active');
                   body.classList.remove('no-scroll');
               }
               
               // === نمایش اعلان (Toast) ===
               function showNotification(message, type = 'info') {
                   // حذف اعلان‌های قبلی
                   const existingToasts = document.querySelectorAll('.notification');
                   existingToasts.forEach(toast => {
                       toast.remove();
                   });
                   
                   // ایجاد کانتینر اعلان‌ها اگر وجود ندارد
                   let notificationsContainer = document.querySelector('.notifications-container');
                   if (!notificationsContainer) {
                       notificationsContainer = document.createElement('div');
                       notificationsContainer.className = 'notifications-container';
                       document.body.appendChild(notificationsContainer);
                   }
                   
                   // ایجاد اعلان جدید
                   const notification = document.createElement('div');
                   notification.className = `notification ${type}`;
                   
                   // آیکون متناسب با نوع اعلان
                   let icon = '';
                   switch (type) {
                       case 'success':
                           icon = '<i class="ri-check-line"></i>';
                           break;
                       case 'error':
                           icon = '<i class="ri-error-warning-line"></i>';
                           break;
                       case 'warning':
                           icon = '<i class="ri-alert-line"></i>';
                           break;
                       default:
                           icon = '<i class="ri-information-line"></i>';
                   }
                   
                   notification.innerHTML = `
                       ${icon}
                       <p>${message}</p>
                       <button class="notification-close" aria-label="بستن اعلان">
                           <i class="ri-close-line"></i>
                       </button>
                   `;
                   
                   // افزودن به کانتینر
                   notificationsContainer.appendChild(notification);
                   
                   // نمایش اعلان با تأخیر
                   setTimeout(() => {
                       notification.classList.add('show');
                   }, 10);
                   
                   // دکمه بستن اعلان
                   const closeButton = notification.querySelector('.notification-close');
                   closeButton.addEventListener('click', function() {
                       hideNotification(notification);
                   });
                   
                   // مخفی کردن خودکار اعلان بعد از 4 ثانیه
                   setTimeout(() => {
                       hideNotification(notification);
                   }, 4000);
               }
               
               // مخفی کردن اعلان
               function hideNotification(notification) {
                   notification.classList.remove('show');
                   
                   setTimeout(() => {
                       notification.remove();
                   }, 300);
               }
               
               // === ثبت سرویس ورکر ===
               if ('serviceWorker' in navigator) {
                   window.addEventListener('load', () => {
                       navigator.serviceWorker.register('/service-worker.js')
                           .then(registration => {
                               console.log('سرویس ورکر با موفقیت ثبت شد:', registration.scope);
                           })
                           .catch(error => {
                               console.error('خطا در ثبت سرویس ورکر:', error);
                           });
                   });
               }
           
           })();
           
           /**
            * سرویس ورکر برای حالت آفلاین
            * این کد باید در فایل جداگانه ای به نام service-worker.js قرار گیرد
            */
           /*
           const CACHE_NAME = 'amiristor-cache-v1';
           const urlsToCache = [
               '/',
               '/index.html',
               '/style.css',
               '/js/main.js',
               '/fonts/vazirmatn.woff2',
               '/images/logo.svg',
               '/images/logo-white.svg',
               '/images/hero-shoe1.webp',
               '/images/hero-ar.webp',
               '/images/hero-smart-fit.webp',
               '/images/products/shoe1.webp',
               '/images/products/shoe2.webp',
               '/images/products/shoe3.webp',
               '/images/products/shoe4.webp',
               '/offline.html'
           ];
           
           self.addEventListener('install', event => {
               event.waitUntil(
                   caches.open(CACHE_NAME)
                       .then(cache => {
                           console.log('کش باز شد');
                           return cache.addAll(urlsToCache);
                       })
               );
           });
           
           self.addEventListener('fetch', event => {
               event.respondWith(
                   caches.match(event.request)
                       .then(response => {
                           if (response) {
                               return response;
                           }
                           
                           return fetch(event.request).then(
                               response => {
                                   if (!response || response.status !== 200 || response.type !== 'basic') {
                                       return response;
                                   }
                                   
                                   const responseToCache = response.clone();
                                   
                                   caches.open(CACHE_NAME)
                                       .then(cache => {
                                           cache.put(event.request, responseToCache);
                                       });
                                   
                                   return response;
                               }
                           ).catch(() => {
                               // بازگشت به صفحه آفلاین در صورت عدم دسترسی به شبکه
                               if (event.request.mode === 'navigate') {
                                   return caches.match('/offline.html');
                               }
                           });
                       })
               );
           });
           
           self.addEventListener('activate', event => {
               const cacheWhitelist = [CACHE_NAME];
               
               event.waitUntil(
                   caches.keys().then(cacheNames => {
                       return Promise.all(
                           cacheNames.map(cacheName => {
                               if (cacheWhitelist.indexOf(cacheName) === -1) {
                                   return caches.delete(cacheName);
                               }
                           })
                       );
                   })
               );
           });
           */
          // عملکرد سبد خرید
function initCartFunctionality() {
    // دکمه‌های افزودن به سبد خرید
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const quickAddButtons = document.querySelectorAll('.ai-quick-add');
    const cartCountBadge = document.querySelector('.badge');
    const cartItems = document.querySelector('.cart-items');
    const cartTotalElement = document.querySelector('.summary-row.total span:last-child');
    const cartEmpty = '<div class="empty-cart">سبد خرید شما خالی است</div>';
    
    // مقداردهی اولیه سبد خرید
    if (cartItems) {
        cartItems.innerHTML = cartEmpty;
    }
    
    // بروزرسانی شمارنده سبد خرید
    if (cartCountBadge) {
        cartCountBadge.textContent = "0";
        cartCountBadge.style.display = "none";
    }
    
    // بروزرسانی مجموع قیمت
    if (cartTotalElement) {
        cartTotalElement.textContent = "0 تومان";
    }
    
    // دکمه‌های افزودن محصول به سبد
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            if (!productCard) return;
            
            const productName = productCard.querySelector('.product-name a').textContent;
            const productId = this.getAttribute('data-product-id') || '0';
            const productImage = productCard.querySelector('.product-image img').src;
            const productPrice = productCard.querySelector('.product-price .current-price').textContent;
            
            addToCart(productName, productId, productImage, productPrice);
            button.classList.add('added');
            
            // تغییر متن دکمه
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="ri-check-line"></i><span>اضافه شد</span>';
            
            // بازگشت به حالت اولیه پس از 2 ثانیه
            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('added');
            }, 2000);
        });
    });
    
    // دکمه‌های افزودن سریع
    quickAddButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.ai-product-card');
            if (!productCard) return;
            
            const productName = productCard.querySelector('.ai-product-name').textContent;
            const productPrice = productCard.querySelector('.ai-product-price').textContent;
            const productImage = productCard.querySelector('.ai-product-image img').src;
            
            addToCart(productName, 'quick-' + Math.floor(Math.random() * 1000), productImage, productPrice);
            button.classList.add('added');
            button.textContent = 'اضافه شد!';
            
            // بازگشت به حالت اولیه پس از 2 ثانیه
            setTimeout(() => {
                button.textContent = 'افزودن سریع';
                button.classList.remove('added');
            }, 2000);
        });
    });
    
    // افزودن محصول پیشنهادی به سبد خرید
    const addSuggestionButtons = document.querySelectorAll('.add-suggestion');
    addSuggestionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const suggestionItem = this.closest('.suggestion-item');
            if (!suggestionItem) return;
            
            const productName = suggestionItem.querySelector('h5').textContent;
            const productPrice = suggestionItem.querySelector('.suggestion-price').textContent;
            const productImage = suggestionItem.querySelector('img').src;
            
            addToCart(productName, 'suggestion-' + Math.floor(Math.random() * 1000), productImage, productPrice, true);
            button.classList.add('added');
            
            // بازگشت به حالت اولیه پس از 2 ثانیه
            setTimeout(() => {
                button.classList.remove('added');
            }, 2000);
        });
    });
    
    // افزودن محصول به سبد خرید
    function addToCart(productName, productId, productImage, productPrice, isSuggestion = false) {
        // افزایش شمارنده سبد خرید
        updateCartCount(1);
        
        // اگر سبد خرید خالی است، محتوای خالی را پاک کن
        if (cartItems.querySelector('.empty-cart')) {
            cartItems.innerHTML = '';
        }
        
        // ایجاد آیتم جدید سبد خرید
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.setAttribute('data-product-id', productId);
        cartItemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${productImage}" alt="${productName}">
            </div>
            <div class="cart-item-content">
                <div class="cart-item-top">
                    <h4 class="cart-item-name">${productName}</h4>
                    <button class="remove-item">
                        <i class="ri-delete-bin-6-line"></i>
                    </button>
                </div>
                <div class="cart-item-meta">
                    <span class="cart-item-variant">سایز: متوسط | رنگ: مشکی</span>
                </div>
                <div class="cart-item-bottom">
                    <div class="item-quantity">
                        <button class="quantity-btn minus">-</button>
                        <input type="number" value="1" min="1" max="10">
                        <button class="quantity-btn plus">+</button>
                    </div>
                    <div class="cart-item-price">${productPrice}</div>
                </div>
            </div>
        `;
        
        // افزودن به سبد خرید
        cartItems.appendChild(cartItemElement);
        
        // اضافه کردن رویدادهای دکمه‌های تعداد و حذف
        attachCartItemEvents(cartItemElement);
        
        // بروزرسانی مجموع قیمت‌ها
        updateCartTotals();
        
        // باز کردن سبد خرید
        openCartDrawer();
        
        // نمایش اعلان
        const message = isSuggestion ? 
            `${productName} به سبد خرید اضافه شد` : 
            'محصول به سبد خرید اضافه شد';
        
        showNotification(message, 'success');
    }
    
    // اضافه کردن رویدادها به آیتم سبد خرید
    function attachCartItemEvents(cartItem) {
        // دکمه افزایش تعداد
        const plusBtn = cartItem.querySelector('.quantity-btn.plus');
        if (plusBtn) {
            plusBtn.addEventListener('click', function() {
                const input = this.parentNode.querySelector('input');
                if (!input) return;
                
                if (parseInt(input.value) < 10) {
                    input.value = parseInt(input.value) + 1;
                    updateCartTotals();
                }
            });
        }
        
        // دکمه کاهش تعداد
        const minusBtn = cartItem.querySelector('.quantity-btn.minus');
        if (minusBtn) {
            minusBtn.addEventListener('click', function() {
                const input = this.parentNode.querySelector('input');
                if (!input) return;
                
                if (parseInt(input.value) > 1) {
                    input.value = parseInt(input.value) - 1;
                    updateCartTotals();
                }
            });
        }
        
        // دکمه حذف محصول
        const removeBtn = cartItem.querySelector('.remove-item');
        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                cartItem.classList.add('removing');
                
                setTimeout(() => {
                    cartItem.remove();
                    updateCartCount(-1);
                    updateCartTotals();
                    
                    // اگر سبد خرید خالی شد، نمایش پیام
                    if (cartItems.children.length === 0) {
                        cartItems.innerHTML = cartEmpty;
                    }
                    
                    showNotification('محصول از سبد خرید حذف شد', 'success');
                }, 300);
            });
        }
    }
    
    // بروزرسانی شمارنده سبد خرید
    function updateCartCount(increment = 0) {
        if (cartCountBadge) {
            let currentCount = parseInt(cartCountBadge.textContent);
            currentCount += increment;
            cartCountBadge.textContent = currentCount;
            
            // نمایش یا مخفی کردن بج بر اساس تعداد
            if (currentCount > 0) {
                cartCountBadge.style.display = "flex";
            } else {
                cartCountBadge.style.display = "none";
            }
        }
    }
    
    // بروزرسانی مجموع قیمت‌ها
    function updateCartTotals() {
        if (!cartTotalElement) return;
        
        const cartItems = document.querySelectorAll('.cart-item');
        
        // اگر سبد خرید خالی است
        if (cartItems.length === 0) {
            cartTotalElement.textContent = "0 تومان";
            return;
        }
        
        let total = 0;
        
        cartItems.forEach(item => {
            const priceText = item.querySelector('.cart-item-price').textContent;
            const quantity = parseInt(item.querySelector('.item-quantity input').value);
            
            // استخراج عدد از متن قیمت (حذف تومان و کاما)
            const price = parseInt(priceText.replace(/[^\d]/g, ''));
            
            total += price * quantity;
        });
        
        // نمایش مجموع با فرمت هزارگان
        cartTotalElement.textContent = numberWithCommas(total) + ' تومان';
    }
    
    // تبدیل اعداد به فرمت هزارگان
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
// عملکرد سبد خرید
function initCartFunctionality() {
    // متغیرهای سبد خرید
    const cartToggle = document.getElementById('cart-toggle');
    const cartDrawer = document.getElementById('cart-drawer');
    const closeCart = document.getElementById('close-cart');
    const continueShopping = document.getElementById('continue-shopping');
    const cartItems = document.querySelector('.cart-items');
    const cartCountBadge = document.querySelector('.badge');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    // دکمه‌های افزودن به سبد
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const addSuggestionButtons = document.querySelectorAll('.add-suggestion');
    const quickAddButtons = document.querySelectorAll('.ai-quick-add');
    
    // مقداردهی اولیه سبد خرید
    let cartItemCount = 0;
    updateCartBadge();
    
    // باز کردن و بستن سبد خرید
    if (cartToggle) {
        cartToggle.addEventListener('click', function() {
            openCartDrawer();
        });
    }
    
    if (closeCart) {
        closeCart.addEventListener('click', function() {
            closeCartDrawer();
        });
    }
    
    if (continueShopping) {
        continueShopping.addEventListener('click', function() {
            closeCartDrawer();
        });
    }
    
    // دکمه‌های افزودن به سبد خرید
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            if (!productCard) return;
            
            const productId = this.getAttribute('data-product-id') || '0';
            const productName = productCard.querySelector('.product-name a').textContent;
            const productImage = productCard.querySelector('.product-image img').src;
            const productPrice = productCard.querySelector('.current-price').textContent;
            
            addToCart(productName, productId, productImage, productPrice);
            
            // نمایش بازخورد
            showAddFeedback(button);
        });
    });
    
    // دکمه‌های افزودن پیشنهاد ویژه
    addSuggestionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const suggestionItem = this.closest('.suggestion-item');
            if (!suggestionItem) return;
            
            const productName = suggestionItem.querySelector('h5').textContent;
            const productImage = suggestionItem.querySelector('img').src;
            const productPrice = suggestionItem.querySelector('.suggestion-price').textContent;
            
            addToCart(productName, 'suggestion-' + Date.now(), productImage, productPrice);
            
            // نمایش بازخورد
            showAddFeedback(button);
        });
    });
    
    // دکمه‌های افزودن سریع
    if (quickAddButtons.length) {
        quickAddButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productCard = this.closest('.ai-product-card');
                if (!productCard) return;
                
                const productName = productCard.querySelector('.ai-product-name').textContent;
                const productImage = productCard.querySelector('.ai-product-image img').src;
                const productPrice = productCard.querySelector('.ai-product-price').textContent;
                
                addToCart(productName, 'ai-' + Date.now(), productImage, productPrice);
                
                // نمایش بازخورد
                showAddFeedback(button, 'افزودن سریع');
            });
        });
    }
    
    // نمایش بازخورد افزودن محصول
    function showAddFeedback(button, originalText) {
        const btnText = originalText || button.innerHTML;
        button.classList.add('added');
        
        if (button.tagName === 'BUTTON') {
            button.innerHTML = '<i class="ri-check-line"></i><span>اضافه شد</span>';
        }
        
        setTimeout(() => {
            button.classList.remove('added');
            if (button.tagName === 'BUTTON') {
                button.innerHTML = btnText;
            }
        }, 2000);
    }
    
    // اضافه کردن محصول به سبد خرید
    function addToCart(productName, productId, productImage, productPrice) {
        // حذف پیام سبد خالی
        if (cartItems.querySelector('.empty-cart')) {
            cartItems.innerHTML = '';
        }
        
        // ایجاد المان محصول
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.setAttribute('data-product-id', productId);
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${productImage}" alt="${productName}">
            </div>
            <div class="cart-item-content">
                <div class="cart-item-top">
                    <h4 class="cart-item-name">${productName}</h4>
                    <button class="remove-item">
                        <i class="ri-delete-bin-6-line"></i>
                    </button>
                </div>
                <div class="cart-item-meta">
                    <span class="cart-item-variant">سایز: متوسط | رنگ: مشکی</span>
                </div>
                <div class="cart-item-bottom">
                    <div class="item-quantity">
                        <button class="quantity-btn minus">-</button>
                        <input type="number" value="1" min="1" max="10">
                        <button class="quantity-btn plus">+</button>
                    </div>
                    <div class="cart-item-price">${productPrice}</div>
                </div>
            </div>
        `;
        
        // افزودن به سبد خرید
        cartItems.appendChild(cartItem);
        
        // افزایش شمارنده
        cartItemCount++;
        updateCartBadge();
        
        // بروزرسانی قیمت‌ها
        updateCartTotals();
        
        // فعال‌سازی دکمه پرداخت
        checkoutBtn.removeAttribute('disabled');
        
        // نمایش سبد خرید
        openCartDrawer();
        
        // نمایش اعلان
        showNotification(`${productName} به سبد خرید اضافه شد`, 'success');
        
        // اضافه کردن رویدادها به دکمه‌های آیتم
        initCartItemEvents(cartItem);
    }
    
    // اضافه کردن رویدادها به آیتم‌های سبد خرید
    function initCartItemEvents(cartItem) {
        // دکمه حذف
        const removeButton = cartItem.querySelector('.remove-item');
        if (removeButton) {
            removeButton.addEventListener('click', function() {
                cartItem.classList.add('removing');
                
                setTimeout(() => {
                    cartItem.remove();
                    cartItemCount--;
                    updateCartBadge();
                    updateCartTotals();
                    
                    // اگر سبد خالی شد
                    if (cartItemCount === 0) {
                        cartItems.innerHTML = '<div class="empty-cart">سبد خرید شما خالی است</div>';
                        checkoutBtn.setAttribute('disabled', 'disabled');
                    }
                    
                    showNotification('محصول از سبد خرید حذف شد', 'success');
                }, 300);
            });
        }
        
        // دکمه‌های تغییر تعداد
        const minusButton = cartItem.querySelector('.quantity-btn.minus');
        const plusButton = cartItem.querySelector('.quantity-btn.plus');
        const quantityInput = cartItem.querySelector('.item-quantity input');
        
        if (minusButton && quantityInput) {
            minusButton.addEventListener('click', function() {
                if (parseInt(quantityInput.value) > 1) {
                    quantityInput.value = parseInt(quantityInput.value) - 1;
                    updateCartTotals();
                }
            });
        }
        
        if (plusButton && quantityInput) {
            plusButton.addEventListener('click', function() {
                if (parseInt(quantityInput.value) < 10) {
                    quantityInput.value = parseInt(quantityInput.value) + 1;
                    updateCartTotals();
                }
            });
        }
        
        if (quantityInput) {
            quantityInput.addEventListener('change', function() {
                if (parseInt(this.value) < 1) {
                    this.value = 1;
                } else if (parseInt(this.value) > 10) {
                    this.value = 10;
                }
                updateCartTotals();
            });
        }
    }
    
    // بروزرسانی نشانگر تعداد سبد خرید
    function updateCartBadge() {
        if (cartCountBadge) {
            cartCountBadge.textContent = cartItemCount;
            
            if (cartItemCount > 0) {
                cartCountBadge.style.display = 'flex';
            } else {
                cartCountBadge.style.display = 'none';
            }
        }
    }
    
    // بروزرسانی قیمت‌های سبد خرید
    function updateCartTotals() {
        const cartItemElements = document.querySelectorAll('.cart-item');
        const totalPriceElement = document.querySelector('.summary-row:first-child span:last-child');
        const discountElement = document.querySelector('.discount-value');
        const finalPriceElement = document.querySelector('.summary-row.total span:last-child');
        
        if (!totalPriceElement || !finalPriceElement) return;
        
        // اگر سبد خالی است
        if (cartItemElements.length === 0) {
            totalPriceElement.textContent = '0 تومان';
            discountElement.textContent = '0 تومان';
            finalPriceElement.textContent = '0 تومان';
            return;
        }
        
        // محاسبه قیمت کل
        let totalPrice = 0;
        
        cartItemElements.forEach(item => {
            const priceText = item.querySelector('.cart-item-price').textContent;
            const quantity = parseInt(item.querySelector('.item-quantity input').value);
            
            // استخراج عدد از متن قیمت
            const price = parseInt(priceText.replace(/[^\d]/g, ''));
            
            totalPrice += price * quantity;
        });
        
        // محاسبه تخفیف (برای مثال 10%)
        const discount = Math.round(totalPrice * 0.1);
        const finalPrice = totalPrice - discount;
        
        // بروزرسانی نمایش قیمت‌ها
        totalPriceElement.textContent = formatPrice(totalPrice) + ' تومان';
        discountElement.textContent = formatPrice(discount) + ' تومان';
        finalPriceElement.textContent = formatPrice(finalPrice) + ' تومان';
    }
    
    // فرمت‌دهی قیمت با جداکننده هزارگان
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    // باز کردن سبد خرید
    function openCartDrawer() {
        if (cartDrawer) {
            cartDrawer.classList.add('open');
            document.body.classList.add('no-scroll');
            document.getElementById('modal-backdrop').classList.add('active');
        }
    }
    
    // بستن سبد خرید
    function closeCartDrawer() {
        if (cartDrawer) {
            cartDrawer.classList.remove('open');
            document.body.classList.remove('no-scroll');
            document.getElementById('modal-backdrop').classList.remove('active');
        }
    }
    
    // نمایش اعلان
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        notification.innerHTML = `
            <i class="ri-${type === 'success' ? 'check-line' : type === 'error' ? 'error-warning-line' : 'information-line'}"></i>
            <p>${message}</p>
            <button class="notification-close"><i class="ri-close-line"></i></button>
        `;
        
        // افزودن به صفحه
        document.body.appendChild(notification);
        
        // نمایش با تأخیر
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // مخفی کردن پس از مدتی
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
        
        // دکمه بستن
        const closeButton = notification.querySelector('.notification-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            });
        }
    }
}

// فراخوانی تابع راه‌اندازی سبد خرید
document.addEventListener('DOMContentLoaded', initCartFunctionality);
/**
 * سیستم مدیریت سبد خرید
 * نسخه 2.0
 */
(function() {
    'use strict';
    
    // متغیرهای عمومی
    const cartToggle = document.getElementById('cart-toggle');
    const cartDrawer = document.getElementById('cart-drawer');
    const closeCart = document.getElementById('close-cart');
    const continueShopping = document.getElementById('continue-shopping');
    const cartItems = document.querySelector('.cart-items');
    const cartCountBadge = document.querySelector('.badge');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const modalBackdrop = document.getElementById('modal-backdrop');
    
    // دکمه‌های افزودن به سبد
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const addSuggestionButtons = document.querySelectorAll('.add-suggestion');
    const aiQuickAddButtons = document.querySelectorAll('.ai-quick-add');
    
    // اطلاعات سبد خرید
    let cart = [];
    
    // بررسی وجود سبد خرید در localStorage
    function initCart() {
        const savedCart = localStorage.getItem('amiristor_cart');
        if (savedCart) {
            try {
                cart = JSON.parse(savedCart);
                renderCart();
            } catch (e) {
                console.error('خطا در بازیابی سبد خرید:', e);
                cart = [];
            }
        } else {
            showEmptyCart();
        }
        
        updateCartBadge();
    }
    
    // نمایش حالت سبد خالی
    function showEmptyCart() {
        if (!cartItems) return;
        
        cartItems.innerHTML = '<div class="empty-cart">سبد خرید شما خالی است</div>';
        
        // غیرفعال کردن دکمه پرداخت
        if (checkoutBtn) {
            checkoutBtn.setAttribute('disabled', 'disabled');
        }
        
        // صفر کردن مبالغ
        updateCartTotals();
    }
    
    // بروزرسانی نشانگر تعداد سبد خرید
    function updateCartBadge() {
        if (!cartCountBadge) return;
        
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        
        cartCountBadge.textContent = totalItems;
        
        if (totalItems > 0) {
            cartCountBadge.style.display = 'flex';
        } else {
            cartCountBadge.style.display = 'none';
        }
    }
    
    // نمایش سبد خرید
    function renderCart() {
        if (!cartItems) return;
        
        if (cart.length === 0) {
            showEmptyCart();
            return;
        }
        
        let cartHTML = '';
        
        cart.forEach(item => {
            cartHTML += `
                <div class="cart-item" data-product-id="${item.id}">
                    <div class="cart-item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-content">
                        <div class="cart-item-top">
                            <h4 class="cart-item-name">${item.name}</h4>
                            <button class="remove-item" data-product-id="${item.id}">
                                <i class="ri-delete-bin-6-line"></i>
                            </button>
                        </div>
                        <div class="cart-item-meta">
                            <span class="cart-item-variant">سایز: ${item.size || 'متوسط'} | رنگ: ${item.color || 'مشکی'}</span>
                        </div>
                        <div class="cart-item-bottom">
                            <div class="item-quantity">
                                <button class="quantity-btn minus" data-product-id="${item.id}">-</button>
                                <input type="number" value="${item.quantity}" min="1" max="10" data-product-id="${item.id}">
                                <button class="quantity-btn plus" data-product-id="${item.id}">+</button>
                            </div>
                            <div class="cart-item-price">${formatPrice(item.price)} تومان</div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        cartItems.innerHTML = cartHTML;
        
        // فعال‌سازی دکمه پرداخت
        if (checkoutBtn) {
            checkoutBtn.removeAttribute('disabled');
        }
        
        // اضافه کردن رویدادها به دکمه‌ها
        attachCartItemEvents();
        
        // بروزرسانی قیمت‌ها
        updateCartTotals();
    }
    
    // اضافه کردن رویدادها به آیتم‌های سبد خرید
    function attachCartItemEvents() {
        // دکمه‌های حذف
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-product-id');
                const cartItem = this.closest('.cart-item');
                
                // انیمیشن حذف
                cartItem.classList.add('removing');
                
                setTimeout(() => {
                    // حذف از آرایه سبد خرید
                    cart = cart.filter(item => item.id !== productId);
                    
                    // ذخیره در localStorage
                    saveCart();
                    
                    // بروزرسانی نمایش
                    renderCart();
                    updateCartBadge();
                    
                    // نمایش اعلان
                    showNotification('محصول از سبد خرید حذف شد', 'success');
                }, 300);
            });
        });
        
        // دکمه‌های کاهش تعداد
        const minusButtons = document.querySelectorAll('.quantity-btn.minus');
        minusButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-product-id');
                const product = cart.find(item => item.id === productId);
                
                if (product && product.quantity > 1) {
                    product.quantity--;
                    
                    // بروزرسانی ورودی تعداد
                    const input = this.parentNode.querySelector('input');
                    if (input) {
                        input.value = product.quantity;
                    }
                    
                    // ذخیره در localStorage
                    saveCart();
                    
                    // بروزرسانی نمایش
                    updateCartBadge();
                    updateCartTotals();
                }
            });
        });
        
        // دکمه‌های افزایش تعداد
        const plusButtons = document.querySelectorAll('.quantity-btn.plus');
        plusButtons.forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-product-id');
                const product = cart.find(item => item.id === productId);
                
                if (product && product.quantity < 10) {
                    product.quantity++;
                    
                    // بروزرسانی ورودی تعداد
                    const input = this.parentNode.querySelector('input');
                    if (input) {
                        input.value = product.quantity;
                    }
                    
                    // ذخیره در localStorage
                    saveCart();
                    
                    // بروزرسانی نمایش
                    updateCartBadge();
                    updateCartTotals();
                }
            });
        });
        
        // تغییر مستقیم تعداد
        const quantityInputs = document.querySelectorAll('.item-quantity input');
        quantityInputs.forEach(input => {
            input.addEventListener('change', function() {
                const productId = this.getAttribute('data-product-id');
                const product = cart.find(item => item.id === productId);
                
                if (product) {
                    let quantity = parseInt(this.value);
                    
                    // محدود کردن به بازه 1 تا 10
                    if (isNaN(quantity) || quantity < 1) {
                        quantity = 1;
                        this.value = 1;
                    } else if (quantity > 10) {
                        quantity = 10;
                        this.value = 10;
                    }
                    
                    product.quantity = quantity;
                    
                    // ذخیره در localStorage
                    saveCart();
                    
                    // بروزرسانی نمایش
                    updateCartBadge();
                    updateCartTotals();
                }
            });
        });
    }
    
    // بروزرسانی قیمت‌های سبد خرید
    function updateCartTotals() {
        const totalPriceElement = document.querySelector('.summary-row:first-child span:last-child');
        const discountElement = document.querySelector('.discount-value');
        const finalPriceElement = document.querySelector('.summary-row.total span:last-child');
        
        if (!totalPriceElement || !discountElement || !finalPriceElement) return;
        
        // اگر سبد خالی است
        if (cart.length === 0) {
            totalPriceElement.textContent = '0 تومان';
            discountElement.textContent = '0 تومان';
            finalPriceElement.textContent = '0 تومان';
            return;
        }
        
        // محاسبه قیمت کل
        let totalPrice = cart.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
        
        // محاسبه تخفیف (برای مثال 10%)
        let discount = Math.round(totalPrice * 0.1);
        
        // قیمت نهایی
        let finalPrice = totalPrice - discount;
        
        // بروزرسانی نمایش قیمت‌ها
        totalPriceElement.textContent = formatPrice(totalPrice) + ' تومان';
        discountElement.textContent = formatPrice(discount) + ' تومان';
        finalPriceElement.textContent = formatPrice(finalPrice) + ' تومان';
    }
    
    // ذخیره سبد خرید در localStorage
    function saveCart() {
        localStorage.setItem('amiristor_cart', JSON.stringify(cart));
    }
    
    // افزودن محصول به سبد خرید
    function addToCart(product) {
        // بررسی وجود محصول در سبد
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingProductIndex !== -1) {
            // اگر محصول قبلاً در سبد وجود داشت، افزایش تعداد
            if (cart[existingProductIndex].quantity < 10) {
                cart[existingProductIndex].quantity++;
            }
        } else {
            // افزودن محصول جدید
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
                size: product.size || 'متوسط',
                color: product.color || 'مشکی'
            });
        }
        
        // ذخیره در localStorage
        saveCart();
        
        // بروزرسانی نمایش
        renderCart();
        updateCartBadge();
        
        // باز کردن سبد خرید
        openCartDrawer();
        
        // نمایش اعلان
        showNotification(`${product.name} به سبد خرید اضافه شد`, 'success');
    }
    
    // اضافه کردن رویدادها به دکمه‌های افزودن به سبد
    function attachAddToCartEvents() {
        // دکمه‌های افزودن به سبد در کارت محصولات
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const productCard = this.closest('.product-card');
                if (!productCard) return;
                
                const productId = this.getAttribute('data-product-id') || `p${Date.now()}`;
                const productName = productCard.querySelector('.product-name a').textContent;
                const productImage = productCard.querySelector('.product-image img').src;
                const priceElement = productCard.querySelector('.current-price, .product-price');
                const priceText = priceElement ? priceElement.textContent : '0';
                
                // تبدیل قیمت متنی به عدد
                const price = parseInt(priceText.replace(/[^\d]/g, '')) || 0;
                
                const product = {
                    id: productId,
                    name: productName,
                    price: price,
                    image: productImage
                };
                
                addToCart(product);
                
                // نمایش بازخورد
                showAddFeedback(button);
            });
        });
        
        // دکمه‌های افزودن پیشنهاد ویژه
        addSuggestionButtons.forEach(button => {
            button.addEventListener('click', function() {
                const suggestionItem = this.closest('.suggestion-item');
                if (!suggestionItem) return;
                
                const productName = suggestionItem.querySelector('h5').textContent;
                const productImage = suggestionItem.querySelector('img').src;
                const priceText = suggestionItem.querySelector('.suggestion-price').textContent;
                const price = parseInt(priceText.replace(/[^\d]/g, '')) || 0;
                
                const product = {
                    id: `suggestion-${Date.now()}`,
                    name: productName,
                    price: price,
                    image: productImage
                };
                
                addToCart(product);
                
                // نمایش بازخورد
                showAddFeedback(button);
            });
        });
        
        // دکمه‌های افزودن سریع در بخش AI
        if (aiQuickAddButtons.length) {
            aiQuickAddButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const productCard = this.closest('.ai-product-card');
                    if (!productCard) return;
                    
                    const productName = productCard.querySelector('.ai-product-name').textContent;
                    const productImage = productCard.querySelector('.ai-product-image img').src;
                    const priceText = productCard.querySelector('.ai-product-price').textContent;
                    const price = parseInt(priceText.replace(/[^\d]/g, '')) || 0;
                    
                    const product = {
                        id: `ai-${Date.now()}`,
                        name: productName,
                        price: price,
                        image: productImage
                    };
                    
                    addToCart(product);
                    
                    // نمایش بازخورد
                    showAddFeedback(button, 'افزودن سریع');
                });
            });
        }
    }
    
    // نمایش بازخورد افزودن محصول
    function showAddFeedback(button, originalText) {
        const btnText = originalText || button.innerHTML;
        button.classList.add('added');
        
        if (button.tagName === 'BUTTON' && button.querySelector('span')) {
            button.innerHTML = '<i class="ri-check-line"></i><span>اضافه شد</span>';
        }
        
        setTimeout(() => {
            button.classList.remove('added');
            if (button.tagName === 'BUTTON' && (!originalText || button.querySelector('span'))) {
                button.innerHTML = btnText;
            }
        }, 2000);
    }
    
    // باز کردن سبد خرید
    function openCartDrawer() {
        if (cartDrawer) {
            cartDrawer.classList.add('open');
            document.body.classList.add('no-scroll');
            if (modalBackdrop) {
                modalBackdrop.classList.add('active');
            }
        }
    }
    
    // بستن سبد خرید
    function closeCartDrawer() {
        if (cartDrawer) {
            cartDrawer.classList.remove('open');
            document.body.classList.remove('no-scroll');
            if (modalBackdrop) {
                modalBackdrop.classList.remove('active');
            }
        }
    }
    
    // نمایش اعلان
    function showNotification(message, type = 'info') {
        // جلوگیری از نمایش اعلان تکراری
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            if (notification.querySelector('p').textContent === message) {
                notification.remove();
            }
        });
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icon = type === 'success' ? 'check-line' : 
                    type === 'error' ? 'error-warning-line' : 
                    type === 'warning' ? 'alert-line' : 'information-line';
        
        notification.innerHTML = `
            <i class="ri-${icon}"></i>
            <p>${message}</p>
            <button class="notification-close"><i class="ri-close-line"></i></button>
        `;
        
        // افزودن به صفحه
        document.body.appendChild(notification);
        
        // نمایش با تأخیر کوتاه
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // مخفی کردن پس از 3 ثانیه
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
        
        // دکمه بستن
        const closeButton = notification.querySelector('.notification-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            });
        }
    }
    
    // فرمت‌دهی قیمت با جداکننده هزارگان
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    // راه‌اندازی رویدادهای سبد خرید
    function initCartEvents() {
        // باز کردن سبد خرید
        if (cartToggle) {
            cartToggle.addEventListener('click', function() {
                openCartDrawer();
            });
        }
        
        // بستن سبد خرید
        if (closeCart) {
            closeCart.addEventListener('click', function() {
                closeCartDrawer();
            });
        }
        
        // ادامه خرید
        if (continueShopping) {
            continueShopping.addEventListener('click', function() {
                closeCartDrawer();
            });
        }
        
        // بستن سبد با کلیک روی پس‌زمینه
        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', function() {
                closeCartDrawer();
            });
        }
        
        // دکمه تکمیل سفارش
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function() {
                if (cart.length > 0) {
                    // در حالت واقعی به صفحه پرداخت هدایت می‌شود
                    showNotification('در حال انتقال به صفحه پرداخت...', 'info');
                    
                    // برای نمایش: انتقال به صفحه پرداخت نمایشی پس از 1 ثانیه
                    setTimeout(() => {
                        window.location.href = 'checkout.html';
                    }, 1000);
                }
            });
        }
        
        // اضافه کردن رویدادهای دکمه‌های افزودن به سبد
        attachAddToCartEvents();
    }
    
    // هنگام لود صفحه
    document.addEventListener('DOMContentLoaded', function() {
        // راه‌اندازی سبد خرید
        initCart();
        
        // راه‌اندازی رویدادها
        initCartEvents();
    });
})();

// لودینگ اسکلتی مدرن شبیه دیجیکالا (ترند 2024-2025)
document.addEventListener('DOMContentLoaded', function() {
    // ایجاد استایل‌های اسکلتی
    const skeletonCSS = document.createElement('style');
    skeletonCSS.textContent = `
      @keyframes shimmer {
        0% {
          background-position: -1000px 0;
        }
        100% {
          background-position: 1000px 0;
        }
      }
  
      .skeleton-loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #f9f9f9;
        z-index: 9999;
        overflow: auto;
        font-family: IRANSans, Tahoma, sans-serif;
        direction: rtl;
      }
  
      .skeleton-container {
        max-width: 1360px;
        margin: 0 auto;
        padding: 0 16px;
      }
  
      .skeleton-shimmer {
        background: linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 37%, #f0f0f0 63%);
        background-size: 1000px 100%;
        animation: shimmer 2s infinite linear;
        border-radius: 4px;
      }
  
      /* هدر و نوار جستجو */
      .skeleton-header {
        padding: 16px 0;
        border-bottom: 1px solid #f0f0f0;
      }
  
      .skeleton-header-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }
  
      .skeleton-logo {
        width: 120px;
        height: 40px;
        border-radius: 8px;
      }
  
      .skeleton-search {
        flex-grow: 1;
        height: 44px;
        max-width: 600px;
        border-radius: 8px;
      }
  
      .skeleton-user-actions {
        display: flex;
        gap: 16px;
      }
  
      .skeleton-action-icon {
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
  
      /* نوار دسته‌بندی‌ها */
      .skeleton-categories {
        display: flex;
        gap: 24px;
        padding: 12px 0;
        overflow-x: auto;
        scrollbar-width: none;
        border-bottom: 1px solid #f0f0f0;
      }
  
      .skeleton-categories::-webkit-scrollbar {
        display: none;
      }
  
      .skeleton-category {
        width: 80px;
        height: 20px;
        flex-shrink: 0;
      }
  
      /* بنر اصلی */
      .skeleton-main-banner {
        height: 380px;
        margin: 24px 0;
        border-radius: 16px;
      }
  
      /* بنرهای سه‌تایی */
      .skeleton-banners {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
        margin: 32px 0;
      }
  
      .skeleton-banner {
        height: 160px;
        border-radius: 16px;
      }
  
      /* عنوان بخش */
      .skeleton-section-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 32px 0 24px;
      }
  
      .skeleton-title {
        width: 200px;
        height: 28px;
      }
  
      .skeleton-more-link {
        width: 80px;
        height: 20px;
      }
  
      /* محصولات */
      .skeleton-products {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 16px;
        margin-bottom: 32px;
      }
  
      .skeleton-product {
        border-radius: 12px;
        padding: 16px;
        background-color: #fff;
        height: 360px;
        display: flex;
        flex-direction: column;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      }
  
      .skeleton-product-image {
        height: 180px;
        border-radius: 8px;
        margin-bottom: 16px;
      }
  
      .skeleton-product-brand {
        width: 70%;
        height: 16px;
        margin-bottom: 8px;
      }
  
      .skeleton-product-title {
        width: 90%;
        height: 18px;
        margin-bottom: 4px;
      }
  
      .skeleton-product-title-2 {
        width: 60%;
        height: 18px;
        margin-bottom: 16px;
      }
  
      .skeleton-product-rate {
        width: 100px;
        height: 20px;
        margin-bottom: 16px;
      }
  
      .skeleton-product-price {
        width: 120px;
        height: 24px;
        margin-top: auto;
      }
  
      /* پیشنهاد شگفت‌انگیز */
      .skeleton-amazing-offer {
        background-color: #ef394e;
        border-radius: 16px;
        padding: 24px;
        margin-bottom: 32px;
      }
  
      .skeleton-amazing-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
      }
  
      .skeleton-amazing-title {
        width: 160px;
        height: 32px;
        background-color: rgba(255, 255, 255, 0.3);
      }
  
      .skeleton-amazing-link {
        width: 100px;
        height: 24px;
        background-color: rgba(255, 255, 255, 0.3);
      }
  
      .skeleton-amazing-products {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 16px;
      }
  
      .skeleton-amazing-product {
        background-color: #fff;
        border-radius: 12px;
        padding: 16px;
        height: 260px;
        display: flex;
        flex-direction: column;
      }
  
      .skeleton-circle-options {
        display: flex;
        gap: 8px;
        margin-bottom: 16px;
      }
  
      .skeleton-circle-option {
        width: 20px;
        height: 20px;
        border-radius: 50%;
      }
  
      /* دسته‌بندی‌های محبوب */
      .skeleton-popular-categories {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        gap: 16px;
        margin-bottom: 32px;
      }
  
      .skeleton-popular-category {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
      }
  
      .skeleton-category-icon {
        width: 80px;
        height: 80px;
        border-radius: 50%;
      }
  
      .skeleton-category-name {
        width: 80px;
        height: 16px;
      }
  
      /* رسپانسیو */
      @media (max-width: 1200px) {
        .skeleton-products, .skeleton-amazing-products {
          grid-template-columns: repeat(4, 1fr);
        }
        .skeleton-popular-categories {
          grid-template-columns: repeat(4, 1fr);
        }
      }
  
      @media (max-width: 992px) {
        .skeleton-products, .skeleton-amazing-products {
          grid-template-columns: repeat(3, 1fr);
        }
        .skeleton-banners {
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, auto);
        }
        .skeleton-banners .skeleton-banner:first-child {
          grid-column: 1 / 3;
        }
        .skeleton-popular-categories {
          grid-template-columns: repeat(3, 1fr);
        }
      }
  
      @media (max-width: 768px) {
        .skeleton-products, .skeleton-amazing-products {
          grid-template-columns: repeat(2, 1fr);
        }
        .skeleton-main-banner {
          height: 200px;
        }
        .skeleton-popular-categories {
          grid-template-columns: repeat(2, 1fr);
        }
      }
  
      @media (max-width: 576px) {
        .skeleton-banners {
          grid-template-columns: 1fr;
        }
        .skeleton-banners .skeleton-banner:first-child {
          grid-column: 1;
        }
        .skeleton-amazing-products {
          grid-template-columns: repeat(2, 1fr);
        }
        .skeleton-product-brand {
          display: none;
        }
      }
    `;
  
    document.head.appendChild(skeletonCSS);
  
    // ایجاد لودر اسکلتی
    const skeletonLoader = document.createElement('div');
    skeletonLoader.className = 'skeleton-loader';
    
    skeletonLoader.innerHTML = `
      <div class="skeleton-container">
        <!-- هدر و جستجو -->
        <div class="skeleton-header">
          <div class="skeleton-header-content">
            <div class="skeleton-logo skeleton-shimmer"></div>
            <div class="skeleton-search skeleton-shimmer"></div>
            <div class="skeleton-user-actions">
              <div class="skeleton-action-icon skeleton-shimmer"></div>
              <div class="skeleton-action-icon skeleton-shimmer"></div>
              <div class="skeleton-action-icon skeleton-shimmer"></div>
            </div>
          </div>
        </div>
  
        <!-- دسته‌بندی‌ها -->
        <div class="skeleton-categories">
          <div class="skeleton-category skeleton-shimmer"></div>
          <div class="skeleton-category skeleton-shimmer"></div>
          <div class="skeleton-category skeleton-shimmer"></div>
          <div class="skeleton-category skeleton-shimmer"></div>
          <div class="skeleton-category skeleton-shimmer"></div>
          <div class="skeleton-category skeleton-shimmer"></div>
          <div class="skeleton-category skeleton-shimmer"></div>
          <div class="skeleton-category skeleton-shimmer"></div>
        </div>
  
        <!-- بنر اصلی -->
        <div class="skeleton-main-banner skeleton-shimmer"></div>
  
        <!-- بنرهای تبلیغاتی -->
        <div class="skeleton-banners">
          <div class="skeleton-banner skeleton-shimmer"></div>
          <div class="skeleton-banner skeleton-shimmer"></div>
          <div class="skeleton-banner skeleton-shimmer"></div>
        </div>
  
        <!-- پیشنهاد شگفت‌انگیز -->
        <div class="skeleton-amazing-offer">
          <div class="skeleton-amazing-header">
            <div class="skeleton-amazing-title skeleton-shimmer"></div>
            <div class="skeleton-amazing-link skeleton-shimmer"></div>
          </div>
          <div class="skeleton-amazing-products">
            <div class="skeleton-amazing-product">
              <div class="skeleton-product-image skeleton-shimmer"></div>
              <div class="skeleton-circle-options">
                <div class="skeleton-circle-option skeleton-shimmer"></div>
                <div class="skeleton-circle-option skeleton-shimmer"></div>
                <div class="skeleton-circle-option skeleton-shimmer"></div>
              </div>
              <div class="skeleton-product-title skeleton-shimmer"></div>
              <div class="skeleton-product-price skeleton-shimmer"></div>
            </div>
            <div class="skeleton-amazing-product">
              <div class="skeleton-product-image skeleton-shimmer"></div>
              <div class="skeleton-circle-options">
                <div class="skeleton-circle-option skeleton-shimmer"></div>
                <div class="skeleton-circle-option skeleton-shimmer"></div>
              </div>
              <div class="skeleton-product-title skeleton-shimmer"></div>
              <div class="skeleton-product-price skeleton-shimmer"></div>
            </div>
            <div class="skeleton-amazing-product">
              <div class="skeleton-product-image skeleton-shimmer"></div>
              <div class="skeleton-circle-options">
                <div class="skeleton-circle-option skeleton-shimmer"></div>
                <div class="skeleton-circle-option skeleton-shimmer"></div>
                <div class="skeleton-circle-option skeleton-shimmer"></div>
                <div class="skeleton-circle-option skeleton-shimmer"></div>
              </div>
              <div class="skeleton-product-title skeleton-shimmer"></div>
              <div class="skeleton-product-price skeleton-shimmer"></div>
            </div>
            <div class="skeleton-amazing-product">
              <div class="skeleton-product-image skeleton-shimmer"></div>
              <div class="skeleton-circle-options">
                <div class="skeleton-circle-option skeleton-shimmer"></div>
                <div class="skeleton-circle-option skeleton-shimmer"></div>
              </div>
              <div class="skeleton-product-title skeleton-shimmer"></div>
              <div class="skeleton-product-price skeleton-shimmer"></div>
            </div>
            <div class="skeleton-amazing-product">
              <div class="skeleton-product-image skeleton-shimmer"></div>
              <div class="skeleton-circle-options">
                <div class="skeleton-circle-option skeleton-shimmer"></div>
                <div class="skeleton-circle-option skeleton-shimmer"></div>
                <div class="skeleton-circle-option skeleton-shimmer"></div>
              </div>
              <div class="skeleton-product-title skeleton-shimmer"></div>
              <div class="skeleton-product-price skeleton-shimmer"></div>
            </div>
            <div class="skeleton-amazing-product">
              <div class="skeleton-product-image skeleton-shimmer"></div>
              <div class="skeleton-circle-options">
                <div class="skeleton-circle-option skeleton-shimmer"></div>
                <div class="skeleton-circle-option skeleton-shimmer"></div>
              </div>
              <div class="skeleton-product-title skeleton-shimmer"></div>
              <div class="skeleton-product-price skeleton-shimmer"></div>
            </div>
          </div>
        </div>
  
        <!-- عنوان بخش محصولات جدید -->
        <div class="skeleton-section-title">
          <div class="skeleton-title skeleton-shimmer"></div>
          <div class="skeleton-more-link skeleton-shimmer"></div>
        </div>
  
        <!-- محصولات -->
        <div class="skeleton-products">
          <div class="skeleton-product">
            <div class="skeleton-product-image skeleton-shimmer"></div>
            <div class="skeleton-product-brand skeleton-shimmer"></div>
            <div class="skeleton-product-title skeleton-shimmer"></div>
            <div class="skeleton-product-title-2 skeleton-shimmer"></div>
            <div class="skeleton-product-rate skeleton-shimmer"></div>
            <div class="skeleton-product-price skeleton-shimmer"></div>
          </div>
          <div class="skeleton-product">
            <div class="skeleton-product-image skeleton-shimmer"></div>
            <div class="skeleton-product-brand skeleton-shimmer"></div>
            <div class="skeleton-product-title skeleton-shimmer"></div>
            <div class="skeleton-product-title-2 skeleton-shimmer"></div>
            <div class="skeleton-product-rate skeleton-shimmer"></div>
            <div class="skeleton-product-price skeleton-shimmer"></div>
          </div>
          <div class="skeleton-product">
            <div class="skeleton-product-image skeleton-shimmer"></div>
            <div class="skeleton-product-brand skeleton-shimmer"></div>
            <div class="skeleton-product-title skeleton-shimmer"></div>
            <div class="skeleton-product-title-2 skeleton-shimmer"></div>
            <div class="skeleton-product-rate skeleton-shimmer"></div>
            <div class="skeleton-product-price skeleton-shimmer"></div>
          </div>
          <div class="skeleton-product">
            <div class="skeleton-product-image skeleton-shimmer"></div>
            <div class="skeleton-product-brand skeleton-shimmer"></div>
            <div class="skeleton-product-title skeleton-shimmer"></div>
            <div class="skeleton-product-title-2 skeleton-shimmer"></div>
            <div class="skeleton-product-rate skeleton-shimmer"></div>
            <div class="skeleton-product-price skeleton-shimmer"></div>
          </div>
          <div class="skeleton-product">
            <div class="skeleton-product-image skeleton-shimmer"></div>
            <div class="skeleton-product-brand skeleton-shimmer"></div>
            <div class="skeleton-product-title skeleton-shimmer"></div>
            <div class="skeleton-product-title-2 skeleton-shimmer"></div>
            <div class="skeleton-product-rate skeleton-shimmer"></div>
            <div class="skeleton-product-price skeleton-shimmer"></div>
          </div>
        </div>
  
        <!-- عنوان بخش دسته‌بندی‌های محبوب -->
        <div class="skeleton-section-title">
          <div class="skeleton-title skeleton-shimmer"></div>
        </div>
  
        <!-- دسته‌بندی‌های محبوب -->
        <div class="skeleton-popular-categories">
          <div class="skeleton-popular-category">
            <div class="skeleton-category-icon skeleton-shimmer"></div>
            <div class="skeleton-category-name skeleton-shimmer"></div>
          </div>
          <div class="skeleton-popular-category">
            <div class="skeleton-category-icon skeleton-shimmer"></div>
            <div class="skeleton-category-name skeleton-shimmer"></div>
          </div>
          <div class="skeleton-popular-category">
            <div class="skeleton-category-icon skeleton-shimmer"></div>
            <div class="skeleton-category-name skeleton-shimmer"></div>
          </div>
          <div class="skeleton-popular-category">
            <div class="skeleton-category-icon skeleton-shimmer"></div>
            <div class="skeleton-category-name skeleton-shimmer"></div>
          </div>
          <div class="skeleton-popular-category">
            <div class="skeleton-category-icon skeleton-shimmer"></div>
            <div class="skeleton-category-name skeleton-shimmer"></div>
          </div>
          <div class="skeleton-popular-category">
            <div class="skeleton-category-icon skeleton-shimmer"></div>
            <div class="skeleton-category-name skeleton-shimmer"></div>
          </div>
        </div>
  
        <!-- عنوان بخش پرفروش‌ترین‌ها -->
        <div class="skeleton-section-title">
          <div class="skeleton-title skeleton-shimmer"></div>
          <div class="skeleton-more-link skeleton-shimmer"></div>
        </div>
  
        <!-- محصولات پرفروش -->
        <div class="skeleton-products">
          <div class="skeleton-product">
            <div class="skeleton-product-image skeleton-shimmer"></div>
            <div class="skeleton-product-brand skeleton-shimmer"></div>
            <div class="skeleton-product-title skeleton-shimmer"></div>
            <div class="skeleton-product-title-2 skeleton-shimmer"></div>
            <div class="skeleton-product-rate skeleton-shimmer"></div>
            <div class="skeleton-product-price skeleton-shimmer"></div>
          </div>
          <div class="skeleton-product">
            <div class="skeleton-product-image skeleton-shimmer"></div>
            <div class="skeleton-product-brand skeleton-shimmer"></div>
            <div class="skeleton-product-title skeleton-shimmer"></div>
            <div class="skeleton-product-title-2 skeleton-shimmer"></div>
            <div class="skeleton-product-rate skeleton-shimmer"></div>
            <div class="skeleton-product-price skeleton-shimmer"></div>
          </div>
          <div class="skeleton-product">
            <div class="skeleton-product-image skeleton-shimmer"></div>
            <div class="skeleton-product-brand skeleton-shimmer"></div>
            <div class="skeleton-product-title skeleton-shimmer"></div>
            <div class="skeleton-product-title-2 skeleton-shimmer"></div>
            <div class="skeleton-product-rate skeleton-shimmer"></div>
            <div class="skeleton-product-price skeleton-shimmer"></div>
          </div>
          <div class="skeleton-product">
            <div class="skeleton-product-image skeleton-shimmer"></div>
            <div class="skeleton-product-brand skeleton-shimmer"></div>
            <div class="skeleton-product-title skeleton-shimmer"></div>
            <div class="skeleton-product-title-2 skeleton-shimmer"></div>
            <div class="skeleton-product-rate skeleton-shimmer"></div>
            <div class="skeleton-product-price skeleton-shimmer"></div>
          </div>
          <div class="skeleton-product">
            <div class="skeleton-product-image skeleton-shimmer"></div>
            <div class="skeleton-product-brand skeleton-shimmer"></div>
            <div class="skeleton-product-title skeleton-shimmer"></div>
            <div class="skeleton-product-title-2 skeleton-shimmer"></div>
            <div class="skeleton-product-rate skeleton-shimmer"></div>
            <div class="skeleton-product-price skeleton-shimmer"></div>
          </div>
        </div>
      </div>
    `;
  
    // اضافه کردن لودر به بدنه صفحه
    document.body.appendChild(skeletonLoader);
  
    // پنهان کردن محتوای اصلی (اگر وجود دارد)
    const mainContent = document.querySelector('main') || document.querySelector('#main-content') || document.querySelector('.main-content');
    if (mainContent) {
      mainContent.style.visibility = 'hidden';
    }
  
    // حذف لودر پس از بارگذاری کامل صفحه
    window.addEventListener('load', function() {
      setTimeout(function() {
        // نمایش محتوای اصلی
        if (mainContent) {
          mainContent.style.visibility = 'visible';
          mainContent.style.opacity = '0';
          mainContent.style.transition = 'opacity 0.4s ease-in-out';
          mainContent.style.opacity = '1';
        }
  
        // محو کردن و حذف لودر
        skeletonLoader.style.opacity = '1';
        skeletonLoader.style.transition = 'opacity 0.4s ease-in-out';
        skeletonLoader.style.opacity = '0';
        
        setTimeout(function() {
          skeletonLoader.remove();
        }, 400);
      }, 4000); // تاخیر مناسب برای نمایش کامل لودر (قابل تنظیم)
    });
  
    // اگر بارگذاری بیش از حد طول کشید، لودر را حذف کنیم
    setTimeout(function() {
      if (document.body.contains(skeletonLoader)) {
        if (mainContent) {
          mainContent.style.visibility = 'visible';
        }
        skeletonLoader.remove();
      }
    }, 8000); // حداکثر 8 ثانیه صبر می‌کنیم
  });

  // پیام خوش‌آمدگویی مدرن با رنگ آبی (ترند 2025)
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      // ایجاد المان‌های مورد نیاز
      const welcomeContainer = document.createElement('div');
      welcomeContainer.className = 'welcome-modal';
      
      const modal = document.createElement('div');
      modal.className = 'welcome-content';
      
      // محتوای مودال
      modal.innerHTML = `
        <div class="welcome-header">
          <div class="welcome-logo">
            <div class="welcome-logo-glow"></div>
            <i class="ri-footprint-line"></i>
          </div>
          <h2 class="welcome-title">به <span class="gradient-text">فروشگاه امیری</span> خوش آمدید</h2>
          <p class="welcome-subtitle">تجربه‌ای جدید در خرید کفش</p>
        </div>
        <div class="welcome-body">
          <div class="welcome-feature">
            <i class="ri-shield-check-line"></i>
            <span>تضمین اصالت کالا</span>
          </div>
          <div class="welcome-feature">
            <i class="ri-truck-line"></i>
            <span>ارسال سریع</span>
          </div>
          <div class="welcome-feature">
            <i class="ri-customer-service-2-line"></i>
            <span>پشتیبانی 24/7</span>
          </div>
        </div>
        <div class="welcome-footer">
          <button class="welcome-btn">شروع خرید</button>
        </div>
      `;
      
      welcomeContainer.appendChild(modal);
      document.body.appendChild(welcomeContainer);
      
      // نمایش با انیمیشن
      requestAnimationFrame(() => {
        welcomeContainer.classList.add('visible');
        modal.classList.add('visible');
      });
      
      // دکمه بستن
      modal.querySelector('.welcome-btn').addEventListener('click', () => {
        welcomeContainer.classList.remove('visible');
        setTimeout(() => welcomeContainer.remove(), 500);
        localStorage.setItem('welcomeShown', 'true');
      });
      
      // اضافه کردن استایل‌ها
      const style = document.createElement('style');
      style.textContent = `
        .welcome-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        
        .welcome-modal.visible {
          opacity: 1;
        }
        
        .welcome-content {
          background: rgba(255, 255, 255, 0.9);
          border-radius: 24px;
          padding: 30px;
          width: 90%;
          max-width: 500px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          transform: translateY(30px) scale(0.95);
          opacity: 0;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .welcome-content::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(20, 100, 255, 0.05), rgba(20, 170, 255, 0.05));
          z-index: -1;
        }
        
        .welcome-content.visible {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
        
        .welcome-header {
          margin-bottom: 25px;
        }
        
        .welcome-logo {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #1464ff, #14aaff);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          position: relative;
        }
        
        .welcome-logo i {
          font-size: 40px;
          color: white;
        }
        
        .welcome-logo-glow {
          position: absolute;
          width: 100%;
          height: 100%;
          background: inherit;
          border-radius: inherit;
          filter: blur(20px);
          opacity: 0.7;
          z-index: -1;
          animation: pulse 2s infinite;
        }
        
        .welcome-title {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 8px;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #1464ff, #14aaff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .welcome-subtitle {
          color: #666;
          font-size: 16px;
        }
        
        .welcome-body {
          display: flex;
          justify-content: space-around;
          margin-bottom: 30px;
        }
        
        .welcome-feature {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .welcome-feature i {
          font-size: 24px;
          color: #1464ff;
          margin-bottom: 8px;
        }
        
        .welcome-btn {
          background: linear-gradient(135deg, #1464ff, #14aaff);
          color: white;
          border: none;
          padding: 12px 35px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .welcome-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 15px rgba(20, 100, 255, 0.25);
        }
        
        @keyframes pulse {
          0% {
            opacity: 0.7;
            transform: scale(0.95);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.05);
          }
          100% {
            opacity: 0.7;
            transform: scale(0.95);
          }
        }
        
        @media (max-width: 600px) {
          .welcome-body {
            flex-direction: column;
            gap: 15px;
          }
          
          .welcome-feature {
            flex-direction: row;
            gap: 10px;
          }
        }
      `;
      
      document.head.appendChild(style);
    }, 1000);
  });
