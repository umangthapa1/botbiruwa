// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animated counter function
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Intersection Observer for animated counters
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe the growing-together section
const growingTogetherSection = document.querySelector('.growing-together');
if (growingTogetherSection) {
    observer.observe(growingTogetherSection);
}

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Enhanced hover effects for collection cards
document.querySelectorAll('.collection-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
    });
});

// Gallery lightbox functionality
document.querySelectorAll('.gallery-item').forEach((item, index) => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        createLightbox(img.src, index);
    });
});

function createLightbox(imgSrc, currentIndex) {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const totalImages = galleryItems.length;
    
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <button class="lightbox-nav lightbox-prev">&lt;</button>
            <button class="lightbox-nav lightbox-next">&gt;</button>
            <img src="${imgSrc}" alt="Gallery Image">
        </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Add lightbox styles
    const style = document.createElement('style');
    style.textContent = `
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 80vh;
            border-radius: 10px;
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            z-index: 10001;
            background: rgba(0, 0, 0, 0.5);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .lightbox-nav {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            padding: 1rem;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.3s ease;
        }
        
        .lightbox-nav:hover {
            background: rgba(0, 0, 0, 0.8);
        }
        
        .lightbox-prev {
            left: -80px;
        }
        
        .lightbox-next {
            right: -80px;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @media (max-width: 768px) {
            .lightbox-nav {
                width: 50px;
                height: 50px;
                font-size: 1.5rem;
            }
            
            .lightbox-prev {
                left: 10px;
            }
            
            .lightbox-next {
                right: 10px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Navigation functionality
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const lightboxImg = lightbox.querySelector('img');
    
    function showImage(index) {
        if (index < 0) index = totalImages - 1;
        if (index >= totalImages) index = 0;
        
        const newImg = galleryItems[index];
        lightboxImg.src = newImg.src;
        lightboxImg.alt = newImg.alt;
        currentIndex = index;
    }
    
    prevBtn.addEventListener('click', () => {
        showImage(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        showImage(currentIndex + 1);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            lightbox.remove();
        } else if (e.key === 'ArrowLeft') {
            showImage(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            showImage(currentIndex + 1);
        }
    });
    
    // Close lightbox
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.className === 'lightbox-close') {
            lightbox.remove();
        }
    });
}

// Add click functionality to buttons with enhanced ripple effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        const rate = scrolled * -0.5;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Enhanced loading animation for images
document.querySelectorAll('img').forEach(img => {
    // Only apply animation to images that aren't in gallery or hero
    if (!img.closest('.gallery-item') && !img.closest('.hero-image')) {
        // Set initial styles
        img.style.opacity = '0';
        img.style.transform = 'scale(0.95)';
        img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        // Check if image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
            img.style.transform = 'scale(1)';
        } else {
            img.addEventListener('load', function() {
                this.style.opacity = '1';
                this.style.transform = 'scale(1)';
            });
            
            // Fallback for images that might not trigger load event
            setTimeout(() => {
                if (img.style.opacity === '0') {
                    img.style.opacity = '1';
                    img.style.transform = 'scale(1)';
                }
            }, 1000);
        }
    }
});

// Mobile menu toggle with enhanced animations
function createMobileMenu() {
    const nav = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.style.display = 'none';
    
    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block !important;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #333;
                cursor: pointer;
                transition: transform 0.3s ease;
            }
            
            .mobile-menu-btn:hover {
                transform: scale(1.1);
            }
            
            .nav-menu {
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: white;
                flex-direction: column;
                padding: 1rem 0;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                display: none;
                animation: slideDown 0.3s ease;
            }
            
            .nav-menu.active {
                display: flex;
            }
            
            .nav-menu li {
                padding: 0.5rem 2rem;
                opacity: 0;
                transform: translateY(-20px);
                animation: slideInUp 0.3s ease forwards;
            }
            
            .nav-menu.active li:nth-child(1) { animation-delay: 0.1s; }
            .nav-menu.active li:nth-child(2) { animation-delay: 0.2s; }
            .nav-menu.active li:nth-child(3) { animation-delay: 0.3s; }
            .nav-menu.active li:nth-child(4) { animation-delay: 0.4s; }
            .nav-menu.active li:nth-child(5) { animation-delay: 0.5s; }
            
            @keyframes slideDown {
                from { transform: translateY(-10px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            @keyframes slideInUp {
                to { opacity: 1; transform: translateY(0); }
            }
        }
    `;
    document.head.appendChild(style);
    
    // Insert mobile menu button
    nav.insertBefore(mobileMenuBtn, navMenu);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
}

// Initialize mobile menu
createMobileMenu();

