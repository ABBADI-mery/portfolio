// script-accueil.js - Page d'accueil avec carrousel
document.addEventListener('DOMContentLoaded', () => {
    // ========= NAVIGATION ACTIVE AU SCROLL =========
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href')?.substring(1);
            if (href === current) link.classList.add('active');
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // ========= ANCRES LISSES =========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                history.pushState(null, null, targetId);
            }
        });
    });

    // ========= CARROUSEL ACTIVITÉS =========
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;

    function updateCarousel() {
        if (track) {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        updateIndicators();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    function startAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }

    // Créer les indicateurs (points)
    function createIndicators() {
        // Supprimer les anciens indicateurs s'ils existent
        const oldIndicators = document.querySelector('.carousel-indicators');
        if (oldIndicators) oldIndicators.remove();
        
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'carousel-indicators';
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'carousel-dot';
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
                stopAutoSlide();
                startAutoSlide();
            });
            indicatorsContainer.appendChild(dot);
        }
        
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.parentNode.insertBefore(indicatorsContainer, carouselContainer.nextSibling);
        }
    }

    function updateIndicators() {
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    if (prevBtn && nextBtn && slides.length > 0) {
        // Événements boutons
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoSlide();
            startAutoSlide();
        });
        
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoSlide();
            startAutoSlide();
        });
        
        // Auto-slide
        startAutoSlide();
        
        // Pause au survol
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoSlide);
            carouselContainer.addEventListener('mouseleave', startAutoSlide);
        }
        
        createIndicators();
    }

    // ========= MODAL POUR LES ACTIVITÉS =========
    const modal = document.getElementById('activityModal');
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modalModuleTitle');
    const modalDesc = document.getElementById('modalDesc');

    if (modal && closeModal && modalTitle && modalDesc) {
        const allSlides = document.querySelectorAll('.carousel-slide');
        allSlides.forEach(slide => {
            slide.addEventListener('click', () => {
                const moduleName = slide.getAttribute('data-module') || 'Activité CREMEF';
                const description = slide.getAttribute('data-desc') || 'Projet pratique réalisé dans le cadre du module.';
                modalTitle.innerText = `📘 ${moduleName}`;
                modalDesc.innerText = description;
                modal.style.display = 'flex';
                stopAutoSlide();
            });
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            startAutoSlide();
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                startAutoSlide();
            }
        });
    }
});