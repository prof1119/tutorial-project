// Global variables
const SITE_ID = 'BUPG ID:';
let isLoading = false;

// Platform URLs - Replace with your actual social media links
const PLATFORM_URLS = {
    instagram: 'https://instagram.com/yourusername',
    youtube: 'https://www.youtube.com/@Mustafa_Kamal_Emaira', 
    tiktok: 'https://tiktok.com/@yourusername',
    facebook: 'https://facebook.com/yourusername'
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    createFloatingElements();
    initializeAnimations();
    setupEventListeners();
    initializeScrollReveal();
    setupParallaxEffects();
}

// Create floating background elements
function createFloatingElements() {
    const container = document.getElementById('floatingElements');
    const elementCount = window.innerWidth > 768 ? 20 : 10;
    
    // Clear existing elements
    container.innerHTML = '';
    
    for (let i = 0; i < elementCount; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        
        // Random properties
        const size = Math.random() * 60 + 20;
        const startPosition = Math.random() * window.innerWidth;
        const animationDuration = Math.random() * 15 + 15;
        const delay = Math.random() * 20;
        
        // Apply styles
        element.style.width = size + 'px';
        element.style.height = size + 'px';
        element.style.left = startPosition + 'px';
        element.style.animationDuration = animationDuration + 's';
        element.style.animationDelay = delay + 's';
        element.style.opacity = Math.random() * 0.3 + 0.1;
        
        // Random colors
        const colors = [
            'rgba(255, 107, 107, 0.1)',
            'rgba(78, 205, 196, 0.1)', 
            'rgba(69, 183, 209, 0.1)',
            'rgba(150, 206, 180, 0.1)',
            'rgba(255, 234, 167, 0.1)'
        ];
        element.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        container.appendChild(element);
    }
}

// Initialize animations
function initializeAnimations() {
    // Stagger platform card animations
    const platformCards = document.querySelectorAll('.platform-card');
    platformCards.forEach((card, index) => {
        card.style.animationDelay = (index * 0.15) + 's';
        card.classList.add('loading');
    });
    
    // Animate CV items
    const cvItems = document.querySelectorAll('.cv-item');
    cvItems.forEach((item, index) => {
        item.style.animationDelay = (index * 0.1 + 0.5) + 's';
        item.classList.add('loading');
    });
}

// Setup event listeners
function setupEventListeners() {
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            createFloatingElements();
        }, 250);
    });
    
    // Handle scroll for animations
    window.addEventListener('scroll', throttle(handleScroll, 16));
    
    // Add click animation to all interactive elements
    document.querySelectorAll('.platform-card, .copy-btn').forEach(element => {
        element.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
}


// Fallback copy method for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Fallback: Could not copy text');
    }
    
    document.body.removeChild(textArea);
}

// Reset copy button
function resetCopyButton(btn, originalText) {
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.opacity = '1';
        isLoading = false;
    }, 1000);
}

// Show success message
function showSuccessMessage() {
    const message = document.getElementById('successMessage');
    message.classList.add('show');
    
    setTimeout(() => {
        message.classList.remove('show');
    }, 3000);
}

// Open platform with animation
function openPlatform(platform) {
    const card = event.currentTarget;
    const url = PLATFORM_URLS[platform];
    
    if (!url) {
        console.error('Platform URL not found:', platform);
        return;
    }
    
    // Add click animation
    card.style.transform = 'scale(0.95) translateY(-15px)';
    
    // Analytics tracking (optional)
    trackPlatformClick(platform);
    
    // Open platform after animation
    setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer');
        card.style.transform = '';
    }, 150);
}

// Track platform clicks (optional analytics)
function trackPlatformClick(platform) {
    // Add your analytics tracking here
    console.log(`Platform clicked: ${platform}`);
}

// Create ripple effect on click
function createRippleEffect(event, element) {
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation styles
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);

// Throttle function for performance
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function(...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Handle scroll animations
function handleScroll() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    // Parallax effect for profile section
    const profileSection = document.querySelector('.profile-section');
    if (profileSection) {
        profileSection.style.transform = `translateY(${rate}px)`;
    }
    
    // Reveal animations
    revealElements();
}

// Initialize scroll reveal
function initializeScrollReveal() {
    const revealElements = document.querySelectorAll('.cv-item, .platform-card');
    revealElements.forEach(element => {
        element.classList.add('reveal');
    });
}

// Reveal elements on scroll
function revealElements() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const elementVisible = 150;
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Setup parallax effects
function setupParallaxEffects() {
    const profileImage = document.querySelector('.profile-image');
    
    if (profileImage) {
        // Mouse parallax effect
        document.addEventListener('mousemove', function(e) {
            const rect = profileImage.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) / 30;
            const deltaY = (e.clientY - centerY) / 30;
            
            profileImage.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.02)`;
        });
        
        // Reset on mouse leave
        document.addEventListener('mouseleave', function() {
            profileImage.style.transform = '';
        });
    }
}

// Performance optimization
function optimizePerformance() {
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency <= 2) {
        document.body.classList.add('reduced-motion');
    }
    
    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', function() {
        const elements = document.querySelectorAll('.floating-element, .profile-glow');
        elements.forEach(element => {
            if (document.hidden) {
                element.style.animationPlayState = 'paused';
            } else {
                element.style.animationPlayState = 'running';
            }
        });
    });
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizePerformance);

// Add error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Add reduced motion support
const reducedMotionStyles = document.createElement('style');
reducedMotionStyles.textContent = `
    @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
    
    .reduced-motion * {
        animation-duration: 0.3s !important;
        animation-iteration-count: 1 !important;
    }
`;
document.head.appendChild(reducedMotionStyles);

// Export functions for testing (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        copySiteId,
        openPlatform,
        createFloatingElements,
        SITE_ID,
        PLATFORM_URLS
    };
}


 // تحسين التمرير + تقليل التقطيع
  window.addEventListener('load', () => {
    // إجبار المتصفح يستخدم GPU على العناصر
    document.querySelectorAll('*').forEach(el => {
      el.style.willChange = 'transform, opacity';
    });

    // Scroll smoother (بدون التأثير على الأداء)
    document.documentElement.style.scrollBehavior = 'smooth';

    // تعطيل الأنيميشن وقت السكروول بسرعة (تجريبي)
    let isScrolling;
    window.addEventListener('scroll', () => {
      document.body.classList.add('scrolling');
      clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        document.body.classList.remove('scrolling');
      }, 200);
    });
  });
</script>

<style>
  /* لو عندك أنيميشن كتير، نوقفها مؤقتًا وقت السكروول */
  body.scrolling * {
    transition: none !important;
    animation: none !important;
  }