// Add CSS for enhanced ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Floating animation for icons */
    .benefit-icon, .feature-icon {
        animation: float 3s ease-in-out infinite;
    }
    
    /* Pulse animation for stats */
    .stat-card {
        animation: pulse 2s infinite;
        animation-delay: calc(var(--i, 0) * 0.2s);
    }
    
    /* Gallery hover effects */
    .gallery-item {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .gallery-item:hover {
        transform: translateY(-10px) scale(1.02);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
`;
document.head.appendChild(rippleStyle);

// Enhanced scroll reveal animation
function revealOnScroll() {
    const elements = document.querySelectorAll('.benefit-card, .collection-card, .feature-card, .gallery-item, .about-text, .about-image');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach((el, index) => {
        // Don't override image styles
        if (!el.querySelector('img')) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            el.style.animationDelay = `${index * 0.1}s`;
        }
        revealObserver.observe(el);
    });
}

// Initialize scroll reveal
revealOnScroll();

// Add cart functionality with notification
document.querySelector('.fa-shopping-cart').addEventListener('click', () => {
    showNotification('Shopping cart coming soon! 🛒', 'info');
});

// Add social media hover effects with enhanced animations
document.querySelectorAll('.social-icons i').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2) rotate(5deg)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Instagram fallback functionality
function setupInstagramFallback() {
    const instagramEmbed = document.querySelector('.instagram-embed iframe');
    const instagramFallback = document.querySelector('.instagram-fallback');
    
    if (instagramEmbed) {
        instagramEmbed.addEventListener('error', () => {
            instagramEmbed.style.display = 'none';
            instagramFallback.style.display = 'block';
        });
    } else {
        instagramFallback.style.display = 'block';
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
        }
        
        .notification-info {
            background: #4a7c59;
        }
        
        .notification-success {
            background: #28a745;
        }
        
        .notification-warning {
            background: #ffc107;
            color: #333;
        }
        
        .notification-error {
            background: #dc3545;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations
}, 16));

// Initialize Instagram fallback
setupInstagramFallback();

// Add floating particles effect
function createFloatingParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'floating-particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #4a7c59;
            border-radius: 50%;
            opacity: 0.3;
            animation: float-particle 6s infinite linear;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 6}s;
        `;
        particlesContainer.appendChild(particle);
    }
    
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes float-particle {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.3;
            }
            90% {
                opacity: 0.3;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);
    
    document.body.appendChild(particlesContainer);
}

// Initialize floating particles
createFloatingParticles();

// Gallery View All Lightbox Functionality
const viewAllBtn = document.querySelector('.gallery-viewall-btn');
const galleryLightbox = document.getElementById('gallery-lightbox');

function openGalleryLightbox(startIndex = 0) {
    // Dynamically get all gallery images from the grid
    const galleryImgs = Array.from(document.querySelectorAll('.gallery-item img'));
    const galleryImages = galleryImgs.map(img => img.getAttribute('src'));
    let currentIndex = startIndex;
    function renderLightbox() {
        galleryLightbox.innerHTML = `
            <span class="gallery-lightbox-close">&times;</span>
            <div class="gallery-lightbox-content">
                <button class="gallery-lightbox-nav gallery-lightbox-prev">&lt;</button>
                <img class="gallery-lightbox-img" src="${galleryImages[currentIndex]}" alt="Gallery Image ${currentIndex + 1}">
                <button class="gallery-lightbox-nav gallery-lightbox-next">&gt;</button>
            </div>
        `;
        
        galleryLightbox.style.display = 'flex';
    }
    console.log('Clicked View all!')
    renderLightbox();

    // Navigation
    galleryLightbox.onclick = function(e) {
        if (e.target.classList.contains('gallery-lightbox-close') || e.target === galleryLightbox) {
            galleryLightbox.style.display = 'none';
        } else if (e.target.classList.contains('gallery-lightbox-prev')) {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            renderLightbox();
        } else if (e.target.classList.contains('gallery-lightbox-next')) {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            renderLightbox();
        }
    };
    // Keyboard navigation
    function keyHandler(e) {
        if (galleryLightbox.style.display !== 'flex') return;
        if (e.key === 'Escape') {
            galleryLightbox.style.display = 'none';
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            renderLightbox();
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            renderLightbox();
        }
    }
    document.addEventListener('keydown', keyHandler);
    // Remove event on close
    const observer = new MutationObserver(() => {
        if (galleryLightbox.style.display === 'none') {
            document.removeEventListener('keydown', keyHandler);
            observer.disconnect();
        }
    });
    observer.observe(galleryLightbox, { attributes: true, attributeFilter: ['style'] });
}

if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => openGalleryLightbox(0));
}

console.log('Bot Biruwa website loaded successfully with enhanced features! 🌱✨'); 