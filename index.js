
// Create stars
function createStars() {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 1) + 's';
        starsContainer.appendChild(star);
    }
}

// Create floating rocks
function createRocks() {
    const rocksContainer = document.getElementById('rocks');
    for (let i = 0; i < 15; i++) {
        const rock = document.createElement('div');
        rock.className = 'rock';
        const size = Math.random() * 40 + 15;
        rock.style.width = size + 'px';
        rock.style.height = size + 'px';
        rock.style.left = Math.random() * 100 + '%';
        rock.style.top = Math.random() * 100 + '%';
        rock.style.animationDelay = Math.random() * 6 + 's';
        rock.style.animationDuration = (Math.random() * 4 + 4) + 's';
        rock.style.opacity = Math.random() * 0.5 + 0.1;
        rocksContainer.appendChild(rock);
    }
}

// Enter website with enhanced animation
function enterWebsite() {
    const overlay = document.getElementById('palestineOverlay');
    overlay.style.transform = 'scale(0.8)';
    overlay.style.opacity = '0';

    setTimeout(() => {
        overlay.classList.add('hidden');
    }, 800);
}

// Copy PUBG ID with enhanced notification
function copyPubgId() {
    navigator.clipboard.writeText('51541024974').then(() => {
        const notification = document.getElementById('notification');
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    });
}

// Open platform links
function openPlatform(platform) {
    const urls = {
        youtube: 'https://www.youtube.com/@Mustafa_Kamal_Emaira', 
        instagram: 'https://www.instagram.com/mustafakamal246800/',
        tiktok: 'https://www.tiktok.com/@mustafakamal246800?_t=ZS-8xFRdhq4chG&_r=1', 
        facebook: 'https://www.facebook.com/mustafakamal246800?rdid=8StY4GVvYpDz3maT&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F12FmDgHQY1d%2F#' 
    };

    if (urls[platform]) {
        window.open(urls[platform], '_blank');
    }
}

// Enhanced scroll animations
function handleScrollAnimations() {
    const sections = document.querySelectorAll('.section-animate');
    const platformCards = document.querySelectorAll('.platform-card');

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;

        if (isVisible) {
            section.classList.add('visible');
        }
    });

    // Animate platform cards when they come into view
    platformCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;

        if (isVisible) {
            setTimeout(() => {
                card.style.animation = `platformSlideIn 0.8s ease forwards`;
            }, index * 100);
        }
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    createRocks();

    window.addEventListener('scroll', handleScrollAnimations);
    handleScrollAnimations(); // Initial check

    // Add some delay to platform card animations
    const platformCards = document.querySelectorAll('.platform-card');
    platformCards.forEach((card, index) => {
        card.style.animationDelay = (index * 0.2) + 's';
    });
});

// Smooth scrolling optimization for mobile
let scrollTimer = null;
window.addEventListener('scroll', () => {
    if (scrollTimer !== null) {
        clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(() => {
        handleScrollAnimations();
    }, 50);
});

// Add intersection observer for better performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated sections
document.addEventListener('DOMContentLoaded', () => {
    const animatedSections = document.querySelectorAll('.section-animate');
    animatedSections.forEach(section => {
        observer.observe(section);
    });
});

// Platform card click effects
document.addEventListener('DOMContentLoaded', () => {
    const platformCards = document.querySelectorAll('.platform-card');

    platformCards.forEach(card => {
        card.addEventListener('click', function () {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Enhanced floating animation for profile image
document.addEventListener('DOMContentLoaded', () => {
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX - window.innerWidth / 2) / 50;
            mouseY = (e.clientY - window.innerHeight / 2) / 50;

            profileImage.style.transform = `translateX(${mouseX}px) translateY(${mouseY}px)`;
        });
    }
});

// Add particle effect on button hover
document.addEventListener('DOMContentLoaded', () => {
    const enterBtn = document.querySelector('.enter-btn');
    const pubgBtn = document.querySelector('.pubg-id-btn');

    [enterBtn, pubgBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('mouseenter', createParticles);
        }
    });
});

function createParticles(e) {
    const button = e.target;
    const rect = button.getBoundingClientRect();

    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = '#00ff88';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10001';

        const startX = rect.left + Math.random() * rect.width;
        const startY = rect.top + Math.random() * rect.height;

        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';

        document.body.appendChild(particle);

        // Animate particle
        const animation = particle.animate([
            {
                transform: 'translate(0, 0) scale(1)',
                opacity: 1
            },
            {
                transform: `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });

        animation.onfinish = () => {
            particle.remove();
        };
    }
}
