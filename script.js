// ========================================
// Mobile Navigation Toggle
// ========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ========================================
// Smooth Scroll for Navigation Links
// ========================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Navbar Scroll Effect
// ========================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ========================================
// Carousel Functionality
// ========================================
const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');
const indicators = document.querySelectorAll('.indicator');

let currentSlide = 0;
let autoPlayInterval;

// Function to show specific slide
function showSlide(index) {
    // Remove active class from all items and indicators
    carouselItems.forEach(item => item.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Add active class to current slide and indicator
    carouselItems[index].classList.add('active');
    indicators[index].classList.add('active');

    currentSlide = index;
}

// Function to go to next slide
function nextSlide() {
    let next = (currentSlide + 1) % carouselItems.length;
    showSlide(next);
}

// Function to go to previous slide
function prevSlide() {
    let prev = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
    showSlide(prev);
}

// Event listeners for carousel controls
nextButton.addEventListener('click', () => {
    nextSlide();
    resetAutoPlay();
});

prevButton.addEventListener('click', () => {
    prevSlide();
    resetAutoPlay();
});

// Event listeners for indicators
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
        resetAutoPlay();
    });
});

// Auto-play carousel
function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}

// Start auto-play on page load
startAutoPlay();

// Pause auto-play when user hovers over carousel
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', stopAutoPlay);
carousel.addEventListener('mouseleave', startAutoPlay);

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
        resetAutoPlay();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoPlay();
    }
});

// ========================================
// Intersection Observer for Scroll Animations
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections for fade-in animations
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.classList.add('fade-in-up');
    observer.observe(section);
});

// Observe all cards for staggered animations
const cards = document.querySelectorAll('.feature-card, .product-card, .step, .info-card');
cards.forEach((card, index) => {
    card.classList.add('fade-in-up');
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// ========================================
// Sticky WhatsApp Button Visibility
// ========================================
const stickyWhatsApp = document.getElementById('stickyWhatsApp');

window.addEventListener('scroll', () => {
    // Show sticky button after scrolling past hero section
    if (window.pageYOffset > window.innerHeight) {
        stickyWhatsApp.style.opacity = '1';
        stickyWhatsApp.style.pointerEvents = 'all';
    } else {
        stickyWhatsApp.style.opacity = '0';
        stickyWhatsApp.style.pointerEvents = 'none';
    }
});

// ========================================
// Dynamic WhatsApp Order Handler with Product ID
// ========================================
function handleWhatsAppOrder(productId, productName, productPrice, productImage) {
    const phoneNumber = '919996124025';

    // Create a detailed message with product ID for easy reference
    const message = `Hello! I'm interested in ordering:

🆔 *Product ID: ${productId}*
📦 Product: ${productName}
💰 Price: ${productPrice}

I saw this product on your website. Please let me know about availability and delivery details. Thank you!

_Note: Please reference Product ID ${productId} for this order_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}

// Add event listeners to all WhatsApp order buttons
document.addEventListener('DOMContentLoaded', () => {
    const orderButtons = document.querySelectorAll('.whatsapp-order-btn');

    orderButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            // Get product data from parent product card
            const productCard = button.closest('.product-card');
            const productId = productCard.dataset.productId.toUpperCase();
            const productName = productCard.dataset.productName;
            const productPrice = productCard.dataset.productPrice;
            const productImage = productCard.dataset.productImage;

            // Handle the WhatsApp order
            handleWhatsAppOrder(productId, productName, productPrice, productImage);
        });
    });
});

// ========================================
// Performance Optimization: Lazy Loading Images
// ========================================
if ('loading' in HTMLImageElement.prototype) {
    // Browser supports native lazy loading
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img');
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// Touch Swipe Support for Carousel (Mobile)
// ========================================
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50; // Minimum distance for swipe

    if (touchStartX - touchEndX > swipeThreshold) {
        // Swipe left - next slide
        nextSlide();
        resetAutoPlay();
    }

    if (touchEndX - touchStartX > swipeThreshold) {
        // Swipe right - previous slide
        prevSlide();
        resetAutoPlay();
    }
}

// ========================================
// Console Welcome Message (Optional)
// ========================================
console.log('%c🌿 Eco-Friendly Stars', 'font-size: 20px; font-weight: bold; color: #4A7C59;');
console.log('%cHandmade Clay Statues for a Sustainable Tomorrow', 'font-size: 14px; color: #6B4423;');
console.log('%cWebsite crafted with care ♻️', 'font-size: 12px; color: #666;');

// ========================================
// Accessibility: Skip to Content
// ========================================
// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Press 'H' to go to home
    if (e.key === 'h' || e.key === 'H') {
        if (!e.target.matches('input, textarea')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
});

// ========================================
// Page Load Animations
// ========================================
window.addEventListener('load', () => {
    // Add loaded class to body for any CSS transitions
    document.body.classList.add('loaded');

    // Trigger hero animations
    const heroTitle = document.querySelector('.hero-title');
    const heroTagline = document.querySelector('.hero-tagline');
    const ctaButtons = document.querySelector('.cta-buttons');

    if (heroTitle) {
        setTimeout(() => heroTitle.style.opacity = '1', 100);
    }
    if (heroTagline) {
        setTimeout(() => heroTagline.style.opacity = '1', 300);
    }
    if (ctaButtons) {
        setTimeout(() => ctaButtons.style.opacity = '1', 500);
    }
});

// ========================================
// Initialize Sticky WhatsApp Button
// ========================================
// Set initial state (hidden)
stickyWhatsApp.style.opacity = '0';
stickyWhatsApp.style.pointerEvents = 'none';
stickyWhatsApp.style.transition = 'opacity 0.3s ease';

// ========================================
// Prevent Layout Shift on Image Load
// ========================================
document.querySelectorAll('img').forEach(img => {
    if (!img.complete) {
        img.addEventListener('load', function () {
            this.classList.add('loaded');
        });
    }
});
