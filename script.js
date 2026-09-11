/**
 * Rumah Radakng Aya Landak - Interactive Features
 * Pure Vanilla JavaScript - No Frameworks
 */

// ============================================
// DOM ELEMENTS
// ============================================
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const galleryCards = document.querySelectorAll('.gallery-card');
const modal = document.getElementById('galleryModal');
const modalClose = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');

// ============================================
// NAVIGATION FUNCTIONALITY
// ============================================

// Mobile Menu Toggle
mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Navbar scroll effect
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class for shadow effect
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    updateActiveNavLink();
    
    lastScroll = currentScroll;
});

// Update active navigation link based on section visibility
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ============================================
// MODAL GALLERY FUNCTIONALITY
// ============================================

// Gallery data with detailed descriptions (UPDATED)
const galleryData = {
    'balai-utama': {
        image: 'hero.png',
        title: 'Balai Utama Rumah Radakng',
        description: 'Balai utama merupakan ruang terbuka yang berfungsi sebagai pusat aktivitas komunal. Di sinilah berbagai kegiatan penting dilaksanakan, mulai dari musyawarah adat, upacara Naik Dango, hingga pagelaran seni budaya. Arsitektur ruang ini dirancang untuk menampung banyak orang sekaligus, mencerminkan nilai kebersamaan dan kesetaraan dalam masyarakat Dayak.'
    },
    'dango-padi': {
        image: 'Dango.padi.png',
        title: 'Dango Padi',
        description: 'Merupakan lumbung atau tempat penyimpanan padi tradisional milik masyarakat Dayak setelah masa panen usai.'
    },
    'lantai-bawah': {
        image: 'lantai.bawah.png',
        title: 'Area Lantai Bawah / Kolong',
        description: 'Area terbuka di bagian bawah bangunan panggung yang difungsikan sebagai ruang serbaguna untuk penyelenggaraan berbagai kegiatan, seperti acara UMKM, bazar, tempat berkumpul, maupun area bersantai bagi para pengunjung.'
    },
    'relief-dinding': {
        image: 'lukisan.png',
        title: 'Relief Dinding Tradisi',
        description: 'Panel relief dinding yang menggambarkan alur tradisi berladang dan kehidupan sosial suku Dayak, mulai dari proses awal membuka lahan (Basapat), membawa hasil panen (Naikatn Padi), hingga puncaknya pada upacara syukur (Naik Dango). Tiga panel ini merupakan perwakilan dari total 14 relief yang ada di kawasan Rumah Radakng Aya.'
    },
    'patung-adat': {
        image: 'patung(1).png',
        title: 'Patung Adat Dayak',
        description: 'Pasangan patung berbusana adat tradisional Dayak yang berdiri di area depan sebagai visualisasi busana, atribut adat, serta penyambut simbolis bagi setiap pengunjung yang datang.'
    }
};

// Open modal when gallery card is clicked
galleryCards.forEach(card => {
    card.addEventListener('click', () => {
        const modalType = card.getAttribute('data-modal');
        const data = galleryData[modalType];
        
        if (data) {
            modalImage.src = data.image;
            modalImage.alt = data.title;
            modalTitle.textContent = data.title;
            modalDesc.textContent = data.description;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal functions
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);

// Close modal when clicking outside modal content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// LAZY LOADING IMAGES
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Add any additional scroll-based animations here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Focus trap for modal
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
}

// Initialize focus trap when modal opens
modal.addEventListener('transitionend', () => {
    if (modal.classList.contains('active')) {
        trapFocus(modal);
        modalClose.focus();
    }
});

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav link
    updateActiveNavLink();
    
    // Preload critical images
    const criticalImages = [
        'hero.png',
        'Dango.padi.png',
        'lantai.bawah.png',
        'lukisan.png',
        'patung(1).png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    console.log('Rumah Radakng Aya Landak - Website loaded successfully!');
});

// Service Worker Registration (Optional - for PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment below to enable service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}
