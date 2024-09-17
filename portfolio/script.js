// script.js
document.addEventListener('DOMContentLoaded', () => {
    const navigationDots = document.querySelector('.navigation-dots');
    const sections = document.querySelectorAll('section');

    // Create navigation dots
    sections.forEach((section, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.setAttribute('data-index', index);
        
        const sectionTitle = section.querySelector('h1, h2').textContent;
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

    // Update active dot on scroll
    function updateActiveDot() {
        const scrollPosition = window.scrollY;

        sections.forEach((section, index) => {
            const dot = navigationDots.querySelector(`[data-index="${index}"]`);
            const sectionTop = section.offsetTop - (window.innerHeight / 2);
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveDot);
    updateActiveDot(); // Initial call to set the active dot on page load

    // Trigger animations when sections come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('h1, h2, p').forEach(el => observer.observe(el));
});