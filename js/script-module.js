// script-module.js - Pour les 16 pages modules
document.addEventListener('DOMContentLoaded', () => {
    // ========= DONNÉES DE NAVIGATION ENTRE MODULES =========
    const modulesOrderS1 = [
        "module-s1-1.html", "module-s1-2.html", "module-s1-3.html", "module-s1-4.html",
        "module-s1-5.html", "module-s1-6.html", "module-s1-7.html"
    ];
    
    const modulesOrderS2 = [
        "module-s2-1.html", "module-s2-2.html", "module-s2-3.html", "module-s2-4.html",
        "module-s2-5.html", "module-s2-6.html", "module-s2-7.html", "module-s2-8.html"
    ];

    // Détecter le module actuel et son semestre
    const currentPage = window.location.pathname.split('/').pop();
    const isS1 = currentPage.includes('s1');
    const modulesOrder = isS1 ? modulesOrderS1 : modulesOrderS2;
    const currentIndex = modulesOrder.indexOf(currentPage);
    
    // Boutons de navigation précédent/suivant
    const prevBtn = document.querySelector('.nav-prev');
    const nextBtn = document.querySelector('.nav-next');
    
    if (prevBtn && currentIndex > 0) {
        prevBtn.href = modulesOrder[currentIndex - 1];
    } else if (prevBtn) {
        prevBtn.style.display = 'none';
    }
    
    if (nextBtn && currentIndex < modulesOrder.length - 1) {
        nextBtn.href = modulesOrder[currentIndex + 1];
    } else if (nextBtn) {
        nextBtn.style.display = 'none';
    }

    // ========= ANIMATION D'APPARITION =========
    const content = document.querySelector('.module-detail-content');
    if (content) {
        setTimeout(() => {
            content.classList.add('visible');
        }, 100);
    }

    // ========= METTRE À JOUR LE LIEN ACTIF DANS LA NAVIGATION =========
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === '#cremef' || href === 'cremef-s1.html' || href === 'cremef-s2.html') {
            if (isS1 && href === 'cremef-s1.html') link.classList.add('active');
            if (!isS1 && href === 'cremef-s2.html') link.classList.add('active');
        }
    });
});