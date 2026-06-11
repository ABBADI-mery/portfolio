// script.js - Portfolio interactif
document.addEventListener('DOMContentLoaded', () => {
    // ========= NAVIGATION ACTIVE AU SCROLL =========
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
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

    // ========= MENU HAMBURGER =========
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // ========= CARROUSEL ACTIVITÉS =========
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;

    function updateCarousel() {
        if (track) track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    if (prevBtn && nextBtn && slides.length) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        });
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        });

        const modal = document.getElementById('activityModal');
        const closeModal = document.querySelector('.close-modal');
        const modalTitle = document.getElementById('modalModuleTitle');
        const modalDesc = document.getElementById('modalDesc');

        slides.forEach(slide => {
            slide.addEventListener('click', () => {
                const moduleName = slide.getAttribute('data-module') || 'Activité CREMEF';
                const description = slide.getAttribute('data-desc') || 'Projet pratique réalisé dans le cadre du module.';
                if (modalTitle && modalDesc) {
                    modalTitle.innerText = `📘 ${moduleName}`;
                    modalDesc.innerText = description;
                }
                if (modal) modal.style.display = 'flex';
            });
        });

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                if (modal) modal.style.display = 'none';
            });
        }

        if (modal) {
            window.addEventListener('click', (e) => {
                if (e.target === modal) modal.style.display = 'none';
            });
        }
    }

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

    // ========= THEME CLAIR / SOMBRE =========
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeToggle) themeToggle.checked = true;
    }

    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // ========= DONNÉES MODULES S1 =========
    const modulesS1 = [
        { nom: "Méthodologie de recherche", desc: "Introduction aux méthodes qualitatives et quantitatives, rédaction académique.", prof: "Pr. Laurent V.", heures: "30h", icone: "fas fa-search" },
        { nom: "Gestion 1", desc: "Principes de gestion administrative et financière en milieu éducatif.", prof: "Pr. Jamila R.", heures: "25h", icone: "fas fa-chart-line" },
        { nom: "Planification", desc: "Élaboration de projets pédagogiques et planification des séquences.", prof: "Pr. Karim B.", heures: "20h", icone: "fas fa-calendar-alt" },
        { nom: "TICE", desc: "Technologies de l'information et de la communication pour l'enseignement.", prof: "Pr. Sarah M.", heures: "24h", icone: "fas fa-laptop-code" },
        { nom: "Sciences de l'éducation", desc: "Théories d'apprentissage, psychologie cognitive et pédagogies actives.", prof: "Pr. Fouad L.", heures: "28h", icone: "fas fa-brain" },
        { nom: "RF1 – Architecture", desc: "Composants matériels, processeur, mémoire, systèmes binaires.", prof: "Pr. Nadia T.", heures: "35h", icone: "fas fa-microchip" },
        { nom: "RF2 – Algorithmique", desc: "Bases de la programmation, structures conditionnelles, boucles, fonctions.", prof: "Pr. Hicham E.", heures: "40h", icone: "fas fa-code" }
    ];

    // ========= DONNÉES MODULES S2 =========
    const modulesS2 = [
        { nom: "Évaluation", desc: "Méthodes d'évaluation formative et certificative.", prof: "Pr. Samira K.", heures: "22h", icone: "fas fa-clipboard-list" },
        { nom: "Gestion 2", desc: "Gestion de projets et leadership éducatif.", prof: "Pr. Rachid F.", heures: "24h", icone: "fas fa-chart-pie" },
        { nom: "Production didactique", desc: "Conception de ressources pédagogiques innovantes.", prof: "Pr. Leila O.", heures: "28h", icone: "fas fa-book-open" },
        { nom: "Vie scolaire", desc: "Règlement intérieur, médiation et suivi des élèves.", prof: "CPE M. Ahmed", heures: "18h", icone: "fas fa-users" },
        { nom: "RF3 – Réseau", desc: "Concepts TCP/IP, adressage, sécurité réseau.", prof: "Pr. Youssef N.", heures: "30h", icone: "fas fa-network-wired" },
        { nom: "RF4 – Développement web", desc: "HTML5, CSS3, JavaScript, Frameworks modernes.", prof: "Pr. Inès D.", heures: "40h", icone: "fab fa-html5" },
        { nom: "Analyse des pratiques", desc: "Retour réflexif sur les situations professionnelles.", prof: "Pr. Hicham", heures: "20h", icone: "fas fa-chalkboard" },
        { nom: "Déontologie du métier", desc: "Éthique enseignante, droits et devoirs.", prof: "Me Benali", heures: "15h", icone: "fas fa-gavel" }
    ];

    // ========= GÉNÉRATION DES CARTES MODULES =========
    function generateModulesPro(containerId, modules) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = '';
        modules.forEach(module => {
            const card = document.createElement('div');
            card.className = 'module-pro-card';
            card.innerHTML = `
                <div class="module-info-left">
                    <div class="module-icon-small"><i class="${module.icone}"></i></div>
                    <div class="module-text">
                        <h3>${module.nom}</h3>
                        <p class="module-pro-desc">${module.desc.substring(0, 60)}${module.desc.length > 60 ? '...' : ''}</p>
                    </div>
                </div>
                <button class="module-plus-btn" 
                    data-nom="${module.nom}" 
                    data-prof="${module.prof}" 
                    data-heures="${module.heures}" 
                    data-desc="${module.desc}"
                    data-icone="${module.icone}">
                    <i class="fas fa-plus"></i>
                </button>
            `;
            container.appendChild(card);
        });
        
        document.querySelectorAll('.module-plus-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                openModalPro(
                    btn.getAttribute('data-nom'),
                    btn.getAttribute('data-prof'),
                    btn.getAttribute('data-heures'),
                    btn.getAttribute('data-desc'),
                    btn.getAttribute('data-icone')
                );
            });
        });
    }

    // ========= OUVERTURE MODAL =========
    function openModalPro(nom, prof, heures, desc, icone) {
        const modal = document.getElementById('moduleModalPro');
        const modalIcon = document.getElementById('modalProIcon');
        const title = document.getElementById('modalProTitle');
        const details = document.getElementById('modalProDetails');
        
        if (modalIcon) modalIcon.className = icone;
        title.textContent = nom;
        details.innerHTML = `
            <div class="modal-pro-row"><i class="fas fa-chalkboard-user"></i> <strong>Professeur :</strong> ${prof}</div>
            <div class="modal-pro-row"><i class="far fa-clock"></i> <strong>Volume horaire :</strong> ${heures}</div>
            <div class="modal-pro-row"><i class="fas fa-align-left"></i> <strong>Description complète :</strong> ${desc}</div>
        `;
        modal.style.display = 'flex';
    }

    generateModulesPro('modules-s1-grid', modulesS1);
    generateModulesPro('modules-s2-grid', modulesS2);

    // ========= GESTION DES ONGLETS =========
    const tabBtns = document.querySelectorAll('.tab-pro-btn');
    const semestreContents = {
        s1: document.getElementById('semestre-s1'),
        s2: document.getElementById('semestre-s2'),
        activites: document.getElementById('semestre-activites')
    };

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            Object.values(semestreContents).forEach(content => {
                if (content) content.classList.remove('active');
            });
            
            const semestre = btn.getAttribute('data-semestre');
            if (semestre === 's1' && semestreContents.s1) semestreContents.s1.classList.add('active');
            if (semestre === 's2' && semestreContents.s2) semestreContents.s2.classList.add('active');
            if (semestre === 'activites' && semestreContents.activites) semestreContents.activites.classList.add('active');
        });
    });

    // ========= FERMETURE MODAL =========
    const modalPro = document.getElementById('moduleModalPro');
    const closeModalPro = document.querySelector('.modal-pro-close');
    if (closeModalPro) closeModalPro.addEventListener('click', () => modalPro.style.display = 'none');
    window.addEventListener('click', (e) => { if (e.target === modalPro) modalPro.style.display = 'none'; });

    // ========= GÉNÉRATION DES SÉANCES MSP =========
    const seancesMSP = [
        { numero: 1, date: "03/03/2025", titre: "Introduction à l'algorithmique", desc: "Présentation des concepts de base : variables, types de données.", niveau: "TC Sciences" },
        { numero: 2, date: "06/03/2025", titre: "Structures séquentielles", desc: "Les instructions d'entrée/sortie et les affectations.", niveau: "TC Sciences" },
        { numero: 3, date: "10/03/2025", titre: "Les variables en Python", desc: "Déclaration, affectation et types de variables.", niveau: "TC Lettres" },
        { numero: 4, date: "13/03/2025", titre: "Les conditions (if/else)", desc: "Introduction aux structures conditionnelles.", niveau: "TC Sciences" },
        { numero: 5, date: "17/03/2025", titre: "Exercices pratiques", desc: "Résolution d'exercices sur les conditions.", niveau: "TC Lettres" },
        { numero: 6, date: "20/03/2025", titre: "Les boucles (for/while)", desc: "Introduction aux itérations et répétitions.", niveau: "TC Sciences" },
        { numero: 7, date: "24/03/2025", titre: "Projet mini-site web", desc: "Création d'une page HTML simple avec CSS.", niveau: "TC Sciences" },
        { numero: 8, date: "27/03/2025", titre: "Évaluation formative", desc: "Test sur les chapitres 1 à 4.", niveau: "TC Lettres" },
        { numero: 9, date: "31/03/2025", titre: "Introduction à la bureautique", desc: "Traitement de texte et tableur.", niveau: "TC Lettres" },
        { numero: 10, date: "03/04/2025", titre: "Bilan et correction", desc: "Correction de l'évaluation et synthèse.", niveau: "TC Sciences" }
    ];

    const seancesGrid = document.getElementById('seances-grid-msp');
    if (seancesGrid) {
        seancesMSP.forEach(seance => {
            const card = document.createElement('div');
            card.className = 'seance-card-msp';
            card.innerHTML = `
                <div class="seance-header">
                    <span class="seance-numero">Séance ${seance.numero}</span>
                    <span class="seance-date"><i class="far fa-calendar-alt"></i> ${seance.date}</span>
                </div>
                <div class="seance-title">${seance.titre}</div>
                <div class="seance-desc">${seance.desc}</div>
                <div class="seance-desc"><i class="fas fa-users"></i> ${seance.niveau}</div>
                <a href="#" class="seance-link">📄 Télécharger le rapport <i class="fas fa-download"></i></a>
            `;
            seancesGrid.appendChild(card);
        });
    }

    // ========= CARROUSEL VIE SCOLAIRE V2 =========
    const schoolTrackV2 = document.querySelector('.school-carousel-track-v2');
    const schoolSlidesV2 = document.querySelectorAll('.school-slide-v2');
    const prevLifeBtnV2 = document.querySelector('.prev-life-v2');
    const nextLifeBtnV2 = document.querySelector('.next-life-v2');
    let schoolIndexV2 = 0;

    function updateSchoolCarouselV2() {
        if (schoolTrackV2) {
            schoolTrackV2.style.transform = `translateX(-${schoolIndexV2 * 100}%)`;
        }
    }

    if (prevLifeBtnV2 && nextLifeBtnV2 && schoolSlidesV2.length) {
        prevLifeBtnV2.addEventListener('click', () => {
            schoolIndexV2 = (schoolIndexV2 - 1 + schoolSlidesV2.length) % schoolSlidesV2.length;
            updateSchoolCarouselV2();
        });
        
        nextLifeBtnV2.addEventListener('click', () => {
            schoolIndexV2 = (schoolIndexV2 + 1) % schoolSlidesV2.length;
            updateSchoolCarouselV2();
        });
    }
});