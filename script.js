document.addEventListener("DOMContentLoaded", function () {
    // منع الترجمة التلقائية من Google
    if (typeof google !== "undefined" && google.translate) {
        google.translate.TranslateElement = function () {};
    }


    function createStars() {
        const starsContainer = document.getElementById('stars');
        if (!starsContainer) return;

        const numberOfStars = window.innerWidth < 768 ? 50 : 100;

        for (let i = 0; i < numberOfStars; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.width = Math.random() * 3 + 1 + 'px';
            star.style.height = star.style.width;
            star.style.animationDelay = Math.random() * 3 + 's';
            star.style.animationDuration = (Math.random() * 3 + 2) + 's';
            starsContainer.appendChild(star);
        }
    }

    
    createStars();


    window.addEventListener('resize', () => {
        const starsContainer = document.getElementById('stars');
        if (starsContainer) {
            starsContainer.innerHTML = '';
            createStars();
        }
    });

 
    if (window.innerWidth > 768) {
        const card = document.querySelector('.profile-card');
        if (card) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'none';
            });
        }
    }
});

 document.documentElement.setAttribute("translate", "no");

    // منع أدوات الترجمة الآلية من تعديل النصوص
    const observer = new MutationObserver(() => {
        document.querySelectorAll('*').forEach(el => {
            el.setAttribute('translate', 'no');
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // تعطيل خاصية الترجمة في واجهة Google Chrome
    Object.defineProperty(document, 'googleTranslateElementInit', {
        set: function () {
            console.warn("منع تحميل Google Translate");
        },
        get: function () {
            return function () {};
        }
    });