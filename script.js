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

// Gallery data with detailed descriptions
const galleryData = {
    ornamen: {
        image: 'https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?w=800&h=600&fit=crop',
        title: 'Ornamen Ukiran Tradisional Dayak',
        description: 'Ukiran tradisional pada Rumah Radakng Aya menampilkan motif-motif khas Dayak seperti motif burung enggang, pohon kehidupan, dan geometris tradisional. Setiap ukiran memiliki makna filosofis yang mendalam, melambangkan hubungan harmonis antara manusia, alam, dan spiritualitas. Ornamen ini tidak hanya berfungsi sebagai hiasan, tetapi juga sebagai penanda status sosial dan identitas budaya masyarakat Dayak Landak.'
    },
    balai: {
        image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop',
        title: 'Balai Utama Rumah Radakng',
        description: 'Balai utama merupakan ruang terbuka yang berfungsi sebagai pusat aktivitas komunal. Di sinilah berbagai kegiatan penting dilaksanakan, mulai dari musyawarah adat, upacara Naik Dango, hingga pagelaran seni budaya. Arsitektur ruang ini dirancang untuk menampung banyak orang sekaligus, mencerminkan nilai kebersamaan dan kesetaraan dalam masyarakat Dayak.'
    },
    tangga: {
        image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&h=600&fit=crop',
        title: 'Tangga Adat Rumah Radakng',
        description: 'Tangga kayu tradisional yang kokoh menjadi akses utama menuju rumah panjang. Dibuat dari kayu pilihan dengan teknik konstruksi tradisional tanpa paku, tangga ini menunjukkan keahlian arsitektur masyarakat Dayak. Posisi tangga yang curam juga memiliki makna simbolis sebagai pemisah antara dunia bawah (profan) dan dunia atas (sakral).'
    },
    lukisan: {
        image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=600&fit=crop',
        title: 'Lukisan Motif Dayak',
        description: 'Karya seni lukis yang menampilkan motif-motif tradisional Dayak Landak dengan warna-warna earth tone yang khas. Lukisan ini menggambarkan kekayaan visual budaya Dayak, termasuk motif hewan, tumbuhan, dan pola geometris yang telah diwariskan turun-temurun. Setiap goresan mengandung cerita dan nilai-nilai luhur kehidupan masyarakat Dayak.'
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
        'https://images.unsplash.com/photo-1587595431973-160d0c25d037?w=1920&h=1080&fit=crop'
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
