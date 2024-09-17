// script.js
document.addEventListener('DOMContentLoaded', () => {
    const navigationDots = document.querySelector('.navigation-dots');
    const sections = document.querySelectorAll('section');
    const carousels = document.querySelectorAll('.carousel-slide');

    // Create navigation dots
    sections.forEach((section, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.setAttribute('data-index', index);
        
        let sectionTitle;
        if (index === 0) {
            sectionTitle = "Home";
        } else {
            sectionTitle = section.querySelector('h2').textContent;
        }
        dot.setAttribute('title', sectionTitle);
        
        dot.addEventListener('click', () => {
            section.scrollIntoView({ behavior: 'smooth' });
        });

        // Add hover effect to display section title
        const tooltip = document.createElement('span');
        tooltip.classList.add('tooltip');
        tooltip.textContent = sectionTitle;
        dot.appendChild(tooltip);

        navigationDots.appendChild(dot);
    });

    // Intersection Observer for detecting visible section
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px',
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
                const index = Array.from(sections).indexOf(entry.target);
                const activeDot = navigationDots.querySelector(`[data-index="${index}"]`);
                if (activeDot) activeDot.classList.add('active');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    // Carousel functionality
    carousels.forEach(carousel => {
        let currentSlide = 0;
        const slides = carousel.querySelectorAll('img');
        const totalSlides = slides.length;
        const prevButton = carousel.parentElement.querySelector('.prev');
        const nextButton = carousel.parentElement.querySelector('.next');

        function updateSlide() {
            carousel.style.transform = `translateX(-${currentSlide * 33.333}%)`;
        }

        prevButton.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlide();
        });

        nextButton.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlide();
        });

        // Optional: Add keyboard navigation for the carousel
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateSlide();
            } else if (e.key === 'ArrowRight') {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateSlide();
            }
        });

        // Optional: Add touch swipe functionality for mobile devices
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);

        function handleSwipe() {
            if (touchEndX < touchStartX) {
                // Swipe left
                currentSlide = (currentSlide + 1) % totalSlides;
            } else if (touchEndX > touchStartX) {
                // Swipe right
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            }
            updateSlide();
        }
    });

    // Trigger animations when elements come into view
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('h1, h2, p').forEach(el => animationObserver.observe(el));
});